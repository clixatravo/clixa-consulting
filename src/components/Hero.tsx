import React from 'react';
import { ArrowUpRight, ArrowRight, MessageCircle, Database, Layers, Calculator, Award, HelpCircle } from 'lucide-react';
import { BRAND, CORE_PILLARS, KEY_METRICS } from '../data/content';
import { PageId } from './Navbar';

interface HeroProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigate?: (page: PageId) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation, onNavigate }) => {
  const handleNavigate = (page: PageId) => {
    if (onNavigate) {
      onNavigate(page);
    }
  };

  const quickPages: { id: PageId; title: string; desc: string; icon: any; color: string }[] = [
    {
      id: 'expertises',
      title: 'Expertises & SI',
      desc: 'ERP Odoo, Process & Digitalisation',
      icon: Database,
      color: 'from-sky-500/20 to-sky-600/5 text-sky-400 border-sky-500/30'
    },
    {
      id: 'secteurs-references',
      title: 'Secteurs & Cas',
      desc: 'BTP, Industrie, Santé & Résultats',
      icon: Layers,
      color: 'from-blue-500/20 to-blue-600/5 text-blue-400 border-blue-500/30'
    },
    {
      id: 'diagnostic-roi',
      title: 'Outils & ROI',
      desc: 'Simulateur & Diagnostic Flash 48H',
      icon: Calculator,
      color: 'from-cyan-500/20 to-cyan-600/5 text-cyan-400 border-cyan-500/30'
    },
    {
      id: 'cabinet',
      title: 'Le Cabinet',
      desc: 'Méthode, Équipe & Engagements',
      icon: Award,
      color: 'from-indigo-500/20 to-indigo-600/5 text-indigo-400 border-indigo-500/30'
    },
    {
      id: 'contact',
      title: 'Contact & FAQ',
      desc: 'Casablanca, Paris & Échange',
      icon: HelpCircle,
      color: 'from-emerald-500/20 to-emerald-600/5 text-emerald-400 border-emerald-500/30'
    }
  ];

  return (
    <section id="accueil" className="relative min-h-[85vh] flex items-center justify-center pt-24 sm:pt-32 pb-14 sm:pb-16 overflow-hidden bg-slate-950">
      {/* Background radial glow with subtle pulse animation */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="hidden sm:block absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[520px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none transform-gpu animate-pulse-glow" />
      <div className="hidden sm:block absolute bottom-10 right-10 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none transform-gpu" />
      <div className="sm:hidden absolute top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-sky-500/15 blur-2xl rounded-full pointer-events-none transform-gpu animate-pulse-glow" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Slogan Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 text-[11px] sm:text-xs font-semibold text-sky-400 mb-5 sm:mb-6 shadow-sm backdrop-blur-md animate-entrance-scale delay-100">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-sky-400 animate-pulse" />
          <span className="tracking-wide uppercase">{BRAND.tagline}</span>
        </div>

        {/* Primary Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.18] sm:leading-[1.15] mb-5 sm:mb-6 animate-entrance-up delay-200">
          Conseil, Transformation <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">
            & Performance
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-6 sm:mb-8 px-2 animate-entrance-up delay-300">
          Nous aidons les dirigeants à <span className="text-white font-medium">structurer leurs processus</span>,{' '}
          <span className="text-white font-medium">digitaliser leurs opérations</span> et{' '}
          <span className="text-white font-medium">améliorer durablement leur rentabilité</span>.
        </p>

        {/* Pill Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 max-w-3xl mx-auto px-2 animate-entrance-up delay-400">
          {BRAND.heroBadges.map((badge, idx) => (
            <span
              key={badge}
              style={{ animationDelay: `${400 + idx * 50}ms` }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200 text-xs sm:text-sm font-medium hover:border-sky-500/40 hover:text-white hover:scale-105 transition-all shadow-sm duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
              {badge}
            </span>
          ))}
        </div>

        {/* Primary Actions & Direct Lines */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8 max-w-md sm:max-w-none mx-auto animate-entrance-up delay-500">
          <button
            onClick={() => onOpenConsultation()}
            className="shimmer-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold text-white shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <span>Parler à un consultant</span>
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          <a
            href={BRAND.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-800/60 hover:border-emerald-700 transition-all shadow-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Discuter sur WhatsApp</span>
          </a>

          <button
            onClick={() => handleNavigate('expertises')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-medium text-slate-300 bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 hover:text-white transition-all shadow-sm hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>Explorer nos offres</span>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Dual Country Quick Call Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-10 sm:mb-12 text-xs text-slate-400 animate-entrance-up delay-600">
          <a
            href={`tel:${BRAND.phoneMarocRaw}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 hover:text-white hover:-translate-y-0.5 transition-all shadow-sm"
          >
            <span>🇲🇦</span>
            <span className="text-slate-300">Maroc :</span>
            <span className="font-mono text-sky-400 font-semibold">{BRAND.phoneMarocDisplay}</span>
          </a>

          <a
            href={`tel:${BRAND.phoneFranceRaw}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 hover:text-white hover:-translate-y-0.5 transition-all shadow-sm"
          >
            <span>🇫🇷</span>
            <span className="text-slate-300">France :</span>
            <span className="font-mono text-sky-400 font-semibold">{BRAND.phoneFranceDisplay}</span>
          </a>

          <a
            href={`mailto:${BRAND.contactEmail}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 hover:text-white hover:-translate-y-0.5 transition-all shadow-sm"
          >
            <span>✉️</span>
            <span className="text-white font-medium">{BRAND.contactEmail}</span>
          </a>
        </div>

        {/* Executive Metrics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 max-w-5xl mx-auto animate-entrance-up delay-700">
          {KEY_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 shadow-lg text-center group hover:-translate-y-1"
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

        {/* The 3 Core Pillars Highlight Cards */}
        <div className="text-left mb-12 animate-entrance-up delay-800">
          <div className="flex items-center justify-between mb-4 sm:mb-5 px-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              Nos 3 Pôles Stratégiques Majeurs
            </span>
            <button 
              onClick={() => handleNavigate('expertises')}
              className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-medium cursor-pointer"
            >
              <span>Voir tous les détails</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {CORE_PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                onClick={() => handleNavigate('expertises')}
                className="rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-sky-500/50 hover:bg-slate-900 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-sky-500/5 group cursor-pointer flex flex-col justify-between overflow-hidden relative hover:-translate-y-1"
              >
                {/* Top Subtle Gradient Border Highlight */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Real Corporate Photography */}
                <div className="relative h-40 sm:h-44 overflow-hidden bg-slate-950">
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
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-sky-300 transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-xs font-medium text-slate-300 mb-2">
                      {pillar.subtitle}
                    </p>

                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:text-sky-300">
                    <span>En savoir plus</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Page Explorer Directory (Cards pointing to other 5 pages) */}
        <div className="border-t border-slate-800/80 pt-10 text-left">
          <div className="flex items-center justify-between mb-5 px-1">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
                Navigation Complète
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Explorez les espaces dédiés du cabinet
              </h3>
            </div>
            <span className="text-xs text-slate-500 hidden sm:inline">Accès direct sans défilement</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {quickPages.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/70 to-slate-950/90 border border-slate-800 hover:border-sky-500/40 hover:-translate-y-1 transition-all duration-200 text-left group cursor-pointer flex flex-col justify-between shadow-md"
                >
                  <div>
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} border p-2 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors mb-0.5">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-snug">
                      {item.desc}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-850 flex items-center justify-between text-[11px] font-semibold text-sky-400 group-hover:text-sky-300">
                    <span>Accéder</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
