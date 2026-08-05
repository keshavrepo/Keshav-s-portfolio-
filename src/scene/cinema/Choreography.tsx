'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';

import { cn } from '@/lib/cn';

import { useScrollChannel, type ScrollChannelMode } from './use-scroll-channel';

/**
 * Choreography — the section-sequencing primitive: scroll storytelling
 * staged as named beats over one channel.
 *
 * `<Choreo>` owns a scroll channel (traverse by default, cover when it
 * stages a Pin runway); each `<Beat>` declares its band `[start, end]`
 * within it. Per frame the choreo answers every registered beat with DOM
 * writes only — `data-active`, `.v2-live` while active (latched with
 * `once`), and `--beat-p` (0..1 across the band) — so kit-gated children
 * (masks, risers, draws, cascades) perform on their threshold with zero
 * React renders.
 *
 * Honest crossings (§9.ii): bands open and close in both directions;
 * `once` is reserved for one-way story turns. Without JavaScript every
 * beat's content is simply present — the semantic floor.
 */

interface BeatRegistration {
  element: HTMLElement;
  at: readonly [number, number];
  once: boolean;
  active: boolean;
  latched: boolean;
}

const ChoreoContext = createContext<{
  register: (beat: BeatRegistration) => () => void;
} | null>(null);

export interface ChoreoProps {
  mode?: ScrollChannelMode;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function Choreo({
  mode = 'traverse',
  className,
  style,
  children,
}: ChoreoProps): JSX.Element {
  const beatsRef = useRef<BeatRegistration[]>([]);

  const { ref } = useScrollChannel(mode, (p) => {
    for (const beat of beatsRef.current) {
      const [start, end] = beat.at;
      if (beat.latched) continue;
      const active = p >= start && p <= end;
      if (active !== beat.active) {
        beat.active = active;
        beat.element.dataset.active = active ? 'true' : 'false';
        beat.element.classList.toggle('v2-live', active);
        if (active && beat.once) beat.latched = true;
      }
      if (beat.active) {
        const span = Math.max(0.0001, end - start);
        const bandP = Math.min(1, Math.max(0, (p - start) / span));
        beat.element.style.setProperty('--beat-p', bandP.toFixed(4));
      }
    }
  });

  return (
    <ChoreoContext.Provider
      value={{
        register: (beat) => {
          beatsRef.current.push(beat);
          return () => {
            beatsRef.current = beatsRef.current.filter((item) => item !== beat);
          };
        },
      }}
    >
      <div ref={ref as RefObject<HTMLDivElement>} className={cn(className)} style={style}>
        {children}
      </div>
    </ChoreoContext.Provider>
  );
}

export interface BeatProps {
  /** Band of the parent channel, 0..1: active between start and end. */
  at: readonly [number, number];
  /** Latch the active state at first crossing (one-way story turns). */
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function Beat({ at, once = false, className, style, children }: BeatProps): JSX.Element {
  const choreo = useContext(ChoreoContext);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !choreo) return;
    return choreo.register({ element, at, once, active: false, latched: false });
  }, [choreo, at, once]);

  return (
    <div ref={elementRef} className={cn(className)} style={style}>
      {children}
    </div>
  );
}
