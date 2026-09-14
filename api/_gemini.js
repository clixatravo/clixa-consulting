/**
 * Appel à Gemini (Google AI Studio), réponse en flux.
 *
 * Gemini parce qu'il a une offre gratuite sans carte bancaire, suffisante pour
 * l'assistant d'un site vitrine. En contrepartie, Google peut utiliser les
 * échanges de l'offre gratuite pour améliorer ses modèles : l'assistant ne
 * demande donc aucune donnée personnelle, et renvoie vers le formulaire ou
 * WhatsApp pour tout ce qui en réclame.
 *
 * Variables d'environnement :
 *   GEMINI_API_KEY   clé créée sur https://aistudio.google.com/apikey
 *   GEMINI_MODEL     facultatif, pour forcer un modèle précis
 */

/*
  ⚠️ Plusieurs modèles, essayés dans l'ordre. Google renomme et retire ses
  modèles régulièrement : un nom en dur qui disparaît rendrait l'assistant
  muet du jour au lendemain. Un 404 (modèle inconnu), un 429 (quota épuisé)
  ou une erreur 5xx (modèle surchargé, fréquent aux heures de pointe) fait
  passer au suivant ; une autre erreur est remontée.

  Flash d'abord : Flash-Lite répondait en français à une question posée en
  anglais et mêlait les alphabets en darija. Son quota gratuit est plus
  large, il prend donc le relais quand celui de Flash est épuisé pour la
  journée — l'assistant perd en finesse, il ne se tait pas.
*/
const MODELES = [
  process.env.GEMINI_MODEL,
  'gemini-flash-latest',
  'gemini-2.5-flash',
  'gemini-flash-lite-latest',
  'gemini-2.5-flash-lite',
].filter(Boolean);

export class ErreurGemini extends Error {
  /**
   * @param {string} message
   * @param {number} status
   * @param {{ nonConfigure?: boolean }} [options]
   */
  constructor(message, status, { nonConfigure = false } = {}) {
    super(message);
    this.status = status;
    /*
      ⚠️ Distinct du statut. Gemini répond lui-même 503 quand un modèle est
      surchargé : confondre les deux faisait annoncer au visiteur un assistant
      « en cours de mise en service » alors qu'il l'était depuis longtemps.
    */
    this.nonConfigure = nonConfigure;
  }
}

const REESSAYABLE = (status) => status === 404 || status === 429 || status >= 500;

/**
 * @param {{ systeme: string, messages: { role: 'user'|'assistant', content: string }[] }} demande
 * @returns {Promise<AsyncGenerator<string>>} les morceaux de texte, au fil de l'eau
 */
export async function repondreEnFlux({ systeme, messages }) {
  const cle = process.env.GEMINI_API_KEY;
  if (!cle) throw new ErreurGemini('GEMINI_API_KEY absente', 503, { nonConfigure: true });

  const corps = JSON.stringify({
    systemInstruction: { parts: [{ text: systeme }] },
    contents: messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    })),
    generationConfig: { temperature: 0.3, maxOutputTokens: 900 },
  });

  let derniere;
  for (const modele of MODELES) {
    const reponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modele}:streamGenerateContent?alt=sse`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': cle },
        body: corps,
        signal: AbortSignal.timeout(45000),
      },
    );
    if (reponse.ok) return lireFlux(reponse.body);

    derniere = new ErreurGemini(`${modele} → ${reponse.status} ${await reponse.text()}`, reponse.status);
    if (!REESSAYABLE(reponse.status)) break;
  }
  throw derniere;
}

async function* lireFlux(flux) {
  const decodeur = new TextDecoder();
  let tampon = '';
  for await (const morceau of flux) {
    tampon += decodeur.decode(morceau, { stream: true });
    let fin;
    while ((fin = tampon.indexOf('\n')) !== -1) {
      const ligne = tampon.slice(0, fin).trim();
      tampon = tampon.slice(fin + 1);
      if (!ligne.startsWith('data:')) continue;
      try {
        const donnees = JSON.parse(ligne.slice(5));
        const texte = (donnees.candidates?.[0]?.content?.parts ?? [])
          .map((p) => (p.thought ? '' : p.text ?? ''))
          .join('');
        if (texte) yield texte;
      } catch {
        // Ligne partielle ou événement sans texte : on l'ignore.
      }
    }
  }
}
