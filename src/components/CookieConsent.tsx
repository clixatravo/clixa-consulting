import React, { useEffect, useState } from 'react';
import { Cookie, X } from 'lucide-react';
import { getStoredConsent, storeConsent, loadMetaPixel } from '../lib/analytics';

interface CookieConsentProps {
  onOpenLegal: (tab: 'mentions' | 'confidentialite') => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenLegal }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored === 'granted') {
      loadMetaPixel();
      return;
    }
    if (stored === null) {
      // Léger délai pour ne pas gêner le premier rendu du Hero.
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    storeConsent('granted');
    loadMetaPixel();
    setVisible(false);
  };

  const refuse = () => {
    storeConsent('denied');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Gestion des cookies"
      className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-5 sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-md animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="rounded-2xl bg-slate-900/97 backdrop-blur-md border border-slate-700 shadow-2xl p-5 space-y-3.5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-white mb-1">Votre vie privée</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Nous utilisons des cookies de mesure d'audience (Meta Pixel) pour comprendre la
              performance de nos campagnes. Ils ne sont déposés qu'avec votre accord. Le site
              fonctionne intégralement sans.
            </p>
          </div>
          <button
            onClick={refuse}
            aria-label="Refuser et fermer"
            className="text-slate-500 hover:text-white p-0.5 rounded cursor-pointer transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={accept}
            className="flex-1 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Tout accepter
          </button>
          <button
            onClick={refuse}
            className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            Continuer sans accepter
          </button>
        </div>

        <button
          onClick={() => onOpenLegal('confidentialite')}
          className="text-[11px] text-slate-500 hover:text-sky-400 underline underline-offset-2 transition-colors cursor-pointer"
        >
          Politique de confidentialité
        </button>
      </div>
    </div>
  );
};
