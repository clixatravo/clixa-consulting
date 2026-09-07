import React from 'react';

interface State {
  hasError: boolean;
}

/**
 * Filet de sécurité : si un composant lève une exception en production,
 * le visiteur voit un écran de repli avec les coordonnées directes
 * au lieu d'une page blanche (perte de lead garantie).
 */
export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('CLIXA — erreur de rendu :', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-5">
          <h1 className="text-2xl font-bold text-white">Une erreur est survenue</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Nous rencontrons un incident technique momentané. Vous pouvez recharger la page ou nous
            contacter directement — nos consultants restent joignables.
          </p>
          <div className="text-sm space-y-1">
            <div>
              <a href="mailto:contact@clixa.ma" className="text-sky-400 hover:text-sky-300">
                contact@clixa.ma
              </a>
            </div>
            <div className="text-slate-300 font-mono">+212 6 61 34 40 54</div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-bold transition-colors cursor-pointer"
          >
            Recharger la page
          </button>
        </div>
      </div>
    );
  }
}
