/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        article: 'source-serif-pro, Georgia, Cambria, "Times New Roman", Times, serif'
      },
      colors: {
        //'highlight-red': '#ff9999'
        //'highlight-red': '#EF9A9A'
        'highlight-red': '#EF5350'
      }
    },
  },
  plugins: []
}

