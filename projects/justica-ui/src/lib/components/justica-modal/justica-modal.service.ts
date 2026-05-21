import {Injectable, Type} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface JusticaModalOpcoes {
  titulo?: string;
  fecharAoClicarFora?: boolean;
}

export interface JusticaModalEstado extends JusticaModalOpcoes {
  aberta: boolean;
  componente?: Type<unknown>;
}

const ESTADO_INICIAL: JusticaModalEstado = {
  aberta: false,
  titulo: '',
  fecharAoClicarFora: true
};

@Injectable()
export class JusticaModalService {
  private readonly _estadoSubject = new BehaviorSubject<JusticaModalEstado>(ESTADO_INICIAL);
  readonly estado$ = this._estadoSubject.asObservable();

  abrirModal(componente: Type<unknown>, opcoes?: JusticaModalOpcoes): void {
    this._estadoSubject.next({
      ...ESTADO_INICIAL,
      ...opcoes,
      aberta: true,
      componente
    });
  }

  fecharModal(): void {
    this._estadoSubject.next(ESTADO_INICIAL);
  }
}
