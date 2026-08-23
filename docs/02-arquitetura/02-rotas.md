# Rotas — Eliora RH

> **Status:** Aprovado (baseline)
> **Versão:** 1.0
> **Data:** 2026-08-12
> **Escopo:** Inventário canônico de rotas de páginas e endpoints de API, metadados SEO, tratamento de 404, redirects e arquivos de busca (sitemap/robots).

---

## 1. Rotas de páginas

### 1.1 Públicas (fase 1)

| Rota | Descrição | Público | Auth | Metadados SEO (title / description / canonical) |
|------|-----------|---------|------|-------------------------------------------------|
| `/` | Home com âncoras `#significado`, `#pilares`, `#treinamentos`, `#abordagem`, `#valores`, `#contato` | Público | Não | `Eliora RH — Consultoria em Recursos Humanos` / `Pessoas no centro. Resultados que transformam.` / `https://www.eliora.com.br/` |
| `/servicos` | Detalhamento dos pilares de atuação (Estratégia de Pessoas, Desenvolvimento Humano, Cultura Organizacional, Gestão de Pessoas) | Público | Não | `Serviços — Eliora RH` / descrição por pilar / `/servicos` |
| `/sobre` | Missão, valores e abordagem (Diagnóstico → Estratégia → Implementação → Acompanhamento) | Público | Não | `Sobre a Eliora RH` / missão e valores / `/sobre` |
| `/blog` | Listagem de posts (paginação), filtro por categoria | Público | Não | `Blog — Eliora RH` / lista de artigos / `/blog` |
| `/blog/[slug]` | Artigo individual; `generateStaticParams` + `notFound()` para slugs inexistentes | Público | Não | `<título do post> — Blog Eliora RH` / `<resumo do post>` / `https://www.eliora.com.br/blog/[slug]` |
| `/contato` | Formulário de contato (validação client + envio a `POST /api/contato`) | Público | Não | `Contato — Eliora RH` / `Fale com a nossa equipe` / `/contato` |
| `/obrigado` | Confirmação pós-envio (pageview de conversão; `noindex` para evitar indexação) | Público | Não | `Obrigado — Eliora RH` (title mínimo) / `noindex` |
| `/privacidade` | Política de privacidade e tratamento de dados (LGPD) | Público | Não | `Política de Privacidade — Eliora RH` / / `/privacidade` |
| `/termos` | Termos de uso do site e dos serviços | Público | Não | `Termos de Uso — Eliora RH` / / `/termos` |
| `/newsletter` | Confirmação de double opt-in (token via query param, consumido no servidor) | Público | Não | `Confirmação de Newsletter — Eliora RH` / `noindex` |
| `/404` | Página não encontrada (disparada por `notFound()`) | Público | Não | `Página não encontrada — Eliora RH` / `noindex` |

### 1.2 Restritas (futuras — fases 2 e 3)

| Rota | Descrição | Público | Auth | Metadados SEO |
|------|-----------|---------|------|---------------|
| `/admin/*` | Dashboard de mensagens recebidas e gestão de blog | Admin (Eliora) | Supabase Auth (magic link/OAuth); sessão httpOnly | `noindex` |
| `/admin/login` | Login administrativo | Admin | — (página de login) | `noindex` |
| `/cliente/*` | Portal restrito do cliente (fase 3) | Clientes contratados | Supabase Auth | `noindex` |

> **Regra geral:** toda rota restrita é `noindex` e nunca renderiza dados no SSR sem sessão válida (Server Component verifica sessão antes de qualquer fetch).

---

## 2. Endpoints de API (Next.js Route Handlers)

Convenções globais de resposta:

- Sucesso: `200/201` → `{ "ok": true, "data": { ... } }`
- Erro: `4xx/5xx` → `{ "ok": false, "error": { "code": "SLUG_DE_ERRO", "message": "mensagem amigável", "details": { } } }`
- **Nunca** retornar dados pessoais em respostas (e-mail, telefone, IP) — apenas identificadores internos.
- Headers de segurança em todas as respostas (CSP restritivo, HSTS, `Cache-Control: no-store` em APIs).

### 2.1 `POST /api/contato`

| Atributo | Valor |
|----------|-------|
| **Corpo esperado (JSON)** | `{ nome: string(2..120), email: string (email), empresa: string(2..120), cargo: string(0..120) (opcional), telefone: string(0..20) (opcional, formato BR), mensagem: string(10..2000), consentimento_lgpd: true, turnstile_token: string, website?: string (honeypot) }` |
| **Validação** | Schema estrito (zod) no servidor; rejeição `400` com `details.campos` listando campos inválidos |
| **Anti-spam** | Honeypot (campo `website` preenchido → `200` falso, sem persistência); rate limit por IP (ex.: 5 envios/hora) e por e-mail; Turnstile verificado server-side |
| **Sucesso** | `201 { "ok": true, "data": { "id": "<uuid>" } }` |
| **Erros** | `400 VALIDATION_FAILED` (schema), `400 TURNSTILE_FAILED` (token inválido), `429 RATE_LIMITED` (rate limit), `500 INTERNAL_ERROR` (fallback) |
| **Auth** | Nenhuma (público) — gravação via service role no servidor |
| **Efeitos** | `INSERT contato_mensagens`; dispara e-mail de notificação (Resend) |

### 2.2 `POST /api/newsletter`

| Atributo | Valor |
|----------|-------|
| **Corpo esperado (JSON)** | `{ email: string (email), consentimento_lgpd: true, turnstile_token: string, website?: string (honeypot) }` |
| **Validação** | e-mail normalizado (lowercase/trim); zod; consentimento obrigatório |
| **Anti-spam** | Honeypot + rate limit por IP + Turnstile |
| **Sucesso** | `202 { "ok": true, "data": { "status": "pendente_confirmacao" } }` — mesmo resultado se e-mail já existir (evita enumeração) |
| **Erros** | `400 VALIDATION_FAILED`, `400 TURNSTILE_FAILED`, `429 RATE_LIMITED`, `500 INTERNAL_ERROR` |
| **Auth** | Nenhuma (público) |
| **Efeitos** | `INSERT`/reativação com `status = pendente`, gera `token_confirmacao` (aleatório, hash guardado), envia e-mail com link de confirmação (double opt-in). O link de confirmação é servido pela rota `/newsletter?token=...` |

### 2.3 Futuros (planejados)

| Método | Rota | Auth | Observações |
|--------|------|------|-------------|
| `GET` | `/api/blog` | Nenhuma | Lista posts publicados (paginado, com resumo; **nunca** `conteudo` completo em listagens) |
| `GET` | `/api/blog/[slug]` | Nenhuma | Post publicado por slug; `404` se inexistente ou não publicado |
| `POST` / `PUT` / `DELETE` | `/api/blog/*` | Admin (fase 2) | CRUD de posts; verificação de sessão + role admin em todas as rotas |
| `POST` | `/api/auth/*` | — | Login/logout magic link, OAuth, refresh (Supabase Auth) |
| `GET` / `PUT` | `/api/admin/*` | Admin (fase 2) | Leitura de mensagens, mudança de status, gestão de newsletter |
| `POST` | `/api/webhook/crm` | Segredo compartilhado (env var) | Recebe/encaminha novos contatos ao CRM (`contatos_crm`); valida assinatura |

---

## 3. Tratamento de 404 e erros

- **Páginas:** `notFound()` em `/blog/[slug]` (slug inexistente) e em qualquer rota inexistente → renderiza `/app/not-found.tsx` com HTTP `404`.
- **API:** rotas não definidas respondem `404 { "ok": false, "error": { "code": "NOT_FOUND" } }`; métodos não suportados em rotas existentes respondem `405 METHOD_NOT_ALLOWED` com header `Allow`.
- **Erros inesperados:** capturados e reportados ao Sentry; resposta genérica `500 INTERNAL_ERROR` sem vazamento de stack trace ou detalhes internos.
- **Catch-all:** `app/[...not-found]/page.tsx` não é necessário no App Router; `not-found.tsx` cobre o comportamento global.

---

## 4. Redirects canônicos

Definidos em `next.config.ts` (`redirects`) e reforçados na Cloudflare:

| De | Para | Tipo |
|----|------|------|
| `http://` (qualquer host) | `https://` mesmo host | `308` permanente |
| `http(s)://eliora.com.br` | `http(s)://www.eliora.com.br` (idem) | `301` permanente (canônico **com www**) |
| `/contato/#` / fragmentos obsoletos | `/` + âncora canônica (`#significado`, `#pilares`, `#treinamentos`, `#abordagem`, `#valores`, `#contato`) | `301` |
| `/index.html`, `/home`, `/inicio` | `/` | `301` |
| `/blog/post-antigo` (slug renomeado) | `/blog/nome-novo` (mapa explícito) | `301` |

> O domínio canônico único é **`https://www.eliora.com.br`** — utilizado em canonical tags, sitemap e configuração do provedor. A troca de esquema (http→https) e de host (sem www→com www) é feita também na Cloudflare (SSL/TLS + Redirect Rules), de forma que o tráfego nem chega ao origin sem HTTPS.

---

## 5. Sitemap e robots.txt

### 5.1 `sitemap.xml` (gerado via `app/sitemap.ts`)

- **Incluídos:** todas as rotas públicas indexáveis: `/`, `/servicos`, `/sobre`, `/blog`, `/blog/[slug]` (apenas posts com `status = publicado`), `/contato`, `/privacidade`, `/termos`.
- **Excluídos (`noindex`):** `/obrigado`, `/newsletter`, `/404`, `/admin/*`, `/cliente/*`, e todos os endpoints `/api/*`.
- **Prioridade/última modificação:** `/` com maior prioridade; posts com `lastmod = publicado_em`.
- **Protocolo:** URLs absolutas com domínio canônico `https://www.eliora.com.br`.

### 5.2 `robots.txt` (via `app/robots.ts`)

```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /obrigado
Disallow: /newsletter
Disallow: /admin/
Disallow: /cliente/

Sitemap: https://www.eliora.com.br/sitemap.xml
```

---

## 6. Convenções técnicas (App Router)

| Item | Convenção |
|------|-----------|
| Estrutura | `app/(public)/*` para páginas públicas; `app/admin/*` e `app/cliente/*` para rotas restritas |
| Metadados | `export const metadata` com `title`, `description`, `canonical`, `robots`, `openGraph` |
| Server-first | Layouts e páginas como Server Components; interatividade mínima com `"use client"` |
| Formulários | Componente client + `fetch` a Route Handler; estados de erro/loading acessíveis |
| Sessão (fase 2) | Cookie httpOnly `sb-<ref>-auth-token`; verificação em Server Components/middleware; **nunca** em localStorage |
