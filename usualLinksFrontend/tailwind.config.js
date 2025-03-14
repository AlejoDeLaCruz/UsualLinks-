/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",//ESTO SIGNIFICA QUE TAILWIND VA A ENTRAR A TODOS LOS ARCHIVOS QUE TENGAN ESAS EXTENSIONES
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
