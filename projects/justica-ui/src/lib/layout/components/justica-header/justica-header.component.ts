import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {JusticaSidebarEstadoService} from '../justica-sidebar/justica-sidebar-estado.service';
import {JUSTICA_LOGO_STJ_DATA_URL} from '../../constants/justica-assets.const';
import {
  JusticaAuthService,
  JusticaInatividadeUsuarioService,
  JusticaUsuarioService
} from '@justica/core/services';
import {JUSTICA_UI_CONFIG, JusticaUiConfig} from '../../../configs';
import {JusticaDialogService} from '@justica/core';

@Component({
  selector: 'justica-header[nomeProjeto][versao]',
  templateUrl: './justica-header.component.html',
  styleUrls: ['./justica-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JusticaHeaderComponent implements OnInit, OnDestroy {
  @Input() nomeProjeto!: string;
  @Input() versao!: string;

  sidebarRecolhida = true;
  dataHoraBrasilia = '';
  logoStjDataUrl = JUSTICA_LOGO_STJ_DATA_URL;
  readonly tempoRestanteMonitoramentoUsuario$: Observable<string>;

  private _idTemporizador: ReturnType<typeof setInterval> | null = null;
  private readonly _destruir$ = new Subject<void>();
  readonly usuarioLogado: boolean = this._justicaUsuarioService.obterUsuario() !== null;

  constructor(
    @Inject(JUSTICA_UI_CONFIG)
    private readonly _config: JusticaUiConfig,
    private readonly _detectorMudanca: ChangeDetectorRef,
    private readonly _justicaSidebarEstadoService: JusticaSidebarEstadoService,
    private readonly _justicaDialogService: JusticaDialogService,
    private readonly _justicaAuthService: JusticaAuthService,
    private readonly _justicaUsuarioService: JusticaUsuarioService,
    private readonly _justicaInatividadeUsuarioService: JusticaInatividadeUsuarioService
  ) {
    this.tempoRestanteMonitoramentoUsuario$ =
      this._justicaInatividadeUsuarioService.tempoRestanteMonitoramentoUsuario$;
  }

  ngOnInit(): void {
    this.sidebarRecolhida = this._justicaSidebarEstadoService.obterEstadoAtual();
    this._justicaSidebarEstadoService.estadoRecolhido$
      .pipe(takeUntil(this._destruir$))
      .subscribe((recolhida) => {
        this.sidebarRecolhida = recolhida;
        this._detectorMudanca.markForCheck();
      });

    this.atualizarDataHoraBrasilia();
    this._idTemporizador = setInterval(() => this.atualizarDataHoraBrasilia(), 1000);
  }

  ngOnDestroy(): void {
    if (this._idTemporizador) {
      clearInterval(this._idTemporizador);
      this._idTemporizador = null;
    }

    this._destruir$.next();
    this._destruir$.complete();
  }

  get exibirTempoSessao(): boolean {
    return this._config.exibirTempoSessao ?? true;
  }

  aoAlternarLateral(): void {
    this._justicaSidebarEstadoService.alternar();
  }

  aoClicaLogout(): void {
    this._justicaDialogService
      .confirmar('Atenção!', 'Deseja realmente sair do Sistema Justiça?')
      .afterClosed()
      .subscribe((confirmado) => {
        if (confirmado) {
          this._justicaAuthService.realizarLogout();
        }
      });
  }

  private atualizarDataHoraBrasilia(): void {
    const agora = new Date();

    const data = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'America/Sao_Paulo'
    }).format(agora);

    const hora = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/Sao_Paulo'
    }).format(agora);

    this.dataHoraBrasilia = `${data} ${hora}`;
    this._detectorMudanca.markForCheck();
  }
}
