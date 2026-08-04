'use client';

import { useEffect, type MutableRefObject, type RefObject } from 'react';

import type { PointerPresence } from './opening-context';

/**
 * Pointer presence (SCENE-001): the neuron's "nearby living system" sense.
 * Writes normalized coordinates into a ref at pointer cadence; the WebGL
 * layer applies the slow, noticed-not-startled response curve. Reactstate
 * is untouched, so moving the mouse costs zero renders.
 */
export function usePointerPresence(
  hostRef: RefObject<HTMLElement>,
  presenceRef: MutableRefObject<PointerPresence>,
): void {
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      const dist = Math.min(1, Math.hypot(x, y) / 1.2);
      const presence = presenceRef.current;
      presence.x = x;
      presence.y = y;
      presence.dist = dist;
      presence.active = true;
    };

    const onLeave = () => {
      presenceRef.current.active = false;
    };

    host.addEventListener('pointermove', onMove, { passive: true });
    host.addEventListener('pointerleave', onLeave, { passive: true });
    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [hostRef, presenceRef]);
  return undefined;
}
