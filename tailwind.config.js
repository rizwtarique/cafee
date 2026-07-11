/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          50: '#fdf8f0',
          100: '#f9eddb',
          200: '#f2d6b0',
          300: '#e9b97c',
          400: '#df9546',
          500: '#d67a26',
          600: '#c8611c',
          700: '#a64819',
          800: '#853a1c',
          900: '#6c311a',
          950: '#3a170b',
        },
        cream: {
          50: '#fefcf8',
          100: '#fcf6e8',
          200: '#f8eacc',
          300: '#f2d9a4',
          400: '#eac277',
          500: '#e4ab51',
          600: '#d69236',
          700: '#b2732c',
          800: '#8f5c2a',
          900: '#744c25',
          950: '#3e2611',
        },
        espresso: {
          50: '#f6f4f0',
          100: '#e9e4da',
          200: '#d5cab7',
          300: '#bca98e',
          400: '#a88d6f',
          500: '#997b60',
          600: '#836551',
          700: '#6b5043',
          800: '#5b443b',
          900: '#4f3c35',
          950: '#2c1f1b',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'bounce-in': 'bounceIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(214, 122, 38, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(214, 122, 38, 0.4)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
