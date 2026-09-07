import React, { useState } from 'react';
import { BookOpen, Download, MessageCircle, Mail, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, FileText } from 'lucide-react';
import { BRAND } from '../data/content';

interface LeadMagnetProps {
  onOpenConsultation: (topic?: string) => void;
}

export const LeadMagnet: React.FC<LeadMagnetProps> = ({ onOpenConsultation }) => {
  const [emailInput, setEmailInput] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setDownloaded(true);
    // Open email client or notify
    const subject = encodeURIComponent("Demande du Livre Blanc CLIXA 2026");
    const body = encodeURIComponent(`Bonjour CLIXA,\n\nJe souhaite recevoir le Livre Blanc Exécutif 2026 pour l'adresse : ${emailInput}.\n\nCordialement.`);
    window.location.href = `mailto:${BRAND.contactEmail}?subject=${subject}&body=${body}`;
  };

  const whitepaperWhatsappLink = `https://wa.me/212661344054?text=${encodeURIComponent(
    "Bonjour CLIXA Consulting, je souhaite recevoir le Livre Blanc Exécutif 2026 (Guide Dirigeant Odoo & Facturation Électronique) sur WhatsApp."
  )}`;

  return (
    <section id="guide-dirigeant" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-850 relative overflow-hidden scroll-mt-24">
      {/* Background glow */}
      <div className="hidden sm:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[350px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none transform-gpu" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 border border-sky-500/30 shadow-2xl relative overflow-hidden">
          {/* Top glowing bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Presentation & Value */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-semibold text-sky-400">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Ressource Exécutive Gratuite • Édition 2026</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Livre Blanc Dirigeant : <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                  Réussir sa Transition ERP & Facturation Électronique
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Ce guide stratégique condense l'expérience terrain de nos consultants pour aider les directeurs généraux et financiers à anticiper les obligations 2026 et piloter leur transformation sans dérapage budgétaire.
              </p>

              {/* What's inside bullets */}
              <div className="space-y-2.5 pt-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Au sommaire de ce guide exclusif :
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>Checklist conformité DGI (Maroc) & DGFIP (France)</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>Les 5 erreurs critiques qui font échouer les ERP</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>Matrice de choix des modules Odoo par secteur</span>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>Planning type de déploiement en 90 jours</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Download Card */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-slate-800 shadow-xl flex flex-col justify-between gap-6 relative">
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mx-auto mb-3">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Recevoir le Livre Blanc (PDF)
                </h3>
                <p className="text-xs text-slate-400">
                  Document confidentiel téléchargeable sans engagement.
                </p>
              </div>

              {/* Instant WhatsApp Option */}
              <div className="space-y-3">
                <a
                  href={whitepaperWhatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/60 shadow-md active:scale-[0.98] transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Recevoir directement sur WhatsApp</span>
                </a>

                <div className="flex items-center justify-center gap-3 text-slate-500 text-xs">
                  <div className="h-[1px] bg-slate-800 flex-1" />
                  <span className="font-mono text-[10px] uppercase">ou par email</span>
                  <div className="h-[1px] bg-slate-800 flex-1" />
                </div>

                {/* Email Form */}
                {!downloaded ? (
                  <form onSubmit={handleEmailSubmit} className="space-y-2">
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Votre email professionnel..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-md shadow-sky-500/20 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Envoyer le guide à mon adresse</span>
                    </button>
                  </form>
                ) : (
                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-700/50 text-center text-xs text-emerald-300">
                    Demande transmise avec succès ! Un consultant CLIXA vous transmet le document.
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protection stricte des données (Conformité CNDP / RGPD)</span>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
