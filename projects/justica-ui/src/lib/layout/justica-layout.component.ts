import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {JusticaSessaoMonitorService, JusticaUsuarioService} from '@justica/core/services';

import {JUSTICA_UI_CONFIG, JusticaUiConfig} from '../configs/justica-ui.config';

@Component({
  selector: 'justica-layout[nomeProjeto][versao]',
  templateUrl: './justica-layout.component.html',
  styleUrls: ['./justica-layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class JusticaLayoutComponent implements OnInit, OnDestroy {
  @Input() nomeProjeto!: string;
  @Input() versao!: string;

  readonly usuarioLogado: boolean = this._justicaUsuarioService.possuiUsuarioLogado() ?? false;

  constructor(
    @Inject(JUSTICA_UI_CONFIG)
    private readonly _config: JusticaUiConfig,
    private readonly _justicaSessaoMonitorService: JusticaSessaoMonitorService,
    private readonly _justicaUsuarioService: JusticaUsuarioService
  ) {}

  ngOnInit(): void {
    this._justicaSessaoMonitorService.iniciar();
  }

  ngOnDestroy(): void {
    this._justicaSessaoMonitorService.parar();
  }

  get exibirMenu(): boolean {
    return this._config.layout.exibirMenu ?? true;
  }
}
