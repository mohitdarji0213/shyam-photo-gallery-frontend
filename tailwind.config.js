/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff8ee',
          100: '#ffefd6',
          200: '#ffdaad',
          300: '#ffbe79',
          400: '#ff9643',
          500: '#ff7519',
          600: '#f05a0f',
          700: '#c7420f',
          800: '#9e3514',
          900: '#7f2e14',
        },
        gold: {
          400: '#f4c542',
          500: '#e8b020',
          600: '#c8920e',
        },
        warm: {
          50: '#faf8f5',
          100: '#f5f0e8',
          200: '#ebe0cc',
          900: '#2d1f0e',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        hindi: ['"Hind"', 'sans-serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      }
    },
  },
  plugins: [],
}
