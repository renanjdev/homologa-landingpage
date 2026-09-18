# DOUTRINA — o acabamento, em número

Lei da receita. Não se negocia por briefing, não se adapta ao assunto, não se interpreta.

## Tipografia

- Display fluido de 70px a 217px com `clamp`.
- Corpo em 15px, peso leve, altura de linha 1.5.
- Contraste de escala de no mínimo 12:1 entre display e corpo.
- Números tabulares em toda métrica.
- Fonte variável, com o peso animando na entrada.

## Cor

- No máximo 4 cores no site inteiro.
- Quase-preto de fundo, off-white de texto e uma cor de destaque.
- A cor de destaque toma uma seção inteira.

## Movimento

- Preloader em tela cheia, contador de 0 a 100 e barra que enche.
- Scroll virtual com body travado, posição interpolada e inércia.
- Barra de rolagem própria na borda direita.
- Texto revelado linha a linha atrás de máscara.
- Cada seção tem duração explícita e sobreposição.
- Nada aparece por corte seco.

## Tridimensional

- Cena 3D leve com React Three Fiber.
- Objeto passa na frente da tipografia.
- Shader próprio com ruído sutil e aberração cromática.
- Qualidade degrada quando necessário, sem quebrar.

## Conteúdo

- Zero texto de enchimento.
- Nenhum fato inventado.

## Desempenho

- 60fps como alvo, 55 como mínimo em hardware real.
- Nenhuma fonte ou asset remoto.

## Prioridade

1. Tipografia e cor
2. Scroll e revelação
3. 3D
