'use client';

import { useEffect, useRef, type ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * DrawLine — the Draw primitive (§7 row 4, V-M24): SVG strokes that draw
 * themselves on the beat — the thread, the underline, the arrow, the
 * diagram stroke.
 *
 * SSR/still-lane floor: every path renders whole. After mount each path
 * is measured (`getTotalLength`) and handed its true `--draw-len` — the
 * class and the measure land in the same layout effect, pre-paint, so
 * there is no flicker of a full stroke snatching back to zero. A
 * `manual` consumer drives `live` itself; otherwise an observer arms the
 * draw when the stroke has genuinely arrived (0.35 presence, the house
 * reveal threshold).
 *
 * Decorative by covenant (§15.5): the svg is aria-hidden — the idea it
 * underlines lives in real, labeled text beside it.
 */

export interface DrawLineProps {
  className?: string;
  /** Full svg spec — viewBox, dimensions, stroke styling via className. */
  viewBox: string;
  children: ReactNode;
  /** Manual drive: omit IO, mirror this prop. */
  live?: boolean;
  /** Auto drive: draw once (default) or re-arm on exit. */
  once?: boolean;
}

const ARM_THRESHOLD = 0.35;

export function DrawLine({
  className,
  viewBox,
  children,
  live,
  once = true,
}: DrawLineProps): JSX.Element {
  const svgRef = useRef<SVGSVGElement>(null);
  const armedRef = useRef(false);

  /* Measure before gating: --draw-len is each stroke's own truth. */
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = svg.querySelectorAll('path, line, polyline, polygon, circle, ellipse');
    paths.forEach((path) => {
      if (path instanceof SVGGeometryElement) {
        path.style.setProperty('--draw-len', String(Math.ceil(path.getTotalLength())));
        path.classList.add('v2-draw');
      }
    });
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const paths = Array.from(svg.querySelectorAll('.v2-draw'));
    const apply = (on: boolean): void => {
      paths.forEach((path) => path.classList.toggle('v2-live', on));
    };
    if (live !== undefined) {
      apply(live);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          armedRef.current = true;
          apply(true);
          if (once) observer.disconnect();
        } else if (!once && armedRef.current) {
          apply(false);
        }
      },
      { threshold: ARM_THRESHOLD },
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, [live, once]);

  return (
    <svg ref={svgRef} viewBox={viewBox} className={cn(className)} aria-hidden="true">
      {children}
    </svg>
  );
}
