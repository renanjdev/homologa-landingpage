---
name: Homologa Plus
description: Sistema de gestão para homologação de usinas solares fotovoltaicas
colors:
  primary: "#1B2A4A"
  primary-dark: "#131F39"
  action: "#2563EB"
  action-dark: "#1D4ED8"
  bright-sky: "#3B82F6"
  success: "#10B981"
  success-text: "#047857"
  warning: "#F97316"
  warning-border: "#EA580C"
  warning-text: "#C2410C"
  surface: "#F3F4F6"
  ink: "#0F172A"
  muted: "#475569"
  border: "#E2E8F0"
  canvas: "#FFFFFF"
typography:
  display:
    fontFamily: "Archivo, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw + 1rem, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Archivo, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.04em"
  overline:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.14em"
  price:
    fontFamily: "Archivo, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  section-heading:
    fontFamily: "Archivo, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 3vw + 1rem, 3rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
rounded:
  sm: "4px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "64px"
  xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.action-dark}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "16px 32px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.action}"
    rounded: "{rounded.lg}"
    padding: "16px 32px"
  card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
---

# Design System: Homologa Plus

## 1. Overview

**Creative North Star: "A Sala de Controle"**

Homologa Plus tira o engenheiro do caos de planilhas e WhatsApp e o coloca diante de um painel de comando. A interface deve sentir como uma sala de controle bem projetada: cada informação no lugar certo, status legível de relance, a sensação de domínio total sobre um processo que antes era confuso. O azul não é decoração, é instrumento. Aparece onde marca estado, guia ação ou sinaliza o caminho até a conversão, nunca como gradiente bonito que enche o fundo.

Apesar da precisão, o sistema não é rígido nem frio. Os componentes são leves e responsivos: cantos suaves, sombras sutis que reagem ao toque, transições ágeis que espelham a promessa do produto, o trabalho flui ao invés de travar. A tensão produtiva é essa: comando de engenharia séria, executado com a leveza de um produto moderno. Pense na clareza instrumental da Stripe, não no peso de um portal governamental.

Este sistema rejeita explicitamente: o SaaS genérico de template (gradiente roxo, grids de cards idênticos, glassmorphism por toda parte, o clichê do hero-metric); o visual burocrático denso e datado; o hype neon de cripto/IA; e qualquer cara de improviso amador. Distinção dentro da categoria solar significa fugir do reflexo "mais um azul de SaaS" através de hierarquia, ritmo e cor deliberados.

**Key Characteristics:**
- Azul como instrumento de estado e ação, não como preenchimento decorativo
- Componentes leves e responsivos: cantos suaves, sombra que reage, motion preciso
- Hierarquia que conduz o olho até o CTA em cada seção
- Clareza instrumental tipo Stripe, jamais peso burocrático
- Evidência do produto funcionando acima de adjetivos

## 2. Colors

Paleta de azul-engenharia sobre neutros frios, com verde e laranja reservados estritamente para sinalização de estado.

A paleta tem **duas famílias azuis com papéis distintos**, e confundi-las foi o defeito que a auditoria de agosto de 2026 encontrou: a marca sozinha não consegue apontar a ação.

### Brand
- **Navy** (#1B2A4A): A voz da marca. Títulos de alto contraste, chips de label, badges, superfícies escuras, wordmark. É a tinta institucional do painel, não o botão.
- **Navy Profundo** (#131F39): Hover e active de superfícies escuras, âncoras de seção.

### Action
- **Plus Blue** (#2563EB): O instrumento. **Exclusivo** de CTA primário e secundário, estado ativo, halo do CTA e qualquer elemento que o usuário deve seguir. Branco sobre ele mede 5,12:1 e passa em AA para texto normal, então serve como preenchimento de botão em qualquer tamanho.
- **Plus Blue Escuro** (#1D4ED8): Hover e active do CTA. Branco sobre ele mede 6,64:1.

Por que não usar Bright Sky como ação: #3B82F6 com texto branco mede apenas 3,67:1, então só passaria em texto grande, e o CTA do hero é 18px bold, logo abaixo do limiar. Promovê-lo criaria uma falha de contraste no botão mais importante da página.

### Secondary
- **Bright Sky** (#3B82F6): O acento de destaque. Wordmark "Plus", anel de foco de teclado, realces pontuais. Usar com parcimônia, é o brilho, não a base.

### Tertiary
- **Sinal Verde** (#10B981): Exclusivo para sucesso, aprovação concedida, etapa concluída. Nunca decorativo. **Em texto ou ícone pequeno use #047857**, porque #10B981 mede 2,54:1 sobre branco e reprova; reserve #10B981 para preenchimento grande.
- **Sinal Laranja** (#F97316): Exclusivo para atenção, pendência, prazo. Nunca decorativo. **Em borda use #EA580C (3,58:1) e em texto use #C2410C (5,21:1)**, porque #F97316 mede 2,80:1 sobre branco e reprova até no limiar de 3:1 para elemento não textual.

### Neutral
- **Tinta** (#0F172A): Texto principal (slate-900). O preto da sala de controle, nunca #000 puro.
- **Tinta Suave** (#475569): Texto secundário, legendas, descrições (slate-600).
- **Borda** (#E2E8F0): Contornos de cards, divisórias, traços de input (slate-200).
- **Superfície** (#F3F4F6): Fundo de seções alternadas, chips, estados de repouso de botão secundário.
- **Canvas** (#FFFFFF): Fundo base. Branco quente da página, nunca aplicado como bloco chapado sem hierarquia.

### Named Rules
**A Regra do Instrumento.** O azul marca estado, ação ou caminho. Se um azul não está dizendo "siga aqui", "isto está ativo" ou "isto é a marca", ele não deveria estar ali. Azul de enfeite é proibido, incluindo blobs desfocados de fundo e gradientes radiais decorativos.

**A Regra dos Dois Azuis.** Navy é marca, Plus Blue é ação. Um CTA nunca é Navy e um título nunca é Plus Blue. O teste rápido: se o elemento é clicável e leva à conversão, é Plus Blue; se ele só informa, é Navy.

**A Regra do Sinal.** Verde e laranja só existem como sinalização funcional (sucesso/pendência). Aplicá-los como cor decorativa quebra o vocabulário do painel e está proibido.

## 3. Typography

**Display Font:** Archivo (com Inter e system-ui como fallback) — usada em headlines e aberturas de seção
**Body Font:** Inter (hierarquia por peso e escala)
**Label/Mono Font:** JetBrains Mono (com ui-monospace fallback)

**Character:** Archivo carrega os títulos com firmeza técnica, uma grotesca de engenharia que dá personalidade às aberturas sem virar enfeite. Inter carrega o corpo com neutralidade competente, sem chamar atenção pra si. JetBrains Mono entra como a voz "instrumento": labels, números, etiquetas técnicas que merecem o tratamento de leitura de painel.

### Hierarchy
- **Display** (800, clamp(2.25rem→4.5rem), 1.1, -0.02em): Headlines de hero e aberturas de seção. Fluido via clamp para escalar suave do mobile ao desktop.
- **Headline** (700, clamp(1.5rem→2.25rem), 1.2): Títulos de seção (Features, Pricing, FAQ).
- **Title** (600, 1.25rem, 1.3): Títulos de card, nomes de plano, perguntas de FAQ.
- **Body** (400, 1rem, 1.6): Texto corrido. Largura máxima 65–75ch para legibilidade.
- **Label** (500, 0.8125rem, 0.04em, JetBrains Mono): Badges, etiquetas técnicas, "Mais escolhido". O tratamento de instrumento. **É o piso para conteúdo que carrega credibilidade**, como referência normativa: NBR e PRODIST nunca aparecem menores que isto.
- **Overline** (600, 0.6875rem = 11px, 0.14em, JetBrains Mono, caixa alta): Chips de seção e rótulos curtos de instrumento. **11px é o piso absoluto de texto funcional na página**; nada de 10px.
- **Price** (800, 3.5rem, Archivo): O número do plano. Único lugar onde um número recebe tratamento de display.
- **Section heading** (700, clamp de 1.875rem a 3rem): A escala fluida única das aberturas de seção, aplicada por `.text-clamp-h2`.

### Named Rules
**A Regra do Contraste de Peso.** Hierarquia vem de salto de peso e escala (≥1.25 entre passos), nunca de escala chapada. Display 800 contra Body 400 é a tensão que organiza a leitura.

**A Regra do Mono Intencional.** JetBrains Mono é reservado para conteúdo de instrumento (labels, números, etiquetas). Usá-lo em texto corrido está proibido, dilui o sinal técnico.

## 4. Elevation

Sistema leve e responsivo: superfícies chatas em repouso, sombra como resposta a estado. A profundidade não é ambiente constante, ela aparece quando o elemento ganha foco ou é tocado, reforçando a sensação de painel ágil que reage ao usuário.

### Shadow Vocabulary
- **Repouso** (`box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04)`): Cards e superfícies em estado neutro. Quase imperceptível, só desgruda do fundo.
- **Hover** (`box-shadow: 0 12px 32px -8px rgba(15, 23, 42, 0.12)`): Card ou item interativo sob o cursor. Difusa, suave, sobe o elemento sem drama.
- **Ação Primária** (`box-shadow: 0 8px 24px -6px rgba(37, 99, 235, 0.30)`): Botão primário. Halo azul tênue que ancora o CTA como o elemento de maior energia da seção.

### Named Rules
**A Regra do Chato em Repouso.** Superfícies são chatas por padrão. Sombra é resposta a estado (hover, foco, ação), não enfeite permanente. Card que já nasce flutuando com sombra pesada está errado.

**A Regra do Halo Azul.** Só o CTA primário ganha sombra colorida (azul). É o sinal de "esta é a ação". Espalhar halos coloridos por outros elementos rouba o foco e está proibido.

## 5. Components

### Buttons
- **Shape:** Cantos suaves (16px / rounded-lg). Leves, modernos, nunca pílula completa exceto em chips.
- **Primary:** Plus Blue (#2563EB) com texto branco, padding 16px 32px, halo azul tênue. O destino de cada seção.
- **Hover / Focus:** Fundo escurece para Deep Indigo (#1E3A8A), leve translateY(-1px), halo intensifica. Foco visível com anel de 2px Bright Sky para teclado.
- **Secondary:** Fundo Superfície (#F3F4F6) ou contorno, texto Plus Blue. Ação alternativa, nunca compete com o primário.

### Cards / Containers
- **Corner Style:** Generosos (24px / rounded-xl) para cards de conteúdo, 16px para itens menores. Nunca aninhar card dentro de card.
- **Background:** Canvas (#FFFFFF) sobre seções, Superfície (#F3F4F6) quando a seção precisa de contraste de fundo.
- **Shadow Strategy:** Repouso quase nulo, eleva no hover (ver Elevation). Reage ao toque.
- **Border:** 1px Borda (#E2E8F0). Contorno completo, nunca faixa lateral colorida.
- **Internal Padding:** 24px base, generoso. Densidade de painel, não de planilha apertada.

### Inputs / Fields
- **Style:** Contorno 1px Borda (#E2E8F0), fundo Canvas, cantos 12px.
- **Focus:** Borda muda para Plus Blue. O anel de foco de teclado vem da regra global `:focus-visible` (2px sólidos em Bright Sky, offset 2px), não de um `ring` por componente: um anel a 10% de opacidade mede 1,21:1 e é invisível, então não conta como indicador.
- **Error:** Borda em #EA580C e mensagem de apoio em #C2410C, ancorada abaixo do campo que falhou, com `aria-invalid` e `aria-describedby`. O erro nunca é comunicado só por cor: sempre acompanha ícone e texto. Nunca use vermelho em formulário, porque vermelho já está falado como "Impeditivo" no validador de conformidade.

### Navigation
- **Style:** Navbar fixa que transiciona de tema escuro (sobre hero) para claro (ao rolar). Links em Inter 500.
- **States:** Default Tinta Suave, hover Plus Blue, active Deep Indigo. Barra de progresso de scroll no topo.
- **Mobile:** Alvos de toque ≥44px, menu hambúrguer, links em coluna.

### Signature: Antes/Depois
O contraste planilha-caótica versus painel-organizado é o componente narrativo central. Lado "antes" em neutros frios desbotados e desalinhados (a dor); lado "depois" no vocabulário limpo da Sala de Controle (a solução). É a prova visual, não decoração.

## 6. Do's and Don'ts

### Do:
- **Do** usar azul exclusivamente como instrumento de estado, ação ou marca (A Regra do Instrumento).
- **Do** manter superfícies chatas em repouso e elevar só na interação (A Regra do Chato em Repouso).
- **Do** reservar o halo azul para o CTA primário, um por seção.
- **Do** construir hierarquia por salto de peso (Display 800 vs Body 400) e escala ≥1.25.
- **Do** usar JetBrains Mono apenas em labels e números técnicos.
- **Do** mostrar o produto funcionando (antes/depois, preview, fluxo) acima de adjetivos.
- **Do** respeitar `prefers-reduced-motion`: entrance animations e barra de progresso degradam para estático.
- **Do** garantir contraste WCAG AA (4.5:1 corpo, 3:1 títulos grandes) e foco visível de teclado.

### Don't:
- **Don't** usar `background-clip: text` com gradiente (gradient text está proibido). A ênfase vem de peso e de cor sólida. O antigo `.text-laminado` foi removido do CSS em agosto de 2026; não o reintroduza sob outro nome.
- **Don't** usar `text-slate-500` sobre `bg-surface`: mede 4,33:1 e reprova. Sobre branco ele passa (4,76:1). Em seção com fundo `#F3F4F6`, o secundário é `text-slate-600`.
- **Don't** confiar em `min-height` para alvo de toque em `<a>`: não tem efeito em caixa inline. Links de navegação e rodapé precisam de `inline-flex items-center min-h-[44px]` explícito.
- **Don't** aplicar glassmorphism decorativo. O `.glass-card` (bg-white/80 + backdrop-blur) só sobrevive se for raro e proposital, jamais como padrão.
- **Don't** cair no SaaS genérico de template: gradiente roxo, grids de cards idênticos repetidos ao infinito, o clichê hero-metric (número grande + label + acento gradiente).
- **Don't** parecer portal governamental: denso de texto, datado, pesado.
- **Don't** usar neon sobre preto nem efeitos exagerados de hype cripto/IA.
- **Don't** usar `#000` ou `#fff` puros; neutros sempre levemente tintados para o frio do azul.
- **Don't** usar faixa lateral colorida (`border-left` > 1px) como acento em cards, listas ou alertas.
- **Don't** aninhar cards dentro de cards.
- **Don't** usar verde ou laranja como cor decorativa; são sinal funcional (A Regra do Sinal).
- **Don't** usar em dashes na copy. Vírgulas, dois-pontos, ponto e vírgula ou parênteses.
