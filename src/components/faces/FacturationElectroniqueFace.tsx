import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Eye,
  Scale,
  FileCode2,
  Fingerprint,
  Archive,
  Send,
  ServerCog,
  QrCode,
  Inbox,
  Clock,
  Wallet,
  LineChart,
  Lock,
  AlertTriangle,
  ChevronDown,
  CheckCircle2,
  Circle,
  Info,
} from 'lucide-react';

interface FacturationElectroniqueFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

/** Sujet pré-sélectionné dans la modale de prise de rendez-vous. */
const SUJET_CONSULTATION = 'Facturation Électronique DGI & EDI';

const SOMMAIRE = [
  { id: 'fe-pourquoi', label: 'Pourquoi cette réforme' },
  { id: 'fe-cadre', label: 'Le cadre légal' },
  { id: 'fe-clearance', label: 'Le modèle de validation' },
  { id: 'fe-calendrier', label: 'Le calendrier' },
  { id: 'fe-technique', label: 'Les exigences techniques' },
  { id: 'fe-feuille-de-route', label: 'Votre feuille de route' },
  { id: 'fe-diagnostic', label: 'Testez votre préparation' },
  { id: 'fe-faq', label: 'Questions fréquentes' },
];

const OBJECTIFS = [
  {
    icon: Eye,
    titre: 'Tracer chaque transaction',
    texte: "L'administration voit passer les factures au moment où elles sont émises, ce qui réduit fortement l'espace laissé à la fraude à la TVA.",
  },
  {
    icon: Scale,
    titre: 'Élargir l’assiette fiscale',
    texte: "En rendant la facture numérique incontournable, la réforme pousse une partie de l'économie informelle vers des circuits déclarés.",
  },
  {
    icon: ShieldCheck,
    titre: 'Fiabiliser les échanges',
    texte: 'La fin de la ressaisie manuelle supprime une source majeure d’erreurs, de litiges clients-fournisseurs et de retards de paiement.',
  },
];

const ETAPES_CLEARANCE = [
  { icon: Send, titre: 'Émission', texte: 'Votre logiciel produit la facture au format structuré.' },
  { icon: ServerCog, titre: 'Contrôle DGI', texte: 'La plateforme nationale vérifie le format, les mentions obligatoires et la signature.' },
  { icon: QrCode, titre: 'Validation', texte: 'La facture conforme reçoit un identifiant unique et un QR code.' },
  { icon: Inbox, titre: 'Réception', texte: 'Le client reçoit une facture déjà validée, exploitable directement.' },
];

const VAGUES = [
  {
    vague: 'Vague 1',
    periode: 'Début 2026',
    cible: 'Grandes entreprises',
    texte: 'Les contribuables au chiffre d’affaires le plus élevé ouvrent la marche et servent de référence pour la suite du déploiement.',
  },
  {
    vague: 'Vague 2',
    periode: 'Milieu 2026',
    cible: 'ETI & PME',
    texte: 'Les entreprises de taille intermédiaire et les PME rejoignent le dispositif, souvent avec des flux plus hétérogènes à remettre à plat.',
  },
  {
    vague: 'Vague 3',
    periode: 'Fin 2026',
    cible: 'TPE, professions libérales & auto-entrepreneurs',
    texte: 'Les plus petites structures ferment la marche, avec des besoins avant tout de simplicité et de coût maîtrisé.',
  },
];

const EXIGENCES = [
  {
    icon: FileCode2,
    titre: 'Un format structuré, pas un PDF',
    texte: "La facture devient un fichier de données (XML, de type UBL) lisible par les machines. Un PDF ou un document Word, même envoyé par email, ne suffit plus à lui seul.",
  },
  {
    icon: Fingerprint,
    titre: 'Une signature électronique',
    texte: 'Chaque facture est scellée numériquement à l’aide d’un certificat délivré par un prestataire de services de confiance agréé, dans le cadre de la loi n° 43-20.',
  },
  {
    icon: Archive,
    titre: 'Un archivage de 10 ans',
    texte: "Les factures se conservent dix ans sous forme électronique, intègres et lisibles pendant toute la durée. Un stockage cloud sécurisé est préférable à un disque local.",
  },
];

const FEUILLE_DE_ROUTE = [
  {
    titre: 'Cartographier vos flux de facturation',
    texte: 'Ventes, achats, avoirs, acomptes, refacturations : on recense chaque circuit, chaque outil et chaque exception avant de toucher au système.',
    clixa: 'Audit des flux en atelier avec vos équipes finance et ADV.',
  },
  {
    titre: 'Nettoyer votre référentiel tiers',
    texte: "Un ICE manquant ou erroné suffit à faire rejeter une facture. La base clients et fournisseurs doit être fiabilisée en amont.",
    clixa: 'Contrôle et correction des ICE et des données légales de vos tiers.',
  },
  {
    titre: 'Choisir ou adapter votre logiciel',
    texte: 'L’outil doit produire le format attendu, signer, dialoguer avec la plateforme DGI et archiver automatiquement.',
    clixa: 'Paramétrage d’Odoo ou évaluation indépendante de votre solution actuelle.',
  },
  {
    titre: 'Tester avant l’échéance',
    texte: 'Les rejets se découvrent en test, pas en production : cas limites, avoirs, factures multi-TVA et volumes réels.',
    clixa: 'Plan de recette et campagne de tests sur vos factures réelles.',
  },
  {
    titre: 'Former et piloter',
    texte: 'Le rôle de la comptabilité évolue : moins de saisie, davantage de contrôle des flux et des rejets.',
    clixa: 'Formation des équipes et tableau de bord de suivi des rejets.',
  },
];

const BENEFICES = [
  { icon: Clock, titre: 'Paiements plus rapides', texte: 'La facture validée arrive immédiatement chez le client, prête à être traitée.' },
  { icon: Wallet, titre: 'Coûts réduits', texte: 'Moins de papier, d’impression, d’envois et d’espace d’archivage physique.' },
  { icon: LineChart, titre: 'Trésorerie lisible', texte: 'Des données à jour en continu pour piloter encaissements et décaissements.' },
  { icon: Lock, titre: 'Documents protégés', texte: 'Un archivage sécurisé, à l’abri des pertes, incendies ou vols.' },
];

const RISQUES = [
  {
    titre: 'TVA non récupérable',
    texte: 'Une facture fournisseur non conforme peut vous priver du droit à déduction de la TVA qu’elle porte.',
  },
  {
    titre: 'Amendes par document',
    texte: 'Chaque facture défectueuse peut être sanctionnée : sur des milliers de factures, l’addition grimpe vite.',
  },
  {
    titre: 'Contrôles ciblés',
    texte: 'Des incohérences visibles en temps réel par l’administration augmentent le risque de vérification fiscale.',
  },
];

const QUESTIONS_DIAGNOSTIC = [
  'Nous savons à quelle vague notre entreprise appartient.',
  'Notre logiciel peut produire des factures au format structuré (XML).',
  'Les ICE de nos clients et fournisseurs ont été vérifiés.',
  'Nous disposons d’un certificat de signature électronique.',
  'Notre archivage électronique couvre dix ans.',
  'Nos équipes savent traiter une facture rejetée par la plateforme.',
];

const FAQ = [
  {
    q: 'Une facture en PDF reste-t-elle valable ?',
    r: "Non, pas à elle seule. Dans le nouveau régime, la valeur probante repose sur la facture structurée validée par la plateforme. Le PDF peut rester une copie lisible, mais il ne remplace plus le fichier de données.",
  },
  {
    q: 'Toutes les entreprises basculent-elles en même temps ?',
    r: "Non. Le déploiement se fait par vagues selon la taille des entreprises, en commençant par les plus grandes. Votre date exacte dépend des textes d'application de la DGI.",
  },
  {
    q: 'Faut-il changer de logiciel ?',
    r: "Pas forcément. Beaucoup d'ERP, dont Odoo, peuvent être adaptés. L'essentiel est de vérifier que votre outil sait produire le bon format, signer, échanger avec la plateforme et archiver. Un audit permet de trancher rapidement.",
  },
  {
    q: 'Combien coûte la mise en conformité ?',
    r: "Cela dépend du volume de factures, du nombre de flux et de l'état de vos données. Pour une PME déjà équipée d'un ERP, il s'agit souvent d'un projet de quelques semaines ; les gains sur le traitement manuel compensent rapidement l'investissement.",
  },
  {
    q: 'Que se passe-t-il si une facture est rejetée ?',
    r: "Elle n'a pas d'existence fiscale tant qu'elle n'est pas corrigée et validée. D'où l'importance d'un circuit clair de traitement des rejets et d'un suivi régulier.",
  },
];

const allerA = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const TitreSection: React.FC<{ surtitre: string; titre: string }> = ({ surtitre, titre }) => (
  <div className="mb-6">
    <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-2">{surtitre}</span>
    <h2 className="text-2xl sm:text-3xl font-bold text-[#0a0e1a] tracking-tight font-heading leading-tight">{titre}</h2>
  </div>
);

export const FacturationElectroniqueFace: React.FC<FacturationElectroniqueFaceProps> = ({
  onOpenConsultation,
  onNavigateFace,
}) => {
  const [reponses, setReponses] = useState<boolean[]>(() => QUESTIONS_DIAGNOSTIC.map(() => false));
  const [faqOuverte, setFaqOuverte] = useState<number | null>(0);

  // Le site est une SPA à routage par hash : on donne à cette page un titre
  // propre pour l'onglet et le partage, puis on restaure celui du site.
  useEffect(() => {
    const precedent = document.title;
    document.title = 'Facturation électronique au Maroc 2026 : le guide | CLIXA Consulting';
    return () => {
      document.title = precedent;
    };
  }, []);

  const score = reponses.filter(Boolean).length;
  const total = QUESTIONS_DIAGNOSTIC.length;
  const verdict =
    score === total
      ? { texte: 'Vous êtes sur la bonne voie. Un contrôle de recette sécurisera la bascule.', couleur: 'text-emerald-700 bg-emerald-50 border-emerald-200' }
      : score >= 3
      ? { texte: 'Les bases sont là, mais plusieurs chantiers restent ouverts avant l’échéance.', couleur: 'text-amber-800 bg-amber-50 border-amber-200' }
      : { texte: 'Votre exposition est élevée : il est temps de lancer un diagnostic.', couleur: 'text-red-700 bg-red-50 border-red-200' };

  return (
    <div className="w-full bg-[#FAF7F2] text-slate-900 font-sans min-h-screen pt-32 sm:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* 1. EN-TÊTE DE L'ARTICLE */}
        <button
          onClick={() => onNavigateFace('insights')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux Insights</span>
        </button>

        <div className="max-w-4xl mb-12 sm:mb-16">
          <span className="inline-block text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 border border-blue-200 mb-5">
            Réglementation fiscale DGI · Guide
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0a0e1a] tracking-tight leading-[1.05] font-heading">
            Facturation électronique au Maroc&nbsp;: le guide pour réussir la bascule de 2026
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-5 leading-relaxed">
            Avec la réforme portée par la DGI, la facture papier ou PDF cède la place à une facture
            numérique validée en temps réel par l’administration. Pour une direction, c’est à la fois
            une contrainte de conformité et l’occasion de remettre à plat toute la chaîne
            de facturation. Voici ce qui change, pour qui, et comment s’y préparer.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 text-xs text-slate-500">
            <span>Mis à jour en novembre 2026</span>
            <span>Lecture : 8 min</span>
            <span>🇲🇦 Casablanca</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={() => onOpenConsultation(SUJET_CONSULTATION)}
              className="bg-[#1f24e9] hover:bg-[#151ad0] text-white px-6 py-3.5 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Consulter un expert</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => allerA('fe-diagnostic')}
              className="bg-white border border-slate-300 hover:border-blue-600 hover:text-blue-700 text-slate-800 px-6 py-3.5 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Tester ma préparation
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

          {/* 2. SOMMAIRE COLLANT (desktop) */}
          <aside className="hidden lg:block lg:col-span-3 lg:order-2">
            <div className="sticky top-36 space-y-6">
              <nav className="bg-white border border-[#e2dcd2] p-6" aria-label="Sommaire">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-4">Sommaire</div>
                <ol className="space-y-2.5 text-sm">
                  {SOMMAIRE.map((s, i) => (
                    <li key={s.id}>
                      <button
                        onClick={() => allerA(s.id)}
                        className="text-left text-slate-700 hover:text-blue-600 transition-colors cursor-pointer flex gap-2"
                      >
                        <span className="font-mono text-slate-400 text-xs pt-0.5">{String(i + 1).padStart(2, '0')}</span>
                        <span>{s.label}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="bg-[#0a1628] text-white p-6">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 mb-2">Diagnostic</div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  Faites le point sur vos flux avec un consultant avant la date de votre vague.
                </p>
                <button
                  onClick={() => onOpenConsultation(SUJET_CONSULTATION)}
                  className="w-full bg-white text-[#0a1628] hover:bg-sky-100 py-3 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Prendre rendez-vous</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* 3. CORPS DE L'ARTICLE */}
          <article className="lg:col-span-9 lg:order-1 space-y-16 sm:space-y-20">

            {/* Pourquoi */}
            <section id="fe-pourquoi" className="scroll-mt-36">
              <TitreSection surtitre="01 · Les enjeux" titre="Pourquoi la facture électronique devient obligatoire" />
              <p className="text-slate-600 leading-relaxed mb-8">
                La réforme ne vise pas seulement à dématérialiser. Elle change la manière dont l’administration
                fiscale observe l’activité économique, avec trois objectifs affichés.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {OBJECTIFS.map((o) => (
                  <div key={o.titre} className="bg-white border border-[#e2dcd2] p-6">
                    <o.icon className="w-6 h-6 text-blue-600 mb-4" />
                    <h3 className="font-bold text-slate-900 font-heading mb-2">{o.titre}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{o.texte}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Cadre légal */}
            <section id="fe-cadre" className="scroll-mt-36">
              <TitreSection surtitre="02 · Le texte" titre="Le cadre légal : l’article 145 du CGI" />
              <div className="bg-white border-l-4 border-blue-600 border-y border-r border-y-[#e2dcd2] border-r-[#e2dcd2] p-6 sm:p-8 space-y-4 text-slate-700 leading-relaxed">
                <p>
                  La base juridique se trouve à l’<strong>article 145-IX du Code Général des Impôts</strong>,
                  qui impose aux contribuables concernés d’émettre leurs factures au moyen d’un système
                  de facturation électronique sécurisé.
                </p>
                <p>
                  Conséquence directe : seule une facture validée par la plateforme nationale fait foi.
                  Un scan, un PDF envoyé par email ou une facture papier ne permettent plus, à eux seuls,
                  de justifier une charge ou de déduire la TVA correspondante.
                </p>
              </div>
            </section>

            {/* Clearance */}
            <section id="fe-clearance" className="scroll-mt-36">
              <TitreSection surtitre="03 · Le fonctionnement" titre="Le modèle « clearance » : une validation en temps réel" />
              <p className="text-slate-600 leading-relaxed mb-8">
                Le Maroc a retenu un modèle de contrôle continu : la facture n’est pas déclarée après coup,
                elle est vérifiée <strong>avant</strong> d’atteindre votre client. Sans validation, la transaction
                n’a pas d’existence fiscale.
              </p>
              <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {ETAPES_CLEARANCE.map((e, i) => (
                  <li key={e.titre} className="relative bg-white border border-[#e2dcd2] p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
                        <e.icon className="w-5 h-5" />
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-400">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="font-bold text-slate-900 font-heading mb-1">{e.titre}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{e.texte}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Calendrier */}
            <section id="fe-calendrier" className="scroll-mt-36">
              <TitreSection surtitre="04 · Les échéances" titre="Le calendrier : à quelle vague appartenez-vous ?" />
              <p className="text-slate-600 leading-relaxed mb-8">
                Le déploiement est progressif et s’étale sur 2026, en commençant par les plus grandes entreprises.
              </p>
              <ol className="relative border-l-2 border-blue-200 ml-3 space-y-8">
                {VAGUES.map((v) => (
                  <li key={v.vague} className="pl-8 relative">
                    <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-[#FAF7F2]" />
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-white bg-[#0a1628] px-2.5 py-1">{v.vague}</span>
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1">{v.periode}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading mb-1">{v.cible}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{v.texte}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex gap-3 p-4 bg-white border border-[#e2dcd2] text-xs text-slate-600 leading-relaxed">
                <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Calendrier indicatif : les dates et seuils applicables à chaque catégorie sont fixés par les textes
                  d’application de la DGI. Vérifiez votre situation exacte avant de planifier votre projet.
                </span>
              </div>
            </section>

            {/* Exigences techniques */}
            <section id="fe-technique" className="scroll-mt-36">
              <TitreSection surtitre="05 · La technique" titre="Les trois exigences techniques à maîtriser" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {EXIGENCES.map((x) => (
                  <div key={x.titre} className="bg-white border border-[#e2dcd2] p-6">
                    <x.icon className="w-6 h-6 text-blue-600 mb-4" />
                    <h3 className="font-bold text-slate-900 font-heading mb-2">{x.titre}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{x.texte}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Feuille de route */}
            <section id="fe-feuille-de-route" className="scroll-mt-36">
              <TitreSection surtitre="06 · Passer à l’action" titre="Votre feuille de route en cinq étapes" />
              <ol className="space-y-4">
                {FEUILLE_DE_ROUTE.map((etape, i) => (
                  <li key={etape.titre} className="bg-white border border-[#e2dcd2] p-6 grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-1 font-mono text-2xl font-bold text-blue-600">{String(i + 1).padStart(2, '0')}</div>
                    <div className="sm:col-span-7">
                      <h3 className="font-bold text-slate-900 font-heading mb-1">{etape.titre}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{etape.texte}</p>
                    </div>
                    <div className="sm:col-span-4 bg-blue-50/60 border border-blue-100 p-4 text-xs text-slate-700 leading-relaxed">
                      <span className="block font-mono font-bold uppercase tracking-wider text-blue-700 mb-1">Avec Clixa</span>
                      {etape.clixa}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Bénéfices & risques */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <TitreSection surtitre="Au-delà de la conformité" titre="Ce que vous y gagnez" />
                <ul className="space-y-4">
                  {BENEFICES.map((b) => (
                    <li key={b.titre} className="flex gap-4 bg-white border border-[#e2dcd2] p-5">
                      <b.icon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm mb-1">{b.titre}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{b.texte}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <TitreSection surtitre="Si rien n’est fait" titre="Les risques à anticiper" />
                <ul className="space-y-4">
                  {RISQUES.map((r) => (
                    <li key={r.titre} className="flex gap-4 bg-white border border-[#e2dcd2] p-5">
                      <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm mb-1">{r.titre}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{r.texte}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Diagnostic interactif */}
            <section id="fe-diagnostic" className="scroll-mt-36">
              <TitreSection surtitre="07 · Autodiagnostic" titre="Testez votre préparation en 30 secondes" />
              <div className="bg-white border border-[#e2dcd2] p-6 sm:p-8">
                <ul className="space-y-2 mb-6">
                  {QUESTIONS_DIAGNOSTIC.map((q, i) => (
                    <li key={q}>
                      <button
                        onClick={() => setReponses((prev) => prev.map((v, j) => (j === i ? !v : v)))}
                        aria-pressed={reponses[i]}
                        className={`w-full text-left flex items-start gap-3 p-3 border transition-colors cursor-pointer text-sm ${
                          reponses[i] ? 'bg-blue-50 border-blue-300 text-slate-900' : 'bg-[#FAF7F2] border-transparent text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {reponses[i]
                          ? <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                          : <Circle className="w-5 h-5 text-slate-400 shrink-0" />}
                        <span>{q}</span>
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1 h-2 bg-slate-100 overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${(score / total) * 100}%` }} />
                  </div>
                  <span className="font-mono text-sm font-bold text-slate-900">{score}/{total}</span>
                </div>

                <div className={`p-4 border text-sm font-semibold mb-5 ${verdict.couleur}`}>{verdict.texte}</div>

                <button
                  onClick={() => onOpenConsultation(SUJET_CONSULTATION)}
                  className="w-full sm:w-auto bg-[#1f24e9] hover:bg-[#151ad0] text-white px-6 py-3.5 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Demander un diagnostic de conformité</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </section>

            {/* FAQ */}
            <section id="fe-faq" className="scroll-mt-36">
              <TitreSection surtitre="08 · FAQ" titre="Questions fréquentes" />
              <div className="divide-y divide-[#e2dcd2] border-y border-[#e2dcd2]">
                {FAQ.map((item, i) => {
                  const ouverte = faqOuverte === i;
                  return (
                    <div key={item.q}>
                      <button
                        onClick={() => setFaqOuverte(ouverte ? null : i)}
                        aria-expanded={ouverte}
                        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
                      >
                        <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors font-heading">{item.q}</span>
                        <ChevronDown className={`w-5 h-5 text-slate-500 shrink-0 transition-transform ${ouverte ? 'rotate-180' : ''}`} />
                      </button>
                      {ouverte && <p className="pb-5 text-sm text-slate-600 leading-relaxed">{item.r}</p>}
                    </div>
                  );
                })}
              </div>
            </section>

            <p className="text-xs text-slate-500 leading-relaxed">
              Cet article est fourni à titre d’information générale et ne constitue pas un conseil fiscal.
              Les modalités de la réforme dépendent des textes publiés par la Direction Générale des Impôts.
            </p>
          </article>
        </div>

        {/* 4. BANDEAU FINAL */}
        <div className="mt-20 bg-[#0a1628] text-white p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-2">
              Faites de la facturation électronique un projet maîtrisé
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Audit de vos flux, paramétrage d’Odoo, fiabilisation des ICE et recette : un consultant vous
              accompagne de Casablanca jusqu’à la mise en production.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation(SUJET_CONSULTATION)}
            className="shrink-0 w-full md:w-auto bg-white text-[#0a1628] hover:bg-sky-100 px-7 py-4 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Consulter un expert</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
