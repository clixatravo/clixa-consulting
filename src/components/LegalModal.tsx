import React, { useEffect } from 'react';
import { X, Scale, ShieldCheck } from 'lucide-react';
import { BRAND, LEGAL, type LegalEntity } from '../data/content';

export type LegalTab = 'mentions' | 'confidentialite';

/** N'affiche la ligne que si la valeur est renseignée : mieux vaut ne rien
 *  publier qu'une mention légale approximative. */
const Line: React.FC<{ label: string; value: string | null | undefined }> = ({ label, value }) =>
  value ? (
    <div className="flex flex-col sm:flex-row sm:gap-2">
      <span className="text-slate-500 shrink-0 sm:w-52">{label}</span>
      <span className="text-slate-200">{value}</span>
    </div>
  ) : null;

const EntityBlock: React.FC<{ entity: LegalEntity }> = ({ entity }) => (
  <div className="space-y-1.5">
    <Line label="Dénomination sociale" value={entity.denomination} />
    <Line label="Forme juridique" value={entity.formeJuridique} />
    <Line label="Capital social" value={entity.capitalSocial} />
    <Line label="Siège social" value={entity.adresse} />
    {entity.identifiants.map((id) => (
      <Line key={id.label} label={id.label} value={id.value} />
    ))}
    <Line label="N° TVA intracommunautaire" value={entity.tvaIntracom} />
    <Line label="Directeur de la publication" value={entity.directeurPublication} />
  </div>
);

/** Champs obligatoires encore vides — l'alerte n'est visible qu'en développement. */
const missingFields = (e: LegalEntity): string[] => {
  const missing: string[] = [];
  if (!e.formeJuridique) missing.push('forme juridique');
  if (!e.adresse) missing.push('adresse du siège');
  if (!e.identifiants.length) missing.push('identifiants officiels (RC / ICE ou SIREN)');
  if (!e.directeurPublication) missing.push('directeur de la publication');
  return missing;
};



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
              {import.meta.env.DEV && missingFields(LEGAL.entitePrincipale).length > 0 && (
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/50 text-[11px] text-amber-300">
                  <strong className="block mb-1">Visible en développement uniquement</strong>
                  Mentions incomplètes — à renseigner dans <code>src/data/content.ts</code> (objet{' '}
                  <code>LEGAL</code>) : {missingFields(LEGAL.entitePrincipale).join(', ')}.
                </div>
              )}

              <Section title="Éditeur du site">
                <EntityBlock entity={LEGAL.entitePrincipale} />
                <p className="pt-1">
                  Email : {BRAND.contactEmail} — Téléphone Maroc : {BRAND.phoneMarocDisplay} —
                  Téléphone France : {BRAND.phoneFranceDisplay}.
                </p>
              </Section>

              {LEGAL.entiteSecondaire && (
                <Section title="Établissement secondaire">
                  <EntityBlock entity={LEGAL.entiteSecondaire} />
                </Section>
              )}

              <Section title="Activité">
                <p>
                  {BRAND.name} exerce une activité de conseil en organisation, transformation
                  digitale et performance : intégration d'ERP Odoo, assistance à maîtrise d'ouvrage
                  (AMOA), développement web, facturation électronique et pilotage financier.
                </p>
              </Section>

              <Section title="Hébergement">
                <p>
                  Le site est hébergé par <strong className="text-slate-200">Vercel Inc.</strong>,
                  340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com. Les
                  notifications de contact transitent par Resend (Plus Cinquante Inc.).
                </p>
              </Section>

              <Section title="Propriété intellectuelle">
                <p>
                  L'ensemble des éléments composant ce site — textes, visuels, photographies, logo,
                  charte graphique, méthodologies et architecture — est protégé par le droit
                  d'auteur et demeure la propriété exclusive de {BRAND.name} ou de ses ayants droit.
                </p>
                <p>
                  Toute reproduction, représentation, adaptation ou exploitation, totale ou
                  partielle, par quelque procédé que ce soit et sur quelque support que ce soit,
                  sans autorisation écrite préalable, est interdite et constitue une contrefaçon
                  sanctionnée par les articles L.335-2 et suivants du Code de la propriété
                  intellectuelle en France et par la loi 2-00 relative aux droits d'auteur au Maroc.
                </p>
              </Section>

              <Section title="Limitation de responsabilité">
                <p>
                  Les informations diffusées sur ce site sont fournies à titre indicatif et n'ont
                  aucune valeur contractuelle. Elles ne sauraient constituer un conseil personnalisé
                  en gestion, en fiscalité ou en investissement : seule une mission formalisée par
                  un contrat engage {BRAND.name}.
                </p>
                <p>
                  Les indicateurs de performance présentés dans les cas clients sont issus de
                  missions réelles et dépendent du contexte propre à chaque organisation ; ils ne
                  constituent pas une garantie de résultat. {BRAND.name} s'efforce d'assurer
                  l'exactitude et la mise à jour des informations publiées, sans pouvoir en garantir
                  l'exhaustivité, et décline toute responsabilité quant à l'usage qui en serait
                  fait.
                </p>
              </Section>

              <Section title="Liens externes">
                <p>
                  Ce site peut renvoyer vers des sites tiers (WhatsApp, réseaux sociaux, éditeurs
                  logiciels). {BRAND.name} n'exerce aucun contrôle sur leur contenu et ne saurait
                  être tenue responsable de leurs pratiques en matière de données personnelles.
                </p>
              </Section>

              <Section title="Droit applicable et litiges">
                <p>
                  Les présentes mentions sont soumises au droit marocain. Tout litige relatif à
                  l'utilisation du site relève de la compétence des tribunaux du lieu du siège
                  social, sauf disposition légale impérative contraire — notamment, pour les
                  consommateurs résidant dans l'Union européenne, les règles protectrices de leur
                  droit national.
                </p>
              </Section>

              <Section title="Signalement">
                <p>
                  Pour toute réclamation portant sur un contenu de ce site, écrivez à{' '}
                  {BRAND.contactEmail}. Nous nous engageons à répondre sous 15 jours ouvrés.
                </p>
              </Section>

              <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-800">
                Dernière mise à jour : {LEGAL.derniereMaJ}
              </p>
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
