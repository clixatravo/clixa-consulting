import React from 'react';
import { ArrowUpRight, ArrowDown, MessageCircle, CheckCircle2, TrendingUp, Sparkles, Shield, ChevronRight } from 'lucide-react';
import { BRAND, CORE_PILLARS, KEY_METRICS } from '../data/content';

interface HeroProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  return (
    <section id="accueil" className="relative min-h-[92vh] flex items-center justify-center pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-[#050811] scroll-mt-24">
      {/* Background architectural textures: subtle executive grid + radial ambient light */}
      <div className="absolute inset-0 bg-executive-grid opacity-35 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-sky-500/10 via-blue-600/5 to-transparent blur-[140px] rounded-full pointer-events-none transform-gpu" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[130px] rounded-full pointer-events-none transform-gpu" />
      <div className="absolute top-1/3 left-0 w-[350px] h-[350px] bg-amber-500/[0.03] blur-[120px] rounded-full pointer-events-none transform-gpu" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Institutional Accreditation Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/70 text-xs font-semibold text-slate-200 mb-6 shadow-xl backdrop-blur-md hover:border-sky-500/40 transition-all">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <span className="font-heading tracking-wide uppercase text-[11px] text-amber-300/90 font-bold">
            Cabinet de Conseil en Stratégie & Systèmes d'Information
          </span>
          <span className="text-slate-500 hidden sm:inline">•</span>
          <span className="text-slate-400 text-[11px] hidden sm:inline">Casablanca & Paris</span>
        </div>

        {/* Primary Executive Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15] mb-6 font-heading">
          Conseil, Transformation <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-200 to-sky-400">
            & Performance Opérationnelle
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8 px-2 font-sans">
          Nous accompagnons les directeurs généraux et comités de direction pour{' '}
          <span className="text-white font-semibold">structurer leurs processus</span>,{' '}
          <span className="text-white font-semibold">intégrer l'ERP Odoo sur-mesure</span> et{' '}
          <span className="text-white font-semibold">sécuriser leur rentabilité financière</span>.
        </p>

        {/* Executive Capability Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 max-w-3xl mx-auto px-2">
          {BRAND.heroBadges.map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200 text-xs sm:text-sm font-medium hover:border-sky-500/40 hover:text-white transition-all shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              {badge}
            </span>
          ))}
        </div>

        {/* Executive Action Suite */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 max-w-lg sm:max-w-none mx-auto">
          <button
            onClick={() => onOpenConsultation()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 hover:from-sky-500 hover:to-blue-500 transition-all shadow-xl shadow-sky-500/20 active:scale-[0.98] cursor-pointer border border-sky-400/30"
          >
            <span>Prendre un rendez-vous stratégique</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <a
            href={BRAND.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm sm:text-base font-semibold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/60 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
            <span>Ligne Directe WhatsApp</span>
          </a>

          <a
            href="#expertises"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm sm:text-base font-medium text-slate-300 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 hover:text-white transition-all shadow-sm active:scale-[0.98]"
          >
            <span>Dossier d'intervention</span>
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Dual Hub Direct Hotlines */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mb-14 text-xs text-slate-400">
          <a
            href={`tel:${BRAND.phoneMarocRaw}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-sky-500/50 hover:text-white transition-all shadow-sm"
          >
            <span>🇲🇦</span>
            <span className="text-slate-300">Hub Casablanca :</span>
            <span className="font-mono text-sky-400 font-semibold">{BRAND.phoneMarocDisplay}</span>
          </a>

          <a
            href={`tel:${BRAND.phoneFranceRaw}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-sky-500/50 hover:text-white transition-all shadow-sm"
          >
            <span>🇫🇷</span>
            <span className="text-slate-300">Hub Paris :</span>
            <span className="font-mono text-sky-400 font-semibold">{BRAND.phoneFranceDisplay}</span>
          </a>

          <a
            href={`mailto:${BRAND.contactEmail}`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/70 border border-slate-800 hover:border-sky-500/50 hover:text-white transition-all shadow-sm"
          >
            <span className="text-slate-400">✉️</span>
            <span className="text-white font-medium">{BRAND.contactEmail}</span>
          </a>
        </div>

        {/* Executive Metrics Bar - Clean Bloomberg/Financial Times Advisory Style */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-16 max-w-5xl mx-auto">
          {KEY_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 shadow-xl text-center group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/30 to-transparent group-hover:via-sky-400 transition-colors" />
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-heading mb-1.5 group-hover:text-sky-300 transition-colors">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-200 mb-1">
                {metric.label}
              </div>
              <div className="text-[11px] text-slate-400 font-normal">
                {metric.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* 3 Core Strategic Pillars with High-Resolution Corporate Scrims */}
        <div className="text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 px-1">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Nos 3 Pôles Stratégiques Majeurs
              </span>
              <p className="text-xs text-slate-400 mt-1">Interventions à forte valeur ajoutée pilotées par des associés séniors</p>
            </div>
            <button
              onClick={() => onOpenConsultation()}
              className="text-xs text-sky-400 hover:text-sky-300 font-semibold inline-flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <span>Demander un cadrage personnalisé</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                onClick={() => onOpenConsultation(pillar.title)}
                className="rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-sky-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-sky-500/10 group cursor-pointer flex flex-col justify-between overflow-hidden relative"
              >
                {/* Top Subtle Gradient Border Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Real Corporate Photography */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    width={800}
                    height={447}
                    decoding="async"
                    {...{ fetchpriority: 'high' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  <div className="absolute top-3.5 left-3.5">
                    <span className="text-xs font-mono font-bold text-sky-300 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-lg border border-sky-500/30 shadow-md">
                      {pillar.badge}
                    </span>
                  </div>

                  <div className="absolute top-3.5 right-3.5 text-xs font-mono text-white/90 bg-slate-950/80 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-slate-800">
                    PÔLE {pillar.num}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors font-heading">
                      {pillar.title}
                    </h3>

                    <p className="text-xs font-medium text-sky-400/90 mb-2">
                      {pillar.subtitle}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {pillar.desc}
                    </p>

                    {/* Deliverable Tags */}
                    {pillar.deliverables && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {pillar.deliverables.map((item, dIdx) => (
                          <span
                            key={dIdx}
                            className="inline-flex items-center text-[10px] font-medium px-2.5 py-1 rounded-md bg-slate-950/90 border border-slate-800/90 text-slate-300 group-hover:border-sky-500/30 transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-5 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:text-sky-300">
                    <span>Cadrer ce projet avec un associé</span>
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
