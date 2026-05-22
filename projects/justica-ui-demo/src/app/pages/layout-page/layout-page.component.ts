import {Component} from '@angular/core';

interface TrechoLayout {
  titulo: string;
  descricao: string;
  codigo: string;
}

@Component({
  selector: 'app-layout-page',
  template: `
    <section class="doc">
      <header class="doc__header">
        <h2>Justica Layout</h2>
        <p>
          Estrutura mínima para usar o layout padrão com header, menu, sidebar, área principal e
          integração com o core.
        </p>
      </header>

      <article class="doc__bloco" *ngFor="let trecho of trechos">
        <h3>{{ trecho.titulo }}</h3>
        <p class="doc__descricao">{{ trecho.descricao }}</p>

        <div class="doc__code">
          <button type="button" class="copy-btn" (click)="copiar(trecho.codigo)">
            Copiar código
          </button>
          <pre><code>{{ trecho.codigo }}</code></pre>
        </div>
      </article>

      <article class="doc__bloco">
        <h3>AppComponent mínimo</h3>
        <p class="doc__descricao">
          O componente raiz deve expor o nome do projeto e a versão que o layout exibirá no header.
        </p>

        <div class="doc__code">
          <button type="button" class="copy-btn" (click)="copiar(codigoAppComponent)">
            Copiar código
          </button>
          <pre><code>{{ codigoAppComponent }}</code></pre>
        </div>
      </article>

      <article class="doc__bloco">
        <h3>Aplicação no AppComponent</h3>
        <p class="doc__descricao">
          No <code>app.component.html</code>, use <code>justica-layout</code> como casca da
          aplicação e projete as ações do cabeçalho, os itens extras da sidebar e o
          <code>router-outlet</code>.
        </p>

        <div class="doc__code">
          <button type="button" class="copy-btn" (click)="copiar(codigoTemplate)">
            Copiar código
          </button>
          <pre><code>{{ codigoTemplate }}</code></pre>
        </div>
      </article>

      <article class="doc__bloco">
        <h3>Pontos importantes</h3>
        <ul class="doc__lista">
          <li>
            <code>JusticaCoreModule.forRoot</code> precisa receber a URL da API usada pelo core.
          </li>
          <li><code>JusticaUiModule.forRoot</code> habilita as configurações globais do UI.</li>
          <li>
            O core registra os interceptors necessários ao importar <code>JusticaCoreModule</code>.
          </li>
          <li>Rotas protegidas podem usar <code>JusticaAutenticadoGuard</code>.</li>
        </ul>
      </article>

      <p class="doc__feedback" *ngIf="mensagemCopia">{{ mensagemCopia }}</p>
    </section>
  `,
  styles: [
    '.doc { display: grid; gap: 18px; }',
    '.doc__header p { margin: 0; color: #4b5563; }',
    '.doc__bloco { border: 1px solid #dbe3ec; border-radius: 8px; background: #fff; padding: 14px; }',
    '.doc__descricao { margin: 0 0 10px; color: #4b5563; }',
    '.doc__code { margin-top: 12px; }',
    '.copy-btn { border: 1px solid #c8d2de; background: #fff; border-radius: 6px; padding: 6px 10px; cursor: pointer; font-size: 12px; }',
    '.copy-btn:hover { background: #f3f6fa; }',
    'pre { margin: 8px 0 0; padding: 10px; background: #0f172a; color: #e2e8f0; border-radius: 8px; overflow: auto; }',
    'code { font-family: Consolas, monospace; font-size: 12px; }',
    '.doc__lista { margin: 0; padding-left: 20px; color: #374151; }',
    '.doc__lista li + li { margin-top: 8px; }',
    '.doc__feedback { margin: 0; color: #166534; font-weight: 600; }'
  ]
})
export class LayoutPageComponent {
  mensagemCopia = '';

  readonly codigoAppComponent = [
    "import {Component} from '@angular/core';",
    '',
    "import {version} from '../../../../package.json';",
    '',
    '@Component({',
    "  selector: 'app-root',",
    "  templateUrl: './app.component.html'",
    '})',
    'export class AppComponent {',
    "  readonly nomeProjeto = 'Layout';",
    '  readonly version = version;',
    '}'
  ].join('\n');

  readonly codigoTemplate = [
    '<!--Exemplo de como aplicar botões customizados no cabeçalho-->',
    '<justica-layout [nomeProjeto]="nomeProjeto" [versao]="version">',
    '  <justica-button',
    '    size="large"',
    '    justica-cabecalho-acoes',
    '    severity="transparent"',
    '    aria-label="Ajuda"',
    '  >',
    '    <i class="fas fa-question-circle" aria-hidden="true"></i>',
    '  </justica-button>',
    '',
    '<!--Exemplo de como aplicar itens customizados na sidebar-->',
    '  <justica-sidebar-item justica-sidebar-itens>',
    '    <a routerLink="/minha-rota" routerLinkActive="active">',
    '      <i class="fas fa-file-alt"></i><span>Minha rota</span>',
    '    </a>',
    '  </justica-sidebar-item>',
    '',
    '  <router-outlet></router-outlet>',
    '</justica-layout>'
  ].join('\n');

  readonly trechos: TrechoLayout[] = [
    {
      titulo: 'Imports do módulo',
      descricao:
        'Registra o core, o UI e os módulos usados nos slots do layout no módulo da aplicação.',
      codigo: [
        'imports: [',
        '  BrowserModule,',
        '  AppRoutingModule,',
        '  JusticaCoreModule.forRoot({',
        '    urlApi: environment.apiUrl',
        '  }),',
        '  JusticaUiModule.forRoot({',
        '    exibirMenu: true',
        '  }),',
        ']'
      ].join('\n')
    },
    {
      titulo: 'Rota protegida',
      descricao: 'Usa o guard do core nas páginas que dependem de usuário autenticado.',
      codigo: [
        'const routes: Routes = [',
        '  {',
        "    path: 'minha-rota',",
        '    component: MinhaPaginaComponent,',
        '    canActivate: [JusticaAutenticadoGuard]',
        '  }',
        '];'
      ].join('\n')
    }
  ];

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
