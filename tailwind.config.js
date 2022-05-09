const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '360px',
      },
      backgroundColor: ['group-focus', 'checked'],
      borderColor: ['checked'],
      brightness: ['hover', 'focus'],
    },
  },
  plugins: [],
}
