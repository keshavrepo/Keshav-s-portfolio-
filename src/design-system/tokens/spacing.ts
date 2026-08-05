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

  /**
   * V2 grid + cadence (VISUAL_DESIGN_BIBLE §10–11 · V-L-II/L-VI): the
   * editorial spread's skeleton. 20px→56px margins and 16px→32px gutters
   * interpolate continuously; breakouts cap at the content field.
   */
  'grid-margin': 'clamp(1.25rem, 0.5rem + 3.333vw, 3.5rem)',
  'grid-gutter-x': 'clamp(1rem, 0.667rem + 1.481vw, 2rem)',
  /** hero band air — the upper register (V-L24/L86: air is measured) */
  'spread-y': 'clamp(6rem, 3rem + 9.375vw, 12.5rem)',
  /** chapter-crossing breath above the Migration's field change */
  'chapter-air': 'clamp(8rem, 4rem + 12.5vw, 16rem)',
  /**
   * The depth drift (§7 row 9: the Breath oscillates ≤2% of scale/space):
   * 2% of the 96rem field ≈ 1.92rem, rounded to the 4px scale. This is the
   * full lawful amplitude for layered depth — the V2 twin of parallax,
   * kept inside the banned-stack law (V-M banned species).
   */
  'depth-drift': '2rem',
} as const;

/**
 * V2 layout extents (VISUAL_DESIGN_BIBLE §10.1/§12.4): the content field cap
 * and the fixed furniture rails — margin rail (page edge), lower-third rail
 * (captions/status echo at 2/3 of the viewport height).
 */
export const layoutExtents = {
  'field-max': '96rem',
  'rail-lower-third': '66.667vh',
} as const;

export type LayoutSpacingToken = keyof typeof layoutSpacing;
export type LayoutExtent = keyof typeof layoutExtents;
