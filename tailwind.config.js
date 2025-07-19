/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // This ensures Tailwind works inside all your files
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(240, 10%, 3.9%)",
        border: "hsl(240, 4.8%, 95.9%)",
        ring: "hsl(240, 5%, 64%)",
      },
    },
  },
  plugins: [],
};
