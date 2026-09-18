/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        risk: {
          stable: {
            light: '#ecfdf5',
            border: '#a7f3d0',
            text: '#065f46',
            badge: '#10b981',
            bg: '#d1fae5',
          },
          attention: {
            light: '#fffbeb',
            border: '#fde68a',
            text: '#92400e',
            badge: '#f59e0b',
            bg: '#fef3c7',
          },
          immediate: {
            light: '#fff1f2',
            border: '#fecdd3',
            text: '#9f1239',
            badge: '#f43f5e',
            bg: '#ffe4e6',
          }
        }
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-hover': '0 10px 25px -5px rgba(99, 102, 241, 0.1), 0 8px 10px -6px rgba(99, 102, 241, 0.05)',
        'card': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.06)',
      }
    },
  },
  plugins: [],
}
