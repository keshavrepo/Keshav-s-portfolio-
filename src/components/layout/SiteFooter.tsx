import { Text } from '@/components/text/Text';
import { env } from '@/core/config/env';
import { site } from '@/core/config/site';
import { cn } from '@/lib/cn';

import { LaneSwitcher } from './LaneSwitcher';
import type { Surface } from './SiteShell';

/**
 * Utility furniture lives here, outside the fiction (ARCHITECTURE §17,
 * PC-16). The contact affordance renders only when an address exists — a
 * control ships only when its consequence works (§8 consequence law).
 */
export function SiteFooter({ surface }: { surface: Surface }) {
  const ink = surface === 'ink';
  const contactEmail = env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <footer
      className={cn(
        'flex flex-col items-center justify-between gap-6 border-t px-gutter py-8 sm:flex-row',
        ink ? 'border-paper-100/10 text-paper-100/70' : 'border-ink-900/10 text-ink-600',
      )}
    >
      <Text variant="caption">
        © 2026 {site.owner} — {site.role}
      </Text>
      <LaneSwitcher />
      {contactEmail ? (
        /* The real door: the Draw underline (§7 row 4), focus ring intact,
           44px target (S5). */
        <a
          href={`mailto:${contactEmail}`}
          className="v2-linkline inline-flex min-h-[44px] items-center rounded-sm px-1 text-caption"
          data-cursor="door"
        >
          {contactEmail}
        </a>
      ) : null}
    </footer>
  );
}
