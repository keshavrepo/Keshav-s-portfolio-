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

import { useReducedMotion } from '@/core/motion/use-reduced-motion';
import { layoutSpacing } from '@/design-system/tokens';
import { cn } from '@/lib/cn';

import { useScrollChannel } from './use-scroll-channel';

/**
 * DepthField — the layered-depth primitive: the V2 answer to parallax.
 *
 * Stacked parallax is a banned species (V-M banned list — "any move that
 * exists because the library had it"). The lawful depth is a DRIFT: every
 * layer translates within the Breath law's ≤2% amplitude (§7 row 9 —
 * tokenized as spacing['depth-drift']), offset by a `depth` weight in
 * [-1, 1]. The eye reads near and far without the composition ever
 * sliding like a side-scroller.
 *
 * Physics: one critically-damped follower per field (never overshoots,
 * V-M86), one rAF only while the field is in view, transform-only writes
 * (no layout, no paint storm). Reduced telling: layers hold rest — depth
 * is motion, and motion waits (V-M72 family).
 */

/** Lawful amplitude: '2rem' → px at the untouched 16px root (V-L base law). */
const DRIFT_PX = parseFloat(layoutSpacing['depth-drift']) * 16;

/** Follower stiffness — damped well under overshoot (¼-frame chase ≈ λ5). */
const FOLLOW = 0.082;

interface LayerRegistration {
  element: HTMLElement;
  depth: number;
}

const DepthRegistryContext = createContext<{
  register: (layer: LayerRegistration) => () => void;
} | null>(null);

export interface DepthFieldProps {
  className?: string;
  children?: ReactNode;
}

export function DepthField({ className, children }: DepthFieldProps): JSX.Element {
  const reduced = useReducedMotion();
  const layersRef = useRef<LayerRegistration[]>([]);
  const frameRef = useRef(0);
  const runningRef = useRef(false);
  const visibleRef = useRef(false);
  const easedRef = useRef(0);
  const targetRef = useRef(0);

  const { ref } = useScrollChannel('traverse', (p) => {
    targetRef.current = (p - 0.5) * 2;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const stop = (): void => {
      runningRef.current = false;
      window.cancelAnimationFrame(frameRef.current);
    };

    const apply = (): void => {
      if (!runningRef.current) return;
      const last = easedRef.current;
      const next = last + (targetRef.current - last) * FOLLOW;
      // Park exactly at rest once the chase is under a hair — a follower
      // that never quite lands hums forever on battery.
      easedRef.current = Math.abs(next - targetRef.current) < 0.0005 ? targetRef.current : next;
      for (const layer of layersRef.current) {
        layer.element.style.transform = `translate3d(0, ${(
          easedRef.current *
          layer.depth *
          DRIFT_PX
        ).toFixed(2)}px, 0)`;
      }
      if (easedRef.current === targetRef.current) {
        stop();
        return;
      }
      frameRef.current = window.requestAnimationFrame(apply);
    };

    const kick = (): void => {
      if (runningRef.current || reduced || !visibleRef.current) return;
      runningRef.current = true;
      frameRef.current = window.requestAnimationFrame(apply);
    };

    const onScroll = (): void => kick();
    const sentinel = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      if (visibleRef.current) kick();
      else stop();
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    sentinel.observe(element);
    return () => {
      stop();
      sentinel.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [ref, reduced]);

  return (
    <DepthRegistryContext.Provider
      value={{
        register: (layer) => {
          layersRef.current.push(layer);
          return () => {
            layersRef.current = layersRef.current.filter((item) => item !== layer);
          };
        },
      }}
    >
      <div ref={ref as RefObject<HTMLDivElement>} className={cn('relative', className)}>
        {children}
      </div>
    </DepthRegistryContext.Provider>
  );
}

export interface DepthLayerProps {
  /** -1..1 — nearer layers ride the scroll's sign, far layers counter it. */
  depth: number;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function DepthLayer({ depth, className, style, children }: DepthLayerProps): JSX.Element {
  const registry = useContext(DepthRegistryContext);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !registry) return;
    const clamped = Math.max(-1, Math.min(1, depth));
    return registry.register({ element, depth: clamped });
  }, [registry, depth]);

  return (
    <div ref={elementRef} className={cn(className)} style={style}>
      {children}
    </div>
  );
}
