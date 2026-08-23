# Eliora RH - Landing Page

Site institucional da **Eliora RH** — consultoria de RH em Campo Mourão/PR.

## � Tecnologia

- **HTML5** + **CSS3** + **JavaScript puro**
- **Sem build step** — não usa framework (React, Vue, etc.)
- **Sem dependências externas** — tudo arquivos estáticos
- **Hospedado em**: Netlify (https://eliorarh.netlify.app/)

## � Estrutura de Pastas

```
Site/
├── index.html              ← Página principal
├── css/                    ← Arquivos de estilização (tokens + layout)
├── js/                     ← JavaScript (header scroll, menu mobile)
├── assets/
│   ├── images/           ← Imagens da marca (logos, fotos)
│   └── icons/            ← Ícones SVG/PNG (redes sociais, setas)
├── netlify.toml            ← Configuração de deploy
├── .gitignore            ← Arquivos ignorados pelo Git
└── AGENTS.md             ← Contexto do projeto (skills, convenções)
```

## � Deploy no Netlify

- **Pasta de deploy**: `publish/` (contém apenas os arquivos essenciais)
- **URL do site**: https://eliorarh.netlify.app/
- **Como atualizar**: Subir a pasta `publish/` ou conectar o repositório Netlify com a pasta `Site/`

## � Personalizações

- **Cores**: Tokens em `css/tokens.css` (--plum, --gold, --cream)
- **Fontes**: Playfair Display (títulos) + Montserrat (texto)
- **Alterações**: Editar arquivos em `Site/` e reenviar a pasta `publish/`

## � Estrutura de Pastas "Ocultas" (Desenvolvimento)

- `AGENTS.md` — Contexto do projeto e skills do opencode
- `docs/` — Documentação técnica e auditorias
- `css/`, `js/` — Arquivos-fonte (mais completos que os do `publish/`)
- `opencode.json`, `skills-lock.json` — Configurações internas

---

**Projeto criado e mantido por Vitor — Campo Mourão/PR.**