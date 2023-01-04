import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { ApiResult } from 'src/app/models/ApiResult';
import { Pokemon } from 'src/app/models/Pokemon';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
  public query: string = '';
  public searchApiResult: ApiResult = {} as ApiResult;
  public termSearchChanged: Subject<string> = new Subject<string>();
  private allApiResult: ApiResult = {} as ApiResult;
  private pagedApiResult: ApiResult = {} as ApiResult;

  constructor(private pokeApiService: PokeApiService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
      this.spinner.show();

      let url = `${environment.apiURL}/?offset=0&limit=10000`;
      this.pokeApiService.getAllPokemons(url, 10000).subscribe(
        (response: ApiResult) => {
          this.allApiResult = response;
        }
      )
      .add(() => this.spinner.hide());
    }

    public details(id: number): void {
      this.router.navigate([`/details/${id}`]);
    }

    public setApiResult(event: ApiResult) {
      this.pagedApiResult = event;
      this.searchApiResult.count = this.pagedApiResult.count;
      this.searchApiResult.previous = this.pagedApiResult.previous;
      this.searchApiResult.next = this.pagedApiResult.next;
      this.searchApiResult.results = this.pagedApiResult.results;
    }

    public getImage(pokemon: Pokemon): string {
      return pokemon.details.sprites.other['official-artwork'].front_default
        ?? pokemon.details.sprites.front_default
        ?? pokemon.details.sprites.other.home.front_default;
    }

    public getSearch(value: string) {
      if (!this.termSearchChanged.observed) {
        this.termSearchChanged.pipe(debounceTime(1000))
          .subscribe((filterBy) => {
            if (filterBy === null || filterBy === '') {
              this.query = '';
              this.searchApiResult.results = this.pagedApiResult.results;
            }
            else {
              this.query = value;
              this.searchApiResult.results = this.allApiResult.results.filter((res: Pokemon) => {
                return res.name.indexOf(filterBy) > -1;
              });
            }
          });
      }

      this.termSearchChanged.next(value);
    }
}
