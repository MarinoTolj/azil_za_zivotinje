/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "not-adopted": "rgba(255, 0, 0, 0.5)",
        adopted: "rgba(0, 0, 200, 0.5)",
        "modal-transparent": "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
