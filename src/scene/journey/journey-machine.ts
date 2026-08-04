import { motionDurations } from '@/design-system/tokens';
import { getChapter } from '@/scene/chapters';
import { openingBeats } from '@/scene/opening/opening-machine';

/**
 * The inter-chapter machine (SCENE-002, extended SCENE-003). The journey is
 * one continuous universe — no page transition, no loading state (mission).
 * Chapters hand over inside authored covers: the dive's overexposed white
 * (opening→mind) and the settled end of a runway (mind→grammar).
 */
export const JOURNEY_PHASES = ['opening', 'arriving', 'mind', 'grammar-arriving', 'grammar'];
export type JourneyPhase = (typeof JOURNEY_PHASES)[number];

/** Locked Chapter One beat envelope (SPEC-003 M.2): the vista reveals calm. */
const VISTA_REVEAL_MS = 1600;
/** Chapter Two's arrival: the map re-forms, the case ignites (M.2). */
const GRAMMAR_REVEAL_MS = 1400;

/**
 * Arrival begins the moment the dive's overexposure peaks (dive + warm-out),
 * so the world swap happens exactly where the screen is pure warm white.
 * The vista reveal then completes inside Chapter One's locked envelope.
 */
export const journeyBeats = {
  arrivalBeginMs: motionDurations.dive + openingBeats.warmOutMs,
  vistaRevealMs: VISTA_REVEAL_MS,
  grammarRevealMs: GRAMMAR_REVEAL_MS,
  /** the vista caption holds, then recedes into the small legend */
  vistaCaptionHoldMs: 4200,
} as const;

export const journeySettleMs = journeyBeats.arrivalBeginMs + journeyBeats.vistaRevealMs;

/**
 * The shared runway: TWO chapters of scroll in one uninterrupted strip —
 * the first half is the mind (z-rail), the second is the process
 * (case travel). One runway, so scrolling never crosses a seam.
 */
export const MIND_RUNWAY = '640vh';

/** Scroll fraction of the mind half at which the map may re-form. */
export const GRAMMAR_TRIGGER_P = 0.985;
/** Impact stays locked until the decision is committed (earned law). */
export const GRAMMAR_LOCK_G = 0.94;

if (process.env.NODE_ENV !== 'production') {
  const bound = getChapter('mind').beats?.vistaReveal;
  if (bound && (VISTA_REVEAL_MS < bound[0] || VISTA_REVEAL_MS > bound[1])) {
    console.error('[journey] vista reveal violates the locked Chapter One envelope.');
  }
}
