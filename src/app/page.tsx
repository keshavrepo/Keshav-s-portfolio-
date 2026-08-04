import { SiteShell } from '@/components/layout/SiteShell';
import { OpeningSection } from '@/scene/opening/OpeningSection';

/**
 * `/` — the threshold (SPEC-003 Opening; SCENE-001). The ink surface is the
 * authored dark of the first contact; the semantic floor ships as HTML, so
 * the story's opening line exists before a single script runs (ER-1).
 */
export default function HomePage() {
  return (
    <SiteShell surface="ink">
      <OpeningSection />
    </SiteShell>
  );
}
