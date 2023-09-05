/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#df795e',
        secondary: '#7661df'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      }
    }
  }
}
