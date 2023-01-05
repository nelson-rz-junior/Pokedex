import { PokemonSprite } from "./PokemonSprite";
import { PokemonType } from "./PokemonType";
import { Species } from "./Species";
import { Stats } from "./Stats";

export interface PokemonDetail {
  id: number;
  name: string;
  species: Species;
  types: Array<PokemonType>;
  stats: Array<Stats>;
  sprites: PokemonSprite;
}
