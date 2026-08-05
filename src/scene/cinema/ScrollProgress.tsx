'use client';

import type { CSSProperties, ReactNode, RefObject } from 'react';
import { useEffect } from 'react';

import { cn } from '@/lib/cn';

import { useScrollChannel, type ScrollChannelMode } from './use-scroll-channel';

/**
 * ScrollProgress — the scroll storytelling primitive, component-shaped.
 *
 * Wraps any section and broadcasts its travel through the viewport two
 * ways, both render-free:
 *  - the `--sp` custom property (0..1, four-decimal resolution) written
 *    straight to the wrapper so descendants animate in pure CSS;
 *  - `data-inview="true|false"` for coarse presence law (offscreen
 *    consumers must idle).
 *
 * `onFrame` is the escape hatch for DOM-writing consumers (KineticText's
 * progressive drive, canvas layers) — it fires inside the channel's rAF,
 * so handlers must write, never setState.
 *
 * SSR is honest: no `--sp`, no `data-inview` until JavaScript lives;
 * without it the section simply renders — the semantic floor.
 */

export interface ScrollProgressProps {
  /** `traverse` (default) spans enter→exit; `cover` measures a pin runway. */
  mode?: ScrollChannelMode;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** Frame hook inside the scroll rAF — DOM writes only. */
  onFrame?: (progress: number, element: HTMLElement) => void;
}

export function ScrollProgress({
  mode = 'traverse',
  className,
  style,
  children,
  onFrame,
}: ScrollProgressProps): JSX.Element {
  const { ref } = useScrollChannel(mode, (p, element) => {
    element.style.setProperty('--sp', p.toFixed(4));
    onFrame?.(p, element);
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const sentinels = new IntersectionObserver(([entry]) => {
      element.dataset.inview = entry.isIntersecting ? 'true' : 'false';
    });
    sentinels.observe(element);
    return () => sentinels.disconnect();
  }, [ref]);

  return (
    <div ref={ref as RefObject<HTMLDivElement>} className={cn(className)} style={style}>
      {children}
    </div>
  );
}
