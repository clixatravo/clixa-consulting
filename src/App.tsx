import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBanner } from './components/TrustBanner';
import { AboutBanner } from './components/AboutBanner';
import { Expertises } from './components/Expertises';
import { Secteurs } from './components/Secteurs';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { ExecutiveLab } from './components/ExecutiveLab';
import { Methodologie } from './components/Methodologie';
import { ComparisonTable } from './components/ComparisonTable';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ChatAssistant } from './components/ChatAssistant';

/* Dynamic load for consultation modal */
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
      {/* 1. SQLI Header Exécutif avec navigation fiable & fluide */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main Executive Briefing Flow (SQLI Architectural Faces) */}
      <main className="flex-1">
        {/* Face 1: Le Grand Salon Exécutif (Hero Cinematic + Cockpit SI Live + 3 Pôles Majeurs) */}
        <Hero onOpenConsultation={handleOpenConsultation} />

        {/* Face 2: Chiffres Clés Bloomberg & SQLI Infinite Marquee Slider */}
        <TrustBanner />

        {/* Face 3: Doctrine d'Intervention & Carrefour Stratégique 360° */}
        <AboutBanner />

        {/* Face 4: SQLI Push-Services (2-Column Split: Expertises & Architecture SI) */}
        <Expertises onOpenConsultation={handleOpenConsultation} />

        {/* Face 5: Spécialisations Sectorielles Métiers (Industrie, BTP, Négoce, Santé, Services) */}
        <Secteurs onOpenConsultation={handleOpenConsultation} />

        {/* Face 6: SQLI Push-Use-Cases (2-Column Split: Case Studies & ROI Vérifiés) */}
        <CaseStudies onOpenConsultation={handleOpenConsultation} />

        {/* Face 7: Retours d'Expérience C-Level & Témoignages Dirigeants Vérifiés */}
        <Testimonials onOpenConsultation={handleOpenConsultation} />

        {/* Face 8: Executive Decision Lab (Simulateur ROI Interactif + Diagnostic Flash 48H) */}
        <ExecutiveLab onOpenConsultation={handleOpenConsultation} />

        {/* Face 9: Méthodologie en 4 Phases Éprouvées & Gouvernance Big 4 */}
        <Methodologie onOpenConsultation={handleOpenConsultation} />

        {/* Face 10: Benchmark Différenciateur : Pourquoi Choisir CLIXA vs SSII */}
        <ComparisonTable onOpenConsultation={handleOpenConsultation} />

        {/* Face 11: Foire Aux Questions Stratégiques des Directeurs */}
        <FAQSection onOpenConsultation={handleOpenConsultation} />

        {/* Face 12: Consultation Exécutive & Prise de Rendez-vous Confidentielle */}
        <CTASection onOpenConsultation={handleOpenConsultation} />
      </main>

      {/* Footer Institutionnel SQLI Standard */}
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
