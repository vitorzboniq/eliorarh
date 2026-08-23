# Especificação Funcional — Site Eliora RH

| Campo | Valor |
|---|---|
| **Projeto** | Eliora RH — Consultoria em Recursos Humanos |
| **Documento** | 01 — Especificação Funcional (catálogo F1–F21) |
| **Versão** | 1.1 |
| **Data** | 13/08/2026 |
| **Status** | Rascunho para revisão interna |
| **Nota de atualização** | Dados absorvidos: Portfólio de Treinamentos (2026) e Brand Book |
| **Responsável** | Time de Produto — Eliora RH |
| **Classificação** | Interno — uso da equipe de desenvolvimento e consultores |

---

## 1. Introdução

### 1.1 Objetivo

Este documento descreve, em nível funcional, **todas as funcionalidades planejadas** para o site da Eliora RH, da landing page atual (estática, arquivo único em HTML/CSS/JS) até a evolução para um site completo, seguro, responsivo e compatível com a **LGPD (Lei nº 13.709/2018)**.

O documento serve como fonte de verdade para:

- Estimativa e planejamento por fase (CORE, Fase 1, Fase 2, Fase 3);
- Redação dos requisitos funcionais e não funcionais (documento `02-requisitos.md`);
- Validação com o cliente e com a equipe de desenvolvimento;
- Identificação precoce de pontos sensíveis de tratamento de dados pessoais.

### 1.2 Escopo

**Dentro do escopo:** as 21 funcionalidades do catálogo (F1–F21), seus usuários, regras de negócio, critérios de aceite, dependências e pontos de adequação à LGPD.

**Fora do escopo:** decisão de arquitetura técnica (stack, hospedagem), código-fonte, testes automatizados e plano de implantação — tratados nos documentos das demais pastas (`02-arquitetura`, `03-seguranca`, `04-testes`, `05-roadmap`, `06-auditoria`).

### 1.3 Referências

- Landing page atual: `Eliora_RH Landing Page.html`;
- LGPD — Lei nº 13.709/2018 (em especial arts. 6º, 7º, 9º, 11, 18, 37, 39 e 42);
- WCAG 2.1 nível AA;
- Core Web Vitals (LCP, CLS, INP) — métricas do Google.

### 1.4 Nota jurídica

As **bases legais indicadas neste documento são avaliações preliminares de engenharia de privacidade** e devem ser confirmadas por assessoria jurídica especializada antes da publicação (recomenda-se revisão ao final de cada fase, conforme guias da ANPD).

---

## 2. Contexto do projeto

**Marca:** Eliora RH — "Pessoas no centro. Resultados que transformam."

Consultoria de RH com sede em **Campo Mourão, PR**, que une **estratégia de negócio** e **cuidado genuíno com as pessoas**. Público-alvo: **empresas de pequeno e médio porte** do Brasil.

**Posicionamento e conteúdo existente (já validado na landing):**

- **Pilares (Brand Book):** Estratégia de Pessoas · Treinamento e Desenvolvimento · Cultura Organizacional · Recrutamento e Seleção;
- **Abordagem (processo):** Diagnóstico → Estratégia → Implementação → Acompanhamento;
- **Valores:** Pessoas no centro · Ética e transparência · Excelência técnica · Escuta ativa · Transformação com propósito;
- **Visão:** Ser reconhecida como referência em consultoria de RH que une estratégia de negócio e cuidado genuíno com as pessoas;
- **Significado da marca:** do hebraico *El* ("Deus") + *Or* ("luz") — "Deus é minha luz"; o monograma representa a organização e a pessoa entrelaçadas, caminhando na mesma direção;
- **Missão:** transformar a gestão de pessoas em vantagem estratégica para as organizações, promovendo desenvolvimento humano, cultura saudável e resultados consistentes;
- **Tom de voz (Brand Book):** Humana · Clara · Confiante · Inspiradora.

**Canais de contato:** e-mail (`eliorarh@gmail.com`), WhatsApp/telefone (`+55 44 98837-8110`) e Instagram (`@eliora.rh`).

**Estado atual:** landing page estática em arquivo único (HTML/CSS/JS), sem formulário funcional, sem políticas de privacidade e sem coleta de dados. **Objetivo da evolução:** site institucional completo com formulário de contato consentido, blog, área administrativa e recursos de marketing — todos em conformidade com a LGPD.

---

## 3. Visão geral do catálogo de funcionalidades

**Legenda de tipo:** `[CORE]` já existe na landing atual · `[F1]` Fase 1 (lançamento do site) · `[F2]` Fase 2 · `[F3]` Fase 3 (futuro).

> **Correspondência com a arquitetura:** `[CORE]` ↔ **Fase 0** da arquitetura (landing estática atual); Fases 1–3 idênticas às da arquitetura (ver `02-arquitetura/01-arquitetura.md`, §1, tabela de fases).

| ID | Funcionalidade | Tipo | Fase | Prioridade | Breve descrição |
|---|---|---|---|---|---|
| F1 | Landing institucional | [CORE] | — | Alta | Hero, significado, pilares, abordagem, valores e CTA |
| F2 | Formulário de contato com consentimento LGPD | [F1] | 1 | Alta | Captura de leads com validação, anti-spam e notificação |
| F3 | Canais de contato direto | [CORE] | — | Alta | mailto, WhatsApp `wa.me`, Instagram |
| F4 | Blog/Insights | [F2] | 2 | Média | Lista de artigos, artigo por slug, categorias, busca, admin |
| F5 | Política de Privacidade + Termos de Uso | [F1] | 1 | Alta | Documentos legais de transparência |
| F6 | Banner de cookies + gerenciamento de consentimento | [F1] | 1 | Alta | Consentimento para analytics e scripts não essenciais |
| F7 | SEO técnico | [F1] | 1 | Alta | Meta, Open Graph, JSON-LD, sitemap, robots, canonical |
| F8 | Performance (Core Web Vitals) | [F1] | 1 | Alta | LCP<2,5s, CLS<0,1, INP<200ms, imagens otimizadas |
| F9 | Acessibilidade WCAG 2.1 AA | [F1] | 1 | Alta | Teclado, foco, contraste, ARIA, reduced-motion |
| F10 | Analytics privacy-first com consentimento | [F1] | 1 | Média | Plausible/Umami ou GA4 consentido |
| F11 | Newsletter com double opt-in | [F2] | 2 | Média | Captura de e-mails com confirmação em duas etapas |
| F12 | Área administrativa | [F2] | 2 | Alta | Login, gestão de mensagens, CRUD de posts |
| F13 | Integração com CRM (RD Station/HubSpot) | [F2] | 2 | Média | Envio de leads via webhook |
| F14 | Agendamento de consulta (Calendly/agenda) | [F2] | 2 | Média | Marcação de conversa inicial |
| F15 | Chatbot/WhatsApp automatizado | [F3] | 3 | Baixa | Atendimento inicial automatizado |
| F16 | Multi-idioma PT/EN/ES (i18n) | [F3] | 3 | Baixa | Internacionalização do conteúdo |
| F17 | Portal do cliente | [F3] | 3 | Baixa | Área restrita com materiais e relatórios |
| F18 | Página de vagas / oportunidades | [F3] | 3 | Baixa | Divulgação e candidatura |
| F19 | Depoimentos e cases de sucesso | [F2] | 2 | Média | Prova social com consentimento |
| F20 | Quiz de diagnóstico de RH interativo | [F3] | 3 | Baixa | Autoavaliação que gera contato qualificado |
| F21 | Portfólio de Treinamentos | [F1] | 1 | Alta | Facilitadoras, metodologia, 6 trilhas, formatos e CTA — Portfólio 2026 |

---

## 4. Convenções adotadas

| Convenção | Significado |
|---|---|
| **RN-Fxx-nn** | Regra de negócio da funcionalidade Fxx (ex.: RN-F02-01) |
| **CA-Fxx-nn** | Critério de aceite testável da funcionalidade Fxx (ex.: CA-F02-01) |
| **RF-xxx** | Requisito funcional (ver documento `02-requisitos.md`) |
| **RNF-xxx** | Requisito não funcional (ver documento `02-requisitos.md`) |
| Prioridade | Alta (bloqueia lançamento) / Média (desejável na fase) / Baixa (pode aguardar) |

Critérios de aceite são escritos de forma **objetiva e testável**: descrevem condição + resultado observável, sem depender de interpretação.

---

## 5. Especificações detalhadas

---

### F1 — Landing institucional `[CORE]`

**Descrição**

É a página principal do site, já existente como landing estática. Apresenta a marca Eliora RH e converte visitantes em contato. Serve a **gestores e líderes de PMEs** que buscam apoio em gestão de pessoas e desconhecem a consultoria. Seções obrigatórias: Hero, Significado da marca, Pilares (Estratégia de Pessoas; Treinamento e Desenvolvimento; Cultura Organizacional; Recrutamento e Seleção), Abordagem (Diagnóstico → Estratégia → Implementação → Acompanhamento), Missão/Visão/Valores, Portfólio de Treinamentos (F21) e CTA final.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Visitante (prospect) | Navega e converte pelo CTA |
| Consultor Eliora | Valida conteúdo institucional |
| Editor/Administrador (F12) | Futuramente gerencia conteúdo publicado |

**Comportamento esperado**

1. Acessar a URL raiz do domínio.
2. Renderizar o hero com H1 (tagline "Pessoas no centro. Resultados que transformam.") e CTA primário visível sem rolagem.
3. Permitir navegação por âncoras (A marca, Pilares, Treinamentos, Abordagem, Valores, Contato).
4. Exibir as 4 etapas da abordagem, os 4 pilares oficiais e a Missão, a Visão e os Valores da marca (Brand Book).
5. Exibir CTA final ("Pronto para colocar as pessoas no centro da sua estratégia?") direcionando para o formulário (F2) ou canais diretos (F3).
6. Exibir no rodapé: navegação, contato, redes sociais, copyright e links para Política de Privacidade e Termos de Uso (F5) quando publicados.

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F01-01 | O hero deve conter exatamente um `<h1>` por página, com a tagline oficial da marca. |
| RN-F01-02 | A ordem das seções deve ser: Hero → A marca → Pilares → Valores → Treinamentos (F21) → Abordagem → Parceiros → CTA final → Rodapé. |
| RN-F01-03 | O CTA primário ("Agende uma conversa") deve estar visível no primeiro viewport em todas as resoluções (com a tagline como fallback em ≤480px). |
| RN-F01-04 | Âncoras de navegação devem funcionar por *hash* sem depender de JavaScript. |
| RN-F01-05 | Todo conteúdo textual deve usar os termos e a redação aprovados pela marca (sem alteração de significado). |
| RN-F01-06 | A página deve ser responsiva (mobile-first) e reordenar seções sem cortar conteúdo. |
| RN-F01-07 | O conteúdo institucional deve exibir a Missão, a Visão e os Valores oficiais (Brand Book), incluindo a Visão "Ser reconhecida como referência em consultoria de RH que une estratégia de negócio e cuidado genuíno com as pessoas." e o tom de voz **Humana · Clara · Confiante · Inspiradora**. |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F01-01 | Renderizar a página em viewport de 360px, 768px e 1280px → nenhuma seção sofre sobreposição ou corte de texto. |
| CA-F01-02 | Clicar em cada link de âncora → a página rola até a seção correspondente sem erros de console. |
| CA-F01-03 | Desabilitar JavaScript no navegador → conteúdo principal e navegação por âncoras permanecem funcionais. |
| CA-F01-04 | Navegar somente pelo teclado (Tab/Enter) → todos os links e CTA são alcançáveis e acionáveis. |
| CA-F01-05 | Inspecionar a página → existe exatamente um `<h1>` e a hierarquia de títulos é sequencial (h1→h2→h3). |
| CA-F01-06 | Clicar no CTA primário → o usuário é levado à seção de contato ou ao formulário (F2) sem sair do contexto. |

**Dependências**

- Nenhuma para funcionar; fornece base visual e textual para F2, F3, F7, F8, F9.

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Nenhum dado pessoal direto; apenas IP e logs de servidor (segurança) |
| Finalidade | Segurança do site e diagnóstico técnico |
| Base legal | Legítimo interesse (art. 7º, IX) para logs de segurança |
| Retenção | Logs de servidor por no máximo 6 meses; sem persistência adicional |
| Observação | Nenhum script de terceiros (analytics/redes) pode carregar sem o consentimento de F6/F10 |

---

### F2 — Formulário de contato com consentimento LGPD `[F1]`

**Descrição**

Formulário que captura solicitações de contato com **consentimento explícito** para tratamento de dados. É o principal conversor de leads do site. Atende ao visitante que deseja falar com a consultoria e à equipe Eliora, que precisa receber e tratar cada solicitação. Campos: nome, e-mail, empresa, cargo, telefone (opcional) e mensagem, além da caixa de consentimento.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Visitante (prospect) | Preenche e envia o formulário |
| Consultor Eliora | Recebe a notificação e responde o lead |
| Administrador (F12) | Consulta e gerencia mensagens recebidas |

**Comportamento esperado**

1. Exibir o formulário na seção de contato com todos os campos e a caixa de consentimento marcada como obrigatória.
2. Validar no cliente (formato de e-mail, campos obrigatórios, tamanho da mensagem) e novamente no servidor.
3. Proteger contra spam (honeypot + rate limiting; CAPTCHA opcional).
4. Gravar o consentimento (data/hora, versão da política de privacidade exibida, IP de origem para segurança).
5. Enviar e-mail de notificação à equipe Eliora.
6. Redirecionar para página de agradecimento e impedir reenvio duplicado (ex.: botão desabilitado durante envio).

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F02-01 | O envio exige o aceite da caixa de consentimento vinculada à versão vigente da Política de Privacidade (F5). |
| RN-F02-02 | Apenas o telefone é opcional; nome, e-mail, empresa, cargo e mensagem são obrigatórios. |
| RN-F02-03 | A mensagem deve ter entre 10 e 2.000 caracteres; o e-mail deve seguir formato válido. |
| RN-F02-04 | A validação do servidor deve refazer 100% das validações do cliente (validação nunca é confiável somente no cliente). |
| RN-F02-05 | O consentimento é registrado de forma auditável: texto e versão da política exibidos, data/hora, ID do envio. |
| RN-F02-06 | Dados de contato só podem ser usados para responder a solicitação; uso para marketing exige novo consentimento (F11). |
| RN-F02-07 | Bloqueio de envios duplicados: limite de 3 envios por IP por hora (anti-spam). |
| RN-F02-08 | Mensagens sem consentimento válido são rejeitadas com mensagem de erro clara e orientação. |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F02-01 | Enviar formulário válido com consentimento marcado → envio aceito, e-mail de notificação entregue e página de agradecimento exibida em ≤ 5s. |
| CA-F02-02 | Enviar com e-mail inválido ou campo obrigatório vazio → mensagem de erro específica em cada campo, sem perda dos dados preenchidos. |
| CA-F02-03 | Enviar sem marcar o consentimento → envio bloqueado e aviso indicando que o aceite é obrigatório. |
| CA-F02-04 | Submeter payload adulterado diretamente à API (sem passar pela validação do cliente) → servidor rejeita com código 422 e mensagem de erro. |
| CA-F02-05 | Enviar 4 solicitações em 1 hora pelo mesmo IP → a 4ª é bloqueada com mensagem de limite atingido. |
| CA-F02-06 | Verificar registro do envio no banco → contém dados preenchidos, data/hora, IP (segurança), versão da política e flag de consentimento = true. |
| CA-F02-07 | Enviar formulário com botão duplo-clicado → apenas um registro é criado (idempotência). |
| CA-F02-08 | Honeypot preenchido (preenchimento automático de campo oculto) → envio descartado silenciosamente. |

**Dependências**

- F5 (Política de Privacidade) para vincular o consentimento; F6 (banner de cookies) não bloqueia o formulário; F3 (e-mail de notificação); F12 (persistência e gestão das mensagens); F13 (envio ao CRM) opcional.

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Nome, e-mail, empresa, cargo, telefone (opcional), mensagem; IP e data/hora (segurança); registro do consentimento |
| Finalidade | Atender à solicitação de contato e elaborar proposta/atendimento |
| Base legal | Consentimento (art. 7º, I) para dados de contato; legítimo interesse (art. 7º, IX) para prevenção de fraude/spam |
| Retenção | Enquanto durar o atendimento; após encerrado, recomendação: 12 meses para leads não convertidos; registros de consentimento mantidos enquanto os dados existirem |
| Observações | Titular deve poder revogar o consentimento com a mesma facilidade com que concedeu; registro de operações (art. 37) deve contemplar este tratamento |

---

### F3 — Canais de contato direto `[CORE]`

**Descrição**

Links diretos de contato já presentes na landing: e-mail (`mailto:`), WhatsApp/telefone (`wa.me`) e Instagram. Atendem visitantes que preferem conversar imediatamente em seu canal de preferência, sem formulário.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Visitante (prospect) | Acessa o canal de preferência |
| Consultor Eliora | Recebe e responde pelo canal |

**Comportamento esperado**

1. Exibir ícones/link com `aria-label` identificando cada canal.
2. Abrir o aplicativo correspondente (WhatsApp com mensagem pré-preenchida, e-mail com assunto padrão).
3. Funcionar sem JavaScript (links HTML puros).

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F03-01 | Link do WhatsApp deve usar `https://wa.me/5544988378110` com texto inicial padronizado ("Olá! Vim pelo site da Eliora RH…"). |
| RN-F03-02 | Link de e-mail deve usar `mailto:eliorarh@gmail.com` com assunto pré-definido. |
| RN-F03-03 | Ícones de redes sociais devem abrir em nova aba (`target="_blank"` com `rel="noopener"`). |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F03-01 | Clicar no ícone do WhatsApp → abre `wa.me` com a mensagem padrão pré-preenchida. |
| CA-F03-02 | Clicar no `mailto` → abre o cliente de e-mail com destinatário e assunto corretos. |
| CA-F03-03 | Clicar no ícone do Instagram → abre o perfil em nova aba, sem permissão de acesso à página (noopener). |
| CA-F03-04 | Inspecionar os links → todos possuem `aria-label` e texto alternativo descritivo. |

**Dependências**

- Nenhuma. Complementa F1 e F2.

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Nenhum pelo site; a transferência de dados ocorre **por iniciativa do usuário** ao usar os canais |
| Base legal | Não se aplica ao site (tratamento ocorre nos respectivos aplicativos/plataformas) |
| Retenção | Não se aplica; recomenda-se citar na Política de Privacidade que os canais são de terceiros e possuem políticas próprias |
| Observação | Dados enviados por WhatsApp/redes devem ser tratados com as mesmas garantias da LGPD; não inserir esses dados em bases de marketing sem novo consentimento |

---

### F4 — Blog/Insights `[F2]`

**Descrição**

Seção de artigos de RH ("Insights") que posiciona a Eliora como autoridade e atrai tráfego orgânico. Inclui lista de artigos, página de artigo por *slug*, categorias, busca textual e painel administrativo para publicação (detalhado em F12). Atende a leitores (gestores) e à equipe editorial.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Leitor (visitante) | Lê artigos, navega por categoria e busca |
| Editor (F12) | Cria, edita e publica conteúdo |
| Administrador (F12) | Gerencia autores, categorias e exclusões |

**Comportamento esperado**

1. Exibir lista de artigos ordenada por data de publicação (mais recente primeiro).
2. Abrir artigo pela URL `/insights/<slug>` (slug único e amigável para SEO).
3. Filtrar por categoria e buscar por termo no título e no corpo.
4. Publicar via área administrativa com agendamento de publicação e rascunho.
5. Paginar ou usar *load more* a partir de 12 artigos.

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F04-01 | Cada artigo possui slug único, gerado a partir do título e inalterável após publicação (ou com redirecionamento 301). |
| RN-F04-02 | Categorias são um conjunto fechado gerenciado pelo administrador (ex.: Carreira, Liderança, Cultura, LGPD). |
| RN-F04-03 | Busca deve retornar resultados por relevância (título > corpo) e suportar termos com acentuação. |
| RN-F04-04 | Apenas editores autenticados podem criar/alterar artigos; alterações em artigos publicados geram nova versão (histórico). |
| RN-F04-05 | Data exibida é a data de publicação, não a de edição; artigos agendados não aparecem na lista antes da data. |
| RN-F04-06 | Exclusão é lógica (soft delete), preservando URLs já indexadas por busca externa. |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F04-01 | Acessar `/insights` → lista renderiza até 12 artigos por página com data, categoria e resumo. |
| CA-F04-02 | Acessar `/insights/<slug-existente>` → artigo completo exibido com título, autoria, data e conteúdo formatado. |
| CA-F04-03 | Acessar `/insights/<slug-inexistente>` → retorna 404 com página amigável e link para a lista. |
| CA-F04-04 | Buscar por termo presente no corpo de um artigo → artigo aparece nos resultados em ≤ 2s. |
| CA-F04-05 | Filtrar por categoria → apenas artigos da categoria são listados. |
| CA-F04-06 | Publicar artigo com data futura → artigo não aparece na lista pública até a data agendada. |

**Dependências**

- F12 (área administrativa) para publicação; F7 (SEO) para URLs e metadados; F8/F9 para página otimizada e acessível; F10 (analytics consentido) para métricas de leitura.

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Busca interna (pode ser registrada anonimizada); dados dos autores (nome, e-mail — via F12); analítica anônima (F10) |
| Finalidade | Publicação de conteúdo e operação editorial |
| Base legal | Legítimo interesse (art. 7º, IX) para operação editorial; consentimento (art. 7º, I) para analítica não essencial |
| Retenção | Dados de autores enquanto durar a relação de colaboração + prazo legal; busca anônima sem identificação pessoal |
| Observação | Imagens com pessoas exigem autorização de uso de imagem; artigos não devem publicar dados pessoais de terceiros |

---

### F5 — Política de Privacidade + Termos de Uso `[F1]`

**Descrição**

Páginas públicas que garantem transparência e formalizam o relacionamento com o usuário. A Política de Privacidade descreve dados coletados, finalidades, bases legais, compartilhamentos, direitos do titular (arts. 18–19 da LGPD) e o canal do Encarregado (DPO). Os Termos de Uso definem regras de uso do site. São pré-requisito para F2 e F6.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Visitante / Titular | Lê e exerce direitos |
| Encarregado (DPO) Eliora | Recebe e responde solicitações de titulares |
| Assessoria jurídica | Revisa os textos |

**Comportamento esperado**

1. Disponibilizar links no rodapé de todas as páginas.
2. Exibir versão e data de atualização de cada documento.
3. Exibir formulário/canal de exercício de direitos do titular (ex.: e-mail `privacidade@eliorarh.com.br`).
4. Responder solicitações de titular em até 15 dias (prazo da LGPD, art. 19).

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F05-01 | A Política de Privacidade deve listar: dados coletados, finalidade, base legal, compartilhamento, retenção, direitos do titular e dados do Encarregado. |
| RN-F05-02 | Toda alteração material da política gera nova versão numerada e registro de quando ela foi aceita nos formulários (F2/F6/F11). |
| RN-F05-03 | Os documentos devem ser revisados juridicamente antes da publicação e a cada mudança relevante de legislação. |
| RN-F05-04 | O Termo de Uso deve abordar: uso aceitável, propriedade intelectual, limitação de responsabilidade e lei aplicável (Brasil). |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F05-01 | Acessar o link no rodapé de qualquer página → documento abre com data de versão visível no topo. |
| CA-F05-02 | Percorrer a Política → contém todas as seções obrigatórias de RN-F05-01, verificável por checklist. |
| CA-F05-03 | Enviar solicitação de titular pelo canal indicado → resposta é enviada em até 15 dias corridos (prazo LGPD). |
| CA-F05-04 | Consultar o histórico de versões → cada versão publicada é identificável por número e data. |

**Dependências**

- Nenhuma funcional; requer revisão jurídica externa (não é entregável técnico isolado). Habilita F2, F6, F10, F11.

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Nenhum nas páginas em si; o documento **descreve** todos os tratamentos do site |
| Finalidade | Cumprimento da transparência (arts. 6º, VI e 9º) e formalização do uso |
| Base legal | Obrigação legal/transparência (art. 7º, II c/c arts. 9º e 41) |
| Retenção | O documento vigente é mantido enquanto o site existir; versões anteriores arquivadas para comprovação |
| Observação | O canal do Encarregado é obrigatório (art. 41, §1º); a ausência de DPO registrado na ANPD deve ser avaliada |

---

### F6 — Banner de cookies + gerenciamento de consentimento `[F1]`

**Descrição**

Componente exibido no primeiro acesso que informa o uso de cookies e permite ao usuário escolher: aceitar todos, recusar não essenciais ou personalizar (essenciais sempre ativos; analítica sob consentimento). Habilita F10 e quaisquer scripts de terceiros de forma lícita.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Visitante | Faz a escolha de consentimento |
| Administrador (F12) | Mantém o inventário de cookies/scripts atualizado |

**Comportamento esperado**

1. Exibir banner no primeiro acesso com resumo, link para a Política de Cookies e botões "Aceitar todos", "Recusar não essenciais" e "Personalizar".
2. Carregar scripts não essenciais **somente após** aceite.
3. Persistir a escolha (cookie de consentimento) por até 12 meses; revogável a qualquer momento.
4. Permitir reabrir as preferências (ícone/link "Preferências de cookies").
5. Não bloquear o acesso ao conteúdo quando o usuário recusa.

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F06-01 | Cookies essenciais (sessão, segurança, consentimento) não dependem de aceite; não essenciais (analytics, integrações) exigem consentimento. |
| RN-F06-02 | A caixa de preferências deve abrir com os não essenciais **desmarcados** por padrão (opt-in explícito). |
| RN-F06-03 | Recusar não pode degradar o funcionamento do site (apenas funcionalidades não essenciais são desativadas). |
| RN-F06-04 | A escolha do usuário deve prevalecer sobre qualquer configuração padrão de scripts embutidos. |
| RN-F06-05 | O banner não pode reaparecer para quem já decidiu, exceto após expiração (12 meses) ou revogação. |
| RN-F06-06 | O registro da escolha deve conter: data/hora, opção escolhida, versão da política exibida. |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F06-01 | Primeiro acesso → banner aparece; acesso seguinte sem expiração → banner não reaparece. |
| CA-F06-02 | Clicar em "Aceitar todos" → scripts de analytics carregam e cookie de consentimento gravado. |
| CA-F06-03 | Clicar em "Recusar não essenciais" → nenhum script de terceiros executa (verificável no DevTools/Network). |
| CA-F06-04 | Reabrir preferências e revogar → scripts não essenciais são imediatamente desativados. |
| CA-F06-05 | Recusar e navegar por todas as páginas → nenhuma funcionalidade essencial falha. |
| CA-F06-06 | Inspecionar o cookie de consentimento → contém opção, data/hora e versão da política. |

**Dependências**

- F5 (Política de Privacidade e de Cookies); F10 (analytics só carrega com consentimento).

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Preferência de consentimento; cookies essenciais (sessão/segurança) |
| Finalidade | Gerenciamento de consentimento e funcionamento técnico do site |
| Base legal | Consentimento (art. 7º, I) para não essenciais; necessidade técnica/legítimo interesse para essenciais |
| Retenção | Cookie de consentimento por até 12 meses ou até revogação; registros conforme política de cookies |
| Observação | É prática recomendada pela ANPD e pelo mercado; a ausência de consentimento não pode impedir o acesso ao site |

---

### F7 — SEO técnico `[F1]`

**Descrição**

Conjunto de implementações que garante indexação e apresentação adequada nos buscadores e redes sociais: título/meta description únicos, Open Graph, Twitter Cards, dados estruturados JSON-LD (`Organization`/`ProfessionalService`), `sitemap.xml`, `robots.txt`, URLs canônicas e breadcrumbs. Aplica-se a todas as páginas públicas (F1, F4, F5, F19).

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Visitante (via buscador/rede social) | Descobre e acessa o conteúdo |
| Editor/Administrador | Preenche metadados por página/artigo |
| Especialista SEO | Audita e acompanha métricas |

**Comportamento esperado**

1. Cada página pública gera `<title>`, `meta description`, Open Graph e Twitter Cards únicos.
2. A página inicial emite JSON-LD com dados da consultoria (nome, logo, contato, área de atuação, localização).
3. `sitemap.xml` lista todas as URLs públicas válidas; `robots.txt` orienta o rastreamento.
4. Páginas acessíveis por múltiplas URLs emitem `<link rel="canonical">`.
5. Páginas internas emitem breadcrumbs (texto + dados estruturados).

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F07-01 | Título com até 60 caracteres e meta description com até 160 caracteres, únicos por página. |
| RN-F07-02 | JSON-LD deve declarar tipo `ProfessionalService` com subOrganização ou `Organization`, NAP (nome, endereço, telefone) e horário de atendimento consistentes. |
| RN-F07-03 | O `sitemap.xml` é regenerado automaticamente quando artigos são publicados (F4) e referenciado no `robots.txt`. |
| RN-F07-04 | Toda página canônica deve apontar para si mesma na URL preferida (https, sem parâmetros). |
| RN-F07-05 | Breadcrumbs devem refletir a hierarquia real (Início > Insights > [Categoria] > [Artigo]). |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F07-01 | Inspecionar o `<head>` de cada página pública → título, description, OG e Twitter Cards presentes e únicos. |
| CA-F07-02 | Validar o JSON-LD da home no validador do Google → sem erros e tipo `ProfessionalService`/`Organization` declarado. |
| CA-F07-03 | Acessar `/sitemap.xml` → lista todas as URLs públicas; `robots.txt` referencia o sitemap. |
| CA-F07-04 | Acessar uma URL com parâmetros rastreáveis → `<link rel="canonical">` aponta para a URL limpa. |
| CA-F07-05 | Publicar novo artigo → ele aparece no sitemap na regeneração seguinte (≤ 24h). |
| CA-F07-06 | Acessar artigo → breadcrumb visível na página e presente no JSON-LD `BreadcrumbList`. |

**Dependências**

- F1 (conteúdo e URLs), F4 (blog), F8 (performance de carregamento para CWV), F5 (conteúdo das políticas).

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Nenhum dado pessoal; metadados públicos |
| Base legal | Não se aplica |
| Retenção | Não se aplica |
| Observação | Fotos de pessoas (consultores, depoentes) usadas em imagens do site exigem autorização de uso de imagem (art. 20 do CC) e constar na política |

---

### F8 — Performance (Core Web Vitals) `[F1]`

**Descrição**

Garantia de carregamento rápido e estável: LCP < 2,5s, CLS < 0,1 e INP < 200ms (limites "good" do Core Web Vitals), imagens em WebP/AVIF, *lazy loading*, fontes otimizadas (pré-carregamento, `font-display: swap`, subconjuntos) e código minimizado. Impacta diretamente conversão (F2), SEO (F7) e experiência do usuário.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Visitante | Usufrui de carregamento rápido |
| Desenvolvedor | Implementa e monitora as otimizações |
| Especialista SEO | Acompanha métricas de campo |

**Comportamento esperado**

1. Servir assets estáticos com cache e compressão (gzip/brotli) e CDN quando disponível.
2. Exibir imagens em WebP/AVIF com fallback; carregamento preguiçoso para imagens abaixo da dobra.
3. Carregar fontes de forma otimizada sem bloqueio de renderização.
4. Manter interatividade responsiva em dispositivos móveis (INP).
5. Medir CWV em campo (via F10 consentido ou ferramentas de auditoria).

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F08-01 | LCP (maior conteúdo pintado) < 2,5s em 75º percentil, para amostra móvel real. |
| RN-F08-02 | CLS (deslocamento de layout) < 0,1 em 75º percentil. |
| RN-F08-03 | INP (responsividade à interação) < 200ms em 75º percentil. |
| RN-F08-04 | Imagens devem ter dimensões explícitas (atributos `width`/`height` ou reserva de espaço via CSS) para evitar CLS. |
| RN-F08-05 | Fontes carregadas com `font-display: swap` e pré-carregamento do arquivo mais crítico. |
| RN-F08-06 | JavaScript e CSS de produção minificados e sem bloqueio de renderização para o conteúdo acima da dobra. |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F08-01 | Auditoria Lighthouse em perfil mobile → pontuação ≥ 90 em Performance. |
| CA-F08-02 | Medição em laboratório (throttling 4G) → LCP < 2,5s e CLS < 0,1 em 3 execuções consecutivas. |
| CA-F08-03 | Verificar rede (DevTools) → imagens abaixo da dobra são carregadas apenas ao rolar (lazy load). |
| CA-F08-04 | Verificar formato das imagens → servidas em WebP/AVIF com fallback quando suportado. |
| CA-F08-05 | Inspecionar fontes → `font-display: swap` configurado e pré-carregamento presente. |
| CA-F08-06 | Medir INP em dispositivo móvel de referência → < 200ms. |

**Dependências**

- F1, F4, F5 (páginas a otimizar); F7 (estrutura de URLs); F10 (medição consentida).

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Nenhum dado pessoal direto; CDNs podem registrar IP em logs técnicos |
| Base legal | Legítimo interesse (art. 7º, IX) para funcionamento e segurança |
| Retenção | Logs de CDN conforme política (recomendado ≤ 6 meses) |
| Observação | Ferramentas de auditoria (Lighthouse) não devem ser usadas para rastreamento de usuários |

---

### F9 — Acessibilidade WCAG 2.1 AA `[F1]`

**Descrição**

Tornar o site utilizável por pessoas com deficiência: navegação por teclado, foco visível, contraste mínimo 4,5:1 (texto), suporte a leitores de tela (ARIA, `alt`, `label`), respeito a `prefers-reduced-motion` e formulários rotulados. Aplica-se a todas as páginas e componentes (F1, F2, F6, F4, etc.).

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Visitante com deficiência | Navega com tecnologias assistivas |
| Desenvolvedor | Implementa e testa conformidade |
| Analista de qualidade | Audita contra WCAG 2.1 AA |

**Comportamento esperado**

1. Toda interação realizável com mouse deve ser realizável com teclado.
2. Elementos focáveis exibem indicador de foco visível e com contraste adequado.
3. Imagens têm texto alternativo; ícones têm `aria-label`; formulários têm `label` associado.
4. Estrutura semântica correta (landmarks, cabeçalhos, tabelas).
5. Animações respeitam `prefers-reduced-motion` (reduzidas ou desativadas).
6. Contraste de texto e componentes atende 4,5:1 (texto normal) e 3:1 (texto grande/componentes).

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F09-01 | Nenhuma funcionalidade pode depender exclusivamente de eventos de mouse/hover. |
| RN-F09-02 | Ordem de foco (Tab) deve seguir a ordem visual lógica da página. |
| RN-F09-03 | Formulários devem ter todos os campos rotulados e mensagens de erro associadas via `aria-describedby`. |
| RN-F09-04 | O banner de consentimento (F6) deve ser alcançável e operável por teclado. |
| RN-F09-05 | Conteúdo animado deve ter alternativa estática e respeitar `prefers-reduced-motion`. |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F09-01 | Navegar por todo o site apenas com teclado (Tab, Shift+Tab, Enter, Espaço) → todos os elementos são alcançáveis e acionáveis, sem armadilhas de foco. |
| CA-F09-02 | Verificar com leitor de tela (ex.: NVDA/VoiceOver) → landmarks, títulos e `alt` são anunciados corretamente. |
| CA-F09-03 | Auditoria automática (ex.: axe, WAVE) → 0 erros de nível A e AA nas páginas principais. |
| CA-F09-04 | Medir contraste dos textos com ferramenta de verificação → atende 4,5:1 (normal) e 3:1 (grande/UI). |
| CA-F09-05 | Ativar `prefers-reduced-motion` → animações são reduzidas ou não executadas. |
| CA-F09-06 | Focar em campos de formulário inválidos → mensagem de erro é anunciada e o foco é levado ao campo. |

**Dependências**

- F1, F2, F4, F5, F6 (páginas/componentes a tornar acessíveis); F8 (desempenho também é parte da experiência).

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Nenhum |
| Base legal | Não se aplica |
| Retenção | Não se aplica |
| Observação | Ferramentas de auditoria com varredura de páginas devem ter política própria de privacidade quando registram dados |

---

### F10 — Analytics privacy-first com consentimento `[F1]`

**Descrição**

Medição de audiência sem comprometer a privacidade. Opção preferida: solução leve sem cookies (Plausible/Umami) ou GA4 configurado com consentimento (via F6). Métricas: páginas vistas, origem do tráfego, dispositivo e localização aproximada — sem identificar usuários. Os scripts só executam após consentimento.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Analista/marketing Eliora | Acompanha métricas |
| Administrador (F12) | Configura provedor e inventário de cookies |

**Comportamento esperado**

1. Sem consentimento → nenhum script de analytics executa (verificado por bloqueio).
2. Com consentimento → coleta anônima/agregada de métricas.
3. Painel de métricas acessível à equipe, com dados históricos.
4. O uso da ferramenta não pode degradar a performance (F8) nem exigir cookies no caso de soluções cookieless.

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F10-01 | Nenhum dado de analytics é coletado antes do consentimento (F6). |
| RN-F10-02 | Não é permitida a coleta de campos que identifiquem o usuário (nome, e-mail) pela ferramenta de analytics. |
| RN-F10-03 | IPs devem ser anonimizados/mascarados quando a ferramenta os processa (ex.: GA4 com `IP anonymization`). |
| RN-F10-04 | A ferramenta escolhida deve constar no inventário de cookies/scripts e na Política de Privacidade (F5). |
| RN-F10-05 | O período de retenção de dados na ferramenta deve ser o menor compatível com a análise (recomendação GA4: 14 meses). |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F10-01 | Acessar o site com consentimento recusado → nenhuma requisição ao domínio do analytics no DevTools. |
| CA-F10-02 | Aceitar analytics → requisições passam a ocorrer; painel registra a visita em ≤ 5 min. |
| CA-F10-03 | Verificar configuração → IP anonimizado e retenção configurada conforme RN-F10-05. |
| CA-F10-04 | Verificar performance com analytics ativo → nenhuma métrica CWV (F8) degrada além dos limites. |
| CA-F10-05 | Consultar painel → nenhuma tela permite identificar um visitante individual. |

**Dependências**

- F6 (consentimento) e F5 (transparência). Independente de F4, mas útil para métricas do blog.

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Dados de navegação anônimos/agregados (página, origem, dispositivo, região aproximada); IP mascarado |
| Finalidade | Medição de audiência e melhoria do site |
| Base legal | Consentimento (art. 7º, I) para não essenciais; sem consentimento, coleta é bloqueada |
| Retenção | Mínima compatível (recomendação: 14 meses); dados anônimos não se enquadram como dados pessoais |
| Observação | Se houver envio a terceiros fora do Brasil, avaliar transferência internacional (art. 33) e cláusulas contratuais |

---

### F11 — Newsletter com double opt-in `[F2]`

**Descrição**

Captura de e-mails para envio de conteúdos periódicos (insights, materiais). O **double opt-in** exige que o visitante confirme a inscrição por e-mail antes de entrar na lista — protege contra erros e reforça a validade do consentimento.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Assinante (visitante) | Inscreve-se e confirma |
| Marketing Eliora | Envia e segmenta campanhas |
| Administrador (F12) | Gerencia lista e baixas |

**Comportamento esperado**

1. Campo de e-mail + consentimento explícito no formulário de inscrição.
2. Envio de e-mail de confirmação com link único (token) válido por 48h.
3. Assinatura ativa somente após clique no link de confirmação.
4. Link de descadastro com 1 clique em todo e-mail enviado.
5. Confirmação de descadastro com mensagem de sucesso.

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F11-01 | A inscrição exige consentimento explícito e separado de qualquer outro consentimento do site. |
| RN-F11-02 | O token de confirmação é único, expira em 48h e só pode ser usado uma vez. |
| RN-F11-03 | Sem confirmação em 7 dias, o registro provisório é excluído automaticamente. |
| RN-F11-04 | Todo e-mail enviado contém link funcional de descadastro; o descadastro é efetivo em até 72h. |
| RN-F11-05 | Dados de inscrição não podem ser usados para outra finalidade sem novo consentimento. |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F11-01 | Inscrever-se com e-mail válido → e-mail de confirmação chega em ≤ 5 min. |
| CA-F11-02 | Clicar no link de confirmação após 48h → link inválido, assinatura não ativada. |
| CA-F11-03 | Clicar no link de descadastro → confirmação exibida e e-mails cessam em ≤ 72h. |
| CA-F11-04 | Não confirmar em 7 dias → registro removido do banco (verificável por consulta). |
| CA-F11-05 | Inscrever-se sem marcar o consentimento → envio bloqueado com aviso. |

**Dependências**

- F5 (política e descrição da finalidade); F6 (cookies não essenciais, se houver pixels de rastreamento); provedor de e-mail (operador com contrato de proteção de dados).

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Nome (opcional), e-mail, data/hora da inscrição, confirmação e descadastro |
| Finalidade | Envio de newsletter e materiais de marketing |
| Base legal | Consentimento (art. 7º, I) com dupla confirmação |
| Retenção | Enquanto houver assinatura ativa; após descadastro, até 90 dias para comprovação de consentimento; não confirmados: 7 dias |
| Observação | Registro do consentimento deve permitir comprovar data, versão da política e origem |

---

### F12 — Área administrativa `[F2]`

**Descrição**

Painel restrito com autenticação para a equipe Eliora: gestão das mensagens do formulário (F2), CRUD de artigos do blog (F4), depoimentos (F19), usuários e preferências de consentimento. Requisito habilitador das funcionalidades de conteúdo.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Administrador | Usuários, permissões, exclusões, auditoria |
| Editor | Conteúdo do blog e depoimentos |
| Consultor | Responde mensagens de contato |

**Comportamento esperado**

1. Login com e-mail + senha forte e MFA (autenticação em dois fatores) recomendado/obrigatório para administradores.
2. Painel com: mensagens de contato (lista, leitura, status), blog (CRUD + agendamento), depoimentos (CRUD), usuários (RBAC).
3. Registro de auditoria das ações críticas (login, exclusão, publicação).
4. Sessão expira por inatividade (ex.: 30 min) e por prazo máximo (ex.: 8h).
5. Proteções: bloqueio temporário após tentativas falhas, senhas com hash forte (bcrypt/argon2), CSRF e autorização por perfil.

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F12-01 | Apenas usuários autenticados acessam o painel; rotas protegidas no servidor (não apenas no cliente). |
| RN-F12-02 | Perfis mínimos: Administrador e Editor; Editor não exclui usuários nem altera configurações de consentimento. |
| RN-F12-03 | Senhas armazenadas apenas com hash (bcrypt/argon2) + salt; nunca em texto plano. |
| RN-F12-04 | Após 5 tentativas de login falhas → bloqueio de 15 minutos (com notificação ao administrador). |
| RN-F12-05 | Ações de exclusão irreversível exigem confirmação e são registradas em auditoria. |
| RN-F12-06 | Mensagens de contato podem ser marcadas como "novo", "em atendimento" e "concluído". |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F12-01 | Acessar rota do painel sem autenticação → redirecionado ao login (status 302/401). |
| CA-F12-02 | Login com senha incorreta 5 vezes → conta bloqueada por 15 min e administrador notificado. |
| CA-F12-03 | Editor tenta excluir usuário → ação negada (403) por permissão. |
| CA-F12-04 | Publicar/excluir conteúdo → evento registrado no log de auditoria com usuário, data/hora e ação. |
| CA-F12-05 | Sessão inativa por 30 min → logout automático. |
| CA-F12-06 | Verificar banco → senhas armazenadas apenas como hash (nunca texto plano). |

**Dependências**

- F2 (mensagens), F4 (blog), F19 (depoimentos), F11 (gestão de lista); F7/F8/F9 não são bloqueantes, mas o painel deve ser responsivo e seguro.

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Dados de usuários internos (nome, e-mail, senha hash); mensagens de contato (F2); dados de autores |
| Finalidade | Operação interna, controle de acesso e resposta a contatos |
| Base legal | Legítimo interesse (art. 7º, IX) e execução contratual com colaboradores |
| Retenção | Enquanto durar o vínculo/permissão + prazo legal; logs de acesso até 12 meses; mensagens conforme F2 |
| Observação | Acesso mínimo ao necessário; registro de operações (art. 37) deve incluir este tratamento; notificação de incidentes (art. 48) |

---

### F13 — Integração com CRM (RD Station/HubSpot) `[F2]`

**Descrição**

Envio automático de leads do formulário (F2) e da newsletter (F11) para o CRM da consultoria via webhook, com tratamento de falhas e sem duplicidade. Permite nutrir o relacionamento comercial com histórico consistente.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Consultor comercial | Acompanha leads no CRM |
| Administrador (F12) | Configura chaves e monitora filas |

**Comportamento esperado**

1. Ao aceitar o envio do formulário, disparar webhook com payload no formato do CRM.
2. Registrar resposta do CRM (sucesso/erro) e reenviar em caso de falha (retry com backoff).
3. Evitar duplicidades (chave de idempotência por envio).
4. Painel do CRM recebe origem "Site Eliora" e dados de consentimento.

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F13-01 | O envio ao CRM só ocorre para leads com consentimento válido (F2/F11). |
| RN-F13-02 | O payload inclui o registro de consentimento (data/hora e versão da política) quando o CRM permitir. |
| RN-F13-03 | Falha de webhook → até 5 tentativas com backoff exponencial; após isso, lead marcado para tratamento manual. |
| RN-F13-04 | Chaves/credenciais do CRM armazenadas como segredos (nunca no código ou no cliente). |
| RN-F13-05 | Exclusão de dados no site (direito do titular) deve ser refletida no CRM (solicitação registrada e tratada). |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F13-01 | Enviar formulário com consentimento → lead aparece no CRM em ≤ 2 min com origem correta. |
| CA-F13-02 | Simular falha do CRM (endpoint indisponível) → reenvio automático ocorre sem perda de dados. |
| CA-F13-03 | Enviar o mesmo payload duas vezes → apenas um lead criado (idempotência). |
| CA-F13-04 | Inspecionar configuração → credenciais fora do repositório/cliente (variáveis de ambiente). |
| CA-F13-05 | Registro de exclusão de titular → solicitação registrada no CRM com status de tratamento. |

**Dependências**

- F2, F11 (leads), F12 (configuração), F5 (transparência sobre compartilhamento).

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Mesmos do F2/F11 + identificador interno do CRM |
| Finalidade | Gestão comercial e relacionamento com leads |
| Base legal | Consentimento (art. 7º, I) — mesma finalidade informada; CRM atua como **operador** |
| Retenção | Conforme política do CRM + regras de F2/F11; transferência internacional avaliada (art. 33) se o provedor estiver fora do Brasil |
| Observação | Exigir contrato de proteção de dados com o provedor (art. 39); registrar tratamento no ROPA (art. 37) |

---

### F14 — Agendamento de consulta (Calendly/agenda integrada) `[F2]`

**Descrição**

Permite ao visitante agendar uma conversa inicial com a consultoria (ex.: 30 min) em horário real de disponibilidade, via agenda integrada (Calendly ou similar) ou agenda própria. Reduz atrito entre interesse e primeiro contato.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Visitante (prospect) | Agenda a consulta |
| Consultor Eliora | Confirma e conduz a conversa |
| Administrador | Gerencia disponibilidade e integração |

**Comportamento esperado**

1. Botão "Agendar consulta" abre o fluxo de seleção de data/horário.
2. Usuário informa nome, e-mail e (opcional) empresa; recebe confirmação e lembrete.
3. Evento é criado na agenda dos consultores; conflitos de horário evitados.
4. Regras: mínimo de antecedência (ex.: 24h), limite de 1 agendamento por e-mail em 7 dias.

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F14-01 | Horários disponíveis refletem a agenda real dos consultores (sem overbooking). |
| RN-F14-02 | Confirmação por e-mail ao agendar; lembrete (opcional) apenas com consentimento. |
| RN-F14-03 | Cancelamento/remarcação deve ser possível pelo link recebido no e-mail, sem contato manual. |
| RN-F14-04 | Se o agendador for terceiro (Calendly), o fluxo de consentimento/privacy do site permanece válido e o terceiro é declarado na política. |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F14-01 | Agendar um horário → confirmação por e-mail em ≤ 5 min e evento na agenda. |
| CA-F14-02 | Tentar agendar horário já ocupado → indisponível na seleção (sem conflito). |
| CA-F14-03 | Cancelar pelo link do e-mail → horário liberado e e-mail de cancelamento enviado. |
| CA-F14-04 | Agendar 2 consultas com o mesmo e-mail em 7 dias → segunda tentativa bloqueada. |

**Dependências**

- F3 (canais de contato como fallback), F12 (gestão da agenda), F5 (transparência sobre o provedor).

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Nome, e-mail, empresa (opcional), data/horário da consulta |
| Finalidade | Marcação e realização da consulta (medidas pré-contratuais) |
| Base legal | Execução de contrato/medidas pré-contratuais (art. 7º, V); lembretes sob consentimento |
| Retenção | Até a realização da consulta; a partir daí os dados podem migrar para o contrato de serviços |
| Observação | Se usar Calendly (terceiro), verificar papel (operador/controlador conjunto), transferência internacional e cláusulas |

---

### F15 — Chatbot/WhatsApp automatizado `[F3]`

**Descrição**

Atendimento inicial automatizado via chatbot no site e/ou WhatsApp com fluxos de qualificação (área de interesse, porte da empresa) e encaminhamento ao consultor humano em horário comercial. Reduz tempo de primeira resposta.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Visitante | Interage com o bot |
| Consultor Eliora | Assume o atendimento quando escalado |
| Administrador | Edita fluxos e respostas |

**Comportamento esperado**

1. Widget de chat exibe saudação e opções de menu; respostas por fluxo pré-definido.
2. Coleta de dados mínimos (nome, empresa, interesse) para qualificação.
3. Escalonamento para humano em horário comercial; fora do horário, agenda retorno.
4. Fallback para formulário (F2) e canais diretos (F3).

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F15-01 | O bot deve se identificar como assistente virtual da Eliora RH e informar que a conversa pode ser atendida por humano. |
| RN-F15-02 | Dados coletados no chat são usados apenas para o atendimento; transferência para marketing exige novo consentimento. |
| RN-F15-03 | Escalonamento humano em horário comercial; fora dele, mensagem programada com prazo de retorno (ex.: próximo dia útil). |
| RN-F15-04 | Em caso de falha do serviço do bot, o widget exibe os canais diretos (F3) sem quebrar a navegação. |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F15-01 | Iniciar conversa → bot responde em ≤ 3s com saudação e menu. |
| CA-F15-02 | Pedir atendimento humano em horário comercial → consultor assume em ≤ 15 min (alerta disparado). |
| CA-F15-03 | Interagir fora do horário → resposta programada informa prazo de retorno. |
| CA-F15-04 | Simular falha do bot → widget oferece fallback (WhatsApp/e-mail) e a página continua funcional. |

**Dependências**

- F3 (canais de fallback), F12 (configuração de fluxos), F13 (opcional: registrar conversas no CRM com consentimento).

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Nome, empresa, interesse, conteúdo das mensagens, número de WhatsApp |
| Finalidade | Atendimento e qualificação comercial |
| Base legal | Consentimento (art. 7º, I); WhatsApp implica transferência à Meta — avaliar art. 33 (cláusulas padrão/avaliação) |
| Retenção | Histórico do atendimento enquanto durar o relacionamento; exclusão mediante solicitação do titular |
| Observação | Registrar tratamento no ROPA; bots não podem coletar dados sensíveis (saúde, etc.) |

---

### F16 — Multi-idioma PT/EN/ES (i18n) `[F3]`

**Descrição**

Versões do site em português, inglês e espanhol, com URLs próprias (`/pt/`, `/en/`, `/es/`), tags `hreflang` e alternância de idioma. Atende clientes e prospects estrangeiros e empresas com operações internacionais.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Visitante internacional | Navega no idioma preferido |
| Tradutor/revisor | Mantém paridade de conteúdo |
| Editor | Publica em múltiplos idiomas |

**Comportamento esperado**

1. Seletor de idioma visível no cabeçalho/rodapé.
2. Detecção automática opcional por idioma do navegador (com possibilidade de troca manual).
3. Conteúdo institucional (F1), formulário (F2), políticas (F5) e blog (F4) traduzidos.
4. URLs canônicas com `hreflang` alternadas corretamente.

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F16-01 | Cada idioma tem URL própria; traduções não são páginas duplicadas (canônicas corretas + `hreflang`). |
| RN-F16-02 | Textos legais (F5) e o registro de consentimento devem estar no idioma exibido ao usuário no momento da aceitação. |
| RN-F16-03 | Traduções são revisadas por falante nativo ou tradutor profissional antes da publicação. |
| RN-F16-04 | Conteúdo não traduzido (ainda não disponível) não deve ser anunciado como tal; exibir versão em PT como fallback. |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F16-01 | Alternar idioma → URL e conteúdo mudam sem recarregamento manual/erro. |
| CA-F16-02 | Inspecionar `hreflang` → alternativas corretas para PT/EN/ES em páginas traduzidas. |
| CA-F16-03 | Aceitar o consentimento (F2/F6) em inglês → registro de consentimento referencia a versão em inglês da política. |
| CA-F16-04 | Acessar `/en/<página-sem-tradução>` → fallback para PT com aviso, sem 404. |

**Dependências**

- F1, F2, F5 (conteúdo a traduzir), F7 (SEO/hreflang).

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Mesmos de cada funcionalidade, agora em múltiplos idiomas |
| Base legal | Mesmas bases; consentimento registrado com referência à versão linguística |
| Retenção | Mesmas regras |
| Observação | Transferência internacional (art. 33) se houver atendimento a titulares no exterior com dados processados fora do Brasil |

---

### F17 — Portal do cliente `[F3]`

**Descrição**

Área restrita onde clientes acompanham materiais, relatórios e entregas da consultoria (diagnósticos, planos de ação, relatórios de acompanhamento). Fortalece o relacionamento e centraliza entregas.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Cliente (representante da empresa) | Acessa materiais e relatórios |
| Consultor Eliora | Disponibiliza e comenta entregas |
| Administrador | Cria acessos e controla revogações |

**Comportamento esperado**

1. Login com e-mail + senha forte e MFA.
2. Lista de entregas (documentos/PDFs) por projeto, com download.
3. Registro de acesso e download (auditoria).
4. Expiração/revogação de acesso ao fim do contrato.

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F17-01 | Acesso restrito a usuários habilitados pelo contrato; revogação imediata ao término do vínculo. |
| RN-F17-02 | Downloads e acessos são registrados em auditoria (quem, o quê, quando). |
| RN-F17-03 | Relatórios podem conter dados de colaboradores do cliente — o cliente é **controlador** e a Eliora **operadora** desses dados. |
| RN-F17-04 | Sessões expiram por inatividade (30 min) e limite máximo de 8h. |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F17-01 | Acessar o portal sem credenciais → bloqueado com tela de login. |
| CA-F17-02 | Baixar um relatório → evento registrado em auditoria com identificação do usuário. |
| CA-F17-03 | Encerrar contrato e revogar acesso → usuário não consegue mais autenticar em ≤ 1 dia útil. |
| CA-F17-04 | Sessão inativa por 30 min → logout automático. |

**Dependências**

- F12 (modelo de autenticação/segurança), F5 (política aplicável ao tratamento), infraestrutura de armazenamento seguro.

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Dados cadastrais do cliente; relatórios podem conter dados pessoais de colaboradores (clientes da consultoria) |
| Finalidade | Execução do contrato de consultoria e entrega de materiais |
| Base legal | Execução contratual (art. 7º, V) para o cliente; para dados de colaboradores, o cliente é controlador (art. 7º aplicável ao tratamento original) |
| Retenção | Conforme contrato + obrigações legais (documentos contratuais: 5 anos após término, conforme art. 206 do CC para obrigações civis); prazos específicos definidos em contrato |
| Observação | Formalizar papéis controlador/operador em contrato (art. 39); garantir exclusão segura ao fim do prazo |

---

### F18 — Página de vagas / oportunidades `[F3]`

**Descrição**

Seção de carreiras da própria consultoria: lista de vagas abertas e formulário de candidatura com upload de currículo. Atende candidatos e a equipe de seleção da Eliora.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Candidato | Consulta vagas e se candidata |
| Consultor responsável pela seleção | Recebe e avalia candidaturas |
| Administrador (F12) | Publica/arquiva vagas |

**Comportamento esperado**

1. Listar vagas abertas (cargo, local, regime) e página de detalhe.
2. Candidatura com nome, e-mail, telefone, currículo (PDF) e opção de banco de talentos.
3. Confirmação de recebimento por e-mail; candidaturas não são visíveis ao público.
4. Vagas encerradas deixam de receber candidaturas.

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F18-01 | Candidatura exige consentimento para tratamento dos dados e autorização para banco de talentos (opcional e separado). |
| RN-F18-02 | Currículo aceito em PDF (até 5 MB); outros formatos rejeitados com mensagem clara. |
| RN-F18-03 | Não solicitar dados sensíveis (origem étnica, saúde, crença) no formulário. |
| RN-F18-04 | Candidaturas de vagas encerradas são arquivadas; banco de talentos retém dados por até 24 meses com consentimento. |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F18-01 | Candidatar-se a vaga aberta → confirmação por e-mail em ≤ 5 min. |
| CA-F18-02 | Enviar arquivo em formato inválido ou > 5 MB → erro específico sem perder os campos preenchidos. |
| CA-F18-03 | Candidatar-se sem consentimento → envio bloqueado com aviso. |
| CA-F18-04 | Vaga encerrada → formulário desabilitado e página informa o encerramento. |

**Dependências**

- F12 (publicação e acesso ao painel), F5 (política de privacidade do candidato), F2 (modelo de validação/anti-spam reaproveitado).

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Nome, e-mail, telefone, currículo (pode conter dados sensíveis declarados pelo candidato), autorização de banco de talentos |
| Finalidade | Processo seletivo e formação de banco de talentos |
| Base legal | Consentimento (art. 7º, I) + medidas pré-contratuais (art. 7º, V); dados sensíveis eventualmente presentes no currículo: tratamento restrito (art. 11) e sem uso para decisão automática |
| Retenção | Não contratados sem banco de talentos: 90 dias após o fim do processo; com banco de talentos: até 24 meses; contratados: enquanto durar o vínculo |
| Observação | Informar claramente no formulário o prazo de retenção e o direito de exclusão antecipada |

---

### F19 — Depoimentos e cases de sucesso `[F2]`

**Descrição**

Prova social: depoimentos de clientes e cases de projetos. Aumenta a credibilidade para o público de PMEs, alinhado à premissa de "credibilidade sobre hype" da consultoria.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Visitante | Lê depoimentos/cases |
| Cliente depoente | Autoriza publicação |
| Consultor Eliora | Valida conteúdo técnico dos cases |
| Editor (F12) | Publica e gerencia |

**Comportamento esperado**

1. Seção na landing e/ou página dedicada com depoimentos (nome, cargo, empresa, foto opcional).
2. Cases com contexto, desafio, solução e resultado mensurável (com autorização do cliente).
3. Gestão via painel administrativo (F12), com status de autorização registrado.
4. Remoção imediata mediante revogação do consentimento.

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F19-01 | Publicar depoimento exige consentimento explícito do depoente + autorização de uso de imagem (se houver foto). |
| RN-F19-02 | Cases com dados de clientes exigem autorização contratual (NDA ou cláusula específica); dados sensíveis são anonimizados. |
| RN-F19-03 | Depoimentos são exibidos na íntegra, sem edição de significado; aspas são textuais. |
| RN-F19-04 | Números de resultado em cases devem ser comprováveis e não podem ser enganosos (evitar promessa de resultado). |
| RN-F19-05 | Revogação de consentimento → remoção do depoimento em até 48h. |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F19-01 | Publicar depoimento via painel → exibido no site com registro de consentimento associado. |
| CA-F19-02 | Depoente solicita remoção → conteúdo fora do ar em ≤ 48h. |
| CA-F19-03 | Verificar registro → cada depoimento tem data do consentimento e autorização de imagem (se aplicável). |
| CA-F19-04 | Revisar cases → nenhuma afirmação de resultado sem fonte/comprovação registrada. |

**Dependências**

- F12 (gestão), F5 (política), F1 (exibição na landing).

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Nome, cargo, empresa, foto e texto do depoimento; autorização associada |
| Finalidade | Publicação de prova social |
| Base legal | Consentimento explícito (art. 7º, I) + direito de imagem (art. 20 do CC) |
| Retenção | Enquanto publicado; evidência de consentimento mantida por 12 meses após remoção |
| Observação | Caso o depoente seja colaborador de cliente, confirmar se o tratamento é atribuível à empresa do depoente ou ao depoente individual |

---

### F20 — Quiz de diagnóstico de RH interativo `[F3]`

**Descrição**

Quiz online que avalia a maturidade de gestão de pessoas da empresa do visitante (diagnóstico leve com perguntas por pilar). Entrega um resultado com pontuação e recomendações, e captura e-mail para envio do relatório — gerando lead qualificado para a consultoria.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Visitante (gestor) | Responde e recebe o resultado |
| Consultor Eliora | Analisa leads e resultados agregados |
| Administrador | Edita perguntas, pesos e recomendações |

**Comportamento esperado**

1. Apresentar 8–12 perguntas (múltipla escolha) por pilar de atuação.
2. Calcular pontuação por pilar e exibir resultado com recomendações.
3. Solicitar e-mail (opcional) para enviar o relatório completo.
4. Permitir refazer o quiz; impedir reenvio de relatório duplicado para o mesmo e-mail.

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F20-01 | Resultado parcial (na tela) não exige e-mail; o relatório completo por e-mail exige consentimento. |
| RN-F20-02 | Respostas são armazenadas de forma agregada e anônima quando não há e-mail informado. |
| RN-F20-03 | Recomendações são genéricas e educacionais; o quiz não configura diagnóstico formal nem promete resultados. |
| RN-F20-04 | Envio de e-mail com relatório: 1 por endereço a cada 30 dias (anti-spam). |
| RN-F20-05 | Limite de 1 relatório por e-mail e por sessão; relatórios não são reenviados sob demanda sem consentimento. |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F20-01 | Responder o quiz sem e-mail → resultado na tela exibido com pontuação por pilar. |
| CA-F20-02 | Informar e-mail com consentimento → relatório enviado em ≤ 5 min com link de exclusão. |
| CA-F20-03 | Não informar e-mail → nenhum dado pessoal persistido (verificável no banco). |
| CA-F20-04 | Solicitar relatório para o mesmo e-mail dentro de 30 dias → segunda solicitação bloqueada. |
| CA-F20-05 | Refazer o quiz → nova tentativa permitida sem duplicação de registro do e-mail. |

**Dependências**

- F13 (envio de lead ao CRM com consentimento), F5 (política), F2 (modelo de consentimento reutilizável).

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Respostas (informações organizacionais, majoritariamente não pessoais), e-mail (quando informado), data/hora |
| Finalidade | Diagnóstico leve, geração de lead e envio de relatório |
| Base legal | Consentimento (art. 7º, I) para e-mail/relatório; legítimo interesse para análises agregadas anônimas |
| Retenção | Sem e-mail: respostas anônimas por até 12 meses (agregadas); com e-mail: até 6 meses sem conversão, depois exclusão; relatório enviado com link de exclusão |
| Observação | Campos abertos (se houver) podem conter dados pessoais do respondente — orientar o usuário a não inserir dados sensíveis |

---

### F21 — Portfólio de Treinamentos `[F1]`

**Descrição**

Seção institucional (nova) que apresenta os serviços de treinamento da Eliora RH, absorvida do material oficial *Portfólio de Treinamentos (2026)*. Apresenta quem conduz os programas (facilitadoras Michelly e Giovana), a metodologia em 4 etapas, as 6 trilhas (com destaque "carro-chefe" para Desenvolvimento de Liderança) e os 4 formatos de entrega. Converte visitantes interessados em desenvolvimento de lideranças, equipes e cultura organizacional por meio do CTA "Vamos montar seu treinamento?". Atende gestores e líderes de PMEs que buscam capacitação sob medida para seus times.

**Usuários envolvidos**

| Usuário | Papel |
|---|---|
| Visitante (gestor/líder de PME) | Conhece trilhas, metodologia e formatos; aciona o CTA |
| Consultor Eliora | Valida conteúdo e conduz o contato comercial |
| Editor/Administrador (F12) | Futuramente gerencia o conteúdo da seção |

**Comportamento esperado**

1. Exibir as 6 trilhas de treinamento em cards, destacando a trilha carro-chefe "Desenvolvimento de Liderança" com selo próprio.
2. Apresentar as facilitadoras Michelly (psicóloga) e Giovana (pedagoga) com suas áreas de atuação.
3. Exibir a metodologia em 4 etapas: Briefing → Diagnóstico → Desenho sob medida → Aplicação e acompanhamento.
4. Exibir os 4 formatos de entrega (In company; Programas pontuais ou continuados; Acompanhamento pós-treinamento; Turmas de liderança ou times completos).
5. Exibir o CTA "Vamos montar seu treinamento?" direcionando ao formulário (F2) ou aos canais diretos (F3).
6. Permitir acesso direto à seção pela âncora `#treinamentos` a partir do menu de navegação.

**Regras de negócio**

| ID | Regra |
|---|---|
| RN-F21-01 | A seção deve exibir exatamente as 6 trilhas oficiais: Onboarding e Integração; Times de Alta Performance; Desenvolvimento de Liderança; Cultura e Engajamento; Inteligência Emocional; Comunicação e Feedback. |
| RN-F21-02 | A trilha Desenvolvimento de Liderança é a **carro-chefe** e deve exibir selo distintivo "CARRO-CHEFE"; nenhuma outra trilha pode exibir o selo. |
| RN-F21-03 | Facilitadoras oficiais: **Michelly** (psicóloga — Psicologia Organizacional: Desenvolvimento de Liderança, Inteligência Emocional, Comportamento Organizacional) e **Giovana** (pedagoga — Desenho Pedagógico, Treinamento & Desenvolvimento, Formação de Equipes). |
| RN-F21-04 | A metodologia deve ser apresentada nas 4 etapas na ordem: Briefing → Diagnóstico → Desenho sob medida → Aplicação e acompanhamento. |
| RN-F21-05 | Os 4 formatos exibidos devem ser: In company (presencial ou online); Programas pontuais ou continuados; Acompanhamento pós-treinamento; Turmas de liderança ou times completos. |
| RN-F21-06 | O CTA da seção usa o texto oficial "Vamos montar seu treinamento?" e direciona para o formulário (F2) ou canais diretos (F3). |
| RN-F21-07 | A âncora de acesso à seção é `#treinamentos`, funcionando por hash sem depender de JavaScript. |
| RN-F21-08 | A seção não coleta dados pessoais próprios: o formulário de contato (F2) permanece como ponto de conversão; a finalidade de tratamento deve prever mensagens relacionadas a "treinamento" (interesse em treinamentos). |

**Critérios de aceite**

| ID | Critério (condição → resultado) |
|---|---|
| CA-F21-01 | Renderizar a seção em viewports de 360px, 768px e 1280px → as 6 trilhas, facilitadoras, metodologia e formatos são exibidos sem sobreposição ou corte de conteúdo. |
| CA-F21-02 | Clicar no link de menu da âncora `#treinamentos` → a página rola até a seção correspondente sem erros de console. |
| CA-F21-03 | Inspecionar a seção → a trilha Desenvolvimento de Liderança exibe o selo "CARRO-CHEFE" e as demais não. |
| CA-F21-04 | Passar o mouse (ou focar via teclado) sobre um card de trilha → o card exibe estado de hover/focus visível e o conteúdo permanece legível. |
| CA-F21-05 | Auditar a seção com leitor de tela e teclado → cards, selo e CTA são alcançáveis e anunciados corretamente (WCAG AA). |
| CA-F21-06 | Clicar no CTA "Vamos montar seu treinamento?" → o usuário é levado ao formulário (F2) ou aos canais diretos (F3). |

**Dependências**

- F1 (integração à landing e âncoras), F2 (conversão via formulário), F3 (canais diretos como fallback), F9 (acessibilidade dos cards), F7 (SEO da seção, quando aplicável).

**Pontos sensíveis LGPD**

| Aspecto | Definição |
|---|---|
| Dados coletados | Nenhum dado pessoal extra: a seção é conteúdo institucional estático |
| Finalidade | Apresentação institucional do portfólio de treinamentos; conversão ocorre via F2 (formulário de contato) |
| Base legal | Não se aplica à seção em si; aplica-se ao F2 quando o usuário converte (consentimento — art. 7º, I) |
| Retenção | Não se aplica à seção; retenção segue as regras do F2 para mensagens recebidas |
| Observação | A finalidade LGPD do F2 deve prever que a mensagem pode mencionar "treinamento"; nenhum dado pessoal adicional é coletado nesta seção |

---

## 6. Matriz de rastreabilidade resumida (funcionalidades → regras/critérios)

| ID | Regras de negócio (RN) | Critérios de aceite (CA) | Requisitos funcionais (RF) |
|---|---|---|---|
| F1 | RN-F01-01 a 07 | CA-F01-01 a 06 | RF-001 a RF-006 |
| F2 | RN-F02-01 a 08 | CA-F02-01 a 08 | RF-007 a RF-020 |
| F3 | RN-F03-01 a 03 | CA-F03-01 a 04 | RF-021 a RF-025 |
| F4 | RN-F04-01 a 06 | CA-F04-01 a 06 | RF-026 a RF-036 |
| F5 | RN-F05-01 a 04 | CA-F05-01 a 04 | RF-037 a RF-042 |
| F6 | RN-F06-01 a 06 | CA-F06-01 a 06 | RF-043 a RF-050 |
| F7 | RN-F07-01 a 05 | CA-F07-01 a 06 | RF-051 a RF-062 |
| F8 | RN-F08-01 a 06 | CA-F08-01 a 06 | RF-063 a RF-069 |
| F9 | RN-F09-01 a 05 | CA-F09-01 a 06 | RF-070 a RF-077 |
| F10 | RN-F10-01 a 05 | CA-F10-01 a 05 | RF-078 a RF-084 |
| F11 | RN-F11-01 a 05 | CA-F11-01 a 05 | RF-085 a RF-092 |
| F12 | RN-F12-01 a 06 | CA-F12-01 a 06 | RF-093 a RF-105 |
| F13 | RN-F13-01 a 05 | CA-F13-01 a 05 | RF-106 a RF-111 |
| F14 | RN-F14-01 a 04 | CA-F14-01 a 04 | RF-112 a RF-117 |
| F15 | RN-F15-01 a 04 | CA-F15-01 a 04 | RF-118 a RF-122 |
| F16 | RN-F16-01 a 04 | CA-F16-01 a 04 | RF-123 a RF-129 |
| F17 | RN-F17-01 a 04 | CA-F17-01 a 04 | RF-130 a RF-135 |
| F18 | RN-F18-01 a 04 | CA-F18-01 a 04 | RF-136 a RF-141 |
| F19 | RN-F19-01 a 05 | CA-F19-01 a 04 | RF-142 a RF-148 |
| F20 | RN-F20-01 a 05 | CA-F20-01 a 05 | RF-149 a RF-155 |
| F21 | RN-F21-01 a 08 | CA-F21-01 a 06 | RF-156 a RF-165 |

---

## 7. Tratamento de dados pessoais — visão consolidada

| Funcionalidade | Dados pessoais | Base legal (art. 7º LGPD) | Retenção recomendada |
|---|---|---|---|
| F1 | Nenhum (logs técnicos) | Legítimo interesse (IX) | Logs ≤ 6 meses |
| F2 | Nome, e-mail, empresa, cargo, telefone, IP | Consentimento (I); legítimo interesse (IX) anti-spam | Atendimento + 12 meses (lead não convertido) |
| F3 | Nenhum pelo site | Não se aplica | Não se aplica |
| F4 | Busca anônima; autores (F12) | Legítimo interesse (IX) | Autores: enquanto vínculo + prazo legal |
| F5 | Nenhum | Obrigação legal/transparência (II, 9º, 41) | Documento vigente + versões arquivadas |
| F6 | Preferência de consentimento | Consentimento (I); necessidade técnica | Cookie de consentimento ≤ 12 meses |
| F7 | Nenhum | Não se aplica | Não se aplica |
| F8 | Logs técnicos | Legítimo interesse (IX) | ≤ 6 meses |
| F9 | Nenhum | Não se aplica | Não se aplica |
| F10 | Navegação anônima; IP mascarado | Consentimento (I) | ≤ 14 meses |
| F11 | Nome, e-mail, data/hora | Consentimento (I) com double opt-in | Até descadastro + 90 dias; não confirmados: 7 dias |
| F12 | Usuários internos, mensagens, autores | Legítimo interesse (IX); contrato | Vínculo + prazo legal; logs ≤ 12 meses |
| F13 | Leads (F2/F11) + ID interno | Consentimento (I); operador com contrato | Conforme F2/F11 + política do CRM |
| F14 | Nome, e-mail, empresa, horário | Medidas pré-contratuais (V) | Até a consulta; após, migra ao contrato |
| F15 | Nome, empresa, mensagens, número | Consentimento (I) | Enquanto durar o relacionamento |
| F16 | Mesmos de cada funcionalidade | Mesmas bases | Mesmas regras |
| F17 | Cadastro do cliente; relatórios com dados de colaboradores | Execução contratual (V); cliente controlador | Contrato + obrigações legais (5 anos documentos) |
| F18 | Nome, e-mail, telefone, currículo | Consentimento (I); medidas pré-contratuais (V); art. 11 p/ sensíveis | 90 dias (sem banco); até 24 meses (banco de talentos) |
| F19 | Nome, cargo, empresa, foto, texto | Consentimento explícito (I) + imagem (art. 20 CC) | Enquanto publicado; evidência + 12 meses |
| F20 | Respostas; e-mail quando informado | Consentimento (I); agregado anônimo (IX) | Anônimo ≤ 12 meses; com e-mail ≤ 6 meses sem conversão |
| F21 | Nenhum (conteúdo institucional); conversão via F2 | Não se aplica; F2 com consentimento (I) | Não se aplica; retenção segue F2 |

**Direitos do titular (arts. 18–19):** o site deve oferecer canal para confirmação de existência, acesso, correção, anonimização, portabilidade, eliminação e revogação de consentimento — ver RF-040 a RF-042 e RNF-043 a RNF-052.

---

## 8. Glossário

| Termo | Definição |
|---|---|
| LGPD | Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018) |
| Titular | Pessoa física a quem se referem os dados pessoais |
| Controlador | Quem decide sobre o tratamento (Eliora RH, nos dados do site) |
| Operador | Quem processa em nome do controlador (CRM, provedor de e-mail, CDN) |
| Consentimento | Manifestação livre, informada e inequívoca (art. 5º, XII) |
| ROPA | Registro das Operações de Tratamento (art. 37) |
| DPO/Encarregado | Profissional responsável por comunicação com titulares e ANPD (art. 41) |
| Double opt-in | Confirmação em duas etapas da inscrição (e-mail + clique no link) |
| Webhook | Chamada HTTP automática de um sistema para outro ao ocorrer evento |
| Slug | Identificador legível de URL de um artigo |
| Core Web Vitals | Métricas de experiência: LCP, CLS, INP |
| WCAG 2.1 AA | Padrão internacional de acessibilidade, nível AA |
| Honeypot | Campo oculto em formulário que captura robôs de spam |

---

## 9. Aprovação e controle de versão

| Versão | Data | Autor | Descrição |
|---|---|---|---|
| 0.1 | 12/08/2026 | Time de Produto | Rascunho inicial para revisão interna |
| 1.0 | — | — | Versão consolidada após revisões (pendente) |
| 1.1 | 13/08/2026 | HR & Consulting | Dados absorvidos: Portfólio de Treinamentos (2026) e Brand Book — adicionada F21, pilares/visão/tom de voz e contatos oficiais atualizados |

**Próximos passos sugeridos:** revisão jurídica das bases legais (seção 7), validação do catálogo com o cliente e desdobramento em requisitos (documento `02-requisitos.md`).
