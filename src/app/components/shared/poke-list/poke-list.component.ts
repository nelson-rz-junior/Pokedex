import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent implements OnInit {
  public allPokemons: any;

  constructor(private pokeApiService: PokeApiService,
    private router: Router) { }

  ngOnInit(): void {
    this.pokeApiService.getAllPokemons().subscribe(
      res => {
        this.allPokemons = res.results;
      }
    );
  }

  public details(id: number): void {
    this.router.navigate([`/details/${id}`]);
  }
}
