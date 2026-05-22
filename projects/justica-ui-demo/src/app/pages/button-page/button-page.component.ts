import {Component} from '@angular/core';

interface ExemploButton {
  titulo: string;
  descricao: string;
  template: string;
  codigo: string;
}

@Component({
  selector: 'app-button-page',
  template: `
    <section class="doc">
      <header class="doc__header">
        <h2>Justica Button</h2>
        <p>
          Componente de botão com suporte a severidade, variante, tamanho, ícones, carregamento e
          modo somente ícone.
        </p>
      </header>

      <article class="doc__bloco">
        <h3>Uso básico</h3>
        <div class="doc__preview">
          <justica-button label="Salvar" icon="fa-solid fa-check"></justica-button>
        </div>
        <div class="doc__code">
          <button type="button" class="copy-btn" (click)="copiar(codigoBasico)">
            Copiar código
          </button>
          <pre><code>{{ codigoBasico }}</code></pre>
        </div>
      </article>

      <article class="doc__bloco" *ngFor="let exemplo of exemplos">
        <h3>{{ exemplo.titulo }}</h3>
        <p class="doc__descricao">{{ exemplo.descricao }}</p>

        <div class="doc__preview">
          <ng-container [ngSwitch]="exemplo.titulo">
            <div *ngSwitchCase="'Severidades'" class="linha">
              <justica-button label="Primary"></justica-button>
              <justica-button label="Secondary" severity="secondary"></justica-button>
              <justica-button label="Success" severity="success"></justica-button>
              <justica-button label="Danger" severity="danger"></justica-button>
            </div>

            <div *ngSwitchCase="'Variantes'" class="linha">
              <justica-button label="Solid"></justica-button>
              <justica-button label="Outlined" variant="outlined"></justica-button>
              <justica-button label="Text" variant="text"></justica-button>
              <justica-button label="Link" variant="link"></justica-button>
            </div>

            <div *ngSwitchCase="'Ícones e posições'" class="linha">
              <justica-button
                label="Left"
                icon="fa-solid fa-arrow-left"
                iconPos="left"
              ></justica-button>
              <justica-button
                label="Right"
                icon="fa-solid fa-arrow-right"
                iconPos="right"
              ></justica-button>
              <justica-button
                label="Top"
                icon="fa-solid fa-arrow-up"
                iconPos="top"
              ></justica-button>
            </div>

            <div *ngSwitchCase="'Estados'" class="linha">
              <justica-button label="Loading" [loading]="true"></justica-button>
              <justica-button label="Disabled" [disabled]="true"></justica-button>
              <justica-button
                label="Rounded"
                [rounded]="true"
                icon="fa-solid fa-star"
              ></justica-button>
              <justica-button label="Large" size="large"></justica-button>
            </div>

            <div *ngSwitchCase="'Somente ícone'" class="linha">
              <justica-button icon="fa-solid fa-gear" aria-label="Configurações"></justica-button>
              <justica-button
                icon="fa-solid fa-pen"
                variant="outlined"
                severity="secondary"
                aria-label="Editar"
              ></justica-button>
              <justica-button
                icon="fa-solid fa-heart"
                [rounded]="true"
                severity="danger"
                aria-label="Favoritar"
              ></justica-button>
            </div>
          </ng-container>
        </div>

        <div class="doc__code">
          <button type="button" class="copy-btn" (click)="copiar(exemplo.codigo)">
            Copiar código
          </button>
          <pre><code>{{ exemplo.codigo }}</code></pre>
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
    '.linha { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }',
    '.doc__code { margin-top: 12px; }',
    '.copy-btn { border: 1px solid #c8d2de; background: #fff; border-radius: 6px; padding: 6px 10px; cursor: pointer; font-size: 12px; }',
    '.copy-btn:hover { background: #f3f6fa; }',
    'pre { margin: 8px 0 0; padding: 10px; background: #0f172a; color: #e2e8f0; border-radius: 8px; overflow: auto; }',
    'code { font-family: Consolas, monospace; font-size: 12px; }',
    '.doc__feedback { margin: 0; color: #166534; font-weight: 600; }'
  ]
})
export class ButtonPageComponent {
  mensagemCopia = '';

  codigoBasico = '<justica-button label="Salvar" icon="fa-solid fa-check"></justica-button>';

  exemplos: ExemploButton[] = [
    {
      titulo: 'Severidades',
      descricao: 'Define o destaque visual do botão por meio da propriedade severity.',
      template: 'severidades',
      codigo: [
        '<justica-button label="Primary"></justica-button>',
        '<justica-button label="Secondary" severity="secondary"></justica-button>',
        '<justica-button label="Success" severity="success"></justica-button>',
        '<justica-button label="Danger" severity="danger"></justica-button>'
      ].join('\n')
    },
    {
      titulo: 'Variantes',
      descricao: 'Altera o estilo visual do botão entre solid, outlined, text e link.',
      template: 'variantes',
      codigo: [
        '<justica-button label="Solid"></justica-button>',
        '<justica-button label="Outlined" variant="outlined"></justica-button>',
        '<justica-button label="Text" variant="text"></justica-button>',
        '<justica-button label="Link" variant="link"></justica-button>'
      ].join('\n')
    },
    {
      titulo: 'Ícones e posições',
      descricao: 'Exibe ícones em diferentes posições usando as propriedades icon e iconPos.',
      template: 'icones',
      codigo: [
        '<justica-button label="Left" icon="fa-solid fa-arrow-left" iconPos="left"></justica-button>',
        '<justica-button label="Right" icon="fa-solid fa-arrow-right" iconPos="right"></justica-button>',
        '<justica-button label="Top" icon="fa-solid fa-arrow-up" iconPos="top"></justica-button>'
      ].join('\n')
    },
    {
      titulo: 'Estados',
      descricao: 'Controla os estados de carregamento, desabilitado, arredondado e tamanho.',
      template: 'estados',
      codigo: [
        '<justica-button label="Loading" [loading]="true"></justica-button>',
        '<justica-button label="Disabled" [disabled]="true"></justica-button>',
        '<justica-button label="Rounded" [rounded]="true" icon="fa-solid fa-star"></justica-button>',
        '<justica-button label="Large" size="large"></justica-button>'
      ].join('\n')
    },
    {
      titulo: 'Somente ícone',
      descricao: 'Exibe botões somente com ícone e usa aria-label para manter a acessibilidade.',
      template: 'icononly',
      codigo: [
        '<justica-button icon="fa-solid fa-gear" aria-label="Configurações"></justica-button>',
        '<justica-button icon="fa-solid fa-pen" variant="outlined" severity="secondary" aria-label="Editar"></justica-button>',
        '<justica-button icon="fa-solid fa-heart" [rounded]="true" severity="danger" aria-label="Favoritar"></justica-button>'
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
