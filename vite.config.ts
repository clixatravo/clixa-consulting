import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Adresse canonique du site.
 *
 * Aucun domaine n'est écrit en dur : la valeur vient de l'environnement de
 * build, dans cet ordre de priorité.
 *
 *   1. SITE_URL — à définir dans Vercel le jour où un domaine propre est
 *      branché (ex. https://www.clixa.ma). C'est le seul réglage à changer.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — fourni automatiquement par Vercel,
 *      c'est le domaine de production du projet (…vercel.app).
 *   3. VERCEL_URL — l'URL propre au déploiement, utilisée pour les preview.
 *   4. localhost, en développement.
 */
const resolveSiteUrl = (): string => {
  const explicit = process.env.SITE_URL
  if (explicit) return explicit.replace(/\/+$/, '')

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
  if (vercelHost) return `https://${vercelHost}`

  return 'http://localhost:5173'
}

const SITE_URL = resolveSiteUrl()

/** Les déploiements de préversion ne doivent pas être indexés : ils feraient
 *  doublon avec le site de production aux yeux des moteurs. */
const IS_PRODUCTION_DEPLOY =
  !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production'

const SECTIONS = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/#expertises', priority: '0.9', changefreq: 'monthly' },
  { path: '/#cas-clients', priority: '0.8', changefreq: 'monthly' },
  { path: '/#facturation', priority: '0.8', changefreq: 'monthly' },
  { path: '/#diagnostic', priority: '0.7', changefreq: 'monthly' },
  { path: '/#methode', priority: '0.7', changefreq: 'monthly' },
  { path: '/#faq', priority: '0.7', changefreq: 'monthly' },
]

/** Injecte l'adresse du site dans index.html et génère robots.txt + sitemap.xml
 *  avec ce même domaine, pour qu'ils ne puissent jamais diverger. */
const siteUrlPlugin = (): Plugin => ({
  name: 'clixa-site-url',
  transformIndexHtml: (html) =>
    html
      .replace(/%SITE_URL%/g, SITE_URL)
      .replace(
        /%ROBOTS%/g,
        IS_PRODUCTION_DEPLOY ? 'index, follow' : 'noindex, nofollow'
      ),
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: IS_PRODUCTION_DEPLOY
        ? [
            'User-agent: *',
            'Allow: /',
            '',
            '# Point de terminaison interne, sans intérêt pour l’indexation',
            'Disallow: /api/',
            '',
            `Sitemap: ${SITE_URL}/sitemap.xml`,
            '',
          ].join('\n')
        : ['# Déploiement de préversion — ne pas indexer', 'User-agent: *', 'Disallow: /', ''].join('\n'),
    })

    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source:
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
        SECTIONS.map(
          (s) =>
            `  <url>\n    <loc>${SITE_URL}${s.path}</loc>\n` +
            `    <changefreq>${s.changefreq}</changefreq>\n` +
            `    <priority>${s.priority}</priority>\n  </url>`
        ).join('\n') +
        '\n</urlset>\n',
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrlPlugin()],
  define: {
    // Exposé au code applicatif (lien du pied de page, etc.)
    __SITE_URL__: JSON.stringify(SITE_URL),
  },
  build: {
    rollupOptions: {
      output: {
        // React change rarement : le sortir du bundle applicatif permet au
        // navigateur de le garder en cache d'une mise en ligne a l'autre.
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true
  },
  preview: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: true
  }
})
