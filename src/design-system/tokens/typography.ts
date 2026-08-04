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
  /**
   * V2 architecture scale (VISUAL_DESIGN_BIBLE §3 · V-T-III): display type is
   * the building. Fluid clamps carry rem floors (V-T85), theatrical tops
   * stay inside a monitor's courtesy. Leading 0.94–1.02 — carved, not
   * stacked (V-T22); tracking negative at display only (V-T24).
   */
  /** MONUMENT scale — one-word heroes and the verbs that earned it */
  'display-monument': [
    'clamp(4rem, 1.0625rem + 14.6875vw, 14rem)',
    { lineHeight: '0.94', letterSpacing: '-0.04em', fontWeight: '500' },
  ],
  /** HERO scale — the chapter hero line: claim-scale, spread-owning */
  'display-hero': [
    'clamp(3rem, 1.1875rem + 8.90625vw, 9rem)',
    { lineHeight: '0.98', letterSpacing: '-0.03em', fontWeight: '500' },
  ],
  /** WHISPER scale — ambient thought-lines, felt whole at a glance (S75/V-T67) */
  whisper: ['0.9375rem', { lineHeight: '1.55', letterSpacing: '0.01em', fontWeight: '420' }],
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
  /** EDITORIAL scale — the reading register: headline, lede, body, furniture */
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

/**
 * Variable-axes settings (V-T16/T17): optical sizing is set deliberately
 * per role — display at max, micro-labels at min; SOFT/WONK are hero
 * temperament only, never furniture. Values are `font-variation-settings`
 * strings for the Statement voice (Fraunces full variable: opsz 9–144,
 * SOFT 0–100, WONK 0–1 — node_modules/@fontsource-variable/fraunces/
 * metadata.json); the Analyst voice carries a wght axis only, so these
 * silently no-op there. Cascading replaces, never merges — stacking axes
 * composes one declaration in scene CSS.
 */
export const fontAxes = {
  'opsz-display': "'opsz' 144",
  'opsz-micro': "'opsz' 9",
  'voice-soft': "'SOFT' 100",
  'voice-wonk': "'WONK' 1",
} as const;

export type TypeRole = keyof typeof typeScale;
export type FontAxis = keyof typeof fontAxes;
