'use client';

import type { CSSProperties, ReactNode, RefObject } from 'react';

import { cn } from '@/lib/cn';

import { useScrollChannel } from './use-scroll-channel';

/**
 * Pin — the pinned-section primitive.
 *
 * A runway of `runway` viewport-heights; the child sticks for the whole
 * traversal while the channel writes `--pin-p` (0..1) onto the staged
 * frame plus `data-pin="before|during|after"` for CSS beat law. Sticky
 * positioning is pure CSS — the pin holds even with JavaScript absent;
 * only the progress channel waits for JS (the semantic floor reads the
 * content stacked in the runway, unpaced).
 *
 * The runway height uses `svh` so mobile URL-bar drift never resizes a
 * pinned stage mid-story (no layout shift, V-L's stability covenant).
 *
 * Reduced telling: the pin itself is position, not motion — it stays;
 * consumers of `--pin-p` decide what may move.
 */

export interface PinProps {
  /** Runway length in viewport heights; 1 pins the screen's own height. */
  runway?: number;
  className?: string;
  frameClassName?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** Frame hook inside the scroll rAF — DOM writes only. */
  onFrame?: (progress: number, element: HTMLElement) => void;
}

export function Pin({
  runway = 2,
  className,
  frameClassName,
  style,
  children,
  onFrame,
}: PinProps): JSX.Element {
  const { ref } = useScrollChannel('cover', (p, element) => {
    const frame = element.firstElementChild as HTMLElement | null;
    if (frame) {
      frame.style.setProperty('--pin-p', p.toFixed(4));
      frame.dataset.pin = p <= 0 ? 'before' : p >= 1 ? 'after' : 'during';
    }
    onFrame?.(p, element);
  });

  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={cn('relative', className)}
      style={{ height: `${Math.max(1, runway) * 100}svh`, ...style }}
    >
      <div className={cn('sticky top-0 h-svh overflow-hidden', frameClassName)}>{children}</div>
    </div>
  );
}
