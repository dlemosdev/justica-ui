import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[justicaLazyLoading]'
})
export class JusticaLazyLoadingDirective {
  @Input() distanciaFinal = 48;
  @Input() desabilitado = false;

  @Output() carregarMais = new EventEmitter<void>();

  @HostListener('scroll', ['$event'])
  aoRolarElemento(evento: Event): void {
    if (this.desabilitado) {
      return;
    }

    const elementoRolagem = evento.target as HTMLElement;
    const distanciaAteFinal =
      elementoRolagem.scrollHeight - elementoRolagem.scrollTop - elementoRolagem.clientHeight;

    if (distanciaAteFinal <= this.distanciaFinal) {
      this.carregarMais.emit();
    }
  }
}
