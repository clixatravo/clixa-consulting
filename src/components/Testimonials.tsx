import React from 'react';
import { TESTIMONIALS } from '../data/content';
import { Quote, Star, CheckCircle2, TrendingUp, ArrowUpRight } from 'lucide-react';

interface TestimonialsProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onOpenConsultation }) => {
  return (
    <section id="temoignages" className="py-24 bg-[#050811] border-b border-white/[0.08] relative overflow-hidden scroll-mt-24">
      {/* Background ambient */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/[0.03] blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 mb-3 shadow-sm">
            <Quote className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-heading uppercase tracking-wider text-[11px]">Retours d'Expérience C-Level</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            La Confiance des Directeurs Généraux & DAF
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Témoignages de dirigeants au Maroc et en France ayant confié à CLIXA la refonte de leur ERP, l'optimisation de leurs processus et le pilotage financier de leur croissance.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-7 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.08] hover:border-sky-500/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-sky-500/5 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* 5 Stars + Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Mission Vérifiée</span>
                  </span>
                </div>

                {/* Quote text */}
                <p className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed mb-6 italic font-sans">
                  "{t.quote}"
                </p>

                {/* Impact Metric Box */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/[0.06] mb-6 flex items-center justify-between">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Impact Majeur :</span>
                    <span className="text-xs text-slate-300 font-semibold truncate block">{t.impactLabel}</span>
                  </div>
                  <span className="text-lg sm:text-xl font-black text-white font-heading shrink-0 ml-2 group-hover:text-amber-300 transition-colors">
                    {t.impactMetric}
                  </span>
                </div>
              </div>

              {/* Author Info */}
              <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-2xl bg-slate-800 border border-white/[0.1] flex items-center justify-center text-sky-400 font-bold text-sm shrink-0 font-heading">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white text-sm truncate font-heading">{t.name}</span>
                      <span className="text-xs">{t.flag}</span>
                    </div>
                    <div className="text-xs text-sky-400 font-medium truncate">{t.role}</div>
                    <div className="text-[11px] text-slate-400 truncate">{t.companyType}</div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
