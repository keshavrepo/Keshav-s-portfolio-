import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export type Surface = 'paper' | 'ink';

/**
 * Shared chrome (ARCHITECTURE §17): skip link first, banner, main, then the
 * utility footer. The shell adapts to the two authored surfaces (§4) and
 * never adds furniture inside the fiction (PC-16).
 */
export function SiteShell({
  surface = 'paper',
  children,
}: {
  surface?: Surface;
  children: ReactNode;
}) {
  const ink = surface === 'ink';
  return (
    <div
      className={cn(
        'flex min-h-svh flex-col',
        ink ? 'bg-ink-950 text-paper-100' : 'bg-paper-50 text-ink-900',
      )}
    >
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-ember-700 px-4 py-2 text-sm text-paper-50 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader surface={surface} />
      <main id="main" className="flex flex-1 flex-col">
        {children}
      </main>
      <SiteFooter surface={surface} />
    </div>
  );
}
