import React, { useState } from 'react';
import { SECTEURS } from '../data/content';
import { 
  Building2, 
  HardHat, 
  Factory, 
  Boxes, 
  Briefcase, 
  Stethoscope, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Layers
} from 'lucide-react';

interface SecteursProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Secteurs: React.FC<SecteursProps> = ({ onOpenConsultation }) => {
  const [selectedSecteur, setSelectedSecteur] = useState<string>(SECTEURS[0].id);

  const getSecteurIcon = (iconName: string) => {
    switch (iconName) {
      case 'HardHat':
        return <HardHat className="w-5 h-5" />;
      case 'Factory':
        return <Factory className="w-5 h-5" />;
      case 'Boxes':
        return <Boxes className="w-5 h-5" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5" />;
      case 'Stethoscope':
        return <Stethoscope className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      default:
        return <Building2 className="w-5 h-5" />;
    }
  };

  const active = SECTEURS.find(s => s.id === selectedSecteur) || SECTEURS[0];

  return (
    <section id="secteurs" className="py-24 bg-slate-900/40 border-t border-slate-850 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Spécialisations Sectorielles</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Des solutions calibrées pour votre secteur d'activité
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Chaque secteur a ses impératifs de flux, de marge et de conformité. Nous configurons des processus et des outils adaptés à votre réalité opérationnelle.
          </p>
        </div>

        {/* Industry Pills Selector for Mobile & Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-10">
          {SECTEURS.map((sec) => {
            const isSelected = sec.id === selectedSecteur;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSecteur(sec.id)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                  isSelected
                    ? 'bg-slate-900 border-sky-500/80 shadow-lg shadow-sky-500/15 ring-1 ring-sky-400'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className={`p-2 rounded-lg border w-fit ${sec.color}`}>
                  {getSecteurIcon(sec.icon)}
                </div>
                <div className="text-xs font-bold text-white line-clamp-2">
                  {sec.title.split(',')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Industry Focus Display Card */}
        <div className="p-7 sm:p-10 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
            
            {/* Left Overview */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl border ${active.color}`}>
                  {getSecteurIcon(active.icon)}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {active.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-sky-400 font-medium">
                    {active.subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Défis majeurs adressés par CLIXA :
                </span>
                {active.challenges.map((chal, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{chal}</span>
                  </div>
                ))}
              </div>

              {/* Feature Chips */}
              <div className="pt-2 flex flex-wrap gap-2">
                {active.features.map((feat, fIdx) => (
                  <span
                    key={fIdx}
                    className="text-xs font-mono font-semibold px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200"
                  >
                    ⚡ {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Action Callout */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-800 flex flex-col justify-between gap-6 shadow-xl">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-400 block mb-2">
                  Accompagnement Spécialisé
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                  Vous dirigez une entreprise dans ce secteur ?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Nos consultants possèdent une expérience directe de vos contraintes de gestion. Échangeons sur vos priorités et visualisez nos cas d'usage comparables.
                </p>
              </div>

              <button
                onClick={() => onOpenConsultation(`Spécialisation Sectorielle: ${active.title}`)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-xl shadow-sky-500/20 transition-all cursor-pointer"
              >
                <span>Échanger avec un consultant expert de mon secteur</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
