/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#121212',
        'background-light': '#1E1E1E',
        'background-lighter': '#2D2D2D',
        primary: '#FFD60A',
        'primary-light': '#FFE45C',
        'primary-dark': '#E6B800',
        text: '#F5F5F5',
        'text-secondary': '#BBBBBB',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      boxShadow: {
        'neon': '0 0 5px theme(colors.primary), 0 0 20px theme(colors.primary)',
        'neon-lg': '0 0 10px theme(colors.primary), 0 0 30px theme(colors.primary)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} 