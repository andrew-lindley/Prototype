/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Optimistic VF"', 'system-ui', 'sans-serif'],
        ai: ['"Optimistic AI VF"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
