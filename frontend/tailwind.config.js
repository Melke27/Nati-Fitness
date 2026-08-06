/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#050505',
          soft: '#111111',
        },
        ink: {
          DEFAULT: '#111111',
          secondary: '#A1A1AA',
        },
        accent: {
          DEFAULT: '#7CFF4F',
          hover: '#95FF66',
          dark: '#95FF66',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        danger: '#EF4444',
        surface: {
          DEFAULT: 'rgb(var(--surface) / <alpha-value>)',
          subtle: 'rgb(var(--surface-subtle) / <alpha-value>)',
          solid: 'rgb(var(--surface-solid) / <alpha-value>)',
          card: 'rgb(var(--card) / <alpha-value>)',
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
      fontSize: {
        display: ['4.5rem', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-sm': ['3.5rem', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '800' }],
        heading: ['2.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-sm': ['1.875rem', { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '700' }],
        subheading: ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.65', letterSpacing: '0' }],
        caption: ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '500' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        30: '7.5rem',
      },
      maxWidth: {
        shell: '1280px',
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(0, 0, 0, 0.4)',
        lift: '0 16px 48px -12px rgba(0, 0, 0, 0.5)',
        glow: '0 0 0 1px rgba(124, 255, 79, 0.2), 0 8px 32px -8px rgba(124, 255, 79, 0.35)',
        card: '0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 8px 32px -8px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 1px 0 rgba(255, 255, 255, 0.06) inset, 0 20px 48px -12px rgba(0, 0, 0, 0.55)',
      },
      backgroundImage: {
        'cta-gradient': 'linear-gradient(135deg, #7CFF4F 0%, #6AE838 100%)',
        'cta-gradient-hover': 'linear-gradient(135deg, #95FF66 0%, #7CFF4F 100%)',
        'hero-glow':
          'radial-gradient(60% 60% at 72% 18%, rgba(124,255,79,0.15) 0%, transparent 60%), radial-gradient(42% 42% at 8% 82%, rgba(124,255,79,0.08) 0%, transparent 60%)',
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
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
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
