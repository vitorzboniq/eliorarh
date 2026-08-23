# Relatório QA — Validação da Refatoração do Site Estático Eliora RH

| Campo | Valor |
|---|---|
| **Documento** | `02-relatorio-qa-refatoracao.md` |
| **Data** | 13/08/2026 |
| **QA responsável** | Agente QA (webapp-testing / Playwright) |
| **Escopo** | Refatoração de arquivo único → estrutura modular (`index.html` + `css/` + `js/` + `assets/img/`) |
| **Objetivo** | **ZERO mudança** de aparência/comportamento entre original e refatorado |
| **Arquivos auditados** | `index.html`, `css/tokens.css`, `css/base.css`, `css/layout.css`, `css/components.css`, `css/responsive.css`, `js/main.js`, `assets/img/logo-hero.png`, `assets/img/logo-meaning.png`, `assets/img/logo-footer.png` |
| **Referência original** | `Eliora_RH Landing Page.html` (413 KB, CSS inline + 3 imagens base64) |

---

## 1. Resumo Executivo

# ✅ APROVADO

A refatoração atingiu o objetivo de **zero mudança de aparência e comportamento**. Todos os critérios de validação foram executados em **navegador real (Chromium headless via Playwright)** contra o site servido localmente, e o site refatorado foi comparado diretamente com o arquivo original:

- **54 validações executadas → 54 PASS** (após ajuste de critérios de teste que estavam incorretos — detalhado na seção 3).
- Conteúdo textual **100% idêntico** (2938 caracteres normalizados, diff = 0).
- **Imagens bit-a-bit idênticas** ao base64 original (MD5 iguais nos 3 logos).
- **CSS semanticamente equivalente**: 491 declarações originais preservadas na íntegra; apenas 2 regras foram adicionadas para substituir os 2 `style=` inline do original (comportamento idêntico).
- **JS funcionalmente idêntico** (renomeação de variáveis; mesmo comportamento de scroll/burger/reveal).
- **Comparação pixel-a-pixel**: seções `pilares`, `process` (timeline), `footer` e topo mobile **0 pixels diferentes**; hero com diferença máxima de **3/255 unidades de cor** (imperceptível, causada pela fase das animações contínuas `glow`/`pulse`), com **0 pixels de diferença > 20/255**.
- Nenhum 404, nenhum console error, nenhum request falhando.

Foram identificadas **2 observações pré-existentes no original** (não são regressões da refatoração) — documentadas na seção 3 como ressalvas de baixa prioridade, sem impacto no veredito.

---

## 2. Tabela de Validações Executadas

### 2.1 Carregamento e Recursos (CT-F / itens 1–2 do roteiro)

| # | Item | Resultado | Evidência |
|---|---|---|---|
| 1 | Página abre no servidor local (`http://127.0.0.1:8765/`) | **PASS** | HTTP 200, `domcontentloaded` ok |
| 2 | 5 CSS carregados (`tokens`, `base`, `layout`, `components`, `responsive`) | **PASS** | Todos presentes em `performance.getEntriesByType('resource')` |
| 3 | 1 JS carregado (`js/main.js`) | **PASS** | Presente |
| 4 | 3 imagens carregadas (`logo-hero.png`, `logo-meaning.png`, `logo-footer.png`) | **PASS** | Presentes |
| 5 | Nenhum request HTTP ≥ 400 (sem 404) | **PASS** | `[]` |
| 6 | Sem erros de console | **PASS** | `[]` |
| 7 | Sem requests falhando | **PASS** | `[]` |

### 2.2 Funcional (CT-F-002, CT-F-005/006/007, CT-F-017 a 022 — itens 3 do roteiro)

| # | Item | Resultado | Evidência |
|---|---|---|---|
| 8 | Header ganha `.scrolled` ao rolar > 40px | **PASS** | `antes='' depois='scrolled'` |
| 9 | Header volta ao normal no topo | **PASS** | `topo=''` |
| 10 | Seção `#significado` existe e âncora navega | **PASS** | count=1, top=0 |
| 11 | Seção `#pilares` existe e âncora navega | **PASS** | count=1, top=0 (após espera de smooth scroll) |
| 12 | Seção `#abordagem` existe e âncora navega | **PASS** | count=1, top=58 |
| 13 | Seção `#valores` existe e âncora navega | **PASS** | count=1, top=0 |
| 14 | Seção `#contato` existe e âncora navega | **PASS** | count=1, top=0 |
| 15 | Deep link `/#contato` rola até a seção | **PASS** | top=0 |
| 16 | Link `mailto:contato@eliorarh.com.br` presente | **PASS** | `['mailto:contato@eliorarh.com.br', …]` |
| 17 | Link `https://wa.me/5544999999999` presente | **PASS** | `['https://wa.me/5544999999999']` |
| 18 | Link Instagram `eliora.rh` presente | **PASS** | 2 ocorrências |
| 19 | Link LinkedIn presente | **PASS** | `https://linkedin.com/` |
| 20 | Scroll reveal ativa todos os elementos `.reveal` (14/14) | **PASS** | `in=14/14` |
| 21 | Burger abre o menu mobile (375px) | **PASS** | `open=True` |
| 22 | Burger fecha o menu mobile (2º clique) | **PASS** | `open=False` |
| 23 | Clicar em link do menu fecha o painel | **PASS** | `open=False` |
| 24 | Menu mobile acionável por teclado (Enter) | **PASS** | `open=True` |
| 25 | Tab alcança os links de navegação | **PASS** | sequência `A#top, A#significado, A#pilares, A#abordagem, A#valores, A#contato` |
| 26 | `prefers-reduced-motion` desativa transições | **PASS** | `transitionDuration=0s` |
| 27 | Reveal continua entregando conteúdo com reduced-motion | **PASS** | `in=14` |

### 2.3 Renderização Visual / Marca (item 4 do roteiro)

| # | Item | Resultado | Evidência |
|---|---|---|---|
| 28 | Hero com gradiente plum (`#4B2242`) | **PASS** | `linear-gradient(160deg, rgb(75,34,66), …)` |
| 29 | H1 usa Playfair Display | **PASS** | `"Playfair Display", Georgia, serif` |
| 30 | H1 cor cream (`#F2E9E2`) | **PASS** | `rgb(242,233,226)` |
| 31 | Grid de pilares 4 colunas em 1440px | **PASS** | `gridTemplateColumns` = 4 |
| 32 | Timeline 4 colunas em 1440px | **PASS** | = 4 |
| 33 | Footer 4 colunas em 1440px | **PASS** | = 4 |
| 34 | Hero 2 colunas em 1440px | **PASS** | = 2 |
| 35 | Comparação pixel-a-pixel: seção pilares | **PASS** | **0 px diferentes** |
| 36 | Comparação pixel-a-pixel: seção processo/timeline | **PASS** | **0 px diferentes** |
| 37 | Comparação pixel-a-pixel: footer | **PASS** | **0 px diferentes** |
| 38 | Comparação pixel-a-pixel: topo mobile (375px) | **PASS** | **0 px diferentes** |
| 39 | Comparação pixel-a-pixel: hero (animações) | **PASS** | máx. 3/255 (0 px > 20/255) |

### 2.4 Responsivo (CT-R-001, 002, 005, 007–010 — item 5 do roteiro)

| # | Item | Resultado | Evidência |
|---|---|---|---|
| 40 | 375px: pilares 1 coluna | **PASS** | = 1 |
| 41 | 375px: timeline 1 coluna | **PASS** | = 1 |
| 42 | 375px: footer 1 coluna | **PASS** | = 1 |
| 43 | 375px: burger visível | **PASS** | `display: flex` |
| 44 | 375px: sem rolagem horizontal **real** (usuário) | **PASS** | `scrollX=0` após `scrollLeft=500` |
| 45 | 768px: pilares 2 colunas | **PASS** | = 2 |
| 46 | 768px: timeline 2 colunas | **PASS** | = 2 |
| 47 | 768px: footer 2 colunas | **PASS** | = 2 |
| 48 | 768px: menu completo (burger off) — conforme breakpoint 640px | **PASS** | `burger=none nav=flex` (igual ao original) |
| 49 | 768px: sem scroll horizontal | **PASS** | diff=0 |
| 50 | 1440px: pilares/timeline/footer 4 colunas | **PASS** | = 4 |
| 51 | 1440px: sem scroll horizontal | **PASS** | diff=0 |
| 52 | 320px: comportamento de scroll **idêntico ao original** | **PASS** | REF e ORIG ambos `maxX=45`, `scrollX=0` |

### 2.5 Acessibilidade Rápida (CT-A-002, 009, 017 — item 6 do roteiro)

| # | Item | Resultado | Evidência |
|---|---|---|---|
| 53 | `<html lang="pt-BR">` | **PASS** | `pt-BR` |
| 54 | `alt` nas 3 imagens | **PASS** | `['Eliora RH', 'Eliora RH', 'Eliora RH']` |
| 55 | `aria-label` no botão burger | **PASS** | `"Abrir menu"` |
| 56 | `aria-label` nas redes sociais | **PASS** | `['Instagram', 'LinkedIn', 'WhatsApp']` |

### 2.6 Validação de HTML (item 7 do roteiro)

| # | Item | Resultado | Evidência |
|---|---|---|---|
| 57 | Sem `<style>` inline no `index.html` | **PASS** | 0 ocorrências |
| 58 | Sem atributos `style=` no `index.html` | **PASS** | 0 ocorrências |
| 59 | Sem `data:image` no `index.html` | **PASS** | 0 ocorrências |
| 60 | `<!DOCTYPE html>` presente | **PASS** | sim |
| 61 | `lang="pt-BR"` presente | **PASS** | sim |

### 2.7 Comparação de Conteúdo Original × Refatorado (item 8 do roteiro)

| # | Item | Resultado | Evidência |
|---|---|---|---|
| 62 | Texto das seções idêntico (hero, significado, pilares, abordagem, valores, cta, footer) | **PASS** | 2938 chars normalizados **iguais** (diff=0) |
| 63 | Imagens idênticas bit-a-bit ao base64 original | **PASS** | MD5 iguais: `a65c8404e8`, `e0b04b8f6d`, `6a1d5a8fa3` |
| 64 | Declarações CSS do original preservadas | **PASS** | 0 declarações exclusivas do original; 491 preservadas |
| 65 | JS com mesma funcionalidade | **PASS** | `scrollY>40`, `classList.toggle`, `IntersectionObserver`, `threshold`, `unobserve` presentes em ambos |
| 66 | Media queries idênticas (980px / 640px / reduced-motion) | **PASS** | mesmas 3 MQ nos dois |
| 67 | Mesmo nº de links (20) e botões (1) | **PASS** | orig a=20 ref a=20, botão=1 |
| 68 | Contagem de seções idêntica | **PASS** | 8 seções equivalentes |

---

## 3. Problemas Encontrados

### P1 — Pré-existente (NÃO é regressão) — Severidade: S4 Menor / Prioridade: P4

**Descrição:** Os links de redes sociais não possuem `target="_blank"` nem `rel="noopener noreferrer"`.

**Como reproduzir:** Inspecionar `.foot-social a` no HTML (linhas ~198-200 do `index.html`).

**Análise QA:** A spec funcional (CT-F-019) espera `target="_blank"` + `rel="noopener noreferrer"`. Porém, **o arquivo original também não possui esses atributos** (verificado por análise de string: `target=` ausente em ambos). Como o objetivo é **zero mudança**, o refatorado está fiel — este é um débito pré-existente do original, fora do escopo da refatoração. **Recomendação:** corrigir em uma iteração de melhoria (não bloqueia a refatoração).

### P2 — Pré-existente (NÃO é regressão) — Severidade: S5 Trivial / Prioridade: P5

**Descrição:** O botão burger não gerencia `aria-expanded` (permanece ausente) e não há `role=` em nenhum elemento.

**Como reproduzir:** Inspecionar `#burger` no HTML; abrir menu mobile e observar que `aria-expanded` nunca é alterado.

**Análise QA:** Idêntico ao original (`aria-expanded` e `role=` ausentes em ambos). A spec (CT-F-005/006, CT-A-009) prevê `aria-expanded`, mas a refatoração manteve o comportamento existente — fidelidade total. **Recomendação:** melhoria futura de acessibilidade.

### P3 — Observação de engenharia — Severidade: S5 Trivial

**Descrição:** Em viewports ≤ 640px, o `document.documentElement.scrollWidth` excede o viewport (ex.: 428px vs 375px, diff=53px) devido ao `span.glow` (`.meaning-mark .glow { inset: -20% -30% }`) estourando a largura.

**Como reproduzir:** Abrir em 375px e medir `scrollWidth` no console.

**Análise QA:** Isso **não é uma regressão** — o original apresenta exatamente os mesmos valores (`maxX=53` em REF e ORIG, em 375px e 320px `maxX=45`). O `body { overflow-x: hidden }` impede rolagem horizontal real (verificado: `window.scrollX` permanece 0 mesmo após `scrollLeft=500`). Portanto, **sem impacto visual ou funcional para o usuário** e fiel ao original. **Recomendação:** opcional — se desejado, adicionar `overflow-x: clip` ou `overflow-x: hidden` à seção `.meaning` em futura manutenção.

### Nota de método (não é bug do site)

Durante a suíte, 3 itens aparentaram FAIL por **erro no script de teste do QA**, não no site: (1) espera curta demais para o `scroll-behavior: smooth` nas âncoras distantes — re-testado com espera de 1600 ms → PASS; (2) sintaxe JS inválida (`or` em vez de `||`) num helper de inspeção de teclado — corrigido e re-executado → PASS; (3) critério incorreto de "burger visível em 768px" — o breakpoint real do burger é `max-width: 640px` (idêntico no original), logo em 768px o menu completo é o comportamento correto e esperado.

---

## 4. Screenshots Salvos

Todos em `docs\06-auditoria\screenshots\`:

| Arquivo | Conteúdo |
|---|---|
| `qa-1440-full.png` | Página completa em 1440×900 |
| `qa-1440-hero.png` | Hero desktop |
| `qa-768-top.png` | Topo em 768×1024 (menu completo) |
| `qa-375-top.png` | Topo em 375×667 |
| `qa-375-burger-open.png` | Menu mobile aberto em 375px |
| `qa-deeplink-contato.png` | Deep link `/#contato` |
| `qa-anchor-pilares.png` / `qa-anchor-valores.png` | Âncoras navegando |
| `compare-REF-hero.png` / `compare-ORIG-hero.png` | Hero original vs refatorado (par) |
| `compare-REF-pilares.png` / `compare-ORIG-pilares.png` | Pilares original vs refatorado (par) |
| `compare-REF-process.png` / `compare-ORIG-process.png` | Abordagem original vs refatorado (par) |
| `compare-REF-footer.png` / `compare-ORIG-footer.png` | Footer original vs refatorado (par) |
| `compare-REF-375-top.png` / `compare-ORIG-375-top.png` | Topo mobile (par) |
| `compare-REF-375-burger.png` / `compare-ORIG-375-burger.png` | Menu mobile aberto (par) |
| `diff-full.png` / `diff-375.png` | Visualização das diferenças (ampliadas ×8; máx. 3/255) |
| `qa-investigacao-375.png` | Debug do overflow |
| `qa-results.json` / `qa-results-teclado.json` | Resultados estruturados (JSON) |

*Nota do QA: a comparação visual foi validada objetivamente por diff pixel-a-pixel (Pillow), pois a análise por imagem não é suportada neste modelo. As seções principais apresentam **0 pixels de diferença**; o hero difere em até 3/255 unidades (fase das animações contínuas).*

---

## 5. Metodologia

1. **Servidor local**: site servido via `with_server.py` (skill `webapp-testing`) + servidor estático Node.js (`http://127.0.0.1:8765`) — os testes anteriores usaram `python -m http.server`, com ocorrência intermitente de `ERR_EMPTY_RESPONSE` (resolução de `localhost`→`::1`); resolvido usando `127.0.0.1`.
2. **Navegador**: Chromium headless via Playwright (Python 3.12 / playwright 1.62).
3. **Viewports**: 1440×900, 768×1024, 375×667, 320×568.
4. **Comparação com original**: ambos servidos na mesma origem; screenshots pareados, comparação pixel-a-pixel com Pillow, e comparação de texto/CSS/JS normalizados.
5. **Testes interativos**: scroll, âncoras, burger, teclado (Tab/Enter), `prefers-reduced-motion`.

---

## 6. Recomendação Final

### ✅ APROVADO — Liberar a refatoração para produção.

- **Zero mudanças** de aparência, comportamento, conteúdo ou recursos foram introduzidos.
- Estrutura modular (`css/` + `js/` + `assets/img/`) pronta para manutenção.
- As 2 ressalvas (P1: `target=_blank`; P2: `aria-expanded`) são débitos **pré-existentes do original** e devem ser tratadas como backlog de acessibilidade, fora do escopo desta refatoração.

**Próximos passos sugeridos (não bloqueantes):**
1. Adicionar `target="_blank" rel="noopener noreferrer"` aos links sociais (CT-F-019).
2. Gerenciar `aria-expanded` no botão burger (CT-F-005/006, CT-A-009).
3. Opcional: `overflow-x: clip` na seção `.meaning` para zerar o `scrollWidth` em mobile.

---

*Fim do relatório.*
