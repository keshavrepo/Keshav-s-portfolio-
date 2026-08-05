'use client';

import {
  Fragment,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react';

import { useReducedMotion } from '@/core/motion/use-reduced-motion';
import { motionDurations, motionStagger } from '@/design-system/tokens';
import { cn } from '@/lib/cn';

import { useScheduler } from '../journey/use-scheduler';

/**
 * KineticText — the V2 kinetic text engine (PR-02; VISUAL_DESIGN_BIBLE
 * §3/§7 rows 2–3: the Mask, the Split, the Cascade — typography is the
 * architecture, so typography's engine is a foundation, not a scene).
 *
 * One `<KineticText>` serves every lawful heading motion:
 *  - mode `words`  — phrase-boundary units (the Split honors phrases,
 *    V-M23): masked per-word rise (`reveal="mask"`) or maskless staged
 *    appearance (`reveal="units"`);
 *  - mode `chars`  — per-letter staging, RESERVED for one-word heroes and
 *    the signature (V-M23: letters rarely — the engine warns in dev);
 *  - mode `lines`  — measured line masks: words render first, the engine
 *    groups them by their true line boxes, then each LINE rises as one.
 *
 * Drives:
 *  - `view`      — an observer arms the reveal on arrival (0.35 presence);
 *  - `progress`  — imperative `setProgress(0..1)`; each unit crosses at
 *    its own share, honestly in both scroll directions (§9.ii);
 *  - `manual`    — pass `live`; the parent machine owns the beat.
 *
 * Structure (the kit contract): mask modes are container > unit (the
 * clip) > riser (the mover); whitespace separators are bare text nodes,
 * never spans — the hide laws target elements, so spaces can never be
 * gated away, and whole phrases stay matchable for find-in-page.
 *
 * Parity law (§19): the container always carries aria-label={text} while
 * units are aria-hidden — AT hears the sentence, never the machinery.
 * Without JavaScript the SSR markup is the same structured text and every
 * word is simply present. After a one-shot reveal completes, the engine
 * settles back to PLAIN TEXT (verified against a height probe — if the
 * swap would shift layout by more than 2px it is refused and the split
 * stays), so the end state is DOM-real composed copy.
 *
 * The reduced telling arms instantly (V-M72); transitions are kit-gated
 * to ~0 anyway.
 */

export type KineticMode = 'words' | 'chars' | 'lines';
export type KineticReveal = 'mask' | 'units';
export type KineticDrive = 'view' | 'progress' | 'manual';

export interface KineticTextHandle {
  /** Progressive drive: reveal units as the scroll channel crosses them. */
  setProgress: (progress: number) => void;
}

export interface KineticTextProps {
  text: string;
  mode?: KineticMode;
  reveal?: KineticReveal;
  drive?: KineticDrive;
  /** View drive: play once (default) or re-arm on every exit/entry. */
  once?: boolean;
  /** Manual drive. */
  live?: boolean;
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div';
  className?: string;
  /** Called after a one-shot reveal settles back into plain text. */
  onSettled?: () => void;
}

const ARM_THRESHOLD = 0.35;
/** Layout-shift guard for the settle swap (px) — type may never jump. */
const SETTLE_TOLERANCE_PX = 2;
/** Letters belong to one-word heroes (V-M23) — beyond this the engine objects. */
const CHAR_LAW_LIMIT = 12;

/** [word, separator, word, …] — separators stay real text. */
function tokenize(text: string): string[] {
  return text.split(/(\s+)/).filter((token) => token.length > 0);
}

export const KineticText = forwardRef<KineticTextHandle, KineticTextProps>(function KineticText(
  {
    text,
    mode = 'words',
    reveal = 'mask',
    drive,
    once = true,
    live,
    as = 'span',
    className,
    onSettled,
  },
  forwardedRef,
) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLElement | null>(null);
  const onSettledRef = useRef(onSettled);
  onSettledRef.current = onSettled;
  const swapRefusedRef = useRef(false);
  const { schedule } = useScheduler();

  /* `live` present IS manual drive, whatever `drive` says (one driver). */
  const effectiveDrive: KineticDrive = live !== undefined ? 'manual' : (drive ?? 'view');

  const [armed, setArmed] = useState(false);
  const [settled, setSettled] = useState(false);
  const [lines, setLines] = useState<string[][] | null>(null);

  const tokens = useMemo(() => tokenize(text), [text]);
  const words = useMemo(() => tokens.filter((_, i) => i % 2 === 0), [tokens]);

  /* New copy re-enters the measuring veil (lines only). */
  useEffect(() => {
    setLines(null);
    setSettled(false);
    swapRefusedRef.current = false;
  }, [words]);

  const unitCount = useMemo(() => {
    if (mode === 'lines' && lines) return lines.length;
    if (mode === 'chars') return Array.from(text.replace(/\s+/g, '')).length;
    return words.length;
  }, [mode, lines, text, words]);

  /* The letter law (V-M23): letters are for one-word heroes and the signature. */
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' || mode !== 'chars') return;
    if (words.length > 1 || unitCount > CHAR_LAW_LIMIT) {
      console.warn(
        `[kinetic] mode="chars" is reserved for one-word heroes and the signature (V-M23); received ${unitCount} units across ${words.length} words.`,
      );
    }
  }, [mode, words, unitCount]);

  /* Line masks are measured, never guessed: group word units by their
     true line boxes. Runs in the layout effect so the veil never lifts
     before the grouping exists; RO re-measures on real width change. */
  const regroup = useCallback((): void => {
    const root = rootRef.current;
    if (!root || mode !== 'lines') return;
    const units = Array.from(root.querySelectorAll<HTMLElement>('[data-unit]'));
    if (units.length === 0) return;
    const grouped: string[][] = [];
    let top = Number.NaN;
    units.forEach((unit, i) => {
      const unitTop = unit.offsetTop;
      if (Number.isNaN(top) || Math.abs(unitTop - top) > 1) {
        grouped.push([words[i] ?? '']);
        top = unitTop;
      } else {
        grouped[grouped.length - 1].push(words[i] ?? '');
      }
    });
    setLines((current) => {
      if (
        current &&
        current.length === grouped.length &&
        current.every((line, i) => line.join(' ') === grouped[i].join(' '))
      ) {
        return current;
      }
      return grouped;
    });
  }, [mode, words]);

  useLayoutEffect(() => {
    if (mode !== 'lines') return;
    regroup();
    const root = rootRef.current;
    if (!root) return;
    const observer = new ResizeObserver(regroup);
    observer.observe(root);
    return () => observer.disconnect();
  }, [mode, regroup]);

  /* View drive: arm on arrival (or instantly under the reduced telling).
     Lines wait for their grouping so the stagger is real, not a clump. */
  useEffect(() => {
    if (effectiveDrive !== 'view') return;
    if (reduced) {
      setArmed(true);
      return;
    }
    const root = rootRef.current;
    if (!root) return;
    if (mode === 'lines' && lines === null) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setArmed(false);
        }
      },
      { threshold: ARM_THRESHOLD },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [effectiveDrive, reduced, once, mode, lines]);

  /* Progressive drive: units cross at their own share of the channel. */
  const setProgress = useCallback((p: number): void => {
    const root = rootRef.current;
    if (!root) return;
    const units = root.querySelectorAll('[data-unit]');
    const n = units.length;
    if (n === 0) return;
    units.forEach((unit, i) => {
      unit.classList.toggle('v2-live', p >= i / n);
    });
  }, []);
  useImperativeHandle(forwardedRef, () => ({ setProgress }), [setProgress]);

  /* One-shot reveals settle into plain text — the end-state law (§19). */
  useEffect(() => {
    if (effectiveDrive !== 'view' || !once || !armed || settled || swapRefusedRef.current) return;
    const root = rootRef.current;
    if (!root) return;
    const before = root.offsetHeight;
    schedule(
      () => {
        setSettled(true);
        onSettledRef.current?.();
        window.requestAnimationFrame(() => {
          const element = rootRef.current;
          if (!element) return;
          if (Math.abs(element.offsetHeight - before) > SETTLE_TOLERANCE_PX) {
            swapRefusedRef.current = true;
            setSettled(false);
          }
        });
      },
      motionDurations.enter + unitCount * motionStagger.step + motionDurations.ui,
    );
  }, [effectiveDrive, once, armed, settled, unitCount, schedule]);

  /* ── render ─────────────────────────────────────────────────────────── */

  if (settled) {
    const SettledTag = as;
    return (
      <SettledTag ref={rootRef as never} className={cn(className)}>
        {text}
      </SettledTag>
    );
  }

  const containerClasses = cn(
    reveal === 'mask' ? 'v2-split' : 'v2-units',
    effectiveDrive === 'progress' && 'v2-progressive',
    mode === 'lines' && lines === null && 'v2-lines-await',
    effectiveDrive !== 'progress' && (armed || live) && 'v2-live',
    className,
  );

  const Tag = as;

  /* Measured line masks: one mask, one riser, the line's real text. */
  if (mode === 'lines' && lines !== null) {
    return (
      <Tag ref={rootRef as never} className={containerClasses} aria-label={text}>
        {lines.map((line, i) => (
          <span
            key={line.join(' ')}
            data-unit
            aria-hidden="true"
            style={{ '--step-i': i } as CSSProperties}
          >
            <span>{line.join(' ')}</span>
          </span>
        ))}
      </Tag>
    );
  }

  if (mode === 'chars') {
    let step = 0;
    return (
      <Tag ref={rootRef as never} className={containerClasses} aria-label={text}>
        {tokens.map((token, index) =>
          index % 2 === 0 ? (
            Array.from(token).map((char) => {
              const i = step;
              step += 1;
              return (
                <span
                  key={`${index}-${i}`}
                  data-unit
                  aria-hidden="true"
                  style={{ '--step-i': i } as CSSProperties}
                >
                  {reveal === 'mask' ? <span>{char}</span> : char}
                </span>
              );
            })
          ) : (
            <Fragment key={index}>{token}</Fragment>
          ),
        )}
      </Tag>
    );
  }

  return (
    <Tag ref={rootRef as never} className={containerClasses} aria-label={text}>
      {tokens.map((token, index) =>
        index % 2 === 0 ? (
          <span
            key={token + index}
            data-unit
            aria-hidden="true"
            style={{ '--step-i': index / 2 } as CSSProperties}
          >
            {reveal === 'mask' ? <span>{token}</span> : token}
          </span>
        ) : (
          <Fragment key={index}>{token}</Fragment>
        ),
      )}
    </Tag>
  );
});

/** Word Reveal — maskless staged words (the Cascade in text). */
export function WordReveal(props: Omit<KineticTextProps, 'mode' | 'reveal'>): JSX.Element {
  return <KineticText {...props} mode="words" reveal="units" />;
}

/** Character Reveal — letters, reserved for one-word heroes (V-M23). */
export function CharacterReveal(props: Omit<KineticTextProps, 'mode' | 'reveal'>): JSX.Element {
  return <KineticText {...props} mode="chars" reveal="units" />;
}

/** Mask Reveal for text — per-word masks, the claim's own move. */
export function MaskedText(props: Omit<KineticTextProps, 'mode' | 'reveal'>): JSX.Element {
  return <KineticText {...props} mode="words" reveal="mask" />;
}

/** Split Reveal — measured line masks; each line rises as one voice. */
export function SplitLines(props: Omit<KineticTextProps, 'mode' | 'reveal'>): JSX.Element {
  return <KineticText {...props} mode="lines" reveal="mask" />;
}
