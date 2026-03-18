/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js"
  ],
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],  
};


