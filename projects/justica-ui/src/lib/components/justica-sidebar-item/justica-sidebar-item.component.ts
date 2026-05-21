import {ChangeDetectionStrategy, Component, HostListener} from '@angular/core';
import {JusticaSidebarEstadoService} from '../../layout/components/justica-sidebar/justica-sidebar-estado.service';

@Component({
  selector: 'justica-sidebar-item',
  templateUrl: './justica-sidebar-item.component.html',
  styleUrls: ['./justica-sidebar-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JusticaSidebarItemComponent {
  constructor(private readonly _sidebarEstadoService: JusticaSidebarEstadoService) {}

  @HostListener('click', ['$event'])
  aoClicar(evento: MouseEvent): void {
    const elementoAlvo = evento.target as Element | null;
    const link = elementoAlvo?.closest('a');
    if (!link) {
      return;
    }

    const href = link.getAttribute('href');
    if (
      !href ||
      href.startsWith('http') ||
      href.startsWith('mailto:') ||
      href.startsWith('tel:') ||
      href.startsWith('#')
    ) {
      return;
    }

    this._sidebarEstadoService.recolher();
  }
}
