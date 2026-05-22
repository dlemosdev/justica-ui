import {Component} from '@angular/core';
import {JusticaModalService} from '../../../../components/justica-modal/justica-modal.service';
import {JusticaAuthService} from '@justica/core/services';

@Component({
  selector: 'justica-justica-logout',
  templateUrl: './justica-logout.component.html',
  styleUrls: ['./justica-logout.component.css']
})
export class JusticaLogoutComponent {
  constructor(
    private readonly _modalService: JusticaModalService,
    private readonly _justicaAuthService: JusticaAuthService
  ) {}

  cancelar(): void {
    this._modalService.fecharModal();
  }

  confirmar(): void {
    this._justicaAuthService.realizarLogout();
  }
}
