import React, { useState, useEffect, useCallback } from 'react';
import { 
  Database, 
  Layers, 
  Cpu, 
  Award, 
  CheckCircle2, 
  Calculator, 
  FileText, 
  Target, 
  Workflow, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  Send, 
  HelpCircle, 
  BookOpen,
  ArrowRight,
  Sparkles,
  Quote
} from 'lucide-react';
import { Navbar, PageId } from './components/Navbar';
import { Hero } from './components/Hero';
import { PageHeader, PageTab } from './components/PageHeader';
import { TrustBanner } from './components/TrustBanner';
import { AboutBanner } from './components/AboutBanner';
import { Expertises } from './components/Expertises';
import { Secteurs } from './components/Secteurs';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { RoiCalculator } from './components/RoiCalculator';
import { FacturationElec } from './components/FacturationElec';
import { SolutionsDigitales } from './components/SolutionsDigitales';
import { TechStack } from './components/TechStack';
import { AuditExpress } from './components/AuditExpress';
import { ComparisonTable } from './components/ComparisonTable';
import { AuditFlash } from './components/AuditFlash';
import { Methodologie } from './components/Methodologie';
import { Engagements } from './components/Engagements';
import { TeamPedigree } from './components/TeamPedigree';
import { WhyClixa } from './components/WhyClixa';
import { LeadMagnet } from './components/LeadMagnet';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BackToTop } from './components/BackToTop';
import { ScrollReveal } from './components/ScrollReveal';

const parseHashToPageAndTab = (hash: string): { page: PageId; tab?: string } => {
  const clean = hash.replace('#', '').toLowerCase();
  
  // Expertises
  if (clean === 'expertises' || clean === 'poles') return { page: 'expertises', tab: 'poles' };
  if (clean === 'digital' || clean === 'solutions') return { page: 'expertises', tab: 'digital' };
  if (clean === 'technologies' || clean === 'tech') return { page: 'expertises', tab: 'technologies' };
  
  // Secteurs & Références
  if (clean === 'secteurs' || clean === 'secteurs-references') return { page: 'secteurs-references', tab: 'secteurs' };
  if (clean === 'cas-clients' || clean === 'cas') return { page: 'secteurs-references', tab: 'cas-clients' };
  if (clean === 'temoignages' || clean === 'avis') return { page: 'secteurs-references', tab: 'temoignages' };
  
  // Diagnostic & ROI
  if (clean === 'simulateur-roi' || clean === 'roi' || clean === 'diagnostic-roi') return { page: 'diagnostic-roi', tab: 'roi' };
  if (clean === 'facturation') return { page: 'diagnostic-roi', tab: 'facturation' };
  if (clean === 'diagnostic' || clean === 'audit-flash' || clean === 'audit') return { page: 'diagnostic-roi', tab: 'diagnostic' };

  // Cabinet & Démarche
  if (clean === 'cabinet' || clean === 'methode' || clean === 'a-propos') return { page: 'cabinet', tab: 'methode' };
  if (clean === 'comparatif' || clean === 'pourquoi') return { page: 'cabinet', tab: 'comparatif' };
  if (clean === 'equipe' || clean === 'equipe-gouvernance' || clean === 'engagements') return { page: 'cabinet', tab: 'equipe' };

  // Contact & FAQ
  if (clean === 'contact' || clean === 'rdv') return { page: 'contact', tab: 'rdv' };
  if (clean === 'faq') return { page: 'contact', tab: 'faq' };
  if (clean === 'livre-blanc' || clean === 'guide-dirigeant') return { page: 'contact', tab: 'livre-blanc' };

  return { page: 'accueil' };
};

export const App: React.FC = () => {
  const initial = typeof window !== 'undefined' ? parseHashToPageAndTab(window.location.hash) : { page: 'accueil' as PageId };
  
  const [currentPage, setCurrentPage] = useState<PageId>(initial.page);
  const [subTabs, setSubTabs] = useState<{ [key: string]: string }>({
    expertises: initial.page === 'expertises' && initial.tab ? initial.tab : 'poles',
    'secteurs-references': initial.page === 'secteurs-references' && initial.tab ? initial.tab : 'secteurs',
    'diagnostic-roi': initial.page === 'diagnostic-roi' && initial.tab ? initial.tab : 'roi',
    cabinet: initial.page === 'cabinet' && initial.tab ? initial.tab : 'methode',
    contact: initial.page === 'contact' && initial.tab ? initial.tab : 'rdv',
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);
  const isInternalNavRef = React.useRef(false);

  // Synchronize with URL hash changes (browser back/forward, external links)
  useEffect(() => {
    const handleHashChange = () => {
      if (isInternalNavRef.current) return;
      const { page, tab } = parseHashToPageAndTab(window.location.hash);
      setCurrentPage(page);
      if (tab) {
        setSubTabs(prev => ({ ...prev, [page]: tab }));
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = useCallback((page: PageId, tab?: string) => {
    isInternalNavRef.current = true;
    setCurrentPage(page);
    if (tab) {
      setSubTabs(prev => ({ ...prev, [page]: tab }));
      window.history.replaceState(null, '', `#${tab}`);
    } else {
      window.history.replaceState(null, '', `#${page}`);
    }
    window.scrollTo(0, 0);
    setTimeout(() => {
      isInternalNavRef.current = false;
    }, 120);
  }, []);

  const handleTabChange = useCallback((page: PageId, tabId: string) => {
    isInternalNavRef.current = true;
    setSubTabs(prev => ({ ...prev, [page]: tabId }));
    window.history.replaceState(null, '', `#${tabId}`);
    setTimeout(() => {
      isInternalNavRef.current = false;
    }, 120);
  }, []);

  const handleOpenConsultation = (topic?: string) => {
    setSelectedTopic(topic);
    setModalOpen(true);
  };

  const handleCloseConsultation = () => {
    setModalOpen(false);
    setSelectedTopic(undefined);
  };

  // Sub-tabs configurations
  const expertisesTabs: PageTab[] = [
    { id: 'poles', label: 'Nos 5 Expertises Métiers', icon: Database, badge: 'ERP & SI' },
    { id: 'digital', label: 'Solutions Digitales & Web', icon: Workflow, badge: 'Sur-Mesure' },
    { id: 'technologies', label: 'Technologies Maîtrisées', icon: Cpu, badge: 'Odoo & Cloud' },
  ];

  const secteursTabs: PageTab[] = [
    { id: 'secteurs', label: 'Spécialisations Sectorielles', icon: Layers, badge: '6 Pôles' },
    { id: 'cas-clients', label: 'Cas Clients Réels', icon: Award, badge: 'ROI Chiffré' },
    { id: 'temoignages', label: 'Témoignages Dirigeants', icon: CheckCircle2, badge: 'Vérifiés' },
  ];

  const diagnosticTabs: PageTab[] = [
    { id: 'roi', label: 'Simulateur de ROI ERP', icon: Calculator, badge: 'Interactif' },
    { id: 'facturation', label: 'Facturation Électronique 2026', icon: FileText, badge: 'Conformité' },
    { id: 'diagnostic', label: 'Audit Express & Flash 48H', icon: Target, badge: 'Diagnostic' },
  ];

  const cabinetTabs: PageTab[] = [
    { id: 'methode', label: 'Notre Méthode en 4 Étapes', icon: Workflow, badge: '01 - 04' },
    { id: 'comparatif', label: 'Pourquoi CLIXA ?', icon: TrendingUp, badge: 'Comparatif' },
    { id: 'equipe', label: 'Équipe & Déontologie', icon: Users, badge: 'Associés' },
  ];

  const contactTabs: PageTab[] = [
    { id: 'rdv', label: 'Prendre Rendez-vous', icon: Send, badge: 'Direct' },
    { id: 'faq', label: 'FAQ Stratégique', icon: HelpCircle, badge: 'Questions Clés' },
    { id: 'livre-blanc', label: 'Livre Blanc Exécutif', icon: BookOpen, badge: 'PDF Offert' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Multi-Page Navigation */}
      <Navbar 
        currentPage={currentPage}
        activeSubTab={subTabs[currentPage]}
        onNavigate={handleNavigate}
        onOpenConsultation={handleOpenConsultation} 
      />

      {/* Main Page Content Views */}
      <main className="flex-1">
        
        {/* ============================================================ */}
        {/* PAGE 1: ACCUEIL                                              */}
        {/* ============================================================ */}
        {currentPage === 'accueil' && (
          <div key="page-accueil" className="animate-in fade-in duration-300">
            {/* Hero Section */}
            <Hero 
              onOpenConsultation={handleOpenConsultation} 
              onNavigate={(page) => handleNavigate(page)}
            />

            {/* Institutional Trust Markers */}
            <ScrollReveal delay={50}>
              <TrustBanner />
            </ScrollReveal>

            {/* Why CLIXA 3-Pillar Value Proposition */}
            <section className="py-20 bg-slate-950 relative border-b border-slate-850">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-14">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400 mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Positionnement Différenciant</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                    Une Approche Hybride Dédiée aux Dirigeants
                  </h2>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                    Nous réconcilions les enjeux financiers du comité de direction avec les réalités opérationnelles du terrain.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Pillar 1 */}
                  <div className="p-7 rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 group shadow-xl">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-5 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                      Culture Finance & Process Métier
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                      Pas d'intégration technique à l'aveugle. Tout commence par la cartographie de vos flux réels et le calcul de rentabilité (ROI).
                    </p>
                    <button 
                      onClick={() => handleNavigate('cabinet', 'comparatif')}
                      className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Voir la différence CLIXA</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Pillar 2 */}
                  <div className="p-7 rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 group shadow-xl">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                      Expertise ERP Odoo 17/18 Certifiée
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                      Maîtrise des standards Odoo et personnalisations robustes sans dette technique : Achats, Ventes, Stocks, Comptabilité, Production.
                    </p>
                    <button 
                      onClick={() => handleNavigate('expertises', 'poles')}
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Découvrir l'offre Odoo</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Pillar 3 */}
                  <div className="p-7 rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 group shadow-xl">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      Double Présence Maroc 🇲🇦 & France 🇫🇷
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                      Équipes basées à Casablanca et Paris. Accompagnement de proximité et conformité fiscale stricte (DGI & DGFIP 2026).
                    </p>
                    <button 
                      onClick={() => handleNavigate('contact', 'rdv')}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Prendre attache avec nos associés</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Executive Testimonial Spotlight */}
            <section className="py-16 bg-slate-900/30 border-b border-slate-850">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 border border-slate-800 relative overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-8">
                  <div className="p-4 rounded-2xl bg-sky-500/10 text-sky-400 shrink-0">
                    <Quote className="w-10 h-10" />
                  </div>
                  <div className="space-y-3 flex-1 text-center md:text-left">
                    <p className="text-base sm:text-lg text-slate-200 font-medium italic leading-relaxed">
                      « CLIXA a transformé la vision de notre comité de direction. L'intégration d'Odoo s'est faite sans rupture d'activité, avec un gain de productivité immédiat de 35% sur nos cycles de commande. »
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-850">
                      <div>
                        <span className="font-bold text-white text-sm">Directeur Général</span>
                        <span className="text-slate-400 text-xs block">Groupe Industriel & Négoce (Casablanca • 120 collaborateurs)</span>
                      </div>
                      <button
                        onClick={() => handleNavigate('secteurs-references', 'cas-clients')}
                        className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Lire tous les cas clients</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Strategic Summary & Direct Access Banner */}
            <section className="py-16 bg-slate-950">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
                  <div className="space-y-3 text-center lg:text-left max-w-xl">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                      Un Projet de Transformation ?
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Discutez directement avec un associé CLIXA
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Sans engagement commercial agressif. Nous analysons vos processus et votre schéma directeur pour vous apporter une vision claire et chiffrée sous 48h.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
                    <button
                      onClick={() => handleOpenConsultation()}
                      className="shimmer-btn w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-bold text-white shadow-xl shadow-sky-500/25 cursor-pointer"
                    >
                      Demander un diagnostic
                    </button>
                    <button
                      onClick={() => handleNavigate('diagnostic-roi', 'roi')}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-slate-600 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Simulateur ROI</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ============================================================ */}
        {/* PAGE 2: EXPERTISES & SOLUTIONS DIGITALES                    */}
        {/* ============================================================ */}
        {currentPage === 'expertises' && (
          <div key="page-expertises" className="animate-in fade-in duration-300">
            <PageHeader 
              badge="Savoir-Faire & Maîtrise SI"
              title="Nos Pôles d'Expertise &"
              highlightedTitle="Solutions Digitales"
              subtitle="Choisissez l'espace à explorer : nos 5 expertises métiers, nos solutions digitales sur-mesure, ou notre écosystème technologique."
              pageName="Expertises & Solutions"
              tabs={expertisesTabs}
              activeTab={subTabs.expertises}
              onTabChange={(tabId) => handleTabChange('expertises', tabId)}
              onNavigateHome={() => handleNavigate('accueil')}
            />

            <div className="tab-content-view">
              {subTabs.expertises === 'poles' && (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                  <Expertises onOpenConsultation={handleOpenConsultation} />
                </div>
              )}

              {subTabs.expertises === 'digital' && (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                  <SolutionsDigitales onOpenConsultation={handleOpenConsultation} />
                </div>
              )}

              {subTabs.expertises === 'technologies' && (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                  <TechStack onOpenConsultation={handleOpenConsultation} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* PAGE 3: SECTEURS & CAS CLIENTS RÉELS                        */}
        {/* ============================================================ */}
        {currentPage === 'secteurs-references' && (
          <div key="page-secteurs" className="animate-in fade-in duration-300">
            <PageHeader 
              badge="Pertinence Métier & Résultats"
              title="Secteurs d'Activité &"
              highlightedTitle="Cas Clients Réels"
              subtitle="Découvrez nos spécialisations sectorielles, nos interventions réelles chiffrées, et les retours d'expérience de dirigeants."
              pageName="Secteurs & Références"
              tabs={secteursTabs}
              activeTab={subTabs['secteurs-references']}
              onTabChange={(tabId) => handleTabChange('secteurs-references', tabId)}
              onNavigateHome={() => handleNavigate('accueil')}
            />

            <div className="tab-content-view">
              {subTabs['secteurs-references'] === 'secteurs' && (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                  <Secteurs onOpenConsultation={handleOpenConsultation} />
                </div>
              )}

              {subTabs['secteurs-references'] === 'cas-clients' && (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                  <CaseStudies onOpenConsultation={handleOpenConsultation} />
                </div>
              )}

              {subTabs['secteurs-references'] === 'temoignages' && (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                  <Testimonials onOpenConsultation={handleOpenConsultation} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* PAGE 4: OUTILS & DIAGNOSTIC ROI                             */}
        {/* ============================================================ */}
        {currentPage === 'diagnostic-roi' && (
          <div key="page-diagnostic" className="animate-in fade-in duration-300">
            <PageHeader 
              badge="Outils Décisionnels & Simulateurs"
              title="Simulateur ROI &"
              highlightedTitle="Diagnostics Dirigeants"
              subtitle="Évaluez la rentabilité de votre investissement ERP, préparez votre conformité fiscale 2026, ou lancez un diagnostic flash."
              pageName="Outils & Diagnostic"
              tabs={diagnosticTabs}
              activeTab={subTabs['diagnostic-roi']}
              onTabChange={(tabId) => handleTabChange('diagnostic-roi', tabId)}
              onNavigateHome={() => handleNavigate('accueil')}
            />

            <div className="tab-content-view">
              {subTabs['diagnostic-roi'] === 'roi' && (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                  <RoiCalculator onOpenConsultation={handleOpenConsultation} />
                </div>
              )}

              {subTabs['diagnostic-roi'] === 'facturation' && (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                  <FacturationElec onOpenConsultation={handleOpenConsultation} />
                </div>
              )}

              {subTabs['diagnostic-roi'] === 'diagnostic' && (
                <div className="animate-in fade-in zoom-in-95 duration-200 space-y-8">
                  <AuditExpress onOpenConsultation={handleOpenConsultation} />
                  <AuditFlash onOpenConsultation={handleOpenConsultation} />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* PAGE 5: LE CABINET & MÉTHODE                                */}
        {/* ============================================================ */}
        {currentPage === 'cabinet' && (
          <div key="page-cabinet" className="animate-in fade-in duration-300">
            <PageHeader 
              badge="L'Excellence du Conseil Hybride"
              title="Le Cabinet CLIXA &"
              highlightedTitle="Notre Démarche"
              subtitle="Une alliance unique entre culture financière, maîtrise des systèmes d'information et déontologie rigoureuse."
              pageName="Le Cabinet"
              tabs={cabinetTabs}
              activeTab={subTabs.cabinet}
              onTabChange={(tabId) => handleTabChange('cabinet', tabId)}
              onNavigateHome={() => handleNavigate('accueil')}
            />

            <div className="tab-content-view">
              {subTabs.cabinet === 'methode' && (
                <div className="animate-in fade-in zoom-in-95 duration-200 space-y-8">
                  <AboutBanner />
                  <Methodologie onOpenConsultation={handleOpenConsultation} />
                </div>
              )}

              {subTabs.cabinet === 'comparatif' && (
                <div className="animate-in fade-in zoom-in-95 duration-200 space-y-8">
                  <ComparisonTable onOpenConsultation={handleOpenConsultation} />
                  <WhyClixa onOpenConsultation={handleOpenConsultation} />
                </div>
              )}

              {subTabs.cabinet === 'equipe' && (
                <div className="animate-in fade-in zoom-in-95 duration-200 space-y-8">
                  <TeamPedigree onOpenConsultation={handleOpenConsultation} />
                  <Engagements />
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* PAGE 6: CONTACT & FAQ                                       */}
        {/* ============================================================ */}
        {currentPage === 'contact' && (
          <div key="page-contact" className="animate-in fade-in duration-300">
            <PageHeader 
              badge="Échange & Ressources"
              title="Prendre Contact avec"
              highlightedTitle="Nos Associés"
              subtitle="Échangez directement avec nos consultants seniors à Casablanca et Paris, ou téléchargez notre livre blanc exécutif."
              pageName="Contact & FAQ"
              tabs={contactTabs}
              activeTab={subTabs.contact}
              onTabChange={(tabId) => handleTabChange('contact', tabId)}
              onNavigateHome={() => handleNavigate('accueil')}
            />

            <div className="tab-content-view">
              {subTabs.contact === 'rdv' && (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                  <CTASection onOpenConsultation={handleOpenConsultation} />
                </div>
              )}

              {subTabs.contact === 'faq' && (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                  <FAQSection onOpenConsultation={handleOpenConsultation} />
                </div>
              )}

              {subTabs.contact === 'livre-blanc' && (
                <div className="animate-in fade-in zoom-in-95 duration-200">
                  <LeadMagnet onOpenConsultation={handleOpenConsultation} />
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* Footer avec navigation multi-pages */}
      <Footer onNavigate={(page) => handleNavigate(page)} />

      {/* Floating Back to Top button */}
      <BackToTop />

      {/* Floating WhatsApp Quick Action Button */}
      <FloatingWhatsApp />

      {/* Lead capture modal */}
      <ContactModal
        isOpen={modalOpen}
        onClose={handleCloseConsultation}
        initialTopic={selectedTopic}
      />
    </div>
  );
};

export default App;
