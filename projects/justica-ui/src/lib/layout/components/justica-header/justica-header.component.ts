import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {JusticaSidebarEstadoService} from '../../services';
import {JUSTICA_LOGO_STJ_DATA_URL} from '../../constants/justica-assets.const';
import {JusticaModalService} from '../../../components';
import {JusticaLogoutComponent} from './justica-logout/justica-logout.component';
import {JusticaUsuarioService} from '@justica/core/services';

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

  private _idTemporizador: ReturnType<typeof setInterval> | null = null;
  private readonly _destruir$ = new Subject<void>();
  readonly usuarioLogado: boolean = this._justicaUsuarioService.obterUsuario() !== null;

  constructor(
    private readonly _detectorMudanca: ChangeDetectorRef,
    private readonly _sidebarEstadoService: JusticaSidebarEstadoService,
    private readonly _modalService: JusticaModalService,
    private readonly _justicaUsuarioService: JusticaUsuarioService
  ) {}

  ngOnInit(): void {
    this.sidebarRecolhida = this._sidebarEstadoService.obterEstadoAtual();
    this._sidebarEstadoService.estadoRecolhido$
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

  aoAlternarLateral(): void {
    this._sidebarEstadoService.alternar();
  }

  abrirModalLogout(): void {
    this._modalService.abrirModal(JusticaLogoutComponent);
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
