# Graph Report - Site  (2026-08-19)

## Corpus Check
- 138 files · ~1,498,287 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 178 nodes · 307 edges · 16 communities
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 28 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Seguranca e LGPD
- Arquitetura e ADRs
- Catalogo de Funcionalidades
- Testes e Qualidade
- Design e QA Refatoracao
- Auditorias QA e Mobile
- Modelo de Dados e Red Team
- CSS Base e Documentacao
- Responsividade e Mobile
- Fontes da Marca
- Infraestrutura e CI/CD
- Prioridades do Roadmap
- Requisitos e Rastreabilidade
- Rotas e Navegacao
- Melhorias Mobile
- JS e Fixes Mobile

## God Nodes (most connected - your core abstractions)
1. `Arquitetura — Eliora RH` - 29 edges
2. `Política de Segurança — Eliora RH (POL-SEC-001)` - 28 edges
3. `Catálogo de Funcionalidades F1–F21` - 23 edges
4. `F5 — Política de Privacidade + Termos de Uso [F1]` - 16 edges
5. `F2 — Formulário de contato com consentimento LGPD [F1]` - 15 edges
6. `LGPD (Lei nº 13.709/2018)` - 13 edges
7. `Relatório de Auditoria Visual (Design)` - 10 edges
8. `Especificação Funcional — Site Eliora RH (catálogo F1–F21)` - 10 edges
9. `F1 — Landing institucional [CORE]` - 10 edges
10. `F12 — Área administrativa [F2]` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Requisitos Funcionais e Não Funcionais (RF/RNF)` --semantically_similar_to--> `Catálogo de Funcionalidades F1–F21`  [INFERRED] [semantically similar]
  docs/01-funcionalidades/02-requisitos.md → docs/01-funcionalidades/01-especificacao-funcional.md
- `Âncoras da Landing` --conceptually_related_to--> `index.html`  [INFERRED]
  docs/02-arquitetura/02-rotas.md → docs/README.md
- `F2 — Formulário de contato com consentimento LGPD [F1]` --semantically_similar_to--> `Fluxo de dados do formulário de contato (POST /api/contato)`  [INFERRED] [semantically similar]
  docs/01-funcionalidades/01-especificacao-funcional.md → docs/02-arquitetura/01-arquitetura.md
- `F2 — Formulário de contato com consentimento LGPD [F1]` --semantically_similar_to--> `Requisitos de segurança do formulário de contato`  [INFERRED] [semantically similar]
  docs/01-funcionalidades/01-especificacao-funcional.md → docs/03-seguranca/01-politica-seguranca.md
- `F11 — Newsletter com double opt-in [F2]` --semantically_similar_to--> `Requisitos de segurança da newsletter (double opt-in)`  [INFERRED] [semantically similar]
  docs/01-funcionalidades/01-especificacao-funcional.md → docs/03-seguranca/01-politica-seguranca.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Conformidade LGPD nos três documentos** — docs_02_arquitetura_01_arquitetura_lgpd [INFERRED 0.75]
- **Formulário de contato — pipeline de consentimento e anti-spam** — docs_01_funcionalidades_01_especificacao_funcional_f2_formulario_contato, docs_02_arquitetura_01_arquitetura_fluxo_formulario_contato, docs_03_seguranca_01_politica_seguranca_formulario_contato [INFERRED 0.75]
- **Correspondência de fases CORE↔Fase 0 e Fases 1–3** — docs_01_funcionalidades_01_especificacao_funcional_fases_projeto, docs_02_arquitetura_01_arquitetura_fases, docs_02_arquitetura_01_arquitetura_fase_0 [EXTRACTED 1.00]

## Communities (16 total, 0 thin omitted)

### Community 0 - "Seguranca e LGPD"
Cohesion: 0.09
Nodes (34): LGPD (Lei nº 13.709/2018), Princípio — Menor superfície de ataque, Princípio — Dados minimizados (LGPD art. 6º, III), Princípio — Segurança por padrão (default-deny), Ativos e donos (AS-01 a AS-10), Registro de consentimento append-only (tabela consentimentos), Direitos do titular (LGPD arts. 18–19), Plano de disclosure de vulnerabilidades (security.txt) (+26 more)

### Community 1 - "Arquitetura e ADRs"
Cohesion: 0.12
Nodes (25): Fases do projeto (CORE, Fase 1, Fase 2, Fase 3), ADR-001 — Next.js App Router (React Server Components), ADR-002 — Supabase (PostgreSQL) com RLS obrigatório, ADR-003 — Server Components como padrão de renderização, ADR-004 — Deploy serverless + CDN (Netlify ou Vercel), ADR-005 — Anti-spam em múltiplas camadas, Arquitetura — Eliora RH, Cloudflare (DNS/WAF/CDN/Turnstile) (+17 more)

### Community 2 - "Catalogo de Funcionalidades"
Cohesion: 0.34
Nodes (22): Catálogo de Funcionalidades F1–F21, F10 — Analytics privacy-first com consentimento [F1], F11 — Newsletter com double opt-in [F2], F12 — Área administrativa [F2], F13 — Integração com CRM (RD Station/HubSpot) [F2], F14 — Agendamento de consulta (Calendly/agenda) [F2], F15 — Chatbot/WhatsApp automatizado [F3], F16 — Multi-idioma PT/EN/ES (i18n) [F3] (+14 more)

### Community 3 - "Testes e Qualidade"
Cohesion: 0.10
Nodes (22): Casos de Teste de Segurança, Escala de Severidade CVSS, Ferramentas de Teste de Segurança, OWASP Top 10 (2021) e ASVS, Ambiente de Staging staging.eliora.com.br, TEST-SEC-002, Checklist de Hardening, HARD-SEC-003 (+14 more)

### Community 4 - "Design e QA Refatoracao"
Cohesion: 0.24
Nodes (11): css/tokens.css, Relatório QA Refatoração, Resultado 54/54 PASS, Verificações da Refatoração, Relatório de Auditoria Visual (Design), Logos PNG em assets/img, Observações OBS-01 a OBS-04, Design Tokens Idênticos (+3 more)

### Community 5 - "Auditorias QA e Mobile"
Cohesion: 0.22
Nodes (10): APROVADO COM RESSALVAS, Relatório QA Final, Links de contato validados, Glow dourado completo e centralizado, Observações N1–N4, QA Final APROVADO, Relatório Mobile Final, AUD-MOB-FINAL-001 (+2 more)

### Community 6 - "Modelo de Dados e Red Team"
Cohesion: 0.28
Nodes (9): Modelo de Dados, RLS em Todas as Tabelas, RT-001 — baseline de resposta ao red team, Hash de Senhas Argon2/bcrypt, service_role (apenas server-side), Relatório Red Team, Achado: Supabase como 'caixa Postgres', AUD-RT-001 (+1 more)

### Community 7 - "CSS Base e Documentacao"
Cohesion: 0.32
Nodes (8): css/base.css, css/layout.css, css/responsive.css, DESIGN.md, P-TAP — Alvos de toque, P-NAV-768 corrigido, README da Documentação, Estrutura do Projeto

### Community 8 - "Responsividade e Mobile"
Cohesion: 0.33
Nodes (7): css/components.css, Casos de Teste de Responsividade, Breakpoints 320/375/768/1024/1440, Casos CT-R-XXX, Relatório de Auditoria Mobile, AUD-MOB-001, P-OVF — Overflow horizontal

### Community 9 - "Fontes da Marca"
Cohesion: 0.33
Nodes (6): Brand Book Eliora RH, Core Web Vitals (LCP, CLS, INP), Documento 02-requisitos.md, Especificação Funcional — Site Eliora RH (catálogo F1–F21), Portfólio de Treinamentos (2026), WCAG 2.1 Nível AA

### Community 10 - "Infraestrutura e CI/CD"
Cohesion: 0.40
Nodes (5): Infraestrutura, CI/CD GitHub Actions, Monitoramento Sentry/Plausible/Umami, Stack de Infraestrutura, Cloudflare Turnstile

### Community 11 - "Prioridades do Roadmap"
Cohesion: 0.40
Nodes (5): Prioridades do Roadmap, F21 priorizada na Fase 1, Método MoSCoW, RICE com bônus de risco, Matriz Valor × Esforço

### Community 12 - "Requisitos e Rastreabilidade"
Cohesion: 0.50
Nodes (4): Requisitos, Histórias de Usuário F1–F10 e F21, Matriz de Rastreabilidade CA-Fxx-nn / RN, Requisitos Funcionais e Não Funcionais (RF/RNF)

### Community 13 - "Rotas e Navegacao"
Cohesion: 0.50
Nodes (4): Rotas, Âncoras da Landing, POST /api/contato, Rotas de Páginas

### Community 14 - "Melhorias Mobile"
Cohesion: 0.67
Nodes (3): Melhorias Responsive/Mobile, Proposta de Compactação de Layout, Seção #treinamentos (46,8%)

### Community 15 - "JS e Fixes Mobile"
Cohesion: 0.67
Nodes (3): P-RESZ — Drawer preso no resize, P-RESZ corrigido, js/main.js

## Knowledge Gaps
- **52 isolated node(s):** `Observações OBS-01 a OBS-04`, `POST /api/contato`, `Logos PNG em assets/img`, `Rotas de Páginas`, `Design Tokens Idênticos` (+47 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Arquitetura — Eliora RH` connect `Arquitetura e ADRs` to `Seguranca e LGPD`, `Fontes da Marca`?**
  _High betweenness centrality (0.127) - this node is a cross-community bridge._
- **Why does `Política de Segurança — Eliora RH (POL-SEC-001)` connect `Seguranca e LGPD` to `Fontes da Marca`, `Arquitetura e ADRs`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `Casos de Teste de Responsividade` connect `Responsividade e Mobile` to `Testes e Qualidade`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `F2 — Formulário de contato com consentimento LGPD [F1]` (e.g. with `Fluxo de dados do formulário de contato (POST /api/contato)` and `Requisitos de segurança do formulário de contato`) actually correct?**
  _`F2 — Formulário de contato com consentimento LGPD [F1]` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Observações OBS-01 a OBS-04`, `POST /api/contato`, `Logos PNG em assets/img` to the rest of the system?**
  _52 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Seguranca e LGPD` be split into smaller, more focused modules?**
  _Cohesion score 0.0855614973262032 - nodes in this community are weakly interconnected._
- **Should `Arquitetura e ADRs` be split into smaller, more focused modules?**
  _Cohesion score 0.12333333333333334 - nodes in this community are weakly interconnected._