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
  Workflow,
  Sparkles,
  ShieldCheck
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
    { label: 'Expertises & SI', href: '#expertises', icon: Database },
    { label: 'Secteurs & Impact', href: '#secteurs', icon: Layers },
    { label: 'Cas Clients', href: '#cas-clients', icon: Award },
    { label: 'Méthodologie', href: '#methode', icon: Workflow },
    { label: 'Simulateur ROI', href: '#simulateur-roi', icon: Calculator },
    { label: 'Contact', href: '#contact', icon: Phone },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (href === '#' || href === '#accueil') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 80;
      const elementY = element.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: elementY, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#060913]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/60 py-3'
            : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo with Executive Stature */}
            <a 
              href="#" 
              onClick={(e) => handleNavClick(e, '#accueil')}
              className="flex items-center gap-3 shrink-0 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-[#0A0F1D] border border-white/10 p-1.5 flex items-center justify-center group-hover:border-sky-500/50 transition-all duration-300 shadow-lg shadow-black/40">
                <svg viewBox="0 0 48 48" className="w-full h-full group-hover:scale-105 transition-transform duration-300" fill="none">
                  <path d="M14 16L24 24L14 32" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M34 16L24 24L34 32" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="24" r="3.5" fill="#38BDF8"/>
                </svg>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-sky-400 transition-colors">
                    CLIXA
                  </span>
                  <span className="text-slate-400 font-semibold text-xs tracking-widest uppercase">
                    CONSULTING
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium">
                  <span className="text-sky-400">Casablanca</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-blue-400">Paris</span>
                  <span className="hidden sm:inline text-slate-600">•</span>
                  <span className="hidden sm:inline text-slate-400">Conseil & SI</span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/[0.05] transition-all duration-200 cursor-pointer whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Executive Action Buttons */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* WhatsApp Quick Link */}
              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/40 hover:border-emerald-600 transition-all shadow-sm hover:scale-105 active:scale-95"
                title="Échanger directement avec un associé sur WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Primary Action Button */}
              <button
                onClick={() => onOpenConsultation()}
                className="executive-btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition-all cursor-pointer whitespace-nowrap"
              >
                <span>Échanger avec un Associé</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Navigation Toggle */}
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
                className="p-2.5 rounded-xl bg-slate-900/90 border border-white/10 text-slate-200 hover:text-white hover:border-sky-500/40 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
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
            className="fixed inset-0 bg-[#060913]/85 backdrop-blur-md transition-opacity duration-300"
          />

          {/* Slide-out Menu Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm sm:max-w-md bg-[#0A0F1D] border-l border-white/10 shadow-2xl flex flex-col justify-between overflow-y-auto animate-drawer-slide">
            
            {/* Drawer Header */}
            <div>
              <div className="p-5 border-b border-white/[0.08] flex items-center justify-between bg-slate-900/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 border border-white/10 p-1.5 flex items-center justify-center">
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
                    <div className="text-[10px] text-sky-400 font-medium">Cabinet Conseil en Stratégie & SI</div>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
                  aria-label="Fermer le menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Double Ancrage Status Banner */}
              <div className="px-5 py-2.5 bg-slate-900/40 border-b border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-300 font-medium">Casablanca 🇲🇦 • Paris 🇫🇷</span>
                </div>
                <span className="text-sky-400 font-mono text-[10px]">Interventions Dirigeants</span>
              </div>

              {/* Navigation Links */}
              <nav className="p-4 space-y-1.5">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 py-1.5">
                  Navigation Exécutive
                </div>

                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.label}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] active:bg-white/[0.08] transition-all text-left group cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded-lg bg-slate-900 border border-white/10 text-sky-400 group-hover:border-sky-500/40 group-hover:text-sky-300 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{link.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  );
                })}
              </nav>

              {/* Direct Partner Lines */}
              <div className="px-4 py-2">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3 pb-2">
                  Lignes Directes Associés
                </div>

                <div className="space-y-2">
                  {/* Maroc */}
                  <a
                    href={`tel:${BRAND.phoneMarocRaw}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/[0.08] hover:border-sky-500/40 active:scale-[0.98] transition-all"
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
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/[0.08] hover:border-sky-500/40 active:scale-[0.98] transition-all"
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
            <div className="p-5 border-t border-white/[0.08] space-y-3 bg-slate-900/40">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="executive-btn-primary w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-sm font-bold text-white shadow-xl shadow-sky-500/25 active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Planifier un échange confidentiel</span>
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

              <div className="pt-1 text-center">
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
