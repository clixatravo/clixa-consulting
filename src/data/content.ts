export interface ExpertiseItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  roleQuote?: string;
  color: string;
  badge: string;
  isFlagship?: boolean;
  image?: string;
  items: string[];
}

export interface MethodStep {
  number: string;
  title: string;
  description: string;
  details: string[];
}

export interface DigitalSolution {
  title: string;
  description: string;
  iconName: string;
}

export interface CaseStudy {
  id: string;
  tag: string;
  title: string;
  clientSector: string;
  location: string;
  metric: string;
  metricLabel: string;
  challenge: string;
  solution: string;
  results: string[];
}

export interface Engagement {
  iconName: string;
  title: string;
  description: string;
  benefit: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface AuditQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    points: number;
  }[];
}

export const BRAND = {
  name: "CLIXA CONSULTING",
  shortName: "CLIXA",
  tagline: "Transformer. Structurer. Performer.",
  heroTitle: "Conseil, Transformation & Performance",
  heroSubtitle:
    "Nous aidons les entreprises à structurer leurs processus, digitaliser leurs opérations et améliorer durablement leur performance.",
  heroBadges: [
    "Intégration ERP Odoo",
    "Développement Web & Digital",
    "AMOA & Systèmes d’Information",
    "Performance & Finance",
    "Facturation Électronique"
  ],
  mission:
    "CLIXA Consulting accompagne les dirigeants et leurs équipes dans leurs projets de transformation, de digitalisation et d’amélioration de la performance.",
  approach:
    "Nous intervenons à l’intersection de la finance, des processus, des systèmes d’information et du digital, avec une approche orientée résultats : comprendre les enjeux, structurer les solutions et accompagner leur mise en œuvre jusqu’à leur adoption opérationnelle.",
  punchline: "Du diagnostic à l’exécution, nous transformons vos enjeux en solutions concrètes.",
  
  // Contacts
  contactEmail: "contact@clixa.ma",
  phoneMaroc: "+212 661 34 40 54",
  phoneMarocRaw: "00212661344054",
  phoneMarocDisplay: "+212 6 61 34 40 54",
  phoneFrance: "+33 7 53 97 01 86",
  phoneFranceRaw: "0033753970186",
  phoneFranceDisplay: "+33 7 53 97 01 86",
  whatsappLink: "https://wa.me/212661344054?text=Bonjour%20CLIXA%20Consulting,%20je%20souhaite%20%C3%A9changer%20sur%20un%20projet.",
  
  address: "Casablanca & Paris • Interventions Maroc, France & International",
  addressMaroc: "Casablanca, Maroc",
  addressFrance: "Paris, France",
};

export const CORE_PILLARS = [
  {
    num: "01",
    title: "Intégration d'ERP Odoo",
    subtitle: "Système de gestion intégré & sur-mesure",
    desc: "Déploiement complet et paramétrage d'Odoo adapté à vos processus : Finance, CRM, Ventes, Achats, Stocks, Facturation et Tableaux de bord.",
    icon: "Database",
    image: "/images/erp-odoo.jpg",
    color: "from-blue-600 to-cyan-500",
    badge: "Pôle Majeur ERP"
  },
  {
    num: "02",
    title: "Développement Web & Communication",
    subtitle: "Présence de marque & outils web sur-mesure",
    desc: "Conception de sites web professionnels haut de gamme, plateformes métiers, automatisation de flux et stratégie de communication digitale à fort impact.",
    icon: "Globe",
    image: "/images/web-digital.jpg",
    color: "from-sky-500 to-indigo-600",
    badge: "Pôle Digital & Web"
  },
  {
    num: "03",
    title: "Assistance à Maîtrise d'Ouvrage (AMOA)",
    subtitle: "Sécurisation de vos projets technologiques",
    desc: "Faire le pont entre vos enjeux métiers et les solutions SI : cadrage des besoins, spécifications, consultation des prestataires et pilotage de la recette.",
    icon: "Layers",
    image: "/images/amoa-si.jpg",
    color: "from-indigo-600 to-blue-700",
    badge: "Pôle AMOA & SI"
  },
];

export const EXPERTISES: ExpertiseItem[] = [
  {
    id: "odoo",
    title: "Intégration d'ERP Odoo & Digitalisation",
    tagline: "Construire un système de gestion adapté à vos processus et à votre croissance.",
    description:
      "L’objectif n’est pas simplement d’installer un ERP, mais de construire un outil de pilotage réellement adapté à votre entreprise.",
    roleQuote:
      "L’objectif n’est pas simplement d’installer un ERP, mais de construire un outil de pilotage réellement adapté à votre entreprise.",
    color: "from-blue-600 to-cyan-600",
    badge: "Offre Phare • ERP Odoo",
    isFlagship: true,
    image: "/images/erp-odoo.jpg",
    items: [
      "Conseil, cadrage et intégration Odoo",
      "Finance & comptabilité analytique",
      "CRM & gestion du cycle des ventes",
      "Achats & gestion fournisseurs",
      "Stocks, logistique & inventaires",
      "Facturation & conformité fiscale",
      "Automatisation des workflows métier",
      "Reporting temps réel et tableaux de bord décisionnels",
    ],
  },
  {
    id: "digital",
    title: "Développement Web & Communication Digitale",
    tagline: "Concevoir les outils digitaux nécessaires au développement et à la notoriété de votre activité.",
    description:
      "Des solutions digitales robustes, esthétiques et orientées acquisition pour asseoir votre leadership sur vos marchés.",
    color: "from-sky-500 to-blue-600",
    badge: "Offre Phare • Web & Com",
    isFlagship: true,
    image: "/images/web-digital.jpg",
    items: [
      "Sites web professionnels corporate et vitrines prestige",
      "Plateformes digitales, portails clients & extranets",
      "Automatisation de processus opérationnels (RPA & API)",
      "Intégration d’outils métiers et interconnexions logicielles",
      "Optimisation des parcours clients et UX/UI design",
      "Communication et présence digitale de marque pour dirigeants",
    ],
  },
  {
    id: "amoa",
    title: "Assistance à Maîtrise d’Ouvrage (AMOA)",
    tagline: "Faire le lien entre les enjeux métiers et les solutions technologiques.",
    description:
      "Notre rôle : sécuriser vos projets de transformation de la définition du besoin jusqu’au déploiement.",
    roleQuote: "Notre rôle : sécuriser vos projets de transformation de la définition du besoin jusqu’au déploiement.",
    color: "from-indigo-500 to-blue-700",
    badge: "Offre Phare • AMOA SI",
    isFlagship: true,
    image: "/images/amoa-si.jpg",
    items: [
      "Cadrage stratégique des besoins métiers",
      "Analyse fonctionnelle et cartographie des exigences",
      "Rédaction des spécifications et cahiers des charges",
      "Consultation, appel d'offres et coordination des prestataires",
      "Pilotage de projets SI (PMO & gouvernance)",
      "Recette fonctionnelle et accompagnement à la mise en production",
    ],
  },
  {
    id: "finance",
    title: "Performance & Finance",
    tagline: "Donner aux dirigeants une vision claire de leur performance et les moyens de mieux décider.",
    description:
      "Aligner les indicateurs financiers et opérationnels pour piloter la croissance avec agilité, rigueur et anticipation.",
    color: "from-cyan-500 to-blue-600",
    badge: "Finance & Pilotage",
    items: [
      "Pilotage de la performance globale",
      "FP&A et contrôle de gestion stratégique",
      "Reporting et tableaux de bord de gestion",
      "Business plans et modélisation financière",
      "Optimisation des processus financiers et clôtures",
      "Accompagnement des directions financières (DAF)",
    ],
  },
  {
    id: "process",
    title: "Process & Transformation",
    tagline: "Repenser les processus pour gagner en efficacité, en maîtrise et en agilité.",
    description:
      "Supprimer les goulots d'étranglement, fluidifier la chaîne de valeur et embarquer les équipes dans un changement pérenne.",
    color: "from-cyan-500 to-teal-600",
    badge: "Organisation & Process",
    items: [
      "Diagnostic organisationnel complet",
      "Cartographie et optimisation des processus",
      "Conception des processus cibles",
      "Formalisation des procédures opératoires",
      "Transformation des fonctions Finance, Achats et Ventes",
      "Accompagnement au changement et adoption terrain",
    ],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "odoo-distribution",
    tag: "ERP Odoo & Supply Chain",
    title: "Déploiement Odoo multi-sites & automatisation logistique",
    clientSector: "Industrie & Négoce B2B",
    location: "Casablanca • 120 collaborateurs",
    metric: "-45%",
    metricLabel: "de temps sur le cycle commande-livraison",
    challenge: "Outils disparates, ruptures de stocks fréquentes, ressaisies manuelles entre commercial et comptabilité.",
    solution: "Cadrage complet et intégration modulaire d'Odoo V17 (CRM, Achats, Stocks, Ventes, Comptabilité analytique) et formation intensive.",
    results: [
      "Visibilité des stocks en temps réel sur 3 entrepôts",
      "Facturation et lettrage 100% automatisés",
      "Adoption complète des équipes en moins de 6 semaines"
    ]
  },
  {
    id: "finance-fpa",
    tag: "Performance & Finance",
    title: "Refonte du contrôle de gestion & reporting décisionnel",
    clientSector: "Société de Services & Ingénierie",
    location: "Paris • 45 M€ de CA",
    metric: "3 jours",
    metricLabel: "pour la clôture mensuelle (vs 14 jours auparavant)",
    challenge: "Prolifération de fichiers Excel non sécurisés, retards de reporting et absence de visibilité trésorerie pour les associés.",
    solution: "Audit des processus financiers, modélisation budgétaire sur-mesure et mise en place de tableaux de bord Power BI connectés au SI.",
    results: [
      "Anticipation trésorerie fiabilisée à 98% sur 12 mois glissants",
      "Pilotage de la marge par projet et par centre de profit",
      "Temps de production des comptes rendus divisé par 4"
    ]
  },
  {
    id: "amoa-refonte",
    tag: "AMOA & Systèmes d'Information",
    title: "Cadrage et sélection d'un nouvel écosystème SI",
    clientSector: "Groupe de Distribution Multi-Pays",
    location: "Maroc & France • 3 filiales",
    metric: "100%",
    metricLabel: "du budget et des délais respectés",
    challenge: "Risque de surcoûts et dérives lors de la consultation des éditeurs pour remplacer un ERP obsolète.",
    solution: "Assistance Maîtrise d'Ouvrage indépendante : cartographie des processus cibles, rédaction du cahier des charges, appel d'offres et pilotage de la recette.",
    results: [
      "Économie de 22% sur les devis intégrateurs initiaux négociés",
      "Matrice d'alignement métier/technologie validée par la DG",
      "Zéro litige contractuel avec le prestataire retenu"
    ]
  }
];

export const ENGAGEMENTS: Engagement[] = [
  {
    iconName: "ShieldCheck",
    title: "Confidentialité Absolue (NDA)",
    description: "Protection rigoureuse de vos données stratégiques, financières et technologiques dès le premier échange.",
    benefit: "Accord de confidentialité formalisé systématique"
  },
  {
    iconName: "ClockCheck",
    title: "Maîtrise Délais & Budgets",
    description: "Un cadrage contractuel transparent avec jalons précis : aucune dérive budgétaire imprévue.",
    benefit: "Engagement forfaitaire et livrables contractuels"
  },
  {
    iconName: "Users",
    title: "Transfert & Souveraineté",
    description: "Notre objectif est de rendre vos équipes totalement autonomes après le go-live, sans dépendance captive.",
    benefit: "Guides opératoires et formations certifiantes"
  },
  {
    iconName: "TrendingUp",
    title: "Approche Orientée ROI",
    description: "Chaque action de structuration ou d'outil digital doit générer un gain de productivité ou de rentabilité mesurable.",
    benefit: "Indicateurs de succès définis dès le diagnostic"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    category: "ERP & Déploiement",
    question: "Combien de temps prend généralement une implémentation d'ERP Odoo ?",
    answer: "Selon la taille de votre entreprise et le périmètre retenu (3 à 8 modules), un déploiement standard dure entre 2 et 4 mois. Notre méthodologie itérative en 4 phases (Comprendre, Concevoir, Déployer, Sécuriser) permet de mettre en production de premières briques fonctionnelles dès les premières semaines pour un ROI rapide."
  },
  {
    category: "AMOA & Méthode",
    question: "En quoi consiste l'intervention de CLIXA en Assistance à Maîtrise d'Ouvrage (AMOA) ?",
    answer: "Nous agissons en tant que tiers de confiance indépendant aux côtés de votre Direction Générale. Nous traduisons vos besoins métiers en exigences techniques claires, rédigeons le cahier des charges, sélectionnons et coordonnons les intégrateurs, et menons les tests de recette fonctionnelle pour sécuriser votre investissement de bout en bout."
  },
  {
    category: "Présence & Disponibilité",
    question: "Vos consultants interviennent-ils sur site au Maroc et en France ?",
    answer: "Absolument. Avec nos bureaux à Casablanca et à Paris, nous combinons présence physique dans vos locaux pour les étapes clés (ateliers de cadrage, formations, comités de pilotage) et suivi opérationnel agile pour garantir réactivité et proximité culturelle."
  },
  {
    category: "Accompagnement au Changement",
    question: "Comment garantissez-vous que nos équipes adopteront le nouvel outil ?",
    answer: "L'outil n'est qu'un moyen ; le succès réside dans l'adhésion des utilisateurs. Nous impliquons vos collaborateurs dès le diagnostic initial, adaptons l'ergonomie à leurs habitudes de travail, rédigeons des modes opératoires simplifiés et assurons un accompagnement post-démarrage ('hypercare') jusqu'à l'autonomie totale."
  },
  {
    category: "Coût & Modalités",
    question: "Comment sont facturées vos prestations de conseil et d'intégration ?",
    answer: "Nous privilégions des engagements clairs au forfait avec livrables contractuels garantis, évitant toute surprise budgétaire. Avant toute mission, nous réalisons un échange de cadrage gratuit afin d'établir un devis détaillé et une feuille de route réaliste."
  }
];

export const AUDIT_QUESTIONS: AuditQuestion[] = [
  {
    id: 1,
    question: "Comment pilotez-vous actuellement vos processus et votre activité ?",
    options: [
      { text: "Tableurs Excel multiples, échanges d'emails et ressaisies manuelles fréquentes", points: 1 },
      { text: "Outils logiciels séparés (CRM d'un côté, comptabilité de l'autre) avec peu d'automatisation", points: 2 },
      { text: "ERP ou système centralisé unifié avec des flux automatisés", points: 3 }
    ]
  },
  {
    id: 2,
    question: "Quel est le délai moyen de vos clôtures financières et reportings mensuels ?",
    options: [
      { text: "Plus de 10 à 15 jours après la fin du mois, avec un stress important", points: 1 },
      { text: "Entre 5 et 10 jours, nécessitant des ajustements manuels réguliers", points: 2 },
      { text: "Moins de 5 jours ouvrés grâce à des tableaux de bord automatisés et temps réel", points: 3 }
    ]
  },
  {
    id: 3,
    question: "Où en est votre entreprise face aux projets digitaux et à la facturation électronique ?",
    options: [
      { text: "Aucun cadrage préalable réalisé, processus encore largement papier ou PDF classique", points: 1 },
      { text: "Projets identifiés mais manque de temps ou de ressources internes pour cadrer et piloter", points: 2 },
      { text: "Feuille de route claire, partenaires coordonnés et conformité anticipée", points: 3 }
    ]
  }
];

export const FACTURATION_ELECTRONIQUE_STEPS = [
  {
    step: "01",
    title: "Diagnostic des processus existants",
    desc: "Audit de vos circuits de facturation clients et fournisseurs, volumétrie et conformité actuelle.",
  },
  {
    step: "02",
    title: "Cartographie des flux entrants et sortants",
    desc: "Schématisation exhaustive des points de contact, formats documentaires et intervenants.",
  },
  {
    step: "03",
    title: "Analyse des impacts métiers et SI",
    desc: "Identification des écarts techniques, réglementaires et des impacts sur la charge des équipes.",
  },
  {
    step: "04",
    title: "Définition de l’architecture cible",
    desc: "Sélection des plateformes (PPF, PDP, OD), formats (Factur-X, UBL) et schéma d’interconnexion.",
  },
  {
    step: "05",
    title: "Coordination ERP, plateformes & prestataires",
    desc: "Pilotage transverse des éditeurs, intégrateurs et prestataires tiers.",
  },
  {
    step: "06",
    title: "Préparation des tests et de la recette",
    desc: "Cahier de tests unitaires et de bout en bout, simulation des cas nominaux et d'erreurs.",
  },
  {
    step: "07",
    title: "Accompagnement jusqu’à la mise en production",
    desc: "Formation des utilisateurs, assistance au démarrage et sécurisation des flux légaux.",
  },
];

export const SOLUTIONS_DIGITALES: DigitalSolution[] = [
  {
    title: "Sites Web Professionnels",
    description: "Vitrines et portails corporate sur-mesure, conçus pour asseoir votre crédibilité et convertir vos cibles.",
    iconName: "Globe",
  },
  {
    title: "Plateformes Digitales & Extranets",
    description: "Espaces clients, portails partenaires et applications web dédiées pour fluidifier vos échanges.",
    iconName: "LayoutGrid",
  },
  {
    title: "Automatisation de Processus (RPA & API)",
    description: "Élimination des tâches manuelles à faible valeur ajoutée et synchronisation automatisée de vos données.",
    iconName: "Cpu",
  },
  {
    title: "Intégration d’Outils Métiers",
    description: "Connexion transparente de vos CRM, outils de ticketing, solutions de paiement et logiciels spécialisés.",
    iconName: "Layers",
  },
  {
    title: "Optimisation des Parcours Clients",
    description: "Audit UX/UI et refonte des interactions pour fluidifier l'expérience et booster l'engagement.",
    iconName: "Zap",
  },
  {
    title: "Communication & Présence Digitale",
    description: "Stratégie de contenu, positionnement de marque et leviers d'acquisition adaptés aux dirigeants B2B.",
    iconName: "Megaphone",
  },
];

export const METHODE_STEPS: MethodStep[] = [
  {
    number: "01",
    title: "Comprendre",
    description: "Analyser votre organisation, vos processus, vos outils et vos enjeux.",
    details: [
      "Interviews avec les parties prenantes clés",
      "Audit des processus et des flux de données",
      "Évaluation de la maturité technologique",
      "Identification des irritants et priorités ROI",
    ],
  },
  {
    number: "02",
    title: "Concevoir",
    description: "Définir une solution cible réaliste, structurée et adaptée à votre entreprise.",
    details: [
      "Modélisation des processus cibles",
      "Cahier des charges et roadmap opérationnelle",
      "Choix des briques logicielles et partenaires",
      "Plan de conduite du changement",
    ],
  },
  {
    number: "03",
    title: "Déployer",
    description: "Piloter la mise en œuvre avec vos équipes et vos partenaires.",
    details: [
      "Gouvernance agile et gestion de projet PMO",
      "Paramétrage, intégration et développement",
      "Recette fonctionnelle rigoureuse",
      "Montée en compétences et formation des équipes",
    ],
  },
  {
    number: "04",
    title: "Sécuriser",
    description: "Tester, mesurer, accompagner l’adoption et pérenniser les résultats.",
    details: [
      "Suivi post-démarrage et assistance hypercare",
      "Mesure des KPIs d'adoption et d'impact financier",
      "Ajustements continus et formalisation des savoirs",
      "Pérennisation de la trajectoire de croissance",
    ],
  },
];

export const WHY_CLIXA_CHAIN = [
  { step: "Stratégie", desc: "Vision claire des objectifs business et du positionnement cible." },
  { step: "Processus", desc: "Flux optimisés, documentés et centrés sur la fluidité opérationnelle." },
  { step: "Finance", desc: "Rentabilité, pilotage budgétaire et maîtrise des coûts mesurables." },
  { step: "SI", desc: "Outils performants, intégrés et adaptés aux besoins métiers réels." },
  { step: "Exécution", desc: "Mise en œuvre concrète, adoption terrain et résultats durables." },
];
