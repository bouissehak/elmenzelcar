/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',
          slate: '#64748b',
          gold: '#fbbf24',
          goldHover: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Cairo', 'sans-serif'],
        ar: ['Cairo', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

