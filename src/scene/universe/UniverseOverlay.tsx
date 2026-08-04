'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useJourneyStore } from '@/core/state/journey-store';
import { useJourneyScene } from '@/scene/journey/journey-context';
import { ThoughtCard } from '@/scene/journey/ThoughtCard';

import {
  BUSINESS_ENTITIES,
  TIER_NAMES,
  UNIVERSE_CAPTION_1,
  UNIVERSE_CAPTION_2,
  describeChain,
  getEntity,
  type BusinessEntity,
} from './universe-content';

/**
 * The DOM half of the Business Universe (SCENE-004): the arrival caption
 * states the thesis and recedes; doors listen (hover = reveal the
 * relationship — whisper plus the neighborhood's earned labels); select
 * isolates one system and the reasoning opens in a calm ThoughtCard while
 * the ripple walks the change downstream. Every interaction teaches
 * systems thinking; nothing here is a dashboard, a card grid, or a chart.
 */
export function UniverseOverlay() {
  const { screenRef, focusRef } = useJourneyScene();
  const markVisited = useJourneyStore((s) => s.markVisited);

  const [focusId, setFocusId] = useState<string | null>(null);

  const doorRefs = useRef(new Map<string, HTMLButtonElement>());
  const whisperRefs = useRef(new Map<string, HTMLSpanElement>());
  const labelRefs = useRef(new Map<string, HTMLSpanElement>());
  const focusIdRef = useRef<string | null>(null);

  useEffect(() => {
    focusIdRef.current = focusId;
    focusRef.current.focusId = focusId;
  }, [focusId, focusRef]);

  const openEntity = useCallback(
    (entity: BusinessEntity) => {
      setFocusId(`en-${entity.id}`);
      focusRef.current.rippleAt = performance.now();
      markVisited(`un:isolate:${entity.id}`);
    },
    [markVisited, focusRef],
  );

  const closeEntity = useCallback(() => {
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
          // Labels are earned: the isolated system names itself; neighbors
          // name themselves on listen; downstream systems name themselves
          // as the change reaches them.
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
    () => (focusId && focusId.startsWith('en-') ? getEntity(focusId.slice(3)) : null),
    [focusId],
  );

  return (
    <>
      {/* Arrival caption — the thesis, then it recedes on time. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-measure-gap px-gutter text-center">
        <p className="un-arrival font-display text-display-md text-paper-100">
          {UNIVERSE_CAPTION_1}
        </p>
        <p className="un-arrival font-display text-headline text-paper-100/60">
          {UNIVERSE_CAPTION_2}
        </p>
      </div>

      {/* The guide — one calm legend, quietest of the frame. */}
      {!focused ? (
        <p className="pointer-events-none absolute bottom-5 left-gutter z-10 max-w-[280px] text-caption leading-snug text-paper-100/40">
          Scroll to grow the system · hover to reveal a relationship · select one to watch a change
          travel
        </p>
      ) : null}

      {/* System doors + listening whispers + earned labels. */}
      {BUSINESS_ENTITIES.map((entity) => (
        <button
          key={entity.id}
          type="button"
          ref={(el) => {
            if (el) doorRefs.current.set(`en-${entity.id}`, el);
            else doorRefs.current.delete(`en-${entity.id}`);
          }}
          aria-label={`${entity.title}. ${entity.whisper}`}
          aria-expanded={focusId === `en-${entity.id}`}
          onClick={() => openEntity(entity)}
          onFocus={() => {
            focusRef.current.hoverId = `en-${entity.id}`;
          }}
          onBlur={() => {
            if (focusRef.current.hoverId === `en-${entity.id}`) focusRef.current.hoverId = null;
          }}
          className="mind-door absolute left-0 top-0 z-20 size-[44px] rounded-full opacity-0 transition-opacity duration-state ease-standard"
        />
      ))}
      {BUSINESS_ENTITIES.map((entity) => (
        <span
          key={`en-whisper-${entity.id}`}
          ref={(el) => {
            if (el) whisperRefs.current.set(`en-${entity.id}`, el);
            else whisperRefs.current.delete(`en-${entity.id}`);
          }}
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 w-max max-w-[220px] text-center text-caption leading-snug text-paper-100/80 opacity-0 transition-opacity duration-state ease-standard"
        >
          {entity.title} — {entity.whisper}
        </span>
      ))}
      {BUSINESS_ENTITIES.map((entity) => (
        <span
          key={`en-label-${entity.id}`}
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

      {/* System Isolation Mode: the reasoning, and the travelling change. */}
      {focused ? (
        <ThoughtCard
          label={`${focused.title} — the system, isolated`}
          kicker={`Isolated system · ${focused.title} · ${TIER_NAMES[focused.tier]}`}
          onClose={closeEntity}
          actions={
            <button
              type="button"
              onClick={() => {
                focusRef.current.rippleAt = performance.now();
              }}
              className="inline-flex min-h-[44px] items-center rounded-full bg-ember-700 px-4 text-body-sm text-paper-50 transition-colors duration-ui ease-standard hover:bg-ember-600"
            >
              Send the change again
            </button>
          }
        >
          <p className="text-body-sm">{focused.reasoning}</p>
          <p className="mt-2 text-body-sm text-paper-100/70">{focused.line}</p>
          <p className="mt-3 text-caption text-ember-300/80">{describeChain(focused.id)}</p>
        </ThoughtCard>
      ) : null}
    </>
  );
}
