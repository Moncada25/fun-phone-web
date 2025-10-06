# Fun Phone: Dialer & Contacts – Landing & Privacy Policy

Sitio web moderno, estático y de alto rendimiento para la app Fun Phone: Dialer & Contacts.

## 🚀 Stack

- [Astro](https://astro.build/) + [TailwindCSS](https://tailwindcss.com/)
- 100% estático, optimizado para GitHub Pages
- Dark/Light mode automático y con toggle
- PWA (manifest + service worker)

## 📁 Estructura

- `src/pages/index.astro` – Landing principal (bilingüe ES/EN)
- `src/pages/privacy/index.astro` – Política de privacidad bilingüe
- `public/assets/` – Iconos, screenshots, imágenes optimizadas
- `public/site.webmanifest`, `public/service-worker.js`, `public/robots.txt`, `public/sitemap.xml`, `public/404.html`
- `.github/workflows/deploy.yml` – Deploy automático a GitHub Pages

## 🛠️ Cómo correr local

```bash
git clone https://github.com/Moncada25/fun-phone-web.git
cd fun-phone-web
npm install
npm run build
npm run preview
```
Abre http://localhost:4321

## 🌐 Deploy en GitHub Pages

El deploy es automático vía GitHub Actions (`.github/workflows/deploy.yml`).
Para publicar manualmente:

```bash
npm run build
# Sube el contenido de `dist/` a la rama `gh-pages` si lo necesitas manualmente
```

## 📝 Política de Privacidad

La política de privacidad bilingüe está en [`/privacy/`](src/pages/privacy/index.astro).

## 🧪 Comprobantes Lighthouse

- El sitio está optimizado para obtener ≥95 en Performance, SEO, Best Practices y Accesibilidad.
- Incluye capturas o JSON de Lighthouse en `/lighthouse/` (añade tus propios reportes tras build).

## 📦 Notas

- No incluye analítica por defecto.
- Basado en la ficha oficial de Google Play: [Fun Phone en Google Play](https://play.google.com/store/apps/details?id=com.bookverse.contacts)

---
Desarrollado por Santiago Moncada / Bookverse
