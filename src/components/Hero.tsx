import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDown, 
  Sparkles, 
  ChevronRight, 
  ShieldCheck, 
  CheckCircle2, 
  Database, 
  Globe, 
  Layers, 
  Activity, 
  TrendingUp, 
  Terminal,
  Cpu
} from 'lucide-react';
import { BRAND, CORE_PILLARS } from '../data/content';

interface HeroProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenConsultation }) => {
  const [rotatingIndex, setRotatingIndex] = useState(0);

  const rotatingFocuses = [
    "Intégration d'ERP Odoo 17 & 18 sur-mesure",
    "Architecture SI & AMOA Stratégique Big 4",
    "Facturation Électronique DGI (MA) & DGFIP (FR)",
    "Pilotage Financier & Optimisation du BFR",
    "Solutions Web Métiers & Connecteurs API"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRotatingIndex((prev) => (prev + 1) % rotatingFocuses.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [rotatingFocuses.length]);

  return (
    <section id="accueil" className="face-section relative min-h-[92vh] flex flex-col justify-center pt-32 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-[#050811] scroll-mt-24">
      {/* 1. SQLI SVG LIQUID FILTER DISTORTION & ATMOSPHERIC BACKDROP */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true" focusable="false">
        <defs>
          <filter id="home-liquid-glass-distortion" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.007 0.012" numOctaves="2" seed="24" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="1.2" result="soft-noise" />
            <feDisplacementMap in="SourceGraphic" in2="soft-noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Background Grids & Ambient Cyan/Navy Shimmer */}
      <div className="absolute inset-0 bg-executive-grid opacity-20 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1300px] h-[700px] bg-gradient-to-b from-sky-500/10 via-blue-600/5 to-transparent blur-[160px] rounded-full pointer-events-none transform-gpu animate-pulse-glow" />
      <div className="absolute bottom-0 right-10 w-[600px] h-[600px] bg-indigo-600/[0.04] blur-[150px] rounded-full pointer-events-none transform-gpu" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        
        {/* 2. SQLI SPLIT HERO COMPOSITION (Editorial Left Card + High-Tech Executive Cockpit Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          
          {/* Left Column: SQLI Editorial Floating Card (node-home-page__head__card) */}
          <div className="lg:col-span-7 text-left space-y-6 animate-entrance-up">
            
            {/* Top Pill / Kicker with Rotating Specialization */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-white/[0.09] text-xs font-semibold text-slate-200 shadow-xl backdrop-blur-md hover:border-sky-500/40 transition-all duration-300">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <span className="font-heading tracking-wider uppercase text-[10px] text-sky-400 font-bold">
                Cabinet de Conseil & Systèmes d'Information :
              </span>
              <span className="text-white font-medium transition-all duration-500 key={rotatingIndex} inline-block">
                {rotatingFocuses[rotatingIndex]}
              </span>
            </div>

            {/* Authoritative Main Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-heading">
              Conseil, Transformation SI <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-200 to-sky-400">
                & Performance Opérationnelle
              </span>
            </h1>

            {/* High-Impact Editorial Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed font-sans">
              Nous accompagnons les comités de direction pour <strong className="text-white font-semibold">structurer leurs processus</strong>,{' '}
              <strong className="text-white font-semibold">intégrer l'ERP Odoo sur-mesure</strong> et{' '}
              <strong className="text-white font-semibold">garantir 100% de conformité fiscale DGI & DGFIP</strong>.
            </p>

            {/* SQLI Signature Action Suite */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {/* Primary SQLI Diagonal Arrow Button */}
              <button
                onClick={() => onOpenConsultation("Cadrage Stratégique Général")}
                className="link-cta-sqli executive-btn-primary inline-flex items-center justify-center gap-3 px-7 py-4 rounded-xl text-sm font-bold text-white transition-all active:scale-[0.98] cursor-pointer border border-sky-400/30 font-heading"
              >
                <span>Démarrer un cadrage stratégique</span>
                <div className="icon-circle bg-white/20 border-white/30 text-white">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>
              
              {/* Secondary Clean Action */}
              <a
                href="#cas-clients"
                className="executive-btn-secondary inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold text-slate-200 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <span>Explorer nos réalisations</span>
                <ArrowDown className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* C-Suite Trust Strip */}
            <div className="pt-4 flex flex-wrap items-center gap-5 text-xs text-slate-400 border-t border-white/[0.06]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Intervention sous accord de confidentialité (NDA)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>Casablanca Finance City & Toulouse</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Tech Executive Cockpit Preview (Stripe/SQLI Glass Terminal) */}
          <div className="lg:col-span-5 animate-entrance-up">
            <div className="relative rounded-3xl bg-slate-900/80 border border-white/[0.1] p-6 shadow-2xl backdrop-blur-xl overflow-hidden group hover:border-sky-500/40 transition-all duration-300">
              
              {/* Top Window Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-slate-400 pl-2">CLIXA Cockpit SI · v18.4</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>LIVE PRODUCTION</span>
                </div>
              </div>

              {/* Cockpit Metric Cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/[0.06]">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Core ERP Odoo</div>
                  <div className="text-xl font-bold text-white font-heading mt-1">Multi-Sociétés</div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">8 Filiales synchronisées</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/[0.06]">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Fiscalité DGI / DGFIP</div>
                  <div className="text-xl font-bold text-sky-300 font-heading mt-1">100% Conforme</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">API & Factur-X certifié</div>
                </div>
              </div>

              {/* Operational Stream Highlights */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Database className="w-3.5 h-3.5 text-sky-400" />
                    <span>Stocks & Logistique Automatisés</span>
                  </div>
                  <span className="font-mono text-emerald-400 font-bold">+42% Vitesse</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                    <span>Visibilité Trésorerie & BFR</span>
                  </div>
                  <span className="font-mono text-amber-300 font-bold">Temps Réel</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Cpu className="w-3.5 h-3.5 text-blue-400" />
                    <span>Audit Diagnostic Flash</span>
                  </div>
                  <span className="font-mono text-sky-300 font-bold">Livrables 48H</span>
                </div>
              </div>

              {/* Bottom Console Prompt */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-slate-400 font-mono">
                  <Terminal className="w-3.5 h-3.5 text-sky-400" />
                  <span>clixa --audit --enterprise</span>
                </div>
                <button
                  onClick={() => onOpenConsultation("Diagnostic Flash 48H")}
                  className="text-sky-400 hover:text-white transition-colors font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <span>Lancer audit</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* 3. THE 3 CORE PILLARS EXCELLENCE SHOWCASE (SQLI Featured Teasers) */}
        <div className="pt-8 border-t border-white/[0.06]">
          <div className="flex items-center justify-between mb-6 px-1">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Les 3 Pôles Stratégiques Majeurs
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Pilotés directement par des directeurs de mission seniors
              </p>
            </div>
            
            <a
              href="#expertises"
              className="link-cta-sqli hidden sm:inline-flex items-center gap-2 text-xs"
            >
              <span>Voir la matrice complète</span>
              <div className="icon-circle">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
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
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
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
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {pillar.deliverables.slice(0, 3).map((d, dIdx) => (
                          <span
                            key={dIdx}
                            className="text-[10px] font-medium text-slate-300 bg-slate-950 px-2.5 py-1 rounded-md border border-white/[0.06]"
                          >
                            ✓ {d}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-sky-400 group-hover:text-white transition-colors">
                    <span>Cadrer avec un associé</span>
                    <div className="w-7 h-7 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transition prompt to Face 02 */}
        <div className="pt-10 flex justify-center">
          <a
            href="#expertises"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-slate-900/80 border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white hover:border-sky-500/40 transition-all backdrop-blur-md shadow-lg group cursor-pointer"
          >
            <span className="font-mono text-sky-400 text-[11px]">Face 02</span>
            <span>Explorer l'Architecture SI & Odoo</span>
            <ArrowDown className="w-3.5 h-3.5 text-sky-400 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
};
