# Justica UI Workspace

Monorepo Angular 11 com foco na biblioteca `@justica/ui` e uma aplicação demo para validação visual e funcional dos componentes.

## Leitura Rápida

- README resumido da biblioteca (ideal para contexto de pacote/publicação): `projects/justica-ui/README.md`
- README completo do workspace (este arquivo): instalação, desenvolvimento, publish e troubleshooting

## Visão Geral

- Workspace: Angular CLI `11.1.2`
- Biblioteca principal: `projects/justica-ui`
- Aplicação demo: `projects/justica-ui-demo`
- Empacotamento da biblioteca: `ng-packagr`
- Registro local para testes de publish: Verdaccio (`http://localhost:4873`)

## Estrutura do Projeto

- `projects/justica-ui`: código da biblioteca exportada como `@justica/ui`
- `projects/justica-ui-demo`: app de demonstração e validação manual dos componentes
- `dist/justica-ui`: artefato gerado para empacotamento/publicação
- `scripts/start-dev.mjs`: fluxo de desenvolvimento integrado (watch da lib + subida da demo)
- `.verdaccio/`: configuração local do Verdaccio

## Requisitos

- Node.js (recomendado manter versão compatível com Angular 11)
- npm
- Docker (apenas para publish local com Verdaccio)

## Instalação

```bash
npm install
```

## Comandos Principais

- Desenvolvimento da demo: `npm run start:demo`
- Desenvolvimento integrado (watch lib + demo): `npm run start:dev`
- Build geral do workspace: `npm run build`
- Build da biblioteca (produção): `npm run build:justica-ui`
- Watch da biblioteca: `npm run watch:justica-ui`
- Testes: `npm run test`
- Lint: `npm run lint`
- Formatação: `npm run format`
- Validação de formatação: `npm run format:check`

## Publicação da Biblioteca

### Build de publicação

O script `build:justica-ui` executa:

```bash
ng build justica-ui --configuration production
```

Isso garante build compatível com o fluxo atual da biblioteca no projeto.

### Publish local (Verdaccio)

1. Subir o Verdaccio:

```bash
npm run verdaccio:up
```

2. Publicar no registro local:

```bash
npm run publish:local
```

3. Acompanhar logs (opcional):

```bash
npm run verdaccio:logs
```

4. Derrubar o Verdaccio (quando finalizar):

```bash
npm run verdaccio:down
```

Observação: o `README.md` em `projects/justica-ui` foi simplificado para exibição em contexto de pacote; use este README raiz para detalhes operacionais do workspace.

### Publish snapshot/release

- Snapshot: `npm run publish:snapshot`
- Release: `npm run publish:release`

## Uso da Biblioteca

### API pública

Entrypoint público da lib: `projects/justica-ui/src/public-api.ts`

Exporta:

- `JusticaUiModule`
- Componentes em `lib/components`
- Recursos de layout
- Services em `lib/services`
- Models em `lib/models`

### Exemplo de import

```ts
import {JusticaUiModule} from '@justica/ui';
```

### Configuração `forRoot`

```ts
JusticaUiModule.forRoot({
  enviroment: {
    production: false,
    apiUrl: 'http://localhost:3000'
  },
  exibirMenu: true
});
```

Observação: a interface atual usa a chave `enviroment` (grafia existente no projeto).

### Favicon

A biblioteca inclui `src/lib/assets/favicon.ico`. Apps consumidores precisam copiar esse asset no próprio `angular.json` e manter a referência no `index.html`; veja a seção "Uso do Favicon" em `projects/justica-ui/README.md`.

## Registro e `.npmrc`

O workspace possui:

- `@justica:registry=http://localhost:4873`
- `registry=https://registry.npmjs.org/`

Assim, pacotes `@justica/*` podem ser resolvidos/publicados localmente no Verdaccio quando ele estiver ativo.

## Qualidade e Convenções

- `husky` configurado com:
  - `pre-commit`: executa `lint-staged`
  - `commit-msg`: executa `commitlint`
- `prettier` para formatação
- `tslint` presente no workspace atual (stack Angular 11)

## Troubleshooting

- `ECONNREFUSED 127.0.0.1:4873` no `publish:local`
  - O Verdaccio não está ativo. Rode `npm run verdaccio:up`.

- Aviso `npm update check failed` com erro de permissão/cache
  - Aviso comum em ambientes Windows com npm antigo; não bloqueia o build da lib.

## Referências Rápidas

- Biblioteca: `projects/justica-ui`
- Demo: `projects/justica-ui-demo`
- Artefato de publish: `dist/justica-ui`
- README simplificado da biblioteca: `projects/justica-ui/README.md`
