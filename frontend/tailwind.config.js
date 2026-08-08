/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#050505',
          soft: '#080808',
        },
        nav: '#0A0A0A',
        footer: '#080808',
        accent: {
          DEFAULT: '#E11D48',
          hover: '#F43F5E',
          dark: '#F43F5E',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        error: '#EF4444',
        danger: '#EF4444',
        divider: '#27272A',
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
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['5rem', { lineHeight: '1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'hero-lg': ['6rem', { lineHeight: '0.98', letterSpacing: '-0.035em', fontWeight: '700' }],
        section: ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'section-lg': ['3.5rem', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '700' }],
        'card-title': ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        body: ['1.0625rem', { lineHeight: '1.7', letterSpacing: '0' }],
        caption: ['0.875rem', { lineHeight: '1.5', letterSpacing: '0' }],
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
        xl: '12px',
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(0, 0, 0, 0.5)',
        lift: '0 20px 48px -12px rgba(0, 0, 0, 0.6)',
        glow: '0 0 0 1px rgba(225, 29, 72, 0.25), 0 8px 32px -8px rgba(225, 29, 72, 0.35)',
        card: '0 1px 0 rgba(255, 255, 255, 0.03) inset, 0 8px 32px -8px rgba(0, 0, 0, 0.45)',
        'card-hover':
          '0 0 0 1px rgba(225, 29, 72, 0.18), 0 24px 48px -16px rgba(0, 0, 0, 0.65), 0 8px 24px -8px rgba(225, 29, 72, 0.18)',
        header: '0 12px 40px -16px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'cta-gradient': 'linear-gradient(135deg, #E11D48 0%, #C81A2F 100%)',
        'cta-gradient-hover': 'linear-gradient(135deg, #F43F5E 0%, #E11D48 100%)',
        'card-gradient': 'linear-gradient(180deg, #141417 0%, #0e0e10 100%)',
        'hero-glow':
          'radial-gradient(60% 60% at 72% 18%, rgba(225,29,72,0.12) 0%, transparent 60%), radial-gradient(42% 42% at 8% 82%, rgba(225,29,72,0.06) 0%, transparent 60%)',
        'accent-fade': 'linear-gradient(90deg, transparent, rgba(225,29,72,0.5), transparent)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 36s linear infinite',
        shimmer: 'shimmer 1.8s linear infinite',
        'spin-slow': 'spin 16s linear infinite',
        'bounce-soft': 'bounceSoft 2s ease-in-out infinite',
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
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
    },
  },
  plugins: [],
}
