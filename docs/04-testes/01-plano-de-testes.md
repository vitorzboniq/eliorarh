# Plano de Testes — Site Institucional Eliora RH

| Campo | Valor |
|---|---|
| **Documento** | `01-plano-de-testes.md` |
| **Projeto** | Eliora RH — Site institucional |
| **Versão** | 1.0 |
| **Data** | 12/08/2026 |
| **Status** | Em revisão |
| **Responsável QA** | Equipe de Qualidade |

---

## 1. Introdução

Este documento define o plano de testes do site institucional da **Eliora RH**, consultoria brasileira de recursos humanos com conformidade à **LGPD**. Ele estabelece escopo, estratégia, ambientes, ferramentas, matriz de compatibilidade, critérios de entrada/saída, definição de pronto, responsabilidades, cronograma e gestão de defeitos.

Os casos de teste detalhados estão nos documentos complementares:

| Documento | Arquivo |
|---|---|
| Casos de teste funcionais | `docs/04-testes/02-casos-teste-funcionais.md` |
| Casos de teste de responsividade | `docs/04-testes/03-casos-teste-responsividade.md` |
| Casos de teste de performance e acessibilidade | `docs/04-testes/04-casos-teste-performance-acessibilidade.md` |

> **Atenção:** a estratégia e os casos de **segurança** (proteção de dados LGPD, headers HTTP, validação de entrada, SSRF/XSS, limites de formulário, etc.) possuem documentação própria em `docs/03-seguranca/`. Este plano referencia e coordena essa frente, mas não a duplica.

---

## 2. Objetivos

1. Garantir que todas as rotas e funcionalidades descritas na especificação funcionem corretamente.
2. Garantir conformidade com **WCAG 2.1 nível AA** (acessibilidade).
3. Garantir metas de performance (LCP < 2,5 s, CLS < 0,1, INP < 200 ms).
4. Garantir SEO técnico (meta tags, Open Graph, JSON-LD, sitemap, robots.txt).
5. Garantir conformidade com a **LGPD** no tratamento de dados do formulário de contato e banner de cookies.
6. Reduzir defeitos em produção por meio de testes em múltiplos navegadores, dispositivos e conexões.

---

## 3. Escopo

### 3.1 Escopo do projeto (contexto)

- **Stack:** Next.js + Tailwind CSS + shadcn/ui.
- **Rotas:** `/`, `/servicos`, `/sobre`, `/blog`, `/blog/[slug]`, `/contato`, `/obrigado`, `/privacidade`, `/termos`, `/404`.
- **Âncoras da home:** `#significado`, `#pilares`, `#treinamentos`, `#abordagem`, `#valores`, `#contato`.
- **Funcionalidades testadas:**
  - Formulário de contato com consentimento LGPD e validação.
  - Canais de contato (mailto, WhatsApp, Instagram, LinkedIn).
  - SEO técnico (meta tags, Open Graph, JSON-LD, sitemap, robots).
  - Performance (LCP, CLS, INP, TTFB).
  - Acessibilidade WCAG 2.1 AA.
  - Banner de cookies (aceitar/rejeitar/gerenciar, persistência).
  - Menu mobile (burger), scroll reveal, header com mudança ao rolar.
  - Newsletter e blog (futuro — ver roadmap `docs/05-roadmap/`).

### 3.2 Dentro do escopo de teste

- Testes funcionais, de regressão, responsividade, acessibilidade, performance, compatibilidade e integração com o fluxo de envio do formulário.
- Testes de consentimento e persistência de cookies (LGPD).
- Validação de páginas de erro (404), privacidade e termos.

### 3.3 Fora do escopo de teste (nesta fase)

- Segurança ofensiva aprofundada — coberta em `docs/03-seguranca/` (ex.: testes de penetração, validação de headers de segurança, rate limiting em produção).
- Testes de carga/escala além da conexão 4G simulada.
- Conteúdo editorial do blog (qualidade de redação) — somente estrutura e renderização são testadas.
- Newsletter (funcionalidade futura, sem testes nesta fase).

---

## 4. Estratégia de Testes

A estratégia combina **testes automatizados** (Playwright, Lighthouse, pa11y) com **testes manuais guiados** (exploratório, leitores de tela, dispositivos reais) e prioriza **criticidade e risco** do fluxo de LGPD.

### 4.1 Teste Funcional

- Automatizado com **Playwright** (Chromium + WebKit + Firefox projects).
- Cobre: navegação, âncoras, menu mobile, formulário de contato (incluindo casos de erro), links de contato, banner de cookies, páginas estáticas e 404.
- Casos em `02-casos-teste-funcionais.md` (CT-F-XXX).

### 4.2 Teste de Regressão

- Execução do **suite completo (smoke + funcional + responsividade)** a cada merge na `main` e antes de cada release em staging.
- Conjunto smoke (menor) executado a cada commit no pipeline de CI.
- Critério: nenhum caso **Blocker** ou **Crítico** regredido; no máximo 1 defeito **Maior** em aberto (ver gestão de defeitos, seção 10).

### 4.3 Teste de Responsividade

- Automatizado (Playwright viewports) + manual em dispositivos reais.
- Breakpoints de teste: 320 px, 375 px, 480 px, 768 px, 1024 px, 1440 px+ (breakpoints reais do CSS: 980/900/768/640/480).
- Casos em `03-casos-teste-responsividade.md` (CT-R-XXX).

### 4.4 Teste de Acessibilidade

- Automatizado com **axe-core** (via Playwright) e **pa11y**; auditoria pontual com **WAVE**.
- Verificação manual com **NVDA** (Windows) e **VoiceOver** (macOS/iOS).
- Critério: WCAG 2.1 nível AA, zero violações de severidade crítica/séria.
- Casos em `04-casos-teste-performance-acessibilidade.md` (CT-A-XXX).

### 4.5 Teste de Performance

- **Lighthouse** (desktop e mobile) no pipeline de CI e em auditoria manual.
- **GTmetrix** e **WebPageTest** para diagnóstico avançado (filmstrip, waterfall, testes em diferentes regiões/condições).
- Métricas-alvo na seção 4.8 e casos em CT-P-XXX.
- Monitoramento contínuo pós-release (vigilância de LCP/CLS/INP).

### 4.6 Teste de Compatibilidade

- Matriz navegador × SO × dispositivo (seção 7), executada manualmente para casos críticos e via Playwright para os principais navegadores.
- Testes com as **2 últimas versões** dos navegadores-alvo.

### 4.7 Teste de Segurança

- **Coordenado com `docs/03-seguranca/`.** Este plano apenas garante que:
  1. Os casos de segurança listados no doc de segurança sejam executados antes de cada release.
  2. Defeitos de segurança sigam o fluxo de gestão de defeitos (prioridade máxima).
  3. Aspectos de LGPD (consentimento, finalidade, minimização) sejam verificados no fluxo do formulário e cookies.
- Não duplicamos aqui os casos técnicos de segurança (headers, CSP, rate limiting, sanitização, etc.).

### 4.8 Metas de performance (linha de base)

| Métrica | Meta | Condição |
|---|---|---|
| LCP | < 2,5 s | 4G, dispositivo médio (Moto G Power / classe 450 em Lighthouse) |
| CLS | < 0,1 | Todas as páginas |
| INP | < 200 ms | Página interativa principal |
| TTFB | < 800 ms | Server-side, sem cache (Nacional) |
| Tamanho total de página | < 1 MB | Transferência em 4G |
| Lighthouse (4 categorias) | ≥ 90 | Performance, Acessibilidade, Melhores Práticas, SEO |

---

## 5. Ambientes de Teste

| Ambiente | URL/base | Propósito | Dados |
|---|---|---|---|
| **Local** | `http://localhost:3000` | Desenvolvimento, testes de feature, debugging | Dados fictícios (seed de blog, etc.) |
| **Staging** | `https://staging.eliora.com.br` (exemplo) | Pré-produção: regressão completa, UAT, testes finais | Clone anonimizado; formulário usa modo teste (sem disparar e-mail real) |
| **Produção** | `https://www.eliora.com.br` (exemplo) | Smoke test pós-deploy, monitoramento de performance | Dados reais; formulário ativo |

**Regras:**

- Nunca executar testes de envio de formulário em produção sem consentimento/plano; usar dados de teste e remover registros.
- Staging deve espelhar configuração de produção (variáveis de ambiente, dominio, certificados).
- Todos os ambientes devem ter **robots.txt** e **sitemap.xml** acessíveis (produção com indexação; staging/staging com `noindex`).
- Dados pessoais de teste devem ser fictícios (e-mails `@exemplo.com`, `@teste.com`) para evitar incidentes LGPD.

---

## 6. Ferramentas

| Ferramenta | Uso | Onde |
|---|---|---|
| **Playwright** | Automação E2E (funcional, responsividade, regressão), acessibilidade via axe-core | CI + local |
| **Lighthouse** | Performance, Acessibilidade, Melhores Práticas, SEO (score ≥ 90) | CI + manual |
| **axe-core** | Detecção automatizada de violações de acessibilidade | Playwright |
| **WAVE** | Auditoria visual complementar de contraste/estrutura | Manual |
| **pa11y** | Auditoria programática de acessibilidade | CI |
| **GTmetrix / WebPageTest** | Diagnóstico avançado: waterfall, filmstrip, throttle, regiões | Manual / auditoria |
| **NVDA** (Windows) + **VoiceOver** (macOS/iOS) | Teste manual com leitores de tela | Manual |
| **Chrome DevTools / Edge DevTools** | Throttling, Lighthouse, inspeção de rede e foco | Manual |
| **Ferramenta de captura de bugs** (GitHub Issues ou similar) | Registro e rastreio de defeitos | Gestão |

---

## 7. Matriz de Navegadores e Dispositivos

### 7.1 Navegadores (desktop)

| Navegador | Versões | SO | Automação (Playwright) | Manual |
|---|---|---|---|---|
| Google Chrome | 2 últimas (ex.: 126/127) | Windows 11, macOS | ✔ | ✔ |
| Microsoft Edge | 2 últimas | Windows 11 | ✔ | ✔ |
| Mozilla Firefox | 2 últimas | Windows 11, macOS | ✔ | ✔ |
| Apple Safari | 2 últimas | macOS Sonoma+ | ✔ (WebKit) | ✔ |

### 7.2 Dispositivos móveis

| Plataforma | Dispositivos de referência | Navegador | Automação | Manual |
|---|---|---|---|---|
| iOS | iPhone SE (375 px), iPhone 13 (390 px) | Safari | ✔ (viewport) | ✔ |
| Android | Moto G Power / Galaxy A54 (360–412 px), Pixel (412 px) | Chrome | ✔ (viewport) | ✔ |
| Tablet | iPad (768 px), iPad Pro (1024 px) | Safari/Chrome | ✔ (viewport) | ✔ |

### 7.3 Níveis de suporte

| Nível | Navegadores | Esforço de teste |
|---|---|---|
| A — Suporte total | Chrome, Edge, Firefox, Safari (últimas 2 versões) | Suite completo |
| B — Suporte básico | Versões anteriores não listadas, navegadores WebKit/Chromium alternativos | Smoke test |
| C — Não suportado | Navegadores legados (IE11, etc.) | Apenas verificação de degradação aceitável (sem bloqueio de conteúdo) |

---

## 8. Critérios de Entrada e Saída

### 8.1 Critérios de entrada (início dos testes)

- [ ] Build de staging implantada com sucesso, sem erros de compilação.
- [ ] Ambiente de staging acessível com as rotas principais respondendo HTTP 200.
- [ ] Casos de teste aprovados/revisados (documentos `02`, `03`, `04`).
- [ ] Dados de teste disponíveis (e-mails fictícios, conteúdo de blog).
- [ ] Ambiente de segurança revisado conforme `docs/03-seguranca/` (verificação mínima de headers e do formulário).
- [ ] Variáveis de ambiente de staging configuradas (formulário em modo teste).

### 8.2 Critérios de saída (aceite do release)

- [ ] **100%** dos casos **Blocker** e **Crítico** executados e **passando**.
- [ ] **100%** dos casos funcionais executados; apenas defeitos **Maior/Menor** aceitos como conhecidos e documentados (máx. 1 Maior em aberto).
- [ ] Zero violações de acessibilidade de severidade crítica/séria (axe-core/pa11y) e zero barreiras graves identificadas manualmente (NVDA/VoiceOver).
- [ ] Metas de performance atingidas em staging (LCP, CLS, INP, TTFB, tamanho < 1 MB, Lighthouse ≥ 90 nas 4 categorias).
- [ ] Fluxo LGPD validado: consentimento explícito, finalidade informada, possibilidade de rejeitar cookies, persistência correta.
- [ ] Executados os casos de segurança críticos listados em `docs/03-seguranca/` (com resultado registrado).
- [ ] Nenhum defeito de regressão em funcionalidades já lançadas.

---

## 9. Definição de Pronto (DoD)

Uma funcionalidade/entrega é considerada **pronta** quando TODOS os itens abaixo se aplicam:

1. Código implementado e revisado (code review).
2. Teste unitário/integração (se aplicável) escrito e passando.
3. Casos de teste funcionais associados criados e **executados com sucesso** (CT-F).
4. Responsividade validada nos breakpoints-alvo (CT-R) sem scroll horizontal.
5. Acessibilidade validada (CT-A) sem violações críticas; navegação completa por teclado.
6. Performance validada (CT-P) dentro das metas da seção 4.8.
7. Sem defeitos **Blocker/Crítico**; defeitos Maiores aprovados por decisão de release.
8. Aspectos LGPD revisados e documentados (consentimento do formulário e cookies).
9. SEO técnico validado (title, meta description, canonical, Open Graph, JSON-LD).
10. Documentação atualizada (funcionalidades/arquitetura/segurança conforme mudanças).

---

## 10. Gestão de Defeitos

### 10.1 Classificação de severidade

| Severidade | Descrição | Exemplos |
|---|---|---|
| **S1 — Blocker** | Impede uso ou release; sem workaround | Site não carrega; envio do formulário grava dados sem consentimento LGPD |
| **S2 — Crítico** | Funcionalidade principal quebrada; workaround ausente ou inviável | Formulário não envia; menu mobile inutilizável; 404 em rota principal |
| **S3 — Maior** | Funcionalidade degradada; workaround parcial | Validação de e-mail ausente; quebra visual em um breakpoint; foco invisível |
| **S4 — Menor** | Defeito cosmético/de baixo impacto | Texto com typo; sombra inconsistente; ícone desalinhado em 1 px |
| **S5 — Trivial** | Cosmético sem impacto | Formatação de cor de link em hover |

### 10.2 Prioridade

| Prioridade | Significado | Prazos típicos |
|---|---|---|
| **P1 — Urgente** | Bloqueia release ou expõe risco LGPD/segurança | Correção imediata, reteste em < 24 h |
| **P2 — Alta** | Funcionalidade principal afetada | Correção antes do release |
| **P3 — Média** | Degradação com workaround | Correção nesta sprint ou próxima |
| **P4 — Baixa** | Cosmético / melhoria | Agendável |

### 10.3 Fluxo de Bug

```
┌────────────┐   ┌────────────┐   ┌──────────────┐   ┌─────────────┐
│ DESCOBERTO │──▶│ TRIAGEM    │──▶│ EM CORREÇÃO  │──▶│ EM RETESTE  │
│ (novo)     │   │ (severid.  │   │ (dev)        │   │ (QA)        │
│            │   │  priorid.) │   │              │   │             │
└────────────┘   └────────────┘   └──────────────┘   └──────┬──────┘
                                                            │
                                ┌─────────────┐             │
                                │ FECHADO     │◀── aprovado ┘
                                │ (verificado)│   reprovado ──▶ EM CORREÇÃO
                                └─────────────┘
```

**Etapas do fluxo:**

1. **Descoberto:** QA (ou stakeholder) registra defeito com título, pré-condições, passos de reprodução, resultado esperado vs. obtido, evidências (screenshot/vídeo/log), ambiente, navegador/dispositivo e severidade estimada.
2. **Triagem:** QA valida reprodutibilidade, define severidade/prioridade e atribui ao responsável.
3. **Em correção:** dev corrige e aponta para reteste, informando causa e impacto.
4. **Em reteste:** QA retesta no ambiente correto; se passar, muda status para **Fechado**; se falhar, reabre com comentário (volta à correção).
5. **Fechamento:** QA verifica critérios, atualiza documentação se necessário e arquiva evidências.

**Regras:**

- Todo defeito **S1/S2 + P1** deve bloquear o release até correção e reteste.
- Defeitos **S3/P2** exigem aprovação explícita do Product Owner para lançar com pendência.
- Defeitos de segurança seguem fluxo prioritário e são registrados também em `docs/03-seguranca/`.

---

## 11. Responsabilidades

| Papel | Responsabilidade |
|---|---|
| **QA Engineer** | Criar/manter casos de teste, executar suites, registrar defeitos, triagem, reteste, relatórios de aceite |
| **Desenvolvedor(a)** | Corrigir defeitos, apoiar investigação, garantir code review e testes unitários |
| **Designer / UX** | Validar padrões visuais, acessibilidade visual e espaçamentos |
| **Product Owner** | Aprovar critérios de saída, decidir sobre defeitos Maiores em aberto, validar DoD |
| **DevOps** | Configurar ambientes, CI/CD, variáveis de ambiente, monitoramento de performance |
| **Especialista LGPD/Segurança** | Validar conformidade do fluxo de consentimento; revisar `docs/03-seguranca/` |

---

## 12. Cronograma por Fase

| Fase | Atividades | Duração estimada |
|---|---|---|
| **Fase 0 — Preparação** | Revisar especificação; definir casos de teste; configurar ferramentas e ambientes | 3 dias |
| **Fase 1 — Smoke** | Smoke test em todas as rotas; verificação de build/deploy; cabeçalhos e 404 | 1 dia |
| **Fase 2 — Funcional** | Execução do suite funcional (CT-F) em staging; registro de defeitos | 3 dias |
| **Fase 3 — Responsividade** | Execução do suite de responsividade (CT-R) em viewports e dispositivos | 2 dias |
| **Fase 4 — Acessibilidade** | axe-core/pa11y automatizados; verificação manual (NVDA/VoiceOver); correções | 3 dias |
| **Fase 5 — Performance** | Lighthouse/GTmetrix/WebPageTest; otimizações; re-auditoria | 2 dias |
| **Fase 6 — Segurança (coordenada)** | Execução dos casos de `docs/03-seguranca/`; revisão de consentimento LGPD | 2 dias (paralela) |
| **Fase 7 — Regressão completa** | Suite completo; matriz de navegadores; teste em produção pós-deploy | 2 dias |
| **Fase 8 — Relatório final** | Relatório de aceite, defeitos conhecidos, recomendações | 1 dia |

> Cronograma total estimado: **~2 semanas** para o release inicial, com ajustes conforme disponibilidade de recursos e maturidade do ambiente.

---

## 13. Riscos e Mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Disponibilidade limitada de dispositivos reais iOS/Android | Lacuna em compatibilidade | Emuladores + viewports Playwright + teste manual em ao menos 2 dispositivos reais |
| Falta de dados de teste realistas | Falso positivo/negativo | Fixtures e seed de dados documentados |
| Performance dependente de infraestrutura de staging | Métricas não representativas | Medir também em produção; comparar com baseline |
| Mudanças de conteúdo/design no meio do ciclo | Retrabalho de casos | Congelamento de escopo por release; revisão de casos |
| Variação de resultados de acessibilidade entre ferramentas | Falsa sensação de conformidade | Combinação de axe-core + pa11y + teste manual com leitores de tela |

---

## 14. Aprovações

| Nome | Papel | Assinatura/Data |
|---|---|---|
|  | QA | |
|  | Desenvolvedor(a) | |
|  | Product Owner | |
