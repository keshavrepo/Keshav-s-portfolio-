'use client';

import { useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';

import { cn } from '@/lib/cn';

import { DrawLine } from '../cinema/DrawLine';

/**
 * Analytical figures (SPRINT 3 identity layer): the small visual grammar
 * of a Business Analyst — value chains, decision forks, growth loops.
 * They are never décor: each figure is a semantic list first (AT reads
 * the reasoning in order) and a drawn thread second (the eye follows the
 * structure). The thread is the house's Draw (§7 row 4) — the 2D red
 * thread that means continuity, here meaning causality.
 *
 * Engineering law: SSR is list-only (the svg arrives measured); points
 * are measured post-mount and re-measured on ResizeObserver; all strokes
 * ride the kit's gating (present without JS, instant under reduced
 * motion). Numeric labels use tabular figures (IR-35).
 */

interface Anchor {
  cx: number;
  top: number;
  bottom: number;
}

/** Measure every [data-figure-item] anchor, relative to the figure box. */
function useFigureAnchors(): {
  ref: RefObject<HTMLDivElement>;
  anchors: Anchor[];
  viewBox: string;
} {
  const ref = useRef<HTMLDivElement>(null);
  const [anchors, setAnchors] = useState<Anchor[]>([]);
  const [viewBox, setViewBox] = useState('0 0 0 0');

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const measure = (): void => {
      const box = root.getBoundingClientRect();
      if (box.width === 0) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>('[data-figure-item]'));
      setAnchors(
        items.map((el) => {
          const r = el.getBoundingClientRect();
          const cy = r.top - box.top;
          return {
            cx: r.left + r.width / 2 - box.left,
            top: cy,
            bottom: cy + r.height,
          };
        }),
      );
      setViewBox(`0 0 ${Math.round(box.width)} ${Math.round(box.height)}`);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return { ref, anchors, viewBox };
}

/** The thread's quiet arc (px) — causality reads as a lean, not a loop. */
const THREAD_SAG = 16;

function chainPath(from: Anchor, to: Anchor): string {
  const midX = (from.cx + to.cx) / 2;
  const sag = Math.max(from.bottom, to.bottom) + THREAD_SAG;
  return `M ${from.cx} ${from.bottom} Q ${midX} ${sag} ${to.cx} ${to.bottom}`;
}

function forkPath(trunk: Anchor, branch: Anchor): string {
  const midY = (trunk.bottom + branch.top) / 2;
  return `M ${trunk.cx} ${trunk.bottom} C ${trunk.cx} ${midY}, ${branch.cx} ${midY}, ${branch.cx} ${branch.top}`;
}

function loopReturnPath(first: Anchor, last: Anchor, depth: number): string {
  const midX = (first.cx + last.cx) / 2;
  const sag = Math.max(first.bottom, last.bottom) + depth;
  return `M ${last.cx} ${last.bottom} Q ${midX} ${sag} ${first.cx} ${first.bottom}`;
}

/** The loop's closing arrowhead, drawn as one more stroke (8px wings). */
function arrowhead(tip: Anchor): string {
  return `M ${tip.cx - 8} ${tip.bottom + 8} L ${tip.cx} ${tip.bottom} L ${tip.cx + 8} ${tip.bottom + 8}`;
}

const FIGURE_LABEL = 'flex items-baseline gap-2 text-body-sm';

function FigureNumber({ n }: { n: number }): JSX.Element {
  return (
    <span className="font-figure text-caption text-ink-500" aria-hidden="true">
      {String(n).padStart(2, '0')}
    </span>
  );
}

/**
 * FigureChain — the value chain / customer journey: stages in order,
 * threaded by causality.
 */
export function FigureChain({
  steps,
  className,
  live,
}: {
  steps: [string, ...string[]];
  className?: string;
  live?: boolean;
}): JSX.Element {
  const { ref, anchors, viewBox } = useFigureAnchors();

  return (
    <figure ref={ref} className={cn('relative', className)}>
      <ol className="relative flex flex-wrap gap-x-grid-gutter-x gap-y-measure-gap">
        {steps.map((step, i) => (
          <li key={step + i} data-figure-item className={cn(FIGURE_LABEL, 'text-ink-800')}>
            <FigureNumber n={i + 1} />
            {step}
          </li>
        ))}
      </ol>
      <DrawLine
        className="pointer-events-none absolute inset-0 -z-10"
        viewBox={viewBox}
        live={live}
        preserveAspectRatio="none"
      >
        {anchors.slice(0, -1).map((anchor, i) => (
          <path
            key={i}
            d={chainPath(anchor, anchors[i + 1])}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-ink-500"
            strokeLinecap="round"
          />
        ))}
      </DrawLine>
    </figure>
  );
}

/**
 * FigureFork — the decision tree: one situation, the authored paths it
 * could take. The trunk is a statement; the branches are an honest list.
 */
export function FigureFork({
  trunk,
  branches,
  className,
  live,
}: {
  trunk: ReactNode;
  branches: [string, ...string[]];
  className?: string;
  live?: boolean;
}): JSX.Element {
  const { ref, anchors, viewBox } = useFigureAnchors();
  const [trunkAnchor, ...branchAnchors] = anchors;

  return (
    <figure ref={ref} className={cn('relative flex flex-col items-center', className)}>
      <div data-figure-item className="text-body font-medium text-ink-900">
        {trunk}
      </div>
      {/* Branch air is the fork's anatomy — the paths span this gap. */}
      <ul className="relative mt-section-y flex flex-wrap justify-center gap-x-grid-gutter-x gap-y-measure-gap">
        {branches.map((branch, i) => (
          <li key={branch + i} data-figure-item className={cn(FIGURE_LABEL, 'text-ink-800')}>
            <FigureNumber n={i + 1} />
            {branch}
          </li>
        ))}
      </ul>
      <DrawLine
        className="pointer-events-none absolute inset-0 -z-10"
        viewBox={viewBox}
        live={live}
        preserveAspectRatio="none"
      >
        {trunkAnchor &&
          branchAnchors.map((branch, i) => (
            <path
              key={i}
              d={forkPath(trunkAnchor, branch)}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-ink-500"
              strokeLinecap="round"
            />
          ))}
      </DrawLine>
    </figure>
  );
}

/** The growth loop's return leg depth — the loop must read as return. */
const LOOP_DEPTH = 28;

/**
 * FigureLoop — the growth loop: stages as a chain with the return leg
 * drawn back to the first, closing the cycle a strategist watches
 * (attention → orders → revenue → fuel → attention).
 */
export function FigureLoop({
  steps,
  className,
  live,
}: {
  steps: [string, ...string[]];
  className?: string;
  live?: boolean;
}): JSX.Element {
  const { ref, anchors, viewBox } = useFigureAnchors();
  const first = anchors[0];
  const last = anchors[anchors.length - 1];

  return (
    <figure ref={ref} className={cn('relative', className)}>
      <ol className="relative flex flex-wrap gap-x-grid-gutter-x gap-y-measure-gap">
        {steps.map((step, i) => (
          <li key={step + i} data-figure-item className={cn(FIGURE_LABEL, 'text-ink-800')}>
            <FigureNumber n={i + 1} />
            {step}
          </li>
        ))}
      </ol>
      <DrawLine
        className="pointer-events-none absolute inset-0 -z-10"
        viewBox={viewBox}
        live={live}
        preserveAspectRatio="none"
      >
        {anchors.slice(0, -1).map((anchor, i) => (
          <path
            key={i}
            d={chainPath(anchor, anchors[i + 1])}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-ink-500"
            strokeLinecap="round"
          />
        ))}
        {first && last && anchors.length > 1 ? (
          <>
            <path
              d={loopReturnPath(first, last, LOOP_DEPTH)}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-ember-500"
              strokeLinecap="round"
            />
            <path
              d={arrowhead(first)}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-ember-500"
              strokeLinecap="round"
            />
          </>
        ) : null}
      </DrawLine>
    </figure>
  );
}
