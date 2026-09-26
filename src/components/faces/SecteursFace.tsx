import React, { useState } from 'react';
import { SECTEURS } from '../../data/content';
import { 
  Building2, 
  HardHat, 
  Factory, 
  Boxes, 
  Briefcase, 
  Stethoscope, 
  Zap, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';

interface SecteursFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

export const SecteursFace: React.FC<SecteursFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
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
    <div className="w-full animate-in fade-in duration-300 font-sans pt-28 pb-20">
      
      {/* 1. FACE HEADER & BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
          <button onClick={() => onNavigateFace('accueil')} className="hover:text-white transition-colors cursor-pointer">
            Accueil
          </button>
          <span>/</span>
          <span className="text-sky-400 font-bold">Spécialisations Sectorielles Métiers</span>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 mb-3 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-heading uppercase tracking-wider text-[11px]">Expertise Métier Approfondie</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-heading">
            Des Solutions Calibrées pour Votre Industrie
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed mt-4">
            Chaque secteur présente ses contraintes de marge, de conformité fiscale et de flux opérationnels. Nous configurons l'ERP Odoo et vos processus selon les pratiques d'excellence de votre industrie.
          </p>
        </div>
      </div>

      {/* 2. SECTOR SELECTOR TABS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SECTEURS.map((sec) => {
            const isSelected = sec.id === selectedSecteur;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSecteur(sec.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-slate-900/90 border-sky-400/80 shadow-lg shadow-sky-500/15'
                    : 'bg-slate-950/70 border-white/[0.07] hover:border-white/[0.15] hover:bg-slate-900/50'
                }`}
              >
                <div className={`p-2 rounded-xl border w-fit ${isSelected ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' : 'bg-slate-900 text-slate-400 border-white/[0.08]'}`}>
                  {getSecteurIcon(sec.icon)}
                </div>
                <div className="text-xs font-bold text-white line-clamp-2 font-heading">
                  {sec.title.split(',')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. ACTIVE SECTOR DOSSIER CARD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div key={selectedSecteur} className="p-8 sm:p-12 rounded-3xl bg-slate-900/70 border border-white/[0.09] shadow-2xl relative overflow-hidden backdrop-blur-xl animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative">
            
            {/* Left Overview */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3.5">
                <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  {getSecteurIcon(active.icon)}
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                    {active.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-sky-300 font-medium mt-0.5">
                    {active.subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                  Défis critiques résolus par CLIXA :
                </span>
                {active.challenges.map((chal, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{chal}</span>
                  </div>
                ))}
              </div>

              {/* Feature Chips */}
              <div className="pt-2 flex flex-wrap gap-2">
                {active.features.map((feat, fIdx) => (
                  <span
                    key={fIdx}
                    className="text-xs font-mono font-medium px-3.5 py-1.5 rounded-lg bg-slate-950/80 border border-white/[0.07] text-slate-200"
                  >
                    ✓ {feat}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Action Callout */}
            <div className="lg:col-span-5 p-8 rounded-2xl bg-slate-950/90 border border-white/[0.08] flex flex-col justify-between gap-6 shadow-xl">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-sky-400 block mb-2">
                  Pratique Sectorielle Dédiée
                </span>
                <h4 className="text-lg font-bold text-white mb-2 font-heading">
                  Vous dirigez une organisation dans ce secteur ?
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                  Nos consultants possèdent une maîtrise directe de vos contraintes opérationnelles. Échangeons sur votre feuille de route, vos flux stocks/ventes et vos indicateurs clés.
                </p>
              </div>

              <button
                onClick={() => onOpenConsultation(`Spécialisation Sectorielle: ${active.title}`)}
                className="executive-btn-primary w-full inline-flex items-center justify-center gap-2 py-4 px-5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-xl shadow-sky-500/20 transition-all cursor-pointer font-heading"
              >
                <span>Consulter un associé spécialiste</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 4. TRANSITION TO NEXT FACE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigateFace('expertises')}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Retour aux Expertises
        </button>

        <button
          onClick={() => onNavigateFace('cas-clients')}
          className="link-cta-sqli text-sm font-bold cursor-pointer"
        >
          <span>Face Suivante : Études de Cas & ROI Vérifiés</span>
          <div className="icon-circle">
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

    </div>
  );
};
