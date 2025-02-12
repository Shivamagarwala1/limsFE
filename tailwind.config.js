/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        headerColor: '#B2FFB5',
        menuColor: '#76FF7E',
        subMenuColor: '#D7FFD9',
        //quaternary: '#F0FFF0',
        textColor: '#000000B3',
        iconColor: '#FFFFFF',

        gridTextColor: '#212529'

      },
      borderColor: {
        borderColor: '#ced4da'
      },
      fontSize: {
        'xxs': '0.7rem',
        'xxxs': '0.6rem', // Define custom text size
        'xxxxs': '0.5rem', // Define custom text size
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        slideDown: 'slideDown 0.5s ease-out',
      },
    },
  },
  plugins: [],
}