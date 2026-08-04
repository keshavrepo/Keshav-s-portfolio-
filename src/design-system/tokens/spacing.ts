/**
 * Spacing tokens — Project K.
 *
 * The base 4px rhythm is Tailwind's and stays untouched. These tokens cover
 * layout-scale air only (ARCHITECTURE §5): fluid page margins, chapter air,
 * and the vertical rhythm inside a text column.
 */
export const layoutSpacing = {
  gutter: 'clamp(1.25rem, 0.6875rem + 2.8125vw, 2.5rem)',
  'section-y': 'clamp(4rem, 2.5rem + 7.5vw, 8rem)',
  'measure-gap': 'clamp(1rem, 0.8125rem + 0.9375vw, 1.5rem)',
} as const;

export type LayoutSpacingToken = keyof typeof layoutSpacing;
