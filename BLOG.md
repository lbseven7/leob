# Guia do Blog — Leo Barbosa Art Studio

## Criar um novo artigo

Crie um arquivo `.md` na pasta `posts/` com o seguinte front matter:

```
---
title: "Título do Artigo"
description: "Breve descrição do artigo"
category: "tecnicas"
image: ""
tempoLeitura: "7"
href: "posts/nome-do-post.html"
---
```

Escreva o conteúdo do artigo em Markdown abaixo do front matter.

## Categorias válidas

| Categoria | Uso |
|-----------|-----|
| `tecnicas` | Técnicas de pintura |
| `bastidores` | Bastidores, processos criativos |
| `dicas` | Dicas práticas |
| `reflexoes` | Reflexões sobre arte |

## Campos do front matter

| Campo | Obrigatório | Descrição |
|-------|:-----------:|-----------|
| `title` | Sim | Título do artigo |
| `description` | Sim | Descrição curta (aparece no card do blog) |
| `category` | Sim | Uma das 4 categorias acima |
| `date` | Não | Data de publicação (se omitido, usa a data atual) |
| `image` | Não | Caminho da imagem de capa relativo à raiz do site |
| `tempoLeitura` | Sim | Tempo estimado de leitura (minutos) |
| `href` | Sim | Caminho do HTML gerado relativo à raiz do site |

## Imagem de capa

- Formato: `.webp` ou `.jpg` comprimido
- Proporção ideal: 21:9 (banner largo)
- Coloque o arquivo na pasta `images/` ou na raiz
- No campo `image`, use o caminho relativo à raiz:
  - `image: "images/minha-foto.webp"`
  - `image: "minha-foto.webp"` (se estiver na raiz)

## Gerar os HTMLs

Execute no terminal, na raiz do projeto:

```bash
python posts/post.py
```

Isso vai:
- Ler todos os arquivos `.md` da pasta `posts/`
- Gerar um `.html` para cada um
- Atualizar o `posts/index.json` (alimenta a página do blog)

## Sintaxe Markdown

```markdown
## H2 — Seção principal
### H3 — Subseção

**Negrito** e *itálico*

- Lista com marcadores
1. Lista numerada

> Citação em bloco

[Link](https://exemplo.com)

![Texto alternativo](caminho/para/imagem.jpg)
```

## Estrutura de arquivos

```
posts/
  ├── post.py              → Gerador de HTML
  ├── index.json           → Catálogo (gerado automaticamente)
  ├── nome-do-artigo.md    → Seu artigo em Markdown
  └── nome-do-artigo.html  → HTML gerado (não editar)

pages/
  └── blog.html            → Página índice do blog
```

## Funcionalidades

- Barra de progresso de leitura
- Compartilhar via WhatsApp
- Copiar link
- Posts relacionados ao final de cada artigo
- Imagem de capa opcional
- Dark mode
- Filtros por categoria
- Custom cursor (desativado em touch)

## Visualizar localmente

```bash
python -m http.server 8000
```

Acesse `http://localhost:8000/pages/blog.html`
