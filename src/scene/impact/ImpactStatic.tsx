'use client';

import { useMemo } from 'react';

import { useJourneyStore } from '@/core/state/journey-store';
import { getDecisionPath } from '@/scene/engine/decision-content';
import { BUSINESS_ENTITIES } from '@/scene/universe/universe-content';

import {
  IMPACT_CAPTION_1,
  IMPACT_CAPTION_2,
  IMPACT_REFLECTION,
  getAffectedIds,
  getPathLessons,
  getSystemOutcome,
} from './impact-content';

/**
 * The Impact Engine as a document (SCENE-006 stills/express/semantic and
 * reduced-motion tellings): every system's outcome under the committed
 * decision — what changed and why — plus the Lessons and Reflection
 * layers. Structure is described, never charted. The same lock law holds:
 * without a committed decision there is no aftermath to read.
 */
export function ImpactStatic() {
  const visited = useJourneyStore((s) => s.visitedAnchors);

  const committedId = useMemo(
    () => visited.find((a) => a.startsWith('de:committed:'))?.slice('de:committed:'.length) ?? null,
    [visited],
  );

  if (!committedId) {
    return (
      <section
        aria-label="The impact engine — the aftermath of the decision"
        className="flex w-full flex-col items-center gap-measure-gap px-gutter py-section-y text-center"
      >
        <p className="font-display text-display-md text-paper-100">{IMPACT_CAPTION_1}</p>
        <p className="max-w-measure text-body-sm text-paper-100/60">
          There is no aftermath yet — a decision must be made before it can be witnessed. Return to
          the engine and commit one path.
        </p>
      </section>
    );
  }

  const path = getDecisionPath(committedId);
  const affected = new Set(getAffectedIds(committedId));
  const lessons = getPathLessons(committedId);

  return (
    <section
      aria-label={`The impact engine — what ${path.title} became`}
      className="flex w-full flex-col items-center gap-section-y px-gutter py-section-y"
    >
      <div className="flex max-w-measure flex-col items-center gap-measure-gap text-center">
        <p className="font-display text-display-md text-paper-100">{IMPACT_CAPTION_1}</p>
        <p className="font-display text-headline text-paper-100/60">{IMPACT_CAPTION_2}</p>
        <p className="text-body-sm text-paper-100/70">
          Decided: <strong className="text-paper-100">{path.title}</strong>. Every affected system
          changed; every consequence stayed connected. Here is what the decision became, system by
          system.
        </p>
      </div>

      <ul className="flex w-full max-w-measure flex-col gap-4">
        {BUSINESS_ENTITIES.map((entity) => {
          const outcome = getSystemOutcome(committedId, entity.id);
          const changed = affected.has(entity.id);
          return (
            <li key={entity.id} id={`outcome-${entity.id}`}>
              <details className="group rounded-xl border border-paper-100/10 bg-ink-900/50 px-5 py-4 open:border-ember-600/40">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-baseline justify-between gap-4">
                  <span className="text-body font-medium text-paper-100">
                    {entity.title}
                    {changed ? (
                      <span className="ml-3 text-eyebrow uppercase text-ember-300/90">changed</span>
                    ) : (
                      <span className="ml-3 text-eyebrow uppercase text-paper-100/35">held</span>
                    )}
                  </span>
                  <span className="text-right text-body-sm text-paper-100/50 group-open:hidden">
                    {outcome.whisper}
                  </span>
                  <span className="sr-only">Read the outcome</span>
                </summary>
                <div className="flex flex-col gap-2 pb-1 pt-2">
                  <p className="text-body-sm text-paper-100/70">{outcome.whisper}</p>
                  <p className="text-body-sm text-paper-100/60">{outcome.reasoning}</p>
                </div>
              </details>
            </li>
          );
        })}
      </ul>

      <div className="flex w-full max-w-measure flex-col gap-3 rounded-2xl border border-paper-100/10 bg-ink-900/60 p-6">
        <p className="text-eyebrow uppercase text-paper-100/40">What the aftermath taught</p>
        <ul className="flex flex-col gap-2">
          {lessons.map((lesson) => (
            <li key={lesson} className="text-body-sm leading-relaxed text-paper-100/85">
              — {lesson}
            </li>
          ))}
        </ul>
        <div className="mt-2 border-t border-paper-100/10 pt-3">
          <p className="text-body text-paper-100/85">{IMPACT_REFLECTION[0]}</p>
          <p className="mt-1 text-body-sm text-paper-100/60">{IMPACT_REFLECTION[1]}</p>
        </div>
        <p className="mt-1 text-caption uppercase tracking-[0.14em] text-paper-100/35">
          The future follows in the final chapter
        </p>
      </div>
    </section>
  );
}
