'use client';

import { useMemo } from 'react';

import { useJourneyStore } from '@/core/state/journey-store';

import {
  CONSEQUENCE_KIND_LABELS,
  DECISION_EVIDENCE,
  DECISION_PATHS,
  ENGINE_CAPTION_1,
  ENGINE_CAPTION_2,
  REFLECTION_LINES,
  SCENARIO,
} from './decision-content';

const COMMIT_PREFIX = 'de:committed:';

/**
 * The Decision Engine as a document (SCENE-005 stills/express/semantic
 * and reduced-motion tellings): the briefing, every piece of evidence,
 * every path with its trade-offs named, and — after commitment — the
 * full consequence record and the reflection. The lock is the same law:
 * one decision, no undo, consequences kept.
 */
export function EngineStatic() {
  const markVisited = useJourneyStore((s) => s.markVisited);
  const visited = useJourneyStore((s) => s.visitedAnchors);

  const committedPath = useMemo(() => {
    const anchor = visited.find((a) => a.startsWith(COMMIT_PREFIX));
    return anchor
      ? (DECISION_PATHS.find((p) => p.id === anchor.slice(COMMIT_PREFIX.length)) ?? null)
      : null;
  }, [visited]);

  return (
    <section
      aria-label="The decision engine — one situation, three paths, one commitment"
      className="flex w-full flex-col items-center gap-section-y px-gutter py-section-y"
    >
      <div className="flex max-w-measure flex-col items-center gap-measure-gap text-center">
        <p className="font-display text-display-md text-paper-100">{ENGINE_CAPTION_1}</p>
        <p className="font-display text-headline text-paper-100/60">{ENGINE_CAPTION_2}</p>
        <p className="text-body-sm text-paper-100/70">{SCENARIO.briefing}</p>
        <p className="text-body-sm text-paper-100/50">{SCENARIO.instruction}</p>
      </div>

      <div className="flex w-full max-w-measure flex-col gap-4">
        <h3 className="text-eyebrow uppercase text-paper-100/40">The evidence</h3>
        <ol className="flex w-full flex-col gap-4">
          {DECISION_EVIDENCE.map((evidence) => (
            <li key={evidence.id}>
              <details
                className="group rounded-xl border border-paper-100/10 bg-ink-900/50 px-5 py-4 open:border-ember-600/40"
                onToggle={(event) => {
                  if ((event.target as HTMLDetailsElement).open) {
                    markVisited(`de:evidence:${evidence.id}`);
                  }
                }}
              >
                <summary className="flex min-h-[44px] cursor-pointer list-none items-baseline justify-between gap-4">
                  <span className="text-body font-medium text-paper-100">
                    <span className="mr-3 text-paper-100/35">
                      {String(evidence.order).padStart(2, '0')}
                    </span>
                    {evidence.title}
                  </span>
                  <span className="text-right text-body-sm text-paper-100/50 group-open:hidden">
                    {evidence.whisper}
                  </span>
                  <span className="sr-only">Read the evidence</span>
                </summary>
                <p className="pb-1 pt-2 text-body-sm text-paper-100/70">{evidence.body}</p>
              </details>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex w-full max-w-measure flex-col gap-4">
        <h3 className="text-eyebrow uppercase text-paper-100/40">
          Three paths · none of them clean
        </h3>
        <ul className="flex w-full flex-col gap-4">
          {DECISION_PATHS.map((path) => {
            const isChosen = committedPath?.id === path.id;
            return (
              <li key={path.id}>
                <details
                  className="group rounded-xl border border-paper-100/10 bg-ink-900/50 px-5 py-4 open:border-ember-600/40"
                  open={isChosen}
                >
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-baseline justify-between gap-4">
                    <span className="text-body font-medium text-paper-100">
                      {path.title}
                      {isChosen ? (
                        <span className="ml-3 text-eyebrow uppercase text-ember-300/90">
                          decided
                        </span>
                      ) : null}
                    </span>
                    <span className="text-right text-body-sm text-paper-100/50 group-open:hidden">
                      {path.stance}
                    </span>
                    <span className="sr-only">Weigh this path</span>
                  </summary>

                  <div className="flex flex-col gap-3 pb-1 pt-2">
                    <p className="text-body-sm text-paper-100/80">{path.detail}</p>
                    <p className="text-body-sm text-paper-100/70">{path.accept}</p>
                    <p className="text-body-sm text-paper-100/70">{path.unknown}</p>

                    {committedPath ? (
                      isChosen ? (
                        <>
                          <p className="mt-1 text-caption text-ember-300/90">
                            Decided — there is no undo in a live business, only consequences.
                          </p>
                          <ol className="mt-2 flex flex-col gap-3">
                            {path.stages.map((stage) => (
                              <li key={stage.kind}>
                                <p className="text-eyebrow uppercase text-ember-300/80">
                                  {CONSEQUENCE_KIND_LABELS[stage.kind]}
                                </p>
                                <p className="mt-1 text-body-sm text-paper-100/80">{stage.text}</p>
                              </li>
                            ))}
                          </ol>
                          <div className="mt-3 flex flex-col gap-2 rounded-xl border border-ember-600/30 bg-ink-900/60 p-4">
                            <p className="text-body text-paper-100/85">{REFLECTION_LINES[0]}</p>
                            <p className="text-body-sm text-paper-100/60">{REFLECTION_LINES[1]}</p>
                          </div>
                        </>
                      ) : (
                        <p className="mt-1 text-caption text-paper-100/45">
                          Not taken. Its trade-offs stay named, as every honest option deserves.
                        </p>
                      )
                    ) : (
                      <button
                        type="button"
                        onClick={() => markVisited(`${COMMIT_PREFIX}${path.id}`)}
                        className="mt-1 inline-flex min-h-[44px] items-center self-start rounded-full bg-ember-700 px-4 text-body-sm text-paper-50 transition-colors duration-ui ease-standard hover:bg-ember-600"
                      >
                        Commit to “{path.title}” — no undo
                      </button>
                    )}
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="max-w-measure text-center text-body-sm text-paper-100/50">
        {committedPath
          ? `Decided: ${committedPath.title}. The business carries your trade-off now — and the future waits in the next chapter.`
          : 'Commit one path to see what the business does with it. There was never a perfect answer — that is the lesson this chapter keeps.'}
      </p>
    </section>
  );
}
