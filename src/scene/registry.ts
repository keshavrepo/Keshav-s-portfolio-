import type { Lane } from '@/core/lane/types';

import type { ChapterId } from './chapters';

/**
 * Scene registry (ARCHITECTURE §8). A scene announces its hosts per lane,
 * its entrance budget, and its chapter. The Opening is live (SCENE-001):
 * WebGL for the cinematic telling, CSS for the other three. Richer chapters
 * register as their scene phases land.
 */
export type SceneHost = 'css' | 'canvas2d' | 'webgl';

export interface SceneManifest {
  chapterId: ChapterId;
  host: SceneHost;
  lanes: readonly Lane[];
  entranceBudgetMs: number;
}

const REGISTRY: readonly SceneManifest[] = [
  { chapterId: 'opening', host: 'webgl', lanes: ['cinematic'], entranceBudgetMs: 1000 },
  {
    chapterId: 'opening',
    host: 'css',
    lanes: ['stills', 'express', 'semantic'],
    entranceBudgetMs: 1000,
  },
  { chapterId: 'mind', host: 'webgl', lanes: ['cinematic'], entranceBudgetMs: 1800 },
  {
    chapterId: 'mind',
    host: 'css',
    lanes: ['stills', 'express', 'semantic'],
    entranceBudgetMs: 1800,
  },
] as const;

export function getSceneManifests(chapterId: ChapterId): readonly SceneManifest[] {
  return REGISTRY.filter((entry) => entry.chapterId === chapterId);
}

export function listScenes(): readonly SceneManifest[] {
  return REGISTRY;
}
