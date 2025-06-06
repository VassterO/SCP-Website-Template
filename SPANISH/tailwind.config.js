/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Define aquí la paleta de colores y fuentes para mantener un diseño consistente.
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      colors: {
        primary: {
          DEFAULT: '#ef4444', // red-500
          hover: '#dc2626',   // red-600
        },
        accent: {
          DEFAULT: '#f59e0b', // amber-500
        },
        background: {
          DEFAULT: '#0a0a0a',
          light: 'rgba(255, 255, 255, 0.03)',
        },
        text: {
          light: '#f5f5f5',
          DEFAULT: '#a3a3a3',
          dark: '#525252',
        },
        border: 'rgba(255, 255, 255, 0.1)',
      },
      // Animación personalizada para un efecto sutil de "brillo".
      keyframes: {
        glow: {
          '0%, 100%': { opacity: 0.7, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        }
      },
      animation: {
        glow: 'glow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}