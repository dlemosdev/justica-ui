import {Inject, Injectable} from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, shareReplay } from 'rxjs/operators';
import {} from '@justica/core';
import {TJusticaMenu} from '../types';
import {JUSTICA_CORE_CONFIG, JusticaCoreConfig} from '@justica/core';
import {JUSTICA_UI_CONFIG, JusticaUiConfig} from '../../config/justica-ui.config';

@Injectable({
  providedIn: 'root'
})
export class GestaoService {
  readonly urlApi: string;
  readonly menu$: Observable<TJusticaMenu[]>;

  constructor(
    private readonly _http: HttpClient,
    @Inject(JUSTICA_UI_CONFIG)
    private readonly _uiConfig: JusticaUiConfig,
    @Inject(JUSTICA_CORE_CONFIG)
    private readonly _coreConfig: JusticaCoreConfig
  ) {
    this.urlApi = this._coreConfig.urlApi ?? '/api/';
    this.menu$ = this.carregarMenu().pipe(shareReplay(1));
  }

  private carregarMenu(): Observable<TJusticaMenu[]> {
    if (this._uiConfig.exibirMenu === false) {
      return of([]);
    }

    return this._http.get<TJusticaMenu[]>(`${this.urlApi}gestao/menu`).pipe(
      map((itens) => this.filtrarItensAtivosEVisiveis(itens)),
    );
  }

  private filtrarItensAtivosEVisiveis(itens: TJusticaMenu[]): TJusticaMenu[] {
    return itens
      .filter((item) => item.active === true && item.visible === true)
      .map((item) => ({
        ...item,
        items: item.items ? this.filtrarItensAtivosEVisiveis(item.items) : item.items
      }));
  }
}

