'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';

/**
 * Performance monitor (SCENE-001): a rolling two-second FPS window steps
 * the render resolution down toward DPR 1 when frames degrade — quality
 * degrades into softness, never into stutter (60 FPS is the promise; the
 * fallback is authored, not accidental). Changes are cheap and reversible
 * by the device, not by re-mounting anything.
 */
export function AdaptiveRenderer() {
  const get = useThree((state) => state.get);
  const setDpr = useThree((state) => state.setDpr);
  const window_ = useRef({ frames: 0, since: 0, degraded: 0 });

  useFrame(() => {
    const ref = window_.current;
    ref.frames += 1;
    if (ref.since === 0) ref.since = performance.now();

    const elapsed = performance.now() - ref.since;
    if (elapsed < 2000) return;

    const fps = (ref.frames * 1000) / elapsed;
    ref.frames = 0;
    ref.since = performance.now();

    const { viewport } = get();
    if (fps < 50 && viewport.dpr > 1 && ref.degraded < 2) {
      const next = Math.max(1, viewport.dpr - 0.5);
      setDpr(next);
      ref.degraded += 1;
      if (process.env.NODE_ENV !== 'production') {
        console.info(`[opening] sustained ${fps.toFixed(0)}fps — stepping DPR to ${next}`);
      }
    }
  });

  return null;
}
