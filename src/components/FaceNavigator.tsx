import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface FaceNavigatorProps {
  activeFace: string;
  onNavigate: (targetId: string) => void;
}

export const FACES = [
  { id: 'accueil', num: '01', label: 'Accueil' },
  { id: 'expertises', num: '02', label: 'Expertises & SI' },
  { id: 'secteurs', num: '03', label: 'Secteurs Métiers' },
  { id: 'cas-clients', num: '04', label: 'Cas Clients & ROI' },
  { id: 'simulateur-roi', num: '05', label: 'Executive Lab' },
  { id: 'methode', num: '06', label: 'Méthodologie' },
  { id: 'contact', num: '07', label: 'Contact & Cadrage' },
];

export const FaceNavigator: React.FC<FaceNavigatorProps> = ({ activeFace, onNavigate }) => {
  const [hoveredFace, setHoveredFace] = useState<string | null>(null);

  const currentIndex = FACES.findIndex(f => f.id === activeFace);
  const safeCurrentIndex = currentIndex === -1 ? 0 : currentIndex;

  const handleNext = () => {
    if (safeCurrentIndex < FACES.length - 1) {
      onNavigate(FACES[safeCurrentIndex + 1].id);
    }
  };

  const handlePrev = () => {
    if (safeCurrentIndex > 0) {
      onNavigate(FACES[safeCurrentIndex - 1].id);
    }
  };

  return (
    <aside
      aria-label="Navigation des faces"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 select-none pointer-events-auto"
    >
      {/* Up Button */}
      <button
        onClick={handlePrev}
        disabled={safeCurrentIndex === 0}
        className={`w-8 h-8 rounded-full bg-slate-900/90 border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-500/50 transition-all backdrop-blur-md shadow-lg ${
          safeCurrentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'
        }`}
        title="Face précédente"
        aria-label="Face précédente"
      >
        <ChevronUp className="w-4 h-4" />
      </button>

      {/* The Face Dots Rail */}
      <nav aria-label="Liste des sections" className="p-2 rounded-full bg-slate-950/80 border border-white/[0.08] shadow-2xl backdrop-blur-xl flex flex-col gap-2.5 items-center">
        {FACES.map((face, idx) => {
          const isActive = face.id === activeFace || (activeFace === '' && idx === 0);
          return (
            <div
              key={face.id}
              className="relative flex items-center group cursor-pointer"
              onMouseEnter={() => setHoveredFace(face.id)}
              onMouseLeave={() => setHoveredFace(null)}
              onClick={() => onNavigate(face.id)}
            >
              {/* Tooltip on hover (left of dot) */}
              <div
                className={`absolute right-8 px-3 py-1 rounded-lg bg-slate-900 border border-white/[0.1] text-xs font-semibold whitespace-nowrap shadow-xl backdrop-blur-md transition-all duration-200 pointer-events-none flex items-center gap-2 ${
                  hoveredFace === face.id
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2'
                }`}
              >
                <span className="font-mono text-sky-400 text-[10px]">{face.num}</span>
                <span className="text-white text-xs">{face.label}</span>
              </div>

              {/* The Dot / Indicator */}
              <button
                className={`relative flex items-center justify-center transition-all duration-300 rounded-full cursor-pointer ${
                  isActive
                    ? 'w-7 h-7 bg-sky-500/20 border border-sky-400'
                    : 'w-4 h-4 bg-transparent border border-white/20 hover:border-sky-400/60'
                }`}
                aria-label={`Aller à la face ${face.num} - ${face.label}`}
              >
                {isActive ? (
                  <span className="text-[10px] font-mono font-bold text-sky-300">
                    {face.num}
                  </span>
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover:bg-sky-400 transition-colors" />
                )}
              </button>
            </div>
          );
        })}
      </nav>

      {/* Down Button */}
      <button
        onClick={handleNext}
        disabled={safeCurrentIndex === FACES.length - 1}
        className={`w-8 h-8 rounded-full bg-slate-900/90 border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white hover:border-sky-500/50 transition-all backdrop-blur-md shadow-lg ${
          safeCurrentIndex === FACES.length - 1 ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'
        }`}
        title="Face suivante"
        aria-label="Face suivante"
      >
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Mini Face Counter */}
      <div className="text-[9px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded-md border border-white/[0.08] backdrop-blur-sm">
        {FACES[safeCurrentIndex]?.num} / 07
      </div>
    </aside>
  );
};
