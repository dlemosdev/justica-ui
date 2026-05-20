import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {JusticaUiModule, JusticaButtonModule, JusticaSidebarItemModule} from 'justica-ui';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ModalPageComponent} from './pages/modal-page/modal-page.component';
import {ButtonPageComponent} from './pages/button-page/button-page.component';
import {ConteudoModalDemoComponent} from './pages/modal-page/conteudo-modal-demo.component';
import {environment} from '../environments/environment';
import {
  JusticaAuthInterceptor,
  JusticaCoreModule,
} from '@justica/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ModalPageComponent, ConteudoModalDemoComponent, ButtonPageComponent],
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JusticaAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
