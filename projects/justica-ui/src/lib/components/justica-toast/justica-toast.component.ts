import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {
  JusticaToast,
  JusticaToastPosicaoHorizontal,
  JusticaToastPosicaoVertical
} from '../../models/justica-toast.model';
import {JusticaToastService} from './justica-toast.service';

interface JusticaToastGrupo {
  posicaoVertical: JusticaToastPosicaoVertical;
  posicaoHorizontal: JusticaToastPosicaoHorizontal;
  toasts: JusticaToast[];
}

const POSICOES_VERTICAIS: JusticaToastPosicaoVertical[] = ['topo', 'centro', 'abaixo'];
const POSICOES_HORIZONTAIS: JusticaToastPosicaoHorizontal[] = ['esquerda', 'centro', 'direita'];

@Component({
  selector: 'justica-toast',
  templateUrl: './justica-toast.component.html',
  styleUrls: ['./justica-toast.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JusticaToastComponent {
  readonly grupos$: Observable<JusticaToastGrupo[]> = this._toastService.toasts$.pipe(
    map((toasts) => this.agruparPorPosicao(toasts))
  );

  constructor(private readonly _toastService: JusticaToastService) {}

  fechar(id: string): void {
    this._toastService.fechar(id);
  }

  trackByGrupo(_: number, grupo: JusticaToastGrupo): string {
    return `${grupo.posicaoVertical}-${grupo.posicaoHorizontal}`;
  }

  trackByToast(_: number, toast: JusticaToast): string {
    return toast.id;
  }

  classeGrupo(grupo: JusticaToastGrupo): string[] {
    return [
      'justica-toast',
      `justica-toast--${grupo.posicaoVertical}`,
      `justica-toast--${this.obterClasseHorizontal(grupo.posicaoHorizontal)}`
    ];
  }

  private agruparPorPosicao(toasts: JusticaToast[]): JusticaToastGrupo[] {
    const grupos: JusticaToastGrupo[] = [];

    POSICOES_VERTICAIS.forEach((posicaoVertical) => {
      POSICOES_HORIZONTAIS.forEach((posicaoHorizontal) => {
        const toastsDoGrupo = toasts.filter(
          (toast) =>
            toast.posicaoVertical === posicaoVertical &&
            toast.posicaoHorizontal === posicaoHorizontal
        );

        if (toastsDoGrupo.length) {
          grupos.push({posicaoVertical, posicaoHorizontal, toasts: toastsDoGrupo});
        }
      });
    });

    return grupos;
  }

  private obterClasseHorizontal(posicaoHorizontal: JusticaToastPosicaoHorizontal): string {
    return posicaoHorizontal === 'centro' ? 'centro-horizontal' : posicaoHorizontal;
  }
}
