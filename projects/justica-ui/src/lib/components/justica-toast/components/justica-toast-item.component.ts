import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

import {JusticaToast, JusticaToastTipo} from '../../../models/justica-toast.model';

const ICONES_POR_TIPO: Record<JusticaToastTipo, string> = {
  success: 'fa-solid fa-check',
  warning: 'fa-solid fa-triangle-exclamation',
  info: 'fa-solid fa-info',
  error: 'fa-solid fa-xmark'
};

@Component({
  selector: 'justica-toast-item',
  templateUrl: './justica-toast-item.component.html',
  styleUrls: ['./justica-toast-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JusticaToastItemComponent {
  @Input() toast?: JusticaToast;

  @Output() fechar = new EventEmitter<string>();

  get classeTipo(): string {
    return this.toast ? `justica-toast-item--${this.toast.tipo}` : '';
  }

  get icone(): string {
    return this.toast ? ICONES_POR_TIPO[this.toast.tipo] : ICONES_POR_TIPO.info;
  }

  fecharToast(): void {
    if (!this.toast) {
      return;
    }

    this.fechar.emit(this.toast.id);
  }
}
