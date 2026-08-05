'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Reveal — the gate machine for the kit laws (SPRINT-1 CSS) and the named
 * variants built on it.
 *
 * One element (or a composed pair) mounts the kit classes; an
 * IntersectionObserver arms `.v2-live` on the beat. The doctrine is the
 * house's own (Gated, SCENE-001): without JavaScript everything is simply
 * present; with it, the element waits in the dark for its threshold and
 * AT hears the same pacing — while unarmed it is aria-hidden, on arming
 * the attribute leaves in the same breath as the class.
 *
 * `live` switches to manual drive: the parent's machine owns the beat and
 * this component only mirrors it (the journey-sections pattern).
 *
 * Threshold 0.35: a reveal may not fire on a sliver of presence — the
 * beat belongs to a section the visitor has actually arrived at.
 */

export type RevealMove = 'mask' | 'resolve' | 'cascade';

export interface RevealProps {
  move?: RevealMove;
  /** Manual drive: omit IO, mirror this prop. */
  live?: boolean;
  /** Auto drive: fire once (default) or re-arm on every exit. */
  once?: boolean;
  className?: string;
  /** Applied to the moving element (mask's riser / resolve's body). */
  bodyClassName?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const ARM_THRESHOLD = 0.35;

/** `v2-live` lands where the kit gates it; aria-hidden owns the whole root. */
function setLive(root: HTMLElement, move: RevealMove, on: boolean): void {
  const target = move === 'mask' ? (root.firstElementChild as HTMLElement | null) : root;
  target?.classList.toggle('v2-live', on);
  if (on) root.removeAttribute('aria-hidden');
  else root.setAttribute('aria-hidden', 'true');
}

export function Reveal({
  move = 'mask',
  live,
  once = true,
  className,
  bodyClassName,
  style,
  children,
}: RevealProps): JSX.Element {
  const rootRef = useRef<HTMLDivElement>(null);
  const armedRef = useRef(false);

  /* The parity doctrine: visual gating and AT gating are one fact. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || live === undefined) return;
    setLive(root, move, live);
  }, [live, move]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || live !== undefined) return;
    setLive(root, move, false);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          armedRef.current = true;
          setLive(root, move, true);
          if (once) observer.disconnect();
        } else if (!once && armedRef.current) {
          setLive(root, move, false);
        }
      },
      { threshold: ARM_THRESHOLD },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [live, once, move]);

  if (move === 'resolve') {
    return (
      <div ref={rootRef} className={cn('v2-resolve', className, bodyClassName)} style={style}>
        {children}
      </div>
    );
  }

  if (move === 'cascade') {
    return (
      <div ref={rootRef} className={cn('v2-cascade', className)} style={style}>
        {children}
      </div>
    );
  }

  /* The Mask: the parent clips, the child rises on the beat. */
  return (
    <div ref={rootRef} className={cn('v2-mask', className)} style={style}>
      <div className={cn('v2-rise', bodyClassName)}>{children}</div>
    </div>
  );
}

export function MaskReveal(props: Omit<RevealProps, 'move'>): JSX.Element {
  return <Reveal {...props} move="mask" />;
}

export function BlurReveal(props: Omit<RevealProps, 'move'>): JSX.Element {
  return <Reveal {...props} move="resolve" />;
}

export function CascadeReveal(props: Omit<RevealProps, 'move'>): JSX.Element {
  return <Reveal {...props} move="cascade" />;
}

/**
 * Step — one instrument in a Cascade (§7 row 10): declares its `--step-i`
 * so the 45ms token spaces the entrances.
 */
export function Step({
  i,
  className,
  style,
  children,
}: {
  i: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}): JSX.Element {
  return (
    <div className={cn(className)} style={{ ...style, '--step-i': i } as CSSProperties}>
      {children}
    </div>
  );
}
