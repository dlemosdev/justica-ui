import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {JUSTICA_CORE_CONFIG, JusticaCoreConfig, JusticaDialogService} from '@justica/core';

import {
  JusticaMarcarNotificacoesComoLidasPayload,
  JusticaNotificacaoPagina,
  JusticaNotificacaoPesquisaParametros,
  JusticaQuantidadeNotificacoesNaoLidas
} from './justica-notificacao.model';

@Injectable({
  providedIn: 'root'
})
export class JusticaNotificacaoService {
  readonly urlApi: string;

  constructor(
    private readonly _http: HttpClient,
    private readonly _justicaDialogService: JusticaDialogService,
    @Inject(JUSTICA_CORE_CONFIG)
    private readonly _coreConfig: JusticaCoreConfig
  ) {
    this.urlApi = this._coreConfig.urlApi ?? '/api/';
  }

  pesquisarNotificacoes(
    parametros: JusticaNotificacaoPesquisaParametros = {}
  ): Observable<JusticaNotificacaoPagina> {
    const parametrosHttp = new HttpParams()
      .set('page', String(parametros.page ?? 0))
      .set('size', String(parametros.size ?? 5));

    return this._http
      .get<JusticaNotificacaoPagina>(this.montarUrl('v2/notificacao/pesquisar'), {
        params: parametrosHttp
      })
      .pipe(
        catchError(() => {
          this._justicaDialogService.erro(
            'Erro ao carregar notificações',
            'Não foi possível carregar as notificações. Tente novamente mais tarde.'
          );

          return of(this.criarPaginaVazia(parametros));
        })
      );
  }

  pesquisarQuantidadeNaoLidas(): Observable<number> {
    return this._http
      .get<JusticaQuantidadeNotificacoesNaoLidas>(this.montarUrl('v2/notificacao/qtd-nao-lidas'))
      .pipe(
        catchError(() => {
          return of({qtdNotificacoesNaoLidas: 0});
        }),
        map((retorno) => retorno.qtdNotificacoesNaoLidas)
      );
  }

  marcarComoLidas(seqNotificacoes: number[]): Observable<void> {
    const payload: JusticaMarcarNotificacoesComoLidasPayload = {seqNotificacoes};

    return this._http.put<void>(this.montarUrl('v2/notificacao/marcar-como-lidas'), payload);
  }

  marcarTodasComoLidas(): Observable<void> {
    const payload: JusticaMarcarNotificacoesComoLidasPayload = {marcarTodas: true};

    return this._http.put<void>(this.montarUrl('v2/notificacao/marcar-como-lidas'), payload);
  }

  private montarUrl(caminho: string): string {
    return `${this.urlApi.replace(/\/$/, '')}/${caminho.replace(/^\//, '')}`;
  }

  private criarPaginaVazia(
    parametros: JusticaNotificacaoPesquisaParametros
  ): JusticaNotificacaoPagina {
    const tamanhoPagina = parametros.size ?? 5;
    const numeroPagina = parametros.page ?? 0;

    return {
      content: [],
      totalElements: 0,
      totalPages: 0,
      size: tamanhoPagina,
      number: numeroPagina,
      first: numeroPagina === 0,
      last: true
    };
  }
}
