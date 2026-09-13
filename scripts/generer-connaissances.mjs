/**
 * Écrit api/_consulting.js : ce que l'assistant sait du cabinet.
 *
 * La source est src/data/content.ts, le même fichier que le site affiche.
 * L'assistant ne peut donc pas décrire une offre que la page ne montre pas,
 * ni en oublier une qu'on vient d'y ajouter — à condition de relancer ce
 * script, ce que `npm run build` fait avant chaque build.
 *
 * Le fichier généré est commité : la fonction Vercel le lit tel quel, sans
 * dépendre de l'ordre dans lequel Vercel construit le site et les fonctions.
 *
 * Node lit le TypeScript directement (suppression des types, Node ≥ 22.18).
 *
 *   node scripts/generer-connaissances.mjs
 */
import { writeFileSync } from 'node:fs';

const c = await import('../src/data/content.ts');
const B = c.BRAND;

const liste = (items) => items.map((i) => `  - ${i}`).join('\n');

const sections = [
  `# CLIXA Consulting (www.clixaconseil.com)
${B.mission}
${B.approach}
Devise : ${B.punchline}
Implantations : ${B.address}
Contact : ${B.contactEmail} · Maroc ${B.phoneMarocDisplay} · France ${B.phoneFranceDisplay} · WhatsApp ${B.whatsappLink.split('?')[0]}`,

  `# Expertises\n` +
    c.EXPERTISES.map(
      (e) => `## ${e.title}\n${e.tagline}\n${e.description}\n${liste(e.items)}`,
    ).join('\n\n'),

  `# Solutions digitales\n` +
    c.SOLUTIONS_DIGITALES.map((s) => `- ${s.title} : ${s.description}`).join('\n'),

  `# Facturation électronique — démarche\n` +
    c.FACTURATION_ELECTRONIQUE_STEPS.map((s) => `${s.step}. ${s.title} : ${s.desc}`).join('\n'),

  `# Secteurs accompagnés\n` +
    c.SECTEURS.map(
      (s) => `## ${s.title}\n${s.subtitle}\nEnjeux :\n${liste(s.challenges ?? [])}`,
    ).join('\n\n'),

  `# Méthode en 4 étapes\n` +
    c.METHODE_STEPS.map((m) => `${m.number}. ${m.title} : ${m.description}`).join('\n'),

  `# Engagements\n` + c.ENGAGEMENTS.map((e) => `- ${e.title} : ${e.description}`).join('\n'),

  `# Questions fréquentes\n` +
    c.FAQ_ITEMS.map((f) => `Q : ${f.question}\nR : ${f.answer}`).join('\n\n'),
];

const texte = sections.join('\n\n');

writeFileSync(
  new URL('../api/_consulting.js', import.meta.url),
  `// Généré par scripts/generer-connaissances.mjs depuis src/data/content.ts.\n` +
    `// Ne pas modifier à la main : relancer le script.\n` +
    `export const CONNAISSANCES_CONSULTING = ${JSON.stringify(texte)};\n`,
);

console.log(`api/_consulting.js : ${texte.length} caractères`);
