# Relatório de Auditoria Visual — Refatoração Eliora RH

**Data:** 13/08/2026
**Auditor:** Designer (auditoria visual de identidade)
**Escopo:** Refatoração de HTML único → arquivos modulares (`index.html` + `css/*.css` + `js/main.js` + `assets/img/*.png`)
**Referência de identidade:** `Eliora_RH Landing Page.html` (CSS inline original)

---

## VEREDITO: ✅ IDENTIDADE PRESERVADA

> **Não foram encontrados desvios de identidade.** Todos os design tokens, valores de tipografia, espaçamentos, raios, sombras, keyframes, gradientes, z-index e breakpoints estão **idênticos** ao original. As três imagens de logo renderizam sem quebra e sem distorção de proporção. A única diferença estrutural é a substituição dos **logos base64 inline** por **arquivos PNG** (`assets/img/`) e dos **styles inline** do CTA/Valores por **regras CSS equivalentes** — mudanças internas que não alteram em nada o resultado visual.

**Evidência:** 17 screenshots reais (desktop 1440px e mobile 375px) + estilos computados via `getComputedStyle` + amostragem de pixels das capturas + verificação de contraste WCAG AA.

---

## 1. TABELA DE CONFERÊNCIA — DESIGN TOKENS (CORES E FONTES)

Fonte: `css/tokens.css` vs `:root` do HTML original.

| Token | Valor esperado (original) | Valor encontrado (refatorado) | Status |
|---|---|---|---|
| `--plum` | `#4B2242` | `#4B2242` | ✅ idêntico |
| `--plum-deep` | `#331730` | `#331730` | ✅ idêntico |
| `--mauve` | `#7C4A6B` | `#7C4A6B` | ✅ idêntico |
| `--gold` | `#D4A26A` | `#D4A26A` | ✅ idêntico |
| `--gold-light` | `#E8C79A` | `#E8C79A` | ✅ idêntico |
| `--cream` | `#F2E9E2` | `#F2E9E2` | ✅ idêntico |
| `--cream-soft` | `#FAF5F0` | `#FAF5F0` | ✅ idêntico |
| `--grey` | `#333333` | `#333333` | ✅ idêntico |
| `--white` | `#FFFFFF` | `#FFFFFF` | ✅ idêntico |
| `--serif` | `'Playfair Display', Georgia, serif` | `'Playfair Display', Georgia, serif` | ✅ idêntico |
| `--sans` | `'Montserrat', -apple-system, sans-serif` | `'Montserrat', -apple-system, sans-serif` | ✅ idêntico |

**Carga de fontes (index.html):** mesma URL do Google Fonts (Playfair Display 400–700 + itálico 500; Montserrat 300–700). ✅

---

## 2. TABELA DE CONFERÊNCIA — TIPOGRAFIA E ESTILOS-CHAVE

Verificação por estilos computados no navegador (1440px).

| Regra | Valor esperado (original) | Valor encontrado (computado) | Status |
|---|---|---|---|
| `body` font | Montserrat (var(--sans)) | `Montserrat, -apple-system, sans-serif` | ✅ idêntico |
| `h1` hero | Playfair Display, 600, `clamp(34, 4.4vw, 58px)` → 58px@1440, cor cream, lh 1.14, ls 0.2px | `"Playfair Display", Georgia, serif` / `58px` / `rgb(242,233,226)` = #F2E9E2 / `66.12px` / `0.2px` / `600` | ✅ idêntico |
| `h2` (seções) | Playfair Display, cor plum | `"Playfair Display", Georgia, serif` / `rgb(75,34,66)` = #4B2242 | ✅ idêntico |
| `.eyebrow` | Montserrat 12px / 600 / ls 3px / uppercase / mauve | `12px` / `3px` / `uppercase` / `rgb(124,74,107)` = #7C4A6B | ✅ idêntico |
| `.eyebrow` no hero | gold-light | `rgb(232,199,154)` = #E8C79A | ✅ idêntico |
| `.btn-primary` | gold bg / plum-deep text / radius 2px / 15px 30px | `rgb(212,162,106)` / `rgb(51,23,48)` = #331730 / `2px` / `15px 30px` | ✅ idêntico |
| `.brand-mini` | Playfair 22px 600, cream | Playfair / `rgb(242,233,226)` | ✅ idêntico |
| `header` (normal) | fixed, z-index 500, padding 22px 0, sem bg | `fixed` / `500` / `22px 0` / `rgba(0,0,0,0)` | ✅ idêntico |
| `header.scrolled` | bg `rgba(242,233,226,0.92)` + blur(10px) + 14px 0 + sombra `0 4px 24px rgba(75,34,66,0.08)` | classe ativa após scroll (True) / `rgba(242,233,226,0.92)` / `blur(10px)` / `14px 0` / sombra confirmada | ✅ idêntico |
| `.meaning blockquote` | Playfair itálico 22px plum, borda gold | confirmado (`italic`, `22px`, `rgb(75,34,66)`, `2px solid rgb(212,162,106)`) | ✅ idêntico |
| `.pillar-grid` | 4 colunas, gap 1px, fundo `#eadfd6` | `277.75px x4` / `1px` / `rgb(234,223,214)` = #EADFD6 | ✅ idêntico |
| `.pillar-card:hover` | cream-soft | `rgb(250,245,240)` = #FAF5F0 | ✅ idêntico |
| `.pillar-glyph:hover` | bg gold, texto white | `rgb(212,162,106)` / `rgb(255,255,255)` | ✅ idêntico |
| `.step .num` | gold bg, plum-deep texto, Playfair | `rgb(212,162,106)` / `rgb(51,23,48)` / Playfair | ✅ idêntico |
| `.value-pills span` | borda mauve, texto plum, radius 30px, 13.5px | `rgb(124,74,107)` / `rgb(75,34,66)` / `30px` / `13.5px` | ✅ idêntico |
| `.cta h2` | cream, Playfair, `clamp(28, 3.6vw, 44px)` | `rgb(242,233,226)` / Playfair / `44px` | ✅ idêntico |
| `footer` | plum-deep | `rgb(51,23,48)` = #331730 | ✅ idêntico |
| `.foot-brand img` | width 150px | `150px` | ✅ idêntico |

### Gradientes, keyframes, z-index e breakpoints (conferência texto-a-texto)

| Item | Status |
|---|---|
| Hero bg: `radial-gradient(ellipse 900px 700px at 72% 18%, rgba(212,162,106,0.16), transparent 60%)` + `linear-gradient(160deg, plum 0%, plum-deep 78%)` | ✅ idêntico (components.css) |
| `@keyframes glow` (hero::before, 8s) | ✅ idêntico |
| `@keyframes pulse` (hero-logo::before, 5s) | ✅ idêntico |
| `@keyframes drop` (scroll-cue stem, 2s) | ✅ idêntico |
| `.process` bg: `linear-gradient(180deg, plum-deep, plum)` + `.process::after` radial | ✅ idêntico |
| `.cta::before` radial 700px `rgba(212,162,106,0.16)` | ✅ idêntico |
| `.divider` gradientes + dot com `box-shadow 0 0 10px 1px rgba(212,162,106,0.6)` | ✅ idêntico |
| z-index: header 500, burger 600, hero wrap 2, timeline 2 | ✅ idêntico |
| Breakpoints: `980px` e `640px` com todas as regras | ✅ idêntico (responsive.css) |
| `.reveal` / `.reveal.in` + `prefers-reduced-motion` | ✅ idêntico |

---

## 3. VERIFICAÇÃO DE CONTRASTE (WCAG AA)

| Par | Razão | Resultado |
|---|---|---|
| gold `#D4A26A` sobre plum `#4B2242` | 5.71:1 | ✅ AA |
| gold sobre plum-deep | 7.03:1 | ✅ AA |
| cream `#F2E9E2` sobre plum | 10.91:1 | ✅ AA |
| cream sobre plum-deep | 13.42:1 | ✅ AA |
| grey `#333333` sobre cream-soft `#FAF5F0` | 11.66:1 | ✅ AA |
| mauve sobre cream-soft (eyebrow) | 6.36:1 | ✅ AA |
| gold-light `#E8C79A` sobre plum (em do h1) | 8.13:1 | ✅ AA |
| plum `#4B2242` sobre cream-soft (h2) | 12.06:1 | ✅ AA |
| plum sobre white (h3 dos cards) | 13.07:1 | ✅ AA |
| `#555` sobre white (texto dos cards) | 7.46:1 | ✅ AA |
| `#4a4a4a` sobre cream-soft (parágrafos significado) | 8.18:1 | ✅ AA |
| plum-deep sobre gold (texto dos botões) | 7.03:1 | ✅ AA |

Todos os pares atendem AA (≥ 4.5:1 para texto normal; todos ≥ 7:1 na maioria).

---

## 4. IMAGENS DOS LOGOS

| Arquivo | Natural (px) | Renderizada (px) | Proporção natural | Proporção renderizada | Status |
|---|---|---|---|---|---|
| `assets/img/logo-hero.png` | 900 × 600 | 380 × 253.3 | 1.500 | 1.500 | ✅ sem distorção |
| `assets/img/logo-meaning.png` | 900 × 629 | 300 × 209.7 | 1.4308 | 1.4307 | ✅ sem distorção |
| `assets/img/logo-footer.png` | 900 × 621 | 150 × 103.5 | 1.4493 | 1.4493 | ✅ sem distorção |

- Nenhuma imagem quebrada (`naturalWidth = 0` em nenhuma). ✅
- Nenhuma requisição falhou no console/rede. ✅
- Nenhum erro de console JavaScript. ✅

---

## 5. LISTA DE DESVIOS

**Nenhum desvio encontrado.**

Observações registradas (não são desvios — são diferenças internas equivalentes):

| ID | Tipo | Local | Descrição |
|---|---|---|---|
| OBS-01 | Refatoração interna | `index.html` | Logos trocados de **base64 inline** para **arquivos PNG** (`assets/img/`). Renderização idêntica (proporções preservadas, ver seção 4). |
| OBS-02 | Refatoração interna | `components.css` | O `style="margin-bottom:0"` inline do `#valores .section-head` foi movido para a regra `#valores .section-head{ margin-bottom: 0; }` (linha 275). Visualmente equivalente. |
| OBS-03 | Refatoração interna | `components.css` | O `style="justify-content:center"` inline do `.btn-row` do CTA foi movido para `.cta .btn-row{ justify-content:center; }` (linha 329). Visualmente equivalente. |
| OBS-04 | Refatoração interna | `index.html` / `js/main.js` | Script inline (scroll header, burger, reveal) extraído para `js/main.js` com `defer`. Mesma lógica (threshold 0.15, scrollY > 40). Comportamento confirmado em runtime. |

---

## 6. SCREENSHOTS SALVOS (EVIDÊNCIA)

Pasta: `docs/06-auditoria/screenshots/`

**Desktop — 1440 × 900**

| Arquivo | Conteúdo |
|---|---|
| `desktop-01-hero-topo.png` | Hero no topo (header transparente) — gradiente plum→plum-deep, h1 serif cream, logo dourado, CTA gold |
| `desktop-02-hero-scrolled.png` | Mesmo viewport após scroll — header `scrolled` translúcido cream + blur |
| `desktop-03-significado.png` | Seção significado (marca + texto + blockquote) |
| `desktop-04-pilares-hover.png` | Pilares com hover no 1º card (fundo cream-soft + glyph dourado preenchido) |
| `desktop-05-abordagem.png` | Abordagem/timeline sobre gradiente plum-deep→plum |
| `desktop-06-valores.png` | Missão e valores (pills mauve/plum) |
| `desktop-07-cta.png` | CTA sobre plum com radial dourado |
| `desktop-08-footer.png` | Footer plum-deep com logo, colunas e social |

**Mobile — 375 × 812**

| Arquivo | Conteúdo |
|---|---|
| `mobile-01-hero-topo.png` | Hero mobile (logo acima, centralizado) |
| `mobile-02-hero-scrolled.png` | Header scrolled mobile |
| `mobile-03-significado.png` | Significado empilhado |
| `mobile-04-pilares.png` | Pilares em 1 coluna |
| `mobile-05-abordagem.png` | Timeline em 1 coluna |
| `mobile-06-valores.png` | Valores mobile |
| `mobile-07-cta.png` | CTA mobile |
| `mobile-08-footer.png` | Footer empilhado |
| `mobile-09-menu-aberto.png` | Menu mobile aberto (drawer plum-deep 78%) |

**Amostragem de pixels (cores dominantes confirmadas nas capturas):**

| Screenshot | Cores dominantes | Confere com |
|---|---|---|
| hero topo (desktop/mobile) | `#331730` (plum-deep), `#D4A26A` (gold) | Gradiente do hero + logo dourado |
| significado | `#FAF5F0` (cream-soft) | Fundo da seção |
| pilares hover | `#FFFFFF` (cards), `#FAF5F0` (card hover), `#D4A26A` (glyph) | Hover aplicado |
| abordagem | `#3F1C39`/`#361832` (gradiente plum) | Gradiente process |
| valores | `#FAF5F0`, `#4B2242` (plum pills) | Seção valores |
| cta | `#4B2242` (plum), `#D4A26A` (gold) | Seção CTA |
| footer | `#331730` (plum-deep), `#4B2242` | Footer + CTA |
| menu mobile | `#331730` (drawer), `#D4A26A` | Menu aberto |

---

## 7. RECOMENDAÇÃO

1. **Aprovar a refatoração** — a identidade visual está 100% preservada, com evidência por código, estilos computados, contraste WCAG e screenshots reais.
2. **Manter os logos como arquivos externos** (`assets/img/`): além de idênticos visualmente, reduzem o peso da página em ~285 KB de base64 por página.
3. **Opcional (sem impacto na identidade):** adicionar `width`/`height` explícitos ou `aspect-ratio` nas `<img>` dos logos para eliminar o *layout shift* mínimo no carregamento (CLS). Valores: hero `aspect-ratio: 3/2`, meaning `900/629`, footer `900/621`.
4. **Recomendação de design system:** os tokens de `tokens.css` estão prontos para virar fonte única de verdade (single source of truth) — nenhuma cor hardcoded fora dos tokens foi introduzida na refatoração.

---

*Fim do relatório. Auditoria executada com Playwright (headless Chromium), `getComputedStyle`, análise de contraste WCAG AA e amostragem de pixels via System.Drawing.*
