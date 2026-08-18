declare module 'alpinejs' {
  interface AlpineRuntime {
    start(): void;
  }

  const Alpine: AlpineRuntime;
  export default Alpine;
}
