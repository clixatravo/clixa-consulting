import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDown, Sparkles, ChevronRight, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import { BRAND, CORE_PILLARS } from '../data/content';

interface HeroProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const [rotatingIndex, setRotatingIndex] = useState(0);

  const rotatingFocuses = [
    "Intégration d'ERP Odoo sur-mesure",
    "Architecture SI & AMOA Stratégique",
    "Solutions Web Métiers & Extranets",
    "Pilotage Financier & Optimisation du BFR",
    "Conformité Facturation Électronique DGI & DGFIP"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % rotatingFocuses.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [rotatingFocuses.length]);

  return (
    <section id="accueil" className="relative min-h-[92vh] flex flex-col justify-center pt-32 sm:pt-40 pb-20 sm:pb-28 overflow-hidden bg-[#050811] scroll-mt-24">
      {/* Cinematic Ambient Lighting (Netflix/UM6P Aesthetic) */}
      <div className="absolute inset-0 bg-executive-grid opacity-30 pointer-events-none" />
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-gradient-to-b from-sky-500/12 via-blue-600/6 to-transparent blur-[160px] rounded-full pointer-events-none transform-gpu animate-pulse-glow" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-indigo-600/[0.04] blur-[140px] rounded-full pointer-events-none transform-gpu" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex-1 flex flex-col justify-center">
        
        {/* Dynamic Rotating Tagline Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-slate-900/90 border border-white/[0.09] text-xs font-semibold text-slate-200 mb-8 mx-auto shadow-2xl backdrop-blur-md hover:border-sky-500/40 transition-all duration-300 animate-entrance-down">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
          </span>
          <span className="font-heading tracking-wider uppercase text-[11px] text-amber-300 font-bold">
            Cabinet de Conseil C-Suite :
          </span>
          <span className="text-white font-medium transition-all duration-500 key={rotatingIndex} inline-block">
            {rotatingFocuses[rotatingIndex]}
          </span>
        </div>

        {/* Primary Executive Title - Grand & Authoritative */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold tracking-tight text-white leading-[1.12] mb-6 font-heading max-w-5xl mx-auto animate-entrance-up">
          Conseil, Transformation <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-200 to-sky-400">
            & Performance Opérationnelle
          </span>
        </h1>

        {/* Subtitle - Breathable & Clear */}
        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10 px-2 font-sans">
          Nous accompagnons les comités de direction pour <strong className="text-white font-semibold">structurer leurs processus</strong>,{' '}
          <strong className="text-white font-semibold">intégrer l'ERP Odoo sur-mesure</strong> et{' '}
          <strong className="text-white font-semibold">sécuriser durablement leur rentabilité financière</strong>.
        </p>

        {/* Primary Action Suite */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 max-w-md sm:max-w-none mx-auto">
          <button
            onClick={() => onOpenConsultation()}
            className="executive-btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm sm:text-base font-bold text-white transition-all active:scale-[0.98] cursor-pointer border border-sky-400/30 font-heading"
          >
            <span>Prendre un rendez-vous stratégique</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>
          
          <a
            href="#expertises"
            className="executive-btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm sm:text-base font-semibold text-slate-200 transition-all shadow-sm active:scale-[0.98]"
          >
            <span>Découvrir nos 3 pôles majeurs</span>
            <ArrowDown className="w-4 h-4 text-slate-400" />
          </a>
        </div>

        {/* Cinematic Netflix-style Showcase: The 3 Core Strategic Pillars */}
        <div className="text-left mt-4">
          <div className="flex items-center justify-between mb-6 px-1">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Nos 3 Pôles Stratégiques Majeurs
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Pilotés directement par des associés séniors issus de grands cabinets
              </p>
            </div>
            
            <a
              href="#expertises"
              className="text-xs font-semibold text-sky-400 hover:text-sky-300 hidden sm:inline-flex items-center gap-1 cursor-pointer font-heading"
            >
              <span>Voir la matrice complète</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_PILLARS.map((pillar) => (
              <div
                key={pillar.num}
                onClick={() => onOpenConsultation(pillar.title)}
                className="group relative rounded-3xl bg-slate-900/70 border border-white/[0.08] hover:border-sky-500/50 hover:bg-slate-900/90 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-sky-500/15 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                {/* Glowing Top Line on Hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Photo Scrim with Cinematic Hover Zoom */}
                <div className="relative h-52 sm:h-56 overflow-hidden bg-slate-950">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    width={800}
                    height={447}
                    decoding="async"
                    {...{ fetchpriority: 'high' }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="text-[11px] font-mono font-bold text-sky-300 bg-slate-950/90 backdrop-blur-md px-3 py-1 rounded-lg border border-sky-500/30 shadow-md">
                      {pillar.badge}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 text-xs font-mono text-white/90 bg-slate-950/80 px-2.5 py-0.5 rounded-md backdrop-blur-sm border border-white/[0.08]">
                    0{pillar.num}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors font-heading">
                      {pillar.title}
                    </h3>

                    <p className="text-xs font-medium text-sky-300/90 mb-2 font-sans">
                      {pillar.subtitle}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2 font-sans">
                      {pillar.desc}
                    </p>

                    {/* Deliverables Mini Chips */}
                    {pillar.deliverables && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {pillar.deliverables.slice(0, 3).map((item, dIdx) => (
                          <span
                            key={dIdx}
                            className="inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-950 border border-white/[0.06] text-slate-300 group-hover:border-sky-500/30 group-hover:text-white transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:text-sky-300 font-heading">
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
