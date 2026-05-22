import {NgModule} from '@angular/core';
import {JusticaLayoutComponent} from './justica-layout.component';
import {JusticaButtonModule} from '../components/justica-button/justica-button.module';
import {JusticaModalModule} from '../components/justica-modal/justica-modal.module';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {JusticaMenuModule} from './components/justica-menu/justica-menu.module';
import {JusticaHeaderModule} from './components/justica-header/justica-header.module';
import {JusticaSidebarModule} from './components/justica-sidebar/justica-sidebar.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    // Modulos internos
    JusticaHeaderModule,
    JusticaMenuModule,
    JusticaSidebarModule,
    // Modulos externos
    JusticaModalModule,
  ],
  declarations: [
    JusticaLayoutComponent,
  ],
  exports: [JusticaLayoutComponent]
})
export class JusticaLayoutModule {
}
