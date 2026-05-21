import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JusticaSidebarEstadoService {
  private readonly _estadoRecolhidoSubject = new BehaviorSubject<boolean>(true);

  readonly estadoRecolhido$: Observable<boolean> = this._estadoRecolhidoSubject.asObservable();

  obterEstadoAtual(): boolean {
    return this._estadoRecolhidoSubject.getValue();
  }

  alternar(): void {
    this._estadoRecolhidoSubject.next(!this._estadoRecolhidoSubject.getValue());
  }

  recolher(): void {
    if (!this._estadoRecolhidoSubject.getValue()) {
      this._estadoRecolhidoSubject.next(true);
    }
  }
}
