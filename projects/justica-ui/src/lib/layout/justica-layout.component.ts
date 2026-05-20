import {ChangeDetectionStrategy, Component, Inject, Input, ViewEncapsulation} from '@angular/core';
import {JUSTICA_UI_CONFIG, JusticaUiConfig} from '../config/justica-ui.config';
import {JusticaUsuarioService} from '@justica/core/services';

@Component({
  selector: 'justica-layout[nomeProjeto][versao]',
  templateUrl: './justica-layout.component.html',
  styleUrls: ['./justica-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class JusticaLayoutComponent {
  @Input() nomeProjeto = 'Layout';
  @Input() versao = '1.0.0';

  readonly usuarioLogado: boolean;

  constructor(
    @Inject(JUSTICA_UI_CONFIG)
    private readonly _config: JusticaUiConfig,
    private readonly _justicaUsuarioService: JusticaUsuarioService
  ) {
    this.usuarioLogado = this._justicaUsuarioService.obterUsuario() !== null;
  }

  get exibirMenu(): boolean {
    return this._config.exibirMenu ?? true;
  }

}
