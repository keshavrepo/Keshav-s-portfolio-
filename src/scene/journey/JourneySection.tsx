import { JourneyRoot } from './JourneyRoot';

/**
 * Server seam for the whole journey (SCENE-001 ∪ SCENE-002). Server-renders
 * the client root so the semantic floor — every word the story contains —
 * is present in the first HTML (ARCHITECTURE §11 hydration law).
 */
export function JourneySection() {
  return <JourneyRoot />;
}
