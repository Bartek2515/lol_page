/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './assets/**/*.{vue,js,ts,jsx,tsx}',
  './templates/**/*.{html,twig}',
  "./node_modules/tw-elements/js/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("tw-elements/plugin.cjs"),
  ],
}

