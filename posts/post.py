import os
import json
import markdown
from datetime import date
from urllib.parse import quote

MONTHS_PT = {
    1: "Jan", 2: "Fev", 3: "Mar", 4: "Abr", 5: "Mai", 6: "Jun",
    7: "Jul", 8: "Ago", 9: "Set", 10: "Out", 11: "Nov", 12: "Dez"
}

def data_hoje():
    d = date.today()
    return f"{d.day} {MONTHS_PT[d.month]} {d.year}"

posts_dir = "posts"
index_file = os.path.join(posts_dir, "index.json")
catalogo_posts = []

CAT_LABELS = {
    "tecnicas": "Técnicas",
    "bastidores": "Bastidores",
    "dicas": "Dicas",
    "reflexoes": "Reflexões"
}


def obter_template_html(titulo, conteudo_html, categoria="", data="", tempo_leitura="",
                        imagem_capa="", href_atual="", todos_os_posts=None):
    cat_label = CAT_LABELS.get(categoria, "Artigo")

    # --- Imagem de Capa ---
    capa_html = ""
    if imagem_capa:
        capa_html = (
            '<div class="mb-10 -mx-6 sm:mx-0 aspect-[21/9] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">'
            f'<img src="../{imagem_capa}" alt="{titulo}" class="w-full h-full object-cover">'
            '</div>'
        )

    # --- Botões de Compartilhamento ---
    url_atual = f"https://leob.com.br/{href_atual}" if href_atual else ""
    titulo_encoded = quote(titulo)
    share_whatsapp = f"https://wa.me/?text={titulo_encoded}%20{quote(url_atual)}" if url_atual else "#"

    share_html = f"""
        <div class="border-t border-neutral-200 dark:border-neutral-800 mt-12 pt-8">
            <p class="text-[10px] uppercase tracking-[0.28em] text-zinc-400 mb-4">Compartilhar artigo</p>
            <div class="flex items-center gap-3">
                <a href="{share_whatsapp}" target="_blank" rel="noopener"
                   class="inline-flex items-center gap-2 border border-neutral-200 dark:border-neutral-800 px-5 py-2.5 text-xs uppercase tracking-widest hover:border-green-500 hover:text-green-500 transition">
                    <i class="fa-brands fa-whatsapp"></i> WhatsApp
                </a>
                <button onclick="copiarLink()" id="btn-copiar"
                   class="inline-flex items-center gap-2 border border-neutral-200 dark:border-neutral-800 px-5 py-2.5 text-xs uppercase tracking-widest hover:border-brand-orange hover:text-brand-orange transition">
                    <i class="fas fa-link"></i> <span id="texto-copiar">Copiar Link</span>
                </button>
            </div>
        </div>"""

    # --- Posts Relacionados ---
    relacionados_html = ""
    if todos_os_posts and len(todos_os_posts) > 1:
        outros = [p for p in todos_os_posts if p.get("href") != href_atual]
        mesma_cat = [p for p in outros if p.get("category") == categoria]
        restante = [p for p in outros if p.get("category") != categoria]
        picks = (mesma_cat + restante)[:2]

        if picks:
            cards = ""
            for p in picks:
                p_href = p.get("href", "#")
                p_img = p.get("image", "")
                p_cat = CAT_LABELS.get(p.get("category", ""), "Artigo")

                if p_img:
                    img_block = (
                        '<div class="aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">'
                        f'<img src="../{p_img}" alt="{p["title"]}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105">'
                        '</div>'
                    )
                else:
                    img_block = (
                        '<div class="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">'
                        '<i class="fas fa-pen-nib text-2xl text-brand-orange/40"></i>'
                        '</div>'
                    )

                cards += (
                    f'<a href="../{p_href}" class="group block">'
                    f'{img_block}'
                    '<div class="mt-4">'
                    f'<span class="text-[10px] uppercase tracking-[0.28em] font-bold text-brand-orange">{p_cat}</span>'
                    f'<h4 class="serif text-lg font-normal leading-snug mt-1 group-hover:text-brand-orange transition-colors">{p["title"]}</h4>'
                    '</div>'
                    '</a>'
                )

            relacionados_html = (
                '<div class="border-t border-neutral-200 dark:border-neutral-800 mt-12 pt-10">'
                '<h3 class="text-[10px] uppercase tracking-[0.28em] text-zinc-400 mb-6">Artigos Relacionados</h3>'
                '<div class="grid grid-cols-1 sm:grid-cols-2 gap-6">'
                f'{cards}'
                '</div>'
                '</div>'
            )

    return f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{titulo} | Leo Barbosa</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {{{{
            darkMode: 'class',
            theme: {{{{
                extend: {{{{
                    colors: {{{{ brand: {{{{ orange: '#d88800' }}}} }}}},
                    fontFamily: {{{{
                        sans: ['Comfortaa', 'cursive', 'sans-serif'],
                        serif: ['Playfair Display', 'serif'],
                    }}}}
                }}}}
            }}}}
        }}}}
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;700&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="stylesheet" href="../css/style.css">
    <style>
        #read-progress {{ position: fixed; top: 0; left: 0; width: 100%; height: 3px; background: transparent; z-index: 9999; }}
        #read-progress-bar {{ height: 100%; width: 0%; background: linear-gradient(90deg, #f97316, #ea580c); box-shadow: 0 0 10px rgba(249, 115, 22, 0.5); transition: width 0.1s ease-out; }}
        .prose {{ color: #525252; line-height: 1.9; font-weight: 300; }}
        .dark .prose {{ color: #a3a3a3; }}
        .prose p {{ margin-bottom: 1.5rem; font-size: 1.05rem; }}
        .prose h2 {{ font-size: 1.5rem; font-weight: 300; color: #171717; margin-top: 3rem; margin-bottom: 1rem; letter-spacing: 0.02em; }}
        .dark .prose h2 {{ color: #f5f5f5; }}
        .prose h3 {{ font-size: 1.25rem; font-weight: 300; color: #171717; margin-top: 2.5rem; margin-bottom: 0.75rem; }}
        .dark .prose h3 {{ color: #e5e5e5; }}
        .prose ul, .prose ol {{ margin-bottom: 1.5rem; padding-left: 1.5rem; }}
        .prose li {{ margin-bottom: 0.5rem; font-size: 1.05rem; }}
        .prose strong {{ font-weight: 500; color: #171717; }}
        .dark .prose strong {{ color: #f5f5f5; }}
        .prose blockquote {{ border-left: 3px solid #d88800; padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: #737373; }}
        .dark .prose blockquote {{ color: #a3a3a3; }}
        .prose code {{ background: #f5f5f5; padding: 0.2rem 0.4rem; border-radius: 4px; font-size: 0.9rem; }}
        .dark .prose code {{ background: #262626; }}
        .prose img {{ border-radius: 0.5rem; margin: 2rem 0; }}
        .prose a {{ color: #d88800; text-decoration: underline; text-underline-offset: 2px; }}
        .prose a:hover {{ color: #b37300; }}
    </style>
</head>
<body class="bg-white text-black dark:bg-black dark:text-white transition-colors duration-500 antialiased">
    <div id="read-progress"><div id="read-progress-bar"></div></div>
    <div id="custom-cursor"></div>

    <header class="bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-900 px-4 sm:px-6 py-4 sm:py-6 sticky top-0 z-50">
        <div class="container mx-auto max-w-5xl flex items-center justify-between gap-4">
            <a href="../index.html">
                <img src="../images/logo/logo-white-gold-removebg-preview.png" alt="Logo" class="max-w-[80px] sm:max-w-[100px] h-auto">
            </a>
            <div class="flex items-center gap-3 sm:gap-6">
                <a href="../index.html" class="hidden md:inline-block text-xs sm:text-sm uppercase tracking-widest hover:text-brand-orange transition whitespace-nowrap">Catálogo</a>
                <a href="../pages/eventos.html" class="hidden md:inline-block text-xs sm:text-sm uppercase tracking-widest hover:text-brand-orange transition whitespace-nowrap">Eventos</a>
                <a href="../pages/blog.html" class="hidden md:inline-block text-xs sm:text-sm uppercase tracking-widest text-brand-orange border-b-2 border-brand-orange pb-1 whitespace-nowrap">Blog</a>
                <a href="../pages/sobre.html" class="hidden md:inline-block text-xs sm:text-sm uppercase tracking-widest hover:text-brand-orange transition whitespace-nowrap">Sobre</a>
                <button id="darkModeToggle" class="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                    <i id="darkModeIcon" class="fas fa-sun text-yellow-500"></i>
                </button>
            </div>
        </div>
    </header>

    <main class="container mx-auto max-w-3xl px-6 py-16">
        <a href="../pages/blog.html" class="text-[10px] uppercase tracking-[0.2em] text-zinc-400 hover:text-brand-orange transition block mb-10">
            <i class="fas fa-chevron-left text-[8px] mr-2"></i> Voltar ao Blog
        </a>

        <article>
            <div class="flex items-center gap-3 mb-6">
                <span class="text-[10px] uppercase tracking-[0.28em] font-bold text-brand-orange">{cat_label}</span>
                {"<span class='text-[10px] uppercase tracking-[0.2em] text-zinc-400'>" + data + "</span>" if data else ""}
                {"<span class='text-[10px] uppercase tracking-[0.2em] text-zinc-400'><i class='far fa-clock mr-1'></i>" + tempo_leitura + " de leitura</span>" if tempo_leitura else ""}
            </div>

            <h1 class="serif text-3xl md:text-4xl font-normal leading-tight mb-4">{titulo}</h1>
            <div class="h-1 w-12 bg-brand-orange mb-8"></div>

            {capa_html}

            <div class="prose">
                {conteudo_html}
            </div>
        </article>

        {share_html}

        {relacionados_html}

        <div class="border-t border-neutral-200 dark:border-neutral-800 mt-12 pt-10 text-center">
            <a href="../pages/blog.html" class="inline-block border border-neutral-300 dark:border-neutral-700 px-8 py-3 uppercase tracking-widest text-xs hover:border-brand-orange hover:text-brand-orange transition">
                <i class="fas fa-arrow-left mr-2 text-[10px]"></i> Ver Todos os Artigos
            </a>
        </div>
    </main>

    <footer class="border-t border-neutral-200 dark:border-neutral-800 py-12 text-center opacity-60">
        <div class="container mx-auto max-w-5xl px-6">
            <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                <p class="text-sm text-neutral-500">&copy; 2026 Leo Barbosa Art Studio</p>
                <div class="flex items-center gap-6 text-xl">
                    <a href="https://www.instagram.com/leob_pinturas/" target="_blank" aria-label="Instagram" class="hover:text-brand-orange transition"><i class="fa-brands fa-instagram"></i></a>
                    <a href="https://www.youtube.com/@leobarbosa-art-studio" target="_blank" aria-label="YouTube" class="hover:text-brand-orange transition"><i class="fa-brands fa-youtube"></i></a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        const progressBar = document.getElementById('read-progress-bar');
        window.addEventListener('scroll', () => {{
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        }});

        function copiarLink() {{
            navigator.clipboard.writeText(window.location.href).then(() => {{
                const texto = document.getElementById('texto-copiar');
                texto.innerText = 'Copiado!';
                setTimeout(() => {{ texto.innerText = 'Copiar Link'; }}, 2000);
            }});
        }}

        const toggle = document.getElementById('darkModeToggle');
        const icon = document.getElementById('darkModeIcon');
        toggle.addEventListener('click', () => {{
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            icon.className = isDark ? 'fas fa-moon text-blue-300' : 'fas fa-sun text-yellow-500';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }});
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {{
            icon.className = 'fas fa-sun text-yellow-500';
        }} else {{
            document.documentElement.classList.add('dark');
            icon.className = 'fas fa-moon text-blue-300';
        }}
    </script>
    <script>
        const cursor = document.getElementById('custom-cursor');
        const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
        if (!isTouchDevice && cursor) {{
            document.addEventListener('mousemove', e => {{
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            }});
            document.querySelectorAll('a, button').forEach(el => {{
                el.addEventListener('mouseenter', () => {{
                    cursor.style.transform = 'translate(-50%, -50%) scale(2.4)';
                    cursor.style.backgroundColor = 'rgba(249, 115, 22, 0.28)';
                }});
                el.addEventListener('mouseleave', () => {{
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                    cursor.style.backgroundColor = '';
                }});
            }});
        }} else if (cursor) {{
            cursor.style.display = 'none';
        }}
    </script>
</body>
</html>"""


# ======================================================================
# PASSO 1 — Coletar metadados de todos os posts
# ======================================================================
print("Iniciando varredura dos artigos...")

posts_md = []
for file in sorted(os.listdir(posts_dir)):
    if file.endswith(".md"):
        path_md = os.path.join(posts_dir, file)
        nome_base = os.path.splitext(file)[0]

        with open(path_md, "r", encoding="utf-8") as f:
            text = f.read()

        meta = {}
        corpo_markdown = ""

        if text.startswith("---"):
            partes = text.split("---", 2)
            if len(partes) >= 3:
                front_matter = partes[1]
                corpo_markdown = partes[2]
                for linha in front_matter.strip().split("\n"):
                    if ":" in list(linha):
                        k, v = linha.split(":", 1)
                        meta[k.strip()] = v.strip().strip('"')
        else:
            corpo_markdown = text

        meta.setdefault("title", nome_base.replace("-", " ").title())
        meta.setdefault("href", f"posts/{nome_base}.html")
        meta.setdefault("category", "tecnicas")

        posts_md.append({
            "meta": meta,
            "corpo": corpo_markdown,
            "nome_base": nome_base
        })

        catalogo_posts.append(meta)

# ======================================================================
# PASSO 2 — Gerar HTML de cada post (com posts relacionados)
# ======================================================================
for post in posts_md:
    meta = post["meta"]
    path_html = os.path.join(posts_dir, f"{post['nome_base']}.html")

    conteudo_convertido_html = markdown.markdown(post["corpo"])

    html_final = obter_template_html(
        meta["title"],
        conteudo_convertido_html,
        meta.get("category", ""),
        meta.get("date", data_hoje()),
        meta.get("tempoLeitura", ""),
        meta.get("image", ""),
        meta.get("href", ""),
        todos_os_posts=catalogo_posts
    )

    with open(path_html, "w", encoding="utf-8") as f:
        f.write(html_final)

    print(f"-> HTML gerado: {path_html}")

# ======================================================================
# PASSO 3 — Salvar index.json
# ======================================================================
with open(index_file, "w", encoding="utf-8") as f:
    json.dump(catalogo_posts, f, ensure_ascii=False, indent=4)

print(f"\nConcluído: {len(catalogo_posts)} artigos sincronizados no catálogo do blog.")
