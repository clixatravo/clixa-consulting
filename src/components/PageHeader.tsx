import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface PageTab {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface PageHeaderProps {
  badge: string;
  title: string;
  highlightedTitle?: string;
  subtitle: string;
  pageName: string;
  tabs?: PageTab[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  onNavigateHome: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  highlightedTitle,
  subtitle,
  pageName,
  tabs,
  activeTab,
  onTabChange,
  onNavigateHome,
}) => {
  return (
    <div className="relative pt-24 sm:pt-32 pb-6 sm:pb-8 overflow-hidden bg-slate-950 border-b border-slate-850">
      {/* Ambient background glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Fil d'Ariane" className="flex items-center gap-2 text-xs text-slate-400 mb-4 animate-entrance-down">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 hover:text-sky-400 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5 text-slate-500" />
            <span>Accueil</span>
          </button>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-sky-400 font-medium">{pageName}</span>
        </nav>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/60 text-[11px] sm:text-xs font-semibold text-sky-400 mb-3.5 shadow-sm backdrop-blur-md animate-entrance-scale">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          <span className="tracking-wide uppercase font-mono">{badge}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.2] mb-3 animate-entrance-up delay-100">
          {title}{' '}
          {highlightedTitle && (
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500">
              {highlightedTitle}
            </span>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-3xl font-normal leading-relaxed mb-6 animate-entrance-up delay-200">
          {subtitle}
        </p>

        {/* Interactive Segmented Sub-Tabs Bar (if tabs provided) */}
        {tabs && tabs.length > 0 && onTabChange && (
          <div className="mt-6 pt-5 border-t border-slate-800/80 animate-entrance-up delay-300">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-none">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;

                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 active:scale-95 ${
                      isActive
                        ? 'bg-gradient-to-r from-sky-500/20 to-blue-600/20 text-white border border-sky-400/50 shadow-lg shadow-sky-500/10'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-850/80 border border-slate-800'
                    }`}
                  >
                    {Icon && (
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                    )}
                    <span>{tab.label}</span>
                    {tab.badge && (
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                        isActive 
                          ? 'bg-sky-400/20 text-sky-300 border border-sky-400/30' 
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
