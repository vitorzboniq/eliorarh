# Auditoria Mobile — Pontos a Melhorar (Proposta)

| Campo | Valor |
|---|---|
| **Documento** | `03-auditoria-mobile-pontos-melhoria.md` |
| **Versão** | 1.0 |
| **Data** | 22/08/2026 |
| **Status** | **Proposta** — aguardando decisão do usuário sobre o que implementar |
| **Método** | Playwright (Chromium headless), viewports 320/375/390/412/480/640/768/1024 |
| **Referência** | `02-melhorias-responsive-mobile.md` · `css/responsive.css` · `css/components.css` |

---

## 1. Estado atual (validado em 22/08/2026)

- ✅ Sem overflow horizontal em nenhum viewport (320–768 px).
- ✅ Zero erros de JavaScript.
- ✅ CTA do hero visível na dobra em todos os viewports.
- ✅ Parceiros: linha única de logos no mobile (≤640 px).
- ✅ Footer: ícones sociais em 2 linhas de 3, sem estouro visual.

Alturas de página medidas: 320 px → 8.147 · 375 px → 7.550 · 412 px → 7.234 · 480 px → 6.930 · 640 px → 6.741 · 768 px → 8.180.

---

## 2. Pontos a melhorar (ordenados por prioridade)

### 🔴 P1 — Consistência dos cards creme (maior impacto visual)

**Cards Significado/Valores são full-width; Metodologia/Formatos têm margens laterais** — inconsistente em todos os viewports:

| Viewport | Significado/Valores | Metodologia/Formatos |
|---|---|---|
| 320 px | 320 px (sem margem) | 263 px |
| 390 px | 390 px | 329 px |
| 768 px | 768 px | 662 px |
| 1024 px | 1024 px | 902 px |

O `max-width: 1050px` aplicado em `.meaning .wrap` / `.values .wrap` só limita em telas largas.

**Fix sugerido:** envolver o conteúdo num card interno (`.meaning-card` / `.values-card` com `max-width: 94%` dentro do `.wrap`) — mesmo padrão do `.methodo-card`. Requer pequena mudança de HTML (`index.html`) + CSS (`components.css`).

### 🟠 P2 — Legibilidade (fontes < 12 px no mobile)

1. **Hero keywords a 9 px** (≤640 px) — "Estratégia · Pessoas · Resultados · Propósito" muito pequenos (`responsive.css`, bloco ≤640). Sugestão: ≥ 11 px.
2. **Badge "Carro-chefe" 10 px**, **papel das facilitadoras 11 px** (`.trainer-role`), **tags de área/trilha 11,5 px** — sugerir ≥ 12 px.

### 🟡 P3 — Densidade (página ainda longa)

3. **Treinamentos = 54% da página mobile** (4.408 px @320 de 8.147 px totais). Cortes adicionais possíveis: clamp mais agressivo nas bios, ocultar descrições das trilhas/método, reduzir paddings.
4. **Página total @320 = 8.147 px (~15 telas)** — ainda longa apesar do corte v1.1 (era 11.170 px).

### 🟢 P4 — Toque e acessibilidade

5. **Logo do header (`.brand-mini`) = 26 px de altura** — abaixo de 44 px (aceitável para logo; registrar).
6. **Ícones sociais do footer = 26 px com gap 4 px** — passam o mínimo WCAG 2.2 (24 px), mas o espaçamento recomendado é 8 px.
7. **Tooltip dos parceiros sem hover no mobile** — descrição inacessível em touch (decisão de design já tomada; registrado para memória).

### ⚪ P5 — Menores

8. Footer social: `scrollWidth` ligeiramente maior que a coluna @320/390 (artefato do `::after`; sem overflow visual real).
9. Hero compacto (252 px @320) — H1 29 px + CTA; conferir conforto visual.

---

## 3. Recomendação

- **P1** fecha o "padrão de espaçamento" entre cards — maior impacto visual.
- **P2** é rápido (2–3 regras CSS em `responsive.css`).
- **P3** é o que mais reduz a rolagem mobile.
