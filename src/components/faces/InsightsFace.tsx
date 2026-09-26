import { useScrollReveal } from '../../hooks/useScrollReveal';
import React, { useState } from 'react';
import { ChevronDown, ArrowUpRight, Calculator, Zap, Check, ArrowRight } from 'lucide-react';

interface InsightsFaceProps {
  onOpenConsultation: (topic?: string) => void;
  onNavigateFace: (faceId: string) => void;
}

interface Article {
  id: string;
  title: string;
  category?: string;
  date: string;
  image: string;
  contentType: 'Article' | 'Whitepaper' | 'Regulatory' | 'Benchmark';
  topic: 'Technology' | 'ERP Odoo' | 'Fiscalité DGI' | 'Gouvernance AMOA' | 'Cybersécurité';
  country: 'Morocco' | 'France' | 'Global';
  language: 'EN' | 'FR';
  summary?: string;
}

export const InsightsFace: React.FC<InsightsFaceProps> = ({ onOpenConsultation, onNavigateFace }) => {
  // Filter states matching screenshot
  const [selectedContentType, setSelectedContentType] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  // Dropdown open states
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Active filters applied
  const [appliedFilters, setAppliedFilters] = useState({
    contentType: 'All',
    topic: 'All',
    country: 'All',
    language: 'All',
  });

  // Simulator toggle
  const [showRoiSimulator, setShowRoiSimulator] = useState(false);

  useScrollReveal();

  // ROI Calculator state
  const [employees, setEmployees] = useState<number>(25);
  const [hoursLost, setHoursLost] = useState<number>(5);
  const [currency, setCurrency] = useState<'MAD' | 'EUR'>('MAD');
  const hourlyRate = currency === 'MAD' ? 70 : 32;
  const weeksPerYear = 46;
  const totalHoursSavedYearly = Math.round(employees * hoursLost * weeksPerYear * 0.75);
  const totalFinancialGain = Math.round(totalHoursSavedYearly * hourlyRate);
  const formatNumber = (num: number) => new Intl.NumberFormat('fr-FR').format(num);

  const articles: Article[] = [
    {
      id: 'frontend-expertise',
      title: "Front-end expertise is required in web application projects",
      category: "Architecture & Modern UI",
      date: "20 May 2026",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      contentType: 'Article',
      topic: 'Technology',
      country: 'Global',
      language: 'EN',
      summary: "Why deep architectural mastery of modern UI runtimes, state stores, and micro-frontends directly determines conversion and latency in enterprise web platforms."
    },
    {
      id: 'devops-breakthroughs',
      title: "DevOps : the 4 breakthroughs enabling continuous change",
      category: "Ingénierie & CI/CD",
      date: "14 Oct 2026",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      contentType: 'Article',
      topic: 'Technology',
      country: 'Global',
      language: 'EN',
      summary: "Exploring GitOps, automated regression pipelines, container orchestration, and policy-as-code to de-risk release cycles in mission-critical applications."
    },
    {
      id: 'ia-erp-odoo',
      title: "L'impact des agents IA autonomes sur le pilotage des processus ERP en 2026",
      category: "Intelligence Artificielle & ERP",
      date: "18 Sep 2026",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      contentType: 'Whitepaper',
      topic: 'ERP Odoo',
      country: 'Morocco',
      language: 'FR',
      summary: "Comment l'orchestration par IA transforme la saisie comptable, la réconciliation bancaire multi-devises et la planification prédictive des stocks."
    },
    {
      id: 'reforme-dgi-2026',
      title: "Réforme de la Facturation Électronique au Maroc : Guide stratégique pour Comités de Direction",
      category: "Réglementation Fiscale DGI",
      date: "24 Aug 2026",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=1200&q=80",
      contentType: 'Regulatory',
      topic: 'Fiscalité DGI',
      country: 'Morocco',
      language: 'FR',
      summary: "Anticiper les obligations légales DGI 2025/2026, fiabiliser les télédéclarations EDI et sécuriser les interfaçages API sans pénalité."
    },
    {
      id: 'amoa-governance-big4',
      title: "Pourquoi 70% des projets ERP échouent et comment le cadrage Big 4 garantit le succès",
      category: "Gouvernance & AMOA",
      date: "15 Jul 2026",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      contentType: 'Benchmark',
      topic: 'Gouvernance AMOA',
      country: 'France',
      language: 'FR',
      summary: "Analyse des dérives budgétaires courantes des intégrateurs classiques et méthodologie de sécurisation par jalons contractuels stricts."
    },
    {
      id: 'cloud-souverain-cndp',
      title: "Souveraineté des Données & Cloud Hybride : Guide de conformité CNDP & RGPD",
      category: "Cybersécurité & Données",
      date: "02 Jun 2026",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      contentType: 'Whitepaper',
      topic: 'Cybersécurité',
      country: 'Morocco',
      language: 'FR',
      summary: "Hébergement des données souveraines au Maroc, chiffrement au repos et conformité avec les directives CNDP pour les organisations sensibles."
    }
  ];

  const handleApply = () => {
    setAppliedFilters({
      contentType: selectedContentType,
      topic: selectedTopic,
      country: selectedCountry,
      language: selectedLanguage,
    });
    setOpenDropdown(null);
  };

  const handleReset = () => {
    setSelectedContentType('All');
    setSelectedTopic('All');
    setSelectedCountry('All');
    setSelectedLanguage('All');
    setAppliedFilters({
      contentType: 'All',
      topic: 'All',
      country: 'All',
      language: 'All',
    });
    setOpenDropdown(null);
  };

  const filteredArticles = articles.filter((art) => {
    if (appliedFilters.contentType !== 'All' && art.contentType !== appliedFilters.contentType) return false;
    if (appliedFilters.topic !== 'All' && art.topic !== appliedFilters.topic) return false;
    if (appliedFilters.country !== 'All' && art.country !== appliedFilters.country && art.country !== 'Global') return false;
    if (appliedFilters.language !== 'All' && art.language !== appliedFilters.language) return false;
    return true;
  });

  const hasFilterChanges = (
    selectedContentType !== appliedFilters.contentType ||
    selectedTopic !== appliedFilters.topic ||
    selectedCountry !== appliedFilters.country ||
    selectedLanguage !== appliedFilters.language
  );

  const hasAnyFilterActive = (
    appliedFilters.contentType !== 'All' ||
    appliedFilters.topic !== 'All' ||
    appliedFilters.country !== 'All' ||
    appliedFilters.language !== 'All' ||
    selectedContentType !== 'All' ||
    selectedTopic !== 'All' ||
    selectedCountry !== 'All' ||
    selectedLanguage !== 'All'
  );

  const getPillBadgeStyle = (type: Article['contentType']) => {
    switch (type) {
      case 'Article':
        return 'bg-slate-900 text-white';
      case 'Whitepaper':
        return 'bg-[#1f24e9] text-white';
      case 'Regulatory':
        return 'bg-purple-700 text-white';
      case 'Benchmark':
        return 'bg-amber-600 text-white';
      default:
        return 'bg-slate-900 text-white';
    }
  };

  return (
    <div className="w-full bg-[#FAF7F2] text-slate-900 font-sans min-h-screen pt-32 sm:pt-40 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* 1. GIANT EDITORIAL TITLE (SQLI Standard: "Insights") */}
        <div className="mb-10 sm:mb-14">
          <h1 className="text-6xl sm:text-7xl lg:text-[84px] font-bold text-[#0a0e1a] tracking-tight leading-none font-heading">
            Insights
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal mt-4 max-w-2xl leading-relaxed">
            Analyses technologiques de pointe, études stratégiques et retours d'expérience pour éclairer les décisions des directions générales.
          </p>
        </div>

        {/* 2. SQLI SIGNATURE FILTER BAR */}
        <div className="mb-14 pb-6 border-b border-[#e2dcd2]">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium">
            
            {/* Filter: Content type ⌵ */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'contentType' ? null : 'contentType')}
                className="flex items-center gap-1.5 py-1 text-slate-800 hover:text-black transition-colors cursor-pointer"
              >
                <span>Content type</span>
                {selectedContentType !== 'All' && <span className="text-xs text-blue-600 font-bold">({selectedContentType})</span>}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'contentType' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'contentType' && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {['All', 'Article', 'Whitepaper', 'Regulatory', 'Benchmark'].map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedContentType(type);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                    >
                      <span className={selectedContentType === type ? 'font-bold text-blue-600' : 'text-slate-700'}>{type}</span>
                      {selectedContentType === type && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter: Topics ⌵ */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'topics' ? null : 'topics')}
                className="flex items-center gap-1.5 py-1 text-slate-800 hover:text-black transition-colors cursor-pointer"
              >
                <span>Topics</span>
                {selectedTopic !== 'All' && <span className="text-xs text-blue-600 font-bold">({selectedTopic})</span>}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'topics' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'topics' && (
                <div className="absolute left-0 mt-2 w-52 bg-white border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {['All', 'Technology', 'ERP Odoo', 'Fiscalité DGI', 'Gouvernance AMOA', 'Cybersécurité'].map((top) => (
                    <button
                      key={top}
                      onClick={() => {
                        setSelectedTopic(top);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                    >
                      <span className={selectedTopic === top ? 'font-bold text-blue-600' : 'text-slate-700'}>{top}</span>
                      {selectedTopic === top && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter: Countries ⌵ */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'countries' ? null : 'countries')}
                className="flex items-center gap-1.5 py-1 text-slate-800 hover:text-black transition-colors cursor-pointer"
              >
                <span>Countries</span>
                {selectedCountry !== 'All' && <span className="text-xs text-blue-600 font-bold">({selectedCountry})</span>}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'countries' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'countries' && (
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

            {/* Filter: Languages ⌵ */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(openDropdown === 'languages' ? null : 'languages')}
                className="flex items-center gap-1.5 py-1 text-slate-800 hover:text-black transition-colors cursor-pointer"
              >
                <span>Languages</span>
                {selectedLanguage !== 'All' && <span className="text-xs text-blue-600 font-bold">({selectedLanguage})</span>}
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${openDropdown === 'languages' ? 'rotate-180' : ''}`} />
              </button>

              {openDropdown === 'languages' && (
                <div className="absolute left-0 mt-2 w-44 bg-white border border-slate-200 shadow-xl py-2 z-30 animate-in fade-in zoom-in-95 duration-100">
                  {['All', 'EN', 'FR'].map((lng) => (
                    <button
                      key={lng}
                      onClick={() => {
                        setSelectedLanguage(lng);
                        setOpenDropdown(null);
                      }}
                      className="w-full px-4 py-2 text-left text-xs hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                    >
                      <span className={selectedLanguage === lng ? 'font-bold text-blue-600' : 'text-slate-700'}>
                        {lng === 'EN' ? 'English' : lng === 'FR' ? 'French' : 'All Languages'}
                      </span>
                      {selectedLanguage === lng && <Check className="w-3.5 h-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Filter Buttons: Apply & Reset */}
            <div className="flex items-center gap-2 sm:ml-auto">
              <button
                onClick={handleApply}
                className="relative bg-[#1f24e9] hover:bg-[#151ad0] text-white px-7 py-2.5 rounded-none font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm flex items-center gap-2"
              >
                <span>Apply</span>
                {hasFilterChanges && (
                  <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping inline-block" />
                )}
              </button>

              <button
                onClick={handleReset}
                className={`px-7 py-2.5 rounded-none font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                  hasAnyFilterActive
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
              {appliedFilters.contentType === 'All' && appliedFilters.topic === 'All' && appliedFilters.country === 'All' && appliedFilters.language === 'All' ? (
                <span className="text-slate-400 italic text-[11px]">Tous les articles affichés</span>
              ) : (
                <>
                  {appliedFilters.contentType !== 'All' && (
                    <button
                      onClick={() => {
                        setSelectedContentType('All');
                        setAppliedFilters(prev => ({ ...prev, contentType: 'All' }));
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 font-semibold hover:bg-blue-100 transition-colors cursor-pointer text-[11px]"
                    >
                      <span>Format: {appliedFilters.contentType}</span>
                      <span className="font-bold">✕</span>
                    </button>
                  )}
                  {appliedFilters.topic !== 'All' && (
                    <button
                      onClick={() => {
                        setSelectedTopic('All');
                        setAppliedFilters(prev => ({ ...prev, topic: 'All' }));
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 font-semibold hover:bg-blue-100 transition-colors cursor-pointer text-[11px]"
                    >
                      <span>Sujet: {appliedFilters.topic}</span>
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
                      <span>Zone: {appliedFilters.country === 'Morocco' ? '🇲🇦 Maroc' : '🇫🇷 France'}</span>
                      <span className="font-bold">✕</span>
                    </button>
                  )}
                  {appliedFilters.language !== 'All' && (
                    <button
                      onClick={() => {
                        setSelectedLanguage('All');
                        setAppliedFilters(prev => ({ ...prev, language: 'All' }));
                      }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 font-semibold hover:bg-blue-100 transition-colors cursor-pointer text-[11px]"
                    >
                      <span>Langue: {appliedFilters.language}</span>
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
              Affichage de {filteredArticles.length} sur {articles.length} publications
            </div>
          </div>

        </div>

        {/* Empty state fallback */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16 bg-white border border-[#e2dcd2] mb-20 p-8 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Aucun article ne correspond aux critères sélectionnés
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto font-sans">
              Modifiez votre combinaison de filtres ou réinitialisez pour afficher l'ensemble de nos publications et livres blancs.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1f24e9] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Réinitialiser les filtres</span>
            </button>
          </div>
        )}

        {/* 3. EDITORIAL ARTICLE GRID (SQLI 2-Column Standard with Magnetic Photos) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-20">
          {filteredArticles.map((article) => (
            <article 
              key={article.id} 
              className="group cursor-pointer flex flex-col bg-white border border-[#e2dcd2] p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300"
              onClick={() => onOpenConsultation(`Question sur l'article : ${article.title}`)}
            >
              {/* Photo Frame with light sweep and dynamic floating badges */}
              <div className="photo-frame w-full aspect-[16/10] bg-slate-900 mb-5 relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="photo-zoom-img w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="photo-overlay-scrim" />
                <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#0a1628]/90 text-white px-3 py-1 backdrop-blur-md border border-white/20 shadow-sm">
                    {article.category || article.topic}
                  </span>
                </div>
                <div className="absolute bottom-3.5 right-3.5 z-10 pointer-events-none">
                  <span className={`text-xs font-bold px-3 py-1 shadow-md ${getPillBadgeStyle(article.contentType)}`}>
                    {article.contentType}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#0a0e1a] tracking-tight leading-snug group-hover:text-blue-600 transition-colors font-heading mb-2">
                {article.title}
              </h2>

              {/* Subtitle / Category */}
              {article.category && (
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  <span className="text-blue-600 font-bold">{article.topic}</span> • <span>{article.category}</span>
                </div>
              )}

              {/* Summary snippet */}
              {article.summary && (
                <p className="text-sm text-slate-600 font-sans leading-relaxed mb-4 line-clamp-2">
                  {article.summary}
                </p>
              )}

              {/* Date & Country */}
              <div className="mt-auto text-xs text-slate-400 font-sans pt-2 border-t border-slate-200 flex items-center justify-between">
                <span>{article.date}</span>
                <span className="font-mono text-slate-500 font-semibold">
                  {article.country === 'Morocco' ? '🇲🇦 Casablanca' : article.country === 'France' ? '🇫🇷 Toulouse' : '🌐 International'}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* 4. C-SUITE ROI SIMULATOR BANNER & INTERACTIVE LAB */}
        <div className="border border-[#e2dcd2] bg-white p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-8 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 block mb-2">
                Executive Decision Lab · Clixa Advisory
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
                Simulateur de Rentabilité & Diagnostic Flash 48H
              </h3>
              <p className="text-sm text-slate-600 font-sans mt-2 max-w-2xl">
                Évaluez immédiatement les gains financiers générés par la standardisation de vos processus ERP et l'automatisation fiscale.
              </p>
            </div>

            <button
              onClick={() => setShowRoiSimulator(!showRoiSimulator)}
              className="bg-[#0b101d] hover:bg-black text-white px-8 py-3.5 rounded-none font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer self-start lg:self-auto shrink-0 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-blue-400" />
              <span>{showRoiSimulator ? "Masquer le simulateur" : "Ouvrir le simulateur interactif"}</span>
            </button>
          </div>

          {showRoiSimulator && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 animate-in fade-in duration-300">
              {/* Sliders */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Devise de calcul</span>
                  <div className="flex rounded border border-slate-300 p-0.5">
                    <button
                      onClick={() => setCurrency('MAD')}
                      className={`px-3 py-1 text-xs font-bold ${currency === 'MAD' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                    >
                      MAD (Maroc)
                    </button>
                    <button
                      onClick={() => setCurrency('EUR')}
                      className={`px-3 py-1 text-xs font-bold ${currency === 'EUR' ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                    >
                      EUR (Europe)
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold text-slate-800 mb-2">
                    <span>Collaborateurs administratifs / opérationnels :</span>
                    <span className="text-blue-600 font-mono text-base">{employees} collaborateurs</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="250"
                    step="5"
                    value={employees}
                    onChange={(e) => setEmployees(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold text-slate-800 mb-2">
                    <span>Heures perdues par semaine / employé (double saisie, reporting manuel) :</span>
                    <span className="text-blue-600 font-mono text-base">{hoursLost} h / semaine</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    step="1"
                    value={hoursLost}
                    onChange={(e) => setHoursLost(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              </div>

              {/* Result KPI */}
              <div className="lg:col-span-5 bg-[#FAF7F2] border border-[#e2dcd2] p-6 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase text-slate-500 mb-1">Gains annuels estimés récupérables</div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 font-heading">
                    {formatNumber(totalFinancialGain)} <span className="text-lg text-blue-600 font-mono">{currency} / an</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-2 font-mono">
                    ≈ {formatNumber(totalHoursSavedYearly)} heures de travail productif récupérées chaque année
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => onOpenConsultation(`Audit Flash 48h - Potentiel chiffré : ${formatNumber(totalFinancialGain)} ${currency}`)}
                    className="w-full bg-[#1f24e9] hover:bg-[#151ad0] text-white py-3 rounded-none font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Commander un Diagnostic Flash 48H</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
