import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {JusticaAppErro, JusticaLogErro} from '@justica/core/models';
import {JusticaModalService} from '../../../../components/justica-modal/justica-modal.service';
import {JusticaLogErroService} from '@justica/core/services';

interface JusticaLogErroDetalhe extends JusticaLogErro {
  readonly erro: JusticaAppErro | null;
}

@Component({
  selector: 'justica-log-erro',
  templateUrl: './justica-log-erro.component.html',
  styleUrls: ['./justica-log-erro.component.css'],
})
export class JusticaLogErroComponent implements OnInit {

  logs: JusticaLogErroDetalhe[] = [];
  readonly detalhesVisiveis: {[indice: number]: boolean} = {};

  constructor(
    private readonly _justicaLogErroService: JusticaLogErroService,
    private readonly _justicaModalService: JusticaModalService
  ) {}

  ngOnInit(): void {
    console.log('Carregando erros...', localStorage.getItem(`erros`));
    this.carregarErros();
  }

  carregarErros(): void {
    console.log('Carregando erros...', this._justicaLogErroService
      .listarErros());
    this.logs = this._justicaLogErroService
      .listarErros()
      .map((log) => ({
        ...log,
        erro: this.normalizarErro(log.erro)
      }));
  }

  mostrarDetalhe(indice: number): void {
    this.detalhesVisiveis[indice] = !this.detalhesVisiveis[indice];
  }

  exportar(): void {
    this._justicaLogErroService.exportarHtml('lista_erros.html', this.logs);
  }

  fecharLog(): void {
    this._justicaModalService.fecharModal();
  }

  obterClasseStatus(status?: number): string {
    return status && status >= 400 && status < 500
      ? 'justica-log-erro__status justica-log-erro__status--warn'
      : 'justica-log-erro__status justica-log-erro__status--erro';
  }

  obterDetalhe(erro: JusticaAppErro | null): string {
    if (!erro) {
      return '';
    }

    return erro.detail || erro.message || '';
  }

  private normalizarErro(erro: unknown): JusticaAppErro | null {
    return erro && typeof erro === 'object' ? (erro as JusticaAppErro) : null;
  }
}
