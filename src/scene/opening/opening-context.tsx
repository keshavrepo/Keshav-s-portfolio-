'use client';

import { createContext, useContext, type MutableRefObject } from 'react';

import type { OpeningPhase } from './opening-machine';

/**
 * Shared scene state (SCENE-001). The machine owns phases; refs carry the
 * frame-rate channels so pointer movement never re-renders React — the DOM
 * layer writes, the WebGL layer reads, both from the same objects.
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

export interface OpeningSceneContextValue {
  phase: OpeningPhase;
  presenceRef: MutableRefObject<PointerPresence>;
  diveRef: MutableRefObject<DiveProgress>;
}

export const OpeningSceneContext = createContext<OpeningSceneContextValue | null>(null);

export function useOpeningScene(): OpeningSceneContextValue {
  const ctx = useContext(OpeningSceneContext);
  if (!ctx) throw new Error('useOpeningScene must be used within the Opening scene.');
  return ctx;
}
