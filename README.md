# Realizarte — página institucional

Landing page em português com logo e fotografias autorizadas, navegação por âncoras e links de contato.

## Executar

```sh
npm ci
npm run build
npm run dev
```

Abra http://127.0.0.1:4173. Para hospedagem estática, use o conteúdo gerado em `site/dist`.

## Estrutura

- `site/src`: HTML, estilos, interações e ilhas React carregadas sob demanda.
- `components/ui`: carrossel de fotos em TypeScript e Button compatível com shadcn.
- `lib/utils.ts`: utilitário de classes.
- `site/src/components/LogoLoop.jsx`: React Bits na faixa original Dança / Teatro / Música, abaixo da abertura, sem botão de pausa.
- `site/assets`: mídia otimizada e fontes locais.
- `fotos`, `videos`, `LOGO.jpeg`: materiais originais autorizados e preservados.
- `site/docs`: origem dos materiais e pendências antes de publicação.
- `site/tests`: testes de navegação, acessibilidade e responsividade.

Usa React, TypeScript, Tailwind 4, shadcn e esbuild. Não há backend, rastreamento ou formulários. Os vídeos de fundo foram removidos; o registro em vídeo continua com reprodução manual. A galeria usa fotos locais, com controles e avanço automático. Movimento reduzido mantém as interações sem animação.

## Validar

```sh
npm run build
npm run typecheck
npm run check
npm test
```

Os testes usam Chromium. No ambiente original, `playwright.config.mjs` aponta para uma instalação local do Windows. Em outro computador, ajuste/remova `executablePath` e execute `npx playwright install chromium`.

Veja [site/CARROSSEL.md](site/CARROSSEL.md) e [pendências de publicação](site/docs/pendencias.md). O envio ao GitHub não publica automaticamente o site.
