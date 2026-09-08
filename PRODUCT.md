# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primário:** empresas que prestam serviço de homologação de usinas solares para terceiros e empresas de engenharia elétrica que assinam e respondem tecnicamente pelos projetos fotovoltaicos. Quem decide a compra são donos, gestores de operação e engenheiros responsáveis (CREA/CFT).

**Situação:** profissionais ocupados, céticos com "mais um software", que hoje tocam a homologação espalhada entre planilhas, e-mail e WhatsApp, montando memorial descritivo e diagrama unifilar à mão para cada projeto e descobrindo erro de conformidade só depois do protocolo, quando a distribuidora reprova.

**Job:** levar o projeto do cadastro ao parecer de acesso sem retrabalho, com a documentação exigida por cada distribuidora pronta, correta e rastreável.

**Integradoras não são o comprador.** Elas entram como parceiras do cliente, através da área do integrador (acesso restrito onde cadastram projetos, enviam documentos e acompanham status) e do link público de cadastro de parceiros com a marca do cliente. Os planos contam integradoras como capacidade, não como assentos vendidos.

## Product Purpose

Homologa Plus é um SaaS B2B que faz a gestão completa do processo de homologação de usinas solares fotovoltaicas e automatiza a produção do pacote documental do protocolo. Centraliza projetos, documentos, fluxo de aprovação com a distribuidora, área do integrador, financeiro e visão geográfica de território.

A landing existe para converter visitante qualificado em solicitação de acesso ao teste. Sucesso é o visitante entender que a Automação mata a parte mais cara do trabalho dele, confiar que é engenharia séria, e preencher o formulário de solicitação de acesso.

## Positioning

O diferencial não é "organizar homologações em um painel", é a **Automação**: a partir dos dados do projeto cadastrado, o sistema dimensiona e gera o pacote inteiro do protocolo, e valida a conformidade antes do envio.

O que sai automaticamente:

- Memorial descritivo e de cálculo, no modelo exigido pela distribuidora (PDF)
- Diagrama unifilar dimensionado: condutores, disjuntores, DPS e proteções (PDF, SVG, DXF)
- Diagrama de blocos funcional (PDF, SVG, DXF)
- Planta de localização, vista de satélite com coordenadas da UC (PDF)
- Formulários e anexos que cada distribuidora exige, já preenchidos com os dados do projeto (PDF)
- Carimbo com logo da empresa e do responsável técnico (CREA/CFT)

Cobre inversor string e microinversor. Os arquivos saem editáveis (DXF/SVG) para o RT revisar e assinar. O validador de conformidade classifica os itens em impeditivo, atenção e conforme, citando a referência normativa de cada checagem.

Um concorrente que só faz gestão de processo não consegue copiar isso sem construir o motor de dimensionamento e a biblioteca de padrões por distribuidora.

## Operating Context

- **Normas citadas pelo produto:** NBR 5410, NBR 16690, PRODIST Módulo 3, Lei 14.300.
- **Distribuidoras:** o processo varia por concessionária. CPFL, Enel, Energisa, Neoenergia, Light, Equatorial e outras. Há anexos específicos por distribuidora já implementados e demonstrados no site (Equatorial Anexo I, CPFL Anexo F, Energisa Formulário de Orçamento de Conexão).
- **Fluxo real do usuário:** cadastro do projeto, dimensionamento, geração de documentos, validação de conformidade, protocolo na distribuidora, acompanhamento de prazos, parecer de acesso, vistoria.
- **Ferramentas que o produto substitui:** planilhas, pastas soltas de e-mail e WhatsApp, edição manual de memorial e unifilar em CAD/Word.
- **Vocabulário do domínio (usar sempre o termo do setor):** homologação, distribuidora/concessionária, UC (unidade consumidora), memorial descritivo e de cálculo, diagrama unifilar, diagrama de blocos, planta de localização, DPS, ramal de entrada, parecer de acesso, protocolo, RT, integradora.

## Capabilities and Constraints

**Modelo de acesso (durável nesta fase, confirmado com o usuário):** cadastro livre está fechado. Ninguém cria conta sozinho. O único caminho de entrada é o formulário de solicitação de acesso na própria landing (`#solicitar-acesso`, `src/components/LeadCapture.tsx`). A equipe cadastra o acesso manualmente e avisa pelo WhatsApp. Por isso o WhatsApp é campo obrigatório, não opcional. Todo CTA primário do site rola até esse formulário (`src/utils/cta.ts`).

**Teste:** 3 dias, sem cartão de crédito, com o Homologa Full completo e Automação ilimitada. Valor único em `TRIAL_DIAS` (`src/utils/cta.ts`); a copy nunca deve escrever o número solto.

**Planos (dois, ambos com a plataforma inteira e a Automação):**

| Plano | Preço | Cota de automação | Assentos e parceiros |
|---|---|---|---|
| Homologa Starter | R$ 297/mês | 7 projetos automatizados/mês | 3 usuários técnicos, até 50 integradoras |
| Homologa Full | R$ 597/mês | Projetos ilimitados | 10 usuários técnicos, integradoras ilimitadas, suporte dedicado |

A diferença entre os planos é **volume de automação**, não recurso. Cadastro de projetos é ilimitado nos dois. "Mais escolhido" está no Full.

**Comercial:** sem fidelidade, cancelamento pelo próprio sistema, pagamento via Stripe.

**Capacidades além da Automação:** gestão financeira (DRE e fluxo de caixa), visão territorial no mapa, dashboards e relatórios, catálogo de equipamentos, área do integrador, link público de cadastro de parceiros com a marca do cliente.

**Técnico:** React 19 + Vite + Tailwind v4, React Router, `react-helmet-async` para SEO por rota, servidor Express (`server.ts`) para SSR/entrega e as rotas `api/waitlist.ts` e `api/contact.ts`. Lead é entregue por e-mail (Resend/nodemailer), sem painel administrativo próprio; as rotas `/admin` e `/crm` foram removidas e qualquer rota desconhecida redireciona para a home. Meta Pixel (`fbq`) instrumenta `Lead`, `InitiateCheckout` e `Contact`. Deploy Vercel, produção em www.homologaplus.com.br via merge na `main`.

**Rotas legadas ainda no bundle:** `/start` e `/waitlist` existem mas não são o caminho de conversão atual. Verificar antes de tratá-las como vivas.

## Brand Commitments

- **Nome:** Homologa Plus. Wordmark com "Plus" destacado. Logo em `public/logo-h.png` e `public/logo-h-white.png`.
- **Organização:** Bauru, SP, Brasil. Contato `contato@homologaplus.com.br`. Suporte humano por WhatsApp.
- **Idioma:** português brasileiro em todo conteúdo.
- **Voz:** moderna e ágil, direta, competente, sem enrolação. Engenharia séria que respeita o tempo de quem trabalha, não marketing vazio. Confiança técnica sem arrogância, clareza acima de jargão. A sensação a transmitir é a de trabalho que flui em vez de travar.
- **Regra de copy vinculante:** não usar travessão (em dash) no texto do site. Usar vírgula, dois-pontos, ponto e vírgula ou parênteses.
- **Anti-referências vinculantes:** SaaS genérico de template, portal governamental burocrático, hype neon de cripto/IA, e qualquer cara de improviso amador. Referência positiva de seriedade de engenharia: Stripe. DESIGN.md detalha como isso se traduz em decisões visuais.

## Evidence on Hand

**Real e utilizável (em `public/`):**

- Capturas do produto: `dashboard.webp`, `financeiro.webp`, `mapa-projetos.webp`, `fluxo.webp`, `mobile-preview.webp`
- Documentos gerados pela Automação: `doc-unifilar.webp`, `doc-unifilar-completo.webp`, `doc-blocos.webp`, `doc-planta.webp`, `doc-memorial.webp`
- Anexos por distribuidora, já preenchidos: `doc-anexo-equatorial.webp`, `doc-anexo-cpfl.webp`, `doc-anexo-energisa.webp`
- Vídeo da Automação: `automacao-demo.mp4` com pôster `automacao-demo-poster.jpg`
- Conteúdo editorial próprio: cinco páginas de SEO em `src/pages/seo/` sobre homologação, documentos, erros comuns e CPFL

**Usar com ressalva:** "mais de 200 empresas" e "98% de aprovação" são estimativas internas sem base auditável (confirmado com o usuário). Podem continuar no site, mas não devem virar promessa dura, número em destaque de manchete, ou base de garantia. Se um trabalho futuro precisar de prova forte, use as demonstrações de produto acima, não esses números.

**Não existe e não pode ser inventado:** depoimentos nominais de clientes, estudos de caso, logos de clientes, prêmios, menções de imprensa, certificações, benchmarks de tempo economizado, número de projetos processados.

## Product Principles

1. **Mostrar, não prometer.** Evidência do produto resolvendo a dor (antes/depois, documento real gerado, fluxo) vale mais que adjetivo. A conversão vem de "entendi como isso me ajuda", não de superlativo.
2. **A Automação é a manchete.** Gestão de processo é commodity na categoria; gerar e validar o pacote documental é o que ninguém mais entrega. Toda superfície de aquisição lidera por aí.
3. **Precisão técnica é a prova de confiança.** Termo do setor correto, referência normativa citada, documento reconhecível de relance. Um erro de vocabulário custa mais credibilidade com esse público do que qualquer falha estética.
4. **Cada elemento converte ou sai.** A hierarquia leva ao formulário de solicitação de acesso, e cada seção responde a uma objeção real do comprador cético.
5. **O funil tem porteiro, e isso é parte da oferta.** Acesso liberado a dedo não é atrito a esconder: é curadoria e acompanhamento próximo. A copy trata isso como cuidado, nunca como fila ou espera indefinida.

## Accessibility & Inclusion

WCAG AA. Contraste de 4.5:1 em corpo de texto e 3:1 em títulos grandes, navegação completa por teclado com foco visível, alvos de toque de no mínimo 44px, e respeito a `prefers-reduced-motion` (entrance animations e barra de progresso degradam para estático). Conteúdo em português brasileiro.
