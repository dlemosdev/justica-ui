import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {JusticaSidebarEstadoService} from './justica-sidebar-estado.service';
import {JUSTICA_PROFILE_BG_DATA_URL} from '../../constants/justica-assets.const';
import {JusticaUsuarioService} from '@justica/core/services';
import {StringUtils} from '@justica/core/utils';

@Component({
  selector: 'justica-sidebar',
  templateUrl: './justica-sidebar.component.html',
  styleUrls: ['./justica-sidebar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JusticaSidebarComponent implements OnInit, OnDestroy {
  private readonly _destruir$ = new Subject<void>();

  lateralRecolhida = true;
  imagemFundoSecao = `url('${JUSTICA_PROFILE_BG_DATA_URL}')`;
  nomeUsuario = '';
  localUsuario = '';

  constructor(
    private readonly _sidebarEstadoService: JusticaSidebarEstadoService,
    private readonly _justicaUsuarioService: JusticaUsuarioService,
    private readonly _detectorMudanca: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.preencherInfoUsuarioLogado();
    this.lateralRecolhida = this._sidebarEstadoService.obterEstadoAtual();
    this._sidebarEstadoService.estadoRecolhido$
      .pipe(takeUntil(this._destruir$))
      .subscribe((recolhida) => {
        this.lateralRecolhida = recolhida;
        this._detectorMudanca.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._destruir$.next();
    this._destruir$.complete();
  }

  private preencherInfoUsuarioLogado(): void {
    const usuarioLogado = this._justicaUsuarioService.obterUsuario();
    if (usuarioLogado) {
      this.nomeUsuario = StringUtils.capitalizar(usuarioLogado.nomeUsuario);
      this.localUsuario = StringUtils.capitalizar(usuarioLogado.nomeLocal);
    }
  }
}
