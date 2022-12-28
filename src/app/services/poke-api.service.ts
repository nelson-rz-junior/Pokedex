import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { ApiResult } from '../models/ApiResult';
import { Pokemon } from '../models/Pokemon';
import { PokemonDetail } from '../models/PokemonDetail';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  constructor(private http: HttpClient) { }

  // The tap operator takes an input observable perform some action and returns the same input observable
  public getAllPokemons(url: string): Observable<ApiResult> {
    return this.http.get<ApiResult>(url).pipe(
      take(1),
      tap(apiResult => {
        apiResult.results.map((pokemon: Pokemon) => { // js map
          this.getPokemon(pokemon.url).subscribe(
            itemResult => {
              pokemon.details = {
                id: itemResult.id, types: itemResult.types, sprites: {
                  front_default: itemResult.sprites.front_default,
                  other: {
                    home: {
                      front_default: itemResult.sprites.other.home.front_default
                    },
                    'official-artwork': {
                      front_default: itemResult.sprites.other['official-artwork'].front_default
                    }
                  }
                }
              };
            }
          );
        });
      })
    );
  }

  public getPokemon(url: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(url).pipe(take(1));
  }
}
