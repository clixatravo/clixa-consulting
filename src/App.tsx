import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBanner } from './components/TrustBanner';
import { AboutBanner } from './components/AboutBanner';
import { Expertises } from './components/Expertises';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ChatAssistant } from './components/ChatAssistant';

/* ---------------------------------------------------------------------------
   Découpage optimisé du bundle pour des performances 60fps & un chargement instantané.
   Seuls l'en-tête, le hero et les premières garanties sont prioritaires.
   ------------------------------------------------------------------------- */
const Secteurs = lazy(() => import('./components/Secteurs').then((m) => ({ default: m.Secteurs })));
const CaseStudies = lazy(() => import('./components/CaseStudies').then((m) => ({ default: m.CaseStudies })));
const Testimonials = lazy(() => import('./components/Testimonials').then((m) => ({ default: m.Testimonials })));
const RoiCalculator = lazy(() => import('./components/RoiCalculator').then((m) => ({ default: m.RoiCalculator })));
const ComparisonTable = lazy(() => import('./components/ComparisonTable').then((m) => ({ default: m.ComparisonTable })));
const AuditFlash = lazy(() => import('./components/AuditFlash').then((m) => ({ default: m.AuditFlash })));
const Methodologie = lazy(() => import('./components/Methodologie').then((m) => ({ default: m.Methodologie })));
const FAQSection = lazy(() => import('./components/FAQSection').then((m) => ({ default: m.FAQSection })));
const CTASection = lazy(() => import('./components/CTASection').then((m) => ({ default: m.CTASection })));
const Footer = lazy(() => import('./components/Footer').then((m) => ({ default: m.Footer })));
const ContactModal = lazy(() => import('./components/ContactModal').then((m) => ({ default: m.ContactModal })));

/** Réserve la hauteur des sections différées */
const SectionFallback: React.FC = () => <div className="h-[400px]" aria-hidden="true" />;

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
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white font-sans antialiased">
      {/* 1. Header Exécutif Ultra-Luxury Frosted Glass */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main Executive Briefing Flow */}
      <main className="flex-1">
        {/* 1. Le Salon Exécutif (Positionnement, Chiffres Clés & 3 Pôles Stratégiques) */}
        <Hero onOpenConsultation={handleOpenConsultation} />

        {/* 2. Garanties Institutionnelles & Écosystème (Odoo, DGI/DGFIP, AMOA, NDA) */}
        <TrustBanner />

        {/* 3. Doctrine d'Intervention & Carrefour Stratégique 360° */}
        <AboutBanner />

        {/* 4. Pôles d'Excellence & Matrice de Compétences (Dossiers interactifs ERP Odoo, Web, AMOA, Finance) */}
        <Expertises onOpenConsultation={handleOpenConsultation} />

        {/* Sections suivantes chargées en différé sans bloquer le rendu */}
        <Suspense fallback={<SectionFallback />}>
          {/* 5. Spécialisations Sectorielles (BTP, Industrie, Négoce, Services, Santé, Énergie) */}
          <Secteurs onOpenConsultation={handleOpenConsultation} />

          {/* 6. Dossiers d'Impact & Études de Cas Chiffrées */}
          <CaseStudies onOpenConsultation={handleOpenConsultation} />

          {/* 7. Retours d'Expérience C-Level & Témoignages Dirigeants */}
          <Testimonials onOpenConsultation={handleOpenConsultation} />

          {/* 8. Simulateur Financier de Rentabilité & Payback (MAD / EUR) */}
          <RoiCalculator onOpenConsultation={handleOpenConsultation} />

          {/* 9. Pack Diagnostic Flash 48H (Cadrage Exécutif Indépendant) */}
          <AuditFlash onOpenConsultation={handleOpenConsultation} />

          {/* 10. Méthodologie en 4 Phases & Gouvernance Rigoureuse */}
          <Methodologie onOpenConsultation={handleOpenConsultation} />

          {/* 11. Benchmark : Pourquoi les Comités de Direction Choisissent CLIXA vs SSII */}
          <ComparisonTable onOpenConsultation={handleOpenConsultation} />

          {/* 12. Foire Aux Questions Stratégiques des Dirigeants */}
          <FAQSection onOpenConsultation={handleOpenConsultation} />

          {/* 13. Consultation Exécutive & Prise de Rendez-vous Confidentielle */}
          <CTASection onOpenConsultation={handleOpenConsultation} />
        </Suspense>
      </main>

      {/* Footer Institutionnel */}
      <Suspense fallback={<div className="h-64" aria-hidden="true" />}>
        <Footer />
      </Suspense>

      {/* Assistant IA Exécutif */}
      <ChatAssistant />

      {/* Bouton Flottant WhatsApp Direct */}
      <FloatingWhatsApp />

      {/* Modale de Prise de Rendez-vous Exécutif */}
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
