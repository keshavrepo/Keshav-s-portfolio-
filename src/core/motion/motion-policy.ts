import type { MotionMode } from '@/core/lane/types';
import { motionDurations } from '@/design-system/tokens';

/** The number decorative animation may have when motion is reduced. */
const REDUCED_CEILING_MS = motionDurations.react;

/**
 * Reduced mode replaces performance with presence (ARCHITECTURE §14):
 * entrances resolve instantly into their composed state, ambient motion
 * becomes a static ember, and no timeline may exceed the presence-law
 * ceiling (ER-3).
 */
export function effectiveDuration(durationMs: number, mode: MotionMode): number {
  return mode === 'full' ? durationMs : Math.min(durationMs, REDUCED_CEILING_MS);
}

/**
 * In reduced mode, decorum is silence: nothing animates. Entrances arrive in
 * their composed state via the CSS gates (`html[data-motion]`); GSAP layers
 * consult this before constructing any timeline.
 */
export function mayAnimate(mode: MotionMode): boolean {
  return mode === 'full';
}
