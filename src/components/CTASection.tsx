import React from 'react';
import { ArrowUpRight, MessageSquare, PhoneCall, Mail, Clock, MessageCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../data/content';

interface CTASectionProps {
  onOpenConsultation: (topic?: string) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="contact" className="face-section py-24 bg-[#050811] border-b border-white/[0.08] relative overflow-hidden scroll-mt-24">
      {/* Radial ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-sky-500/[0.06] via-blue-600/[0.06] to-indigo-500/[0.04] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 mb-6 shadow-sm">
          <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-heading uppercase tracking-wider text-[11px]">Échange Confidentiel C-Level</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 font-heading">
          Votre transformation commence <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-200 to-sky-400">
            par un cadrage stratégique.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-4 font-normal font-sans">
          Vous préparez l'intégration d'un ERP Odoo, la refonte de vos outils web ou l'optimisation financière de vos processus ?
        </p>

        <p className="text-sm sm:text-base text-sky-300 font-semibold mb-10 font-heading">
          Échangez directement avec un associé CLIXA pour valider votre feuille de route.
        </p>

        {/* Dual Direct Contacts Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 text-left">
          {/* Maroc */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/[0.08] flex items-center justify-between shadow-xl backdrop-blur-md hover:border-sky-500/40 transition-colors">
            <div className="flex items-center gap-3.5">
              <span className="text-2xl">🇲🇦</span>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Direction Générale Maroc (Casablanca)</div>
                <a
                  href={`tel:${BRAND.phoneMarocRaw}`}
                  className="font-mono text-base font-bold text-white hover:text-sky-300 transition-colors"
                >
                  {BRAND.phoneMarocDisplay}
                </a>
              </div>
            </div>
            <a
              href={`tel:${BRAND.phoneMarocRaw}`}
              className="p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-sky-400 hover:bg-sky-500 hover:text-white transition-all shadow-sm"
              title="Appeler Casablanca"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>

          {/* France */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/[0.08] flex items-center justify-between shadow-xl backdrop-blur-md hover:border-sky-500/40 transition-colors">
            <div className="flex items-center gap-3.5">
              <span className="text-2xl">🇫🇷</span>
              <div>
                <div className="text-[11px] text-slate-400 font-medium">Direction Europe (Toulouse)</div>
                <a
                  href={`tel:${BRAND.phoneFranceRaw}`}
                  className="font-mono text-base font-bold text-white hover:text-sky-300 transition-colors"
                >
                  {BRAND.phoneFranceDisplay}
                </a>
              </div>
            </div>
            <a
              href={`tel:${BRAND.phoneFranceRaw}`}
              className="p-3 rounded-xl bg-slate-800 border border-white/[0.08] text-sky-400 hover:bg-sky-500 hover:text-white transition-all shadow-sm"
              title="Appeler Toulouse"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={() => onOpenConsultation()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 hover:from-sky-500 hover:to-blue-500 transition-all shadow-xl shadow-sky-500/25 active:scale-[0.98] cursor-pointer border border-sky-400/30 font-heading"
          >
            <span>Prendre un rendez-vous exécutif</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>

          <a
            href={BRAND.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-semibold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span>Ligne WhatsApp Privée</span>
          </a>
        </div>

        {/* C-Level Trust Seals */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-8 border-t border-white/[0.06] text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-sky-400" />
            <span>Réponse garantie sous 4h ouvrées</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Accord de confidentialité (NDA) immédiat</span>
          </div>

          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Sans engagement & 100% indépendant</span>
          </div>
        </div>

      </div>
    </section>
  );
};
