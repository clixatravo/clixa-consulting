/**
 * Vercel Serverless Function — réception des demandes de devis.
 *
 * Avant cette fonction, le formulaire « Demande de Devis par Email »
 * simulait un envoi (setTimeout de 800 ms) puis affichait un écran de
 * succès : aucune demande n'arrivait jamais. Tous les leads écrits
 * étaient perdus.
 *
 * Variables d'environnement (Vercel > Settings > Environment Variables) :
 *   RESEND_API_KEY   clé API Resend (resend.com — gratuit jusqu'à 3000 mails/mois)
 *   CONTACT_TO       adresse qui reçoit les demandes
 *   CONTACT_FROM     expéditeur, sur un domaine vérifié chez Resend
 *
 * Sans RESEND_API_KEY, la fonction répond 503 { code: 'NOT_CONFIGURED' } et
 * le front bascule sur un mailto: pré-rempli : aucune demande n'est perdue,
 * même avant configuration.
 */

import { courrielDemande } from './_gabarit.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Requête invalide.' });
    }
  }
  body = body || {};

  // Honeypot : champ invisible, rempli uniquement par les robots.
  // On répond 200 pour ne pas leur signaler la détection.
  if (body.website) return res.status(200).json({ ok: true });

  const { name, email, company, phone, topic, message } = body;

  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Nom, email et entreprise sont obligatoires.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email))) {
    return res.status(400).json({ error: 'Adresse email invalide.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !to || !from) {
    return res
      .status(503)
      .json({ code: 'NOT_CONFIGURED', error: 'Service email non configuré.' });
  }

  const { subject, html, text } = courrielDemande({ name, email, company, phone, topic, message });

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        // Permet de répondre directement au prospect depuis la boîte mail.
        reply_to: String(email).slice(0, 200),
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      console.error('Resend', response.status, await response.text());
      return res.status(502).json({ error: "L'envoi a échoué." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact handler', err);
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
}
