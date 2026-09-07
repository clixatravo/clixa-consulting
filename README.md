# CLIXA Consulting — Site vitrine

Site officiel de CLIXA Consulting (conseil, transformation & performance).
React 18 + TypeScript + Vite 6 + Tailwind CSS 4, déployé sur Vercel.

## Démarrage

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + build de production dans dist/
npm run preview  # prévisualisation du build
```

## Réception des demandes de contact (IMPORTANT)

Le formulaire « Demande de Devis par Email » envoie les leads via la fonction
serverless [`api/contact.js`](api/contact.js). **Sans configuration, aucun email
n'est envoyé par le serveur** : le site bascule alors automatiquement sur un
`mailto:` pré-rempli, mais l'expérience est nettement dégradée.

Pour l'activer, créez un compte sur [resend.com](https://resend.com) (gratuit
jusqu'à 3 000 emails/mois), vérifiez le domaine `clixa.ma`, puis ajoutez ces
variables dans **Vercel → Settings → Environment Variables** :

| Variable         | Exemple                          | Rôle                                   |
| ---------------- | -------------------------------- | -------------------------------------- |
| `RESEND_API_KEY` | `re_xxxxxxxx`                    | Clé API Resend (obligatoire)           |
| `CONTACT_TO`     | `contact@clixa.ma`               | Boîte qui reçoit les leads             |
| `CONTACT_FROM`   | `CLIXA Site <site@clixa.ma>`     | Expéditeur (domaine vérifié chez Resend) |

Redéployez après ajout pour que les variables soient prises en compte.

## Conformité RGPD

Le Meta Pixel n'est **jamais** chargé avant le consentement explicite du
visiteur (bandeau `CookieConsent`). Le choix est mémorisé dans `localStorage`
sous la clé `clixa-consent-v1`. Le suivi de conversion `Lead` ne se déclenche
que si le consentement a été accordé.

Les mentions légales et la politique de confidentialité sont accessibles
depuis le pied de page. **À compléter par CLIXA** dans
[`src/components/LegalModal.tsx`](src/components/LegalModal.tsx) : forme
juridique, capital, RC/ICE (Maroc) ou SIREN (France), adresse du siège et
directeur de la publication.

## Domaine du site

Aucun domaine n'est écrit en dur. L'adresse canonique est résolue au build
par `vite.config.ts`, dans cet ordre :

1. `SITE_URL` — variable d'environnement Vercel, à définir **uniquement** le
   jour où un domaine propre est branché (ex. `https://www.clixa.ma`) ;
2. `VERCEL_PROJECT_PRODUCTION_URL` — fourni automatiquement par Vercel, c'est
   le domaine `.vercel.app` du projet. **C'est le mode actuel : rien à faire.**
3. `VERCEL_URL` pour les préversions, `http://localhost:5173` en local.

Cette valeur alimente d'un seul coup le lien canonique, les balises Open Graph
et Twitter, les données structurées, le lien du pied de page, `robots.txt` et
`sitemap.xml` — ces deux derniers étant générés au build, ils ne peuvent pas
diverger du reste.

Pour brancher un domaine plus tard : ajoutez le domaine dans Vercel, puis la
variable `SITE_URL`, et redéployez. Aucune modification de code.

## SEO

- `robots.txt` et `sitemap.xml` générés au build avec le bon domaine
- Les déploiements de préversion sont en `noindex, nofollow` et bloqués dans
  `robots.txt`, afin de ne pas faire doublon avec la production
- Données structurées Schema.org `ProfessionalService` + `FAQPage`
- Open Graph / Twitter Card en URL absolue (aperçus WhatsApp & LinkedIn)

## Structure

```
api/contact.js              Fonction serverless d'envoi des leads
vite.config.ts              Résolution du domaine + génération robots/sitemap
src/components/             Sections de la page + modales
src/data/content.ts         Tout le contenu éditorial (textes, offres, FAQ, cas clients)
src/lib/analytics.ts        Chargement conditionnel du Meta Pixel
public/images/              Visuels (JPEG + WebP)
automation/                 Bot WhatsApp & workflows n8n (hors site web)
```

Le contenu éditorial se modifie dans `src/data/content.ts` — pas besoin de
toucher aux composants.
