import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import {JusticaToast, JusticaToastConfig} from '../../models/justica-toast.model';

const DURACAO_PADRAO_MS = 5000;

@Injectable({providedIn: 'root'})
export class JusticaToastService {
  private readonly _toastsSubject = new BehaviorSubject<JusticaToast[]>([]);
  private readonly _timers = new Map<string, ReturnType<typeof setTimeout>>();
  private _sequencia = 0;

  readonly toasts$ = this._toastsSubject.asObservable();

  exibir(config: JusticaToastConfig): string {
    const toast = this.criarToast(config);
    const toasts = [...this._toastsSubject.value, toast];

    this._toastsSubject.next(toasts);
    this.agendarFechamentoAutomatico(toast);

    return toast.id;
  }

  fechar(id: string): void {
    this.limparTimer(id);
    this._toastsSubject.next(this._toastsSubject.value.filter((toast) => toast.id !== id));
  }

  limpar(): void {
    this._timers.forEach((timer) => clearTimeout(timer));
    this._timers.clear();
    this._toastsSubject.next([]);
  }

  private criarToast(config: JusticaToastConfig): JusticaToast {
    this._sequencia += 1;

    return {
      ...config,
      id: `justica-toast-${Date.now()}-${this._sequencia}`,
      criadoEm: Date.now(),
      tipo: config.tipo ?? 'info',
      duracaoMs: config.duracaoMs ?? DURACAO_PADRAO_MS,
      fecharManual: config.fecharManual ?? true,
      posicaoVertical: config.posicaoVertical ?? 'topo',
      posicaoHorizontal: config.posicaoHorizontal ?? 'direita'
    };
  }

  private agendarFechamentoAutomatico(toast: JusticaToast): void {
    if (toast.duracaoMs <= 0) {
      return;
    }

    const timer = setTimeout(() => this.fechar(toast.id), toast.duracaoMs);
    this._timers.set(toast.id, timer);
  }

  private limparTimer(id: string): void {
    const timer = this._timers.get(id);

    if (!timer) {
      return;
    }

    clearTimeout(timer);
    this._timers.delete(id);
  }
}
