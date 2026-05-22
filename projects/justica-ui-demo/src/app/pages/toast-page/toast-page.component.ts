import {Component} from '@angular/core';
import {
  JusticaToastConfig,
  JusticaToastPosicaoHorizontal,
  JusticaToastPosicaoVertical,
  JusticaToastService,
  JusticaToastTipo
} from '@justica/ui';

interface ExemploToast {
  titulo: string;
  descricao: string;
  acao: string;
  codigo: string;
  config: JusticaToastConfig;
}

interface PosicaoToast {
  titulo: string;
  posicaoVertical: JusticaToastPosicaoVertical;
  posicaoHorizontal: JusticaToastPosicaoHorizontal;
}

@Component({
  selector: 'app-toast-page',
  templateUrl: './toast-page.component.html',
  styleUrls: ['./toast-page.component.css']
})
export class ToastPageComponent {
  mensagemCopia = '';

  readonly codigoImportacao = [
    "import {NgModule} from '@angular/core';",
    "import {JusticaToastModule} from '@justica/ui/components';",
    '',
    '@NgModule({',
    '  imports: [JusticaToastModule]',
    '})',
    'export class ProcessosModule {}'
  ].join('\n');

  readonly codigoContainer = [
    '<justica-toast></justica-toast>',
    '',
    '<button type="button" (click)="exibirToast()">Exibir toast</button>'
  ].join('\n');

  readonly tipos: Array<{
    tipo: JusticaToastTipo;
    titulo: string;
    descricao: string;
    icone: string;
  }> = [
    {
      tipo: 'success',
      titulo: 'Pagamento processado',
      descricao: 'Transação ID: #14402',
      icone: 'fa-solid fa-check-circle'
    },
    {
      tipo: 'warning',
      titulo: 'Conexão falhou',
      descricao: 'Verifique sua conexão com a internet',
      icone: 'fa-solid fa-triangle-exclamation'
    },
    {
      tipo: 'info',
      titulo: 'Atualização disponível',
      descricao: 'Versão 21.0 pronta para instalar',
      icone: 'fa-solid fa-info-circle'
    },
    {
      tipo: 'error',
      titulo: 'Algo deu errado',
      descricao: 'Tente novamente mais tarde',
      icone: 'fa-solid fa-circle-xmark'
    }
  ];

  readonly exemplos: ExemploToast[] = [
    {
      titulo: 'Uso básico',
      descricao: 'Exibe um toast informativo com duração padrão de cinco segundos.',
      acao: 'Exibir padrão',
      config: {
        titulo: 'Atualização disponível',
        descricao: 'Versão 21.0 pronta para instalar'
      },
      codigo: [
        "import {JusticaToastService} from '@justica/ui/components';",
        '',
        'constructor(private readonly _toastService: JusticaToastService) {}',
        '',
        'salvar(): void {',
        '  this._toastService.exibir({',
        "    titulo: 'Atualização disponível',",
        "    descricao: 'Versão 21.0 pronta para instalar'",
        '  });',
        '}'
      ].join('\n')
    },
    {
      titulo: 'Duração customizada',
      descricao: 'Mantém o toast visível por dois segundos antes do fechamento automático.',
      acao: 'Exibir por 2s',
      config: {
        tipo: 'success',
        titulo: 'Pagamento processado',
        descricao: 'Transação ID: #14402',
        duracaoMs: 2000
      },
      codigo: [
        'this._toastService.exibir({',
        "  tipo: 'success',",
        "  titulo: 'Pagamento processado',",
        "  descricao: 'Transação ID: #14402',",
        '  duracaoMs: 2000',
        '});'
      ].join('\n')
    },
    {
      titulo: 'Sem fechamento automático',
      descricao: 'Usa duracaoMs igual a zero para exigir fechamento manual.',
      acao: 'Exibir persistente',
      config: {
        tipo: 'error',
        titulo: 'Algo deu errado',
        descricao: 'Tente novamente mais tarde',
        duracaoMs: 0
      },
      codigo: [
        'this._toastService.exibir({',
        "  tipo: 'error',",
        "  titulo: 'Algo deu errado',",
        "  descricao: 'Tente novamente mais tarde',",
        '  duracaoMs: 0',
        '});'
      ].join('\n')
    }
  ];

  readonly posicoes: PosicaoToast[] = [
    {titulo: 'Topo direita', posicaoVertical: 'topo', posicaoHorizontal: 'direita'},
    {titulo: 'Topo centro', posicaoVertical: 'topo', posicaoHorizontal: 'centro'},
    {titulo: 'Topo esquerda', posicaoVertical: 'topo', posicaoHorizontal: 'esquerda'},
    {titulo: 'Centro direita', posicaoVertical: 'centro', posicaoHorizontal: 'direita'},
    {titulo: 'Centro', posicaoVertical: 'centro', posicaoHorizontal: 'centro'},
    {titulo: 'Centro esquerda', posicaoVertical: 'centro', posicaoHorizontal: 'esquerda'},
    {titulo: 'Abaixo direita', posicaoVertical: 'abaixo', posicaoHorizontal: 'direita'},
    {titulo: 'Abaixo centro', posicaoVertical: 'abaixo', posicaoHorizontal: 'centro'},
    {titulo: 'Abaixo esquerda', posicaoVertical: 'abaixo', posicaoHorizontal: 'esquerda'}
  ];

  constructor(private readonly _toastService: JusticaToastService) {}

  exibirTipo(tipo: JusticaToastTipo): void {
    const item = this.tipos.find((tipoToast) => tipoToast.tipo === tipo);

    if (!item) {
      return;
    }

    this._toastService.exibir({
      tipo: item.tipo,
      titulo: item.titulo,
      descricao: item.descricao
    });
  }

  exibirExemplo(exemplo: ExemploToast): void {
    this._toastService.exibir(exemplo.config);
  }

  exibirPosicao(posicao: PosicaoToast): void {
    this._toastService.exibir({
      tipo: 'info',
      titulo: posicao.titulo,
      descricao: 'Toast exibido na posição selecionada.',
      posicaoVertical: posicao.posicaoVertical,
      posicaoHorizontal: posicao.posicaoHorizontal
    });
  }

  exibirPilha(): void {
    this._toastService.exibir({
      tipo: 'success',
      titulo: 'Primeiro toast',
      descricao: 'Operação concluída com sucesso.'
    });
    this._toastService.exibir({
      tipo: 'warning',
      titulo: 'Segundo toast',
      descricao: 'Revise as informações pendentes.'
    });
    this._toastService.exibir({
      tipo: 'error',
      titulo: 'Terceiro toast',
      descricao: 'Há uma inconsistência para corrigir.'
    });
  }

  limpar(): void {
    this._toastService.limpar();
  }

  copiar(texto: string): void {
    const nav = window.navigator as Navigator & {
      clipboard?: {writeText: (value: string) => Promise<void>};
    };

    if (nav.clipboard && nav.clipboard.writeText) {
      nav.clipboard
        .writeText(texto)
        .then(() => this.notificarCopia())
        .catch(() => this.copiarFallback(texto));
      return;
    }

    this.copiarFallback(texto);
  }

  private copiarFallback(texto: string): void {
    const area = document.createElement('textarea');
    area.value = texto;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.focus();
    area.select();
    document.execCommand('copy');
    document.body.removeChild(area);
    this.notificarCopia();
  }

  private notificarCopia(): void {
    this.mensagemCopia = 'Código copiado.';
    setTimeout(() => {
      this.mensagemCopia = '';
    }, 1500);
  }
}
