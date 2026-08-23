# Casos de Teste de Performance e Acessibilidade — Site Institucional Eliora RH

| Campo | Valor |
|---|---|
| **Documento** | `04-casos-teste-performance-acessibilidade.md` |
| **Versão** | 1.0 |
| **Data** | 12/08/2026 |
| **Status** | Em revisão |
| **Referência** | `01-plano-de-testes.md` (seções 4.4, 4.5 e 4.8) |

**Convenções:**

- **ID:** `CT-P-XXX` (performance) e `CT-A-XXX` (acessibilidade), únicos e rastreáveis.
- **Metas de performance (baseline):** LCP < 2,5 s · CLS < 0,1 · INP < 200 ms · TTFB < 800 ms · tamanho total < 1 MB · Lighthouse ≥ 90 nas 4 categorias.
- **Ferramentas:** Lighthouse, Playwright (tracemetrics), GTmetrix, WebPageTest, DevTools (Performance/Network), axe-core, pa11y, WAVE, NVDA, VoiceOver.
- **Critério WCAG:** 2.1 nível AA.

---

# PARTE 1 — PERFORMANCE

## 1. Métricas Core Web Vitals

### CT-P-001 — LCP (Largest Contentful Paint) < 2,5 s

- **Pré-condições:** Conexão 4G simulada (throttling); dispositivo médio; cache limpo.
- **Passos:**
  1. Executar auditoria Lighthouse (mobile) na home e em `/contato`.
  2. Registrar o LCP e identificar o elemento de maior conteúdo.
- **Dados de entrada:** 4G (down 9 Mbps, up 3 Mbps, RTT 170 ms conforme perfis Lighthouse/WebPageTest).
- **Resultado esperado:** LCP < 2,5 s em todas as páginas principais; elemento LCP (imagem do hero ou heading) não atrasa por fontes ou JS.
- **Severidade:** S2 — **Prioridade:** P1

### CT-P-002 — CLS (Cumulative Layout Shift) < 0,1

- **Pré-condições:** N/A.
- **Passos:**
  1. Executar Lighthouse + medir CLS em todas as rotas (`/`, `/servicos`, `/sobre`, `/blog`, `/blog/[slug]`, `/contato`, `/obrigado`, `/privacidade`, `/termos`).
  2. Verificar se imagens sem dimensão, fontes e cookies/ads causam shifts.
- **Dados de entrada:** Todas as rotas; scroll até o fim da página durante a medição.
- **Resultado esperado:** CLS < 0,1; nenhum salto perceptível ao carregar imagens, banners, cookies ou o formulário.
- **Severidade:** S2 — **Prioridade:** P1

### CT-P-003 — INP (Interaction to Next Paint) < 200 ms

- **Pré-condições:** N/A.
- **Passos:**
  1. Executar Lighthouse ou medição em campo/lab; interagir com menu, âncoras, formulário e banner de cookies.
  2. Registrar o INP (p95).
- **Dados de entrada:** Interações: abrir burger, clicar âncora, focar campo, enviar formulário.
- **Resultado esperado:** INP < 200 ms; sem long tasks (> 50 ms) durante interações principais; resposta visual imediata.
- **Severidade:** S2 — **Prioridade:** P1

### CT-P-004 — TTFB < 800 ms (server)

- **Pré-condições:** Server-side render ativo; sem cache na primeira execução.
- **Passos:**
  1. Medir TTFB via DevTools/curl para `/`, `/contato`, `/blog/[slug]` em conexão nacional.
- **Dados de entrada:** URLs com cache desabilitado.
- **Resultado esperado:** TTFB < 800 ms em conexão nacional; respostas de páginas estáticas idealmente via CDN/ISR (cache).
- **Severidade:** S3 — **Prioridade:** P2

### CT-P-005 — Tamanho total da página < 1 MB

- **Pré-condições:** N/A.
- **Passos:**
  1. Registrar o tamanho total transferido (transfer size) da home e `/contato` no DevTools (Network) em 4G.
- **Dados de entrada:** HTML, CSS, JS, fontes, imagens da página.
- **Resultado esperado:** Transferência total < 1 MB; JS bundle fracionado (code splitting por rota); CSS/JS minificados e com `tree-shaking`.
- **Severidade:** S3 — **Prioridade:** P2

---

## 2. Otimização de Ativos

### CT-P-006 — Imagens otimizadas (WebP/AVIF + lazy loading)

- **Pré-condições:** N/A.
- **Passos:**
  1. Inspecionar as imagens via DevTools (formato, tamanho, `loading`, `srcset`).
- **Dados de entrada:** Imagens do hero, cards, blog, OG.
- **Resultado esperado:** Imagens servidas em WebP/AVIF (ou formato moderno equivalente) com tamanho adequado ao viewport; imagens abaixo da dobra com `loading="lazy"`; hero com `fetchpriority="high"` ou `loading="eager"`; dimensões explícitas (`width`/`height`/`aspect-ratio`) para evitar CLS.
- **Severidade:** S3 — **Prioridade:** P2

### CT-P-007 — Fontes com `font-display: swap` e pré-carregadas

- **Pré-condições:** N/A.
- **Passos:**
  1. Inspecionar a estratégia de fontes no CSS (arquivo `@font-face`) e no `<head>`.
- **Dados de entrada:** Fontes custom (ex.: Inter, Manrope) e fontes do sistema.
- **Resultado esperado:** `font-display: swap` presente; fontes pré-carregadas (`preload` + `crossorigin`) quando custom e críticas; sem "flash" invisível de texto (FOIT) por mais de ~100 ms; subsetting/variáveis para reduzir peso.
- **Severidade:** S3 — **Prioridade:** P2

### CT-P-008 — Sem render-blocking desnecessário

- **Pré-condições:** N/A.
- **Passos:**
  1. Auditar com Lighthouse (oportunidades) e analisar o waterfall no WebPageTest.
- **Dados de entrada:** CSS/JS na home.
- **Resultado esperado:** CSS crítico inline ou acima da dobra; JS com `defer`/`async` quando apropriado; nenhum script de terceiros (analytics/tags) bloqueando a renderização; Lighthouse não reporta oportunidades de render-blocking acima do threshold.
- **Severidade:** S3 — **Prioridade:** P2

### CT-P-009 — Teste em conexão lenta (throttling 3G/slow 4G)

- **Pré-condições:** N/A.
- **Passos:**
  1. Executar Lighthouse com perfil Slow 4G e WebPageTest com throttling 3G (ex.: 1,6 Mbps / RTT 300 ms) na home e `/contato`.
  2. Verificar LCP, CLS, INP e tamanho.
- **Dados de entrada:** Perfis: 3G lento, 4G lento, 4G.
- **Resultado esperado:** Métricas degradam de forma aceitável (LCP < 4,5 s em 3G como tolerância) e a página continua utilizável; nenhum recurso acima de ~100 KB sem compressão; gzip/brotli ativos.
- **Severidade:** S3 — **Prioridade:** P2

### CT-P-010 — Lighthouse ≥ 90 nas 4 categorias

- **Pré-condições:** N/A.
- **Passos:**
  1. Executar Lighthouse (desktop e mobile) nas rotas principais.
  2. Registrar scores de Performance, Acessibilidade, Melhores Práticas e SEO.
- **Dados de entrada:** `/`, `/servicos`, `/sobre`, `/blog`, `/blog/[slug]`, `/contato`.
- **Resultado esperado:** Scores ≥ 90 nas 4 categorias em todas as rotas principais (tolerância: Performance ≥ 90 no último run; sem falha de categoria crítica em Acessibilidade/SEO).
- **Severidade:** S2 — **Prioridade:** P1

### CT-P-011 — Caching e conteúdo estático

- **Pré-condições:** N/A.
- **Passos:**
  1. Verificar headers de cache (`Cache-Control`, ETag) para ativos estáticos e páginas.
  2. Recarregar a página e comparar cargas com/sem cache.
- **Dados de entrada:** Assets: imagens, CSS, JS, fontes.
- **Resultado esperado:** Ativos estáticos com `Cache-Control` (imutável/ano); páginas reutilizáveis via CDN/ISR; segunda visita com redução significativa de bytes transferidos; sem re-baixar fontes/imagens.
- **Severidade:** S4 — **Prioridade:** P3

### CT-P-012 — Performance do envio do formulário

- **Pré-condições:** Formulário funcional.
- **Passos:**
  1. Enviar o formulário e medir o tempo até o redirect para `/obrigado`.
  2. Verificar estado de loading do botão durante o envio.
- **Dados de entrada:** Dados válidos.
- **Resultado esperado:** Feedback visual imediato (botão "Enviando..."/spinner) sem long task; redirect para `/obrigado` em tempo aceitável (< 3 s em 4G); sem tela em branco durante a transição.
- **Severidade:** S4 — **Prioridade:** P3

---

# PARTE 2 — ACESSIBILIDADE (WCAG 2.1 AA)

## 1. Percepção

### CT-A-001 — Contraste de cores ≥ 4.5:1

- **Pré-condições:** N/A.
- **Passos:**
  1. Executar axe-core/pa11y/WAVE em todas as rotas.
  2. Verificar manualmente texto sobre imagens e botões (ex.: CTA claro sobre fundo escuro).
- **Dados de entrada:** Todas as rotas; combinações de texto normal (≥ 4,5:1), texto grande (≥ 3:1), UI components e estados hover/focus.
- **Resultado esperado:** Zero violações de contraste; texto sobre imagens com overlay ou contraste garantido; estados de hover/focus mantêm contraste.
- **Severidade:** S2 — **Prioridade:** P1

### CT-A-002 — Alt text em todas as imagens

- **Pré-condições:** N/A.
- **Passos:**
  1. Auditar todas as `<img>` (inclusive SVG com função decorativa).
- **Dados de entrada:** Imagens do hero, cards, blog, logo, ícones.
- **Resultado esperado:** Imagens informativas com `alt` descritivo (PT-BR); imagens decorativas com `alt=""` (ou `aria-hidden="true"`); logotipo com alt do nome da empresa; ícones de rede social não dependem apenas de alt no `img` (usar `aria-label` no link — ver CT-A-006).
- **Severidade:** S2 — **Prioridade:** P1

### CT-A-003 — Textos redimensionáveis sem perda (zoom 200%)

- **Pré-condições:** N/A.
- **Passos:**
  1. Aplicar zoom de 200% no navegador e percorrer as páginas.
  2. Verificar sobreposições e cortes.
- **Dados de entrada:** Zoom 200% em todas as rotas.
- **Resultado esperado:** Sem perda de conteúdo ou funcionalidade em 200%; textos não cortados; layout pode rolar verticalmente, mas nada fica inacessível.
- **Severidade:** S3 — **Prioridade:** P2

### CT-A-004 — Orientação e media queries de dispositivo

- **Pré-condições:** N/A.
- **Passos:**
  1. Verificar se o conteúdo não exige orientação única (retrato/paisagem) para uso.
- **Dados de entrada:** Rotas principais em ambos os sentidos.
- **Resultado esperado:** Conteúdo utilizável em qualquer orientação; nenhum aviso que bloqueie o uso.
- **Severidade:** S4 — **Prioridade:** P4

---

## 2. Operabilidade

### CT-A-005 — Navegação 100% por teclado (tab order)

- **Pré-condições:** Navegador sem mouse.
- **Passos:**
  1. Percorrer toda a página com `Tab`/`Shift+Tab` em todas as rotas.
  2. Verificar a ordem lógica: skip link → menu → conteúdo principal → formulário → footer.
- **Dados de entrada:** Todas as rotas e elementos interativos.
- **Resultado esperado:** Ordem de tabulação lógica e previsível; nenhum elemento interativo fora de ordem ou inalcançável; nenhum conteúdo escondido recebendo foco; foco não fica preso (exceto modais com focus trap intencional).
- **Severidade:** S2 — **Prioridade:** P1

### CT-A-006 — Focus visível

- **Pré-condições:** N/A.
- **Passos:**
  1. Percorrer links, botões, inputs e checkboxes com `Tab`.
  2. Verificar indicador de foco em cada elemento.
- **Dados de entrada:** Todos os elementos focáveis.
- **Resultado esperado:** Indicador de foco claramente visível (contorno ≥ 2 px, contraste adequado) em todos os estados; foco não removido via `outline: none` sem substituto acessível; `:focus-visible` usado corretamente.
- **Severidade:** S2 — **Prioridade:** P1

### CT-A-007 — Skip link funcional

- **Pré-condições:** N/A.
- **Passos:**
  1. Pressionar `Tab` no primeiro carregamento e ativar "Pular para o conteúdo".
- **Dados de entrada:** N/A.
- **Resultado esperado:** Skip link é o primeiro elemento focável; ao ativar, foco move para `#conteudo`/`main`; após o salto, `Tab` continua na ordem a partir do conteúdo; link oculto até receber foco (estilo de foco visível).
- **Severidade:** S2 — **Prioridade:** P1

### CT-A-008 — Labels em todos os campos do formulário

- **Pré-condições:** N/A.
- **Passos:**
  1. Inspecionar cada campo do formulário (`<label>`/`aria-label`/`aria-labelledby`).
- **Dados de entrada:** Nome, E-mail, Empresa, Telefone, Mensagem, checkbox LGPD.
- **Resultado esperado:** Todos os campos com `<label>` programaticamente associado (`for`/`id`) ou `aria-label`; checkbox de consentimento com texto completo e link para a Política de Privacidade; placeholders **não** substituem labels.
- **Severidade:** S2 — **Prioridade:** P1

### CT-A-009 — `aria-label` em botões de ícone (burger, redes sociais)

- **Pré-condições:** N/A.
- **Passos:**
  1. Inspecionar botões sem texto visível (hambúrguer, WhatsApp, Instagram, LinkedIn).
- **Dados de entrada:** Botões de ícone listados.
- **Resultado esperado:** Cada um possui `aria-label` descritivo em PT-BR; botão do menu alterna `aria-expanded` e anuncia estado; nenhum botão é anunciado como "botão" sem nome.
- **Severidade:** S3 — **Prioridade:** P2

### CT-A-010 — Headings hierárquicos e H1 único

- **Pré-condições:** N/A.
- **Passos:**
  1. Auditar a estrutura de headings (axe/pa11y) em todas as rotas.
- **Dados de entrada:** Todas as rotas (home, internas, blog, 404).
- **Resultado esperado:** Exatamente **1 H1** por página; hierarquia sem saltos (H1 → H2 → H3, sem H1→H4); headings descrevem o conteúdo; logo/marca não é H1 duplicado.
- **Severidade:** S3 — **Prioridade:** P2

### CT-A-011 — `prefers-reduced-motion` respeitado

- **Pré-condições:** Sistema operacional com "reduzir movimento" ativado.
- **Passos:**
  1. Ativar `prefers-reduced-motion` (OS ou emulação DevTools).
  2. Verificar scroll reveal, header, menu e animações de transição.
- **Dados de entrada:** OS com redução de movimento; emulação no DevTools.
- **Resultado esperado:** Animações de entrada (scroll reveal) desativadas ou mínimas; sem movimento não essencial; conteúdo permanece visível (elementos não ficam com `opacity:0` após a interação); transições instantâneas ou curtas.
- **Severidade:** S3 — **Prioridade:** P2

### CT-A-012 — Menus operáveis e com estado correto

- **Pré-condições:** N/A.
- **Passos:**
  1. Testar menu desktop (hover) e menu mobile (burger) por teclado e leitor de tela.
- **Dados de entrada:** N/A.
- **Resultado esperado:** Menu desktop acessível por teclado (submenus, se houver, com `aria-expanded`); menu mobile com painel navegável, `aria-expanded` sincronizado, fechamento por `Esc`/clique fora; item ativo indicado (`aria-current`).
- **Severidade:** S3 — **Prioridade:** P2

### CT-A-013 — Formulário: navegação por teclado e erros acessíveis

- **Pré-condições:** N/A.
- **Passos:**
  1. Enviar formulário vazio/inválido e navegar pelos campos com `Tab` e leitor de tela.
  2. Verificar foco, mensagens de erro e `aria-live`.
- **Dados de entrada:** Envio com campos vazios, e-mail inválido, LGPD desmarcado.
- **Resultado esperado:** Erros anunciados via `aria-live` ("Há erros no formulário"); cada campo inválido com mensagem associada (`aria-describedby`) e estado `aria-invalid="true"`; foco levado ao primeiro campo com erro (ou resumo de erros linkável); erros em PT-BR.
- **Severidade:** S2 — **Prioridade:** P1

### CT-A-014 — Leitores de tela: NVDA (Windows)

- **Pré-condições:** NVDA instalado; navegador Firefox/Chrome.
- **Passos:**
  1. Com NVDA ativo, navegar pela home, `/contato`, `/servicos` e `/blog/[slug]`.
  2. Verificar leitura de: menu, headings, formulário (labels e erros), banner de cookies, footer.
- **Dados de entrada:** Rotas listadas; fluxo de erro do formulário.
- **Resultado esperado:** Estrutura anunciada corretamente (região, headings, listas); formulário lido com labels e instruções; erros anunciados sem necessidade de leitura da tela toda; banner de cookies compreensível e operável; nenhum conteúdo lido de forma confusa (ordem DOM coerente).
- **Severidade:** S2 — **Prioridade:** P1

### CT-A-015 — Leitores de tela: VoiceOver (macOS/iOS)

- **Pré-condições:** macOS/iOS com VoiceOver.
- **Passos:**
  1. Navegar por home, `/contato` e `/privacidade` com VoiceOver (swipe/gestos).
  2. Enviar formulário inválido e verificar anúncio dos erros.
- **Dados de entrada:** Rotas listadas; fluxo de erro.
- **Resultado esperado:** Mesmos critérios do CT-A-014 no Safari; gestos de navegação funcionam; campos de formulário focáveis e rotulados; mensagens de erro anunciadas.
- **Severidade:** S2 — **Prioridade:** P1

### CT-A-016 — Estrutura semântica (landmarks)

- **Pré-condições:** N/A.
- **Passos:**
  1. Auditar landmarks (header/nav/main/footer) via axe/pa11y e navegação de regiões do leitor de tela.
- **Dados de entrada:** Todas as rotas.
- **Resultado esperado:** `<header>`, `<nav>`, `<main>` (uma única), `<footer>` presentes e nomeados quando necessário (`aria-label` em navs múltiplas); sem conteúdo fora de landmarks; `<main>` inicia no conteúdo principal.
- **Severidade:** S3 — **Prioridade:** P2

### CT-A-017 — Idioma e lang correto

- **Pré-condições:** N/A.
- **Passos:**
  1. Verificar `<html lang="pt-BR">`.
- **Dados de entrada:** Todas as rotas.
- **Resultado esperado:** `lang="pt-BR"` no documento; blocos em outros idiomas marcados com `lang` apropriado; sem aviso de idioma no validador.
- **Severidade:** S4 — **Prioridade:** P3

### CT-A-018 — Formulário: contraste de erros e estado de sucesso

- **Pré-condições:** N/A.
- **Passos:**
  1. Disparar erros no formulário e verificar a cor dos textos/ícones de erro.
- **Dados de entrada:** Erros de validação disparados.
- **Resultado esperado:** Erros não dependem **apenas** de cor (ícone/texto explícito, ex.: "⚠" + mensagem); cores de erro atendem contraste 4.5:1; estado de sucesso (ex.: página `/obrigado`) comunicado por texto, não só por cor.
- **Severidade:** S3 — **Prioridade:** P2

### CT-A-019 — Banner de cookies acessível

- **Pré-condições:** Cookies limpos.
- **Passos:**
  1. Com leitor de tela e teclado, navegar pelo banner e acionar os 3 controles.
- **Dados de entrada:** Banner com Aceitar/Rejeitar/Gerenciar.
- **Resultado esperado:** Banner anunciado como região/role adequada; controles com nomes acessíveis; se modal, focus trap + retorno de foco; foco nunca "preso" sem motivo; `aria-live` não anuncia spam.
- **Severidade:** S3 — **Prioridade:** P2

### CT-A-020 — Página 404 acessível

- **Pré-condições:** N/A.
- **Passos:**
  1. Navegar até o 404 por teclado/leitor de tela.
- **Dados de entrada:** Rota inexistente.
- **Resultado esperado:** `<title>` indica erro ("Página não encontrada"); heading H1 claro; leitor de tela anuncia o erro; link de volta à home com texto descritivo; página alcançável no tab order.
- **Severidade:** S3 — **Prioridade:** P2

### CT-A-021 — Auditoria automatizada sem violações críticas

- **Pré-condições:** N/A.
- **Passos:**
  1. Executar axe-core (via Playwright) e pa11y em todas as rotas.
  2. Corrigir violações e re-executar.
- **Dados de entrada:** Todas as rotas.
- **Resultado esperado:** Zero violações de severidade **crítica** e **séria** (axe); pa11y sem erros de nível `error`; violações menores documentadas e com plano de correção; auditoria registrada no pipeline de CI.
- **Severidade:** S2 — **Prioridade:** P1

---

## Resumo do arquivo

### Performance

| ID | Título | Severidade | Prioridade |
|---|---|---|---|
| CT-P-001 | LCP < 2,5 s (4G) | S2 | P1 |
| CT-P-002 | CLS < 0,1 | S2 | P1 |
| CT-P-003 | INP < 200 ms | S2 | P1 |
| CT-P-004 | TTFB < 800 ms | S3 | P2 |
| CT-P-005 | Tamanho total < 1 MB | S3 | P2 |
| CT-P-006 | Imagens WebP/AVIF + lazy | S3 | P2 |
| CT-P-007 | Fontes display=swap | S3 | P2 |
| CT-P-008 | Sem render-blocking | S3 | P2 |
| CT-P-009 | Throttling 3G/slow 4G | S3 | P2 |
| CT-P-010 | Lighthouse ≥ 90 (4 categorias) | S2 | P1 |
| CT-P-011 | Caching/estático | S4 | P3 |
| CT-P-012 | Performance do envio | S4 | P3 |

**Total performance: 12 (CT-P-001 a CT-P-012)**

### Acessibilidade

| ID | Título | Severidade | Prioridade |
|---|---|---|---|
| CT-A-001 | Contraste ≥ 4.5:1 | S2 | P1 |
| CT-A-002 | Alt text | S2 | P1 |
| CT-A-003 | Zoom 200% | S3 | P2 |
| CT-A-004 | Orientação | S4 | P4 |
| CT-A-005 | Tab order | S2 | P1 |
| CT-A-006 | Focus visível | S2 | P1 |
| CT-A-007 | Skip link | S2 | P1 |
| CT-A-008 | Labels do formulário | S2 | P1 |
| CT-A-009 | aria-label em ícones | S3 | P2 |
| CT-A-010 | Headings/H1 único | S3 | P2 |
| CT-A-011 | prefers-reduced-motion | S3 | P2 |
| CT-A-012 | Menus operáveis | S3 | P2 |
| CT-A-013 | Erros acessíveis (aria-live) | S2 | P1 |
| CT-A-014 | NVDA | S2 | P1 |
| CT-A-015 | VoiceOver | S2 | P1 |
| CT-A-016 | Landmarks semânticos | S3 | P2 |
| CT-A-017 | lang pt-BR | S4 | P3 |
| CT-A-018 | Erros sem só cor | S3 | P2 |
| CT-A-019 | Banner cookies acessível | S3 | P2 |
| CT-A-020 | Página 404 acessível | S3 | P2 |
| CT-A-021 | axe/pa11y sem críticas | S2 | P1 |

**Total acessibilidade: 21 (CT-A-001 a CT-A-021)**
