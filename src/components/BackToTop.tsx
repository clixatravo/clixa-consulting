import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const checkScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setVisible(window.scrollY > 450);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Retour en haut de page"
      className="fixed bottom-5 left-5 z-40 p-3 rounded-full bg-slate-900/85 hover:bg-slate-800/90 text-sky-400 hover:text-white border border-slate-700/80 hover:border-sky-500/50 shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 active:translate-y-0 group cursor-pointer animate-entrance-scale"
    >
      <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      <span className="sr-only">Haut de page</span>
    </button>
  );
};
