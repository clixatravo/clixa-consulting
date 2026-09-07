import React from 'react';
import { Cpu, Database, FileCheck2, Globe, Server, Workflow, CheckCircle2, ArrowRight } from 'lucide-react';

interface TechStackProps {
  onOpenConsultation: (topic?: string) => void;
}

export const TechStack: React.FC<TechStackProps> = ({ onOpenConsultation }) => {
  const categories = [
    {
      title: "ERP & Gestion Intégrée",
      icon: Database,
      badge: "Standard International",
      color: "text-sky-400 border-sky-500/30 bg-sky-500/10",
      technos: ["Odoo Enterprise & Community (V15, V16, V17, V18)", "SAP (Connecteurs & Interfaces)", "Microsoft Dynamics 365", "Sage (Migration & Passerelles)"],
      desc: "Implémentation native, personnalisations ciblées et interfaçage avec vos logiciels métiers."
    },
    {
      title: "Facturation Électronique 2026",
      icon: FileCheck2,
      badge: "Conformité Légale",
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
      technos: ["Portails Fiscaux DGI (Maroc)", "Chorus Pro & PDP Agréées (France)", "Formats Factur-X, UBL & XML", "Archivage Légal à Valeur Probante"],
      desc: "Garantie de conformité fiscale totale et élimination des risques de rejet ou d'amendes."
    },
    {
      title: "Web Moderne & Extranets",
      icon: Globe,
      badge: "Performance & UX",
      color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
      technos: ["React & TypeScript", "Next.js & Tailwind CSS", "Node.js & Python / Django", "PostgreSQL & Bases de données Relationnelles"],
      desc: "Conception de sites prestige, plateformes B2B et portails clients ultra-rapides et sécurisés."
    },
    {
      title: "Automatisation & Intégration API",
      icon: Workflow,
      badge: "Zéro Tâche Manuelle",
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
      technos: ["REST APIs & Webhooks Sécurisés", "Make (Integromat) & n8n", "Connecteurs Bancaires & Passerelles de Paiement", "Pipelines d'automatisation des flux"],
      desc: "Synchronisation automatique entre vos ventes, stocks, comptabilité et outils marketing."
    },
  ];

  return (
    <section id="technologies" className="py-24 bg-slate-950 border-t border-slate-850 relative overflow-hidden scroll-mt-24">
      {/* Background glow */}
      <div className="hidden sm:block absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/10 blur-[130px] rounded-full pointer-events-none transform-gpu" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Écosystème & Stack Technologique</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Des technologies éprouvées, robustes et évolutives
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Nous sélectionnons des briques logicielles pérennes, ouvertes et souveraines pour garantir la sécurité et la liberté totale de votre entreprise.
          </p>
        </div>

        {/* Tech Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={idx}
                className="p-7 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 hover:border-sky-500/40 transition-all duration-300 shadow-xl group flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-2.5 rounded-xl border ${cat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-sky-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                    {cat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                    {cat.desc}
                  </p>

                  {/* List of Technos */}
                  <div className="space-y-2 mb-6">
                    {cat.technos.map((tech, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-850/80 text-xs font-mono text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span>{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-850/80 flex items-center justify-between text-xs text-slate-400">
                  <span>Interopérabilité garantie</span>
                  <button
                    onClick={() => onOpenConsultation(`Technologie: ${cat.title}`)}
                    className="text-sky-400 font-semibold hover:text-sky-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Valider ma compatibilité</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Banner */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center max-w-3xl mx-auto">
          <p className="text-xs sm:text-sm text-slate-300">
            Votre entreprise utilise déjà des outils spécifiques (CRM, logiciel comptable historique ou caisse) ? <br className="hidden sm:inline" />
            <strong className="text-white">CLIXA connecte et synchronise vos flux existants sans rupture de service.</strong>
          </p>
        </div>

      </div>
    </section>
  );
};
