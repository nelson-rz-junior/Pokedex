import { Pokemon } from "./Pokemon";

export interface ApiResult {
  count: number;
  next: string;
  previous: string;
  results: Array<Pokemon>;
}
