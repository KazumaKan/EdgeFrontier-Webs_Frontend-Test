/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      colors: {
        blue: {
          900: "#2a2185",
        },
        white: "#ffffff",
        gray: {
          100: "#f5f5f5",
        },
      },
    },
  },
  plugins: [import('daisyui'),
  ],
}

