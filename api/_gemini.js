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
  muet du jour au lendemain. Un 404 (modèle inconnu) ou un 429 (quota du
  modèle épuisé) fait passer au suivant ; toute autre erreur est remontée.
  Les « -lite » d'abord : le quota gratuit y est le plus large.
*/
const MODELES = [
  process.env.GEMINI_MODEL,
  'gemini-flash-lite-latest',
  'gemini-flash-latest',
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash',
].filter(Boolean);

export class ErreurGemini extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

/**
 * @param {{ systeme: string, messages: { role: 'user'|'assistant', content: string }[] }} demande
 * @returns {Promise<AsyncGenerator<string>>} les morceaux de texte, au fil de l'eau
 */
export async function repondreEnFlux({ systeme, messages }) {
  const cle = process.env.GEMINI_API_KEY;
  if (!cle) throw new ErreurGemini('GEMINI_API_KEY absente', 503);

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
    if (reponse.status !== 404 && reponse.status !== 429) break;
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
