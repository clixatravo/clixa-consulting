import React, { useState, lazy, Suspense, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutBanner } from './components/AboutBanner';
import { Expertises } from './components/Expertises';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CookieConsent } from './components/CookieConsent';
import { trackLead } from './lib/analytics';
import type { LegalTab } from './components/LegalModal';

/* ---------------------------------------------------------------------------
   Découpage du bundle.
   Tout tenait dans un seul fichier de 278 Ko : le téléphone devait le
   télécharger, l'analyser et l'exécuter en entier avant d'afficher quoi que ce
   soit. Seuls la navigation et le haut de page sont désormais chargés
   d'emblée ; le reste arrive juste après, sans bloquer le premier rendu.
   Les deux modales ne sont chargées qu'à l'ouverture.
   ------------------------------------------------------------------------- */
const CaseStudies = lazy(() => import('./components/CaseStudies').then(m => ({ default: m.CaseStudies })));
const FacturationElec = lazy(() => import('./components/FacturationElec').then(m => ({ default: m.FacturationElec })));
const SolutionsDigitales = lazy(() => import('./components/SolutionsDigitales').then(m => ({ default: m.SolutionsDigitales })));
const AuditExpress = lazy(() => import('./components/AuditExpress').then(m => ({ default: m.AuditExpress })));
const Methodologie = lazy(() => import('./components/Methodologie').then(m => ({ default: m.Methodologie })));
const Engagements = lazy(() => import('./components/Engagements').then(m => ({ default: m.Engagements })));
const WhyClixa = lazy(() => import('./components/WhyClixa').then(m => ({ default: m.WhyClixa })));
const FAQSection = lazy(() => import('./components/FAQSection').then(m => ({ default: m.FAQSection })));
const CTASection = lazy(() => import('./components/CTASection').then(m => ({ default: m.CTASection })));
const Footer = lazy(() => import('./components/Footer').then(m => ({ default: m.Footer })));
const ContactModal = lazy(() => import('./components/ContactModal').then(m => ({ default: m.ContactModal })));
const LegalModal = lazy(() => import('./components/LegalModal').then(m => ({ default: m.LegalModal })));

/** Réserve la hauteur d'une section en attente de chargement : sans cela la
 *  page se contracterait puis se rallongerait, déplaçant le contenu sous le
 *  doigt du visiteur. */
const SectionFallback: React.FC = () => <div className="h-[600px]" aria-hidden="true" />;

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<LegalTab>('mentions');

  // Précharge la modale de contact dès que le navigateur est inactif : elle
  // s'ouvre alors instantanément au clic, sans attente de téléchargement.
  useEffect(() => {
    const preload = () => {
      import('./components/ContactModal');
    };
    const w = window as unknown as { requestIdleCallback?: (cb: () => void) => number };
    if (w.requestIdleCallback) {
      w.requestIdleCallback(preload);
    } else {
      const t = setTimeout(preload, 2500);
      return () => clearTimeout(t);
    }
  }, []);

  const handleOpenConsultation = (topic?: string) => {
    setSelectedTopic(topic);
    setModalOpen(true);
    // Conversion Meta Pixel : ne se declenche que si le visiteur a consenti.
    trackLead(topic);
  };

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalTab(tab);
    setLegalOpen(true);
  };

  const handleCloseConsultation = () => {
    setModalOpen(false);
    setSelectedTopic(undefined);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      <Navbar onOpenConsultation={handleOpenConsultation} />

      <main className="flex-1">
        {/* Chargés d'emblée : visibles au premier écran */}
        <Hero onOpenConsultation={handleOpenConsultation} />
        <AboutBanner />
        <Expertises onOpenConsultation={handleOpenConsultation} />

        {/* Chargés juste après, sans bloquer l'affichage du haut de page */}
        <Suspense fallback={<SectionFallback />}>
          <CaseStudies onOpenConsultation={handleOpenConsultation} />
          <FacturationElec onOpenConsultation={handleOpenConsultation} />
          <SolutionsDigitales onOpenConsultation={handleOpenConsultation} />
          <AuditExpress onOpenConsultation={handleOpenConsultation} />
          <Methodologie onOpenConsultation={handleOpenConsultation} />
          <Engagements />
          <WhyClixa onOpenConsultation={handleOpenConsultation} />
          <FAQSection onOpenConsultation={handleOpenConsultation} />
          <CTASection onOpenConsultation={handleOpenConsultation} />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-64" aria-hidden="true" />}>
        <Footer onOpenLegal={handleOpenLegal} />
      </Suspense>

      <FloatingWhatsApp />

      {/* Modales : téléchargées seulement à l'ouverture */}
      {modalOpen && (
        <Suspense fallback={null}>
          <ContactModal
            isOpen={modalOpen}
            onClose={handleCloseConsultation}
            initialTopic={selectedTopic}
          />
        </Suspense>
      )}

      {legalOpen && (
        <Suspense fallback={null}>
          <LegalModal
            isOpen={legalOpen}
            tab={legalTab}
            onChangeTab={setLegalTab}
            onClose={() => setLegalOpen(false)}
          />
        </Suspense>
      )}

      <CookieConsent onOpenLegal={handleOpenLegal} />
    </div>
  );
};

export default App;
