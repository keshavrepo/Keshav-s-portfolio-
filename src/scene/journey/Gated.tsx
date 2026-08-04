'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * REUSABLE (since SCENE-001; extracted SCENE-003) — gates one story element
 * on its beat. Without JavaScript the element is present for crawlers and
 * the semantic floor; with it, the machine toggles `.op-gated-live` and
 * aria-hidden together so sighted visitors and screen readers share the
 * same pacing (SPEC-004 parity doctrine).
 */
export function Gated({
  live,
  className,
  style,
  children,
}: {
  live: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (live) el.removeAttribute('aria-hidden');
    else el.setAttribute('aria-hidden', 'true');
  }, [live]);

  return (
    <div ref={ref} className={cn('op-gated', live && 'op-gated-live', className)} style={style}>
      {children}
    </div>
  );
}
