import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Type
} from '@angular/core';
import {Subscription} from 'rxjs';

import {JusticaModalEstado, JusticaModalService} from './justica-modal.service';

@Component({
  selector: 'justica-modal',
  templateUrl: './justica-modal.component.html',
  styleUrls: ['./justica-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JusticaModalComponent implements OnInit, OnDestroy {
  @Input() titulo = '';
  @Input() fecharAoClicarFora = true;

  @Output() abriu = new EventEmitter<void>();
  @Output() fechou = new EventEmitter<void>();

  aberta = false;
  componenteDinamico?: Type<unknown>;
  injectorComponente: Injector;

  private _inscricao?: Subscription;

  constructor(
    private readonly _detectorMudanca: ChangeDetectorRef,
    private readonly _injector: Injector,
    @Optional() private readonly _service: JusticaModalService
  ) {
    this.injectorComponente = this._injector;
  }

  ngOnInit(): void {
    if (!this._service) {
      return;
    }

    this._inscricao = this._service.estado$.subscribe((estado) => this.aplicarEstado(estado));
  }

  ngOnDestroy(): void {
    this._inscricao?.unsubscribe();
  }

  abrir(): void {
    if (this.aberta) {
      return;
    }

    this.aberta = true;
    this.abriu.emit();
    this._detectorMudanca.markForCheck();
  }

  fechar(): void {
    if (!this.aberta) {
      return;
    }

    this.aberta = false;
    this.fechou.emit();
    this._detectorMudanca.markForCheck();
  }

  fecharPeloIcone(): void {
    this.fechar();
    this._service?.fecharModal();
  }

  aoClicarNoFundo(): void {
    if (!this.fecharAoClicarFora) {
      return;
    }

    this.fechar();
    this._service?.fecharModal();
  }

  private aplicarEstado(estado: JusticaModalEstado): void {
    this.titulo = estado.titulo ?? '';
    this.fecharAoClicarFora = estado.fecharAoClicarFora ?? true;
    this.componenteDinamico = estado.componente;

    if (estado.aberta) {
      this.abrir();
      return;
    }

    this.fechar();
  }
}
