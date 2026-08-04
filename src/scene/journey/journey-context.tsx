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
  /** Mind-chapter scroll progress, 0 = vista, 1 = deepest. */
  scrollRef: MutableRefObject<{ p: number }>;
  /** Mindscape node id → live screen projection (written inside the canvas). */
  screenRef: MutableRefObject<Map<string, ScreenAnchor>>;
  /** Pointer hover/focus semantics for the mind world. */
  focusRef: MutableRefObject<{ hoverId: string | null; focusId: string | null }>;
}

export const JourneySceneContext = createContext<JourneySceneContextValue | null>(null);

export function useJourneyScene(): JourneySceneContextValue {
  const ctx = useContext(JourneySceneContext);
  if (!ctx) throw new Error('useJourneyScene must be used within the journey root.');
  return ctx;
}
