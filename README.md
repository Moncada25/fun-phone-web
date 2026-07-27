# Fun Phone: Your Private Dialer — Web

[![Deploy to GitHub Pages](https://github.com/Moncada25/fun-phone-web/actions/workflows/deploy.yml/badge.svg)](https://github.com/Moncada25/fun-phone-web/actions/workflows/deploy.yml)
![Astro](https://img.shields.io/badge/Astro-7.x-ff5d01?logo=astro&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38b2ac?logo=tailwindcss&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Ready-brightgreen)
![License](https://img.shields.io/badge/license-GPLv3-blue)

Landing oficial, features y política de privacidad para **Fun Phone v3.17.1**. Sitio estático, bilingüe ES/EN, dark/light y optimizado para GitHub Pages.

La versión visible se obtiene de `src/data/release-manifest.json`. En despliegues disparados por
el repositorio Android, `FUN_PHONE_RELEASE_MANIFEST_JSON` reemplaza ese fallback durante el build,
evitando copiar números de versión en los componentes Astro.

## 🚀 Stack

- Astro 7 + TailwindCSS 4
- Salida 100% estática para GitHub Pages (base: `/fun-phone-web/`)
- Dark/Light con auto-detección y toggle, sin flash
- PWA (manifest + service worker)
- Bricolage Grotesque + Instrument Serif + JetBrains Mono
- Editorial design language ("The Fun Phone Codex")

## ✨ Qué destaca en la app (v3.17.1)

- **Marcador**: T9 rápido, historial segmentado, Dual‑SIM, bloqueo de spam, contestación personalizable.
- **Contactos**: multi‑cuenta (Google/local), importar/exportar (vCard/JSON), QR, anti-spam, deduplicación.
- **Productividad**: notas con markdown, checklists, recordatorios, grabadora de voz, bloqueo biométrico.
- **Seguridad**: gestor de contraseñas con cifrado Tink (sin sync obligatoria, opcional en la nube).
- **Estilo de vida**: gestor de gastos, calendario menstrual y Pomodoro 25/5.
- **Extras**: 10 mini‑juegos, lienzo de pintura, calendario de festivos (Nager.Date), QR, voz (STT/TTS).
- **Personalización**: temas, paletas, fuentes, animaciones, widgets, atajos.
- **Experiencia enfocada**: onboarding simplificado, permisos en contexto y herramientas opcionales mediante presets.

Consulta la tabla comparativa en `src/pages/features/index.astro` para ver por qué Fun Phone supera al marcador estándar.

## 🖼️ Screenshots

| Marcador | Contactos | Historial |
|---|---|---|
| ![Dialer](public/assets/screenshots/dialer.png) | ![Contacts](public/assets/screenshots/contact_list.png) | ![History](public/assets/screenshots/history.png) |

| QR | Extras | Ajustes |
|---|---|---|
| ![QR](public/assets/screenshots/qr_generator.png) | ![Extras](public/assets/screenshots/extras.png) | ![Settings](public/assets/screenshots/settings.png) |

## 📁 Páginas clave

- `src/pages/index.astro` — Home con hero centrado, “Lo nuevo” (Notas y Password Manager) y carrusel con fullscreen.
- `src/pages/features/index.astro` — Features completas y comparativa “Why Fun Phone beats the stock dialer”.
- `src/pages/faq/index.astro` — FAQ bilingüe (incluye gestor de contraseñas).
- `src/pages/privacy/index.astro` — Privacidad: almacenamiento local, servicios de red opcionales, permisos y controles.
- `src/pages/roadmap/index.astro` — Roadmap (Now/Next/Later + Temas estratégicos).
- `src/components/` — Navbar, Footer, LanguageToggle, FeatureBlock, ScreenshotCarousel (lightbox), etc.
- `public/assets/` — Icono de la app (usado como favicon) y screenshots.

## 🛠️ Desarrollo

```bash
nvm use
npm install
npm run dev               # Astro dev server con HMR
npm run check:release     # Valida la metadata de la versión Android
npm run build             # Compila a /dist (respeta BASE_URL)
npm run check:discovery   # Valida SEO, URLs y atribución de instalación
npm run check:lighthouse  # Aplica presupuestos de UX y Web Vitals
npm run preview           # Sirve /dist para ver rutas/base
```

Notas de rutas
- El sitio usa `import.meta.env.BASE_URL` y `astro.config.mjs` con base `/fun-phone-web/`. Verifica enlaces en `/privacy/`, `/features/`, `/faq/` y `/roadmap/` tras `npm run preview`.

## 🌐 Deploy

- GitHub Pages con base `/fun-phone-web/` (ver `astro.config.mjs`).
- Tras cambios en base o URLs externas, construir nuevamente: `npm run build`.

## 🔒 Privacidad

- Web sin analítica por defecto. La app mantiene localmente sus datos principales; la versión Play usa servicios de red documentados para funciones concretas.
- Permisos (teléfono, contactos, historial) se piden solo al configurarla como app de Teléfono predeterminada. Todos son revocables en Android.

## 🧭 Roadmap y soporte

- Roadmap: `src/pages/roadmap/index.astro`
- Contacto: santiago.moncada.dev@gmail.com
- Ficha en Play Store: https://play.google.com/store/apps/details?id=com.bookverse.contacts

—
Desarrollado por Santiago Moncada · Bookverse
