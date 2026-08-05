'use client';

import { useEffect, useRef, type MutableRefObject, type RefObject } from 'react';

/**
 * useScrollChannel — the cinematic layer's scroll primitive.
 *
 * One element's travel through the viewport, as a channel (a ref that
 * never re-renders): pointer-cadence truth for CSS variables, canvas,
 * and WebGL consumers alike. Scroll and resize are passive listeners,
 * deduped through a single rAF frame; reading `getBoundingClientRect`
 * costs no forced reflow because nothing writes between layout and here.
 *
 * Modes:
 *  - `traverse`: 0 when the element's top enters at the viewport's bottom
 *    edge, 1 when its bottom leaves at the top edge — the storytelling
 *    channel for reveals, depth fields, and scroll-driven typography.
 *  - `cover`: 0 when a runway's top reaches the viewport top, 1 when its
 *    bottom reaches the viewport bottom — the pinning channel for a
 *    runway taller than the screen (the sticky child reads `--pin-p`).
 *
 * Progress is honest in both directions (§9.ii): scrolling up un-crosses
 * what scrolling down crossed. There is no reduced-motion fork because
 * progress is not motion — it is position; what consumers do with it
 * obeys the covenant.
 */

export type ScrollChannelMode = 'traverse' | 'cover';

export interface ScrollChannel {
  ref: RefObject<HTMLElement>;
  /** Live 0..1 progress; read inside rAF or event handlers, never in render. */
  progress: MutableRefObject<number>;
}

function clamp01(value: number): number {
  return value < 0 ? 0 : value > 1 ? 1 : value;
}

export function useScrollChannel(
  mode: ScrollChannelMode,
  onFrame?: (progress: number, element: HTMLElement) => void,
): ScrollChannel {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const frameRef = useRef(onFrame);
  frameRef.current = onFrame;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let raf = 0;
    let pending = false;

    const measure = (): void => {
      pending = false;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      let p: number;
      if (mode === 'cover') {
        const runway = rect.height - viewport;
        p = runway > 0 ? clamp01(-rect.top / runway) : rect.top <= 0 ? 1 : 0;
      } else {
        p = clamp01((viewport - rect.top) / (viewport + rect.height));
      }
      progress.current = p;
      frameRef.current?.(p, element);
    };

    const request = (): void => {
      if (pending) return;
      pending = true;
      raf = window.requestAnimationFrame(measure);
    };

    measure();

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request, { passive: true });
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', request);
      window.removeEventListener('resize', request);
    };
  }, [mode]);

  return { ref, progress };
}
