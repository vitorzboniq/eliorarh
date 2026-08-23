# 📚 Eliora RH — Documentação do Site

> **Índice central de toda a documentação técnica e de produto do site da Eliora RH** (consultoria de RH, Campo Mourão/PR).

> **🎨 Design System:** o arquivo [`DESIGN.md`](../DESIGN.md) (raiz do projeto) é a fonte de referência para qualquer alteração visual — tokens, tipografia, seções, componentes, responsividade e acessibilidade.

---

## 📖 Índice Rápido por Categoria

### 🎨 Design & Visual
- [`DESIGN.md`](../DESIGN.md) — Tokens, tipografia, seções, responsividade, acessibilidade
- `06-auditoria/03-relatorio-design.md` — Auditoria visual de identidade e contraste WCAG AA

### 🏗️ Arquitetura
- `02-arquitetura/01-arquitetura.md` — Visão geral da arquitetura e decisões técnicas
- `02-arquitetura/02-rotas.md` — Rotas da aplicação (atual e futura)
- `02-arquitetura/03-modelo-dados.md` — Modelo de dados (Supabase/PostgreSQL)
- `02-arquitetura/04-infraestrutura.md` — Plano de infraestrutura, deploy e CI/CD

### 🔒 Segurança
- `03-seguranca/01-politica-seguranca.md` — Política de segurança e modelagem de ameaças (STRIDE)
- `03-seguranca/02-casos-teste-seguranca.md` — Casos de teste de segurança (ST-001..085+)
- `03-seguranca/03-checklist-hardening.md` — Checklist de hardening (HC-001..092+)

### 🧪 Testes
- `04-testes/01-plano-de-testes.md` — Plano geral de testes
- `04-testes/02-casos-teste-funcionais.md` — Casos de teste funcionais (CT-F-001 a CT-F-038)
- `04-testes/03-casos-teste-responsividade.md` — Casos de teste de responsividade (CT-R-001 a CT-R-030)
- `04-testes/04-casos-teste-performance-acessibilidade.md` — Performance e acessibilidade

### 📋 Funcionalidades e Requisitos
- `01-funcionalidades/01-especificacao-funcional.md` — Especificação funcional do site (seções, funcionalidades F1–F21)
- `01-funcionalidades/02-requisitos.md` — Requisitos funcionais (RF-001..165) e não funcionais (RNF-001 a 063)

### 📈 Roadmap
- `05-roadmap/01-prioridades-roadmap.md` — Prioridades (P0–P3) e fases de evolução
- `05-roadmap/02-melhorias-aplicadas.md` — Melhorias já implementadas no projeto
- `05-roadmap/03-plano-futuro.md` — Próximos passos planejados

### 📊 Auditorias e Relatórios
- `06-auditoria/01-seguranca/` — Relatórios de segurança (pentest, QA security)
- `06-auditoria/02-design/` — Auditorias de design e identidade visual
- `06-auditoria/03-qa/` — Relatórios de qualidade e validação
- `06-auditoria/04-mobile/` — Auditorias e validações mobile
- `06-auditoria/screenshots/` — Evidências visuais (capturas e JSONs de medição)

### 📁 Fontes de Conteúdo Oficiais
- **PDFs da marca** (na raiz do projeto): `Eliora RH_Portfolio_Treinamentos.pdf`, `Eliora_RH - Brand Book.pdf`
- **Link tree oficial:** https://eliorarh.netlify.app/
- **Instagram:** https://instagram.com/eliora.rh
- **Contatos:** eliorarh@gmail.com · WhatsApp +55 44 98837-8110

### 📦 Stack Planejada (futura migração)
Next.js App Router + TypeScript + Tailwind + shadcn/ui · Supabase (PostgreSQL + RLS) · Resend · Cloudflare · Vercel/Netlify · Sentry · Plausible/Umami.

> O site atual é **estático** (HTML/CSS/JS puro) — a migração segue o roadmap em `05-roadmap/`.

---

## 1. Funcionalidades e Requisitos

| Documento | Conteúdo |
|---|---|
| `01-funcionalidades/01-especificacao-funcional.md` | Especificação funcional do site (seções, funcionalidades F1–F21) |
| `01-funcionalidades/02-requisitos.md` | Requisitos funcionais (RF-001..165) e não funcionais (RNF-001 a 063) |

---

## 2. Arquitetura

| Documento | Conteúdo |
|---|---|
| `02-arquitetura/01-arquitetura.md` | Visão geral da arquitetura e decisões técnicas |
| `02-arquitetura/02-rotas.md` | Rotas da aplicação (atual e futura) |
| `02-arquitetura/03-modelo-dados.md` | Modelo de dados (Supabase/PostgreSQL) |
| `02-arquitetura/04-infraestrutura.md` | Plano de infraestrutura, deploy e CI/CD |

---

## 3. Segurança

| Documento | Conteúdo |
|---|---|
| `03-seguranca/01-politica-seguranca.md` | Política de segurança e modelagem de ameaças (STRIDE) |
| `03-seguranca/02-casos-teste-seguranca.md` | Casos de teste de segurança (ST-001 a ST-085+) |
| `03-seguranca/03-checklist-hardening.md` | Checklist de hardening (HC-001 a HC-092+) |

---

## 4. Testes

| Documento | Conteúdo |
|---|---|
| `04-testes/01-plano-de-testes.md` | Plano geral de testes |
| `04-testes/02-casos-teste-funcionais.md` | Casos de teste funcionais (CT-F-001 a CT-F-038) |
| `04-testes/03-casos-teste-responsividade.md` | Casos de teste de responsividade (CT-R-001 a CT-R-030) |
| `04-testes/04-casos-teste-performance-acessibilidade.md` | Performance e acessibilidade |

---

## 5. Roadmap

| Documento | Conteúdo |
|---|---|
| `05-roadmap/01-prioridades-roadmap.md` | Prioridades (P0–P3) e fases de evolução |
| `05-roadmap/02-melhorias-aplicadas.md` | Melhorias já implementadas no projeto |
| `05-roadmap/03-plano-futuro.md` | Próximos passos planejados |

---

## 6. Auditorias e Relatórios

### Estrutura reorganizada de auditorias

A pasta `06-auditoria/` foi reorganizada por **tipo** de auditoria, facilitando a localização de relatórios específicos:

- `06-auditoria/01-seguranca/` — Relatórios de segurança e pentest
- `06-auditoria/02-design/` — Auditorias de identidade visual e design system
- `06-auditoria/03-qa/` — Relatórios de qualidade e validação
- `06-auditoria/04-mobile/` — Auditorias e validações mobile
- `06-auditoria/screenshots/` — Evidências visuais (capturas e JSONs de medição)

| Documento | Conteúdo |
|---|---|
| `06-auditoria/01-seguranca/01-relatorio-red-team.md` | Pentest autorizado (15 vetores, nota B) |
| `06-auditoria/01-seguranca/02-relatorio-qa-seguranca.md` | QA da segurança (checklist, hardening) |
| `06-auditoria/02-design/01-relatorio-design.md` | Auditoria de identidade visual/design |
| `06-auditoria/03-qa/01-plano-de-testes.md` | Plano geral de testes |
| `06-auditoria/03-qa/02-relatorio-qa-refatoracao.md` | QA da refatoração do site |
| `06-auditoria/03-qa/03-relatorio-qa-final.md` | QA final após conteúdo novo |
| `06-auditoria/04-mobile/01-relatorio-mobile.md` | Auditoria mobile da refatoração |
| `06-auditoria/04-mobile/02-relatorio-mobile-final.md` | Auditoria mobile final (v1.1 — APROVADO) |
| `06-auditoria/screenshots/` | Evidências visuais (screenshots e JSONs de medição) |

---

## 7. Fontes de Conteúdo Oficiais

- **PDFs da marca** (na raiz do projeto): `Eliora RH_Portfolio_Treinamentos.pdf`, `Eliora_RH - Brand Book.pdf`
- **Link tree oficial:** https://eliorarh.netlify.app/
- **Instagram:** https://instagram.com/eliora.rh
- **Contatos:** eliorarh@gmail.com · WhatsApp +55 44 98837-8110

---

## 8. Stack Planejada (futura migração)

Next.js App Router + TypeScript + Tailwind + shadcn/ui · Supabase (PostgreSQL + RLS) · Resend · Cloudflare · Vercel/Netlify · Sentry · Plausible/Umami.

> O site atual é **estático** (HTML/CSS/JS puro) — a migração segue o roadmap em `05-roadmap/`.

---

## Mudanças Realizadas

Esta reorganização tem como objetivo:

1. **Índices hierárquicos** — navegação rápida por categoria (antes: lista plana)
2. **Agrupamento por tipo** — documentos de segurança, design, QA e mobile estão em subpastas lógicas
3. **Remoção de `graphify-out/`** — saída de ferramenta removida da pasta de documentação
4. **Renames claros** — arquivos renomeados para refletir melhor seu conteúdo
5. **Cross-references** — links entre documentos relacionados (roadmap ↔ auditoria ↔ funcionalidades)

---

*Documentação mantida em sincronia com `DESIGN.md`, `css/tokens.css` e o HTML modular.*