# Plano de Melhorias Mobile — Compactação e Corte de Conteúdo

| Campo | Valor |
|---|---|
| **Documento** | `02-melhorias-responsive-mobile.md` |
| **Versão** | 1.0 |
| **Data** | 18/08/2026 |
| **Status** | **Aprovado e executado** (19/08/2026) — corte implementado em `css/responsive.css` e validado (qa + mobile) |
| **Referência** | `01-prioridades-roadmap.md` · `css/responsive.css` · `index.html` |

---

## 1. Contexto e objetivo

A página é **excessivamente longa em mobile** (11.170 px de altura em 320 px de largura ≈ 20 telas de rolagem). A compactação via CSS já aplicada (v1.1, bloco ≤640 px e bloco ≤480 px em `css/responsive.css`) reduziu a altura em **~24%** sem tocar no desktop. Este documento propõe o **próximo passo**: remover/ocultar conteúdo de menor valor em mobile, **apenas via CSS** (media queries), mantendo o desktop intacto.

**Escopo escolhido pelo usuário:** compactação via CSS (sem acordeões, sem reestruturação de DOM, sem alterar `index.html`).

---

## 2. Medições (Playwright, 18/08/2026)

Altura de cada seção por viewport (px):

| Seção | 320 px | 375 px | 412 px | 768 px | % da página (320 px) |
|---|---|---|---|---|---|
| Hero `#top` | 572 | 572 | 572 | 733 | 5,1% |
| Significado `#significado` | 888 | 816 | 816 | 735 | 7,9% |
| Pilares `#pilares` | 1.103 | 982 | 909 | 732 | 9,9% |
| Valores `#valores` | 1.002 | 900 | 806 | 840 | 9,0% |
| **Treinamentos `#treinamentos`** | **5.226** | **4.676** | **4.293** | **3.380** | **46,8%** |
| Abordagem `#abordagem` | 1.015 | 966 | 903 | 787 | 9,1% |
| Parceiros `#parceiros` | 367 | 344 | 344 | 362 | 3,3% |
| CTA/Contato `#contato` | 405 | 380 | 350 | 360 | 3,6% |
| **Total** | **11.170** | **10.227** | **9.585** | **8.249** | 100% |

**Leitura:** `#treinamentos` sozinho ocupa quase metade da página mobile. Qualquer corte ali tem impacto máximo.

---

## 3. Núcleo intocável (nunca ocultar em mobile)

- **Hero (`#top`):** H1 + tagline + CTA primário ("Agende uma conversa") — devem permanecer na dobra. Veredito hr-consultant: **MANTER INTEGRAL** (única exceção: ocultar `.hero-logo` em ≤480 px — header e footer já exibem a logo).
- **Abordagem (`#abordagem`):** os 4 passos (Diagnóstico → Estratégia → Implementação → Acompanhamento) são o core da consultoria. **MANTER INTEGRAL.**
- **CTA final (`#contato`):** conversão. **MANTER INTEGRAL.**
- **Footer:** contato, redes sociais, copyright. **MANTER INTEGRAL.**
- **Pilares (`#pilares`):** os 4 pilares oficiais + quote (a frase mais forte da marca, segundo hr-consultant). **MANTER INTEGRAL** (clamp opcional nas descrições).

---

## 4. Hierarquia de conteúdo mobile (o que o usuário vê primeiro)

1. Hero (marca + proposta + CTA) — **dobra**
2. Pilares (o que fazemos) — 4 cards
3. Abordagem (como fazemos) — 4 passos
4. Valores (quem somos)
5. Treinamentos (portfólio — secundário na conversão de consultoria)
6. Significado da marca (apoio institucional)
7. Parceiros (prova social — **atualmente placeholders**)
8. CTA final + Footer

> A ordem atual do DOM é: Hero → Significado → Pilares → Valores → Treinamentos → Abordagem → Parceiros → CTA → Footer. A hierarquia acima reflete o **peso de conversão**, não a ordem do DOM (que não será alterada).

---

## 5. Plano de corte por seção (ordenado por impacto)

> Economia estimada em 320 px (base 11.170 px). Estimativas por densidade de conteúdo; validar com medição após implementação.

### 5.1 `#treinamentos` — economia estimada: **450–800 px** (4–7% da página) ⭐ maior impacto

| Ação | Detalhe | Economia est. |
|---|---|---|
| **Truncar bios das facilitadoras** | `-webkit-line-clamp: 2` nas bios (mantém nome + cargo + 2 linhas) | 200–350 px |
| **Ocultar áreas de atuação** das facilitadoras | Bloco de áreas (lista de tags) oculto em ≤640 px | 150–250 px |
| **Compactar metodologia (4 passos)** | Reduzir paddings/gaps internos em ≤640 px (sem ocultar) | 50–100 px |
| **Compactar trilhas (6 cards)** | Reduzir padding vertical dos cards em ≤640 px | 50–100 px |

Veredito hr-consultant: manter estrutura (metodologia + trilhas são diferencial), truncar bios e ocultar áreas.

### 5.2 `#significado` — economia estimada: **250–350 px** (2–3%)

| Ação | Detalhe | Economia est. |
|---|---|---|
| **Ocultar `.meaning-mark`** | Elemento decorativo (marca d'água/ornamento) em ≤640 px | 80–120 px |
| **Ocultar blockquote** | Citação institucional (redundante com a tagline) em ≤640 px | 100–140 px |
| **Ocultar 2º parágrafo** | Parágrafo de apoio (redundante com o 1º) em ≤640 px | 60–90 px |
| **Clamp no 1º parágrafo** | `-webkit-line-clamp: 3` | 10–20 px |

Veredito hr-consultant: **MANTER COMPACTO** — manter eyebrow, H2, `.meaning-sub`, `.etym` e o 1º parágrafo (clamp 2–3 linhas).

### 5.3 `#parceiros` — economia estimada: **344–367 px** (3%)

| Ação | Detalhe | Economia est. |
|---|---|---|
| **Ocultar a seção inteira em ≤640 px** | Os slides eram placeholders ("Parceiro 1..6", logo `alt=""`) — sem valor até haver parceiros reais | 344–367 px |

Veredito hr-consultant: ocultar até substituir pelos parceiros reais (ação futura em `main.js`/HTML).

> **ATUALIZAÇÃO (19/08/2026):** o carrossel foi **substituído por uma linha de molduras** com os 3 parceiros reais (Atual Consultoria Empresarial Financeira, Marlon Lima Advocacia Especializada, Grola Corretora e Negócios Imobiliários). A seção voltou a aparecer no mobile em formato **compacto**: só as logos em linha única (`.partner-name` oculto, `flex-wrap: nowrap`, molduras `max-width: 96px`). No desktop, a descrição aparece em **tooltip no hover** sobre a logo. A lógica do carrossel foi removida de `main.js`; `js/partners-slider.js` ficou órfão (não carrega).

### 5.4 `#valores` — economia estimada: **100–200 px** (1–2%)

| Ação | Detalhe | Economia est. |
|---|---|---|
| **Clamp nas descrições** | `-webkit-line-clamp: 2` nos cards de valores em ≤640 px (mantém título + ícone) | 100–200 px |

> Veredito hr-consultant pendente de confirmação (relatório truncado) — aplicar apenas após validação.

### 5.5 `#pilares` — economia estimada: **100–200 px** (1–2%)

| Ação | Detalhe | Economia est. |
|---|---|---|
| **Clamp nas descrições** | `-webkit-line-clamp: 2` nos cards em ≤640 px (mantém título + ícone + quote) | 100–200 px |

Veredito hr-consultant: **MANTER INTEGRAL**; clamp opcional nas descrições.

### 5.6 Sem corte (manter integral)

- **Hero `#top`** (572 px) — já compactado; ocultar `.hero-logo` em ≤480 px (veredito hr-consultant).
- **Abordagem `#abordagem`** (1.015 px) — core da consultoria.
- **CTA `#contato`** (405 px) — conversão.

---

## 6. Resumo do impacto

| Ação | Economia est. (320 px) |
|---|---|
| Treinamentos (bios + áreas + compactação) | 450–800 px |
| Significado (mark + quote + 2º parágrafo) | 250–350 px |
| Parceiros (ocultar placeholders) | 344–367 px |
| Valores (clamp) | 100–200 px |
| Pilares (clamp) | 100–200 px |
| **Total** | **1.244–1.917 px (11–17% adicionais)** |

Após o plano, a página em 320 px cairia de **11.170 px para ~9.300–9.900 px** (~17–19 telas de rolagem). Combinado com a compactação v1.1 já aplicada, o total acumulado seria **~33–38% menor** que a versão original (14.699 px).

---

## 7. Regras de implementação (quando aprovado)

1. **Desktop intocável:** todas as mudanças restritas a media queries em `css/responsive.css` (blocos ≤640 px e ≤480 px). Nenhuma alteração em `index.html`, `tokens.css`, `base.css`, `layout.css` ou `components.css`.
2. **Tokens obrigatórios:** usar apenas variáveis de `css/tokens.css`; sem cores hardcoded; sem `!important`.
3. **Seções escuras:** manter `data-section-theme="dark"` (não remover atributos).
4. **Acessibilidade:** conteúdo oculto via CSS continua no DOM (leitor de tela lê tudo) — aceitável nesta fase; documentar se virar problema.
5. **Validação pós-implementação:** Playwright — `scrollWidth == clientWidth` em 320/375/390/412/480/640/768; altura total medida antes/depois; casos CT-R-024..030 do `03-casos-teste-responsividade.md`.
6. **Revisão:** `qa` + `mobile` (read-only) antes de declarar concluído.

---

## 8. Status

- [x] Compactação CSS v1.1 aplicada (blocos ≤640 px e ≤480 px) — **executado** (ver `responsive.css`)
- [x] Medições de seção coletadas (Playwright)
- [x] Vereditos hr-consultant por seção
- [x] **Aprovação do usuário para o plano de corte (seção 5)** — aprovado em 19/08/2026
- [x] Implementação do corte — **executado** em `css/responsive.css` (blocos ≤640 px linhas 176–207 e ≤480 px linha 217)
- [x] Validação final (qa + mobile) — **APROVADO**; altura @320: 11.170 → 9.082 px (**-18,7%**, acima da meta de 11–17%); sem scroll horizontal em 320/375/390/412/480/640/768/1280; desktop intacto