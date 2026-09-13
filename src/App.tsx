import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBanner } from './components/TrustBanner';
import { AboutBanner } from './components/AboutBanner';
import { Expertises } from './components/Expertises';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ChatAssistant } from './components/ChatAssistant';

/* ---------------------------------------------------------------------------
   Découpage du bundle.
   Tout tenait dans un seul fichier de 340 Ko : le téléphone devait le
   télécharger, l'analyser et l'exécuter en entier avant le moindre affichage.
   Seuls la navigation et le premier écran sont chargés d'emblée ; le reste
   suit immédiatement après, sans bloquer le rendu initial. La modale de
   contact n'est téléchargée qu'à son ouverture.
   ------------------------------------------------------------------------- */
const Secteurs = lazy(() => import('./components/Secteurs').then((m) => ({ default: m.Secteurs })));
const CaseStudies = lazy(() => import('./components/CaseStudies').then((m) => ({ default: m.CaseStudies })));
const Testimonials = lazy(() => import('./components/Testimonials').then((m) => ({ default: m.Testimonials })));
const RoiCalculator = lazy(() => import('./components/RoiCalculator').then((m) => ({ default: m.RoiCalculator })));
const FacturationElec = lazy(() => import('./components/FacturationElec').then((m) => ({ default: m.FacturationElec })));
const SolutionsDigitales = lazy(() => import('./components/SolutionsDigitales').then((m) => ({ default: m.SolutionsDigitales })));
const TechStack = lazy(() => import('./components/TechStack').then((m) => ({ default: m.TechStack })));
const AuditExpress = lazy(() => import('./components/AuditExpress').then((m) => ({ default: m.AuditExpress })));
const ComparisonTable = lazy(() => import('./components/ComparisonTable').then((m) => ({ default: m.ComparisonTable })));
const AuditFlash = lazy(() => import('./components/AuditFlash').then((m) => ({ default: m.AuditFlash })));
const Methodologie = lazy(() => import('./components/Methodologie').then((m) => ({ default: m.Methodologie })));
const Engagements = lazy(() => import('./components/Engagements').then((m) => ({ default: m.Engagements })));
const TeamPedigree = lazy(() => import('./components/TeamPedigree').then((m) => ({ default: m.TeamPedigree })));
const WhyClixa = lazy(() => import('./components/WhyClixa').then((m) => ({ default: m.WhyClixa })));
const LeadMagnet = lazy(() => import('./components/LeadMagnet').then((m) => ({ default: m.LeadMagnet })));
const FAQSection = lazy(() => import('./components/FAQSection').then((m) => ({ default: m.FAQSection })));
const CTASection = lazy(() => import('./components/CTASection').then((m) => ({ default: m.CTASection })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));
const ContactModal = lazy(() => import('./components/ContactModal').then((m) => ({ default: m.ContactModal })));

/** Réserve la hauteur des sections différées : sans cela la page se
 *  contracterait puis se rallongerait, déplaçant le contenu sous le doigt. */
const SectionFallback: React.FC = () => <div className="h-[600px]" aria-hidden="true" />;

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);

  useEffect(() => {
    const preload = () => {
      import('./components/ContactModal');
    };
    const w = window as unknown as { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) {
      w.requestIdleCallback(preload);
    } else {
      const timer = setTimeout(preload, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleOpenConsultation = (topic?: string) => {
    setSelectedTopic(topic);
    setModalOpen(true);
  };

  const handleCloseConsultation = () => {
    setModalOpen(false);
    setSelectedTopic(undefined);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section based strictly on user recommendation */}
        <Hero onOpenConsultation={handleOpenConsultation} />

        {/* 1.5. Institutional Credibility & Trust Markers */}
        <TrustBanner />

        {/* 2. Brand Positioning & 4 Intersecting Dimensions */}
        <AboutBanner />

        {/* 3. The Core Expertises (ERP Odoo, Web, AMOA, Finance, Process) */}
        <Expertises onOpenConsultation={handleOpenConsultation} />

        {/* Sections suivantes : chargées juste après, sans bloquer le haut de page */}
        <Suspense fallback={<SectionFallback />}>
        {/* 3.5. Spécialisations Sectorielles (BTP, Industrie, Négoce, Services, Santé, Énergie) */}
        <Secteurs onOpenConsultation={handleOpenConsultation} />

        {/* 4. Case Studies / Cas Clients Concrets with Chiffres Clés */}
        <CaseStudies onOpenConsultation={handleOpenConsultation} />

        {/* 4.5. Retours d'Expérience & Témoignages Dirigeants */}
        <Testimonials onOpenConsultation={handleOpenConsultation} />

        {/* 4.7. Simulateur Interactif de ROI & Rentabilité */}
        <RoiCalculator onOpenConsultation={handleOpenConsultation} />

        {/* 5. Focus Facturation Électronique & Flux */}
        <FacturationElec onOpenConsultation={handleOpenConsultation} />

        {/* 6. Digital Solutions */}
        <SolutionsDigitales onOpenConsultation={handleOpenConsultation} />

        {/* 6.5. Technologies Maîtrisées & Écosystème */}
        <TechStack onOpenConsultation={handleOpenConsultation} />

        {/* 7. Diagnostic / Mini-Audit Express Interactif */}
        <AuditExpress onOpenConsultation={handleOpenConsultation} />

        {/* 7.5. Tableau Comparatif : Pourquoi CLIXA vs Intégrateurs Classiques */}
        <ComparisonTable onOpenConsultation={handleOpenConsultation} />

        {/* 7.8. Pack Diagnostic Flash 48H */}
        <AuditFlash onOpenConsultation={handleOpenConsultation} />

        {/* 8. Proven 4-Step Methodology */}
        <Methodologie onOpenConsultation={handleOpenConsultation} />

        {/* 9. Service Guarantees & Commitments */}
        <Engagements />

        {/* 9.5. Profil des Consultants & Charte Déontologique */}
        <TeamPedigree onOpenConsultation={handleOpenConsultation} />

        {/* 10. Why CLIXA: Hybrid Alignment */}
        <WhyClixa onOpenConsultation={handleOpenConsultation} />

        {/* 10.5. Téléchargement du Livre Blanc Exécutif 2026 */}
        <LeadMagnet onOpenConsultation={handleOpenConsultation} />

        {/* 11. FAQ Stratégique pour Dirigeants */}
        <FAQSection onOpenConsultation={handleOpenConsultation} />

        {/* 12. Conversion CTA */}
        <CTASection onOpenConsultation={handleOpenConsultation} />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={<div className="h-64" aria-hidden="true" />}>
        <Footer />
      </Suspense>

      {/* Floating WhatsApp Quick Action Button */}
      <ChatAssistant />
      <FloatingWhatsApp />

      {/* Lead capture modal : téléchargée seulement à l'ouverture */}
      {modalOpen && (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={modalOpen}
            onClose={handleCloseConsultation}
            initialTopic={selectedTopic}
          />
        </Suspense>
      )}
    </div>
  );
};

export default App;
