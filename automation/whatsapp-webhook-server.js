/**
 * CLIXA CONSULTING - WhatsApp Automated Booking & Qualification Assistant
 * 
 * Serveur natif autonome (Zero-Dependency) compatible Node.js 18+ / 26+.
 * Gère les Webhooks Meta WhatsApp Business Cloud API, la qualification des leads,
 * la sélection des créneaux et l'alerte à l'administration.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  port: process.env.PORT || 3001,
  webhookVerifyToken: process.env.WHATSAPP_VERIFY_TOKEN || 'CLIXA_SECRET_TOKEN_2026',
  whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
  adminPhone: '00212661344054', // Téléphone officiel de l'administration Maroc
  adminEmail: 'contact@clixa.ma',
};

// Chargement des scripts de messages
const scriptsPath = path.join(__dirname, 'scripts-messages.json');
let SCRIPTS = {};
try {
  SCRIPTS = JSON.parse(fs.readFileSync(scriptsPath, 'utf8'));
} catch (e) {
  console.error("Erreur chargement scripts :", e);
}

// Mémoire des sessions actives
const userSessions = new Map();

/**
 * Envoi d'un message WhatsApp via Meta Cloud API
 */
async function sendWhatsAppMessage(to, text) {
  if (!CONFIG.whatsappAccessToken || !CONFIG.phoneNumberId) {
    console.log(`\n🤖 [RÉPONSE BOT AUTOMATIQUE vers ${to}] :\n${text}\n------------------------------------------`);
    return { status: 'simulated' };
  }

  try {
    const url = `https://graph.facebook.com/v21.0/${CONFIG.phoneNumberId}/messages`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CONFIG.whatsappAccessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: { body: text }
      })
    });
    return await response.json();
  } catch (error) {
    console.error(`Erreur envoi message vers ${to}:`, error);
  }
}

/**
 * Traitement des messages entrants
 */
async function processMessage(from, text) {
  const cleanText = text.trim();
  const lowerText = cleanText.toLowerCase();

  // 1. Détection d'une réservation directe provenant du site web CLIXA
  if (cleanText.includes("📅 Date souhaitée") && cleanText.includes("⏰ Créneau horaire")) {
    const dayMatch = cleanText.match(/📅 Date souhaitée\s*:\s*(.+)/i);
    const timeMatch = cleanText.match(/⏰ Créneau horaire\s*:\s*(.+)/i);
    const topicMatch = cleanText.match(/💼 Thématique\s*:\s*(.+)/i);
    const nameMatch = cleanText.match(/👤 Nom & Prénom\s*:\s*(.+)/i);
    const companyMatch = cleanText.match(/🏢 Entreprise\s*:\s*(.+)/i);
    const phoneMatch = cleanText.match(/📞 Mon numéro\s*:\s*(.+)/i);

    const appointment = {
      day: dayMatch ? dayMatch[1].trim() : 'Demain',
      time: timeMatch ? timeMatch[1].trim() : '11:00',
      topic: topicMatch ? topicMatch[1].trim() : 'Conseil & SI',
      name: nameMatch ? nameMatch[1].trim() : 'Client CLIXA',
      company: companyMatch ? companyMatch[1].trim() : 'Non renseigné',
      phone: phoneMatch ? phoneMatch[1].trim() : from
    };

    // Confirmation automatique au prospect
    let confirmationMsg = SCRIPTS.messages.appointmentConfirmed
      .replace('{{DATE_TIME}}', `${appointment.day} (${appointment.time})`)
      .replace('{{TOPIC}}', appointment.topic)
      .replace('{{CLIENT_NAME}}', appointment.name)
      .replace('{{COMPANY}}', appointment.company)
      .replace('{{PHONE}}', appointment.phone);

    await sendWhatsAppMessage(from, confirmationMsg);

    // Alerte immédiate à l'administration
    let adminMsg = SCRIPTS.messages.adminAlertNotification
      .replace('{{CLIENT_NAME}}', appointment.name)
      .replace('{{COMPANY}}', appointment.company)
      .replace('{{PHONE}}', appointment.phone)
      .replace('{{TOPIC}}', appointment.topic)
      .replace('{{DATE_TIME}}', `${appointment.day} à ${appointment.time}`);

    await sendWhatsAppMessage(CONFIG.adminPhone, adminMsg);

    userSessions.set(from, { step: 'confirmed', appointment });
    return;
  }

  // 2. Gestion de l'arborescence interactive
  let session = userSessions.get(from) || { step: 'init' };

  if (['bonjour', 'salam', 'salut', 'hello', 'start', 'bonsoir', 'menu'].includes(lowerText)) {
    userSessions.set(from, { step: 'menu' });
    await sendWhatsAppMessage(from, SCRIPTS.messages.welcomeNewUser);
    return;
  }

  if (['1', '2', '3', '4', '5'].includes(cleanText)) {
    if (cleanText === '5') {
      userSessions.set(from, { step: 'choosing_slot', topic: 'Direction & Cadrage global' });
      await sendWhatsAppMessage(from, SCRIPTS.messages.askSlotProposal);
    } else {
      const topicMap = {
        '1': "Intégration d'ERP Odoo",
        '2': "Développement Web & Solutions Digitales",
        '3': "Assistance à Maîtrise d'Ouvrage (AMOA)",
        '4': "Facturation Électronique & Process"
      };
      userSessions.set(from, { step: 'choosing_slot', topic: topicMap[cleanText] });
      await sendWhatsAppMessage(from, SCRIPTS.messages.serviceDetails[cleanText]);
      setTimeout(async () => {
        await sendWhatsAppMessage(from, SCRIPTS.messages.askSlotProposal);
      }, 1200);
    }
    return;
  }

  if (['a', 'b', 'c', 'choix a', 'choix b', 'choix c'].includes(lowerText)) {
    const slotMap = {
      'a': 'Demain de 11h00 à 11h30',
      'b': 'Demain de 15h00 à 15h30',
      'c': 'Après-demain de 10h30 à 11h00'
    };
    const key = lowerText.replace('choix ', '').trim();
    session.slot = slotMap[key] || 'Demain à 11h00';
    session.step = 'awaiting_contact';
    userSessions.set(from, session);

    await sendWhatsAppMessage(from, SCRIPTS.messages.askContactDetails);
    return;
  }

  if (session.step === 'awaiting_contact') {
    session.contactInfo = cleanText;
    session.step = 'confirmed';
    userSessions.set(from, session);

    let confirmationMsg = SCRIPTS.messages.appointmentConfirmed
      .replace('{{DATE_TIME}}', session.slot || 'Prochain créneau disponible')
      .replace('{{TOPIC}}', session.topic || 'Conseil & Transformation')
      .replace('{{CLIENT_NAME}}', cleanText.split('\n')[0] || 'Cher Dirigeant')
      .replace('{{COMPANY}}', 'Entreprise transmise')
      .replace('{{PHONE}}', from);

    await sendWhatsAppMessage(from, confirmationMsg);

    let adminMsg = SCRIPTS.messages.adminAlertNotification
      .replace('{{CLIENT_NAME}}', cleanText)
      .replace('{{COMPANY}}', 'Coordonnées : ' + cleanText)
      .replace('{{PHONE}}', from)
      .replace('{{TOPIC}}', session.topic || 'Général')
      .replace('{{DATE_TIME}}', session.slot || 'À planifier');

    await sendWhatsAppMessage(CONFIG.adminPhone, adminMsg);
    return;
  }

  // Défaut : renvoi vers le menu
  await sendWhatsAppMessage(from, SCRIPTS.messages.welcomeNewUser);
}

// Serveur HTTP Natif
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // 1. Vérification Webhook Meta (GET)
  if (req.method === 'GET' && url.pathname === '/webhook') {
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === CONFIG.webhookVerifyToken) {
      console.log('✅ Webhook WhatsApp vérifié avec succès par Meta.');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(challenge);
      return;
    }
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  // 2. Réception Événements WhatsApp (POST)
  if (req.method === 'POST' && url.pathname === '/webhook') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      res.writeHead(200);
      res.end('OK');

      try {
        const data = JSON.parse(body);
        if (data.object === 'whatsapp_business_account' && data.entry) {
          for (const entry of data.entry) {
            for (const change of entry.changes) {
              const value = change.value;
              if (value.messages && value.messages.length > 0) {
                const message = value.messages[0];
                const from = message.from;
                if (message.type === 'text') {
                  console.log(`\n📩 [WHATSAPP REÇU de ${from}] : "${message.text.body}"`);
                  await processMessage(from, message.text.body);
                }
              }
            }
          }
        }
      } catch (err) {
        console.error('Erreur parsing webhook :', err);
      }
    });
    return;
  }

  // 3. Test de Simulation Local (POST /test-simulate)
  if (req.method === 'POST' && url.pathname === '/test-simulate') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        const from = payload.from || '00212661000000';
        const message = payload.message || 'Bonjour';
        console.log(`\n🧪 [SIMULATION REÇUE de ${from}] : "${message}"`);
        await processMessage(from, message);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, message: 'Message traité par le Bot' }));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // Racine
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <h1>CLIXA CONSULTING — Serveur Bot WhatsApp Actif 🚀</h1>
    <p>Webhook URL : <code>/webhook</code></p>
    <p>Pour simuler un message : <code>POST /test-simulate</code></p>
  `);
});

server.listen(CONFIG.port, () => {
  console.log(`\n======================================================`);
  console.log(`🤖 CLIXA BOT WHATSAPP démarré avec succès sur le port ${CONFIG.port}`);
  console.log(`📡 URL Webhook : http://localhost:${CONFIG.port}/webhook`);
  console.log(`🧪 Test Simulation : POST http://localhost:${CONFIG.port}/test-simulate`);
  console.log(`======================================================\n`);
});
