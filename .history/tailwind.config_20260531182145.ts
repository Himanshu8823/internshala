import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        brand: {
          blue: '#006BFF',
          teal: '#00A699',
          green: '#0BC56E',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;