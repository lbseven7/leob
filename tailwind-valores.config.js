module.exports = {
  darkMode: 'class',
  content: ['./pages/valores.html'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(0 0% 4%)',
        fg: 'hsl(40 10% 94%)',
        card: 'hsl(0 0% 6%)',
        muted: 'hsl(0 0% 55%)',
        accent: '#d88800',
        border: 'hsl(0 0% 14%)',
        brand: { orange: '#d88800' }
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  }
};