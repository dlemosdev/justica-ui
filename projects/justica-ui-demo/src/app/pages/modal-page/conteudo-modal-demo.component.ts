import {Component} from '@angular/core';
import {JusticaModalService} from 'justica-ui';

@Component({
  selector: 'app-conteudo-modal-demo',
  template: `
    <div class="demo-box">
      Conteudo dinâmico da modal via service.
      <div class="acoes">
        <button type="button" class="btn-fechar" (click)="fechar()">Fechar</button>
      </div>
    </div>
  `,
  styles: [
    '.demo-box { padding: 12px; border: 1px dashed #b8c4d1; border-radius: 6px; }',
    '.acoes { margin-top: 12px; }',
    '.btn-fechar { border: 0; border-radius: 4px; background: #d32f2f; color: #fff; padding: 8px 12px; cursor: pointer; }'
  ]
})
export class ConteudoModalDemoComponent {
  constructor(private readonly _modalService: JusticaModalService) {}

  fechar(): void {
    this._modalService.fecharModal();
  }
}
