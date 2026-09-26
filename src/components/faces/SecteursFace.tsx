import { useScrollReveal } from '../../hooks/useScrollReveal';
import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight, Check } from 'lucide-react';

interface SecteursFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

export const SecteursFace: React.FC<SecteursFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');
  const [selectedReg, setSelectedReg] = useState<string>('All');
  const [selectedHub, setSelectedHub] = useState<string>('Morocco');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const [appliedFilters, setAppliedFilters] = useState({
    industry: 'All',
    reg: 'All',
    hub: 'All',
  });

  useScrollReveal();

  const sectors = [
    {
      id: 'btp-construction',
      title: "BTP, Immobilier & Génie Civil : Pilotage de Chantiers & Sous-traitance",
      industry: "BTP & Immobilier",
      reg: "Attachements & Loi DGI",
      hub: "Morocco",
      date: "12 Oct 2026",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f8?auto=format&fit=crop&w=1200&q=80",
      description: "Suivi budgétaire par affaire et par jalon de chantier, gestion des situations de travaux, retenues de garantie et traçabilité des engins.",
      highlights: ["Comptabilité analytique par chantier", "Gestion des situations de travaux & UAT", "Pointage main d'œuvre mobile"]
    },
    {
      id: 'industrie-fabrication',
      title: "Industrie Manufacturière, Agro-Alimentaire & GPAO de Précision",
      industry: "Industrie & Usinage",
      reg: "Traçabilité HACCP / ISO",
      hub: "Morocco",
      date: "25 Sep 2026",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      description: "Gestion des ordres de fabrication (OF), nomenclatures multiniveaux (BOM), traçabilité des lots et numéros de série avec terminaux codes-barres.",
      highlights: ["Planification PDP / PIC / CBN", "Calcul précis des coûts de revient", "Maintenance préventive (GMAO)"]
    },
    {
      id: 'negoce-distribution',
      title: "Distribution, Négoce B2B & Supply Chain Multi-Entrepôts",
      industry: "Distribution & Négoce",
      reg: "Factur-X & Déclarations DGI",
      hub: "France",
      date: "14 Aug 2026",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      description: "Optimisation des réapprovisionnements automatiques, gestion multi-devises, grilles tarifaires complexes et logistique expédition.",
      highlights: ["Règles de réassort automatique", "Cross-docking & logistique codes-barres", "Gestion des remises arrières fournisseurs"]
    },
    {
      id: 'sante-cliniques',
      title: "Santé, Cliniques Privées & Équipements Médicaux",
      industry: "Santé & Médical",
      reg: "CNDP Données Sensibles",
      hub: "Morocco",
      date: "30 Jun 2026",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
      description: "Sécurisation du dossier patient informatisé, facturation des actes selon les nomenclatures conventionnées et gestion de la pharmacie centrale.",
      highlights: ["Facturation des conventions AMO / CNOPS", "Gestion de la pharmacie hospitalière", "Conformité CNDP données médicales"]
    },
    {
      id: 'services-bpo',
      title: "Services Professionnels, Cabinets & Centres BPO / IT",
      industry: "Services & BPO",
      reg: "Facturation au Temps Passé",
      hub: "France",
      date: "18 May 2026",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
      description: "Feuilles de temps collaboratives, facturation aux régies ou forfaits, gestion des notes de frais avec reconnaissance OCR et taux de staffing.",
      highlights: ["Feuilles de temps & facturation automatique", "Suivi de la rentabilité des missions", "Gestion des notes de frais OCR"]
    }
  ];

  const handleApply = () => {
    setAppliedFilters({
      industry: selectedIndustry,
      reg: selectedReg,
      hub: selectedHub,
    });
    setOpenDropdown(null);
  };

  const handleReset = () => {
    setSelectedIndustry('All');
    setSelectedReg('All');
    setSelectedHub('All');
    setAppliedFilters({
      industry: 'All',
      reg: 'All',
      hub: 'All',
    });
    setOpenDropdown(null);
  };

  const filtered = sectors.filter((s) => {
    if (appliedFilters.industry !== 'All' && s.industry !== appliedFilters.industry) return false;
    if (appliedFilters.reg !== 'All' && s.reg !== appliedFilters.reg) return false;
    if (appliedFilters.hub !== 'All' && s.hub !== appliedFilters.hub) return false;
    return true;
  });

  return (
    <div className="w-full bg-[#FAF7F2] text-slate-900 font-sans min-h-screen pt-32 sm:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* 1. GIANT EDITORIAL TITLE (SQLI Standard: "Secteurs") */}
        <div className="mb-10 sm:mb-14">
          <h1 className="text-6xl sm:text-7xl lg:text-[84px] font-bold text-[#0a0e1a] tracking-tight leading-none font-heading">
            Secteurs
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal mt-4 max-w-2xl leading-relaxed">
            Une expertise sectorielle approfondie des contraintes réglementaires et processus opérationnels propres à chaque industrie.
          </p>
        </div>

        {/* 2. SQLI SIGNATURE FILTER BAR */}
        <div className="mb-14 pb-8 border-b border-[#e2dcd2]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium">
            
            {/* Filter: Industries ⌵ */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'industry' ? null : 'industry')}
                className="flex items-center gap-1.5 py-1 text-slate-800 hover:text-black transition-colors cursor-pointer"
              >
                <span>Industries</span>
                {selectedIndustry !== 'All' && <span className="text-xs text-blue-600 font-bold">({selectedIndustry})</span>}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'industry' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'industry' && (
                <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {['All', 'BTP & Immobilier', 'Industrie & Usinage', 'Distribution & Négoce', 'Santé & Médical', 'Services & BPO'].map((ind) => (
                    <button
                      key={ind}
                      onClick={() => {
                        setSelectedIndustry(ind);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                    >
                      <span className={selectedIndustry === ind ? 'font-bold text-blue-600' : 'text-slate-700'}>{ind}</span>
                      {selectedIndustry === ind && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter: Réglementations ⌵ */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'reg' ? null : 'reg')}
                className="flex items-center gap-1.5 py-1 text-slate-800 hover:text-black transition-colors cursor-pointer"
              >
                <span>Réglementations</span>
                {selectedReg !== 'All' && <span className="text-xs text-blue-600 font-bold">({selectedReg})</span>}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'reg' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'reg' && (
                <div className="absolute left-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {['All', 'Attachements & Loi DGI', 'Traçabilité HACCP / ISO', 'Factur-X & Déclarations DGI', 'CNDP Données Sensibles', 'Facturation au Temps Passé'].map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setSelectedReg(r);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                    >
                      <span className={selectedReg === r ? 'font-bold text-blue-600' : 'text-slate-700'}>{r}</span>
                      {selectedReg === r && <Check className="w-3.5 h-3.5 text-blue-600" />}
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
                        {h === 'Morocco' ? '🇲🇦 Casablanca CFC' : h === 'France' ? '🇫🇷 Toulouse' : 'All Hubs'}
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

        {/* 3. EDITORIAL SECTORS GRID (SQLI Standard: 2-Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-20">
          {filtered.map((s) => (
            <article 
              key={s.id}
              className="group cursor-pointer flex flex-col"
              onClick={() => onOpenConsultation(`Consultation Secteur : ${s.industry}`)}
            >
              {/* Image */}
              <div className="w-full aspect-[4/3] sm:aspect-[16/11] bg-slate-200 overflow-hidden mb-5">
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a0e1a] tracking-tight leading-snug group-hover:text-blue-600 transition-colors font-heading mb-2">
                {s.title}
              </h2>

              {/* Category */}
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                {s.industry} • <span className="text-blue-600">{s.reg}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-600 font-sans leading-relaxed mb-4">
                {s.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap gap-2 mb-4">
                {s.highlights.map((h, i) => (
                  <span key={i} className="text-[11px] bg-white border border-slate-200 px-2.5 py-1 text-slate-700">
                    {h}
                  </span>
                ))}
              </div>

              {/* Date */}
              <div className="mt-auto text-xs text-slate-400 font-sans pt-2 border-t border-slate-200">
                {s.date} · {s.hub === 'Morocco' ? 'Casablanca 🇲🇦' : 'Toulouse 🇫🇷'}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="border border-[#e2dcd2] bg-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Vous appartenez à un secteur aux spécificités réglementaires fortes ?
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Consultez notre référent sectoriel pour examiner vos contraintes de gestion et d'interfaçage.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation("Diagnostic Spécifique Métier")}
            className="bg-[#1f24e9] hover:bg-[#151ad0] text-white px-8 py-3.5 rounded-none font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2"
          >
            <span>Échanger avec un Référent Sectoriel</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
