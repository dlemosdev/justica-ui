import {JusticaPagina} from '../../../../models/justica-pagina.model';

export interface JusticaNotificacao {
  seq: number;
  seqUsuario: number;
  seqLocal: number;
  tipoNotificacao: JusticaTipoNotificacao;
  titulo: string;
  conteudo: string;
  permiteRedirecionar: boolean;
  urlRedirecionamento?: string | null;
  visualizada: boolean;
  dtHrNotificacao: string;
  dtHrVisualizacao?: string | null;
  descTempoNotificacao: string;
}

export interface JusticaTipoNotificacao {
  seq: number;
  descricao: string;
}

export type JusticaNotificacaoPagina = JusticaPagina<JusticaNotificacao>;

export interface JusticaQuantidadeNotificacoesNaoLidas {
  qtdNotificacoesNaoLidas: number;
}

export interface JusticaMarcarNotificacoesComoLidasPayload {
  seqNotificacoes?: number[];
  marcarTodas?: boolean;
}

export interface JusticaNotificacaoPesquisaParametros {
  page?: number;
  size?: number;
}
