import {ModuleWithProviders, NgModule, Provider} from '@angular/core';

import {JusticaButtonModule} from './components/justica-button/justica-button.module';
import {JusticaSidebarItemModule} from './components/justica-sidebar-item/justica-sidebar-item.module';
import {JusticaToastModule} from './components/justica-toast/justica-toast.module';
import {JusticaUiConfig, provideJusticaUi} from './configs/justica-ui.config';
import {JusticaLayoutConfig, provideJusticaLayout} from './layout/justica-layout.config';
import {JusticaLayoutModule} from './layout/justica-layout.module';

@NgModule({
  exports: [JusticaButtonModule, JusticaToastModule, JusticaSidebarItemModule, JusticaLayoutModule]
})
export class JusticaUiModule {
  static forRoot(configuracao?: JusticaUiConfig): ModuleWithProviders<JusticaUiModule> {
    const providers: Provider[] = [provideJusticaUi(configuracao)];
    if (configuracao?.layout) {
      const layoutConfig: JusticaLayoutConfig = {
        ...configuracao.layout
      };
      providers.push(provideJusticaLayout(layoutConfig));
    }
    return {
      ngModule: JusticaUiModule,
      providers: providers
    };
  }
}
