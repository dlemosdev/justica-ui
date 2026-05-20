import {Component} from '@angular/core';
import {JusticaModalService} from '../../../../components/justica-modal/justica-modal.service';

@Component({
  selector: 'justica-justica-logout',
  templateUrl: './justica-logout.component.html',
  styleUrls: ['./justica-logout.component.css']
})
export class JusticaLogoutComponent {
  constructor(private readonly _modalService: JusticaModalService) {}

  cancelar(): void {
    this._modalService.fecharModal();
  }

  confirmar(): void {
    location.pathname = '/login';
  }
}
