/**
 * Typography tokens — Project K.
 *
 * Typography is the hero (locked). Roles, not ad-hoc sizes (ARCHITECTURE §3).
 * Fluid clamp() roles keep the Claim's voice intact from a delayed-flight
 * phone to a cinema display (ER-81). All roles are rem-based and survive
 * 200% text zoom. Families load via `src/design-system/fonts.ts`
 * (next/font/local — self-hosted, offline-proof builds).
 */
export const typeScale = {
  'display-xl': [
    'clamp(2.75rem, 2.0625rem + 3.4375vw, 4.625rem)',
    { lineHeight: '1.04', letterSpacing: '-0.02em', fontWeight: '500' },
  ],
  'display-lg': [
    'clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem)',
    { lineHeight: '1.07', letterSpacing: '-0.018em', fontWeight: '500' },
  ],
  'display-md': [
    'clamp(1.75rem, 1.4375rem + 1.5625vw, 2.5rem)',
    { lineHeight: '1.12', letterSpacing: '-0.014em', fontWeight: '500' },
  ],
  headline: [
    'clamp(1.375rem, 1.1875rem + 0.9375vw, 1.875rem)',
    { lineHeight: '1.22', letterSpacing: '-0.01em', fontWeight: '560' },
  ],
  lede: ['clamp(1.125rem, 1.0625rem + 0.3125vw, 1.3125rem)', { lineHeight: '1.55' }],
  body: ['1.0625rem', { lineHeight: '1.66' }],
  'body-sm': ['0.9375rem', { lineHeight: '1.6' }],
  eyebrow: ['0.75rem', { lineHeight: '1.35', letterSpacing: '0.16em', fontWeight: '600' }],
  caption: ['0.8125rem', { lineHeight: '1.5' }],
  figure: ['0.9375rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
} as const;

/** Reading measure for text columns (characters). */
export const measureCh = {
  measure: '65ch',
  narrow: '48ch',
  wide: '78ch',
} as const;

export type TypeRole = keyof typeof typeScale;
