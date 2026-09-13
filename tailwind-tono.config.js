module.exports = {
  darkMode: 'class',
  content: ['./tono/**/*.html', './tono/**/*.js'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: '#d88800',
        border: 'rgb(var(--border) / <alpha-value>)',
        brand: { orange: '#d88800' }
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        logo: ['Lovelo Line', 'sans-serif']
      }
    }
  }
};