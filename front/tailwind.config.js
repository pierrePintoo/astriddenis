const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      translate: ['group-hover']
    },
  },
  plugins: [
    plugin(function({ addBase, theme }) {
      addBase({
        'body': { fontFamily: 'Snell Roundhand' },
        'h1': { fontSize: theme('fontSize.h1') },
        // 'h2': { fontSize: theme('fontSize.xl') },
        // 'h3': { fontSize: theme('fontSize.lg') },
      })
    })
  ],
  theme: {
    colors: {
      black: colors.black,
      pink: '#FFBFBF'
    },
    fontSize: {
      h1: '5rem',
      linkBig: '2.5rem',
      small: '1.125rem'
    }
  }
}
