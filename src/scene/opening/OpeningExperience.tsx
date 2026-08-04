'use client';

import dynamic from 'next/dynamic';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';

import { site } from '@/core/config/site';
import { useLane } from '@/core/lane/lane-provider';
import { motionConductor } from '@/core/motion/conductor';
import { ensureGsapConfigured, gsap } from '@/core/motion/gsap';
import { useJourneyStore } from '@/core/state/journey-store';
import { motionDurations } from '@/design-system/tokens';
import { cn } from '@/lib/cn';

import { OpeningSceneContext, type DiveProgress, type PointerPresence } from './opening-context';
import {
  diveToAfterglowMs,
  nextPhase,
  openingBeats,
  phaseAtLeast,
  type OpeningPhase,
} from './opening-machine';
import { StaticNeuron } from './StaticNeuron';
import { usePointerPresence } from './use-pointer-presence';

/** The neuron's WebGL body arrives as its own chunk; the static ember stands in until it lands (slow networks keep the meaning). */
const NeuronCanvas = dynamic(() => import('./NeuronCanvas'), {
  ssr: false,
  loading: () => <StaticNeuron />,
});

/** What the live region says when each beat begins (SPEC-003 OP; SPEC-004 parity doctrine). */
const ANNOUNCEMENTS: Partial<Record<OpeningPhase, string>> = {
  heartbeat: 'A heartbeat begins in the dark.',
  emergence: 'A single glowing neuron appears — alive, and alone.',
  'claim-one': site.claimLine1,
  'claim-two': site.claimLine2,
  brightening: 'The neuron brightens. Connections begin to form.',
  'awaiting-dive': 'Click, or press Enter, to dive into the mind.',
  diving: 'Diving into the mind.',
  afterglow:
    'The dive is complete. You have reached the end of the Opening; Chapter One arrives in the next production phase.',
};

function controlLabelFor(phase: OpeningPhase): string {
  if (!phaseAtLeast(phase, 'awaiting-dive')) return 'Continue the Opening';
  if (phase === 'diving') return 'Diving into the mind';
  if (phase === 'afterglow') return 'Dive into the mind again';
  return 'Dive into the mind — begin Chapter One';
}

/** Gates one story element on its beat; no-JS and crawlers always see it. */
function Gated({
  live,
  className,
  style,
  children,
}: {
  live: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (live) el.removeAttribute('aria-hidden');
    else el.setAttribute('aria-hidden', 'true');
  }, [live]);

  return (
    <div ref={ref} className={cn('op-gated', live && 'op-gated-live', className)} style={style}>
      {children}
    </div>
  );
}

/**
 * The Opening — first contact (SCENE-001). The machine runs the locked
 * score: black silence → heartbeat → one living neuron → the couplet on the
 * visitor's first intentional act → brightening and forming connections →
 * the dive. Every layer (WebGL, DOM text, live region) reads this one
 * clock. Where the device cannot honor the cinematic telling, the same
 * machine settles on a composed frame with identical words.
 */
export function OpeningExperience() {
  const { signals, motion } = useLane();
  const setChapter = useJourneyStore((s) => s.setChapter);
  const markVisited = useJourneyStore((s) => s.markVisited);

  const [phase, setPhase] = useState<OpeningPhase>('void');
  const [cinematic, setCinematic] = useState(false);

  const hostRef = useRef<HTMLElement>(null);
  const presenceRef = useRef<PointerPresence>({ x: 0, y: 0, dist: 1, active: false });
  const diveRef = useRef<DiveProgress>({ value: 0 });
  const timersRef = useRef<number[]>([]);
  const intentionalRef = useRef(false);
  const ambientHeldRef = useRef(false);

  usePointerPresence(hostRef, presenceRef);

  const clearTimers = useCallback(() => {
    for (const timer of timersRef.current) window.clearTimeout(timer);
    timersRef.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms);
    timersRef.current.push(id);
  }, []);

  /* ── Entrance: resolve the telling this visit deserves, after hydration. ── */
  useEffect(() => {
    ensureGsapConfigured();
    const canHonorCinematic = signals.webgl2 && motion === 'full';
    setCinematic(canHonorCinematic);
    setChapter('opening', 0);
    if (!canHonorCinematic) {
      // Composed frame: identical words, zero waiting (parity, not absence).
      intentionalRef.current = true;
      setPhase('awaiting-dive');
    }
    return clearTimers;
  }, [signals.webgl2, motion, setChapter, clearTimers]);

  /* ── The clock: each beat schedules the next within its authored hold. ── */
  useEffect(() => {
    if (!cinematic) return;

    switch (phase) {
      case 'void':
        schedule(() => setPhase('heartbeat'), openingBeats.voidHoldMs);
        break;
      case 'heartbeat':
        if (!ambientHeldRef.current && motionConductor.tryAmbient()) {
          ambientHeldRef.current = true;
        }
        markVisited('op:heartbeat');
        schedule(() => setPhase('emergence'), openingBeats.heartbeatRampMs);
        break;
      case 'emergence':
        schedule(() => setPhase('attuning'), openingBeats.emergenceMs);
        break;
      case 'claim-one':
        markVisited('op:claim-one');
        schedule(() => setPhase('claim-two'), openingBeats.claimOneHoldMs);
        break;
      case 'claim-two':
        schedule(() => setPhase('brightening'), openingBeats.claimTwoHoldMs);
        break;
      case 'brightening':
        schedule(() => setPhase('awaiting-dive'), openingBeats.brighteningMs);
        break;
      case 'awaiting-dive':
        markVisited('op:awaiting-dive');
        break;
      case 'diving': {
        markVisited('op:dive');
        let cancelled = false;
        motionConductor.requestSolo(
          'opening-dive',
          () => {
            cancelled = true;
          },
          { handoffMs: 0 },
        );
        const tween = gsap.to(diveRef.current, {
          value: 1,
          duration: motionDurations.dive / 1000,
          ease: 'power2.inOut',
        });
        schedule(() => {
          if (!cancelled) {
            motionConductor.releaseSolo('opening-dive');
            setPhase('afterglow');
          }
          tween.kill();
        }, diveToAfterglowMs);
        break;
      }
      case 'afterglow':
        markVisited('op:dive-complete');
        if (ambientHeldRef.current) {
          motionConductor.releaseAmbient();
          ambientHeldRef.current = false;
        }
        break;
      default:
        break;
    }
  }, [phase, cinematic, schedule, markVisited]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  /* ── The first intentional act anywhere opens the Claim sequence. ── */
  useEffect(() => {
    if (!cinematic || intentionalRef.current) return;
    if (phaseAtLeast(phase, 'claim-one')) return;

    let travelled = 0;
    let lastX = -1;
    let lastY = -1;

    const fire = () => {
      if (intentionalRef.current) return;
      intentionalRef.current = true;
      setPhase((current) => (phaseAtLeast(current, 'claim-one') ? current : 'claim-one'));
    };

    const onMove = (event: PointerEvent) => {
      if (lastX >= 0) travelled += Math.hypot(event.clientX - lastX, event.clientY - lastY);
      lastX = event.clientX;
      lastY = event.clientY;
      if (travelled >= 220) fire();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', fire, { passive: true });
    window.addEventListener('keydown', fire);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', fire);
      window.removeEventListener('keydown', fire);
    };
  }, [phase, cinematic]);

  const onControl = useCallback(() => {
    if (phase === 'diving') return;
    if (!intentionalRef.current) {
      intentionalRef.current = true;
      setPhase((current) => (phaseAtLeast(current, 'claim-one') ? current : 'claim-one'));
      return;
    }
    if (phaseAtLeast(phase, 'awaiting-dive') || phase === 'afterglow') {
      setPhase('diving');
      return;
    }
    const ahead = nextPhase(phase);
    if (ahead) setPhase(ahead);
  }, [phase]);

  const claimsLive = phase === 'afterglow' || phaseAtLeast(phase, 'claim-one');
  const secondLineLive = phase === 'afterglow' || phaseAtLeast(phase, 'claim-two');
  const identityLive = phase === 'afterglow' || phaseAtLeast(phase, 'brightening');
  const announcement = ANNOUNCEMENTS[phase];

  const contextValue = { phase, presenceRef, diveRef };

  return (
    <OpeningSceneContext.Provider value={contextValue}>
      <section
        ref={hostRef}
        data-phase={phase}
        aria-label={`${site.owner} — ${site.role}`}
        className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-gutter pb-section-y pt-4 text-center"
      >
        <p className="sr-only">
          A single warm pulse breathes in the dark, like a heartbeat. The words: {site.claimLine1}{' '}
          {site.claimLine2}
        </p>

        {/* The neuron's home — static ember only when the WebGL telling is mounted */}
        {cinematic && phase !== 'afterglow' ? <NeuronCanvas /> : <StaticNeuron />}

        {/* Warm overexposure at the end of the dive */}
        <div className="op-warm pointer-events-none absolute inset-0 bg-gradient-to-b from-ember-100 via-ember-200 to-ember-300" />

        {/* The words, gated on their beats */}
        <div className="pointer-events-none relative z-20 flex flex-col items-center gap-measure-gap">
          <Gated live={claimsLive && phase !== 'diving'}>
            <h1 className="max-w-narrow font-display text-display-xl text-paper-100">
              {site.claimLine1}
            </h1>
          </Gated>
          <Gated live={secondLineLive && phase !== 'diving'}>
            <p className="max-w-narrow font-display text-display-lg text-paper-100/70">
              {site.claimLine2}
            </p>
          </Gated>
          <Gated live={identityLive && phase !== 'diving'} className="pt-4">
            <p className="text-eyebrow uppercase text-paper-100/50">
              {site.owner} — {site.role}
            </p>
          </Gated>
        </div>

        {/* The one control: the whole stage is the door (S5). */}
        <button
          type="button"
          onClick={onControl}
          aria-label={controlLabelFor(phase)}
          aria-describedby="opening-instructions"
          className="op-control absolute inset-0 z-30 cursor-pointer appearance-none bg-transparent [outline-offset:-10px]"
        />
        <span id="opening-instructions" className="sr-only">
          Click anywhere, or press Enter, to move through the Opening and dive into the mind.
        </span>

        <noscript>
          <p className="relative z-40 mt-8 max-w-measure text-body-sm text-paper-100/60">
            The interactive telling needs JavaScript. The words you just read are the story,
            complete, in every mode.
          </p>
        </noscript>

        {/* The live region is the story for visitors who cannot see it. */}
        <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {announcement ?? ''}
        </div>
      </section>
    </OpeningSceneContext.Provider>
  );
}
