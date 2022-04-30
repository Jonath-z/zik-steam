module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      isMobileOrTablet: { max: '1224px' },
    },
    extend: {},
  },
  plugins: [],
};
