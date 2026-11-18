import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ChatAssistant } from './components/ChatAssistant';

import { AccueilFace } from './components/faces/AccueilFace';
import { ExpertisesFace } from './components/faces/ExpertisesFace';
import { SecteursFace } from './components/faces/SecteursFace';
import { CaseStudiesFace } from './components/faces/CaseStudiesFace';
import { InsightsFace } from './components/faces/InsightsFace';
import { ExecutiveLabFace } from './components/faces/ExecutiveLabFace';
import { MethodologieFace } from './components/faces/MethodologieFace';
import { ContactFace } from './components/faces/ContactFace';
import { FacturationElectroniqueFace } from './components/faces/FacturationElectroniqueFace';

const FACES = ['accueil', 'expertises', 'secteurs', 'cas-clients', 'insights', 'simulateur-roi', 'methode', 'contact', 'facturation-electronique'];

/** Faces servies sur un vrai chemin plutôt que dans le hash (voir vite.config.ts). */
const CHEMINS: Record<string, string> = {
  'facturation-electronique': '/facturation-electronique',
};

const getFaceFromLocation = (): string => {
  const parChemin = Object.keys(CHEMINS).find(
    (face) => window.location.pathname.replace(/\/+$/, '') === CHEMINS[face]
  );
  if (parChemin) return parChemin;
  const raw = window.location.hash.replace(/^#\/?/, '');
  return FACES.includes(raw) ? raw : 'accueil';
};

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

  // Routeur des faces. La plupart vivent dans le hash (#/expertises…) ;
  // celles de CHEMINS ont une vraie adresse pour être indexées par Google,
  // qui ignore tout ce qui suit le #.
  useEffect(() => {
    const syncFace = () => {
      const face = getFaceFromLocation();
      // Ancienne adresse #/facturation-electronique : on bascule vers le chemin.
      const chemin = CHEMINS[face];
      if (chemin && window.location.pathname !== chemin) {
        window.history.replaceState(null, '', chemin);
      }
      setCurrentFace(face);
    };

    syncFace();

    const handleLocationChange = () => {
      syncFace();
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
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

  const handleNavigateFace = (faceId: string) => {
    const url = CHEMINS[faceId] ?? `/#/${faceId}`;
    if (window.location.pathname + window.location.hash !== url) {
      window.history.pushState(null, '', url);
    }
    setCurrentFace(faceId);
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
      case 'facturation-electronique':
        return (
          <FacturationElectroniqueFace
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
        <div key={currentFace} className="animate-face-enter">
          {renderActiveFace()}
        </div>
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
