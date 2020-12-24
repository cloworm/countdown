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
        flipTop: 'flipTop 1s ease-in',
        flipBottom: 'flipBottom 1s ease-in',
      },
      backgroundImage: {
        stars: 'url(\'/images/bg-stars.svg\')',
        hills: 'url(\'/images/pattern-hills.svg\')'
      },
      colors: {
        theme_grayishBlue: 'hsl(237, 18%, 59%)',
        theme_softRed: 'hsl(345, 95%, 68%)',
        theme_white: 'hsl(0, 0%, 100%)',
        theme_darkDesaturatedBlue: 'hsl(236, 21%, 26%)',
        theme_veryDarkBlue: 'hsl(235, 16%, 14%)',
        theme_veryDarkMostlyBlackBlue: 'hsl(234, 17%, 12%)',
      },
      fontSize: {
        'xxs': '0.5rem'
      },
      keyframes: {
        flipTop: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(-180deg)' }
        },
        flipBottom: {
          '0%': { transform: 'rotateX(180deg)' },
          '100%': { transform: 'rotateX(0deg)' }
        }
      }
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
        '.brightness-80': {
          filter: 'brightness(80%)'
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden'
        },
        '.preserve-3d': {
          'transform-style': 'preserve-3d'
        },
        '.perspective': {
          'perspective-origin': '50% 50%',
          perspective: '450px'
        },
        '.bg-x-82': {
          'background-position-x': '82%'
        }
      }

      addUtilities(newUtilities)
    })
  ],
}
