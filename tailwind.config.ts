import type { Config } from 'tailwindcss';

import type { ChapterPalette } from './src/design-system/tokens';
import {
  chapterPalettes,
  colorTokens,
  durationClasses,
  easeClasses,
  fontAxes,
  layoutExtents,
  layoutSpacing,
  measureCh,
  motionDurations,
  motionEasings,
  restingPalette,
  TRUE_BLACK,
  typeScale,
} from './src/design-system/tokens';

/**
 * V2 chapter constitutions, projected flat for utility generation
 * (VISUAL_DESIGN_BIBLE V-C88: values live only in tokens — this is a
 * projection of `chapterPalettes`, never a restatement of it).
 * Produces `chapter-opening-field`, `chapter-universe-glow`, … utilities
 * plus `chapter-rest-*` for the resting state.
 */
const chapterEntries: Array<readonly [string, ChapterPalette]> = [
  ['rest', restingPalette],
  ...Object.entries(chapterPalettes),
];

const chapterColors: Record<string, string> = Object.fromEntries(
  chapterEntries.flatMap(([id, palette]) => [
    [`${id}-field`, palette.field],
    [`${id}-ink`, palette.ink],
    [`${id}-glow`, palette.accent.glow],
    [`${id}-accent`, palette.accent.text],
    [`${id}-grad-a`, palette.gradient?.[0] ?? palette.field],
    [`${id}-grad-b`, palette.gradient?.[1] ?? palette.field],
  ]),
);

/**
 * Tailwind is a projection of the token system, never a source of values
 * (ARCHITECTURE §2). Everything below is derived from
 * `src/design-system/tokens`; nothing here invents a number.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { ...colorTokens, chapter: chapterColors, 'true-black': TRUE_BLACK },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', '"Times New Roman"', 'serif'],
        text: ['var(--font-text)', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      /**
       * Variable-axes strings (V-T16/T17), read by the kit via
       * `theme('fontVariationSettings.*')`. Not a utility scale — axes are
       * composed per role, never dialed ad hoc in class soup.
       */
      fontVariationSettings: fontAxes,
      fontSize: typeScale as unknown as Record<
        string,
        [string, { lineHeight: string; letterSpacing?: string; fontWeight?: string }]
      >,
      spacing: layoutSpacing,
      maxWidth: { ...measureCh, field: layoutExtents['field-max'] },
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
        /**
         * V2 named moves (VISUAL_DESIGN_BIBLE §7 · V-M-III): shared keyframes
         * the kit and every scene cite. Rotation caps at 6° and returns to
         * zero (V-M33); blur belongs to the Resolve only, display-tier;
         * the Draw reads its length from `--draw-len` per element.
         */
        'mask-rise': {
          from: { opacity: '0', transform: 'translateY(38%) rotate(3deg)' },
          to: { opacity: '1', transform: 'translateY(0) rotate(0deg)' },
        },
        'resolve-in': {
          from: { opacity: '0', filter: 'blur(8px)', transform: 'scale(1.02)' },
          to: { opacity: '1', filter: 'blur(0)', transform: 'scale(1)' },
        },
        'draw-line': {
          from: { strokeDashoffset: 'var(--draw-len, 100)' },
          to: { strokeDashoffset: '0' },
        },
        'breath-sway': {
          from: { transform: 'scale(1)', opacity: '0.9' },
          to: { transform: 'scale(1.02)', opacity: '1' },
        },
      },
      animation: {
        'pulse-core': `pulse-core ${motionDurations.pulse}ms ease-in-out infinite`,
        'pulse-halo': `pulse-halo ${motionDurations.pulse * 2}ms ${motionEasings.signalOut} infinite`,
        'enter-rise': `enter-rise ${motionDurations.enter}ms ${motionEasings.signalOut} both`,
        'mask-rise': `mask-rise ${motionDurations.mask}ms ${motionEasings.signalOut} both`,
        'resolve-in': `resolve-in ${motionDurations.reveal}ms ${motionEasings.signalOut} both`,
        'draw-line': `draw-line ${motionDurations.drawStroke}ms ${motionEasings.standard} both`,
        'breath-sway': `breath-sway ${motionDurations.breath}ms ease-in-out infinite alternate`,
      },
      screens: {
        coarse: { raw: '(pointer: coarse)' },
      },
    },
  },
  plugins: [],
};

export default config;
