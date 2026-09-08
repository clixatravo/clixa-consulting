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
  ArrowRight
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

  // Synchronize with URL hash changes (browser back/forward, external links)
  useEffect(() => {
    const handleHashChange = () => {
      const { page, tab } = parseHashToPageAndTab(window.location.hash);
      setCurrentPage(page);
      if (tab) {
        setSubTabs(prev => ({ ...prev, [page]: tab }));
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = useCallback((page: PageId, tab?: string) => {
    setCurrentPage(page);
    if (tab) {
      setSubTabs(prev => ({ ...prev, [page]: tab }));
      window.location.hash = tab;
    } else {
      window.location.hash = page;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleTabChange = (page: PageId, tabId: string) => {
    setSubTabs(prev => ({ ...prev, [page]: tabId }));
    window.location.hash = tabId;
  };

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
        onNavigate={(page) => handleNavigate(page)}
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

            {/* Strategic Summary & Direct Access Banner */}
            <section className="py-16 bg-slate-900/40 border-t border-slate-850">
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

            <div className="py-8">
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

            <div className="py-8">
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

            <div className="py-8">
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
                <div className="animate-in fade-in zoom-in-95 duration-200 space-y-12">
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

            <div className="py-8">
              {subTabs.cabinet === 'methode' && (
                <div className="animate-in fade-in zoom-in-95 duration-200 space-y-10">
                  <AboutBanner />
                  <Methodologie onOpenConsultation={handleOpenConsultation} />
                </div>
              )}

              {subTabs.cabinet === 'comparatif' && (
                <div className="animate-in fade-in zoom-in-95 duration-200 space-y-10">
                  <ComparisonTable onOpenConsultation={handleOpenConsultation} />
                  <WhyClixa onOpenConsultation={handleOpenConsultation} />
                </div>
              )}

              {subTabs.cabinet === 'equipe' && (
                <div className="animate-in fade-in zoom-in-95 duration-200 space-y-10">
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

            <div className="py-8">
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
