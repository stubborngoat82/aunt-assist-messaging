// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'remote-bg': '#2c2c2c',
        'remote-button': '#3a3a3a',
        'remote-highlight': '#0070f3',
        'accessible-text': '#ffffff',
      },
      fontSize: {
        'accessible': '1.25rem',
      },
      spacing: {
        'remote-button': '3rem',
      }
    },
  },
  plugins: [],
}