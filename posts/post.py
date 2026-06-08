import os
import json
import markdown

posts_dir = "posts"
index_file = os.path.join(posts_dir, "index.json")
catalogo_posts = []

# --- TEMPLATE HTML COM A CARA DO LEOB.COM.BR ---
def obter_template_html(titulo, conteudo_html):
    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{titulo} | Leo Barbosa</title>
    <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <style>
        html {{ background-color: #000000; scroll-behavior: smooth; }}
        body {{ background-color: #000000; color: #e5e5e5; font-family: sans-serif; }}
        .prose p {{ margin-bottom: 1.5rem; color: #a3a3a3; line-height: 1.8; font-size: 0.95rem; font-weight: 300; }}
        .prose h2, .prose h3 {{ color: #ffffff; font-weight: 300; tracking: 0.05em; margin-top: 2.5rem; margin-bottom: 1rem; uppercase; }}
        .prose h2 {{ font-size: 1.5rem; }}
        .prose h3 {{ font-size: 1.25rem; }}
    </style>
</head>
<body class="selection:bg-neutral-800 selection:text-white">

    <header class="bg-black/80 backdrop-blur-md text-white px-6 py-6 sticky top-0 z-50 border-b border-neutral-900">
        <div class="container mx-auto max-w-4xl flex items-center justify-between">
            <a href="../index.html" class="text-xl tracking-widest uppercase">
                <span class="font-bold text-white">leo</span><span class="font-light text-neutral-400">barbosa</span>
            </a>
            <nav>
                <ul class="flex space-x-6">
                    <li><a href="../index.html" class="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition">Galeria</a></li>
                    <li><a href="../blog.html" class="text-xs uppercase tracking-[0.2em] text-white font-medium border-b border-white pb-1">Textos</a></li>
                    <li><a href="../about.html" class="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition">O Artista</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main class="container mx-auto max-w-2xl mt-16 p-6 mb-24">
        <a href="../blog.html" class="text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition block mb-8">
            <i class="fas fa-chevron-left text-[8px] mr-2"></i> Voltar aos Textos
        </a>
        
        <article>
            <h1 class="text-2xl md:text-3xl font-light tracking-wide text-white leading-tight mb-4">{titulo}</h1>
            <div class="h-[1px] w-12 bg-neutral-800 my-6"></div>
            
            <div class="prose text-neutral-400 font-light">
                {conteudo_html}
            </div>
        </article>
    </main>

    <footer class="border-t border-neutral-900 bg-black py-12 text-center">
        <p class="text-[10px] uppercase tracking-[0.3em] text-neutral-600">© Leo Barbosa. Ateliê de Pintura.</p>
    </footer>

</body>
</html>"""

print("Iniciando varredura dos ensaios...")

# 2. Varre a pasta posts atrás de arquivos Markdown (.md)
for file in os.listdir(posts_dir):
    if file.endswith(".md"):
        path_md = os.path.join(posts_dir, file)
        nome_base = os.path.splitext(file)[0]
        path_html = os.path.join(posts_dir, f"{nome_base}.html")
        
        with open(path_md, "r", encoding="utf-8") as f:
            text = f.read()
        
        # Separar o Front Matter (Cabeçalho) do Corpo de Texto
        meta = {}
        corpo_markdown = ""
        
        if text.startswith("---"):
            partes = text.split("---", 2)
            if len(partes) >= 3:
                front_matter = partes[1]
                corpo_markdown = partes[2]
                
                # Parsear as linhas do cabeçalho
                for linha in front_matter.strip().split("\n"):
                    if ":" in list(linha):
                        k, v = linha.split(":", 1)
                        meta[k.strip()] = v.strip().strip('"')
        else:
            corpo_markdown = text

        # Garantir metadados mínimos para o index.json do feed
        meta.setdefault("title", nome_base.replace("-", " ").title())
        meta.setdefault("href", f"posts/{nome_base}.html")
        meta.setdefault("category", "Técnica")
        
        catalogo_posts.append(meta)
        
        # Converter o Markdown do corpo do texto em tags HTML
        conteudo_convertido_html = markdown.markdown(corpo_markdown)
        
        # Mesclar o conteúdo convertido com o layout elegante do site
        html_final = obter_template_html(meta["title"], conteudo_convertido_html)
        
        # Gravar o arquivo .html físico na pasta posts/
        with open(path_html, "w", encoding="utf-8") as f:
            f.write(html_final)
        
        print(f"-> HTML gerado com sucesso: {path_html}")

# 3. Salvar o arquivo de índice para alimentar a tela principal do blog
with open(index_file, "w", encoding="utf-8") as f:
    json.dump(catalogo_posts, f, ensure_ascii=False, indent=4)

print(f"\nConcluído: {len(catalogo_posts)} registros sincronizados no catálogo do ateliê.")