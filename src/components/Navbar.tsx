import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  ChevronRight, 
  MessageCircle, 
  Phone, 
  Database, 
  Award, 
  Layers, 
  Calculator,
  HelpCircle,
  Compass
} from 'lucide-react';
import { BRAND } from '../data/content';

export type PageId = 'accueil' | 'expertises' | 'secteurs-references' | 'diagnostic-roi' | 'cabinet' | 'contact';

interface SubItem {
  id: string;
  label: string;
}

interface NavItem {
  id: PageId;
  label: string;
  href: string;
  icon: any;
  subItems?: SubItem[];
}

interface NavbarProps {
  currentPage: PageId;
  activeSubTab?: string;
  onNavigate: (page: PageId, tab?: string) => void;
  onOpenConsultation: (topic?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  activeSubTab,
  onNavigate, 
  onOpenConsultation 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: NavItem[] = [
    { id: 'accueil', label: 'Accueil', href: '#accueil', icon: Compass },
    { 
      id: 'expertises', 
      label: 'Expertises & Solutions', 
      href: '#expertises', 
      icon: Database,
      subItems: [
        { id: 'poles', label: '5 Pôles ERP & SI' },
        { id: 'digital', label: 'Solutions Web' },
        { id: 'technologies', label: 'Tech Stack' }
      ]
    },
    { 
      id: 'secteurs-references', 
      label: 'Secteurs & Cas', 
      href: '#secteurs-references', 
      icon: Layers,
      subItems: [
        { id: 'secteurs', label: 'Secteurs Clés' },
        { id: 'cas-clients', label: 'Cas Réels' },
        { id: 'temoignages', label: 'Témoignages' }
      ]
    },
    { 
      id: 'diagnostic-roi', 
      label: 'Outils & ROI', 
      href: '#diagnostic-roi', 
      icon: Calculator,
      subItems: [
        { id: 'roi', label: 'Simulateur ROI' },
        { id: 'facturation', label: 'Facturation 2026' },
        { id: 'diagnostic', label: 'Diagnostic Flash' }
      ]
    },
    { 
      id: 'cabinet', 
      label: 'Le Cabinet', 
      href: '#cabinet', 
      icon: Award,
      subItems: [
        { id: 'methode', label: 'Méthode (01-04)' },
        { id: 'comparatif', label: 'Pourquoi CLIXA ?' },
        { id: 'equipe', label: 'Équipe Associés' }
      ]
    },
    { 
      id: 'contact', 
      label: 'Contact & FAQ', 
      href: '#contact', 
      icon: HelpCircle,
      subItems: [
        { id: 'rdv', label: 'Prendre RDV' },
        { id: 'faq', label: 'FAQ Stratégique' },
        { id: 'livre-blanc', label: 'Livre Blanc 2026' }
      ]
    },
  ];

  // Scroll listener for sticky styles & reading progress bar
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPos = window.scrollY;
          setScrolled(scrollPos > 20);

          const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          setScrollProgress(totalScroll > 0 ? (scrollPos / totalScroll) * 100 : 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
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

  const handleLinkClick = (e: React.MouseEvent, pageId: PageId, tabId?: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(pageId, tabId);
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div 
        aria-hidden="true" 
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-slate-900/30"
      >
        <div 
          className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(56,189,248,0.8)] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 animate-entrance-down ${
          scrolled
            ? 'bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl shadow-black/50 py-2.5 sm:py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo with click to Accueil */}
            <a 
              href="#accueil" 
              onClick={(e) => handleLinkClick(e, 'accueil')}
              className="flex items-center gap-2.5 sm:gap-3 shrink-0 group cursor-pointer"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-700/80 p-1.5 flex items-center justify-center group-hover:border-sky-500/60 group-hover:scale-105 transition-all duration-300 shadow-inner">
                <svg viewBox="0 0 48 48" className="w-full h-full group-hover:rotate-6 transition-transform duration-300" fill="none">
                  <path d="M14 16L24 24L14 32" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M34 16L24 24L34 32" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="24" r="3.5" fill="#38BDF8"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-white group-hover:text-sky-400 transition-colors">
                    CLIXA
                  </span>
                  <span className="text-slate-400 font-semibold text-[11px] sm:text-xs tracking-wider">
                    CONSULTING
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] text-sky-400 font-medium tracking-wider uppercase hidden sm:block">
                  Transformer • Structurer • Performer
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links with Active Page Indicators */}
            <nav className="hidden xl:flex items-center gap-1 lg:gap-1.5">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.id)}
                    className={`relative px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap group ${
                      isActive
                        ? 'text-sky-300 bg-sky-500/12 border border-sky-500/35 shadow-sm shadow-sky-500/20 font-semibold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900/60 border border-transparent'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8] animate-pulse" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* WhatsApp Button */}
              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/40 hover:border-emerald-700 transition-all shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                title="Échanger directement sur WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Primary Action Button */}
              <button
                onClick={() => onOpenConsultation()}
                className="shimmer-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white shadow-md shadow-sky-500/20 hover:shadow-sky-500/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Parler à un consultant</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile & Tablet Toggle */}
            <div className="xl:hidden flex items-center gap-2">
              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 active:scale-95 transition-transform"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-white hover:border-sky-500/40 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                aria-label="Ouvrir le menu"
              >
                <Menu className="w-5 h-5 text-sky-400" />
                <span className="text-xs font-semibold text-white sm:inline hidden">Menu</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Luxury Mobile Slide-Over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop with Blur */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity animate-in fade-in duration-300"
          />

          {/* Slide-out Menu Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md bg-slate-950 border-l border-slate-800/90 shadow-2xl flex flex-col justify-between overflow-y-auto animate-drawer-slide">
            
            {/* Drawer Header */}
            <div>
              <div className="p-5 border-b border-slate-850 flex items-center justify-between bg-slate-900/40">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 p-1 flex items-center justify-center">
                    <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
                      <path d="M14 16L24 24L14 32" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M34 16L24 24L34 32" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="24" cy="24" r="3.5" fill="#38BDF8"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-white tracking-tight">
                      CLIXA <span className="text-slate-400 font-semibold text-xs">CONSULTING</span>
                    </span>
                    <div className="text-[9px] text-sky-400 font-medium">Cabinet Conseil & SI</div>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 hover:rotate-90 transition-all duration-200 cursor-pointer"
                  aria-label="Fermer le menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status Banner */}
              <div className="px-5 py-2.5 bg-slate-900/30 border-b border-slate-850/60 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300 font-medium">Maroc & France</span>
                </div>
                <span className="text-sky-400 font-mono text-[10px]">Consultants actifs</span>
              </div>

              {/* Navigation Links with Active Highlight & Sub-items */}
              <nav className="p-4 space-y-2">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
                  Espaces du Cabinet
                </div>

                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  const isActive = currentPage === link.id;

                  return (
                    <div key={link.id} className="space-y-1">
                      <button
                        onClick={(e) => handleLinkClick(e, link.id)}
                        style={{ animationDelay: `${(idx + 1) * 40}ms` }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left group cursor-pointer animate-menu-item active:scale-[0.98] ${
                          isActive
                            ? 'bg-sky-950/60 border border-sky-500/40 text-white shadow-sm shadow-sky-500/10 font-semibold'
                            : 'text-slate-200 hover:text-white hover:bg-slate-900/90 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-1.5 rounded-lg border transition-colors ${
                            isActive 
                              ? 'bg-sky-500/20 border-sky-400/50 text-sky-300' 
                              : 'bg-slate-900 border-slate-800 text-sky-400 group-hover:border-sky-500/40 group-hover:text-sky-300'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span>{link.label}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {isActive && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                              Actuel
                            </span>
                          )}
                          <ChevronRight className={`w-4 h-4 transition-all ${
                            isActive 
                              ? 'text-sky-400 translate-x-0.5' 
                              : 'text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5'
                          }`} />
                        </div>
                      </button>

                      {/* Sub-item quick chips if this page is active or has sub-items */}
                      {link.subItems && isActive && (
                        <div className="pl-11 pr-2 py-1 flex flex-wrap gap-1.5 animate-in fade-in duration-200">
                          {link.subItems.map((sub) => {
                            const isSubActive = activeSubTab === sub.id;
                            return (
                              <button
                                key={sub.id}
                                onClick={(e) => handleLinkClick(e, link.id, sub.id)}
                                className={`text-[11px] px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                                  isSubActive
                                    ? 'bg-sky-500/20 text-sky-200 border border-sky-400/40'
                                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-850 border border-slate-800/80'
                                }`}
                              >
                                {sub.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Direct Call Cards for Morocco & France */}
              <div className="px-4 py-2">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 pb-2">
                  Lignes Directes Dirigeants
                </div>

                <div className="space-y-2">
                  {/* Maroc */}
                  <a
                    href={`tel:${BRAND.phoneMarocRaw}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 active:scale-[0.98] transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">🇲🇦</span>
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">Bureau Casablanca</div>
                        <div className="text-xs font-mono font-bold text-white">{BRAND.phoneMarocDisplay}</div>
                      </div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-800 text-sky-400">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                  </a>

                  {/* France */}
                  <a
                    href={`tel:${BRAND.phoneFranceRaw}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 active:scale-[0.98] transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">🇫🇷</span>
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">Bureau Paris</div>
                        <div className="text-xs font-mono font-bold text-white">{BRAND.phoneFranceDisplay}</div>
                      </div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-800 text-sky-400">
                      <Phone className="w-3.5 h-3.5" />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="p-5 border-t border-slate-850 space-y-3 bg-slate-900/30">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="shimmer-btn w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white shadow-xl shadow-sky-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Parler à un consultant</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Échanger directement sur WhatsApp</span>
              </a>

              <div className="pt-2 text-center">
                <a
                  href={`mailto:${BRAND.contactEmail}`}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {BRAND.contactEmail}
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
