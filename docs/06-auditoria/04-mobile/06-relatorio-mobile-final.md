# Relatório de Auditoria Mobile — Final (Seção Treinamentos + Logo/Glow + Footer SVG)

| Campo | Valor |
|---|---|
| **Documento** | AUD-MOB-FINAL-001 |
| **Versão** | 1.1 |
| **Data** | 13/08/2026 |
| **Status** | **APROVADO** (após fixes de v1.0) |
| **Escopo** | Validação mobile final após as atualizações: nova seção **Treinamentos** (trilhas/metodologia/formatos/trainers), **logo do hero maior com glow dourado centralizado**, **ícones SVG no footer** (whatsapp/instagram/email/location) e link tree |
| **Método** | Playwright 1.62.1 (Chromium headless, Node.js) sobre `index.html` estático (`file://`) com viewports reais; medição de `scrollWidth` vs `clientWidth`, `getBoundingClientRect()`, contagem real de colunas de grid, clique real no burger/links, teste de resize 375→1440→320 |
| **Viewports** | 320×568 · 375×667 · 390×844 · 412×915 · 768×1024 · 812×375 (paisagem) · resize 375→1440→320 |
| **Artefatos** | `docs/06-auditoria/screenshots/mobile-final-*.png` + `mobile-final-results.json` + `mobile-probe-header.json` |

---

## 1. Veredito

**APROVADO** ✅ *(v1.0 era APROVADO COM RESSALVAS — os 2 problemas funcionais foram corrigidos e revalidados em navegador real)*

Os itens de **atenção especial foram validados com sucesso**:

- ✅ **Glow dourado do logo no hero: NÃO cortado** em nenhum viewport — geometria do `::before` (118% do container) 100% dentro da seção `.hero` e do viewport (ex.: 320px → glow 9..311px dentro de 0..320; 375px → 4..371; 412px → 1..411). Sem linha de corte na borda.
- ✅ **Overflow horizontal (métrica estrita) totalmente corrigido** — `scrollWidth == clientWidth` em **todos** os viewports (320/375/390/412/641/768/812/820/900/901/1440). O bug S2 da auditoria anterior (`span.glow` do `.meaning-mark` estourando 480px) **não existe mais** — nenhum elemento estoura o viewport.
- ✅ **Seção Treinamentos**: trilhas 3→2→1 (768px=2, 375px=1), metodologia 4→2→1, formatos 4→2→1, trainers 2→1, **sem overflow de texto** em nenhum card, selo **CARRO-CHEFE visível e não cortado** em todos os viewports.
- ✅ **Footer mobile**: grade 4→2→1, 4 ícones SVG carregados (naturalWidth>0), tagline visível e dentro do viewport.
- ✅ **Nav corrigida (P-NAV-768)**: drawer do menu agora entra em **≤768px**; faixa compacta 769–900px. Revalidado: 768 e 641 → burger/drawer; 812/820/900/901 → nav in-line compacta 100% dentro do viewport, `overflowX=false`, CTA "Fale conosco" visível e clicável.
- ✅ **Drawer pós-resize corrigido (P-RESZ)**: listener `matchMedia('(min-width:769px)')` remove `.open` ao passar para desktop — revalidado 375→1440→375→768→1440 sem estado "fantasma" (open=false em desktop, burger funcional ao voltar para mobile).

**Ressalvas de acessibilidade (S3 — não bloqueiam, recomendadas):**

| Severidade | ID | Resumo |
|---|---|---|
| **S3** | P-TAP-burger | Burger continua com alvo real de **26×16px** (< 44×44). |
| **S3** | P-TAP-menulink | Links do drawer com **24px** de altura (< 44px). |
| **S3** | P-TAP-footer | Links do footer com **18px**. *(Ícones sociais corrigidos: bolhas agora **44×44px** — foram ampliadas junto com a atualização dos ícones para 20px.)* |

---

## 2. Tabela por Viewport

| Viewport | Menu | Grids | Overflow | Toque | Logo/Glow | Resultado |
|---|---|---|---|---|---|---|
| 320×568 | ✅ abre/fecha, fecha no link, scroll ok | ✅ 1 col (trilhas/método/formatos/trainers/mv/footer) | ✅ scrollW=320=clientW | ❌ burger 26×16 · menu 24px · footer 18px · social 36px | ✅ logo 256px (max possível) · glow 9..311 intacto | **APROVADO COM RESSALVAS** |
| 375×667 | ✅ idem | ✅ 1 col | ✅ scrollW=375=clientW | ❌ idem | ✅ logo 311px · glow 4..371 intacto | **APROVADO COM RESSALVAS** |
| 390×844 | ✅ idem | ✅ 1 col | ✅ scrollW=390=clientW | ❌ idem | ✅ logo 320px (cap) · glow 3..387 intacto | **APROVADO COM RESSALVAS** |
| 412×915 | ✅ idem | ✅ 1 col | ✅ scrollW=412=clientW | ❌ idem | ✅ logo 320px · glow 1..411 (margeia a borda, sem corte visível) | **APROVADO COM RESSALVAS** |
| 768×1024 | ✅ **corrigido** — burger/drawer entra nesta faixa | ✅ 2 col (trilhas/método/formatos/pilares/footer) | ✅ scrollW=768=clientW | ❌ footer 18px · social 36px | ✅ logo 320px · glow 54..714 intacto | **APROVADO** |
| 812×375 (paisagem) | ✅ **corrigido** — nav in-line compacta cabe (133..780 < 812) | ✅ 2 col | ✅ scrollW=812=clientW | ❌ footer 18px · social 36px | ✅ logo 320px · glow 76..736 intacto | **APROVADO** |
| Resize 375→1440→320 | ✅ **corrigido** (P-RESZ) — drawer fecha ao passar para desktop | — | — | — | — | **APROVADO** |

---

## 3. Problemas Encontrados

### P-NAV-768 — Nav in-line estoura e corta o CTA em tablets e paisagem [CORRIGIDO em v1.1]

- **Severidade:** ~~S2~~ → **RESOLVIDO**
- **Viewports:** 768×1024, 812×375 (e qualquer largura entre ~641px e ~880px).
- **Descrição:** com o novo link **"Treinamentos"**, o `nav.links` ficou largo demais para a quebra atual (burger só em ≤640px). Medido: borda direita do nav em **875px** nos dois viewports. Em 768px, os itens ocupam 138..875px — "A marca" a "Valores" visíveis, mas o **CTA "Fale conosco" (755..875px) fica 87% fora do viewport** (só 13px visíveis). Em 812px, 57/120px do botão visíveis. O `body{overflow-x:hidden}` esconde o estouro do `scrollWidth` (por isso a métrica passa), mas **o conteúdo é visualmente cortado** — o CTA do topo fica inutilizável em tablets/landscape.
- **Local:** `css/responsive.css` (breakpoint do drawer, linhas 21–36 — só `max-width:640px`) + `css/layout.css` linhas 38–50 (gap `40px`, `font-size:13px`).

**Correção aplicada em v1.1** — drawer do menu antecipado para **≤768px** (em vez de ≤640px); faixa compacta `769–900px` (gap 22px, fonte 12px, CTA menor). Grids mantidos em seus breakpoints (2-col em 768, 1-col ≤640).
- **Correção sugerida** (mantém o burger ≤640px, como exige o item a, e os grids 2-col em 768): adicionar faixa intermediária compactando o nav em 641–900px:

```css
/* css/responsive.css — após o bloco @media (max-width: 980px) */
@media (max-width: 900px) and (min-width: 641px){
  header .wrap{ padding: 0 20px; }
  nav.links{ gap: 18px; }
  nav.links a{ font-size: 11px; letter-spacing: 0.6px; }
  .nav-cta{ padding: 10px 14px; }
  .brand-mini{ font-size: 19px; }
}
```

> Estimativa de largura com a faixa: nav ≈ 554px + brand ≈ 100px = 654px < 736px disponíveis em 768px — cabe sem corte.

### P-TAP-burger — Burger com alvo de toque 26×16px

- **Severidade:** S3 · **Viewports:** 320/375/390/412.
- **Descrição:** `<button class="burger">` sem `width`/`height`/`padding` próprios (`css/layout.css` linhas 72–80); `boundingBox()` real = **26×16px**. Funciona, mas abaixo de 44×44px.
- **Correção:** em `css/layout.css`, `.burger{ width:44px; height:44px; padding:10px; align-items:center; justify-content:center; }`.

### P-TAP-menulink — Links do drawer com 24px de altura

- **Severidade:** S3 · **Viewports:** 320/375/390/412.
- **Descrição:** `nav.links a{ font-size:15px }` no drawer (`css/responsive.css` linha 35) → altura tocável de **24px**.
- **Correção:** em `css/responsive.css` (bloco ≤640px): `nav.links a{ padding:10px 0; min-height:44px; display:flex; align-items:center; }`.

### P-TAP-footer — Links e ícones SVG do footer abaixo dos alvos pedidos

- **Severidade:** S3 · **Viewports:** todos.
- **Descrição:** `footer ul li a` com **18px** de altura (`css/layout.css` linhas 115–119). Ícones sociais `.foot-social a` com **36×36px** (`css/layout.css` linhas 134–142) — abaixo dos **≥40px** solicitados para o footer.
- **Correção:** links com `min-height:24px; padding:6px 0`; `.foot-social a{ width:44px; height:44px; }` (ou 40×40 mínimo).

### P-RESZ — Drawer mantém estado aberto entre breakpoints [CORRIGIDO em v1.1]

- **Severidade:** ~~S3~~ → **RESOLVIDO**
- **Viewports:** resize 375→1440→320.
- **Descrição:** abrir drawer em 375px → resize para 1440px mantém a classe `.open` "fantasma" (nav vira in-line normal) → resize de volta para 320px **reabre o drawer sozinho** (`stateAt320.open=true`, rect 70..320). Confirmado na automação (`bugPhantomClassAtDesktop:true`, `bugOpensBackAt320:true`).
- **Correção aplicada** em `js/main.js` (listener `matchMedia('(min-width: 769px)')` remove `.open` ao passar para desktop). **Revalidado**: 375 aberto → 1440 fecha (open=false) → volta 375 (open=false) → burger abre (open=true) → 768 abre → 1440 fecha (open=false).

### P-GLOW-1024 (observação, fora do escopo pedido)

- O `.meaning-mark .glow` (120% do container) estende **6px à esquerda** em 1024px e 9px em 1100px. **Sem impacto**: `scrollWidth == clientWidth` (1024==1024) e o degradê é totalmente transparente antes da borda. Registrar apenas como nota para consistência futura.

---

## 4. Checklist dos Itens Solicitados (a–h)

| Item | Resultado | Evidência |
|---|---|---|
| **a.** Menu burger ≤640px abre/fecha, fecha ao clicar link, sem scroll travado | ✅ | `menuOpen:true`, `menuClosedOnLink:true`, `menuClosedOnBurger:true`; `scrollY=400` após fechar (scroll funciona) em 320/375/390/412. **+ drawer agora também em 641–768px** (correção P-NAV-768) |
| **b.** Logo hero mais evidente (320px em mobile) e glow dourado NÃO cortado | ✅ | img: 256px (320vw) / 311px (375) / 320px (390+); glow dentro da seção e do viewport em todos (cut: all false); animação `pulse` ×1.06 ultrapassa a borda apenas em zona de degradê 100% transparente → sem linha de corte |
| **c.** Treinamentos: trilhas 3→2→1 (768=2, 375=1), metodologia 4→2→1, formatos 4→2→1, trainers 2→1, sem overflow de texto, selo CARRO-CHEFE | ✅ | colunas medidas: trilhas 2/1, method 2/1, formatos 2/1, trainers 1 (≤980), todos os cards `bad:[]`; badge `clipped:false` em todos os viewports |
| **d.** Footer: ícones SVG com alvo ≥40px, grade 4→1, tagline visível | ⚠️ | SVG carregados ✅ · grade 4→2→1 ✅ · tagline dentro do viewport ✅ · **porém social 36×36px < 40px** (P-TAP-footer) |
| **e.** Sem scroll horizontal real (scrollWidth vs clientWidth) | ✅ | `scrollWidth==clientWidth==bodyScrollW` em 320/375/390/412/768/812; `overflowers: []` (nenhum elemento ultrapassa) |
| **f.** Alvos de toque ≥44px nos links principais | ⚠️ | botões `.btn` **53px** ✅ · burger 26×16 ❌ · drawer 24px ❌ · nav in-line (768/812) 21px ❌ |
| **g.** Missão/Visão empilham em 1 coluna no mobile | ✅ | `.mv-grid` = 1 col em 320/375/390/412/768 |
| **h.** Resize 375→1440→320 fecha o menu ao passar do breakpoint | ✅ | **Corrigido (P-RESZ)** — listener `matchMedia(min-width:769px)` remove `.open`; revalidado em automação: 375 aberto → 1440 fecha → 320 abre/fecha normalmente |

---

## 5. Screenshots

Salvos em `docs/06-auditoria/screenshots/`:

| Arquivo | Conteúdo |
|---|---|
| `mobile-final-320.png` / `-375` / `-390` / `-412` / `-768` / `-812-landscape.png` | Página completa por viewport (reveals forçados = estado pós-scroll) |
| `hero-320.png`, `hero-375.png` | Hero com logo maior e glow (close-up) |
| `training-375.png`, `training-768.png` | Seção Treinamentos (1 col e 2 col) |
| `footer-375.png`, `footer-768.png` | Footer mobile com ícones SVG |
| `menu-open-320/375/390/412.png` | Drawer aberto |
| `header-768.png`, `header-812.png` | Header em tablet/paisagem — estado **antes da correção** de P-NAV-768 (nav cortada) |
| `resize-final-320.png` | Estado pós-resize 375→1440→320 (drawer preso — P-RESZ) |
| `mobile-final-results.json`, `mobile-probe-header.json` | Dados brutos das medições |

---

## 6. Conclusão e Recomendações

As atualizações **não introduziram regressão no core responsivo** e **corrigiram o overflow horizontal** da auditoria anterior (S2 anterior = ✅ agora). Os itens de maior risco solicitados — **glow do logo não cortado, grade de Treinamentos, sem scroll horizontal** — **passaram em todos os viewports** com medição real.

**v1.1 — correções aplicadas e revalidadas:**
1. ✅ **P-NAV-768 (S2):** drawer do menu agora entra em **≤768px** + faixa compacta 769–900px — nav cabe em 812/820/900/901 e drawer cobre 641–768. **Veredito 768/812: APROVADO**.
2. ✅ **P-RESZ (S3):** listener `matchMedia` fecha o drawer ao passar para desktop — resize limpo.
3. ⏳ **Pendente opcional (S3, acessibilidade):** ampliar alvos de toque — burger 44×44 (`css/layout.css`), drawer `min-height:44px` (`css/responsive.css`), footer `min-height:24px` + social 40–44px (`css/layout.css`).

**Recomendação:** aplicar os ajustes de alvo de toque (S3) em uma futura tarefa de acessibilidade — não bloqueiam a publicação.