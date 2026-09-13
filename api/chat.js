/**
 * Vercel Serverless Function — l'assistant IA du site.
 *
 * Il répond sur deux sujets, et seulement ceux-là : les offres de CLIXA
 * Consulting (lues dans le contenu du site) et les formations de CLIXA
 * Institute (lues en direct sur clixa.africa). Pour tout le reste — un devis,
 * une inscription, un cas particulier — il renvoie vers l'équipe.
 *
 * Entrée  : POST { messages: [{ role: 'user'|'assistant', content }] }
 * Sortie  : le texte de la réponse, en flux (text/plain), ou une erreur JSON.
 */

import { CONNAISSANCES_CONSULTING } from './_consulting.js';
import { catalogueFormations } from './_formations.js';
import { repondreEnFlux } from './_gemini.js';

const MAX_MESSAGES = 16;
const MAX_CARACTERES = 1500;

/*
  Limite par visiteur, en mémoire de l'instance. Elle n'arrête pas un robot
  déterminé (plusieurs instances, IP changeantes), mais elle empêche un seul
  onglet de consommer en quelques minutes le quota gratuit du jour.
*/
const FENETRE_MS = 10 * 60 * 1000;
const MAX_PAR_FENETRE = 20;
const appels = new Map();

const tropDAppels = (ip) => {
  const maintenant = Date.now();
  const recents = (appels.get(ip) ?? []).filter((t) => maintenant - t < FENETRE_MS);
  recents.push(maintenant);
  appels.set(ip, recents);
  if (appels.size > 5000) appels.clear();
  return recents.length > MAX_PAR_FENETRE;
};

const consignes = (catalogue) => `Tu es l'assistant du site www.clixaconseil.com, pour le groupe CLIXA :
- CLIXA Consulting : cabinet de conseil (ERP Odoo, AMOA, digital, finance, facturation électronique).
- CLIXA Institute (www.clixa.africa) : formations exécutives et certifiantes en ligne.

Règles, sans exception :
1. Réponds UNIQUEMENT à partir des informations ci-dessous. N'invente jamais un prix, une date, une durée, une place disponible, un nom de client ou un engagement. Si l'information n'y est pas, dis-le simplement et propose de contacter l'équipe.
2. Réponds dans la langue et l'alphabet du visiteur. S'il écrit en darija (même en lettres latines, ex. « wach kayn », « ch7al »), réponds en darija dans le même alphabet ; en arabe, en arabe ; en anglais, en anglais ; sinon en français.
3. Sois bref et concret : 2 à 6 phrases, ou une courte liste. Pas de longs paragraphes.
4. Quand tu cites une formation, donne le lien de sa page.
5. Pour un devis, une inscription, un rendez-vous ou un cas particulier, oriente vers : le formulaire « Demande de devis » du site, WhatsApp https://wa.me/212661344054, ou contact@clixaconseil.com.
6. Ne demande jamais de données personnelles (nom, téléphone, email) dans la conversation.
7. Hors sujet (autre que CLIXA, ses offres ou ses formations) : décline poliment en une phrase.
8. Mise en forme : texte simple, **gras** pour l'essentiel, listes avec « - ». Écris les liens en adresse brute (https://…), sans crochets. Pas de titres, pas de tableaux.

Nous sommes le ${new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeZone: 'Africa/Casablanca' }).format(new Date())}.

=== INFORMATIONS CLIXA CONSULTING ===
${CONNAISSANCES_CONSULTING}

=== INFORMATIONS CLIXA INSTITUTE ===
${catalogue}`;

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

  const messages = Array.isArray(body?.messages) ? body.messages.slice(-MAX_MESSAGES) : [];
  const valides =
    messages.length > 0 &&
    messages.every(
      (m) =>
        (m?.role === 'user' || m?.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0 &&
        m.content.length <= MAX_CARACTERES,
    ) &&
    messages[messages.length - 1].role === 'user';
  if (!valides) return res.status(400).json({ error: 'Message invalide.' });

  // Gemini exige que la conversation commence par l'utilisateur.
  while (messages[0].role !== 'user') messages.shift();

  const ip = String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || 'inconnue';
  if (tropDAppels(ip)) {
    return res
      .status(429)
      .json({ error: 'Beaucoup de messages en peu de temps. Réessayez dans quelques minutes.' });
  }

  let flux;
  try {
    flux = await repondreEnFlux({ systeme: consignes(await catalogueFormations()), messages });
  } catch (err) {
    console.error('assistant', err.status, err.message);
    if (err.status === 503) {
      return res.status(503).json({ code: 'NOT_CONFIGURED', error: 'Assistant non configuré.' });
    }
    if (err.status === 429) {
      return res
        .status(429)
        .json({ error: "L'assistant est très sollicité. Réessayez dans un instant ou écrivez-nous sur WhatsApp." });
    }
    return res.status(502).json({ error: "L'assistant ne répond pas pour le moment." });
  }

  res.writeHead(200, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  try {
    for await (const morceau of flux) res.write(morceau);
  } catch (err) {
    console.error('assistant flux', err);
    res.write("\n\n(La réponse a été interrompue. Vous pouvez reposer la question.)");
  }
  res.end();
}
