'use client';

import { cn } from '@/lib/cn';
import { CascadeReveal, MaskReveal, SplitLines, Step } from '@/scene/cinema';

import type { BusinessCase, CaseStageId } from './business-case';
import { CASE_STAGES } from './business-case';

/**
 * CaseStudy — the presentation grammar for a BusinessCase (SPRINT 3).
 * Typography-led by law: stages read as an analyst's dossier — numbered
 * eyewitness labels, editorial body, one accent rail reserved for THE
 * DECISION (the moment of agency; the one-ember law in evidence form),
 * and an impact row of tabular numerals (IR-35 — figures must spot-check
 * instantly).
 *
 * Every stage is a MaskReveal (view drive, once): the dossier paces
 * itself like the story taught it to. SSR is the complete semantic
 * document — the reveals only pace the sighted telling.
 *
 * Adoption: mounts wherever the casebook surfaces (the Problem Room's
 * chapter and post-story furniture); no case content ships this sprint —
 * the first case arrives with its chapter (V2 backlog PR-04).
 */

function StageEyebrow({ index, label }: { index: number; label: string }): JSX.Element {
  return (
    <p className="v2-eyebrow">
      <span className="font-figure" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
      {'  ·  '}
      {label}
    </p>
  );
}

function StageProse({ children }: { children: string }): JSX.Element {
  return <p className="v2-editorial text-ink-700">{children}</p>;
}

export function CaseStudy({
  kase,
  className,
}: {
  kase: BusinessCase;
  className?: string;
}): JSX.Element {
  return (
    <article className={cn('v2-field', className)} aria-labelledby={`case-${kase.id}-title`}>
      <header className="v2-spread my-spread-y">
        <div className="v2-span-exhibit flex flex-col gap-measure-gap">
          <p className="v2-eyebrow">
            Case Study · {kase.domain}
            {kase.timeframe ? ` · ${kase.timeframe}` : ''}
          </p>
          <SplitLines text={kase.title} as="h2" className="v2-hero" id={`case-${kase.id}-title`} />
        </div>
      </header>

      <div className="v2-spread">
        <div className="v2-span-body flex flex-col gap-spread-y">
          {CASE_STAGES.map((stage, index) => (
            <CaseSection key={stage.id} kase={kase} stage={stage.id} index={index} />
          ))}
        </div>
      </div>
    </article>
  );
}

function CaseSection({
  kase,
  stage,
  index,
}: {
  kase: BusinessCase;
  stage: CaseStageId;
  index: number;
}): JSX.Element {
  const label = CASE_STAGES[index].label;

  if (stage === 'decision') {
    /* The moment of agency: the dossier's only accent rail. */
    return (
      <MaskReveal>
        <section className="flex flex-col gap-measure-gap border-l-2 border-ember-600 pl-gutter">
          <StageEyebrow index={index} label={label} />
          <p className="max-w-measure font-display text-display-md text-ink-900">{kase.decision}</p>
        </section>
      </MaskReveal>
    );
  }

  if (stage === 'businessImpact') {
    return (
      <MaskReveal>
        <section className="flex flex-col gap-measure-gap">
          <StageEyebrow index={index} label={label} />
          <p className="v2-editorial text-ink-700">{kase.businessImpact.outcome}</p>
          <CascadeReveal className="mt-measure-gap grid gap-measure-gap sm:grid-cols-3">
            {kase.businessImpact.metrics.map((metric, i) => (
              <Step key={metric.label} i={i} className="flex flex-col gap-1">
                <span className="font-figure text-display-lg text-ink-900">{metric.value}</span>
                <span className="text-caption text-ink-600">{metric.label}</span>
              </Step>
            ))}
          </CascadeReveal>
        </section>
      </MaskReveal>
    );
  }

  if (stage === 'lessonsLearned') {
    return (
      <MaskReveal>
        <section className="flex flex-col gap-measure-gap">
          <StageEyebrow index={index} label={label} />
          <ul className="flex flex-col gap-measure-gap">
            {kase.lessonsLearned.map((lesson) => (
              <li key={lesson.slice(0, 24)} className="v2-editorial flex gap-2 text-ink-700">
                <span className="text-ember-700" aria-hidden="true">
                  —
                </span>
                {lesson}
              </li>
            ))}
          </ul>
        </section>
      </MaskReveal>
    );
  }

  return (
    <MaskReveal>
      <section className="flex flex-col gap-measure-gap">
        <StageEyebrow index={index} label={label} />
        <StageProse>{kase[stage]}</StageProse>
      </section>
    </MaskReveal>
  );
}
