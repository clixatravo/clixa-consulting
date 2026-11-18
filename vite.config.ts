import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

declare const process: { env: Record<string, string | undefined> };

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

// Routes réelles du routeur par hash (App.tsx : #/expertises, #/contact…).
const SECTIONS = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/#/expertises', priority: '0.9', changefreq: 'monthly' },
  { path: '/#/cas-clients', priority: '0.8', changefreq: 'monthly' },
  { path: '/#/secteurs', priority: '0.8', changefreq: 'monthly' },
  { path: '/facturation-electronique', priority: '0.9', changefreq: 'monthly' },
  { path: '/#/insights', priority: '0.7', changefreq: 'monthly' },
  { path: '/#/methode', priority: '0.7', changefreq: 'monthly' },
  { path: '/#/contact', priority: '0.7', changefreq: 'monthly' },
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

/**
 * Pages servies sur un vrai chemin. Google ignore ce qui suit le # : une
 * face accessible seulement par #/… n'apparaît jamais comme page distincte
 * dans les résultats. Pour chacune, on écrit au build un
 * <chemin>/index.html, copie de index.html avec son propre titre, sa
 * description et son adresse canonique. Vercel sert ce fichier avant la
 * réécriture SPA, et App.tsx affiche la face correspondant au chemin.
 */
const PAGES_INDEXEES = [
  {
    chemin: '/facturation-electronique',
    titre: 'Facturation électronique au Maroc 2026 : le guide | CLIXA Consulting',
    description:
      "Réforme DGI de la facturation électronique au Maroc : article 145 du CGI, calendrier 2026 par vagues, format XML, signature électronique, archivage et feuille de route pour se mettre en conformité.",
  },
]

const echapper = (texte: string) => texte.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const pagesIndexeesPlugin = (): Plugin => {
  let outDir = 'dist'
  return {
    name: 'clixa-pages-indexees',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const html = readFileSync(join(outDir, 'index.html'), 'utf8')
      for (const page of PAGES_INDEXEES) {
        const url = `${SITE_URL}${page.chemin}`
        const titre = echapper(page.titre)
        const description = echapper(page.description)
        const rendu = html
          .replace(/<title>[^<]*<\/title>/, `<title>${titre}</title>`)
          .replace(/(<meta name="description" content=")[^"]*"/, `$1${description}"`)
          .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`)
          .replace(/(<meta (?:property|name)="(?:og|twitter):url" content=")[^"]*"/g, `$1${url}"`)
          .replace(/(<meta (?:property|name)="(?:og|twitter):title" content=")[^"]*"/g, `$1${titre}"`)
          .replace(/(<meta (?:property|name)="(?:og|twitter):description" content=")[^"]*"/g, `$1${description}"`)
          .replace('<meta property="og:type" content="website" />', '<meta property="og:type" content="article" />')
        const dossier = join(outDir, page.chemin)
        mkdirSync(dossier, { recursive: true })
        writeFileSync(join(dossier, 'index.html'), rendu)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrlPlugin(), pagesIndexeesPlugin()],
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
