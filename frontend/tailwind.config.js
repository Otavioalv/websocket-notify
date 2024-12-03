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
        'shadow-outline': '10px 35px 60px #000000',
      }
    },
  },
  plugins: [],
}
