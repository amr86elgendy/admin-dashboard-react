module.exports = {
  mode: 'jit',
  content: ['./src/**/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        nav: '0 11px 10px -10px rgb(85 85 85 / 40%)',
        card: '0 1px 3px #00000026',
        input: '0 0 0 3px rgb(101 118 255 / 10%)',
        error: '0 0 0 3px rgb(232 83 71 / 10%)',
      },
    },
  },
  plugins: [],
};