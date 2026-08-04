'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useJourneyStore } from '@/core/state/journey-store';
import { getDecisionPath } from '@/scene/engine/decision-content';
import { useJourneyScene } from '@/scene/journey/journey-context';
import { ThoughtCard } from '@/scene/journey/ThoughtCard';
import { BUSINESS_ENTITIES } from '@/scene/universe/universe-content';

import {
  IMPACT_CAPTION_1,
  IMPACT_CAPTION_2,
  IMPACT_REFLECTION,
  getPathLessons,
  getSystemOutcome,
} from './impact-content';

/**
 * The Impact Engine, DOM half (SCENE-006): the visitor explores outcomes
 * over the transforming universe. Doors listen with what the decision did
 * to each system (hover explains); select opens the cause chain in a calm
 * ThoughtCard while the camera honors the system (click reveals deeper
 * reasoning); scroll carries the recovery (v). The Lessons and Reflection
 * layers arrive only when the new shape is nearly complete — earned, like
 * everything else in this world. No charts, no KPI: structure is the metric.
 */
export function ImpactOverlay({ lessonsArrived }: { lessonsArrived: boolean }) {
  const { screenRef, focusRef } = useJourneyScene();
  const markVisited = useJourneyStore((s) => s.markVisited);
  const visited = useJourneyStore((s) => s.visitedAnchors);

  const [focusId, setFocusId] = useState<string | null>(null);

  const doorRefs = useRef(new Map<string, HTMLButtonElement>());
  const whisperRefs = useRef(new Map<string, HTMLSpanElement>());
  const labelRefs = useRef(new Map<string, HTMLSpanElement>());
  const focusIdRef = useRef<string | null>(null);

  const committedId = useMemo(
    () => visited.find((a) => a.startsWith('de:committed:'))?.slice('de:committed:'.length) ?? null,
    [visited],
  );

  useEffect(() => {
    focusIdRef.current = focusId;
    focusRef.current.focusId = focusId;
  }, [focusId, focusRef]);

  const openSystem = useCallback(
    (entityId: string) => {
      setFocusId(`en-${entityId}`);
      markVisited(`im:system:${entityId}`);
    },
    [markVisited],
  );

  const closeSystem = useCallback(() => {
    const closing = focusIdRef.current;
    setFocusId(null);
    if (closing) {
      const door = doorRefs.current.get(closing);
      if (door && document.activeElement !== document.body) {
        door.focus({ preventScroll: true });
      }
    }
  }, []);

  /* Per-frame door/whisper/label sync from the universe projector. */
  useEffect(() => {
    let raf = 0;
    const sync = () => {
      raf = requestAnimationFrame(sync);
      for (const entity of BUSINESS_ENTITIES) {
        const key = `en-${entity.id}`;
        const anchor = screenRef.current.get(key);
        const door = doorRefs.current.get(key);
        const whisper = whisperRefs.current.get(key);
        const label = labelRefs.current.get(key);
        if (!door) continue;

        if (!anchor || !anchor.visible || focusIdRef.current) {
          door.style.opacity = anchor && anchor.visible && !focusIdRef.current ? '1' : '0';
          door.style.pointerEvents =
            anchor && anchor.visible && !focusIdRef.current ? 'auto' : 'none';
          if (whisper && !focusIdRef.current) whisper.style.opacity = '0';
          if (!anchor || !anchor.visible) {
            if (label) label.style.opacity = '0';
            continue;
          }
        }

        door.style.opacity = '1';
        door.style.pointerEvents = 'auto';
        door.style.transform = `translate(-50%, -50%) translate(${anchor.x.toFixed(1)}px, ${anchor.y.toFixed(1)}px)`;
        door.dataset.listening = anchor.hover ? 'true' : 'false';

        if (whisper) {
          whisper.style.opacity = anchor.hover && !focusIdRef.current ? '1' : '0';
          whisper.style.transform = `translate(-50%, 0) translate(${anchor.x.toFixed(1)}px, ${(anchor.y + 30).toFixed(1)}px)`;
        }

        if (label) {
          const named = anchor.invited || focusIdRef.current === key ? '1' : '0';
          label.style.opacity = named;
          label.style.transform = `translate(-50%, -100%) translate(${anchor.x.toFixed(1)}px, ${(anchor.y - 26).toFixed(1)}px)`;
        }
      }
    };
    raf = requestAnimationFrame(sync);
    return () => cancelAnimationFrame(raf);
  }, [screenRef]);

  const focused = useMemo(
    () =>
      focusId && focusId.startsWith('en-')
        ? BUSINESS_ENTITIES.find((e) => e.id === focusId.slice(3))
        : null,
    [focusId],
  );

  /* The Lessons Layer is earned once, then remembered (EG-51). */
  useEffect(() => {
    if (lessonsArrived) markVisited('im:lessons');
  }, [lessonsArrived, markVisited]);

  /* On the static/document path there may be no decision; the cinematic
     path is unreachable without one (the engine lock). Guard the copy. */
  const pathTitle = committedId ? getDecisionPath(committedId).title : null;
  const lessons = committedId ? getPathLessons(committedId) : [];

  return (
    <>
      {/* Arrival caption — the thesis, then it recedes on time. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-measure-gap px-gutter text-center">
        <p className="im-arrival font-display text-display-md text-paper-100">{IMPACT_CAPTION_1}</p>
        <p className="im-arrival font-display text-headline text-paper-100/60">
          {IMPACT_CAPTION_2}
        </p>
      </div>

      {!focused && !lessonsArrived ? (
        <p className="pointer-events-none absolute bottom-5 left-gutter z-10 max-w-[280px] text-caption leading-snug text-paper-100/40">
          {pathTitle
            ? `Decided: ${pathTitle}. Scroll — the business finds its new shape · hover — what changed · select — the reason`
            : 'Scroll — the business finds its new shape · hover to listen'}
        </p>
      ) : null}

      {/* System doors + outcome whispers + earned labels. */}
      {BUSINESS_ENTITIES.map((entity) => {
        const outcome = committedId ? getSystemOutcome(committedId, entity.id) : null;
        return (
          <button
            key={entity.id}
            type="button"
            ref={(el) => {
              if (el) doorRefs.current.set(`en-${entity.id}`, el);
              else doorRefs.current.delete(`en-${entity.id}`);
            }}
            aria-label={
              outcome
                ? `${entity.title}. ${outcome.whisper}`
                : `${entity.title}. Listen to what became of it.`
            }
            aria-expanded={focusId === `en-${entity.id}`}
            onClick={() => openSystem(entity.id)}
            onFocus={() => {
              focusRef.current.hoverId = `en-${entity.id}`;
            }}
            onBlur={() => {
              if (focusRef.current.hoverId === `en-${entity.id}`) focusRef.current.hoverId = null;
            }}
            className="mind-door absolute left-0 top-0 z-20 size-[44px] rounded-full opacity-0 transition-opacity duration-state ease-standard"
          />
        );
      })}
      {BUSINESS_ENTITIES.map((entity) => {
        const outcome = committedId ? getSystemOutcome(committedId, entity.id) : null;
        return (
          <span
            key={`im-whisper-${entity.id}`}
            ref={(el) => {
              if (el) whisperRefs.current.set(`en-${entity.id}`, el);
              else whisperRefs.current.delete(`en-${entity.id}`);
            }}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 w-max max-w-[220px] text-center text-caption leading-snug text-paper-100/80 opacity-0 transition-opacity duration-state ease-standard"
          >
            {outcome ? `${entity.title} — ${outcome.whisper}` : entity.title}
          </span>
        );
      })}
      {BUSINESS_ENTITIES.map((entity) => (
        <span
          key={`im-label-${entity.id}`}
          ref={(el) => {
            if (el) labelRefs.current.set(`en-${entity.id}`, el);
            else labelRefs.current.delete(`en-${entity.id}`);
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 text-eyebrow uppercase tracking-[0.14em] text-ember-300/90 opacity-0 transition-opacity duration-state ease-standard"
        >
          {entity.title}
        </span>
      ))}

      {/* The deeper reasoning — the cause chain, said plainly. */}
      {focused && committedId ? (
        <ThoughtCard
          label={`${focused.title} — what the decision did to it`}
          kicker={`Outcome · ${focused.title}${pathTitle ? ` · decided: ${pathTitle.toLowerCase()}` : ''}`}
          onClose={closeSystem}
        >
          <p className="text-body-sm">{getSystemOutcome(committedId, focused.id).reasoning}</p>
        </ThoughtCard>
      ) : null}

      {/* Lessons + Reflection — only when the new shape is nearly complete. */}
      {lessonsArrived ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-4 px-gutter pb-8 pt-20 text-center">
          <div className="pointer-events-auto flex max-w-measure animate-enter-rise flex-col gap-2 rounded-2xl border border-paper-100/10 bg-ink-900/70 p-6 backdrop-blur-md">
            <p className="text-eyebrow uppercase text-paper-100/40">What the aftermath taught</p>
            <ul className="flex flex-col gap-2 text-left">
              {lessons.map((lesson) => (
                <li key={lesson} className="text-body-sm leading-relaxed text-paper-100/85">
                  — {lesson}
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t border-paper-100/10 pt-3">
              <p className="text-body text-paper-100/85">{IMPACT_REFLECTION[0]}</p>
              <p className="mt-1 text-body-sm text-paper-100/60">{IMPACT_REFLECTION[1]}</p>
            </div>
            <p className="mt-2 text-caption uppercase tracking-[0.14em] text-paper-100/35">
              The future follows in the final chapter
            </p>
          </div>
        </div>
      ) : null}
    </>
  );
}
