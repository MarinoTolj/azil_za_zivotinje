/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "not-adopted": "rgba(255, 0, 0, 0.75)",
        adopted: "rgba(0, 0, 200, 0.75)",
        fostered: "rgba(251, 146, 60, 0.75)",
        "modal-transparent": "rgba(0, 0, 0, 0.5)",
        "main-orange": "#fb923c",
      },
    },
  },
  plugins: [],
};
