import React, { useState } from 'react';
import { BRAND } from '../data/content';
import { Mail, Phone, MapPin, ArrowUp, MessageCircle, Send, CheckCircle2, ShieldCheck, Lock, FileText } from 'lucide-react';
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
      <footer className="bg-slate-950 border-t border-slate-850 pt-16 pb-12 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Strategic Newsletter Banner */}
          <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center lg:text-left">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                La Note Stratégique CLIXA
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Recevez notre veille mensuelle sur l'ERP Odoo et la Facturation 2026
              </h3>
              <p className="text-xs text-slate-400">
                Synthèse réservée aux dirigeants : fiscalité DGI/DGFIP, retours d'expérience et leviers de performance.
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
                    placeholder="Votre email professionnel..."
                    className="w-full sm:w-72 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-bold text-white transition-colors cursor-pointer whitespace-nowrap shadow-md shadow-sky-500/20"
                  >
                    S'inscrire
                  </button>
                </form>
              ) : (
                <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-700/50 text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Inscription confirmée ! Vous recevrez la prochaine note mensuelle.</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-850">
            
            {/* Brand Col */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/80 p-1 flex items-center justify-center shadow-inner">
                  <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
                    <path d="M14 16L24 24L14 32" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M34 16L24 24L34 32" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="24" cy="24" r="3.5" fill="#38BDF8"/>
                  </svg>
                </div>
                <span className="font-extrabold text-lg tracking-tight text-white">
                  CLIXA <span className="text-slate-400 font-semibold text-sm">CONSULTING</span>
                </span>
              </div>

              <p className="text-xs text-sky-400 font-medium tracking-wide uppercase">
                {BRAND.tagline}
              </p>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                Cabinet de conseil accompagnant les dirigeants dans l'intégration ERP, la digitalisation des opérations et l'optimisation durable de leur performance.
              </p>

              <div className="pt-2 text-xs text-slate-500 font-mono">
                ERP Odoo • Web & Digital • AMOA • Finance • Process
              </div>
            </div>

            {/* Expertises Col */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                Pôles Stratégiques
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <a href="#expertises" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-400 text-xs">★</span>
                    <span className="text-slate-200 font-medium">Intégration ERP Odoo</span>
                  </a>
                </li>
                <li>
                  <a href="#digital" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-400 text-xs">★</span>
                    <span className="text-slate-200 font-medium">Web & Communication</span>
                  </a>
                </li>
                <li>
                  <a href="#expertises" className="hover:text-sky-400 transition-colors flex items-center gap-1.5">
                    <span className="text-sky-400 text-xs">★</span>
                    <span className="text-slate-200 font-medium">AMOA Systèmes d'Info</span>
                  </a>
                </li>
                <li>
                  <a href="#facturation" className="hover:text-sky-400 transition-colors">
                    Facturation Électronique
                  </a>
                </li>
                <li>
                  <a href="#expertises" className="hover:text-sky-400 transition-colors">
                    Performance & Finance
                  </a>
                </li>
                <li>
                  <a href="#secteurs" className="hover:text-sky-400 transition-colors">
                    Secteurs d'Activité
                  </a>
                </li>
              </ul>
            </div>

            {/* Méthode & Navigation */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                Approche CLIXA
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <a href="#methode" className="hover:text-sky-400 transition-colors">Notre Méthode (01-04)</a>
                </li>
                <li>
                  <a href="#comparatif" className="hover:text-sky-400 transition-colors">Pourquoi CLIXA ?</a>
                </li>
                <li>
                  <a href="#simulateur-roi" className="hover:text-sky-400 transition-colors">Simulateur ROI</a>
                </li>
                <li>
                  <a href="#audit-flash" className="hover:text-sky-400 transition-colors">Diagnostic Flash 48H</a>
                </li>
                <li>
                  <a href="#guide-dirigeant" className="hover:text-sky-400 transition-colors">Livre Blanc Exécutif</a>
                </li>
                <li>
                  <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Support WhatsApp Direct</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Col - Dual Presence Maroc & France */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                Contacts & Agences
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <a href={`mailto:${BRAND.contactEmail}`} className="flex items-center gap-2 text-white hover:text-sky-400 transition-colors font-medium">
                    <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{BRAND.contactEmail}</span>
                  </a>
                </li>

                <li className="pt-1">
                  <div className="text-[11px] text-slate-400 uppercase font-mono">Maroc :</div>
                  <a href={`tel:${BRAND.phoneMarocRaw}`} className="flex items-center gap-2 text-slate-200 hover:text-sky-400 transition-colors font-mono font-bold">
                    <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{BRAND.phoneMarocDisplay}</span>
                  </a>
                </li>

                <li>
                  <div className="text-[11px] text-slate-400 uppercase font-mono">France :</div>
                  <a href={`tel:${BRAND.phoneFranceRaw}`} className="flex items-center gap-2 text-slate-200 hover:text-sky-400 transition-colors font-mono font-bold">
                    <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{BRAND.phoneFranceDisplay}</span>
                  </a>
                </li>

                <li className="flex items-start gap-2 pt-1 text-slate-400">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Casablanca & Paris</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div>
              © {new Date().getFullYear()} CLIXA Consulting (<a href="https://clixa.ma" className="text-slate-400 hover:text-white">clixa.ma</a>). Tous droits réservés.
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
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
                Confidentialité & CNDP / RGPD
              </button>
              <button
                onClick={scrollToTop}
                className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer ml-2"
                title="Retour en haut"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Legal & Privacy Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        type={legalType}
      />
    </>
  );
};
