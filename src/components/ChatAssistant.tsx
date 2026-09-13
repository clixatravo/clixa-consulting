import React, { lazy, Suspense, useState } from 'react';
import { X } from 'lucide-react';
import { RobotIcon } from './RobotIcon';

/* La fenêtre de discussion n'est téléchargée qu'au premier clic : le bouton
   seul pèse quelques centaines d'octets et ne ralentit pas l'affichage. */
const ChatPanel = lazy(() => import('./ChatPanel').then((m) => ({ default: m.ChatPanel })));

export const ChatAssistant: React.FC = () => {
  const [ouvert, setOuvert] = useState(false);
  const [charge, setCharge] = useState(false);

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

      {/* Au-dessus du bouton WhatsApp (bottom-5, 56 px de haut). */}
      <div className="fixed bottom-[5.25rem] right-5 z-40 group flex items-center gap-2 sm:bottom-24">
        {!ouvert && (
          <span className="hidden sm:inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-semibold text-white bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl shadow-lg pointer-events-none">
            Une question ? Demandez à l'assistant
          </span>
        )}
        <button
          type="button"
          onClick={basculer}
          aria-expanded={ouvert}
          aria-label={ouvert ? "Fermer l'assistant" : "Poser une question à l'assistant IA"}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-sky-600 to-cyan-400 hover:from-sky-500 hover:to-cyan-300 text-white flex items-center justify-center shadow-xl shadow-sky-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-sky-300/40"
        >
          {ouvert ? <X className="w-6 h-6" /> : <RobotIcon className="w-7 h-7 sm:w-8 sm:h-8" />}
        </button>
      </div>
    </>
  );
};
