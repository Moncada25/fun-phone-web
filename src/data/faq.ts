import { gameNames } from './features';
import { supportEmail } from './site';

export interface FaqItem {
  id: string;
  q: { es: string; en: string };
  a: { es: string; en: string };
}

export interface FaqGroup {
  title: { es: string; en: string };
  items: FaqItem[];
}

export const faqGroups: FaqGroup[] = [
  {
    title: { es: 'Empezar', en: 'Getting started' },
    items: [
      {
        id: 'default-app',
        q: { es: '¿Cómo la configuro como app de teléfono predeterminada?', en: 'How do I set it as my default phone app?' },
        a: {
          es: 'Abre Estado del dispositivo en Fun Phone: te guía para conceder permisos y elegirla como marcador predeterminado. También puedes hacerlo en Ajustes de Android → Apps predeterminadas → Teléfono.',
          en: 'Open Device Status in Fun Phone: it walks you through permissions and choosing it as the default dialer. You can also do it in Android Settings → Default apps → Phone.',
        },
      },
      {
        id: 'price',
        q: { es: '¿Es gratis? ¿Tiene anuncios?', en: 'Is it free? Does it have ads?' },
        a: {
          es: 'Sí, es gratis. No tiene anuncios, micropagos ni SDKs de publicidad o analítica.',
          en: 'Yes, it is free. There are no ads, in-app purchases, or advertising or analytics SDKs.',
        },
      },
      {
        id: 'android',
        q: { es: '¿Qué versión de Android necesito?', en: 'Which Android version do I need?' },
        a: {
          es: 'Android 10 o superior. Algunas funciones de llamada, como Dual-SIM, dependen del fabricante y del operador.',
          en: 'Android 10 or later. Some calling features, such as Dual SIM, depend on the manufacturer and carrier.',
        },
      },
      {
        id: 'languages',
        q: { es: '¿En qué idiomas está?', en: 'Which languages does it support?' },
        a: {
          es: 'Español, inglés, portugués, francés y alemán.',
          en: 'English, Spanish, Portuguese, French and German.',
        },
      },
    ],
  },
  {
    title: { es: 'Código abierto y descargas', en: 'Open source and downloads' },
    items: [
      {
        id: 'source',
        q: { es: '¿El código fuente es público?', en: 'Is the source code public?' },
        a: {
          es: 'Sí. Fun Phone es código abierto bajo GPL-3.0 en github.com/Moncada25/fun-phone.',
          en: 'Yes. Fun Phone is open source under GPL-3.0 at github.com/Moncada25/fun-phone.',
        },
      },
      {
        id: 'play-vs-github',
        q: { es: '¿Qué diferencia hay entre Google Play y el APK de GitHub?', en: 'What is the difference between Google Play and the GitHub APK?' },
        a: {
          es: 'Las funciones son las mismas. Cada release de GitHub incluye un APK "community" firmado y sin librerías de Google; la versión de Play escanea QR con ML Kit y ofrece la reseña dentro de la app. Ambas pueden instalarse a la vez, pero no comparten datos.',
          en: 'The features are the same. Every GitHub release includes a signed "community" APK without Google libraries; the Play version scans QR codes with ML Kit and offers in-app reviews. Both can be installed at once, but they do not share data.',
        },
      },
      {
        id: 'obtainium',
        q: { es: '¿Cómo recibo actualizaciones del APK?', en: 'How do I get updates for the APK?' },
        a: {
          es: 'Con Obtainium: añade la URL del repositorio (github.com/Moncada25/fun-phone) y te avisará de cada nueva versión publicada en GitHub.',
          en: 'With Obtainium: add the repository URL (github.com/Moncada25/fun-phone) and it will notify you about every new GitHub release.',
        },
      },
      {
        id: 'contribute',
        q: { es: '¿Puedo contribuir?', en: 'Can I contribute?' },
        a: {
          es: 'Sí. Reporta errores en Issues, propone ideas en Discussions o envía un pull request siguiendo CONTRIBUTING.md. Se aceptan contribuciones hechas con asistentes de IA si las declaras en el PR; el proyecto también los usa.',
          en: 'Yes. Report bugs in Issues, share ideas in Discussions or send a pull request following CONTRIBUTING.md. AI-assisted contributions are welcome when you disclose them in the PR; the project uses AI assistants too.',
        },
      },
    ],
  },
  {
    title: { es: 'Privacidad', en: 'Privacy' },
    items: [
      {
        id: 'data-sharing',
        q: { es: '¿Fun Phone usa internet?', en: 'Does Fun Phone use the internet?' },
        a: {
          es: 'Solo en dos funciones opcionales. Los festivos envían país y año a Nager.Date tras tu aprobación. La vista previa social/web carga la red o la URL HTTPS que pides; ese sitio recibe la URL, tu IP, cookies y metadatos según su propia política. No se adjuntan contactos, llamadas ni eventos.',
          en: 'Only for two optional features. Public holidays sends country and year to Nager.Date after your approval. The social/web preview loads the network or HTTPS URL you request; that site receives the URL, your IP, cookies and request metadata under its own policy. No contacts, calls or events are attached.',
        },
      },
      {
        id: 'cloud',
        q: { es: '¿Sincroniza con la nube?', en: 'Does it sync to the cloud?' },
        a: {
          es: 'Fun Phone no tiene nube ni cuenta remota. Los datos se guardan en el dispositivo y el respaldo en la nube está desactivado. Android puede transferirlos entre dispositivos con su transferencia local autorizada.',
          en: 'Fun Phone has no cloud or remote account. Data stays on the device and cloud backup is turned off. Android may move it between devices using its authorized local transfer.',
        },
      },
      {
        id: 'permissions',
        q: { es: '¿Qué permisos pide?', en: 'Which permissions does it ask for?' },
        a: {
          es: 'Los de teléfono, registro de llamadas y contactos para funcionar como marcador. Cámara, micrófono y calendario solo cuando usas sus herramientas. Puedes revisarlos en Estado del dispositivo y revocarlos en cualquier momento.',
          en: 'Phone, call log and contacts so it can work as a dialer. Camera, microphone and calendar only when you use their tools. Review them in Device Status and revoke them at any time.',
        },
      },
      {
        id: 'passwords',
        q: { es: '¿Qué tan segura es la bóveda de contraseñas?', en: 'How secure is the password vault?' },
        a: {
          es: 'Cifra los datos en el dispositivo con Android Keystore, se desbloquea con PIN o biometría y se bloquea al salir o apagar la pantalla. También genera contraseñas, guarda códigos de dos pasos y puede autocompletar formularios.',
          en: 'It encrypts data on the device with Android Keystore, unlocks with PIN or biometrics and locks when you leave or turn off the screen. It also generates passwords, stores two-step codes and can autofill forms.',
        },
      },
    ],
  },
  {
    title: { es: 'Funciones', en: 'Features' },
    items: [
      {
        id: 'games',
        q: { es: '¿Qué juegos incluye?', en: 'Which games are included?' },
        a: {
          es: `Diez minijuegos: ${gameNames.es}. Además, un estudio de pintura.`,
          en: `Ten mini games: ${gameNames.en}. There is also a paint studio.`,
        },
      },
      {
        id: 'export',
        q: { es: '¿Cómo exporto mis contactos?', en: 'How do I export my contacts?' },
        a: {
          es: 'Desde Ajustes puedes importar y exportar contactos en vCard o JSON. La sincronización de cuentas la gestiona Android.',
          en: 'Import and export contacts as vCard or JSON from Settings. Android manages account sync.',
        },
      },
      {
        id: 'dual-sim',
        q: { es: '¿Soporta Dual-SIM?', en: 'Does it support Dual SIM?' },
        a: {
          es: 'Sí, en dispositivos y versiones de Android compatibles. Lo disponible depende del fabricante y del operador.',
          en: 'Yes, on compatible devices and Android versions. What is available depends on the manufacturer and carrier.',
        },
      },
      {
        id: 'customization',
        q: { es: '¿Puedo cambiar su aspecto?', en: 'Can I change how it looks?' },
        a: {
          es: 'Sí: tres estilos (Moderno, Minimalista y Retro), modo claro, oscuro o AMOLED, colores de acento, fuentes, tamaño de texto y efectos de cristal.',
          en: 'Yes: three styles (Modern, Minimalist and Retro), light, dark or AMOLED mode, accent colors, fonts, text size and glass effects.',
        },
      },
      {
        id: 'support',
        q: { es: '¿Cómo contacto al soporte?', en: 'How do I reach support?' },
        a: {
          es: `Abre un issue en GitHub o escribe a ${supportEmail}. Para fallos de seguridad, sigue SECURITY.md en el repositorio en lugar de abrir un issue público.`,
          en: `Open an issue on GitHub or email ${supportEmail}. For security issues, follow SECURITY.md in the repository instead of opening a public issue.`,
        },
      },
    ],
  },
];

export const allFaqs = faqGroups.flatMap((group) => group.items);
