import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  ChevronRight, 
  MessageCircle, 
  Search, 
  Globe, 
  ChevronDown
} from 'lucide-react';
import { BRAND } from '../data/content';

interface NavbarProps {
  currentFace: string;
  onNavigateFace: (faceId: string) => void;
  onOpenConsultation: (topic?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentFace, onNavigateFace, onOpenConsultation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<'FR' | 'EN'>('FR');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const locationRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setLocationDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Scroll listener for top styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'accueil', label: currentLang === 'FR' ? 'Accueil' : 'Home' },
    { id: 'expertises', label: currentLang === 'FR' ? 'Expertises & SI' : 'Expertise & IS' },
    { id: 'secteurs', label: currentLang === 'FR' ? 'Secteurs' : 'Industries' },
    { id: 'cas-clients', label: currentLang === 'FR' ? 'Cas Clients' : 'Case Studies' },
    { id: 'simulateur-roi', label: currentLang === 'FR' ? 'Executive Lab' : 'ROI Lab' },
    { id: 'methode', label: currentLang === 'FR' ? 'Méthodologie' : 'Methodology' },
    { id: 'contact', label: currentLang === 'FR' ? 'Contact' : 'Contact' },
  ];

  const handleNavClick = (e: React.MouseEvent, faceId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setSearchOpen(false);
    onNavigateFace(faceId);
  };

  const handleQuickSearch = (keyword: string) => {
    const k = keyword.toLowerCase();
    setSearchOpen(false);
    setSearchQuery('');
    
    if (k.includes('odoo') || k.includes('erp') || k.includes('amoa') || k.includes('finance') || k.includes('dgi') || k.includes('dgfip')) {
      onNavigateFace('expertises');
    } else if (k.includes('btp') || k.includes('industrie') || k.includes('sante') || k.includes('secteur') || k.includes('négoce')) {
      onNavigateFace('secteurs');
    } else if (k.includes('cas') || k.includes('client') || k.includes('projet') || k.includes('résultat')) {
      onNavigateFace('cas-clients');
    } else if (k.includes('roi') || k.includes('simulateur') || k.includes('calcul') || k.includes('audit') || k.includes('48h')) {
      onNavigateFace('simulateur-roi');
    } else if (k.includes('methode') || k.includes('gouvernance') || k.includes('jalon') || k.includes('ssii') || k.includes('faq')) {
      onNavigateFace('methode');
    } else {
      onNavigateFace('contact');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
          scrolled
            ? 'bg-[#050811]/98 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/80'
            : 'bg-[#050811]/90 backdrop-blur-md border-b border-white/[0.05]'
        }`}
      >
        {/* 1. TOP UTILITY STRIP (Locations & Language Selector) */}
        <div className="border-b border-white/[0.05] bg-[#03060d]/90 py-1.5 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] text-slate-400">
            {/* Left: International Locations Dropdown */}
            <div className="relative" ref={locationRef}>
              <button
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer py-0.5 px-2 rounded-md hover:bg-white/[0.04]"
                aria-label="Choisir la localisation"
              >
                <Globe className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-semibold text-slate-300">Locations :</span>
                <span className="text-sky-300 font-medium">Casablanca 🇲🇦 & Paris 🇫🇷</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${locationDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {locationDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-slate-900 border border-white/[0.1] shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 mb-2 px-2">
                    Bureaux & Hubs Internationaux
                  </div>
                  
                  {/* Hub Casablanca */}
                  <div 
                    onClick={() => {
                      setLocationDropdownOpen(false);
                      onNavigateFace('contact');
                    }}
                    className="p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors border border-transparent hover:border-white/[0.05] cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🇲🇦</span>
                        <span className="text-xs font-bold text-white">Casablanca Hub</span>
                      </div>
                      <span className="text-[9px] font-mono text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded">CFC & Twin</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 pl-6">
                      Direction Générale & Pôle Intégration Odoo
                    </p>
                  </div>

                  {/* Hub Paris */}
                  <div 
                    onClick={() => {
                      setLocationDropdownOpen(false);
                      onNavigateFace('contact');
                    }}
                    className="p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors border border-transparent hover:border-white/[0.05] cursor-pointer mt-1"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">🇫🇷</span>
                        <span className="text-xs font-bold text-white">Paris Hub</span>
                      </div>
                      <span className="text-[9px] font-mono text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">8ème Arr.</span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 pl-6">
                      AMOA Stratégique & Conformité Factur-X Europe
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Language switch + Direct lines */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-slate-500">Ligne C-Suite :</span>
                <a href={`tel:${BRAND.phoneMarocRaw}`} className="text-slate-300 hover:text-white font-mono transition-colors">
                  {BRAND.phoneMarocDisplay}
                </a>
              </div>

              <div className="h-3 w-px bg-white/[0.1]" />

              {/* Language Selector FR | EN */}
              <div className="flex items-center rounded-lg bg-slate-950 p-0.5 border border-white/[0.08]">
                <button
                  onClick={() => setCurrentLang('FR')}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors cursor-pointer ${
                    currentLang === 'FR' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setCurrentLang('EN')}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded transition-colors cursor-pointer ${
                    currentLang === 'EN' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MAIN NAVIGATION ROW */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            
            {/* SQLI Typographic Logo */}
            <button 
              onClick={(e) => handleNavClick(e, 'accueil')}
              className="flex items-center gap-3.5 shrink-0 group cursor-pointer text-left"
            >
              <div className="flex items-end gap-1 h-7">
                <div className="w-1.5 h-7 rounded-sm bg-gradient-to-t from-sky-600 to-sky-400 group-hover:scale-y-110 transition-transform origin-bottom" />
                <div className="w-1.5 h-4.5 rounded-sm bg-gradient-to-t from-blue-700 to-sky-500 group-hover:scale-y-125 transition-transform origin-bottom delay-75" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-xl sm:text-2xl tracking-tighter text-white group-hover:text-sky-400 transition-colors font-heading">
                    CLIXA
                  </span>
                  <span className="text-slate-400 font-bold text-xs tracking-widest uppercase font-mono">
                    CONSULTING
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 tracking-wide font-sans hidden sm:block">
                  Digital & Tech Advisory · Casablanca • Paris
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links (Face Switchers) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = currentFace === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`relative px-3.5 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? 'text-white bg-white/[0.08] shadow-sm font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Suite */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* Quick Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                  searchOpen 
                    ? 'bg-sky-500/20 text-sky-400 border-sky-500/40' 
                    : 'bg-slate-900 border-white/[0.08] text-slate-400 hover:text-white hover:border-white/[0.15]'
                }`}
                title="Rechercher une expertise, un secteur ou un livrable"
                aria-label="Recherche rapide"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* WhatsApp Quick Direct Link */}
              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/40 hover:border-emerald-600 transition-all shadow-sm hover:scale-105 active:scale-95"
                title="Ligne directe WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Primary Appointment Button */}
              <button
                onClick={() => onOpenConsultation()}
                className="link-cta-sqli bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white px-4 py-2 rounded-xl border border-sky-400/30 shadow-lg shadow-sky-500/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="font-bold text-xs sm:text-sm">
                  {currentLang === 'FR' ? 'Prendre RDV' : 'Book Meeting'}
                </span>
                <div className="icon-circle bg-white/20 border-white/30 text-white">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => onOpenConsultation()}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-all cursor-pointer"
              >
                RDV
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.1] text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* 3. QUICK SEARCH BAR */}
        {searchOpen && (
          <div className="border-t border-white/[0.08] bg-slate-950/95 backdrop-blur-xl px-4 py-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="max-w-3xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-sky-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery) handleQuickSearch(searchQuery);
                }}
                placeholder="Rechercher : Odoo 18, Conformité DGI, BTP, AMOA, Diagnostic Flash..."
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-w-3xl mx-auto mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Suggestions :</span>
              {['ERP Odoo 18', 'Facturation DGI 2026', 'Calculateur ROI', 'BTP & Industrie', 'Diagnostic 48H'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleQuickSearch(chip)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/[0.06] text-slate-300 hover:text-white hover:border-sky-500/40 text-[11px] transition-colors cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* 4. FULLSCREEN MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#050811]/98 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="p-4 sm:p-6 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-end gap-1 h-5">
                <div className="w-1 h-5 rounded-sm bg-sky-400" />
                <div className="w-1 h-3 rounded-sm bg-blue-600" />
              </div>
              <span className="font-extrabold text-lg text-white font-heading">CLIXA CONSULTING</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-slate-900 border border-white/[0.1] text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/[0.08] mb-4 text-xs text-slate-300 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-sky-400" />
                <span>Casablanca CFC 🇲🇦 & Paris 🇫🇷</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                Actif
              </span>
            </div>

            {navLinks.map((link) => {
              const isActive = currentFace === link.id;
              return (
                <button
                  key={link.id}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl border transition-all text-sm font-semibold cursor-pointer text-left ${
                    isActive
                      ? 'bg-slate-900 border-sky-400 text-white shadow-md'
                      : 'bg-slate-950/60 border-white/[0.06] text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              );
            })}

            <div className="pt-6 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-blue-600 flex items-center justify-center gap-2 shadow-xl shadow-sky-500/20 font-heading cursor-pointer"
              >
                <span>Planifier un Rendez-vous Exécutif</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl text-sm font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Ligne Directe WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
