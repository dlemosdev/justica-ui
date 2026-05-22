import {APP_INITIALIZER, Component, Injectable, Injector, ModuleWithProviders, NgModule} from '@angular/core';
import {JusticaDialogRef, JusticaDialogService} from '@justica/core';
import {JusticaAuthService, JusticaUsuarioService} from '@justica/core/services';

import {JusticaButtonModule} from './components/justica-button/justica-button.module';
import {JusticaLayoutModule} from './layout/justica-layout.module';
import {JusticaUiConfig, provideJusticaUi} from './configs/justica-ui.config';

@NgModule({
  declarations: [],
  imports: [JusticaButtonModule, JusticaLayoutModule],
  exports: [JusticaButtonModule, JusticaLayoutModule]
})
export class JusticaUiModule {
  static forRoot(configuracao?: JusticaUiConfig): ModuleWithProviders<JusticaUiModule> {
    return {
      ngModule: JusticaUiModule,
      providers: [
        provideJusticaUi(configuracao),
      ]
    };
  }
}
