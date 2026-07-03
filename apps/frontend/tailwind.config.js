module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#F5EDD3', light: '#FAF5E8', border: '#DDD1AA' },
        cobalt: { DEFAULT: '#2350B5', dark: '#1A3A8A' },
        ink: '#12205A',
      },
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        sans:    ['Jost', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}