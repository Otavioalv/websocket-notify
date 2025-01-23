/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        floatBubble: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          }
        }
      },
      animation: {
        'spin-3s': 'spin 3s linear infinite',
        'spin-4s': 'spin 4s linear infinite',
        'spin-5s': 'spin 5s linear infinite',
        'floatBubble': 'floatBubble 4s ease-in-out infinite',
      },
	    boxShadow: {
        'outline-sm': '0px 0px 15px -1px #6d28d9',
		    'outline-md': '0px 0px 25px -1px #6d28d9',
        'bubble': 'rgba(0, 0, 0, 0.30) 0px -12px 16px 0px inset,rgba(0, 0, 0, 0.09) 0px -10px 15px -8px',
      }
    },
  },
  plugins: [],
}