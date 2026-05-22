export type JusticaToastTipo = 'success' | 'warning' | 'info' | 'error';

export type JusticaToastPosicaoVertical = 'topo' | 'centro' | 'abaixo';

export type JusticaToastPosicaoHorizontal = 'esquerda' | 'centro' | 'direita';

export interface JusticaToastConfig {
  titulo: string;
  descricao: string;
  tipo?: JusticaToastTipo;
  duracaoMs?: number;
  fecharManual?: boolean;
  posicaoVertical?: JusticaToastPosicaoVertical;
  posicaoHorizontal?: JusticaToastPosicaoHorizontal;
}

export interface JusticaToast extends JusticaToastConfig {
  id: string;
  criadoEm: number;
  tipo: JusticaToastTipo;
  duracaoMs: number;
  fecharManual: boolean;
  posicaoVertical: JusticaToastPosicaoVertical;
  posicaoHorizontal: JusticaToastPosicaoHorizontal;
}
