/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/App.tsx', './src/screens/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Inter-Regular'],
        InterBlack: ['Inter-Black'],
        InterBold: ['Inter-Bold'],
        InterExtraBold: ['Inter-ExtraBold'],
        InterExtraLight: ['Inter-ExtraLight'],
        InterLight: ['Inter-Light'],
        InterMedium: ['Inter-Medium'],
        InterSemiBold: ['Inter-SemiBold'],
        InterThin: ['Inter-Thin'],
      },
    },
    fontSize: {
      sm: '100px',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
  },
  plugins: [],
};
