import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener, Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Subscription} from 'rxjs';
import {finalize} from 'rxjs/operators';

import {JusticaNotificacao} from './justica-notificacao.model';
import {JusticaNotificacaoService} from './justica-notificacao.service';
import {Router} from '@angular/router';
import {JUSTICA_WINDOW, JusticaWindow} from '@justica/core';

@Component({
  selector: 'justica-notificacao',
  templateUrl: './justica-notificacao.component.html',
  styleUrls: ['./justica-notificacao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JusticaNotificacaoComponent implements OnInit, OnChanges, OnDestroy {
  @Input() notificacoes: JusticaNotificacao[] = [];
  @Input() carregando = false;
  @Input() ocorreuErro = false;

  overlayAberto = false;
  notificacoesOrdenadas: JusticaNotificacao[] = [];
  quantidadeNaoLidas = 0;
  carregandoProximaPagina = false;

  @ViewChild('listaNotificacoes')
  private readonly _listaNotificacoes?: ElementRef<HTMLElement>;

  private readonly _tamanhoPagina = 5;
  private readonly _recuoScrollAposCarregar = 96;
  private _paginaAtual = 0;
  private _ultimaPagina = true;
  private _pesquisaNotificacoesSubscription?: Subscription;
  private _quantidadeNaoLidasSubscription?: Subscription;
  private readonly _marcarComoLidasSubscription = new Subscription();

  constructor(
    private readonly _elementoRef: ElementRef<HTMLElement>,
    private readonly _detectorMudanca: ChangeDetectorRef,
    private readonly _justicaNotificacaoService: JusticaNotificacaoService,
    @Inject(JUSTICA_WINDOW)
    private readonly _window: JusticaWindow
  ) {}

  ngOnInit(): void {
    this.carregarQuantidadeNaoLidas();
  }

  ngOnChanges(alteracoes: SimpleChanges): void {
    if (alteracoes.notificacoes) {
      this.notificacoesOrdenadas = this.ordenarNotificacoesPorData(this.notificacoes);
    }
  }

  ngOnDestroy(): void {
    this._pesquisaNotificacoesSubscription?.unsubscribe();
    this._quantidadeNaoLidasSubscription?.unsubscribe();
    this._marcarComoLidasSubscription.unsubscribe();
  }

  get lazyLoadingDesabilitado(): boolean {
    return this.carregando || this.carregandoProximaPagina || this._ultimaPagina;
  }

  alternarOverlay(): void {
    if (this.overlayAberto) {
      this.fecharOverlay();
      return;
    }

    this.abrirOverlay();
  }

  abrirOverlay(): void {
    this.overlayAberto = true;
    this.reiniciarPesquisaNotificacoes();
  }

  fecharOverlay(): void {
    this.overlayAberto = false;
  }

  marcarTodasAsNotificacoesComoLidas(): void {
    const subscription = this._justicaNotificacaoService.marcarTodasComoLidas().subscribe(() => {
      this.atualizarTodasNotificacoesComoVisualizadas();
    });

    this._marcarComoLidasSubscription.add(subscription);
  }

  selecionarNotificacao(notificacao: JusticaNotificacao): void {
    if(!notificacao.visualizada) {
      this.marcarNotificacaoComoLida(notificacao);
    }

    if(notificacao.permiteRedirecionar || notificacao.urlRedirecionamento) {
      this._window.open(notificacao.urlRedirecionamento, '_blank');
    }
  }

  abrirDetalhamentoNotificacao(evento: MouseEvent, notificacao: JusticaNotificacao): void {
    evento.stopPropagation();
    this.marcarNotificacaoComoLida(notificacao);
  }

  irParaCentralNotificacoes(): void {
    this.fecharOverlay();
  }

  trackByNotificacao(indice: number, notificacao: JusticaNotificacao): number {
    return notificacao.seq;
  }

  @HostListener('document:click', ['$event'])
  fecharAoClicarFora(evento: MouseEvent): void {
    const clicouDentro = this._elementoRef.nativeElement.contains(evento.target as Node);

    if (!clicouDentro) {
      this.fecharOverlay();
    }
  }

  @HostListener('document:keydown.escape')
  fecharAoPressionarEscape(): void {
    this.fecharOverlay();
  }

  private ordenarNotificacoesPorData(notificacoes: JusticaNotificacao[]): JusticaNotificacao[] {
    return [...notificacoes].sort((primeiraNotificacao, segundaNotificacao) => {
      return (
        new Date(segundaNotificacao.dtHrNotificacao).getTime() -
        new Date(primeiraNotificacao.dtHrNotificacao).getTime()
      );
    });
  }

  private carregarQuantidadeNaoLidas(): void {
    this._quantidadeNaoLidasSubscription?.unsubscribe();
    this._quantidadeNaoLidasSubscription = this._justicaNotificacaoService
      .pesquisarQuantidadeNaoLidas()
      .subscribe((quantidadeNaoLidas) => {
        this.quantidadeNaoLidas = quantidadeNaoLidas;
        this._detectorMudanca.markForCheck();
      });
  }

  private marcarNotificacaoComoLida(notificacao: JusticaNotificacao): void {
    if (notificacao.visualizada) {
      return;
    }

    const subscription = this._justicaNotificacaoService
      .marcarComoLidas([notificacao.seq])
      .subscribe(() => {
        this.atualizarNotificacaoComoVisualizada(notificacao.seq);
      });

    this._marcarComoLidasSubscription.add(subscription);
  }

  private atualizarNotificacaoComoVisualizada(seqNotificacao: number): void {
    const notificacaoOriginal = this.notificacoes.find(
      (notificacao) => notificacao.seq === seqNotificacao
    );

    const estavaNaoVisualizada = notificacaoOriginal ? !notificacaoOriginal.visualizada : false;

    this.notificacoes = this.notificacoes.map((notificacao) => {
      if (notificacao.seq !== seqNotificacao) {
        return notificacao;
      }

      return {...notificacao, visualizada: true};
    });

    this.notificacoesOrdenadas = this.ordenarNotificacoesPorData(this.notificacoes);

    if (estavaNaoVisualizada) {
      this.quantidadeNaoLidas = Math.max(this.quantidadeNaoLidas - 1, 0);
    }

    this._detectorMudanca.markForCheck();
  }

  private atualizarTodasNotificacoesComoVisualizadas(): void {
    this.notificacoes = this.notificacoes.map((notificacao) => ({
      ...notificacao,
      visualizada: true
    }));
    this.notificacoesOrdenadas = this.ordenarNotificacoesPorData(this.notificacoes);
    this.quantidadeNaoLidas = 0;
    this._detectorMudanca.markForCheck();
  }

  private reiniciarPesquisaNotificacoes(): void {
    this._paginaAtual = 0;
    this._ultimaPagina = false;
    this.notificacoes = [];
    this.notificacoesOrdenadas = [];
    this.pesquisarNotificacoes(false);
  }

  carregarProximaPaginaNotificacoes(): void {
    if (this.carregando || this.carregandoProximaPagina || this._ultimaPagina) {
      return;
    }

    this.pesquisarNotificacoes(true);
  }

  private pesquisarNotificacoes(acumularResultado: boolean): void {
    this._pesquisaNotificacoesSubscription?.unsubscribe();
    this.carregando = !acumularResultado;
    this.carregandoProximaPagina = acumularResultado;
    this.ocorreuErro = false;

    const paginaPesquisa = this._paginaAtual;
    this._paginaAtual += 1;

    this._pesquisaNotificacoesSubscription = this._justicaNotificacaoService
      .pesquisarNotificacoes({page: paginaPesquisa, size: this._tamanhoPagina})
      .pipe(
        finalize(() => {
          this.carregando = false;
          this.carregandoProximaPagina = false;
          this._detectorMudanca.markForCheck();
        })
      )
      .subscribe(
        (paginaNotificacoes) => {
          this._ultimaPagina = paginaNotificacoes.last;
          this.notificacoes = acumularResultado
            ? [...this.notificacoes, ...paginaNotificacoes.content]
            : paginaNotificacoes.content;
          this.notificacoesOrdenadas = this.ordenarNotificacoesPorData(this.notificacoes);

          if (acumularResultado) {
            this.recuarScrollAposCarregarMais();
          }
        },
        () => {
          this.ocorreuErro = true;
          this.notificacoes = [];
          this.notificacoesOrdenadas = [];
        }
      );
  }

  private recuarScrollAposCarregarMais(): void {
    setTimeout(() => {
      const listaNotificacoes = this._listaNotificacoes?.nativeElement;

      if (!listaNotificacoes) {
        return;
      }

      listaNotificacoes.scrollTop = Math.max(
        listaNotificacoes.scrollTop - this._recuoScrollAposCarregar,
        0
      );
    });
  }
}
