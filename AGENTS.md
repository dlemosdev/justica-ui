# Instruções para agentes

Este arquivo define os padrões obrigatórios para qualquer agente que trabalhe neste
workspace. Responda e documente sempre em português do Brasil.

## Contexto do projeto

- Workspace Angular 11 para a biblioteca `@justica/ui`.
- Biblioteca principal: `projects/justica-ui`.
- Aplicação demo: `projects/justica-ui-demo`.
- Artefatos gerados: `dist/justica-ui` e `dist/justica-ui-demo`.
- Gerenciador padrão: npm, usando `package-lock.json`.
- Stack atual:
  - Angular CLI `11.1.2`.
  - Angular `11.1.1`.
  - TypeScript `4.1.2`.
  - RxJS `6.6`.
  - `ng-packagr` `11`.
  - Karma/Jasmine para testes.
  - ESLint com `@angular-eslint`.
  - Prettier, Husky, lint-staged e commitlint.

Antes de propor ou alterar código Angular, confira a versão real do projeto em
`package.json` e respeite as APIs disponíveis nessa versão.

## Uso obrigatório de documentação e skills

- Use Context7 MCP sempre que a tarefa envolver biblioteca, framework, SDK, API, CLI
  ou serviço em nuvem. Para Angular, resolva primeiro a biblioteca Angular no Context7
  e depois consulte a documentação relevante.
- Use a skill `angular-developer` em toda execução que envolva Angular, componentes,
  services, módulos, rotas, formulários, DI, estilos, testes, build ou CLI.
- A skill `angular-developer` deve orientar a implementação, mas a versão Angular 11
  deste projeto prevalece quando houver conflito com recomendações modernas do Angular.
- Não aplique APIs exclusivas de Angular moderno, como standalone components,
  `input()`, `output()`, signals, `computed()`, `resource()`, signal forms ou control
  flow `@if`/`@for`, enquanto o workspace permanecer em Angular 11.
- Quando o projeto for migrado para uma versão que suporte essas APIs, adote as
  recomendações modernas gradualmente, preservando compatibilidade pública.

## Princípios de implementação

- Preserve o contrato público da biblioteca.
- Prefira mudanças pequenas, coesas e alinhadas ao padrão existente.
- Não refatore áreas não relacionadas sem necessidade.
- Não edite arquivos gerados em `dist`; gere-os novamente por build.
- Não crie subpackages acidentais dentro de `src/lib`.
- Mantenha código interno desacoplado de barrels públicos.
- Toda API usada por consumidores deve ser exportada por `src/public-api.ts` ou pelo
  entrypoint secundário correspondente.

## Arquitetura do workspace

- `projects/justica-ui`: código-fonte da biblioteca publicada.
- `projects/justica-ui-demo`: aplicação usada como vitrine e validação manual.
- `projects/justica-ui/src/lib/components`: componentes reutilizáveis.
- `projects/justica-ui/src/lib/layout`: layout, header, sidebar, menu e services.
- `projects/justica-ui/src/lib/models`: modelos públicos.
- `projects/justica-ui/src/lib/configs`: configurações e providers.
- `projects/justica-ui/src/lib/styles`: tokens, reset e folha principal da biblioteca.
- `projects/justica-ui/src/public-api.ts`: entrypoint público agregado.

Entrypoints secundários ficam na raiz de `projects/justica-ui`:

- `components/src/public-api.ts` para `@justica/ui/components`.
- `models/src/public-api.ts` para `@justica/ui/models`.
- `layout/src/public-api.ts` para `@justica/ui/layout`.
- `configs/src/public-api.ts` para `@justica/ui/configs`.

Cada entrypoint secundário deve ter seu próprio `ng-package.json` e `src/public-api.ts`.
Não há entrypoint `@justica/ui/services` nesta versão.

## Angular

- Use `NgModule` como contrato principal enquanto o projeto estiver em Angular 11.
- Componentes da biblioteca devem usar seletor `justica-*`.
- Componentes da demo devem usar seletor `app-*`.
- Diretivas da biblioteca devem usar prefixo `justica` em camelCase.
- Componentes publicados devem usar `ChangeDetectionStrategy.OnPush`, salvo
  justificativa técnica clara.
- Use `@Input()` e `@Output()` para entradas e saídas em Angular 11.
- Services singleton devem usar `providedIn: 'root'` quando fizer sentido.
- Services escopados ao módulo podem ser declarados em `providers` do módulo
  correspondente, como ocorre com `JusticaModalService`.
- Injeção por construtor e `@Inject()` são padrões aceitos nesta base Angular 11.
- Mantenha `forRoot` para configuração global da biblioteca.
- Quando criar configurações novas, prefira também expor uma provider function
  reutilizável, seguindo o padrão de `provideJusticaUi`.
- Templates devem ser simples; mova regras complexas para getters, métodos pequenos ou
  services.
- Estado derivado deve ficar em getters puros ou streams RxJS.
- Gerencie assinaturas com `Subscription` e libere recursos em `ngOnDestroy`.
- Evite introduzir dependências novas sem necessidade clara.

## Imports e exports

- Dentro da biblioteca, importe arquivos específicos.
- Não use barrels internos de domínio como `../models`, `./models`, `../services`,
  `./services`, `../tokens`, `./tokens`, `../guards`, `./guards`,
  `../interceptors`, `./interceptors`, `../utils` ou `./utils`.
- Barrels são permitidos nas fronteiras públicas, especialmente `public-api.ts`.
- Evite ciclos entre barrels e implementações.
- Imports públicos para consumidores devem usar o pacote `@justica/ui` e os entrypoints
  secundários reais: `@justica/ui/components`, `@justica/ui/models`,
  `@justica/ui/layout` e `@justica/ui/configs`.

## TypeScript

- Use tipagem explícita em APIs públicas.
- Evite `any`; quando inevitável, limite o escopo e documente a razão.
- Não use non-null assertion (`!`) sem necessidade real.
- Prefira `readonly` para dependências e campos que não são reatribuídos.
- Propriedades e parameter properties `private` devem usar underscore inicial.
- Métodos `private` não devem usar underscore.
- Use `const` sempre que a variável não for reatribuída.
- Use aspas simples e ponto e vírgula.
- Limite linhas a 140 caracteres no lint e a 100 caracteres no Prettier quando possível.

Exemplo de dependência privada:

```ts
constructor(private readonly _modalService: JusticaModalService) {}
```

## HTML, CSS e design system

- Preserve os tokens CSS com prefixo `--justica-*`.
- A folha principal da biblioteca é `projects/justica-ui/src/lib/styles/justica-ui.css`.
- Estilos globais da biblioteca devem passar por tokens, reset ou folha principal.
- Estilos específicos de componente devem ficar ao lado do componente.
- Preserve a compatibilidade visual da demo.
- Use classes com prefixo coerente com o componente, seguindo o padrão atual
  `justica-*`.
- Não introduza estilos globais que afetem apps consumidores de forma imprevisível.
- Garanta estados acessíveis de foco, hover, disabled e loading em componentes
  interativos.

## Configuração pública

- `JusticaUiConfig` aceita `exibirMenu?: boolean` e `exibirTempoSessao?: boolean`.
- `JUSTICA_UI_CONFIG_PADRAO` mantém `exibirMenu` e `exibirTempoSessao` como `true`.
- `criarJusticaUiConfig` deve mesclar valores informados com o padrão.
- `provideJusticaUiConfig` e `provideJusticaUi` devem continuar retornando `Provider[]`
  compatível com Angular 11.
- `JusticaUiModule.forRoot` deve delegar a configuração para `provideJusticaUi`.

## Testes e validação

Execute validações proporcionais ao escopo da mudança:

- `npm run lint` para regras de TypeScript e templates.
- `npm run test` quando alterar comportamento testável.
- `npm run build:justica-ui` quando alterar a biblioteca.
- `npm run build` quando a mudança impactar biblioteca e demo.
- `npm run format:check` quando houver mudanças amplas de formatação.

A skill `angular-developer` recomenda validar com build ao finalizar geração de código
Angular. Neste workspace, o comando preferencial para biblioteca é:

```bash
npm run build:justica-ui
```

Use `npm run build` quando também precisar validar a aplicação demo.

## Comandos principais

```bash
npm install
npm run start:dev
npm run start:demo
npm run build
npm run build:justica-ui
npm run watch:justica-ui
npm run test
npm run lint
npm run format
npm run format:check
```

`npm run start:dev` é o fluxo recomendado para desenvolvimento local diário, pois
mantém a biblioteca em watch e sobe a demo.

## Publicação

- Build de produção da biblioteca: `npm run build:justica-ui`.
- Publicação local: `npm run verdaccio:up` e `npm run publish:local`.
- Publicação snapshot: `npm run publish:snapshot`.
- Publicação release: `npm run publish:release`.
- Não publique sem build limpo.
- Não edite manualmente o pacote gerado em `dist/justica-ui`.

## Commits e qualidade local

- O projeto usa commitlint com `@commitlint/config-conventional`.
- Mensagens de commit devem seguir Conventional Commits.
- O lint-staged roda Prettier para arquivos suportados e lint para TS/JS.
- Não reverta alterações de terceiros sem pedido explícito.
- Antes de commitar, confira `git status` e inclua apenas arquivos relacionados ao
  objetivo da mudança.

## Formato de arquivos

- Encoding: UTF-8.
- Indentação: 2 espaços.
- Inserir newline final.
- Remover espaços finais, exceto em Markdown quando necessário.
- Prettier:
  - `printWidth`: 100.
  - `tabWidth`: 2.
  - `semi`: true.
  - `singleQuote`: true.
  - `trailingComma`: none.
  - `bracketSpacing`: false.
  - `arrowParens`: always.
  - `endOfLine`: lf.

## Acessibilidade

- Componentes interativos devem ser acessíveis por teclado.
- Preserve foco visível.
- Use atributos ARIA apenas quando a semântica HTML nativa não for suficiente.
- Modais devem tratar foco, fechamento e interação externa com cuidado.
- Botões somente com ícone devem ter nome acessível.

## Compatibilidade futura com Angular moderno

Quando a stack for atualizada, siga uma migração progressiva:

1. Atualize Angular major a major com `ng update`.
2. Atualize Angular CLI, TypeScript, `ng-packagr`, testes e ESLint de forma compatível.
3. Mantenha `NgModule` e `forRoot` até os consumidores migrarem.
4. Introduza APIs standalone e provider functions sem quebrar consumidores atuais.
5. Migre componentes novos para `input()` e `output()` somente quando a versão suportar.
6. Migre estado local para signals e estado derivado para `computed()` gradualmente.
7. Migre templates para control flow moderno apenas depois da atualização de Angular.

## Checklist antes de finalizar

- A resposta final está em português do Brasil.
- A skill `angular-developer` foi usada quando a tarefa envolveu Angular.
- Context7 foi consultado quando houve referência a Angular ou outra biblioteca.
- A versão Angular 11 foi respeitada.
- As mudanças seguem ESLint, Prettier e arquitetura do workspace.
- A API pública foi preservada ou documentada.
- As validações relevantes foram executadas ou a impossibilidade foi informada.
