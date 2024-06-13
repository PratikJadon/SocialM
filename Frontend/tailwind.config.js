/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        baseBlack: "#0C0C0C",
        hoverBlue: "#766DE9",
        recieveMessage: "#252728",
        sendMessage: "#177E89",
        lightBlack: "#252728"
      }
    },
  },
  plugins: [],
}