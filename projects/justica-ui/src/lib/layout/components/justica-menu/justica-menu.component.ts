import {Component} from '@angular/core';
import {GestaoService} from '../../../services/gestao.service';
import {Observable} from 'rxjs';
import {JusticaMenu} from '../../../models/justica-menu.model';

@Component({
  selector: 'justica-menu',
  templateUrl: './justica-menu.component.html',
  styleUrls: ['./justica-menu.component.css']
})
export class JusticaMenuComponent {
  constructor(private readonly _gestaoService: GestaoService) {}

  get menu$(): Observable<JusticaMenu[]> {
    return this._gestaoService.menu$;
  }
}
