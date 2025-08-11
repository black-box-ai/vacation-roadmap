/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#1E88E5',
        secondary: '#FFC107',
      },
      boxShadow: {
        card: '0 4px 20px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [],
}