import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, shareReplay} from 'rxjs/operators';
import {JUSTICA_CORE_CONFIG, JusticaCoreConfig, JusticaDialogService} from '@justica/core';
import {JUSTICA_LAYOUT_CONFIG, JusticaLayoutConfig} from '../../justica-layout.config';
import {JusticaMenu} from '../../../models/justica-menu.model';
import {JusticaAuthService} from '@justica/core/services';

@Injectable({
  providedIn: 'root'
})
export class JusticaMenuService {
  readonly urlApi: string;
  readonly menu$: Observable<JusticaMenu[]>;

  constructor(
    private readonly _http: HttpClient,
    private readonly _justicaDialogService: JusticaDialogService,
    @Inject(JUSTICA_LAYOUT_CONFIG)
    private readonly _layoutConfig: JusticaLayoutConfig,
    @Inject(JUSTICA_CORE_CONFIG)
    private readonly _coreConfig: JusticaCoreConfig,
    private readonly _justicaAuthService: JusticaAuthService
  ) {
    this.urlApi = this._coreConfig.urlApi ?? '/api/';
    this.menu$ = this.carregarMenu().pipe(shareReplay(1));
  }

  private carregarMenu(): Observable<JusticaMenu[]> {
    if (this._layoutConfig.exibirMenu === false) {
      return of([]);
    }

    return this._http.get<JusticaMenu[]>(`${this.urlApi}gestao/menu`).pipe(
      map((itens) => this.filtrarItensAtivosEVisiveis(itens)),
      catchError(() => {
        this._justicaDialogService.erro(
          'Erro ao carregar menu',
          'Não foi possível carregar as opções do menu. Tente novamente mais tarde.'
        );
        return of([]);
      })
    );
  }

  private filtrarItensAtivosEVisiveis(itens: JusticaMenu[]): JusticaMenu[] {
    return itens
      .map((item) => this.filtrarItemMenu(item))
      .filter((item): item is JusticaMenu => item !== null);
  }

  private filtrarItemMenu(item: JusticaMenu): JusticaMenu | null {
    if (!item.active || !item.visible) {
      return null;
    }

    const filhosVisiveis = item.items
      ?.map((filho) => this.filtrarItemMenu(filho))
      .filter((filho): filho is JusticaMenu => !!filho);

    const possuiFilhos = !!item.items?.length;

    if (possuiFilhos && !filhosVisiveis?.length) {
      return null;
    }

    if (!possuiFilhos && !this.possuiPermissaoMenu(item)) {
      return null;
    }

    return {
      ...item,
      visible: true,
      ...(possuiFilhos ? {items: filhosVisiveis} : {})
    };
  }

  private possuiPermissaoMenu(item: JusticaMenu): boolean {
    return this._justicaAuthService.possuiPermisoes(item.roles, item.allRoles);
  }
}
