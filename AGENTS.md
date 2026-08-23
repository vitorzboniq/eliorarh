# AGENTS.md — Contexto do Projeto Eliora RH

> Arquivo de contexto compartilhado, injetado em todos os agentes do opencode.
> Mantenha curto e factual. É a fonte de onboarding dos agentes.

## O que é

Landing page estática da **Eliora RH** — consultoria de RH em Campo Mourão/PR.
Brand: ameixa profunda (plum) + dourado (gold) + creme. Tom consultivo e humano:
"Pessoas no centro. Resultados que transformam."

## Stack e estrutura

- **Stack:** HTML + CSS + JS puro. Sem build, sem framework, sem git, sem package.json na raiz.
- `index.html` — página única. Ordem no DOM: hero (#top) → significado → pilares → valores → treinamentos → abordagem → parceiros → contato → footer. (Nav segue outra ordem: A marca, Pilares, Treinamentos, Abordagem, Valores.)
- `css/tokens.css` — design tokens (fonte única de verdade para cores/tipografia).
- `css/base.css` — reset, tipografia, elementos base.
- `css/layout.css` — header, nav, footer (padrão de footer documentado em comentário no topo do arquivo).
- `css/components.css` — seções e componentes.
- `css/responsive.css` — media queries (breakpoints: 980/900/768/640).
- `js/main.js` — header scroll + scrollspy, menu mobile, scroll reveal.
- `assets/images/` — logos PNG da marca. `assets/icons/` — ícones SVG/PNG.
- `DESIGN.md` — design system (tokens, componentes, acessibilidade). **Leia antes de mudanças visuais.** Alguns valores estão defasados (hex de `--plum`/`--plum-deep`, clamp do h1) — o código em `tokens.css`/`base.css` prevalece.
- `docs/` — documentação técnica e auditorias (relatórios antigos = registro histórico, não editar).
- `Eliora_RH Landing Page.html` — versão legada original (referência, não editar).
- PDFs na raiz (`Eliora_RH - Brand Book.pdf`, `Eliora RH_Portfolio_Treinamentos.pdf`) — fontes de conteúdo da marca.

## Convenções (obrigatórias)

- **Sempre** usar tokens de `css/tokens.css` (`--plum`, `--gold`, `--cream`, etc.). Nunca cores hardcoded.
- Cores reais dos tokens: `--plum:#471C3D`, `--plum-deep:#2E1228`, `--mauve:#7C4A6B`, `--gold:#D4A26A`, `--gold-light:#E8C79A`, `--cream:#F2E9E2`, `--cream-soft:#FAF5F0`, `--grey:#333333`, `--grey-mid:#4A4A4A`, `--white:#FFF`.
- Fontes: `--serif` (Playfair Display, títulos) + `--sans` (Montserrat, texto).
- Sem `!important` (use especificidade) — exceção existente: cores dos links do drawer mobile em `responsive.css` (≤768px).
- Hover social no footer = **cor sólida da marca** (não gradiente). Padrões: WhatsApp `#25D366`, LinkedIn `#0A66C2`, Instagram `#D6249F`, TikTok `#000`, Email `#EA4335`, Location `#4285F4`.
- Seções alternam fundo escuro (plum) e claro (white/cream-soft) para ritmo vertical.
- **Seções escuras exigem `data-section-theme="dark"`** no `<section>` (hero, pilares, abordagem, contato e footer já têm) — o scrollspy do header usa isso para trocar a cor do texto do nav. Sem o atributo, o header scrolled fica ilegível sobre fundo escuro.
- **Todos os CTAs** ("Fale conosco" no nav, "Agende uma conversa") apontam para a link tree `https://eliorarh.netlify.app/` em nova aba (`target="_blank" rel="noopener"`). Não há formulário no site.
- **Parceiros** (`#parceiros`): linha de molduras (`.partner-row`/`.partner-frame`) com logos reais — Atual Consultoria Empresarial Financeira, Marlon Lima Advocacia Especializada, Grola Corretora e Negócios Imobiliários (logos em `assets/icons/`). Descrição em tooltip no hover (`.partner-name`, overlay plum sobre a logo); no mobile (≤640px) só as logos em linha única. Para adicionar parceiro: duplicar `.partner-item` em `index.html` e colocar a logo em `assets/icons/`. `js/partners-slider.js` é código morto (carrossel removido, não carrega).
- Idioma das UI texts: **pt-BR**. Código/agentes: inglês.
- Não duplicar utilitários; reutilizar componentes existentes.

## Como rodar e testar

- **Servidor local:** `python -m http.server 8139 --bind 127.0.0.1` (na raiz do projeto). URL: `http://127.0.0.1:8139/index.html`.
- **Playwright (Python):** disponível em `C:\Users\Vitor\AppData\Local\Programs\Python\Python312\python.exe`.
- **Skill `webapp-testing`:** `.agents/skills/webapp-testing/SKILL.md` — use para testar/validar o site em navegador real. Atenção: o script `with_server.py` **falha no Windows** (IPv6) — inicie o servidor manualmente e use o driver direto.
- Servidor de produção (referência): https://eliorarh.netlify.app/

## Regras do time

- Time de agentes definido em `.opencode/agent/` (projeto) e espelhado em `~/.config/opencode/agent/` (global). Manter os dois escopos sincronizados ao editar qualquer agente.
- Agentes de review (`qa`, `senior-fullstack`, `hacker`, `hr-consultant`, `mobile`) são **read-only**: reportam com arquivo/linha/fix concreto, não editam.
- `responsive` implementa/corrige CSS responsivo (media queries, breakpoints 980/900/768/640, overflow); `mobile` apenas valida (read-only).
- Antes de "concluir", validar: HTML/CSS/JS sintaticamente corretos + carregam sem 404 no servidor local.

## Versionamento

Este é um site estático (HTML + CSS + JS puro), sem build, framework ou package.json. O versionamento segue um modelo simplificado:

### Versões atuais
- **1.1.0** (2026-08-23) — Reorganização de docs, remoção de graphify-out, reestruturação de auditoria, navegação alterada
- **1.0.0** (2026-08-22) — Versão inicial: site estático com todas as páginas (hero → significado → pilares → valores → treinamentos → abordagem → parceiros → contato → footer)

### Como registrar uma nova versão

1. **Commit com mensagem descritiva** — use prefixos úteis:
   - `feat:` nova funcionalidade ou página
   - `fix:` correção de bug ou problema de layout
   - `docs:` alterações de documentação (AGENTS.md, DESIGN.md, CHANGELOG.md)
   - `design:` mudanças no DESIGN.md (tokens, layout, componentes)
   - `refactor:` reestruturação de código sem mudar comportamento
   - `chore:` tarefas internas (atualização de .gitignore, .opencode, config)
   - `test:` adição ou ajuste de testes/validações

2. **Atualizar o CHANGELOG.md** — adicionar entrada na seção correspondente da versão mais recente no topo (`## [X.Y.Z] — YYYY-MM-DD`). Use as categorias: Documentação, Documentos Criados/Atualizados, Navegação, Design Tokens.

3. **Não há bump automático** — como não há package.json, o número de versão é definido manualmente com base em marcos significativos (lançamento de nova seção, redesign completo, reestruturação major de arquivos).

### Fluxo de versionamento

```
mudança no código/conteúdo → commit com mensagem → atualizar CHANGELOG.md → git push → tag opcional
```

### Notas

- O número de versão **não indica compatibilidade** (não há cliente que quebre com mudanças); ele apenas faz histórico.
- Quebras de design ou estrutura de seções podem pular de `1.0.0` para `1.1.0` ou `2.0.0` conforme o impacto.
- O CHANGELOG sempre deve ser atualizado antes do push final; ele serve como histórico público do que mudou no portfólio.







## Habilidades Free Models

### Última atualização
2026-08-23 08:51:12

### Top 3: Eficiência / Inteligência
1. Ox Alpha
2. NVIDIA: Nemotron 3 Ultra (free)
3. NVIDIA: Nemotron 3 Nano Omni (free)

### Top 3: Design
1. Dots Studio: Dots3-Note Preview (free)
2. Thinking Machines: Inkling Small (free)
3. Thinking Machines: Inkling (free)

### Top 3: Custo-Benefício / Uso Geral
1. NVIDIA: Nemotron 3.5 Lightning (free)
2. Poolside: Laguna S 2.1 (free)
3. Poolside: Laguna XS 2.1 (free)


---  
*Esta section foi automaticamente atualizada pela skill free-models-rank em 2026-08-23 08:51:12*
