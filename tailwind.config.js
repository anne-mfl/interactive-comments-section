/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif']
      },
      colors: {
        'moderateBlue': 'hsl(238, 40%, 52%)',
        'darkBlue': 'hsl(212, 24%, 26%)',

        'lightGrayishBlue': 'hsl(239, 57%, 85%)',
        'grayishBlue': 'hsl(211, 10%, 45%)',

        'veryLightGray': 'hsl(228, 33%, 97%)',
        'lightGray': 'hsl(223, 19%, 93%)',
        
        'softRed': 'hsl(358, 79%, 66%)',
        'paleRed': 'hsl(357, 100%, 86%)'
      }
    },
  },
  plugins: [],
}
