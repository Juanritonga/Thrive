import tailwindScrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Path ke file Anda
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0F1E55',
        'custom-blue2': '#5A7BAF',
        'custom-base': '#F4F5FA', 
      },
      fontFamily: {
        sans: ['DM Sans'],
      },
      spacing: {
        '9/10': '90%',  // 9/10 = 90%
        '10/11': '90.909090909%', // 10/11 = 90.91%
        '11/12': '91.666666667%', // 11/12 = 91.67%
        '12/13': '92.307692308%', // 12/13 = 92.31%
        '13/14': '92.857142857%', // 13/14 = 92.86%
        '14/15': '93.333333333%', // 14/15 = 93.33%
        '15/16': '93.75%', // 6/7 adalah sekitar 85.7%
      },
    },
  },
  plugins: [
    tailwindScrollbarHide, 
  ],
};
