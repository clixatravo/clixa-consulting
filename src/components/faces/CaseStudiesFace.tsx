import React, { useState } from 'react';
import { CASE_STUDIES, TESTIMONIALS } from '../../data/content';
import { 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  ArrowUpRight, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote
} from 'lucide-react';

interface CaseStudiesFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

export const CaseStudiesFace: React.FC<CaseStudiesFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const totalSlides = CASE_STUDIES.length;

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const item = CASE_STUDIES[currentSlide];

  return (
    <div className="w-full animate-in fade-in duration-300 font-sans pt-28 pb-20">
      
      {/* 1. FACE HEADER & BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
          <button onClick={() => onNavigateFace('accueil')} className="hover:text-white transition-colors cursor-pointer">
            Accueil
          </button>
          <span>/</span>
          <span className="text-sky-400 font-bold">Cas Clients & Retours sur Investissement</span>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 mb-3 shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-heading uppercase tracking-wider text-[11px]">Dossiers d'Impact Vérifiés</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-heading">
            Dossiers d'Impact Exécutif & Résultats Concrets
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed mt-4">
            Chaque mission est engagée avec des objectifs chiffrés. Découvrez comment nos interventions ont transformé des organisations au Maroc et en France en leaders agiles, rentables et 100% conformes.
          </p>
        </div>
      </div>

      {/* 2. SQLI PUSH-USE-CASES CAROUSEL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (Sticky Carousel Controls & Peer-to-Peer Box) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/70 border border-white/[0.08] backdrop-blur-md space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 block">
                Navigation des Réalisations
              </span>

              {/* Counter: e.g. 01 / 03 */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2 font-mono text-sm text-slate-400">
                  <span className="text-3xl font-black text-white font-heading">0{currentSlide + 1}</span>
                  <span className="text-slate-600 font-light text-xl">/</span>
                  <span className="text-slate-500 text-sm">0{totalSlides}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-10 h-10 rounded-full bg-slate-900 border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-500/50 hover:bg-slate-850 transition-all cursor-pointer shadow-md active:scale-95"
                    title="Précédent"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-10 h-10 rounded-full bg-slate-900 border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-500/50 hover:bg-slate-850 transition-all cursor-pointer shadow-md active:scale-95"
                    title="Suivant"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Case Switcher Pills */}
              <div className="space-y-2 pt-2">
                {CASE_STUDIES.map((c, idx) => (
                  <button
                    key={c.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      currentSlide === idx
                        ? 'bg-sky-500/10 border-sky-400 text-white shadow-sm'
                        : 'bg-slate-950/50 border-white/[0.05] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-[10px] font-mono uppercase text-slate-500">Cas 0{idx + 1} • {c.location}</div>
                      <div className="text-xs font-bold truncate mt-0.5">{c.title}</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-sky-400 shrink-0">{c.metric}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Peer-to-Peer Director Callout */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/[0.06] backdrop-blur-md space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider font-heading flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                Échange Pair à Pair C-Suite
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Besoin d'un retour d'expérience indépendant ? Nous pouvons organiser un échange direct et confidentiel avec un dirigeant ayant déjà mené ce déploiement avec CLIXA.
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

          {/* Right Column: Active Case Slide Card */}
          <div className="lg:col-span-7">
            <div
              key={item.id}
              className="p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-sky-500/50 shadow-2xl relative overflow-hidden animate-in fade-in duration-300"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-md border border-sky-500/20">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                    <span>{item.location.includes('Maroc') ? '🇲🇦' : '🇫🇷'}</span>
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Big Metric Banner */}
                <div className="p-6 rounded-2xl bg-slate-950/90 border border-white/[0.07] mb-6 shadow-inner">
                  <div className="text-4xl sm:text-5xl font-black text-white font-heading mb-1 text-sky-300">
                    {item.metric}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 font-semibold">
                    {item.metricLabel}
                  </div>
                </div>

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
              <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between">
                <button
                  onClick={() => onOpenConsultation(`Revue Cas Client: ${item.title}`)}
                  className="executive-btn-primary inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white font-heading cursor-pointer"
                >
                  <span>Analyser ce cas avec un associé</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 3. TESTIMONIALS C-LEVEL SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
            Retours d'Expérience Dirigeants
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-1">
            La Confiance des Directeurs Généraux & DAF
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-7 rounded-3xl bg-slate-900/60 border border-white/[0.08] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/60">
                    Mission Vérifiée
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 italic mb-6 leading-relaxed">
                  "{t.quote}"
                </p>

                <div className="p-3 rounded-xl bg-slate-950 border border-white/[0.05] mb-6 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{t.impactLabel} :</span>
                  <span className="text-sm font-bold text-white font-heading">{t.impactMetric}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-sky-400 font-bold text-xs shrink-0">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate font-heading">{t.name} {t.flag}</div>
                  <div className="text-[11px] text-sky-400 truncate">{t.role}</div>
                  <div className="text-[10px] text-slate-500 truncate">{t.companyType}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. TRANSITION TO NEXT FACE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigateFace('secteurs')}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Retour aux Secteurs
        </button>

        <button
          onClick={() => onNavigateFace('simulateur-roi')}
          className="link-cta-sqli text-sm font-bold cursor-pointer"
        >
          <span>Face Suivante : Executive Lab & Simulateur ROI</span>
          <div className="icon-circle">
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

    </div>
  );
};
