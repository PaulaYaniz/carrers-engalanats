// Carrers participants - Carrers Engalanats
// Dades estàtiques: no depenen de cap base de dades i no es poden modificar des de la web.

export interface Carrer {
  id: number;
  slug: string;
  nom: string;
  imatge: string;
  descripcio: string;
}

export const CARRERS: readonly Carrer[] = Object.freeze([
  { id: 1, slug: 'travesia-sant-roc', nom: 'C/ Travesia Sant Roc', imatge: '/images/streets/travesia-sant-roc.jpg', descripcio: 'Carrer tradicional del barri històric' },
  { id: 2, slug: 'joaquin-santo', nom: 'C/ Joaquín Santo', imatge: '/images/streets/joaquin-santo.jpg', descripcio: 'Un dels carrers més emblemàtics' },
  { id: 3, slug: 'venturo', nom: 'C/ Venturo', imatge: '/images/streets/venturo.jpg', descripcio: 'Carrer ple de tradició i color' },
  { id: 4, slug: 'fossar', nom: 'C/ Fossar', imatge: '/images/streets/fossar.jpg', descripcio: 'Carrer amb una gran participació veïnal' },
  { id: 5, slug: 'porta-xiquica', nom: 'C/ Porta Xiquica Sant Joan', imatge: '/images/streets/porta-xiquica.jpg', descripcio: 'Carrer històric amb un encant especial' },
  { id: 6, slug: 'filet-de-dins', nom: 'C/ Filet de Dins', imatge: '/images/streets/filet-de-dins.jpg', descripcio: 'Carrer conegut per les seues decoracions' },
].map((c) => Object.freeze(c)));
