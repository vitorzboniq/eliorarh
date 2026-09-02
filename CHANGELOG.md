# Changelog — Eliora RH Site

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