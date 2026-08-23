# Deployment Instructions — Eliora RH Site

> Instruções para deploy do site estático Eliora RH em produção. Site é HTML/CSS/JS puro — não requer build complexo.

## 🚀 Opção 1: Netlify (Recomendado — já configurado)

O site já possui configuração Netlify em `netlify.toml`.

### Passo a Passo

1. **Push para Git** (ou arrastar pasta para o Netlify UI)
   ```bash
   # Se usando Git
   git init
   git add .
   git commit -m "Initial commit: Eliora RH site"
   # Conectar ao repositório e fazer push
   ```

2. **Conectar ao Netlify**
   - Acesse https://netlify.com e crie/conecte sua conta
   - Clique em "Add new site" → "Import from Git"
   - Selecione o repositório ou faça upload da pasta

3. **Configurações do Netlify** (já presentes em `netlify.toml`):
   - **Build command:** `echo "Site estático — nenhum build necessário"` (ou deixar em branco)
   - **Publish directory:** `.` (raiz do projeto)
   - **Redirects:** Configurados no `netlify.toml` para SPA fallback

4. **Variáveis de Ambiente** (necessárias?)
   - Atualmente não há variáveis de ambiente necessárias (site é estático)
   - Se migrar para Next.js/Future, adicionar:
     - `NETLIFY_URL` — URL do site ao vivo
     - Qualquer outra que for necessária para funções serverless

5. **Deploy concluído**
   - Site ficará disponível em: `https://seu-site.netlify.app`
   - URL de referência: `https://eliorarh.netlify.app/`

### ✅ Verificação Pós-Deploy

- Acessar URL gerada e confirmar que o site carrega
- Abrir DevTools → Console (verificar erros 404 ou JS)
- Testar responsividade: abrir em celular ou usar ferramentas de devtools
- Rodar Lighthouse: `chrome://lighthouse` ou `npm run lighthouse` (se disponível)
- Verificar metadados SEO com Facebook Sharing Debugger e Twitter Card Validator

---

## 🌐 Opção 2: Vercel

Também funciona bem para sites estáticos Next.js ou HTML puro.

```bash
# Instalar Vercel CLI (opcional)
npm i -g vercel

# Deploy da pasta atual
vercel --prod
```

- Follow the prompts (select framework: "Other" ou "Static HTML")
- Deploy URL será fornecido ao final

---

## 📁 Estrutura de Arquivos Importante

| Arquivo | Propósito |
|---------|-----------|
| `index.html` | Ponto de entrada — deve sempre estar na raiz |
| `css/` | Todos os arquivos de estilo (tokens, base, layout, components, responsive) |
| `js/` | `main.js` — header scroll, scrollspy, menu mobile, scroll reveal |
| `netlify.toml` | Configuração específica do Netlify (build, redirects, headers) |
| `assets/images/` | Logos e imagens da marca |
| `assets/icons/` | Ícones SVG dos parceiros e redes sociais |

### ⚠️ Cuidados Específicos

1. **Não remover `netlify.toml`** — contém regras de redirect para fallback SPA
2. **Manter `index.html` na raiz** — o Netlify espera o arquivo principal aqui
3. **Caminhos relativos no HTML** — todos os links CSS/JS usam caminhos relativos (`css/`, `js/`), o que funciona tanto local quanto em produção
4. **Imagens otimizadas** — se adicionar novas imagens, considere formatos modernos (WebP/AVIF) e otimizar tamanho

---

## 🔄 Fluxo de Atualização Contínua

1. **Desenvolvimento local:**
   ```bash
   python -m http.server 8139 --bind 127.0.0.1
   # Acessar: http://127.0.0.1:8139/index.html
   ```

2. **Testar alterações** — validar HTML/CSS/JS, responsividade, acessibilidade

3. **Deploy:**
   - Fazer commit/push no Git (ou upload no Netlify)
   - Aguilar o deploy automático (Netlify) ou rodar `vercel --prod`

4. **Verificar produção:**
   - Abrir URL deployada
   - Rodar verificações rápidas (Lighthouse, validação de links)
   - Confirmar que redes sociais exibem preview correto (usando as metadados do `docs/07-seo-metadata.md`)

---

## 🛠️ Scripts de Verificação Rápida

```bash
# 1. Rodar servidor local
python -m http.server 8139 --bind 127.0.0.1

# 2. Verificar links quebrados (após instalar 'html-validate' se desejar)
# 3. Validar HTML (opcional)
npx html-validate index.html

# 4. Verificar CSS (opcional)
npx stylelint "css/**/*.css"
```

---

*Documento mantido em sincronia com `netlify.toml`, `DESIGN.md` e a estrutura atual do projeto. Atualizar sempre que houver mudança de stack (ex: migração de HTML puro para Next.js/Tailwind).*