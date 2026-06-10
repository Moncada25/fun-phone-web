module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: 'var(--paper)',
          dark: 'var(--paper-dark)',
          soft: 'var(--paper-soft)',
          edge: 'var(--paper-edge)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          muted: 'var(--ink-muted)',
          ghost: 'var(--ink-ghost)',
        },
        flame: {
          DEFAULT: 'var(--flame)',
          50: '#FFF1EB',
          100: '#FFE0D0',
          200: '#FFC0A0',
          300: '#FF996D',
          400: '#FF7547',
          500: '#FF4D1A',
          600: '#E63D0E',
          700: '#B82E08',
          800: '#8A2206',
          900: '#5C1703',
        },
        cobalt: {
          DEFAULT: 'var(--cobalt)',
          soft: '#5C7CFF',
        },
        cream: 'var(--paper)',
        midnight: 'var(--paper-dark)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        body: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.08em' }],
        'display-xs': ['2.5rem', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-sm': ['3rem', { lineHeight: '1.0', letterSpacing: '-0.035em' }],
        'display-md': ['4rem', { lineHeight: '0.96', letterSpacing: '-0.04em' }],
        'display-lg': ['5.5rem', { lineHeight: '0.94', letterSpacing: '-0.045em' }],
        'display-xl': ['7.5rem', { lineHeight: '0.9', letterSpacing: '-0.05em' }],
        'display-2xl': ['10rem', { lineHeight: '0.86', letterSpacing: '-0.055em' }],
      },
      borderRadius: {
        none: '0',
        sm: '4px',
        DEFAULT: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        '3xl': '28px',
      },
      borderWidth: {
        hairline: '1px',
        DEFAULT: '1px',
        '1.5': '1.5px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
      },
      animation: {
        'marquee': 'marquee 32s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'rise': 'rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        'rise-1': 'rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.08s forwards',
        'rise-2': 'rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.16s forwards',
        'rise-3': 'rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.24s forwards',
        'rise-4': 'rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.32s forwards',
        'rise-5': 'rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.4s forwards',
        'rise-6': 'rise 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) 0.48s forwards',
        'fade-in': 'fadeIn 1.2s ease forwards',
        'scribble': 'scribble 1.6s cubic-bezier(0.6, 0, 0.4, 1) forwards',
        'blink': 'blink 1.4s steps(1) infinite',
        'wiggle': 'wiggle 4s ease-in-out infinite',
        'tilt': 'tilt 12s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scribble: {
          from: { strokeDashoffset: '1000', opacity: '0' },
          to: { strokeDashoffset: '0', opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        tilt: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
        },
      },
      backgroundImage: {
        'paper-grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        'grid-lines': "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
      },
      backgroundSize: {
        'grain': '200px 200px',
        'grid-md': '48px 48px',
      },
      letterSpacing: {
        tightest: '-0.05em',
        mono: '0.02em',
      },
      transitionTimingFunction: {
        'editorial': 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
