import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBanner } from './components/TrustBanner';
import { AboutBanner } from './components/AboutBanner';
import { Expertises } from './components/Expertises';
import { Secteurs } from './components/Secteurs';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { RoiCalculator } from './components/RoiCalculator';
import { AuditFlash } from './components/AuditFlash';
import { Methodologie } from './components/Methodologie';
import { ComparisonTable } from './components/ComparisonTable';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ChatAssistant } from './components/ChatAssistant';

/* Modale de consultation chargée dynamiquement pour préserver la mémoire */
const ContactModal = lazy(() => import('./components/ContactModal').then((m) => ({ default: m.ContactModal })));

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
      {/* 1. Header Exécutif avec navigation fiable & fluide */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main Executive Briefing Flow */}
      <main className="flex-1">
        {/* 1. Le Grand Salon Exécutif (Positionnement, Titre & 3 Pôles Majeurs) */}
        <Hero onOpenConsultation={handleOpenConsultation} />

        {/* 2. Chiffres Clés & Garanties Institutionnelles (Odoo, DGI/DGFIP, AMOA, NDA) */}
        <TrustBanner />

        {/* 3. Doctrine d'Intervention & Carrefour Stratégique 360° */}
        <AboutBanner />

        {/* 4. Pôles d'Excellence & Matrice de Compétences (ERP Odoo, Web, AMOA, Finance) */}
        <Expertises onOpenConsultation={handleOpenConsultation} />

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
      </main>

      {/* Footer Institutionnel */}
      <Footer />

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
