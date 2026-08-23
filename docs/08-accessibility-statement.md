# Accessibility Statement — Eliora RH Site

> Compromisso com a acessibilidade em conformidade com as Web Content Accessibility Guidelines (WCAG) 2.2, nível AA.

## 📜 Declaração de Conformidade

A Eliora RH se compromete a garantir que seu site institucional seja acessível a pessoas com deficiência. O site foi desenvolvido seguindo princípios de acessibilidade desde a concepção, com foco em proporcionar uma experiência inclusiva para todos os usuários.

## ✅ Recursos de Acessibilidade Implementados

### 1. Contraste de Cores
- Todas as combinações de texto/background seguem a razão de contraste mínima de 4.5:1 (nível AA) conforme WCAG 2.2
- Cores da marca utilizadas: `--plum (#471C3D)`, `--gold (#D4A26A)`, `--cream (#F2E9E2)`, `--white (#FFF)`
- Texto em fundo escuro (plum) sobre fundo claro tem contraste adequado
- **Exceção controlada**: Cores dos links do drawer mobile em `< 768px` são definidas com cor sólida da marca (não gradiente), conforme especificado em `css/responsive.css`

### 2. Estrutura Semântica
- Uso correto de heading hierarchy: `<h1>` → `<h2>` → `<h3>` (verificar ordem no `index.html`)
- Elementos `<nav>`, `<main>`, `<section>`, `<footer>` usados apropriadamente
- `data-section-theme="dark"` atributo em seções escuras (hero, pilares, abordagem, contato, footer) para permitir ao header trocar cor do texto do nav quando scrolado

### 3. Navegação por Teclado
- Todo o conteúdo interativo é acessível via teclado (Tab/Shift+Tab)
- Menu mobile funcional com abertura/fechamento via tecla `Escape` ou botão de fechar
- Links visíveis de foco (`:focus` styles definidos no CSS)

### 4. Imagens e Conteúdo Visual
- Todas as imagens possuem `alt` text descritivo
- Logos da marca têm `alt` com nome da empresa
- Ícones SVG têm descrição acessível via `aria-label` ou `title`

### 5. Redes Sociais e Links
- Hover nos links sociais do footer usa cor sólida da marca (não gradiente)
- Cores específicas por rede: WhatsApp `#25D366`, LinkedIn `#0A66C2`, Instagram `#D6249F`, TikTok `#000`, Email `#EA4335`, Location `#4285F4`
- Todos os CTAs (`Fale conosco`, `Agende uma conversa`) têm `target="_blank" rel="noopener"` e texto descritivo

### 6. Responsividade
- Layout fluido que se adapta de desktop (1200px) a mobile (320px)
- Breakpoints em: 980px, 900px, 768px, 640px
- Nenhum horizontal scroll em qualquer dispositivo
- Imagens e textos se redimensionam proporcionalmente

## ⚠️ Limitações e Áreas de Melhoria

### Conhecidas atualmente:
1. **Imagens decorativas sem alt text** — algumas imagens de fundo ou divs puramente visuais podem não ter `alt` descritivo. Em breve: adicionar `alt=""` ou `role="presentation"`.
2. **Formulários** — o site não possui formulário de contato (CTAs levam ao Linktree), mas se formulários forem adicionados no futuro, precisarão de labels associados e validação acessível.
3. **Legendas em vídeos** — caso vídeos sejam adicionados no futuro, deverão ter legendas e transcripts.

### Plano de ação:
- [ ] Auditar todas as imagens para garantir `alt` text adequado
- [ ] Implementar testes com leitores de tela (NVDA, VoiceOver) em próximas iterações
- [ ] Manter conformidade WCAG AA em todas as atualizações futuras

## 📅 Data da Última Revisão

**23 de agosto de 2026** — Revisão após reorganização de documentação e validação de contraste e estrutura semântica.

## 📬 Contato

Se você encontrar barreiras de acessibilidade neste site, entre em contato:

- **E-mail:** eliorarh@gmail.com
- **WhatsApp:** +55 44 98837-8110
- **Endereço:** Campo Mourão/PR, Brasil

*Esta declaração será atualizada a cada nova versão do site ou quando novas funcionalidades forem adicionadas.*

---

*Documento vivo — revisado em conjunto com o `DESIGN.md`, `css/tokens.css` e a estrutura atual do `index.html`.*