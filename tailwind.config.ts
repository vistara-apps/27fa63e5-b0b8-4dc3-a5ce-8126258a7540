import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(220 20% 98%)',
        foreground: 'hsl(220 39% 11%)',
        primary: 'hsl(240 80% 50%)',
        'primary-foreground': 'hsl(0 0% 100%)',
        secondary: 'hsl(220 16% 92%)',
        'secondary-foreground': 'hsl(220 14% 58%)',
        accent: 'hsl(120 70% 45%)',
        'accent-foreground': 'hsl(0 0% 100%)',
        destructive: 'hsl(0 80% 45%)',
        'destructive-foreground': 'hsl(0 0% 100%)',
        border: 'hsl(220 16% 92%)',
        input: 'hsl(220 16% 92%)',
        ring: 'hsl(240 80% 50%)',
        surface: 'hsl(0 0% 100%)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        'xxl': '24px',
      },
      boxShadow: {
        'sm': '0 1px 3px 0 rgba(0, 0, 0, 0.08)',
        'md': '0 4px 10px rgba(0, 0, 0, 0.1)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms cubic-bezier(0.25, 0.8, 0.25, 1.0)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.25, 0.8, 0.25, 1.0)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
