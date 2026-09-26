import { useScrollReveal } from '../../hooks/useScrollReveal';
import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight, Check, Sparkles, Building2, TrendingUp, ShieldCheck } from 'lucide-react';

interface CaseStudiesFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

export const CaseStudiesFace: React.FC<CaseStudiesFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedTech, setSelectedTech] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
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
      hubLabel: "Casablanca 🇲🇦",
      date: "14 Oct 2026",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85",
      metricBadge: "-32% Délais Logistiques",
      impact: "Déploiement multi-usines sans arrêt de production, traçabilité des lots et valorisation en temps réel du BFR.",
      quote: "L'approche méthodologique et la rigueur de cadrage de Clixa ont permis de basculer l'ensemble de nos usines en 6 mois."
    },
    {
      id: 'dgi-fiscalite',
      title: "Conformité Fiscale DGI & EDI : 140 000 factures automatisées et 0 redressement",
      client: "Leader Distribution & Négoce Casablanca",
      sector: "Distribution & Négoce",
      tech: "Facturation DGI & EDI",
      country: "Morocco",
      hubLabel: "Casablanca 🇲🇦",
      date: "28 Aug 2026",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85",
      metricBadge: "100% Conformité DGI",
      impact: "Sécurisation juridique et fiscale intégrale, suppression des rejets DGI et clôture mensuelle ramenée à J+3.",
      quote: "Une sécurisation juridique et fiscale irréprochable face aux nouvelles exigences réglementaires marocaines."
    },
    {
      id: 'finance-amoa',
      title: "Gouvernance AMOA & Trésorerie Groupe : Clôture comptable ramenée de J+25 à J+4",
      client: "Holding Financière & Services",
      sector: "Finance & Services",
      tech: "AMOA Big 4 & BI",
      country: "France",
      hubLabel: "Toulouse 🇫🇷",
      date: "12 Jun 2026",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=85",
      metricBadge: "Clôture à J+4 (vs J+25)",
      impact: "Visibilité en temps réel sur la trésorerie consolidée de 14 filiales et pilotage budgétaire unifié au forfait.",
      quote: "L'assistance à maîtrise d'ouvrage Clixa a évité les surcoûts classiques des SSII avec un engagement ferme au forfait."
    },
    {
      id: 'sante-clinique',
      title: "Standardisation Métier Santé : Dossier patient unifié et facturation médicale zéro perte",
      client: "Réseau de Cliniques Privées",
      sector: "Santé & Cliniques",
      tech: "ERP Spécifique & API",
      country: "Morocco",
      hubLabel: "Casablanca 🇲🇦",
      date: "05 May 2026",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1400&q=85",
      metricBadge: "0 Perte d'Actes",
      impact: "Traçabilité intégrale des actes médicaux, conformité CNDP données sensibles et télé-transmission mutuelle.",
      quote: "Nos équipes soignantes et administratives collaborent désormais sur une plateforme fluide et sécurisée."
    },
    {
      id: 'agro-export',
      title: "Traçabilité Agro-Industrielle & Export Europe : Certification & conformité internationale",
      client: "Groupe Agroalimentaire & Export",
      sector: "Agro-Industrie & Export",
      tech: "Odoo GPAO & Traçabilité",
      country: "Morocco",
      hubLabel: "Casablanca 🇲🇦",
      date: "18 Mar 2026",
      image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=1400&q=85",
      metricBadge: "+45% Cadence Export",
      impact: "Suivi des lots de la récolte au conteneur export, conformité sanitaire internationale et gestion multi-devises.",
      quote: "La rigueur de paramétrage des stocks multi-lots et des nomenclatures industrielles a transformé nos marges."
    },
    {
      id: 'retail-omnichannel',
      title: "Digitalisation Omnicanale & Caisse Odoo POS : Réseau de 35 points de vente interconnectés",
      client: "Enseigne Retail & Distribution",
      sector: "Retail & Boutiques",
      tech: "Odoo POS & Extranet",
      country: "France",
      hubLabel: "Toulouse 🇫🇷",
      date: "02 Feb 2026",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85",
      metricBadge: "35 Boutiques Synchronisées",
      impact: "Stocks synchronisés à la seconde entre boutiques physiques et e-commerce, réapprovisionnement automatisé.",
      quote: "Une visibilité immédiate sur les ventes par boutique, les marges par rayon et la fidélité client centralisée."
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
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-blue-200 text-xs font-semibold text-blue-700 shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-heading uppercase tracking-wider text-[11px] font-bold">Résultats & ROI Mesurés</span>
          </div>
          <h1 className="text-6xl sm:text-7xl lg:text-[84px] font-bold text-[#0a0e1a] tracking-tight leading-none font-heading">
            Case Studies
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal mt-4 max-w-3xl leading-relaxed">
            Dossiers d'impact exécutif et transformations numériques réussies pour les comités de direction et leaders industriels au Maroc et en Europe.
          </p>
        </div>

        {/* 2. SQLI SIGNATURE FILTER BAR */}
        <div className="mb-14 pb-8 border-b border-[#e2dcd2]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium">
            
            {/* Filter: Secteurs ⌵ */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'sector' ? null : 'sector')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-sm border transition-all cursor-pointer text-xs font-semibold ${
                  openDropdown === 'sector'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm ring-1 ring-blue-600/30'
                    : selectedSector !== 'All'
                    ? 'bg-blue-50/70 border-blue-300 text-blue-800'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>Secteurs</span>
                {selectedSector !== 'All' && <span className="text-xs text-blue-700 font-bold">({selectedSector})</span>}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'sector' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'sector' && (
                <div className="absolute left-0 mt-2 w-56 max-w-[calc(100vw-2.5rem)] bg-white border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {['All', 'Industrie & BTP', 'Distribution & Négoce', 'Finance & Services', 'Santé & Cliniques', 'Agro-Industrie & Export', 'Retail & Boutiques'].map((sec) => (
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
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-sm border transition-all cursor-pointer text-xs font-semibold ${
                  openDropdown === 'tech'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm ring-1 ring-blue-600/30'
                    : selectedTech !== 'All'
                    ? 'bg-blue-50/70 border-blue-300 text-blue-800'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>Technologies</span>
                {selectedTech !== 'All' && <span className="text-xs text-blue-700 font-bold">({selectedTech})</span>}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'tech' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'tech' && (
                <div className="absolute left-0 mt-2 w-56 max-w-[calc(100vw-2.5rem)] bg-white border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {['All', 'Odoo 18 Enterprise', 'Facturation DGI & EDI', 'AMOA Big 4 & BI', 'ERP Spécifique & API', 'Odoo GPAO & Traçabilité', 'Odoo POS & Extranet'].map((t) => (
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
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-sm border transition-all cursor-pointer text-xs font-semibold ${
                  openDropdown === 'country'
                    ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-sm ring-1 ring-blue-600/30'
                    : selectedCountry !== 'All'
                    ? 'bg-blue-50/70 border-blue-300 text-blue-800'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <span>Hubs</span>
                <span className="text-xs font-bold text-slate-900">({selectedCountry === 'All' ? 'All' : selectedCountry})</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'country' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'country' && (
                <div className="absolute left-0 mt-2 w-48 max-w-[calc(100vw-2.5rem)] bg-white border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
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
                        {ctry === 'Morocco' ? '🇲🇦 Casablanca CFC' : ctry === 'France' ? '🇫🇷 Toulouse' : 'All Hubs'}
                      </span>
                      {selectedCountry === ctry && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Buttons: Apply & Reset */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto sm:ml-auto">
              <button
                onClick={handleApply}
                className={`flex-1 sm:flex-none relative px-7 py-2.5 rounded-none font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 ${
                  (selectedSector !== appliedFilters.sector || selectedTech !== appliedFilters.tech || selectedCountry !== appliedFilters.country)
                    ? 'bg-[#1f24e9] hover:bg-[#151ad0] text-white ring-2 ring-blue-500 ring-offset-1 shadow-blue-500/30'
                    : 'bg-[#1f24e9] hover:bg-[#151ad0] text-white'
                }`}
              >
                <span>Apply</span>
                {(selectedSector !== appliedFilters.sector || selectedTech !== appliedFilters.tech || selectedCountry !== appliedFilters.country) && (
                  <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping inline-block" />
                )}
              </button>

              <button
                onClick={handleReset}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-none font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border flex items-center justify-center ${
                  (appliedFilters.sector !== 'All' || appliedFilters.tech !== 'All' || appliedFilters.country !== 'All' || selectedSector !== 'All' || selectedTech !== 'All' || selectedCountry !== 'All')
                    ? 'bg-slate-900 hover:bg-black text-white border-transparent'
                    : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300 hover:text-slate-600'
                }`}
                title="Réinitialiser tous les filtres"
              >
                Reset
              </button>
            </div>

          </div>

          {/* Active Filter Chips Bar & Live Counter */}
          <div className="mt-4 pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500 font-mono text-[11px]">Filtres actifs :</span>
              {appliedFilters.sector === 'All' && appliedFilters.tech === 'All' && appliedFilters.country === 'All' ? (
                <span className="text-slate-400 italic text-[11px]">Tous les dossiers affichés</span>
              ) : (
                <>
                  {appliedFilters.sector !== 'All' && (
                    <button
                      onClick={() => {
                        setSelectedSector('All');
                        setAppliedFilters(prev => ({ ...prev, sector: 'All' }));
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 font-semibold hover:bg-blue-100 transition-colors cursor-pointer text-[11px]"
                    >
                      <span>Secteur: {appliedFilters.sector}</span>
                      <span className="font-bold">✕</span>
                    </button>
                  )}
                  {appliedFilters.tech !== 'All' && (
                    <button
                      onClick={() => {
                        setSelectedTech('All');
                        setAppliedFilters(prev => ({ ...prev, tech: 'All' }));
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 font-semibold hover:bg-blue-100 transition-colors cursor-pointer text-[11px]"
                    >
                      <span>Tech: {appliedFilters.tech}</span>
                      <span className="font-bold">✕</span>
                    </button>
                  )}
                  {appliedFilters.country !== 'All' && (
                    <button
                      onClick={() => {
                        setSelectedCountry('All');
                        setAppliedFilters(prev => ({ ...prev, country: 'All' }));
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 font-semibold hover:bg-blue-100 transition-colors cursor-pointer text-[11px]"
                    >
                      <span>Hub: {appliedFilters.country === 'Morocco' ? 'Casablanca 🇲🇦' : 'Toulouse 🇫🇷'}</span>
                      <span className="font-bold">✕</span>
                    </button>
                  )}
                  <button
                    onClick={handleReset}
                    className="text-[11px] text-blue-700 underline font-semibold hover:text-blue-900 ml-2 cursor-pointer"
                  >
                    Effacer tout
                  </button>
                </>
              )}
            </div>

            <div className="font-mono text-slate-600 text-[11px] font-bold">
              Affichage de {filteredCases.length} sur {caseStudiesExtended.length} dossiers
            </div>
          </div>

        </div>

        {/* Empty state fallback if no results match filters */}
        {filteredCases.length === 0 && (
          <div className="text-center py-16 bg-white border border-[#e2dcd2] mb-20 p-8 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Aucun dossier ne correspond aux critères sélectionnés
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto font-sans">
              Modifiez votre combinaison de filtres ou réinitialisez pour afficher l'ensemble de nos cas clients.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1f24e9] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Réinitialiser les filtres</span>
            </button>
          </div>
        )}

        {/* 3. EDITORIAL CASE STUDY GRID (SQLI Standard: 2-Columns with Magnetic Photos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-20">
          {filteredCases.map((cs) => (
            <article 
              key={cs.id}
              className="group cursor-pointer flex flex-col bg-white border border-[#e2dcd2] p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
              onClick={() => onOpenConsultation(`Dossier Cas Client : ${cs.client}`)}
            >
              {/* Magnetic Photo Frame with Light-Sweep Animation & Floating Badges */}
              <div className="photo-frame w-full aspect-[16/10] bg-slate-900 mb-6 relative">
                <img
                  src={cs.image}
                  alt={cs.title}
                  className="photo-zoom-img w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Atmospheric gradient overlay */}
                <div className="photo-overlay-scrim" />

                {/* Floating Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0a1628]/90 text-white px-3 py-1 backdrop-blur-md border border-white/20 shadow-md">
                    {cs.sector}
                  </span>

                  <span className="text-xs font-bold text-white bg-[#1f24e9] px-3 py-1 shadow-lg shadow-blue-900/40">
                    {cs.metricBadge}
                  </span>
                </div>

                {/* Floating Bottom Hub Badge */}
                <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                  <span className="text-[11px] font-semibold text-white/95 bg-black/60 px-2.5 py-1 backdrop-blur-sm border border-white/10">
                    {cs.hubLabel}
                  </span>
                </div>
              </div>

              {/* Title with hover color change */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a0e1a] tracking-tight leading-snug group-hover:text-blue-600 transition-colors font-heading mb-2">
                {cs.title}
              </h2>

              {/* Sector & Tech tags */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                <span className="text-slate-800 font-bold">{cs.client}</span>
                <span>•</span>
                <span className="text-blue-600 font-bold">{cs.tech}</span>
              </div>

              {/* Impact statement */}
              <p className="text-sm text-slate-700 font-sans leading-relaxed mb-4">
                <strong className="text-slate-900 font-semibold">Impact Mesuré :</strong> {cs.impact}
              </p>

              {/* Quote from Director */}
              <div className="p-3.5 bg-[#f5f8fc] border-l-2 border-[#1f24e9] text-xs text-slate-600 italic font-sans mb-4">
                "{cs.quote}"
              </div>

              {/* Date & CTA with arrow */}
              <div className="mt-auto pt-3 border-t border-slate-150 flex items-center justify-between text-xs font-bold text-[#1f24e9] group-hover:text-blue-700 transition-colors">
                <span className="text-slate-400 font-normal">{cs.date}</span>
                <span className="flex items-center gap-1.5">
                  <span>Consulter le dossier d'impact</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="border border-[#e2dcd2] bg-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Vous avez un projet de transformation ERP ou d'alignement fiscal ?
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Bénéficiez d'une séance de cadrage confidentielle de 45 minutes avec un associé senior Clixa à Casablanca ou Toulouse.
            </p>
          </div>
          <button
            onClick={() => onOpenConsultation("Diagnostic Stratégique Exécutif")}
            className="bg-[#1f24e9] hover:bg-[#151ad0] text-white px-8 py-4 rounded-none font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 shadow-sm"
          >
            <span>Démarrer un cadrage confidentiel</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
