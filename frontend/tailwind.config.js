/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-3s': 'spin 3s linear infinite',
        'spin-4s': 'spin 4s linear infinite',
        'spin-5s': 'spin 5s linear infinite'
      },
	  boxShadow: {
        'outline-sm': '0px 0px 15px -1px #6d28d9',
		'outline-md': '0px 0px 25px -1px #6d28d9'
      }
    },
  },
  plugins: [],
}