/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/common/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/@components/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        "back-blue" : "#EDF6FF",
        "primary" : "#303F60",
        "secondary":"#1A253C",
        "sky-blue":"#43AFFF",
        "button-back":"#43AFFF33",
        "line":"#4D618E",
        "hr-color":"#4D618E",
        "form-gray":"#E8E8E833",
        "form-gray2":"#C6C6C6",
        "button-text":"#7A839A",
        "invalid-input":"#FF333380",
        "gray-3":"#557DA526",
        "light-blue":"#D9EFFF",
        "gray-secondary" : "#E8E8E833",
        "gray-4" : "#C6C6C6"
      },
      fontFamily:{
        "fp":["Helvetica"," Neue"]
      },
      boxShadow:{
        "3xl":"0px 30px 36px rgba(85, 125, 165, 0.15)",
        "custom":"0px 3px 6px #557DA526"
      },
      fontSize:{
        "xs":"14px",
        "4xl":"50px"
      },
      borderWidth:{
        "5":"5px",
        "1": "1px"
      },

      customCss: {
        '.loading': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
        },
        '.spinner': {
          border: '4px solid rgba(255, 255, 255, 0.3)',
          borderTop: '4px solid #3498db',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
          marginBottom: '16px',
        },
        '@keyframes spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'p': {
          color: '#3498db',
          fontSize: '18px',
        },
        
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const hoverUnderline = {
        '.hover-underline': {
          position: 'relative',
          display: 'inline-block',
        },
        '.hover-underline::after': {
          content: "''",
          position: 'absolute',
          width: 'calc(100% - 8px)',
          height: '2px',
          backgroundColor: 'transparent',
          bottom: '-17px',
          left: '4px',
          transition: 'background-color 0.3s',
        },
        '.hover-underline:hover::after': {
          backgroundColor: '#43AFFF',
        },
      };

      addUtilities(hoverUnderline, ['hover']);
    },
  ],
}
