import React from 'react';
import { ArrowUpRight, MessageSquare, PhoneCall, Mail, Clock, MessageCircle, ShieldCheck } from 'lucide-react';
import { BRAND } from '../data/content';

interface CTASectionProps {
  onOpenConsultation: (topic?: string) => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenConsultation }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800 relative overflow-hidden">
      {/* Glow: lightweight on mobile, rich on desktop */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none transform-gpu" />
      <div className="sm:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-40 bg-sky-500/10 blur-2xl rounded-full pointer-events-none transform-gpu" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400 mb-6">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Premier Contact Sans Engagement</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
          Votre transformation commence <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
            par une conversation.
          </span>
        </h2>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-4 font-normal">
          Vous avez un projet de transformation, d’optimisation, de digitalisation ou de déploiement ERP ?
        </p>

        <p className="text-base sm:text-lg text-sky-400 font-semibold mb-10">
          Échangeons sur vos enjeux et identifions ensemble la meilleure trajectoire.
        </p>

        {/* Dual Direct Contacts Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10 text-left">
          {/* Maroc */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇲🇦</span>
              <div>
                <div className="text-xs text-slate-400 font-medium">Bureau Maroc (Casablanca)</div>
                <a
                  href={`tel:${BRAND.phoneMarocRaw}`}
                  className="font-mono text-base font-bold text-white hover:text-sky-400 transition-colors"
                >
                  {BRAND.phoneMarocDisplay}
                </a>
              </div>
            </div>
            <a
              href={`tel:${BRAND.phoneMarocRaw}`}
              className="p-2.5 rounded-xl bg-slate-800 text-sky-400 hover:bg-sky-500 hover:text-white transition-colors"
              title="Appeler"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>

          {/* France */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇫🇷</span>
              <div>
                <div className="text-xs text-slate-400 font-medium">Bureau France (Paris)</div>
                <a
                  href={`tel:${BRAND.phoneFranceRaw}`}
                  className="font-mono text-base font-bold text-white hover:text-sky-400 transition-colors"
                >
                  {BRAND.phoneFranceDisplay}
                </a>
              </div>
            </div>
            <a
              href={`tel:${BRAND.phoneFranceRaw}`}
              className="p-2.5 rounded-xl bg-slate-800 text-sky-400 hover:bg-sky-500 hover:text-white transition-colors"
              title="Appeler"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <button
            onClick={() => onOpenConsultation()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 transition-all shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Parler à un consultant</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>

          <a
            href={BRAND.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/60 transition-all"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span>Échanger sur WhatsApp</span>
          </a>
          
          <a
            href={`mailto:${BRAND.contactEmail}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-base font-medium text-slate-300 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 hover:text-white transition-all"
          >
            <Mail className="w-4 h-4 text-sky-400" />
            <span>{BRAND.contactEmail}</span>
          </a>
        </div>

        {/* Reassurances */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-850 max-w-2xl mx-auto text-xs text-slate-400">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-sky-400" />
            <span>Réponse garantie sous 24h</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Échange direct avec un associé</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Confidentialité absolue</span>
          </div>
        </div>

      </div>
    </section>
  );
};
