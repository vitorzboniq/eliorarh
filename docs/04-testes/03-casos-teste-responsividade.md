# Casos de Teste de Responsividade — Site Institucional Eliora RH

| Campo | Valor |
|---|---|
| **Documento** | `03-casos-teste-responsividade.md` |
| **Versão** | 1.1 |
| **Data** | 18/08/2026 |
| **Status** | Em revisão |
| **Referência** | `01-plano-de-testes.md` (seção 4.3 e matriz de dispositivos) |

**Convenções:**

- **ID:** `CT-R-XXX` (único e rastreável).
- **Breakpoints alvo:**
  - `320 px` — mobile pequeno (dispositivos compactos).
  - `375 px` — iPhone SE (1ª–3ª geração) / iPhone 13 mini (referência mobile).
  - `768 px` — tablet (iPad portrait).
  - `1024 px` — laptop / iPad Pro landscape.
  - `1440 px+` — desktop.
- **Formas de execução:** Playwright (viewports) + manual em dispositivos reais (iOS/Android).
- **Critério transversal:** nenhum caso pode apresentar **scroll horizontal** ou conteúdo cortado.

---

## 1. Meta Viewport e Base

### CT-R-001 — Viewport meta presente e correta

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Inspecionar o `<head>` do documento em todas as páginas.
- **Dados de entrada:** Todas as rotas (`/`, `/servicos`, `/sobre`, `/blog`, `/contato`, `/obrigado`, `/privacidade`, `/termos`).
- **Resultado esperado:** Tag `<meta name="viewport" content="width=device-width, initial-scale=1">` presente; **sem** `user-scalable=no` nem `maximum-scale=1` (para permitir zoom acessível).
- **Severidade:** S2 — **Prioridade:** P2

### CT-R-002 — Sem scroll horizontal em nenhum breakpoint

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Acessar cada rota em cada breakpoint (320, 375, 480, 768, 1024, 1440).
  2. Verificar `document.documentElement.scrollWidth <= window.innerWidth` (via DevTools/Playwright) e rolar horizontalmente.
- **Dados de entrada:** Todas as rotas × 5 breakpoints.
- **Resultado esperado:** Nenhum scroll horizontal; nenhum elemento estoura o viewport (sem `overflow-x` indesejado); conteúdo totalmente visível.
- **Severidade:** S2 — **Prioridade:** P2

---

## 2. Menu: Burger vs. Menu Completo

### CT-R-003 — Burger em 320 px e 375 px

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Carregar a home em 320 px e em 375 px.
  2. Verificar que o menu é apresentado como burger (ícone), não como lista completa.
- **Dados de entrada:** Viewports 320 × 568 e 375 × 667.
- **Resultado esperado:** Botão burger visível, com alvo de toque ≥ 44×44 px, ícone legível e `aria-expanded` gerenciado; abrir/fechar sem quebra de layout.
- **Severidade:** S3 — **Prioridade:** P2

### CT-R-004 — Menu completo em 768 px

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Carregar a home em 768 px (tablet).
  2. Verificar qual variante de menu é exibida.
- **Dados de entrada:** Viewport 768 × 1024.
- **Resultado esperado:** Comportamento definido pelo design (v1.1): **burger/drawer até 768 px inclusive**; menu completo apenas a partir de **769 px**; itens do menu com `min-height: 44px` em 769–900 px; sem sobreposição/overflow na transição.
- **Severidade:** S3 — **Prioridade:** P3

### CT-R-005 — Menu completo em 1024 px e 1440 px

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Carregar a home em 1024 px e 1440 px.
  2. Verificar exibição do menu completo.
- **Dados de entrada:** Viewports 1024 × 768 e 1440 × 900.
- **Resultado esperado:** Todos os itens do menu visíveis em uma única linha, sem quebra, sem scroll e com espaçamento adequado; logo e CTA ("Fale Conosco") visíveis.
- **Severidade:** S3 — **Prioridade:** P2

### CT-R-006 — Menu completo redimensionando entre breakpoints

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Redimensionar a janela de 1440 px até 320 px de forma contínua.
  2. Observar a transição burger ⇄ menu completo.
- **Dados de entrada:** Redimensionamento contínuo.
- **Resultado esperado:** Transição suave; estado do menu consistente ao voltar ao tamanho original; se o menu mobile estava aberto e a janela cresce, o menu não fica preso em estado inconsistente (ex.: painel aberto + menu completo).
- **Severidade:** S3 — **Prioridade:** P3

---

## 3. Grids e Layouts

### CT-R-007 — Hero responsivo

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Carregar a home em cada breakpoint (320, 375, 768, 1024, 1440).
  2. Verificar título, subtítulo, CTAs e imagem/ilustração do hero.
- **Dados de entrada:** 5 breakpoints.
- **Resultado esperado:** O hero mantém hierarquia legível; título não quebra em palavras isoladas sem necessidade; CTAs empilham verticalmente em mobile (sem sobreposição) e lado a lado em desktop; imagem redimensiona sem distorção/corte crítico; sem overflow.
- **Severidade:** S3 — **Prioridade:** P2

### CT-R-008 — Grid de Pilares (4 → 2 → 1 colunas)

- **Pré-condições:** Seção `#pilares` presente na home.
- **Passos:**
  1. Verificar a seção de pilares em: 320 px (1 coluna), 768 px (2 colunas), 1440 px (4 colunas).
- **Dados de entrada:** 320, 768, 1440 px.
- **Resultado esperado:** Em 320 px os cards empilham em 1 coluna (largura total, sem squeeze); em 768 px, 2 colunas; em 1440 px, 4 colunas; os cards mantêm proporção, ícones visíveis e textos sem corte.
- **Severidade:** S3 — **Prioridade:** P2

### CT-R-009 — Timeline/Processo (4 → 2 → 1 colunas)

- **Pré-condições:** Seção `#abordagem` presente na home.
- **Passos:**
  1. Verificar a timeline/etapas em: 320 px, 768 px, 1024 px, 1440 px.
- **Dados de entrada:** 320, 768, 1024, 1440 px.
- **Resultado esperado:** Etapas empilham em 1 coluna em mobile (timeline vertical), 2 colunas em tablet, 4 colunas em desktop; numeradores/ícones não sobrepõem textos; linha/traço da timeline não gera scroll horizontal.
- **Severidade:** S3 — **Prioridade:** P3

### CT-R-010 — Grid do Footer (4 → 2 → 1 colunas)

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Verificar o footer em: 320 px, 375 px, 768 px, 1024 px, 1440 px.
- **Dados de entrada:** 5 breakpoints.
- **Resultado esperado:** Colunas do footer reorganizam (4 → 2 → 1) sem sobreposição; links de redes sociais e legais (`/privacidade`, `/termos`) clicáveis e com alvo de toque ≥ 44 px em mobile; copyright legível.
- **Severidade:** S4 — **Prioridade:** P3

### CT-R-011 — Seções de conteúdo genérico (sobre, serviços, blog)

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Verificar `/servicos`, `/sobre` e `/blog` em 320 px, 768 px e 1440 px.
- **Dados de entrada:** 3 breakpoints × 3 rotas.
- **Resultado esperado:** Cards/lista de serviços e posts reorganizam-se; textos com `line-height` adequado; sem colunas espremidas (< ~280 px de conteúdo); sem cortes.
- **Severidade:** S4 — **Prioridade:** P3

### CT-R-012 — Formulário de contato responsivo

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Acessar `/contato` em 320 px, 375 px, 768 px, 1440 px.
  2. Preencher e interagir com os campos.
- **Dados de entrada:** 4 breakpoints.
- **Resultado esperado:** Campos e rótulos em coluna única em mobile (sem squeeze); botão "Enviar" com largura adequada e alvo ≥ 44 px; mensagens de erro não causam deslocamento de layout abrupto nem overflow; checkbox de consentimento legível ao lado do texto (sem truncamento).
- **Severidade:** S3 — **Prioridade:** P2

---

## 4. Texto, Imagens e Tipografia

### CT-R-013 — Textos longos sem overflow

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Injetar texto de teste longo em parágrafos e títulos (via DevTools ou seed) em 320 px.
  2. Verificar quebras de linha.
- **Dados de entrada:** Textos de 200+ caracteres sem espaços (`Loremipsum...`) e palavras longas; títulos longos em português.
- **Resultado esperado:** Sem overflow horizontal; palavras longas quebram (`overflow-wrap: break-word`/`hyphens`); nada sobrepõe elementos vizinhos.
- **Severidade:** S3 — **Prioridade:** P3

### CT-R-014 — Escala tipográfica legível em mobile

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Verificar títulos e parágrafos em 320 px e 375 px.
- **Dados de entrada:** N/A.
- **Resultado esperado:** Fontes responsivas (clamp/rem) mantêm tamanho mínimo legível (título ≥ ~24 px, corpo ≥ 16 px); sem zoom de usuário necessário para leitura; line-height adequado.
- **Severidade:** S4 — **Prioridade:** P3

### CT-R-015 — Imagens redimensionam sem distorção

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Verificar todas as imagens (hero, cards, blog, OG, logos) em cada breakpoint.
  2. Inspecionar atributos `width`/`height`/`srcset`.
- **Dados de entrada:** 5 breakpoints.
- **Resultado esperado:** Imagens usam `max-width: 100%`/`height: auto` (ou `aspect-ratio` fixo); sem estiramento, achatamento ou `layout shift`; `srcset` carrega o tamanho adequado ao viewport.
- **Severidade:** S3 — **Prioridade:** P2

### CT-R-016 — Alvos de toque ≥ 44×44 px

- **Pré-condições:** Viewport mobile (375 px).
- **Passos:**
  1. Medir (via DevTools/Playwright) o tamanho de todos os elementos interativos: links do menu, botões de CTA, botão burger, checkboxes, botão enviar, ícones sociais, links do footer.
- **Dados de entrada:** Elementos interativos listados.
- **Resultado esperado:** Todos os alvos de toque ≥ 44×44 px (ou ≥ 24 px com espaçamento adequado de 8 px, conforme critério definido); sem alvos sobrepostos que dificultem o toque.
- **Severidade:** S3 — **Prioridade:** P2

---

## 5. Orientação e Zoom

### CT-R-017 — Orientação retrato

- **Pré-condições:** Dispositivo móvel real (iOS/Android) ou emulação.
- **Passos:**
  1. Carregar home e `/contato` em orientação retrato (375×812).
  2. Verificar layout e formulário.
- **Dados de entrada:** Retrato.
- **Resultado esperado:** Layout mobile correto; formulário utilizável sem rolagem excessiva; sem scroll horizontal; teclado virtual não esconde campos (campos roláveis).
- **Severidade:** S3 — **Prioridade:** P2

### CT-R-018 — Orientação paisagem

- **Pré-condições:** Dispositivo móvel real ou emulação.
- **Passos:**
  1. Girar para paisagem (812×375) e verificar home, menu e `/contato`.
- **Dados de entrada:** Paisagem.
- **Resultado esperado:** Conteúdo se adapta (menu pode trocar para versão expandida conforme breakpoint); sem conteúdo cortado na lateral; sem scroll horizontal; header visível.
- **Severidade:** S4 — **Prioridade:** P3

### CT-R-019 — Zoom do navegador até 200%

- **Pré-condições:** Desktop (Chrome/Edge/Firefox/Safari).
- **Passos:**
  1. Carregar home e `/contato`.
  2. Aplicar zoom de 100% → 150% → 200% (via Ctrl+/Cmd+).
  3. Verificar layout em 200%.
- **Dados de entrada:** Zoom 100/150/200%.
- **Resultado esperado:** Em 200% o conteúdo permanece utilizável (pode rolar verticalmente, mas **sem perda de conteúdo** nem sobreposição permanente); textos não são cortados; formulário continua operável; nenhum elemento se torna inacessível.
- **Severidade:** S3 — **Prioridade:** P2

### CT-R-020 — Redimensionamento de janela (desktop)

- **Pré-condições:** Desktop.
- **Passos:**
  1. Redimensionar a janela de 1920 px até 320 px em passos variados (drag).
  2. Observar breakpoints e layouts intermediários.
- **Dados de entrada:** Redimensionamento contínuo.
- **Resultado esperado:** Nenhum "ponto morto" entre breakpoints (layouts intermediários aceitáveis); sem scroll horizontal; menus e grids refluem corretamente.
- **Severidade:** S4 — **Prioridade:** P3

---

## 6. Casos Específicos por Página

### CT-R-021 — Blog: grid de cards e artigo em mobile

- **Pré-condições:** Conteúdo de blog presente.
- **Passos:**
  1. Verificar `/blog` e `/blog/[slug]` (artigo com imagem, título, corpo longo) em 320 px e 375 px.
- **Dados de entrada:** 320, 375 px.
- **Resultado esperado:** Cards de posts em 1 coluna; artigo sem scroll horizontal, com imagens fluidas e código/quotes com quebra adequada; leitura confortável.
- **Severidade:** S4 — **Prioridade:** P3

### CT-R-022 — Página /obrigado e 404 em mobile

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Verificar `/obrigado` (após envio) e `/404` em 320 px e 375 px.
- **Dados de entrada:** 320, 375 px.
- **Resultado esperado:** Mensagens centradas e legíveis; botões/CTAs com alvo ≥ 44 px; sem overflow; link de voltar visível.
- **Severidade:** S4 — **Prioridade:** P4

### CT-R-023 — Banner de cookies em mobile

- **Pré-condições:** Cookies limpos.
- **Passos:**
  1. Abrir o site em 320 px e 375 px com cookies limpos.
  2. Interagir com os três botões do banner (Aceitar/Rejeitar/Gerenciar).
- **Dados de entrada:** 320, 375 px.
- **Resultado esperado:** Banner ocupa largura adequada (não cobre todo o conteúdo de forma não-dismissível); botões empilham ou redimensionam sem corte; painel "Gerenciar" utilizável no mobile; conteúdo principal continua acessível.
- **Severidade:** S3 — **Prioridade:** P2

---

## 7. Compactação Mobile (v1.1)

> Cobertura das mudanças de responsividade aplicadas em 18/08/2026 (bloco ≤640 px e bloco ≤480 px em `css/responsive.css`). Objetivo: reduzir a altura da página em mobile sem tocar no desktop.

### CT-R-024 — Sem scroll horizontal em 320–768 px (pós-compactação)

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Carregar a home em 320, 375, 390, 412, 480, 640 e 768 px.
  2. Verificar `document.documentElement.scrollWidth <= window.innerWidth` (via Playwright) em cada viewport.
- **Dados de entrada:** Viewports 320×568, 375×667, 390×844, 412×915, 480×800, 640×960, 768×1024.
- **Resultado esperado:** `scrollWidth == clientWidth` em todos os viewports; nenhum elemento estoura o viewport (cards, footer, drawer, linha de parceiros).
- **Severidade:** S2 — **Prioridade:** P2

### CT-R-025 — Compactação ≤640 px (hero, paddings e recuos)

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Carregar a home em 375 px e 640 px.
  2. Verificar: hero com `min-height: auto` (não ocupa viewport inteiro), paddings de seção reduzidos, recuos de texto (`text-indent`) removidos nos cards de pilares/valores.
- **Dados de entrada:** 375×667, 640×960.
- **Resultado esperado:** Altura total da página reduzida (~24% vs. v1.0 em 320–412 px); conteúdo legível; hero não ocupa a tela toda; CTA primário visível na dobra.
- **Severidade:** S3 — **Prioridade:** P2

### CT-R-026 — Trainer card mobile (grid `auto 1fr`)

- **Pré-condições:** Seção `#treinamentos` presente.
- **Passos:**
  1. Carregar a home em 320 px e 375 px.
  2. Verificar os cards de facilitadoras (imagem, nome, cargo).
- **Dados de entrada:** 320×568, 375×667.
- **Resultado esperado:** Cargo (role) posicionado abaixo do nome (sem estourar a coluna); sem overflow horizontal; imagem redimensiona sem distorção.
- **Severidade:** S3 — **Prioridade:** P2

### CT-R-027 — Tagline do footer compacta

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Carregar a home em 320 px e 375 px.
  2. Verificar a tagline do footer ("Pessoas no centro. Resultados que transformam.").
- **Dados de entrada:** 320×568, 375×667.
- **Resultado esperado:** Tagline quebra em múltiplas linhas sem overflow; `gap: 10px`, `min-width: 12px`, `font-size: 13px` aplicados; sem scroll horizontal.
- **Severidade:** S3 — **Prioridade:** P2

### CT-R-028 — Alvos de toque ≥ 44 px (v1.1)

- **Pré-condições:** Viewport mobile (375 px) e tablet (768 px).
- **Passos:**
  1. Medir (via DevTools/Playwright): botão burger (50×44 px), links do drawer (44 px), ícones sociais do footer (`::after` com `inset: -5px`), links do menu em 769–900 px (`min-height: 44px`).
- **Dados de entrada:** Elementos interativos listados.
- **Resultado esperado:** Todos os alvos de toque com área efetiva ≥ 44×44 px (ou ≥ 24 px com espaçamento de 8 px); sem alvos sobrepostos.
- **Severidade:** S3 — **Prioridade:** P2

### CT-R-029 — Estilos do bloco ≤480 px

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Carregar a home em 320, 375 e 412 px.
  2. Verificar: `.hero h1` com `font-size: 28px` (regra com especificidade correta), `.hero-logo img` com `max-width: 180px`, `nav.links` com `width: 86%`.
- **Dados de entrada:** 320×568, 375×667, 412×915.
- **Resultado esperado:** H1 renderiza 28 px (não 29 px — regressão de especificidade corrigida); logo do hero reduzido; drawer ocupa 86% da largura; sem quebra de layout.
- **Severidade:** S3 — **Prioridade:** P3

### CT-R-030 — Hero na dobra em ≤768 px

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Carregar a home em 320, 375 e 768 px.
  2. Verificar se H1 + CTA primário ("Agende uma conversa") aparecem sem rolagem.
- **Dados de entrada:** 320×568, 375×667, 768×1024.
- **Resultado esperado:** H1 e CTA visíveis no primeiro viewport (hero `min-height: auto`); tagline como fallback em ≤480 px.
- **Severidade:** S3 — **Prioridade:** P2

---

## Resumo do arquivo

| ID | Título | Severidade | Prioridade |
|---|---|---|---|
| CT-R-001 | Viewport meta | S2 | P2 |
| CT-R-002 | Sem scroll horizontal | S2 | P2 |
| CT-R-003 | Burger 320/375 px | S3 | P2 |
| CT-R-004 | Menu 768 px | S3 | P3 |
| CT-R-005 | Menu completo 1024/1440 px | S3 | P2 |
| CT-R-006 | Transição redimensionamento | S3 | P3 |
| CT-R-007 | Hero responsivo | S3 | P2 |
| CT-R-008 | Grid pilares 4→2→1 | S3 | P2 |
| CT-R-009 | Timeline 4→2→1 | S3 | P3 |
| CT-R-010 | Footer 4→2→1 | S4 | P3 |
| CT-R-011 | Seções sobre/serviços/blog | S4 | P3 |
| CT-R-012 | Formulário de contato | S3 | P2 |
| CT-R-013 | Textos longos | S3 | P3 |
| CT-R-014 | Escala tipográfica | S4 | P3 |
| CT-R-015 | Imagens fluidas | S3 | P2 |
| CT-R-016 | Alvos de toque ≥ 44 px | S3 | P2 |
| CT-R-017 | Orientação retrato | S3 | P2 |
| CT-R-018 | Orientação paisagem | S4 | P3 |
| CT-R-019 | Zoom até 200% | S3 | P2 |
| CT-R-020 | Redimensionamento contínuo | S4 | P3 |
| CT-R-021 | Blog mobile | S4 | P3 |
| CT-R-022 | /obrigado e 404 mobile | S4 | P4 |
| CT-R-023 | Banner de cookies mobile | S3 | P2 |
| CT-R-024 | Sem scroll horizontal 320–768 px | S2 | P2 |
| CT-R-025 | Compactação ≤640 px | S3 | P2 |
| CT-R-026 | Trainer card mobile | S3 | P2 |
| CT-R-027 | Tagline do footer compacta | S3 | P2 |
| CT-R-028 | Alvos de toque ≥ 44 px (v1.1) | S3 | P2 |
| CT-R-029 | Estilos do bloco ≤480 px | S3 | P3 |
| CT-R-030 | Hero na dobra em ≤768 px | S3 | P2 |

**Total de casos de responsividade: 30 (CT-R-001 a CT-R-030)**
