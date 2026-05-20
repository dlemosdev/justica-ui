import {Component} from '@angular/core';
import {ConteudoModalDemoComponent} from './conteudo-modal-demo.component';
import {JusticaModalService} from 'justica-ui';

@Component({
  selector: 'app-modal-page',
  template: `
    <section>
      <h2>Modal</h2>
      <br/>
      <justica-button
        label="Exibir modal"
        icon="fa-solid fa-check"
        (click)="abrirModal()"
      ></justica-button>
    </section>
  `,
  styles: [
    'section {display: flex; align-items: center; justify-content: center; flex-direction: column;}'
  ]
})
export class ModalPageComponent {

  constructor(
    private readonly _modalService: JusticaModalService
  ) {}

  abrirModal(): void {
    this._modalService.abrirModal(ConteudoModalDemoComponent, {
      titulo: 'Justica Modal',
      fecharAoClicarFora: false
    });
  }
}
