/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#C0203A',
          'red-dark': '#9A1830',
          blue: '#2B5FAC',
          'blue-dark': '#1E3F6F',
          navy: '#1B2A4A',
        },
        surface: {
          bg: '#0F0F0F',
          card: '#1A1A1A',
          elevated: '#222222',
          border: '#2A2A2A',
          'border-2': '#3A3A3A',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#888888',
          tertiary: '#555555',
          inverse: '#0F0F0F',
        },
      },
      fontFamily: {
        sans: ['Red Hat Display', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
