import type { Lane } from '@/core/lane/types';

import type { ChapterId } from './chapters';

/**
 * Scene registry (ARCHITECTURE §8). A scene announces its host, its lanes,
 * and its entrance budget here. Richer hosts register as scene phases land;
 * the Opening's first-light layer is live now and all seven chapters have
 * their semantic-tier slots reserved by slug in `chapters.ts`.
 */
export type SceneHost = 'css' | 'canvas2d' | 'webgl';

export interface SceneManifest {
  chapterId: ChapterId;
  host: SceneHost;
  lanes: readonly Lane[];
  entranceBudgetMs: number;
}

const REGISTRY: readonly SceneManifest[] = [
  {
    chapterId: 'opening',
    host: 'css',
    lanes: ['cinematic', 'stills', 'express', 'semantic'],
    entranceBudgetMs: 1000,
  },
] as const;

export function getSceneManifest(chapterId: ChapterId): SceneManifest | undefined {
  return REGISTRY.find((entry) => entry.chapterId === chapterId);
}

export function listScenes(): readonly SceneManifest[] {
  return REGISTRY;
}
