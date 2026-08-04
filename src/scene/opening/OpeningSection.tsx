import { OpeningExperience } from './OpeningExperience';

/**
 * Server seam for the Opening (SCENE-001). Server-renders the client root so
 * the semantic floor — every word the story contains — is present in the
 * first HTML (ARCHITECTURE §11 hydration law, SCENE-001 no-JS requirement).
 */
export function OpeningSection() {
  return <OpeningExperience />;
}
