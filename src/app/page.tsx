import { SiteShell } from '@/components/layout/SiteShell';
import { JourneySection } from '@/scene/journey/JourneySection';

/**
 * `/` — the journey so far: the threshold (SCENE-001) diving seamlessly
 * into the mind (SCENE-002). One universe, one clock; the semantic floor
 * ships as HTML so the story exists before a single script runs (ER-1).
 */
export default function HomePage() {
  return (
    <SiteShell surface="ink">
      <JourneySection />
    </SiteShell>
  );
}
