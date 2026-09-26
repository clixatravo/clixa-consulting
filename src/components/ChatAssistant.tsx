import React, { lazy, Suspense, useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import { RobotIcon } from './RobotIcon';

/* La fenêtre de discussion n'est téléchargée qu'au premier clic : le bouton
   seul pèse quelques centaines d'octets et ne ralentit pas l'affichage. */
const ChatPanel = lazy(() => import('./ChatPanel').then((m) => ({ default: m.ChatPanel })));

export const ChatAssistant: React.FC = () => {
  const [ouvert, setOuvert] = useState(false);
  const [charge, setCharge] = useState(false);

  // Écouteur global pour ouvrir l'assistant depuis la Navbar, les cartes formations ou l'accueil
  useEffect(() => {
    const handleOpenChat = () => {
      setCharge(true);
      setOuvert(true);
    };

    window.addEventListener('clixa:open-chat', handleOpenChat);
    return () => window.removeEventListener('clixa:open-chat', handleOpenChat);
  }, []);

  const basculer = () => {
    setCharge(true);
    setOuvert((o) => !o);
  };

  return (
    <>
      {charge && (
        <Suspense fallback={null}>
          <ChatPanel ouvert={ouvert} onFermer={() => setOuvert(false)} />
        </Suspense>
      )}

      {/* Au-dessus du bouton WhatsApp */}
      <div className="fixed bottom-[5.25rem] right-5 z-40 group flex items-center gap-2 sm:bottom-24">
        {!ouvert && (
          <button
            type="button"
            onClick={basculer}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0c1222]/95 border border-sky-400/30 text-white text-xs font-bold shadow-xl backdrop-blur-md cursor-pointer hover:bg-black transition-colors"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
            </span>
            <span className="font-heading">Assistant IA · Conseil & Formations</span>
          </button>
        )}
        <button
          type="button"
          onClick={basculer}
          aria-expanded={ouvert}
          aria-label={ouvert ? "Fermer l'assistant" : "Poser une question à l'assistant IA"}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-sky-600 to-cyan-500 hover:from-sky-500 hover:to-cyan-400 text-white flex items-center justify-center shadow-xl shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-sky-300/40"
        >
          {ouvert ? <X className="w-6 h-6" /> : <RobotIcon className="w-7 h-7 sm:w-8 sm:h-8" />}
        </button>
      </div>
    </>
  );
};
