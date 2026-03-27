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
        '3xl': '1.75rem',
        '4xl': '2rem',
      },
      colors: {
        accent: {
          DEFAULT: '#0066e0',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#7cb8ff',
          400: '#4a9bff',
          500: '#0066e0',
          600: '#0052b4',
          700: '#003d88',
          800: '#00295c',
          900: '#001a3d',
        },
        electric: '#00d4ff',
        midnight: '#0a0e27',
      },
      fontFamily: {
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up-delayed': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(0,102,224,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0,212,255,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(0,102,224,0.08) 0px, transparent 50%)',
        'mesh-gradient-dark': 'radial-gradient(at 40% 20%, rgba(0,102,224,0.25) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0,212,255,0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(0,102,224,0.12) 0px, transparent 50%)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
