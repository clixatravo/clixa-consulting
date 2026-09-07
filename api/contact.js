/**
 * Vercel Serverless Function — réception des demandes de devis.
 *
 * Variables d'environnement à définir dans Vercel (Settings > Environment Variables) :
 *   RESEND_API_KEY   clé API Resend (https://resend.com — gratuit jusqu'à 3000 mails/mois)
 *   CONTACT_TO       destinataire des leads        (défaut : contact@clixa.ma)
 *   CONTACT_FROM     expéditeur vérifié chez Resend (défaut : onboarding@resend.dev)
 *
 * Si RESEND_API_KEY n'est pas défini, la fonction répond 503 avec
 * { code: 'NOT_CONFIGURED' } : le front bascule alors sur un mailto:
 * pré-rempli, ce qui garantit qu'aucun lead n'est jamais perdu.
 */

const MAX_LEN = 4000;

const esc = (s) =>
  String(s ?? '')
    .slice(0, MAX_LEN)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

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
      return res.status(400).json({ error: 'JSON invalide' });
    }
  }
  body = body || {};

  // Honeypot anti-spam : champ invisible rempli uniquement par les bots.
  if (body.website) return res.status(200).json({ ok: true });

  const { name, email, company, phone, topic, message } = body;

  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Nom, email et entreprise sont obligatoires.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email))) {
    return res.status(400).json({ error: 'Adresse email invalide.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ code: 'NOT_CONFIGURED', error: 'Service email non configuré.' });
  }

  const to = process.env.CONTACT_TO || 'contact@clixa.ma';
  const from = process.env.CONTACT_FROM || 'CLIXA Site <onboarding@resend.dev>';

  const html = `
    <h2 style="font-family:sans-serif">Nouvelle demande depuis le site</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td><b>Projet</b></td><td>${esc(topic)}</td></tr>
      <tr><td><b>Nom</b></td><td>${esc(name)}</td></tr>
      <tr><td><b>Entreprise</b></td><td>${esc(company)}</td></tr>
      <tr><td><b>Email</b></td><td>${esc(email)}</td></tr>
      <tr><td><b>Téléphone</b></td><td>${esc(phone) || '—'}</td></tr>
    </table>
    <p style="font-family:sans-serif;font-size:14px"><b>Message :</b><br>${esc(message).replace(/\n/g, '<br>') || '—'}</p>
    <hr><p style="font-family:sans-serif;font-size:12px;color:#666">Reçu le ${new Date().toLocaleString('fr-FR')}</p>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: String(email).slice(0, 200),
        subject: `[CLIXA] ${topic || 'Demande'} — ${String(name).slice(0, 80)} (${String(company).slice(0, 80)})`,
        html,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      console.error('Resend error', r.status, detail);
      return res.status(502).json({ error: "L'envoi a échoué." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact handler error', err);
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
}
