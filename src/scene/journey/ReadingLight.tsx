'use client';

import { useEffect, useRef } from 'react';

/**
 * ReadingLight — the V2 cursor system (VISUAL_DESIGN_BIBLE §16 · V-I56–70).
 *
 * A soft, chapter-tinted halo that makes attention visible: it tracks the
 * pointer exactly (no drag — V-M85), acknowledges within the react band,
 * and takes its tint live from `--v2-glow` (the chapter constitution the
 * journey root already broadcasts via data-chapter).
 *
 * Parity laws honored by construction:
 *  - coarse pointers: no cursor layer at all (V-I64) — CSS hides, and the
 *    listeners never arm;
 *  - reduced motion: the halo stays off (V-I65) — CSS hides;
 *  - presence never leaves the machine (V-I68) — everything here is local.
 *
 * States (V-I58): elements opt in with `data-cursor="read|door|press|hold"`;
 * the nearest annotated ancestor wins. Unmounted by design in Sprint 1 —
 * scenes wire it at their re-skin sprints; the journey's shared presence
 * plumbing remains the single source of pointer truth then.
 */

/** Per-state halo scale, instant settle (V-I60: no overshoot, no magnetism here). */
const HALO_SCALE = {
  read: 1,
  door: 0.65,
  press: 0.5,
  hold: 1.25,
} as const;

type CursorState = keyof typeof HALO_SCALE;

function resolveState(target: EventTarget | null): CursorState {
  if (target instanceof Element) {
    const annotated = target.closest('[data-cursor]');
    const value = annotated?.getAttribute('data-cursor');
    if (value === 'read' || value === 'door' || value === 'press' || value === 'hold') {
      return value;
    }
  }
  return 'read';
}

export function ReadingLight(): JSX.Element {
  const haloRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const halo = haloRef.current;
    if (!halo) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let state: CursorState = 'read';

    const apply = (x: number, y: number): void => {
      halo.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${HALO_SCALE[state]})`;
    };

    const onMove = (event: PointerEvent): void => {
      state = resolveState(event.target);
      halo.setAttribute('data-cursor', state);
      if (halo.getAttribute('data-active') !== 'true') {
        halo.setAttribute('data-active', 'true');
      }
      apply(event.clientX, event.clientY);
    };

    const onDown = (event: PointerEvent): void => {
      state = 'press';
      halo.setAttribute('data-cursor', state);
      apply(event.clientX, event.clientY);
    };

    const onUp = (event: PointerEvent): void => {
      state = resolveState(event.target);
      halo.setAttribute('data-cursor', state);
      apply(event.clientX, event.clientY);
    };

    const onLeave = (): void => {
      halo.setAttribute('data-active', 'false');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <div ref={haloRef} className="v2-cursor-halo" aria-hidden="true" data-cursor="read" />;
}
