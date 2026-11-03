# Fun Phone: Your Private Dialer — Web

[![Deploy to GitHub Pages](https://github.com/Moncada25/fun-phone-web/actions/workflows/deploy.yml/badge.svg)](https://github.com/Moncada25/fun-phone-web/actions/workflows/deploy.yml)
![Astro](https://img.shields.io/badge/Astro-7.4-ff5d01?logo=astro&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.3-38b2ac?logo=tailwindcss&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-Offline-brightgreen)
![License](https://img.shields.io/badge/license-GPLv3-blue)

Landing oficial, funciones, preguntas frecuentes y política de privacidad de **Fun Phone**. El sitio
es estático, bilingüe ES/EN, instalable como PWA y está optimizado para GitHub Pages.

La web evita mostrar un número de release Android para no adelantar builds aún no publicados. Los
datos estables del producto se centralizan en `src/data/site.ts`.

## Stack

- Astro 7.4 + Vite 8 + Tailwind CSS 4.3.
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
- Dos conexiones directas opcionales en Android: festivos autorizados a Nager.Date y el preview social/web solicitado. Los sitios del preview reciben URL, IP, cookies y metadatos bajo su propia política.
- Fuentes WOFF2 locales, con licencias en `public/licenses/`; sin Google Fonts en runtime.

## Páginas

- `src/pages/index.astro` — landing principal.
- `src/pages/features/index.astro` — catálogo y comparación de funciones.
- `src/pages/faq/index.astro` — preguntas frecuentes ES/EN.
- `src/pages/privacy/index.astro` — privacidad, flujos de datos y permisos.
- `src/components/` — navegación, footer, carrusel, CTA y bloques compartidos.
- `public/assets/` — logo y screenshots vigentes.

## Campaña visual para web y Google Play

La campaña para Play cubre español, inglés, alemán, francés y portugués de Brasil, con ocho
composiciones por idioma. La web utiliza las series ES/EN. Comparten capturas nativas actuales,
tipografía Bricolage y una paleta de coral, papel y grafito. Se capturaron en el Moto/API 35 con nombres,
notas, cuentas e importes ficticios dentro del paquete benchmark aislado. El hero y la página
de funciones muestran esas mismas capturas sin texto promocional superpuesto.

- Fuente canónica y JPEGs para Play: `../fun-phone/screenshots/store-v2/`.
- Composición editable: `tools/store-mockups/studio.html`; copy y alt text en el `campaign.json`
  canónico, sincronizados a `src/data/store-screenshots.json` durante la exportación.
- WebP vigentes: `public/assets/store-v2/{es,en}/`; capturas sin composición en `ui/`.
- Fondo abstracto creado con `image_gen`; prompt íntegro en
  `../fun-phone/screenshots/store-v2/artwork/prompt.txt`. La interfaz proviene de Compose.
- `npm run render:store` usa Chrome local, Puppeteer y Sharp para regenerar los 40 masters
  1080×1920, cinco feature graphics 1024×500 y cinco láminas `overview-{idioma}.jpg`.
  Solo genera WebP y capturas sin composición para los idiomas de `export.webLocales` (ES/EN).
  Puede recibir otra fuente con `npm run render:store -- /ruta/store-v2`.
- `npm run render:store -- --locales=de,fr,pt` renueva solo esos idiomas de Play y conserva los
  demás archivos de imagen. Los textos de Play están en `../fun-phone/play-listing/`, con
  metadatos completos para `en-US`, `es-419`, `de-DE`, `fr-FR` y `pt-BR`.

El carrusel conserva proporción 9:16, cambia imagen y etiquetas con ES/EN y ofrece ampliación
mediante diálogo accesible. Se comprobó a 390 y 1440 px, con teclado, Escape y retorno del foco;
sin JavaScript mantiene la primera composición y su texto. La PWA precarga ambas series y las
capturas actuales. Los archivos antiguos de `public/assets/screenshots/` quedan archivados,
sin referencias en las páginas ni precarga offline. Exportar o compilar no publica en Play ni web.

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

## Upgrade verificado — 2026-11-03

La iteración conserva Astro estático, ES/EN, GitHub Pages y la PWA. Usa superficies neutrales,
fuentes WOFF2 locales con licencias, controles localizados, un lightbox con diálogo nativo y foco
contenido, preferencias tolerantes a almacenamiento bloqueado, movimiento reducido y contenido
visible sin JavaScript. Las cuatro rutas, el cambio de idioma, teclado/Escape/retorno de foco,
modo sin JavaScript, almacenamiento bloqueado y navegación offline se comprobaron con Playwright.
El preview Android social/web y las reglas reales de backup figuran en privacidad y FAQ.
Una actualización desde un service worker anterior simulado activó el worker generado, mantuvo
el idioma guardado y permitió abrir `/faq/` offline. No equivale a validar cada instalación PWA
existente en producción.
La comprobación adicional con axe-core recorrió las cuatro páginas en claro/oscuro y ES/EN,
mostrando también los bloques revelados por scroll y dos tarjetas en hover: 24 inspecciones sin
fallos automáticos de contraste ni desbordamiento horizontal a 390 px.

Lighthouse móvil sobre el build local, mediana de tres ejecuciones por página, con Node 24.22.2 y transferencia
comprimida como GitHub Pages:

| Ruta | Rendimiento | Accesibilidad | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: |
| Inicio | 100 | 100 | 1,577 s | 0 | 22 ms |
| Funciones | 99 | 100 | 2,102 s | 0 | 0 ms |
| Privacidad | 100 | 100 | 1,652 s | 0 | 0 ms |
| FAQ | 99 | 100 | 2,101 s | 0 | 0 ms |

`check:lighthouse` exige rendimiento ≥90, accesibilidad ≥95, ausencia de fallos automáticos de
contraste, LCP ≤2,5 s, CLS ≤0,1 y TBT ≤200 ms. Son medidas de laboratorio, no métricas de campo.

El run de CI `41730604445` bloqueó el despliegue por un LCP de inicio de 2,928 s. La traza local
identificó el texto del titular como elemento LCP; una captura situada debajo del primer viewport
competía con las fuentes mediante una petición de prioridad alta. El inicio ahora precarga la
fuente serif del titular y carga esa captura con `loading="lazy"`, prioridad baja y decodificación
asíncrona, conservando sus dimensiones. La precarga serif se activa solo en el inicio.

Cada comprobación guarda los tres informes JSON y HTML de cada ruta en
`.lighthouse-reports/<fecha-hora>/`. Si falla el paso de Lighthouse, CI conserva esos informes
durante siete días en el artifact `lighthouse-<run>-<attempt>`, junto con el elemento LCP y su
desglose en el log. Se mantienen los presupuestos y la mediana de tres mediciones.

`npm run check:security` bloquea nuevas vulnerabilidades altas/críticas. Astro y Vite están
actualizados dentro de sus versiones mayores, y no quedan altas/críticas en el árbol completo.
Persisten nueve avisos de herramientas de build (dos bajos, siete moderados) en la cadena de
Workbox: deepmerge, glob/minimatch y dependientes. No forman parte del JavaScript del sitio estático;
sus entradas son código y patrones locales controlados. Se documentan como riesgo de build pendiente
de actualización compatible, conservando Workbox 7; no se usa `audit fix --force` ni se fuerzan
majors de transitivas con APIs incompatibles. El proyecto usa Node 24 LTS (24.22.2 o posterior dentro de 24.x); `.nvmrc` y CI fijan 24.22.2,
alineados con el entorno local. Esta rama incluye los parches de seguridad del 21 de octubre,
publicados en 24.22.1 y heredados por 24.22.2.
[Referencia oficial de Node.js](https://nodejs.org/en/blog/vulnerability/october-2026-security-releases).

El [aviso crítico de AVIF en Astro](https://github.com/withastro/astro/security/advisories/GHSA-26w7-cxv4-gfx2)
requiere que Astro procese una imagen AVIF no confiable; se corrigió desde 7.2.8. Este sitio genera
HTML estático con imágenes controladas en el repositorio y no publica un optimizador ni acepta
subidas. Esa revisión de configuración no demuestra ausencia de todo riesgo de build: el upgrade
a 7.4.5 elimina igualmente la versión vulnerable del lockfile.

`npm audit --omit=dev` no encuentra avisos en las dependencias de producción. La campaña visual
actual conserva capturas del Moto API 35 con datos sintéticos en el paquete benchmark; la PWA
conserva también estas imágenes y las fuentes locales al navegar sin conexión.
