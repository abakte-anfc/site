# Design — Realizarte

## Propósito e referência

Direção de design para a landing page institucional definida em AGENTS.md. O objetivo principal é apresentar a marca e sua experiência artística; contato e descoberta das modalidades são ações secundárias.

Este documento parte da logo enviada pelo usuário e das fontes escolhidas: Bebas Neue Regular, para maior força, e Bebas Neue Pro Book, para maior sofisticação. As medidas e cores abaixo são uma proposta para o site, não um manual oficial existente.

## Conceito: força e sensibilidade

A logo combina uma parte tipográfica densa com outra leve e alongada. O desenho orgânico à esquerda contrapõe curvas aos traços retos das letras; os pictogramas apresentam as expressões artísticas dentro de molduras simples.

Traduzir esse contraste em títulos marcantes, complementos leves, fundos claros e fotografias humanas. A página deve lembrar uma apresentação editorial de um estúdio de artes: expressiva, organizada e acolhedora.

Não reproduzir a logo por digitação nem presumir sua divisão exata em fontes. Usar o arquivo oficial como unidade gráfica.

## Paleta

A referência recebida é monocromática. Preservar preto e branco como base da identidade. As cores das fotografias podem trazer emoção sem estabelecer uma nova cor institucional.

| Token | Valor proposto | Uso |
|---|---|---|
| `background` | `#FFFFFF` | Fundo principal |
| `surface` | `#F5F5F2` | Alternância suave entre seções |
| `ink` | `#242424` | Títulos, texto principal e botões |
| `muted` | `#626262` | Textos complementares |
| `line` | `#D8D8D3` | Divisórias decorativas |
| `inverse` | `#FFFFFF` | Texto sobre superfícies escuras |

Os valores são aproximações de design, não cores extraídas com precisão do JPG. Não adicionar dourado, roxo ou rosa como cor de marca sem orientação posterior.

Divisórias claras não devem ser o único recurso para identificar controles. Usar contornos escuros e foco visível nos elementos interativos.

## Tipografia

### Bebas Neue Regular — presença

Usar nos títulos principais, nomes das áreas artísticas e chamadas curtas. A força deve vir da fonte original, da escala e da composição; não aplicar negrito sintético para aumentar o peso.

Títulos devem ser curtos, com poucas linhas e espaçamento moderado. Evitar blocos longos em letras condensadas.

### Bebas Neue Pro Book — leveza

Usar em complementos de títulos, frases editoriais curtas, categorias e legendas de maior tamanho. Preservar o desenho fino e o espaço ao redor.

Não usar o peso Book em texto pequeno sobre fotografias ou em contraste insuficiente. Sofisticação deve resultar de proporção e legibilidade.

### Texto de leitura

Para parágrafos, endereço, navegação e controles, usar uma família sem serifa de leitura confortável. A opção inicial é a pilha do sistema: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

Essa família é funcional e complementar. As duas Bebas continuam sendo as fontes de expressão da marca. Não usar uma fonte condensada em todo o site.

### Escala proposta

| Elemento | Fonte | Desktop | Celular | Entrelinha |
|---|---|---|---|---|
| Título de abertura | Bebas Neue Regular | 80–112 px | 48–64 px | 0,98–1,05 |
| Título de seção | Bebas Neue Regular | 48–64 px | 36–44 px | 1,05–1,12 |
| Complemento editorial | Bebas Neue Pro Book | 30–40 px | 24–30 px | 1,15–1,25 |
| Nome de modalidade | Bebas Neue Regular | 32–40 px | 28–32 px | 1,1 |
| Texto corrente | Sistema | 18 px | 16–18 px | 1,55–1,7 |
| Navegação e botões | Sistema | 16 px | 16 px | 1,3–1,5 |
| Legenda | Sistema | 14–16 px | 14–16 px | 1,5 |

Usar tamanhos fluidos entre esses intervalos. Conferir que as letras e os acentos não sejam cortados pela entrelinha.

Aplicar espaçamento entre letras de aproximadamente `0.01em` nos títulos fortes e até `0.04em` nos complementos leves. Não espaçar parágrafos artificialmente.

### Arquivos de fonte

Usar arquivos web autorizados, preferencialmente WOFF2. Confirmar a disponibilidade e a licença da Bebas Neue Pro Book; não pressupor que ela está disponível em um serviço gratuito.

Mapear cada arquivo ao seu peso real. Não simular Pro Book reduzindo a opacidade ou deformando Bebas Neue Regular. Enquanto o arquivo não estiver disponível, registrar a substituição como provisória.

Usar `font-display: swap`, carregar apenas os estilos necessários e verificar os caracteres do português.

## Uso da logo

- Preservar proporções, desenho, letras, árvore, molduras e pictogramas.
- Não esticar, inclinar, aplicar sombra, gradiente ou substituir partes por ícones genéricos.
- Preferir SVG ou PNG oficial adequado à web. O JPG recebido é referência; não converter automaticamente para vetor e chamar o resultado de original.
- O arquivo enviado contém bastante espaço branco. Solicitar uma versão com área de arte adequada ou preparar uma cópia de exibição sem cortar nenhum elemento da marca.
- Reservar como margem mínima proposta ao redor da arte 10% da sua altura visível. Essa medida é provisória e deve ceder a um manual oficial.
- Usar a versão completa onde a assinatura e os pictogramas permaneçam legíveis. Na abertura, ela pode ter maior presença do que no cabeçalho.
- Para o cabeçalho pequeno, usar uma versão reduzida oficial, se disponível. Não remover a assinatura por conta própria.
- Sem versão reduzida, manter a marca completa sobre fundo claro, com largura suficiente, e colocar o menu abaixo no celular quando necessário.
- Usar em fundo escuro somente uma versão negativa aprovada. Não inverter o JPG com filtro CSS.
- Texto alternativo: “Realizarte — estúdio de dança, teatro e música”.

O pictograma de película aparece na logo, mas não comprova uma modalidade de cinema. Apresentar apenas as atividades confirmadas.

## Composição e espaçamento

- Conteúdo central com largura máxima de 1200 px.
- Margens laterais de 24 px no celular e 48–64 px em telas maiores.
- Grade de 12 colunas no desktop; uma coluna principal no celular.
- Espaçamento baseado em múltiplos de 8 px: 8, 16, 24, 32, 48, 64 e 96.
- Seções com respiro vertical de 80–112 px no desktop e 48–64 px no celular.
- Parágrafos com largura aproximada de 55–65 caracteres por linha.
- Usar assimetria controlada: título, texto e fotografia não precisam formar blocos idênticos em todas as seções.

Priorizar áreas abertas e divisórias finas. Evitar colocar cada trecho de conteúdo dentro de um cartão.

## Aplicação por seção

### Cabeçalho

Fundo branco, logo à esquerda e navegação discreta à direita. Altura determinada pela legibilidade da marca, sem comprimi-la para caber em uma barra estreita. Separação por linha fina, sem sombra pesada.

### Abertura

Composição em duas colunas: mensagem institucional à esquerda e fotografia real à direita. No celular, texto seguido de imagem.

“Realizando sonhos” pode usar Bebas Neue Regular; “com arte” pode usar Bebas Neue Pro Book em uma segunda linha. Manter toda a frase como um único título semântico, com contraste de fonte entre seus trechos.

Descrição factual em fonte de leitura. Ação principal “Conheça o Realizarte”, levando à seção Sobre. Não usar fotografia de fundo com texto sobre rostos.

### Sobre

Texto curto, título forte e uma imagem de aula ou convivência. Um detalhe linear orgânico pode dialogar com a árvore da logo, desde que seja discreto e não constitua uma nova versão do símbolo.

### Áreas artísticas

Dança, Teatro e Música em três blocos editoriais com títulos fortes, descrições curtas e fotos reais. Sem ícones decorativos duplicando o conteúdo de cada fotografia.

No celular, empilhar os blocos. Não depender de interação com o mouse para revelar informações essenciais.

### Experiência e comunidade

Alternar retratos, ensaios e cenas de convivência. Usar a fonte Book em uma frase curta de apoio, mantendo as informações factuais na fonte de leitura. Relatos somente quando reais e autorizados.

### Espetáculos

Uma seção escura pode evocar o palco e criar contraste com a base clara. Título em branco, imagens amplas e legendas legíveis. Sem logo invertida artificialmente.

Galeria estática com ritmos diferentes de imagem, mantendo ordem de leitura simples. Não usar reprodução automática de vídeos.

### Contato e rodapé

Retornar ao fundo claro. Endereço, cidade e canais com boa legibilidade. WhatsApp como botão secundário de contorno; Instagram como link textual. Evitar botão flutuante cobrindo conteúdo no celular.

## Fotografias

Dar preferência a imagens reais e autorizadas de aulas, preparação, convivência e apresentações. Preservar tons de pele e iluminação de palco; evitar filtros que transformem todas as fotografias em preto e branco.

Usar cortes que preservem rostos e gestos. Conferir cada recorte no celular; `object-position` deve ser definido por imagem quando necessário.

Priorizar proporções 4:5 para retratos e 3:2 ou 16:9 para palco. Evitar mosaicos com miniaturas que escondam as pessoas.

## Componentes e interação

- Botão principal: fundo `ink`, texto branco e altura mínima proposta de 48 px.
- Botão secundário: fundo transparente, contorno escuro e texto `ink`.
- Cantos levemente arredondados, cerca de 6–8 px. Reservar molduras mais arredondadas para detalhes que dialoguem com a logo.
- Links com indicação clara de interação, além da cor.
- Foco com contorno visível de 2–3 px e afastamento do componente.
- Animações discretas de opacidade ou deslocamento, com duração de 160–240 ms.
- Respeitar movimento reduzido; manter o conteúdo visível mesmo se scripts de animação falharem.
- Evitar efeitos de cursor, parallax intenso, letreiros infinitos e animação da logo.

## Responsividade e acessibilidade

Revisar a composição a partir de 320 px de largura. Quebrar títulos por sentido, sem impedir ajustes naturais do texto. Não reduzir a logo e a fonte Book até perder legibilidade.

Manter ordem lógica de leitura, navegação por teclado e contraste adequado. Validar a interface com ampliação de texto, menu aberto e preferência por movimento reduzido.

## Materiais necessários

- Logo oficial em formato apropriado para a web e eventuais versões reduzida e negativa.
- Arquivos e autorização de uso das duas fontes escolhidas.
- Fotografias autorizadas, com indicação de créditos.
- Conteúdo institucional e oferta atual confirmados pela marca.

Essas dependências não impedem a preparação do layout, mas devem estar resolvidas antes de publicar uma versão final que dependa delas.

## Checklist visual de entrega

1. A marca é o elemento principal da página.
2. Bebas Neue Regular transmite força e Pro Book aparece com leveza e legibilidade.
3. A logo permanece íntegra e com proporções corretas.
4. Preto, branco e fotografias conduzem a identidade.
5. Textos longos usam fonte confortável para leitura.
6. Dança, teatro e música têm presença proporcional à oferta confirmada.
7. Imagens preservam rostos e gestos em todas as telas.
8. Contato é fácil de encontrar sem dominar a apresentação institucional.
9. Não há conteúdo fictício, fontes simuladas ou arquivos de preenchimento na versão final.
10. A página foi revisada visualmente no celular e no desktop.
