import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Adresse canonique du site.
 *
 *   1. SITE_URL — variable Vercel, prioritaire (changement de domaine)
 *   2. VERCEL_PROJECT_PRODUCTION_URL — domaine de production du projet
 *   3. VERCEL_URL — URL propre au déploiement, pour les préversions
 *   4. le domaine officiel, en dernier recours et en développement
 */
const DEFAULT_SITE_URL = 'https://www.clixaconseil.com'

const resolveSiteUrl = (): string => {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/+$/, '')
  if (process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  return DEFAULT_SITE_URL
}

const SITE_URL = resolveSiteUrl()

/** Les préversions ne doivent pas être indexées : elles feraient doublon
 *  avec la production dans l'index des moteurs. */
const IS_PRODUCTION_DEPLOY =
  !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production'

const SECTIONS = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/#expertises', priority: '0.9', changefreq: 'monthly' },
  { path: '/#secteurs', priority: '0.8', changefreq: 'monthly' },
  { path: '/#cas-clients', priority: '0.8', changefreq: 'monthly' },
  { path: '/#facturation', priority: '0.8', changefreq: 'monthly' },
  { path: '/#diagnostic', priority: '0.7', changefreq: 'monthly' },
  { path: '/#methode', priority: '0.7', changefreq: 'monthly' },
  { path: '/#faq', priority: '0.7', changefreq: 'monthly' },
]

/** Injecte l'adresse du site dans index.html et génère robots.txt et
 *  sitemap.xml à partir de cette même valeur, pour qu'ils ne divergent pas. */
const siteUrlPlugin = (): Plugin => ({
  name: 'clixa-site-url',
  transformIndexHtml: (html) =>
    html
      .replace(/%SITE_URL%/g, SITE_URL)
      .replace(/%ROBOTS%/g, IS_PRODUCTION_DEPLOY ? 'index, follow' : 'noindex, nofollow'),
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
    __SITE_URL__: JSON.stringify(SITE_URL),
  },
  build: {
    rollupOptions: {
      output: {
        // React change rarement : le garder à part permet au navigateur de le
        // conserver en cache d'un déploiement à l'autre.
        manualChunks: { react: ['react', 'react-dom'] },
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
