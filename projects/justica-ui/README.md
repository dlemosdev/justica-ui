# @justica/ui

Biblioteca de componentes Angular do workspace Justica UI.

## Instalação

```bash
npm install @justica/ui
```

Para testes locais com Verdaccio, use o fluxo no README principal do workspace.

## Uso Básico

```ts
import { JusticaUiModule } from '@justica/ui';
```

Exemplo de configuração:

```ts
JusticaUiModule.forRoot({
  enviroment: {
    production: false,
    apiUrl: 'http://localhost:3000'
  },
  exibirMenu: true
});
```

## Uso do Layout

O layout principal da biblioteca é o componente `justica-layout`, exportado por `JusticaLayoutModule` e também pelo `JusticaUiModule`.

### Propriedades principais

- `nomeProjeto`: nome exibido no cabeçalho (padrão: `Layout`)
- `versao`: versão exibida no cabeçalho (padrão: `1.0.0`)
- `exibirMenu`: definido via `forRoot` em `JusticaUiModule` (padrão: `true`)

### Estrutura com slots (ng-content)

```html
<justica-layout nomeProjeto="Portal STJ" versao="2.3.0">
  <div justica-cabecalho-acoes>
    <!-- ações no cabeçalho -->
  </div>

  <div justica-sidebar-itens>
    <!-- itens adicionais da sidebar -->
  </div>

  <!-- conteúdo principal da página -->
  <router-outlet></router-outlet>
</justica-layout>
```

Slots suportados:

- `[justica-cabecalho-acoes]`: área de ações no cabeçalho
- `[justica-sidebar-itens]`: área customizável da barra lateral
- conteúdo sem seletor: área principal da página

## Uso de Styles

Os estilos base da biblioteca ficam em `src/lib/styles`:

- `justica-ui.css`: ponto de entrada dos estilos
- `tokens.css`: design tokens (cores, espaçamentos, tipografia)
- `reset.css`: reset/base global

O arquivo `justica-ui.css` também importa:

- fonte Roboto (Google Fonts)
- Font Awesome (`@fortawesome/fontawesome-free`)

### Como aplicar no app consumidor

Adicione no `styles` do `angular.json` do app:

```json
{
  "styles": [
    "src/styles.css",
    "node_modules/@justica/ui/src/lib/styles/justica-ui.css"
  ]
}
```

Com isso, os componentes passam a usar os tokens CSS `--justica-*` e o reset visual padrão da biblioteca.

## Uso do Favicon

A biblioteca publica um favicon em `src/lib/assets/favicon.ico`, mas o navegador só aplica favicon quando a aplicação consumidora copia esse arquivo para o build e referencia o arquivo no `index.html`.

No `angular.json` do app consumidor, adicione o asset:

```json
{
  "assets": [
    {
      "glob": "favicon.ico",
      "input": "node_modules/@justica/ui/src/lib/assets",
      "output": "/"
    },
    "src/assets"
  ]
}
```

No `src/index.html` do app consumidor, mantenha ou adicione:

```html
<link rel="icon" type="image/x-icon" href="favicon.ico" />
```

Observação: o favicon pode ficar em cache no navegador. Se a troca não aparecer imediatamente, limpe o cache ou teste em uma janela anônima.

## Desenvolvimento da Biblioteca

- Build de publicação: `npm run build:justica-ui`
- Watch da biblioteca: `npm run watch:justica-ui`
- Testes: `ng test justica-ui`

## Documentação Completa

Para detalhes de workspace, demo, publicação (Verdaccio/Nexus), troubleshooting e convenções:

- `README.md` na raiz do repositório
