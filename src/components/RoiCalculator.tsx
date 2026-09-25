import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp, Clock, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenConsultation: (topic?: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenConsultation }) => {
  const [employees, setEmployees] = useState<number>(25);
  const [hoursLost, setHoursLost] = useState<number>(5);
  const [currency, setCurrency] = useState<'MAD' | 'EUR'>('MAD');

  // Hourly cost estimation (blended loaded labor cost)
  // MAD: ~70 DH/h blended
  // EUR: ~32 €/h blended
  const hourlyRate = currency === 'MAD' ? 70 : 32;
  const weeksPerYear = 46; // working weeks

  const totalHoursSavedYearly = Math.round(employees * hoursLost * weeksPerYear * 0.75); // 75% efficiency gain
  const totalFinancialGain = Math.round(totalHoursSavedYearly * hourlyRate);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR').format(num);
  };

  return (
    <section id="simulateur-roi" className="py-24 bg-[#050811] border-b border-white/[0.08] relative overflow-hidden scroll-mt-24">
      {/* Background ambient */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-500/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-emerald-400 mb-3 shadow-sm">
            <Calculator className="w-3.5 h-3.5" />
            <span className="font-heading uppercase tracking-wider text-[11px]">Modélisation Financière Exécutive</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-heading">
            Simulateur de Rentabilité Opérationnelle & Payback
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Mesurez l'impact direct de la standardisation de vos processus et de l'intégration ERP sur votre compte de résultat.
          </p>
        </div>

        {/* Calculator Widget Container */}
        <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-slate-900/80 border border-white/[0.09] shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left Sliders Controls */}
            <div className="lg:col-span-7 space-y-7">
              
              {/* Currency Selector */}
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

              {/* Slider 1: Collaborateurs */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-semibold text-white">
                    Collaborateurs sur les processus de gestion :
                  </label>
                  <span className="text-base font-bold font-mono text-sky-400 bg-slate-950 px-3 py-1 rounded-xl border border-white/[0.08]">
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
                  <span>5 pers. (PME)</span>
                  <span>75 pers. (ETI)</span>
                  <span>150+ pers. (Groupe)</span>
                </div>
              </div>

              {/* Slider 2: Heures Perdues / Semaine */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs sm:text-sm font-semibold text-white">
                    Temps estimé en ressaisies manuelles & Excel / semaine :
                  </label>
                  <span className="text-base font-bold font-mono text-emerald-400 bg-slate-950 px-3 py-1 rounded-xl border border-white/[0.08]">
                    {hoursLost}h / collaborateur
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
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>2h / sem</span>
                  <span>8h / sem</span>
                  <span>15h / sem</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.05] text-[11px] text-slate-400">
                Hypothèse prudente CLIXA : taux de récupération net de 75% du temps perdu grâce aux automatisations Odoo et fiabilisation des flux.
              </div>
            </div>

            {/* Right Display Cards */}
            <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-white/[0.08] shadow-inner text-center flex flex-col justify-between">
              
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                  Économie Annuelle Potentielle
                </span>
                
                <div className="text-3xl sm:text-4xl font-black text-white font-heading my-2">
                  {formatNumber(totalFinancialGain)}{' '}
                  <span className="text-lg font-bold text-emerald-400">
                    {currency === 'MAD' ? 'MAD' : '€'}
                  </span>
                </div>

                <div className="text-xs text-slate-400 mb-6">
                  Gain net récurrent sur vos charges opérationnelles
                </div>

                <div className="space-y-3 text-left border-t border-white/[0.08] pt-4 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Heures productives récupérées :</span>
                    <span className="font-mono font-bold text-white">
                      +{formatNumber(totalHoursSavedYearly)} h / an
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Délai moyen d'amortissement :</span>
                    <span className="font-mono font-bold text-emerald-400">
                      4 à 6 mois
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Fiabilisation des données DGI/DGFIP :</span>
                    <span className="font-mono font-bold text-sky-400">
                      100%
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenConsultation(`Simulation ROI : ${formatNumber(totalFinancialGain)} ${currency}`)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/20 active:scale-[0.98] cursor-pointer"
              >
                <span>Valider cette modélisation</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
