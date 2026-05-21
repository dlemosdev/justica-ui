# @justica/ui

Biblioteca Angular 11 de componentes, layout e estilos padronizados para aplicacoes Justica.

## Instalacao

```bash
npm install @justica/ui
```

Para testes locais de publicacao, use o fluxo Verdaccio documentado no README da raiz do workspace.

## Importacao

```ts
import {JusticaUiModule} from '@justica/ui';
```

Configuracao basica:

```ts
JusticaUiModule.forRoot({
  exibirMenu: true
});
```

Entrypoints secundarios:

```ts
import {JusticaButtonModule, JusticaModalModule} from '@justica/ui/components';
import {JusticaUsuario} from '@justica/ui/models';
import {JusticaLayoutModule, TJusticaMenu} from '@justica/ui/layout';
import {provideJusticaUi} from '@justica/ui/config';
import {JusticaSidebarEstadoService} from '@justica/ui/services';
```

## API Publica

O entrypoint publico fica em `src/public-api.ts` e exporta:

- `provideJusticaUi`
- `JUSTICA_UI_CONFIG`
- `JusticaUiConfig`
- `JusticaUiModule`
- Componentes em `lib/components`
- Layout principal e modulo de layout
- Tipos publicos de layout
- `JusticaSidebarEstadoService`
- Models publicos

Entrypoints secundarios:

- `components/src/public-api.ts` -> `@justica/ui/components`
- `models/src/public-api.ts` -> `@justica/ui/models`
- `layout/src/public-api.ts` -> `@justica/ui/layout`
- `config/src/public-api.ts` -> `@justica/ui/config`
- `services/src/public-api.ts` -> `@justica/ui/services`

Exports internos de desenvolvimento podem existir em arquivos `index.ts`, mas consumidores devem importar pelo pacote:

```ts
import {JusticaButtonModule, JusticaUiModule} from '@justica/ui';
```

## Componentes

### Botao

`justica-button` suporta:

- `label`
- `icon`
- `iconPos`: `left`, `right`, `top`, `bottom`
- `severity`: `primary`, `secondary`, `success`, `info`, `warn`, `help`, `danger`, `contrast`, `transparent`
- `variant`: `solid`, `outlined`, `text`, `link`
- `size`: `small`, `normal`, `large`
- `disabled`
- `loading`
- `rounded`
- `fluid`
- `type`: `button`, `submit`, `reset`
- evento `aoClicar`

### Modal

`JusticaModalService` permite abrir componente dinamico:

```ts
this._modalService.abrirModal(ComponenteDoModal, {
  titulo: 'Confirmacao',
  fecharAoClicarFora: true
});
```

Tambem e possivel usar `justica-modal` com conteudo projetado via `ng-content`.

### Sidebar Item

`justica-sidebar-item` recolhe a sidebar automaticamente ao detectar clique em links internos.

## Layout

O layout principal e `justica-layout`, exportado por `JusticaLayoutModule` e por `JusticaUiModule`.

```html
<justica-layout nomeProjeto="Portal STJ" versao="2.3.0">
  <div justica-cabecalho-acoes>
    <!-- acoes no cabecalho -->
  </div>

  <div justica-sidebar-itens>
    <!-- itens adicionais da sidebar -->
  </div>

  <router-outlet></router-outlet>
</justica-layout>
```

Slots suportados:

- `[justica-cabecalho-acoes]`: area de acoes no header
- `[justica-sidebar-itens]`: conteudo adicional da sidebar
- conteudo sem seletor: area principal da pagina

## Estilos

Adicione a folha principal da biblioteca no `angular.json` do app consumidor:

```json
{
  "styles": [
    "src/styles.css",
    "node_modules/@justica/ui/src/lib/styles/justica-ui.css"
  ]
}
```

`justica-ui.css` importa:

- `tokens.css`
- `reset.css`
- estilos dos componentes e layout
- Roboto
- Font Awesome

Os tokens usam prefixo `--justica-*`.

## Favicon

A biblioteca publica `src/lib/assets/favicon.ico`. Para usar no app consumidor:

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

No `index.html`:

```html
<link rel="icon" type="image/x-icon" href="favicon.ico" />
```

## Regras de Desenvolvimento

- Components da lib devem usar selector `justica-*`.
- Diretivas da lib devem usar prefixo `justica`.
- Campos e parameter properties `private` devem comecar com `_`.
- Exemplo: `private readonly _service: JusticaModalService`.
- Metodos `private` nao usam `_`.
- Use `readonly` para dependencias e campos privados nao reatribuidos.
- Imports internos nao devem usar barrels de dominio como `../services` ou `./models`; importe o arquivo especifico.
- Barrels publicos continuam permitidos em `public-api.ts`.
- Use aspas simples e ponto e virgula.
- Evite ciclos entre barrels e implementacoes. Dentro da lib, prefira imports diretos de arquivo.
- Nao crie subpackages acidentais dentro de `src/lib`; entrypoints secundarios ficam na raiz da lib, ao lado de `src`.

### IntelliJ/WebStorm

Como a lib evita barrels em imports internos, o IntelliJ/WebStorm pode sugerir `Import can be shortened` quando existir um `index.ts` no caminho.

Para remover esse alerta no projeto:

1. Abra `Settings`.
2. Acesse `Editor > Inspections`.
3. Pesquise por `Import can be shortened`.
4. Em `JavaScript and TypeScript > General`, desmarque `Import can be shortened`.
5. Mantenha o profile como `Project Default` para aplicar a configuracao ao projeto.

## Preparacao para Angular 21+

Enquanto a biblioteca estiver em Angular 11, mantenha `NgModule` e `forRoot` como contrato principal. Para facilitar a migração futura, novas configuracoes devem tambem expor provider functions. A funcao atual e:

```ts
provideJusticaUi({
  exibirMenu: true
});
```

Em Angular 11 ela e usada internamente pelo `JusticaUiModule.forRoot`. Em uma aplicacao futura standalone, a mesma ideia podera ser reaproveitada no bootstrap da aplicacao.

Nao use APIs exclusivas de Angular moderno, como `input()`, `output()`, signals ou control flow `@if/@for`, enquanto a versao do workspace permanecer em Angular 11.

## Desenvolvimento

```bash
npm run build:justica-ui
npm run watch:justica-ui
npm run lint
```

O lint da biblioteca usa ESLint via `@angular-eslint/builder:lint`.
