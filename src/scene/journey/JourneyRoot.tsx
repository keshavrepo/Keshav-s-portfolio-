'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { site } from '@/core/config/site';
import { useLane } from '@/core/lane/lane-provider';
import { motionConductor } from '@/core/motion/conductor';
import { ensureGsapConfigured, gsap } from '@/core/motion/gsap';
import { useJourneyStore } from '@/core/state/journey-store';
import { motionDurations } from '@/design-system/tokens';
import { cn } from '@/lib/cn';
import { GrammarOverlay } from '@/scene/grammar/GrammarOverlay';
import { GrammarStatic } from '@/scene/grammar/GrammarStatic';
import { MindscapeOverlay } from '@/scene/mindscape/MindscapeOverlay';
import { MindscapeStatic } from '@/scene/mindscape/MindscapeStatic';
import {
  nextPhase,
  openingBeats,
  phaseAtLeast,
  type OpeningPhase,
} from '@/scene/opening/opening-machine';
import { StaticNeuron } from '@/scene/opening/StaticNeuron';

import { Gated } from './Gated';
import {
  JourneySceneContext,
  type DiveProgress,
  type PointerPresence,
  type ScreenAnchor,
} from './journey-context';
import {
  GRAMMAR_LOCK_G,
  GRAMMAR_TRIGGER_P,
  MIND_RUNWAY,
  journeyBeats,
  journeySettleMs,
  type JourneyPhase,
} from './journey-machine';
import { JourneyCanvas } from './JourneyCanvas';
import { usePointerPresence } from './use-pointer-presence';
import { useScheduler } from './use-scheduler';

/** Opening beat narration (SPEC-003 OP beats); arrival narration is journey-level. */
const OPENING_ANNOUNCEMENTS: Partial<Record<OpeningPhase, string>> = {
  heartbeat: 'A heartbeat begins in the dark.',
  emergence: 'A single glowing neuron appears — alive, and alone.',
  'claim-one': site.claimLine1,
  'claim-two': site.claimLine2,
  brightening: 'The neuron brightens. Connections begin to form.',
  'awaiting-dive': 'Click, or press Enter, to dive into the mind.',
  diving: 'Diving into the mind.',
};

const CHAPTER_ANNOUNCEMENTS: Record<JourneyPhase, string> = {
  opening: '',
  arriving: 'The world inside the mind opens. Silent, and wide.',
  mind: 'You are exploring how a Business Analyst thinks. Scroll to move deeper; hover or tab to listen; select to expand a thought.',
  'grammar-arriving':
    'The map re-forms. Every idea follows one process — watch a real case travel it.',
  grammar:
    'Ten stations of thinking. Scroll to travel the case from observation to impact. Hover to listen; select to expand the reasoning; commit the decision to reveal the impact.',
};

function controlLabelFor(phase: OpeningPhase): string {
  if (phase === 'diving') return 'Diving into the mind';
  if (phaseAtLeast(phase, 'awaiting-dive')) return 'Dive into the mind — begin Chapter One';
  return 'Continue the Opening';
}

/**
 * The journey (SCENE-001 ∪ SCENE-002 ∪ SCENE-003 …): one universe, one
 * camera, one clock. The Opening's machine runs until the dive; at the
 * exact white of the dive's overexposure the chapter changes and the mind
 * world is already there. At the settled end of the mind's runway the map
 * re-forms into the process. There is no page transition and no loading
 * feeling — by architecture, not by adjective.
 */
export function JourneyRoot() {
  const { signals, motion } = useLane();
  const setStoreChapter = useJourneyStore((s) => s.setChapter);
  const markVisited = useJourneyStore((s) => s.markVisited);

  const [phase, setPhase] = useState<OpeningPhase>('void');
  const [chapter, setChapter] = useState<JourneyPhase>('opening');
  const [cinematic, setCinematic] = useState(false);
  const [vistaSettled, setVistaSettled] = useState(false);
  const [gmCaption, setGmCaption] = useState(false);
  const [activeOrder, setActiveOrder] = useState(1);

  const hostRef = useRef<HTMLDivElement>(null);
  const staticMindRef = useRef<HTMLDivElement>(null);

  const presenceRef = useRef<PointerPresence>({ x: 0, y: 0, dist: 1, active: false });
  const diveRef = useRef<DiveProgress>({ value: 0 });
  const scrollRef = useRef({ p: 0, g: 0 });
  const screenRef = useRef(new Map<string, ScreenAnchor>());
  const focusRef = useRef<{ hoverId: string | null; focusId: string | null }>({
    hoverId: null,
    focusId: null,
  });

  const intentionalRef = useRef(false);
  const ambientHeldRef = useRef(false);

  usePointerPresence(hostRef, presenceRef);

  const { schedule, clear: clearTimers } = useScheduler();

  /* ── Entrance: resolve the telling this visit deserves, after hydration. ── */
  useEffect(() => {
    ensureGsapConfigured();
    const canHonorCinematic = signals.webgl2 && motion === 'full';
    setCinematic(canHonorCinematic);
    setStoreChapter('opening', 0);
    if (!canHonorCinematic) {
      // Composed frame: identical words, zero waiting (parity, not absence).
      intentionalRef.current = true;
      setPhase('awaiting-dive');
    }
    return clearTimers;
  }, [signals.webgl2, motion, setStoreChapter, clearTimers]);

  /* ── The Opening's clock (SCENE-001), with the dive now opening the world. ── */
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
          'journey-dive',
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
        // The chapter changes inside the dive's overexposed white — the
        // seamless cut. There is no page transition by construction.
        schedule(() => {
          if (cancelled) return;
          setPhase('afterglow');
          setChapter('arriving');
        }, journeyBeats.arrivalBeginMs);
        schedule(() => {
          if (cancelled) return;
          motionConductor.releaseSolo('journey-dive');
          setChapter('mind');
          tween.kill();
        }, journeySettleMs);
        break;
      }
      case 'afterglow':
        if (ambientHeldRef.current) {
          motionConductor.releaseAmbient();
          ambientHeldRef.current = false;
        }
        break;
      default:
        break;
    }
  }, [phase, cinematic, schedule, markVisited]);

  /* ── Arrival bookkeeping: anchors, the vista's hold, then it recedes. ── */
  useEffect(() => {
    if (chapter !== 'mind') return;
    setStoreChapter('mind', 1);
    markVisited('mm:vista');
    schedule(() => setVistaSettled(true), journeyBeats.vistaCaptionHoldMs);
  }, [chapter, setStoreChapter, markVisited, schedule]);

  /* ── Composed tellings: the document scrolls to the mind it just entered. ── */
  useEffect(() => {
    if (chapter !== 'mind' || cinematic) return;
    staticMindRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [chapter, cinematic]);

  /* ── The map re-forms: the mind's settled runway ignites the process.
        Cinematic tellings dissolve into it; composed ones step straight in. ── */
  const beginGrammar = useCallback(() => {
    setGmCaption(true);
    if (!cinematic) {
      setChapter('grammar');
      setGmCaption(false);
      return;
    }
    setChapter((current) =>
      current === 'grammar-arriving' || current === 'grammar' ? current : 'grammar-arriving',
    );
    schedule(() => setChapter('grammar'), journeyBeats.grammarRevealMs);
  }, [cinematic, schedule]);

  useEffect(() => {
    if (chapter !== 'grammar') return;
    setStoreChapter('grammar', 2);
    markVisited('gm:vista');
    schedule(() => setGmCaption(false), journeyBeats.vistaCaptionHoldMs);
  }, [chapter, setStoreChapter, markVisited, schedule]);

  /* ── The first intentional act anywhere opens the Claim sequence. ── */
  useEffect(() => {
    if (chapter !== 'opening' || !cinematic || intentionalRef.current) return;
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
  }, [phase, cinematic, chapter]);

  /* ── Scroll moves deeper — one runway, two chapters. The mind occupies the
        first half; the process re-forms at its settled end and owns the
        second half. Impact stays locked until the decision is committed. ── */
  useEffect(() => {
    const runwayChapters =
      chapter === 'mind' || chapter === 'grammar-arriving' || chapter === 'grammar';
    if (!runwayChapters || !cinematic) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const host = hostRef.current;
        if (!host) return;
        const rect = host.getBoundingClientRect();
        const runway = rect.height - window.innerHeight;
        const total = runway > 0 ? Math.min(1, Math.max(0, -rect.top / runway)) : 0;

        const p = Math.min(1, total * 2);
        let g = Math.min(1, Math.max(0, total * 2 - 1));
        const committed = useJourneyStore
          .getState()
          .visitedAnchors.includes('gm:decision:committed');
        if (!committed && g > GRAMMAR_LOCK_G) g = GRAMMAR_LOCK_G;

        scrollRef.current.p = p;
        scrollRef.current.g = g;

        const order = Math.max(1, Math.min(10, Math.floor(g * 10 + 0.08)));
        setActiveOrder((current) => (current === order ? current : order));

        if (chapter === 'mind' && p >= GRAMMAR_TRIGGER_P) beginGrammar();
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, [chapter, cinematic, beginGrammar]);

  const onControl = useCallback(() => {
    if (chapter !== 'opening' || phase === 'diving') return;
    if (!intentionalRef.current) {
      intentionalRef.current = true;
      setPhase((current) => (phaseAtLeast(current, 'claim-one') ? current : 'claim-one'));
      return;
    }
    if (phaseAtLeast(phase, 'awaiting-dive')) {
      setPhase('diving');
      if (!cinematic) {
        // Composed tellings arrive instantly; meaning never waits on frames.
        schedule(() => setChapter('mind'), 400);
      }
      return;
    }
    const ahead = nextPhase(phase);
    if (ahead) setPhase(ahead);
  }, [chapter, phase, cinematic, schedule]);

  const claimsLive = phaseAtLeast(phase, 'claim-one') && phase !== 'diving';
  const secondLineLive = phaseAtLeast(phase, 'claim-two') && phase !== 'diving';
  const identityLive = phaseAtLeast(phase, 'brightening') && phase !== 'diving';
  const announcement =
    chapter === 'opening' ? (OPENING_ANNOUNCEMENTS[phase] ?? '') : CHAPTER_ANNOUNCEMENTS[chapter];

  const runwayActive =
    (chapter === 'mind' || chapter === 'grammar-arriving' || chapter === 'grammar') && cinematic;

  const contextValue = {
    phase,
    chapter,
    presenceRef,
    diveRef,
    scrollRef,
    screenRef,
    focusRef,
  };

  return (
    <JourneySceneContext.Provider value={contextValue}>
      <div
        ref={hostRef}
        data-chapter={chapter}
        data-phase={phase}
        data-vista={vistaSettled ? 'settled' : 'fresh'}
        data-gm={gmCaption ? 'caption' : 'plain'}
        className="relative flex flex-1 flex-col"
        style={runwayActive ? { height: MIND_RUNWAY } : undefined}
      >
        <div
          className={cn(
            'flex flex-col',
            runwayActive ? 'sticky top-0 h-svh overflow-hidden' : 'relative min-h-svh flex-1',
          )}
        >
          {cinematic ? <JourneyCanvas /> : chapter === 'opening' ? <StaticNeuron /> : null}

          {cinematic && chapter !== 'mind' ? (
            <div className="op-warm pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-ember-100 via-ember-200 to-ember-300" />
          ) : null}

          {chapter === 'opening' ? (
            <section
              aria-label={`${site.owner} — ${site.role}`}
              className="relative z-10 flex flex-1 flex-col items-center justify-center gap-measure-gap px-gutter pb-section-y pt-4 text-center"
            >
              <p className="sr-only">
                A single warm pulse breathes in the dark, like a heartbeat. The words:{' '}
                {site.claimLine1} {site.claimLine2}
              </p>

              <Gated live={claimsLive}>
                <h1 className="max-w-narrow font-display text-display-xl text-paper-100">
                  {site.claimLine1}
                </h1>
              </Gated>
              <Gated live={secondLineLive}>
                <p className="max-w-narrow font-display text-display-lg text-paper-100/70">
                  {site.claimLine2}
                </p>
              </Gated>
              <Gated live={identityLive} className="pt-4">
                <p className="text-eyebrow uppercase text-paper-100/50">
                  {site.owner} — {site.role}
                </p>
              </Gated>

              <noscript>
                <p className="mx-auto mt-8 max-w-measure text-body-sm text-paper-100/60">
                  The interactive telling needs JavaScript. The words you just read are the story,
                  complete, in every mode.
                </p>
              </noscript>
            </section>
          ) : null}

          {(chapter === 'arriving' || chapter === 'mind') && cinematic ? (
            <div className="absolute inset-0 z-20">
              <MindscapeOverlay onBeginGrammar={beginGrammar} />
            </div>
          ) : null}

          {(chapter === 'grammar-arriving' || chapter === 'grammar') && cinematic ? (
            <div className="absolute inset-0 z-20">
              <GrammarOverlay activeOrder={activeOrder} />
            </div>
          ) : null}

          {chapter === 'mind' && !cinematic ? (
            <div ref={staticMindRef} className="relative z-10 flex-1 bg-ink-950">
              <MindscapeStatic />
              <div className="flex justify-center px-gutter pb-section-y">
                <button
                  type="button"
                  onClick={beginGrammar}
                  className="inline-flex min-h-[44px] items-center rounded-full bg-ember-700 px-6 py-2 text-body-sm font-medium text-paper-50 transition-colors duration-ui ease-standard hover:bg-ember-600"
                >
                  Follow one real decision through the process
                </button>
              </div>
            </div>
          ) : null}

          {chapter === 'grammar' && !cinematic ? (
            <div className="relative z-10 flex-1 bg-ink-950">
              <GrammarStatic />
            </div>
          ) : null}

          {chapter === 'opening' ? (
            <>
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
            </>
          ) : null}
        </div>
      </div>

      {/* The live region is the story for visitors who cannot see it. */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>
    </JourneySceneContext.Provider>
  );
}
