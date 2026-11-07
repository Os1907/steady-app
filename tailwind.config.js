/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      // RGB variables allow the same classes in both themes, including /opacity.
      // Dark fallbacks keep the current screen working before ThemeProvider is wired.
      colors: {
        background: 'rgb(var(--color-background, 0 0 0) / <alpha-value>)',
        surface: 'rgb(var(--color-surface, 23 23 23) / <alpha-value>)',
        'surface-elevated': 'rgb(var(--color-surface-elevated, 36 36 36) / <alpha-value>)',
        'surface-pressed': 'rgb(var(--color-surface-pressed, 48 48 48) / <alpha-value>)',
        foreground: 'rgb(var(--color-foreground, 255 255 255) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--color-muted-foreground, 163 163 163) / <alpha-value>)',
        border: 'rgb(var(--color-border, 56 56 56) / <alpha-value>)',
        accent: 'rgb(var(--color-accent, 239 41 41) / <alpha-value>)',
        'on-accent': 'rgb(var(--color-on-accent, 0 0 0) / <alpha-value>)',
        'background-glow': 'rgb(var(--color-background-glow, 34 3 7) / <alpha-value>)',
        'progress-track': 'rgb(var(--color-progress-track, 48 48 48) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
