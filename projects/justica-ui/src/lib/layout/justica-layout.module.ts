import {NgModule} from '@angular/core';
import {JusticaLayoutComponent} from './justica-layout.component';
import {JusticaHeaderComponent} from './components/justica-header/justica-header.component';
import {JusticaMenuComponent} from './components/justica-menu/justica-menu.component';
import {JusticaMenuItemComponent} from './components/justica-menu/justica-menu-item/justica-menu-item.component';
import {JusticaSidebarComponent} from './components/justica-sidebar/justica-sidebar.component';
import {JusticaButtonModule, JusticaModalModule} from '../components';
import {CommonModule} from '@angular/common';
import {JusticaLogoutComponent} from './components/justica-header/justica-logout/justica-logout.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule, JusticaButtonModule, JusticaModalModule],
  declarations: [
    JusticaLayoutComponent,

    JusticaHeaderComponent,
    JusticaLogoutComponent,
    JusticaMenuComponent,
    JusticaMenuItemComponent,
    JusticaSidebarComponent
  ],
  exports: [JusticaLayoutComponent]
})
export class JusticaLayoutModule {}
