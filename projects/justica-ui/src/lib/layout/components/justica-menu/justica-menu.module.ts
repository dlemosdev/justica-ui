import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JusticaMenuComponent} from './justica-menu.component';
import {JusticaMenuItemComponent} from './justica-menu-item/justica-menu-item.component';
import {BotaoErroCarregarMenu} from './justica-menu.service';
import {JusticaButtonModule} from '../../../components/justica-button';

@NgModule({
  imports: [
    CommonModule,
    JusticaButtonModule
  ],
  declarations: [
    JusticaMenuComponent,
    JusticaMenuItemComponent,

    BotaoErroCarregarMenu
  ],
  exports: [JusticaMenuComponent],
})
export class JusticaMenuModule { }
