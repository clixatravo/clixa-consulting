import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/content';
import { 
  Award, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Building2, 
  ArrowUpRight, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface CaseStudiesProps {
  onOpenConsultation: (topic?: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenConsultation }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const totalSlides = CASE_STUDIES.length;

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const item = CASE_STUDIES[currentSlide];

  return (
    <section id="cas-clients" className="face-section py-24 bg-[#060913] border-b border-white/[0.08] relative scroll-mt-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-sky-500/[0.03] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-blue-600/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* SQLI-Style Push-Use-Cases Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Fixed / Sticky Editorial Briefing (SQLI push-use-cases left column) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 shadow-sm">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-heading uppercase tracking-wider text-[11px]">Résultats & Retours sur Investissement</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              Case Studies & Impact Exécutif
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Nous nous engageons auprès des comités de direction avec des objectifs chiffrés. Découvrez comment nos interventions ont transformé des organisations complexes en leaders agiles, conformes et hautement rentables.
            </p>

            {/* SQLI Carousel Controls (Counter & Arrows) */}
            <div className="pt-4 flex items-center gap-6">
              {/* Counter: e.g. 01 / 03 */}
              <div className="flex items-center gap-2 font-mono text-sm text-slate-400">
                <span className="text-xl font-bold text-white font-heading">0{currentSlide + 1}</span>
                <span className="text-slate-600 font-light text-base">/</span>
                <span className="text-slate-500">0{totalSlides}</span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full bg-slate-900 border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-500/50 hover:bg-slate-850 transition-all cursor-pointer shadow-md active:scale-95"
                  title="Cas précédent"
                  aria-label="Cas précédent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-slate-900 border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-500/50 hover:bg-slate-850 transition-all cursor-pointer shadow-md active:scale-95"
                  title="Cas suivant"
                  aria-label="Cas suivant"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Slide Dots Indicator */}
              <div className="flex items-center gap-1.5">
                {CASE_STUDIES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentSlide === idx ? 'w-6 bg-sky-400' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Aller au cas ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Peer-to-Peer Director Callout */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.06] backdrop-blur-md space-y-3 mt-4">
              <div className="text-xs font-bold text-white uppercase tracking-wider font-heading flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                Échange Pair à Pair C-Suite
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Besoin d'un retour d'expérience indépendant ? Nous organisons un échange direct et confidentiel avec un directeur général ou DAF ayant déployé avec CLIXA.
              </p>
              <button
                onClick={() => onOpenConsultation("Échange Pair à Pair Dirigeant")}
                className="text-xs font-bold text-sky-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Demander une mise en relation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: SQLI Active Slide Card with Smooth Fade/Slide Animation */}
          <div className="lg:col-span-7">
            <div
              key={item.id}
              className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-sky-500/50 shadow-2xl shadow-sky-500/10 relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />

              <div>
                {/* Tag & Location */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-md border border-sky-500/20">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                    <span>{item.location.includes('Maroc') ? '🇲🇦' : '🇫🇷'}</span>
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Big Impact Metric Banner */}
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-white/[0.07] mb-6 shadow-inner">
                  <div className="text-4xl sm:text-5xl font-black text-white font-heading mb-1 text-sky-300">
                    {item.metric}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 font-semibold">
                    {item.metricLabel}
                  </div>
                </div>

                {/* Title & Sector */}
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug font-heading">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 pb-4 border-b border-white/[0.06]">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.clientSector} • {item.location}</span>
                </div>

                {/* Challenge & Solution */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs text-slate-300">
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/[0.05]">
                    <span className="font-semibold text-rose-400 block mb-1">Le Défi Initial :</span>
                    <p className="text-slate-400 leading-relaxed font-sans">{item.challenge}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-sky-500/20">
                    <span className="font-semibold text-sky-400 block mb-1">Intervention Stratégique CLIXA :</span>
                    <p className="text-slate-300 leading-relaxed font-sans">{item.solution}</p>
                  </div>
                </div>

                {/* Key results bullets */}
                <div className="space-y-2.5 pt-1 mb-8">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                    Bénéfices constatés après déploiement :
                  </span>
                  {item.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action Link */}
              <div className="pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <button
                  onClick={() => onOpenConsultation(`Revue Cas Client: ${item.title}`)}
                  className="executive-btn-primary inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white font-heading cursor-pointer"
                >
                  <span>Analyser ce cas avec un associé</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-end gap-2 text-xs text-slate-400">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-lg bg-slate-900 border border-white/[0.06] hover:text-white"
                    title="Précédent"
                  >
                    ← Précédent
                  </button>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-lg bg-slate-900 border border-white/[0.06] hover:text-white text-sky-400 font-semibold"
                    title="Suivant"
                  >
                    Suivant →
                  </button>
                </div>
              </div>
            </div>

            {/* Quick mini-selectors below the card */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {CASE_STUDIES.map((c, idx) => (
                <button
                  key={c.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    currentSlide === idx
                      ? 'bg-slate-900/90 border-sky-400 text-white shadow-md'
                      : 'bg-slate-950/60 border-white/[0.06] text-slate-400 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase text-slate-500">CAS 0{idx + 1}</div>
                  <div className="text-xs font-bold truncate mt-0.5">{c.clientSector}</div>
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
