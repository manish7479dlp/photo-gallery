/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
        },
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif']
      }
    },
  },
  plugins: [],
};
