import { SiteShell } from '@/components/layout/SiteShell';
import { OpeningFrame } from '@/components/opening/OpeningFrame';

/**
 * `/` — the threshold (SPEC-003 Opening). The ink surface is the authored
 * dark of the first frame; everything above it ships as semantic HTML, so
 * the story's opening line exists before a single script runs (ER-1).
 */
export default function HomePage() {
  return (
    <SiteShell surface="ink">
      <OpeningFrame />
    </SiteShell>
  );
}
