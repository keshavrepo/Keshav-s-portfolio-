'use client';

import { useEffect, useState, type ReactNode } from 'react';

import { motionBounds } from '@/design-system/tokens';
import { cn } from '@/lib/cn';

/**
 * ReadyGate — the premium loading-sequence primitive.
 *
 * `useDocumentReady()` resolves once when the document has loaded AND
 * the self-hosted voices have landed (`document.fonts.ready`) — capped
 * at the first-paint budget (ER-1: 1000ms) so a slow font can never hold
 * the story hostage; past the cap the metric-compatible fallbacks carry
 * the line invisibly (§19.4's swap law).
 *
 * `<ReadyGate>` renders its children always — SSR, stills, semantic: the
 * gate is a class, never a fork. It flips `data-ready="true"` and the
 * optional `readyClass` exactly once; CSS above decides what may animate
 * in response. This is how a scene arms a loading rite (fonts → reveal)
 * without a hydration flash: the same markup on both sides, one
 * attribute of truth.
 */

export function useDocumentReady(onReady?: () => void): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let done = false;
    let timer = 0;

    const finish = (): void => {
      if (done) return;
      done = true;
      setReady(true);
      onReady?.();
    };

    const fontsReady: Promise<unknown> =
      typeof document.fonts !== 'undefined' ? document.fonts.ready : Promise.resolve();
    const windowLoaded = new Promise<void>((resolve) => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', () => resolve(), { once: true });
    });
    /* The budget says the wait cannot outlive the first paint (ER-1). */
    const capped = new Promise<void>((resolve) => {
      timer = window.setTimeout(resolve, motionBounds.firstPaintMax);
    });

    Promise.all([fontsReady, windowLoaded]).then(finish);
    capped.then(finish);

    return () => {
      done = true;
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ready;
}

export function ReadyGate({
  className,
  readyClass = 'v2-ready',
  onReady,
  children,
}: {
  className?: string;
  readyClass?: string;
  onReady?: () => void;
  children?: ReactNode;
}): JSX.Element {
  const ready = useDocumentReady(onReady);

  return (
    <div className={cn(className, ready && readyClass)} data-ready={ready ? 'true' : 'false'}>
      {children}
    </div>
  );
}
