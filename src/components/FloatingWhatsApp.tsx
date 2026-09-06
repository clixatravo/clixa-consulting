import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { BRAND } from '../data/content';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside aria-label="Support WhatsApp" className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Mini preview popup */}
      {isOpen && (
        <div className="mb-3 p-4 rounded-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700 shadow-2xl w-72 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-white">Consultant CLIXA en ligne</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-0.5 rounded cursor-pointer transition-colors"
              aria-label="Fermer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Besoin d’un échange rapide sur votre projet ERP, Web ou AMOA ? Nos associés sont disponibles directement.
          </p>
          <a
            href={BRAND.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Ouvrir WhatsApp</span>
          </a>
        </div>
      )}

      {/* Main floating action button */}
      <div className="relative group flex items-center gap-2">
        {/* Hover label */}
        <span className="hidden sm:inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-semibold text-white bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl shadow-lg pointer-events-none">
          Discuter sur WhatsApp
        </span>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-white flex items-center justify-center shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-emerald-300/40"
          aria-label="Ouvrir WhatsApp"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Pulsing online indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 pointer-events-none">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-950" />
        </span>
      </div>
    </aside>
  );
};
