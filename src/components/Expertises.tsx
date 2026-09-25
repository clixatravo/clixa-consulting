import React, { useState } from 'react';
import { EXPERTISES } from '../data/content';
import { 
  TrendingUp, 
  Workflow, 
  Layers, 
  Database, 
  Globe,
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Star,
  ShieldCheck,
  Clock,
  ArrowUpRight,
  FileCheck
} from 'lucide-react';

interface ExpertisesProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Expertises: React.FC<ExpertisesProps> = ({ onOpenConsultation }) => {
  const [selectedId, setSelectedId] = useState<string>('odoo');

  const getIcon = (id: string, className = "w-5 h-5") => {
    switch (id) {
      case 'odoo':
        return <Database className={className} />;
      case 'digital':
        return <Globe className={className} />;
      case 'amoa':
        return <Layers className={className} />;
      case 'finance':
        return <TrendingUp className={className} />;
      case 'process':
        return <Workflow className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const currentItem = EXPERTISES.find(e => e.id === selectedId) || EXPERTISES[0];

  return (
    <section id="expertises" className="py-24 bg-[#050811] relative scroll-mt-24 overflow-hidden border-b border-white/[0.08]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-sky-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-600/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-heading uppercase tracking-wider text-[11px]">Pôles d'Excellence & Dossiers d'Intervention</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Une Matrice de Compétences Complète & Intégrée
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Chaque pôle est dirigé avec les exigences méthodologiques des grands cabinets de conseil et la capacité de délivrance technique opérationnelle.
          </p>
        </div>

        {/* Tab Navigation: Executive Segment Switcher */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-12">
          {EXPERTISES.map((exp) => {
            const isSelected = selectedId === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => setSelectedId(exp.id)}
                className={`px-4 sm:px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg shadow-sky-500/25 ring-1 ring-sky-400'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-850 border border-white/[0.07]'
                }`}
              >
                <span className={isSelected ? 'text-white' : 'text-sky-400'}>
                  {getIcon(exp.id, "w-4 h-4")}
                </span>
                <span>{exp.title.split('&')[0]}</span>
                {exp.isFlagship && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isSelected ? 'bg-white/20 text-white' : 'bg-amber-400/10 text-amber-400'}`}>
                    ★ Phare
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Master Executive Briefing Dossier */}
        <div key={selectedId} className="rounded-3xl bg-slate-900/80 border border-white/[0.09] shadow-2xl overflow-hidden backdrop-blur-xl animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Strategic Scope & Deliverables */}
            <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.08]">
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 px-3 py-1 rounded-md bg-sky-500/10 border border-sky-500/20">
                    {currentItem.badge}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Engagement forfaitaire & garanti
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 font-heading leading-tight">
                  {currentItem.title}
                </h3>

                <p className="text-sm sm:text-base font-medium text-sky-200/90 mb-4 leading-snug">
                  {currentItem.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                  {currentItem.description}
                </p>

                {/* Deliverables Matrix */}
                <div className="mb-6">
                  <div className="text-xs font-heading font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-sky-400" />
                    Livrables & Périmètre Opérationnel
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentItem.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/70 border border-white/[0.05] hover:border-sky-500/30 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-300 font-medium leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-400">
                  Besoin d'un audit de cadrage sous 48h ?
                </div>
                <button
                  onClick={() => onOpenConsultation(currentItem.title)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 transition-all shadow-lg shadow-sky-500/20 active:scale-[0.98] cursor-pointer"
                >
                  <span>Demander un cadrage exécutif</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Column: Visual Case Presentation & Key Metrics */}
            <div className="lg:col-span-5 p-7 sm:p-10 bg-slate-950/70 flex flex-col justify-between">
              
              {/* Photo Scrim if available */}
              {currentItem.image ? (
                <div className="relative h-56 rounded-2xl overflow-hidden mb-6 border border-white/[0.08] shadow-lg">
                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    width={800}
                    height={447}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-200 font-medium bg-slate-900/90 backdrop-blur-md p-2.5 rounded-xl border border-white/[0.08]">
                    Cas d'usage réel déployé par CLIXA en environnement de production.
                  </div>
                </div>
              ) : (
                <div className="h-56 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/[0.08] p-6 flex flex-col justify-center items-center text-center mb-6">
                  <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 mb-3">
                    {getIcon(currentItem.id, "w-8 h-8")}
                  </div>
                  <h4 className="text-white font-bold text-base mb-1">Expertise Stratégique C-Suite</h4>
                  <p className="text-xs text-slate-400 max-w-xs">Gouvernance, pilotage de la rentabilité et accompagnement des comités de direction.</p>
                </div>
              )}

              {/* Verified Institutional Commitments */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-sky-400" />
                    <span className="text-xs text-slate-300 font-medium">Délai moyen d'intervention</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-white/[0.05]">
                    72 Heures
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs text-slate-300 font-medium">Protection des données</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-slate-950 px-2 py-0.5 rounded border border-white/[0.05]">
                    NDA Strict
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-slate-300 font-medium">Séniorité des consultants</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-slate-950 px-2 py-0.5 rounded border border-white/[0.05]">
                    10 à 15+ ans
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Overview of all 5 pillars in compact cards so users can also grasp the full spectrum at a glance */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {EXPERTISES.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setSelectedId(exp.id)}
              className={`p-4 rounded-2xl text-left transition-all duration-300 border cursor-pointer ${
                selectedId === exp.id
                  ? 'bg-slate-900 border-sky-400/80 shadow-lg shadow-sky-500/10'
                  : 'bg-slate-950/70 border-white/[0.06] hover:border-white/[0.15] hover:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-1.5 rounded-lg ${selectedId === exp.id ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-900 text-slate-400'}`}>
                  {getIcon(exp.id, "w-4 h-4")}
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  0{EXPERTISES.indexOf(exp) + 1}
                </span>
              </div>
              <div className="text-xs font-bold text-white truncate mb-1">
                {exp.title.split('&')[0]}
              </div>
              <div className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                {exp.tagline}
              </div>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
