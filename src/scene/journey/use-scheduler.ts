'use client';

import { useCallback, useEffect, useRef } from 'react';

/**
 * REUSABLE (extracted SCENE-003 from the journey root's pattern) — a
 * timeout registry that always clears on unmount. Scene machines schedule
 * beats through it; nothing outlives its scene (no stray timers = no
 * memory leaks, no ghost state changes after disposal).
 */
export function useScheduler() {
  const timersRef = useRef<number[]>([]);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  const clear = useCallback(() => {
    for (const timer of timersRef.current) window.clearTimeout(timer);
    timersRef.current = [];
  }, []);

  useEffect(() => () => clear(), [clear]);

  return { schedule, clear } as const;
}
