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
          red: '#d9434f',
          'red-dark': '#C0203A',
          blue: '#2B5FAC',
          'blue-dark': '#1E3F6F',
          navy: '#1B2A4A',
        },
        surface: {
          bg: '#21252C',
          card: '#1A1A1A',
          elevated: '#222222',
          border: '#2A2A2A',
          'border-2': '#3A3A3A',
          'input': '#454a54',
          'input-border': '#6c87ad',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#888888',
          tertiary: '#555555',
          inverse: '#0F0F0F',
          'label': '#eff2f6',
          'placeholder': '#9ca3af',
        },
      },
      fontFamily: {
        sans: ['Red Hat Display', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
