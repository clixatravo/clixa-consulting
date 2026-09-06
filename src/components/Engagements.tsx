import React from 'react';
import { ENGAGEMENTS } from '../data/content';
import { ShieldCheck, Clock, Users, TrendingUp, CheckCircle, Shield } from 'lucide-react';

export const Engagements: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-sky-400" />;
      case 'ClockCheck':
        return <Clock className="w-6 h-6 text-cyan-400" />;
      case 'Users':
        return <Users className="w-6 h-6 text-indigo-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-emerald-400" />;
      default:
        return <Shield className="w-6 h-6 text-sky-400" />;
    }
  };

  return (
    <section className="py-20 bg-slate-950 border-t border-slate-850 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>Gouvernance & Sérénité</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Nos Engagements & Garanties de Service
          </h2>

          <p className="text-base text-slate-400">
            Faire appel à CLIXA, c'est choisir un partenaire qui engage sa responsabilité sur la réussite opérationnelle et l'autonomie de votre entreprise.
          </p>
        </div>

        {/* 4 Engagements Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENGAGEMENTS.map((item, idx) => (
            <div
              key={idx}
              className="p-7 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="p-3 w-fit rounded-xl bg-slate-950 border border-slate-800 group-hover:border-sky-500/30 transition-colors mb-5">
                  {getIcon(item.iconName)}
                </div>

                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-start gap-2 text-xs font-semibold text-sky-400">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5 text-sky-400" />
                  <span>{item.benefit}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
