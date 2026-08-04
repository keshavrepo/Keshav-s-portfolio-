'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useJourneyStore } from '@/core/state/journey-store';
import { cn } from '@/lib/cn';
import { useJourneyScene } from '@/scene/journey/journey-context';
import { MIND_NODES, getMindNode } from '@/scene/mindscape/mindscape-content';

/**
 * The DOM layer of the mind (SCENE-002): invisible 44px doors stand over
 * every decision (keyboard and touch get the same world the pointer gets),
 * whispers answer on listen, and the expanded thought arrives as a calm
 * card capped at the stage-beat law (IR-12). Positions sync per frame from
 * the canvas projector through direct style writes — never React renders.
 */
export function MindscapeOverlay() {
  const { screenRef, focusRef } = useJourneyScene();
  const markVisited = useJourneyStore((s) => s.markVisited);

  const [focusId, setFocusId] = useState<string | null>(null);
  const doorRefs = useRef(new Map<string, HTMLButtonElement>());
  const whisperRefs = useRef(new Map<string, HTMLSpanElement>());
  const cardRef = useRef<HTMLDivElement>(null);
  const focusIdRef = useRef<string | null>(null);

  /* Keep camera + shader informed of the focused thought. */
  useEffect(() => {
    focusIdRef.current = focusId;
    focusRef.current.focusId = focusId;
  }, [focusId, focusRef]);

  const openThought = useCallback(
    (id: string) => {
      setFocusId(id);
      markVisited(`mm:node:${id}`);
    },
    [markVisited],
  );

  const closeThought = useCallback(() => {
    const closing = focusIdRef.current;
    setFocusId(null);
    if (closing) {
      const door = doorRefs.current.get(closing);
      if (door && document.activeElement !== document.body) door.focus({ preventScroll: true });
    }
  }, []);

  /* ESC closes; card captures initial focus. */
  useEffect(() => {
    if (!focusId) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeThought();
    };
    window.addEventListener('keydown', onKey);
    cardRef.current?.focus({ preventScroll: true });
    return () => window.removeEventListener('keydown', onKey);
  }, [focusId, closeThought]);

  /* Per-frame anchor sync: transforms, whisper visibility, invitation. */
  useEffect(() => {
    let raf = 0;
    const sync = () => {
      raf = requestAnimationFrame(sync);
      for (const node of MIND_NODES) {
        const anchor = screenRef.current.get(node.id);
        const door = doorRefs.current.get(node.id);
        const whisper = whisperRefs.current.get(node.id);
        if (!door) continue;

        if (!anchor || !anchor.visible) {
          door.style.opacity = '0';
          door.style.pointerEvents = 'none';
          if (whisper) whisper.style.opacity = '0';
          continue;
        }

        door.style.opacity = '1';
        door.style.pointerEvents = 'auto';
        door.style.transform = `translate(-50%, -50%) translate(${anchor.x.toFixed(1)}px, ${anchor.y.toFixed(1)}px)`;

        const listening = anchor.hover || focusIdRef.current === node.id;
        door.dataset.listening = listening ? 'true' : 'false';

        if (whisper) {
          const show = !focusIdRef.current && (listening || anchor.invited);
          whisper.style.opacity = show ? (anchor.hover ? '1' : '0.62') : '0';
          whisper.style.transform = `translate(-50%, 0) translate(${anchor.x.toFixed(1)}px, ${(anchor.y + 30).toFixed(1)}px)`;
        }
      }
    };
    raf = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(raf);
  }, [screenRef]);

  const focused = focusId ? getMindNode(focusId) : null;

  return (
    <>
      {/* The vista caption — the chapter's thesis, then it recedes. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-measure-gap px-gutter text-center">
        <p className="vista-line font-display text-display-md text-paper-100">
          You are not exploring a portfolio.
        </p>
        <p className="vista-line font-display text-headline text-paper-100/60">
          You are exploring how a Business Analyst thinks.
        </p>
      </div>

      {/* The doors: one per decision, keyboard- and touch-true. */}
      {MIND_NODES.map((node) => (
        <button
          key={node.id}
          type="button"
          ref={(el) => {
            if (el) doorRefs.current.set(node.id, el);
            else doorRefs.current.delete(node.id);
          }}
          aria-label={`${node.title}. ${node.whisper}`}
          aria-expanded={focusId === node.id}
          onClick={() => openThought(node.id)}
          onFocus={() => {
            focusRef.current.hoverId = node.id;
          }}
          onBlur={() => {
            if (focusRef.current.hoverId === node.id) focusRef.current.hoverId = null;
          }}
          className="mind-door absolute left-0 top-0 z-20 size-[44px] rounded-full opacity-0 transition-opacity duration-state ease-standard"
        />
      ))}
      {MIND_NODES.map((node) => (
        <span
          key={`whisper-${node.id}`}
          ref={(el) => {
            if (el) whisperRefs.current.set(node.id, el);
            else whisperRefs.current.delete(node.id);
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 w-max max-w-[220px] whitespace-normal text-center text-caption leading-snug text-paper-100/80 opacity-0 transition-opacity duration-state ease-standard"
        >
          {node.whisper}
        </span>
      ))}

      {/* The quiet legend (S12 teaches touch; then it keeps its place). */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <p className="mind-legend text-eyebrow uppercase text-paper-100/40">
          Hover or tab to listen · Select to expand · Scroll to go deeper
        </p>
      </div>

      {/* The expanded thought. */}
      {focused ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-label={`${focused.title} — expanded thought`}
          ref={cardRef}
          tabIndex={-1}
          className={cn(
            'mind-card absolute inset-x-0 bottom-0 z-30 mx-auto w-full max-w-measure px-gutter pb-8',
          )}
        >
          <div className="animate-enter-rise rounded-2xl border border-paper-100/10 bg-ink-900/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur-md">
            <p className="text-eyebrow uppercase text-ember-300/90">{focused.title}</p>
            <p className="mt-2 text-body text-paper-100/90">{focused.thought}</p>
            <button
              type="button"
              onClick={closeThought}
              className="mt-4 inline-flex min-h-[44px] items-center rounded-full border border-paper-100/20 px-4 text-body-sm text-paper-100/80 transition-colors duration-ui ease-standard hover:border-paper-100/50"
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
