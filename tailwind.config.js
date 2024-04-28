const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: '#14B8A6',
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: '#0D9488',
              foreground: '#ffffff',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: '#14B8A6',
              foreground: '#ffffff',
            },
            secondary: {
              DEFAULT: '#0D9488',
              foreground: '#ffffff',
            },
          },
        },
      },
    }),
  ],
}
