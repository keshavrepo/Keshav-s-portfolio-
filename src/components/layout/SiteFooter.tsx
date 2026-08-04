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
        <a
          href={`mailto:${contactEmail}`}
          className="min-h-[44px] rounded-sm px-1 text-caption underline decoration-ember-600/60 underline-offset-4 outline-none transition-colors duration-ui ease-standard hover:decoration-ember-600"
        >
          {contactEmail}
        </a>
      ) : null}
    </footer>
  );
}
