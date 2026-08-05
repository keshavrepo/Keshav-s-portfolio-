import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * LinkLine — the inline-link primitive: a word inside a sentence that
 * can take the visitor somewhere. Its underline is the Draw (§7 row 4's
 * underline case): the stroke draws itself on hover and on focus —
 * keyboard and hand share one law (V-I18). Server-safe: no handlers,
 * no state, no client boundary.
 */

export interface LinkLineProps {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
}

export function LinkLine({ href, external = false, className, children }: LinkLineProps) {
  return (
    <a
      href={href}
      className={cn('v2-linkline', className)}
      data-cursor="read"
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer noopener' : undefined}
    >
      {children}
    </a>
  );
}
