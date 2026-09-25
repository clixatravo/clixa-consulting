import React from 'react';
import { ShieldCheck, FileCheck2, Cpu, Award, Lock, CheckCircle2, TrendingUp } from 'lucide-react';
import { KEY_METRICS } from '../data/content';

export const TrustBanner: React.FC = () => {
  const trustItems = [
    {
      icon: Cpu,
      title: "Écosystème ERP Odoo",
      subtitle: "Intégration certifiée & sur-mesure",
      tag: "Partenaire Technologique"
    },
    {
      icon: FileCheck2,
      title: "Facturation Électronique",
      subtitle: "Conformité DGI (MA) & DGFIP (FR)",
      tag: "Agrément Fiscal"
    },
    {
      icon: ShieldCheck,
      title: "Méthodologie AMOA Big 4",
      subtitle: "Cadrage, spécifications & recette",
      tag: "Standards Internationaux"
    },
    {
      icon: Lock,
      title: "Confidentialité & Données",
      subtitle: "Engagement NDA strict & CNDP / RGPD",
      tag: "Secret Professionnel"
    },
    {
      icon: Award,
      title: "Double Ancrage Opérationnel",
      subtitle: "Bureaux Casablanca 🇲🇦 & Paris 🇫🇷",
      tag: "Proximité Dirigeants"
    },
  ];

  return (
    <div className="border-y border-white/[0.08] bg-[#070b16] relative overflow-hidden py-10">
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/[0.03] via-transparent to-blue-500/[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Part: 4 Key Executive Metrics (Bloomberg/Financial Times Style) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-10 border-b border-white/[0.06]">
          {KEY_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-white/[0.06] hover:border-sky-500/40 transition-all duration-300 text-center group"
            >
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

        {/* Lower Part: Institutional Accreditations Strip */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Institutional Label */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500" />
            </span>
            <div>
              <div className="text-[11px] font-heading font-bold tracking-wider text-slate-200 uppercase">
                Garanties Institutionnelles
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Normes d'Excellence & Conformité
              </div>
            </div>
          </div>

          {/* Trust Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 w-full lg:w-auto flex-1">
            {trustItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/50 border border-white/[0.06] hover:border-sky-500/40 hover:bg-slate-900/80 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-1.5 rounded-lg bg-slate-950 border border-white/[0.06] text-sky-400 group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 group-hover:text-sky-300/80 transition-colors uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-sky-200 transition-colors font-heading">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1 font-sans">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};
