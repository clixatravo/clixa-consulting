import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  ChevronRight, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Database, 
  Award, 
  FileText, 
  Target, 
  Compass, 
  HelpCircle,
  Sparkles,
  Layers,
  Calculator
} from 'lucide-react';
import { BRAND } from '../data/content';

interface NavbarProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Expertises', href: '#expertises', icon: Database },
    { label: 'Secteurs', href: '#secteurs', icon: Layers },
    { label: 'Cas Clients', href: '#cas-clients', icon: Award },
    { label: 'Simulateur ROI', href: '#simulateur-roi', icon: Calculator },
    { label: 'Facturation', href: '#facturation', icon: FileText },
    { label: 'Diagnostic', href: '#diagnostic', icon: Target },
    { label: 'FAQ', href: '#faq', icon: HelpCircle },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/92 backdrop-blur-md border-b border-slate-800/90 shadow-2xl shadow-black/40 py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo */}
            <a href="#" className="flex items-center gap-2.5 sm:gap-3 shrink-0 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-700/80 p-1.5 flex items-center justify-center group-hover:border-sky-500/50 transition-colors shadow-inner">
                <svg viewBox="0 0 48 48" className="w-full h-full" fill="none">
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

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-sky-400 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200 whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* Elegant WhatsApp Circular Icon Button */}
              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/40 hover:border-emerald-700 transition-all shadow-sm"
                title="Échanger directement sur WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Primary Action Button */}
              <button
                onClick={() => onOpenConsultation()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 transition-all shadow-md shadow-sky-500/20 hover:shadow-sky-500/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap"
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
                className="p-2.5 rounded-xl text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 active:scale-90 transition-transform"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white active:scale-90 transition-transform cursor-pointer flex items-center gap-1.5"
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
          {/* Backdrop */}
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/90 transition-opacity"
          />

          {/* Slide-out Menu Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto z-10">
            
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
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white border border-slate-800 active:scale-90 transition-transform cursor-pointer"
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

              {/* Navigation Links */}
              <nav className="p-4 space-y-1">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5">
                  Navigation Rapide
                </div>

                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      type="button"
                      key={link.label}
                      onClick={() => handleNavClick(link.href)}
                      className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-900 active:bg-sky-500/20 active:scale-[0.98] transition-all text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 group-hover:border-sky-500/40 group-hover:text-sky-300 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{link.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
                    </button>
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
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 transition-colors"
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
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 transition-colors"
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
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 shadow-xl shadow-sky-500/25 active:scale-[0.98] transition-all cursor-pointer"
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
