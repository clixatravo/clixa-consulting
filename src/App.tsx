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
import { FaceNavigator, FACES } from './components/FaceNavigator';

/* Dynamic load for consultation modal */
const ContactModal = lazy(() => import('./components/ContactModal').then((m) => ({ default: m.ContactModal })));

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);
  const [activeFace, setActiveFace] = useState<string>('accueil');

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

  // SQLI Scroll Observer: tracks current face and triggers entrance animations
  useEffect(() => {
    const faceIds = FACES.map(f => f.id);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;

      for (let i = faceIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(faceIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveFace(faceIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // IntersectionObserver for SQLI animation-scroll--scrolled elements
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animation-scroll--scrolled');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const animElements = document.querySelectorAll('.animation-scroll, .face-section');
    animElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleOpenConsultation = (topic?: string) => {
    setSelectedTopic(topic);
    setModalOpen(true);
  };

  const handleCloseConsultation = () => {
    setModalOpen(false);
    setSelectedTopic(undefined);
  };

  const handleNavigateFace = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = 90;
      const elementY = el.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: elementY, behavior: 'smooth' });
      setActiveFace(targetId);
    }
  };

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white font-sans antialiased relative">
      {/* 1. SQLI Header Exécutif avec navigation fluide */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Floating Vertical Face-to-Face Navigation Rail (01 / 02 / 03 / ... / 07) */}
      <FaceNavigator activeFace={activeFace} onNavigate={handleNavigateFace} />

      {/* Main Executive Briefing Flow (SQLI Architectural Faces) */}
      <main className="flex-1">
        {/* Face 01: Le Grand Salon Exécutif (Hero Cinematic + Cockpit SI Live + 3 Pôles Majeurs) */}
        <Hero onOpenConsultation={handleOpenConsultation} />

        {/* Chiffres Clés Bloomberg & SQLI Infinite Continuous Marquee */}
        <TrustBanner />

        {/* Doctrine d'Intervention & Carrefour Stratégique 360° */}
        <AboutBanner />

        {/* Face 02: SQLI Push-Services (2-Column Split: Expertises & Architecture SI) */}
        <Expertises onOpenConsultation={handleOpenConsultation} />

        {/* Face 03: Spécialisations Sectorielles Métiers (Industrie, BTP, Négoce, Santé, Services) */}
        <Secteurs onOpenConsultation={handleOpenConsultation} />

        {/* Face 04: SQLI Push-Use-Cases (Carousel & Cartes Éditoriales à Fort ROI) */}
        <CaseStudies onOpenConsultation={handleOpenConsultation} />

        {/* Retours d'Expérience C-Level & Témoignages Dirigeants Vérifiés */}
        <Testimonials onOpenConsultation={handleOpenConsultation} />

        {/* Face 05: Executive Decision Lab (Simulateur ROI Interactif + Diagnostic Flash 48H) */}
        <ExecutiveLab onOpenConsultation={handleOpenConsultation} />

        {/* Face 06: Méthodologie en 4 Phases Éprouvées & Gouvernance Big 4 */}
        <Methodologie onOpenConsultation={handleOpenConsultation} />

        {/* Benchmark Différenciateur : Pourquoi Choisir CLIXA vs SSII */}
        <ComparisonTable onOpenConsultation={handleOpenConsultation} />

        {/* Foire Aux Questions Stratégiques des Directeurs */}
        <FAQSection onOpenConsultation={handleOpenConsultation} />

        {/* Face 07: Consultation Exécutive & Prise de Rendez-vous Confidentielle */}
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
