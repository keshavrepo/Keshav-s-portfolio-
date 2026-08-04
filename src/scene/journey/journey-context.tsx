'use client';

import { createContext, useContext, type MutableRefObject } from 'react';

import type { OpeningPhase } from '@/scene/opening/opening-machine';

import type { JourneyPhase } from './journey-machine';

/**
 * One scene state for the whole universe (SCENE-001 → SCENE-002). The
 * Opening's machine owns phases; the journey machine owns chapters; all
 * frame-rate channels travel in refs so pointer motion never re-renders
 * React — the DOM layer writes, the WebGL layer reads.
 */
export interface PointerPresence {
  /** Normalized viewport-space pointer, -1..1 on each axis. */
  x: number;
  y: number;
  /** Distance from frame center, 0..1 clamped. */
  dist: number;
  /** True once any pointer has reported in. */
  active: boolean;
}

export interface DiveProgress {
  /** 0 = camera at rest, 1 = inside the neuron. */
  value: number;
}

/** Projection of one mindscape node into screen space, refreshed per frame. */
export interface ScreenAnchor {
  x: number;
  y: number;
  /** False when the node sits behind the camera or off-frame. */
  visible: boolean;
  hover: boolean;
  invited: boolean;
}

export interface JourneySceneContextValue {
  phase: OpeningPhase;
  chapter: JourneyPhase;
  presenceRef: MutableRefObject<PointerPresence>;
  diveRef: MutableRefObject<DiveProgress>;
  /**
   * Runway progress, six chapters in one strip (SCENE-003 → SCENE-007
   * law): p = mind, g = process, u = universe, w = engine, v = the
   * aftermath, f = the future (0 the architecture opens → 1 the last
   * words hold and the runway — the story — ends).
   */
  scrollRef: MutableRefObject<{ p: number; g: number; u: number; w: number; v: number; f: number }>;
  /** Mindscape node id → live screen projection (written inside the canvas). */
  screenRef: MutableRefObject<Map<string, ScreenAnchor>>;
  /**
   * Pointer hover/focus semantics. `rippleAt` (performance.now ms) is the
   * shared clock of the universe's cause–effect ripple: the WebGL field
   * and the DOM labels both derive what is lit from this instant, so the
   * two layers can never disagree about a travelling change.
   */
  focusRef: MutableRefObject<{ hoverId: string | null; focusId: string | null; rippleAt: number }>;
  /**
   * The Decision Engine's channel (SCENE-005): which path was committed
   * (null until the decision locks) and the shared consequence clock —
   * the instant the consequences began (performance.now ms). The universe
   * field reads the scripted waves from `choice`; canvas and DOM both
   * derive what has landed from `clockAt` (the shared-clock law reused).
   */
  engineRef: MutableRefObject<{ choice: string | null; clockAt: number }>;
}

export const JourneySceneContext = createContext<JourneySceneContextValue | null>(null);

export function useJourneyScene(): JourneySceneContextValue {
  const ctx = useContext(JourneySceneContext);
  if (!ctx) throw new Error('useJourneyScene must be used within the journey root.');
  return ctx;
}
