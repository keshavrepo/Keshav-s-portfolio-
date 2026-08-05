'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * StickyStory — the sticky-storytelling primitive: one pane holds the
 * frame (a figure, a monument word, a question) while steps of copy walk
 * past it. The pane's hold is pure CSS `sticky` — it works without
 * JavaScript; steps report their arrival with `data-active="true"` at
 * mid-viewport presence so CSS can answer (kit reveals, draws, acts).
 *
 * Layout follows the house grid: a 12-column spread at md and up (pane 5,
 * steps 7), one column beneath — the staircase becomes a plain reading
 * order where the air narrows (V-L responsive law). Column spans come
 * from Tailwind's grid scale; the horizontal rhythm is the gutter token.
 *
 * Reduced telling: sticky is position, not motion — it stays; whatever
 * children do with arrival obeys the kit.
 */

const STEP_THRESHOLD = 0.5;

function StickyPane({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <div className={cn('md:col-span-5', className)}>
      <div className="md:sticky md:top-0">{children}</div>
    </div>
  );
}

function StickySteps({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}): JSX.Element {
  return <div className={cn('md:col-span-7', className)}>{children}</div>;
}

function StickyStep({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        element.dataset.active = entry.isIntersecting ? 'true' : 'false';
      },
      { threshold: STEP_THRESHOLD },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn(className)} style={style}>
      {children}
    </div>
  );
}

export function StickyStory({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <div className={cn('grid md:grid-cols-12 md:gap-x-grid-gutter-x', className)}>{children}</div>
  );
}

StickyStory.Pane = StickyPane;
StickyStory.Steps = StickySteps;
StickyStory.Step = StickyStep;
