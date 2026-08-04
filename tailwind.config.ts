import type { Config } from 'tailwindcss';

import {
  colorTokens,
  durationClasses,
  easeClasses,
  layoutSpacing,
  measureCh,
  motionDurations,
  motionEasings,
  typeScale,
} from './src/design-system/tokens';

/**
 * Tailwind is a projection of the token system, never a source of values
 * (ARCHITECTURE §2). Everything below is derived from
 * `src/design-system/tokens`; nothing here invents a number.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: colorTokens,
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', '"Times New Roman"', 'serif'],
        text: ['var(--font-text)', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: typeScale as unknown as Record<
        string,
        [string, { lineHeight: string; letterSpacing?: string; fontWeight?: string }]
      >,
      spacing: layoutSpacing,
      maxWidth: measureCh,
      transitionDuration: durationClasses,
      transitionTimingFunction: easeClasses,
      keyframes: {
        'pulse-core': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.5' },
          '12%': { transform: 'scale(1.09)', opacity: '1' },
          '26%': { transform: 'scale(0.98)', opacity: '0.72' },
          '38%': { transform: 'scale(1.05)', opacity: '0.95' },
          '58%': { transform: 'scale(1)', opacity: '0.6' },
        },
        'pulse-halo': {
          '0%': { transform: 'scale(0.55)', opacity: '0.35' },
          '70%': { opacity: '0' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'enter-rise': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-core': `pulse-core ${motionDurations.pulse}ms ease-in-out infinite`,
        'pulse-halo': `pulse-halo ${motionDurations.pulse * 2}ms ${motionEasings.signalOut} infinite`,
        'enter-rise': `enter-rise ${motionDurations.enter}ms ${motionEasings.signalOut} both`,
      },
      screens: {
        coarse: { raw: '(pointer: coarse)' },
      },
    },
  },
  plugins: [],
};

export default config;
