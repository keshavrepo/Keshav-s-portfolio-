/**
 * The four tellings (SPEC-003 cross-cutting doctrine): one story, retold at
 * four fidelities, with full content parity between them. The lane is the
 * fidelity contract; the semantic tier is the floor, not the fallback.
 */
export const LANES = ['cinematic', 'stills', 'express', 'semantic'] as const;

export type Lane = (typeof LANES)[number];

export type MotionMode = 'full' | 'reduced';

/** Capability signals gathered in the browser; pure data, no side effects. */
export interface LaneSignals {
  webgl2: boolean;
  webgl1: boolean;
  saveData: boolean;
  effectiveType: string | undefined;
  deviceMemory: number | undefined;
  hardwareConcurrency: number | undefined;
  reducedMotion: boolean;
}

/** Pre-probe baseline: the semantic floor, server-identical (ARCHITECTURE §11). */
export const SSR_SIGNALS: LaneSignals = {
  webgl2: false,
  webgl1: false,
  saveData: false,
  effectiveType: undefined,
  deviceMemory: undefined,
  hardwareConcurrency: undefined,
  reducedMotion: false,
};
