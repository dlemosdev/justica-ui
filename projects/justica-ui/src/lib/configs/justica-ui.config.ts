import {InjectionToken, Provider} from '@angular/core';

export interface JusticaUiConfig {
  exibirMenu?: boolean;
  exibirTempoSessao?: boolean;
}

export const JUSTICA_UI_CONFIG_PADRAO: JusticaUiConfig = {
  exibirMenu: true,
  exibirTempoSessao: true
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

export function provideJusticaUiConfig(config?: JusticaUiConfig): Provider[] {
  return [
    {
      provide: JUSTICA_UI_CONFIG,
      useValue: criarJusticaUiConfig(config)
    }
  ];
}

export function provideJusticaUi(config?: JusticaUiConfig): Provider[] {
  return provideJusticaUiConfig(config);
}
