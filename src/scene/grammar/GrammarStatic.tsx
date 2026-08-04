'use client';

import { useState } from 'react';

import { useJourneyStore } from '@/core/state/journey-store';
import { cn } from '@/lib/cn';

import {
  CIRCUIT_NAMES,
  GRAMMAR_CAPTION_1,
  GRAMMAR_CAPTION_2,
  GRAMMAR_STAGES,
  IMPACT_FIGURES,
  TRADEOFF_OPTIONS,
  WHY_LADDER,
} from './grammar-content';

/**
 * The process as a document (SCENE-003 stills/express/semantic lanes):
 * every station, every why, every figure — identical content to the
 * cinematic world, told in typography. The earned acts stay earned: the
 * trade-off has a choice, the decision has a commit button, and the impact
 * figures wait for it.
 */
export function GrammarStatic() {
  const markVisited = useJourneyStore((s) => s.markVisited);
  const visited = useJourneyStore((s) => s.visitedAnchors);
  const [tradeoff, setTradeoff] = useState<string | null>(null);
  const committed = visited.includes('gm:decision:committed');

  return (
    <section
      aria-label="Business thinking evolution — one real case through ten stations"
      className="flex w-full flex-col items-center gap-section-y px-gutter py-section-y"
    >
      <div className="flex max-w-measure flex-col items-center gap-measure-gap text-center">
        <p className="font-display text-display-md text-paper-100">{GRAMMAR_CAPTION_1}</p>
        <p className="font-display text-headline text-paper-100/60">{GRAMMAR_CAPTION_2}</p>
      </div>

      <ol className="flex w-full max-w-measure flex-col gap-4">
        {GRAMMAR_STAGES.map((stage) => {
          const impactLocked = stage.id === 'impact' && !committed;
          return (
            <li key={stage.id} id={`stage-${stage.id}`}>
              <details className="group rounded-xl border border-paper-100/10 bg-ink-900/50 px-5 py-4 open:border-ember-600/40">
                <summary className="flex min-h-[44px] cursor-pointer list-none items-baseline justify-between gap-4">
                  <span className="text-body font-medium text-paper-100">
                    <span className="mr-3 text-paper-100/35">
                      {String(stage.order).padStart(2, '0')}
                    </span>
                    {stage.title}
                  </span>
                  <span className="text-body-sm text-paper-100/50 group-open:hidden">
                    {stage.whisper}
                  </span>
                  <span className="sr-only">Expand the reasoning</span>
                </summary>

                <div className="flex flex-col gap-3 pb-1 pt-2">
                  <p className="text-caption uppercase tracking-[0.14em] text-paper-100/40">
                    {CIRCUIT_NAMES[stage.circuit]}
                  </p>
                  <p className="text-body-sm text-paper-100/80">{stage.stageLine}</p>

                  {impactLocked ? (
                    <p className="text-body-sm text-ember-300/80">
                      Commit the decision above to reveal what happened.
                    </p>
                  ) : stage.id === 'root-cause' ? (
                    <ol className="ml-4 flex list-decimal flex-col gap-1 text-body-sm text-paper-100/70">
                      {WHY_LADDER.map((why) => (
                        <li key={why}>{why}</li>
                      ))}
                    </ol>
                  ) : stage.id === 'tradeoffs' ? (
                    <>
                      <p className="text-body-sm text-paper-100/70">{stage.reasoning}</p>
                      <div className="mt-1 flex flex-wrap gap-3">
                        {TRADEOFF_OPTIONS.map((option) => (
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
                        ))}
                      </div>
                      <p className="text-caption text-paper-100/60">
                        {TRADEOFF_OPTIONS.map((o) => `${o.title}: ${o.summary}`).join(' ')}
                      </p>
                    </>
                  ) : stage.id === 'decision' ? (
                    <>
                      <p className="text-body-sm text-paper-100/70">{stage.reasoning}</p>
                      {!committed ? (
                        <button
                          type="button"
                          onClick={() => markVisited('gm:decision:committed')}
                          className="mt-1 inline-flex min-h-[44px] items-center self-start rounded-full bg-ember-700 px-4 text-body-sm text-paper-50 transition-colors duration-ui ease-standard hover:bg-ember-600"
                        >
                          Commit the decision
                        </button>
                      ) : (
                        <p className="text-caption text-ember-300/90">
                          Committed — with a date and a name.
                        </p>
                      )}
                    </>
                  ) : stage.id === 'impact' ? (
                    <>
                      <p className="text-body-sm text-paper-100/70">{stage.reasoning}</p>
                      <div className="mt-3 flex flex-wrap gap-6">
                        {IMPACT_FIGURES.map((figure) => (
                          <div key={figure.label}>
                            <p className="font-figure text-display-md text-ember-300">
                              {figure.value}
                            </p>
                            <p className="mt-1 text-caption text-paper-100/60">{figure.label}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <p className="text-body-sm text-paper-100/70">{stage.reasoning}</p>
                  )}
                </div>
              </details>
            </li>
          );
        })}
      </ol>

      <p className="text-eyebrow uppercase text-paper-100/40">
        The process is complete · the problem room follows in the next chapter
      </p>
    </section>
  );
}
