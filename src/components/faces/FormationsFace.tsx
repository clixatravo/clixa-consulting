import { useScrollReveal } from '../../hooks/useScrollReveal';
import React, { useState } from 'react';
import { FORMATIONS_CATALOGUE, TARIFS_INSTITUTE, FormationProgramme } from '../../data/formations';
import { ChevronDown, ArrowUpRight, Check, Bot, GraduationCap, Clock, Award, ShieldCheck } from 'lucide-react';

interface FormationsFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

export const FormationsFace: React.FC<FormationsFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
  const [selectedSpec, setSelectedSpec] = useState<string>('All');
  const [selectedCertification, setSelectedCertification] = useState<string>('All');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [appliedFilters, setAppliedFilters] = useState({
    spec: 'All',
    cert: 'All',
  });

  useScrollReveal();

  const handleApply = () => {
    setAppliedFilters({
      spec: selectedSpec,
      cert: selectedCertification,
    });
    setOpenDropdown(null);
  };

  const handleReset = () => {
    setSelectedSpec('All');
    setSelectedCertification('All');
    setAppliedFilters({
      spec: 'All',
      cert: 'All',
    });
    setOpenDropdown(null);
  };

  const openChatForCourse = (programmeTitle: string) => {
    window.dispatchEvent(
      new CustomEvent('clixa:open-chat', {
        detail: { prompt: `Je souhaite des informations sur la formation : ${programmeTitle}` },
      })
    );
  };

  const filtered = FORMATIONS_CATALOGUE.filter((p) => {
    if (appliedFilters.spec !== 'All' && p.specialisation !== appliedFilters.spec) return false;
    if (appliedFilters.cert === 'PMP' && !p.certification) return false;
    if (appliedFilters.cert === 'Executif' && p.certification) return false;
    return true;
  });

  return (
    <div className="w-full bg-[#FAF7F2] text-slate-900 font-sans min-h-screen pt-32 sm:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* 1. GIANT EDITORIAL TITLE (SQLI Standard: "Formations") */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-blue-600 mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>CLIXA Institute • Executive Education (www.clixa.africa)</span>
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-[84px] font-bold text-[#0a0e1a] tracking-tight leading-none font-heading">
            Formations
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal mt-4 max-w-3xl leading-relaxed">
            12 parcours certifiants et programmes exécutifs conçus pour directeurs, managers et cadres dirigeants. 100% en ligne, en classes virtuelles en direct animées par des praticiens seniors.
          </p>
        </div>

        {/* 2. SQLI SIGNATURE FILTER BAR */}
        <div className="mb-14 pb-8 border-b border-[#e2dcd2]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium">
            
            {/* Filter: Spécialisations ⌵ */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'spec' ? null : 'spec')}
                className="flex items-center gap-1.5 py-1 text-slate-800 hover:text-black transition-colors cursor-pointer"
              >
                <span>Spécialisations</span>
                {selectedSpec !== 'All' && <span className="text-xs text-blue-600 font-bold">({selectedSpec})</span>}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'spec' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'spec' && (
                <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {[
                    'All',
                    'Finance, Audit & Contrôle de Gestion',
                    'Management de Projets',
                    'Industrie, Production & Maintenance',
                    'Ressources Humaines',
                    'Commercial & Marketing'
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedSpec(s);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                    >
                      <span className={selectedSpec === s ? 'font-bold text-blue-600' : 'text-slate-700'}>{s}</span>
                      {selectedSpec === s && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter: Type de Parcours ⌵ */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'cert' ? null : 'cert')}
                className="flex items-center gap-1.5 py-1 text-slate-800 hover:text-black transition-colors cursor-pointer"
              >
                <span>Type de parcours</span>
                {selectedCertification !== 'All' && <span className="text-xs text-blue-600 font-bold">({selectedCertification})</span>}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'cert' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'cert' && (
                <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {[
                    { id: 'All', label: 'Tous les parcours' },
                    { id: 'Executif', label: 'Parcours Exécutif (32h)' },
                    { id: 'PMP', label: 'Certification PMP® (35h)' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCertification(c.id);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                    >
                      <span className={selectedCertification === c.id ? 'font-bold text-blue-600' : 'text-slate-700'}>{c.label}</span>
                      {selectedCertification === c.id && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Buttons: Apply & Reset */}
            <div className="flex items-center gap-2 sm:ml-auto">
              <button
                onClick={handleApply}
                className="bg-[#1f24e9] hover:bg-[#151ad0] text-white px-7 py-2.5 rounded-none font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Apply
              </button>

              <button
                onClick={handleReset}
                className="bg-[#0b101d] hover:bg-black text-white px-7 py-2.5 rounded-none font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>

          </div>
        </div>

        {/* 3. EDITORIAL FORMATIONS GRID (SQLI 2-Columns Standard) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-20">
          {filtered.map((programme) => (
            <article 
              key={programme.id}
              className="group flex flex-col bg-white border border-[#e2dcd2] p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Photo Banner */}
              <div className="w-full aspect-[16/10] bg-slate-200 overflow-hidden mb-5">
                <img
                  src={programme.image}
                  alt={programme.titre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Specialisation Badge */}
              <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <span>{programme.specialisation}</span>
                <span className="font-mono text-blue-600 font-bold bg-blue-50 px-2 py-0.5">
                  {programme.dureeHeures} Heures
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a0e1a] tracking-tight leading-snug group-hover:text-blue-600 transition-colors font-heading mb-2">
                {programme.titre}
              </h2>

              {/* Accroche */}
              <div className="text-xs font-medium text-slate-500 mb-3 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                <span>{programme.accroche}</span>
              </div>

              {/* Positionnement */}
              <p className="text-sm text-slate-600 font-sans leading-relaxed mb-4">
                {programme.positionnement}
              </p>

              {/* Competencies bullets */}
              <div className="space-y-1.5 mb-6 text-xs text-slate-700">
                <span className="font-bold text-slate-900 block uppercase tracking-wider text-[10px]">
                  Compétences Clés Développées :
                </span>
                {programme.competences.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>

              {/* Pricing & Action Suite */}
              <div className="mt-auto pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Tarif Référence Comptant</div>
                  <div className="text-xl font-black text-slate-900 font-heading">
                    {programme.prixComptant} {programme.devise}
                    <span className="text-xs font-normal text-slate-500 ml-1.5">
                      (ou 3 × 150 {programme.devise})
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Ask AI Assistant */}
                  <button
                    onClick={() => openChatForCourse(programme.titre)}
                    className="p-2.5 bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    title="Interroger l'Assistant IA sur ce programme"
                  >
                    <Bot className="w-4 h-4 text-sky-600" />
                    <span className="hidden sm:inline">Détails IA</span>
                  </button>

                  {/* Visit Official Page */}
                  <a
                    href={`https://www.clixa.africa/formations/${programme.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1f24e9] hover:bg-[#151ad0] text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>S'inscrire</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </article>
          ))}
        </div>

        {/* 4. TARIFS & CONDITIONS OFFICIELLES (CLIXA INSTITUTE) */}
        <div className="border border-[#e2dcd2] bg-white p-8 sm:p-12 shadow-sm">
          <div className="mb-6">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-1">
              Conditions Tarifaires & Modalités d'Admission
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              Transparence Tarifaire & Facilités de Paiement
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Chaque formation est accessible au tarif unique de 423 € comptant ou échelonnée en 2 à 3 tranches pour s'adapter à votre trésorerie.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {TARIFS_INSTITUTE.plans.map((plan) => (
              <div key={plan.code} className="p-5 border border-slate-200 bg-[#FAF7F2]">
                <span className="text-xs font-mono font-bold text-blue-600 uppercase block mb-1">
                  Plan {plan.code}
                </span>
                <h4 className="text-lg font-bold text-slate-900 font-heading mb-1">{plan.libelle}</h4>
                <div className="text-2xl font-black text-slate-900 font-heading mb-2">
                  {plan.total} {TARIFS_INSTITUTE.devise}
                </div>
                <div className="text-xs font-mono text-slate-700 font-bold mb-2">
                  Échéances : {plan.echeances}
                </div>
                <p className="text-xs text-slate-500 font-sans">
                  {plan.conditions}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Moyens de paiement acceptés : {TARIFS_INSTITUTE.moyensPaiement.join(' • ')}</span>
            </div>

            <a
              href="https://www.clixa.africa/formations"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-bold hover:underline flex items-center gap-1"
            >
              <span>Accéder au portail direct clixa.africa</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
