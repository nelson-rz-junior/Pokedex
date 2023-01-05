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
  public getAllPokemons(url: string, pageSize: number): Observable<ApiResult> {
    url = this.setUrlParams(url, pageSize);

    return this.http.get<ApiResult>(url).pipe(
      take(1),
      tap(apiResult => {
        apiResult.results.map((pokemon: Pokemon) => {
          this.getPokemon<PokemonDetail>(pokemon.url).subscribe({
            next: itemResult => {
              pokemon.details = this.fillPokemonDetails(itemResult);
            }
          });
        });
      })
    );
  }

  public getPokemon<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(take(1));
  }

  private setUrlParams(url: string, pageSize: number): string {
    const apiUrl = new URL(url);
    const searchParams = apiUrl.searchParams;
    searchParams.set('limit', pageSize.toString());

    return apiUrl.toString();
  }

  private fillPokemonDetails(apiPokemonDetails: PokemonDetail): PokemonDetail {
    return {
      id: apiPokemonDetails.id,
      name: apiPokemonDetails.name,
      species: apiPokemonDetails.species,
      stats: apiPokemonDetails.stats,
      types: apiPokemonDetails.types,
      sprites: {
        front_default: apiPokemonDetails.sprites.front_default,
        other: {
          home: {
            front_default: apiPokemonDetails.sprites.other.home.front_default
          },
          'official-artwork': {
            front_default: apiPokemonDetails.sprites.other['official-artwork'].front_default
          }
        }
      }
    };
  }
}
