import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {JusticaButtonModule, JusticaSidebarItemModule, JusticaUiModule} from '@justica/ui';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ConteudoModalDemoComponent, ModalPageComponent} from './pages/modal-page/modal-page.component';
import {ButtonPageComponent} from './pages/button-page/button-page.component';
import {BotaoConfirmarDialogComponent, DialogPageComponent,} from './pages/dialog-page/dialog-page.component';
import {environment} from '../environments/environment';
import {JusticaCoreModule,} from '@justica/core';
import {LayoutPageComponent} from './pages/layout-page/layout-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ModalPageComponent,
    ConteudoModalDemoComponent,
    ButtonPageComponent,
    DialogPageComponent,
    BotaoConfirmarDialogComponent,
    LayoutPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Modulos Externos
    JusticaCoreModule.forRoot({
      urlApi: environment.apiUrl
    }),
    JusticaUiModule.forRoot(),
    JusticaButtonModule,
    JusticaSidebarItemModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
