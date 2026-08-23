# Política de Segurança — Eliora RH

| Campo | Valor |
|---|---|
| **Documento** | POL-SEC-001 |
| **Versão** | 1.1 |
| **Status** | Aprovado para implementação |
| **Classificação** | Restrito |
| **Data** | 2026-08-13 |
| **Responsável** | Equipe de Segurança / DPO (Encarregado de Dados) |
| **Escopo** | Site institucional Eliora RH (Next.js, Supabase, Vercel/Netlify, Cloudflare) |

> Este documento define os princípios, o modelo de ameaças, os controles por camada e os
> requisitos de segurança do site institucional **Eliora RH**. Aplicável a todo o ciclo de
> vida: desenvolvimento, build, deploy, operação e descontinuação de funcionalidades.
> A Eliora RH é uma consultoria de RH brasileira e está sujeita à **LGPD (Lei nº 13.709/2018)**,
> pois coleta dados pessoais (nome, e-mail, empresa, cargo, telefone) por meio de formulários
> de contato e newsletter. As bases legais e os pontos de adequação estão detalhados na
> especificação funcional (`01-funcionalidades/01-especificacao-funcional.md`, §1.3–1.4 e §2);
> a implementação técnica (hash de IP, RLS, minimização) está em `02-arquitetura/01-arquitetura.md`.

---

## 1. Princípios de segurança

Todo desenvolvimento, revisão e operação deve seguir os princípios abaixo, em ordem de prioridade:

| # | Princípio | Diretriz prática no contexto do site |
|---|---|---|
| P-01 | **Defense in Depth** | Nunca confiar em uma única camada. Validação no cliente **e** no servidor; WAF na rede **e** sanitização na aplicação; RLS no banco **e** autorização no código. |
| P-02 | **Least Privilege** | Cada função/usuário/serviço tem apenas as permissões mínimas. Service roles do Supabase nunca usadas no client. Tokens com escopo restrito. |
| P-03 | **Fail Secure (fail closed)** | Em caso de erro ou exceção, negar acesso por padrão. Nunca cair em modo "aberto" quando uma validação falha ou um controle está indisponível. |
| P-04 | **Mínima Superfície de Ataque** | Expor apenas o mínimo necessário: nenhuma rota admin sem autenticação, nenhum endpoint de API não usado, nenhum campo de dados além do necessário. Desabilitar o que não é usado. |
| P-05 | **Server-Side Validation sempre** | Validação no cliente é UX, não segurança. Todo input é revalidado, sanitizado e tratado no servidor (Route Handlers / Edge Functions / Banco). |
| P-06 | **Default Deny** | Tudo é negado por padrão; permitido apenas o que é explicitamente necessário (CORS, políticas de armazenamento, regras de RLS, permissões de função). |
| P-07 | **Privacy by Design / by Default** | Minimização de dados, pseudonimização e proteções embutidas no design, conforme art. 46 da LGPD. |
| P-08 | **Segurança do Elo mais Fraco** | O atacante ataca a cadeia toda: pessoas, cadeia de suprimentos, dependências, credenciais. Todos os elos têm o mesmo nível de rigor. |
| P-09 | **Registrabilidade (Accountability)** | Tudo o que é relevante para segurança é registrado em log, com retenção definida, sem PII desnecessária, e monitorado. |
| P-10 | **Atualização Contínua** | Dependências, imagens e configurações são atualizadas e auditadas de forma contínua (ver A06 — Vulnerable Components). |

---

## 2. Modelo de ameaças — STRIDE

### 2.1 Ativos (Assets) e donos

| ID | Ativo | Descrição | Nível de sensibilidade | Dono |
|---|---|---|---|---|
| AS-01 | Dados pessoais dos titulares | Nome, e-mail, empresa, cargo, telefone coletados via formulário/newsletter | **Restrito** | DPO |
| AS-02 | Formulário de contato | Pipeline de submissões (interface, backend, banco) | **Confidencial** | Time de Produto |
| AS-03 | Newsletter | Lista de contatos opt-in e registro de consentimento | **Confidencial** | Time de Marketing / DPO |
| AS-04 | Área administrativa (futuro) | Login, sessões, CRUD de submissões/conteúdo | **Restrito** | Time de Engenharia |
| AS-05 | Blog / conteúdo público | Conteúdo editorial, comentários (se houver) | **Público** | Time de Marketing |
| AS-06 | Banco de dados Supabase | PostgreSQL com tabelas de submissões, consentimentos, conteúdo | **Restrito** | Time de Engenharia |
| AS-07 | Infraestrutura | DNS, CDN/WAF Cloudflare, Vercel/Netlify, Resend, provedores | **Restrito** | Time de Engenharia / DevOps |
| AS-08 | Secrets e credenciais | API keys (Supabase, Resend), variáveis de ambiente, certificados | **Restrito** | Time de Engenharia / DevOps |
| AS-09 | Código-fonte | Repositório, CI/CD, workflows | **Interno** | Time de Engenharia |
| AS-10 | Cookies e sessões | Sessões de usuário, preferências, consentimento | **Confidencial** | Time de Engenharia / DPO |

### 2.2 Níveis de sensibilidade

| Nível | Definição | Exemplos | Tratamento mínimo exigido |
|---|---|---|---|
| **Público** | Sem impacto se divulgado | Blog, páginas institucionais | Integrity (impedir defacement) |
| **Interno** | Divulgação causa dano moderado | Código-fonte, roadmap | Controle de acesso a repo, CI |
| **Confidencial** | Divulgação viola LGPD / causa dano a titulares | Dados de contato, consentimentos, sessões | Criptografia em trânsito e repouso, RLS, mínimo acesso |
| **Restrito** | Divulgação causa dano severo, expõe PII em massa ou credenciais | Banco, secrets, admin | Acesso nominal, MFA, segregação de funções, monitoramento |

### 2.3 Perfis de atacante

| ID | Perfil | Motivação | Alvos típicos | Capacidade |
|---|---|---|---|---|
| AT-01 | Curioso / script kiddie | Reputação, "porque existe" | Formulários, headers, painéis expostos | Baixa |
| AT-02 | Bot / spammer | Uso do site para spam, scraping de PII | Formulário, newsletter | Média (automação em volume) |
| AT-03 | Atacante oportunista | Lucro rápido (ransom, venda de PII) | Banco, secrets, backups | Média |
| AT-04 | Atacante direcionado | Dados de candidatos/empresas clientes | PII, admin, phishing via site | Alta |
| AT-05 | Insider / fornecedor | Acidente ou má-fé | Acesso a admin, banco, logs | Alta (acesso legítimo) |
| AT-06 | Atacante de cadeia de suprimentos | Comprometer dependências/build | package.json, CI/CD, plugins | Alta |

### 2.4 Matriz STRIDE aplicada ao site

Lenda: **A = Alto risco**, **M = Médio**, **B = Baixo**.

| Ameaça (STRIDE) | AS-01 PII | AS-02 Formulário | AS-03 Newsletter | AS-04 Admin (futuro) | AS-05 Blog | AS-06 Banco | AS-07 Infra | AS-08 Secrets |
|---|---|---|---|---|---|---|---|---|
| **S**poofing (falsificação de identidade) | A | M | A | A | B | M | M | A |
| **T**ampering (adulteração de dados) | A | A | M | A | M | A | M | A |
| **R**epudiation (negação de autoria) | M | M | M | A | M | M | B | M |
| **I**nformation Disclosure (vazamento) | A | M | A | A | B | A | M | A |
| **D**enial of Service | M | A | M | M | M | M | A | B |
| **E**levation of Privilege | M | M | M | A | B | A | M | A |

**Análise de prioridade:** os três maiores focos são (1) vazamento de PII (Information Disclosure),
(2) adulteração/integridade de dados de formulário e (3) elevação de privilégio quando o admin existir.
O restante desta política e o checklist de hardening (doc 03) são desenhados para atacar exatamente esses riscos.

### 2.5 Estratégia de mitigação por ameaça

| Ameaça | Controles primários |
|---|---|
| Spoofing | AuthN forte (admin futuro: MFA, sessão server-side), TLS mTLS não aplicável; validação de origem (CSRF tokens); **OAuth/magic link com allowlist estrita de `redirect_uri`/`redirect_to` (sem wildcards) e PKCE obrigatório** (RT-004); verificação de e-mail no Resend (suppression/blocklist). |
| Tampering | Validação server-side, `check`/`constraints` no Postgres, RLS `WITH CHECK`, **whitelist de campos no insert (anti mass assignment — RT-003)**, assinatura/integridade de conteúdo do blog (CMS + static). |
| Repudiation | Logs estruturados de eventos relevantes com usuário/IP, timestamps e retenção; trilha de auditoria no admin; **registro de consentimento append-only** (quem, quando, versão da política). |
| Information Disclosure | RLS obrigatório **com grants default-deny** (REVOKE ALL; RT-001), criptografia em trânsito (TLS 1.3) e em repouso (Supabase), mínima exposição de campos, **`Cache-Control: no-store` em respostas com PII** (RT-006), **redação de PII em logs de terceiros** (RT-012), headers de segurança, CSP, `access` restrito nas buckets. |
| Denial of Service | Cloudflare WAF + rate limiting, limites de payload no formulário, honeypot **com telemetria**, **rate limit global/diário + circuit breaker de notificações (cost/billing abuse — RT-010/RT-015)**, quotas do Resend/Supabase com alerta a 80%, proteção de endpoints públicos; **Supabase REST/Auth tratado como superfície pública direta** (grants/RLS). |
| Elevation of Privilege | Least privilege, service role nunca no client, RLS por linha **com escopo `FOR` explícito (sem `FOR ALL` — RT-002)**, validação de papel/sessão no servidor, segregação admin. |

### 2.6 Superfícies diretas e processadores de dados (resposta ao red team)

O modelo de ameaças **não trata o Supabase como caixa interna**: a `anon key` é exposta no bundle e o PostgREST (`/rest/v1/`) e o Auth (`/auth/v1/`) são **endpoints públicos alcançáveis sem passar pelo Cloudflare/WAF/rate limit da aplicação** (RT-001, RT-005). Por isso:

- Toda tabela do banco começa com **grants default-deny** (`REVOKE ALL`) para `anon`/`authenticated`, concedendo apenas o mínimo necessário (RT-001/HC-093).
- Nenhuma política RLS com escopo `FOR ALL` em tabelas sensíveis; `usuarios_admin` restrita a `FOR SELECT`/`FOR UPDATE` (RT-002/HC-094).
- O fluxo de auth admin (fase 2) exige signup público desabilitado, allowlist de `redirect_uri`/`redirect_to`, PKCE e CAPTCHA/Turnstile no próprio Supabase Auth (RT-004/RT-005/HC-096/HC-103).

**Processadores que recebem PII — devem constar no registro de tratamento e nas DPAs (RT-012):**

| Processador | PII que recebe | Mitigação |
|---|---|---|
| Vercel/Netlify | IP real do visitante (access logs) | Acesso nominal; retenção 30–90 dias; DPA; a promessa "IP apenas como hash" vale para a aplicação, não para a infra |
| Cloudflare | IP real, User-Agent, URLs | Idem; revisão de quem acessa logs |
| Sentry | URLs/breadcrumbs (podem conter query strings com token), dados de contexto | **Scrubbing** de `token`/`email`/query strings; breadcrumbs sem PII; DPA |
| Resend | E-mails enviados (conteúdo das notificações/opt-in) | Payloads com o mínimo; `from`/`reply-to` fixos; sem eco de HTML do formulário |
| Supabase (Logflare) | Query logs com e-mails/pesquisas | Acesso restrito; revisão periódica |

O **modelo de ameaças deve ser reavaliado a cada fase** (2 — auth/admin, 3 — portal/CRM), conforme recomendação do red team.

---

## 3. Controles por camada

### 3.1 Rede / Edge — Cloudflare + CDN

| Controle | Descrição | Verificação |
|---|---|---|
| TLS 1.2+ obrigatório (1.3 preferido) | Cifragem de todo o tráfego em trânsito | `testssl.sh`, Qualys SSL Labs |
| HSTS com `preload` | Forçar HTTPS | curl de headers |
| WAF gerenciado (OWASP Core Rule Set) | Bloquear injeção, XSS, LFI/RFI na borda | Dashboard Cloudflare |
| Rate limiting na borda | Limitar requisições por IP por minuto em rotas sensíveis | Dashboard Cloudflare |
| Proteção DDoS | Mitigação em camada 3/4/7 | Dashboard Cloudflare |
| Proxy ativo (não DNS-only) | Ocultar IP de origem, aplicar regras de segurança | DNS Cloudflare (laranja) |
| Página de challenge para bots | `managed challenge` ou turnstile em formulários | Teste manual com headless |

### 3.2 Aplicação — Next.js (App Router) + Route Handlers

| Controle | Descrição |
|---|---|
| Validação server-side de 100% dos inputs (zod ou equivalente) | Nenhum dado confiável sem validação no servidor |
| **Whitelist de campos no insert (anti mass assignment)** | Zod `.strict()` + `.pick()` dos campos permitidos; objeto de INSERT **montado no servidor** — `status`/`criado_em`/`id` nunca vêm do client (RT-003); reforço no banco com trigger que normaliza `status`/`criado_em` |
| **Sanitização de exportações (CSV/Formula injection)** | Células iniciadas com `= + - @` (e tab/CR) neutralizadas; nome de arquivo fixo gerado no servidor (`export-lgpd-<uuid>.csv`); download com URL assinada e expiração curta (RT-008) |
| **`Cache-Control: no-store` em respostas com PII/autenticadas** | Rotas autenticadas e APIs com dados pessoais nunca cacheadas no CDN; cache key = Host + path; `Vary: Cookie`/`Authorization` onde aplicável (RT-006) |
| **Sanitização de Markdown (blog)** | Renderização sem `rehype-raw` (ou com `rehype-sanitize` + allowlist); scheme allowlist em URLs (`http/https/mailto`) (RT-013) |
| **Token de confirmação fora de query string** | Confirmação por POST body ou fragmento `#token`; `Referrer-Policy: no-referrer` em páginas sensíveis (RT-009/RT-012) |
| Sanitização de saída (React escapa por padrão; evitar `dangerouslySetInnerHTML`) | Previne XSS |
| Headers de segurança via `next.config.js` ou middleware | CSP, XFO, Referrer-Policy, Permissions-Policy, X-Content-Type-Options |
| CSRF protection (tokens ou SameSite+Origin check) | Em qualquer mutação (formulário, admin) |
| Timeouts, limites de payload e retry/backoff | Em chamadas a serviços externos (Resend, Supabase) |
| Nunca usar `supabase.service_role` no client | Só em servidor (e mesmo assim com escopo mínimo) |
| Logging estruturado sem PII | JSON para observabilidade |

### 3.3 Dados — Supabase (PostgreSQL)

| Controle | Descrição |
|---|---|
| **RLS habilitado em todas as tabelas** | Políticas de `SELECT`/`INSERT`/`UPDATE`/`DELETE` por papel e por linha, **com escopo `FOR` explícito** (sem `FOR ALL` em tabelas sensíveis — RT-002); **nenhuma tabela sem RLS** |
| **Grants default-deny (REVOKE ALL)** | `anon`/`authenticated` sem grants em schema/tabelas/sequências/funções com PII; grants mínimos explícitos (RT-001); verificação trimestral (HC-093) |
| **Role Postgres próprio (médio prazo)** | Substituir o `service_role` onipresente por role de aplicação com grants mínimos por tabela, reduzindo o impacto de vazamento de chave única (RT-001) |
| **Registro de consentimento append-only** | Tabela `consentimentos` imutável (sem UPDATE/DELETE) com `versao_politica`, `finalidade`, `base_legal`, `form_origin`, `ip_hash`, `email_hash` (ST-077/078, HC-104) |
| Criptografia em repouso | Default no Supabase (AES-256); dados de PII reforçados com colunas criptografadas se necessário |
| Backup e point-in-time recovery | Habilitados e testados (RPO/RTO documentados) |
| Secrets de acesso | `anon key` e `service_role key`; `service_role` somente server-side |
| Buckets de storage fechadas | Nenhuma bucket pública sem necessidade; políticas de acesso explícitas |
| Mínimo privilégio nos roles do banco | `anon`, `authenticated`, `service_role` sem grants desnecessários |
| Logs de auditoria | Query logs do Supabase contêm e-mails/PII — acesso **restrito e nominal**; exportação auditada (RT-012) |

### 3.4 Dependências e cadeia de suprimentos

| Controle | Descrição |
|---|---|
| `package-lock.json` versionado | Reprodutibilidade de build |
| `npm audit` / `pnpm audit` no CI | Bloqueio de build em CVEs críticas |
| Atualização contínua (Renovate/Dependabot) | PRs automáticas de atualização |
| Pin de versões | Sem `^`/`~` em produção quando crítico (ou lockfile como fonte de verdade) |
| Revisão de scripts de postinstall | Prevenção de supply-chain attack |
| 2FA em contas de publicação (npm) | Proteção contra comprometimento de pacotes |
| **Redação de PII em logs de terceiros** | Sentry com **scrubbing** de `token`/`email`/query strings e breadcrumbs sem PII; IP real de Vercel/Cloudflare documentado como processador nas DPAs; acesso a logs com PII nominal e auditado (RT-012, HC-097) |
| **Escopos mínimos em integrações** | Resend com `from`/`reply-to` fixos e payload mínimo (sem eco de HTML do formulário); Supabase com grants mínimos (RT-001/RT-010) |

### 3.5 Build / Deploy — Vercel / Netlify + CI

| Controle | Descrição |
|---|---|
| Secrets em variáveis de ambiente do provedor | Nunca no repositório |
| Deploy protegido (branch protection) | Nenhum merge sem revisão |
| Build reproduzível | Lockfile + versão de runtime fixada |
| Previews efêmeros | Previews de PR com dados de staging, nunca de produção |
| Sem dados de produção em ambientes de preview | Isolamento de dados |

---

## 4. Requisitos de segurança por funcionalidade

### 4.1 Formulário de contato

| Requisito | Detalhe |
|---|---|
| Validar todos os campos server-side | nome, e-mail (formato e domínio), empresa, cargo, telefone (máscara e formato BR), mensagem |
| **Whitelist de campos (anti mass assignment)** | Apenas os campos do formulário são persistidos; `status`/`criado_em`/`id` definidos pelo **servidor**; zod `.strict()` + `.pick()` (RT-003) |
| Limitar comprimento e payload | ex.: máx. 2 KB por campo, timeout em chamadas externas |
| Rate limiting por IP e por e-mail | ex.: máx. 5 submissões/hora/IP |
| **Rate limit global diário + circuit breaker** | Limite diário de submissões/notificações **independente de IP**; alerta a 80% da quota do Resend (RT-010/RT-015) |
| Anti-bot | Honeypot + Cloudflare Turnstile (ou equivalente), nunca depender só de CAPTCHA; honeypot com telemetria (RT-015) |
| Proteção CSRF | Token/Origin check nas rotas de submissão |
| Consentimento LGPD explícito | Checkbox opt-in obrigatório + **registro na tabela `consentimentos`** (versão da política, finalidade, `ip_hash`, origem) (ST-077) |
| Sem armazenar além do necessário | Telefone/cargo apenas se estritamente necessário ao atendimento |
| Notificação | Resend configurado com suppression de bounces/spam; **`from`/`reply-to` fixos e corpo em texto puro** — sem eco de HTML do formulário (RT-010) |
| Injeção de e-mail | Sanitizar cabeçalhos (`\r`, `\n`, `Content-Type:`), usar API do Resend (não `mail()`/SMTP raw) |

### 4.2 Newsletter

| Requisito | Detalhe |
|---|---|
| **Opt-in duplo (double opt-in)** | Confirmação por e-mail antes de incluir na lista |
| **Token de confirmação seguro** | CSPRNG de 32 bytes, expiração de 48h, **invalidação após uso**; entregue por POST body ou fragmento `#token` — **nunca em query string** (RT-009/RT-012) |
| Registro de consentimento | Gravar em `consentimentos` (`versao_politica`, `finalidade`, `form_origin`, `ip_hash`, `email_hash`) no opt-in (ST-077) |
| Unsubscribe funcional | Link em todo e-mail + página de descadastro (válido para a LGPD) |
| Sem scraping | Rate limiting por IP; não expor endpoints que listem assinantes |
| Base legal registrada | Legítimo interesse documentado ou consentimento; decisão de base legal documentada pelo DPO |
| Isolamento de dados | Lista de newsletter separada de dados de clientes |

### 4.3 Área administrativa (futuro)

| Requisito | Detalhe |
|---|---|
| Autenticação com senha forte + **MFA** | MFA obrigatório para acesso |
| **OAuth/magic link (fase 2)** | Allowlist de `redirect_uri`/`redirect_to` **sem wildcards**; PKCE obrigatório; signup público **desabilitado**; CAPTCHA/Turnstile no fluxo de auth; sem exposição direta de `/auth/v1` ao browser (RT-004/RT-005) |
| **RLS de `usuarios_admin`** | Apenas `FOR SELECT`/`FOR UPDATE` (própria linha); sem INSERT — promoção só via função administrativa `promover_admin()` (RT-002) |
| Sessão server-side com cookies `HttpOnly; Secure; SameSite=Lax/Strict` | Sem tokens em `localStorage` |
| Rate limiting e lockout no login | Backoff exponencial; bloqueio após tentativas |
| RBAC com least privilege | Papéis distintos (viewer, editor, admin); sem papel "superuser" compartilhado |
| CSRF tokens em todas as mutações | Incluindo operações de leitura que alteram estado |
| Trilha de auditoria | Log de login, logout, mutações, exportações |
| Reautenticação para ações sensíveis | Ex.: exportar PII, deletar dados |
| Sessão expira | Timeout de inatividade (ex.: 15 min) |

### 4.4 Blog

| Requisito | Detalhe |
|---|---|
| Conteúdo renderizado com escape padrão do React | Sem `dangerouslySetInnerHTML` com dados não confiáveis |
| **Sanitização de Markdown** | Renderização sem `rehype-raw` (ou com `rehype-sanitize` + allowlist estrita); URLs com scheme allowlist (`http/https/mailto`) (RT-013) |
| Comentários (se houver) | Validação, sanitização, rate limit, moderação; nunca renderizar HTML bruto |
| Cache seguro | Respostas públicas com `Cache-Control` correto; **nada de PII em páginas cacheadas; `no-store` em respostas autenticadas** (RT-006) |
| Anti-defacement | Deploy com integridade de conteúdo; WAF protege o caminho CMS |

### 4.5 Cookies e consentimento

| Requisito | Detalhe |
|---|---|
| Banner de consentimento (opt-in) | Antes de qualquer cookie não estritamente necessário |
| Classificação de cookies | Estritamente necessários (isento) x estatísticos/marketing (consentimento) |
| Cookies seguros | `HttpOnly`, `Secure`, `SameSite`, `__Host-`/`__Secure-` prefix quando aplicável |
| Sem fingerprinting | Evitar cookies/técnicas de rastreamento além do necessário |
| Registro do consentimento | Armazenar a escolha com timestamp e versão da política |
| Gerenciável | O usuário pode alterar/revogar a qualquer momento |

---

## 5. Diretrizes de armazenamento de dados pessoais (LGPD)

### 5.1 Princípios aplicáveis (art. 6º da LGPD)

| Princípio | Implementação no site |
|---|---|
| Finalidade | Dados coletados apenas para responder ao contato / envio de newsletter |
| Adequação e necessidade | Coletar **apenas** os campos mínimos; revisar se cargo/telefone são mesmo necessários |
| Minimização (art. 6º, III) | Não coletar dados além do necessário; não duplicar armazenamento |
| Segurança (art. 6º, VII e 46) | Criptografia em trânsito e repouso; controles de acesso; RLS |
| Prevenção | Monitoramento e resposta a incidentes |
| Transparência | Política de privacidade publicada e acessível (link no rodapé e nos formulários) |
| Qualidade | Mecanismos de atualização/descadastro para manter dados corretos |
| Responsabilização (accountability) | Evidência de conformidade (registros de tratamento, DPA) |

### 5.2 Minimização de dados

- Coletar somente: **nome, e-mail, empresa, cargo, telefone** (formulário) e **e-mail** (newsletter).
- Campos opcionais claramente marcados; nunca exigir CPF, RG ou dados sensíveis (art. 5º, II).
- Não armazenar PII em logs, URLs, analytics, headers custom ou mensagens de erro.

### 5.3 Pseudonimização e hash

- Onde a identificação direta não é necessária (ex.: logs, analytics), **pseudonimizar** ou **hashar** (SHA-256 com salt específico por campo/contexto — nunca hash puro e sem salt de dados de baixa entropia como e-mail/telefone).
- Hash de e-mail/telefone sem salt é quebrável por dicionário: usar **HMAC com chave** ou hash + salt por registro.
- O ID do titular no banco (UUID) é usado como identificador interno; PII identificável fica separada quando possível (segregação de tabelas).

### 5.4 Criptografia

| Camada | Requisito |
|---|---|
| Em trânsito | TLS 1.2+ (ideal 1.3) em toda a cadeia; HSTS com preload |
| Em repouso | Criptografia nativa do Supabase/PostgreSQL (AES-256) **obrigatória**; campos de maior sensibilidade (se existirem) com criptografia adicional no app (envelope encryption) |
| Chaves | Gerenciadas por KMS/vault; nunca em código, logs ou client-side; rotação documentada |
| Backups | Backup de dados também criptografado |

### 5.5 Retenção (LGPD art. 16)

| Dado | Período sugerido | Após o prazo |
|---|---|---|
| Submissões de contato | 90 dias a 12 meses (até conclusão do atendimento) | Exclusão automática (job) ou anonimização |
| Newsletter | Até o descadastro (consentimento retirável a qualquer momento) | Exclusão imediata |
| Logs de consentimento | Prazo legal de prescrição (ex.: 5 anos) | Exclusão |
| Logs técnicos | 30–90 dias | Rotação/exclusão |
| Backups | Conforme política de backup (retomar RPO/RTO) | Purga ao fim da vida útil |

- Implementar **retenção automática** (cron/job no Supabase) e documentar o prazo na política de privacidade.
- O prazo de retenção **nunca** deve ser "indeterminado".

### 5.6 Direitos do titular (LGPD arts. 18–19)

| Direito | Implementação |
|---|---|
| Confirmação e acesso | Endpoint/página para o titular solicitar seus dados |
| Correção | Fluxo de correção de dados incorretos |
| Anonimização/eliminação | Função de exclusão lógica → exclusão física em até 15 dias (prazo legal) |
| Portabilidade | Exportação em formato aberto (JSON/CSV) |
| Revogação de consentimento | Unsubscribe funcional + canal dedicado (e-mail do DPO) |
| Informação sobre compartilhamento | Lista de operadores no registro de tratamento |
| Não submissão a decisões automatizadas | Não aplicável hoje; documentar se surgir |

- Implementar um **canal de requisição de titular** (formulário dedicado ou e-mail `privacidade@eliora.com.br`) e responder em até **15 dias** (art. 19, §2º).
- Registrar **toda** requisição de titular com metadados (data, canal, resposta, prazo).

---

## 6. Resposta a incidentes

### 6.1 Fases

| Fase | Ações | Responsável |
|---|---|---|
| **0. Preparação** | Playbooks, contatos atualizados, acesso a dashboards, treinamento, simulações | Time de Segurança |
| **1. Detecção e triagem** | Detectar (monitoramento/alertas/denúncia), confirmar, classificar severidade, acionar time | Suporte técnico |
| **2. Contenção** | Bloquear ataque (WAF/cloud), revogar credenciais, isolar serviço, parar vazamento | Engenharia/DevOps |
| **3. Erradicação** | Remover causa raiz (malware, payload, backdoor), corrigir vulnerabilidade, rotacionar secrets | Engenharia |
| **4. Recuperação** | Restaurar de backup íntegro, validar integridade, voltar ao ar com monitoramento reforçado | Engenharia/DevOps |
| **5. Pós-incidente** | Análise de causa raiz (RCA), lições aprendidas, atualizar playbook e controles, comunicação final | Segurança/DPO |

### 6.2 Classificação de severidade e tempos-alvo

| Severidade | Definição | Tempo para conter | Tempo para comunicar |
|---|---|---|---|
| **Crítica** | Vazamento em massa de PII, comprometimento do admin, RCE, exfiltração | ≤ 2h | ANPD e titulares: **prazo razoável, idealmente ≤ 48h** (art. 48 LGPD) |
| **Alta** | Vazamento de dados de acesso, SQLi explorável, XSS armazenado | ≤ 8h | Titulares afetados ≤ 72h |
| **Média** | Vazamento de dados não pessoais, defacement, misconfiguration | ≤ 24h | Partes internas ≤ 72h |
| **Baixa** | Informação de baixo impacto, violação de política interna | ≤ 72h | Interno |

### 6.3 Comunicação obrigatória (LGPD art. 48)

- Comunicar à **ANPD** e aos **titulares afetados** incidente que possa acarretar risco ou dano relevante, contendo:
  1. Descrição da natureza dos dados pessoais afetados;
  2. Informações sobre os titulares envolvidos;
  3. Indicação das medidas técnicas e de segurança utilizadas para a proteção dos dados;
  4. Riscos relacionados ao incidente;
  5. Motivos da demora (se aplicável);
  6. Medidas adotadas para reverter/mitigar os efeitos do dano.

### 6.4 Contatos

| Função | Contato |
|---|---|
| Encarregado de dados (DPO) | `privacidade@eliora.com.br` (a criar) |
| Time de engenharia (plantão) | `engenharia@eliora.com.br` (a criar) |
| Supabase | Portal de suporte + `security@supabase.com` |
| Cloudflare | Portal + `abuse@cloudflare.com` |
| Vercel / Netlify | Portal de suporte |
| Resend | Portal de suporte + canal de abuse |
| ANPD | Canal de comunicação oficial (www.gov.br/anpd) |

### 6.5 Caso específico — exposição de PII via cache/CDN ou logs de terceiros (RT-006/RT-012)

Se um incidente envolver dados pessoais servidos por **cache/CDN** (web cache deception/poisoning) ou vazados via **logs de terceiros** (Sentry/Vercel/Cloudflare/Supabase):

1. **Contenção:** purgar a URL/objeto no CDN (Cloudflare purge), invalidar a cache, bloquear a rota no WAF e revogar tokens expostos (ex.: token de confirmação que trafegou em query string).
2. **Erradicação:** corrigir headers `Cache-Control`/cache key; aplicar/ajustar scrubbing no Sentry; restringir acesso aos logs das plataformas.
3. **Comunicação:** avaliar impacto sob a LGPD (art. 48) — se PII de titulares foi exposta, comunicar **ANPD e titulares em ≤ 48h**; notificar os processadores (Cloudflare/Sentry/Vercel) e solicitar retenção de evidências.
4. **Pós-incidente:** revisar DPAs e o registro de tratamento quanto a IP/tokens em processadores; atualizar playbook e controles.

---

## 7. Plano de disclosure de vulnerabilidades

### 7.1 Política pública

- Página pública (ex.: `/security.txt`) com contato **`security@eliora.com.br`** e link para esta política.
- `security.txt` publicado em `/.well-known/security.txt` (RFC 9116).

### 7.2 Escopo

| Em escopo | Fora de escopo |
|---|---|
| Site www.eliora.com.br (Next.js) | Vulnerabilidades de terceiros já públicas |
| APIs públicas (Route Handlers) | Phishing/social engineering contra funcionários |
| Configuração de headers/TLS | Denial of Service massivo sem prova |
| Formulários e newsletter | Vulnerabilidades em dependências sem impacto explorável no site |

### 7.3 Fluxo

| Etapa | Prazo |
|---|---|
| Recebimento do relato (ack) | ≤ 2 dias úteis |
| Triagem e validação | ≤ 5 dias úteis |
| Correção (conforme severidade) | Crítica: ≤ 72h; Alta: ≤ 7 dias; Média: ≤ 30 dias; Baixa: ≤ 90 dias |
| Comunicação ao pesquisador | A cada atualização de status |

### 7.4 Safe Harbor

- Pesquisas feitas de boa-fé, dentro do escopo e sem dano a dados de terceiros estão **autorizadas**.
- Proibido: exfiltrar PII real, destruir dados, testes de DoS em produção, engenharia social.
- Reconhecimento público do pesquisador mediante consentimento.

---

## 8. Documentos relacionados

| Documento | Descrição |
|---|---|
| `02-casos-teste-seguranca.md` | Bateria completa de casos de teste de segurança |
| `03-checklist-hardening.md` | Checklist final de pré-produção e produção |
| Política de privacidade (página pública) | Obrigatória antes de qualquer coleta de dados |
| Registro de operações de tratamento (art. 37 LGPD) | A ser mantido pelo DPO |

---

## 9. Revisão

| Versão | Data | Alterações | Autor |
|---|---|---|---|
| 1.0 | 2026-08-12 | Versão inicial | Time de Segurança |
| 1.1 | 2026-08-13 | Resposta ao red team (RT-001 a RT-015): §2.6 superfícies diretas (Supabase REST/Auth) e processadores de dados; §2.5 Spoofing (allowlist de redirect/PKCE), Information Disclosure (default-deny/no-store/redação de logs), DoS (cost/billing + rate limit global); §3.2 whitelist de campos, sanitização de exportações, no-store, Markdown, token fora de query string; §3.3 grants default-deny, role próprio, consentimentos append-only; §3.4 redação de PII em logs de terceiros; §4.1–4.4 requisitos por funcionalidade; §6.5 incidente via cache/log; reavaliação do modelo de ameaças por fase | Equipe de Segurança |
