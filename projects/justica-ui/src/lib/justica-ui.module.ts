import {ModuleWithProviders, NgModule} from '@angular/core';

import {JusticaButtonModule} from './components/justica-button/justica-button.module';
import {JusticaToastModule} from './components/justica-toast/justica-toast.module';
import {JusticaLayoutModule} from './layout/justica-layout.module';
import {JusticaUiConfig, provideJusticaUi} from './configs/justica-ui.config';

@NgModule({
  declarations: [],
  imports: [JusticaButtonModule, JusticaToastModule, JusticaLayoutModule],
  exports: [JusticaButtonModule, JusticaToastModule, JusticaLayoutModule]
})
export class JusticaUiModule {
  static forRoot(configuracao?: JusticaUiConfig): ModuleWithProviders<JusticaUiModule> {
    return {
      ngModule: JusticaUiModule,
      providers: [provideJusticaUi(configuracao)]
    };
  }
}
