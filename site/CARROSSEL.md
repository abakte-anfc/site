# Carrossel atual

O modelo solicitado está em `components/ui/feature-carousel.tsx`, com Button em `components/ui/button.tsx` e utilitário em `lib/utils.ts`. A pasta components/ui mantém os componentes reutilizáveis no caminho esperado pelo shadcn e pelos imports @/. components.json registra os caminhos reais do projeto.

TypeScript e Tailwind 4 estão instalados. O arquivo site/src/gallery-tailwind.css contém as utilidades e cores neutras do carrossel; o build usa @tailwindcss/postcss sem reset global. A página mantém sua estrutura estática e carrega React sob demanda para a galeria.

As seis fotografias autorizadas substituem as imagens ilustrativas do demo. O carrossel destaca a foto central, reduz e desfoca as laterais e avança a cada quatro segundos. Pausa ao receber foco, hover, ficar fora da tela ou durante a navegação manual. Há botão de pausa, setas, Home/End e deslize no celular. Movimento reduzido utiliza a galeria manual existente. O demo não foi usado como página: seus textos comerciais e props appStoreLink/googlePlayLink não pertencem ao componente nem à marca.

Validação: npm run build, npm run typecheck, npm run check, npm test. Abra http://127.0.0.1:4173 com npm run dev. Não foi publicada uma nova versão externa. A confirmação do endereço e dos contatos pela marca continua pendente antes da publicação, conforme AGENTS.md.

## Atualização das modalidades

Os vídeos de fundo foram retirados da página e do JavaScript. O vídeo de registro com reprodução manual permanece. ServicesIsland usa LogoLoop (React Bits), em site/src/components, para exibir Dança, Teatro e Música na seção Modalidades. Tem controle de pausa, pausa por hover e interrupção fora da tela; movimento reduzido mantém os nomes estáticos. Os arquivos originais de vídeo foram preservados.

Correção de posição: LogoLoop substitui a faixa original Dança / Teatro / Música abaixo da abertura. A faixa adicionada em Modalidades e o botão de pausa foram removidos.
