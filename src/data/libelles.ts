/**
 * Libellés affichés des filtres.
 *
 * Les valeurs internes des filtres restent en anglais ('All', 'Morocco'…)
 * parce que les données des faces les utilisent telles quelles ; seul
 * l'affichage passe en français, le site n'ayant pas de version anglaise.
 */
const LIBELLES: Record<string, string> = {
  All: 'Tous',
  Morocco: 'Maroc',
  Global: 'International',
  Regulatory: 'Réglementaire',
  Whitepaper: 'Livre blanc',
  Technology: 'Technologie',
  EN: 'Anglais',
  FR: 'Français',
};

export const libelle = (valeur: string): string => LIBELLES[valeur] ?? valeur;
