import React, { useState } from 'react';
import { 
  Calculator, 
  Zap, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2
} from 'lucide-react';

interface ExecutiveLabFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

export const ExecutiveLabFace: React.FC<ExecutiveLabFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
  const [activeTab, setActiveTab] = useState<'roi' | 'audit'>('roi');

  // ROI Calculator State
  const [employees, setEmployees] = useState<number>(25);
  const [hoursLost, setHoursLost] = useState<number>(5);
  const [currency, setCurrency] = useState<'MAD' | 'EUR'>('MAD');

  const hourlyRate = currency === 'MAD' ? 70 : 32;
  const weeksPerYear = 46;
  const totalHoursSavedYearly = Math.round(employees * hoursLost * weeksPerYear * 0.75);
  const totalFinancialGain = Math.round(totalHoursSavedYearly * hourlyRate);

  const formatNumber = (num: number) => new Intl.NumberFormat('fr-FR').format(num);

  const auditDeliverables = [
    "Cartographie synthétique des flux d'information et points de rupture",
    "Matrice des Quick Wins opérationnels à fort retour sur investissement",
    "Recommandation d'architecture SI (ERP Odoo, modules cibles ou connecteurs API)",
    "Budget d'intégration prévisionnel et calendrier réaliste de déploiement",
    "Restitution exécutive directe avec un associé senior (1h de débriefing stratégique)",
  ];

  return (
    <div className="w-full animate-in fade-in duration-300 font-sans pt-28 pb-20">
      
      {/* 1. FACE HEADER & BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-4">
          <button onClick={() => onNavigateFace('accueil')} className="hover:text-white transition-colors cursor-pointer">
            Accueil
          </button>
          <span>/</span>
          <span className="text-emerald-400 font-bold">Executive Lab & Décision C-Suite</span>
        </div>

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-heading uppercase tracking-wider text-[11px]">Outils d'Aide à la Décision</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight font-heading">
            Chiffrez Votre Rentabilité & Cadrez en 48H
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed mt-4">
            Deux leviers exécutifs indépendants pour évaluer l'impact financier de la standardisation de vos processus avant tout engagement contractuel.
          </p>
        </div>
      </div>

      {/* 2. TAB SWITCHER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-950 border border-white/[0.08] shadow-xl">
          <button
            onClick={() => setActiveTab('roi')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-heading ${
              activeTab === 'roi'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>1. Simulateur de Rentabilité ROI</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer font-heading ${
              activeTab === 'audit'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4 text-slate-950" />
            <span>2. Pack Diagnostic Flash 48H</span>
          </button>
        </div>
      </div>

      {/* 3. ACTIVE TAB CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {activeTab === 'roi' ? (
          <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-white/[0.09] shadow-2xl relative overflow-hidden backdrop-blur-xl animate-in fade-in duration-300">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Sliders */}
              <div className="lg:col-span-7 space-y-7">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <span className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                    Devise de référence :
                  </span>
                  <div className="flex rounded-xl bg-slate-950 p-1 border border-white/[0.08]">
                    <button
                      onClick={() => setCurrency('MAD')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        currency === 'MAD' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🇲🇦 Dirham (MAD)
                    </button>
                    <button
                      onClick={() => setCurrency('EUR')}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        currency === 'EUR' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      🇫🇷 Euro (€)
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-semibold text-white">
                      Collaborateurs sur les processus opérationnels :
                    </label>
                    <span className="text-base font-bold font-mono text-emerald-400 bg-slate-950 px-3 py-1 rounded-xl border border-white/[0.08]">
                      {employees} personnes
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="150"
                    step="5"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>5 (PME)</span>
                    <span>50 (ETI)</span>
                    <span>150+ (Groupe)</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs sm:text-sm font-semibold text-white">
                      Heures perdues en saisies & ressaisies / sem :
                    </label>
                    <span className="text-base font-bold font-mono text-emerald-400 bg-slate-950 px-3 py-1 rounded-xl border border-white/[0.08]">
                      {hoursLost}h / employé
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    step="1"
                    value={hoursLost}
                    onChange={(e) => setHoursLost(Number(e.target.value))}
                    className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                    <span>2h (Faible)</span>
                    <span>7h (Moyen)</span>
                    <span>15h (Critique)</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.05] flex items-center gap-3 text-xs text-slate-400 font-sans">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Modèle basé sur une reprise de 75% du temps perdu grâce aux flux natifs d'Odoo.</span>
                </div>
              </div>

              {/* Result Box */}
              <div className="lg:col-span-5 p-8 rounded-2xl bg-gradient-to-b from-slate-950 to-[#070b14] border border-emerald-500/30 shadow-2xl flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    Économies Annuelles Estimées
                  </div>

                  <div>
                    <div className="text-4xl sm:text-5xl font-black text-white font-heading tracking-tight">
                      {formatNumber(totalFinancialGain)} <span className="text-2xl text-emerald-400">{currency}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      Gain financier brut récurrent par an
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/[0.06] space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Temps valorisé :</span>
                      <span className="font-mono text-white font-bold">{formatNumber(totalHoursSavedYearly)} h / an</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Délai d'amortissement :</span>
                      <span className="font-mono text-emerald-400 font-bold">&lt; 6 mois</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenConsultation(`Audit ROI (${formatNumber(totalFinancialGain)} ${currency}/an)`)}
                  className="executive-btn-primary w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl text-xs sm:text-sm font-bold text-white font-heading cursor-pointer"
                >
                  <span>Valider ces chiffres avec un associé</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-900/80 border border-amber-400/30 shadow-2xl relative overflow-hidden backdrop-blur-xl animate-in fade-in duration-300">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-500" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/25 text-xs font-semibold text-amber-300 mb-3">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Cadrage Exécutif Sans Engagement</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading leading-tight">
                    Le Pack Diagnostic Flash 48H
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans mt-2">
                    Avant d'engager un budget significatif, bénéficiez d'une analyse d'architecture indépendante de vos systèmes et de vos processus pour sécuriser vos arbitrages.
                  </p>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 block">
                    Livrables formels remis sous 48h au Comex :
                  </span>
                  {auditDeliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 p-8 rounded-2xl bg-slate-950/90 border border-white/[0.08] shadow-2xl flex flex-col justify-between gap-6">
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold uppercase text-amber-400">Direction Générale</span>
                    <span className="font-mono text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-white/[0.08]">Délai : 48 Heures</span>
                  </div>

                  <div className="text-lg font-bold text-white font-heading">
                    Feuille de Route & Détection des Risques
                  </div>

                  <p className="text-slate-400 leading-relaxed font-sans">
                    Idéal pour valider la faisabilité technique, évaluer le périmètre Odoo exact et aligner vos directeurs métiers.
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/[0.06] space-y-2 text-slate-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>Mobilisation interne : <strong>1h30 seulement</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Garantie : <strong>100% sous accord de confidentialité (NDA)</strong></span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onOpenConsultation("Pack Diagnostic Flash 48H")}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-xl shadow-amber-500/20 active:scale-[0.98] transition-all cursor-pointer font-heading"
                >
                  <span>Réserver un Diagnostic Flash</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. TRANSITION TO NEXT FACE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigateFace('cas-clients')}
          className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Retour aux Cas Clients
        </button>

        <button
          onClick={() => onNavigateFace('methode')}
          className="link-cta-sqli text-sm font-bold cursor-pointer"
        >
          <span>Face Suivante : Méthodologie en 4 Phases & Gouvernance</span>
          <div className="icon-circle">
            <ArrowRight className="w-4 h-4" />
          </div>
        </button>
      </div>

    </div>
  );
};
