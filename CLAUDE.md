# CLAUDE.md

Guidance for AI coding assistants working in this repository. The full contributor guide is
[AGENTS.md](AGENTS.md); this file only highlights what is easy to get wrong.

## Project

Landing site for **Fun Phone**, a private, open-source Android dialer
([app repository](https://github.com/Moncada25/fun-phone)). Static Astro site deployed to GitHub
Pages at `https://moncada25.github.io/fun-phone-web/`.

## Commands

- `npm run dev` — dev server
- `npm run check` — Astro and TypeScript checks
- `npm run build` — static build plus the Workbox service worker
- `npm run check:discovery`, `npm run check:pwa`, `npm run check:lighthouse` — the CI gates
- `npm run preview` — serve `dist/` locally

## Stack and conventions

- Astro 7 (static output), Tailwind CSS 4 (CSS-first `@theme` in `src/styles/global.css`, no
  `tailwind.config.*`), Alpine.js bundled locally, Workbox PWA.
- Base path `/fun-phone-web/`: build internal URLs with `import.meta.env.BASE_URL`.
- Bilingual ES/EN on the client: every visible string needs both variants, using
  `<span x-cloak x-show="lang==='es'">…</span><span x-cloak x-show="lang==='en'">…</span>`.
- Dark mode is class-based (`html.dark`); colors come from CSS variables (`--ink`, `--paper`,
  `--flame`, `--surface`). Use `.band-dark` for sections that stay dark in both themes.
- Product copy lives in `src/data/` (`features.ts`, `faq.ts`, `site.ts`). Check every claim
  against the app repository (README, PLAY_STORE_LISTING, PRIVACY) before changing it.
- Google Play links must use `playStoreUrl(content)` so each CTA carries an install referrer.
- Pushing to `main` deploys automatically through `.github/workflows/deploy.yml`.
