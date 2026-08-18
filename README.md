# Fun Phone: Your Private Dialer — Web

[![Deploy to GitHub Pages](https://github.com/Moncada25/fun-phone-web/actions/workflows/deploy.yml/badge.svg)](https://github.com/Moncada25/fun-phone-web/actions/workflows/deploy.yml)
![Astro](https://img.shields.io/badge/Astro-7.2-ff5d01?logo=astro&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.3-38b2ac?logo=tailwindcss&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Offline-brightgreen)
![License](https://img.shields.io/badge/license-GPLv3-blue)

Landing oficial, funciones, preguntas frecuentes y política de privacidad de **Fun Phone**. El sitio
es estático, bilingüe ES/EN, instalable como PWA y está optimizado para GitHub Pages.

La web evita mostrar un número de release Android para no adelantar builds aún no publicados. Los
datos estables del producto se centralizan en `src/data/site.ts`.

## Stack

- Astro 7.2 + Vite 8 + Tailwind CSS 4.3.
- Alpine empaquetado localmente para idioma, tema y navegación móvil.
- Salida estática bajo `/fun-phone-web/`.
- Sitemap generado con la integración oficial de Astro.
- PWA generada con Workbox: HTML, CSS, JavaScript y screenshots WebP disponibles offline.
- Sin analítica en la web.

## Producto representado

- Marcador T9, favoritos, historial y contactos multi-cuenta.
- Controles y notificaciones que permiten volver de forma fiable a una llamada activa.
- Notas, recordatorios, grabaciones, vault con Tink, gastos, Pomodoro y bienestar.
- QR, voz, calendario, festivos públicos, pintura y diez minijuegos.
- Sin Firebase, anuncios, analítica, telemetría ni nube operada por el desarrollador.
- Una única conexión directa opcional: Nager.Date recibe país/año después del aviso y autorización
  dentro de la herramienta de festivos.

## Páginas

- `src/pages/index.astro` — landing principal.
- `src/pages/features/index.astro` — catálogo y comparación de funciones.
- `src/pages/faq/index.astro` — preguntas frecuentes ES/EN.
- `src/pages/privacy/index.astro` — privacidad, flujos de datos y permisos.
- `src/components/` — navegación, footer, carrusel, CTA y bloques compartidos.
- `public/assets/` — logo y screenshots vigentes.

## Desarrollo

```bash
nvm use
npm ci
npm run dev
npm run check
npm run build
npm run check:discovery
npm run check:pwa
npm run check:lighthouse
npm run preview
```

`npm run build` genera primero el sitio Astro y después `dist/service-worker.js`. No se debe editar
el service worker generado manualmente.

## Deploy

GitHub Actions valida tipos, build, SEO/discovery, PWA y presupuestos Lighthouse antes de publicar
en GitHub Pages. La configuración usa `site: https://moncada25.github.io` y
`base: /fun-phone-web/`; todos los enlaces y registros del service worker deben respetar ese base.

## Privacidad y soporte

- Política: `/privacy/`.
- Google Play: https://play.google.com/store/apps/details?id=com.bookverse.contacts
- Soporte: santiago.moncada.dev@gmail.com

Desarrollado por Santiago Moncada · Bookverse
