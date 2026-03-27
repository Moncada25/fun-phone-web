# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing/landing site for **Fun Phone: Dialer & Contacts**, an Android app. Static site deployed to GitHub Pages at `https://moncada25.github.io/fun-phone-web/`.

## Commands

- `npm run dev` — local dev server with hot reload
- `npm run build` — static build to `dist/`
- `npm run preview` — serve built output locally (use to verify before pushing)
- No test framework is configured; manual QA via `npm run preview`

## Architecture

- **Framework**: Astro 4 (static output) + Tailwind CSS 3 + Alpine.js (loaded via CDN)
- **Routing**: File-based via `src/pages/`. Nested folders (`features/`, `faq/`, `privacy/`, `roadmap/`) produce trailing-slash routes (`trailingSlash: 'always'` in astro config)
- **Base path**: `/fun-phone-web/` — all internal links must use `import.meta.env.BASE_URL` prefix. Hardcoded paths will break on GitHub Pages
- **Bilingual (ES/EN)**: Handled client-side with Alpine.js `x-show="lang==='es'"` / `x-show="lang==='en'"` toggles. Language preference persists in `localStorage`. Every user-visible string needs both language variants inline
- **Dark mode**: Class-based (`darkMode: 'class'` in Tailwind config). Theme state synced via `localStorage('darkMode')` with system-preference fallback. A pre-render script in `<head>` prevents flash
- **State management**: Alpine.js `x-data` components — `pageState()` on `<html>` for page-level lang, `navbarComponent()` for navbar state (menu, scroll, theme, language). Components communicate via `CustomEvent('lang')`
- **Typography**: Outfit (display/headings) + DM Sans (body) loaded from Google Fonts
- **Design system**: "Liquid Glass" aesthetic — mesh gradients, glassmorphism cards, accent blue `#0066e0` + electric cyan `#00d4ff`, midnight dark `#0a0e27`

## Key Conventions

- Design tokens live in `tailwind.config.cjs` (colors, fonts, animations, gradients). Extend there before adding one-off styles
- Components are `.astro` files in `src/components/`; pages in `src/pages/`
- Static assets go in `public/` (served verbatim at base path)
- Two-space indentation; PascalCase for component files; camelCase for JS identifiers
- Deployment is automatic: push to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`)
