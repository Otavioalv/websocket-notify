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
        }, 
        'floatBubble-1': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateX(-10px)',
          }
        },
        'floatBubble-2': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-15px)',
          }
        },
        'floatBubble-3': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          }
        },
        'floatBubble-4': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateX(-15px)',
          }
        },
        'floatBubble-5': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          }
        }
      },
      animation: {
        'spin-3s': 'spin 3s linear infinite',
        'spin-4s': 'spin 4s linear infinite',
        'spin-5s': 'spin 5s linear infinite',
        'floatBubble-1': 'floatBubble-1 4s ease-in-out infinite',
        'floatBubble-2': 'floatBubble-2 5s ease-in-out infinite',
        'floatBubble-3': 'floatBubble-3 3s ease-in-out infinite',
        'floatBubble-4': 'floatBubble-4 5s ease-in-out infinite',
        'floatBubble-5': 'floatBubble-5 3s ease-in-out infinite',
      },
	    boxShadow: {
        'outline-sm': '0px 0px 15px -1px #6d28d9',
		    'outline-md': '0px 0px 25px -1px #6d28d9',
        'bubble': 'rgba(0, 0, 0, 0.30) 0px -12px 16px 0px inset,rgba(0, 0, 0, 0.09) 0px -10px 15px -8px',
      },
      backgroundImage: {
        'custon-bubble-1': "radial-gradient(circle at 10% -15%,#af40ff 30%,#5b42f3 50%,#00ddeb)",
        "custon-bubble-2": "radial-gradient(circle at 80% -15%,#ed7aff 30%,#30FFC2 50%,#FFC930)",
        "custon-bubble-3": "radial-gradient(circle at 10% 60%,#FFAA00 ,#BD30FF 50%,#30FF9B)",
        "custon-bubble-4": "radial-gradient(circle at 10% 20%,#a230ff ,#FF0009 ,#ffa600)",
        "custon-bubble-5": "radial-gradient(circle at 10% -15%,#00ddeb 30%,#5b42f3 50%,#af40ff)",
        "dashed-lg": `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='white' stroke-width='4' stroke-dasharray='8' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
      }
    },
  },
  plugins: [],
}