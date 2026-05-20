# Layout

Modulo de layout da biblioteca `@justica/ui`.

## Objetivo

Centralizar a estrutura visual padrao das aplicacoes: header, sidebar, menu, area principal de conteudo, acoes de cabecalho e pontos de extensao por `ng-content`.

## Componentes

- `JusticaLayoutComponent`: componente raiz do layout.
- `JusticaHeaderComponent`: cabecalho com nome do projeto, versao, data/hora de Brasilia e acao de logout.
- `JusticaSidebarComponent`: barra lateral recolhivel com informacoes do usuario.
- `JusticaMenuComponent`: renderiza o menu recuperado pelo service de gestao.
- `JusticaMenuItemComponent`: item de menu com suporte a submenus.
- `JusticaLogoutComponent`: conteudo do modal de logout.

## Services

- `JusticaSidebarEstadoService`: controla e compartilha o estado recolhido/expandido da sidebar.
- `GestaoService`: carrega o menu a partir das configuracoes de UI/core e filtra itens inativos ou invisiveis.

## Uso

```html
<justica-layout nomeProjeto="Portal STJ" versao="2.3.0">
  <div justica-cabecalho-acoes>
    <!-- acoes no header -->
  </div>

  <div justica-sidebar-itens>
    <!-- itens adicionais na sidebar -->
  </div>

  <router-outlet></router-outlet>
</justica-layout>
```

Inputs:

- `nomeProjeto`: texto exibido no header.
- `versao`: versao exibida no header.

Configuracao:

- `exibirMenu` vem de `JusticaUiModule.forRoot`.
- Quando `exibirMenu` for `false`, a area de menu deve ser ocultada pelo layout.

## Menu

O menu usa o tipo `TJusticaMenu` e considera:

- `label`: texto do item.
- `icon`: classe de icone.
- `module`, `route` ou `href`: destino do item.
- `items`: filhos/submenus.
- `visible: false`: remove o item da renderizacao.
- `active: false`: remove o item da renderizacao.

Itens sem `label` ou marcados como invisiveis/inativos sao filtrados.

## Estado da Sidebar

`JusticaSidebarEstadoService` expoe:

- `estadoRecolhido$`
- `obterEstadoAtual()`
- `alternar()`
- `recolher()`

Use o service quando um componente interno precisar sincronizar ou recolher a sidebar.

## Regras de Codigo

- Selectors de componentes do layout usam prefixo `justica`.
- Dependencias injetadas como `private readonly` usam underscore inicial.
- Exemplo: `private readonly _sidebarEstadoService: JusticaSidebarEstadoService`.
- Metodos privados nao usam underscore.
- Imports internos devem apontar para o arquivo especifico quando a regra de barrel se aplicar.
- `public-api.ts` pode reexportar a API publica do layout.
- A pasta `layout` faz parte da biblioteca principal `@justica/ui`; nao deve ter `package.json`, `tsconfig.*` ou build proprio.
- O entrypoint publico do layout fica em `projects/justica-ui/layout`, permitindo import como `@justica/ui/layout`.
- Services de estado compartilhado devem ficar pequenos, com responsabilidade unica e `providedIn: 'root'`.

## Evolucao Futura

Para Angular 21+, o layout deve ser migrado em etapas:

- manter os componentes atuais com `OnPush`;
- adicionar componentes standalone apenas depois da atualizacao do Angular;
- preservar `JusticaLayoutModule` durante uma janela de compatibilidade;
- migrar estado de sidebar/menu para signals quando a versao suportar;
- substituir `@HostListener` por `host` metadata em componentes novos quando o projeto estiver em Angular moderno;
- manter a API publica estavel via `projects/justica-ui/src/public-api.ts`.

## Desenvolvimento

Comandos a partir da raiz do workspace:

```bash
npm run build:justica-ui
npm run watch:justica-ui
npm run lint
```

Para validar visualmente mudancas no layout, use a demo:

```bash
npm run start:dev
```
