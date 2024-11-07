/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a192f',
        text: '#e6f1ff',
        primary: '#64ffda', // Adjusted to a softer green
        secondary: '#00b8ff',
        surface: '#112240',
        accent: '#233554',
        green: {
          400: '#4ade80', // This is the default Tailwind green-400, you can customize this
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'San Francisco', 'SF Pro Text', 'sans-serif'],
        mono: ['Fira Code', 'SF Mono', 'Fira Mono', 'Roboto Mono', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 10px rgba(100, 255, 218, 0.3)', // Adjusted to match new primary color
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
