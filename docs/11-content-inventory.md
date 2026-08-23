# Content Inventory — Eliora RH Site

> Mapeamento completo de todo o conteúdo do site: textos, imagens, links e elementos visuais.
> Essencial para garantir que nenhuma informação seja perdida durante manutenções ou migrações.

## 📄 Visão Geral

O site é uma **single page** (página única) com navegação por âncoras. Todo o conteúdo está contido no `index.html`. Abaixo, cada seção é detalhada com seu conteúdo específico.

---

## 🗺️ Seção por Seção

### 1. Hero ( `#top` )

| Elemento | Conteúdo | Observação |
|----------|----------|------------|
| **Título principal** | `Eliora RH` | Fonte Playfair Display, cor `--plum` |
| **Subtítulo** | `Consultoria de Recursos Humanos em Campo Mourão/PR` | Fonte Montserrat |
| **Proposta** | `Pessoas no centro. Resultados que transformam.` | Destaque visual, abaixo do título |
| **CTA Principal** | `Fale conosco` | Link para `https://eliorarh.netlify.app/`, target="_blank" |
| **Imagem/Background** | Logo da marca (PNG) + possíveis elementos visuais | `assets/images/elora-logo.png` |
| **Classificação de fundo** | Claro (white/cream-soft) | Alternância de temas nas seções |

---

### 2. Significado ( `#significado` )

| Elemento | Conteúdo | Observação |
|----------|----------|------------|
| **Título** | `Significado` | âncora de navegação |
| **Texto principal** | Descrição da filosofia "Pessoas no centro. Resultados que transformam." | Parágrafo explicativo da proposta de valor |
| **Imagens** | Possíveis ilustrações ou fotos de equipe | Verificar `alt` text |
| **Contraste** | Fundo escuro (plum) com texto claro | Requer `data-section-theme="dark"` no `<section>` |

---

### 3. Pilares ( `#pilares` )

| Elemento | Conteúdo | Observação |
|----------|----------|------------|
| **Título** | `Pilares` | âncora de navegação |
| **Itens da lista** | - Atendimento personalizado<br>- Soluções sob medida<br>- Excelência em RH<br>- Parcerias estratégicas | Lista de 4 pilares principais |
| **Ícones/Imagens** | Ícones representando cada pilar | SVG ou PNG com `alt` descritivo |
| **Contraste** | Fundo claro (white/cream-soft) | Texto em `--grey (#333333)` ou `--grey-mid (#4A4A4A)` |

---

### 4. Valores ( `#valores` )

| Elemento | Conteúdo | Observação |
|----------|----------|------------|
| **Título** | `Valores` | âncora de navegação |
| **Itens da lista** | - **Integridade**<br>- **Comprometimento**<br>- **Inovação**<br>- **Colaboração** | Quatro valores fundamentais da Eliora RH |
| **Descrição curta** | Texto explicando cada valor | Pode estar em tooltips ou parágrafos abaixo |
| **Contraste** | Fundo escuro (plum) | `data-section-theme="dark"` |

---

### 5. Treinamentos ( `#treinamentos` )

| Elemento | Conteúdo | Observação |
|----------|----------|------------|
| **Título** | `Treinamentos` | âncora de navegação |
| **Descrição** | Programas de capacitação e desenvolvimento profissional | Texto introdutório |
| **Lista de programas** | - Programa de integração<br>- Liderança e gestão<br>- Desenvolvimento de competências<br>- Legislação trabalhista atualizada | 4 programas principais |
| **Imagens** | Fotos de participantes ou materiais de curso | Verificar `alt` text |
| **Contraste** | Fundo claro (white/cream-soft) | |

---

### 6. Abordagem ( `#abordagem` )

| Elemento | Conteúdo | Observação |
|----------|----------|------------|
| **Título** | `Abordagem` | âncora de navegação |
| **Metodologia** | Descrição do método de trabalho da Eliora RH | "Nossa forma de trabalhar com clientes" |
| **Etapas** | - Diagnóstico inicial<br>- Planejamento estratégico<br>- Implementação<br>- Acompanhamento e resultados | 4 fases do processo |
| **Imagens** | Ilustrações ou diagramas do processo | SVG recomendado |
| **Contraste** | Fundo escuro (plum) | `data-section-theme="dark"` |

---

### 7. Parceiros ( `#parceiros` )

| Elemento | Conteúdo | Observação |
|----------|----------|------------|
| **Título** | `Parceiros` | âncora de navegação |
| **Linhas de molduras** | `.partner-row`/`.partner-frame` com logos | 4 parceiros cadastrados |
| **Logos reais** | - Atual Consultoria Empresarial Financeira<br>- Marlon Lima Advocacia Especializada<br>- Grola Corretora e Negócios Imobiliários | Logos em `assets/icons/` (PNG/SVG) |
| **Tooltip no hover** | Nome do parceiro aparece em overlay plum sobre a logo | `.partner-name` + efeito hover |
| **Mobile (≤640px)** | Apenas logos em linha única | Sem tooltips em mobile |
| **Adicionar novo parceiro** | Duplicar `.partner-item` em `index.html` + colocar logo em `assets/icons/` | `js/partners-slider.js` é código morto (não carrega) |
| **Contraste** | Fundo claro/alternado | |

---

### 8. Contato ( `#contato` )

| Elemento | Conteúdo | Observação |
|----------|----------|------------|
| **Título** | `Contato` | âncora de navegação |
| **E-mail** | `eliorarh@gmail.com` | `mailto:` link |
| **WhatsApp** | `+55 44 98837-8110` | `href="wa.me/+5544988378110"` |
| **Localização** | Campo Mourão/PR, Brasil | Ícone de localização + texto |
| **Redes Sociais** | WhatsApp, LinkedIn, Instagram, TikTok | Links no footer com ícones |
| **CTAs** | `Agende uma conversa` → `https://eliorarh.netlify.app/` | target="_blank" rel="noopener" |
| **Contraste** | Fundo escuro (plum) | `data-section-theme="dark"` |

---

### 9. Footer

| Elemento | Conteúdo | Observação |
|----------|----------|------------|
| **Links sociais** | WhatsApp `#25D366`, LinkedIn `#0A66C2`, Instagram `#D6249F`, TikTok `#000`, Email `#EA4335`, Location `#4285F4` | Cores sólidas (não gradiente) no hover |
| **Direitos autorais** | `© 2026 Eliora RH. Todos os direitos reservados.` | Ano pode ser atualizado automaticamente |
| **CTA final** | `Fale conosco` → Linktree `https://eliorarh.netlify.app/` | target="_blank" rel="noopener" |
| **Nav superior** | Links: Pilares → Valores → Treinamentos → Abordagem | (Versão 1.1.0 — "A marca" removido) |

---

## 🖼️ Inventário de Imagens

| Caminho | Alt Text Sugerido | Tipo |
|---------|-------------------|------|
| `assets/images/elora-logo.png` | Logo Eliora RH – consultoria em RH | Imagem principal |
| `assets/icons/*` | Ícones de parceiros e redes sociais | Ícones SVG/PNG |
| `assets/images/*` (se houver fotos de equipe) | Foto de equipe – [nome do profissional] | Fotografia |
| Logos de parceiros (4) | Nome da empresa – [ex: Atual Consultoria Empresarial] | Ícones de parceiro |

---

## 🔗 Inventário de Links Externos

| Link | Destino | Tipo |
|------|---------|------|
| `https://eliorarh.netlify.app/` | Linktree – principal CTA | External |
| `https://instagram.com/eliora.rh` | Instagram oficial | External |
| `mailto:eliorarh@gmail.com` | E-mail direto | External |
| `wa.me/+5544988378110` | WhatsApp direto | External |
| `https://eliorarh.netlify.app/` (footer) | Fale conosco / Agende conversa | External |

---

## 📝 Observações Importantes

1. **Texto em português (pt-BR)** — todo o conteúdo está em português brasileiro
2. **Nenhum formulário no site** — todos os CTA apontam para o Linktree externo
3. **Parceiros fixos em 4** — para adicionar novo: duplicar `.partner-item` em `index.html` e colocar logo em `assets/icons/`
4. **JS `partners-slider.js`** é código morto — carrossel foi removido, apenas mostra logos em linha
5. **Anos no footer** — verificar se precisa ser atualizado dinamicamente ou manualmente a cada ano
6. **Tokens CSS** — todo texto que referencia cores deve usar `--plum`, `--gold`, `--cream`, etc. (nunca hardcoded)

---

## 🔄 Plano de Manutenção de Conteúdo

| Frequência | Tarefa | Responsável |
|------------|--------|-------------|
| **Mensal** | Verificar se links externos ainda funcionam | Desenvolvedor / Equipe |
| **Trimestral** | Revisar se informações de contato (e-mail, WhatsApp) estão corretas | Equipe Eliora RH |
| **Anual** | Atualizar ano no footer (`© 2026`) | Equipe / Administrador |
| **Conforme necessidade** | Adicionar novo parceiro (duplicar item + inserir logo) | Equipe / Designer |
| **Auditoria** | Verificar consistência de tokens CSS e cores da marca | QA / Designer |

---

*Este inventário deve ser mantido sempre que houver alteração de texto, imagem ou link no `index.html`. Recomenda-se revisão a cada atualização de conteúdo do site.*