import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiResult } from 'src/app/models/ApiResult';
import { Pokemon } from 'src/app/models/Pokemon';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
  public apiResult: ApiResult = {} as ApiResult;

  constructor(private pokeApiService: PokeApiService,
    private router: Router) { }

    ngOnInit(): void {
    }

    public details(id: number): void {
      this.router.navigate([`/details/${id}`]);
    }

    public setResult(event: ApiResult) {
      this.apiResult = event;
    }

    public getImage(pokemon: Pokemon): string {
      return pokemon.details.sprites.other['official-artwork'].front_default
        ?? pokemon.details.sprites.front_default
        ?? pokemon.details.sprites.other.home.front_default;
    }
}
