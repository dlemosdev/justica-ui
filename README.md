# Justica UI Workspace

Monorepo Angular 11 da biblioteca `@justica/ui`, com uma aplicação demo para validar visualmente componentes, layout, estilos globais e integrações com `@justica/core`.

## Leitura Rapida

- Biblioteca publicada: `projects/justica-ui`
- Aplicacao demo: `projects/justica-ui-demo`
- README do pacote: `projects/justica-ui/README.md`
- README do layout: `projects/justica-ui/src/lib/layout/README.md`
- Artefato gerado para publicacao: `dist/justica-ui`

## Stack

- Angular CLI `11.1.2`
- Angular `11.1.1`
- TypeScript `4.1.2`
- RxJS `6.6`
- `ng-packagr` para empacotar a biblioteca
- ESLint com `@angular-eslint` no lugar de TSLint
- Prettier, Husky, lint-staged e commitlint para qualidade local
- Verdaccio para publish local

## Estrutura

- `projects/justica-ui`: codigo fonte da biblioteca `@justica/ui`
- `projects/justica-ui-demo`: app Angular usado como vitrine e validacao manual
- `projects/justica-ui/src/public-api.ts`: entrypoint publico agregado do pacote
- `projects/justica-ui/components`: entrypoint `@justica/ui/components`
- `projects/justica-ui/models`: entrypoint `@justica/ui/models`
- `projects/justica-ui/layout`: entrypoint `@justica/ui/layout`
- `projects/justica-ui/config`: entrypoint `@justica/ui/config`
- `projects/justica-ui/services`: entrypoint `@justica/ui/services`
- `projects/justica-ui/src/lib/components`: componentes reutilizaveis
- `projects/justica-ui/src/lib/layout`: layout completo, header, sidebar, menu e services
- `projects/justica-ui/src/lib/styles`: reset, tokens CSS e folha principal da biblioteca
- `scripts/start-dev.mjs`: fluxo local com watch da lib e demo
- `.verdaccio/`: configuracao local do registry Verdaccio

## Instalacao

```bash
npm install
```

O projeto tambem funciona com Yarn 1 para comandos de desenvolvimento, por exemplo:

```bash
yarn lint
```

## Comandos

```bash
npm run start:demo
npm run start:dev
npm run build
npm run build:justica-ui
npm run watch:justica-ui
npm run test
npm run lint
npm run format
npm run format:check
```

`start:dev` e o fluxo recomendado para desenvolvimento diario, pois mantém a biblioteca em watch e sobe a demo.

## Lint e Regras de Codigo

O workspace foi migrado de TSLint para ESLint. Os alvos `lint` em `angular.json` usam:

```json
"builder": "@angular-eslint/builder:lint"
```

Projetos cobertos:

- `justica-ui`: `projects/justica-ui/**/*.ts` e `projects/justica-ui/**/*.html`
- `justica-ui-demo`: `projects/justica-ui-demo/**/*.ts` e `projects/justica-ui-demo/**/*.html`

Regras principais:

- Componentes da biblioteca usam selector com prefixo `justica` em kebab-case.
- Componentes da demo usam selector com prefixo `app` em kebab-case.
- Diretivas da biblioteca usam prefixo `justica` em camelCase.
- Propriedades e parameter properties `private` devem usar underscore inicial.
- Exemplo: `private readonly _modalService: JusticaModalService`.
- Metodos `private` nao devem usar underscore.
- `private readonly` deve ser preferido quando a dependencia/campo nao e reatribuido.
- Strings usam aspas simples.
- `console` so permite `warn` e `error`.
- `any` gera warning; use tipos explicitos quando possivel.
- `public-api.ts` pode exportar barrels publicos.
- Imports internos da lib nao devem usar barrels de dominio como `../services`, `./models`, `../utils`; importe o arquivo especifico.

Exemplo recomendado:

```ts
import {JusticaSidebarEstadoService} from '../../services/justica-sidebar-estado.service';

constructor(private readonly _sidebarEstadoService: JusticaSidebarEstadoService) {}
```

## Arquitetura da Biblioteca

A biblioteca possui um entrypoint agregado em `projects/justica-ui/src/public-api.ts` e entrypoints secundarios deliberados na raiz da lib. Cada entrypoint secundario deve ter `ng-package.json` e `src/public-api.ts`, seguindo o modelo suportado pelo `ng-packagr`. Evite criar `package.json`, `tsconfig.*`, `karma.conf.js` ou `public-api.ts` aninhados dentro de `src/lib` como se fossem bibliotecas independentes.

Diretrizes para manter compatibilidade com Angular 11 e facilitar Angular 21+:

- Mantenha `NgModule` como API principal enquanto o projeto estiver em Angular 11.
- Exponha provider functions junto com o `forRoot`, como `provideJusticaUi`, para facilitar migração futura para standalone/bootstrap providers.
- Toda API consumida fora da lib deve sair por `src/public-api.ts`.
- APIs por dominio tambem devem sair pelo entrypoint secundario correspondente.
- Codigo interno deve importar arquivos especificos, nao barrels agregadores.
- Services singleton devem usar `providedIn: 'root'` quando fizer sentido.
- Componentes devem usar `ChangeDetectionStrategy.OnPush`.
- Estado derivado deve ficar em getters puros ou streams; em Angular 21+, migrar gradualmente para signals/computed.
- Evite ciclos entre barrels e implementacoes; barrels sao para fronteira publica, nao para uso interno.
- Preserve `strictMetadataEmit` e declarations no build da lib.
- Nao publique artefatos em `dist`; gere-os via build.

### Caminho Futuro para Angular 21+

Quando a stack for atualizada, a ordem recomendada e:

1. Migrar Angular major a major usando `ng update`.
2. Atualizar `ng-packagr` e o builder de library para o formato atual.
3. Ativar partial compilation quando a versao suportar:

```json
{
  "angularCompilerOptions": {
    "compilationMode": "partial"
  }
}
```

4. Adicionar APIs standalone sem remover imediatamente os modulos.
5. Evoluir consumers para `provideJusticaUi(...)` e depois reduzir dependencia de `forRoot`.
6. Migrar entradas/saidas novas para `input()`/`output()` apenas depois da atualizacao de Angular.
7. Migrar estado local para signals mantendo compatibilidade visual e de contrato publico.

## Implementacoes Atuais

Componentes publicados:

- `JusticaButtonComponent`: botao com severidade, variante, tamanho, icone, loading, estado disabled, modo fluid e rounded.
- `JusticaModalComponent` e `JusticaModalService`: modal projetado ou dinamico via service.
- `JusticaSidebarItemComponent`: item utilitario para recolher a sidebar em navegacoes internas.
- `JusticaLayoutComponent`: composicao principal com header, sidebar, menu e area de conteudo.
- `provideJusticaUi`: API de providers preparada para o modelo moderno, reutilizada pelo `JusticaUiModule.forRoot`.

Layout:

- Header com nome do projeto, versao, data/hora de Brasilia e acao de logout.
- Sidebar recolhivel com estado compartilhado por service.
- Menu carregado pelo `GestaoService`, com filtro de itens ativos/visiveis e suporte a submenus.
- Slots via `ng-content` para acoes no cabecalho e itens adicionais na sidebar.

Estilos:

- `justica-ui.css` centraliza os imports de reset, tokens e componentes.
- Tokens CSS seguem o prefixo `--justica-*`.
- Font Awesome e Roboto sao carregados pela folha principal da biblioteca.

## Uso da Biblioteca

```ts
import {JusticaUiModule} from '@justica/ui';
```

Imports por dominio:

```ts
import {JusticaButtonModule, JusticaModalService} from '@justica/ui/components';
import {JusticaUsuario} from '@justica/ui/models';
import {JusticaLayoutModule, TJusticaMenu} from '@justica/ui/layout';
import {provideJusticaUi} from '@justica/ui/config';
import {JusticaSidebarEstadoService} from '@justica/ui/services';
```

Configuracao:

```ts
JusticaUiModule.forRoot({
  exibirMenu: true
});
```

Uso do layout:

```html
<justica-layout nomeProjeto="Portal STJ" versao="1.0.0">
  <div justica-cabecalho-acoes>
    <!-- acoes do header -->
  </div>

  <div justica-sidebar-itens>
    <!-- itens extras da sidebar -->
  </div>

  <router-outlet></router-outlet>
</justica-layout>
```

## Estilos e Assets no App Consumidor

Adicione os estilos da biblioteca no `angular.json` do app consumidor:

```json
{
  "styles": [
    "src/styles.css",
    "node_modules/@justica/ui/src/lib/styles/justica-ui.css"
  ]
}
```

Para usar o favicon publicado pela biblioteca:

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

## Publicacao

Build de producao da biblioteca:

```bash
npm run build:justica-ui
```

Publish local com Verdaccio:

```bash
npm run verdaccio:up
npm run publish:local
npm run verdaccio:logs
npm run verdaccio:down
```

Publish remoto:

```bash
npm run publish:snapshot
npm run publish:release
```

## Troubleshooting

- `Unable to find TSLint`: algum alvo ainda esta usando `@angular-devkit/build-angular:tslint`; troque para `@angular-eslint/builder:lint`.
- `Unable to find ESLint`: instale `eslint`, `@typescript-eslint/parser` e `@typescript-eslint/eslint-plugin` compativeis com a linha do `@angular-eslint`.
- `ECONNREFUSED 127.0.0.1:4873`: o Verdaccio nao esta ativo; rode `npm run verdaccio:up`.
- `npm update check failed` ou `EPERM` em cache/log do npm no Windows: normalmente e permissao/cache do npm global. Com Yarn, `yarn lint` executa o lint sem esse erro de limpeza de cache.
