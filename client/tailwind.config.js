/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-slate-500",
    {
      pattern: /bg-opacity-\d{1,2}/,
    },
    // Add all other colors you use
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
