import { PokemonSprite } from "./PokemonSprite";
import { PokemonType } from "./PokemonType";

export interface PokemonDetail {
  id: number;
  types: Array<PokemonType>;
  sprites: PokemonSprite;
}
