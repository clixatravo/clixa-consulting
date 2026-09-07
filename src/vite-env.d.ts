/// <reference types="vite/client" />

/** Adresse canonique du site, injectée au build par vite.config.ts.
 *  Voir `resolveSiteUrl` : SITE_URL, sinon le domaine Vercel, sinon localhost. */
declare const __SITE_URL__: string;
