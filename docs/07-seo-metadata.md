# SEO Metadata Specification — Eliora RH Site

> Site estático de consultoria RH (Campo Mourão/PR). Todos os metadados seguem boas práticas de SEO on-page e otimização para redes sociais.

## 🌐 Metadados Globais (index.html `<head>`)

| Campo | Valor | Observação |
|-------|-------|-----------|
| `<title>` | `Eliora RH — Consultoria de Recursos Humanos em Campo Mourão/PR` | Título da página único |
| `<meta name="description" content="Eliora RH — consultoria de recursos humanos em Campo Mourão/PR. Pessoas no centro. Resultados que transformam.">` | Descrição padrão para SEO |
| `<meta charset="UTF-8">` | Codificação de caracteres |
| `<meta name="viewport" content="width=device-width, initial-scale=1">` | Responsividade / mobile-first |
| `<link rel="canonical" href="https://eliorarh.netlify.app/">` | Canonical point to live site |
| `<meta name="robots" content="index, follow">` | Permitir indexação |

## 📱 Open Graph (Facebook / LinkedIn / WhatsApp)

| Tag | Conteúdo | Prioridade |
|-----|----------|------------|
| `og:title` | `Eliora RH — Consultoria de Recursos Humanos` | Crítico |
| `og:description` | `Consultoria de RH em Campo Mourão/PR. Pessoas no centro. Resultados que transformam.` | Crítico |
| `og:type` | `website` | Padrão |
| `og:url` | `https://eliorarh.netlify.app/` | Auto-referência |
| `og:image` | `assets/images/elora-logo.png` (300×300px mínimo) | Logo da marca |
| `og:site_name` | `Eliora RH` | Nome do site |

### `og:image` — Especificações
- Formato: PNG ou JPG
- Mínimo: 300 × 300 px
- Recomendado: 1200 × 628 px (ratio 1.91:1)
- Cores dominantes: plum (`#471C3D`) e gold (`#D4A26A`)
- Sem texto sobreposto (imagem limpa, marca visível)

## 🐦 Twitter Cards

| Tag | Conteúdo |
|-----|----------|
| `twitter:card` | `summary_large_image` |
| `twitter:title` | `Eliora RH — Consultoria de Recursos Humanos` |
| `twitter:description` | `Consultoria de RH em Campo Mourão/PR. Pessoas no centro. Resultados que transformam.` |
| `twitter:image` | `assets/images/elora-logo.png` |

## 🏷️ Hashtags e Tags Adicionais (opcional)

```html
<meta name="twitter:creator" content="@eliorarh">
<meta name="twitter:site" content="@eliorarh">
```

## 📋 Convenções de Implementação

1. **Sempre usar tokens de `css/tokens.css`** para referências visuais (cores do og:image, etc.)
2. **Nunca usar cores hardcoded** — sempre variáveis CSS: `--plum`, `--gold`, `--cream`
3. **Imagens og:image devem usar o logo da marca** em `assets/images/`
4. **Todos os títulos das páginas devem seguir a mesma estrutura**: `Eliora RH — [Subtítulo]`
5. **Meta description deve ter entre 120–160 caracteres** para não ser truncada no Google
6. **Verificar após qualquer alteração** se os metadados ainda estão intactos (não removidos por acidentalmente)

## 🔍 Pós-Deploy Verification

Após deploy (Netlify/Vercel):

1. **Ferramenta Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
2. **Ferramenta Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **Lighthouse SEO audit**: `npm run lint:seo` (se houver) ou inspeção manual no DevTools

---

*Este documento deve ser atualizado sempre que houver mudança de marca, nova seção adicionada ao site ou migração para nova stack (Next.js, etc.).*