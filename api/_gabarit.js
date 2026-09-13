/**
 * Gabarit du courriel « nouvelle demande » reçu par l'équipe.
 *
 * Préfixé d'un « _ » : Vercel n'en fait pas une route, c'est un module partagé
 * par api/contact.js.
 *
 * Même construction que les courriels de clixa.africa (tableaux imbriqués,
 * styles en ligne, largeur 600 px) : c'est ce que Gmail, Outlook et Apple Mail
 * rendent tous de la même façon. Les couleurs sont celles du site et du logo :
 * fond slate, accent sky.
 */

const BRAND = {
  nom: 'CLIXA Consulting',
  site: 'https://www.clixaconseil.com',
  siteAffiche: 'www.clixaconseil.com',
  email: 'contact@clixaconseil.com',
  telMaroc: '+212 6 61 34 40 54',
  telMarocLien: 'tel:+212661344054',
  telFrance: '+33 7 53 97 01 86',
  telFranceLien: 'tel:+33753970186',
  // PNG et non SVG : Gmail et Outlook n'affichent pas le SVG dans un courriel.
  // Servi par le site (public/email/), donc en ligne dès le déploiement.
  logo: 'https://www.clixaconseil.com/email/logo-clixa.png',
};

const MAX_LEN = 4000;

/**
 * Échapper avant d'écrire dans le HTML.
 *
 * Tout ce qui est interpolé ici vient du formulaire public. Sans échappement,
 * n'importe qui glisserait un lien ou un bloc dans un message que l'équipe
 * ouvre en confiance, parce qu'il vient de son propre site.
 *
 * Ne s'applique qu'au HTML : le sujet et la version texte ne sont pas rendus.
 */
export const esc = (value) =>
  String(value ?? '')
    .slice(0, MAX_LEN)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const dateReception = (date) =>
  new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Africa/Casablanca',
  }).format(date);

/**
 * Numéro WhatsApp à partir de ce que le visiteur a tapé, ou null.
 *
 * Seuls les numéros internationaux (+… ou 00…) donnent un lien : « 06 61… »
 * peut être marocain comme français, et un lien vers le mauvais pays ouvrirait
 * une conversation avec un inconnu.
 */
const numeroWhatsapp = (phone) => {
  const brut = String(phone ?? '').trim();
  const chiffres = brut.replace(/[^0-9]/g, '');
  if (brut.startsWith('+') && chiffres.length >= 8) return chiffres;
  if (chiffres.startsWith('00') && chiffres.length >= 10) return chiffres.slice(2);
  return null;
};

const ligne = (libelle, valeurHtml) => `
                <tr>
                  <td valign="top" class="libelle" style="padding: 7px 0; width: 120px; font-size: 13px; color: #94a3b8;">${libelle}</td>
                  <td valign="top" style="padding: 7px 0; font-size: 14px; color: #ffffff; word-break: break-word;">${valeurHtml}</td>
                </tr>`;

/**
 * @param {{ name: string, email: string, company: string, phone?: string,
 *           topic?: string, message?: string }} demande
 * @param {Date} [recuLe]
 * @returns {{ subject: string, html: string, text: string }}
 */
export function courrielDemande(demande, recuLe = new Date()) {
  const name = String(demande.name ?? '').slice(0, 120);
  const company = String(demande.company ?? '').slice(0, 120);
  const email = String(demande.email ?? '').slice(0, 200);
  const phone = String(demande.phone ?? '').slice(0, 40);
  const topic = String(demande.topic ?? '').slice(0, 160) || 'Demande';
  const message = String(demande.message ?? '').slice(0, MAX_LEN);
  const recu = dateReception(recuLe);
  const whatsapp = numeroWhatsapp(phone);

  const subject = `[Site] ${topic} — ${name} (${company})`;

  const repondre =
    `mailto:${email}?subject=` +
    encodeURIComponent(`Re : votre demande — ${topic}`) +
    '&body=' +
    encodeURIComponent(`Bonjour ${name},\n\n`);

  const telephoneHtml = phone
    ? `<a href="tel:${esc(phone.replace(/[^0-9+]/g, ''))}" style="color: #ffffff; text-decoration: none;">${esc(phone)}</a>` +
      (whatsapp
        ? ` &nbsp;<a href="https://wa.me/${whatsapp}" style="color: #34d399; font-weight: bold; text-decoration: none;">WhatsApp ↗</a>`
        : '')
    : '<span style="color: #64748b;">Non renseigné</span>';

  const messageHtml = message.trim()
    ? esc(message).replace(/\n/g, '<br>')
    : '<span style="color: #64748b;">Aucun message.</span>';

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <title>Nouvelle demande — ${esc(name)}</title>
  <!-- Téléphone : moins de marge, pas de badge, boutons empilés. Les clients
       qui ignorent <style> gardent la mise en page desktop, qui reste lisible. -->
  <style>
    @media only screen and (max-width: 520px) {
      .enveloppe { padding: 12px 8px !important; }
      .marge { padding-left: 20px !important; padding-right: 20px !important; }
      .badge { display: none !important; }
      .bouton { display: block !important; width: 100% !important; }
      .espace { display: none !important; }
      .bouton + .espace + .bouton { margin-top: 10px !important; }
      .bouton a { display: block !important; text-align: center !important; }
      .libelle { width: 92px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #020617; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #e2e8f0;">
  <!-- Aperçu affiché par la boîte mail à côté du sujet -->
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${esc(company)} · ${esc(topic)} — à recontacter sous 24 h ouvrées.</div>

  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#020617" class="enveloppe" style="background-color: #020617; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#0f172a" style="max-width: 600px; background-color: #0f172a; border-radius: 14px; border: 1px solid #1e293b; overflow: hidden;">

          <!-- En-tête -->
          <tr>
            <td bgcolor="#030712" class="marge" style="background-color: #030712; border-bottom: 2px solid #0ea5e9; padding: 26px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="44" height="44" valign="middle" style="width: 44px; height: 44px;">
                          <a href="${BRAND.site}" style="text-decoration: none;">
                            <img src="${BRAND.logo}" width="44" height="44" alt="CLIXA" style="display: block; width: 44px; height: 44px; border: 0; outline: none; font-size: 12px; font-weight: bold; color: #38bdf8;">
                          </a>
                        </td>
                        <td style="padding-left: 14px;">
                          <div style="font-size: 19px; font-weight: 800; letter-spacing: 0.06em; color: #ffffff;">
                            CLIXA <span style="font-size: 11px; font-weight: 600; letter-spacing: 0.14em; color: #94a3b8;">CONSULTING</span>
                          </div>
                          <div style="font-size: 10px; font-family: 'SF Mono', Menlo, Consolas, monospace; letter-spacing: 0.12em; text-transform: uppercase; color: #38bdf8; margin-top: 3px;">
                            Transformer · Structurer · Performer
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle" class="badge">
                    <span style="display: inline-block; background-color: #082f49; border: 1px solid #0369a1; border-radius: 999px; padding: 4px 11px; font-family: 'SF Mono', Menlo, monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: #7dd3fc; font-weight: bold; white-space: nowrap;">
                      Demande de devis
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Corps -->
          <tr>
            <td class="marge" style="padding: 34px 32px 10px 32px;">
              <h1 style="margin: 0 0 6px 0; font-size: 24px; font-weight: 800; color: #ffffff; line-height: 1.3;">
                Nouvelle demande reçue
              </h1>
              <div style="font-size: 13px; color: #94a3b8; margin-bottom: 24px; line-height: 1.5;">
                ${esc(recu)} · depuis le formulaire de ${BRAND.siteAffiche}
              </div>

              <!-- Projet -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 16px;">
                <tr>
                  <td bgcolor="#082f49" style="background-color: #082f49; border: 1px solid #075985; border-radius: 10px; padding: 14px 18px;">
                    <div style="font-size: 10px; font-family: 'SF Mono', Menlo, monospace; letter-spacing: 0.12em; text-transform: uppercase; color: #7dd3fc; margin-bottom: 4px;">Projet</div>
                    <div style="font-size: 17px; font-weight: bold; color: #ffffff; line-height: 1.4;">${esc(topic)}</div>
                  </td>
                </tr>
              </table>

              <!-- Coordonnées -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#111c33" style="background-color: #111c33; border-radius: 10px; margin-bottom: 16px;">
                <tr>
                  <td style="padding: 10px 18px;">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">${ligne(
                      'Nom',
                      `<strong>${esc(name)}</strong>`,
                    )}${ligne('Entreprise', `<strong style="color: #7dd3fc;">${esc(company)}</strong>`)}${ligne(
                      'Email',
                      `<a href="mailto:${esc(email)}" style="color: #38bdf8; text-decoration: none;">${esc(email)}</a>`,
                    )}${ligne('Téléphone', telephoneHtml)}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
                <tr>
                  <td bgcolor="#0b1220" style="background-color: #0b1220; border-left: 3px solid #0ea5e9; border-radius: 0 10px 10px 0; padding: 16px 18px;">
                    <div style="font-size: 10px; font-family: 'SF Mono', Menlo, monospace; letter-spacing: 0.12em; text-transform: uppercase; color: #7dd3fc; margin-bottom: 8px;">Message</div>
                    <div style="font-size: 15px; line-height: 1.65; color: #e2e8f0; word-break: break-word;">${messageHtml}</div>
                  </td>
                </tr>
              </table>

              <!-- À faire -->
              <!-- Le visiteur lit « réponse sous 24h ouvrées » sur l'écran de confirmation :
                   c'est ce délai que l'équipe doit tenir. -->
              <p style="margin: 0 0 8px 0; padding: 14px 16px; background-color: #1c1606; border-left: 3px solid #fbbf24; font-size: 14px; line-height: 1.6; color: #fef3c7;">
                <strong style="color: #fde68a;">À faire : répondre sous 24 h ouvrées.</strong>
                C'est le délai annoncé à ${esc(name)} sur la confirmation d'envoi.
                « Répondre » depuis votre boîte écrit directement à ${esc(email)}.
              </p>

              <!-- Actions -->
              <table border="0" cellspacing="0" cellpadding="0" align="center" class="bouton" style="margin: 26px auto 22px auto;">
                <tr>
                  <td align="center" bgcolor="#0ea5e9" class="bouton" style="background-color: #0ea5e9; border-radius: 8px;">
                    <a href="${esc(repondre)}" style="display: inline-block; padding: 14px 26px; font-size: 14px; font-weight: bold; color: #ffffff; text-decoration: none;">
                      Répondre à ${esc(name.split(' ')[0] || name)} &rarr;
                    </a>
                  </td>${
                    whatsapp
                      ? `
                  <td width="10" class="espace"></td>
                  <td align="center" class="bouton" style="border: 1px solid #10b981; border-radius: 8px;">
                    <a href="https://wa.me/${whatsapp}" style="display: inline-block; padding: 13px 22px; font-size: 14px; font-weight: bold; color: #34d399; text-decoration: none;">
                      WhatsApp
                    </a>
                  </td>`
                      : ''
                  }
                </tr>
              </table>
            </td>
          </tr>

          <!-- Signature & canaux -->
          <tr>
            <td bgcolor="#0b1220" class="marge" style="background-color: #0b1220; border-top: 1px solid #1e293b; padding: 26px 32px;">
              <div style="font-size: 11px; font-family: 'SF Mono', Menlo, monospace; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.1em; font-weight: bold; margin-bottom: 12px;">
                ✦ ${BRAND.nom}
              </div>
              <div style="font-size: 13px; color: #cbd5e1; line-height: 1.9;">
                <div><strong>Maroc :</strong> <a href="${BRAND.telMarocLien}" style="color: #7dd3fc; text-decoration: none;">${BRAND.telMaroc}</a></div>
                <div><strong>France :</strong> <a href="${BRAND.telFranceLien}" style="color: #7dd3fc; text-decoration: none;">${BRAND.telFrance}</a></div>
                <div><strong>Email :</strong> <a href="mailto:${BRAND.email}" style="color: #7dd3fc; text-decoration: none;">${BRAND.email}</a></div>
                <div><strong>Site :</strong> <a href="${BRAND.site}" style="color: #7dd3fc; text-decoration: none;">${BRAND.siteAffiche}</a></div>
              </div>
              <div style="border-top: 1px dashed #1e293b; margin-top: 14px; padding-top: 12px; font-size: 11px; color: #94a3b8;">
                <span style="color: #7dd3fc; font-weight: bold;">Présence :</span> Casablanca · Paris · Interventions Maroc, France &amp; International
              </div>
            </td>
          </tr>

          <!-- Pied de page -->
          <tr>
            <td bgcolor="#030712" class="marge" style="background-color: #030712; padding: 18px 32px; text-align: center; font-size: 11px; color: #64748b; line-height: 1.5;">
              Notification interne envoyée par le formulaire de ${BRAND.siteAffiche}.<br>
              Les coordonnées ci-dessus ont été saisies par le visiteur et ne sont pas vérifiées.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    `Nouvelle demande reçue — ${recu}`,
    '',
    `Projet : ${topic}`,
    `Nom : ${name}`,
    `Entreprise : ${company}`,
    `Email : ${email}`,
    `Téléphone : ${phone || 'non renseigné'}`,
    '',
    'Message :',
    message.trim() || '—',
    '',
    'À FAIRE : répondre sous 24 h ouvrées (délai annoncé au visiteur).',
    `« Répondre » écrit directement à ${email}.`,
    '',
    `— ${BRAND.nom} · ${BRAND.siteAffiche}`,
  ].join('\n');

  return { subject, html, text };
}
