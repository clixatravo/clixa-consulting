import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/content';
import { Award, ArrowRight, CheckCircle2, TrendingUp, MapPin, Building2, ArrowUpRight, ChevronRight, Sparkles } from 'lucide-react';

interface CaseStudiesProps {
  onOpenConsultation: (topic?: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenConsultation }) => {
  const [selectedCase, setSelectedCase] = useState<number>(0);

  return (
    <section id="cas-clients" className="py-24 bg-[#060913] border-b border-white/[0.08] relative scroll-mt-24 overflow-hidden">
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

            {/* SQLI Signature CTA Link */}
            <div className="pt-2">
              <button
                onClick={() => onOpenConsultation("Revue des Cas Clients")}
                className="link-cta-sqli cursor-pointer"
              >
                <span>Consulter tous nos retours d'expérience</span>
                <div className="icon-circle">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            {/* Peer-to-Peer Director Callout */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.06] backdrop-blur-md space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider font-heading flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                Échange Pair à Pair
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Besoin d'un retour d'expérience indépendant ? Nous organisons un échange direct et confidentiel avec un directeur général ou DAF ayant déployé Odoo avec CLIXA.
              </p>
              <button
                onClick={() => onOpenConsultation("Échange Pair à Pair Dirigeant")}
                className="text-xs font-bold text-sky-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Demander une mise en relation confidentielle</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: SQLI Rich Editorial Case Study Cards */}
          <div className="lg:col-span-7 space-y-6">
            {CASE_STUDIES.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedCase(idx)}
                className={`p-7 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                  selectedCase === idx
                    ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-sky-500/60 shadow-2xl shadow-sky-500/10'
                    : 'bg-slate-950/80 border-white/[0.08] hover:bg-slate-900/60 hover:border-sky-500/40'
                }`}
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Tag & Location */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-md border border-sky-500/20">
                      {item.tag}
                    </span>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
                      <span>{item.location.includes('Maroc') ? '🇲🇦' : '🇫🇷'}</span>
                      <span>{item.location.split('•')[0]}</span>
                    </div>
                  </div>

                  {/* Big Impact Metric Banner */}
                  <div className="p-5 rounded-2xl bg-slate-950/90 border border-white/[0.07] group-hover:border-sky-500/40 transition-colors mb-5 shadow-inner">
                    <div className="text-3xl sm:text-4xl font-black text-white font-heading mb-1 group-hover:text-sky-300 transition-colors">
                      {item.metric}
                    </div>
                    <div className="text-xs text-slate-300 font-semibold">
                      {item.metricLabel}
                    </div>
                  </div>

                  {/* Title & Sector */}
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

                {/* Card Action Link */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold text-sky-400 group-hover:text-white transition-colors">
                  <span>Analyser ce cas avec un associé</span>
                  <div className="w-7 h-7 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
