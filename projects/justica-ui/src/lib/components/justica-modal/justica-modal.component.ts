import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Subscription} from 'rxjs';

import {JusticaModalEstado, JusticaModalService} from './justica-modal.service';

interface JusticaModalComponenteComFechar {
  fechar?: EventEmitter<void>;
}

@Component({
  selector: 'justica-modal',
  templateUrl: './justica-modal.component.html',
  styleUrls: ['./justica-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JusticaModalComponent implements OnInit, OnDestroy {
  @Input() titulo = '';
  @Input() fecharAoClicarFora = true;
  @Input() largura = 'min(25rem, 90vw)';

  @Output() abriu = new EventEmitter<void>();
  @Output() fechou = new EventEmitter<void>();

  aberta = false;
  componenteDinamico?: Type<unknown>;
  injectorComponente: Injector;

  @ViewChild('conteudoDinamico', {read: ViewContainerRef})
  private readonly _conteudoDinamico?: ViewContainerRef;

  private _inscricao?: Subscription;
  private _inscricaoFecharComponente?: Subscription;
  private _componenteRef?: ComponentRef<unknown>;

  constructor(
    private readonly _detectorMudanca: ChangeDetectorRef,
    private readonly _componentFactoryResolver: ComponentFactoryResolver,
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
    this.limparComponenteDinamico();
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
    this.limparComponenteDinamico();
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
    this.largura = estado.largura ?? 'min(25rem, 90vw)';
    this.componenteDinamico = estado.componente;

    if (estado.aberta) {
      this.abrir();
      this._detectorMudanca.detectChanges();
      this.carregarComponenteDinamico();
      return;
    }

    this.fechar();
  }

  private carregarComponenteDinamico(): void {
    this.limparComponenteDinamico();

    if (!this.componenteDinamico || !this._conteudoDinamico) {
      return;
    }

    const componentFactory = this._componentFactoryResolver.resolveComponentFactory(
      this.componenteDinamico
    );
    this._componenteRef = this._conteudoDinamico.createComponent(
      componentFactory,
      undefined,
      this.injectorComponente
    );

    const instancia = this._componenteRef.instance as JusticaModalComponenteComFechar;
    if (instancia.fechar) {
      this._inscricaoFecharComponente = instancia.fechar.subscribe(() => this._service?.fecharModal());
    }

    this._componenteRef.changeDetectorRef.detectChanges();
  }

  private limparComponenteDinamico(): void {
    this._inscricaoFecharComponente?.unsubscribe();
    this._inscricaoFecharComponente = undefined;
    this._componenteRef?.destroy();
    this._componenteRef = undefined;
    this._conteudoDinamico?.clear();
  }
}
