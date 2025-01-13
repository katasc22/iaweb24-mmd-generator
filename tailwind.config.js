/** @type {import('tailwindcss').Config} */
export default {
  css: [
    '@/assets/css/tailwind.css', // Path to the Tailwind CSS file
  ],
  content: [],
  theme: {
    extend: {
      colors: {
        primary_light: "#f4f3f0",
        primary_dark: "#23272f",
        green: "#B6C7AA",
        darkgrey: "#272a24"
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
        oldStandard: ['Old Standard TT', 'serif'],
        lato: ['Lato', 'sans-serif'],
        bebas: 'Bebas Neue'
      },
    },
  },
  plugins: [],
}

