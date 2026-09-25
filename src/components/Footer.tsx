import React, { useState } from 'react';
import { BRAND } from '../data/content';
import { Mail, Phone, MapPin, ArrowUp, MessageCircle, Send, CheckCircle2, ShieldCheck, Lock, FileText, Globe, ArrowUpRight } from 'lucide-react';
import { LegalModal } from './LegalModal';

export const Footer: React.FC = () => {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalType, setLegalType] = useState<'mentions' | 'privacy'>('mentions');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSuccess(true);
  };

  const openLegal = (type: 'mentions' | 'privacy') => {
    setLegalType(type);
    setLegalModalOpen(true);
  };

  return (
    <>
      <footer className="bg-[#03050c] border-t border-white/[0.08] pt-16 pb-12 text-slate-400 text-sm font-sans" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 1. STRATEGIC EXECUTIVE NEWSLETTER BANNER (SQLI High-Level Briefing) */}
          <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl backdrop-blur-md">
            <div className="space-y-1 text-center lg:text-left">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-400">
                La Note Stratégique Exécutive CLIXA
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-heading">
                Recevez notre veille C-Suite : ERP Odoo, Facturation 2026 & Rigueur SI
              </h3>
              <p className="text-xs text-slate-400 font-sans">
                Synthèse trimestrielle réservée aux comités de direction : conformité fiscale DGI/DGFIP, benchmarks sectoriels et cas pratiques.
              </p>
            </div>

            <div className="w-full lg:w-auto">
              {!newsletterSuccess ? (
                <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Votre adresse email professionnelle..."
                    className="w-full sm:w-72 px-4 py-2.5 rounded-xl bg-slate-950 border border-white/[0.08] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-bold text-white transition-colors cursor-pointer whitespace-nowrap shadow-md shadow-sky-500/20 font-heading"
                  >
                    S'abonner
                  </button>
                </form>
              ) : (
                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-700/50 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Inscription enregistrée avec succès.</span>
                </div>
              )}
            </div>
          </div>

          {/* 2. SQLI MULTI-COLUMN CORPORATE STRUCTURE */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.08]">
            
            {/* Brand Col */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                {/* SQLI Twin Rectangles Emblem */}
                <div className="flex items-end gap-1 h-6">
                  <div className="w-1.5 h-6 rounded-sm bg-sky-400" />
                  <div className="w-1.5 h-4 rounded-sm bg-blue-600" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white font-heading">
                    CLIXA
                  </span>
                  <span className="text-slate-400 font-semibold text-xs tracking-widest uppercase font-mono">
                    CONSULTING
                  </span>
                </div>
              </div>

              <p className="text-xs text-sky-400 font-medium tracking-wide uppercase font-mono">
                {BRAND.tagline}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm font-sans">
                Cabinet de conseil de direction générale accompagnant les entreprises dans l'intégration ERP Odoo, l'architecture des systèmes d'information et la conformité réglementaire.
              </p>

              {/* Direct Hubs Badge */}
              <div className="pt-2 text-xs text-slate-400 font-mono space-y-1">
                <div className="flex items-center gap-2 text-slate-300">
                  <span>🇲🇦</span>
                  <span><strong>Casablanca :</strong> Casablanca Finance City (CFC) & Twin Center</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <span>🇫🇷</span>
                  <span><strong>Paris :</strong> 8ème Arrondissement (Europe & AMOA)</span>
                </div>
              </div>
            </div>

            {/* Col 1: Pôles d'Excellence */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
                Pôles d'Excellence
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <a href="#expertises" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-400 text-xs">★</span>
                    <span className="text-slate-200 font-medium">Intégration ERP Odoo</span>
                  </a>
                </li>
                <li>
                  <a href="#expertises" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-400 text-xs">★</span>
                    <span className="text-slate-200 font-medium">Web & Solutions Digitales</span>
                  </a>
                </li>
                <li>
                  <a href="#expertises" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-400 text-xs">★</span>
                    <span className="text-slate-200 font-medium">AMOA Systèmes d'Info</span>
                  </a>
                </li>
                <li>
                  <a href="#expertises" className="hover:text-sky-400 transition-colors">
                    Performance & Finance
                  </a>
                </li>
                <li>
                  <a href="#expertises" className="hover:text-sky-400 transition-colors">
                    Facturation Électronique DGI/DGFIP
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 2: Approche & Outils */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
                Approche & Outils
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <a href="#cas-clients" className="hover:text-sky-400 transition-colors">
                    Cas Clients & ROI
                  </a>
                </li>
                <li>
                  <a href="#simulateur-roi" className="hover:text-sky-400 transition-colors">
                    Simulateur de Rentabilité
                  </a>
                </li>
                <li>
                  <a href="#simulateur-roi" className="hover:text-sky-400 transition-colors">
                    Diagnostic Flash 48H
                  </a>
                </li>
                <li>
                  <a href="#methode" className="hover:text-sky-400 transition-colors">
                    Méthodologie en 4 Phases
                  </a>
                </li>
                <li>
                  <a href="#secteurs" className="hover:text-sky-400 transition-colors">
                    Spécialisations Métiers
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Contacts Directs C-Suite */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
                Lignes Directes
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href={`tel:${BRAND.phoneMarocRaw}`} className="text-white hover:text-sky-300 font-mono transition-colors block">
                    <span className="text-slate-400 block text-[10px]">Siège Maroc (Casablanca) :</span>
                    {BRAND.phoneMarocDisplay}
                  </a>
                </li>
                <li>
                  <a href={`tel:${BRAND.phoneFranceRaw}`} className="text-white hover:text-sky-300 font-mono transition-colors block">
                    <span className="text-slate-400 block text-[10px]">Bureau Europe (Paris) :</span>
                    {BRAND.phoneFranceDisplay}
                  </a>
                </li>
                <li>
                  <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 pt-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Ligne Directe WhatsApp</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* 3. SQLI LEGAL & BOTTOM ROW */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
            <div>
              © {new Date().getFullYear()} CLIXA Consulting. Tous droits réservés. Cabinet de Conseil & Ingénierie SI.
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => openLegal('mentions')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Mentions Légales
              </button>
              <button
                onClick={() => openLegal('privacy')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Politique de Confidentialité (CNDP / RGPD)
              </button>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-xl bg-slate-900 border border-white/[0.08] text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Haut de page"
                aria-label="Retour en haut de page"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Modal Juridique */}
      {legalModalOpen && (
        <LegalModal
          isOpen={legalModalOpen}
          onClose={() => setLegalModalOpen(false)}
          type={legalType}
        />
      )}
    </>
  );
};
