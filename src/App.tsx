import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ChatAssistant } from './components/ChatAssistant';

import { AccueilFace } from './components/faces/AccueilFace';
import { ExpertisesFace } from './components/faces/ExpertisesFace';
import { SecteursFace } from './components/faces/SecteursFace';
import { CaseStudiesFace } from './components/faces/CaseStudiesFace';
import { FormationsFace } from './components/faces/FormationsFace';
import { InsightsFace } from './components/faces/InsightsFace';
import { ExecutiveLabFace } from './components/faces/ExecutiveLabFace';
import { MethodologieFace } from './components/faces/MethodologieFace';
import { ContactFace } from './components/faces/ContactFace';

/* Modale de consultation chargée dynamiquement */
const ContactModal = lazy(() => import('./components/ContactModal').then((m) => ({ default: m.ContactModal })));

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);
  const [currentFace, setCurrentFace] = useState<string>('accueil');

  // Preload contact modal
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

  // Hash-based Face Router: matches SQLI URL / Face separation
  useEffect(() => {
    const validFaces = ['accueil', 'expertises', 'secteurs', 'cas-clients', 'formations', 'insights', 'simulateur-roi', 'methode', 'contact'];

    const getHashFace = () => {
      const raw = window.location.hash.replace(/^#\/?/, '');
      if (validFaces.includes(raw)) {
        return raw;
      }
      return 'accueil';
    };

    setCurrentFace(getHashFace());

    const handleHashChange = () => {
      const face = getHashFace();
      setCurrentFace(face);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenConsultation = (topic?: string) => {
    setSelectedTopic(topic);
    setModalOpen(true);
  };

  const handleCloseConsultation = () => {
    setModalOpen(false);
    setSelectedTopic(undefined);
  };

  const handleNavigateFace = (faceId: string) => {
    setCurrentFace(faceId);
    window.location.hash = `#/${faceId}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const renderActiveFace = () => {
    switch (currentFace) {
      case 'expertises':
        return (
          <ExpertisesFace
            onOpenConsultation={handleOpenConsultation}
            onNavigateFace={handleNavigateFace}
          />
        );
      case 'secteurs':
        return (
          <SecteursFace
            onOpenConsultation={handleOpenConsultation}
            onNavigateFace={handleNavigateFace}
          />
        );
      case 'cas-clients':
        return (
          <CaseStudiesFace
            onOpenConsultation={handleOpenConsultation}
            onNavigateFace={handleNavigateFace}
          />
        );
      case 'formations':
        return (
          <FormationsFace
            onOpenConsultation={handleOpenConsultation}
            onNavigateFace={handleNavigateFace}
          />
        );
      case 'insights':
        return (
          <InsightsFace
            onOpenConsultation={handleOpenConsultation}
            onNavigateFace={handleNavigateFace}
          />
        );
      case 'simulateur-roi':
        return (
          <ExecutiveLabFace
            onOpenConsultation={handleOpenConsultation}
            onNavigateFace={handleNavigateFace}
          />
        );
      case 'methode':
        return (
          <MethodologieFace
            onOpenConsultation={handleOpenConsultation}
            onNavigateFace={handleNavigateFace}
          />
        );
      case 'contact':
        return (
          <ContactFace
            onOpenConsultation={handleOpenConsultation}
            onNavigateFace={handleNavigateFace}
          />
        );
      case 'accueil':
      default:
        return (
          <AccueilFace
            onOpenConsultation={handleOpenConsultation}
            onNavigateFace={handleNavigateFace}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white font-sans antialiased relative">
      {/* 1. Header Exécutif avec navigation SQLI */}
      <Navbar
        currentFace={currentFace}
        onNavigateFace={handleNavigateFace}
        onOpenConsultation={handleOpenConsultation}
      />

      {/* 2. Main Face Viewport (Chaque Face est isolée, majestueuse & sans encombrement) */}
      <main className="flex-1 min-h-[80vh]">
        {renderActiveFace()}
      </main>

      {/* 3. Footer Institutionnel SQLI Standard */}
      <Footer onNavigateFace={handleNavigateFace} />

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
