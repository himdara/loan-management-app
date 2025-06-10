// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        battambang: ['Battambang', 'sans-serif'],
      },
      keyframes: {
        'scale-in': {
          'from': { transform: 'scale(0.95)', opacity: '0' },
          'to': { transform: 'scale(1)', opacity: '1' },
        },
        'slide-in': {
          'from': { transform: 'translateX(100%)' },
          'to': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'scale-in': 'scale-in 0.2s ease-out forwards',
        'slide-in': 'slide-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}