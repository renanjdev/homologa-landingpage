---
name: Homologa Plus
description: Sistema de gestão e automação da homologação de usinas solares fotovoltaicas
colors:
  void: "#040506"
  ink: "#07080a"
  obsidian: "#111214"
  graphite: "#1b1c1e"
  steel: "#2f3031"
  hairline: "#363739"
  iron: "#454647"
  smoke: "#9a9b9c"
  ash: "#c4c4c5"
  mist: "#e6e6e6"
  panel-sky: "#8cc2fe"
  panel-navy: "#172b50"
  electric-sky: "#63a1ff"
  cobalt: "#143ca3"
  abyss: "#02193b"
  success: "#10b981"
  warning: "#f97316"
typography:
  display:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.2vw + 0.6rem, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.14
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Archivo, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3vw + 1rem, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.5vw + 0.9rem, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
  meta:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.4
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    letterSpacing: "0.08em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "12px"
  2xl: "16px"
  window: "14px"
  full: "9999px"
spacing:
  gutter: "16px"
  stack: "24px"
  section: "96px"
  container: "1280px"
components:
  button-primary:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "13px 22px"
    height: "44px"
  button-ghost:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.mist}"
    rounded: "{rounded.lg}"
    padding: "13px 22px"
    height: "44px"
  button-accent:
    backgroundColor: "{colors.panel-navy}"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "16px 32px"
  card:
    backgroundColor: "{colors.obsidian}"
    textColor: "{colors.ash}"
    rounded: "{rounded.2xl}"
    padding: "24px"
  icon-tile:
    backgroundColor: "{colors.obsidian}"
    textColor: "{colors.panel-sky}"
    rounded: "{rounded.xl}"
    size: "44px"
  eyebrow:
    backgroundColor: "{colors.panel-navy}"
    textColor: "{colors.ash}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "6px 12px"
  product-window:
    backgroundColor: "{colors.ink}"
    rounded: "{rounded.window}"
---

# Design System: Homologa Plus

## Overview

**Creative North Star: "O Cockpit do Engenheiro"**

A landing é um painel de instrumentos escuro. O canvas quase preto recua para que o produto real, mostrado dentro de uma janela de aplicativo, seja a coisa mais iluminada da página. A sensação é de engenharia séria trabalhando: superfícies como teclas de um teclado físico, texto claro com contraste folgado, e um único azul frio, tirado do próprio painel do Homologa Plus, marcando o que é instrumento.

A densidade é média. Cada seção abre com um título forte e segue com cards táteis, prints do produto e listas objetivas. Não há ilustração decorativa nem fotografia de banco; a prova visual é sempre a interface ou o documento gerado. O movimento é contido: entradas suaves ao rolar, um leve levantar no hover dos botões e cards, e tudo colapsa para estático com `prefers-reduced-motion`.

A identidade vem do Raycast (conceito 16 escolhido pelo dono) e o acento foi trocado em 2026-09 do coral para o azul do painel. Redesigns estruturais foram testados e rejeitados; este sistema é para ser refinado, não substituído.

**Key Characteristics:**
- Canvas Void escuro com superfícies em degraus (Void → Ink → Obsidian → Graphite).
- Profundidade por sombra "tecla" (inset claro em cima, anel de 1px, inset escuro embaixo), não por drop-shadow.
- Um acento frio racionado, o azul do painel, em ícone, traço e badge.
- Produto real como herói, dentro de uma janela com barra de título.
- Botão primário claro e tátil (Mist) em vez de botão colorido.

## Colors

Monocromático escuro com um acento frio e uma atmosfera azul só no hero.

### Primary
- **Azul do Painel** (panel-sky): cor de instrumento. Ícones, traços de destaque, sublinhado da palavra-âncora do título, pontos de status e brilho da atmosfera. Nunca em texto corrido longo.
- **Navy do Painel** (panel-navy): fundo de etiqueta (eyebrow), badge e do botão de destaque do CTA final, sempre com texto branco ou Ash.

### Secondary
- **Céu Elétrico** (electric-sky): dado e gráfico dentro de prints ou ilustrações do produto. Não é cor de texto de interface.
- **Cobalto** e **Abismo** (cobalt, abyss): só na atmosfera radial atrás do hero.

### Neutral
- **Void** (void): canvas do site inteiro.
- **Ink** (ink): superfície de janela de produto e botão fantasma.
- **Obsidian** (obsidian): superfície de card e de tile de ícone.
- **Graphite** (graphite): superfície elevada e hover de card.
- **Steel / Hairline / Iron** (steel, hairline, iron): bordas ativas, divisores e traços sobre botão claro.
- **Mist** (mist): texto forte e fundo do botão primário.
- **Ash** (ash): texto secundário, com contraste AA sobre Void.
- **Smoke** (smoke): metadados e legendas a partir de 12px.

### Named Rules
**The One Cold Accent Rule.** O azul do painel ocupa menos de 10% de qualquer tela e nunca pinta um bloco de texto; a raridade é o que faz ele parecer instrumento.

**The Status Colors Stay Semantic Rule.** Verde (success) e âmbar/laranja (warning) aparecem só como estado (conforme, atenção, dor do processo antigo), nunca como decoração.

## Typography

**Display Font:** Inter (com ui-sans-serif)
**Headline Font:** Archivo (com Inter)
**Label/Mono Font:** JetBrains Mono (com ui-monospace)

**Character:** Inter leve no H1 do hero dá calma e autoridade; Archivo pesado nos títulos de seção dá o peso de engenharia. O mono aparece em etiquetas curtas, metadados e rótulos de janela, sinalizando dado técnico.

### Hierarchy
- **Display** (400, clamp 2rem a 3.5rem, 1.14): só o H1 do hero, largura máxima de 20ch, com `text-wrap: balance`.
- **Headline** (700, clamp 1.875rem a 3rem, 1.15, -0.02em): títulos das seções principais (Antes/Depois, Automação, Plataforma, Planos, CTA final), com `text-clamp-h2`.
- **Headline de apoio** (700, clamp 1.625rem a 2.25rem, 1.2, -0.015em): títulos das seções de apoio (celular, público, FAQ), com `text-clamp-h2-sm`.
- **Title** (700, 1.125rem, 1.3): título de card e de item de lista.
- **Body** (400, 1rem a 1.125rem, 1.55): subtítulos e parágrafos, com 52 a 65ch de largura.
- **Meta** (400, 13px, 1.4): legendas de linha em cards comparativos, planos e banner de cookies, em Inter ou mono.
- **Label** (500, 11px, 0.08em, caixa alta): eyebrows, tags de janela e metadados em mono.

### Named Rules
**The Mono Means Data Rule.** JetBrains Mono só aparece em rótulo, metadado ou valor técnico, nunca em parágrafo.

## Layout

Container de até 1280px (`max-w-7xl`) com gutter lateral de 16px no mobile. Seções com respiro vertical de 64 a 96px. O hero é uma coluna centrada com o palco do produto logo abaixo, a até 1120px. As seções internas alternam grades de 2 e 3 colunas com cards e blocos texto e print, empilhando em uma coluna abaixo de 768px. Abaixo de 768px, os chips de prova que flutuam sobre a janela no desktop voltam para o fluxo, e uma barra fixa de CTA ocupa o rodapé.

## Elevation & Depth

A profundidade é tátil e interna. Cards e botões fantasmas usam a sombra "tecla", que imita a borda de uma tecla de teclado sobre o fundo escuro. Drop-shadow grande só existe em dois lugares: embaixo da janela do produto no hero e no levantar do botão primário.

### Shadow Vocabulary
- **Tecla** (`rgba(255,255,255,0.05) 0 1px 0 0 inset, rgba(255,255,255,0.25) 0 0 0 1px, rgba(0,0,0,0.2) 0 -1px 0 0 inset`): janela do produto e superfícies de destaque.
- **Tecla suave** (`rgba(255,255,255,0.04) 0 1px 0 0 inset, rgba(255,255,255,0.12) 0 0 0 1px, rgba(0,0,0,0.35) 0 -1px 0 0 inset`): cards, chips e botão fantasma.
- **Levantar** (`rgba(0,0,0,0.03) 0 7px 3px 0, rgba(0,0,0,0.25) 0 4px 4px 0`): botão primário Mist.
- **Palco** (`0 40px 90px -30px rgba(0,0,0,0.9)`): só sob a janela do produto no hero.

### Named Rules
**The Key Not Cloud Rule.** Superfícies ganham borda de tecla, não sombra difusa; se algo precisa flutuar, é a janela do produto.

## Shapes

Cantos suaves e consistentes: 10px nos botões do hero, 12px nos botões de seção e tiles de ícone, 14px na janela do produto, 16px nos cards grandes e 9999px em etiquetas, pontos de status e botões redondos. Bordas de 1px em branco com 10% de opacidade separam superfícies.

## Components

### Buttons
- **Shape:** cantos de 10 a 12px, altura mínima de 44px.
- **Primary:** fundo Mist com texto Ink, peso 600 a 700, sombra de levantar. É o CTA "Agendar demonstração".
- **Hover / Focus:** sobe 1px e clareia 4%; foco com contorno branco de 2px e afastamento de 2px.
- **Ghost:** fundo branco a 4% sobre o escuro, borda Hairline e sombra tecla suave; no hover a borda vai para Steel. Usado em "Falar no WhatsApp".
- **Accent:** fundo Navy do Painel com texto branco, só no CTA final e no badge de plano.

### Chips
- **Style:** cápsula Ink translúcida com sombra tecla suave, tile de ícone Obsidian à esquerda, título branco e legenda mono Smoke.
- **State:** estáticos; no desktop flutuam sobre a janela do produto, no mobile ficam no fluxo.

### Cards / Containers
- **Corner Style:** 12 a 16px.
- **Background:** Obsidian, hover em Graphite.
- **Shadow Strategy:** tecla suave.
- **Border:** 1px branco a 10%.
- **Internal Padding:** 20 a 32px.

### Navigation
- Barra fixa escura com vidro que adensa ao rolar, logo branco, links Ash que viram brancos no hover, trilho de progresso de 2px no topo em Azul do Painel, CTA Mist à direita. No mobile, menu recolhível e CTA compacto.

### Signature: Janela do Produto
A janela do hero é o componente que define o site: barra de título com três pontos, campo de comando em Smoke e tag mono, corpo com o vídeo real do painel. Sempre em Ink, com sombra tecla e sombra de palco.

## Do's and Don'ts

### Do:
- **Do** mostrar o produto real ou o documento gerado como imagem principal de cada seção.
- **Do** manter o azul do painel racionado a ícone, traço, ponto de status e badge.
- **Do** usar Mist no CTA primário e Navy do Painel só no CTA final e em badges.
- **Do** manter todo texto em branco, Mist, Ash ou Smoke para passar AA sobre Void.
- **Do** respeitar `prefers-reduced-motion` em toda animação nova.
- **Do** manter foco visível com contorno branco de 2px e afastamento de 2px em todo controle.
- **Do** usar Mist nos ícones de check de listas; o sublinhado azul fica só no H1 do hero e no título da Automação.

### Don't:
- **Don't** voltar ao coral (#ff6363) nem introduzir outra cor de acento.
- **Don't** usar travessão em texto visível do site.
- **Don't** pintar parágrafo ou título inteiro de azul.
- **Don't** trocar a sombra tecla por drop-shadow difusa em cards.
- **Don't** fazer redesign estrutural (tema claro, vidro fosco, hero editorial); o dono rejeitou essas direções em 2026-09.
