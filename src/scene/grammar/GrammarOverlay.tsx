'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useJourneyStore } from '@/core/state/journey-store';
import { cn } from '@/lib/cn';
import { useJourneyScene } from '@/scene/journey/journey-context';
import { ThoughtCard } from '@/scene/journey/ThoughtCard';

import {
  CIRCUIT_NAMES,
  GRAMMAR_CAPTION_1,
  GRAMMAR_CAPTION_2,
  GRAMMAR_STAGES,
  IMPACT_FIGURES,
  TRADEOFF_OPTIONS,
  WHY_LADDER,
  getStage,
  type GrammarStage,
} from './grammar-content';

/**
 * The DOM half of the process (SCENE-003): the stage panel tells the case
 * as it travels (scroll = progress through thinking), station doors reveal
 * hidden context on listen (hover), and the reasoning expands into a calm
 * ThoughtCard (click) — with the three earned acts: peel the whys, choose
 * the trade-off, and commit the decision. Impact stays locked until the
 * commitment is made.
 */
export function GrammarOverlay({ activeOrder }: { activeOrder: number }) {
  const { chapter, screenRef, focusRef } = useJourneyScene();
  const markVisited = useJourneyStore((s) => s.markVisited);
  const visited = useJourneyStore((s) => s.visitedAnchors);

  const [focusId, setFocusId] = useState<string | null>(null);
  const [whyStep, setWhyStep] = useState(0);
  const [tradeoff, setTradeoff] = useState<string | null>(null);

  const doorRefs = useRef(new Map<string, HTMLButtonElement>());
  const whisperRefs = useRef(new Map<string, HTMLSpanElement>());
  const focusIdRef = useRef<string | null>(null);

  useEffect(() => {
    focusIdRef.current = focusId;
    focusRef.current.focusId = focusId;
  }, [focusId, focusRef]);

  const openStage = useCallback(
    (stage: GrammarStage) => {
      setWhyStep(0);
      setFocusId(`st-${stage.id}`);
      markVisited(`gm:stage:${stage.id}`);
    },
    [markVisited],
  );

  const closeStage = useCallback(() => {
    const closing = focusIdRef.current;
    setFocusId(null);
    if (closing) {
      const door = doorRefs.current.get(closing);
      if (door && document.activeElement !== document.body) {
        door.focus({ preventScroll: true });
      }
    }
  }, []);

  /* Per-frame door/whisper sync from the station projector. */
  useEffect(() => {
    let raf = 0;
    const sync = () => {
      raf = requestAnimationFrame(sync);
      for (const stage of GRAMMAR_STAGES) {
        const key = `st-${stage.id}`;
        const anchor = screenRef.current.get(key);
        const door = doorRefs.current.get(key);
        const whisper = whisperRefs.current.get(key);
        if (!door) continue;

        if (!anchor || !anchor.visible || focusIdRef.current) {
          door.style.opacity = anchor && anchor.visible && !focusIdRef.current ? '1' : '0';
          door.style.pointerEvents =
            anchor && anchor.visible && !focusIdRef.current ? 'auto' : 'none';
          if (whisper && !focusIdRef.current) whisper.style.opacity = '0';
          if (!anchor || !anchor.visible) continue;
        }

        door.style.opacity = '1';
        door.style.pointerEvents = 'auto';
        door.style.transform = `translate(-50%, -50%) translate(${anchor.x.toFixed(1)}px, ${anchor.y.toFixed(1)}px)`;
        door.dataset.listening = anchor.hover ? 'true' : 'false';

        if (whisper) {
          whisper.style.opacity = anchor.hover && !focusIdRef.current ? '1' : '0';
          whisper.style.transform = `translate(-50%, 0) translate(${anchor.x.toFixed(1)}px, ${(anchor.y + 30).toFixed(1)}px)`;
        }
      }
    };
    raf = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(raf);
  }, [screenRef]);

  const activeStage = GRAMMAR_STAGES[Math.min(GRAMMAR_STAGES.length - 1, activeOrder - 1)];
  const committed = visited.includes('gm:decision:committed');

  const focused = useMemo(
    () => (focusId && focusId.startsWith('st-') ? getStage(focusId.slice(3)) : null),
    [focusId],
  );

  return (
    <>
      {/* Arrival caption — the thesis, then it recedes on time. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-measure-gap px-gutter text-center">
        <p className="gm-arrival font-display text-display-md text-paper-100">
          {GRAMMAR_CAPTION_1}
        </p>
        <p className="gm-arrival font-display text-headline text-paper-100/60">
          {GRAMMAR_CAPTION_2}
        </p>
      </div>

      {/* The stage panel — the case as it travels (scroll = thinking). */}
      {chapter === 'grammar' && !focused ? (
        <div
          key={activeStage.id}
          className="absolute left-gutter top-1/2 z-10 w-full max-w-sm -translate-y-1/2 animate-enter-rise"
        >
          <p className="text-eyebrow uppercase text-paper-100/40">
            {CIRCUIT_NAMES[activeStage.circuit]}
          </p>
          <p className="mt-1 font-display text-headline text-paper-100">
            <span className="mr-2 text-paper-100/35">
              {String(activeStage.order).padStart(2, '0')}
            </span>
            {activeStage.title}
          </p>
          <p className="mt-3 text-body-sm leading-relaxed text-paper-100/70">
            {activeStage.stageLine}
          </p>
          <button
            type="button"
            onClick={() => openStage(activeStage)}
            className="mt-4 inline-flex min-h-[44px] items-center rounded-full border border-paper-100/20 px-4 text-body-sm text-paper-100/80 transition-colors duration-ui ease-standard hover:border-ember-400/60 hover:text-paper-100"
          >
            Expand the reasoning
          </button>
          {activeStage.id === 'decision' && !committed ? (
            <p className="mt-3 text-caption text-ember-300/80">
              Commit the decision to reveal the impact.
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Stage progress hairline — earned thinking, drawn as it happens. */}
      {chapter === 'grammar' ? (
        <div className="absolute inset-x-gutter bottom-5 z-10" aria-hidden="true">
          <div className="h-px w-full bg-paper-100/10">
            <div
              className="h-px bg-ember-400/70 transition-[width] duration-state ease-standard"
              style={{ width: `${((activeOrder - 1) / (GRAMMAR_STAGES.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      ) : null}

      {/* Station doors + listening whispers. */}
      {GRAMMAR_STAGES.map((stage) => (
        <button
          key={stage.id}
          type="button"
          ref={(el) => {
            if (el) doorRefs.current.set(`st-${stage.id}`, el);
            else doorRefs.current.delete(`st-${stage.id}`);
          }}
          aria-label={`${stage.title}. ${stage.whisper}`}
          aria-expanded={focusId === `st-${stage.id}`}
          onClick={() => openStage(stage)}
          onFocus={() => {
            focusRef.current.hoverId = `st-${stage.id}`;
          }}
          onBlur={() => {
            if (focusRef.current.hoverId === `st-${stage.id}`) focusRef.current.hoverId = null;
          }}
          className="mind-door absolute left-0 top-0 z-20 size-[44px] rounded-full opacity-0 transition-opacity duration-state ease-standard"
        />
      ))}
      {GRAMMAR_STAGES.map((stage) => (
        <span
          key={`st-whisper-${stage.id}`}
          ref={(el) => {
            if (el) whisperRefs.current.set(`st-${stage.id}`, el);
            else whisperRefs.current.delete(`st-${stage.id}`);
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 w-max max-w-[220px] text-center text-caption leading-snug text-paper-100/80 opacity-0 transition-opacity duration-state ease-standard"
        >
          {stage.whisper}
        </span>
      ))}

      {/* The expanded reasoning, with its earned acts. */}
      {focused ? (
        <ThoughtCard
          label={`${focused.title} — expanded reasoning`}
          kicker={`${String(focused.order).padStart(2, '0')} · ${focused.title} · ${CIRCUIT_NAMES[focused.circuit]}`}
          onClose={closeStage}
          actions={
            <>
              {focused.id === 'root-cause' && whyStep < WHY_LADDER.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setWhyStep((w) => Math.min(WHY_LADDER.length - 1, w + 1))}
                  className="inline-flex min-h-[44px] items-center rounded-full bg-ember-700 px-4 text-body-sm text-paper-50 transition-colors duration-ui ease-standard hover:bg-ember-600"
                >
                  Peel the next why
                </button>
              ) : null}
              {focused.id === 'tradeoffs'
                ? TRADEOFF_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={tradeoff === option.id}
                      onClick={() => setTradeoff(option.id)}
                      className={cn(
                        'inline-flex min-h-[44px] items-center rounded-full border px-4 text-body-sm transition-colors duration-ui ease-standard',
                        tradeoff === option.id
                          ? 'border-ember-400 bg-ember-700/40 text-paper-50'
                          : 'border-paper-100/20 text-paper-100/80 hover:border-paper-100/50',
                      )}
                    >
                      {option.title}
                    </button>
                  ))
                : null}
              {focused.id === 'decision' && !committed ? (
                <button
                  type="button"
                  onClick={() => {
                    markVisited('gm:decision:committed');
                    closeStage();
                  }}
                  className="inline-flex min-h-[44px] items-center rounded-full bg-ember-700 px-4 text-body-sm text-paper-50 transition-colors duration-ui ease-standard hover:bg-ember-600"
                >
                  Commit the decision
                </button>
              ) : null}
            </>
          }
        >
          {focused.id === 'root-cause' ? (
            <ol className="ml-4 flex list-decimal flex-col gap-1 text-body-sm">
              {WHY_LADDER.slice(0, whyStep + 1).map((why) => (
                <li key={why} className={cn('animate-enter-rise')}>
                  {why}
                </li>
              ))}
            </ol>
          ) : focused.id === 'tradeoffs' ? (
            <>
              <p className="text-body-sm">{focused.reasoning}</p>
              <ul className="mt-2 flex flex-col gap-1 text-body-sm text-paper-100/70">
                {TRADEOFF_OPTIONS.map((option) => (
                  <li key={option.id}>
                    <strong className="text-paper-100">{option.title}.</strong> {option.summary}
                  </li>
                ))}
              </ul>
              {tradeoff ? (
                <p className="mt-2 text-caption text-ember-300/80">
                  Chosen: {tradeoff === 'revert' ? 'Revert' : 'Fix forward'} — either way, the cost
                  is now said out loud. That was the lesson.
                </p>
              ) : null}
            </>
          ) : focused.id === 'impact' && committed ? (
            <>
              <p className="text-body-sm">{focused.reasoning}</p>
              <div className="mt-4 flex flex-wrap gap-6">
                {IMPACT_FIGURES.map((figure) => (
                  <div key={figure.label} className="animate-enter-rise">
                    <p className="font-figure text-display-md text-ember-300">{figure.value}</p>
                    <p className="mt-1 text-caption text-paper-100/60">{figure.label}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-body-sm">{focused.reasoning}</p>
          )}
        </ThoughtCard>
      ) : null}
    </>
  );
}
