# Casos de Teste Funcionais — Site Institucional Eliora RH

| Campo | Valor |
|---|---|
| **Documento** | `02-casos-teste-funcionais.md` |
| **Versão** | 1.0 |
| **Data** | 12/08/2026 |
| **Status** | Em revisão |
| **Referência** | `01-plano-de-testes.md` (seção 4.1) |

**Convenções:**

- **ID:** `CT-F-XXX` (único e rastreável).
- **Severidade:** S1 Blocker | S2 Crítico | S3 Maior | S4 Menor | S5 Trivial.
- **Prioridade:** P1 Urgente | P2 Alta | P3 Média | P4 Baixa.
- **Ambientes:** Local, Staging, Produção (conforme `01-plano-de-testes.md`, seção 5).
- **Navegador padrão de automação:** Chrome (Chromium), última versão; casos de teclado testados também em Firefox/Safari.

---

## 1. Navegação e âncoras da Home

### CT-F-001 — Navegação principal carrega e leva às rotas internas

- **Pré-condições:** Site no ar em qualquer ambiente; usuário na home (`/`).
- **Passos:**
  1. Acessar `/`.
  2. Clicar em cada item do menu de navegação principal (Serviços, Sobre, Blog, Contato).
- **Dados de entrada:** N/A.
- **Resultado esperado:** Cada clique leva à rota correspondente (`/servicos`, `/sobre`, `/blog`, `/contato`) com carregamento correto, sem erro 404 e sem quebra de layout.
- **Severidade:** S2 — **Prioridade:** P2

### CT-F-002 — Âncoras internas da home (#significado, #pilares, #treinamentos, #abordagem, #valores, #contato)

- **Pré-condições:** Usuário na home (`/`).
- **Passos:**
  1. Acessar `/`.
  2. Clicar em cada link de âncora disponível no menu/CTA: `#significado`, `#pilares`, `#treinamentos`, `#abordagem`, `#valores`, `#contato`.
  3. Verificar a URL e a posição de rolagem após cada clique.
- **Dados de entrada:** N/A.
- **Resultado esperado:** A página rola suavemente (comportamento padrão respeitando `prefers-reduced-motion`) até a seção com o `id` correspondente; a URL ganha o hash (`/#pilares`, etc.); o conteúdo da seção fica visível e legível.
- **Severidade:** S3 — **Prioridade:** P2

### CT-F-003 — Âncoras via URL direta (deep link com hash)

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Abrir `/#contato` diretamente no navegador (nova sessão).
  2. Verificar se a página rola até a seção de contato.
- **Dados de entrada:** `/#contato` (também testar `/#valores`).
- **Resultado esperado:** A seção correspondente é posicionada no topo da viewport ao carregar, mesmo com header fixo compensando o deslocamento.
- **Severidade:** S3 — **Prioridade:** P3

### CT-F-004 — Logo/brand clicável retorna à home

- **Pré-condições:** Usuário em qualquer rota interna (ex.: `/servicos`).
- **Passos:**
  1. Clicar no logo Eliora RH.
- **Dados de entrada:** N/A.
- **Resultado esperado:** Navega para `/` e mantém foco acessível (para usuários de teclado, o foco permanece visível).
- **Severidade:** S4 — **Prioridade:** P4

---

## 2. Menu Mobile (burger)

### CT-F-005 — Menu burger abre

- **Pré-condições:** Viewport < 768 px (mobile); usuário na home.
- **Passos:**
  1. Reduzir a janela para 375 px de largura.
  2. Clicar/no botão do menu (hambúrguer).
- **Dados de entrada:** N/A.
- **Resultado esperado:** O painel de navegação abre com os itens visíveis; o botão passa a exibir estado ativo (ícone X) e `aria-expanded="true"`.
- **Severidade:** S2 — **Prioridade:** P2

### CT-F-006 — Menu burger fecha

- **Pré-condições:** Menu mobile aberto (ver CT-F-005).
- **Passos:**
  1. Clicar novamente no botão do menu.
  2. Repetir para o fechamento via clique fora do painel e via tecla `Esc` (se suportado).
- **Dados de entrada:** N/A.
- **Resultado esperado:** O painel fecha em todos os cenários; `aria-expanded` volta a `"false"`; o foco retorna ao botão do menu.
- **Severidade:** S3 — **Prioridade:** P2

### CT-F-007 — Navegação pelo menu mobile

- **Pré-condições:** Menu mobile aberto.
- **Passos:**
  1. Tocar em cada item do menu (Serviços, Sobre, Blog, Contato) e verificar navegação.
- **Dados de entrada:** N/A.
- **Resultado esperado:** O item navega para a rota correta e o menu fecha após a navegação (não permanece aberto).
- **Severidade:** S2 — **Prioridade:** P2

---

## 3. Formulário de Contato (rota `/contato` e seção `#contato`)

**Pré-condições gerais do formulário (todas as CT-F abaixo):** Ambiente com o formulário ativo; campos presentes: Nome, E-mail, Empresa (opcional), Telefone (opcional), Mensagem, checkbox de consentimento LGPD; botão "Enviar".

### CT-F-008 — Envio com sucesso (fluxo feliz)

- **Pré-condições:** Formulário renderizado.
- **Passos:**
  1. Preencher todos os campos obrigatórios com dados válidos.
  2. Marcar o checkbox de consentimento LGPD.
  3. Clicar em "Enviar".
- **Dados de entrada:** Nome `Maria Silva`, E-mail `maria.silva@exemplo.com.br`, Empresa `TechCorp`, Telefone `(11) 99999-0000`, Mensagem `Gostaria de uma proposta de consultoria de RH.`, checkbox marcado.
- **Resultado esperado:** O envio é aceito; o usuário é redirecionado para `/obrigado`; nenhum erro exibido; a submissão é registrada no backend (modo teste em staging).
- **Severidade:** S2 — **Prioridade:** P2

### CT-F-009 — Campos obrigatórios vazios

- **Pré-condições:** Formulário renderizado.
- **Passos:**
  1. Clicar em "Enviar" sem preencher nada.
- **Dados de entrada:** Todos os campos vazios; checkbox desmarcado.
- **Resultado esperado:** Envio bloqueado; mensagens de erro por campo ("Informe seu nome", "Informe um e-mail válido", "Escreva uma mensagem", "É necessário aceitar a Política de Privacidade"); nenhuma requisição de rede enviada; erros anunciados via `aria-live`.
- **Severidade:** S2 — **Prioridade:** P2

### CT-F-010 — E-mail inválido

- **Pré-condições:** Formulário renderizado.
- **Passos:**
  1. Preencher demais obrigatórios corretamente e o checkbox.
  2. Preencher o e-mail com valor inválido e enviar.
- **Dados de entrada (inválidos):** `maria.silva`, `maria@`, `@exemplo.com`, `maria@exemplo`, `maria silva@exemplo.com` (espaço), `maria@exemplo..com` (ponto duplo).
- **Resultado esperado:** Erro exibido no campo e-mail para cada valor inválido ("Informe um e-mail válido"); envio bloqueado; valor não é enviado ao backend.
- **Severidade:** S3 — **Prioridade:** P2

### CT-F-011 — Mensagem muito longa (limite de caracteres)

- **Pré-condições:** Formulário renderizado.
- **Passos:**
  1. Preencher campos obrigatórios válidos e checkbox.
  2. Inserir mensagem acima do limite definido (ex.: > 2000 caracteres) e enviar.
- **Dados de entrada (inválidos):** Mensagem com 2001 caracteres (repetição de "a" e de frases longas); também testar exatamente no limite (2000) e no limite + 1.
- **Resultado esperado:** Erro indicando o tamanho máximo permitido; envio bloqueado; contador de caracteres (se existir) coerente. No limite exato, o envio é aceito.
- **Severidade:** S4 — **Prioridade:** P3

### CT-F-012 — Consentimento LGPD desmarcado

- **Pré-condições:** Formulário renderizado.
- **Passos:**
  1. Preencher todos os campos obrigatórios válidos.
  2. **Não** marcar o checkbox de consentimento.
  3. Clicar em "Enviar".
- **Dados de entrada:** Campos válidos; checkbox desmarcado.
- **Resultado esperado:** Envio bloqueado; erro explícito: "É necessário aceitar a Política de Privacidade para enviar sua mensagem"; **nenhum dado é gravado** (verificar no backend/logs); mensagem de erro acessível.
- **Severidade:** S2 — **Prioridade:** P1 (risco LGPD)

### CT-F-013 — Envio duplicado / duplo clique

- **Pré-condições:** Formulário preenchido corretamente; rede com latência simulada (opcional).
- **Passos:**
  1. Preencher campos válidos e marcar o checkbox.
  2. Clicar rapidamente 2–3 vezes em "Enviar" (ou pressionar Enter repetidamente).
- **Dados de entrada:** Campos válidos; cliques rápidos.
- **Resultado esperado:** Apenas **1** requisição de envio é disparada (botão desabilitado durante o processamento, com estado de loading); sem duplicação de registros no backend; sem e-mails duplicados.
- **Severidade:** S2 — **Prioridade:** P1

### CT-F-014 — Resposta de erro do servidor (falha de rede / 5xx)

- **Pré-condições:** Capacidade de simular falha (desligar rede, mock 500 no backend, ou desligar o servidor).
- **Passos:**
  1. Preencher campos válidos e checkbox.
  2. Simular falha (rede offline ou backend retornando 500/503).
  3. Clicar em "Enviar".
- **Dados de entrada:** Campos válidos; cenário de erro simulado.
- **Resultado esperado:** Mensagem de erro amigável ("Não foi possível enviar. Tente novamente em instantes.") exibida de forma acessível; o usuário permanece na página com os dados preservados; ao restaurar o serviço, o envio funciona sem re-preencher.
- **Severidade:** S3 — **Prioridade:** P2

### CT-F-015 — Sucesso redireciona para /obrigado

- **Pré-condições:** Envio com sucesso (ver CT-F-008).
- **Passos:**
  1. Após o envio bem-sucedido, verificar a URL e o conteúdo.
  2. Navegar de volta ao formulário (botão voltar/browser).
- **Dados de entrada:** N/A.
- **Resultado esperado:** URL é `/obrigado`; página exibe confirmação de recebimento; ao voltar, o formulário não reenvia (evitar re-submissão duplicada); mensagem de agradecimento clara.
- **Severidade:** S2 — **Prioridade:** P2

### CT-F-016 — HTML autocompletar e validação nativa não quebram o fluxo

- **Pré-condições:** Formulário renderizado.
- **Passos:**
  1. Usar autocompletar do navegador para preencher nome/e-mail.
  2. Enviar com dados válidos.
- **Dados de entrada:** Valores do autocompletar.
- **Resultado esperado:** Validação aplicada normalmente; envio aceito se válido; mensagens de erro em PT-BR; atributos `autocomplete` adequados nos campos.
- **Severidade:** S4 — **Prioridade:** P4

---

## 4. Canais de Contato

### CT-F-017 — Link mailto

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Na home (`#contato`) ou `/contato`, clicar no link de e-mail.
- **Dados de entrada:** N/A (espera-se `mailto:contato@eliora.com.br` ou similar).
- **Resultado esperado:** O cliente de e-mail padrão abre com o destinatário correto e, idealmente, assunto pré-preenchido; se `mailto` não abrir (mobile), o link não quebra a página.
- **Severidade:** S3 — **Prioridade:** P3

### CT-F-018 — Link WhatsApp

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Clicar no botão/ícone de WhatsApp.
- **Dados de entrada:** N/A (espera-se `https://wa.me/55...`).
- **Resultado esperado:** O link abre o WhatsApp (app em mobile; web em desktop) com mensagem padrão pré-preenchida; URL válida; abre em nova aba quando aplicável.
- **Severidade:** S3 — **Prioridade:** P3

### CT-F-019 — Links Instagram e LinkedIn

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Clicar nos ícones de Instagram e LinkedIn (header/footer).
- **Dados de entrada:** N/A.
- **Resultado esperado:** Abrem os perfis oficiais em nova aba (`target="_blank"` com `rel="noopener noreferrer"`); URL correta e sem 404.
- **Severidade:** S3 — **Prioridade:** P3

### CT-F-020 — Ícones de redes sociais com aria-label

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Inspecionar os botões de redes sociais via DevTools/axe.
- **Dados de entrada:** N/A.
- **Resultado esperado:** Cada botão possui `aria-label` descritivo ("WhatsApp da Eliora RH", "Instagram da Eliora RH", "LinkedIn da Eliora RH"); sem texto vazio para leitores de tela.
- **Severidade:** S3 — **Prioridade:** P2 (detalhe técnico em CT-A-006)

---

## 5. Scroll Reveal e Header

### CT-F-021 — Scroll reveal ativa elementos ao rolar

- **Pré-condições:** Usuário na home com JS habilitado.
- **Passos:**
  1. Rolar a página lentamente pelas seções.
  2. Observar os elementos com animação de entrada (cards, títulos).
- **Dados de entrada:** N/A.
- **Resultado esperado:** Elementos aparecem com animação suave ao entrar na viewport; sem elementos invisíveis após a rolagem; respeita `prefers-reduced-motion` (sem animação quando reduzido); conteúdo permanece acessível ao teclado (não permanece `opacity:0` se o JS falhar).
- **Severidade:** S3 — **Prioridade:** P3

### CT-F-022 — Header muda ao rolar

- **Pré-condições:** Usuário na home.
- **Passos:**
  1. Rolar a página para baixo e para cima.
  2. Observar o header (fundo/sombra/estado).
- **Dados de entrada:** N/A.
- **Resultado esperado:** O header aplica o estilo esperado (ex.: fundo sólido/sombra) ao rolar e retorna ao estado inicial no topo; links continuam clicáveis e legíveis; contraste preservado nos dois estados.
- **Severidade:** S4 — **Prioridade:** P4

---

## 6. Páginas de Privacidade e Termos

### CT-F-023 — Política de Privacidade acessível e legível

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Acessar `/privacidade` (via link do footer/banner de cookies).
  2. Verificar conteúdo, navegação e links internos.
- **Dados de entrada:** N/A.
- **Resultado esperado:** Página carrega com HTTP 200; texto sobre LGPD presente (base legal, finalidade, direitos do titular, contato do encarregado); navegação por âncoras de seção (se existirem) funcional; link de volta à home/footer presente; sem scroll horizontal.
- **Severidade:** S2 — **Prioridade:** P2

### CT-F-024 — Termos de Uso acessíveis

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Acessar `/termos`.
  2. Verificar conteúdo e links.
- **Dados de entrada:** N/A.
- **Resultado esperado:** Página carrega com HTTP 200; conteúdo coerente com o site (consultoria RH); links funcionais; legibilidade adequada.
- **Severidade:** S3 — **Prioridade:** P3

---

## 7. Banner de Cookies (LGPD)

### CT-F-025 — Banner exibido na primeira visita

- **Pré-condições:** Cookies limpos; nova sessão.
- **Passos:**
  1. Abrir o site pela primeira vez.
- **Dados de entrada:** Sessão sem cookies.
- **Resultado esperado:** Banner de consentimento aparece ao carregar; opções de "Aceitar todos", "Rejeitar" e "Gerenciar preferências" visíveis; conteúdo informa finalidade do uso de cookies; banner não bloqueia conteúdo (não-modal ou modal dismissível).
- **Severidade:** S3 — **Prioridade:** P2

### CT-F-026 — Aceitar todos os cookies

- **Pré-condições:** Banner visível.
- **Passos:**
  1. Clicar em "Aceitar todos".
  2. Recarregar a página.
- **Dados de entrada:** N/A.
- **Resultado esperado:** Banner desaparece; preferência persistida (cookie/localStorage); ao recarregar, banner não reaparece; cookies de análise (se houver) podem ser carregados.
- **Severidade:** S3 — **Prioridade:** P2

### CT-F-027 — Rejeitar cookies

- **Pré-condições:** Banner visível.
- **Passos:**
  1. Clicar em "Rejeitar".
  2. Recarregar a página.
- **Dados de entrada:** N/A.
- **Resultado esperado:** Banner desaparece; preferência persistida; **nenhum cookie de terceiros/análise é carregado** (verificar via DevTools/Network); ao recarregar, banner não reaparece.
- **Severidade:** S2 — **Prioridade:** P1 (risco LGPD)

### CT-F-028 — Gerenciar preferências e persistência

- **Pré-condições:** Banner visível ou link "Gerenciar cookies" no footer.
- **Passos:**
  1. Clicar em "Gerenciar preferências".
  2. Alternar categorias (necessários/análise/marketing, conforme existirem).
  3. Salvar e recarregar.
- **Dados de entrada:** Combinações de categorias.
- **Resultado esperado:** O painel abre com checkboxes; escolhas salvas persistem entre sessões; apenas as categorias aceitas carregam scripts; é possível revisar preferências posteriormente via link no footer.
- **Severidade:** S3 — **Prioridade:** P2

### CT-F-029 — Navegação por teclado no banner

- **Pré-condições:** Banner visível.
- **Passos:**
  1. Navegar pelos controles do banner usando somente Tab/Enter/Espaço/Esc.
- **Dados de entrada:** N/A.
- **Resultado esperado:** Todos os controles do banner são alcançáveis e acionáveis por teclado; foco visível; o foco não fica preso (em banner modal, usar focus trap e retorno do foco).
- **Severidade:** S3 — **Prioridade:** P2

---

## 8. Página 404

### CT-F-030 — Rota inexistente exibe 404 customizada

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Acessar uma rota inexistente (ex.: `/pagina-inexistente`).
- **Dados de entrada:** `/rota-aleatoria-xyz`.
- **Resultado esperado:** A página 404 customizada é exibida (não o erro genérico do servidor); status HTTP 404 (não 200); link de volta à home e/ou para `/contato`; mensagem clara; acessível (leitura de tela anuncia erro).
- **Severidade:** S3 — **Prioridade:** P2

### CT-F-031 — 404 mantém navegação/header/footer

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Na página 404, usar o menu para navegar a outras rotas.
- **Dados de entrada:** N/A.
- **Resultado esperado:** Header, footer e navegação permanecem funcionais na página 404 (não é uma tela órfã); o usuário consegue sair dela com facilidade.
- **Severidade:** S4 — **Prioridade:** P3

---

## 9. Acessibilidade Básica por Teclado (pontos funcionais)

> Verificação aprofundada de acessibilidade em `04-casos-teste-performance-acessibilidade.md` (CT-A-XXX).

### CT-F-032 — Navegação completa por teclado

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Carregar o site sem mouse; navegar por todas as páginas usando apenas Tab, Shift+Tab, Enter, Espaço e Esc.
- **Dados de entrada:** N/A.
- **Resultado esperado:** Todos os links, botões, formulários e menus são alcançáveis e acionáveis por teclado; a ordem de tabulação é lógica; o foco nunca fica invisível ou preso; nenhum elemento essencial é inacessível.
- **Severidade:** S2 — **Prioridade:** P2

### CT-F-033 — Skip link (pular para o conteúdo)

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Pressionar `Tab` ao carregar a página.
- **Dados de entrada:** N/A.
- **Resultado esperado:** O primeiro foco é o link "Pular para o conteúdo"; ao ativá-lo, o foco vai para o conteúdo principal (`#conteudo`/`main`) e o restante da página permanece acessível.
- **Severidade:** S2 — **Prioridade:** P2

---

## 10. SEO Técnico

### CT-F-034 — Title único e meta description em todas as páginas

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Acessar cada rota: `/`, `/servicos`, `/sobre`, `/blog`, `/blog/[slug]` (artigo de exemplo), `/contato`, `/privacidade`, `/termos`.
  2. Inspecionar `<title>` e `<meta name="description">` via DevTools.
- **Dados de entrada:** Rotas listadas.
- **Resultado esperado:** Cada página tem `<title>` único, relevante e com ≤ 60 caracteres aproximadamente; `meta description` única e com 120–160 caracteres; não há duplicação entre páginas.
- **Severidade:** S3 — **Prioridade:** P3

### CT-F-035 — Open Graph presente nas páginas

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Inspecionar o `<head>` das páginas principais (`/`, `/blog/[slug]`, `/contato`).
- **Dados de entrada:** Rotas listadas.
- **Resultado esperado:** Tags `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:locale` (pt_BR) e `og:site_name` presentes e com valores coerentes; imagens OG existentes e com tamanho adequado (≥ 1200×630).
- **Severidade:** S4 — **Prioridade:** P4

### CT-F-036 — Canonical correto

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Acessar páginas com variação de URL (trailing slash, query strings, maiúsculas) e inspecionar `<link rel="canonical">`.
- **Dados de entrada:** `/`, `/?utm_source=test`, `/servicos`, `/servicos/`.
- **Resultado esperado:** A tag canonical aponta para a URL canônica absoluta; páginas com parâmetros de rastreio mantêm a canonical base; sem canônicas apontando para 404.
- **Severidade:** S4 — **Prioridade:** P3

### CT-F-037 — JSON-LD válido (Organization, WebSite e BlogPosting)

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Acessar `/` e um artigo de blog (`/blog/[slug]`).
  2. Copiar os scripts `application/ld+json` e validar no validador oficial do Google (Rich Results Test) ou ferramenta equivalente.
- **Dados de entrada:** Rotas listadas.
- **Resultado esperado:** JSON-LD estruturalmente válido (schema.org): `Organization` na home (nome, logo, contato), `WebSite`, e `BlogPosting`/`Article` nos artigos com título, descrição, data, autor; zero erros de parse; URLs absolutas.
- **Severidade:** S3 — **Prioridade:** P3

### CT-F-038 — sitemap.xml e robots.txt acessíveis

- **Pré-condições:** Nenhuma.
- **Passos:**
  1. Acessar `/sitemap.xml` e `/robots.txt`.
  2. Conferir se `robots.txt` referencia o sitemap e se as URLs listadas retornam 200.
- **Dados de entrada:** `/sitemap.xml`, `/robots.txt`.
- **Resultado esperado:** `sitemap.xml` retorna XML válido com as rotas públicas (sem páginas de erro); `robots.txt` permite rastreamento do site e aponta para o sitemap; produção indexável, staging com `noindex`.
- **Severidade:** S4 — **Prioridade:** P3

---

## Resumo do arquivo

| ID | Título | Severidade | Prioridade |
|---|---|---|---|
| CT-F-001 | Navegação principal | S2 | P2 |
| CT-F-002 | Âncoras da home | S3 | P2 |
| CT-F-003 | Deep link com hash | S3 | P3 |
| CT-F-004 | Logo clicável | S4 | P4 |
| CT-F-005 | Menu burger abre | S2 | P2 |
| CT-F-006 | Menu burger fecha | S3 | P2 |
| CT-F-007 | Navegação menu mobile | S2 | P2 |
| CT-F-008 | Formulário — sucesso | S2 | P2 |
| CT-F-009 | Formulário — obrigatórios vazios | S2 | P2 |
| CT-F-010 | Formulário — e-mail inválido | S3 | P2 |
| CT-F-011 | Formulário — mensagem longa | S4 | P3 |
| CT-F-012 | Formulário — LGPD desmarcado | S2 | P1 |
| CT-F-013 | Formulário — duplo clique | S2 | P1 |
| CT-F-014 | Formulário — erro do servidor | S3 | P2 |
| CT-F-015 | Sucesso → /obrigado | S2 | P2 |
| CT-F-016 | Autocompletar/validação nativa | S4 | P4 |
| CT-F-017 | Link mailto | S3 | P3 |
| CT-F-018 | Link WhatsApp | S3 | P3 |
| CT-F-019 | Links Instagram/LinkedIn | S3 | P3 |
| CT-F-020 | Ícones com aria-label | S3 | P2 |
| CT-F-021 | Scroll reveal | S3 | P3 |
| CT-F-022 | Header ao rolar | S4 | P4 |
| CT-F-023 | Política de Privacidade | S2 | P2 |
| CT-F-024 | Termos de Uso | S3 | P3 |
| CT-F-025 | Banner cookies — primeira visita | S3 | P2 |
| CT-F-026 | Banner — aceitar | S3 | P2 |
| CT-F-027 | Banner — rejeitar | S2 | P1 |
| CT-F-028 | Banner — gerenciar/persistência | S3 | P2 |
| CT-F-029 | Banner — teclado | S3 | P2 |
| CT-F-030 | Página 404 | S3 | P2 |
| CT-F-031 | 404 com navegação | S4 | P3 |
| CT-F-032 | Teclado — navegação completa | S2 | P2 |
| CT-F-033 | Skip link | S2 | P2 |
| CT-F-034 | Title/meta description únicos | S3 | P3 |
| CT-F-035 | Open Graph | S4 | P4 |
| CT-F-036 | Canonical | S4 | P3 |
| CT-F-037 | JSON-LD válido | S3 | P3 |
| CT-F-038 | sitemap/robots | S4 | P3 |

**Total de casos funcionais: 38 (CT-F-001 a CT-F-038)**
