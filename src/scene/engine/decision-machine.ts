import { motionDurations, motionBounds } from '@/design-system/tokens';
import { getChapter } from '@/scene/chapters';

/**
 * The Decision Engine's beats (SCENE-005). The suspense hold — the room
 * going quiet between commitment and consequence — rides the locked
 * Chapter Five envelope (SPEC-003/R-59/S59: 1500–2000ms), and the dev
 * assert below keeps it inside forever.
 */
export const engineBeats = {
  /** decision lock hold — the room goes quiet before the world answers */
  suspenseMs: motionDurations.suspense,
  /** stage stagger lives in decision-content (atMs per stage) */
  /** evidence is earned by scroll; paths open only after all four are read */
  pathsThresholdW: 0.62,
} as const;

/** Scroll fraction of the universe third at which the world may pause. */
export const ENGINE_TRIGGER_U = 0.985;

if (process.env.NODE_ENV !== 'production') {
  const bound = getChapter('decision-engine').beats?.suspense ?? motionBounds.suspense;
  if (engineBeats.suspenseMs < bound[0] || engineBeats.suspenseMs > bound[1]) {
    console.error('[engine] suspense hold violates the locked Chapter Five envelope.');
  }
}
