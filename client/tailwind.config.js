/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      height: {
        'fit-content': 'fit-content',
      },
      borderWidth: {
        '0.1': '0.1px',
        '1':'1px'
      },
      padding:{
        '10px':'10px',
        '20':'20px'
      },
      margin:{
        '10px':'10px'
      },
      translate: {
        '-45': '-45%',
        '-50': '-50%',
      },
      backdropBlur: {
        '70': '70px',
      },
  
      boxShadow: {
        '10': '10px 10px 10px rgba(0, 0, 0, 0.5)',
      },
      borderRadius: {
        '10': '10px',
      },
      width: {
        '80': '80%',
      },
      top:{
        '50':'50%'
      },
  
    },
  },
  plugins: [],
})

