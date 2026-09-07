import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/content';
import { Award, ArrowRight, CheckCircle2, TrendingUp, MapPin, Building2 } from 'lucide-react';

interface CaseStudiesProps {
  onOpenConsultation: (topic?: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenConsultation }) => {
  const [selectedCase, setSelectedCase] = useState<number>(0);

  return (
    <section id="cas-clients" className="py-24 bg-slate-900/40 border-t border-slate-850 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400 mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Impact Opérationnel & Chiffré</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Cas d'Usage & Résultats Concrets
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Découvrez comment CLIXA transforme des défis complexes d’organisation, de finance et d'ERP en gains mesurables de productivité et de rentabilité.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {CASE_STUDIES.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedCase(idx)}
              className={`p-7 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                selectedCase === idx
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-sky-500/60 shadow-2xl shadow-sky-500/10 -translate-y-1'
                  : 'bg-slate-950/80 border-slate-800/90 hover:bg-slate-900/60 hover:border-sky-500/40'
              }`}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Tag & Sector */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-md border border-sky-500/20">
                    {item.tag}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                    <span>{item.location.includes('Maroc') ? '🇲🇦' : '🇫🇷'}</span>
                    <span>{item.location.split('•')[0]}</span>
                  </div>
                </div>

                {/* Big Metric Box */}
                <div className="p-4 rounded-xl bg-slate-900/95 border border-slate-800 group-hover:border-sky-500/30 transition-colors mb-6 shadow-inner">
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                    {item.metric}
                  </div>
                  <div className="text-xs text-slate-300 font-semibold mt-1">
                    {item.metricLabel}
                  </div>
                </div>

                {/* Title & Client Context */}
                <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-5">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{item.clientSector} • {item.location}</span>
                </div>

                {/* Challenge & Solution */}
                <div className="space-y-3 mb-6 text-xs text-slate-300">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850">
                    <span className="font-semibold text-rose-400 block mb-1">Le Défi Initial :</span>
                    <p className="text-slate-400 leading-relaxed">{item.challenge}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-sky-950/60">
                    <span className="font-semibold text-sky-400 block mb-1">Intervention CLIXA :</span>
                    <p className="text-slate-400 leading-relaxed">{item.solution}</p>
                  </div>
                </div>

                {/* Key results bullets */}
                <div className="space-y-2 pt-2 mb-6">
                  {item.results.map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card CTA */}
              <div className="pt-4 border-t border-slate-800/80">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenConsultation(`Cas d'usage: ${item.title}`);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-600 border border-slate-700 hover:border-transparent transition-all cursor-pointer shadow-sm active:scale-[0.98]"
                >
                  <span>Échanger sur un projet similaire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Reassurance Banner */}
        <div className="text-center">
          <span className="text-xs text-slate-500 font-mono">
            Tous nos cas clients sont menés sous engagement strict de confidentialité et de transfert de savoir-faire.
          </span>
        </div>

      </div>
    </section>
  );
};
