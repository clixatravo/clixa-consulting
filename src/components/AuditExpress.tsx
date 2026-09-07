import React, { useState } from 'react';
import { AUDIT_QUESTIONS } from '../data/content';
import { Sparkles, CheckCircle2, ArrowRight, RotateCcw, ShieldAlert, Target } from 'lucide-react';

interface AuditExpressProps {
  onOpenConsultation: (topic?: string) => void;
}

export const AuditExpress: React.FC<AuditExpressProps> = ({ onOpenConsultation }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (points: number) => {
    const updatedAnswers = [...answers, points];
    setAnswers(updatedAnswers);

    if (currentStep + 1 < AUDIT_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  const totalScore = answers.reduce((acc, curr) => acc + curr, 0);

  const getDiagnostic = () => {
    if (totalScore <= 4) {
      return {
        level: "Priorité Haute — Structuration Urgente",
        color: "text-rose-400",
        badge: "Vulnérabilités Opérationnelles",
        desc: "Vos processus reposent encore trop sur des ressaisies manuelles et des outils fragmentés. Les risques de pertes de données, de délais excessifs et d'erreurs logistiques/financières sont réels.",
        recommendation: "Un cadrage initial et un audit de vos flux permettront de libérer jusqu'à 30% de temps pour vos équipes clés."
      };
    } else if (totalScore <= 7) {
      return {
        level: "Maturité Intermédiaire — Potentiel de Croissance",
        color: "text-amber-400",
        badge: "En Transition Digitale",
        desc: "Votre organisation fonctionne mais souffre de silos entre services. Vos outils actuels freinent l'accélération de votre développement et limitent la visibilité de la direction.",
        recommendation: "L'intégration d'un ERP moderne (comme Odoo) ou une mission d'AMOA permettrait d'unifier vos flux et de fiabiliser votre pilotage."
      };
    } else {
      return {
        level: "Maturité Avancée — Optimisation & Scalabilité",
        color: "text-emerald-400",
        badge: "Structure Performante",
        desc: "Vous disposez d'un socle solide. Vos enjeux actuels concernent l'automatisation avancée (APIs, RPA), l'anticipation de la facturation électronique et la BI prédictive.",
        recommendation: "Nous pouvons vous accompagner sur la personnalisation fine et l'extension stratégique de votre écosystème."
      };
    }
  };

  const diagnostic = getDiagnostic();
  return (
    <section id="diagnostic" className="py-24 bg-slate-950 border-t border-slate-850 relative overflow-hidden">
      {/* Background subtle radial glow: lightweight on mobile, rich on desktop */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-sky-500/10 blur-[140px] rounded-full pointer-events-none transform-gpu" />
      <div className="sm:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-40 bg-sky-500/10 blur-2xl rounded-full pointer-events-none transform-gpu" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400 mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>Auto-Évaluation Gratuite • 30 Secondes</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Diagnostic Express : Évaluez votre Maturité SI & Process
          </h2>

          <p className="text-base text-slate-400 max-w-2xl mx-auto">
            Répondez à 3 questions rapides pour identifier les opportunités d'optimisation de vos opérations et de vos outils de gestion.
          </p>
        </div>

        {/* Diagnostic Card Container */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800/90 hover:border-sky-500/30 transition-colors shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          {/* Top Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          
          {!isCompleted ? (
            <div>
              {/* Step indicator */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold uppercase text-cyan-400">
                    Étape {currentStep + 1} sur {AUDIT_QUESTIONS.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    {AUDIT_QUESTIONS.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-10 h-1.5 rounded-full transition-all duration-300 ${
                          idx <= currentStep ? 'bg-cyan-400 shadow-sm shadow-cyan-400/50' : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Current Question */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
                {AUDIT_QUESTIONS[currentStep].question}
              </h3>

              {/* Options */}
              <div className="space-y-3.5">
                {AUDIT_QUESTIONS[currentStep].options.map((option, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(option.points)}
                    className="w-full text-left p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-cyan-400/60 hover:bg-slate-900/90 transition-all flex items-start gap-4 group cursor-pointer shadow-sm active:scale-[0.99]"
                  >
                    <div className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:border-cyan-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-300 shrink-0 mt-0.5 transition-all shadow-inner">
                      {String.fromCharCode(65 + oIdx)}
                    </div>
                    <span className="text-sm sm:text-base text-slate-200 group-hover:text-white transition-colors pt-0.5 leading-relaxed">
                      {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-4 space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-xs font-mono font-semibold text-slate-400">
                <span>Score Calculé :</span>
                <span className="text-white font-bold">{totalScore} / 9</span>
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase font-mono font-bold tracking-widest text-slate-500 block">
                  Diagnostic CLIXA :
                </span>
                <h3 className={`text-2xl sm:text-3xl font-extrabold ${diagnostic.color}`}>
                  {diagnostic.level}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                {diagnostic.desc}
              </p>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 max-w-xl mx-auto text-left flex items-start gap-3.5">
                <Sparkles className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase text-sky-400 block mb-1">Recommandation Stratégique :</span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-snug">{diagnostic.recommendation}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onOpenConsultation(`Débrief Diagnostic Maturité (Score: ${totalScore}/9)`)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-xl shadow-sky-500/20 transition-all cursor-pointer"
                >
                  <span>Débriefer ce résultat avec un consultant</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-950 hover:bg-slate-850 border border-slate-800 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Recommencer le test</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
