import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustBanner } from './components/TrustBanner';
import { AboutBanner } from './components/AboutBanner';
import { Expertises } from './components/Expertises';
import { CaseStudies } from './components/CaseStudies';
import { FacturationElec } from './components/FacturationElec';
import { SolutionsDigitales } from './components/SolutionsDigitales';
import { AuditExpress } from './components/AuditExpress';
import { Methodologie } from './components/Methodologie';
import { Engagements } from './components/Engagements';
import { WhyClixa } from './components/WhyClixa';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);

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

        {/* 4. Case Studies / Cas Clients Concrets with Chiffres Clés */}
        <CaseStudies onOpenConsultation={handleOpenConsultation} />

        {/* 5. Focus Facturation Électronique & Flux */}
        <FacturationElec onOpenConsultation={handleOpenConsultation} />

        {/* 6. Digital Solutions */}
        <SolutionsDigitales onOpenConsultation={handleOpenConsultation} />

        {/* 7. Diagnostic / Mini-Audit Express Interactif */}
        <AuditExpress onOpenConsultation={handleOpenConsultation} />

        {/* 8. Proven 4-Step Methodology */}
        <Methodologie onOpenConsultation={handleOpenConsultation} />

        {/* 9. Service Guarantees & Commitments */}
        <Engagements />

        {/* 10. Why CLIXA: Hybrid Alignment */}
        <WhyClixa onOpenConsultation={handleOpenConsultation} />

        {/* 11. FAQ Stratégique pour Dirigeants */}
        <FAQSection onOpenConsultation={handleOpenConsultation} />

        {/* 12. Conversion CTA */}
        <CTASection onOpenConsultation={handleOpenConsultation} />
      </main>

      {/* Footer */}
      <Footer />

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
