import React, { useEffect } from 'react';
import { X, Scale, ShieldCheck } from 'lucide-react';
import { BRAND } from '../data/content';

export type LegalTab = 'mentions' | 'confidentialite';

interface LegalModalProps {
  isOpen: boolean;
  tab: LegalTab;
  onChangeTab: (tab: LegalTab) => void;
  onClose: () => void;
}

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="space-y-1.5">
    <h4 className="text-sm font-bold text-white">{title}</h4>
    <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">{children}</div>
  </div>
);

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, tab, onChangeTab, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm" />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="clixa-legal-title"
        className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden my-4 sm:my-8 z-10 animate-in fade-in zoom-in-95"
      >
        <div className="px-5 sm:px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <h3 id="clixa-legal-title" className="text-base sm:text-lg font-bold text-white">
            Informations légales
          </h3>
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 p-1.5 bg-slate-950/90 border-b border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => onChangeTab('mentions')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all cursor-pointer ${
              tab === 'mentions' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Mentions légales</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeTab('confidentialite')}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all cursor-pointer ${
              tab === 'confidentialite' ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Confidentialité (RGPD)</span>
          </button>
        </div>

        <div className="p-5 sm:p-7 space-y-5 max-h-[65vh] overflow-y-auto">
          {tab === 'mentions' ? (
            <>
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/50 text-[11px] text-amber-300">
                À compléter par CLIXA : forme juridique, capital social, RC / ICE (Maroc) ou SIREN
                (France), adresse complète du siège et nom du directeur de la publication.
              </div>

              <Section title="Éditeur du site">
                <p>
                  {BRAND.name} — cabinet de conseil en transformation, digitalisation et performance.
                  <br />
                  Bureaux : {BRAND.addressMaroc} et {BRAND.addressFrance}.
                  <br />
                  Email : {BRAND.contactEmail} — Tél. Maroc : {BRAND.phoneMarocDisplay} — Tél. France :{' '}
                  {BRAND.phoneFranceDisplay}.
                </p>
              </Section>

              <Section title="Hébergement">
                <p>
                  Site hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis —
                  vercel.com
                </p>
              </Section>

              <Section title="Propriété intellectuelle">
                <p>
                  L'ensemble des contenus de ce site (textes, visuels, logo, méthodologies,
                  architecture) est la propriété exclusive de {BRAND.name}. Toute reproduction ou
                  représentation, totale ou partielle, sans autorisation écrite préalable est
                  interdite.
                </p>
              </Section>

              <Section title="Responsabilité">
                <p>
                  Les informations publiées sont fournies à titre indicatif et n'ont pas valeur
                  d'engagement contractuel. Les indicateurs de performance présentés dans les cas
                  clients sont issus de missions réelles et varient selon les contextes.
                </p>
              </Section>
            </>
          ) : (
            <>
              <Section title="Responsable du traitement">
                <p>
                  {BRAND.name} — {BRAND.contactEmail}. Pour toute question relative à vos données :
                  écrivez à cette adresse.
                </p>
              </Section>

              <Section title="Données collectées">
                <p>
                  Via le formulaire de contact et la prise de rendez-vous : nom, prénom, entreprise,
                  email professionnel, numéro de téléphone, thématique de projet et message. Ces
                  données sont fournies volontairement par vous.
                </p>
              </Section>

              <Section title="Finalité et base légale">
                <p>
                  Vos données servent uniquement à répondre à votre demande et à préparer un éventuel
                  échange commercial. La base légale est votre consentement, ainsi que l'exécution de
                  mesures précontractuelles prises à votre demande (art. 6.1.a et 6.1.b du RGPD).
                </p>
              </Section>

              <Section title="Destinataires et sous-traitants">
                <p>
                  Vos données sont accessibles aux seuls consultants de CLIXA. Elles transitent par
                  nos prestataires techniques : Vercel (hébergement) et Resend (acheminement des
                  emails). Aucune donnée n'est vendue ni cédée à des tiers à des fins commerciales.
                </p>
              </Section>

              <Section title="Durée de conservation">
                <p>
                  Les demandes sans suite sont conservées 12 mois. Les données liées à une relation
                  contractuelle sont conservées pendant la durée de la mission, puis archivées selon
                  les obligations légales et comptables applicables.
                </p>
              </Section>

              <Section title="Cookies et mesure d'audience">
                <p>
                  Le site ne dépose aucun cookie de suivi tant que vous ne l'avez pas explicitement
                  accepté via le bandeau de consentement. Le seul outil concerné est le Meta Pixel
                  (mesure de performance des campagnes). Vous pouvez retirer votre consentement à
                  tout moment en effaçant les données du site dans votre navigateur.
                </p>
              </Section>

              <Section title="Vos droits">
                <p>
                  Conformément au RGPD et à la loi marocaine 09-08, vous disposez d'un droit d'accès,
                  de rectification, d'effacement, de limitation, d'opposition et de portabilité de vos
                  données. Exercez-les à l'adresse {BRAND.contactEmail}. Vous pouvez également saisir
                  la CNIL (France) ou la CNDP (Maroc).
                </p>
              </Section>
            </>
          )}
        </div>

        <div className="px-5 sm:px-6 py-4 border-t border-slate-800 bg-slate-950/70 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
