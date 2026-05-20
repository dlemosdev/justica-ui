import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';

export type JusticaButtonSeverity =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warn'
  | 'help'
  | 'danger'
  | 'contrast'
  | 'transparent';

export type JusticaButtonVariant = 'solid' | 'outlined' | 'text' | 'link';
export type JusticaButtonSize = 'small' | 'normal' | 'large';
export type JusticaButtonIconPos = 'left' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'justica-button',
  templateUrl: './justica-button.component.html',
  styleUrls: ['./justica-button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JusticaButtonComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() iconPos: JusticaButtonIconPos = 'left';
  @Input() severity: JusticaButtonSeverity = 'primary';
  @Input() variant: JusticaButtonVariant = 'solid';
  @Input() size: JusticaButtonSize = 'normal';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() rounded = false;
  @Input() fluid = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() aoClicar = new EventEmitter<Event>();

  get exibirIcone(): boolean {
    return !!this.icon || this.loading;
  }

  get iconeAtual(): string {
    return this.loading ? 'fa-solid fa-spinner fa-spin' : this.icon;
  }

  get modoIconOnly(): boolean {
    return this.exibirIcone && !this.label;
  }

  get classesBotao(): string[] {
    return [
      'justica-button__button',
      `justica-button--severity-${this.severity}`,
      `justica-button--variant-${this.variant}`,
      `justica-button--size-${this.size}`,
      `justica-button--icon-${this.iconPos}`,
      this.rounded ? 'justica-button--rounded' : '',
      this.fluid ? 'justica-button--fluid' : '',
      this.modoIconOnly ? 'justica-button--icon-only' : ''
    ].filter(Boolean);
  }

  executar(evento: Event): void {
    if (this.disabled || this.loading) {
      evento.preventDefault();
      return;
    }
    this.aoClicar.emit(evento);
  }
}
