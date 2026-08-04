/**
 * The Impact Engine's beats (SCENE-006). No new envelope is invented:
 * arrival reuses the chapter-reveal tempo, the trigger reuses the
 * settled-end law, and the engine lock mirrors SCENE-003's commitment
 * law — the journey cannot enter the aftermath of a decision that was
 * never made.
 */
export const impactBeats = {
  /** the decision becomes weather: caption reveal */
  impactRevealMs: 1400,
  /** lessons arrive once the new shape is nearly complete */
  lessonsThresholdV: 0.85,
} as const;

/** Scroll fraction of the engine segment at which the aftermath may begin. */
export const IMPACT_TRIGGER_W = 0.985;
/**
 * The engine lock: without a committed decision, the runway holds two
 * steps before the aftermath — the same earned law as GRAMMAR_LOCK_G.
 */
export const ENGINE_LOCK_W = 0.92;
