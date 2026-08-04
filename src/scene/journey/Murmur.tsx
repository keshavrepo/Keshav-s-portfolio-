'use client';

import { useEffect, useRef } from 'react';

import { layoutExtents, motionDurations } from '@/design-system/tokens';

/**
 * Murmur — the V2 atmosphere layer (VISUAL_DESIGN_BIBLE §7 row 8 · V-M28).
 *
 * Capped canvas-2D ambient in three kinds, and nothing else: `fog-grain`
 * (the room's breath), `pulse-dust` (embers at the heartbeat tempo),
 * `horizon-light` (a warm band on the lower-third rail). Meaningful or
 * absent — ambient complexity has a name and a budget:
 *  - ≤3 concurrent layers (V-M28): the fourth mount is refused, not
 *    degraded — the budget holds absolutely;
 *  - reduced motion receives the same composition as a still frame
 *    ("off or static under reduced" — §19 parity table); the resolved
 *    policy is read live from the media query and html[data-motion];
 *  - coarse pointers keep the murmur (atmosphere is read, not pointed);
 *  - tints are taken live from the chapter constitution (--v2-ink /
 *    --v2-glow) and lerped toward their target so a chapter Migration
 *    crosses the murmur with the field, never after it;
 *  - the loop idles at zero cost: paused offscreen, paused when the tab
 *    hides, never more than one rAF per instance.
 *
 * Unmounted by design in Sprint 1 — scenes mount their chapter's murmur at
 * their re-skin sprints. The canvas is aria-hidden décor; every telling
 * carries identical meaning without it (V-I56: cosmetic, never required).
 */

/** The census (V-M28): three layers, summed across the whole page. */
const MAX_CONCURRENT = 3;
let activeMurmurs = 0;

/** Rendering law per kind — ambient ceilings carry their citations. */
const KIND_LAW = {
  'fog-grain': {
    count: 72 /** fine grain across a hero spread */,
    alpha: 0.08 /** weather, never noise (V-M28) */,
    size: [0.6, 2.2] /** px */,
    drift: 7 /** px/s — slower than the eye's saccade; weather, not action */,
    wobble: 14 /** px lateral sway */,
    wobblePeriodMs: 14000,
    tintVar: '--v2-ink',
  },
  'pulse-dust': {
    count: 26 /** sparse — the one-ember ration generalized (§4.2.ii) */,
    alpha: 0.55,
    size: [0.8, 1.8],
    tempoMs: motionDurations.pulse /** the leitmotif heartbeat (§7 row 1) */,
    tintVar: '--v2-glow',
  },
  'horizon-light': {
    alpha: 0.2 /** §16.3's ≤0.35 ambient ceiling, held well under */,
    breathAmp: 0.12 /** ±12% breath — the vestibular ceiling (§17/19) */,
    tempoMs: motionDurations.breath,
    top: 0.42 /** the band opens above the midline */,
    tintVar: '--v2-glow',
  },
} as const;

/** The horizon sits on the lower-third rail (§12.4), token-derived. */
const HORIZON_FRACTION = parseFloat(layoutExtents['rail-lower-third']) / 100;

/** Ambient stays cheap: dpr capped under the R3F ceiling (V-M28 budget). */
const DPR_CAP = 1.5;

/** Chapter tints chase their migration at this lead (V-M26's 600ms ≥). */
const TINT_LERP = 0.04;
const TINT_REFRESH_MS = 500;

type Rgb = readonly [number, number, number];

interface Particle {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
}

export type MurmurKind = keyof typeof KIND_LAW;

export interface MurmurProps {
  kind: MurmurKind;
  className?: string;
}

function hexToRgb(value: string): Rgb | null {
  const match = value.trim().match(/^#(?:([0-9a-f]{3})|([0-9a-f]{6}))$/i);
  if (!match) return null;
  const digits = (match[1] ?? match[2] ?? '').toLowerCase();
  const full = match[1]
    ? digits
        .split('')
        .map((c) => c + c)
        .join('')
    : digits;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgba(rgb: Rgb, alpha: number): string {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha.toFixed(3)})`;
}

function blend(a: Rgb, b: Rgb, t: number): Rgb {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

function motionIsReduced(): boolean {
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.getAttribute('data-motion') === 'reduced'
  );
}

export function Murmur({ kind, className }: MurmurProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    /* The cap holds absolutely — this layer is simply absent (V-M28). */
    if (activeMurmurs >= MAX_CONCURRENT) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[murmur] budget full (${MAX_CONCURRENT}); refused kind "${kind}".`);
      }
      return;
    }
    activeMurmurs += 1;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      activeMurmurs -= 1;
      return;
    }

    const law = KIND_LAW[kind];
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let tint: Rgb | null = null;
    let tintTarget: Rgb | null = null;
    let tintReadAt = 0;
    let raf = 0;
    let playing = false;
    let offscreen = false;

    const readTint = (): void => {
      const raw = getComputedStyle(canvas).getPropertyValue(law.tintVar);
      tintTarget = hexToRgb(raw);
      if (!tint) tint = tintTarget;
    };

    const seed = (): void => {
      if (!('count' in law)) return;
      const l = law;
      particles = Array.from({ length: l.count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: l.size[0] + Math.random() * (l.size[1] - l.size[0]),
        phase: Math.random() * Math.PI * 2,
        speed: 0.75 + Math.random() * 0.5,
      }));
    };

    const drawFog = (t: number, ink: Rgb): void => {
      const l = KIND_LAW['fog-grain'];
      for (const p of particles) {
        const wobble = Math.sin((t / l.wobblePeriodMs) * Math.PI * 2 + p.phase) * l.wobble;
        const x = (((p.x + (t / 1000) * l.drift * p.speed) % width) + width) % width;
        const y = (((p.y + wobble) % height) + height) % height;
        ctx.fillStyle = rgba(ink, l.alpha);
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawDust = (t: number, glow: Rgb): void => {
      const l = KIND_LAW['pulse-dust'];
      for (const p of particles) {
        const beat = 0.5 + 0.5 * Math.sin((t / l.tempoMs) * Math.PI * 2 + p.phase);
        const alpha = l.alpha * (0.35 + 0.65 * beat);
        ctx.fillStyle = rgba(glow, alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (0.85 + 0.3 * beat), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawHorizon = (t: number, glow: Rgb): void => {
      const l = KIND_LAW['horizon-light'];
      const breath = 1 + l.breathAmp * Math.sin((t / l.tempoMs) * Math.PI * 2);
      const horizonY = height * HORIZON_FRACTION;
      const gradient = ctx.createLinearGradient(0, height * l.top, 0, height);
      gradient.addColorStop(0, rgba(glow, 0));
      gradient.addColorStop(
        (horizonY - height * l.top) / (height - height * l.top),
        rgba(glow, l.alpha * breath),
      );
      gradient.addColorStop(1, rgba(glow, 0));
      ctx.fillStyle = gradient;
      ctx.fillRect(0, height * l.top, width, height - height * l.top);
    };

    const draw = (t: number): void => {
      if (width === 0 || height === 0) return;
      ctx.clearRect(0, 0, width, height);
      if (!tint) return;
      ctx.save();
      if (kind === 'fog-grain') drawFog(t, tint);
      else if (kind === 'pulse-dust') drawDust(t, tint);
      else drawHorizon(t, tint);
      ctx.restore();
    };

    const tick = (t: number): void => {
      if (!playing) return;
      if (t - tintReadAt > TINT_REFRESH_MS) {
        tintReadAt = t;
        readTint();
      }
      if (tint && tintTarget) tint = blend(tint, tintTarget, TINT_LERP);
      draw(t);
      raf = window.requestAnimationFrame(tick);
    };

    const start = (): void => {
      if (playing || width === 0 || height === 0) return;
      playing = true;
      raf = window.requestAnimationFrame(tick);
    };

    const stop = (): void => {
      playing = false;
      window.cancelAnimationFrame(raf);
    };

    /* The reduced telling receives the same composition, still (§19). */
    const applyPolicy = (): void => {
      if (motionIsReduced() || offscreen || document.hidden) {
        const wasPlaying = playing;
        stop();
        if (wasPlaying || width > 0) draw(1200);
        return;
      }
      start();
    };

    const resize = (): void => {
      const rect = host.getBoundingClientRect();
      width = Math.max(0, Math.round(rect.width));
      height = Math.max(0, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if ('count' in law) seed();
      readTint();
      if (motionIsReduced()) draw(1200);
      else applyPolicy();
    };

    readTint();
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const sentinel = new IntersectionObserver(([entry]) => {
      offscreen = !entry.isIntersecting;
      applyPolicy();
    });
    sentinel.observe(canvas);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const policyObserver = new MutationObserver(applyPolicy);
    policyObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-motion'],
    });
    motionQuery.addEventListener('change', applyPolicy);
    document.addEventListener('visibilitychange', applyPolicy);

    return () => {
      stop();
      resizeObserver.disconnect();
      sentinel.disconnect();
      policyObserver.disconnect();
      motionQuery.removeEventListener('change', applyPolicy);
      document.removeEventListener('visibilitychange', applyPolicy);
      activeMurmurs -= 1;
    };
  }, [kind]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" data-murmur={kind} />;
}
