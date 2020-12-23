/* eslint-env node */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Red Hat Text', 'sans-serif']
    },
    letterSpacing: {
      widest: '0.4em'
    },
    extend: {
      animation: {
        front: 'flipDownFront 300ms ease-in both',
        back: 'flipDownBack 300ms ease-in both',
        under: 'fadeUnder 300ms ease-in both',
        flipTop: 'flipTop 1s ease-in-out infinite',
        flipBottom: 'flipBottom 1s ease-in-out infinite',
      },
      backgroundImage: {
        stars: 'url(\'/images/bg-stars.svg\')'
      },
      colors: {
        theme_grayishBlue: 'hsl(237, 18%, 59%)',
        theme_softRed: 'hsl(345, 95%, 68%)',
        theme_white: 'hsl(0, 0%, 100%)',
        theme_darkDesaturatedBlue: 'hsl(236, 21%, 26%)',
        theme_veryDarkBlue: 'hsl(235, 16%, 14%)',
        theme_veryDarkMostlyBlackBlue: 'hsl(234, 17%, 12%)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant('after', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`after${separator}${className}`)}::after`
        })
      })
    }),
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.brightness-90': {
          filter: 'brightness(90%)'
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden'
        }
      }

      addUtilities(newUtilities)
    })
  ],
}
