import React, { useState } from 'react';
import { EXPERTISES } from '../data/content';
import { 
  TrendingUp, 
  Workflow, 
  Layers, 
  Database, 
  Globe, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ArrowUpRight, 
  FileCheck, 
  ChevronRight,
  Code2
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

  return (
    <section id="expertises" className="py-24 bg-[#050811] relative scroll-mt-24 overflow-hidden border-b border-white/[0.08]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-sky-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-blue-600/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* SQLI-Style Push-Services 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Fixed / Sticky Editorial Briefing (SQLI push-services left column) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-sky-400 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-heading uppercase tracking-wider text-[11px]">Pôles d'Intervention & SI</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              Expertise & Architecture SI
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Nous combinons la rigueur des méthodes de conseil de direction générale, l'ingénierie applicative et l'expertise ERP pour bâtir des systèmes d'information robustes, scalables et fiscalement conformes.
            </p>

            {/* SQLI Signature CTA Link */}
            <div className="pt-2">
              <button
                onClick={() => onOpenConsultation("Audit & Cadrage Global")}
                className="link-cta-sqli cursor-pointer"
              >
                <span>Planifier une revue d'architecture</span>
                <div className="icon-circle">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>
            </div>

            {/* Trust Anchors Box */}
            <div className="pt-6 border-t border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Engagement forfaitaire & jalons contractuels</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Intervention sous 72h au Maroc et en Europe</span>
              </div>
            </div>

            {/* Executive Metric Callout Card */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/[0.06] backdrop-blur-md">
              <div className="text-2xl font-black text-white font-heading">+35%</div>
              <div className="text-xs text-slate-300 font-semibold mt-0.5">Gain moyen de vélocité opérationnelle</div>
              <div className="text-[11px] text-slate-400 mt-1">Constaté sur nos 30+ déploiements ERP & refontes SI</div>
            </div>
          </div>

          {/* Right Column: SQLI push-services__list Interactive Capability Rows */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="space-y-3">
              {EXPERTISES.map((exp, idx) => {
                const isSelected = selectedId === exp.id;
                return (
                  <div
                    key={exp.id}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isSelected
                        ? 'bg-slate-900/90 border-sky-500/50 shadow-2xl'
                        : 'bg-slate-950/70 border-white/[0.07] hover:border-white/[0.15] hover:bg-slate-900/50'
                    }`}
                  >
                    {/* Header bar of each service */}
                    <button
                      onClick={() => setSelectedId(exp.id)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`p-2.5 rounded-xl border transition-colors ${
                          isSelected 
                            ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' 
                            : 'bg-slate-900 text-slate-400 border-white/[0.08]'
                        }`}>
                          {getIcon(exp.id, "w-4 h-4")}
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-2">
                            <span>PÔLE 0{idx + 1}</span>
                            {exp.isFlagship && (
                              <span className="text-sky-400 font-bold">• OFFRE PHARE</span>
                            )}
                          </div>
                          <div className="text-base sm:text-lg font-bold text-white font-heading">
                            {exp.title}
                          </div>
                        </div>
                      </div>

                      <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-sky-500 border-sky-400 text-white rotate-90'
                          : 'bg-slate-900 border-white/[0.08] text-slate-400'
                      }`}>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </button>

                    {/* Expanded Detail Dossier when active */}
                    {isSelected && (
                      <div className="px-5 sm:px-6 pb-6 pt-0 border-t border-white/[0.06] animate-in fade-in duration-300">
                        <div className="pt-4 space-y-4">
                          
                          <p className="text-xs sm:text-sm font-medium text-sky-300">
                            {exp.tagline}
                          </p>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                            {exp.description}
                          </p>

                          {/* Image preview if available */}
                          {exp.image && (
                            <div className="relative h-44 rounded-xl overflow-hidden border border-white/[0.08]">
                              <img
                                src={exp.image}
                                alt={exp.title}
                                width={800}
                                height={447}
                                decoding="async"
                                loading="lazy"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                            </div>
                          )}

                          {/* Deliverables Checklist */}
                          <div>
                            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2 flex items-center gap-1.5">
                              <FileCheck className="w-3.5 h-3.5 text-sky-400" />
                              Livrables opérationnels garantis :
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {exp.items.map((item, iIdx) => (
                                <div
                                  key={iIdx}
                                  className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/80 border border-white/[0.05] text-xs text-slate-300"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                                  <span>{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="pt-3">
                            <button
                              onClick={() => onOpenConsultation(exp.title)}
                              className="executive-btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white font-heading cursor-pointer"
                            >
                              <span>Cadrer ce pôle avec un associé</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>

                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
