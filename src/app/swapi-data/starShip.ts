/**
 * Mocks vaisseaux
 */
export interface StarShip {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: Date;
  crew: string;
  edited: Date;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  films: string[];
  pilots: any[];
  starship_class: string;
  url: string;
}

/**
 * Mocks reponse requete de recherche
 */
export interface StarShipsResponse {
  count: number;
  next: string;
  previous: string;
  results: StarShip[];
}
