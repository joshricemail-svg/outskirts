import type { Config } from 'tailwindcss';

/**
 * Brand tokens from the Outskirts Saloon hand-painted sign.
 * The hex values live once, in app/globals.css `:root`, exposed as CSS custom
 * properties; Tailwind references them here so `bg-navy`, `text-brass`, etc.
 * resolve to the same source of truth used by the hand-written component CSS.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './config/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: 'var(--navy)',
        'navy-deep': 'var(--navy-deep)',
        'navy-lift': 'var(--navy-lift)',
        cream: 'var(--cream)',
        'cream-dim': 'var(--cream-dim)',
        brass: 'var(--brass)',
        rust: 'var(--rust)',
        slate: 'var(--slate)',
      },
      fontFamily: {
        // Wired to next/font CSS variables set in app/layout.tsx.
        display: ['var(--font-bodoni)', 'Didot', 'Georgia', 'serif'],
        body: ['var(--font-franklin)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        wrap: '1160px',
      },
    },
  },
  plugins: [],
};

export default config;
