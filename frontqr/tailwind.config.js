/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.html",
    "./src/**/*.jsx",
    "./src/**/*.js",
    // Agrega aquí otras rutas de tus archivos de origen
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'sidebar': '300px auto',
        'sidebar-collapsed': '64px auto',
      },
    },
  },
  variants: {},
  plugins: [],
}

