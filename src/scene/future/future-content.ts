/**
 * Chapter Six content (SCENE-007): The Future — the final story chapter.
 * Not achievements, not awards, not ego: vision. Very few words, and the
 * ones that exist are load-bearing. The claim of the Opening returns as
 * the first beat (IR-45 reuse, the loop closing in its own words), and
 * the last line is the whole portfolio said in one breath.
 *
 * The beats ride the final runway segment (f): each line earns its
 * threshold, holds, and hands over. The final line stays — the ending
 * should make the visitor stop scrolling, so nothing is allowed to
 * out-shine it.
 */
export interface FutureBeat {
  threshold: number;
  lines: readonly string[];
  /** Display size: the build shrinks to the single largest line. */
  scale: 'headline' | 'display-md' | 'display-lg';
}

export const FUTURE_BEATS: readonly FutureBeat[] = [
  {
    threshold: 0.06,
    lines: ['Every business has problems.'],
    scale: 'display-md',
  },
  {
    threshold: 0.28,
    lines: ['You watched one get understood —', 'station by station, decision by decision.'],
    scale: 'headline',
  },
  {
    threshold: 0.5,
    lines: [
      'The next one is already out there.',
      'A queue doubling. A launch drifting. A room about to argue three ways.',
    ],
    scale: 'headline',
  },
  {
    threshold: 0.7,
    lines: ['I want to be in that room.'],
    scale: 'display-lg',
  },
  {
    threshold: 0.88,
    lines: ['Keshav Choudhary — Business Analyst.', 'Bring me a problem worth a universe.'],
    scale: 'display-md',
  },
] as const;

/** The ember's answer when the visitor reaches out one last time. */
export const EMBER_ANSWER = 'The listening continues.';

export function futureBeatFor(f: number): number {
  let beat = -1;
  FUTURE_BEATS.forEach((b, i) => {
    if (f >= b.threshold) beat = i;
  });
  return beat;
}
