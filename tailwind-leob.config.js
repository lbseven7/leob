module.exports = {
  darkMode: 'class',
  content: [
    './*.html',
    './catalogo.html',
    './posts/**/*.html',
    './pages/**/*.html',
    '!./pages/valores.html',
    './js/**/*.js'
  ],
  theme: {
    extend: {
      colors: { brand: { orange: '#d88800' } },
      fontFamily: {
        sans: ['Comfortaa', 'cursive', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        display: ['Playfair Display', 'serif']
      },
      animation: {
        'pulse-slow': 'pulse-subtle 2.5s infinite ease-in-out',
        urgent: 'urgent-pulse 1.2s ease-in-out infinite'
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.03)', opacity: '0.95' }
        },
        'urgent-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' }
        }
      }
    }
  }
};