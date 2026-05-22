import {Component, Inject} from '@angular/core';
import {JusticaModalService} from '@justica/ui';
import {JUSTICA_WINDOW, JusticaWindow} from '@justica/core';

interface ExemploModal {
  titulo: string;
  descricao: string;
  acao: string;
  codigo: string;
}

@Component({
  selector: 'app-conteudo-modal-demo',
  template: `
    <div class="demo-box">
      Conteúdo dinâmico da modal via service.
      <div class="acoes">
        <button type="button" class="btn-fechar" (click)="fechar()">Fechar</button>
      </div>
    </div>
  `,
  styles: [
    '.demo-box { padding: 12px; border: 1px dashed #b8c4d1; border-radius: 6px; }',
    '.acoes { margin-top: 12px; }',
    '.btn-fechar { border: 0; border-radius: 4px; background: #d32f2f; color: #fff; padding: 8px 12px; cursor: pointer; }'
  ]
})
export class ConteudoModalDemoComponent {
  constructor(private readonly _modalService: JusticaModalService) {}

  fechar(): void {
    this._modalService.fecharModal();
  }
}

@Component({
  selector: 'app-modal-page',
  template: `
    <section class="doc">
      <header class="doc__header">
        <h2>Justica Modal</h2>
        <p>Modal do @justica/ui para abrir componentes dinâmicos e projetar conteúdo em tela.</p>
      </header>

      <article class="doc__bloco">
        <h3>Como importar</h3>
        <p class="doc__descricao">
          Importe o módulo no módulo da aplicação ou da feature que exibirá a modal.
        </p>

        <div class="doc__code">
          <button type="button" class="copy-btn" (click)="copiar(codigoImportacao)">
            Copiar código
          </button>
          <pre><code>{{ codigoImportacao }}</code></pre>
        </div>
      </article>

      <article class="doc__bloco" *ngFor="let exemplo of exemplos">
        <h3>{{ exemplo.titulo }}</h3>
        <p class="doc__descricao">{{ exemplo.descricao }}</p>

        <div class="doc__preview">
          <justica-button
            [label]="exemplo.acao"
            icon="fa-solid fa-up-right-from-square"
            (click)="executar(exemplo.titulo)"
          ></justica-button>
        </div>

        <div class="doc__code">
          <button type="button" class="copy-btn" (click)="copiar(exemplo.codigo)">
            Copiar código
          </button>
          <pre><code>{{ exemplo.codigo }}</code></pre>
        </div>
      </article>

      <article class="doc__bloco">
        <h3>Fechamento</h3>
        <p class="doc__descricao">
          O conteúdo dinâmico pode solicitar o fechamento usando o mesmo service.
        </p>

        <div class="doc__code">
          <button type="button" class="copy-btn" (click)="copiar(codigoFechamento)">
            Copiar código
          </button>
          <pre><code>{{ codigoFechamento }}</code></pre>
        </div>
      </article>

      <p class="doc__feedback" *ngIf="mensagemCopia">{{ mensagemCopia }}</p>
    </section>
  `,
  styles: [
    '.doc { display: grid; gap: 18px; }',
    '.doc__header p { margin: 0; color: #4b5563; }',
    '.doc__bloco { border: 1px solid #dbe3ec; border-radius: 8px; background: #fff; padding: 14px; }',
    '.doc__descricao { margin: 0 0 10px; color: #4b5563; }',
    '.doc__preview { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; }',
    '.doc__code { margin-top: 12px; }',
    '.copy-btn { border: 1px solid #c8d2de; background: #fff; border-radius: 6px; padding: 6px 10px; cursor: pointer; font-size: 12px; }',
    '.copy-btn:hover { background: #f3f6fa; }',
    'pre { margin: 8px 0 0; padding: 10px; background: #0f172a; color: #e2e8f0; border-radius: 8px; overflow: auto; }',
    'code { font-family: Consolas, monospace; font-size: 12px; }',
    '.doc__feedback { margin: 0; color: #166534; font-weight: 600; }'
  ]
})
export class ModalPageComponent {
  mensagemCopia = '';

  codigoImportacao = [
    "import {NgModule} from '@angular/core';",
    "import {JusticaModalModule} from '@justica/ui';",
    '',
    '@NgModule({',
    '  imports: [JusticaModalModule]',
    '})',
    'export class ProcessosModule {}'
  ].join('\n');

  codigoFechamento = [
    "import {JusticaModalService} from '@justica/ui';",
    '',
    'constructor(',
    '  private readonly _modalService: JusticaModalService',
    ') {}',
    '',
    'fechar(): void {',
    '  this._modalService.fecharModal();',
    '}'
  ].join('\n');

  exemplos: ExemploModal[] = [
    {
      titulo: 'Uso básico',
      descricao: 'Abre um componente dinâmico informando o componente e as opções da modal.',
      acao: 'Exibir modal',
      codigo: [
        "import {JusticaModalService} from '@justica/ui';",
        "import {ConteudoModalDemoComponent} from './conteudo-modal-demo.component';",
        '',
        'constructor(',
        '  private readonly _modalService: JusticaModalService',
        ') {}',
        '',
        'abrirModal(): void {',
        '  this._modalService.abrirModal(ConteudoModalDemoComponent, {',
        "    titulo: 'Justica Modal',",
        '    fecharAoClicarFora: false',
        '  });',
        '}'
      ].join('\n')
    },
    {
      titulo: 'Clique fora habilitado',
      descricao: 'Permite que o usuário feche a modal clicando fora da área principal.',
      acao: 'Abrir com clique fora',
      codigo: [
        'this._modalService.abrirModal(ConteudoModalDemoComponent, {',
        "  titulo: 'Modal com clique fora',",
        '  fecharAoClicarFora: true',
        '});'
      ].join('\n')
    }
  ];

  constructor(
    private readonly _modalService: JusticaModalService,
    @Inject(JUSTICA_WINDOW)
    private readonly _window: JusticaWindow
  ) {}

  executar(titulo: string): void {
    switch (titulo) {
      case 'Uso básico':
        this.abrirModal();
        return;
      case 'Clique fora habilitado':
        this.abrirModalCliqueFora();
        return;
    }
  }

  abrirModal(): void {
    this._modalService.abrirModal(ConteudoModalDemoComponent, {
      titulo: 'Justica Modal',
      fecharAoClicarFora: false
    });
  }

  abrirModalCliqueFora(): void {
    this._modalService.abrirModal(ConteudoModalDemoComponent, {
      titulo: 'Modal com clique fora',
      fecharAoClicarFora: true
    });
  }

  copiar(texto: string): void {
    const nav = this._window.navigator as Navigator & {
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
