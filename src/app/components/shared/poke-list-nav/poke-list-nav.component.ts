import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiResult } from 'src/app/models/ApiResult';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'poke-list-nav',
  templateUrl: './poke-list-nav.component.html',
  styleUrls: ['./poke-list-nav.component.scss']
})
export class PokeListNavComponent implements OnInit {
  @Output() public emitApiResult = new EventEmitter();

  public apiResult: ApiResult = {} as ApiResult;
  public firstUrl: string = '';
  public lastUrl: string = '';
  public currentPage: number = 0;
  public totalPages: number = 0;

  constructor(private pokeApiService: PokeApiService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.firstUrl = `${environment.apiURL}/?offset=0&limit=${environment.pageSize.toString()}`;
    this.load(this.firstUrl);
  }

  public load(url: string) {
    this.spinner.show();

    this.pokeApiService.getAllPokemons(url, environment.pageSize).subscribe(
      (response: ApiResult) => {
        this.apiResult = response;
        this.emitApiResult.emit(response);
        this.setPageParams(url, this.apiResult.count)
      }
    )
    .add(() => {
      this.spinner.hide();
    });
  }

  private setPageParams(url: string, count: number) {
    const apiUrl = new URL(url);
    const searchParams = apiUrl.searchParams;

    let offset = parseInt(searchParams.get('offset') ?? '0');
    let pageSize = environment.pageSize;
    let lastOffset = count - (count % pageSize);

    this.lastUrl = `${environment.apiURL}/?offset=${lastOffset}`;
    this.currentPage = (offset / pageSize) + 1;
    this.totalPages = Math.ceil(count / pageSize);
  }
}
