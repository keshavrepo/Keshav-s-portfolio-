import { motionBounds, motionDurations } from '@/design-system/tokens';

/**
 * Opening timeline controller (SPEC-003, Opening beats; SCENE-001).
 *
 * The machine is a linear score with two visitor-paced exits: the first
 * intentional interaction opens the Claim sequence early (S3 — the story is
 * visitor-paced, never gated), and any click during the Claim beats paces
 * forward. Phases are data so DOM layers, the WebGL layer, and the audio of
 * silence all read one clock.
 */
export const OPENING_PHASES = [
  'void',
  'heartbeat',
  'emergence',
  'attuning',
  'claim-one',
  'claim-two',
  'brightening',
  'awaiting-dive',
  'diving',
  'afterglow',
] as const;

export type OpeningPhase = (typeof OPENING_PHASES)[number];

const PHASE_INDEX = new Map<OpeningPhase, number>(OPENING_PHASES.map((p, i) => [p, i]));

export function phaseAtLeast(phase: OpeningPhase, minimum: OpeningPhase): boolean {
  return (PHASE_INDEX.get(phase) ?? 0) >= (PHASE_INDEX.get(minimum) ?? 0);
}

export function nextPhase(phase: OpeningPhase): OpeningPhase | null {
  const index = (PHASE_INDEX.get(phase) ?? -1) + 1;
  return index < OPENING_PHASES.length ? OPENING_PHASES[index] : null;
}

/**
 * Scene-local beat constants. The dive, entry wrap, and suspense numbers are
 * locked in tokens; these are the Opening's authored breaths (SPEC-003 OP
 * beats): the held silence before the first signal, the ramp into pulse,
 * and the reading pauses that make the couplet land as two sentences, not
 * one slogan.
 */
export const openingBeats = {
  /** pure black, silence — before the first heartbeat */
  voidHoldMs: 1200,
  /** the pulse finds its resting tempo in the dark */
  heartbeatRampMs: 2400,
  /** the neuron materializes around the heartbeat */
  emergenceMs: 2800,
  /** line one reads, then a held breath before line two */
  claimOneHoldMs: 2800,
  /** line two lands; the glow begins to rise */
  claimTwoHoldMs: 2400,
  /** glow rises, connections begin to form, the stage invites the dive */
  brighteningMs: 1800,
  /** the dive overexposes into warm white at its end */
  warmOutMs: 500,
  /** the cut between worlds rests on ink-black */
  blackHoldMs: 900,
} as const;

/** Milliseconds from dive start to the afterglow. */
export const diveToAfterglowMs =
  motionDurations.dive + openingBeats.warmOutMs + openingBeats.blackHoldMs;

if (process.env.NODE_ENV !== 'production') {
  const [diveMin, diveMax] = motionBounds.dive;
  if (motionDurations.dive < diveMin || motionDurations.dive > diveMax) {
    console.error('[opening] dive duration violates the locked envelope (ER-5).');
  }
}
