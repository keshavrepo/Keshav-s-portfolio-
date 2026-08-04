'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { useJourneyStore } from '@/core/state/journey-store';
import { cn } from '@/lib/cn';
import { useJourneyScene } from '@/scene/journey/journey-context';
import { ThoughtCard } from '@/scene/journey/ThoughtCard';
import { useScheduler } from '@/scene/journey/use-scheduler';

import {
  CONSEQUENCE_KIND_LABELS,
  DECISION_EVIDENCE,
  DECISION_PATHS,
  ENGINE_CAPTION_1,
  ENGINE_CAPTION_2,
  REFLECTION_LINES,
  SCENARIO,
  type DecisionPath,
} from './decision-content';
import { engineBeats } from './decision-machine';

const COMMIT_PREFIX = 'de:committed:';

/**
 * The Decision Engine, DOM half (SCENE-005): the visitor becomes the
 * Business Analyst. Evidence is earned by scroll and read in any order
 * (exploration, hesitation allowed — nothing here is a quiz); the three
 * paths open only after all four pieces are read; commitment holds the
 * room in the locked suspense beat, locks forever (no undo in a live
 * business), and then the consequences are told stage by stage, exactly
 * in step with the ripple crossing the universe behind the words.
 */
export function EngineOverlay({
  evidenceCount,
  pathsArrived,
}: {
  evidenceCount: number;
  pathsArrived: boolean;
}) {
  const { chapter, engineRef } = useJourneyScene();
  const markVisited = useJourneyStore((s) => s.markVisited);
  const visited = useJourneyStore((s) => s.visitedAnchors);

  const committedId = useMemo(
    () => visited.find((a) => a.startsWith(COMMIT_PREFIX))?.slice(COMMIT_PREFIX.length) ?? null,
    [visited],
  );

  const [openDoc, setOpenDoc] = useState<string | null>(null); // `ev-*` or `path-*`
  const [committingPath, setCommittingPath] = useState<string | null>(null);
  const [stageIndex, setStageIndex] = useState(-1);
  const [reflected, setReflected] = useState(false);

  const { schedule, clear: clearTimers } = useScheduler();

  const committedPath = useMemo(
    () => (committedId ? (DECISION_PATHS.find((p) => p.id === committedId) ?? null) : null),
    [committedId],
  );

  const readCount = DECISION_EVIDENCE.filter((e) => visited.includes(`de:evidence:${e.id}`)).length;
  const allRead = readCount === DECISION_EVIDENCE.length;

  /* Consequence staging — scheduled against the shared consequence clock
     (works for a fresh commit and for a returning visitor's replay). */
  useEffect(() => {
    if (!committedPath) return;
    const elapsed = Math.max(0, performance.now() - engineRef.current.clockAt);
    committedPath.stages.forEach((stage, index) => {
      if (elapsed >= stage.atMs) setStageIndex(index);
      else schedule(() => setStageIndex(index), stage.atMs - elapsed);
    });
    const lastAt = committedPath.stages[committedPath.stages.length - 1].atMs + 2400;
    if (elapsed >= lastAt) setReflected(true);
    else
      schedule(() => {
        setReflected(true);
        markVisited('de:reflected');
      }, lastAt - elapsed);
  }, [committedPath, engineRef, schedule, markVisited]);

  const openEvidence = useCallback(
    (id: string) => {
      setOpenDoc(`ev-${id}`);
      markVisited(`de:evidence:${id}`);
    },
    [markVisited],
  );

  const commit = useCallback(
    (path: DecisionPath) => {
      if (committedId || committingPath) return; // the lock law: one decision
      setCommittingPath(path.id);
      schedule(() => {
        markVisited(`${COMMIT_PREFIX}${path.id}`);
        engineRef.current.choice = path.id;
        engineRef.current.clockAt = performance.now();
        setCommittingPath(null);
        setOpenDoc(null);
      }, engineBeats.suspenseMs);
    },
    [committedId, committingPath, engineRef, markVisited, schedule],
  );

  useEffect(() => () => clearTimers(), [clearTimers]);

  const activeEvidence = openDoc?.startsWith('ev-')
    ? DECISION_EVIDENCE.find((e) => e.id === openDoc.slice(3))
    : null;
  const activePath = openDoc?.startsWith('path-')
    ? DECISION_PATHS.find((p) => p.id === openDoc.slice(5))
    : null;

  const pending = committingPath !== null;
  const showPreDecision = chapter === 'engine' && !committedPath;
  const showOutcomes = chapter === 'engine' && committedPath !== null;
  const currentStage = committedPath && stageIndex >= 0 ? committedPath.stages[stageIndex] : null;

  return (
    <>
      {/* Arrival caption — the thesis, then it recedes on time. */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-measure-gap px-gutter text-center">
        <p className="de-arrival font-display text-display-md text-paper-100">{ENGINE_CAPTION_1}</p>
        <p className="de-arrival font-display text-headline text-paper-100/60">
          {ENGINE_CAPTION_2}
        </p>
      </div>

      {/* ── Before the decision: brief, evidence, paths. ─────────────── */}
      {showPreDecision ? (
        <div className="max-md:flex-col max-md:justify-start pointer-events-none absolute inset-0 z-20 flex items-start justify-between gap-6 overflow-y-auto px-gutter pb-8 pt-[18svh] md:items-center">
          <div className="pointer-events-auto w-full max-w-sm">
            <p className="text-eyebrow uppercase text-paper-100/40">
              One situation · six weeks · the whole business is listening
            </p>
            <h2 className="mt-2 font-display text-headline text-paper-100">{SCENARIO.title}</h2>
            <p className="mt-3 text-body-sm leading-relaxed text-paper-100/70">
              {SCENARIO.briefing}
            </p>
            <p className="mt-2 text-body-sm leading-relaxed text-paper-100/50">
              {SCENARIO.instruction}
            </p>

            <ul className="mt-6 flex flex-col gap-2">
              {DECISION_EVIDENCE.map((evidence) => {
                const arrived = evidence.order <= evidenceCount;
                const read = visited.includes(`de:evidence:${evidence.id}`);
                return (
                  <li key={evidence.id}>
                    <button
                      type="button"
                      disabled={!arrived}
                      aria-label={
                        arrived
                          ? `Evidence ${evidence.order}: ${evidence.title}. ${evidence.whisper}`
                          : `Evidence ${evidence.order} arrives as you scroll`
                      }
                      onClick={() => openEvidence(evidence.id)}
                      className={cn(
                        'flex min-h-[44px] w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-state ease-standard',
                        arrived
                          ? 'border-paper-100/15 bg-ink-900/60 hover:border-ember-500/50'
                          : 'cursor-default border-paper-100/5 opacity-35',
                      )}
                    >
                      <span>
                        <span className="block text-eyebrow uppercase text-paper-100/40">
                          Evidence {String(evidence.order).padStart(2, '0')}
                          {read ? ' · read' : ''}
                        </span>
                        <span className="mt-1 block text-body-sm text-paper-100/85">
                          {arrived ? evidence.title : 'Arrives as you scroll'}
                        </span>
                      </span>
                      {arrived && !read ? (
                        <span className="size-2 shrink-0 animate-pulse rounded-full bg-ember-400" />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {pathsArrived && allRead ? (
            <div className="pointer-events-auto w-full max-w-sm animate-enter-rise">
              <p className="text-eyebrow uppercase text-paper-100/40">
                Three paths · none of them clean
              </p>
              <ul className="mt-3 flex flex-col gap-3">
                {DECISION_PATHS.map((path) => (
                  <li
                    key={path.id}
                    className="rounded-xl border border-paper-100/15 bg-ink-900/60 p-4"
                  >
                    <p className="text-body font-medium text-paper-100">{path.title}</p>
                    <p className="mt-1 text-body-sm text-paper-100/65">{path.stance}</p>
                    <button
                      type="button"
                      onClick={() => setOpenDoc(`path-${path.id}`)}
                      className="mt-3 inline-flex min-h-[44px] items-center rounded-full border border-paper-100/20 px-4 text-body-sm text-paper-100/80 transition-colors duration-ui ease-standard hover:border-ember-400/60 hover:text-paper-100"
                    >
                      Weigh this path
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="pointer-events-auto w-full max-w-sm text-caption leading-snug text-paper-100/40">
              {allRead
                ? 'The paths open as you scroll on. The decision can wait — it cannot be delegated.'
                : `Read every piece of evidence — ${readCount} of ${DECISION_EVIDENCE.length}. A decision made unread is just a guess.`}
            </p>
          )}
        </div>
      ) : null}

      {/* ── After the lock: the consequences, told as they land. ─────── */}
      {showOutcomes && committedPath ? (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-end px-gutter pb-10 md:items-center">
          <div className="pointer-events-auto w-full max-w-measure">
            <p className="text-eyebrow uppercase text-paper-100/40">
              Decided: {committedPath.title} · there is no undo in a live business
            </p>
            <ol className="mt-4 flex flex-col gap-3">
              {committedPath.stages.map((stage, index) =>
                index <= stageIndex ? (
                  <li
                    key={stage.kind}
                    className={cn(
                      'max-w-measure',
                      index === stageIndex ? 'animate-enter-rise' : 'opacity-45',
                    )}
                  >
                    <p className="text-eyebrow uppercase text-ember-300/80">
                      {CONSEQUENCE_KIND_LABELS[stage.kind]}
                    </p>
                    <p className="mt-1 text-body-sm leading-relaxed text-paper-100/85">
                      {stage.text}
                    </p>
                  </li>
                ) : null,
              )}
            </ol>

            {reflected ? (
              <div className="mt-6 flex max-w-measure animate-enter-rise flex-col gap-2">
                <p className="text-body text-paper-100/85">{REFLECTION_LINES[0]}</p>
                <p className="text-body-sm text-paper-100/60">{REFLECTION_LINES[1]}</p>
                <p className="mt-2 text-caption text-paper-100/45">
                  Your trade-offs were named out loud:{' '}
                  {committedPath.accept.replace('You accept: ', '')}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* The evidence, read closely. */}
      {activeEvidence ? (
        <ThoughtCard
          label={`Evidence ${activeEvidence.order}: ${activeEvidence.title}`}
          kicker={`Evidence ${String(activeEvidence.order).padStart(2, '0')} · ${activeEvidence.title}`}
          onClose={() => setOpenDoc(null)}
        >
          <p className="text-body-sm">{activeEvidence.body}</p>
        </ThoughtCard>
      ) : null}

      {/* The path, weighed — and committed, once. */}
      {activePath ? (
        <ThoughtCard
          label={`${activePath.title} — weighed`}
          kicker={`${activePath.title} · one of three paths`}
          onClose={() => setOpenDoc(null)}
          actions={
            <button
              type="button"
              disabled={pending || committedId !== null}
              onClick={() => commit(activePath)}
              className="inline-flex min-h-[44px] items-center rounded-full bg-ember-700 px-4 text-body-sm text-paper-50 transition-colors duration-ui ease-standard hover:bg-ember-600 disabled:cursor-wait disabled:opacity-60"
            >
              {pending ? 'The room goes quiet…' : `Commit to “${activePath.title}” — no undo`}
            </button>
          }
        >
          <p className="text-body-sm">{activePath.detail}</p>
          <p className="mt-3 text-body-sm text-paper-100/75">{activePath.accept}</p>
          <p className="mt-2 text-body-sm text-paper-100/75">{activePath.unknown}</p>
          {pending ? (
            <p className="mt-3 text-caption text-ember-300/80">
              Committing — the decision is being locked. This is what responsibility feels like.
            </p>
          ) : null}
        </ThoughtCard>
      ) : null}

      {/* Chapter-scoped telling for visitors who cannot see the stage. */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {pending
          ? 'The room goes quiet. The decision is being locked.'
          : currentStage
            ? `${CONSEQUENCE_KIND_LABELS[currentStage.kind]}. ${currentStage.text}`
            : ''}
      </div>
    </>
  );
}
