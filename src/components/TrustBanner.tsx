import React from 'react';
import { ShieldCheck, FileCheck2, Cpu, Award, Lock, CheckCircle2, TrendingUp, Sparkles, Building2, Globe } from 'lucide-react';
import { KEY_METRICS } from '../data/content';

export const TrustBanner: React.FC = () => {
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
    <div className="border-y border-white/[0.08] bg-[#070b16] relative overflow-hidden py-10">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/[0.03] via-transparent to-blue-500/[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        {/* Upper Part: 4 Key Executive Metrics (Bloomberg/Financial Times Style) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {KEY_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-white/[0.06] hover:border-sky-500/40 transition-all duration-300 text-center group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-heading mb-1.5 group-hover:text-sky-300 transition-colors">
                {metric.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-200 mb-1 font-heading">
                {metric.label}
              </div>
              <div className="text-[11px] text-slate-400 font-normal font-sans">
                {metric.sublabel}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* SQLI-Style Continuous Infinite Marquee Slider */}
      <div className="relative w-full overflow-hidden border-t border-white/[0.05] pt-6">
        <div className="flex animate-marquee-infinite gap-4 sm:gap-6">
          {/* First loop */}
          {trustMarqueeItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`m1-${idx}`}
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

          {/* Duplicated loop for infinite seamless scroll */}
          {trustMarqueeItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`m2-${idx}`}
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

    </div>
  );
};
