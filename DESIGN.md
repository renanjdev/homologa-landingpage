---
name: Homologa Plus
description: Sistema de gestão para homologação de usinas solares fotovoltaicas
colors:
  primary: "#2563EB"
  primary-dark: "#1E3A8A"
  bright-sky: "#3B82F6"
  success: "#10B981"
  warning: "#F97316"
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
rounded:
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
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.lg}"
    padding: "16px 32px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
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

### Primary
- **Plus Blue** (#2563EB): A voz da marca. CTAs primários, links de ação, ícones ativos, qualquer elemento que o usuário deve seguir. É o instrumento principal do painel.
- **Deep Indigo** (#1E3A8A): O estado de pressão. Hover e active de botões primários, títulos de alto contraste, âncoras de seção. Dá profundidade ao azul sem mudar de identidade.

### Secondary
- **Bright Sky** (#3B82F6): O acento de destaque. Wordmark "Plus", realces pontuais, detalhes que precisam respirar acima do Plus Blue. Usar com parcimônia, é o brilho, não a base.

### Tertiary
- **Sinal Verde** (#10B981): Exclusivo para sucesso, aprovação concedida, etapa concluída. Nunca decorativo.
- **Sinal Laranja** (#F97316): Exclusivo para atenção, pendência, prazo. Nunca decorativo.

### Neutral
- **Tinta** (#0F172A): Texto principal (slate-900). O preto da sala de controle, nunca #000 puro.
- **Tinta Suave** (#475569): Texto secundário, legendas, descrições (slate-600).
- **Borda** (#E2E8F0): Contornos de cards, divisórias, traços de input (slate-200).
- **Superfície** (#F3F4F6): Fundo de seções alternadas, chips, estados de repouso de botão secundário.
- **Canvas** (#FFFFFF): Fundo base. Branco quente da página, nunca aplicado como bloco chapado sem hierarquia.

### Named Rules
**A Regra do Instrumento.** O azul (Plus Blue + Deep Indigo + Bright Sky) marca estado, ação ou caminho. Se um azul não está dizendo "siga aqui", "isto está ativo" ou "isto é a marca", ele não deveria estar ali. Azul de enfeite é proibido.

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
- **Label** (500, 0.8125rem, 0.04em, JetBrains Mono): Badges, etiquetas técnicas, números de preço destacados, "Mais escolhido". O tratamento de instrumento.

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
- **Focus:** Borda muda para Plus Blue + anel suave de 3px azul a 15% de opacidade. Glow instrumental, não decorativo.
- **Error:** Borda e texto de apoio em Sinal Laranja (#F97316).

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
- **Don't** usar `background-clip: text` com gradiente (gradient text está proibido). O `.gradient-text` atual deve sair: emfase vem de peso e cor sólida.
- **Don't** aplicar glassmorphism decorativo. O `.glass-card` (bg-white/80 + backdrop-blur) só sobrevive se for raro e proposital, jamais como padrão.
- **Don't** cair no SaaS genérico de template: gradiente roxo, grids de cards idênticos repetidos ao infinito, o clichê hero-metric (número grande + label + acento gradiente).
- **Don't** parecer portal governamental: denso de texto, datado, pesado.
- **Don't** usar neon sobre preto nem efeitos exagerados de hype cripto/IA.
- **Don't** usar `#000` ou `#fff` puros; neutros sempre levemente tintados para o frio do azul.
- **Don't** usar faixa lateral colorida (`border-left` > 1px) como acento em cards, listas ou alertas.
- **Don't** aninhar cards dentro de cards.
- **Don't** usar verde ou laranja como cor decorativa; são sinal funcional (A Regra do Sinal).
- **Don't** usar em dashes na copy. Vírgulas, dois-pontos, ponto e vírgula ou parênteses.
