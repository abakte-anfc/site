# Validação — 4 de outubro de 2026

## Resultado

- npm run build: build estático gerado em site/dist.
- npm run check: referências locais, srcsets, âncoras, IDs, idioma, único h1, atributos de imagens e sintaxe de JavaScript aprovados.
- npm test: 20 testes de navegador aprovados.
- Revisão de código independente: nenhum bug importante encontrado; adequado para revisão local, com pendências de conteúdo documentadas.
- Revisão visual das capturas de desktop, celular, menu, áreas, experiência, contato e ampliação de texto.

## Cenários cobertos

- Larguras de 320, 390, 768 e 1440 px sem rolagem horizontal.
- Conteúdo, imagens e áreas de dança, teatro e música acessíveis.
- Âncora principal e demais referências locais existentes.
- Menu móvel por teclado, Escape, retorno de foco e mudança para desktop.
- Conteúdo e navegação funcionando sem JavaScript.
- Vídeo não solicitado antes do clique; reprodução, controles e duração verificados.
- Preferência por movimento reduzido e fonte ampliada a 200%.
- Axe com critérios WCAG 2 A/AA e 2.1 A/AA em celular (menu aberto) e desktop: zero violações automáticas. A verificação automática não cobre todos os aspectos de acessibilidade.
- Nenhuma imagem quebrada, falha HTTP local ou exceção JavaScript observada nos testes.

## Links e fatos

Instagram, WhatsApp e Google Maps responderam HTTP 200 em consulta. URLs e redirecionamentos registrados em verificacao-links.json. Isso verifica acesso técnico, sem comprovar a propriedade do número ou a atualização do endereço. A consulta pública do Instagram pela ferramenta de pesquisa não retornou conteúdo verificável. A confirmação da marca segue pendente.

O link de WhatsApp prepara a mensagem; nenhum envio foi realizado. O link de localização abre uma busca externa, sem mapa incorporado.

## Limites e evidências

Dados de referência, oferta atual, substituição de fonte e materiais faltantes listados em pendencias.md. Não publicar até resolver os itens aplicáveis.

Capturas em site/qa, incluindo tela-320.png, tela-390.png, tela-768.png, tela-1440.png, texto-200.png e menu-celular.png. Os originais de mídia foram preservados.

## Revisão dos efeitos e fundos

Build e verificação estática aprovados. Quatro testes adicionais cobrem autoplay sem áudio, loop e pausa; preferência por movimento reduzido sem carregamento de MP4; carrossel por botões, teclado e rolagem; entrada em cascata. A suíte de 14 testes inclui os cenários anteriores. Capturas atualizadas: fundos-desktop.png, fundos-celular.png, carrossel-desktop.png e carrossel-celular.png.

## FlexCarousel

20 testes aprovados após integração. Casos adicionais: WebGL com fotos locais (sem solicitações de fotos externas), navegação por botões/teclado, ampliação e Escape, alternativa sem WebGL, perda de contexto, movimento reduzido, acessibilidade automática da galeria aprimorada, larguras de 320 a 1440 px e texto a 200%. Regressão confirmada para espera fora de tela: prazo de inicialização conta apenas tempo visível em aba ativa. Revisão independente identificou esse caso, corrigido e testado. Capturas flex-desktop.png e flex-celular.png. Build e referências locais verificados.
