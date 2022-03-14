module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['Roboto Condensed', 'sans-serif']
    },
    extend: {
      minWidth: {
        '1c': '12rem',
      },
      maxWidth: {
        '3xs': '12rem',
        '2xs': '16rem',
      },
    }
  },
  plugins: [],
}
