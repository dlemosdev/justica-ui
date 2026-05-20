import {InjectionToken} from '@angular/core';

export interface JusticaUiConfig {
  exibirMenu?: boolean;
}

export const JUSTICA_UI_CONFIG_PADRAO: JusticaUiConfig = {
  exibirMenu: true
};

export function criarJusticaUiConfig(
  config: JusticaUiConfig = {}
): JusticaUiConfig {
  return {
    ...JUSTICA_UI_CONFIG_PADRAO,
    ...config
  };
}

export const JUSTICA_UI_CONFIG = new InjectionToken<JusticaUiConfig>(
  'JUSTICA_UI_CONFIG',
  {
    providedIn: 'root',
    factory: criarJusticaUiConfig
  }
);

