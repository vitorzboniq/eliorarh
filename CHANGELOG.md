# Changelog — Eliora RH Site

## [1.3.1] — 2026-09-09

### Documentação
- Removida seção auto-gerada e desatualizada "Habilidades Free Models" (gerada em 2026-08-23) do `AGENTS.md`; ranking agora é gerado como artefato local `FREE_MODELS.html` (fora do git)

---

## [1.3.0] — 2026-09-08

### Conteúdo
- Facilitadoras vira "Quem faz a Eliora acontecer": eyebrow, título "Duas histórias. Um propósito.", subtítulo em frase única e quote de fechamento no padrão Pilares (com aspas) em `index.html`
- Cards com nomes em maiúsculas (MICHELLY/GIOVANA) e tags "Psicóloga | Cofundadora" / "Pedagoga | Cofundadora"
- Bios e áreas de atuação ocultas via comentário (não descomentar até segunda ordem)

### Responsivo (mobile ≤640px)
- Nome + tag da profissão na mesma fileira (grid `auto 1fr auto`); tag compacta (10px) e quebra em 2 linhas ao lado do nome em ≤360px

---

## [1.2.0] — 2026-09-08

### Conteúdo
- Metodologia vira Método ELIORA®: título + intro novos e 6 passos (Explorar → Ligar → Interagir → Operacionalizar → Refletir → Agir) com glyphs-letras E/L/I/O/R/A em `index.html`
- LinkedIn do rodapé aponta para `https://www.linkedin.com/company/eliorarh`

### Design
- Grade da Metodologia em 3x2 no desktop (`.method-grid`), 2 colunas ≤980px e 1 coluna no mobile
- Centralização ótica dos números nos glyphs (`.step .num`, `.method-step .num`): `line-height: 1` + `translateY(-1px)`
- `DESIGN.md`: seção Metodologia atualizada para os 6 passos ELIORA®

### Responsivo (mobile ≤640px)
- Tags de Valores (`.value-pills`) reexibidas: grade 2 colunas uniforme + última full-width, compactas (11.5px) e fixas no visual do hover (fundo plum, texto gold)
- Facilitadoras: nome + tag da profissão (Psicóloga/Pedagoga) na mesma linha (grid `auto 1fr auto`)

---

## [1.1.2] — 2026-09-07

### Design
- Glyphs circulares padronizados no padrão Missão (fundo `plum`, letra serif 26px 900 `gold`, borda gold 1.5px, hover sem borda roxa): Pilares (`.pillar-glyph`), Abordagem (`.step .num`) e Facilitadoras (`.trainer-avatar`) em `css/components.css`
- Alinhamento de texto dos cards reajustado ao novo tamanho 44px (`padding-left` 58px/56px/60px)
- Mobile (≤640px): glyphs compactados a 28px/18px com `border-width` 1.5px em `css/responsive.css`
- `DESIGN.md`: tabela de glyphs/números atualizada ao novo padrão

---

## [1.1.1] — 2026-09-01

### Design
- Footer mobile (≤640px) reestruturado em 3 colunas (Contato | Logo | Redes sociais) com copyright centralizado; navegação oculta no mobile (decisão do usuário)
- Contato compacto em linha única (nowrap, 10px) com a última linha alinhada à base dos ícones sociais; ícones mantidos em 30px

### Correções
- Footer e seções escuras (abordagem, CTA) voltaram a ocupar 100% da largura da viewport
- Causa raiz: comentário HTML em `index.html` (trecho "Trilhas" oculto) engolia as tags de fechamento da seção de treinamentos, aninhando as seções seguintes dentro do `.wrap` (max-width 1180px)
- Removido workaround `margin: 0 calc(50% - 50vw)` (full-bleed) de `.process`, `.cta` e `footer` — desnecessário após a correção estrutural
- Removido bloco morto de CSS do footer mobile em `css/responsive.css` (layout antigo de 3 colunas)
- Footer volta a usar `width: 100%` + `box-sizing: border-box`

---

## [1.1.0] — 2026-08-23

### Documentação
- Reorganização completa da pasta `docs/` com índices hierárquicos no `README.md`
- Remoção de `graphify-out/` (saída de ferramenta, não documento oficial)
- Reestruturação de `06-auditoria/` em 5 subpastas por tipo (seguranca, design, qa, mobile, screenshots)
- Renomeação de arquivos em `05-roadmap/` para maior clareza (melhorias-aplicadas, decisoes-auditoria-mobile)

### Documentos Criados/Atualizados
- `docs/README.md` — Índice central com categorias: Design, Arquitetura, Segurança, Testes, Funcionalidades, Roadmap, Auditorias
- `docs/06-auditoria/01-seguranca/01-relatorio-red-team.md` — Relatório red team reorganizado
- `docs/06-auditoria/02-design/03-relatorio-design.md` — Audiência visual de identidade
- `docs/06-auditoria/03-qa/02-relatorio-qa-refatoracao.md` — QA da refatoração
- `docs/06-auditoria/03-qa/05-relatorio-qa-final.md` — QA final após conteúdo novo
- `docs/06-auditoria/04-mobile/04-relatorio-mobile.md` — Audiência mobile refatoração
- `docs/06-auditoria/04-mobile/06-relatorio-mobile-final.md` — Audiência mobile final (v1.1 — APROVADO)
- `docs/05-roadmap/02-melhorias-aplicadas.md` — Melhorias já implementadas
- `docs/05-roadmap/03-decisoes-auditoria-mobile.md` — Decisões tomadas no projeto

### Navegação (index.html)
- Removido link "A marca" do nav (logo em header já representa brand)
- Reordenado para: Pilares → Valores → Treinamentos → Abordagem
- Mantido CTA "Fale conosco" Linktree: https://eliorarh.netlify.app/

### Design Tokens (DESIGN.md)
- Atualizada seção 4.1 (nav) e seção 9 (DOM order) para refletir nova navegação
- Tokens CSS `--plum`, `--gold`, `--cream` permanecem como fonte de verdade

---

## [1.0.0] — 2026-08-22

### Inicial
- Site estático HTML + CSS + JS puro (sem build, framework ou git)
- Estrutura de páginas: hero → significado → pilares → valores → treinamentos → abordagem → parceiros → contato → footer
- Design system: cores plum (#471C3D), gold (#D4A26A), creme (#F2E9E2)
- Fontes: Playfair Display (títulos) + Montserrat (texto)
- Tokens em `css/tokens.css`, `css/base.css`, `css/layout.css`, `css/components.css`, `css/responsive.css`
- Responsividade em `css/responsive.css` (breakpoints: 980/900/768/640)
- JS em `js/main.js` (header scroll, scrollspy, menu mobile, scroll reveal)
- Footer padrão com redes sociais e links
- CTAs apontam para Linktree: https://eliorarh.netlify.app/