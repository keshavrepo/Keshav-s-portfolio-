'use client';

import { useEffect, useRef, type ReactNode } from 'react';

import { cn } from '@/lib/cn';

/**
 * REUSABLE (extracted SCENE-003 from SCENE-002's thought card) — the calm
 * reasoning dialog. Non-modal: ESC closes, focus moves in on open, the
 * caller restores focus to its door on close. Body content is the caller's
 * (reasoning text, micro-actions); never a PowerPoint card — one idea, in
 * the voice of the document.
 */
export function ThoughtCard({
  label,
  kicker,
  children,
  actions,
  onClose,
  className,
}: {
  label: string;
  kicker: string;
  children: ReactNode;
  actions?: ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    cardRef.current?.focus({ preventScroll: true });
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={label}
      className={cn(
        'absolute inset-x-0 bottom-0 z-30 mx-auto w-full max-w-measure px-gutter pb-8',
        className,
      )}
    >
      <div
        ref={cardRef}
        tabIndex={-1}
        className="animate-enter-rise rounded-2xl border border-paper-100/10 bg-ink-900/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)] outline-none backdrop-blur-md"
      >
        <p className="text-eyebrow uppercase text-ember-300/90">{kicker}</p>
        <div className="mt-2 text-body text-paper-100/90">{children}</div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {actions}
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] items-center rounded-full border border-paper-100/20 px-4 text-body-sm text-paper-100/80 transition-colors duration-ui ease-standard hover:border-paper-100/50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
