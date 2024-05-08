/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.html",
    "./src/**/*.jsx",
    "./src/**/*.js",
    // Agrega aquí otras rutas de tus archivos de origen
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebar: "300px auto",
        "sidebar-collapsed": "64px auto",
      },
      colors: {
        "dark-blue": "#284B63",
        "light-blue": "#3C6E71",
        "my-gray": "#D9D9D9",
        "my-red": "#CC2905",
        "my-black": "#353535",
      },
    },
  },
  variants: {},
  plugins: [],
};
