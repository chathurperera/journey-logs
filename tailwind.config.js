/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/App.tsx', './src/screens/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      extraSmall: '13px',
      small: '14px',
      base: '16px',
      medium: '18px',
      lg: '20px',
      xlg: '23px',
      '2xlg': '26px',
      '3xlg': '29px',
      '4xlg': '32px',
    },
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
  },
  plugins: [],
};
