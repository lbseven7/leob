# AGENTS.md

## Project overview

Static artist portfolio and art catalog site for Leo Barbosa, deployed to **Vercel**. Brazilian Portuguese primary, English secondary. No build system, no bundler, no framework — plain HTML/CSS/JS with Tailwind via CDN.

## Key files

- `index.html` — main catalog page (entry point)
- `js/script.js` — all catalog data, gallery rendering, i18n, modal, dark mode
- `css/style.css` — custom styles + Avallon font face
- `css/barra-progresso.css` — scroll progress bar
- `posts/post.py` — Markdown → HTML blog generator (requires Python `markdown` lib)
- `pages/admin.html` — Google Sheets–backed artwork management panel
- `vercel.json` — only `cleanUrls: true`

## Architecture

- **No build step.** Edit HTML/CSS/JS directly; Vercel serves as-is.
- **All artwork data lives in `js/script.js`** as the `obras` array. Adding/removing works means editing that array. The admin panel writes to Google Sheets but the catalog reads from the hardcoded JS array.
- **i18n** is manual: every visible string has `pt`/`en` copies in `script.js`. The `changeLanguage()` function updates DOM elements by ID. New UI strings must be added in both languages.
- **Blog pipeline:** Write `.md` in `posts/`, run `python posts/post.py` to regenerate `posts/*.html` and `posts/index.json`. The generated HTML files are committed.
- **Brand color** is `#d88800` (Tailwind config in `index.html`). Note: `pages/admin.html` uses `#F97316` — an inconsistency to be aware of.

## Commands

There are no scripts in `package.json`. Key operations:

| Task | Command |
|------|---------|
| Regenerate blog posts from Markdown | `python posts/post.py` |
| Install dependencies (only `qrcode`) | `npm install` |

## Conventions

- **Language:** pt-br. UI text, comments, commit messages are in Portuguese.
- **Styling:** Tailwind utility classes. Custom font `Avallon` for headings (loaded from local files in `fonts/`).
- **Dark mode:** Tailwind `class` strategy, toggled via `toggleTheme()`, persisted in `localStorage`.
- **Touch devices:** custom cursor is disabled on touch (`pointer: coarse` check).

## Gotchas

- `.gitignore` excludes `*.txt` — text files with notes (like `CÓDIGO.txt`) are not tracked.
- Artwork stock counts (`restante`/`total` in `obras`) are hardcoded — they do not sync with the Google Sheets admin panel.
- The `qrcode` npm package is used by certificate pages under `pages/`.
