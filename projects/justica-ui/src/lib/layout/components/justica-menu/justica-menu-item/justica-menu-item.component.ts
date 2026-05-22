import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnChanges} from '@angular/core';
import {JusticaMenu} from '../../../../models/justica-menu.model';

interface ItemMenuView extends JusticaMenu {
  hrefResolvido: string;
  itensFilhos: ItemMenuView[];
  temFilhos: boolean;
}

@Component({
  selector: 'justica-menu-item',
  templateUrl: './justica-menu-item.component.html',
  styleUrls: ['./justica-menu-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JusticaMenuItemComponent implements OnChanges {
  @Input() itemMenu: JusticaMenu | null = null;

  descricao = '';
  href = '#';
  icone: string | null = null;
  itensSubmenu: ItemMenuView[] = [];
  possuiSubmenu = false;

  submenuAberto = false;
  indiceFilhoAberto: number | null = null;

  constructor(
    private readonly _host: ElementRef<HTMLElement>,
    private readonly _detectorMudanca: ChangeDetectorRef
  ) {}

  ngOnChanges(): void {
    this.atualizarDadosDoItem();
  }

  alternarSubmenu(evento: Event): void {
    if (!this.possuiSubmenu) {
      return;
    }

    evento.preventDefault();
    evento.stopPropagation();
    this.submenuAberto = !this.submenuAberto;
    if (!this.submenuAberto) {
      this.indiceFilhoAberto = null;
    }
  }

  alternarSubmenuFilho(evento: Event, indice: number): void {
    evento.preventDefault();
    evento.stopPropagation();
    this.indiceFilhoAberto = this.indiceFilhoAberto === indice ? null : indice;
  }

  fecharTudo(): void {
    if (!this.submenuAberto && this.indiceFilhoAberto === null) {
      return;
    }

    this.submenuAberto = false;
    this.indiceFilhoAberto = null;
    this._detectorMudanca.detectChanges();
  }

  private atualizarDadosDoItem(): void {
    this.descricao = this.itemMenu?.label ?? '';
    this.icone = this.itemMenu?.icon ?? null;
    this.href = this.resolverHref(this.itemMenu);

    const itens = this.itemMenu?.items ?? [];
    this.itensSubmenu = this.normalizarItens(itens);
    this.possuiSubmenu = this.itensSubmenu.length > 0;

    if (!this.possuiSubmenu) {
      this.submenuAberto = false;
      this.indiceFilhoAberto = null;
    }
  }

  private normalizarItens(itens: JusticaMenu[]): ItemMenuView[] {
    return itens
      .filter((item) => item.visible !== false && item.active !== false && !!item.label)
      .map((item) => {
        const itensFilhos = this.normalizarItens(item.items ?? []);
        return {
          ...item,
          hrefResolvido: this.resolverHref(item),
          itensFilhos,
          temFilhos: itensFilhos.length > 0
        };
      });
  }

  private resolverHref(item: JusticaMenu | null | undefined): string {
    if (!item) {
      return '#';
    }

    const modulo = item.module ?? '';
    const rota = item.route ?? '';
    const combinado = `${modulo}${rota}`.trim();
    return combinado || item.href || '#';
  }

  private cliqueFoiDentroDoComponente(evento: MouseEvent | PointerEvent): boolean {
    const caminho = evento.composedPath?.();
    if (caminho && caminho.includes(this._host.nativeElement)) {
      return true;
    }

    const alvo = evento.target as Node | null;
    return !!alvo && this._host.nativeElement.contains(alvo);
  }

  @HostListener('document:click', ['$event'])
  aoClicarNoDocumento(evento: MouseEvent): void {
    if (!this.cliqueFoiDentroDoComponente(evento)) {
      this.fecharTudo();
    }
  }

  @HostListener('document:pointerdown', ['$event'])
  aoPressionarPonteiroNoDocumento(evento: PointerEvent): void {
    if (!this.cliqueFoiDentroDoComponente(evento)) {
      this.fecharTudo();
    }
  }
}
