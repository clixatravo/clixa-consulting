/**
 * CLIXA CONSULTING & CLIXA INSTITUTE — Assistant IA Consultant Exécutif
 * 
 * Moteur conversationnel d'élite en Français d'affaires avec priorisation sémantique :
 * - Priorise l'intention réelle du client (Odoo, Web, AMOA, PMP, DAF, etc.).
 * - Répond précisément à la question posée sans confusion entre métier et besoin.
 * - Propose un créneau d'appel avec l'administration et alerte le +212 6 61 34 40 54.
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [k, ...v] = trimmed.split('=');
      process.env[k.trim()] = v.join('=').trim();
    }
  });
}

const CONFIG = {
  port: process.env.PORT || 3002,
  webhookVerifyToken: process.env.WHATSAPP_VERIFY_TOKEN || 'CLIXA_SECRET_TOKEN_2026',
  whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN || '',
  phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || '',
  greenApiInstanceId: process.env.GREEN_API_INSTANCE_ID || '',
  greenApiToken: process.env.GREEN_API_TOKEN || '',
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  adminPhone: process.env.ADMIN_PHONE || '212661344054@c.us', // Téléphone officiel administration Maroc
};

// Mémoire des sessions
const conversations = new Map();

async function sendWhatsAppMessage(to, text) {
  // 1. Envoi via Green-API si configuré
  if (CONFIG.greenApiInstanceId && CONFIG.greenApiToken) {
    try {
      const chatId = to.includes('@c.us') ? to : `${to.replace(/[^0-9]/g, '')}@c.us`;
      const url = `https://api.green-api.com/waInstance${CONFIG.greenApiInstanceId}/sendMessage/${CONFIG.greenApiToken}`;
      console.log(`📤 [GREEN-API] Envoi vers ${chatId}...`);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatId, message: text })
      });
      const data = await response.json();
      console.log(`✅ [GREEN-API] Résultat :`, data);
      return data;
    } catch (err) {
      console.error(`Erreur envoi Green-API vers ${to} :`, err);
    }
  }

  // 2. Envoi via Meta Cloud API si token présent
  if (CONFIG.whatsappAccessToken && CONFIG.phoneNumberId) {
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
          to,
          type: 'text',
          text: { body: text }
        })
      });
      return await response.json();
    } catch (err) {
      console.error(`Erreur envoi message WhatsApp vers ${to} :`, err);
    }
  }
}

async function generateConsultantReply(from, userMessage) {
  let session = conversations.get(from) || {
    messages: [],
    stage: 'discovery',
    lead: {}
  };

  const text = userMessage.trim();
  const lower = text.toLowerCase();

  // 1. Réservation directe via formulaire du site web (clixa.ma)
  if (text.includes("📅 Date souhaitée") && text.includes("⏰ Créneau horaire")) {
    const dayMatch = text.match(/📅 Date souhaitée\s*:\s*(.+)/i);
    const timeMatch = text.match(/⏰ Créneau horaire\s*:\s*(.+)/i);
    const topicMatch = text.match(/💼 Thématique\s*:\s*(.+)/i);
    const nameMatch = text.match(/👤 Nom & Prénom\s*:\s*(.+)/i);
    const companyMatch = text.match(/🏢 Entreprise\s*:\s*(.+)/i);
    const phoneMatch = text.match(/📞 Mon numéro\s*:\s*(.+)/i);

    const lead = {
      day: dayMatch ? dayMatch[1].trim() : 'Demain',
      time: timeMatch ? timeMatch[1].trim() : '11:00',
      topic: topicMatch ? topicMatch[1].trim() : 'Conseil & Transformation',
      name: nameMatch ? nameMatch[1].trim() : 'Dirigeant',
      company: companyMatch ? companyMatch[1].trim() : 'Non renseignée',
      phone: phoneMatch ? phoneMatch[1].trim() : from
    };

    await sendWhatsAppMessage(
      CONFIG.adminPhone,
      `🚨 *NOUVEAU RDV TÉLÉPHONIQUE (CLIXA WEB)*\n\n👤 *Client* : ${lead.name}\n🏢 *Société* : ${lead.company}\n📞 *Téléphone* : ${lead.phone}\n💼 *Projet* : ${lead.topic}\n⏰ *Créneau* : ${lead.day} à ${lead.time}\n\n⚠️ *Action* : L'administration doit contacter ce dirigeant.`
    );

    return `Bonjour ${lead.name} et bienvenue chez *CLIXA CONSULTING* 👋\n\nVotre demande d'échange concernant le projet *${lead.topic}* a bien été enregistrée.\n\n✅ *Votre rendez-vous téléphonique est confirmé pour ${lead.day} (${lead.time})*.\nUn associé senior de notre administration vous contactera personnellement au ${lead.phone}.\n\n_Avez-vous des points particuliers que vous aimeriez aborder en priorité lors de cet appel ?_`;
  }

  // 2. Si Google Gemini est configuré (Gratuit et ultra-rapide)
  if (CONFIG.geminiApiKey) {
    try {
      const systemPrompt = fs.readFileSync(path.join(__dirname, 'CLIXA_AI_SYSTEM_PROMPT.md'), 'utf8');
      session.messages.push({ role: 'user', content: text });

      const contents = [
        {
          role: 'user',
          parts: [{ text: `INSTRUCTIONS ET RÔLE :\n${systemPrompt}\n\nHISTORIQUE ET MESSAGE DU CLIENT :\nClient: ${text}` }]
        }
      ];

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${CONFIG.geminiApiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.3
          }
        })
      });

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const botReply = data.candidates[0].content.parts[0].text;
        session.messages.push({ role: 'assistant', content: botReply });
        conversations.set(from, session);

        if (botReply.includes("[ADMIN_ALERT:") || botReply.includes("rendez-vous est confirmé") || botReply.includes("rendez-vous est officiellement confirmé") || botReply.includes("RDV")) {
          await sendWhatsAppMessage(
            CONFIG.adminPhone,
            `🚨 *ALERTE RDV TÉLÉPHONIQUE (CLIXA AI AGENT)*\n\n📞 *Client WhatsApp* : ${from}\n📄 *Historique récent* :\n${text}\n\n💬 *Réponse Bot* :\n${botReply}\n\n⚠️ *Action* : L'administration doit contacter ce dirigeant.`
          );
        }

        return botReply.replace(/\[ADMIN_ALERT:.*?\]/g, '').trim();
      }
    } catch (err) {
      console.error("Erreur Gemini, bascule sur le moteur natif :", err);
    }
  }

  // 3. Si OpenAI est configuré avec clé API
  if (CONFIG.openAiApiKey) {
    try {
      const systemPrompt = fs.readFileSync(path.join(__dirname, 'CLIXA_AI_SYSTEM_PROMPT.md'), 'utf8');
      session.messages.push({ role: 'user', content: text });

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CONFIG.openAiApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          temperature: 0.3,
          messages: [
            { role: 'system', content: systemPrompt },
            ...session.messages.slice(-8)
          ]
        })
      });

      const data = await response.json();
      const botReply = data.choices[0].message.content;
      session.messages.push({ role: 'assistant', content: botReply });
      conversations.set(from, session);

      if (botReply.includes("[ADMIN_ALERT:") || botReply.includes("rendez-vous est confirmé") || botReply.includes("rendez-vous est officiellement confirmé")) {
        await sendWhatsAppMessage(
          CONFIG.adminPhone,
          `🚨 *ALERTE RDV TÉLÉPHONIQUE (CLIXA AI AGENT)*\n\n📞 *Client WhatsApp* : ${from}\n📄 *Historique récent* :\n${text}\n\n⚠️ *Action* : Un rendez-vous a été convenu avec ce prospect.`
        );
      }

      return botReply.replace(/\[ADMIN_ALERT:.*?\]/g, '').trim();
    } catch (err) {
      console.error("Erreur OpenAI, bascule sur le moteur natif :", err);
    }
  }

  // 3. Moteur Consultatif Heuristique Haute Précision en Français
  session.messages.push({ role: 'user', content: text });

  // GESTION DU CRÉNEAU EN COURS
  if (session.stage === 'slot_proposal') {
    let chosenSlot = 'Demain à 11h00';
    if (lower.includes('1') || lower.includes('11h') || lower.includes('demain matin') || lower.includes('première')) {
      chosenSlot = 'Demain entre 11h00 et 11h30';
    } else if (lower.includes('2') || lower.includes('15h') || lower.includes('après-midi') || lower.includes('deuxième')) {
      chosenSlot = 'Demain entre 15h30 et 16h00';
    } else if (lower.includes('3') || lower.includes('après-demain') || lower.includes('10h') || lower.includes('troisième')) {
      chosenSlot = 'Après-demain entre 10h30 et 11h00';
    } else {
      chosenSlot = text;
    }

    session.lead.slot = chosenSlot;
    session.stage = 'booking_confirm';
    conversations.set(from, session);

    return `Parfait, je note le créneau pour **${chosenSlot}** 👍\n\nAfin que l'administration puisse enregistrer ce rendez-vous dans le planning officiel et vous appeler à l'heure précise, merci de me renseigner :\n\n👤 *Votre Nom & Prénom*\n🏢 *Le nom de votre Société ou votre Poste actuel*`;
  }

  if (session.stage === 'booking_confirm') {
    session.lead.nameAndCompany = text;
    session.stage = 'done';
    conversations.set(from, session);

    await sendWhatsAppMessage(
      CONFIG.adminPhone,
      `🚨 *NOUVEL APPEL PROGRAMMÉ (CLIXA)*\n\n👤 *Contact* : ${text}\n📞 *Téléphone à appeler* : ${from}\n💼 *Sujet qualifié* : ${session.lead.topic || 'Formation / Conseil'}\n⏰ *Créneau convenu* : ${session.lead.slot || 'À confirmer'}\n\n⚠️ *Action requise* : L'administration doit contacter ce prospect à l'heure exacte.`
    );

    return `✅ *Votre rendez-vous téléphonique est officiellement confirmé !*\n\n📅 *Créneau bloqué* : ${session.lead.slot}\n💼 *Programme / Projet* : ${session.lead.topic}\n👤 *Contact* : ${text}\n📞 *Numéro de rappel* : ${from}\n\nUn associé senior de l'administration CLIXA vous appellera personnellement au créneau retenu pour échanger en détail sur vos objectifs.\n\nMerci de votre confiance et à très bientôt !\n\n*CLIXA GROUP* • www.clixa.ma • www.clixa.africa`;
  }

  // ANALYSE DES INTENTIONS PAR ORDRE DE PRIORITÉ SÉMANTIQUE

  // 1. ERP Odoo (Priorité absolue si Odoo / ERP est mentionné)
  if (lower.includes('odoo') || lower.includes('erp')) {
    session.stage = 'slot_proposal';
    session.lead.topic = 'Conseil - Intégration ERP Odoo';
    conversations.set(from, session);

    return `Bonjour et bienvenue chez *CLIXA CONSULTING* 💼\n\nNous sommes spécialisés dans l'**intégration et l'optimisation d'ERP Odoo V17/V18** pour entreprises au Maroc et en France :\n\n🔹 *Périmètre métier* : Gestion des stocks multi-dépôts, chaîne d'achats, CRM & ventes, comptabilité analytique et production (MRP).\n🔹 *Méthodologie CLIXA* : Nous cadrons vos processus réels avant la configuration, ce qui garantit une adoption opérationnelle immédiate et -45% sur les cycles de traitement.\n\nPour évaluer la faisabilité et le dimensionnement de votre projet Odoo, je vous propose un **échange téléphonique de 20 minutes avec un associé de notre direction** :\n1️⃣ *Demain entre 11h00 et 11h30*\n2️⃣ *Demain entre 15h30 et 16h00*\n3️⃣ *Après-demain entre 10h30 et 11h00*\n\nQuel horaire vous conviendrait le mieux ?`;
  }

  // 2. AMOA SI (Cadrage, Cahier des charges, Sélection prestataires)
  if (lower.includes('amoa') || lower.includes('cahier des charges') || lower.includes('maîtrise d\'ouvrage') || lower.includes('maitrise d ouvrage')) {
    session.stage = 'slot_proposal';
    session.lead.topic = 'Conseil - Assistance à Maîtrise d\'Ouvrage (AMOA)';
    conversations.set(from, session);

    return `Bonjour et bienvenue chez *CLIXA CONSULTING* 🎯\n\nEn tant qu'**AMOA (Assistance à Maîtrise d'Ouvrage)**, nous agissons comme le tiers de confiance indépendant de votre direction générale :\n\n🔹 Cadrage exhaustif des besoins et rédaction du cahier des charges fonctionnel.\n🔹 Benchmark impartial, dépouillement des offres et sélection de l'intégrateur.\n🔹 Pilotage de la recette et respect strict des délais et des coûts contractuels.\n\nPour faire le point sur vos objectifs SI, je vous propose de caler un **échange téléphonique de 20 minutes avec un consultant senior** :\n1️⃣ *Demain à 11h00*\n2️⃣ *Demain à 15h30*\n3️⃣ *Après-demain à 10h30*\n\nQuel créneau préférez-vous ?`;
  }

  // 3. Site Web & Solutions Digitales
  if (lower.includes('site web') || lower.includes('site internet') || lower.includes('portail web') || lower.includes('extranet') || lower.includes('application web')) {
    session.stage = 'slot_proposal';
    session.lead.topic = 'Conseil - Développement Web & Digital';
    conversations.set(from, session);

    return `Bonjour et bienvenue chez *CLIXA CONSULTING* 🌐\n\nNous concevons des **solutions web et digitales haut de gamme** orientées résultats :\n\n🔹 Portails institutionnels et sites vitrines de prestige avec identité de marque affirmée.\n🔹 Extranets clients sécurisés, portails B2B et outils métiers sur-mesure.\n🔹 Performance de chargement ultra-rapide et optimisation SEO pour l'acquisition.\n\nSouhaitez-vous un échange téléphonique de 20 minutes avec notre direction technique pour cadrer votre besoin ?\n1️⃣ *Demain à 11h00*\n2️⃣ *Demain à 15h30*\n3️⃣ *Après-demain à 10h30*`;
  }

  // 4. Certification PMP®
  if (lower.includes('pmp')) {
    session.stage = 'slot_proposal';
    session.lead.topic = 'Formation - Certification PMP® (PMI)';
    conversations.set(from, session);

    return `Bonjour et bienvenue chez *CLIXA Institute / SkillAfrique* (www.clixa.africa) 🎯\n\nVoici les détails complets de notre **Programme Exécutif de Préparation à la Certification PMP® (Project Management Institute)** :\n\n🔹 *Format & Durée* : **35 heures** intensives réparties sur **8 séances interactives en direct live** (le week-end et en soirée, conçu pour les managers en poste).\n🔹 *Contenu* : Conforme au **PMBOK v8**, cas pratiques réels, simulateur d'examen et tests à blanc.\n🔹 *Date de rentrée* : **Dimanche 20 Septembre 2026**.\n🔹 *Tarif* : **470 €** (environ **5 000 MAD** ou **310 000 FCFA**).\n🔹 *Paiement* : Échelonné en **1x, 2x ou 3 fois sans frais**.\n\nPour valider vos prérequis ou poser vos questions, **souhaitez-vous convenir d'un appel avec notre responsable pédagogique :**\n1️⃣ *Demain entre 11h00 et 11h30*\n2️⃣ *Demain entre 15h30 et 16h00*\n3️⃣ *Après-demain entre 10h30 et 11h00* ?`;
  }

  // 5. DAF / Finance & Contrôle
  if (lower.includes('daf') || lower.includes('directeur financier') || lower.includes('contrôle de gestion') || lower.includes('audit interne')) {
    session.stage = 'slot_proposal';
    session.lead.topic = 'Formation - Directeur Administratif et Financier (DAF)';
    conversations.set(from, session);

    return `Bonjour et bienvenue chez *CLIXA Institute* 📊\n\nNotre parcours exécutif certifiant **Directeur Administratif et Financier (DAF)** (www.clixa.africa) est animé par des directeurs financiers en exercice :\n\n🔹 *Programme* : Posture stratégique DAF, pilotage du cash, contrôle de gestion, comités financiers et modélisation.\n🔹 *Durée & Rythme* : **32 heures** réparties sur **8 séances interactives le week-end** en classe virtuelle.\n🔹 *Rentrée* : **Samedi 19 Septembre 2026**.\n🔹 *Tarif* : **470 €** (~**5 000 MAD** / **310 000 FCFA**), payable en **1x, 2x ou 3 fois sans frais**.\n\nSouhaitez-vous un appel téléphonique de 15 minutes avec l'administration pour recevoir le syllabus détaillé ?\n1️⃣ *Demain à 11h00*\n2️⃣ *Demain à 15h30*\n3️⃣ *Après-demain à 10h30*`;
  }

  // 6. Industrie, Production, Maintenance, QHSE
  if (lower.includes('directeur industriel') || lower.includes('production') || lower.includes('maintenance') || lower.includes('qhse')) {
    session.stage = 'slot_proposal';
    session.lead.topic = 'Formation - Industrie & Opérations';
    conversations.set(from, session);

    return `Bonjour et bienvenue chez *CLIXA Institute* 🏭\n\nNos parcours certifiants **Industrie & Opérations** (Directeur Industriel, Directeur de Production, Maintenance, QHSE) :\n\n🔹 *Programme* : Performance multi-sites, Lean & réduction des coûts, GMAO, systèmes de management intégré (ISO).\n🔹 *Format* : **32 heures** (8 séances live le week-end) en classe virtuelle + présentiel (Agadir, Abidjan, Dakar).\n🔹 *Rentrée* : **Samedi 19 Septembre 2026**.\n🔹 *Prix* : **470 €** (~**5 000 MAD** / **310 000 FCFA**) payable en **1x, 2x ou 3 fois sans frais**.\n\nSouhaitez-vous planifier un échange téléphonique avec l'administration ?\n1️⃣ *Demain à 11h00*\n2️⃣ *Demain à 15h30*\n3️⃣ *Après-demain à 10h30*`;
  }

  // 7. DRH / Ressources Humaines
  if (lower.includes('drh') || lower.includes('ressources humaines')) {
    session.stage = 'slot_proposal';
    session.lead.topic = 'Formation - Directeur des Ressources Humaines (DRH)';
    conversations.set(from, session);

    return `Bonjour et bienvenue chez *CLIXA Institute* 👥\n\nNotre parcours exécutif **Directeur des Ressources Humaines (DRH)** (www.clixa.africa) :\n\n🔹 *Objectifs* : Stratégie RH & capital humain, organisation, rétention des talents, people analytics et dialogue social.\n🔹 *Durée* : **32 heures** (8 séances interactives en direct live le week-end).\n🔹 *Rentrée* : **Dimanche 20 Septembre 2026**.\n🔹 *Tarif* : **470 €** (~**5 000 MAD** ou **310 000 FCFA**) payable en **1x, 2x ou 3 fois sans frais**.\n\nSouhaitez-vous un point téléphonique de 15 minutes avec l'administration pour vérifier la disponibilité d'une place ?\n1️⃣ *Demain à 11h00*\n2️⃣ *Demain à 15h30*\n3️⃣ *Après-demain à 10h30*`;
  }

  // 8. Commercial / Marketing
  if (lower.includes('directeur commercial') || lower.includes('directeur marketing')) {
    session.stage = 'slot_proposal';
    session.lead.topic = 'Formation - Commercial & Marketing';
    conversations.set(from, session);

    return `Bonjour et bienvenue chez *CLIXA Institute* 📈\n\nNos parcours certifiants **Directeur Commercial** et **Directeur Marketing** (www.clixa.africa) :\n\n🔹 *Programme* : Stratégie grands comptes B2B, pipeline & forecast, acquisition de marché, marque et ROI marketing.\n🔹 *Durée* : **32 heures** (8 séances interactives le week-end).\n🔹 *Rentrée* : **Samedi 19 Septembre 2026**.\n🔹 *Tarif* : **470 €** (~**5 000 MAD** / **310 000 FCFA**) payable en **1x, 2x ou 3 fois sans frais**.\n\nSouhaitez-vous convenir d'un créneau d'appel avec notre responsable pédagogique ?\n1️⃣ *Demain à 11h00*\n2️⃣ *Demain à 15h30*\n3️⃣ *Après-demain à 10h30*`;
  }

  // 9. Question ciblée sur les Prix / Tarifs
  if (lower.includes('prix') || lower.includes('tarif') || lower.includes('coût') || lower.includes('cout') || lower.includes('combien') || lower.includes('paiement')) {
    session.stage = 'slot_proposal';
    session.lead.topic = 'Information Tarifs Formations';
    conversations.set(from, session);

    return `Bonjour et bienvenue chez *CLIXA* 💡\n\nVoici notre politique tarifaire transparente pour les parcours **CLIXA Institute** (www.clixa.africa) :\n\n💰 *Tarif unique* : **470 € par parcours** (soit environ **5 000 MAD** ou **310 000 FCFA**).\n💳 *Facilités de paiement* : Possibilité de régler en **1 fois, 2 fois ou 3 fois sans frais**.\n\nCe montant inclut les **8 séances live avec des directeurs experts**, les supports de cours, les études de cas réels et le **diplôme officiel certifiant**.\n\nPour réserver votre place ou recevoir une facture proforma / convention entreprise, quel créneau vous conviendrait pour un appel ?\n1️⃣ *Demain à 11h00*\n2️⃣ *Demain à 15h30*\n3️⃣ *Après-demain à 10h30*`;
  }

  // 10. Question ciblée sur les Dates / Calendrier
  if (lower.includes('date') || lower.includes('quand') || lower.includes('démarrage') || lower.includes('rentrée') || lower.includes('calendrier')) {
    session.stage = 'slot_proposal';
    session.lead.topic = 'Calendrier des Promotions';
    conversations.set(from, session);

    return `Bonjour et bienvenue chez *CLIXA Institute* 📅\n\nVoici les dates officielles de démarrage de notre prochaine promotion 2026 :\n\n🗓️ *Date de rentrée* : **Samedi 19 Septembre & Dimanche 20 Septembre 2026**.\n⏰ *Rythme* : **8 séances interactives en direct** (le week-end / soirées, adapté aux professionnels en activité).\n💻 *Format* : **Classe virtuelle interactive en direct** (accessible d'où que vous soyez) + campus (**Agadir, Abidjan, Dakar**).\n\nLes promotions étant limitées pour préserver l'interactivité, souhaitez-vous bloquer votre place lors d'un court appel avec l'administration ?\n1️⃣ *Demain à 11h00*\n2️⃣ *Demain à 15h30*\n3️⃣ *Après-demain à 10h30*`;
  }

  // 11. Question générale sur l'ensemble des formations
  if (lower.includes('formation') || lower.includes('catalogue') || lower.includes('cours') || lower.includes('certif')) {
    session.stage = 'slot_proposal';
    session.lead.topic = 'Catalogue Formations Exécutives';
    conversations.set(from, session);

    return `Bonjour et bienvenue chez *CLIXA Institute / SkillAfrique* (www.clixa.africa) 🎓\n\nNous proposons **12 parcours exécutifs certifiants de direction** :\n\n• *Finance & Contrôle* : DAF, Contrôle de Gestion, Audit Interne\n• *Management & Projets* : Préparation Certification PMP® (PMI), Directeur de Projets\n• *Industrie & Opérations* : Directeur Industriel, Production, Maintenance, QHSE\n• *Commercial & RH* : Directeur Commercial, Marketing, DRH\n\n🔹 *Rentrée* : **19 et 20 Septembre 2026**.\n🔹 *Format* : **32h à 35h** (8 séances live le week-end en classe virtuelle).\n🔹 *Tarif* : **470 €** (~**5 000 MAD** ou **310 000 FCFA**), payable en **1x, 2x ou 3 fois sans frais**.\n\nQuel parcours vous intéresse en priorité ? Ou souhaitez-vous caler un appel d'orientation téléphonique ?\n1️⃣ *Demain à 11h00*\n2️⃣ *Demain à 15h30*\n3️⃣ *Après-demain à 10h30*`;
  }

  // Message d'accueil général en Français
  session.stage = 'discovery';
  conversations.set(from, session);

  return `Bonjour et bienvenue chez *CLIXA* 👋\nCabinet de conseil en Transformation & Institut de Formations Exécutives (Casablanca, Paris, Agadir, Abidjan, Dakar).\n\nJe suis l'assistant de direction du groupe. Pour vous orienter précisément, sur quel sujet porte votre besoin ?\n\n🎓 *1. Formations Certifiantes Exécutives* (DAF, PMP®, Industriel, Commercial, DRH — www.clixa.africa)\n💼 *2. Conseil en Entreprise* (Intégration ERP Odoo, Digital & Web, AMOA, Facturation — www.clixa.ma)\n\nVous pouvez simplement me poser votre question, je vous répondrai en détail.`;
}

// Serveur HTTP Natif
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET' && url.pathname === '/webhook') {
    const mode = url.searchParams.get('hub.mode');
    const token = url.searchParams.get('hub.verify_token');
    const challenge = url.searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === CONFIG.webhookVerifyToken) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(challenge);
      return;
    }
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (req.method === 'POST' && url.pathname === '/webhook') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      res.writeHead(200);
      res.end('OK');

      try {
        const data = JSON.parse(body);

        // Format Green-API
        if (data.typeWebhook === 'incomingMessageReceived' && data.messageData) {
          const from = data.senderData?.chatId;
          const messageText = data.messageData?.textMessageData?.textMessage || data.messageData?.extendedTextMessageData?.text;
          if (from && messageText) {
            console.log(`📩 [GREEN-API MESSAGE de ${from}] : "${messageText}"`);
            const reply = await generateConsultantReply(from, messageText);
            await sendWhatsAppMessage(from, reply);
          }
        }

        // Format Meta Cloud API
        if (data.object === 'whatsapp_business_account' && data.entry) {
          for (const entry of data.entry) {
            for (const change of entry.changes) {
              const value = change.value;
              if (value.messages && value.messages.length > 0) {
                const message = value.messages[0];
                const from = message.from;
                if (message.type === 'text') {
                  const reply = await generateConsultantReply(from, message.text.body);
                  await sendWhatsAppMessage(from, reply);
                }
              }
            }
          }
        }
      } catch (err) {
        console.error('Erreur webhook :', err);
      }
    });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/test-chat') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        const from = payload.from || '00212600112233';
        const message = payload.message || 'Bonjour';
        console.log(`\n👤 [PROSPECT ${from}] : "${message}"`);
        const reply = await generateConsultantReply(from, message);
        console.log(`🤖 [CLIXA CONSULTANT IA] :\n${reply}\n------------------------------------------`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, from, message, reply }));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <h1>CLIXA GROUP — Assistant IA Consultant Francophone Actif 🚀</h1>
    <p>Webhook Meta : <code>/webhook</code></p>
    <p>Test Simulation : <code>POST /test-chat</code></p>
  `);
});

server.listen(CONFIG.port, () => {
  console.log(`\n======================================================`);
  console.log(`🧠 CLIXA AI CONSULTANT FRANÇAIS (Port ${CONFIG.port})`);
  console.log(`📡 URL Webhook : http://localhost:${CONFIG.port}/webhook`);
  console.log(`🧪 Test Discussion : POST http://localhost:${CONFIG.port}/test-chat`);
  console.log(`======================================================\n`);
});
