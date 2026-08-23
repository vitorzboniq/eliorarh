# Casos de Teste de Segurança — Eliora RH

| Campo | Valor |
|---|---|
| **Documento** | TEST-SEC-002 |
| **Versão** | 1.1 |
| **Status** | Vigente |
| **Classificação** | Confidencial |
| **Data** | 2026-08-13 |
| **Base** | OWASP Top 10 (2021), OWASP ASVS, LGPD (Lei 13.709/2018) |

> Este documento define a bateria completa de casos de teste de segurança do site Eliora RH.
> Cada caso possui ID único rastreável (prefixo `ST-`), categoria OWASP, cenário, passos,
> resultado esperado e severidade. A severidade segue a escala: **Crítica, Alta, Média, Baixa**.

## Escala de severidade

| Severidade | Critério (CVSS aproximado) | Exemplos |
|---|---|---|
| **Crítica** | CVSS 9.0–10.0 | RCE, SQLi explorável, vazamento de PII em massa, comprometimento de admin |
| **Alta** | CVSS 7.0–8.9 | XSS armazenado, CSRF em mutação, quebra de auth, exposição de secrets |
| **Média** | CVSS 4.0–6.9 | Headers ausentes, CORS permissivo, logs com PII, falha de retenção |
| **Baixa** | CVSS 0.1–3.9 | Falta de hardening informativo, versão desatualizada sem CVE explorável |

## Ambiente e dados de teste

| Item | Valor |
|---|---|
| Ambiente | Staging (URL: `staging.eliora.com.br` — espelho de produção) e Produção (testes não destrutivos apenas) |
| Dados | Usar dados fictícios em staging; jamais dados reais de titulares |
| Conta de admin de teste | Criada em staging com papel `viewer` (menor privilégio) para testes de RBAC |
| Ferramentas | curl, Navegador (DevTools), Burp Suite Community, OWASP ZAP, sqlmap (staging apenas), `testssl.sh` |

---

## 1. Casos de teste — OWASP Top 10

### 1.1 A01 — Broken Access Control

| ID | OWASP | Cenário | Passos | Resultado esperado | Severidade |
|---|---|---|---|---|---|
| ST-001 | A01 | **IDOR — acesso direto a IDs de submissão** | 1. Enviar formulário de contato; 2. Capturar o `id` (UUID) da submissão; 3. Solicitar `GET /api/contato/{id}` sem autenticação; 4. Variar o `id` | 401/403 ou 404; nunca retornar dados da submissão sem autenticação/autorização | **Crítica** |
| ST-002 | A01 | **Forced browsing em rotas admin** | 1. Navegar sem autenticação para `/admin`, `/dashboard`, `/api/admin/*`, `/admin/login`, `/api/submissoes` | Todas as rotas admin exigem autenticação; rotas inexistentes retornam 404 (não 403 vazando existência sem necessidade) | **Crítica** |
| ST-003 | A01 | **Privilege escalation vertical** | 1. Logar como usuário `viewer`; 2. Tentar executar ação de `admin` (excluir submissão, alterar papel); 3. Tentar acessar rota admin via API diretamente com o cookie do viewer | Toda ação sensível valida o papel no **servidor**; viewer recebe 403 | **Crítica** |
| ST-004 | A01 | **Privilege escalation horizontal** | 1. Criar dois usuários admin (A e B); 2. Logar como A; 3. Tentar ler/alterar recursos de B trocando IDs na URL/body | Recursos são isolados por dono/tenancy; A recebe 403/404 ao tocar recursos de B | **Alta** |
| ST-005 | A01 | **Exposição de arquivos sensíveis estáticos** | 1. Tentar acessar `/.env`, `/.env.local`, `/.git/config`, `/backup.zip`, `/package.json`, `/.well-known` indevidos, `/_next/` fora do padrão, `/api/` não documentado | Todos retornam 404/403; nenhum arquivo de configuração, backup ou chave é servido | **Crítica** |
| ST-006 | A01 | **Métodos HTTP não autorizados** | 1. Enviar `PUT`, `PATCH`, `DELETE`, `OPTIONS` e `TRACE` para rotas de API e estáticas | Rotas rejeitam métodos não permitidos (405); `TRACE` desabilitado; OPTIONS não revela headers indevidos | **Média** |
| ST-007 | A01 | **Controle de acesso ausente em Route Handlers** | 1. Auditoria de código: para cada `route.ts` que lê/escreve dados, verificar se há autenticação/autorização; 2. Testar a rota sem cookie/token | Nenhuma rota que manipule dados sensíveis funciona sem autenticação/autorização explícita | **Crítica** |

### 1.2 A02 — Cryptographic Failures

| ID | OWASP | Cenário | Passos | Resultado esperado | Severidade |
|---|---|---|---|---|---|
| ST-008 | A02 | **HTTP sem redirecionar para HTTPS** | 1. `curl -I http://www.eliora.com.br`; 2. Repetir para `http://eliora.com.br` | 301/308 para `https://` com HSTS enviado; nenhum conteúdo servido em HTTP | **Alta** |
| ST-009 | A02 | **HSTS ausente ou fraco** | 1. `curl -sI https://eliora.com.br`; 2. Verificar header `Strict-Transport-Security` | Header presente: `max-age=31536000; includeSubDomains; preload` | **Alta** |
| ST-010 | A02 | **Cifras TLS fracas** | 1. Rodar `testssl.sh https://eliora.com.br` / Qualys SSL Labs | TLS 1.3 habilitado, TLS 1.2 no mínimo; sem TLS 1.0/1.1; sem SSLv3; sem cifras CBC fracas/export | **Alta** |
| ST-011 | A02 | **Dados em repouso sem criptografia** | 1. Inspecionar Supabase: verificar criptografia em repouso (default); 2. Verificar se colunas de PII têm acesso via RLS restrito | Criptografia em repouso ativa; PII acessível apenas por papéis autorizados | **Média** |
| ST-012 | A02 | **Exposição excessiva de campos (data leakage)** | 1. Inspecionar respostas JSON das APIs de contato/newsletter; 2. Verificar se campos internos (IDs, timestamps internos, dados de outros titulares) vazam | Respostas contêm apenas o mínimo necessário; nenhum campo interno/sensível extra | **Alta** |
| ST-013 | A02 | **Hash fraco de senhas (futuro admin)** | 1. Auditoria: verificar algoritmo de hash (bcrypt/argon2, custo adequado); 2. Testar senhas de teste | Senhas com bcrypt (cost ≥ 12) ou argon2id; nunca MD5/SHA1/SHA256 puro | **Alta** |
| ST-014 | A02 | **Secrets/tokens no client-side ou repositório** | 1. `grep -r "service_role\|api_key\|sk-\|supabase_key" .` no repo (excluir docs de exemplo); 2. Inspecionar JS do bundle (`_next/static`) no navegador; 3. Verificar env vars no CI | Nenhuma secret em código, logs, bundle client ou histórico do git; `service_role` jamais no client | **Crítica** |

### 1.3 A03 — Injection

| ID | OWASP | Cenário | Passos | Resultado esperado | Severidade |
|---|---|---|---|---|---|
| ST-015 | A03 | **SQLi clássica (parametrização)** | 1. Enviar payloads `' OR 1=1--`, `'; DROP TABLE--`, `' UNION SELECT 1,2,3--` nos parâmetros de busca/blog/formulário; 2. Observar erros SQL e respostas | Nenhum payload altera o comportamento; consultas sempre parametrizadas (Prepared Statements / Supabase client); erros genéricos | **Crítica** |
| ST-016 | A03 | **SQLi via campos de formulário** | 1. Inserir payloads SQL em nome, empresa, telefone, e-mail do formulário de contato | Dados são armazenados como texto literal inofensivo; nenhuma execução de SQL | **Crítica** |
| ST-017 | A03 | **NoSQLi / abuso de operadores** | 1. Enviar objetos `{"$ne": null}`, `{"$gt": ""}` em parâmetros JSON (se houver API JSON); 2. Testar filtros `?campo[$ne]=x` | Filtros tratados como strings; nenhum operador NoSQL executado | **Alta** |
| ST-018 | A03 | **XSS refletido** | 1. Injetar `<script>alert(1)</script>`, `<img src=x onerror=alert(1)>`, `javascript:alert(1)` em parâmetros de query (busca do blog, parâmetros refletidos); 2. Verificar no DOM | Payloads são escapados/encodados pelo React; nada executado; sem `dangerouslySetInnerHTML` com dados não confiáveis | **Alta** |
| ST-019 | A03 | **XSS armazenado (formulário/blog)** | 1. Enviar comentário/campo com `<script>` e `onerror`; 2. Abrir página onde o dado é renderizado (admin/backoffice) | Conteúdo armazenado é neutralizado na renderização; admin não executa scripts; sem HTML bruto | **Crítica** |
| ST-020 | A03 | **Email header injection** | 1. Enviar no campo "nome" ou "mensagem": `\r\nBcc: attacker@evil.com`, `%0D%0ACc:`, `\nTo:`; 2. Verificar e-mail recebido (caixa de teste) | Nenhum header extra é injetado; API do Resend tratada como template com valores sanitizados; mensagens de erro não refletem payload | **Alta** |
| ST-021 | A03 | **Injeção de HTML/atributos** | 1. Enviar `"><img src=x onerror=alert(1)>`, `"><svg onload=alert(1)>`, `'"><script>` em todos os campos | Valor renderizado como texto puro; atributos/quebras de tag neutralizadas | **Alta** |
| ST-022 | A03 | **Command injection / template injection** | 1. Enviar payloads `;ls`, `$(whoami)`, `{{7*7}}`, `${7*7}` nos campos; 2. Observar saída | Nenhuma execução de comando; payloads tratados como dados | **Alta** |

### 1.4 A04 — Insecure Design

| ID | OWASP | Cenário | Passos | Resultado esperado | Severidade |
|---|---|---|---|---|---|
| ST-023 | A04 | **Falta de rate limiting no formulário** | 1. Enviar 50+ submissões em 1 minuto (script); 2. Verificar se alguma é rejeitada | Rate limiting ativo (ex.: 5–10/h/IP); requisições excedentes retornam 429 com `Retry-After` | **Alta** |
| ST-024 | A04 | **Ausência de honeypot anti-bot** | 1. Inspecionar o formulário (campo honeypot oculto presente?); 2. Preencher o honeypot e submeter | Campo honeypot existe; submissão com honeypot preenchido é **silenciosamente descartada** (nunca "parece" validada) | **Média** |
| ST-025 | A04 | **Trust boundary — confiar no client** | 1. Interceptar a requisição de submissão no Burp; 2. Alterar campos (adicionar `admin: true`, mudar valores enviados); 3. Verificar se o servidor aceita | Servidor revalida **tudo**; campos injetados são ignorados/descartados (mass assignment) | **Crítica** |
| ST-026 | A04 | **Fail-open em validações** | 1. Auditoria: verificar se `try/catch` genérico valida e, ao falhar, aceita; 2. Enviar payloads que disparam exceções | Falha de validação = **rejeição** (fail closed); exceção → resposta de erro, nunca processamento | **Alta** |
| ST-027 | A04 | **Consentimento LGPD ausente no fluxo** | 1. Submeter formulário/newsletter sem marcar consentimento; 2. Verificar se o dado é aceito | Submissão sem consentimento explícito é **rejeitada** com mensagem clara; consentimento é pré-requisito (art. 7º/8º LGPD) | **Alta** |
| ST-028 | A04 | **Sequência de funcionalidade abusável** | 1. Testar fluxos: reenviar confirmação de newsletter em loop; solicitar múltiplas exportações de dados simultâneas; 2. Verificar limites | Limites de taxa em fluxos de e-mail/exportação; sem possibilidade de sobrecarregar serviços (Resend/Supabase) | **Média** |

### 1.5 A05 — Security Misconfiguration

| ID | OWASP | Cenário | Passos | Resultado esperado | Severidade |
|---|---|---|---|---|---|
| ST-029 | A05 | **Headers de segurança ausentes** | 1. `curl -sI https://eliora.com.br`; 2. Checar `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options` | Todos os headers obrigatórios presentes com valores estritos (ver checklist doc 03) | **Média** |
| ST-030 | A05 | **CSP fraca ou ausente** | 1. Carregar a página com CSP ativa; 2. Testar `unsafe-inline`/`unsafe-eval`; 3. Verificar se `script-src`/`object-src`/`frame-ancestors` estão definidos | CSP estrita sem `unsafe-inline` em `script-src`; `base-uri 'self'`; `object-src 'none'`; `frame-ancestors` definido | **Média** |
| ST-031 | A05 | **CORS permissivo** | 1. `curl -sI -H "Origin: https://evil.com" https://eliora.com.br/api/contato`; 2. Verificar `Access-Control-Allow-Origin` | Sem `ACAO: *` em rotas com dados; origens não confiáveis não recebem credenciais (`allow-credentials: true` só com origem explícita na allowlist) | **Alta** |
| ST-032 | A05 | **Erros expostos (stack traces)** | 1. Forçar erros (payload inválido, rota inexistente, exceção); 2. Observar corpo da resposta e headers | Mensagens de erro genéricas; sem stack trace, versões de libs, paths internos, SQL, ou PII em resposta | **Média** |
| ST-033 | A05 | **Robots e indexação de áreas sensíveis** | 1. Verificar `robots.txt` e sitemap; 2. Tentar indexação de `/admin`, `/api`, rotas privadas | `robots.txt` não expõe caminhos sensíveis; rotas privadas não são indexáveis (X-Robots-Tag ou não linkadas) | **Baixa** |
| ST-034 | A05 | **Modo debug/desenvolvimento em produção** | 1. Auditoria de `NODE_ENV`; 2. Verificar banners/versões no HTML/headers; 3. Checar `_next/` por páginas de erro dev | `NODE_ENV=production`; sem painéis de dev; sem versões de framework em respostas | **Média** |
| ST-035 | A05 | **Configurações default acessíveis** | 1. Testar `/supabase/`, `/supabase/dashboard`, painéis de admin default, `/.git` | Nenhum painel/serviço default acessível publicamente; portas de serviço só internas | **Média** |

### 1.6 A06 — Vulnerable and Outdated Components

| ID | OWASP | Cenário | Passos | Resultado esperado | Severidade |
|---|---|---|---|---|---|
| ST-036 | A06 | **Dependências com CVEs conhecidas** | 1. Rodar `npm audit` / `pnpm audit` em CI e local; 2. Revisar relatório | Zero vulnerabilidades **alta/crítica** sem patch; vulnerabilidades médias/baixas com plano de correção datado; build bloqueia críticas | **Alta** |
| ST-037 | A06 | **Framework desatualizado** | 1. Comparar versão do Next.js/React com releases estáveis; 2. Verificar avisos de segurança (GHSA) | Next.js em versão suportada e patcheada; sem CVE conhecida aplicável sem fix | **Alta** |
| ST-038 | A06 | **Lockfile ausente/inconsistente** | 1. Verificar `package-lock.json`/`pnpm-lock.yaml` no repo; 2. Rodar `npm ci` | Lockfile versionado e consistente; build reproduzível; nenhuma dependência resolvida em tempo de deploy | **Média** |
| ST-039 | A06 | **Componentes client-side vulneráveis** | 1. Auditar pacotes que chegam ao bundle (shadcn/ui, utilitários); 2. Buscar CVEs nas versões | Pacotes client atualizados; sem bibliotecas deprecadas/abandonadas com CVE conhecida | **Média** |
| ST-040 | A06 | **Scripts de postinstall maliciosos** | 1. Revisar `package.json` e scripts de dependências; 2. Usar `npm audit signatures`/integridade de registries | Sem scripts de postinstall suspeitos; integridade verificada; instalação determinística | **Alta** |
| ST-041 | A06 | **Imagens/runtime desatualizadas (serverless/containers)** | 1. Auditar runtime da plataforma (Node.js version) e imagens de edge/containers; 2. Rodar Trivy se houver containers | Runtime em versão suportada e patcheada; imagem sem vulnerabilidades conhecidas | **Média** |

### 1.7 A07 — Identification and Authentication Failures

| ID | OWASP | Cenário | Passos | Resultado esperado | Severidade |
|---|---|---|---|---|---|
| ST-042 | A07 | **Senhas fracas no login admin (futuro)** | 1. Tentar senhas comuns (`admin`, `123456`, `password`, nome do site); 2. Verificar política | Política de senha forte (mín. 12 chars, complexidade); senhas comuns rejeitadas; verificação contra listas de vazamento | **Alta** |
| ST-043 | A07 | **Session fixation** | 1. Fixar cookie `sid` conhecido; 2. Logar; 3. Verificar se o `sid` é reemitido | Sessão recebe **novo** ID após autenticação (regeneration); o ID fixado é invalidado | **Alta** |
| ST-044 | A07 | **Token de sessão previsível/fraca entropia** | 1. Coletar múltiplas sessões (Burp Sequencer); 2. Analisar aleatoriedade | Cookies/sessões com alta entropia; UUID v4/random CSPRNG; formato não previsível | **Média** |
| ST-045 | A07 | **Brute force no login** | 1. Tentar 100+ logins com senha errada; 2. Observar bloqueios e atrasos | Rate limiting + lockout (ex.: 5 falhas → 15 min); backoff exponencial; resposta uniforme (sem vazamento de existência) | **Alta** |
| ST-046 | A07 | **Credenciais default** | 1. Tentar usuário/senha default (`admin/admin`), contas de serviço; 2. Verificar contas de teste criadas | Nenhuma credencial default; contas de teste apenas em staging com senhas fortes e rotacionadas | **Crítica** |
| ST-047 | A07 | **MFA ausente (admin)** | 1. Auditoria da configuração de auth | MFA obrigatório para acesso admin (TOTP/WebAuthn); código de recuperação gerado com segurança | **Alta** |
| ST-048 | A07 | **Enumeração de usuários** | 1. Login com e-mail existente x inexistente; 2. Comparar respostas, tempos e mensagens; 3. Testar "recuperar senha" para ambos | Respostas/tempos idênticos; mensagens genéricas ("se o e-mail existir, você receberá..."); sem confirmação de existência | **Média** |
| ST-049 | A07 | **Sessão não expira / logout ineficaz** | 1. Logar; 2. Aguardar tempo de inatividade; 3. Tentar reutilizar sessão após logout | Sessão expira (15 min inatividade); logout revoga o token **no servidor**; sessão antiga inválida | **Alta** |

### 1.8 A08 — Software and Data Integrity Failures

| ID | OWASP | Cenário | Passos | Resultado esperado | Severidade |
|---|---|---|---|---|---|
| ST-050 | A08 | **CSRF no formulário de contato** | 1. Criar página maliciosa que auto-envia POST para `/api/contato`; 2. Abrir logado (se aplicável) com cookie SameSite=Lax; 3. Verificar submissão | Sem cookie de autenticação no formulário público + verificação de Origin/Referer ou token CSRF; POST cross-origin rejeitado | **Alta** |
| ST-051 | A08 | **CSRF em operações de admin (futuro)** | 1. Enviar POST cross-site para rotas de mutação admin com cookie de sessão | Token CSRF obrigatório em toda mutação; rotas rejeitam requisições sem token/Origin válida; `SameSite=Strict/Lax` no cookie | **Alta** |
| ST-052 | A08 | **Mass assignment** | 1. Adicionar campos extras no POST do formulário (`role`, `admin`, `is_verified`, `approved`); 2. Verificar se são persistidos | Servidor usa allowlist de campos (zod `.pick()`/`.strict()`); campos extras rejeitados ou ignorados | **Crítica** |
| ST-053 | A08 | **Manipulação de dados via parâmetros ocultos** | 1. Alterar valores de campos hidden/readonly no formulário (ex.: `id`, `status`, `preço`, `versao`); 2. Observar persistência | Valores de campos ocultos são recalculados/validados no servidor; nunca confiados | **Alta** |
| ST-054 | A08 | **Deserialização/objetos inseguros** | 1. Enviar JSON com `__proto__`, `constructor.prototype`, chaves aninhadas em payloads; 2. Observar se o servidor processa | Payloads tratados como dados planos; nenhuma manipulação de protótipo/objeto interno | **Alta** |

### 1.9 A09 — Security Logging and Monitoring Failures

| ID | OWASP | Cenário | Passos | Resultado esperado | Severidade |
|---|---|---|---|---|---|
| ST-055 | A09 | **Ausência de logging de eventos de segurança** | 1. Executar login falho, submissão de formulário, alteração de papel (staging); 2. Verificar logs da plataforma | Eventos relevantes logados com timestamp, usuário (ID), IP e resultado; retenção definida (30–90 dias) | **Média** |
| ST-056 | A09 | **Logs com PII/dados sensíveis** | 1. Forçar erros com payloads contendo e-mails/telefones; 2. Inspecionar logs de aplicação/funções | Nenhum e-mail/telefone/mensagem nos logs; PII mascarada ou pseudonimizada (hash) | **Alta** |
| ST-057 | A09 | **Falta de monitoramento/alertas** | 1. Simular evento de segurança (força bruta, scan); 2. Verificar se alertas são gerados | Alertas configurados (login falho em série, rate limit atingido, erros 5xx, novas rotas acessadas); tempo de alerta documentado | **Média** |
| ST-058 | A09 | **Logs de auditoria inexistentes (admin)** | 1. Realizar mutações no admin (staging); 2. Verificar trilha de auditoria | Toda mutação registrada (quem, o quê, quando, de onde); trilha imutável (append-only) | **Média** |

### 1.10 A10 — SSRF

| ID | OWASP | Cenário | Passos | Resultado esperado | Severidade |
|---|---|---|---|---|---|
| ST-059 | A10 | **SSRF via URL fornecida pelo usuário** | 1. Enviar URL em campos que o servidor processe (`url`, `webhook`, `site`, `avatar`): `http://169.254.169.254/latest/meta-data/`, `http://127.0.0.1:5432/`, `file:///etc/passwd`, `http://[::1]/` | Servidor nunca busca URLs fornecidas pelo usuário em produção; se houver, allowlist de domínios + bloqueio de IPs privados/link-local | **Alta** |
| ST-060 | A10 | **SSRF em integrações (Resend/Supabase)** | 1. Auditoria: verificar se há fetch a URLs derivadas de input (ex.: preview de link, webhook) | Nenhum fetch a URL derivada de input; serviços externos chamados apenas com endpoints fixos | **Alta** |

---

## 2. Casos de teste — Segurança de Aplicações Web (Extras / Transversais)

| ID | OWASP/Categoria | Cenário | Passos | Resultado esperado | Severidade |
|---|---|---|---|---|---|
| ST-061 | A04 / **Rate limiting** | **Brute force/abuso em endpoints públicos** | 1. Disparar volume alto de POST em `/api/contato` e `/api/newsletter` de um único IP e distribuído; 2. Observar respostas | 429 após limite; `Retry-After` presente; bloqueio por IP e por e-mail; WAF também limita | **Alta** |
| ST-062 | A04 / **Spam** | **Spam de formulário automatizado** | 1. Usar bot headless preenchendo o formulário rapidamente; 2. Verificar se submissões entram no banco | Honeypot + Turnstile/rate limit bloqueiam; submissões falsas não são armazenadas; taxa de spam < 1% | **Média** |
| ST-063 | A06 / **Upload (futuro)** | **Upload de arquivo malicioso** | 1. Enviar `shell.php`, `.html` com script, executável, payload com extensão dupla (`file.jpg.php`), arquivo > limite, MIME forjado | Extensões/MIME na allowlist + verificação de **magic bytes**; renomeação com UUID; execução desabilitada; armazenamento em bucket privado com URL assinada; limite de tamanho | **Crítica** |
| ST-064 | A06 / **Upload (futuro)** | **Path traversal via nome de arquivo** | 1. Enviar nome `../../etc/passwd`, `..%2f..%2f`; 2. Verificar armazenamento | Nomes de arquivo normalizados; caminho de armazenamento controlado pelo servidor (UUID), nunca pelo cliente | **Crítica** |
| ST-065 | A08 / **Cache poisoning** | **Respostas dinâmicas com cache incorreto** | 1. Requisitar páginas dinâmicas com `Cache-Control`; 2. Verificar se PII/respostas autenticadas são cacheadas; 3. Testar Web Cache Deception (`/perfil/nonexist.css`) | Páginas autenticadas/dinâmicas com `Cache-Control: no-store`; URLs dinâmicas não cacheadas; sem cache de conteúdo privado | **Alta** |
| ST-066 | A01 / **Cookies** | **Cookie de sessão sem HttpOnly/Secure/SameSite** | 1. Inspecionar cookies no DevTools; 2. Tentar ler cookie de sessão via JS | Cookies de sessão com `HttpOnly; Secure; SameSite=Lax/Strict`; prefixo `__Host-` quando aplicável; sem cookies de sessão em `localStorage` | **Alta** |
| ST-067 | A05 / **Clickjacking** | **Página embutida em iframe de terceiros** | 1. Tentar embutir a página em iframe (POC) | `X-Frame-Options: DENY` e/ou `frame-ancestors 'none'` no CSP; página não renderiza em iframe cross-origin | **Média** |
| ST-068 | A03 / **XSS via DOM** | **XSS DOM-based** | 1. Testar sinks no código client (`innerHTML`, `eval`, `location`, `document.write`); 2. Injetar payloads via fragment/query | Nenhum sink perigoso com dado não confiável; frameworks/escapes corretos; sem `dangerouslySetInnerHTML` | **Alta** |
| ST-069 | A02 / **HSTS + preload** | **Preload do HSTS** | 1. Submeter domínio a `hstspreload.org` (uma vez confirmado); 2. Verificar header | `preload` presente e domínio elegível; todos os subdomínios HTTPS | **Média** |
| ST-070 | A02 / **TLS no full stack** | **TLS até o origin** | 1. Verificar se a conexão Edge → Origin (Vercel/Netlify → Supabase) é TLS 1.2+ | Toda a cadeia criptografada; sem tráfego interno em texto claro | **Média** |
| ST-071 | A03 / **Email abuse** | **Uso do formulário para phishing** | 1. Enviar conteúdo que simula phishing com links; 2. Verificar se o conteúdo chega íntegro em caixas; 3. Testar spam relaying | Resend com supressão de bounces/blocklist; formulário não permite relaying (destinatário fixo); sanitização de links quando exibidos | **Média** |
| ST-072 | A01 / **Info disclosure** | **Vazamento de versões/tecnologias** | 1. Analisar headers, HTML, `_next/`, pacotes servidos; 2. Verificar se versões exatas de framework/libs aparecem | Versões não expostas em headers/HTML públicos; minimização de fingerprinting | **Baixa** |
| ST-073 | A03 / **Unicode/homoglyph** | **Normalização de entrada para phishing** | 1. Enviar e-mails com homógrafos (`е@example.com` com "е" cirílico), caracteres de controle, `\u202E` RTL | Validação de e-mail normaliza/valida Unicode; caracteres de controle rejeitados; sem bypass do validador | **Média** |
| ST-074 | A04 / **Payload size** | **Payload excessivo/esgotamento de recursos** | 1. Enviar requisição de 10 MB+ ao formulário/API; 2. Observar comportamento | Limite de corpo (ex.: 10 KB) com 413; timeout definido; nenhum esgotamento de memória/CPU da função | **Média** |
| ST-075 | A04 / **XML/entidades** | **XXE (se XML for aceito)** | 1. Enviar payload XML com `<!ENTITY xxe SYSTEM "file:///etc/passwd">` se XML for aceito | XML não é aceito (JSON apenas) ou parser com entidades desabilitadas; sem leitura de arquivos | **Alta** |
| ST-076 | A07 / **Password reset (futuro)** | **Fluxo de reset de senha seguro** | 1. Solicitar reset; 2. Verificar link único, expiração, invalidação após uso | Token de reset aleatório, uso único, expira em ≤ 1h; link não reutilizável; e-mail não enumera usuário | **Alta** |

---

## 3. Casos de teste — LGPD / Privacidade

| ID | Categoria | Cenário | Passos | Resultado esperado | Severidade |
|---|---|---|---|---|---|
| ST-077 | LGPD | **Consentimento explícito e rastreável** | 1. Submeter newsletter/formulário com e sem consentimento; 2. Verificar registro do consentimento no banco | Consentimento obrigatório (opt-in); registro com data/hora, versão da política, origem e IP (hash); sem consentimento = rejeição | **Alta** |
| ST-078 | LGPD | **Registro de consentimento auditável** | 1. Inspecionar tabela `consentimentos`; 2. Verificar se é possível saber quem consentiu, quando e a qual versão da política | Tabela completa com `versao_politica`, `aceito_em`, `finalidade`, `base_legal`, `form_origin`, `ip_hash`, `email_hash`; **imutável (append-only)** — UPDATE/DELETE bloqueados por trigger | **Alta** |
| ST-079 | LGPD | **Exportação de dados (portabilidade)** | 1. Solicitar exportação dos dados de um titular (fluxo de requisição); 2. Verificar o JSON/CSV entregue | Exportação completa, legível (JSON/CSV), em formato aberto, entregue via canal seguro e autenticado ao titular; em ≤ 15 dias | **Alta** |
| ST-080 | LGPD | **Exclusão de dados (direito ao esquecimento)** | 1. Solicitar exclusão dos dados de um titular; 2. Verificar exclusão em todas as tabelas e backups | Dados excluídos em ≤ 15 dias (art. 18, VI); exclusão em todas as camadas (banco, backups, logs, cache); confirmação ao titular | **Crítica** |
| ST-081 | LGPD | **Minimização de dados** | 1. Revisar esquema do banco e campos de formulário; 2. Verificar se há campos desnecessários | Apenas nome, e-mail, empresa, cargo, telefone (formulário) e e-mail (newsletter); sem CPF, dados sensíveis ou coletas desnecessárias | **Média** |
| ST-082 | LGPD | **Retenção respeitada** | 1. Verificar job de retenção; 2. Simular prazo expirado; 3. Confirmar exclusão/anonimização automática | Dados expirados são automaticamente excluídos/anonimizados conforme política de retenção; processo audível | **Alta** |
| ST-083 | LGPD | **Acesso a dados de terceiros por outro titular** | 1. Usar endpoint de requisição de dados com identificação de outro titular | Verificação de identidade obrigatória; um titular nunca acessa dados de outro | **Crítica** |
| ST-084 | LGPD | **Política de privacidade publicada e acessível** | 1. Acessar `/privacidade`; 2. Verificar link no rodapé e nos formulários; 3. Verificar versão/última atualização | Política publicada, acessível em até 2 cliques, com data de versão, dados coletados, finalidade, direitos, DPO e canais | **Média** |
| ST-085 | LGPD | **Notificação de incidente** | 1. Testar o playbook de incidente (simulação); 2. Verificar tempos e canais de comunicação | Incidente crítico comunicado à ANPD e titulares em ≤ 48h com o conteúdo completo do art. 48; canais funcionando | **Alta** |

---

## 4. Casos de teste — Supabase direto, RLS, cache, exportações e telemetria (resposta ao red team)

> Casos adicionados na **v1.1** em resposta ao relatório de red team (RT-001 a RT-015). Estes casos atacam o Supabase como **endpoint público de fato** (REST/Auth alcançável com a `anon key` do bundle, fora do WAF/Cloudflare), a RLS por role no banco, o cache/CDN, as exportações LGPD e a telemetria de terceiros — superfícies que os casos ST-001 a ST-085 não cobriam.

| ID | OWASP/Categoria | Cenário | Passos | Resultado esperado | Severidade |
|---|---|---|---|---|---|
| ST-086 | A01 / **Supabase REST direto** | **Acesso direto à REST API do Supabase com a `anon key` do bundle (bypass de WAF/Turnstile/rate limit)** | 1. Extrair `SUPABASE_URL` e `SUPABASE_ANON_KEY` do bundle `_next/static/*.js`; 2. `GET /rest/v1/` (OpenAPI) e `GET /rest/v1/contato_mensagens?select=*`; 3. `GET /rest/v1/newsletter_assinantes`, `GET /rest/v1/consentimentos`; 4. `POST /rest/v1/contato_mensagens` com payload; 5. Repetir como role `anon`/`authenticated` (`SET ROLE`) | Todas retornam **401/403** (grants default-deny `REVOKE ALL` + RLS); nenhuma tabela com PII legível/gravável via REST; enumeração do schema via `/rest/v1/` sem sucesso; auditoria de grants via `information_schema.role_table_grants` | **Crítica** |
| ST-087 | A01 / **RLS negativo** | **Auto-promoção a admin: INSERT/UPDATE/DELETE em `usuarios_admin` como `authenticated`** | 1. Criar conta via signup (staging) e autenticar; 2. `INSERT INTO usuarios_admin (id, email, nome_exibicao, ativo) VALUES (auth.uid(), 'atk@x.com', 'Hacked', true)`; 3. `UPDATE usuarios_admin SET ativo = true` em outra linha; 4. `DELETE` de linha alheia | **403/erro** em todos: sem política de INSERT (apenas `FOR SELECT`/`FOR UPDATE`), `REVOKE INSERT` e trigger `guardar_usuarios_admin` bloqueiam; `ativo` inalterável por sessão autenticada | **Crítica** |
| ST-088 | A08 / **Mass assignment + TTL** | **Mass assignment com `status`/`criado_em` que derrota o TTL de retenção LGPD** | 1. POST `/api/contato` interceptado no Burp com campos extras `"status":"em_andamento"`, `"criado_em":"2099-01-01"`, `"id"`, `"ip_hash"`; 2. Verificar no banco os valores persistidos; 3. Simular TTL vencido com mensagem em qualquer status | Insert usa **whitelist** (zod `.strict()` + `.pick()`); `status`/`criado_em` definidos pelo **servidor** (trigger normaliza `status='novo'`, `criado_em=now()`); campos extras ignorados; job de TTL exclui mesmo com payload adulterado (ou alerta de revisão manual em tempo finito) | **Crítica** |
| ST-089 | A07 / **OAuth redirect** | **Account takeover via `redirect_to`/`redirect_uri` aberto (fase 2 — auth admin)** | 1. Montar `https://.../auth/callback?redirect_to=https://evil.com/`; 2. Logar via magic link/OAuth (staging); 3. Observar destino do código/token de sessão; 4. Testar `redirect_uri` com wildcard | Token/sessão **nunca** redirecionado para origem fora da allowlist; `redirect_to` validado server-side contra allowlist (sem wildcards); PKCE obrigatório; sem open redirect em `/auth/callback` | **Crítica** |
| ST-090 | A07 / **Auth direto** | **Brute force/credential stuffing direto em `/auth/v1/token` (fora do Cloudflare)** | 1. Extrair anon key; 2. `POST https://<ref>.supabase.co/auth/v1/token?grant_type=password` com lista de senhas (staging, dados fictícios); 3. Rotacionar IPs | Lockout/rate limit do GoTrue ativo; resposta uniforme (sem enumeração); alerta de anomalia em `/auth/v1` disparado; signup público desabilitado | **Crítica** |
| ST-091 | A07 / **Email bombing** | **Magic link/OTP bombing no Supabase Auth (fase 2)** | 1. `POST /auth/v1/magiclink` em loop (N requisições) contra e-mail de teste; 2. Verificar caixa, quota do provedor e alertas | Rate limit do provedor limita envios; alerta de anomalia dispara; quota de e-mail preservada; sem impacto para assinantes legítimos | **Alta** |
| ST-092 | A08 / **Cache poisoning** | **Cache poisoning via `X-Forwarded-Host`/`x-rewrite-url` e `Cache-Control` em respostas com PII** | 1. `GET /blog/...` com `X-Forwarded-Host: evil.com`, `x-rewrite-url` e `X-Original-URL`; 2. Verificar canonical/CSP/OG tags; 3. Verificar headers de cache em `/api/contato` e rotas autenticadas; 4. Testar Web Cache Deception em `/admin/.../x.css` | Cache key = Host + path; headers de forwarding não confiáveis **ignorados** no edge — nada reflete `evil.com`; respostas com PII/autenticadas com `Cache-Control: no-store, private`; `Vary: Cookie`/`Authorization` onde aplicável | **Alta** |
| ST-093 | A10 / **Webhook CRM** | **Replay e SSRF no webhook do CRM (fase 3)** | 1. Capturar evento legítimo e reenviar N vezes (mesma assinatura); 2. Enviar payload com `{"url":"http://169.254.169.254/latest/meta-data/"}`, `http://127.0.0.1:5432/`, `file:///etc/passwd` em qualquer campo | Replay rejeitado (idempotency key por evento); payload fora do schema zod estrito rejeitado; destino do webhook é **URL fixa em env var**, nunca derivada de input; nenhuma requisição a IP privado/link-local | **Alta** |
| ST-094 | A08 / **Webhook assinatura** | **Assinatura inválida/token em query string no webhook CRM (fase 3)** | 1. Enviar requisição com HMAC inválido; 2. Enviar segredo via query string/header previsível; 3. Medir tempo de resposta (timing) | 401 em assinatura inválida; comparação com `crypto.timingSafeEqual`; segredo **nunca** aceito via query param; sem vazamento de erro detalhado | **Alta** |
| ST-095 | A03 / **CSV/Formula injection** | **CSV/Formula injection e path traversal na exportação LGPD** | 1. Cadastrar com `empresa="=HYPERLINK(\"http://evil.com\",\"Clique aqui\")"`, `+cmd|'/C calc'!A0`, `@SUM`, nome com `../../etc/passwd` e `..%2f`; 2. Exportar dados do titular; 3. Abrir CSV no Excel/LibreOffice | Células iniciadas com `= + - @` (e tab/CR) neutralizadas (prefixo `'` ou XLSX com tipo texto); arquivo com **nome fixo gerado no servidor** (`export-lgpd-<uuid>.csv`); nenhuma fórmula executada; link de download assinado com expiração curta e uso único | **Alta** |
| ST-096 | A01 / **Export sem auth** | **Gatilho de exportação LGPD sem autenticação/identificação** | 1. Chamar endpoint de export direto com e-mail arbitrário (sem autenticação); 2. Verificar se e-mail é disparado e se resposta diferencia e-mail existente/inexistente; 3. Reusar link após expirar | **401/403** sem identificação do titular; resposta idêntica (sem enumeração); e-mail **não** enviado sem verificação de identidade; link expirado não funciona | **Alta** |
| ST-097 | A07 / **Token newsletter** | **Replay, expiração e brute force do token de confirmação da newsletter** | 1. Confirmar assinatura com token válido; 2. Reutilizar o mesmo token; 3. Tentar token expirado (>48h); 4. Brute force de 1M tentativas contra endpoint de confirmação | Token = 32 bytes CSPRNG (ou slug de alta entropia); **invalidado após o 1º uso** (token nulo/`confirmado_em` setado); expirado → rejeitado; brute force infrutífero e/ou **429** (rate limit por IP); respostas uniformes | **Alta** |
| ST-098 | A04 / **Billing DoS** | **Exaustão de quota do Resend via spam + circuit breaker de notificações** | 1. Disparar volume suficiente de submissões com IPs rotacionados (staging, quota de teste); 2. Verificar alerta de quota a 80% e circuit breaker; 3. Payload com `\r\n` em e-mail/empresa refletido em `from`/`reply-to` | Circuit breaker **global diário** de notificações ativo (parada automática); alerta de quota disparado; `from`/`reply-to` **fixos** — payload com CRLF rejeitado; corpo da notificação em texto puro, sem eco de HTML; aviso "conteúdo não confiável" para o time | **Alta** |
| ST-099 | A07 / **JWT** | **JWT forjado (`alg:none`, HS256 com anon key, `exp` vencido) em rotas admin (fase 2)** | 1. Enviar JWT `alg:none` com `sub` de admin para `/api/admin/*`; 2. JWT HS256 assinado com a `anon key`; 3. Token com `exp` no passado; 4. Claims `aud`/`iss` errados | Todos **rejeitados (401)**; validação apenas via SDK oficial `@supabase/ssr` (nunca JWT manual) ou `jose` com `algorithms:['HS256']` explícito + `aud`/`iss`/`exp`/`sub` verificados | **Alta** |
| ST-100 | A09 / **PII em logs** | **Token de confirmação/PII vazando para logs de terceiros (Sentry/plataforma/Referer)** | 1. Enviar confirmação com token na URL; 2. Verificar Referer em requisições seguintes, breadcrumbs/URLs do Sentry, access logs do CDN; 3. Verificar se IP real aparece em logs de Vercel/Cloudflare | Token **nunca em query string** (POST body ou fragmento `#token`) ou página com `Referrer-Policy: no-referrer`; Sentry com **scrubbing** de `token`/`email`/query strings e breadcrumbs sem PII; IP real de plataformas documentado como processador (DPA) | **Alta** |
| ST-101 | A03 / **XSS Markdown** | **Stored XSS via Markdown/HTML no blog (fase 2)** | 1. Publicar post de teste com `<img src=x onerror=...>`, `[clique](javascript:alert(1))`, `![alt](x" onerror=...)` em `conteudo`/`autor`; 2. Abrir a página e a API `/api/blog/[slug]` | Renderização **sem `rehype-raw`** (ou com `rehype-sanitize` + allowlist estrita); URLs com scheme allowlist (`http/https/mailto`); payloads renderizados como texto inerte; API nunca devolve HTML executável | **Alta** |
| ST-102 | A05 / **Subdomain takeover** | **CNAMEs órfãos / subdomain takeover + domínio canônico** | 1. Enumerar subdomínios (`crt.sh`, wordlist); 2. Verificar CNAMEs apontando para projetos deletados (staging/preview); 3. Testar takeover em plataforma de staging; 4. Conferir **um único domínio canônico** em todos os docs | Nenhum CNAME órfão (todo CNAME com destino **vivo**); registros DNS removidos ao desprovisionar; DNSSEC confirmado; domínio canônico único (`eliora-rh.com.br`) padronizado em todos os documentos | **Média** |
| ST-103 | A04 / **Rate limit global** | **Rate limit distribuído/global e telemetria de honeypot (botnet)** | 1. Simular botnet: 10 IPs × 5 req/h em `/api/contato` e `/api/newsletter`; 2. Verificar limite **global diário**; 3. Preencher honeypot e verificar contador/telemetria | Limite global diário (independente de IP) dispara e retorna 429; alerta de campanha (honeypot com telemetria) emitido; monitor de conexões/quota do Supabase com alerta a 80% | **Alta** |

---

## 5. Testes manuais — Roteiro (curl / navegador / Burp)

### 5.1 Via curl (rápido)

```bash
# Headers de segurança
curl -sI https://eliora.com.br

# HSTS
curl -sI https://eliora.com.br | findstr /i "strict-transport"

# Redirecionamento HTTP -> HTTPS
curl -sI http://eliora.com.br

# CORS cross-origin
curl -sI -H "Origin: https://evil.com" https://eliora.com.br/api/contato

# Métodos não autorizados
curl -s -X TRACE https://eliora.com.br -i
curl -s -X DELETE https://eliora.com.br/api/contato/1 -i

# Payloads de injeção (staging)
curl -s "https://staging.eliora.com.br/blog?busca=' OR 1=1--" -o /dev/null -w "%{http_code}\n"
curl -s -X POST https://staging.eliora.com.br/api/contato \
  -H "Content-Type: application/json" \
  -d '{"nome":"<script>alert(1)</script>","email":"a@b.com"}'

# Arquivos sensíveis
curl -s -o /dev/null -w "%{http_code}\n" https://eliora.com.br/.env
curl -s -o /dev/null -w "%{http_code}\n" https://eliora.com.br/.git/config
curl -s -o /dev/null -w "%{http_code}\n" https://eliora.com.br/security.txt
```

> **Atenção:** payloads destrutivos (`DROP TABLE`) e scans são permitidos **somente em staging**.
> Em produção, apenas testes não invasivos (GET/OPTIONS/headers).

### 5.2 Via navegador (DevTools)

| Verificação | Onde | Resultado |
|---|---|---|
| Cookies (HttpOnly/Secure/SameSite) | Aba Application → Cookies | Todos conforme ST-066 |
| CSP no console | Console → erros de CSP | Sem violações com a CSP estrita |
| XSS refletido | Injetar payload em parâmetro, verificar DOM (Estrutura) | Payload escapado |
| Clickjacking | DevTools → Console `top === self` / teste de iframe | Bloqueado (ST-067) |
| Network (respostas com dados excessivos) | Aba Network → Preview das APIs | Sem dados além do mínimo (ST-012) |
| Fingerprinting | HTML source + headers | Sem versões de libs (ST-072) |

### 5.3 Via Burp Suite (análise interativa)

| Cenário | Configuração |
|---|---|
| Interceptar e modificar payloads (trust boundary) | Proxy → Repeater: alterar campos/hidden (ST-025, ST-052) |
| Session analysis | Sequencer: coletar 100+ sessões → entropia (ST-044) |
| Enumeração de usuários | Intruder com e-mails existentes/inexistentes no login (ST-048) |
| CSRF | Gerar POC de página cross-origin que envia POST (ST-050/051) |
| Brute force | Intruder com senhas comuns → verificar lockout (ST-045) |
| Crawl/Scan automático | Burp Scanner em staging para baseline de SQLi/XSS |

---

## 6. Testes automatizados — Pipeline / CI

| Ferramenta | O que cobre | Como executar | Critério de aceite |
|---|---|---|---|
| **Lint (ESLint + configs)** | Erros comuns, imports, `dangerouslySetInnerHTML` desencorajado | `npm run lint` (CI, `--max-warnings=0`) | Zero warnings bloqueantes |
| **TypeScript strict** | Tipagem, objetos inseguros | `npx tsc --noEmit` | Zero erros |
| **`npm audit` / `pnpm audit`** | A06 — CVEs em dependências | `npm audit --audit-level=high` no CI | Sem vulnerabilidades alta/crítica (build falha se houver) |
| **`npm outdated` + Renovate/Dependabot** | Dependências desatualizadas | Agendado semanalmente | Sem pacotes desatualizados com CVE conhecida |
| **SAST — Semgrep** | Padrões inseguros no código (SQL concat, `innerHTML`, secrets hardcoded, cookies sem flags, auth ausente) | `semgrep --config=auto` no CI | Zero findings de severidade alta/crítica |
| **SAST — gitleaks / trufflehog** | Secrets no repo/histórico | `gitleaks detect` no CI + pré-commit | Zero secrets detectados |
| **DAST — OWASP ZAP Baseline** | Scan passivo de headers, misconfig, CVEs de servidor em staging | `zap-baseline.py -t https://staging... -r report.html` | Alerts de risco Alto = 0; Médios com justificativa |
| **DAST — OWASP ZAP Full (mensal)** | Scan ativo de SQLi/XSS em staging (cuidado com rate limit) | `zap-full-scan.py` em staging | SQLi/XSS alto = 0 |
| **Trivy (container/FS)** | Vulnerabilidades de imagem/arquivos | `trivy fs .` (futuro: images) | Sem CVEs críticas |
| **`testssl.sh`** | TLS/HSTS em produção | `./testssl.sh eliora.com.br` | TLS 1.3; sem cifras fracas; HSTS presente |
| **Check de headers (curl script)** | ST-029/030/031 — headers de segurança | Script no CI pós-deploy | Todos os headers obrigatórios presentes |
| **Testes de RLS/grants por role (pgTAP / script SQL)** | ST-086/087 — políticas e grants do Supabase | Executar `SET ROLE anon/authenticated` + queries negativas nas tabelas com PII (staging) | Nenhuma tabela com PII acessível/gravável como `anon`/`authenticated`; nenhuma policy `FOR ALL` em tabelas sensíveis |
| **Monitoramento de dependências (Snyk alternativo)** | CVE tracking contínuo | Dashboard + alertas | CVE alta → PR de correção em ≤ 7 dias |

### Frequência sugerida

| Escopo | Frequência |
|---|---|
| Lint + TS + audit + Semgrep + gitleaks | A cada PR (CI) |
| ZAP Baseline + testssl.sh + headers | A cada deploy em staging |
| ZAP Full | Semanal (staging) |
| Renovate/Dependabot + Trivy | Semanal |
| Auditoria de grants/RLS por role (HC-093/094) | Trimestral |
| Auditoria completa de segurança (red team leve) | Trimestral |

---

## 7. Rastreabilidade e status

| Metadado | Valor |
|---|---|
| Total de casos | 103 (ST-001 a ST-103) |
| Categorias OWASP cobertas | A01, A02, A03, A04, A05, A06, A07, A08, A09, A10 (Top 10 completo) |
| Categorias extras | Rate limiting/brute force, spam, upload de arquivos, cookies, clickjacking, cache poisoning, email injection, XSS DOM, TLS/HSTS, LGPD (consentimento, exportação, exclusão, retenção, minimização, notificação de incidente) |
| Resposta ao red team | ST-086 a ST-103 — Supabase REST/Auth direto, RLS por role, mass assignment/TTL, OAuth redirect, cache poisoning, webhook CRM, CSV injection, token de confirmação, quota/billing DoS, JWT forjado, PII em logs, XSS Markdown, CNAMEs órfãos, rate limit distribuído |
| Critério de entrada | 100% dos casos críticos/alta = PASS antes de ir para produção |
| Critério de bloqueio | Qualquer caso **Crítico** falhando bloqueia o release |

---

## 8. Revisão

| Versão | Data | Alterações | Autor |
|---|---|---|---|
| 1.0 | 2026-08-12 | Versão inicial | Time de Segurança |
| 1.1 | 2026-08-13 | Adicionados ST-086 a ST-103 (resposta ao red team RT-001 a RT-015): Supabase REST/Auth direto, RLS por role, mass assignment/TTL, OAuth redirect, cache poisoning, webhook CRM, CSV injection, token de confirmação, billing DoS, JWT forjado, PII em logs, XSS Markdown, CNAMEs órfãos, rate limit distribuído; alinhado ST-078 aos campos reais da tabela `consentimentos` | Equipe de Segurança |
