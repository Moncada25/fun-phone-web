module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      borderRadius: {
        'lg': '1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      colors: {
        accent: '#0066e0',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
