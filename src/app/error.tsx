'use client';

import { useEffect } from 'react';

import { SiteShell } from '@/components/layout/SiteShell';
import { Text } from '@/components/text/Text';

/**
 * Route error surface. Failures are owned in the first person of the house,
 * never the visitor's fault (failure-analysis doctrines, SPEC-004 §10).
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[project-k] route error', error);
  }, [error]);

  return (
    <SiteShell>
      <section className="flex flex-1 flex-col items-center justify-center gap-measure-gap px-gutter py-section-y text-center">
        <Text variant="eyebrow" className="text-ink-600">
          An interruption
        </Text>
        <Text as="h1" variant="display" className="max-w-narrow">
          Something interrupted the experience.
        </Text>
        <Text className="max-w-measure text-body text-ink-600">
          The fault is ours, not yours. Recovery is one decision away.
        </Text>
        <button
          type="button"
          onClick={reset}
          className="mt-4 inline-flex min-h-[44px] items-center rounded-full bg-ink-900 px-6 py-2 text-body-sm font-medium text-paper-50 transition-colors duration-ui ease-standard hover:bg-ink-800"
        >
          Try again
        </button>
        {error.digest ? (
          <Text variant="caption" className="text-ink-500">
            Reference: {error.digest}
          </Text>
        ) : null}
      </section>
    </SiteShell>
  );
}
