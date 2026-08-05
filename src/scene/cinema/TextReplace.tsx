'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type CSSProperties,
  type ReactNode,
} from 'react';

import { cn } from '@/lib/cn';

/**
 * TextReplace — the text-replace primitive (§7 row 3's rotating-word
 * act): a slot inside a sentence where one phrase yields to the next.
 *
 * Composition law: every phrase stacks in the same grid cell, so the
 * widest phrase sizes the slot from the first paint — a swap can never
 * move the sentence around it (zero layout shift, the CLS covenant).
 * The motion is the kit's Act law (state-time, signal-out).
 *
 * Accessibility: the container's aria-label always reads the ACTIVE
 * phrase and inactive phrases are aria-hidden — a swap is silent to the
 * live region (one aria-live voice exists and it is not this one); a
 * visitor who reads later simply hears the current word. Without
 * JavaScript the first phrase stands (the semantic floor).
 *
 * Drives: controlled `index`, or imperative `setProgress(0..1)` (scroll
 * replace — the channel is divided into honest, equal shares). There is
 * no autonomous timer: nothing the visitor didn't move moves first
 * (V-I6); a beat-driven caller advances `index`.
 */

export interface TextReplaceHandle {
  /** Scroll drive: equal shares of the channel per phrase. */
  setProgress: (progress: number) => void;
}

export interface TextReplaceProps {
  phrases: [string, ...string[]];
  /** Controlled index — the parent machine advances the act. */
  index?: number;
  className?: string;
  style?: CSSProperties;
}

export const TextReplace = forwardRef<TextReplaceHandle, TextReplaceProps>(function TextReplace(
  { phrases, index = 0, className, style },
  forwardedRef,
): JSX.Element {
  const rootRef = useRef<HTMLSpanElement>(null);
  const activeRef = useRef(index);

  const apply = (active: number): void => {
    const root = rootRef.current;
    if (!root) return;
    const clamped = Math.max(0, Math.min(phrases.length - 1, active));
    activeRef.current = clamped;
    root.setAttribute('aria-label', phrases[clamped]);
    Array.from(root.children).forEach((child, i) => {
      const on = i === clamped;
      const element = child as HTMLElement;
      element.dataset.active = on ? 'true' : 'false';
      if (on) element.removeAttribute('aria-hidden');
      else element.setAttribute('aria-hidden', 'true');
    });
  };

  useEffect(() => {
    apply(index);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useImperativeHandle(
    forwardedRef,
    () => ({
      setProgress: (p) => {
        apply(Math.min(phrases.length - 1, Math.floor(Math.max(0, p) * phrases.length)));
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [phrases.length],
  );

  return (
    <span
      ref={rootRef}
      className={cn('v2-act', className)}
      style={{ ...style, display: 'inline-grid' }}
      aria-label={phrases[index] ?? phrases[0]}
    >
      {phrases.map((phrase, i): ReactNode => {
        return (
          <span
            key={phrase + i}
            data-active={i === index ? 'true' : 'false'}
            aria-hidden={i === index ? undefined : 'true'}
            style={{ gridArea: '1 / 1' }}
          >
            {phrase}
          </span>
        );
      })}
    </span>
  );
});
