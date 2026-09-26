import React from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Database, 
  Globe, 
  Layers, 
  TrendingUp, 
  ArrowRight, 
  Award,
  ChevronRight,
  Clock,
  Building2,
  FileCheck2,
  Cpu,
  Lock
} from 'lucide-react';
import { BRAND, KEY_METRICS, EXPERTISES, CASE_STUDIES } from '../../data/content';

interface AccueilFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

export const AccueilFace: React.FC<AccueilFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
  const trustMarqueeItems = [
    { icon: Cpu, label: "Écosystème ERP Odoo 17 & 18", desc: "Intégration & Paramétrage Métier", tag: "ERP Certifié" },
    { icon: FileCheck2, label: "Facturation Électronique", desc: "Conformité DGI (MA) & DGFIP (FR)", tag: "Agrément Fiscal" },
    { icon: ShieldCheck, label: "Standards AMOA Big 4", desc: "Cadrage, Spécifications & Recette", tag: "Gouvernance SI" },
    { icon: Lock, label: "Secret Professionnel (NDA)", desc: "Confidentialité Totale CNDP / RGPD", tag: "Données Sécurisées" },
    { icon: Award, label: "Double Hub Casablanca & Paris", desc: "Casablanca Finance City & Paris", tag: "Présence Directe" },
    { icon: TrendingUp, label: "Pilotage Financier & BFR", desc: "Tableaux de bord DAF & Trésorerie", tag: "Performance" },
    { icon: Globe, label: "Solutions Web & Extranets", desc: "Portails clients & Automatisation API", tag: "Digitalisation" },
  ];

  return (
    <div className="w-full animate-in fade-in duration-300 font-sans">
      
      {/* 1. CINEMATIC HERO (SQLI node-home-page__head) */}
      <section className="relative min-h-[85vh] flex flex-col justify-center pt-32 sm:pt-36 pb-20 overflow-hidden bg-[#050811] border-b border-white/[0.08]">
        {/* SVG Liquid Glass Filter */}
        <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true" focusable="false">
          <defs>
            <filter id="home-liquid-glass-distortion" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.007 0.012" numOctaves="2" seed="24" result="noise" />
              <feGaussianBlur in="noise" stdDeviation="1.2" result="soft-noise" />
              <feDisplacementMap in="SourceGraphic" in2="soft-noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>

        {/* Ambient Glows & Grid */}
        <div className="absolute inset-0 bg-executive-grid opacity-20 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[1200px] h-[650px] bg-gradient-to-b from-sky-500/10 via-blue-600/5 to-transparent blur-[160px] rounded-full pointer-events-none transform-gpu animate-pulse-glow" />
        <div className="absolute bottom-0 right-10 w-[550px] h-[550px] bg-indigo-600/[0.04] blur-[140px] rounded-full pointer-events-none transform-gpu" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          <div className="max-w-4xl space-y-6 text-left">
            {/* Kicker Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-white/[0.1] text-xs font-semibold text-slate-200 shadow-xl backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              <span className="font-heading tracking-wider uppercase text-[10px] text-sky-400 font-bold">
                Cabinet de Conseil en Direction Générale & Architecture SI
              </span>
            </div>

            {/* Authoritative Clean Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] font-heading">
              Conseil Stratégique, Architecture SI <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-200 to-sky-400">
                & Intégration Odoo d'Excellence
              </span>
            </h1>

            {/* High-Impact Editorial Subtitle */}
            <p className="text-base sm:text-xl text-slate-300 max-w-3xl font-normal leading-relaxed font-sans">
              Nous accompagnons les comités de direction au Maroc et en Europe pour <strong className="text-white font-semibold">structurer leurs processus</strong>,{' '}
              <strong className="text-white font-semibold">intégrer l'ERP Odoo sur-mesure</strong> et{' '}
              <strong className="text-white font-semibold">sécuriser 100% de conformité fiscale DGI & DGFIP</strong>.
            </p>

            {/* Action Suite (SQLI Signature Link CTA with Diagonal Arrow) */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenConsultation("Cadrage Stratégique Général")}
                className="link-cta-sqli executive-btn-primary inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm sm:text-base font-bold text-white transition-all active:scale-[0.98] cursor-pointer border border-sky-400/30 font-heading"
              >
                <span>Démarrer un cadrage stratégique</span>
                <div className="icon-circle bg-white/20 border-white/30 text-white">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>
              
              <button
                onClick={() => onNavigateFace('expertises')}
                className="executive-btn-secondary inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm sm:text-base font-semibold text-slate-200 transition-all shadow-sm active:scale-[0.98] cursor-pointer"
              >
                <span>Explorer nos 5 expertises</span>
                <ArrowRight className="w-4 h-4 text-sky-400" />
              </button>
            </div>

            {/* C-Suite Trust Strip */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Interventions sous accord strict de confidentialité (NDA)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>Bureaux à Casablanca Finance City 🇲🇦 & Paris 🇫🇷</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. SQLI INFINITE CONTINUOUS MARQUEE SLIDER */}
      <section className="border-b border-white/[0.08] bg-[#070b16] py-10 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
            Écosystèmes Technologiques & Standards Réglementaires Reconnus
          </span>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="flex animate-marquee-infinite gap-4 sm:gap-6">
            {trustMarqueeItems.concat(trustMarqueeItems).map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="inline-flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-slate-900/50 border border-white/[0.06] hover:border-sky-500/30 transition-colors shrink-0 backdrop-blur-md"
                >
                  <div className="p-2 rounded-xl bg-slate-950 border border-white/[0.08] text-sky-400 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white whitespace-nowrap font-heading">
                        {item.label}
                      </span>
                      <span className="text-[9px] font-mono text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20 whitespace-nowrap">
                        {item.tag}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 whitespace-nowrap font-sans">
                      {item.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SQLI PUSH-SERVICES TEASER (Direct Face Switcher to Expertises) */}
      <section className="py-24 bg-[#050811] border-b border-white/[0.08] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column (Sticky Editorial) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-heading uppercase tracking-wider text-[11px]">Pôles d'Excellence</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
                Expertise & Architecture SI
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                Nous combinons la rigueur des méthodes de conseil Big 4, l'ingénierie applicative et l'expertise ERP pour bâtir des systèmes d'information robustes, scalables et fiscalement conformes.
              </p>

              {/* Action to switch to full face */}
              <div className="pt-2">
                <button
                  onClick={() => onNavigateFace('expertises')}
                  className="link-cta-sqli cursor-pointer text-base"
                >
                  <span>Consulter toutes nos expertises</span>
                  <div className="icon-circle">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: 3 Top Flagship Push Rows */}
            <div className="lg:col-span-7 space-y-4">
              {EXPERTISES.slice(0, 3).map((exp, idx) => (
                <div
                  key={exp.id}
                  onClick={() => onNavigateFace('expertises')}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.08] hover:border-sky-500/50 hover:bg-slate-900/90 transition-all duration-300 cursor-pointer group flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-2">
                      <span>PÔLE 0{idx + 1}</span>
                      {exp.isFlagship && <span className="text-sky-400 font-bold">• OFFRE MAJEURE</span>}
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-white group-hover:text-sky-300 transition-colors font-heading">
                      {exp.title}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 font-sans">
                      {exp.tagline}
                    </p>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-slate-950 border border-white/[0.08] flex items-center justify-center text-slate-400 group-hover:bg-sky-500 group-hover:text-white transition-all shrink-0">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. SQLI PUSH-USE-CASES TEASER (Direct Face Switcher to Cas Clients) */}
      <section className="py-24 bg-[#060913] border-b border-white/[0.08] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column (Sticky Editorial) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 shadow-sm">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-heading uppercase tracking-wider text-[11px]">Résultats Concrets & Chiffrés</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
                Case Studies & Impact
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                Des transformations mesurables engagées avec obligation de résultat auprès de comités de direction et directions financières.
              </p>

              {/* Action to switch to full face */}
              <div className="pt-2">
                <button
                  onClick={() => onNavigateFace('cas-clients')}
                  className="link-cta-sqli cursor-pointer text-base"
                >
                  <span>Découvrir toutes les études de cas</span>
                  <div className="icon-circle">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </div>

            {/* Right Column: Case Studies Highlights */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CASE_STUDIES.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigateFace('cas-clients')}
                  className="p-6 rounded-3xl bg-slate-900/70 border border-white/[0.08] hover:border-sky-500/50 hover:bg-slate-900/90 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-mono uppercase text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                        {item.tag}
                      </span>
                      <span className="text-xs text-slate-400">{item.location}</span>
                    </div>

                    <div className="text-3xl font-black text-white font-heading mb-1 text-sky-300">
                      {item.metric}
                    </div>
                    <div className="text-xs text-slate-300 font-semibold mb-3">
                      {item.metricLabel}
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors font-heading mb-2">
                      {item.title}
                    </h3>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-bold text-sky-400 group-hover:text-white transition-colors">
                    <span>Voir le dossier complet</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 5. 4 KEY EXECUTIVE FIGURES (Bloomberg Style) */}
      <section className="py-16 bg-[#050811] border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {KEY_METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/50 border border-white/[0.06] text-center"
              >
                <div className="text-3xl sm:text-4xl font-black text-white font-heading mb-1 text-sky-300">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-200 mb-1 font-heading">
                  {metric.label}
                </div>
                <div className="text-[11px] text-slate-400 font-sans">
                  {metric.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION C-LEVEL BANNER */}
      <section className="py-20 bg-gradient-to-b from-[#050811] to-[#03060d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-white/[0.1] text-xs font-semibold text-sky-400">
            <Clock className="w-3.5 h-3.5 text-sky-400" />
            <span>Mobilisation sous 72h · Casablanca & Paris</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
            Prêt à structurer votre transformation SI ?
          </h2>

          <p className="text-base text-slate-300 font-sans max-w-xl mx-auto">
            Échangez en direct avec un associé senior pour cadrer les objectifs, le budget et le planning de votre projet.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenConsultation("Cadrage Stratégique")}
              className="executive-btn-primary px-8 py-4 rounded-xl text-sm font-bold text-white font-heading flex items-center gap-2.5 cursor-pointer"
            >
              <span>Prendre un rendez-vous stratégique</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateFace('simulateur-roi')}
              className="executive-btn-secondary px-7 py-4 rounded-xl text-sm font-semibold text-slate-200 font-sans flex items-center gap-2 cursor-pointer"
            >
              <span>Calculer votre ROI estimé</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
