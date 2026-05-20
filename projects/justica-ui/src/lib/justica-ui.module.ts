import {ModuleWithProviders, NgModule} from '@angular/core';
import {JusticaButtonModule} from './components';
import {JusticaLayoutModule} from './layout/justica-layout.module';
import {criarJusticaUiConfig, JUSTICA_UI_CONFIG, JusticaUiConfig} from './config/justica-ui.config';

@NgModule({
  exports: [JusticaButtonModule, JusticaLayoutModule]
})
export class JusticaUiModule {
  static forRoot(configuracao?: JusticaUiConfig): ModuleWithProviders<JusticaUiModule> {
    return {
      ngModule: JusticaUiModule,
      providers: [
        {
          provide: JUSTICA_UI_CONFIG,
          useValue: criarJusticaUiConfig(configuracao)
        }
      ]
    };
  }
}
