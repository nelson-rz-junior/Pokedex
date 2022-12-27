import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private baseApi: string = `${environment.apiURL}/?offset=0&limit=100`;

  constructor(private http: HttpClient) { }

  // The tap operator takes an input observable perform some action and returns the same input observable
  public getAllPokemons(): Observable<any> {
    return this.http.get<any>(this.baseApi).pipe(
      take(1),
      tap(allPokemons => {
        allPokemons.results.map((pokemon: any) => { // js map
          this.getPokemon(pokemon.url).subscribe(
            itemResult => pokemon.details = itemResult
          );
        });
      })
    );
  }

  public getPokemon(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(take(1));
  }
}
