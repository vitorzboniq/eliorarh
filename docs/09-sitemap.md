# Sitemap — Eliora RH Site

> Estrutura completa de páginas e seções do site institucional da Eliora RH.
> Formato HTML simples (poderia ser convertido para XML sitemap para submissão a buscadores).

## 🌐 Estrutura Atual (index.html)

A página é **única (single page)** com âncoras de navegação interna. Cada seção tem um `id` correspondente e é acessível via navegação no menu e via scrollspy do header.

| Ordem no DOM | `id` (ancora) | Rótulo do Menu | Comentário |
|--------------|---------------|----------------|------------|
| 1 | `#top` | (hero) | Seção inicial — visão geral da Eliora RH |
| 2 | `#significado` | Significado | Apresentação da proposta "Pessoas no centro. Resultados que transformam." |
| 3 | `#pilares` | Pilares | Principais pilares de atuação da consultoria |
| 4 | `#valores` | Valores | Valores da empresa e filosofia |
| 5 | `#treinamentos` | Treinamentos | Programas de treinamento e desenvolvimento |
| 6 | `#abordagem` | Abordagem | Metodologia de trabalho da Eliora RH |
| 7 | `#parceiros` | Parceiros | Logos de parceiros/consultorias associadas |
| 8 | `#contato` | Contato | Informações de contato (e-mail, WhatsApp, localização) |
| 9 | `#footer` | Footer | Rodapé com links sociais e direitos autorais |

## 🔗 Menu de Navegação

O header do site possui navegação com os seguintes links (ordem atualizada — versão 1.1.0):

1. **A marca** — *Removido da versão atual; logo no header representa a marca*
2. **Pilares** — âncora `#pilares`
3. **Valores** — âncora `#valores`
4. **Treinamentos** — âncora `#treinamentos`
5. **Abordagem** — âncora `#abordagem`
6. **Fale conosco** — Link externo: `https://eliorarh.netlify.app/` (target="_blank" rel="noopener")

> **Nota:** A ordem original do AGENTS.md descrevia o nav como: "A marca, Pilares, Treinamentos, Abordagem, Valores". Na versão atual (1.1.0), a ordem foi reorganizada para: **Pilares → Valores → Treinamentos → Abordagem**, com o link "A marca" removido (já que o logo no header cumpre essa função) e o CTA "Fale conosco" mantido no final.

## 📄 XML Sitemap (para mecanismos de busca)

> Como o site é uma página única (single-page application estática), o XML sitemap tradicional não se aplica da mesma forma que em sites multi-página. No entanto, recomenda-se:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
  <url>
    <loc>https://eliorarh.netlify.app/</loc>
    <lastmod>2026-08-23</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### Recomendações para SEO:

1. **Submeter este sitemap** no Google Search Console e Bing Webmaster Tools
2. **Manter `lastmod` atualizado** sempre que houver alteração de conteúdo
3. **Usar tags canonical** `<link rel="canonical" href="https://eliorarh.netlify.app/">` (já presente no `<head>`)
4. **Implementar dados estruturados (Schema.org)** para organização em breve (LocalBusiness, Organization)

## 📱 Redes Sociais

Quando o link `https://eliorarh.netlify.app/` for compartilhado em redes sociais, os metadados definem a aparência:

- **Título:** `Eliora RH — Consultoria de Recursos Humanos em Campo Mourão/PR`
- **Descrição:** `Consultoria de RH em Campo Mourão/PR. Pessoas no centro. Resultados que transformam.`
- **Imagem:** `assets/images/elora-logo.png` (Open Graph & Twitter Cards)
- **Site Name:** `Eliora RH`

---

*Documento vivente — atualizado sempre que nova seção for adicionada ao `index.html` ou quando a navegação for reorganizada.*