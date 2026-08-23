# Checklist de Hardening — Eliora RH (Pré-produção e Produção)

| Campo | Valor |
|---|---|
| **Documento** | HARD-SEC-003 |
| **Versão** | 1.1 |
| **Status** | Vigente |
| **Classificação** | Confidencial |
| **Data** | 2026-08-13 |
| **Uso** | Checklist final obrigatório antes de cada release em produção e verificação pós-deploy |

> Este checklist é o gate de lançamento. Nenhum release vai para produção com itens **Críticos**
> ou **Altos** pendentes. Cada item traz descrição, como verificar e a ferramenta recomendada.

## Legenda de prioridade

| Prioridade | Significado |
|---|---|
| **CRÍTICO** | Impede o release; violação expõe PII, secrets ou permite comprometimento |
| **ALTO** | Bloqueia o release; violação é explorável ou viola LGPD |
| **MÉDIO** | Deve ser resolvido antes do release; degrada a postura de segurança |
| **BAIXO** | Recomendado; pode ser agendado |

---

## 1. HTTPS / TLS / HSTS

| ID | Item | Prioridade | Descrição | Como verificar | Ferramenta |
|---|---|---|---|---|---|
| HC-001 | HTTPS em todo o tráfego | **CRÍTICO** | Toda requisição é servida via HTTPS; HTTP redireciona (301/308) para HTTPS em todos os hosts e subdomínios | `curl -sI http://eliora.com.br` e `curl -sI http://www.eliora.com.br` retornam redirecionamento; nenhuma resposta com conteúdo via HTTP | curl |
| HC-002 | TLS 1.2+ obrigatório (1.3 preferido) | **CRÍTICO** | Desabilitar TLS 1.0/1.1 e SSLv3; cifras fortes (AES-GCM, ChaCha20); sem cifras de export/CBC fracas | `testssl.sh https://eliora.com.br` — verificar protocolos e cifras | testssl.sh / Qualys SSL Labs |
| HC-003 | HSTS com `preload` | **ALTO** | Header `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`; domínio submetido a hstspreload.org após estabilidade | `curl -sI https://eliora.com.br` | curl / hstspreload.org |
| HC-004 | HSTS no primeiro acesso (sem gap) | **MÉDIO** | Evitar janela onde o primeiro request é HTTP; usar redirecionamento no edge/Cloudflare (não só no app) | Testar acesso frio via rede nova | curl / navegador limpo |
| HC-005 | TLS de ponta a ponta (Edge → Origin → Supabase) | **ALTO** | Conexão Edge→origin e app→Supabase também em TLS 1.2+; sem tráfego de dados em claro em nenhum trecho | Documentação da plataforma + teste de captura em staging | Dashboard Vercel/Netlify, Supabase |
| HC-006 | Certificados válidos e renovação automática | **ALTO** | Certificados emitidos e renovados automaticamente; sem expiração descoberta em produção | Verificar validade (≥ 30 dias restantes); monitor de expiração configurado | Cloudflare / Let's Encrypt / Uptime monitor |

---

## 2. Headers de segurança

| ID | Item | Prioridade | Descrição | Como verificar | Ferramenta |
|---|---|---|---|---|---|
| HC-007 | `Content-Security-Policy` estrita | **ALTO** | CSP com `default-src 'self'`; `script-src` sem `unsafe-inline`/`unsafe-eval`; `object-src 'none'`; `base-uri 'self'`; `frame-ancestors 'none'`; `form-action 'self'`; nonces/hashes para scripts inline legítimos | `curl -sI` + revisão no browser (console) para violações | curl / DevTools / securityheaders.com |
| HC-008 | `X-Content-Type-Options: nosniff` | **MÉDIO** | Impede MIME sniffing | `curl -sI https://eliora.com.br` | curl |
| HC-009 | `X-Frame-Options: DENY` | **MÉDIO** | Anti-clickjacking (reforço junto com `frame-ancestors`) | Verificar header; teste de embed em iframe | curl / teste manual |
| HC-010 | `Referrer-Policy: strict-origin-when-cross-origin` | **MÉDIO** | Não vaza URLs completas cross-origin | Verificar header | curl |
| HC-011 | `Permissions-Policy` restrita | **MÉDIO** | Bloquear APIs sensíveis não usadas (`geolocation`, `camera`, `microphone`, `payment` etc.) | Verificar header | curl |
| HC-012 | Headers presentes em todas as respostas (200/4xx/5xx) | **ALTO** | Headers aplicados via middleware/plataforma, incluindo páginas de erro e respostas de API | Testar URL válida, 404 e erro de API | curl / ZAP |
| HC-013 | `X-Powered-By` / `Server` sem versão | **BAIXO** | Remover/ocultar banner de versão de servidor/framework | Verificar headers | curl |
| HC-014 | `security.txt` publicado | **BAIXO** | `/.well-known/security.txt` com contato `security@eliora.com.br` e link para a política de disclosure | `curl https://eliora.com.br/.well-known/security.txt` | curl |

---

## 3. Cookies

| ID | Item | Prioridade | Descrição | Como verificar | Ferramenta |
|---|---|---|---|---|---|
| HC-015 | Cookies de sessão com `HttpOnly` | **CRÍTICO** | Sessão inacessível via JavaScript | DevTools → Application → Cookies; teste `document.cookie` | Navegador |
| HC-016 | Cookies com `Secure` | **CRÍTICO** | Cookies só enviados via HTTPS | Inspeção de cookies | Navegador / Burp |
| HC-017 | `SameSite` = `Lax` ou `Strict` | **ALTO** | Mitigação de CSRF em primeira camada | Inspeção de cookies | Navegador / Burp |
| HC-018 | Sessão nunca em `localStorage`/`sessionStorage` | **CRÍTICO** | Tokens de sessão somente em cookies `HttpOnly`; storage client apenas para dados não sensíveis | Auditoria de código (`grep` por `localStorage.setItem`) + DevTools | Grep / DevTools |
| HC-019 | Prefixo `__Host-`/`__Secure-` | **BAIXO** | Reforço de origem dos cookies quando suportado | Inspeção de cookies | Navegador |
| HC-020 | Sem cookies de terceiros (tracking) | **MÉDIO** | Nenhum script/cookie de terceiros sem necessidade (analytics com consentimento, sem fingerprinting) | Revisão de scripts no Network; auditoria de cookies | DevTools |
| HC-021 | Expiração e invalidação de sessão | **ALTO** | Sessão expira (15 min inatividade); logout revoga no servidor | Teste de expiração e reuso pós-logout | Navegador / Burp |

---

## 4. CORS

| ID | Item | Prioridade | Descrição | Como verificar | Ferramenta |
|---|---|---|---|---|---|
| HC-022 | CORS com allowlist explícita | **ALTO** | `Access-Control-Allow-Origin` apenas com origens autorizadas; nunca `*` em rotas que retornam dados ou usam credenciais | `curl -sI -H "Origin: https://evil.com"` — sem `ACAO: *`; origem não listada não recebe CORS | curl / Burp |
| HC-023 | `Access-Control-Allow-Credentials` seguro | **CRÍTICO** | `allow-credentials: true` **nunca** combinado com `*` ou com origens reflexivas | Testar combinações de Origin + Credentials | curl / Burp |
| HC-024 | Métodos e headers permitidos mínimos | **MÉDIO** | `Access-Control-Allow-Methods` restrito ao necessário; OPTIONS pré-flight sem abrir tudo | Revisão da resposta preflight | curl / Burp |

---

## 5. Rate limiting e anti-abuso

| ID | Item | Prioridade | Descrição | Como verificar | Ferramenta |
|---|---|---|---|---|---|
| HC-025 | Rate limiting no formulário de contato | **ALTO** | Ex.: 5–10 submissões/hora/IP; resposta 429 com `Retry-After` | Script de 50 submissões; verificar bloqueio | curl / script |
| HC-026 | Rate limiting na newsletter | **ALTO** | Limite de cadastros/confirmações por IP e por e-mail | Teste de volume | curl / script |
| HC-027 | Rate limiting no login admin (futuro) | **ALTO** | Lockout/backoff após falhas (ex.: 5 tentativas → 15 min); sem resposta diferenciada | Brute force simulado em staging | Burp Intruder |
| HC-028 | Honeypot anti-bot no formulário | **MÉDIO** | Campo oculto (ex.: `website`); submissão com honeypot preenchido é descartada silenciosamente | Preencher honeypot e submeter | Navegador / curl |
| HC-029 | Cloudflare Turnstile (ou equivalente) | **MÉDIO** | Challenge leve em formulários públicos para reduzir spam | Teste com bot headless | Turnstile / automação |
| HC-030 | Limites de payload e timeout | **MÉDIO** | Body limit (ex.: 10 KB) e timeout em funções/rotas | Enviar payload grande; medir timeout | curl |
| HC-031 | WAF com rate limiting por IP na borda | **ALTO** | Cloudflare: regra de taxa por IP para rotas sensíveis + WAF Core Rule Set ativo | Dashboard Cloudflare; teste de volume | Cloudflare Dashboard |

---

## 6. WAF / Cloudflare

| ID | Item | Prioridade | Descrição | Como verificar | Ferramenta |
|---|---|---|---|---|---|
| HC-032 | DNS atrás do proxy Cloudflare (laranja) | **ALTO** | IP de origem (Vercel/Netlify/Supabase) oculto; regras de segurança aplicadas no edge | Verificar DNS do domínio; varrer por IP de origem vazado | dig / Cloudflare Dashboard |
| HC-033 | WAF gerenciado habilitado | **ALTO** | OWASP Core Rule Set ativo (SQLi, XSS, LFI/RFI bloqueados na borda) | Dashboard Cloudflare; teste de payload no modo log→block em staging | Cloudflare Dashboard |
| HC-034 | Proteção DDoS (L3/L4/L7) | **ALTO** | Mitigação automática habilitada | Dashboard Cloudflare | Cloudflare Dashboard |
| HC-035 | TLS mode full (strict) no Cloudflare | **ALTO** | Conexão Edge→Origin validada por certificado | Configuração SSL/TLS no dashboard | Cloudflare Dashboard |
| HC-036 | Página de challenge para bots (não `block` agressivo a usuários legítimos) | **MÉDIO** | `Managed Challenge` configurado; usuários reais não são bloqueados | Teste com navegador real e headless | Cloudflare Dashboard |
| HC-037 | Regras de bloqueio de países/IPs maliciosos (se aplicável ao público) | **BAIXO** | Bloqueio de acesso de regiões sem operação da Eliora (avaliar trade-off com SEO/acessibilidade) | Configuração + teste | Cloudflare Dashboard |
| HC-038 | Alertas de segurança do Cloudflare configurados | **MÉDIO** | Notificações de WAF/rate limit/DDoS atingidos | Dashboard → Notifications | Cloudflare Dashboard |

---

## 7. Secrets e credenciais

| ID | Item | Prioridade | Descrição | Como verificar | Ferramenta |
|---|---|---|---|---|---|
| HC-039 | Nenhuma secret em código, logs ou bundle client | **CRÍTICO** | API keys (Supabase `service_role`, Resend) apenas em variáveis de ambiente server-side | `grep -ri "service_role\|sk-\|api_key" .`; inspecionar bundle `_next/static` no navegador | Grep / DevTools / gitleaks |
| HC-040 | `service_role` nunca no client | **CRÍTICO** | Client usa apenas `anon key` + RLS; chave de serviço exclusiva de server-side | Auditoria de imports do Supabase no client | Grep / revisão de código |
| HC-041 | Variáveis de ambiente no painel do provedor (Vercel/Netlify) | **ALTO** | Secrets gerenciadas na plataforma, criptografadas, com escopo por ambiente | Revisão das env vars no painel; sem .env commitado | Vercel/Netlify Dashboard |
| HC-042 | `.env` / `.env.local` no `.gitignore` | **CRÍTICO** | Arquivos de ambiente não versionados; sem `.env*` no histórico | `git check-ignore .env.local`; `git log` sem .env | Git / gitleaks |
| HC-043 | Rotação de chaves documentada | **MÉDIO** | Plano de rotação de `service_role`, chave Resend e qualquer secret | Documentação + procedimento testado | Processo |
| HC-044 | 2FA em contas com acesso a produção (Vercel, Netlify, Supabase, Cloudflare, Resend, git) | **ALTO** | Todas as contas com acesso à produção com MFA obrigatório | Verificar configuração de MFA em cada painel | Painéis dos provedores |
| HC-045 | Acesso nominal e mínimo a painéis | **ALTO** | Nenhuma conta compartilhada; papéis de menor privilégio por pessoa | Revisão de membros/roles nos painéis | Painéis dos provedores |
| HC-046 | Deploy em preview com dados de staging (nunca produção) | **ALTO** | Previews de PR apontam para banco de staging/isolado | Configuração de ambientes no provedor | Vercel/Netlify Dashboard |

---

## 8. Dependências e supply chain

| ID | Item | Prioridade | Descrição | Como verificar | Ferramenta |
|---|---|---|---|---|---|
| HC-047 | `npm audit` limpo (sem alta/crítica) | **ALTO** | Zero vulnerabilidades de nível alto/crítico sem correção | `npm audit --audit-level=high` | npm/pnpm |
| HC-048 | Lockfile versionado e usado no build | **ALTO** | `package-lock.json`/`pnpm-lock.yaml` no repo; build com `npm ci` (não `npm install`) | Verificar arquivo no repo e config do build | Git / CI |
| HC-049 | Next.js/React em versão suportada e patcheada | **ALTO** | Sem CVE conhecida aplicável sem fix; em versão LTS/ativa | Comparar com releases; consultar GHSA | npm outdated / GitHub |
| HC-050 | Renovate/Dependabot ativo | **MÉDIO** | PRs automáticas de atualização de dependências | Verificar PRs agendados | GitHub/Dependabot |
| HC-051 | Scripts de postinstall revisados | **MÉDIO** | Nenhum script suspeito em dependências; integridade verificada | Revisão de `package.json` de dependências | Auditoria manual |
| HC-052 | SAST no CI (Semgrep + gitleaks) | **ALTO** | Scan de padrões inseguros e secrets a cada PR; build falha em findings altos | Logs do CI | Semgrep / gitleaks |
| HC-053 | Auditoria de licenças/componentes (opcional) | **BAIXO** | Riscos de licença e CVE tracking centralizado | Dashboard (Snyk/alternativo) | Snyk / Trivy |

---

## 9. Supabase / PostgreSQL (RLS e dados)

| ID | Item | Prioridade | Descrição | Como verificar | Ferramenta |
|---|---|---|---|---|---|
| HC-054 | RLS habilitado em **todas** as tabelas | **CRÍTICO** | `SELECT`/`INSERT`/`UPDATE`/`DELETE` controlados por política; nenhuma tabela sem RLS | `SELECT relname, relrowsecurity FROM pg_class` — verificar `relrowsecurity = true` | SQL (Supabase SQL Editor) |
| HC-055 | Políticas RLS com `WITH CHECK` em inserts/updates | **ALTO** | Restrições de linha também na escrita, não só na leitura | Revisão das policies | Supabase SQL Editor |
| HC-056 | `anon` sem permissão de escrita em tabelas internas | **CRÍTICO** | Role `anon` só lê/escreve o estritamente necessário; nada de `service_role` no client | Revisão de grants/policies por role | Supabase SQL Editor |
| HC-057 | Tabela de consentimento LGPD append-only | **ALTO** | Registros de consentimento não editáveis/excluíveis por aplicação | Estrutura + policies da tabela | Supabase SQL Editor |
| HC-058 | Buckets de storage privadas | **ALTO** | Sem bucket público sem necessidade; URLs assinadas para acesso controlado | Revisão das políticas de storage | Supabase Storage |
| HC-059 | Backups + point-in-time recovery habilitados | **ALTO** | RPO/RTO definidos; restauração testada | Configuração do projeto + teste de restore | Supabase Dashboard |
| HC-060 | Criptografia em repouso ativa | **MÉDIO** | Padrão AES-256 do Supabase; colunas de PII com criptografia adicional se necessário | Configuração + auditoria de colunas sensíveis | Supabase Dashboard |
| HC-061 | Logs de queries sensíveis revisados | **MÉDIO** | Sem PII em logs de query expostos; acesso a logs restrito | Revisão de acesso aos logs | Supabase Logs |
| HC-062 | Retenção automática de dados | **ALTO** | Job/cron (pg_cron) exclui submissões/assinantes expirados conforme política | Verificar agendamento e execução | Supabase / pg_cron |
| HC-063 | Funções/Edge Functions sem secrets hardcoded | **CRÍTICO** | Secrets em env vars do runtime, nunca no código de função | Auditoria de código das funções | Grep / revisão |

---

## 10. Validação e sanitização de inputs

| ID | Item | Prioridade | Descrição | Como verificar | Ferramenta |
|---|---|---|---|---|---|
| HC-064 | Validação server-side de 100% dos inputs | **CRÍTICO** | Zod (ou equivalente) em todo Route Handler; tipos, comprimentos, formatos | Auditoria de código; teste de payloads inválidos | Revisão / curl |
| HC-065 | Sanitização/escape de saída | **ALTO** | React escapa por padrão; sem `dangerouslySetInnerHTML` com dados não confiáveis | `grep -r "dangerouslySetInnerHTML"` no repo | Grep |
| HC-066 | Consultas parametrizadas / cliente Supabase | **ALTO** | Sem concatenação de strings em SQL; uso do client/parametrização | `grep` por template de SQL manual | Grep / revisão |
| HC-067 | E-mail validado em formato + domínio | **MÉDIO** | Validação de e-mail server-side; rejeição de domínios inválidos | Teste com e-mails malformados | curl |
| HC-068 | Telefone validado com formato BR | **BAIXO** | Formato de telefone validado/normalizado; sem campos vazios obrigatórios indevidos | Teste de entrada | curl |
| HC-069 | Mensagens/erros sem refletir input | **MÉDIO** | Erros genéricos, sem eco do payload do usuário (anti-XSS refletido) | Forçar erro com payload | curl / Burp |

---

## 11. Logs e monitoramento

| ID | Item | Prioridade | Descrição | Como verificar | Ferramenta |
|---|---|---|---|---|---|
| HC-070 | Logs estruturados sem PII | **ALTO** | Logs JSON com timestamp, nível, usuário (ID, não e-mail), IP, evento; sem corpo de mensagem/telefone/e-mail | Inspecionar logs após tráfego de teste | Vercel/Netlify Logs, Supabase Logs |
| HC-071 | Eventos de segurança logados | **MÉDIO** | Login falho, submissão de formulário, consentimento, mutações admin | Gerar eventos de teste e conferir logs | Logs da plataforma |
| HC-072 | Alertas de anomalia configurados | **ALTO** | Alertas: 5xx em série, rate limit atingido, pico de submissões, login falho em massa, novo deploy | Configuração + teste de simulação | Vercel/Netlify Alerts, Cloudflare Alerts |
| HC-073 | Trilha de auditoria admin (futuro) | **ALTO** | Log append-only de mutações admin (quem, o quê, quando) | Teste de mutação em staging | Supabase / app logs |
| HC-074 | Retenção de logs definida (30–90 dias) | **MÉDIO** | Política de retenção de logs documentada e aplicada | Configuração da plataforma | Painel do provedor |

---

## 12. LGPD / Privacidade

| ID | Item | Prioridade | Descrição | Como verificar | Ferramenta |
|---|---|---|---|---|---|
| HC-075 | Política de privacidade publicada | **CRÍTICO** | Página `/privacidade` acessível, com dados coletados, finalidades, bases legais, direitos (arts. 18–19), DPO, canais e versão | Navegar no site; conferir conteúdo e link no rodapé/formulários | Navegador |
| HC-076 | Consentimento explícito nos formulários | **CRÍTICO** | Checkbox opt-in obrigatório (formulário e newsletter) com texto claro e versão da política | Testar submissão sem consentimento → rejeitada | Navegador / curl |
| HC-077 | Registro de consentimento no banco | **CRÍTICO** | Tabela `consentimentos` existe, é **append-only** e registra `aceito_em`, `versao_politica`, `finalidade`, `base_legal`, `form_origin`, `ip_hash` e `email_hash` para cada consentimento | Consultar `consentimentos` após cada fluxo (contato, newsletter, cookies); tentar UPDATE/DELETE → bloqueado | Supabase SQL Editor |
| HC-078 | DPO/Encarregado nomeado e publicado | **ALTO** | Nome e contato do encarregado (art. 41) na política de privacidade | Verificar página de privacidade | Navegador |
| HC-079 | Canal de requisição de titular (DPO) | **ALTO** | E-mail/formulário funcional para direitos do titular; resposta em ≤ 15 dias | Enviar e-mail de teste; verificar resposta automática e fluxo | E-mail |
| HC-080 | Unsubscribe funcional na newsletter | **ALTO** | Link de descadastro em todo e-mail + página de confirmação; exclusão efetiva | Assinar com e-mail de teste e descadastrar | E-mail / site |
| HC-081 | Minimização de dados confirmada | **ALTO** | Somente os campos necessários; sem CPF/dados sensíveis; revisão do esquema | Auditoria de schema e formulários | SQL / revisão |
| HC-082 | Retenção automática implementada | **ALTO** | Job exclui/anonimiza dados expirados; processo documentado | Verificar job + execução | pg_cron / Supabase |
| HC-083 | Registro de operações de tratamento (art. 37) | **ALTO** | Inventário de dados pessoais mantido pelo DPO | Documento mantido fora do código | Documentação |
| HC-084 | Base legal documentada por operação | **ALTO** | Consentimento (formulário/newsletter) e demais bases documentadas | Registro de tratamento | Documentação |
| HC-085 | Plano de resposta a incidente LGPD testado | **ALTO** | Simulação de incidente com comunicação ANPD/titulares (prazo ≤ 48h) | Exercício de simulação agendado | Processo/Playbook |
| HC-086 | Acordo com fornecedores (DPA) | **ALTO** | DPAs assinados com Vercel/Netlify, Supabase, Resend, Cloudflare (operadores) | Revisão de contratos | Jurídico / DPO |

---

## 13. Processo e governança

| ID | Item | Prioridade | Descrição | Como verificar | Ferramenta |
|---|---|---|---|---|---|
| HC-087 | Code review obrigatório (2 aprovações) | **ALTO** | Nenhum merge sem revisão; branch protection ativo | Configuração do repositório | GitHub/GitLab |
| HC-088 | Deploy com pipeline, sem deploy manual | **ALTO** | Releases via CI/CD auditáveis; sem acesso direto de produção | Configuração do provedor | Vercel/Netlify |
| HC-089 | ZAP Baseline + testssl.sh no pós-deploy | **ALTO** | Verificação automática de headers/TLS após cada deploy | Logs do CI pós-deploy | ZAP / testssl.sh |
| HC-090 | Auditoria trimestral de segurança | **MÉDIO** | Revisão completa (dependências, RLS, headers, logs, LGPD) a cada 3 meses | Agenda de auditoria | Processo |
| HC-091 | Treinamento de segurança da equipe | **MÉDIO** | Equipe treinada em OWASP Top 10 e LGPD; revisões de código com mentalidade de segurança | Registro de treinamento | Processo |
| HC-092 | Rota de escalação de incidente documentada | **ALTO** | Contatos e tempos de resposta atualizados e disponíveis (ver política §6) | Revisar doc 01 | Processo |

---

## 14. Supabase direto, RLS, cache, exportações e telemetria (resposta ao red team)

> Itens adicionados na **v1.1** em resposta ao relatório de red team (RT-001 a RT-015). Juntos com os itens HC-054 a HC-063, formam o critério de entrada do gate de release para a fase 1 (RT-001, RT-003, RT-006, RT-008, RT-010, RT-012).

| ID | Item | Prioridade | Descrição | Como verificar | Ferramenta |
|---|---|---|---|---|---|
| HC-093 | Grants default-deny (REVOKE ALL) | **CRÍTICO** | `anon`/`authenticated` **sem** grants em tabelas/sequências/funções com PII; grants mínimos explícitos (blog público, própria linha em `usuarios_admin`); nenhuma função executável por `anon` sem necessidade | `SELECT grantee, privilege_type FROM information_schema.role_table_grants WHERE table_schema='public'` + `\dp` — nenhuma tabela com PII listada para `anon`/`authenticated`; teste ST-086 | SQL (Supabase SQL Editor) / pgTAP |
| HC-094 | Escopo `FOR` das políticas RLS (sem `FOR ALL`) | **CRÍTICO** | Nenhuma policy `FOR ALL` em tabelas sensíveis; `usuarios_admin` com `FOR SELECT`/`FOR UPDATE` apenas (sem INSERT/DELETE); trigger `guardar_usuarios_admin` ativo | `SELECT schemaname, tablename, policyname, cmd FROM pg_policies` — nenhum `cmd='ALL'` em tabelas de privilégio/PII; teste negativo INSERT como `authenticated` → 403 (ST-087) | SQL / pgTAP |
| HC-095 | Whitelist no insert + TTL robusto a tamper | **CRÍTICO** | Insert construído no **servidor** com campos fixos (zod `.strict()`/`.pick()`); `status`/`criado_em` definidos pelo servidor (trigger normaliza); job de TTL não é contornado por `status` injetado | Teste mass assignment (ST-088); simular TTL vencido com `status='em_andamento'` → job exclui ou alerta de revisão manual em tempo finito | Teste funcional / SQL |
| HC-096 | Redirect URLs do Supabase (allowlist) | **CRÍTICO** | `Site URL` + allowlist **exata** de Redirect URLs (sem wildcards); `redirect_to` validado server-side contra allowlist; PKCE obrigatório | Auditoria no painel Supabase (Auth → URL Configuration); teste ST-089 em staging via proxy | Painel Supabase / proxy de staging |
| HC-097 | Acesso a logs com PII + redação (Sentry/plataformas) | **ALTO** | Sentry com **scrubbing** de `token`/`email`/query strings e breadcrumbs sem PII; acesso a logs das plataformas (IP real, tokens) **nominal e auditado**; IP real documentado como processador (DPA) | Revisar configuração do Sentry (Data Scrubber); auditoria de quem lê logs da Vercel/Cloudflare/Supabase; teste ST-100 | Painel Sentry / auditoria |
| HC-098 | Dangling CNAMEs / DNSSEC / domínio canônico | **MÉDIO** | Inventário de DNS com verificação periódica de CNAMEs **vivos**; remover registros ao desprovisionar; **um único domínio canônico** (`eliora-rh.com.br`) em todos os documentos; DNSSEC habilitado | Cron `dnsreaper`/script próprio; `dig` nos CNAMEs; teste ST-102 | dnsreaper / script próprio / dig |
| HC-099 | Monitor de quota/conexões (Supabase + Resend) | **ALTO** | Alerta a **80%** da quota do Resend e das conexões/quota do Supabase; monitor de pico serverless (pool) | Dashboards + alertas configurados; testes ST-098/ST-103 | Dashboards Supabase/Resend |
| HC-100 | `Cache-Control: no-store` em respostas com PII | **CRÍTICO** | Respostas com PII/autenticadas com `Cache-Control: no-store, private`; cache key = Host + path; `Vary: Cookie`/`Authorization` onde aplicável; headers de forwarding (`X-Forwarded-Host`, `x-rewrite-url`) ignorados no edge | Teste ST-092; curl de headers em rotas autenticadas e `/api/contato`; revisão da cache key no Cloudflare/Vercel | curl / Cloudflare Dashboard |
| HC-101 | Sanitização de exportações (CSV/Formula injection) | **ALTO** | Células iniciadas com `= + - @`, tab/CR neutralizadas (prefixo `'` ou XLSX com tipo texto); nome de arquivo **fixo** gerado no servidor (`export-lgpd-<uuid>.csv`); download com URL assinada, expiração curta e uso único | Teste ST-095/ST-096 | Teste funcional |
| HC-102 | Rate limit global/diário + circuit breaker + honeypot com telemetria | **ALTO** | Limite **global diário** de submissões/notificações independente de IP; circuit breaker de notificações (RT-010); honeypot com contador/telemetria → alerta de campanha (RT-015) | Teste ST-103; alerta de campanha configurado e disparando em simulação | Teste funcional / alertas |
| HC-103 | Supabase Auth: signup desabilitado + CAPTCHA | **ALTO** | Signup público **desabilitado** (contas só via convite/admin); allowlist de domínios de e-mail; CAPTCHA/Turnstile no fluxo de auth; rate limit adicional em mediador de login (não expor `/auth/v1` direto) | Configuração no painel (Auth → Providers/Security); testes ST-090/ST-091 | Painel Supabase Auth |
| HC-104 | Tabela `consentimentos` existente e preenchida | **CRÍTICO** | Tabela `consentimentos` criada, **append-only** (UPDATE/DELETE bloqueados por trigger) e preenchida a cada consentimento com `versao_politica`, `finalidade`, `base_legal`, `form_origin`, `ip_hash` | Consultar `consentimentos` após cada fluxo; tentar UPDATE/DELETE → bloqueado; ST-077/078 | SQL (Supabase SQL Editor) |
| HC-105 | Sanitização de Markdown no blog | **ALTO** | Renderização **sem `rehype-raw`** ou com `rehype-sanitize` + allowlist estrita; scheme allowlist em URLs (`http/https/mailto`) | Teste ST-101; revisão do pipeline de renderização do `conteudo` | Teste funcional / revisão |
| HC-106 | Token de confirmação fora de query string | **ALTO** | Token de confirmação entregue via POST body ou fragmento `#token` (ou página com `Referrer-Policy: no-referrer`); nunca em URL/logs/breadcrumbs | Teste ST-097/ST-100; auditoria de URLs geradas e logs do Sentry | Teste funcional / logs |

---

## Resumo de status do release

| Pergunta | Resposta |
|---|---|
| Todos os itens **CRÍTICOS** concluídos? | [ ] Sim — [ ] Não |
| Todos os itens **ALTOS** concluídos ou com waiver aprovado? | [ ] Sim — [ ] Não |
| Casos de teste críticos/altos do doc 02 com status PASS (inclui ST-086 a ST-103)? | [ ] Sim — [ ] Não |
| HC-093 a HC-106 concluídos (grants default-deny, RLS FOR SELECT, no-store, CSV, rate limit global, redação de logs, consentimentos)? | [ ] Sim — [ ] Não |
| ZAP Baseline sem alertas de risco alto? | [ ] Sim — [ ] Não |
| `npm audit` sem vulnerabilidades alta/crítica? | [ ] Sim — [ ] Não |
| **Autorização final para produção** (responsável): | Nome / cargo / data |

---

## Revisão

| Versão | Data | Alterações | Autor |
|---|---|---|---|
| 1.0 | 2026-08-12 | Versão inicial | Time de Segurança |
| 1.1 | 2026-08-13 | Adicionados HC-093 a HC-106 (resposta ao red team RT-001 a RT-015): grants default-deny, escopo FOR das policies, whitelist no insert/TTL robusto, Redirect URLs, redação de PII em logs, CNAMEs órfãos/DNSSEC, monitor de quota, `Cache-Control: no-store`, sanitização CSV, rate limit global/circuit breaker, signup desabilitado/CAPTCHA, consentimentos preenchidos, sanitização Markdown, token fora de query string; alinhado HC-077 aos campos da tabela `consentimentos` | Equipe de Segurança |
