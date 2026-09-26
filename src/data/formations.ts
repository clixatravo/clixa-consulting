export interface FormationProgramme {
  id: string;
  titre: string;
  slug: string;
  specialisation: string;
  specialisationCode: number;
  dureeHeures: number;
  sessionsCount: number;
  certification: string | null;
  accroche: string;
  positionnement: string;
  image: string;
  publicVise: string[];
  competences: string[];
  prixComptant: number;
  devise: string;
  plans: {
    libelle: string;
    total: number;
    conditions: string;
  }[];
}

export const TARIFS_INSTITUTE = {
  prixComptant: 423,
  devise: "EUR",
  deviseMadApprox: "4 600 MAD",
  plans: [
    {
      code: "P1",
      libelle: "1 tranche (Comptant)",
      total: 423,
      echeances: "423 €",
      conditions: "Paiement intégral à la signature"
    },
    {
      code: "P2",
      libelle: "2 tranches",
      total: 448,
      echeances: "224 € + 224 €",
      conditions: "1re échéance à la signature ; 2e avant la 5e séance"
    },
    {
      code: "P3",
      libelle: "3 tranches",
      total: 470,
      echeances: "170 € + 150 € + 150 €",
      conditions: "1re à la signature ; 2e avant la 4e séance ; 3e avant la 7e séance"
    }
  ],
  moyensPaiement: ["Carte bancaire", "Virement bancaire international", "Western Union · Ria · MoneyGram"],
  format: "100 % en ligne • Classes virtuelles interactives en direct (live)",
  rythme: "Séances du soir ou weekend adaptées aux professionnels en activité",
  sourceUrl: "https://www.clixa.africa"
};

export const FORMATIONS_CATALOGUE: FormationProgramme[] = [
  {
    id: "daf",
    titre: "Directeur Administratif et Financier (DAF)",
    slug: "directeur-administratif-et-financier",
    specialisation: "Finance, Audit & Contrôle de Gestion",
    specialisationCode: 8,
    dureeHeures: 32,
    sessionsCount: 8,
    certification: null,
    accroche: "Parcours exécutif • 32 heures • 8 séances live • 100 % en ligne",
    positionnement: "Piloter la direction financière, le BFR, les relations bancaires et la stratégie financière globale de l'entreprise.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    publicVise: ["Responsables Financiers", "Chefs Comptables", "Contrôleurs de Gestion Seniors", "Directeurs Généraux"],
    competences: [
      "Modélisation et prévision de trésorerie",
      "Optimisation du BFR et ratios de solvabilité",
      "Négociation des financements et covenants bancaires",
      "Clôtures comptables et conformité fiscale"
    ],
    prixComptant: 423,
    devise: "EUR",
    plans: TARIFS_INSTITUTE.plans
  },
  {
    id: "pmp",
    titre: "Préparation à la certification PMP®",
    slug: "preparation-a-la-certification-pmp",
    specialisation: "Management de Projets",
    specialisationCode: 2,
    dureeHeures: 35,
    sessionsCount: 8,
    certification: "PMP® — Project Management Institute",
    accroche: "35 heures • 100 % en ligne • 8 sessions live + test à blanc • PMBOK v8",
    positionnement: "Préparer et réussir l'examen PMP® du Project Management Institute avec validation des 35 heures de formation obligatoires.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    publicVise: ["Chefs de projet", "Directeurs de programme", "Ingénieurs", "Consultants PMO"],
    competences: [
      "Maîtrise du standard PMBOK (v7 & v8)",
      "Méthodes prédictives, agiles (Scrum) et hybrides",
      "Gestion des risques, coûts (EVM) et délais",
      "Entraînement intensif aux simulations d'examen PMP"
    ],
    prixComptant: 423,
    devise: "EUR",
    plans: TARIFS_INSTITUTE.plans
  },
  {
    id: "controle-gestion",
    titre: "Directeur Contrôle de Gestion",
    slug: "directeur-controle-de-gestion",
    specialisation: "Finance, Audit & Contrôle de Gestion",
    specialisationCode: 8,
    dureeHeures: 32,
    sessionsCount: 8,
    certification: null,
    accroche: "Parcours exécutif • 32 heures • 8 séances live • 100 % en ligne",
    positionnement: "Structurer le pilotage de la performance, les tableaux de bord de gestion et le processus budgétaire de bout en bout.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    publicVise: ["Contrôleurs de gestion", "Analystes financiers", "Responsables de département"],
    competences: [
      "Construction budgétaire et forecast glissant",
      "Calcul des coûts de revient et marges par activité",
      "Conception de dashboards exécutifs (KPIs)",
      "Dialogue de gestion avec les directions opérationnelles"
    ],
    prixComptant: 423,
    devise: "EUR",
    plans: TARIFS_INSTITUTE.plans
  },
  {
    id: "directeur-projets",
    titre: "Directeur de Projets",
    slug: "directeur-de-projets",
    specialisation: "Management de Projets",
    specialisationCode: 2,
    dureeHeures: 32,
    sessionsCount: 8,
    certification: null,
    accroche: "Parcours exécutif • 32 heures • 8 séances live • 100 % en ligne",
    positionnement: "Gouvernance de portefeuilles de projets complexes, cadrage stratégique, allocation des ressources et gestion des comités de pilotage.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    publicVise: ["Chefs de projet seniors", "Responsables PMO", "Directeurs techniques"],
    competences: [
      "Pilotage stratégique de portefeuille (PPM)",
      "Arbitrage budgétaire et allocation multi-ressources",
      "Gestion des parties prenantes et comités de direction",
      "Sécurisation des jalons contractuels et UAT"
    ],
    prixComptant: 423,
    devise: "EUR",
    plans: TARIFS_INSTITUTE.plans
  },
  {
    id: "directeur-industriel",
    titre: "Directeur Industriel",
    slug: "directeur-industriel",
    specialisation: "Industrie, Production & Maintenance",
    specialisationCode: 9,
    dureeHeures: 32,
    sessionsCount: 8,
    certification: null,
    accroche: "Parcours exécutif • 32 heures • 8 séances live • 100 % en ligne",
    positionnement: "Piloter la performance globale de sites industriels : supply chain, GPAO, coûts d'exploitation et transformation lean.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    publicVise: ["Directeurs d'usine", "Responsables industriels", "Ingénieurs méthodes"],
    competences: [
      "Stratégie industrielle et schémas directeurs",
      "Déploiement du Lean Manufacturing et 5S",
      "Optimisation de la productivité globale (TRS)",
      "Gestion des investissements (CAPEX) et ROI machine"
    ],
    prixComptant: 423,
    devise: "EUR",
    plans: TARIFS_INSTITUTE.plans
  },
  {
    id: "directeur-production",
    titre: "Directeur de Production",
    slug: "directeur-de-production",
    specialisation: "Industrie, Production & Maintenance",
    specialisationCode: 9,
    dureeHeures: 32,
    sessionsCount: 8,
    certification: null,
    accroche: "Parcours exécutif • 32 heures • 8 séances live • 100 % en ligne",
    positionnement: "Orchestrer les ateliers de fabrication, les plannings PDP/PIC et l'élimination des goulots d'étranglement.",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1200&q=80",
    publicVise: ["Chefs d'atelier", "Responsables de fabrication", "Planificateurs de production"],
    competences: [
      "Planification industrielle (PIC / PDP / CBN)",
      "Gestion des capacités et charges ateliers",
      "Suivi des ordres de fabrication et des rebuts",
      "Management opérationnel des équipes d'atelier"
    ],
    prixComptant: 423,
    devise: "EUR",
    plans: TARIFS_INSTITUTE.plans
  },
  {
    id: "directeur-maintenance",
    titre: "Directeur de Maintenance",
    slug: "directeur-de-maintenance",
    specialisation: "Industrie, Production & Maintenance",
    specialisationCode: 9,
    dureeHeures: 32,
    sessionsCount: 8,
    certification: null,
    accroche: "Parcours exécutif • 32 heures • 8 séances live • 100 % en ligne",
    positionnement: "Garantir la disponibilité opérationnelle des actifs industriels, déployer la GMAO et la maintenance prédictive.",
    image: "https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80",
    publicVise: ["Responsables maintenance", "Ingénieurs fiabilité", "Techniciens experts"],
    competences: [
      "Politiques de maintenance préventive et conditionnelle",
      "Déploiement et exploitation d'un outil GMAO",
      "Gestion des stocks de pièces de rechange et pièces critiques",
      "Indicateurs MTBF, MTTR et calcul des coûts d'arrêt"
    ],
    prixComptant: 423,
    devise: "EUR",
    plans: TARIFS_INSTITUTE.plans
  },
  {
    id: "directeur-qhse",
    titre: "Directeur QHSE",
    slug: "directeur-qhse",
    specialisation: "Industrie, Production & Maintenance",
    specialisationCode: 9,
    dureeHeures: 32,
    sessionsCount: 8,
    certification: null,
    accroche: "Parcours exécutif • 32 heures • 8 séances live • 100 % en ligne",
    positionnement: "Piloter le système de management intégré (ISO 9001, 14001, 45001), la sécurité au travail et la conformité environnementale.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    publicVise: ["Responsables qualité", "Ingénieurs sécurité", "Coordinateurs environnement"],
    competences: [
      "Audit des systèmes de management intégrés (SMI)",
      "Analyse des risques professionnels (Document Unique)",
      "Gestion des situations d'urgence et protocoles incidents",
      "Conduite des audits de certification ISO"
    ],
    prixComptant: 423,
    devise: "EUR",
    plans: TARIFS_INSTITUTE.plans
  },
  {
    id: "audit-interne",
    titre: "Directeur Audit Interne",
    slug: "directeur-audit-interne",
    specialisation: "Finance, Audit & Contrôle de Gestion",
    specialisationCode: 8,
    dureeHeures: 32,
    sessionsCount: 8,
    certification: null,
    accroche: "Parcours exécutif • 32 heures • 8 séances live • 100 % en ligne",
    positionnement: "Bâtir la cartographie des risques de l'organisation, exécuter les missions d'audit et rapporter au comité d'audit.",
    image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
    publicVise: ["Auditeurs seniors", "Contrôleurs internes", "Responsables conformité"],
    competences: [
      "Cartographie des risques opérationnels et financiers",
      "Élaboration du plan d'audit annuel comex",
      "Réalisation des tests de conformité et preuves d'audit",
      "Rédaction des recommandations et suivi des plans d'action"
    ],
    prixComptant: 423,
    devise: "EUR",
    plans: TARIFS_INSTITUTE.plans
  },
  {
    id: "drh",
    titre: "Directeur des Ressources Humaines (DRH)",
    slug: "directeur-des-ressources-humaines",
    specialisation: "Ressources Humaines",
    specialisationCode: 11,
    dureeHeures: 32,
    sessionsCount: 8,
    certification: null,
    accroche: "Parcours exécutif • 32 heures • 8 séances live • 100 % en ligne",
    positionnement: "Structurer la politique RH, la GPEC, le climat social, la politique de rémunération et la marque employeur.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    publicVise: ["Responsables RH", "Gestionnaires de talents", "Directeurs administratifs"],
    competences: [
      "Gestion prévisionnelle des emplois et compétences (GPEC)",
      "Dialogue social et cadre légal du travail",
      "Ingénierie de la formation et développement des talents",
      "Politiques de rémunération globale (Compensation & Benefits)"
    ],
    prixComptant: 423,
    devise: "EUR",
    plans: TARIFS_INSTITUTE.plans
  },
  {
    id: "directeur-commercial",
    titre: "Directeur Commercial",
    slug: "directeur-commercial",
    specialisation: "Commercial & Marketing",
    specialisationCode: 10,
    dureeHeures: 32,
    sessionsCount: 8,
    certification: null,
    accroche: "Parcours exécutif • 32 heures • 8 séances live • 100 % en ligne",
    positionnement: "Définir la politique commerciale, manager les forces de vente B2B, négocier les grands comptes et sécuriser le pipe.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80",
    publicVise: ["Responsables commerciaux", "Ingénieurs d'affaires", "Key Account Managers"],
    competences: [
      "Stratégie commerciale B2B et segmentation de marché",
      "Pilotage du pipeline de vente et prévisions CRM",
      "Négociation complexe et contrats grands comptes",
      "Animation, objectifs et motivation des équipes commerciales"
    ],
    prixComptant: 423,
    devise: "EUR",
    plans: TARIFS_INSTITUTE.plans
  },
  {
    id: "directeur-marketing",
    titre: "Directeur Marketing",
    slug: "directeur-marketing",
    specialisation: "Commercial & Marketing",
    specialisationCode: 10,
    dureeHeures: 32,
    sessionsCount: 8,
    certification: null,
    accroche: "Parcours exécutif • 32 heures • 8 séances live • 100 % en ligne",
    positionnement: "Concevoir la stratégie de marque, l'inbound marketing B2B, le positionnement produit et la génération de leads qualifiés.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    publicVise: ["Responsables marketing", "Brand managers", "Chefs de produit"],
    competences: [
      "Stratégie de marque et positionnement concurrentiel",
      "Génération de leads B2B et marketing digital",
      "Lancement de nouveaux produits et pricing",
      "Mesure du ROI marketing et acquisition client (CAC / LTV)"
    ],
    prixComptant: 423,
    devise: "EUR",
    plans: TARIFS_INSTITUTE.plans
  }
];
