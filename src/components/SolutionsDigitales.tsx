import React from 'react';
import { SOLUTIONS_DIGITALES } from '../data/content';
import { 
  Globe, 
  LayoutGrid, 
  Cpu, 
  Layers, 
  Zap, 
  Megaphone, 
  ArrowRight,
  Code2
} from 'lucide-react';

interface SolutionsDigitalesProps {
  onOpenConsultation: (topic?: string) => void;
}

export const SolutionsDigitales: React.FC<SolutionsDigitalesProps> = ({ onOpenConsultation }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return <Globe className="w-5 h-5 text-sky-400" />;
      case 'LayoutGrid':
        return <LayoutGrid className="w-5 h-5 text-cyan-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-blue-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-indigo-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Megaphone':
        return <Megaphone className="w-5 h-5 text-teal-400" />;
      default:
        return <Code2 className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section id="digital" className="py-24 bg-slate-950 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>Écosystème Digital</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Solutions Digitales Sur-Mesure
          </h2>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
            Nous concevons également les outils digitaux indispensables à l’accélération de vos opérations, à la productivité de vos équipes et à la croissance de votre activité.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SOLUTIONS_DIGITALES.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="p-3 w-fit rounded-xl bg-slate-950 border border-slate-800 group-hover:border-sky-500/40 transition-colors mb-5">
                  {getIcon(item.iconName)}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => onOpenConsultation(`Solution Digitale: ${item.title}`)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
                >
                  <span>En savoir plus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
                  Custom
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
