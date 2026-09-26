import { useScrollReveal } from '../../hooks/useScrollReveal';
import React, { useState } from 'react';
import { CASE_STUDIES } from '../../data/content';
import { ChevronDown, ArrowUpRight, Check } from 'lucide-react';

interface CaseStudiesFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

export const CaseStudiesFace: React.FC<CaseStudiesFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('Morocco');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [appliedFilters, setAppliedFilters] = useState({
    sector: 'All',
    tech: 'All',
    country: 'All',
  });

  useScrollReveal();

  const caseStudiesExtended = [
    {
      id: 'btp-industrie',
      title: "Refonte ERP Odoo 18 & Supply Chain : 8 sites industriels synchronisés sans rupture",
      client: "Groupe Industriel & BTP Leaders",
      sector: "Industrie & BTP",
      tech: "Odoo 18 Enterprise",
      country: "Morocco",
      date: "14 Oct 2026",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1200&q=80",
      impact: "-32% sur les délais logistiques, traçabilité des lots et valorisation en temps réel du BFR.",
      quote: "L'approche méthodologique et la rigueur de cadrage de Clixa ont permis de basculer l'ensemble de nos usines en 6 mois."
    },
    {
      id: 'dgi-fiscalite',
      title: "Conformité Fiscale DGI & Factur-X : 140 000 factures automatisées et 0 redressement",
      client: "Leader Distribution & Négoce Casablanca",
      sector: "Distribution & Négoce",
      tech: "Facturation DGI & EDI",
      country: "Morocco",
      date: "28 Aug 2026",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
      impact: "100% de conformité fiscale, suppression des rejets DGI, clôture mensuelle ramenée à J+3.",
      quote: "Une sécurisation juridique et fiscale irréprochable face aux nouvelles exigences réglementaires marocaines."
    },
    {
      id: 'finance-amoa',
      title: "Gouvernance AMOA & Trésorerie Groupe : Clôture comptable ramenée de J+25 à J+4",
      client: "Holding Financière & Services",
      sector: "Finance & BPO",
      tech: "AMOA Big 4 & BI",
      country: "France",
      date: "12 Jun 2026",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      impact: "Visibilité en temps réel sur la trésorerie consolidée de 14 filiales et réduction drastique des écarts.",
      quote: "L'assistance à maîtrise d'ouvrage Clixa a évité les surcoûts classiques des SSII avec un engagement ferme au forfait."
    },
    {
      id: 'sante-clinique',
      title: "Standardisation Métier Santé & Cliniques : Dossier patient et facturation unifiés",
      client: "Réseau de Santé Privé",
      sector: "Santé & Médical",
      tech: "ERP Spécifique & API",
      country: "Morocco",
      date: "05 May 2026",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
      impact: "Zéro perte de facturation d'actes, conformité aux données médicales sensibles CNDP.",
      quote: "Nos équipes soignantes et administratives collaborent désormais sur une plateforme fluide et sécurisée."
    }
  ];

  const handleApply = () => {
    setAppliedFilters({
      sector: selectedSector,
      tech: selectedTech,
      country: selectedCountry,
    });
    setOpenDropdown(null);
  };

  const handleReset = () => {
    setSelectedSector('All');
    setSelectedTech('All');
    setSelectedCountry('All');
    setAppliedFilters({
      sector: 'All',
      tech: 'All',
      country: 'All',
    });
    setOpenDropdown(null);
  };

  const filteredCases = caseStudiesExtended.filter((c) => {
    if (appliedFilters.sector !== 'All' && c.sector !== appliedFilters.sector) return false;
    if (appliedFilters.tech !== 'All' && c.tech !== appliedFilters.tech) return false;
    if (appliedFilters.country !== 'All' && c.country !== appliedFilters.country) return false;
    return true;
  });

  return (
    <div className="w-full bg-[#FAF7F2] text-slate-900 font-sans min-h-screen pt-32 sm:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* 1. GIANT EDITORIAL TITLE (SQLI Standard: "Case Studies") */}
        <div className="mb-10 sm:mb-14">
          <h1 className="text-6xl sm:text-7xl lg:text-[84px] font-bold text-[#0a0e1a] tracking-tight leading-none font-heading">
            Case Studies
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal mt-4 max-w-2xl leading-relaxed">
            Dossiers d'impact exécutif et transformations numériques réussies pour les leaders industriels et financiers au Maroc et en Europe.
          </p>
        </div>

        {/* 2. SQLI SIGNATURE FILTER BAR */}
        <div className="mb-14 pb-8 border-b border-[#e2dcd2]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium">
            
            {/* Filter: Secteurs ⌵ */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'sector' ? null : 'sector')}
                className="flex items-center gap-1.5 py-1 text-slate-800 hover:text-black transition-colors cursor-pointer"
              >
                <span>Secteurs</span>
                {selectedSector !== 'All' && <span className="text-xs text-blue-600 font-bold">({selectedSector})</span>}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'sector' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'sector' && (
                <div className="absolute left-0 mt-2 w-52 bg-white border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {['All', 'Industrie & BTP', 'Distribution & Négoce', 'Finance & BPO', 'Santé & Médical'].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => {
                        setSelectedSector(sec);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                    >
                      <span className={selectedSector === sec ? 'font-bold text-blue-600' : 'text-slate-700'}>{sec}</span>
                      {selectedSector === sec && <Check className="w-3.5 h-3.5 text-blue-600" />}
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
                  {['All', 'Odoo 18 Enterprise', 'Facturation DGI & EDI', 'AMOA Big 4 & BI', 'ERP Spécifique & API'].map((t) => (
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

            {/* Filter: Countries ⌵ */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'country' ? null : 'country')}
                className="flex items-center gap-1.5 py-1 text-slate-800 hover:text-black transition-colors cursor-pointer"
              >
                <span>Countries</span>
                <span className="text-xs font-bold text-slate-900">({selectedCountry === 'All' ? 'All' : '1'})</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'country' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'country' && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {['All', 'Morocco', 'France'].map((ctry) => (
                    <button
                      key={ctry}
                      onClick={() => {
                        setSelectedCountry(ctry);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                    >
                      <span className={selectedCountry === ctry ? 'font-bold text-blue-600' : 'text-slate-700'}>
                        {ctry === 'Morocco' ? '🇲🇦 Morocco' : ctry === 'France' ? '🇫🇷 France' : 'All Countries'}
                      </span>
                      {selectedCountry === ctry && <Check className="w-3.5 h-3.5 text-blue-600" />}
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

        {/* 3. EDITORIAL CASE STUDY GRID (SQLI Standard: 2-Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-20">
          {filteredCases.map((cs) => (
            <article 
              key={cs.id}
              className="group cursor-pointer flex flex-col"
              onClick={() => onOpenConsultation(`Consultation Cas Client : ${cs.client}`)}
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] sm:aspect-[16/11] bg-slate-200 overflow-hidden mb-5">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a0e1a] tracking-tight leading-snug group-hover:text-blue-600 transition-colors font-heading mb-2">
                {cs.title}
              </h2>

              {/* Sector & Tech tags */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                <span>{cs.sector}</span>
                <span>•</span>
                <span className="text-blue-600">{cs.tech}</span>
              </div>

              {/* Impact statement */}
              <p className="text-sm text-slate-700 font-sans leading-relaxed mb-4">
                <strong className="text-slate-900 font-semibold">Impact Mesuré :</strong> {cs.impact}
              </p>

              {/* Date */}
              <div className="mt-auto text-xs text-slate-400 font-sans pt-2 border-t border-slate-200">
                {cs.date} · {cs.country === 'Morocco' ? 'Casablanca 🇲🇦' : 'Toulouse 🇫🇷'}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="border border-[#e2dcd2] bg-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Vous avez un projet de transformation ERP ou d'alignement fiscal ?
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Bénéficiez d'une séance de cadrage confidentielle de 45 minutes avec un associé senior Clixa.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation("Cadrage Projet Nouveau Client")}
            className="bg-[#1f24e9] hover:bg-[#151ad0] text-white px-8 py-3.5 rounded-none font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <span>Planifier un Débriefing Exécutif</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
