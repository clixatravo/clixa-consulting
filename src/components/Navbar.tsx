import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  Search, 
  ChevronDown,
  ArrowUpRight,
  MessageCircle,
  Check,
  Bot
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
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<'Morocco' | 'France'>('Morocco');
  const [currentLang, setCurrentLang] = useState<'EN' | 'FR'>('EN');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  
  const countryRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll on mobile
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

  // Determine if header should be dark (over hero video) or light (SQLI ivory)
  const isDarkHero = false; // Hero is now light steel blue — navbar always light

  const navLinks = [
    { id: 'expertises', label: currentLang === 'EN' ? 'Expertise' : 'Expertises' },
    { id: 'cas-clients', label: currentLang === 'EN' ? 'Case Studies' : 'Cas Clients' },
    { id: 'insights', label: 'Insights' },
    { id: 'secteurs', label: currentLang === 'EN' ? 'Secteurs' : 'Secteurs' },
    { id: 'methode', label: currentLang === 'EN' ? 'About' : 'À Propos' },
    { id: 'contact', label: currentLang === 'EN' ? 'Contact us' : 'Contact' },
  ];

  const handleNavClick = (faceId: string) => {
    setMobileMenuOpen(false);
    onNavigateFace(faceId);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    
    if (q.includes('odoo') || q.includes('erp') || q.includes('amoa') || q.includes('tech') || q.includes('expertise') || q.includes('conseil') || q.includes('formation')) {
      onNavigateFace('expertises');
    } else if (q.includes('case') || q.includes('cas') || q.includes('client') || q.includes('projet') || q.includes('study')) {
      onNavigateFace('cas-clients');
    } else if (q.includes('insight') || q.includes('ia') || q.includes('ai') || q.includes('devops') || q.includes('front') || q.includes('roi')) {
      onNavigateFace('insights');
    } else if (q.includes('secteur') || q.includes('btp') || q.includes('industrie') || q.includes('sante') || q.includes('distribution')) {
      onNavigateFace('secteurs');
    } else if (q.includes('about') || q.includes('methode') || q.includes('method') || q.includes('cadrage')) {
      onNavigateFace('methode');
    } else {
      onNavigateFace('contact');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 font-sans ${
          isDarkHero
            ? 'bg-[#050811]/90 backdrop-blur-md border-b border-white/[0.08] text-white'
            : 'bg-[#FAF7F2]/98 backdrop-blur-md border-b border-[#e7e2d8] text-slate-900 shadow-sm'
        }`}
      >
        {/* 1. TOP UTILITY STRIP (SQLI Country Pill & Language Switcher) */}
        <div className={`py-1.5 px-4 sm:px-8 border-b ${isDarkHero ? 'border-white/[0.06] bg-black/30' : 'border-[#e7e2d8] bg-[#FAF7F2]'}`}>
          <div className="max-w-7xl mx-auto flex items-center justify-end gap-6 text-[12px]">
            
            {/* Country Selector Pill (SQLI exact dark pill style: Morocco ⌵) */}
            <div className="relative" ref={countryRef}>
              <button
                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                className={`flex items-center gap-2 px-3 py-1 rounded-sm text-xs font-semibold transition-all cursor-pointer shadow-sm ${
                  isDarkHero
                    ? 'bg-slate-900 text-white border border-white/[0.1] hover:bg-slate-800'
                    : 'bg-[#0c1222] text-white hover:bg-black'
                }`}
                aria-label="Select Country"
              >
                <span className="w-2 h-2 rounded-full bg-red-600 inline-block shadow-sm" />
                <span>{selectedCountry}</span>
                <ChevronDown className={`w-3 h-3 text-slate-300 transition-transform duration-200 ${countryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {countryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md bg-white border border-slate-200 shadow-xl py-2 z-50 text-slate-800 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-600 font-bold">
                    Sélectionner un Hub
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCountry('Morocco');
                      setCountryDropdownOpen(false);
                      onNavigateFace('contact');
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-slate-100 flex items-center justify-between font-medium cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🇲🇦</span>
                      <div>
                        <div className="font-bold text-slate-900">Morocco</div>
                        <div className="text-[10px] text-slate-600">Casablanca Finance City</div>
                      </div>
                    </div>
                    {selectedCountry === 'Morocco' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCountry('France');
                      setCountryDropdownOpen(false);
                      onNavigateFace('contact');
                    }}
                    className="w-full px-3 py-2 text-left text-xs hover:bg-slate-100 flex items-center justify-between font-medium cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">🇫🇷</span>
                      <div>
                        <div className="font-bold text-slate-900">France</div>
                        <div className="text-[10px] text-slate-600">Toulouse (Occitanie & Europe)</div>
                      </div>
                    </div>
                    {selectedCountry === 'France' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Language Switch: English | French */}
            <div className={`flex items-center gap-1.5 text-xs font-semibold ${isDarkHero ? 'text-slate-300' : 'text-slate-800'}`}>
              <button
                onClick={() => setCurrentLang('EN')}
                className={`transition-colors cursor-pointer ${
                  currentLang === 'EN' ? (isDarkHero ? 'text-white underline font-bold' : 'text-slate-900 underline font-bold') : 'hover:text-sky-500'
                }`}
              >
                English
              </button>
              <span className="text-slate-400">|</span>
              <button
                onClick={() => setCurrentLang('FR')}
                className={`transition-colors cursor-pointer ${
                  currentLang === 'FR' ? (isDarkHero ? 'text-white underline font-bold' : 'text-slate-900 underline font-bold') : 'hover:text-sky-500'
                }`}
              >
                French
              </button>
            </div>

          </div>
        </div>

        {/* 2. MAIN HEADER ROW (sqli typography & clean horizontal links) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <div className="flex items-center justify-between gap-4 lg:gap-6">
            
            {/* SQLI-Style Lowercase Brand Logo */}
            <button
              onClick={() => handleNavClick('accueil')}
              className="group cursor-pointer text-left shrink-0"
              aria-label="Clixa Home"
            >
              <div className="flex items-baseline gap-1">
                <span className={`text-3xl sm:text-4xl font-extrabold tracking-tighter lowercase font-heading transition-colors ${
                  isDarkHero ? 'text-white group-hover:text-sky-400' : 'text-[#0a0e1a] group-hover:text-blue-600'
                }`}>
                  clixa
                </span>
                <span className="w-2 h-2 rounded-full bg-blue-600 inline-block mb-1" />
              </div>
            </button>

            {/* Desktop Navigation Links (Simple, clean, well-aligned) */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
              {navLinks.map((link) => {
                const isActive = currentFace === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-sm font-semibold transition-all duration-150 cursor-pointer whitespace-nowrap relative py-1 ${
                      isActive
                        ? (isDarkHero ? 'text-white font-bold' : 'text-black font-bold')
                        : (isDarkHero ? 'text-slate-300 hover:text-white' : 'text-slate-800 hover:text-black')
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Suite: Clean Underline Search Input */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
              
              {/* SQLI-Style Search Underline */}
              <form 
                onSubmit={handleSearchSubmit}
                className={`relative flex items-center border-b transition-all duration-200 pb-1 ${
                  searchFocused 
                    ? (isDarkHero ? 'border-sky-400' : 'border-blue-600') 
                    : (isDarkHero ? 'border-white/30' : 'border-slate-400')
                }`}
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="I am searching for"
                  className={`w-32 lg:w-40 bg-transparent text-xs sm:text-sm focus:outline-none transition-all placeholder:text-slate-500 ${
                    isDarkHero ? 'text-white' : 'text-slate-900'
                  }`}
                />
                <button
                  type="submit"
                  className={`p-1 cursor-pointer transition-colors ${
                    isDarkHero ? 'text-slate-300 hover:text-white' : 'text-slate-700 hover:text-black'
                  }`}
                  aria-label="Search"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md transition-colors cursor-pointer ${
                  isDarkHero ? 'text-white bg-slate-900' : 'text-slate-900 bg-slate-200'
                }`}
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* 3. MOBILE MENU SLIDEOUT */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#FAF7F2] animate-in fade-in duration-200 text-slate-900 font-sans">
          <div className="p-4 border-b border-[#e7e2d8] flex items-center justify-between">
            <button
              onClick={() => handleNavClick('accueil')}
              className="flex items-baseline gap-1"
            >
              <span className="text-3xl font-black lowercase text-slate-900 tracking-tighter">
                clixa
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-600 mb-1" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md bg-slate-200 text-slate-800"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search bar inside mobile drawer */}
          <div className="p-4 border-b border-[#e7e2d8]">
            <form onSubmit={handleSearchSubmit} className="flex items-center border-b border-slate-400 pb-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="I am searching for"
                className="w-full bg-transparent text-sm focus:outline-none text-slate-900"
              />
              <button type="submit" className="p-1 text-slate-700">
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {navLinks.map((link) => {
              const isActive = currentFace === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left py-2 text-lg font-bold transition-colors cursor-pointer flex items-center justify-between ${
                    isActive ? 'text-blue-600' : 'text-slate-800 hover:text-black'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-blue-600" />}
                </button>
              );
            })}

            <div className="pt-6 border-t border-[#e7e2d8] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 bg-[#0c1222] text-white font-bold text-sm rounded-none hover:bg-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Planifier un Rendez-vous</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-emerald-700 text-white font-bold text-sm rounded-none hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Ligne Directe</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
