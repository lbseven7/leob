# AGENTS.md

## Project overview

Static artist portfolio and art catalog site for Leo Barbosa, deployed to **Vercel**. Brazilian Portuguese primary, English secondary. No build system, no bundler, no framework — plain HTML/CSS/JS with Tailwind via CDN.

## Key files

- `index.html` — entry "hub" page (default landing: "O que você quer explorar?")
- `catalogo.html` — main catalog page (reached from the hub's "Catálogo" card). Renamed from the former root `index.html` — keep catalog links pointing to `catalogo.html`, home/logo/"Início" links to `index.html`.
- `pages/sobre.html` — about page (reference for secondary-page layout/theme config)
- `js/script.js` — all catalog data, gallery rendering, i18n, modal, dark mode
- `css/style.css` — custom styles + Avallon font face
- `css/barra-progresso.css` — scroll progress bar
- `posts/post.py` — Markdown → HTML blog generator (requires Python `markdown` lib)
- `pages/admin.html` — Google Sheets–backed artwork management panel
- `vercel.json` — `cleanUrls: true` + host rewrite to `tono/` for `tono.art.br`. The hub is served from the root `index.html` (no rewrite needed — Vercel ignores `/` rewrites when a root `index.html` exists).

### Live auctions (Leilões)

- `pages/leiloes.html` — auction showcase (upcoming / live / ended)
- `pages/leilao.html?id=<id>` — single lot page: bidding, countdown, live history, PIX
- `pages/leilao-admin.html` — auctions admin panel (mirrors `admin.html` pattern)
- `js/leiloes.js` — auction client logic (polling ~4s, bids, register, PIX BR Code)
- `js/config-leiloes.js` — auction config: Apps Script URL, PIX key, WhatsApp
- `apps-script/Code.gs` — Apps Script backend (Google Sheets): endpoints `estado`,
  `lance`, `registrar`, `lotes`, `admin` (read via GET, writes via POST `no-cors`
  com `Content-Type: text/plain;charset=utf-8` para preservar acentos)
- `README-LEILOES.md` — full setup guide for the auctions system

Auction backend lives in a Google Sheet (`Lotes` / `Participantes` / `Lances` / `Config`)
called via the Apps Script Web App URL configured in `js/config-leiloes.js` (public ease)
or via "Configurar API" in the admin panel (per-browser localStorage, key `leob_leiloes_api`).

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
