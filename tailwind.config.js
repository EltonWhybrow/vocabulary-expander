/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts,scss}" // Ensure Tailwind scans your Angular files
  ],
  theme: {
    extend: {
      colors: {
        // customBlue: '#1E40AF', // Custom color name and hex code
        customOrange: {
          light: '#FFD279',
          DEFAULT: '#FAB222',
          dark: '#C48505'
        }
      }
    },
  },
  plugins: [],
};
