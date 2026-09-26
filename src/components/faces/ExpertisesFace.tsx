import { useScrollReveal } from '../../hooks/useScrollReveal';
import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight, Check } from 'lucide-react';

interface ExpertisesFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

export const ExpertisesFace: React.FC<ExpertisesFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [selectedHub, setSelectedHub] = useState<string>('Morocco');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [appliedFilters, setAppliedFilters] = useState({
    domain: 'All',
    tech: 'All',
    hub: 'All',
  });

  useScrollReveal();

  const expertises = [
    {
      id: 'odoo-erp',
      title: "Intégration & Paramétrage Métier Odoo Enterprise v17 & v18",
      category: "ERP & Architecture Métier",
      date: "18 Sep 2026",
      hub: "Morocco",
      tech: "Odoo Enterprise",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      description: "Paramétrage expert des modules Ventes, Achats, Stocks multi-dépôts, Comptabilité marocaine/française et GPAO industrielle.",
      deliverables: ["Modélisation BPMN des flux", "Reprise et nettoyage des données", "Formation utilisateurs & UAT"]
    },
    {
      id: 'amoa-gouvernance',
      title: "AMOA Stratégique & Cadrage Big 4 pour Comités de Direction",
      category: "Gouvernance & Conduite SI",
      date: "04 Sep 2026",
      hub: "France",
      tech: "Gouvernance & Audit",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      description: "Assistance à maîtrise d'ouvrage indépendante : rédaction de cahiers des charges, sélection d'éditeurs et pilotage des prestataires au forfait.",
      deliverables: ["Cahier des charges fonctionnel", "Grille de scoring éditeurs", "Tableau de bord de pilotage"]
    },
    {
      id: 'dgi-fiscalite',
      title: "Facturation Électronique DGI 2026 & Conformité Fiscale",
      category: "Fiscalité & Réglementation",
      date: "20 Aug 2026",
      hub: "Morocco",
      tech: "Facturation DGI & EDI",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
      description: "Mise en conformité intégrale avec la réforme fiscale marocaine (DGI) et européenne (Factur-X/Chorus Pro) sans rupture d'exploitation.",
      deliverables: ["Audit des flux de facturation", "Connecteur EDI certifié", "Attestation de conformité"]
    },
    {
      id: 'finance-daf',
      title: "Pilotage Financier, Trésorerie & Tableaux de Bord DAF",
      category: "Finance d'Entreprise",
      date: "15 Jul 2026",
      hub: "France",
      tech: "Power BI & Analytics",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      description: "Automatisation du reporting financier, réconciliation bancaire instantanée, calcul automatique du BFR et consolidation multi-filiales.",
      deliverables: ["Dashboards Power BI / Metabase", "Modèles de cash-flow prévisionnel", "Accélération clôtures comptables"]
    },
    {
      id: 'digital-portails',
      title: "Portails Extranets Clients & Automatisation d'API",
      category: "Digitalisation & Web Apps",
      date: "10 Jun 2026",
      hub: "Morocco",
      tech: "React / Node / API",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
      description: "Conception de portails B2B sécurisés connectés en temps réel au système central, espaces clients personnalisés et formulaires dématérialisés.",
      deliverables: ["Extranet B2B sur-mesure", "API Gateway sécurisée", "Expérience utilisateur (UX/UI) executive"]
    }
  ];

  const handleApply = () => {
    setAppliedFilters({
      domain: selectedDomain,
      tech: selectedTech,
      hub: selectedHub,
    });
    setOpenDropdown(null);
  };

  const handleReset = () => {
    setSelectedDomain('All');
    setSelectedTech('All');
    setSelectedHub('All');
    setAppliedFilters({
      domain: 'All',
      tech: 'All',
      hub: 'All',
    });
    setOpenDropdown(null);
  };

  const filtered = expertises.filter((exp) => {
    if (appliedFilters.domain !== 'All' && exp.category !== appliedFilters.domain) return false;
    if (appliedFilters.tech !== 'All' && exp.tech !== appliedFilters.tech) return false;
    if (appliedFilters.hub !== 'All' && exp.hub !== appliedFilters.hub) return false;
    return true;
  });

  return (
    <div className="w-full bg-[#FAF7F2] text-slate-900 font-sans min-h-screen pt-32 sm:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* 1. GIANT EDITORIAL TITLE (SQLI Standard: "Expertise") */}
        <div className="mb-10 sm:mb-14">
          <h1 className="text-6xl sm:text-7xl lg:text-[84px] font-bold text-[#0a0e1a] tracking-tight leading-none font-heading">
            Expertise
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal mt-4 max-w-2xl leading-relaxed">
            Architecture SI, intégration ERP Odoo, gouvernance AMOA et conformité fiscale pour bâtir des organisations résilientes et hautement rentables.
          </p>
        </div>

        {/* 2. SQLI SIGNATURE FILTER BAR */}
        <div className="mb-14 pb-8 border-b border-[#e2dcd2]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium">
            
            {/* Filter: Domaines ⌵ */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'domain' ? null : 'domain')}
                className="flex items-center gap-1.5 py-1 text-slate-800 hover:text-black transition-colors cursor-pointer"
              >
                <span>Domaines</span>
                {selectedDomain !== 'All' && <span className="text-xs text-blue-600 font-bold">({selectedDomain})</span>}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'domain' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'domain' && (
                <div className="absolute left-0 mt-2 w-60 bg-white border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {['All', 'ERP & Architecture Métier', 'Gouvernance & Conduite SI', 'Fiscalité & Réglementation', 'Finance d\'Entreprise', 'Digitalisation & Web Apps'].map((dom) => (
                    <button
                      key={dom}
                      onClick={() => {
                        setSelectedDomain(dom);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                    >
                      <span className={selectedDomain === dom ? 'font-bold text-blue-600' : 'text-slate-700'}>{dom}</span>
                      {selectedDomain === dom && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter: Technologies ⌵ */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'tech' ? null : 'tech')}
                className="flex items-center gap-1.5 py-1 text-slate-800 hover:text-black transition-colors cursor-pointer"
              >
                <span>Technologies</span>
                {selectedTech !== 'All' && <span className="text-xs text-blue-600 font-bold">({selectedTech})</span>}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'tech' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'tech' && (
                <div className="absolute left-0 mt-2 w-52 bg-white border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {['All', 'Odoo Enterprise', 'Gouvernance & Audit', 'Facturation DGI & EDI', 'Power BI & Analytics', 'React / Node / API'].map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setSelectedTech(t);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                    >
                      <span className={selectedTech === t ? 'font-bold text-blue-600' : 'text-slate-700'}>{t}</span>
                      {selectedTech === t && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter: Hubs ⌵ */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'hub' ? null : 'hub')}
                className="flex items-center gap-1.5 py-1 text-slate-800 hover:text-black transition-colors cursor-pointer"
              >
                <span>Hubs</span>
                <span className="text-xs font-bold text-slate-900">({selectedHub === 'All' ? 'All' : '1'})</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'hub' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'hub' && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {['All', 'Morocco', 'France'].map((h) => (
                    <button
                      key={h}
                      onClick={() => {
                        setSelectedHub(h);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                    >
                      <span className={selectedHub === h ? 'font-bold text-blue-600' : 'text-slate-700'}>
                        {h === 'Morocco' ? '🇲🇦 Casablanca CFC' : h === 'France' ? '🇫🇷 Paris' : 'All Hubs'}
                      </span>
                      {selectedHub === h && <Check className="w-3.5 h-3.5 text-blue-600" />}
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

        {/* 3. EDITORIAL EXPERTISE GRID (SQLI Standard: 2-Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-20">
          {filtered.map((exp) => (
            <article 
              key={exp.id}
              className="group cursor-pointer flex flex-col"
              onClick={() => onOpenConsultation(`Consultation Expertise : ${exp.title}`)}
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] sm:aspect-[16/11] bg-slate-200 overflow-hidden mb-5">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a0e1a] tracking-tight leading-snug group-hover:text-blue-600 transition-colors font-heading mb-2">
                {exp.title}
              </h2>

              {/* Category */}
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                {exp.category} • <span className="text-blue-600">{exp.tech}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 font-sans leading-relaxed mb-4">
                {exp.description}
              </p>

              {/* Deliverables tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {exp.deliverables.map((d, i) => (
                  <span key={i} className="text-[11px] bg-white border border-slate-200 px-2.5 py-1 text-slate-700">
                    {d}
                  </span>
                ))}
              </div>

              {/* Date */}
              <div className="mt-auto text-xs text-slate-400 font-sans pt-2 border-t border-slate-200">
                {exp.date} · {exp.hub === 'Morocco' ? 'Casablanca 🇲🇦' : 'Paris 🇫🇷'}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="border border-[#e2dcd2] bg-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Besoin d'un cadrage technique indépendant sur votre architecture ?
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Nos consultants seniors évaluent vos flux métier et valident l'adéquation fonctionnelle de vos outils.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation("Diagnostic Architecture SI")}
            className="bg-[#1f24e9] hover:bg-[#151ad0] text-white px-8 py-3.5 rounded-none font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <span>Demander un Cadrage Technique</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
