import {Component} from '@angular/core';
import {MenuService} from './menu.service';
import {Observable} from 'rxjs';
import {JusticaMenu} from '../../../models/justica-menu.model';

@Component({
  selector: 'justica-menu',
  templateUrl: './justica-menu.component.html',
  styleUrls: ['./justica-menu.component.css']
})
export class JusticaMenuComponent {
  constructor(private readonly _gestaoService: MenuService) {}

  get menu$(): Observable<JusticaMenu[]> {
    return this._gestaoService.menu$;
  }
}
