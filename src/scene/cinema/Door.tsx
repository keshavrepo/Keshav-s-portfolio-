'use client';

import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Door — the interaction-layer primitive for every actionable thing
 * (§8.2: doors are typographic actors, never mystery meat).
 *
 * One shell bakes in the whole covenant:
 *  - ≥44px target on both axes (S5's touch law, kit `.v2-door`);
 *  - `data-cursor="door"` — the reading light concentrates on approach,
 *    hover and focus share one warmth law (V-I18/I52);
 *  - press answers inside the react band (kit `:active`, ≤90ms, V-I28);
 *  - keyboard-identical by construction (it IS a button or an anchor);
 *  - `locked` maps the locked-segment state: no dead control — the door
 *    stays focusable, announces disabled, refuses the press.
 *
 * It opens routes (`href`), commits actions (`onPress`), and nothing
 * else. No modals, no forms behind it (Ω holds).
 */

export interface DoorProps {
  /** Renders an anchor when present, a button otherwise. */
  href?: string;
  external?: boolean;
  onPress?: () => void;
  locked?: boolean;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}

export function Door({
  href,
  external = false,
  onPress,
  locked = false,
  className,
  ariaLabel,
  children,
}: DoorProps): JSX.Element {
  const shared = {
    className: cn('v2-door', className),
    'data-cursor': 'door' as const,
    'data-locked': locked ? 'true' : undefined,
    'aria-label': ariaLabel,
  };

  if (href) {
    if (locked) {
      return (
        <span {...shared} role="link" aria-disabled="true" tabIndex={0}>
          {children}
        </span>
      );
    }
    return (
      <a
        {...shared}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noreferrer noopener' : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...shared}
      type="button"
      aria-disabled={locked || undefined}
      onClick={locked ? undefined : onPress}
    >
      {children}
    </button>
  );
}
