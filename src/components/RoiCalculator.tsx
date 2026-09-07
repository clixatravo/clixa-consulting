import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenConsultation: (topic?: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenConsultation }) => {
  const [employees, setEmployees] = useState<number>(25);
  const [hoursLost, setHoursLost] = useState<number>(5);
  const [currency, setCurrency] = useState<'MAD' | 'EUR'>('MAD');

  // Hourly cost estimation (loaded labor rate)
  // MAD: ~65 DH/h on average blended administrative cost
  // EUR: ~28 €/h on average blended administrative cost
  const hourlyRate = currency === 'MAD' ? 70 : 30;
  const weeksPerYear = 46; // working weeks

  const totalHoursSavedYearly = Math.round(employees * hoursLost * weeksPerYear * 0.75); // 75% efficiency gain
  const totalFinancialGain = Math.round(totalHoursSavedYearly * hourlyRate);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <section id="simulateur-roi" className="py-24 bg-slate-950 border-t border-slate-850 relative overflow-hidden">
      {/* Background glow */}
      <div className="hidden sm:block absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none transform-gpu" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulateur de Rentabilité Opérationnelle</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Combien votre entreprise peut-elle économiser ?
          </h2>

          <p className="text-base sm:text-lg text-slate-400">
            Estimez en quelques secondes le gain de temps et les économies directes générés par l'automatisation de vos flux et l'intégration d'un ERP moderne.
          </p>
        </div>

        {/* Calculator Widget Container */}
        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Sliders Controls */}
            <div className="lg:col-span-7 space-y-7">
              
              {/* Currency Selector */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase text-slate-400">
                  Devise de calcul :
                </span>
                <div className="flex rounded-xl bg-slate-950 p-1 border border-slate-800">
                  <button
                    onClick={() => setCurrency('MAD')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      currency === 'MAD' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🇲🇦 Dirham (MAD)
                  </button>
                  <button
                    onClick={() => setCurrency('EUR')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                      currency === 'EUR' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🇫🇷 Euro (€)
                  </button>
                </div>
              </div>

              {/* Slider 1: Collaborateurs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-semibold text-white">
                    Nombre de collaborateurs utilisant les outils :
                  </label>
                  <span className="text-lg font-black font-mono text-sky-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
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
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-sky-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>5 pers.</span>
                  <span>75 pers.</span>
                  <span>150+ pers.</span>
                </div>
              </div>

              {/* Slider 2: Heures Perdues / Semaine */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-semibold text-white">
                    Heures perdues en saisies manuelles & Excel / semaine / pers. :
                  </label>
                  <span className="text-lg font-black font-mono text-emerald-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                    {hoursLost}h / sem
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={hoursLost}
                  onChange={(e) => setHoursLost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>2 heures</span>
                  <span>6 heures</span>
                  <span>12 heures</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Basé sur les moyennes constatées par CLIXA chez ses clients après automatisation des flux de devis, facturation, achats et inventaires.
                </span>
              </div>

            </div>

            {/* Right Live Results Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border border-emerald-500/40 shadow-2xl flex flex-col justify-between gap-6 relative">
              <div className="space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                  Économies Potentielles Estimées
                </span>

                {/* Big Money Number */}
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    {formatNumber(totalFinancialGain)} {currency}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">gain financier direct annuel</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-400" />
                      Heures libérées / an :
                    </span>
                    <span className="font-mono font-bold text-white">
                      {formatNumber(totalHoursSavedYearly)} h
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      Délai moyen d'amortissement :
                    </span>
                    <span className="font-mono font-bold text-emerald-400">
                      3 à 6 mois
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation(`Simulation ROI: ${employees} pers., gain est. ${formatNumber(totalFinancialGain)} ${currency}`)}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-xl shadow-emerald-500/20 transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Demander mon étude de ROI détaillée</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
