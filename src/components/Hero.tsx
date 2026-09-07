import React from 'react';
import { ArrowUpRight, ArrowDown, MessageCircle, CheckCircle2, TrendingUp } from 'lucide-react';
import { BRAND, CORE_PILLARS, KEY_METRICS } from '../data/content';

interface HeroProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  return (
    <section id="accueil" className="relative min-h-[90vh] flex items-center justify-center pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden bg-slate-950 scroll-mt-24">
      {/* Background radial glow: lightweight on mobile, rich on desktop */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="hidden sm:block absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none transform-gpu" />
      <div className="hidden sm:block absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none transform-gpu" />
      <div className="sm:hidden absolute top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-sky-500/15 blur-2xl rounded-full pointer-events-none transform-gpu" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Slogan Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-[11px] sm:text-xs font-semibold text-sky-400 mb-5 sm:mb-6 shadow-sm backdrop-blur-md">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="tracking-wide uppercase">{BRAND.tagline}</span>
        </div>

        {/* Primary Title recommended by user */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.18] sm:leading-[1.15] mb-5 sm:mb-6">
          Conseil, Transformation <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">
            & Performance
          </span>
        </h1>

        {/* Subtitle recommended by user */}
        <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-6 sm:mb-8 px-2">
          Nous aidons les entreprises à <span className="text-white font-medium">structurer leurs processus</span>,{' '}
          <span className="text-white font-medium">digitaliser leurs opérations</span> et{' '}
          <span className="text-white font-medium">améliorer durablement leur performance</span>.
        </p>

        {/* Pill Tags: Finance • Process • AMOA • ERP Odoo • Digital */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 max-w-3xl mx-auto px-2">
          {BRAND.heroBadges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200 text-xs sm:text-sm font-medium hover:border-sky-500/40 hover:text-white transition-all shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              {badge}
            </span>
          ))}
        </div>

        {/* Primary Actions & Direct Lines */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 max-w-md sm:max-w-none mx-auto">
          <button
            onClick={() => onOpenConsultation()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 transition-all shadow-xl shadow-sky-500/25 active:scale-[0.98] cursor-pointer"
          >
            <span>Parler à un consultant</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <a
            href={BRAND.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/60 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Discuter sur WhatsApp</span>
          </a>

          <a
            href="#expertises"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-medium text-slate-300 bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 hover:text-white transition-all shadow-sm active:scale-[0.98]"
          >
            <span>Explorer nos offres</span>
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Dual Country Quick Call Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10 sm:mb-12 text-xs text-slate-400">
          <a
            href={`tel:${BRAND.phoneMarocRaw}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 hover:text-white transition-all shadow-sm"
          >
            <span>🇲🇦</span>
            <span className="text-slate-300">Maroc :</span>
            <span className="font-mono text-sky-400 font-semibold">{BRAND.phoneMarocDisplay}</span>
          </a>

          <a
            href={`tel:${BRAND.phoneFranceRaw}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 hover:text-white transition-all shadow-sm"
          >
            <span>🇫🇷</span>
            <span className="text-slate-300">France :</span>
            <span className="font-mono text-sky-400 font-semibold">{BRAND.phoneFranceDisplay}</span>
          </a>

          <a
            href={`mailto:${BRAND.contactEmail}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 hover:text-white transition-all shadow-sm"
          >
            <span>✉️</span>
            <span className="text-white font-medium">{BRAND.contactEmail}</span>
          </a>
        </div>

        {/* Executive Metrics / Chiffres Clés Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-14 max-w-5xl mx-auto">
          {KEY_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 shadow-lg text-center group"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400 mb-1 group-hover:scale-105 transition-transform duration-300">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-white mb-0.5">
                {metric.label}
              </div>
              <div className="text-[10px] sm:text-xs text-slate-400 font-normal">
                {metric.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* The 3 Core Pillars Highlight Cards with Realistic Professional Photos */}
        <div className="text-left mb-6">
          <div className="flex items-center justify-between mb-4 sm:mb-5 px-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              Nos 3 Pôles Stratégiques Majeurs
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">Expertise opérationnelle certifiée</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {CORE_PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                onClick={() => onOpenConsultation(pillar.title)}
                className="rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-sky-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-sky-500/5 group cursor-pointer flex flex-col justify-between overflow-hidden relative"
              >
                {/* Top Subtle Gradient Border Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Real Corporate Photography */}
                <div className="relative h-44 sm:h-48 overflow-hidden bg-slate-950">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    width={800}
                    height={447}
                    decoding="async"
                    fetchPriority="high"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                  
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-mono font-bold text-sky-300 bg-slate-950/85 backdrop-blur-md px-2.5 py-1 rounded-md border border-sky-500/30 shadow-md">
                      {pillar.badge}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 text-xs font-mono text-white/80 bg-slate-950/70 px-2 py-0.5 rounded backdrop-blur-sm">
                    {pillar.num}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-sky-300 transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs font-medium text-slate-300 mb-2 sm:mb-2.5">
                      {pillar.subtitle}
                    </p>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {pillar.desc}
                    </p>

                    {/* Deliverable Tags */}
                    {pillar.deliverables && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {pillar.deliverables.map((item, dIdx) => (
                          <span
                            key={dIdx}
                            className="inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950/80 border border-slate-800 text-slate-300 group-hover:border-sky-500/30 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 sm:mt-5 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:text-sky-300">
                    <span>Consulter l'offre & échanger</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
