import React from 'react';
import { TESTIMONIALS } from '../data/content';
import { Quote, Star, CheckCircle2, TrendingUp, ArrowUpRight } from 'lucide-react';

interface TestimonialsProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onOpenConsultation }) => {
  return (
    <section id="temoignages" className="py-24 bg-slate-950 border-t border-slate-850 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="hidden sm:block absolute top-1/2 right-10 w-96 h-96 bg-sky-500/10 blur-[120px] rounded-full pointer-events-none transform-gpu" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400 mb-3">
            <Quote className="w-3.5 h-3.5" />
            <span>Retours d'Expérience Exécutifs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Ce que disent les dirigeants qui nous font confiance
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Des directeurs généraux, DAF et directeurs des opérations témoignent de l'impact mesurable de nos interventions sur leur organisation.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-sky-500/5 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* 5 Stars + Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Client Vérifié</span>
                  </span>
                </div>

                {/* Quote text */}
                <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>

                {/* Impact Metric Tag */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-850 mb-6 flex items-center justify-between">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Impact Clé :</span>
                    <span className="text-xs text-slate-300 font-semibold truncate block">{t.impactLabel}</span>
                  </div>
                  <span className="text-lg sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300 shrink-0 ml-2">
                    {t.impactMetric}
                  </span>
                </div>
              </div>

              {/* Author Info */}
              <div className="pt-5 border-t border-slate-800/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 font-bold text-sm shrink-0">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-sm truncate">{t.name}</span>
                      <span className="text-xs">{t.flag}</span>
                    </div>
                    <div className="text-xs text-sky-400 font-medium truncate">{t.role}</div>
                    <div className="text-[10px] text-slate-400 truncate">{t.companyType}</div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner CTA */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 max-w-3xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-slate-300 mb-3">
            Vous souhaitez échanger de pair à pair avec un dirigeant ayant déjà mené ce type de projet avec CLIXA ?
          </p>
          <button
            onClick={() => onOpenConsultation("Demande de mise en relation client")}
            className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
          >
            <span>Demander une mise en relation de référence</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
