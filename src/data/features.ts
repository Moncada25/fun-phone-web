// Product copy shared by the home and features pages.
// Every claim here is checked against the app repository (README, PLAY_STORE_LISTING, PRIVACY and strings).

export type Localized = { es: string; en: string };

export interface Feature {
  id: string;
  icon:
    | 'phone' | 'users' | 'shield' | 'note' | 'lock' | 'wallet' | 'qr' | 'mic' | 'calendar'
    | 'timer' | 'heart' | 'brush' | 'gamepad' | 'palette' | 'globe' | 'sliders' | 'device';
  title: Localized;
  desc: Localized;
  points?: { es: string[]; en: string[] };
}

export const coreFeatures: (Feature & { screen: string })[] = [
  {
    id: 'dialer',
    icon: 'phone',
    screen: 'dialer',
    title: { es: 'Marcador T9', en: 'T9 dialer' },
    desc: {
      es: 'Encuentra a quien buscas mientras marcas. Ves el nombre, la bandera y el prefijo del país al instante.',
      en: 'Find people as you dial. See the name, flag and country code right away.',
    },
    points: {
      es: ['Búsqueda T9 en tus contactos', 'Prefijo y bandera del país', 'Dual-SIM en dispositivos compatibles'],
      en: ['T9 search across your contacts', 'Country code and flag', 'Dual SIM on supported devices'],
    },
  },
  {
    id: 'contacts',
    icon: 'users',
    screen: 'favorites',
    title: { es: 'Contactos y favoritos', en: 'Contacts and favorites' },
    desc: {
      es: 'Tu gente a un toque, con herramientas para mantener la agenda ordenada.',
      en: 'Your people one tap away, with tools that keep your address book tidy.',
    },
    points: {
      es: ['Favoritos y widget de inicio', 'Importa y exporta vCard o JSON', 'Duplicados y contactos por QR'],
      en: ['Favorites and a home-screen widget', 'vCard and JSON import and export', 'Duplicate tools and QR sharing'],
    },
  },
  {
    id: 'calls',
    icon: 'shield',
    screen: 'contacts',
    title: { es: 'Llamadas bajo control', en: 'Calls under control' },
    desc: {
      es: 'Controles claros en cada llamada y un filtro de spam que usa el filtrado de llamadas de Android.',
      en: 'Clear controls on every call and a spam filter built on Android call screening.',
    },
    points: {
      es: ['Contesta, rechaza o responde con un mensaje', 'Recientes y llamadas perdidas', 'Bloqueo de números de Android'],
      en: ['Answer, decline or reply with a message', 'Recents and missed calls', 'Android number blocking'],
    },
  },
];

export const toolFeatures: Feature[] = [
  {
    id: 'notes',
    icon: 'note',
    title: { es: 'Notas y listas', en: 'Notes and checklists' },
    desc: {
      es: 'Texto enriquecido, checklists, recordatorios y notas bloqueadas con PIN o biometría.',
      en: 'Rich text, checklists, reminders and notes locked with PIN or biometrics.',
    },
  },
  {
    id: 'vault',
    icon: 'lock',
    title: { es: 'Bóveda cifrada', en: 'Encrypted vault' },
    desc: {
      es: 'Contraseñas cifradas en el dispositivo, generador, códigos de dos pasos y autocompletado.',
      en: 'Passwords encrypted on your device, a generator, two-step codes and autofill.',
    },
  },
  {
    id: 'expenses',
    icon: 'wallet',
    title: { es: 'Gastos', en: 'Expenses' },
    desc: {
      es: 'Gastos fijos y variables, categorías, presupuestos y estadísticas locales.',
      en: 'Fixed and variable expenses, categories, budgets and local statistics.',
    },
  },
  {
    id: 'qr',
    icon: 'qr',
    title: { es: 'QR', en: 'QR codes' },
    desc: {
      es: 'Escanea y genera códigos, léelos desde la galería y comparte contactos.',
      en: 'Scan and create codes, read them from your gallery and share contacts.',
    },
  },
  {
    id: 'voice',
    icon: 'mic',
    title: { es: 'Voz', en: 'Voice' },
    desc: {
      es: 'Dictado y lectura en voz alta con el proveedor de voz de tu Android.',
      en: 'Dictation and text-to-speech through your Android speech provider.',
    },
  },
  {
    id: 'calendar',
    icon: 'calendar',
    title: { es: 'Calendario', en: 'Calendar' },
    desc: {
      es: 'Cumpleaños de tus contactos, eventos de tus calendarios y festivos opcionales.',
      en: 'Contact birthdays, events from your calendars and optional public holidays.',
    },
  },
  {
    id: 'pomodoro',
    icon: 'timer',
    title: { es: 'Pomodoro', en: 'Pomodoro' },
    desc: {
      es: 'Temporizador 25/5 configurable que sigue en segundo plano.',
      en: 'A configurable 25/5 timer that keeps running in the background.',
    },
  },
  {
    id: 'wellbeing',
    icon: 'heart',
    title: { es: 'Bienestar', en: 'Wellbeing' },
    desc: {
      es: 'Calendario de ciclo con predicciones, guardado solo en tu dispositivo.',
      en: 'A cycle calendar with predictions, stored only on your device.',
    },
  },
  {
    id: 'paint',
    icon: 'brush',
    title: { es: 'Pintura', en: 'Paint' },
    desc: {
      es: 'Pinceles, formas, texto e imágenes importadas. Exporta y comparte.',
      en: 'Brushes, shapes, text and imported images. Export and share.',
    },
  },
  {
    id: 'games',
    icon: 'gamepad',
    title: { es: '10 minijuegos', en: '10 mini games' },
    desc: {
      es: 'Fun Bird, Snake, Buscaminas, 2048, Sudoku, Memory y más, con estadísticas.',
      en: 'Fun Bird, Snake, Minesweeper, 2048, Sudoku, Memory and more, with stats.',
    },
  },
];

export const gameNames: Localized = {
  es: 'Fun Bird, Snake, Buscaminas, 2048, Puzzle, Tres en raya, Ahorcado, Breakout, Sudoku y Memory',
  en: 'Fun Bird, Snake, Minesweeper, 2048, Puzzle, Tic-Tac-Toe, Hangman, Breakout, Sudoku and Memory',
};

export const customization: Feature = {
  id: 'style',
  icon: 'palette',
  title: { es: 'Hazla tuya', en: 'Make it yours' },
  desc: {
    es: 'Tres estilos (Moderno, Minimalista y Retro), modo claro u oscuro, colores de acento, fuentes, tamaño de texto y efectos de cristal.',
    en: 'Three styles (Modern, Minimalist and Retro), light or dark mode, accent colors, fonts, text size and glass effects.',
  },
  points: {
    es: ['Tres estilos de interfaz', 'Claro, oscuro y AMOLED', 'Fuentes y tamaño de texto', 'Etiquetas para lectores de pantalla'],
    en: ['Three interface styles', 'Light, dark and AMOLED', 'Fonts and text size', 'Screen-reader-friendly labels'],
  },
};
