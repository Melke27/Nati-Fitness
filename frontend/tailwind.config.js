/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0B0B0B',
          soft: '#F8F8F8',
        },
        ink: {
          DEFAULT: '#111111',
          secondary: '#666666',
        },
        accent: {
          DEFAULT: '#7CFF4F',
          dark: '#59E62A',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        line: '#EAEAEA',
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          subtle: 'rgb(var(--surface-subtle) / <alpha-value>)',
          solid: 'rgb(var(--surface-solid) / <alpha-value>)',
        },
        content: {
          DEFAULT: 'rgb(var(--content) / <alpha-value>)',
          muted: 'rgb(var(--content-muted) / <alpha-value>)',
          faint: 'rgb(var(--content-faint) / <alpha-value>)',
          inverse: 'rgb(var(--content-inverse) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--border) / <alpha-value>)',
          strong: 'rgb(var(--border-strong) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        shell: '1440px',
      },
      borderRadius: {
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(11, 11, 11, 0.12)',
        lift: '0 24px 70px -18px rgba(11, 11, 11, 0.22)',
        glow: '0 0 0 1px rgba(124, 255, 79, 0.25), 0 20px 60px -20px rgba(124, 255, 79, 0.5)',
        card: '0 1px 2px rgba(17, 17, 17, 0.04), 0 12px 40px -12px rgba(17, 17, 17, 0.1)',
        'card-dark': '0 1px 2px rgba(0, 0, 0, 0.4), 0 16px 48px -16px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'cta-gradient': 'linear-gradient(135deg, #7CFF4F 0%, #59E62A 100%)',
        'cta-gradient-hover': 'linear-gradient(135deg, #59E62A 0%, #45C91E 100%)',
        'hero-glow':
          'radial-gradient(60% 60% at 72% 18%, rgba(124,255,79,0.20) 0%, transparent 60%), radial-gradient(42% 42% at 8% 82%, rgba(124,255,79,0.10) 0%, transparent 60%)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin 16s linear infinite',
        marquee: 'marquee 36s linear infinite',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        shimmer: 'shimmer 1.8s linear infinite',
        'ping-slow': 'ping 2.6s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
