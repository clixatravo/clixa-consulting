import React from 'react';
import { ShieldCheck, FileCheck2, Cpu, Award, Lock } from 'lucide-react';

export const TrustBanner: React.FC = () => {
  const trustItems = [
    {
      icon: Cpu,
      title: "Écosystème ERP Odoo",
      subtitle: "Intégration certifiée & sur-mesure",
      color: "text-sky-400 border-sky-500/20 bg-sky-500/10"
    },
    {
      icon: FileCheck2,
      title: "Facturation Électronique",
      subtitle: "Conformité DGI (MA) & DGFIP (FR)",
      color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10"
    },
    {
      icon: ShieldCheck,
      title: "Méthodologie AMOA Rigoureuse",
      subtitle: "Cadrage, spécifications & recette",
      color: "text-blue-400 border-blue-500/20 bg-blue-500/10"
    },
    {
      icon: Lock,
      title: "Confidentialité & Données",
      subtitle: "Engagement NDA & CNDP / RGPD",
      color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/10"
    },
    {
      icon: Award,
      title: "Double Ancrage Opérationnel",
      subtitle: "Bureaux Casablanca 🇲🇦 & Paris 🇫🇷",
      color: "text-teal-400 border-teal-500/20 bg-teal-500/10"
    },
  ];

  return (
    <div className="border-y border-slate-850 bg-slate-950/80 backdrop-blur-sm relative overflow-hidden py-6">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
          
          {/* Label Tag */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500" />
            </span>
            <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
              Garanties & Écosystème Institutionnel
            </span>
          </div>

          {/* Trust Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full lg:w-auto flex-1">
            {trustItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
                >
                  <div className={`p-2 rounded-lg border ${item.color} shrink-0`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
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
