import Link from 'next/link';

import { Text } from '@/components/text/Text';
import { site } from '@/core/config/site';
import { cn } from '@/lib/cn';

import type { Surface } from './SiteShell';

/**
 * Minimal banner (ARCHITECTURE §17): identity on the left, the discipline's
 * name on the right. No navigation furniture inside the fiction (PC-16).
 */
export function SiteHeader({ surface }: { surface: Surface }) {
  const ink = surface === 'ink';
  return (
    <header
      className={cn(
        'flex items-center justify-between px-gutter py-5',
        ink ? 'text-paper-100' : 'text-ink-900',
      )}
    >
      <Link
        href="/"
        className="rounded-sm text-sm font-medium tracking-[0.18em]"
        aria-label={`${site.owner} — home`}
        data-cursor="door"
      >
        {site.owner.toUpperCase()}
      </Link>
      <Text variant="eyebrow" className={ink ? 'text-paper-100/60' : 'text-ink-600'}>
        {site.role}
      </Text>
    </header>
  );
}
