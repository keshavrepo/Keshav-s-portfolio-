'use client';

import { useLane } from '@/core/lane/lane-provider';
import { LANES, type Lane } from '@/core/lane/types';
import { cn } from '@/lib/cn';

const LANE_LABELS: Record<Lane, string> = {
  cinematic: 'Cinematic',
  stills: 'Stills',
  express: 'Express',
  semantic: 'Semantic',
};

/**
 * The visitor's fidelity control — four tellings, one story (SPEC-003), with
 * "auto" as the honest default. Every choice is consequential: the provider
 * coerces only what the device cannot honor (ARCHITECTURE §11).
 */
export function LaneSwitcher() {
  const { lane, defaultLane, override, setOverride } = useLane();

  const optionClass = (active: boolean) =>
    cn(
      'min-h-[44px] rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-ui ease-standard',
      active ? 'bg-ember-700 text-paper-50' : 'opacity-60 hover:opacity-100',
    );

  return (
    <div
      role="group"
      aria-label="Experience mode — one story, four tellings"
      className="flex flex-wrap items-center gap-1 rounded-full border border-current p-1"
    >
      <button
        type="button"
        aria-pressed={override === null}
        onClick={() => setOverride(null)}
        className={optionClass(override === null)}
        title={override === null ? `Auto — currently ${LANE_LABELS[defaultLane]}` : 'Auto'}
      >
        Auto
      </button>
      {LANES.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={override === option}
          onClick={() => setOverride(option)}
          className={optionClass(override === option)}
          title={
            override === option && lane !== option ? `Clamped to ${LANE_LABELS[lane]}` : undefined
          }
        >
          {LANE_LABELS[option]}
        </button>
      ))}
    </div>
  );
}
