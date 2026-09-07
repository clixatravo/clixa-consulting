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
  Quote,
  Sparkles,
  Star
} from 'lucide-react';

interface ExpertisesProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Expertises: React.FC<ExpertisesProps> = ({ onOpenConsultation }) => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const getIcon = (id: string) => {
    switch (id) {
      case 'odoo':
        return <Database className="w-6 h-6 text-sky-400" />;
      case 'digital':
        return <Globe className="w-6 h-6 text-cyan-400" />;
      case 'amoa':
        return <Layers className="w-6 h-6 text-indigo-400" />;
      case 'finance':
        return <TrendingUp className="w-6 h-6 text-blue-400" />;
      case 'process':
        return <Workflow className="w-6 h-6 text-teal-400" />;
      default:
        return <Sparkles className="w-6 h-6 text-sky-400" />;
    }
  };

  const filteredExpertises = activeTab === 'all' 
    ? EXPERTISES 
    : EXPERTISES.filter(item => item.id === activeTab);

  return (
    <section id="expertises" className="py-24 bg-slate-950 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pôles d'Excellence Métiers & SI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Nos Domaines d'Intervention
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Une combinaison éprouvée d’intégration technologique (ERP Odoo, Digital), d’AMOA rigoureuse et de maîtrise financière & organisationnelle.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'all'
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 ring-1 ring-sky-400'
                : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'all' ? 'bg-white' : 'bg-slate-500'}`} />
            <span>Toutes nos offres ({EXPERTISES.length})</span>
          </button>
          {EXPERTISES.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setActiveTab(exp.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === exp.id
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 ring-1 ring-sky-400'
                  : 'bg-slate-900/90 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800'
              }`}
            >
              {exp.isFlagship && <Star className="w-3 h-3 text-amber-400 fill-amber-400" />}
              <span>{exp.title.split('&')[0]}</span>
            </button>
          ))}
        </div>

        {/* Expertises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredExpertises.map((expertise) => (
            <div
              key={expertise.id}
              className={`flex flex-col rounded-2xl p-7 sm:p-9 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-sky-500/5 group relative overflow-hidden ${
                expertise.isFlagship
                  ? 'bg-gradient-to-b from-slate-900 to-slate-950 border border-sky-500/40 hover:border-sky-400/70'
                  : 'bg-slate-900/70 border border-slate-800/90 hover:border-sky-500/40'
              }`}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Optional Real Photo Header */}
              {expertise.image && (
                <div className="relative h-48 -mx-7 -mt-7 sm:-mx-9 sm:-mt-9 mb-6 overflow-hidden bg-slate-950">
                  <img
                    src={expertise.image}
                    alt={expertise.title}
                    width={800}
                    height={447}
                    decoding="async"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                  
                  {/* Flagship ribbon inside image */}
                  {expertise.isFlagship && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-slate-950/85 backdrop-blur-md border border-sky-500/30 rounded-lg text-[10px] font-mono text-sky-300 font-semibold flex items-center gap-1 shadow-md">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>PÔLE MAJEUR</span>
                    </div>
                  )}
                </div>
              )}

              {/* Card Header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shadow-inner group-hover:border-sky-500/40 group-hover:bg-slate-900 transition-all">
                    {getIcon(expertise.id)}
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-400 font-mono">
                      {expertise.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
                      {expertise.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Tagline / Subtitle */}
              <p className="text-sm sm:text-base font-semibold text-slate-200 mb-3 leading-snug">
                {expertise.tagline}
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                {expertise.description}
              </p>

              {/* Bullet points list styled */}
              <div className="space-y-2 mb-8 flex-1">
                {expertise.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-950/40 border border-slate-850/50 text-xs sm:text-sm text-slate-300 hover:border-slate-800 transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Role Quote if available */}
              {expertise.roleQuote && (
                <div className="mb-6 p-4 rounded-xl bg-slate-950/90 border-l-2 border-sky-400 text-xs sm:text-sm text-slate-300 italic flex items-start gap-2.5 shadow-inner">
                  <Quote className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{expertise.roleQuote}</span>
                </div>
              )}

              {/* Card CTA */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => onOpenConsultation(expertise.title)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-sky-400 hover:text-sky-300 transition-colors group/btn cursor-pointer py-1"
                >
                  <span>Échanger avec un consultant</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
                <span className="text-[11px] text-slate-500 font-mono">CLIXA Method</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
