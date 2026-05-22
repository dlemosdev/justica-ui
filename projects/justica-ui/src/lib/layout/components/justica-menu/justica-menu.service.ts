import {Component, Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, shareReplay} from 'rxjs/operators';
import {
  JUSTICA_CORE_CONFIG,
  JusticaCoreConfig, JusticaDialogRef,
  JusticaDialogService
} from '@justica/core';
import {JUSTICA_UI_CONFIG, JusticaUiConfig} from '../../../configs/justica-ui.config';
import {JusticaMenu} from '../../../models/justica-menu.model';

@Component({
  selector: 'app-botao-confirmar-dialog',
  template: `
    <justica-button type="button" label="OK" (click)="confirmar()" size="large"></justica-button>
  `
})
export class BotaoErroCarregarMenu {
  constructor(
    private readonly dialogRef: JusticaDialogRef
  ) {}

  confirmar(): void {
    this.dialogRef.fechar(true);
  }
}


@Injectable({
  providedIn: 'root'
})
export class JusticaMenuService {
  readonly urlApi: string;
  readonly menu$: Observable<JusticaMenu[]>;

  constructor(
    private readonly _http: HttpClient,
    private readonly _justicaDialogService: JusticaDialogService,
    @Inject(JUSTICA_UI_CONFIG)
    private readonly _uiConfig: JusticaUiConfig,
    @Inject(JUSTICA_CORE_CONFIG)
    private readonly _coreConfig: JusticaCoreConfig
  ) {
    this.urlApi = this._coreConfig.urlApi ?? '/api/';
    this.menu$ = this.carregarMenu().pipe(shareReplay(1));
  }

  private carregarMenu(): Observable<JusticaMenu[]> {
    if (this._uiConfig.exibirMenu === false) {
      return of([]);
    }

    return this._http.get<JusticaMenu[]>(`${this.urlApi}gestao/menu`).pipe(
      map((itens) => this.filtrarItensAtivosEVisiveis(itens)),
      catchError(() => {
        this._justicaDialogService.abrir({
          tipo: 'error',
          titulo: 'Erro ao carregar menu',
          mensagem: 'Não foi possível carregar as opções do menu. Tente novamente mais tarde.',
          tempoFechamentoAutomaticoMs: 2000,
          exibirConfirmar: true,
          componenteBotaoConfirmar: BotaoErroCarregarMenu
        });
        return of([]);
      })
    );
  }

  private filtrarItensAtivosEVisiveis(itens: JusticaMenu[]): JusticaMenu[] {
    return itens
      .filter((item) => item.active !== false && item.visible !== false)
      .map((item) => ({
        ...item,
        items: item.items ? this.filtrarItensAtivosEVisiveis(item.items) : item.items
      }));
  }
}
