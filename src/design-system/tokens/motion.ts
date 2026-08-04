/**
 * Motion tokens — Project K.
 *
 * One table for CSS, Tailwind, GSAP, and JS timers (ARCHITECTURE §6).
 * Legacy numbers from SPEC-003/004 are encoded as bounds and verified
 * unchanged: dive 1800–2400ms (ER-5), suspense 1500–2000ms (R‑59/S59),
 * entry wrap ≤ 2000ms, corridor 3000–6000ms, reactivity < 100ms (ER-3),
 * first paint ≤ 1000ms with the authored pulse (ER-1), express lane
 * 45–60s, full journey 12–20min.
 */
export const motionDurations = {
  /** interface feedback ceiling — under the 100ms presence law */
  react: 90,
  /** interface states */
  ui: 200,
  /** scene state change */
  state: 420,
  /** text and scene entrances */
  enter: 720,
  /** resting heartbeat tempo of the leitmotif pulse */
  pulse: 900,
  /** the ingress dive — inside the 1800–2400ms envelope */
  dive: 2000,
  /** entry atmosphere wrap — under the 2000ms ceiling */
  entryWrap: 1800,
  /** return corridor between worlds — inside 3000–6000ms */
  corridor: 4500,
  /** full-motion suspension — inside the 1500–2000ms envelope */
  suspense: 1750,
  /** slow ambient breath for living surfaces */
  breath: 3600,

  /**
   * V2 named-move vocabulary (VISUAL_DESIGN_BIBLE §7 · V-M-III). Durations
   * already proved at scene time are tokenized here so the kit and the
   * scenes cite one number; scene-local constants converge onto these in
   * their re-skin sprints.
   */
  /** full-field color migration — at or above the 600ms floor (V-C8/C80) */
  migrate: 600,
  /** the Mask: line rise from below the baseline, anchored (V-M22) */
  mask: 720,
  /** the Draw base stroke time — scales with drawn length (V-M24) */
  drawStroke: 1000,
  /** the Settle glide: post-commitment re-composition step (V-M27) */
  settleDrift: 1200,
  /** story reveals — the manifest entrance budget (V-M65) */
  reveal: 1400,
  /** vista — whole spread before any detail moves (V-M64) */
  vista: 1600,
  /** the True Fade to sanctioned black — ≈2.5s, T11 only (S69/§9) */
  trueFade: 2500,
  /** caption hold — a holding line owns the stage (V-M63) */
  holdCaption: 4200,
} as const;

/**
 * V2 orchestration step (V-M18/M30): Cascade stagger lives 30–60ms; below
 * is a blur, above is a queue.
 */
export const motionStagger = {
  step: 45,
} as const;

export const motionBounds = {
  dive: [1800, 2400],
  suspense: [1500, 2000],
  entryWrapMax: 2000,
  corridor: [3000, 6000],
  reactivityMax: 100,
  firstPaintMax: 1000,
  expressLaneTotal: [45000, 60000],
  fullJourney: [720000, 1200000],
} as const;

export const motionEasings = {
  /** noise snapping into signal — the house curve */
  signalOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  resolveIn: 'cubic-bezier(0.7, 0, 0.2, 1)',
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  /** weather crossfade — symmetric, so the midpoint is honest (V-C51/C8) */
  migrate: 'cubic-bezier(0.65, 0, 0.35, 1)',
} as const;

/** GSAP-spelled easings, one-to-one with `motionEasings` (ARCHITECTURE §6). */
export const gsapEasings = {
  signalOut: 'expo.out',
  resolveIn: 'power3.inOut',
  standard: 'power2.out',
  migrate: 'power1.inOut',
} as const;

/** Utility-class spellings for Tailwind's transitionDuration scale. */
export const durationClasses = {
  instant: '0ms',
  react: '90ms',
  ui: '200ms',
  state: '420ms',
  enter: '720ms',
  pulse: '900ms',
  /** the Cascade orchestration step (motionStagger.step) */
  stagger: '45ms',
  /** V2 named moves — one-to-one with `motionDurations` (V-M-III) */
  migrate: '600ms',
  mask: '720ms',
  draw: '1000ms',
  settle: '1200ms',
  reveal: '1400ms',
  vista: '1600ms',
  'true-fade': '2500ms',
  hold: '4200ms',
} as const;

/** Utility-class spellings for Tailwind's transitionTimingFunction scale. */
export const easeClasses = {
  'signal-out': motionEasings.signalOut,
  'resolve-in': motionEasings.resolveIn,
  standard: motionEasings.standard,
  migrate: motionEasings.migrate,
} as const;

export type MotionDuration = keyof typeof motionDurations;
export type MotionEasing = keyof typeof motionEasings;
