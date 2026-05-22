import {ChangeDetectionStrategy, Component, Inject, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {
  JusticaAuthService,
  JusticaInatividadeUsuarioService,
  JusticaUsuarioService,
  JusticaSessaoMonitorService
} from '@justica/core/services';

import {JUSTICA_UI_CONFIG, JusticaUiConfig} from '../configs/justica-ui.config';
import {Subscription} from 'rxjs';

@Component({
  selector: 'justica-layout[nomeProjeto][versao]',
  templateUrl: './justica-layout.component.html',
  styleUrls: ['./justica-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class JusticaLayoutComponent implements OnInit {
  @Input() nomeProjeto !: string;
  @Input() versao!: string;

  readonly usuarioLogado: boolean;
  private readonly _subscription = new Subscription();

  constructor(
    @Inject(JUSTICA_UI_CONFIG)
    private readonly _config: JusticaUiConfig,
    private readonly _justicaAuthService: JusticaAuthService,
    private readonly _justicaSessaoMonitorService: JusticaSessaoMonitorService,
    private readonly _justicaUsuarioService: JusticaUsuarioService,
    private readonly _justicaInatividadeUsuarioService: JusticaInatividadeUsuarioService
  ) {
    this.usuarioLogado = this._justicaUsuarioService.obterUsuario() !== null;
  }

  ngOnInit(): void {
    this._justicaSessaoMonitorService.iniciarMonitoramento();
    this.iniciarMonitoramentoInatividadeUsuario();
  }

  ngOnDestroy(): void {
    this._justicaInatividadeUsuarioService.pararMonitoramento();
    this._subscription.unsubscribe();
  }

  get exibirMenu(): boolean {
    return this._config.exibirMenu ?? true;
  }

  private iniciarMonitoramentoInatividadeUsuario() {
    if (this.usuarioLogado) {
      this._justicaInatividadeUsuarioService.iniciarMonitoramento();
      this._subscription.add(
        this._justicaInatividadeUsuarioService.usuarioInativo$
          .subscribe(() => this._justicaAuthService.realizarLogout())
      );
    }
  }
}
