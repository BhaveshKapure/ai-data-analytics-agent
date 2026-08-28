/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#030D1A',
          900: '#071A33',
          800: '#0B2447',
          700: '#143666',
          600: '#1C4A8A',
        },
        brand: {
          blue: '#1677D2',
          cyan: '#2F9BF4',
          light: '#EAF5FF',
          accent: '#00F0FF',
          purple: '#8B5CF6',
        },
        bg: {
          main: '#F5F9FD',
          card: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#F8FAFC',
          muted: '#F1F5F9',
        },
        text: {
          primary: '#102033',
          secondary: '#64748B',
          muted: '#94A3B8',
        },
        status: {
          success: '#22A06B',
          warning: '#F59E0B',
          danger: '#E05252',
          info: '#1677D2',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(7, 26, 51, 0.05)',
        'card-hover': '0 12px 30px -4px rgba(22, 119, 210, 0.12)',
        'glass': '0 8px 32px 0 rgba(11, 36, 71, 0.08)',
        'glow': '0 0 25px rgba(47, 155, 244, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
