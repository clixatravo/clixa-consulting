/**
 * Chargement conditionnel du Meta Pixel.
 *
 * Le pixel était auparavant injecté en dur dans index.html : il traçait donc
 * tous les visiteurs avant tout consentement, ce qui n'est pas conforme au
 * RGPD (site adressant la France) ni à la loi 09-08 au Maroc.
 * Il n'est désormais chargé qu'après acceptation explicite.
 */

export const META_PIXEL_ID = '2474370913070557';
export const CONSENT_KEY = 'clixa-consent-v1';

export type ConsentValue = 'granted' | 'denied';

export const getStoredConsent = (): ConsentValue | null => {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
};

export const storeConsent = (value: ConsentValue) => {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* mode privé : le choix ne sera pas mémorisé, on ne bloque pas la page */
  }
};

let pixelLoaded = false;

export const loadMetaPixel = () => {
  if (pixelLoaded || typeof window === 'undefined') return;
  pixelLoaded = true;

  const w = window as unknown as Record<string, any>;
  if (w.fbq) return;

  const n: any = (w.fbq = function (...args: unknown[]) {
    n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
  });
  if (!w._fbq) w._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  n('init', META_PIXEL_ID);
  n('track', 'PageView');
};

/** Suivi d'une conversion (lead), uniquement si le consentement est accordé. */
export const trackLead = (topic?: string) => {
  const w = window as unknown as Record<string, any>;
  if (typeof w.fbq === 'function') {
    w.fbq('track', 'Lead', topic ? { content_name: topic } : undefined);
  }
};
