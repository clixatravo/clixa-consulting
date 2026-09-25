import React from 'react';
import { Target, Sparkles, TrendingUp, Workflow, Database, Globe, ArrowUpRight } from 'lucide-react';
import { BRAND } from '../data/content';

export const AboutBanner: React.FC = () => {
  const pillars = [
    { 
      title: "Finance & Pilotage", 
      desc: "Modélisation de rentabilité, réduction du BFR & tableaux de bord de gestion", 
      icon: TrendingUp, 
      tag: "Direction Financière",
      stat: "+25% Visibilité Cash"
    },
    { 
      title: "Processus & Organisation", 
      desc: "Cartographie des flux, élimination des goulets d'étranglement & gains de productivité", 
      icon: Workflow, 
      tag: "Direction Générale",
      stat: "-40% Délais de Traitement"
    },
    { 
      title: "Systèmes d'Information & ERP", 
      desc: "AMOA stratégique, intégration Odoo & architecture applicative pérenne", 
      icon: Database, 
      tag: "Direction des Systèmes d'Information",
      stat: "100% Cadrage Sécurisé"
    },
    { 
      title: "Transformation Digitale & Web", 
      desc: "Automatisation des flux métiers, portails clients & plateformes haute performance", 
      icon: Globe, 
      tag: "Opérations & Commercial",
      stat: "Zéro Saisie Manuelle"
    },
  ];

  return (
    <section id="a-propos" className="py-24 bg-[#060913] border-b border-white/[0.08] relative scroll-mt-24 overflow-hidden">
      {/* Subtle background ambient */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/[0.04] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Mission & Positioning Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 shadow-sm">
              <Target className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-heading uppercase tracking-wider text-[11px]">Notre Doctrine d'Intervention</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-heading">
              L'alliance rare du conseil stratégique et de la maîtrise technologique de terrain.
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              La plupart des cabinets de conseil se contentent de livrer des rapports d'audit théoriques, tandis que les intégrateurs informatiques ignorent les réalités comptables et managériales de l'entreprise.
            </p>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              <strong className="text-white font-semibold">CLIXA Consulting comble ce fossé critique.</strong> Nous associons la rigueur des méthodes Big 4, l'expertise financière et la capacité d'intégration directe de solutions technologiques performantes (Odoo ERP, plateformes web, automatisations).
            </p>

            <div className="pt-2">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900/90 to-slate-950/90 border border-white/[0.08] shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 to-blue-600" />
                <div className="flex items-start gap-4 pl-2">
                  <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-0.5">
                      Engagement de Résultat
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                      {BRAND.punchline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: The 4 Quadrants Matrix */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/[0.09] shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute -top-10 -right-10 w-44 h-44 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-heading">
                    Carrefour Stratégique 360°
                  </span>
                </div>
                <span className="text-xs text-sky-400 font-medium px-2.5 py-1 rounded-md bg-sky-500/10 border border-sky-500/20">
                  Synergie Métier
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {pillars.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-950/80 border border-white/[0.07] hover:border-sky-500/40 hover:bg-slate-900/80 transition-all duration-300 group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] text-slate-400 font-mono">0{idx + 1}</span>
                          <div className="p-2 rounded-lg bg-slate-900 border border-white/[0.08] text-sky-400 group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>
                        <div className="text-[10px] font-mono uppercase text-sky-400/90 font-medium mb-1">
                          {item.tag}
                        </div>
                        <div className="font-bold text-white text-sm mb-2 group-hover:text-sky-200 transition-colors font-heading">
                          {item.title}
                        </div>
                        <div className="text-xs text-slate-400 leading-relaxed mb-4">
                          {item.desc}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                        <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                          {item.stat}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-center">
                <span className="text-xs text-slate-400">
                  Chaque mission converge vers <strong className="text-white">l'adoption par vos équipes et un ROI mesuré</strong>.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
