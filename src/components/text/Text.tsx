import type { ElementType, HTMLAttributes, ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * Typography primitives (ARCHITECTURE §3, §17). Every rendered sentence
 * passes through a role; no component composes raw type utilities.
 * Roles: claim and display carry the Fraunces voice; figure gets tabular
 * lining numerals; eyebrow is the quiet label of the document voice.
 */
const variantClasses = {
  claim: 'font-display text-display-xl',
  display: 'font-display text-display-lg',
  'display-md': 'font-display text-display-md',
  headline: 'font-display text-headline',
  lede: 'font-text text-lede',
  body: 'font-text text-body',
  'body-sm': 'font-text text-body-sm',
  eyebrow: 'font-text text-eyebrow uppercase',
  caption: 'font-text text-caption',
  figure: 'font-text font-figure text-figure',
} as const;

const defaultTags: Record<TextVariant, ElementType> = {
  claim: 'h1',
  display: 'h2',
  'display-md': 'h3',
  headline: 'h2',
  lede: 'p',
  body: 'p',
  'body-sm': 'p',
  eyebrow: 'p',
  caption: 'p',
  figure: 'span',
};

export type TextVariant = keyof typeof variantClasses;

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TextVariant;
  children: ReactNode;
}

export function Text({ as, variant = 'body', className, children, ...rest }: TextProps) {
  const Tag = as ?? defaultTags[variant];
  return (
    <Tag className={cn(variantClasses[variant], className)} {...rest}>
      {children}
    </Tag>
  );
}
