import React from 'react';
import { Award, ShieldCheck, Users2, Sparkles, CheckCircle2, GraduationCap, Lock, ArrowUpRight } from 'lucide-react';

interface TeamPedigreeProps {
  onOpenConsultation: (topic?: string) => void;
}

export const TeamPedigree: React.FC<TeamPedigreeProps> = ({ onOpenConsultation }) => {
  const credentials = [
    {
      title: "Parcours Big 4 & Stratégie",
      desc: "Des consultants formés aux standards rigoureux des plus grands cabinets de conseil et d'audit internationaux.",
      icon: Award,
      badge: "Rigueur Méthodologique",
      color: "text-sky-400 border-sky-500/30 bg-sky-500/10"
    },
    {
      title: "Experts Certifiés ERP Odoo",
      desc: "Maîtrise approfondie des versions récentes d'Odoo (V16, V17, V18), de leur paramétrage natif et de leurs APIs.",
      icon: Sparkles,
      badge: "Architecture & Code",
      color: "text-blue-400 border-blue-500/30 bg-blue-500/10"
    },
    {
      title: "Praticiens Finance & Contrôle",
      desc: "Expérience directe de la direction financière (DAF), du calcul des coûts de revient et du reporting de gestion.",
      icon: GraduationCap,
      badge: "Vision Chiffrée",
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
    },
    {
      title: "Gouvernance AMOA & TOGAF",
      desc: "Capacité à cadrer des cahiers des charges sans ambiguïté et à piloter des équipes pluridisciplinaires en mode Agile.",
      icon: Users2,
      badge: "Gouvernance & Cadrage",
      color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10"
    },
  ];

  const ethics = [
    {
      title: "Indépendance Technologique",
      desc: "Nous ne vendons pas de licences superflues. Nous recommandons uniquement les modules dont votre entreprise a réellement besoin.",
    },
    {
      title: "Transfert de Compétences",
      desc: "Notre objectif est l'autonomie totale de vos collaborateurs à la mise en production. Zéro dépendance artificielle.",
    },
    {
      title: "Confidentialité Absolue (NDA)",
      desc: "Toutes vos données financières, commerciales et stratégiques sont couvertes par un accord de secret professionnel strict.",
    },
    {
      title: "Engagement sur les Livrables",
      desc: "Chaque étape du projet est validée conjointement par un procès-verbal de recette avant de passer à la phase suivante.",
    },
  ];

  return (
    <section id="equipe-gouvernance" className="py-24 bg-slate-900/40 border-t border-slate-850 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Excellence & Déontologie</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Le profil des consultants CLIXA
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Une équipe senior combinant culture du résultat, expertise technologique pointue et déontologie de conseil sans concession.
          </p>
        </div>

        {/* 4 Pillars of Credentials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-2.5 rounded-xl border ${cred.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">
                      0{idx + 1}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-sky-400 block mb-1.5">
                    {cred.badge}
                  </span>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                    {cred.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {cred.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ethics & Commitments Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-850">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Notre Charte Déontologique Dirigeant
                </h4>
                <p className="text-xs text-slate-400">
                  Les 4 engagements moraux et contractuels pris envers chaque client CLIXA.
                </p>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-mono hidden sm:inline">100% Respectée</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ethics.map((item, eIdx) => (
              <div key={eIdx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-850 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400 text-center sm:text-left">
              Bureaux à Casablanca & Paris • Interventions au Maroc, en France et à l'International.
            </span>
            <button
              onClick={() => onOpenConsultation("Échange avec un consultant senior")}
              className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors cursor-pointer"
            >
              <span>Échanger avec un consultant senior</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
