import React from 'react';
import { Target, Sparkles, TrendingUp, Workflow, Database, Globe } from 'lucide-react';
import { BRAND } from '../data/content';

export const AboutBanner: React.FC = () => {
  const pillars = [
    { title: "Finance", desc: "Pilotage, rentabilité & modélisation", icon: TrendingUp, border: "border-sky-500/30", bg: "from-sky-500/10 to-transparent", text: "text-sky-400" },
    { title: "Processus", desc: "Cartographie & optimisation ciblée", icon: Workflow, border: "border-cyan-500/30", bg: "from-cyan-500/10 to-transparent", text: "text-cyan-400" },
    { title: "Systèmes d'Information", desc: "AMOA, ERP Odoo & architecture SI", icon: Database, border: "border-blue-500/30", bg: "from-blue-500/10 to-transparent", text: "text-blue-400" },
    { title: "Digital", desc: "Automatisation, outils & plateformes", icon: Globe, border: "border-indigo-500/30", bg: "from-indigo-500/10 to-transparent", text: "text-indigo-400" },
  ];

  return (
    <section id="a-propos" className="py-20 bg-slate-900/60 border-y border-slate-850 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Mission & Positioning Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400">
              <Target className="w-3.5 h-3.5" />
              <span>Notre Positionnement</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              {BRAND.mission}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {BRAND.approach}
            </p>

            <div className="pt-2">
              <div className="inline-block p-4 rounded-xl bg-gradient-to-r from-slate-900 to-slate-850 border border-sky-500/30 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-500/20 text-sky-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-white">
                    {BRAND.punchline}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The 4 Intersecting Dimensions Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-sky-400" />
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Carrefour Stratégique CLIXA
                  </span>
                </div>
                <span className="text-xs text-sky-400 font-medium">Approche 360°</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {pillars.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl bg-gradient-to-br ${item.bg} border ${item.border} hover:border-sky-400/50 transition-all duration-300 group flex flex-col justify-between`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-slate-400 font-mono">0{idx + 1}</span>
                        <div className={`p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 ${item.text}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="font-bold text-white text-sm sm:text-base mb-1 group-hover:text-sky-300 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-300 leading-snug">
                        {item.desc}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
                <span className="text-xs text-slate-400">
                  Convergence totale vers <strong className="text-white">l'adoption opérationnelle</strong>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
