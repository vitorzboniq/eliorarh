# Roadmap e Priorização — Site Eliora RH

> **Status:** Aprovado para execução | **Versão:** 1.1 | **Data:** 13/08/2026
> **Nota de atualização:** Dados absorvidos: Portfólio de Treinamentos (2026) e Brand Book — o conteúdo de treinamentos (F21) entra já na Fase 1 como conteúdo institucional prioritário; a seção pode evoluir para uma landing própria `/treinamentos` como incremento futuro.
> **Escopo:** Site institucional `eliora-rh` (consultoria brasileira de RH — dados sensíveis, sujeitos à LGPD)
> **Ponto de partida:** Landing page estática em HTML único (`Eliora_RH Landing Page.html`, ~414 KB, pt-BR)
> **Leitor-alvo:** Stakeholders, squad de produto/engenharia, DPO e jurídico

---

## 1. Metodologia de priorização

A priorização combina **três técnicas complementares**, aplicadas em cascata:

1. **MoSCoW** — classifica cada item do catálogo funcional em *Must / Should / Could / Won't-have-now*, servindo de moldura para o P0–P3.
2. **Matriz Valor × Esforço** — posiciona os itens em quadrantes (*Quick wins*, *Big bets*, *Fill-ins*, *Time sinks*) para ordenar a execução dentro de cada faixa.
3. **Modificador de risco/conformidade** — exclusivo deste projeto: por ser uma empresa de RH que coleta dados pessoais sensíveis (LGPD, art. 5º e 11), **itens de segurança e conformidade legal sobem ao topo mesmo quando o valor de negócio direto é baixo**. Um risco de vazamento ou de não-conformidade é um risco de existência do negócio, não um custo.

### Fórmula de pontuação (RICE simplificado com peso de risco)

```
Escore = ((Alcance × Impacto × Confiança) / Esforço) + Bônus_de_Risco
```

| Fator | Escala | Peso no projeto |
|---|---|---|
| **Alcance** | nº estimado de visitantes/leads impactados | 1× |
| **Impacto** | 0,25–3 (3 = receita/conversão direta) | 1× |
| **Confiança** | 50–100% (certeza na estimativa) | 1× |
| **Esforço** | dias-homem (dh) estimados | divisor |
| **Bônus de risco** | +0,5 a +1,5 para itens de segurança/LGPD | **soma** |

**Regra de ouro da priorização:** *segurança e legal primeiro → conversão e confiança depois → diferenciação por último.*
Um item P0 só é considerado **concluído** se seu critério de saída for verificável e auditável (testes, scans, checklist de conformidade).

---

## 2. Lista ordenada de prioridades (catálogo funcional)

A numeração dos IDs é **imutável** e corresponde ao catálogo funcional. A ordem abaixo é a ordem de execução recomendada.

### P0 — Crítico (bloqueante de lançamento)

| # | Item | Por que está aqui (justificativa) |
|---|---|---|
| **1** | **Segurança base** (HTTPS/HSTS, headers, CSP, validação server-side, anti-spam, secrets, LGPD) | **Fundação de tudo.** Sem CSP/headers corretos e sem validação server-side, qualquer formulário (item 3) é um vetor de ataque; dados de RH exfiltráveis = multa LGPD (até 2% do faturamento) + dano reputacional irreparável. Bloqueia lançamento por si só. |
| **2** | **Landing institucional responsiva + acessível** (base existe) | É a vitrine e o único ativo existente; precisa estar funcional, responsiva e com estrutura semântica mínima antes de qualquer incremento. A base reduz o esforço — é um *quick win* estrutural. **Inclui a seção Portfólio de Treinamentos (F21)**, conteúdo institucional prioritário absorvido do Portfólio 2026. |
| **3** | **Formulário de contato funcional e seguro** (consentimento LGPD, anti-spam, notificação) | **Objetivo nº 1 do site: conversão de leads.** Sem formulário não existe captação. Precisa nascer seguro (honeypot, rate-limit, sanitização, consentimento registrado com audit trail) e notificar a equipe comercial. |
| **4** | **SEO técnico base** (meta, Open Graph, JSON-LD, sitemap, robots) | Tráfego orgânico é o canal de menor custo para B2B de RH. Sem sitemap/JSON-LD a página fica invisível a buscadores e às prévias de compartilhamento (WhatsApp/LinkedIn — principais canais do setor). |
| **5** | **Performance (Core Web Vitals dentro do budget)** | Landing atual tem ~414 KB em um único HTML — carregamento lento corrói conversão e ranqueamento (Google indexa por CWV). Budget alvo: LCP < 2,5 s, INP < 200 ms, CLS < 0,1. |
| **6** | **Acessibilidade WCAG 2.1 AA** | Obrigação legal (Lei 13.146/2015 — Estatuto da Pessoa com Deficiência) e fator de confiança para um público que consome conteúdo de RH/diversidade. Auditoria e correção antes do lançamento. |
| **7** | **Política de privacidade + termos + banner de cookies/consentimento** | **Pré-requisito legal para coletar qualquer dado** (item 3) e **pré-requisito técnico para qualquer analytics** (item 8). Sem consentimento registrado, toda a coleta de dados é ilegal retroativamente. |

### P1 — Alto (primeiro incremento pós-lançamento)

| # | Item | Por que está aqui |
|---|---|---|
| **8** | **Analytics privacy-first** (Plausible/Umami ou GA4 consentido) | Dados para decisão de marketing, mas **somente após** o banner de consentimento (item 7). Preferência por Plausible/Umami: sem cookies, sem necessidade de consentimento individualizado, menor superfície de exposição de dados. |
| **9** | **Blog + área administrativa simples** (login, CRUD de posts, gestão de mensagens) | Blog é o principal motor de SEO e autoridade no nicho de RH. O admin dá autonomia à equipe sem depender de devs e centraliza a gestão das mensagens do formulário (item 3) em um lugar só. |
| **10** | **Pipeline de testes automatizados** (unit, e2e, lint, security scans no CI) | Segurança e estabilidade são promessas do produto. CI com testes + scan (ex.: OWASP ZAP, npm audit, SAST) é o que impede regressões de segurança a cada deploy. Quanto antes no ciclo, mais barato. |
| **11** | **Monitoramento** (Sentry, uptime, alertas) | Um site de consultoria que cai quando o lead quer falar = lead perdido. Monitoramento dá visibilidade de erros (Sentry), disponibilidade e alertas proativos antes que o cliente reclame. |

### P2 — Médio (3–6 meses)

| # | Item | Por que está aqui |
|---|---|---|
| **12** | **Newsletter com double opt-in** | Nutrição de leads de baixo custo. O **double opt-in é obrigatório** para conformidade LGPD e para qualidade da base. Depende de infraestrutura de e-mail (transacional/marketing) já contratada. |
| **13** | **Integração CRM** (RD Station/HubSpot via webhook) | O formulário (item 3) gera leads que hoje precisam ser inseridos manualmente no CRM. Automação via webhook elimina atrito, garante SLA de follow-up e permite relatórios de funil. |
| **14** | **Agendamento de consulta (Calendly)** | Reduz fricção na conversão: o lead agenda direto no calendário da consultora. Baixo esforço, impacto alto em taxa de conversão de oportunidades. |
| **15** | **Depoimentos e cases de sucesso** | Prova social é o que mais converte em B2B de serviços. Exige curadoria + consentimento dos clientes para uso de imagem/dados (LGPD). |
| **16** | **Página de vagas/oportunidades** | Atende recrutamento da própria Eliora e reforça posicionamento. Baixo esforço, valor de marca e employer branding. |

### P3 — Futuro (6–12+ meses)

| # | Item | Por que está aqui (e não antes) |
|---|---|---|
| **17** | **Chatbot/WhatsApp automatizado** | Alto valor em conversão, mas exige infraestrutura de mensageria, curadoria de conteúdo e atendimento humano de backup. Não deve antecipar os canais básicos (form + e-mail) ainda imaturos. |
| **18** | **Multi-idioma PT/EN/ES** | Somente justificável quando houver demanda internacional real ou tráfego inbound estrangeiro mensurável. Alto custo de manutenção de conteúdo. |
| **19** | **Quiz de diagnóstico de RH interativo** | Excelente captação de leads qualificados, mas é peça de diferenciação — só compensa quando a base do funil (SEO, blog, newsletter) já gera tráfego suficiente para alimentá-lo. |
| **20** | **Portal do cliente (área restrita)** | Maior projeto individual: exige autenticação robusta, autorização por papel, gestão de sessões e, por tratar dados de RH, **controle de acesso rigoroso + auditoria completa**. Só faz sentido com base de clientes consolidada. |
| **21** | **Checkout/e-commerce de consultorias** | Produto mais complexo: gateway de pagamento (PCI DSS), contrato digital, gestão de impostos. Depende de definição comercial de produto empacotado. Fica por último porque nenhuma consultoria começa vendendo online. |

---

## 3. Roadmap por fases

> Timeline assume equipe de **1 dev sênior full-stack + 1 design/UX part-time + 1 pessoa de conteúdo/comercial (20% do tempo)**.
> Dias-homem (dh) são estimativas de referência — revisar a cada fase.

### Fase 0 — Fundação e Segurança (semanas 1–2)

**Objetivo:** tornar a base técnica segura, auditável e pronta para receber dados. Nada de incremento antes da fundação.

| Entregáveis (IDs) | Esforço (dh) |
|---|---|
| 1 — Segurança base: HTTPS/HSTS, security headers, CSP, secrets em env vars, plano de resposta a incidente | 6–8 |
| 2 — Landing responsiva + semântica (revisão da base existente) | 3–4 |
| 5 — Performance base: compressão, minificação, cache estático, budget CWV inicial | 2–3 |
| 6 — Auditoria de acessibilidade inicial (WCAG 2.1 AA) | 2–3 |
| 7 — Minuta legal: política de privacidade, termos, banner de consentimento (com jurídico/DPO) | 3–4 |

**Critérios de saída da Fase 0:**
- Headers de segurança e CSP válidos e verificados via scanner externo (ex.: securityheaders.com) sem alertas críticos.
- Nenhum secret em código (gitignore, env vars, secret manager).
- Banner de consentimento implementado e persistindo escolha (cookie/prévia autorização); documentos legais publicados e revisados por DPO.
- Lighthouse > 90 em performance e acessibilidade em viewport móvel 360 px.

**Estimativa total: ~16–22 dh (2,5–3,5 semanas).**

---

### Fase 1 — Lançamento (semanas 3–6)

**Objetivo:** lançar o site captando leads com segurança e visibilidade, no ar para o público.

| Entregáveis (IDs) | Esforço (dh) |
|---|---|
| 3 — Formulário de contato: validação server-side, anti-spam (honeypot + rate-limit + CAPTCHA leve), consentimento LGPD com registro, notificação por e-mail | 5–7 |
| 4 — SEO técnico: meta, Open Graph, JSON-LD (Organization + Service), sitemap.xml, robots.txt | 2–3 |
| 5 — Performance final dentro do budget (CWV alvo: LCP < 2,5 s, INP < 200 ms, CLS < 0,1) | 2–3 |
| 6 — Acessibilidade: correções da auditoria da Fase 0 + testes com leitor de tela (NVDA/VoiceOver) | 3–4 |
| 11 — Monitoramento mínimo: uptime + erros (Sentry) desde o lançamento | 1–2 |
| **F21 — Portfólio de Treinamentos**: seção institucional na landing (trilhas, facilitadoras, metodologia, formatos, CTA "Vamos montar seu treinamento?") | 2–4 |

**Critérios de saída da Fase 1 (checklist de lançamento):**
- Formulário testado ponta-a-ponta (envio, validação, bloqueio de spam, confirmação de consentimento registrada).
- CWV verificado em campo (PageSpeed Insights) dentro do budget por 2 semanas consecutivas.
- Sitemap submetido ao Google Search Console; previews de Open Graph validados.
- Redirecionamento HTTP→HTTPS com HSTS ativo; zero erros de console.
- Teste de envio real por um membro da equipe comercial — lead chega no e-mail correto.
- Seção Portfólio de Treinamentos (F21) publicada e validada: 6 trilhas, selo carro-chefe, facilitadoras, metodologia, formatos e CTA funcionais (inclui âncora `#treinamentos`).

**Estimativa total: ~15–23 dh (3–4 semanas) + 2 semanas de observação pós-lançamento.**

> **Incremento futuro:** a seção F21 (Portfólio de Treinamentos) pode evoluir para uma landing própria em `/treinamentos`, com páginas detalhadas por trilha, quando houver tráfego e demanda que justifiquem (backlog incremental — item B13).

---

### Fase 2 — Crescimento (meses 2–4)

**Objetivo:** transformar o site em máquina de geração de demanda com dados e operação autônoma.

| Entregáveis (IDs) | Esforço (dh) |
|---|---|
| 8 — Analytics privacy-first (Plausible/Umami; GA4 apenas se consentimento individualizado) | 2–3 |
| 9 — Blog + admin: login (2FA), CRUD de posts, gestão de mensagens, editor de conteúdo | 12–16 |
| 10 — Pipeline CI: unit, e2e (Playwright), lint, security scans (SAST + dependências + ZAP) | 6–8 |
| 11 — Monitoramento evoluído: alertas (uptime, erro, sentry), dashboard | 2–3 |
| 12 — Newsletter double opt-in (infra de e-mail + formulário + confirmação) | 4–6 |
| 13 — Integração CRM via webhook (RD Station/HubSpot) | 3–5 |

**Critérios de saída da Fase 2:**
- CI **verde obrigatório** para merge; scans de segurança sem achados críticos.
- Blog com ≥ 4 posts publicados pela equipe sem intervenção de dev.
- Newsletter com fluxo de confirmação (double opt-in) e base crescendo sem reclamação de spam.
- Leads do formulário aparecendo automaticamente no CRM; SLA de follow-up monitorado.
- Analytics ativo com dados confiáveis (funis, fontes, páginas) e sem disparo de cookies antes do consentimento.

**Estimativa total: ~29–41 dh (5–7 semanas de calendário).**

---

### Fase 3 — Maturidade (meses 4–12+)

**Objetivo:** diferenciação, escala e produtos digitais — executados apenas com base operacional consolidada.

| Entregáveis (IDs) | Esforço (dh) |
|---|---|
| 14 — Agendamento (Calendly) integrado à página de contato | 2–3 |
| 15 — Depoimentos e cases (curadoria + consentimento LGPD + página) | 4–6 |
| 16 — Página de vagas | 2–4 |
| 17 — Chatbot/WhatsApp automatizado (com fallback humano) | 10–15 |
| 18 — Multi-idioma PT/EN/ES (i18n + redirecionamento) | 12–18 |
| 19 — Quiz de diagnóstico de RH (captura qualificada de leads) | 8–12 |
| 20 — Portal do cliente (auth robusta, RBAC, auditoria de acesso) | 20–30 |
| 21 — Checkout/e-commerce de consultorias (gateway PCI, contrato digital) | 15–25 |

**Critérios de saída (por incremento, não por fase inteira):**
- Cada entrega segue o mesmo padrão: segura (scan no CI), testada (e2e), acessível, monitorada.
- Portal/checkout com **pen test externo** antes de produção e trilha de auditoria completa.
- Multi-idioma só avança com evidência de demanda (tráfego internacional ≥ 10% ou pedido comercial real).

**Estimativa total: ~73–113 dh, distribuídos em incrementos contínuos (6–12+ meses).**

---

## 4. Matriz Valor × Esforço

| ID | Item | Valor | Esforço | Quadrante |
|---|---|---|---|---|
| 1 | Segurança base | ★★★★★ (risco existencial) | Médio (6–8 dh) | **Crítico — fazer primeiro** |
| 2 | Landing responsiva/acessível | ★★★★ | Baixo | Quick win |
| 3 | Formulário de contato | ★★★★★ | Médio | **Big bet / Must** |
| 4 | SEO técnico base | ★★★★ | Baixo | Quick win |
| 5 | Performance/CWV | ★★★★ | Baixo | Quick win |
| 6 | Acessibilidade WCAG 2.1 AA | ★★★★ (legal) | Médio | Must (não-negociável) |
| 7 | Privacidade/termos/banner | ★★★★★ (legal) | Baixo | **Crítico — fazer primeiro** |
| 8 | Analytics privacy-first | ★★★ | Baixo | Quick win |
| 9 | Blog + admin | ★★★★ | Alto (12–16 dh) | Big bet |
| 10 | CI de testes/segurança | ★★★★ (qualidade) | Médio | Investimento estrutural |
| 11 | Monitoramento | ★★★★ (estabilidade) | Baixo | Quick win |
| 12 | Newsletter double opt-in | ★★★★ | Médio | Big bet / Must (LGPD) |
| 13 | Integração CRM | ★★★★ | Baixo–Médio | Quick win |
| 14 | Agendamento (Calendly) | ★★★ | Baixo | Quick win |
| 15 | Depoimentos/cases | ★★★★ | Médio | Big bet (prova social) |
| 16 | Página de vagas | ★★★ | Baixo | Fill-in |
| 17 | Chatbot/WhatsApp | ★★★★ | Alto | Big bet (pós-fundação) |
| 18 | Multi-idioma | ★★★ | Alto | Time sink até haver demanda |
| 19 | Quiz de RH | ★★★ | Médio–Alto | Big bet (diferenciação) |
| 20 | Portal do cliente | ★★★★★ (estratégico) | Muito alto (20–30 dh) | Time sink — requer fundação |
| 21 | Checkout/e-commerce | ★★★★ | Muito alto | Time sink — último |

> **Leitura:** itens 1, 3, 7 são inegociáveis e saem do quadrante puramente "valor×esforço" por peso legal/segurança. Itens 2, 4, 5, 8, 11, 13, 14, 16 são *quick wins* a executar entre os itens pesados. Itens 20 e 21 só entram em quadro com produto consolidado e time dedicado.

---

## 5. Dependências

| Item | Depende de | Motivo |
|---|---|---|
| 3 — Formulário | 1 — Segurança base | Validação server-side, CSP e rate-limit precisam existir antes de expor input público |
| 3 — Formulário | 7 — Termos/privacidade/consentimento | Não se pode coletar dado sem política publicada e consentimento implementado |
| 4 — SEO | 2 — Landing base | SEO otimiza o que já existe |
| 5 — Performance | 2 — Landing base | Métricas só fazem sentido sobre estrutura final |
| 8 — Analytics | 7 — Banner de consentimento | Qualquer rastreamento exige consentimento prévio; preferir solução sem cookies (Plausible/Umami) |
| 8 — Analytics | 1 — CSP | CSP precisa liberar explicitamente os domínios de telemetria |
| 9 — Blog | Admin (mesmo item 9) | Não existe blog sem backend/CRUD — o admin é o mesmo deliverable |
| 9 — Admin (mensagens) | 3 — Formulário | Gestão de mensagens consome os leads do formulário |
| 10 — CI de testes | 3, 9 (código em repositório) | Testes automatizam a regressão das funcionalidades existentes |
| 11 — Monitoramento | 1 — CSP | Domínio do Sentry/uptime precisa estar na CSP |
| 12 — Newsletter | 8 — Analytics (base) | Medir eficiência da captação exige telemetria |
| 12 — Newsletter | Infra de e-mail (Resend/SendGrid/Plataforma) | Double opt-in exige envio de e-mail transacional de confirmação |
| 13 — CRM | 3 — Formulário | O webhook consome os leads capturados |
| 13 — CRM | 10 — Testes (desejável) | Webhooks quebram silenciosamente — testar no CI |
| 14 — Agendamento | 3 — Formulário (página de contato) | Calendly entra na página de conversão existente |
| 15 — Depoimentos | 7 — Consentimento | Uso de nome/imagem de clientes exige autorização LGPD documentada |
| 17 — Chatbot/WhatsApp | 13 — CRM | Respostas e handoff humano dependem de fluxo de leads organizado |
| 19 — Quiz | 12 — Newsletter + 9 — Blog | Precisam gerar tráfego para o quiz ter volume |
| 20 — Portal | 9 — Auth/admin + 1 — Segurança | Reusa autenticação; exige RBAC e auditoria já na fundação |
| 21 — Checkout | 20 — Portal (recomendado) | Cobrança e contrato digital operam sobre conta de cliente |

**Dependências críticas do caminho crítico:** `1 → 7 → 3 → (9/10/13) → 12 → 17 → 20/21`

---

## 6. Riscos principais e mitigações

| # | Risco | Prob. | Impacto | Mitigações |
|---|---|---|---|---|
| R1 | **Vazamento de dados pessoais de RH** (formulário/admin) | Baixa | **Crítico** (multa LGPD até 2% do faturamento, ações indenizatórias, perda de contratos) | Segurança desde a Fase 0 (CSP, headers, validação server-side, secrets); minimização de dados (coletar só o essencial); criptografia em trânsito e em repouso; scan de segurança no CI; pen test antes de portal/checkout; plano de resposta a incidente + notificação à ANPD em 72h. |
| R2 | **Não-conformidade LGPD por falta de consentimento/registro** | Média | Alto | Banner de consentimento com escolha persistida; registro (log) de consentimento com data/hora/versão da política; double opt-in na newsletter; auditoria jurídica antes do lançamento. |
| R3 | **Formulário alvo de spam/abuso** | Alta | Médio | Honeypot + rate-limit por IP/sessão + CAPTCHA leve (cloudflare turnstile/hcaptcha); validação estrita server-side; fila/quarentena para mensagens suspeitas. |
| R4 | **Performance degradada** (HTML único de 414 KB + fontes) | Média | Médio | Compressão (gzip/brotli), minificação, subset de fontes, lazy-load, cache edge/CDN, orçamento de bundle no CI, medição contínua de CWV. |
| R5 | **Baixa conversão pós-lançamento** | Média | Alto | Fase 2 foca em analytics + CRM para aprender rápido; testes A/B (backlog incremental); agendamento Calendly como atalho de conversão. |
| R6 | **Dependência de terceiros** (fontes Google, Calendly, CRM, e-mail) | Média | Baixo–Médio | CSP restritiva por domínio; fallback local de fontes (self-host); monitoramento de uptime externo; contratos e SLAs com fornecedores; revisão de DPA (aditivo LGPD) com cada fornecedor. |
| R7 | **Escopo/porte do admin estourar a estimativa** | Média | Médio | MVP enxuto de admin (CRUD + login 2FA + roles), sem CMS completo; estourou 16 dh → cortar features (ex.: editor rich → markdown) e não a segurança. |
| R8 | **Conteúdo jurídico desatualizado** (privacidade/termos) | Média | Alto | Revisão semestral com DPO/jurídico; versionamento da política; banner sinaliza mudança e solicita novo consentimento quando relevante. |
| R9 | **Saída de membro-chave** (1 dev sênior) | Baixa | Alto | Documentação das decisões (este roadmap), padrões de código, CI com review obrigatório, bus factor mitigado por repositório versionado e comentários de arquitetura. |

---

## 7. Backlog de melhorias incrementais (ordenado por importância)

Itens pequenos, executáveis entre fases ou em janelas de 0,5–2 dh. Ordem = custo-benefício.

| # | Melhoria | Justificativa | Esforço |
|---|---|---|---|
| B1 | **Compressão e otimização de imagens** (WebP/AVIF, srcset, lazy-load) | Maior impacto visual de performance restante | 1–2 dh |
| B2 | **Self-host de fontes** (remover Google Fonts da CSP/CDN externa) | Reduz dependência, melhora LCP, alinha à LGPD (menos terceiros) | 1 dh |
| B3 | **Cache edge/CDN com TTL explícito** | Corte de latência global e custo de origem | 1 dh |
| B4 | **Página 404 amigável + redirects canônicos** | UX e SEO | 0,5–1 dh |
| B5 | **Testes A/B de CTA e copy** (variantes de título/botão) | Otimização de conversão de baixo custo | 1–2 dh/frame |
| B6 | **PWA (manifest + service worker offline básico)** | Melhora re-engajamento mobile; só após performance sólida | 3–4 dh |
| B7 | **Dark mode (respeitando `prefers-color-scheme`)** | Percepção de modernidade; baixo custo com tokens de cor existentes | 1–2 dh |
| B8 | **Formulário multi-etapa / melhoria de UX de contato** | Reduz atrito; testar com A/B antes | 2–3 dh |
| B9 | **Search Console + Bing Webmaster + monitoramento de indexed pages** | Verificação de eficácia do SEO técnico | 0,5 dh |
| B10 | **RSS do blog + auto-share em redes sociais** | Distribuição de conteúdo gratuita | 1 dh |
| B11 | **Micro-interações e animações de scroll (mínimas)** | Refino de percepção de marca (usar com moderação — acessibilidade) | 1–2 dh |
| B12 | **Sitemap de imagens + dados estruturados de FAQ/Article** | Ganho incremental de SEO | 1 dh |
| B13 | **Landing própria `/treinamentos`** (desmembrar a seção F21 em página dedicada, com detalhamento por trilha e páginas internas) | Escala o Portfólio de Treinamentos (conteúdo institucional prioritário absorvido do Portfólio 2026) quando houver tráfego/leads que justifiquem | 3–5 dh |

---

## 8. Métricas de sucesso por fase (KPIs)

> Baseline a medir antes da Fase 1 (landing atual) para comparar evolução.

| Fase | KPI primário | KPI secundário | Meta |
|---|---|---|---|
| **Fase 0 — Fundação** | Nota de segurança (headers/CSP scanner) | Acessibilidade (Lighthouse/axe) | Zero alertas críticos; Lighthouse ≥ 90 |
| **Fase 1 — Lançamento** | **Taxa de conversão de leads** (envios de formulário ÷ visitas) | CWV: LCP < 2,5 s, INP < 200 ms, CLS < 0,1; Tempo de carregamento (FCP) < 1,8 s | Conversão ≥ 2% (referência setor B2B); 100% de sessões dentro do budget |
| **Fase 2 — Crescimento** | **Leads qualificados/mês** (MQL) | Taxa de rejeição < 45%; páginas/sessão ≥ 2,5; artigos indexados; tempo médio de página blog ≥ 2 min; uptime ≥ 99,9% | Crescimento mensal ≥ 10% de MQL; zero achados críticos em scans |
| **Fase 3 — Maturidade** | **Custo por oportunidade (CPO)** e revenue impact | NPS de clientes no portal; taxa de confirmação da newsletter ≥ 85%; taxa de agendamento ≥ 30% dos leads quentes; ticket resolvido no chatbot ≥ 40% sem humano | Redução de CPO trimestral; uptime ≥ 99,95% |

**Métricas transversais (todas as fases):**
- **Uptime:** ≥ 99,9% (alvo 99,95% na maturidade).
- **Tempo de carregamento:** FCP < 1,8 s, LCP < 2,5 s (móvel 4G).
- **Taxa de rejeição:** < 45% global, < 35% em páginas de conversão.
- **Segurança:** zero incidentes classificados como críticos; tempo de correção de achados < 5 dias úteis.
- **Acessibilidade:** auditorias recorrentes sem violações críticas de WCAG 2.1 AA.

---

## Resumo executivo — Top 5 prioridades

Ordem final das 5 prioridades máximas (as que definem o sucesso do lançamento):

1. **#1 Segurança base** — HTTPS/HSTS, headers, CSP, validação server-side, anti-spam, secrets, LGPD (fundação de tudo; risco existencial).
2. **#7 Privacidade + termos + banner de consentimento** — pré-requisito legal para coletar qualquer dado.
3. **#3 Formulário de contato seguro** — o objetivo nº 1 do site; nasce com consentimento e anti-spam.
4. **#2 Landing responsiva + acessível** — a vitrine que converte o tráfego trazido pelo SEO.
5. **#4 SEO técnico base** — traz o tráfego qualificado que o formulário converte (seguido de perto por #5 Performance/CWV, que protege a conversão e o ranqueamento).

> Regra prática da sequência: **proteger (1, 7) → capturar (3) → apresentar (2) → atrair (4, 5)**. Nada de analytics, blog ou integrações antes de a base estar segura e legalmente conformes.
