import Link from 'next/link';

import { SiteShell } from '@/components/layout/SiteShell';
import { Text } from '@/components/text/Text';

/**
 * 404 — spoken in the house voice: precise, warm, never clever at the
 * visitor's expense (tone-of-voice law, SPEC-001 §11).
 */
export default function NotFound() {
  return (
    <SiteShell>
      <section className="flex flex-1 flex-col items-center justify-center gap-measure-gap px-gutter py-section-y text-center">
        <Text variant="eyebrow" className="text-ink-600">
          404 — Off the map
        </Text>
        <Text as="h1" variant="display" className="max-w-narrow">
          This page doesn&rsquo;t exist. Ambiguity is where analysis starts.
        </Text>
        <Link
          href="/"
          className="mt-4 inline-flex min-h-[44px] items-center rounded-full bg-ink-900 px-6 py-2 text-body-sm font-medium text-paper-50 transition-colors duration-ui ease-standard hover:bg-ink-800"
        >
          Return to the beginning
        </Link>
      </section>
    </SiteShell>
  );
}
