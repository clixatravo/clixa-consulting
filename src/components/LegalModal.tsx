import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';
import { BRAND } from '../data/content';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'mentions' | 'privacy';
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, type }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              {type === 'mentions' ? <FileText className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {type === 'mentions' ? "Mentions Légales & Propriété Intellectuelle" : "Politique de Confidentialité & Données"}
              </h3>
              <p className="text-xs text-slate-400">CLIXA Consulting • clixaconseil.com</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {type === 'mentions' ? (
            <>
              <div>
                <h4 className="font-bold text-white mb-1">1. Éditeur de la Plateforme</h4>
                <p className="text-slate-400">
                  Le site <strong>clixaconseil.com</strong> est édité par le cabinet <strong>CLIXA Consulting</strong>, cabinet de conseil en management, organisation, systèmes d'information et intégration ERP.
                </p>
                <p className="text-slate-400 mt-1">
                  Implantations : Casablanca (Maroc) & Paris (France).<br />
                  Contact : <a href={`mailto:${BRAND.contactEmail}`} className="text-sky-400 hover:underline">{BRAND.contactEmail}</a> | Téléphone Maroc : {BRAND.phoneMarocDisplay} | Téléphone France : {BRAND.phoneFranceDisplay}.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">2. Hébergement & Infrastructure</h4>
                <p className="text-slate-400">
                  La plateforme est hébergée sur des infrastructures cloud haute disponibilité et sécurisées (Vercel Inc. / Protocoles SSL & TLS chiffrés).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">3. Propriété Intellectuelle</h4>
                <p className="text-slate-400">
                  L'ensemble des contenus, marques, logos, visuels et méthodologies présentés sur ce site sont la propriété exclusive de CLIXA Consulting. Toute reproduction ou utilisation non autorisée est strictement interdite sans accord préalable écrit.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-bold text-white mb-1">1. Respect de la Confidentialité & Déontologie</h4>
                <p className="text-slate-400">
                  CLIXA Consulting applique une politique de confidentialité stricte. Les échanges d'informations stratégiques, financières ou organisationnelles sont systématiquement couverts par le secret professionnel et la signature d'accords de non-divulgation (NDA).
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">2. Traitement des Données Personnelles (CNDP & RGPD)</h4>
                <p className="text-slate-400">
                  Conformément à la loi marocaine N° 09-08 (CNDP) et au Règlement Général sur la Protection des Données (RGPD en Europe), les informations recueillies via nos formulaires (nom, email, téléphone) sont strictement destinées au traitement de votre demande de cadrage et ne sont jamais cédées ni commercialisées à des tiers.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">3. Vos Droits d'Accès et de Rectification</h4>
                <p className="text-slate-400">
                  Vous disposez à tout moment d'un droit d'accès, de rectification et de suppression de vos données en écrivant simplement à : <strong className="text-white">{BRAND.contactEmail}</strong>.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
