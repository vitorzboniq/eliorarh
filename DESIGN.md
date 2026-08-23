# 🎨 DESIGN — Eliora RH Landing Page

> Documento de design system do site da **Eliora RH** (consultoria de RH, Campo Mourão/PR).
> Este documento é a fonte de referência para qualquer alteração visual no site.
> Data: 15/08/2026 · Escopo: `index.html` + `css/*.css` + `js/main.js` + `assets/`

---

## 1. Visão Geral da Identidade

A Eliora RH é uma consultoria de RH cujo nome vem do hebraico *El* ("Deus") + *Or* ("luz") — **"Deus é minha luz"**. A identidade visual traduz isso em uma paleta **elegante e acolhedora**:

- **Ameixa profunda (plum)** → solidez, estratégia, profundidade
- **Dourado (gold)** → luz, conquista, valor
- **Creme (cream)** → acolhimento, humanidade, suavidade

O tom de voz é **consultivo e humano**: "Pessoas no centro. Resultados que transformam." O design une tipografia serifada clássica (Playfair Display) a uma sans-serif moderna e limpa (Montserrat), criando uma dicotomia *tradição + modernidade*.

### Principios de design
1. **Contraste por dupla-tons:** seções alternam entre fundo escuro (plum→plum-deep) e fundo claro (white/cream-soft), criando ritmo vertical.
2. **Serif para títulos, sans para texto:** hierarquia clara por família tipográfica.
3. **Dourado como cor de ação:** todos os CTAs, glyphs e acentos interativos usam gold.
4. **Sutileza e luxo discreto:** gradientes radiais suaves, glow dourado, sombras leves.
5. **Acessibilidade antes de estética:** todas as combinações de cor atendem WCAG AA.

---

## 2. Design Tokens

Fonte única de verdade: **`css/tokens.css`**. Nenhuma cor deve ser hardcoded fora dos tokens.

### 2.1 Cores

| Token | HEX | Uso |
|---|---|---|
| `--plum` | `#4B2242` | Cor primária — títulos, seções escuras, CTA |
| `--plum-deep` | `#331730` | Versão mais escura — hero, footer, gradientes, drawer |
| `--mauve` | `#7C4A6B` | Cor de apoio — eyebrows e subtítulos sobre fundo claro (AA) |
| `--gold` | `#D4A26A` | Cor de destaque/ação — CTAs, glyphs, acentos |
| `--gold-light` | `#E8C79A` | Variação clara do gold — hovers e destaques em seções escuras |
| `--cream` | `#F2E9E2` | Texto sobre fundos escuros (títulos e parágrafos) |
| `--cream-soft` | `#FAF5F0` | Fundo alternativo claro (ex.: seções de texto corrido) |
| `--grey` | `#333333` | Texto principal sobre fundo claro |
| `--grey-mid` | `#4A4A4A` | Texto corrido sobre fundos claros |
| `--white` | `#FFFFFF` | Fundo de seções e cards |

**Funções de cor por contexto:**
- **Fundo escuro (plum):** eyebrow/título dourado, texto cream
- **Fundo claro (white/cream-soft):** eyebrow mauve, título plum, texto grey/grey-mid
- **Cards sobre escuro:** fundo `rgba(255,255,255,0.05)`, borda `rgba(212,162,106,0.2)`, texto `rgba(242,233,226,0.68)`

### 2.2 Tipografia

| Token | Fonte | Peso carregados |
|---|---|---|
| `--serif` | `'Playfair Display', Georgia, serif` | 400, 500, 600, 700 + itálico 500 |
| `--sans` | `'Montserrat', -apple-system, sans-serif` | 300, 400, 500, 600, 700 |

Carregadas via Google Fonts (pré-conexão `fonts.googleapis.com` + `fonts.gstatic.com`).

### 2.3 Espaçamento e raios
- **Container:** `.wrap` com `max-width: 1180px` e `padding: 0 32px`
- **Footer container:** `max-width: 980px` (compactado)
- **Raios:** botões/cards `2px`; pills `30px`; glyphs/glyph circles `50%`
- **Padding padrão de seções:** `50px 0` (bloco Valores foi alinhado a isso em 15/08)
- **Gap padrão de grids:** `12px` (pilares) a `34px` (timeline)

---

## 3. Hierarquia Tipográfica

Escala definida em **um único lugar** (`css/base.css`) — 4 níveis:

| Nível | Elemento | Tamanho | Peso | Família |
|---|---|---|---|---|
| 1 | `h1` (hero) | `clamp(30px, 3.8vw, 50px)` | 600 | Playfair |
| 2 | `h2` (seções) | `clamp(24px, 2.9vw, 37px)` | 600 | Playfair |
| 3 | `h3` (sub-seções) | `clamp(17px, 1.7vw, 21px)` | 600 | Playfair |
| 4 | `.eyebrow` | `12px` / ls `3px` / uppercase | 600 | Montserrat |

**Corpo de texto:** Montserrat 13.5–16px, cor grey/grey-mid sobre claro, cream sobre escuro.

> Nota: o relatório de auditoria (03-relatorio-design.md) referencia valores `clamp(34, 4.4vw, 58px)` para h1 — a escala atual em `base.css` usa `clamp(30px, 3.8vw, 50px)`, que é o valor vigente no código.

---

## 4. Layout e Estrutura de Seções

Ordem no DOM (nav e rodapé refletem as âncoras):

```
Hero (#top) → Pilares (#pilares) → Valores (#valores) → Treinamentos (#treinamentos) → Abordagem (#abordagem) → Parceiros (#parceiros) → CTA (#contato) → Footer
```

### 4.1 Header / Navegação
- **Posição:** fixed, `z-index: 500`, `padding: 22px 0`, transparente no topo.
- **Estado scrolled** (após `scrollY > 40`): fundo `rgba(255,255,255,0.92)` + `backdrop-filter: blur(10px)`, `padding: 14px 0`, sombra suave.
- **Logo** `.brand-mini`: wordmark em imagem (`assets/images/eliora_palavra.png`, 34px desktop / 30px tablet / 26px mobile) + "CONSULTORIA EM RH" em Montserrat gold (formato eyebrow: 12px, ls 3px, uppercase). `position: relative; top: 4px` alinha a base dos glifos com a linha-base do texto (desktop/tablet).
- **Links da nav** `#navLinks`: 
  - Ordem: **Pilares → Valores → Treinamentos → Abordagem** (link "A marca" removido — logo no header representa a marca).
  - uppercase 13px, cream sobre escuro → grey quando scrolled; sublinhado gold animado no hover.
- **CTA "Fale conosco"** `.nav-cta`: gold bg, plum-deep text, abre link tree em nova aba.
- **Burger (mobile ≤768px):** drawer à direita `78%` plum-deep, transição `translateX`.

### 4.2 Hero (`#top`)
- Fundo: `linear-gradient(160deg, plum 0%, plum-deep 78%)` + radial dourado suave.
- Grid 2 colunas (`1.15fr 0.85fr`), logo à direita.
- H1 serif cream com `<em>` dourado na palavra-chave.
- Glow dourado animado (`@keyframes pulse`, 5s) atrás do logo.
- CTA ghost `btn-ghost` (borda cream translúcida, texto cream).

### 4.3 A marca / Significado (`#significado`)
- Fundo branco; grid `0.85fr 1.15fr` (logo + texto).
- Eyebrow **"A marca"** em mauve (regra `.meaning .eyebrow` — corrigida em 15/08 para vencer a regra genérica `.meaning p`).
- Texto com `.etym` ("Do hebraico El + Or...") com `<b>` em plum.
- Blockquote Playfair itálico 19px plum, borda esquerda gold 2px.

### 4.4 Pilares (`#pilares`)
- Fundo: `linear-gradient(180deg, plum-deep, plum)` + radial decorativo.
- Grid 4 colunas; cards `rgba(255,255,255,0.05)` com borda gold translúcida.
- Glyph circular com letra inicial (E/T/C/R) — hover preenche com gold e texto plum-deep.
- 4 pilares: Estratégia de Pessoas; Treinamento e Desenvolvimento; Cultura Organizacional; Recrutamento e Seleção.

### 4.5 Treinamentos / Portfólio (`#treinamentos`)
Seção em fundo branco com **faixas escuras de largura total** (`margin: 0 calc(50% - 50vw)`):

**Facilitadoras** — faixa plum-deep→plum:
- 2 cards: **Michelly** (Psicóloga) e **Giovana** (Pedagoga).
- Card com `badge`/papel dourado e tags de áreas (`rgba(212,162,106,0.35)`).
- **Hover nas tags (15/08):** papel (`.trainer-role:hover`) e tags de áreas (`.trainer-areas span:hover`) preenchem com `var(--gold)` e texto `var(--plum)` — mesmo padrão das pills de valores.

**Metodologia** — 4 etapas numeradas (01–04) em cards brancos com num dourado circular:
- Briefing → Diagnóstico → Desenho sob medida → Aplicação e acompanhamento.

**Trilhas** (`trilhas-band` faixa escura) — grid 3 colunas:
- 6 cards: Onboarding e Integração; Times de Alta Performance; **Desenvolvimento de Liderança (CARRO-CHEFE)**; Cultura e Engajamento; Inteligência Emocional; Comunicação e Feedback.
- Card `.featured` (carro-chefe): glow dourado permanente (`box-shadow` + borda gold), selo `badge-carrochefe` dourado.

**Formatos** — 4 cards brancos com `border-top: 2px solid gold` e checkmark circular dourado:
- In company (presencial/online); Programas pontuais/continuados; Acompanhamento pós-treinamento; Turmas de liderança/times completos.

### 4.6 Abordagem (`#abordagem`)
- Fundo: `linear-gradient(180deg, plum-deep, plum)`.
- Timeline 4 colunas com linha dourada horizontal (`::before`).
- 4 etapas: Diagnóstico → Estratégia → Implementação → Acompanhamento.
- Números Playfair em círculo dourado (gradiente gold-light→gold) com sombra.

### 4.7 Valores (`#valores`)
- Fundo branco, centralizado; padding `50px 0` (alinhado ao treinamento em 15/08).
- 2 cards `.mv-card`: **Missão** e **Visão** — `border-top: 3px solid gold`, sombra suave.
- Pills de valores (`border: 1px solid mauve`, texto plum, radius 30px) — hover vira plum com texto cream.

### 4.8 Parceiros (`#parceiros`)
- Fundo `cream-soft`; linha de molduras (`.partner-row`/`.partner-frame`) — **sem carrossel** (removido em 19/08).
- Moldura no padrão do bloco Metodologia (`.method-step`): fundo `rgba(232,199,154,0.35)`, borda `rgba(71,28,61,0.25)`, cantos retos, `gap: 24px`, hover com sombra + `translateY(-3px)` + borda escurecida.
- Logo preenche a moldura (sem padding, `object-fit: contain`, cantos recortados pela moldura).
- **Descrição em tooltip no hover** (`.partner-name`): overlay plum-deep `rgba(46,18,40,0.88)` sobre a logo, texto cream, `opacity` 0→1.
- **Mobile (≤640px):** só as logos em linha única (`flex-wrap: nowrap`, molduras `max-width: 96px`, descrição oculta).
- Parceiros atuais: Atual Consultoria Empresarial Financeira · Marlon Lima Advocacia Especializada · Grola Corretora e Negócios Imobiliários.

### 4.9 CTA (`#contato`)
- Fundo plum com radial dourado central (`700px`).
- H2 cream, parágrafo gold, botão `btn-primary` gold.
- Botão "Falar com a Eliora RH" → `https://eliorarh.netlify.app/` (link tree, nova aba) — alterado em 15/08 para igualar ao CTA do nav.

### 4.10 Footer
- Fundo plum-deep; grid 4 colunas (Logo / Navegação / Contato / Redes sociais).
- Container compactado a 980px; recuos de 60px nas extremidades.
- Títulos de coluna Montserrat 10px uppercase gold.
- **Redes sociais:** 6 ícones SVG circulares com borda gold e **hover com a cor sólida da marca de cada rede** (Instagram rosa, WhatsApp verde, LinkedIn azul, TikTok preto, E-mail vermelho, Localização azul) + `box-shadow` na cor da rede — alterado em 15/08 (antes usava gradientes, que não preenchiam todo o círculo em certos renders).
- Título **"Redes sociais"** com `width: 114px` alinhado à esquerda com a grade de ícones (3×34px + 2×6px gap) — ajustado em 15/08.
- **Tagline:** "Olhar técnico, *Sensibilidade humana*" em Playfair itálico gold-light com linha dourada glow (`.foot-tagline::before`).
- Rodapé: "© 2026 Eliora RH — Consultoria em RH. Todos os direitos reservados."

---

## 5. Componentes Reutilizáveis

| Componente | Classe | Características |
|---|---|---|
| Eyebrow | `.eyebrow` / `.eyebrow.on-dark` | mauve sobre claro; gold sobre escuro |
| Botão primário | `.btn-primary` | gold bg, plum-deep text, radius 2px, uppercase |
| Botão ghost | `.btn-ghost` | borda cream, hover gold |
| Glyph circular | `.pillar-glyph` / `.trilha-glyph` | 42–46px, borda gold, hover preenchido |
| Número circular | `.step .num` / `.method-step .num` | Playfair, gradiente dourado |
| Card | `.pillar-card` / `.trilha-card` / `.trainer-card` / `.mv-card` / `.formato-item` | padrão de borda/hover |
| Pills | `.value-pills span` | radius 30px |
| Moldura de parceiro | `.partner-frame` | padrão `.method-step` (fundo dourado suave, borda sutil, cantos retos); tooltip `.partner-name` no hover |
| Tag de papel/área (facilitadoras) | `.trainer-role` / `.trainer-areas span` | borda gold; hover preenchido gold/plum |
| Divider | `.divider` | linha + dot dourado com glow |
| Scroll reveal | `.reveal` / `.reveal.in` | fade + translateY 26px, 0.8s |

**Padrões de hover (cards escuros):** fundo `rgba(212,162,106,0.08)`, borda `rgba(212,162,106,0.45)`, `translateY(-3px)`.
**Padrões de hover (cards claros):** `box-shadow` + `translateY(-3px)`.

---

## 6. Interações e Animações

Implementadas em `js/main.js` (com `defer`):

| Interação | Mecanismo |
|---|---|
| Header scrolled | `scroll` listener → toggle `.scrolled` (scrollY > 40) |
| Menu mobile | burger → toggle `.open` no `#navLinks`; fecha ao clicar em link |
| Menu no desktop | `matchMedia(min-width: 769px)` fecha o drawer |
| Scroll reveal | `IntersectionObserver` (threshold 0.15) → `.reveal.in` |

**Animações CSS:**
- `@keyframes glow` — hero `::before` (8s, escala suave)
- `@keyframes pulse` — glow do logo hero (5s, opacidade + escala)
- `@keyframes drop` — scroll-cue (legado, definido no HTML original)
- `prefers-reduced-motion: reduce` → desativa todas animações/transições

---

## 7. Responsividade

Breakpoints em `css/responsive.css`:

| Breakpoint | Alterações principais |
|---|---|
| **≤980px** | Hero 1 coluna (logo acima); significado empilhado; pilares 2 col; timeline 2 col; trainers 1 col; grids de treinamento 2 col; footer 2 col |
| **≤900px & ≥769px** | Nav compactada (gap 22px, fontes 12px) |
| **≤768px** | Drawer de menu (78% largura, plum-deep); burger visível |
| **≤640px** | Pilares 1 col; timeline 1 col; grids treinamento 1 col; footer 1 col (recuos zerados, social à esquerda) |

**Regras de footer responsivo** (documentadas em bloco no layout.css): recuos de 60px preservados até 980px; zerados em ≤640px; título e ícones sociais sempre juntos.

---

## 8. Acessibilidade e Contraste

Todos os pares de cor atendem **WCAG AA** (verificados na auditoria 03-relatorio-design.md):

| Par | Contraste |
|---|---|
| gold `#D4A26A` sobre plum | 5.71:1 ✅ |
| cream `#F2E9E2` sobre plum | 10.91:1 ✅ |
| grey `#333333` sobre cream-soft | 11.66:1 ✅ |
| mauve sobre cream-soft (eyebrow) | 6.36:1 ✅ |
| plum sobre white (h3 cards) | 13.07:1 ✅ |
| plum-deep sobre gold (texto botões) | 7.03:1 ✅ |

Outras práticas: `lang="pt-BR"`, `alt` em todas as 8 imagens, `aria-label` nos ícones sociais, foco acessível do burger (pendência N2: adicionar `aria-expanded`/`aria-controls`).

---

## 9. Assets de Marca

| Arquivo | Tamanho natural | Uso |
|---|---|---|
| `assets/images/logo-hero.png` | 900×600 | Logo do hero (máx 300–450px) |
| `assets/images/logo-meaning.png` | 900×629 | Logo da seção "A marca" (máx 300px) |
| `assets/images/logo-footer.png` | 900×621 | Logo do footer (145px) |
| `assets/images/Eliora_RH_Logo*.png` | vários | Logos oficiais da marca |
| `assets/icons/*.svg` | — | Ícones sociais (email, instagram, whatsapp, location, chevron) |
| `assets/icons/*.png` | — | Ícones dos pilares (estratégia, treinamento, cultura, recrutamento) |

> Os logos são PNG com fundo transparente nas cores da marca (plum + dourado + cream).

---

## 10. Boas Práticas para Alterações Futuras

1. **Sempre use os tokens** de `css/tokens.css` — nunca cores hardcoded.
2. **Modifique apenas o arquivo certo:** tokens→`tokens.css`; componentes/seções→`components.css`; header/footer→`layout.css`; breakpoints→`responsive.css`; tipografia base→`base.css`.
3. **Respeite a specificidade:** para sobrescrever regras genéricas (ex.: `.meaning p`), crie regras mais específicas (ex.: `.meaning .eyebrow`) em vez de `!important`.
4. **Mantenha a escala tipográfica** em um único lugar (`base.css`).
5. **Não quebre os padrões de hover** dos cards — eles são consistentes por contexto (escuro vs claro).
6. **Contraste:** ao mudar cores, revalide WCAG AA (texto ≥4.5:1).
7. **Eyebrows:** sobre fundo claro = mauve; sobre fundo escuro = gold.
8. **Padrão de CTA:** todos os CTAs principais devem usar `btn-primary` (gold).
9. **Ícones sociais do footer:** usar **cor sólida da marca** no hover (não gradientes) — gradientes em elemento circular com `transition` podem não preencher todo o círculo em certos renders.

---

## 11. Referências

- Auditoria de identidade visual: `docs/06-auditoria/03-relatorio-design.md`
- QA final: `docs/06-auditoria/05-relatorio-qa-final.md`
- Especificação funcional: `docs/01-funcionalidades/01-especificacao-funcional.md`
- Brand Book (PDF, raiz): `Eliora_RH - Brand Book.pdf`
- Portfólio de Treinamentos (PDF, raiz): `Eliora RH_Portfolio_Treinamentos.pdf`

---

*Fim do documento. Mantido em sincronia com `css/tokens.css` e o HTML modular.*