# Repository Guidelines

## Stack
- **Astro 6.4** (static output) with Vite 7
- **Tailwind CSS 4.2** via the `@tailwindcss/vite` plugin (CSS-first config; no `tailwind.config.*` file)
- **Node 22.12.0+** required (see `.nvmrc` and `engines` in `package.json`)

## Project Structure & Module Organization
- `src/pages/` holds route-level Astro pages; nested folders (`faq/`, `features/`, `privacy/`) map to trailing-slash routes per `trailingSlash: 'always'`.
- `src/components/` contains reusable UI blocks such as `Navbar.astro`, `StickyCTA.astro`, and `LanguageToggle.astro`.
- `src/styles/global.css` is the single Tailwind entry point: it declares `@import "tailwindcss"`, the `@custom-variant dark` rule, and the `@theme` token block. Add design tokens there before adding ad-hoc CSS.
- `public/` stores static assets served verbatim (e.g., `public/assets/logo.png`); update images here.
- `astro.config.mjs` sets static output plus the `/fun-phone-web/` base used by GitHub Pages—sync it with deployment URLs. The Tailwind plugin is wired through `vite.plugins`, not `integrations`.
- `dist/` is generated output; never edit it manually.

## Build, Test, and Development Commands
- `npm install` syncs dependencies (Astro 6 + Tailwind 4 + `@tailwindcss/vite`).
- `npm run dev` starts the Astro dev server with hot reload on localhost.
- `npm run build` compiles the static site into `dist/` honoring the configured base path.
- `npm run preview` serves the built output; use it to confirm routing and asset paths before pushing.

## Coding Style & Naming Conventions
- Use two-space indentation in `.astro` markup and embedded scripts; keep attributes single-line unless readability suffers.
- Name components and pages in PascalCase (`FAQBlock.astro`, `LanguageToggle.astro`); IDs, event handlers, and helper scripts use camelCase.
- Favor Tailwind utilities; for project-specific tokens, extend `@theme` in `src/styles/global.css` instead of creating a JS config file.

## Testing Guidelines
- Automated tests are not yet configured; run `npm run preview` and exercise key flows in light/dark modes and both language toggles.
- Verify navigation built with `import.meta.env.BASE_URL` still resolves when visiting nested routes like `/privacy/` or `/features/`.

## Commit & Pull Request Guidelines
- Mirror the existing history: start subjects with a capitalized prefix (`Fix:`, `Update:`) followed by a concise sentence.
- Link issues or tracking cards in PR descriptions and include before/after screenshots for UI updates.
- List manual QA steps performed (browser/device, command run) so reviewers can reproduce quickly.

## Deployment Notes
- Builds target GitHub Pages at `/fun-phone-web/`; rerun `npm run build` whenever site URL or base path changes.
- The CI workflow uses Node 22 (`.github/workflows/deploy.yml`); keep `.nvmrc` and `engines.node` in `package.json` aligned.
- After base changes, re-check external asset URLs and download buttons that rely on `import.meta.env.BASE_URL`.
