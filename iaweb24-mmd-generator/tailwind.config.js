/** @type {import('tailwindcss').Config} */
export default {
  css: [
    '@/assets/css/tailwind.css', // Path to the Tailwind CSS file
  ],
  content: [],
  theme: {
    extend: {
      colors: {
        primary_dark: "#23272f",
        primary_light: "#f4f3f0",
        green: "#B6C7AA",
        pink: "#f5a9cd",
        blue: "#0093d9",
        gold: "#d7c477",
        secondary: "#E7D4B5",
        brown:"#A0937D",
        beige: "#F6E6CB",
        primary: "#122c67"
        //primary: "#23272f"  //red
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

