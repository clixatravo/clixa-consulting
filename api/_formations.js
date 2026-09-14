/**
 * Le catalogue de CLIXA Institute, lu en direct sur www.clixa.africa.
 *
 * Les formations, leurs sessions et leurs tarifs vivent dans le CMS de
 * clixa.africa, qui les expose en lecture publique (API REST de Payload).
 * L'assistant les lit de là plutôt que d'une copie : une session ajoutée, un
 * prix changé ou une place prise sont connus au plus tard 10 minutes après,
 * sans redéployer ce site.
 *
 * Seuls les champs utiles à un prospect sont gardés. `lienVisio` en
 * particulier n'est jamais transmis au modèle : c'est un accès réservé aux
 * inscrits.
 */

const SOURCE = 'https://www.clixa.africa';
const DUREE_CACHE_MS = 10 * 60 * 1000;

/** Miroir de MOYENS_AFFICHES, platform/src/lib/moyens.ts sur clixa.africa. */
const MOYENS_ACCEPTES = ['Carte bancaire', 'Virement bancaire', 'Western Union · Ria · MoneyGram'];

let cache = { texte: null, expire: 0 };

const lire = async (chemin) => {
  const reponse = await fetch(`${SOURCE}${chemin}`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(8000),
  });
  if (!reponse.ok) throw new Error(`${chemin} → ${reponse.status}`);
  return reponse.json();
};

const valeurs = (tableau) => (tableau ?? []).map((x) => x.valeur).filter(Boolean);

const date = (iso) =>
  new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso));

const MODE = { visio: 'Classe virtuelle (en ligne, en direct)', presentiel: 'Présentiel' };

const decrireSession = (s) => {
  const lieu = s.mode === 'presentiel' ? [s.ville, s.pays].filter(Boolean).join(', ') : '';
  const libres =
    typeof s.capacite === 'number' ? Math.max(0, s.capacite - (s.placesReservees ?? 0)) : null;
  return [
    `  - ${MODE[s.mode] ?? s.mode}${lieu ? ` — ${lieu}` : ''}`,
    `du ${date(s.debut)} au ${date(s.fin)}`,
    s.cadence ? `rythme : ${s.cadence}` : '',
    s.fuseau ? `(horaires ${s.fuseau})` : '',
    typeof s.prix === 'number' ? `prix : ${s.prix} ${s.devise ?? ''}`.trim() : '',
    libres !== null ? `places disponibles : ${libres}` : '',
  ]
    .filter(Boolean)
    .join(' · ');
};

const decrireProgramme = (p, specialisations, sessions) => {
  const lignes = [
    `## ${p.titre}`,
    `Page : ${SOURCE}/formations/${p.slug}`,
    `Spécialisation : ${specialisations.get(p.specialisation) ?? '—'}`,
    p.certification ? `Certification préparée : ${p.certification}` : '',
    p.accroche ? `En bref : ${p.accroche}` : '',
    p.positionnement ? `Positionnement : ${p.positionnement}` : '',
    p.dureeHeures ? `Durée : ${p.dureeHeures} heures` : '',
    p.rythme ? `Format : ${p.rythme}` : '',
    p.langue ? `Langue : ${p.langue}` : '',
    p.objectifs ? `Objectifs : ${p.objectifs}` : '',
    valeurs(p.publicVise).length ? `Public visé : ${valeurs(p.publicVise).join(' ; ')}` : '',
    p.prerequis ? `Prérequis : ${p.prerequis}` : '',
    valeurs(p.competences).length ? `Compétences : ${valeurs(p.competences).join(' ; ')}` : '',
    valeurs(p.livrables).length ? `Livrables : ${valeurs(p.livrables).join(' ; ')}` : '',
    valeurs(p.approche).length ? `Pédagogie : ${valeurs(p.approche).join(' ')}` : '',
    valeurs(p.debouches).length ? `Bénéfices : ${valeurs(p.debouches).join(' ; ')}` : '',
    (p.modules ?? []).length
      ? `Programme :\n${p.modules
          .map((m) => `  - ${m.titre}${m.objectif ? ` — ${m.objectif}` : ''}`)
          .join('\n')}`
      : '',
    sessions.length
      ? `Sessions ouvertes :\n${sessions.map(decrireSession).join('\n')}`
      : 'Sessions ouvertes : aucune date publiée pour le moment.',
  ];
  return lignes.filter(Boolean).join('\n');
};

const decrireTarifs = (t) => {
  if (!t?.plans?.length) return '';
  const plans = t.plans
    .map(
      (p) =>
        `  - ${p.libelle} : ${p.total} ${t.devise} (${p.echeances
          .map((e) => `${e.montant} ${t.devise}`)
          .join(' + ')}) — ${p.conditions}`,
    )
    .join('\n');
  return [
    `# Tarifs et paiement (CLIXA Institute)`,
    t.prixComptant ? `Prix de référence d'un parcours payé comptant : ${t.prixComptant} ${t.devise}` : '',
    `Facilités de paiement :\n${plans}`,
    /*
      ⚠️ Pas `moyensPaiement` du CMS : il porte encore « Western Union, Ria,
      MoneyGram », la liste d'avant le 28 août 2026, masquée dans /admin et
      retirée de la fiche. Recopiée, elle faisait répondre à qui voulait payer
      par carte que ce n'était pas possible. La liste vraie vit dans le code de
      clixa.africa (platform/src/lib/moyens.ts) ; à reporter ici si elle change.
    */
    `Moyens de paiement acceptés : ${MOYENS_ACCEPTES.join(', ')}`,
  ]
    .filter(Boolean)
    .join('\n');
};

const construire = async () => {
  const [programmes, specs, sessions, tarifs] = await Promise.all([
    lire('/api/programmes?limit=100&depth=0&where[_status][equals]=published'),
    lire('/api/specialisations?limit=100&depth=0'),
    lire('/api/sessions?limit=200&depth=0&sort=debut'),
    lire('/api/globals/tarifs?depth=0').catch(() => null),
  ]);

  const specialisations = new Map(specs.docs.map((s) => [s.id, s.nom]));
  const maintenant = Date.now();
  const sessionsDe = (id) =>
    sessions.docs.filter((s) => s.programme === id && new Date(s.fin).getTime() > maintenant);

  return [
    `# CLIXA Institute (www.clixa.africa)`,
    `Formations exécutives et certifiantes pour cadres et dirigeants. ${programmes.docs.length} formations au catalogue.`,
    `Inscription et informations : ${SOURCE}/formations`,
    decrireTarifs(tarifs),
    programmes.docs.map((p) => decrireProgramme(p, specialisations, sessionsDe(p.id))).join('\n\n'),
  ]
    .filter(Boolean)
    .join('\n\n');
};

/**
 * Le catalogue en texte, depuis le cache s'il est frais.
 *
 * Si clixa.africa ne répond pas, on garde la dernière version connue plutôt
 * que de répondre sans catalogue ; s'il n'y en a aucune, on le dit au modèle,
 * qui renverra alors vers l'équipe au lieu d'inventer.
 */
export async function catalogueFormations() {
  if (cache.texte && Date.now() < cache.expire) return cache.texte;
  try {
    const texte = await construire();
    cache = { texte, expire: Date.now() + DUREE_CACHE_MS };
    return texte;
  } catch (err) {
    console.error('catalogue clixa.africa', err);
    return (
      cache.texte ??
      '# CLIXA Institute\nLe catalogue des formations est momentanément indisponible. ' +
        'Pour toute question sur les formations, renvoyer vers https://www.clixa.africa/formations ou vers l’équipe.'
    );
  }
}
