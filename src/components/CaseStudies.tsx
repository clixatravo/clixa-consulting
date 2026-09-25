import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/content';
import { Award, ArrowRight, CheckCircle2, TrendingUp, MapPin, Building2, ArrowUpRight, ChevronRight } from 'lucide-react';

interface CaseStudiesProps {
  onOpenConsultation: (topic?: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenConsultation }) => {
  const [selectedCase, setSelectedCase] = useState<number>(0);

  return (
    <section id="cas-clients" className="py-24 bg-[#060913] border-b border-white/[0.08] relative scroll-mt-24 overflow-hidden">
      {/* Background ambient */}
      <div className="absolute top-1/2 right-0 w-[450px] h-[450px] bg-sky-500/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 mb-3 shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-heading uppercase tracking-wider text-[11px]">Études de Cas & ROI Vérifiés</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Dossiers d'Impact Exécutif & Résultats Concrets
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Chaque mission est engagée avec des objectifs chiffrés. Voici comment nous avons transformé des organisations complexes en leaders agiles et rentables.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mb-14">
          {CASE_STUDIES.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedCase(idx)}
              className={`p-7 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                selectedCase === idx
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-sky-500/60 shadow-2xl shadow-sky-500/10 -translate-y-1'
                  : 'bg-slate-950/80 border-white/[0.08] hover:bg-slate-900/60 hover:border-sky-500/40'
              }`}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Tag & Sector */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-md border border-sky-500/20">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                    <span>{item.location.includes('Maroc') ? '🇲🇦' : '🇫🇷'}</span>
                    <span>{item.location.split('•')[0]}</span>
                  </div>
                </div>

                {/* Big Metric Box */}
                <div className="p-5 rounded-2xl bg-slate-950/90 border border-white/[0.07] group-hover:border-sky-500/40 transition-colors mb-6 shadow-inner">
                  <div className="text-3xl sm:text-4xl font-black text-white font-heading mb-1 group-hover:text-sky-300 transition-colors">
                    {item.metric}
                  </div>
                  <div className="text-xs text-slate-300 font-semibold">
                    {item.metricLabel}
                  </div>
                </div>

                {/* Title & Client Context */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug group-hover:text-sky-300 transition-colors font-heading">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-5 pb-4 border-b border-white/[0.06]">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.clientSector} • {item.location}</span>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-3 mb-6 text-xs text-slate-300">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-white/[0.05]">
                    <span className="font-semibold text-rose-400 block mb-1">Le Défi Initial :</span>
                    <p className="text-slate-400 leading-relaxed font-sans">{item.challenge}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-sky-500/20">
                    <span className="font-semibold text-sky-400 block mb-1">Intervention Stratégique CLIXA :</span>
                    <p className="text-slate-300 leading-relaxed font-sans">{item.solution}</p>
                  </div>
                </div>

                {/* Key results bullets */}
                <div className="space-y-2 pt-1 mb-6">
                  {item.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="font-medium">{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Action */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:text-sky-300">
                <span>Analyser ce cas avec un associé</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Global ROI Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/70 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <div className="text-white font-bold text-base sm:text-lg font-heading">
                Vous souhaitez obtenir un retour d'expérience direct ?
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-sans">
                Nous pouvons organiser un échange confidentiel de pair à pair avec un dirigeant ayant déjà mené ce projet avec CLIXA.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenConsultation("Échange pair à pair")}
            className="shrink-0 w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-white/[0.1] transition-all cursor-pointer shadow-md"
          >
            Mise en relation confidentielle
          </button>
        </div>

      </div>
    </section>
  );
};
