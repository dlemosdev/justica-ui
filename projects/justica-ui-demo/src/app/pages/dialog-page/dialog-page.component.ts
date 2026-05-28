import {Component} from '@angular/core';
import {JusticaDialogRef, JusticaDialogService} from '@justica/core/components';

interface ExemploDialog {
  titulo: string;
  descricao: string;
  acao: string;
  codigo: string;
}

@Component({
  selector: 'app-botao-confirmar-dialog',
  template: `
    <button type="button" class="botao-confirmar-customizado" (click)="confirmar()">
      Confirmar envio
    </button>
  `,
  styles: [
    '.botao-confirmar-customizado { border: 0; border-radius: 6px; background: #005ea8; color: #fff; padding: 9px 14px; font-weight: 700; cursor: pointer; }',
    '.botao-confirmar-customizado:hover { background: #004b86; }'
  ]
})
export class BotaoConfirmarDialogComponent {
  constructor(private readonly _dialogRef: JusticaDialogRef) {}

  confirmar(): void {
    this._dialogRef.fechar(true);
  }
}

@Component({
  selector: 'app-dialog-page',
  template: `
    <section class="doc">
      <header class="doc__header">
        <h2>Justica Dialog</h2>
        <p>
          Diálogo do @justica/core para mensagens de sucesso, erro, alerta, informação e
          confirmação.
        </p>
      </header>

      <article class="doc__bloco">
        <h3>Como importar</h3>
        <p class="doc__descricao">
          Importe o módulo no módulo da aplicação ou da feature que abrirá o diálogo.
        </p>

        <div class="doc__code">
          <button type="button" class="copy-btn" (click)="copiar(codigoImportacao)">
            Copiar código
          </button>
          <pre><code>{{ codigoImportacao }}</code></pre>
        </div>
      </article>

      <article class="doc__bloco">
        <h3>Tipos disponíveis</h3>
        <p class="doc__descricao">
          Use atalhos para sucesso, erro e confirmação, ou configure manualmente warning, info e
          question pelo método abrir.
        </p>

        <div class="tipo-grid">
          <button type="button" class="tipo-card tipo-card--success" (click)="abrirSucesso()">
            <i class="fas fa-check-circle" aria-hidden="true"></i>
            <span>Success</span>
          </button>
          <button type="button" class="tipo-card tipo-card--error" (click)="abrirErro()">
            <i class="fas fa-times-circle" aria-hidden="true"></i>
            <span>Error</span>
          </button>
          <button type="button" class="tipo-card tipo-card--warning" (click)="abrirAvancado()">
            <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
            <span>Warning</span>
          </button>
          <button type="button" class="tipo-card tipo-card--info" (click)="abrirInfo()">
            <i class="fas fa-info-circle" aria-hidden="true"></i>
            <span>Info</span>
          </button>
          <button type="button" class="tipo-card tipo-card--question" (click)="abrirConfirmacao()">
            <i class="fas fa-question-circle" aria-hidden="true"></i>
            <span>Question</span>
          </button>
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
        <h3>Resultado da confirmação</h3>
        <p class="doc__descricao">
          O resultado do diálogo é emitido por afterClosed(). No exemplo abaixo, o último valor
          recebido aparece aqui.
        </p>
        <p class="resultado">{{ resultadoConfirmacao }}</p>
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
    '.tipo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; }',
    '.tipo-card { display: grid; gap: 8px; justify-items: center; border: 1px solid #dbe3ec; border-radius: 8px; background: #fff; padding: 14px 10px; cursor: pointer; font-weight: 700; }',
    '.tipo-card i { font-size: 22px; }',
    '.tipo-card:hover { background: #f8fafc; }',
    '.tipo-card--success i { color: #15803d; }',
    '.tipo-card--error i { color: #b91c1c; }',
    '.tipo-card--warning i { color: #b45309; }',
    '.tipo-card--info i { color: #0369a1; }',
    '.tipo-card--question i { color: #4338ca; }',
    '.resultado { margin: 0; border-left: 4px solid #005ea8; background: #eef6ff; padding: 10px 12px; color: #1f2937; font-weight: 600; }',
    '.doc__feedback { margin: 0; color: #166534; font-weight: 600; }'
  ]
})
export class DialogPageComponent {
  mensagemCopia = '';
  resultadoConfirmacao = 'Nenhum diálogo confirmado ou cancelado ainda.';

  codigoImportacao = [
    "import {NgModule} from '@angular/core';",
    "import {JusticaDialogModule} from '@justica/core/components';",
    '',
    '@NgModule({',
    '  imports: [JusticaDialogModule]',
    '})',
    'export class ProcessosModule {}'
  ].join('\n');

  exemplos: ExemploDialog[] = [
    {
      titulo: 'Uso básico',
      descricao: 'Usa os atalhos do service para exibir mensagens simples de sucesso e erro.',
      acao: 'Exibir sucesso',
      codigo: [
        "import {JusticaDialogService} from '@justica/core/components';",
        '',
        'constructor(',
        '  private readonly _justicaDialogService: JusticaDialogService',
        ') {}',
        '',
        'salvar(): void {',
        '  this._justicaDialogService.sucesso(',
        "    'Registro salvo',",
        "    'A operação foi realizada com sucesso.'",
        '  );',
        '}'
      ].join('\n')
    },
    {
      titulo: 'Confirmação padrão',
      descricao:
        'Exibe botões padrão pelo método confirmar e retorna o resultado por afterClosed().',
      acao: 'Confirmar exclusão',
      codigo: [
        'excluir(): void {',
        '  this._justicaDialogService',
        "    .confirmar('Deseja excluir?', 'Essa ação não poderá ser desfeita.')",
        '    .afterClosed()',
        '    .subscribe((confirmado) => {',
        '      if (confirmado) {',
        '        // executar exclusão',
        '      }',
        '    });',
        '}'
      ].join('\n')
    },
    {
      titulo: 'Configuração avançada',
      descricao: 'Configura tipo, textos dos botões, fechamento por ESC, clique fora e largura.',
      acao: 'Abrir avançado',
      codigo: [
        'this._justicaDialogService.abrir({',
        "  tipo: 'warning',",
        "  titulo: 'Atenção',",
        "  mensagem: 'Revise os dados antes de continuar.',",
        "  textoConfirmar: 'Continuar',",
        "  textoCancelar: 'Voltar',",
        '  exibirConfirmar: true,',
        '  exibirCancelar: true,',
        '  fecharAoClicarFora: false,',
        '  fecharComEsc: true,',
        "  largura: '36rem'",
        '});'
      ].join('\n')
    },
    {
      titulo: 'Botão customizado',
      descricao: 'Substitui o botão de confirmação por um componente declarado pela aplicação.',
      acao: 'Enviar processo',
      codigo: [
        'this._justicaDialogService.abrir({',
        "  tipo: 'question',",
        "  titulo: 'Enviar processo?',",
        "  mensagem: 'Confira os dados antes de confirmar.',",
        '  exibirConfirmar: true,',
        '  exibirCancelar: true,',
        '  componenteBotaoConfirmar: BotaoConfirmarDialogComponent',
        '});'
      ].join('\n')
    }
  ];

  constructor(private readonly _justicaDialogService: JusticaDialogService) {}

  executar(titulo: string): void {
    switch (titulo) {
      case 'Uso básico':
        this.abrirSucesso();
        return;
      case 'Confirmação padrão':
        this.abrirConfirmacao();
        return;
      case 'Configuração avançada':
        this.abrirAvancado();
        return;
      case 'Botão customizado':
        this.abrirCustomizado();
        return;
    }
  }

  abrirSucesso(): void {
    this._justicaDialogService.sucesso('Registro salvo', 'A operação foi realizada com sucesso.');
  }

  abrirErro(): void {
    this._justicaDialogService.erro(
      'Não foi possível salvar',
      'Tente novamente ou acione o suporte.'
    );
  }

  abrirInfo(): void {
    this._justicaDialogService.abrir({
      tipo: 'info',
      titulo: 'Processo encontrado',
      mensagem: 'Escolha como deseja continuar.',
      tempoFechamentoAutomaticoMs: 2000
    });
  }

  abrirConfirmacao(): void {
    this._justicaDialogService
      .confirmar('Deseja excluir?', 'Essa ação não poderá ser desfeita.')
      .afterClosed()
      .subscribe((confirmado) => {
        this.resultadoConfirmacao = confirmado
          ? 'Usuário confirmou a ação.'
          : 'Usuário cancelou ou fechou o diálogo.';
      });
  }

  abrirAvancado(): void {
    this._justicaDialogService.abrir({
      tipo: 'warning',
      titulo: 'Atenção',
      mensagem: 'Revise os dados antes de continuar.',
      textoConfirmar: 'Continuar',
      textoCancelar: 'Voltar',
      exibirConfirmar: true,
      exibirCancelar: true,
      fecharAoClicarFora: false,
      fecharComEsc: true,
      largura: '36rem'
    });
  }

  abrirCustomizado(): void {
    this._justicaDialogService
      .abrir({
        tipo: 'question',
        titulo: 'Enviar processo?',
        mensagem: 'Confira os dados antes de confirmar.',
        exibirConfirmar: true,
        exibirCancelar: true,
        componenteBotaoConfirmar: BotaoConfirmarDialogComponent
      })
      .afterClosed()
      .subscribe((confirmado) => {
        this.resultadoConfirmacao = confirmado
          ? 'Processo enviado pelo botão customizado.'
          : 'Envio cancelado.';
      });
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
