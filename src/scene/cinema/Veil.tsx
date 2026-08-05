'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';

import { motionDurations } from '@/design-system/tokens';
import { cn } from '@/lib/cn';

import { useScheduler } from '../journey/use-scheduler';

/**
 * Veil — the premium page-transition primitive (§9, the Wipe): a masked
 * full-frame passage that travels along the reading gravity — it covers
 * left→right, holds, and drains onward in the same direction. One
 * gravity, both ways; never a cut, never a "screen change"
 * (§9.i: the universe never loads mid-journey).
 *
 * The choreography is the kit's data-veil law: `cover(cb?)` grows the
 * plate at Migration time (600ms), holds in `covered`, calls back, then
 * `reveal(cb?)` drains it onward. Under the reduced telling the clip
 * transition is instant (kit-gated) — a passage, not a performance.
 *
 * Mount law: one veil per app, at template level, the day a second route
 * exists. Unmounted in this sprint — the journey itself never veils
 * (its crossings are the T-moves; the veil is RESERVED for route change).
 */

export interface VeilHandle {
  /** Grow the plate to full cover; `onCovered` fires at the hold. */
  cover: (onCovered?: () => void) => void;
  /** Drain the plate onward; `onRevealed` fires when the field is clear. */
  reveal: (onRevealed?: () => void) => void;
  /** One call: cover → hold → callback at the midpoint → drain → callback. */
  passThrough: (onMidpoint?: () => void, onDone?: () => void) => void;
}

export const Veil = forwardRef<VeilHandle, { className?: string }>(function Veil(
  { className },
  forwardedRef,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);
  const { schedule } = useScheduler();

  useImperativeHandle(forwardedRef, () => {
    const setState = (state: 'covering' | 'covered' | 'revealing' | 'idle'): void => {
      const root = rootRef.current;
      if (!root) return;
      if (state === 'idle') delete root.dataset.veil;
      else root.dataset.veil = state;
    };

    const api: VeilHandle = {
      cover: (onCovered) => {
        if (busyRef.current) return;
        busyRef.current = true;
        setState('covering');
        schedule(() => {
          setState('covered');
          onCovered?.();
        }, motionDurations.migrate);
      },
      reveal: (onRevealed) => {
        setState('revealing');
        schedule(() => {
          setState('idle');
          busyRef.current = false;
          onRevealed?.();
        }, motionDurations.migrate);
      },
      passThrough: (onMidpoint, onDone) => {
        api.cover(() => {
          onMidpoint?.();
          api.reveal(onDone);
        });
      },
    };
    return api;
  }, [schedule]);

  return (
    <div ref={rootRef} className={cn('contents', className)}>
      <div className="v2-veil" aria-hidden="true" />
    </div>
  );
});
