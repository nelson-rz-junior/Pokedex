import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiResult } from 'src/app/models/ApiResult';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'poke-nav',
  templateUrl: './poke-nav.component.html',
  styleUrls: ['./poke-nav.component.scss']
})
export class PokeNavComponent implements OnInit {
  @Output() public sendData = new EventEmitter();
  public apiResult: ApiResult = {} as ApiResult;

  constructor(private pokeApiService: PokeApiService) { }

  ngOnInit(): void {
    this.load(`${environment.apiURL}/?offset=0&limit=100`);
  }

  public load(url: string) {
    this.pokeApiService.getAllPokemons(url).subscribe(
      res => {
        this.apiResult = res;
        this.sendData.emit(res);
      }
    );
  }
}
