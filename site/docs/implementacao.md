# Implementação — Realizarte

Página institucional estática em HTML, CSS e JavaScript, baseada em AGENTS.md e design.md. Prioridade à marca e à experiência artística; contato secundário. Base monocromática com fotos coloridas autorizadas. Originais preservados.

## Plano executado

1. Inspeção e seleção de fotos e vídeos; geração de imagens responsivas.
2. Implementação de abertura, sobre, áreas artísticas, experiência, registros, contato e rodapé.
3. Menu móvel com controle por teclado e vídeo carregado após ação.
4. Build estático em site/dist e servidor local em 127.0.0.1.
5. Validação de referências, navegação, contraste, teclado e telas de 320 a 1440 px.

## Decisões de conteúdo

- Logo completa: recorte somente das margens brancas. Nenhuma parte do desenho foi alterada ou convertida para vetor.
- Fotos de palco apresentadas sem atribuição de aulas, nomes, datas ou títulos de espetáculos.
- Três áreas apresentadas factualmente, sem listar modalidades específicas, idades, horários ou matrícula.
- Áreas organizadas como blocos editoriais de texto: imagens de teatro e música não foram fornecidas. Não usar fotos de dança como prova dessas atividades.
- Experiência: quadro extraído do primeiro vídeo, em 00:03, mostrando pessoas observando fotografias. Não identificar cargos nem usar falas como depoimentos.
- Vídeo: trecho de 15 segundos extraído do terceiro arquivo a partir de 00:03, sem áudio, com descrição textual, identificado como arquivo. Os três originais permanecem intactos. Os vídeos com falas não foram incluídos integralmente, pois não foram fornecidas legendas.
- Fontes: Bebas Neue Regular local, com licença OFL. Complemento e corpo em fonte do sistema; substituição provisória da Pro Book ausente, sem simulação.
- Endereço e contatos transcritos do AGENTS.md para revisão local. Confirmar antes da publicação.
- Nenhum link de inscrição encerrada ou ingresso foi utilizado.
- Sem domínio confirmado, não configurar URL canônica ou URLs absolutas de compartilhamento.
- Sem backend, formulários, rastreamento, cookies não essenciais ou incorporação do Instagram.

## Materiais

A autorização das 34 fotos e 3 vídeos foi confirmada pelo usuário nesta conversa. Origem e transformações dos arquivos utilizados: materiais.json. Nenhum crédito específico foi informado; incluir créditos acordados se fornecidos.

Bebas Neue Regular e licença obtidas de:
https://github.com/google/fonts/tree/main/ofl/bebasneue

## Atualização solicitada: movimento e carrossel

O usuário solicitou expressamente a mudança das orientações iniciais de galeria estática e vídeo sob demanda para: efeito de entrada em cascata, carrossel e vídeos de fundo em loop automático, com baixa opacidade.

- Cascata aplicada uma vez ao entrar em tela, com pequenos atrasos entre os elementos.
- Carrossel manual com seis fotos, botões anterior/próxima, deslize e teclado (setas, Home e End). Sem JavaScript, a galeria estática continua disponível.
- Três fundos de vídeo nas seções Abertura, Áreas artísticas e Registros. Opacidades: 10%, 7,5% e 12%, respectivamente.
- Trechos silenciosos de 12 a 15 segundos preparados a partir dos três vídeos autorizados. Origem registrada em fundos.json; originais preservados.
- Autoplay muted/playsinline, loop e controle global de pausa na abertura. Navegadores que bloqueiam autoplay permitem tentativa por clique.
- Os fundos fora de tela e em aba oculta ficam pausados. Movimento reduzido impede o carregamento e a reprodução automática dos fundos; o visitante pode iniciar pelo controle.
- O trecho de arquivo com controles nativos continua disponível separadamente.

## Integração FlexCarousel

Fonte JavaScript + CSS fornecida pelo usuário, baseada em React Bits. React/React DOM/OGL usados somente na galeria; build estático via esbuild com carregamento adiado perto da seção. Configuração liquid/rise/cardHeight 0.5/gap 12/squeeze 0.2/focusOnClick/captions. Sem autoplay da galeria; os fundos de vídeo continuam em loop conforme pedido anterior.

Adaptações: callbacks onReady/onUnavailable para alternância segura; ARIA e descrições em português; renderização suspensa em aba oculta; foco/contraste ajustados; altura em rem para ampliação de texto. captureWheel=false preserva a rolagem vertical da página. Galeria HTML permanece como alternativa para movimento reduzido, ausência de WebGL ou JavaScript e perda de contexto.

Licença original MIT + Commons Clause preservada junto ao componente e incluída na distribuição: https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md .
