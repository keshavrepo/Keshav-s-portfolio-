import { motionDurations } from '@/design-system/tokens';
import { getChapter } from '@/scene/chapters';
import { openingBeats } from '@/scene/opening/opening-machine';

/**
 * The inter-chapter machine (SCENE-002). The journey is one continuous
 * universe — no page transition, no loading state (mission). The Opening's
 * phase machine hands control here at the dive: the overexposed white of
 * the dive's last half-second is the cut, and on the other side of the
 * white the camera is already inside the mind.
 */
export const JOURNEY_PHASES = ['opening', 'arriving', 'mind'] as const;

export type JourneyPhase = (typeof JOURNEY_PHASES)[number];

/** Locked Chapter One beat envelope (SPEC-003 M.2): the vista reveals calm. */
const VISTA_REVEAL_MS = 1600;

/**
 * Arrival begins the moment the dive's overexposure peaks (dive + warm-out),
 * so the world swap happens exactly where the screen is pure warm white.
 * The vista reveal then completes inside Chapter One's locked envelope.
 */
export const journeyBeats = {
  arrivalBeginMs: motionDurations.dive + openingBeats.warmOutMs,
  vistaRevealMs: VISTA_REVEAL_MS,
  /** the vista caption holds, then recedes into the small legend */
  vistaCaptionHoldMs: 4200,
} as const;

export const journeySettleMs = journeyBeats.arrivalBeginMs + journeyBeats.vistaRevealMs;

/** Scroll runway for the mind chapter (spec: "scroll moves deeper"). */
export const MIND_RUNWAY = '320vh';

if (process.env.NODE_ENV !== 'production') {
  const bound = getChapter('mind').beats?.vistaReveal;
  if (bound && (VISTA_REVEAL_MS < bound[0] || VISTA_REVEAL_MS > bound[1])) {
    console.error('[journey] vista reveal violates the locked Chapter One envelope.');
  }
}
