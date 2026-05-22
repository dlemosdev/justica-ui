# @justica/ui

Biblioteca Angular 11 de componentes, layout, estilos e configurações padronizadas
para aplicações Justiça.

## Instalação

```bash
npm install @justica/ui
```

Para testes locais de publicação, use o fluxo Verdaccio documentado no README da
raiz do workspace.

## Compatibilidade

- Angular CLI `11.1.2`.
- Angular `11.1.1`.
- TypeScript `4.1.2`.
- RxJS `6.6`.
- `ng-packagr` `11`.

Enquanto a biblioteca estiver em Angular 11, o contrato principal continua baseado
em `NgModule`, `@Input()`, `@Output()` e `forRoot`. Não use APIs exclusivas de
Angular moderno, como standalone components, signals, `input()`, `output()` ou
control flow `@if`/`@for`.

## Importação

Importação agregada:

```ts
import {JusticaUiModule} from '@justica/ui';
```

Configuração básica:

```ts
JusticaUiModule.forRoot({
  exibirMenu: true,
  exibirTempoSessao: true
});
```

Entrypoints secundários disponíveis:

```ts
import {JusticaButtonModule, JusticaModalModule, JusticaModalService} from '@justica/ui/components';
import {JusticaLayoutModule, JusticaMenu} from '@justica/ui/layout';
import {JusticaMenu as JusticaMenuModel} from '@justica/ui/models';
import {provideJusticaUi} from '@justica/ui/configs';
```

> Observação: não há entrypoint `@justica/ui/services` nesta versão. Serviços
> públicos devem ser consumidos pelo entrypoint agregado ou pelo domínio que os
> exporta.

## API Pública

O entrypoint público agregado fica em `src/public-api.ts` e exporta:

- configurações em `lib/configs`;
- componentes em `lib/components`;
- models em `lib/models`;
- layout em `lib/layout`;
- `JusticaUiModule`.

Entrypoints secundários:

- `components/src/public-api.ts` para `@justica/ui/components`;
- `models/src/public-api.ts` para `@justica/ui/models`;
- `layout/src/public-api.ts` para `@justica/ui/layout`;
- `configs/src/public-api.ts` para `@justica/ui/configs`.

Arquivos `index.ts` internos podem existir para compor a API pública da biblioteca,
mas código interno deve importar arquivos específicos e evitar barrels de domínio.

## Componentes

### Botão

`justica-button` é exportado por `JusticaButtonModule` e suporta:

- `label`;
- `icon`;
- `iconPos`: `left`, `right`, `top`, `bottom`;
- `severity`: `primary`, `secondary`, `success`, `info`, `warn`, `help`,
  `danger`, `contrast`, `transparent`;
- `variant`: `solid`, `outlined`, `text`, `link`;
- `size`: `small`, `normal`, `large`;
- `disabled`;
- `loading`;
- `rounded`;
- `fluid`;
- `type`: `button`, `submit`, `reset`;
- evento `aoClicar`.

Exemplo:

```html
<justica-button
  label="Salvar"
  icon="fa-solid fa-floppy-disk"
  severity="primary"
  (aoClicar)="salvar()"
></justica-button>
```

### Modal

`JusticaModalService` permite abrir um componente dinâmico:

```ts
this._modalService.abrirModal(ComponenteDoModal, {
  titulo: 'Confirmação',
  fecharAoClicarFora: true
});
```

Também é possível usar `justica-modal` com conteúdo projetado via `ng-content`.

### Sidebar Item

`justica-sidebar-item` recolhe a sidebar automaticamente quando detecta clique em
links internos. Links externos, `mailto:`, `tel:` e âncoras locais não disparam o
recolhimento.

## Layout

O layout principal é `justica-layout`, exportado por `JusticaLayoutModule` e por
`JusticaUiModule`.

```html
<justica-layout nomeProjeto="Portal STJ" versao="2.3.0">
  <div justica-cabecalho-acoes>
    <!-- ações no cabeçalho -->
  </div>

  <div justica-sidebar-itens>
    <!-- itens adicionais da sidebar -->
  </div>

  <router-outlet></router-outlet>
</justica-layout>
```

Inputs obrigatórios:

- `nomeProjeto`: nome exibido no cabeçalho;
- `versao`: versão exibida no cabeçalho.

Slots suportados:

- `[justica-cabecalho-acoes]`: área de ações no header;
- `[justica-sidebar-itens]`: conteúdo adicional da sidebar;
- conteúdo sem seletor: área principal da página.

O menu usa o tipo `JusticaMenu` e é carregado a partir de `gestao/menu`, usando a
URL base de `@justica/core`. Itens com `active: false` ou `visible: false` são
filtrados antes da renderização.

## Configuração

`JusticaUiConfig` aceita:

- `exibirMenu?: boolean`;
- `exibirTempoSessao?: boolean`.

Valores padrão:

```ts
{
  exibirMenu: true,
  exibirTempoSessao: true
}
```

APIs relacionadas:

- `JUSTICA_UI_CONFIG`;
- `JUSTICA_UI_CONFIG_PADRAO`;
- `criarJusticaUiConfig`;
- `provideJusticaUiConfig`;
- `provideJusticaUi`.

`provideJusticaUi` é usado internamente por `JusticaUiModule.forRoot` e prepara a
biblioteca para uma migração futura de providers, sem alterar o contrato Angular 11.

## Estilos

Adicione a folha principal da biblioteca no `angular.json` do app consumidor:

```json
{
  "styles": ["src/styles.css", "node_modules/@justica/ui/src/lib/styles/justica-ui.css"]
}
```

`justica-ui.css` importa:

- `tokens.css`;
- `reset.css`;
- estilos dos componentes e layout;
- Roboto;
- Font Awesome.

Os tokens usam o prefixo `--justica-*`.

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

- Componentes da lib devem usar selector `justica-*`.
- Diretivas da lib devem usar prefixo `justica` em camelCase.
- Componentes publicados devem usar `ChangeDetectionStrategy.OnPush`, salvo
  justificativa técnica clara.
- Campos e parameter properties `private` devem começar com `_`.
- Métodos `private` não usam `_`.
- Use `readonly` para dependências e campos privados não reatribuídos.
- Use aspas simples e ponto e vírgula.
- Tipos públicos devem ser explícitos.
- Evite `any`; quando inevitável, limite o escopo e documente a razão.
- Imports internos não devem usar barrels de domínio como `../services`,
  `./models`, `../utils` ou equivalentes; importe o arquivo específico.
- Barrels públicos continuam permitidos em `public-api.ts` e nos entrypoints
  secundários.
- Não crie subpackages acidentais dentro de `src/lib`; entrypoints secundários ficam
  na raiz da lib, ao lado de `src`.

### IntelliJ/WebStorm

Como a lib evita barrels em imports internos, o IntelliJ/WebStorm pode sugerir
`Import can be shortened` quando existir um `index.ts` no caminho.

Para remover esse alerta no projeto:

1. Abra `Settings`.
2. Acesse `Editor > Inspections`.
3. Pesquise por `Import can be shortened`.
4. Em `JavaScript and TypeScript > General`, desmarque `Import can be shortened`.
5. Mantenha o profile como `Project Default` para aplicar a configuração ao projeto.

## Preparação para Angular Moderno

Quando a stack for atualizada, a migração deve ser gradual:

1. Atualize Angular major a major com `ng update`.
2. Atualize Angular CLI, TypeScript, `ng-packagr`, testes e ESLint de forma compatível.
3. Mantenha `NgModule` e `forRoot` até os consumidores migrarem.
4. Introduza APIs standalone e provider functions sem quebrar consumidores atuais.
5. Migre entradas e saídas novas para `input()` e `output()` somente quando a versão
   suportar.
6. Migre estado local para signals e estado derivado para `computed()` gradualmente.
7. Migre templates para control flow moderno apenas depois da atualização de Angular.

## Desenvolvimento

Comandos a partir da raiz do workspace:

```bash
npm run build:justica-ui
npm run watch:justica-ui
npm run lint
```

Para validar visualmente mudanças na biblioteca e na demo:

```bash
npm run start:dev
```
