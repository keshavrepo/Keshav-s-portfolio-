'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useJourneyStore } from '@/core/state/journey-store';
import { cn } from '@/lib/cn';
import { useJourneyScene } from '@/scene/journey/journey-context';

import { EMBER_ANSWER, FUTURE_BEATS } from './future-content';

/**
 * The Future, DOM half (SCENE-007 — final story chapter): typography is
 * the hero. Five beats crossfade over the dissolving universe — the
 * claim of the Opening returns, the build tightens to a single line,
 * and the last words stay on screen because nothing may follow them.
 * The closing interaction is not a form: it is the first light of the
 * Opening, still breathing, still listening — reached out to, one
 * final time.
 */
export function FutureOverlay({ beat }: { beat: number }) {
  const { screenRef, focusRef } = useJourneyScene();
  const markVisited = useJourneyStore((s) => s.markVisited);

  const doorRef = useRef<HTMLButtonElement>(null);
  const [answered, setAnswered] = useState(false);

  /* Beats are remembered (EG-51): the trail of the ending persists. */
  useEffect(() => {
    if (beat >= 0) markVisited(`fu:line:${beat}`);
  }, [beat, markVisited]);

  const answer = useCallback(() => {
    setAnswered(true);
    markVisited('fu:end');
  }, [markVisited]);

  /* The ember door rides the heart's projection (en-customers). */
  useEffect(() => {
    let raf = 0;
    const sync = () => {
      raf = requestAnimationFrame(sync);
      const door = doorRef.current;
      if (!door) return;
      const anchor = screenRef.current.get('en-customers');
      const finalBeat = beat >= FUTURE_BEATS.length - 1;
      if (!anchor || !anchor.visible || beat < 0) {
        door.style.opacity = '0';
        door.style.pointerEvents = 'none';
        return;
      }
      door.style.opacity = finalBeat ? '1' : '0.55';
      door.style.pointerEvents = 'auto';
      door.style.transform = `translate(-50%, -50%) translate(${anchor.x.toFixed(1)}px, ${anchor.y.toFixed(1)}px)`;
      door.dataset.listening = anchor.hover ? 'true' : 'false';
    };
    raf = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(raf);
  }, [screenRef, beat]);

  const finalLive = beat >= FUTURE_BEATS.length - 1;

  return (
    <>
      {/* The typography sequence — each beat holds alone, then hands over. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 px-gutter text-center">
        {FUTURE_BEATS.map((b, i) => (
          <div
            key={b.threshold}
            className={cn(
              'absolute inset-x-0 flex flex-col items-center gap-3 px-gutter transition-opacity duration-[1600ms] ease-standard',
              i === beat ? 'opacity-100' : 'opacity-0',
            )}
            aria-hidden={i === beat ? undefined : true}
          >
            {b.lines.map((line, j) => (
              <p
                key={line}
                className={cn(
                  'font-display',
                  i === FUTURE_BEATS.length - 1 && j === 0
                    ? 'text-display-lg text-paper-100'
                    : b.scale === 'display-lg'
                      ? 'text-display-lg text-paper-100'
                      : b.scale === 'display-md'
                        ? 'text-display-md text-paper-100'
                        : 'text-headline text-paper-100/70',
                )}
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* The closing interaction — the first light, still listening. */}
      <button
        type="button"
        ref={doorRef}
        aria-label={
          finalLive
            ? `The heartbeat, still here. ${answered ? EMBER_ANSWER : 'Reach out to it one last time.'}`
            : 'The heartbeat of the opening, still here.'
        }
        onClick={answer}
        onFocus={() => {
          focusRef.current.hoverId = 'en-customers';
        }}
        onBlur={() => {
          if (focusRef.current.hoverId === 'en-customers') focusRef.current.hoverId = null;
        }}
        className="mind-door absolute left-0 top-0 z-20 size-[44px] rounded-full opacity-0 transition-opacity duration-[1600ms] ease-standard"
      />

      {answered && finalLive ? (
        <p className="pointer-events-none absolute inset-x-gutter bottom-8 z-10 animate-enter-rise text-center text-caption uppercase tracking-[0.18em] text-paper-100/45">
          {EMBER_ANSWER}
        </p>
      ) : null}

      {/* The ending, said aloud for visitors who cannot see the stage. */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {beat >= 0
          ? [...FUTURE_BEATS[beat].lines, answered && finalLive ? EMBER_ANSWER : '']
              .filter(Boolean)
              .join(' ')
          : ''}
      </div>
    </>
  );
}
