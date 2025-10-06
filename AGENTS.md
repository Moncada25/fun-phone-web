# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/` holds route-level Astro pages; nested folders (`faq/`, `features/`, `privacy/`) map to trailing-slash routes per `trailingSlash: 'always'`.
- `src/components/` contains reusable UI blocks such as `Navbar.astro`, `StickyCTA.astro`, and `LanguageToggle.astro`.
- `public/` stores static assets served verbatim (e.g., `public/assets/logo.png`); update images here.
- `astro.config.mjs` sets static output plus the `/fun-phone-web/` base used by GitHub Pages—sync it with deployment URLs.
- `tailwind.config.cjs` defines design tokens (accent color, radii); prefer adjusting utilities there before adding ad-hoc CSS.
- `dist/` is generated output; never edit it manually.

## Build, Test, and Development Commands
- `npm install` syncs dependencies.
- `npm run dev` starts the Astro dev server with hot reload on localhost.
- `npm run build` compiles the static site into `dist/` honoring the configured base path.
- `npm run preview` serves the built output; use it to confirm routing and asset paths before pushing.

## Coding Style & Naming Conventions
- Use two-space indentation in `.astro` markup and embedded scripts; keep attributes single-line unless readability suffers.
- Name components and pages in PascalCase (`FAQBlock.astro`, `LanguageToggle.astro`); IDs, event handlers, and helper scripts use camelCase.
- Favor Tailwind utilities extended in `tailwind.config.cjs`; document any custom styles near their first use.

## Testing Guidelines
- Automated tests are not yet configured; run `npm run preview` and exercise key flows in light/dark modes and both language toggles.
- Verify navigation built with `import.meta.env.BASE_URL` still resolves when visiting nested routes like `/privacy/` or `/features/`.

## Commit & Pull Request Guidelines
- Mirror the existing history: start subjects with a capitalized prefix (`Fix:`, `Update:`) followed by a concise sentence.
- Link issues or tracking cards in PR descriptions and include before/after screenshots for UI updates.
- List manual QA steps performed (browser/device, command run) so reviewers can reproduce quickly.

## Deployment Notes
- Builds target GitHub Pages at `/fun-phone-web/`; rerun `npm run build` whenever site URL or base path changes.
- After base changes, re-check external asset URLs and download buttons that rely on `import.meta.env.BASE_URL`.
