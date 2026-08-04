'use client';

import dynamic from 'next/dynamic';

import { StaticNeuron } from '@/scene/opening/StaticNeuron';

/**
 * The shared universe (SCENE-002's seamless law). ONE canvas for every
 * chapter: the neuron field dissolves as the mind world reveals in the same
 * shader language, so the visitor never crosses a page boundary and never
 * watches a loader. Three.js arrives as its own chunk (ARCHITECTURE §13);
 * until it lands, the static ember carries the story.
 */
const JourneyCanvasR3F = dynamic(() => import('./JourneyCanvasR3F'), {
  ssr: false,
  loading: () => <StaticNeuron />,
});

export function JourneyCanvas() {
  return <JourneyCanvasR3F />;
}
