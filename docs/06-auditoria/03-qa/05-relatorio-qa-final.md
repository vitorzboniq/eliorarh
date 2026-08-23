# Relatório de QA Final — Eliora RH Landing Page

- **Data:** 13/08/2026
- **Responsável:** QA Engineer (validação final no navegador)
- **Escopo:** `index.html` (HTML modular) + `css/` + `js/main.js` + `assets/`
- **Método:** Teste real em navegador Chromium headless (Playwright 1.62) via servidor HTTP estático (`python -m http.server`) servindo a raiz do projeto. Viewports testados: **1440×900 (desktop)**, **768×1024 (tablet)**, **375×812 (mobile)**.
- **Recursos monitorados:** console (erros/avisos), `requestfailed`, respostas HTTP ≥ 400 (404/500).

---

## VEREDITO: **APROVADO** ✅

Todas as validações obrigatórias passaram. Zero erros de console, zero 404 de recursos, seção Treinamentos íntegra, ícones SVG do footer carregando, links de contato corretos, e — o ponto visual mais recente — **o glow dourado do logo no hero e da marca na seção Significado está completo, centralizado e NÃO é cortado pela borda da seção em nenhum viewport**. As ressalvas listadas são apenas recomendações menores de polimento (nenhuma bloqueia o lançamento).

---

## Tabela de Validações

| # | Item | Resultado | Evidência |
|---|------|-----------|-----------|
| a | Zero erros de console e zero 404 de recursos (imagens, css, js, svg, pngs) | **PASS** | `console_errors = []`; `failed_requests = []`; `bad_responses = []` — nenhuma resposta ≥400 em recurso local ou externo (Google Fonts OK). |
| b | Nav "Fale conosco" abre link tree em nova aba (href, target, rel corretos) | **PASS** | `href="https://eliorarh.netlify.app/"`, `target="_blank"`, `rel="noopener"`; `expect_popup` confirmou popup navegando para `https://eliorarh.netlify.app/`. |
| c | Seção Treinamentos: grid 3/2/1 col; selo CARRO-CHEFE; âncora #treinamentos | **PASS** | `.trilhas` → 3 cols @1440, 2 cols @768, 1 col @375. Selo `.badge-carrochefe` visível ("CARRO-CHEFE") na trilha "Desenvolvimento de Liderança" (featured). Clique no link do menu → `location.hash = "#treinamentos"`, seção visível, `scrollY=2475`. Selo não cortado no mobile (bbox 197–324px, viewport 375). |
| d | Ícones SVG do footer carregam/visíveis; localização clicável | **PASS** | 4 SVGs (instagram, whatsapp, email, location) com `naturalWidth=150`, `visible=true`, `aria-label` e hrefs corretos. `.foot-location` → href Google Maps + ícone `location.svg` carregado. Logo footer `Eliora_RH_Logo.png` (naturalW=640, visível). |
| e | Links de contato corretos | **PASS** | `mailto:eliorarh@gmail.com`; `https://wa.me/5544988378110?text=Ol%C3%A1%2C%20Eliora%20RH!%20Vim%20pelo%20cart%C3%A3o%20e%20gostaria%20de%20conversar.` (texto pré-preenchido decodificado confirmado); `https://instagram.com/eliora.rh`; `https://www.google.com/maps/search/?api=1&query=Campo+Mour%C3%A3o%2C+PR`; `tel:+5544988378110`. |
| f | Glow do logo no hero + Significado (não cortado, logo maior) | **PASS** | **1440px:** glow `width=529.6px`, bbox 788.8→1318.4 (viewport 1440) → margem direita -121.6px e inferior -248.5px (negativo = sem corte). **375px:** glow bbox 4.0→371.0 (viewport 375) → sem corte. Keyframes `pulse` mantêm `translate(-50%,-50%)` em 0%/50%. Logo: `max-width:450px` desktop (render 448.8px) e `max-width:320px` mobile. Pixel-diff (glow ligado × desligado): 56.013 px alterados no hero 1440, bbox 911–1199 × 332–618, todo dentro da viewport → glow renderiza completo. `.meaning-mark .glow`: centralizado (transform `translate(-50%,-50%)` via matrix), z-index 1, sem corte em 1440 (117–651px) e 375 (0.9–374.1px); pixel-diff confirma render. Screenshots em `screenshots/` (ver seção abaixo). |
| g | Responsivo básico 375 / 768 / 1440 | **PASS** | 375: `scrollWidth=clientWidth=375` (sem scroll horizontal, inclusive após abrir o menu); burger abre (`navLinks.open=true`, menu visível) e fecha ao clicar em link. 768: `scrollWidth=768`. 1440: layout 2 colunas do hero OK. |
| h | Scroll reveal (`.reveal` → `.in`) nas novas seções | **PASS** | Scroll gradual até o fim: **37/37** elementos revelados no desktop e **37/37** no mobile. Contagens progressivas crescentes (0→37). Nenhum elemento `.reveal` permanece oculto ao final. |
| i | Meta description presente e ≤ 160 chars | **PASS** | Presente; **134 caracteres** (≤160). |

### Verificações estruturais adicionais (todas PASS)
- Ordem das seções no DOM: `top → significado → pilares → treinamentos → abordagem → valores → contato` (Treinamentos corretamente entre Pilares e Abordagem).
- Facilitadoras: **Michelly (Psicóloga)** e **Giovana (Pedagoga)** renderizam com papéis e áreas de atuação.
- Metodologia: 4 etapas (Briefing, Diagnóstico, Desenho sob medida, Aplicação e acompanhamento).
- Trilhas: 6 cards com nomes corretos.
- Formatos: 4 cards.
- Pilares atualizados: Estratégia de Pessoas, Treinamento e Desenvolvimento, Cultura Organizacional, Recrutamento e Seleção.
- Valores: cards **Missão** e **Visão** + subtítulo "RH estratégico para empresas que querem crescer."
- Footer: tagline "Olhar técnico, _Sensibilidade humana_" e logo oficial `Eliora_RH_Logo.png`.
- CTA "Vamos montar seu treinamento?" → `#contato` (clique navega, hash vira `#contato`).
- `lang="pt-BR"`; todas as 8 `<img>` com atributo `alt` (nenhuma sem).

---

## Problemas Encontrados

Nenhum problema **bloqueador** ou **maior**. Seguem observações menores (severidade *baixa*, não impedem o lançamento):

| ID | Severidade | Reprodução | Correção sugerida |
|----|------------|------------|-------------------|
| N1 | Baixa (design) | O glow `.hero-logo::before` tem o núcleo opaco do gradiente (transparente a 65% de um raio ~318px → ~207px) inteiramente atrás do logo (meia-largura 224px). Efeito percebido: brilho dourado visível principalmente pelas áreas transparentes do monograma e um leve halo vertical acima/abaixo — não forma um anel forte ao redor. Não é corte (geometria confirma elemento completo dentro da viewport). | Se a intenção for um halo mais evidente: aumentar `width/height` do `::before` (ex.: 140–150%), subir a opacidade e mover o stop do gradiente (ex.: `transparent 75%`). Opcional. |
| N2 | Baixa (a11y) | Botão burger (`#burger`) tem `aria-label` mas não alterna `aria-expanded`; o painel `#navLinks` não é referenciado por `aria-controls`. Leitores de tela não anunciam o estado aberto/fechado. | Adicionar `aria-expanded` (alternado no JS junto com a classe `open`) e `aria-controls="navLinks"` no botão. |
| N3 | Baixa | Nav CTA usa `rel="noopener"` (correto para `target="_blank"`). | Opcional: adicionar `noreferrer` para não vazar o referrer ao link tree. Sem impacto funcional. |
| N4 | Baixa (cosmética) | Logo hero no mobile renderiza em 311px (coluna 1fr de 375px menos padding de 32px) em vez dos 320px de `max-width`. | Comportamento esperado do CSS (`max-width` é limite, não tamanho fixo). Sem correção necessária. |

---

## Screenshots Salvos

Todos em `docs/06-auditoria/screenshots/`:

| Arquivo | Conteúdo |
|---------|----------|
| `qa-final-hero-1440.png` (637 KB) | Hero no desktop 1440 — glow dourado e logo 450px |
| `qa-final-hero-375.png` (238 KB) | Hero no mobile 375 — glow e logo 320px |
| `qa-final-significado-1440.png` (147 KB) | Seção Significado 1440 — glow do `.meaning-mark` |
| `qa-final-significado-375.png` (69 KB) | Seção Significado 375 — glow do `.meaning-mark` |
| `qa-final-treinamentos-1440.png` (85 KB) | Seção Treinamentos 1440 — trilhas 3 col + selo CARRO-CHEFE + CTA |
| `qa-final-treinamentos-768.png` (86 KB) | Treinamentos tablet 768 — trilhas 2 col |
| `qa-final-treinamentos-375.png` (41 KB) | Treinamentos mobile 375 — trilhas 1 col |
| `qa-final-footer-1440.png` (173 KB) | Footer 1440 — ícones SVG, localização, tagline |
| `qa-final-footer-375.png` (36 KB) | Footer mobile 375 |
| `qa-final-375-burger-open.png` (68 KB) | Menu mobile aberto (burger) em 375 |
| `qa-final-full-1440.png` (1,3 MB) | Página completa 1440 |

> Nota de método: a verificação do glow foi feita por **geometria computada** (bbox do pseudo-elemento `::before` e do `.glow` vs. limites da viewport) e por **análise de pixels** (diferença entre screenshots com e sem o glow, com animações congeladas) — os dois métodos confirmam renderização completa sem corte em 1440 e 375.

---

## Notas de Infraestrutura do Teste

- Python 3.12.10 + Playwright 1.62.0 (Chromium headless) usados via `C:\Users\Vitor\AppData\Local\Programs\Python\Python312\python.exe`.
- O helper `with_server.py` do skill `webapp-testing` apresentou problema local (`ERR_EMPTY_RESPONSE` ao conectar via `localhost`, que resolve IPv6 `::1` no Windows — o `http.server` responde em IPv4). Contornado servindo em `127.0.0.1` com gerenciamento manual do processo; **não é bug do site**.
- Processos de servidor de teste finalizados após a execução.