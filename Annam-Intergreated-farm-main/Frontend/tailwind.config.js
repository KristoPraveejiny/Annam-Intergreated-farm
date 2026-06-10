/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 30px rgba(34, 197, 94, 0.25)',
        soft: '0 18px 60px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        'farm-gradient': 'linear-gradient(135deg, rgba(20,83,45,0.96) 0%, rgba(5,46,22,0.94) 45%, rgba(240,253,244,0.1) 100%)',
        'leaf-glow': 'radial-gradient(circle at top, rgba(34,197,94,0.35), transparent 60%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        farm: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.7s ease both',
      },
    },
  },
  plugins: [],
};