import { PokemonDetail } from "./PokemonDetail";

export interface Pokemon {
  name: string;
  url: string;
  details: PokemonDetail;
}
