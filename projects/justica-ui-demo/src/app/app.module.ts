import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {JusticaUiModule, JUSTICA_LAYOUT_CONFIG_PADRAO} from '@justica/ui';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {JusticaCoreModule, JUSTICA_CORE_CONFIG_PADRAO} from '@justica/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Modulos Externos
    JusticaCoreModule.forRoot({
      ...JUSTICA_CORE_CONFIG_PADRAO,
      modulo: 'Justiça UI Demo',
      urlApi: environment.apiUrl,
      urlKeycloack: environment.keycloakUrl
    }),
    JusticaUiModule.forRoot({
      layout: {
        ...JUSTICA_LAYOUT_CONFIG_PADRAO,
        exibirTempoSessao: true
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
