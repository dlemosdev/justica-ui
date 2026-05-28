import {InjectionToken, Provider} from '@angular/core';

export interface JusticaLayoutConfig {
  exibirMenu?: boolean;
}

export const JUSTICA_LAYOUT_CONFIG_PADRAO: JusticaLayoutConfig = {
  exibirMenu: true
};

export function criarJusticaLayoutConfig(config: JusticaLayoutConfig = {}): JusticaLayoutConfig {
  return {
    ...JUSTICA_LAYOUT_CONFIG_PADRAO,
    ...config
  };
}

export const JUSTICA_LAYOUT_CONFIG = new InjectionToken<JusticaLayoutConfig>(
  'JUSTICA_LAYOUT_CONFIG',
  {
    providedIn: 'root',
    factory: criarJusticaLayoutConfig
  }
);

export function provideJusticaLayout(config?: JusticaLayoutConfig): Provider[] {
  return [
    {
      provide: JUSTICA_LAYOUT_CONFIG,
      useValue: criarJusticaLayoutConfig(config)
    }
  ];
}
