# Requisitos — Site Eliora RH

| Campo | Valor |
|---|---|
| **Projeto** | Eliora RH — Consultoria em Recursos Humanos |
| **Documento** | 02 — Requisitos Funcionais e Não Funcionais |
| **Versão** | 1.1 |
| **Data** | 13/08/2026 |
| **Status** | Rascunho para revisão interna |
| **Responsável** | Time de Produto — Eliora RH |
| **Referência** | Documento `01-especificacao-funcional.md` (catálogo F1–F21) |
| **Nota de atualização** | Dados absorvidos: Portfólio de Treinamentos (2026) e Brand Book |

---

## 1. Introdução e objetivo

Este documento consolida os **requisitos funcionais (RF)** e **não funcionais (RNF)** do site da Eliora RH, derivados da especificação funcional (documento 01). Os requisitos são:

- **Rastreáveis**: cada RF referencia sua funcionalidade-fonte do catálogo (F1–F21), sem criar IDs divergentes;
- **Únicos**: um requisito por item, redigido no formato "O sistema deve…";
- **Testáveis**: verificáveis por critério de aceite vinculado (CA-Fxx-nn da especificação) ou por medição objetiva.

Além dos requisitos, o documento traz **user stories** (formato "Como [ator], quero [ação], para [benefício]") para as funcionalidades de maior prioridade (F1–F10 e F21).

### Nota de consistência

Os IDs de regras de negócio (RN) e critérios de aceite (CA) citados como fonte pertencem ao documento 01. Este documento **não redefine** o catálogo: F1–F21, tipos ([CORE]/[F1]/[F2]/[F3]) e fases permanecem idênticos.

---

## 2. Modelo de rastreabilidade

| ID | O que é | Origem | Formato |
|---|---|---|---|
| RF-xxx | Requisito funcional | Funcionalidade Fxx | "O sistema deve…" |
| RNF-xxx | Requisito não funcional | Categoria técnica (performance, segurança, etc.) | "O sistema deve…" |
| RN-Fxx-nn | Regra de negócio | Documento 01 | Regra de negócio |
| CA-Fxx-nn | Critério de aceite | Documento 01 | Condição → resultado |

**Resumo quantitativo:** 165 requisitos funcionais (RF-001 a RF-165) · 63 requisitos não funcionais (RNF-001 a RNF-063).

---

## 3. Requisitos funcionais

### 3.1 F1 — Landing institucional `[CORE]` (RF-001 a RF-006)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-001 | Renderizar a home com hero contendo H1 único com a tagline "Pessoas no centro. Resultados que transformam." e CTA primário visível no primeiro viewport. | F1 | Alta |
| RF-002 | Exibir as seções na ordem: Hero → A marca → Pilares → Valores → Treinamentos (F21) → Abordagem → Parceiros → CTA final → Rodapé, incluindo os 4 pilares oficiais (Estratégia de Pessoas; Treinamento e Desenvolvimento; Cultura Organizacional; Recrutamento e Seleção), a Missão, a Visão e os Valores da marca. | F1 | Alta |
| RF-003 | Permitir navegação por âncoras via hash, funcionando sem JavaScript. | F1 | Alta |
| RF-004 | Apresentar layout responsivo mobile-first em viewports de 360px a 1280px+, sem corte de conteúdo. | F1 | Alta |
| RF-005 | Exibir no rodapé: navegação, dados de contato, redes sociais, copyright e links para Política de Privacidade e Termos de Uso. | F1 | Alta |
| RF-006 | Direcionar o CTA primário para o formulário de contato (F2) ou para os canais diretos (F3). | F1 | Alta |

### 3.2 F2 — Formulário de contato com consentimento LGPD `[F1]` (RF-007 a RF-020)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-007 | Exibir formulário com campos: nome, e-mail, empresa, cargo, telefone (opcional), mensagem e caixa de consentimento obrigatória. | F2 | Alta |
| RF-008 | Validar os campos no cliente (obrigatórios, formato de e-mail, tamanho da mensagem) com mensagens específicas por campo. | F2 | Alta |
| RF-009 | Validar novamente no servidor 100% das regras do cliente, rejeitando payloads adulterados com código 422. | F2 | Alta |
| RF-010 | Bloquear o envio quando a caixa de consentimento não estiver marcada, exibindo aviso orientativo. | F2 | Alta |
| RF-011 | Registrar o consentimento de forma auditável: data/hora, ID do envio, IP (segurança) e versão da política exibida. | F2 | Alta |
| RF-012 | Incluir campo honeypot oculto e descartar silenciosamente envios preenchidos por robôs. | F2 | Alta |
| RF-013 | Aplicar rate limiting de 3 envios por IP por hora, bloqueando envios excedentes com mensagem. | F2 | Alta |
| RF-014 | Enviar e-mail de notificação à equipe Eliora a cada envio válido. | F2 | Alta |
| RF-015 | Exibir página de agradecimento após envio válido. | F2 | Alta |
| RF-016 | Impedir envio duplicado (botão desabilitado durante o envio e idempotência no servidor). | F2 | Alta |
| RF-017 | Preservar os dados preenchidos quando ocorrer erro de validação (sem perda de conteúdo). | F2 | Média |
| RF-018 | Tratar o telefone como campo opcional. | F2 | Média |
| RF-019 | Aceitar mensagens entre 10 e 2.000 caracteres. | F2 | Média |
| RF-020 | Persistir as mensagens em banco para consulta na área administrativa (F12). | F2 | Alta |

### 3.3 F3 — Canais de contato direto `[CORE]` (RF-021 a RF-025)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-021 | Abrir o WhatsApp via `https://wa.me/5544988378110` com mensagem inicial padronizada pré-preenchida. | F3 | Alta |
| RF-022 | Abrir o cliente de e-mail via `mailto:eliorarh@gmail.com` com assunto padrão. | F3 | Alta |
| RF-023 | Abrir o Instagram em nova aba com `rel="noopener"`. | F3 | Alta |
| RF-024 | Identificar cada ícone com `aria-label` e texto alternativo. | F3 | Média |
| RF-025 | Manter os links de contato funcionais sem JavaScript. | F3 | Alta |

### 3.4 F4 — Blog/Insights `[F2]` (RF-026 a RF-036)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-026 | Listar artigos ordenados por data de publicação (mais recente primeiro). | F4 | Alta |
| RF-027 | Exibir artigo pela URL `/insights/<slug>`. | F4 | Alta |
| RF-028 | Garantir slug único por artigo, emitindo redirecionamento 301 quando alterado após publicação. | F4 | Alta |
| RF-029 | Manter categorias como conjunto fechado gerenciável pelo administrador. | F4 | Média |
| RF-030 | Buscar artigos por termo no título e no corpo, com suporte a acentuação. | F4 | Média |
| RF-031 | Paginar a lista (12 artigos por página) a partir do 13º artigo. | F4 | Média |
| RF-032 | Permitir rascunho e publicação agendada de artigos. | F4 | Alta |
| RF-033 | Restringir criação e edição de artigos a editores autenticados (F12). | F4 | Alta |
| RF-034 | Manter histórico de versões de artigos publicados. | F4 | Média |
| RF-035 | Realizar exclusão lógica (soft delete) de artigos, preservando URLs indexadas. | F4 | Média |
| RF-036 | Exibir página 404 amigável para slugs inexistentes, com link para a lista. | F4 | Média |

### 3.5 F5 — Política de Privacidade + Termos de Uso `[F1]` (RF-037 a RF-042)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-037 | Publicar página de Política de Privacidade contendo: dados coletados, finalidades, bases legais, compartilhamentos, retenção, direitos do titular e dados do Encarregado. | F5 | Alta |
| RF-038 | Publicar página de Termos de Uso com uso aceitável, propriedade intelectual, limitação de responsabilidade e lei aplicável. | F5 | Alta |
| RF-039 | Exibir versão e data de atualização no topo de cada documento e links no rodapé de todas as páginas. | F5 | Alta |
| RF-040 | Disponibilizar canal de exercício de direitos do titular (formulário ou e-mail dedicado). | F5 | Alta |
| RF-041 | Registrar solicitações de titulares e sinalizar prazo de resposta de 15 dias corridos (art. 19 LGPD). | F5 | Alta |
| RF-042 | Registrar histórico de versões das políticas e referenciar a versão aceita em cada consentimento (F2/F6/F11). | F5 | Alta |

### 3.6 F6 — Banner de cookies + gerenciamento de consentimento `[F1]` (RF-043 a RF-050)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-043 | Exibir banner de consentimento no primeiro acesso, com resumo e link para a Política de Cookies. | F6 | Alta |
| RF-044 | Oferecer as opções "Aceitar todos", "Recusar não essenciais" e "Personalizar". | F6 | Alta |
| RF-045 | Carregar scripts não essenciais somente após o consentimento. | F6 | Alta |
| RF-046 | Persistir a escolha do usuário por até 12 meses, sem reapresentar o banner antes da expiração. | F6 | Alta |
| RF-047 | Permitir reabrir as preferências e revogar o consentimento a qualquer momento, desativando scripts imediatamente. | F6 | Alta |
| RF-048 | Manter o site plenamente funcional quando o usuário recusa não essenciais. | F6 | Alta |
| RF-049 | Registrar a escolha com data/hora, opção escolhida e versão da política exibida. | F6 | Alta |
| RF-050 | Apresentar cookies não essenciais desmarcados por padrão no painel de personalização (opt-in explícito). | F6 | Alta |

### 3.7 F7 — SEO técnico `[F1]` (RF-051 a RF-062)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-051 | Gerar `<title>` e `meta description` únicos por página pública. | F7 | Alta |
| RF-052 | Emitir tags Open Graph (og:title, og:description, og:image, og:url, og:type) em todas as páginas públicas. | F7 | Alta |
| RF-053 | Emitir Twitter Cards (summary_large_image) nas páginas públicas. | F7 | Média |
| RF-054 | Emitir JSON-LD do tipo `ProfessionalService`/`Organization` na home, com NAP consistente. | F7 | Alta |
| RF-055 | Gerar e publicar `sitemap.xml` com todas as URLs públicas, referenciado pelo `robots.txt`. | F7 | Alta |
| RF-056 | Publicar `robots.txt` com diretivas de rastreamento e referência ao sitemap. | F7 | Alta |
| RF-057 | Emitir `<link rel="canonical">` apontando para a URL preferida em páginas com múltiplas URLs. | F7 | Alta |
| RF-058 | Exibir breadcrumbs visíveis em páginas internas (Início > Seção > [Item]). | F7 | Média |
| RF-059 | Emitir JSON-LD `BreadcrumbList` coerente com os breadcrumbs visíveis. | F7 | Média |
| RF-060 | Atualizar o sitemap automaticamente em até 24h após a publicação de novo artigo. | F7 | Alta |
| RF-061 | Respeitar limites de título (≤ 60 caracteres) e meta description (≤ 160 caracteres). | F7 | Média |
| RF-062 | Manter dados de nome, endereço e telefone (NAP) consistentes entre site, JSON-LD e canais públicos. | F7 | Média |

### 3.8 F8 — Performance (Core Web Vitals) `[F1]` (RF-063 a RF-069)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-063 | Servir imagens em WebP/AVIF com fallback apropriado. | F8 | Alta |
| RF-064 | Aplicar carregamento preguiçoso (lazy load) a imagens abaixo da dobra. | F8 | Alta |
| RF-065 | Reservar espaço para imagens (dimensões explícitas) para evitar deslocamento de layout (CLS). | F8 | Alta |
| RF-066 | Carregar fontes com `font-display: swap` e pré-carregar o arquivo mais crítico. | F8 | Alta |
| RF-067 | Servir CSS/JS de produção minificados, sem bloqueio de renderização do conteúdo acima da dobra. | F8 | Alta |
| RF-068 | Aplicar cache de assets, compressão (gzip/brotli) e CDN quando disponível. | F8 | Média |
| RF-069 | Atender aos limites de Core Web Vitals: LCP < 2,5s, CLS < 0,1 e INP < 200ms (75º percentil, mobile). | F8 | Alta |

### 3.9 F9 — Acessibilidade WCAG 2.1 AA `[F1]` (RF-070 a RF-077)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-070 | Permitir que todas as funcionalidades sejam operáveis exclusivamente por teclado. | F9 | Alta |
| RF-071 | Exibir indicador de foco visível e com contraste adequado em todos os elementos focáveis. | F9 | Alta |
| RF-072 | Associar rótulos (`label`) a todos os campos de formulário e mensagens de erro via `aria-describedby`. | F9 | Alta |
| RF-073 | Fornecer texto alternativo (`alt`) para imagens e `aria-label` para ícones. | F9 | Alta |
| RF-074 | Utilizar semântica HTML correta (landmarks, hierarquia de títulos, tabelas). | F9 | Alta |
| RF-075 | Atender contraste mínimo de 4,5:1 (texto normal) e 3:1 (texto grande/componentes). | F9 | Alta |
| RF-076 | Respeitar `prefers-reduced-motion`, reduzindo ou desativando animações. | F9 | Média |
| RF-077 | Evitar interações exclusivas de mouse/hover e armadilhas de foco. | F9 | Alta |

### 3.10 F10 — Analytics privacy-first com consentimento `[F1]` (RF-078 a RF-084)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-078 | Impedir a execução de scripts de analytics antes do consentimento (F6). | F10 | Alta |
| RF-079 | Utilizar solução de análise cookieless ou com IP mascarado (ex.: Plausible/Umami ou GA4 consentido). | F10 | Alta |
| RF-080 | Mascarar/anonimizar endereços IP processados pela ferramenta. | F10 | Alta |
| RF-081 | Disponibilizar painel de métricas à equipe (páginas, origem, dispositivo, região aproximada). | F10 | Média |
| RF-082 | Não coletar campos de identificação pessoal (nome, e-mail) pela ferramenta. | F10 | Alta |
| RF-083 | Configurar retenção mínima compatível (recomendação GA4: 14 meses). | F10 | Média |
| RF-084 | Não degradar os limites de Core Web Vitals (F8) quando o analytics estiver ativo. | F10 | Média |

### 3.11 F11 — Newsletter com double opt-in `[F2]` (RF-085 a RF-092)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-085 | Exibir formulário de inscrição com campo de e-mail e consentimento explícito e separado. | F11 | Alta |
| RF-086 | Enviar e-mail de confirmação com link único (token) ao inscrito. | F11 | Alta |
| RF-087 | Expirar o token de confirmação após 48 horas. | F11 | Alta |
| RF-088 | Ativar a assinatura somente após o clique no link de confirmação. | F11 | Alta |
| RF-089 | Incluir link de descadastro com 1 clique em todo e-mail enviado. | F11 | Alta |
| RF-090 | Confirmar o descadastro com mensagem de sucesso ao usuário. | F11 | Média |
| RF-091 | Excluir registros provisórios não confirmados após 7 dias. | F11 | Média |
| RF-092 | Efetivar o descadastro em até 72 horas após a solicitação. | F11 | Alta |

### 3.12 F12 — Área administrativa `[F2]` (RF-093 a RF-105)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-093 | Autenticar usuários com e-mail e senha na área administrativa. | F12 | Alta |
| RF-094 | Exigir autenticação em dois fatores (MFA) para o perfil Administrador. | F12 | Alta |
| RF-095 | Controlar permissões por perfil (Administrador e Editor) — RBAC. | F12 | Alta |
| RF-096 | Proteger as rotas do painel no servidor, redirecionando usuários não autenticados ao login. | F12 | Alta |
| RF-097 | Armazenar senhas apenas com hash forte (bcrypt/argon2) e salt. | F12 | Alta |
| RF-098 | Bloquear a conta por 15 minutos após 5 tentativas de login falhas, notificando o administrador. | F12 | Alta |
| RF-099 | Encerrar sessões após 30 minutos de inatividade e após 8 horas de duração máxima. | F12 | Alta |
| RF-100 | Permitir consultar, marcar status e responder mensagens de contato (F2). | F12 | Alta |
| RF-101 | Permitir CRUD de artigos do blog com rascunho e agendamento (F4). | F12 | Alta |
| RF-102 | Permitir CRUD de depoimentos e cases (F19). | F12 | Média |
| RF-103 | Permitir gestão de usuários (criar, editar permissões, desativar) apenas para Administrador. | F12 | Alta |
| RF-104 | Registrar em log de auditoria ações críticas (login, publicação, exclusão, alteração de permissões). | F12 | Alta |
| RF-105 | Proteger todas as ações do painel contra CSRF. | F12 | Alta |

### 3.13 F13 — Integração com CRM `[F2]` (RF-106 a RF-111)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-106 | Enviar leads com consentimento válido (F2/F11) ao CRM via webhook. | F13 | Alta |
| RF-107 | Incluir no payload o registro de consentimento (data/hora e versão da política) quando suportado. | F13 | Média |
| RF-108 | Reenviar automaticamente webhooks com falha, até 5 tentativas com backoff exponencial. | F13 | Alta |
| RF-109 | Garantir idempotência do envio (mesmo payload não gera lead duplicado). | F13 | Alta |
| RF-110 | Armazenar credenciais do CRM em variáveis de ambiente/segredos, nunca em código ou no cliente. | F13 | Alta |
| RF-111 | Registrar solicitações de exclusão de titulares e refleti-las no CRM. | F13 | Média |

### 3.14 F14 — Agendamento de consulta `[F2]` (RF-112 a RF-117)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-112 | Exibir fluxo de seleção de data e horário para a consulta inicial. | F14 | Alta |
| RF-113 | Refletir a disponibilidade real dos consultores, sem overbooking. | F14 | Alta |
| RF-114 | Enviar e-mail de confirmação do agendamento. | F14 | Alta |
| RF-115 | Enviar lembretes apenas com consentimento do agendador. | F14 | Média |
| RF-116 | Permitir cancelamento e remarcação pelo link recebido no e-mail. | F14 | Alta |
| RF-117 | Aplicar antecedência mínima de 24h e limite de 1 agendamento por e-mail em 7 dias. | F14 | Média |

### 3.15 F15 — Chatbot/WhatsApp automatizado `[F3]` (RF-118 a RF-122)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-118 | Exibir widget de chat com saudação e fluxos de menu pré-definidos. | F15 | Baixa |
| RF-119 | Identificar-se como assistente virtual da Eliora RH, informando a possibilidade de atendimento humano. | F15 | Baixa |
| RF-120 | Escalar o atendimento para humano em horário comercial. | F15 | Baixa |
| RF-121 | Apresentar fallback para canais diretos (F3) em caso de falha do bot. | F15 | Baixa |
| RF-122 | Responder com mensagem programada (prazo de retorno) fora do horário comercial. | F15 | Baixa |

### 3.16 F16 — Multi-idioma PT/EN/ES (i18n) `[F3]` (RF-123 a RF-129)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-123 | Exibir seletor de idioma (PT/EN/ES) no cabeçalho e rodapé. | F16 | Baixa |
| RF-124 | Manter URL própria por idioma (`/pt/`, `/en/`, `/es/`). | F16 | Baixa |
| RF-125 | Emitir tags `hreflang` corretas entre as versões de idioma. | F16 | Baixa |
| RF-126 | Exibir textos legais (F5) e registrar consentimento no idioma exibido ao usuário. | F16 | Baixa |
| RF-127 | Oferecer detecção automática opcional pelo idioma do navegador, com troca manual. | F16 | Baixa |
| RF-128 | Exibir fallback em PT com aviso para conteúdo ainda não traduzido. | F16 | Baixa |
| RF-129 | Permitir publicação de traduções somente após revisão. | F16 | Baixa |

### 3.17 F17 — Portal do cliente `[F3]` (RF-130 a RF-135)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-130 | Autenticar acesso restrito ao portal com e-mail, senha e MFA. | F17 | Baixa |
| RF-131 | Listar entregas por projeto e permitir download de materiais/relatórios. | F17 | Baixa |
| RF-132 | Registrar acessos e downloads em auditoria (quem, o quê, quando). | F17 | Baixa |
| RF-133 | Revogar o acesso ao término do contrato em até 1 dia útil. | F17 | Baixa |
| RF-134 | Encerrar sessões por inatividade (30 min) e duração máxima (8h). | F17 | Baixa |
| RF-135 | Permitir ao consultor disponibilizar novos materiais aos clientes. | F17 | Baixa |

### 3.18 F18 — Página de vagas / oportunidades `[F3]` (RF-136 a RF-141)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-136 | Listar vagas abertas com cargo, local, regime e página de detalhe. | F18 | Baixa |
| RF-137 | Exibir formulário de candidatura com consentimento obrigatório para tratamento dos dados. | F18 | Baixa |
| RF-138 | Aceitar currículo em PDF de até 5 MB, rejeitando outros formatos com mensagem clara. | F18 | Baixa |
| RF-139 | Não solicitar dados sensíveis (origem étnica, saúde, crença) no formulário. | F18 | Baixa |
| RF-140 | Oferecer opção separada e opcional de participação em banco de talentos. | F18 | Baixa |
| RF-141 | Enviar confirmação de recebimento por e-mail e desabilitar candidaturas de vagas encerradas. | F18 | Baixa |

### 3.19 F19 — Depoimentos e cases de sucesso `[F2]` (RF-142 a RF-148)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-142 | Exibir seção de depoimentos com nome, cargo, empresa e foto opcional. | F19 | Média |
| RF-143 | Registrar consentimento explícito e autorização de uso de imagem por depoimento. | F19 | Alta |
| RF-144 | Exibir cases com contexto, desafio, solução e resultado. | F19 | Média |
| RF-145 | Condicionar a publicação de cases à autorização contratual do cliente. | F19 | Alta |
| RF-146 | Remover depoimento em até 48h após revogação do consentimento. | F19 | Alta |
| RF-147 | Exigir comprovação para números de resultado apresentados em cases (sem promessas enganosas). | F19 | Alta |
| RF-148 | Permitir gestão de depoimentos/cases pelo painel administrativo (F12) com status de autorização. | F19 | Média |

### 3.20 F20 — Quiz de diagnóstico de RH interativo `[F3]` (RF-149 a RF-155)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-149 | Apresentar quiz com 8 a 12 perguntas de múltipla escolha cobrindo os pilares de atuação. | F20 | Baixa |
| RF-150 | Calcular pontuação por pilar e exibir resultado com recomendações educacionais. | F20 | Baixa |
| RF-151 | Exibir o resultado na tela sem exigir e-mail. | F20 | Baixa |
| RF-152 | Enviar relatório completo por e-mail somente com consentimento explícito. | F20 | Baixa |
| RF-153 | Armazenar respostas sem e-mail de forma anônima e agregada. | F20 | Baixa |
| RF-154 | Limitar o envio de relatório a 1 por e-mail a cada 30 dias. | F20 | Baixa |
| RF-155 | Permitir refazer o quiz sem duplicar registros do e-mail informado. | F20 | Baixa |

### 3.21 F21 — Portfólio de Treinamentos `[F1]` (RF-156 a RF-165)

| ID | Requisito (O sistema deve…) | Fonte | Prioridade |
|---|---|---|---|
| RF-156 | Exibir a seção Portfólio de Treinamentos com as 6 trilhas: Onboarding e Integração; Times de Alta Performance; Desenvolvimento de Liderança; Cultura e Engajamento; Inteligência Emocional; Comunicação e Feedback. | F21 | Alta |
| RF-157 | Destacar a trilha Desenvolvimento de Liderança com o selo distintivo "CARRO-CHEFE". | F21 | Alta |
| RF-158 | Exibir as facilitadoras Michelly (psicóloga — Psicologia Organizacional: Desenvolvimento de Liderança, Inteligência Emocional, Comportamento Organizacional) e Giovana (pedagoga — Desenho Pedagógico, Treinamento & Desenvolvimento, Formação de Equipes). | F21 | Alta |
| RF-159 | Apresentar a metodologia em 4 etapas na ordem: Briefing → Diagnóstico → Desenho sob medida → Aplicação e acompanhamento. | F21 | Alta |
| RF-160 | Exibir os 4 formatos de entrega: In company (presencial ou online); Programas pontuais ou continuados; Acompanhamento pós-treinamento; Turmas de liderança ou times completos. | F21 | Alta |
| RF-161 | Exibir o CTA "Vamos montar seu treinamento?" direcionando ao formulário de contato (F2) ou aos canais diretos (F3). | F21 | Alta |
| RF-162 | Permitir acesso à seção pela âncora `#treinamentos` no menu de navegação, funcionando por hash sem JavaScript. | F21 | Alta |
| RF-163 | Apresentar a seção com conteúdo responsivo (360px a 1280px+), acessível (WCAG AA) e com estado de hover/focus nos cards. | F21 | Alta |
| RF-164 | Não coletar dados pessoais adicionais na seção; a conversão permanece no formulário (F2). | F21 | Alta |
| RF-165 | Registrar na finalidade LGPD do formulário (F2) que a mensagem pode mencionar "treinamento" (interesse em treinamentos). | F21 | Média |

---

## 4. Requisitos não funcionais

### 4.1 Performance (RNF-001 a RNF-007)

| ID | Requisito (O sistema deve…) | Medida de verificação |
|---|---|---|
| RNF-001 | Apresentar LCP < 2,5s no 75º percentil para usuários móveis reais. | Relatório CrUX/RUM ou teste em laboratório |
| RNF-002 | Apresentar CLS < 0,1 no 75º percentil. | CrUX/RUM |
| RNF-003 | Apresentar INP < 200ms no 75º percentil. | CrUX/RUM |
| RNF-004 | Obter pontuação ≥ 90 em Performance no Lighthouse (perfil mobile). | Lighthouse |
| RNF-005 | Responder com TTFB < 0,8s em conexão de referência (cache miss). | Teste de carga/DevTools |
| RNF-006 | Manter peso total da página inicial ≤ 1,5 MB em carga inicial (imagens otimizadas). | DevTools/WebPageTest |
| RNF-007 | Aplicar compressão (gzip/brotli) e cache de assets estáticos. | Inspeção de headers |

### 4.2 Segurança (RNF-008 a RNF-018)

| ID | Requisito (O sistema deve…) | Medida de verificação |
|---|---|---|
| RNF-008 | Servir todo o tráfego exclusivamente por HTTPS, com HSTS ativo. | Inspeção de headers/SSL Labs |
| RNF-009 | Suportar apenas TLS 1.2 ou superior. | SSL Labs |
| RNF-010 | Aplicar Content Security Policy (CSP) restritiva. | Headers de resposta |
| RNF-011 | Aplicar headers de segurança (X-Frame-Options, X-Content-Type-Options, Referrer-Policy). | Headers de resposta |
| RNF-012 | Sanitizar toda entrada do usuário e codificar saídas (prevenção a XSS e injeção). | Testes de segurança (OWASP) |
| RNF-013 | Proteger todas as ações mutáveis contra CSRF. | Testes de segurança |
| RNF-014 | Armazenar senhas com bcrypt/argon2 e salt (nunca texto plano). | Revisão de código/banco |
| RNF-015 | Exigir MFA para o perfil Administrador. | Teste funcional |
| RNF-016 | Aplicar rate limiting em login, formulários e webhooks. | Teste de carga |
| RNF-017 | Manter segredos e credenciais fora do código (variáveis de ambiente). | Revisão de repositório |
| RNF-018 | Executar backups periódicos e plano de resposta a incidentes com notificação em até 48h (art. 48 LGPD). | Teste de restore/documentação |

### 4.3 Usabilidade (RNF-019 a RNF-024)

| ID | Requisito (O sistema deve…) | Medida de verificação |
|---|---|---|
| RNF-019 | Apresentar layout responsivo mobile-first a partir de 320px de largura. | Teste em viewports |
| RNF-020 | Preservar dados preenchidos em formulários diante de erros de validação. | Teste funcional |
| RNF-021 | Permitir iniciar contato em até 3 cliques a partir de qualquer página. | Teste de fluxo |
| RNF-022 | Exibir mensagens de erro claras e acionáveis, no idioma da página. | Revisão de UX |
| RNF-023 | Manter navegação e identidade visual consistentes em todas as páginas. | Revisão de design |
| RNF-024 | Usar tipografia legível (tamanho base ≥ 16px e altura de linha ≥ 1,5). | Revisão de estilo |

### 4.4 Acessibilidade (RNF-025 a RNF-031)

| ID | Requisito (O sistema deve…) | Medida de verificação |
|---|---|---|
| RNF-025 | Atender WCAG 2.1 nível AA em todas as páginas públicas. | Auditoria (axe/WAVE) + manual |
| RNF-026 | Permitir operação completa por teclado. | Teste manual de teclado |
| RNF-027 | Exibir foco visível em todos os elementos interativos. | Auditoria visual |
| RNF-028 | Atender contraste 4,5:1 (texto normal) e 3:1 (texto grande/UI). | Ferramenta de contraste |
| RNF-029 | Fornecer `alt`, `aria-label` e rótulos de formulário em todos os componentes. | Auditoria automatizada |
| RNF-030 | Respeitar `prefers-reduced-motion`. | Teste de sistema |
| RNF-031 | Apresentar 0 erros de nível A/AA nas páginas principais. | axe (Lighthouse) |

### 4.5 Compatibilidade de navegadores (RNF-032 a RNF-036)

| ID | Requisito (O sistema deve…) | Medida de verificação |
|---|---|---|
| RNF-032 | Suportar as 2 últimas versões principais de Chrome, Edge, Firefox e Safari (desktop). | Teste em matriz de navegadores |
| RNF-033 | Suportar Safari iOS ≥ 15 e Chrome Android nas versões atuais. | Teste em dispositivos |
| RNF-034 | Manter o conteúdo essencial funcional sem JavaScript. | Teste com JS desabilitado |
| RNF-035 | Apresentar HTML válido conforme o validador W3C (sem erros críticos). | Validator.w3.org |
| RNF-036 | Renderizar corretamente entre 360px e 1920px de largura. | Teste responsivo |

### 4.6 SEO (RNF-037 a RNF-042)

| ID | Requisito (O sistema deve…) | Medida de verificação |
|---|---|---|
| RNF-037 | Manter título e meta description únicos e dentro dos limites por página. | Crawl/inspeção |
| RNF-038 | Emitir Open Graph e Twitter Cards válidos. | Validador de cards/OG |
| RNF-039 | Apresentar JSON-LD válido (Organization/ProfessionalService, BreadcrumbList). | Teste de dados estruturados |
| RNF-040 | Publicar sitemap.xml, robots.txt, canonical e hreflang corretos. | Crawl |
| RNF-041 | Exibir breadcrumbs consistentes com a hierarquia real. | Inspeção |
| RNF-042 | Evitar páginas órfãs e oferecer 404 amigável. | Crawl |

### 4.7 LGPD / Privacidade (RNF-043 a RNF-052)

| ID | Requisito (O sistema deve…) | Medida de verificação |
|---|---|---|
| RNF-043 | Não coletar nenhum dado pessoal antes do consentimento. | Teste de rede (DevTools) |
| RNF-044 | Registrar consentimentos de forma auditável (quem, quando, versão da política). | Auditoria de registros |
| RNF-045 | Atender solicitações de titulares em até 15 dias (arts. 18–19). | Teste de fluxo + SLA |
| RNF-046 | Publicar os dados do Encarregado (DPO) na Política de Privacidade. | Revisão de conteúdo |
| RNF-047 | Aplicar tabela de retenção por tipo de dado (minimização, art. 6º). | Revisão de banco |
| RNF-048 | Coletar apenas os campos estritamente necessários à finalidade. | Revisão de formulários |
| RNF-049 | Criptografar dados em trânsito (TLS) e em repouso (banco/backups). | Auditoria de infraestrutura |
| RNF-050 | Aplicar controle de acesso com mínimo privilégio e trilhas de auditoria. | Revisão RBAC + logs |
| RNF-051 | Manter Registro das Operações de Tratamento (ROPA, art. 37) atualizado. | Documentação |
| RNF-052 | Firmar contratos de proteção de dados (art. 39) com todos os operadores (CRM, e-mail, CDN, analytics). | Gestão de fornecedores |

### 4.8 Disponibilidade (RNF-053 a RNF-057)

| ID | Requisito (O sistema deve…) | Medida de verificação |
|---|---|---|
| RNF-053 | Alcançar disponibilidade mensal de 99,5%. | Monitoramento de uptime |
| RNF-054 | Monitorar disponibilidade e alertar a equipe em falhas. | Configuração de monitoramento |
| RNF-055 | Garantir RPO ≤ 24h (backups) e RTO ≤ 4h (recuperação). | Teste de restore |
| RNF-056 | Degradar com graça quando serviços de terceiros falharem (analytics, CRM, agenda). | Teste de injeção de falha |
| RNF-057 | Registrar erros e alertar automaticamente a equipe técnica. | Observabilidade |

### 4.9 Manutenibilidade (RNF-058 a RNF-063)

| ID | Requisito (O sistema deve…) | Medida de verificação |
|---|---|---|
| RNF-058 | Utilizar componentes reutilizáveis e arquitetura modular. | Revisão de arquitetura |
| RNF-059 | Manter documentação de setup, implantação e operação. | Revisão de docs |
| RNF-060 | Versionar conteúdo (políticas, artigos) e código com versionamento semântico. | Controle de versão |
| RNF-061 | Automatizar build e implantação (CI/CD). | Pipeline |
| RNF-062 | Executar lint e testes automatizados no pipeline. | Pipeline |
| RNF-063 | Externalizar configurações por ambiente (sem valores fixos em código). | Revisão de código |

---

## 5. User stories — funcionalidades prioritárias (F1–F10 e F21)

### F1 — Landing institucional

| ID | User story |
|---|---|
| US-F01-01 | Como **gestor de PME**, quero **entender rapidamente o que a Eliora RH faz na primeira tela**, para **decidir se vale continuar navegando**. |
| US-F01-02 | Como **visitante**, quero **acessar pilares e abordagem por âncoras**, para **encontrar a informação relevante sem esforço**. |
| US-F01-03 | Como **potencial cliente**, quero **um CTA visível sem rolagem**, para **iniciar o contato em qualquer dispositivo**. |
| US-F01-04 | Como **pessoa com deficiência**, quero **navegar por teclado e leitor de tela**, para **acessar o mesmo conteúdo com autonomia**. |

### F2 — Formulário de contato com consentimento LGPD

| ID | User story |
|---|---|
| US-F02-01 | Como **gestor interessado**, quero **preencher um formulário curto com consentimento claro**, para **solicitar contato sem fricção**. |
| US-F02-02 | Como **titular de dados**, quero **saber exatamente o que será feito com meus dados e poder recusar**, para **conceder consentimento informado**. |
| US-F02-03 | Como **consultor Eliora**, quero **receber notificação e registro de cada solicitação**, para **responder leads rapidamente**. |
| US-F02-04 | Como **administrador**, quero **evitar spam e envios duplicados**, para **manter a base de contatos limpa e segura**. |

### F3 — Canais de contato direto

| ID | User story |
|---|---|
| US-F03-01 | Como **visitante**, quero **falar pelo meu canal preferido (WhatsApp, e-mail, redes)**, para **resolver dúvidas sem preencher formulário**. |
| US-F03-02 | Como **visitante no celular**, quero **links que abrem o aplicativo correto**, para **conversar com um toque**. |
| US-F03-03 | Como **usuário de leitor de tela**, quero **ícones identificados com texto alternativo**, para **entender a função de cada link**. |

### F4 — Blog/Insights

| ID | User story |
|---|---|
| US-F04-01 | Como **gestor**, quero **ler artigos sobre gestão de pessoas**, para **aplicar boas práticas na minha empresa**. |
| US-F04-02 | Como **leitor**, quero **buscar e filtrar por categoria**, para **encontrar rapidamente o tema de interesse**. |
| US-F04-03 | Como **editor Eliora**, quero **publicar e agendar artigos pelo painel**, para **manter o blog atualizado sem ajuda técnica**. |
| US-F04-04 | Como **leitor de buscadores**, quero **URLs amigáveis e indexáveis**, para **encontrar os artigos pelo Google**. |

### F5 — Política de Privacidade + Termos de Uso

| ID | User story |
|---|---|
| US-F05-01 | Como **visitante**, quero **ler a Política de Privacidade**, para **entender como meus dados são tratados**. |
| US-F05-02 | Como **titular**, quero **um canal para exercer meus direitos**, para **solicitar exclusão ou correção dos meus dados**. |
| US-F05-03 | Como **consultor Eliora**, quero **documentos com versão e data**, para **garantir transparência e conformidade**. |

### F6 — Banner de cookies + gerenciamento de consentimento

| ID | User story |
|---|---|
| US-F06-01 | Como **visitante**, quero **escolher quais cookies aceito**, para **proteger minha privacidade**. |
| US-F06-02 | Como **visitante que recusa**, quero **que o site continue funcionando**, para **não ser penalizado pela recusa**. |
| US-F06-03 | Como **administrador**, quero **manter as preferências acessíveis para revogação**, para **cumprir o direito de revogação do titular**. |

### F7 — SEO técnico

| ID | User story |
|---|---|
| US-F07-01 | Como **profissional de marketing**, quero **metadados e Open Graph configurados**, para **que links compartilhados tenham boa aparência**. |
| US-F07-02 | Como **gestor**, quero **encontrar a Eliora no Google com informações corretas**, para **confiar antes de contatar**. |
| US-F07-03 | Como **editor**, quero **novos artigos no sitemap automaticamente**, para **acelerar a indexação**. |

### F8 — Performance

| ID | User story |
|---|---|
| US-F08-01 | Como **visitante no celular**, quero **que o site carregue rápido**, para **não desistir antes de ver o conteúdo**. |
| US-F08-02 | Como **usuário com conexão lenta**, quero **imagens otimizadas e lazy load**, para **navegar sem travamentos**. |
| US-F08-03 | Como **analista de marketing**, quero **Core Web Vitals dentro dos limites**, para **manter boa posição orgânica**. |

### F9 — Acessibilidade WCAG 2.1 AA

| ID | User story |
|---|---|
| US-F09-01 | Como **usuário de teclado**, quero **percorrer todo o site sem mouse**, para **acessar todas as funções**. |
| US-F09-02 | Como **pessoa com baixa visão**, quero **contraste adequado e textos redimensionáveis**, para **ler com conforto**. |
| US-F09-03 | Como **pessoa sensível a movimento**, quero **animações reduzidas**, para **evitar desconforto ao navegar**. |

### F10 — Analytics privacy-first com consentimento

| ID | User story |
|---|---|
| US-F10-01 | Como **analista**, quero **métricas de audiência**, para **avaliar o desempenho do site**. |
| US-F10-02 | Como **visitante**, quero **que a medição respeite minha escolha de privacidade**, para **não ser rastreado sem consentimento**. |
| US-F10-03 | Como **administrador**, quero **uma solução cookieless e leve**, para **não impactar performance nem exigir banner desnecessário**. |

### F21 — Portfólio de Treinamentos

| ID | User story |
|---|---|
| US-F21-01 | Como **gestor**, quero **conhecer as trilhas de treinamento disponíveis**, para **escolher o programa ideal para minha equipe**. |
| US-F21-02 | Como **gestor de liderança**, quero **identificar rapidamente o treinamento de Desenvolvimento de Liderança (carro-chefe)**, para **priorizar a formação dos meus líderes**. |
| US-F21-03 | Como **visitante**, quero **entender quem conduz e como os treinamentos são construídos (facilitadoras e metodologia)**, para **confiar na abordagem antes de contratar**. |
| US-F21-04 | Como **gestor interessado**, quero **acionar o CTA "Vamos montar seu treinamento?"**, para **iniciar um contato específico sobre treinamentos**. |

---

## 6. Priorização (MoSCoW) e fases

| Funcionalidade | Fase | MoSCoW | Justificativa |
|---|---|---|---|
| F1 Landing | — | Must | Base do site; já existe como landing |
| F2 Formulário LGPD | F1 | Must | Conversão principal; sem ele o site não gera leads |
| F3 Canais diretos | — | Must | Já presente; canais de confiança |
| F4 Blog | F2 | Should | Autoridade e tráfego orgânico |
| F5 Políticas | F1 | Must | Pré-requisito legal de F2/F6/F11 |
| F6 Banner de cookies | F1 | Must | Pré-requisito de conformidade (F10 e terceiros) |
| F7 SEO técnico | F1 | Should | Crescimento orgânico desde o lançamento |
| F8 Performance | F1 | Should | Condição para conversão e ranking |
| F9 Acessibilidade | F1 | Should | Inclusão e reputação |
| F10 Analytics | F1 | Should | Métricas sem riscos de privacidade |
| F11 Newsletter | F2 | Should | Nutrição de leads |
| F12 Área administrativa | F2 | Must | Habilita F4, F19 e gestão de mensagens |
| F13 Integração CRM | F2 | Could | Automatiza a operação comercial |
| F14 Agendamento | F2 | Could | Reduz atrito do primeiro contato |
| F15 Chatbot | F3 | Would | Automação futura de atendimento |
| F16 Multi-idioma | F3 | Would | Expansão internacional |
| F17 Portal do cliente | F3 | Would | Consolidação do relacionamento |
| F18 Vagas | F3 | Would | Atração de talentos da própria consultoria |
| F19 Depoimentos/cases | F2 | Could | Prova social com alto valor |
| F20 Quiz de diagnóstico | F3 | Would | Geração de leads qualificados |
| F21 Portfólio de Treinamentos | F1 | Must | Conteúdo institucional prioritário (Portfólio 2026); conversão direta via CTA e F2 |

**Regra de precedência:** Fase 1 (F2, F5, F6, F7, F8, F9, F10, F21) só é considerada concluída quando todos os requisitos RF/RNF associados atenderem aos critérios de aceite do documento 01 e aos RNF de qualidade (segurança, LGPD, performance, acessibilidade).

---

## 7. Critérios globais de aceite (Definition of Done)

Além dos critérios por funcionalidade (CA-Fxx-nn), toda entrega de fase deve atender:

| ID | Critério global |
|---|---|
| DoD-01 | Todos os RF e RNF da fase implementados e verificados por teste. |
| DoD-02 | Zero erros de nível A/AA nas páginas entregues (auditoria automatizada). |
| DoD-03 | Core Web Vitals dentro dos limites (LCP < 2,5s; CLS < 0,1; INP < 200ms) na entrega. |
| DoD-04 | Nenhuma coleta de dados antes do consentimento (verificação de rede). |
| DoD-05 | Políticas (F5) publicadas, revisadas juridicamente e vinculadas aos consentimentos. |
| DoD-06 | Canal de direitos do titular operacional e com SLA de 15 dias. |
| DoD-07 | Registro de operações de tratamento (ROPA) atualizado com os fluxos entregues. |
| DoD-08 | Senhas com hash forte, HTTPS/HSTS, headers de segurança e CSP ativos. |
| DoD-09 | Conteúdo revisado pela marca (tom, pilares, visão, valores e posicionamento Eliora RH). |
| DoD-10 | Testes de segurança básicos (OWASP Top 10) executados sem achados críticos. |

---

## 8. Glossário

| Termo | Definição |
|---|---|
| RF | Requisito funcional — comportamento que o sistema deve apresentar |
| RNF | Requisito não funcional — qualidade, restrição ou atributo técnico |
| US | User story — requisito em formato de valor para o usuário |
| MoSCoW | Técnica de priorização (Must, Should, Could, Would) |
| ROPA | Registro das Operações de Tratamento (LGPD, art. 37) |
| CWV | Core Web Vitals (LCP, CLS, INP) |
| RBAC | Controle de acesso baseado em perfis |
| MFA | Autenticação em múltiplos fatores |
| CSP | Content Security Policy — política de segurança de conteúdo |
| HSTS | HTTP Strict Transport Security |
| DPA | Data Processing Agreement — contrato de proteção de dados |
| Double opt-in | Confirmação da inscrição em duas etapas |

---

## 9. Controle de versão

| Versão | Data | Autor | Descrição |
|---|---|---|---|
| 0.1 | 12/08/2026 | Time de Produto | Rascunho inicial para revisão interna |
| 1.0 | — | — | Versão consolidada após revisões (pendente) |
| 1.1 | 13/08/2026 | HR & Consulting | Dados absorvidos: Portfólio de Treinamentos (2026) e Brand Book — novos RF-156 a RF-165 (F21), RFs de F1/F3 atualizados, user stories F21 |

**Próximos passos sugeridos:** revisão jurídica das bases legais, validação com a equipe de desenvolvimento e detalhamento de casos de teste (documento `04-testes`).
