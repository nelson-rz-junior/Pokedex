import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PokemonDetail } from 'src/app/models/PokemonDetail';
import { PokemonSpecies } from 'src/app/models/PokemonSpecies';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  private urlPokemon: string = `https://pokeapi.co/api/v2/pokemon`;
  public isLoading: boolean = false;
  public apiError: boolean = false;
  public pokemonDetail: PokemonDetail = {} as PokemonDetail;
  public pokemonSpecies: PokemonSpecies = {} as PokemonSpecies;

  constructor(private activatedRoute: ActivatedRoute,
    private pokeApiService: PokeApiService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getPokemon();
  }

  public getPokemon() {
    this.spinner.show();

    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.pokeApiService.getPokemon<PokemonDetail>(`${this.urlPokemon}/${id}`).subscribe({
      next: (responseDetail: PokemonDetail) => {
        this.pokemonDetail = responseDetail;
        this.pokeApiService.getPokemon<PokemonSpecies>(`${this.pokemonDetail.species.url}`).subscribe({
          next: (responseSpecies: PokemonSpecies) => {
            this.pokemonSpecies = responseSpecies;
            this.isLoading = true;
          },
          error: (error: any) => this.apiError = true
        });
      },
      error: (error: any) => this.apiError = true
    })
    .add(() => this.spinner.hide());
  }

  public getImage(pokemonDetail: PokemonDetail): string {
    return pokemonDetail.sprites.other['official-artwork'].front_default
      ?? pokemonDetail.sprites.front_default
      ?? pokemonDetail.sprites.other.home.front_default;
  }
}
