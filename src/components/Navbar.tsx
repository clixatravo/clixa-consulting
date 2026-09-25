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
  ShieldCheck,
  Home
} from 'lucide-react';
import { BRAND } from '../data/content';

interface NavbarProps {
  onOpenConsultation: (topic?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('accueil');

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          
          // Determine active section based on scroll position
          const sections = ['accueil', 'expertises', 'secteurs', 'cas-clients', 'methode', 'simulateur-roi', 'contact'];
          const scrollPosition = window.scrollY + 120;

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i]);
            if (section && section.offsetTop <= scrollPosition) {
              setActiveSection(sections[i]);
              break;
            }
          }

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
    { id: 'accueil', label: 'Accueil', href: '#accueil', icon: Home },
    { id: 'expertises', label: 'Expertises & SI', href: '#expertises', icon: Database },
    { id: 'secteurs', label: 'Secteurs', href: '#secteurs', icon: Layers },
    { id: 'cas-clients', label: 'Cas Clients', href: '#cas-clients', icon: Award },
    { id: 'methode', label: 'Méthodologie', href: '#methode', icon: Workflow },
    { id: 'simulateur-roi', label: 'Simulateur ROI', href: '#simulateur-roi', icon: Calculator },
    { id: 'contact', label: 'Contact', href: '#contact', icon: Phone },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (href === '#' || href === '#accueil') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('accueil');
      return;
    }

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const navOffset = 84;
      const elementY = element.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: elementY, behavior: 'smooth' });
      setActiveSection(targetId);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#050811]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl shadow-black/80 py-3'
            : 'bg-[#050811]/60 backdrop-blur-md border-b border-white/[0.04] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Logo with Executive Stature (UM6P/Netflix Inspired) */}
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
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-sky-400 transition-colors font-heading">
                    CLIXA
                  </span>
                  <span className="text-slate-400 font-semibold text-xs tracking-widest uppercase font-mono">
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

            {/* Desktop Navigation Links - Visible on Laptop & Desktop */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? 'text-white bg-white/[0.08] shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right Action Suite */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* WhatsApp Quick Direct Link */}
              <a
                href={BRAND.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/40 hover:border-emerald-600 transition-all shadow-sm hover:scale-105 active:scale-95"
                title="Échanger sur WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              {/* Direct Call Quick Dropdown */}
              <a
                href={`tel:${BRAND.phoneMarocRaw}`}
                className="px-3 py-2 rounded-xl bg-slate-900 border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white hover:border-sky-500/40 transition-all flex items-center gap-1.5"
                title="Hub Casablanca"
              >
                <span>🇲🇦</span>
                <span className="text-sky-400 font-semibold">{BRAND.phoneMarocDisplay}</span>
              </a>

              {/* Primary Appointment Button */}
              <button
                onClick={() => onOpenConsultation()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 hover:from-sky-500 hover:to-blue-500 transition-all shadow-lg shadow-sky-500/20 active:scale-[0.98] cursor-pointer whitespace-nowrap border border-sky-400/30 font-heading"
              >
                <span>Prendre RDV</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => onOpenConsultation()}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-all"
              >
                RDV
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.1] text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Fullscreen Luxury Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#050811]/98 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="p-4 sm:p-6 border-b border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-lg text-white font-heading">CLIXA</span>
              <span className="text-xs text-sky-400 font-mono">Casablanca • Paris</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl bg-slate-900 border border-white/[0.1] text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all text-sm font-semibold ${
                    isActive
                      ? 'bg-slate-900 border-sky-400 text-white'
                      : 'bg-slate-950/60 border-white/[0.06] text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-900 text-sky-400 border border-white/[0.08]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              );
            })}

            <div className="pt-6 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-600 to-blue-600 flex items-center justify-center gap-2 shadow-xl shadow-sky-500/20 font-heading"
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
