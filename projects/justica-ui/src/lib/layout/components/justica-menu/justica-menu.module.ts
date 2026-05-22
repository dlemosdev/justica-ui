import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {JusticaMenuComponent} from './justica-menu.component';
import {JusticaMenuItemComponent} from './justica-menu-item/justica-menu-item.component';
import {JusticaButtonModule} from '../../../components/justica-button';

@NgModule({
  imports: [CommonModule, JusticaButtonModule],
  declarations: [JusticaMenuComponent, JusticaMenuItemComponent],
  exports: [JusticaMenuComponent]
})
export class JusticaMenuModule {}
