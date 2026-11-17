# Fun Phone — sitio web

[![Deploy to GitHub Pages](https://github.com/Moncada25/fun-phone-web/actions/workflows/deploy.yml/badge.svg)](https://github.com/Moncada25/fun-phone-web/actions/workflows/deploy.yml)
![Astro](https://img.shields.io/badge/Astro-7-ff5d01?logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38b2ac?logo=tailwindcss&logoColor=white)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue)](LICENSE)

Sitio oficial de **[Fun Phone](https://github.com/Moncada25/fun-phone)**, un marcador y gestor de
contactos para Android, privado y de código abierto: **https://moncada25.github.io/fun-phone-web/**

> *English:* this is the source of the Fun Phone landing site, a static, bilingual (ES/EN) Astro
> site deployed to GitHub Pages. The Android app lives in
> [Moncada25/fun-phone](https://github.com/Moncada25/fun-phone).

## Páginas

| Ruta | Archivo | Contenido |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Presentación, funciones, privacidad y opciones de instalación |
| `/features/` | `src/pages/features/index.astro` | Catálogo completo de funciones |
| `/faq/` | `src/pages/faq/index.astro` | Preguntas frecuentes |
| `/privacy/` | `src/pages/privacy/index.astro` | Política de privacidad, flujos de datos y permisos |

## Stack

- Astro 7 con salida estática y base `/fun-phone-web/`.
- Tailwind CSS 4 (configuración CSS-first en `src/styles/global.css`).
- Alpine.js empaquetado localmente para idioma, tema y navegación móvil.
- PWA generada con Workbox; sitemap con `@astrojs/sitemap`.
- Fuentes WOFF2 locales (licencias en `public/licenses/`). Sin analítica ni recursos de terceros.

## Estructura

- `src/data/` — textos del producto (`features.ts`, `faq.ts`), datos fijos (`site.ts`) y enlaces
  de Google Play con referrer (`play-store.ts`).
- `src/components/` — navegación, footer, botones de instalación, galería y bloques compartidos.
- `public/assets/store-v3/` — capturas de la app con datos ficticios, en español e inglés.
- `scripts/` — generación del service worker, comprobaciones de CI y render de las imágenes de tienda.
- `tools/store-mockups/studio.html` — plantilla que usa `npm run render:store` para componer las
  imágenes de Google Play a partir de las capturas del repositorio de la app.

## Desarrollo

Requiere Node 24 (ver `.nvmrc`).

```bash
npm ci
npm run dev
```

Antes de publicar:

```bash
npm run check
npm run build
npm run check:discovery
npm run check:pwa
npm run check:lighthouse
```

Cada push a `main` ejecuta estas comprobaciones en GitHub Actions y, si pasan, despliega en GitHub
Pages. `check:lighthouse` exige rendimiento ≥ 90, accesibilidad ≥ 95, LCP ≤ 2,5 s, CLS ≤ 0,1 y
TBT ≤ 200 ms en las cuatro páginas.

## Contribuir

Los textos deben existir en español e inglés y coincidir con lo que hace la app (README,
`PLAY_STORE_LISTING.md` y `PRIVACY.md` del repositorio de la app). Los errores de la app se reportan
en [fun-phone/issues](https://github.com/Moncada25/fun-phone/issues); los del sitio, en este
repositorio.

## Licencia

Código bajo [GPL-3.0](LICENSE). Las fuentes conservan su licencia SIL Open Font License
(`public/licenses/`). Google Play es una marca de Google LLC.
