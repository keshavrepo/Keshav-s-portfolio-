/**
 * Chapter Five content (SCENE-005): the Decision Engine. ONE scenario,
 * built deep instead of wide — the Renewal Cliff, set in the same company
 * the visitor has inhabited since Chapter Two (the automations product,
 * the ticket queue, the universe they just watched breathe).
 *
 * Design laws (SCENE-005 brief / SPEC-003): information is always
 * incomplete, no option is clean, no choice is labelled correct or
 * incorrect, and the consequences are authored — the "unexpected effect"
 * is storytelling, not simulation. Every effect lands in the universe the
 * visitor already knows, on systems they can name.
 */

export interface DecisionEvidence {
  id: string;
  order: number;
  title: string;
  /** One breath, on the dock. */
  whisper: string;
  /** The evidence, read closely. */
  body: string;
  /** Scroll progress (w) at which it arrives — evidence is earned. */
  threshold: number;
}

export type ConsequenceKind = 'immediate' | 'secondary' | 'unexpected' | 'outcome';

export interface ConsequenceStage {
  kind: ConsequenceKind;
  /** ms after the decision locks (the shared consequence clock). */
  atMs: number;
  /** The effect, told flatly — trade-offs, never verdicts. */
  text: string;
  /**
   * Scripted ripple: which systems the effect reaches, at which wave.
   * Waves ride the universe's ripple machinery unchanged (reuse law).
   */
  waves: Record<string, number>;
}

export interface DecisionPath {
  id: string;
  title: string;
  /** The stance, one line, in the room. */
  stance: string;
  /** What committing actually means. */
  detail: string;
  /** The trade-off, named out loud (never a hidden cost). */
  accept: string;
  /** The uncertainty that stays uncertainty. */
  unknown: string;
  stages: readonly ConsequenceStage[];
}

/** The situation: renewal season opens in six weeks, and the base is leaking. */
export const SCENARIO = {
  title: 'The Renewal Cliff',
  briefing:
    'You have watched this business breathe. Now it brings you a problem with a clock on it: long-tenure customers are leaving faster, renewals open in six weeks, and three people you respect are about to argue for three different fixes.',
  instruction:
    'Read every piece of evidence. Weigh each path. Then commit — once. There is no undo in a live business, only consequences.',
} as const;

export const DECISION_EVIDENCE: readonly DecisionEvidence[] = [
  {
    id: 'signal',
    order: 1,
    title: 'The signal',
    whisper: 'The base is leaking where it used to be strongest.',
    body: 'Renewal churn among three-year customers: 4% → 7% in two quarters. Not a spike — a slope. Renewal season opens in six weeks, and nobody yet knows whether the curve bends or breaks.',
    threshold: 0,
  },
  {
    id: 'voice',
    order: 2,
    title: 'The voice',
    whisper: 'The exits say it plainly: the automations feel abandoned.',
    body: "Exit interviews, read aloud: 'the automation features feel abandoned.' A competitor shipped a cheaper clone in March. Deals still close — but on price now, not on belief.",
    threshold: 0.16,
  },
  {
    id: 'numbers',
    order: 3,
    title: 'The numbers',
    whisper: 'Every path has a price; the prices are in different currencies.',
    body: 'The shield: −18% margin on every shielded renewal. The bet: 1.5 engineer-months, and builds here historically slip one month. The triage: enterprise is 35% of the cliff; direct outreach has saved six in ten.',
    threshold: 0.32,
  },
  {
    id: 'room',
    order: 4,
    title: 'The room',
    whisper: 'Three people, three fixes — and all three are right.',
    body: "The Sales VP wants the shield locked this week. The Product lead wants the bet, and believes in it. Finance, quietly: 'either one strains the quarter — both together probably break it.' All three are right. That is the problem.",
    threshold: 0.5,
  },
] as const;

/** The three paths — defensible, painful, honest. There is no fourth wall to hide behind. */
export const DECISION_PATHS: readonly DecisionPath[] = [
  {
    id: 'shield',
    title: 'Shield the base',
    stance: 'Protect every renewal on the table — at a price.',
    detail:
      'Offer a 20% loyalty discount to every at-risk renewal, locked before the season opens. It is the fastest way to stop the leak, and the most expensive way to be believed.',
    accept: 'You accept: margin for time. The shield buys the year at a thinner profit.',
    unknown:
      'You cannot know: how far the discount expectation travels, or whether price-first customers ever learn to stay.',
    stages: [
      {
        kind: 'immediate',
        atMs: 1200,
        text: 'Renewals steady. Seven in ten at-risk accounts accept the shield. Finance books the margin cost the same week.',
        waves: { customers: 1, finance: 1 },
      },
      {
        kind: 'secondary',
        atMs: 3600,
        text: 'To protect the quarter, the open Support hire is frozen. The queue begins to age — slowly, then noticeably.',
        waves: { support: 2, operations: 2 },
      },
      {
        kind: 'unexpected',
        atMs: 6400,
        text: 'News of the discount travels. New deals arrive quoting it back; the pipeline tilts toward price-first buyers.',
        waves: { marketing: 3, sales: 3 },
      },
      {
        kind: 'outcome',
        atMs: 9600,
        text: 'Churn is contained — and the business is now, quietly, the cheaper option. Next year’s product budget is the proof.',
        waves: { revenue: 4, product: 4 },
      },
    ],
  },
  {
    id: 'bet',
    title: 'Ship the promise',
    stance: 'Give churn a reason to reverse: build the feature first.',
    detail:
      'Build workflow templates — the top request for two years — and ship before renewal season. It is the only path that makes the product more worth keeping, and the only one that might not finish in time.',
    accept:
      'You accept: a missed quarter for a stronger product. The slip is priced in, not hidden.',
    unknown:
      'You cannot know: whether the slip is one month or three. It is never zero — builds are never on time, only honest.',
    stages: [
      {
        kind: 'immediate',
        atMs: 1200,
        text: 'The roadmap bends around the build. Support fields “is it ready yet?” with a straight face, three times a day.',
        waves: { product: 1, support: 1, operations: 1 },
      },
      {
        kind: 'secondary',
        atMs: 3600,
        text: 'Some at-risk accounts hold — they want to see the feature. Marketing finally has a story worth the attention it buys.',
        waves: { customers: 2, marketing: 2 },
      },
      {
        kind: 'unexpected',
        atMs: 6400,
        text: 'The build slips a month — builds do. Eight percent of the cliff renews into the gap anyway, discountless and unimpressed.',
        waves: { sales: 3, revenue: 3 },
      },
      {
        kind: 'outcome',
        atMs: 9600,
        text: 'The quarter misses. The product is unmistakably stronger; stakeholder patience is one notch thinner. The base stabilizes the quarter after.',
        waves: { stakeholders: 4, finance: 4, revenue: 4 },
      },
    ],
  },
  {
    id: 'triage',
    title: 'Save the saveable',
    stance: 'Fix what the business broke; let the wrong-fit leave honestly.',
    detail:
      'Segment the cliff: enterprise accounts whose automations broke get white-glove repair — the alias script, at scale, by hand. Wrong-fit small accounts are allowed to leave with honesty instead of a discount.',
    accept:
      'You accept: a smaller, honest book of business — and a churn number the board watches worsen.',
    unknown:
      'You cannot know: whether the six-in-ten save rate holds when outreach scales, or whether honesty ever pays on schedule.',
    stages: [
      {
        kind: 'immediate',
        atMs: 1200,
        text: 'The churn number worsens in the open — you let it. Direct reach-outs begin the same day; the queue doubles, and the team knows why.',
        waves: { customers: 1, support: 1 },
      },
      {
        kind: 'secondary',
        atMs: 3600,
        text: 'Revenue dips as wrong-fit accounts leave honestly. Enterprise saves land at six in ten — better than any model promised.',
        waves: { revenue: 2, finance: 2 },
      },
      {
        kind: 'unexpected',
        atMs: 6400,
        text: 'The exit interviews are the sharpest product research the company has ever bought — and two departed customers send referrals.',
        waves: { product: 3, marketing: 3 },
      },
      {
        kind: 'outcome',
        atMs: 9600,
        text: 'A smaller, healthier base. Slower this year, stronger every year after — and nobody in Support dreads the queue anymore.',
        waves: { customers: 4, operations: 4 },
      },
    ],
  },
] as const;

export const CONSEQUENCE_KIND_LABELS: Record<ConsequenceKind, string> = {
  immediate: 'Immediate effect',
  secondary: 'Secondary effect',
  unexpected: 'Unexpected effect',
  outcome: 'Final business outcome',
};

export const REFLECTION_LINES = [
  'No path was clean. You chose with incomplete information, inside a deadline — that is the job.',
  'There was no perfect answer. There never is. There are only trade-offs, named in time.',
] as const;

export function getDecisionPath(id: string): DecisionPath {
  const path = DECISION_PATHS.find((p) => p.id === id);
  if (!path) throw new Error(`Unknown decision path: ${id}`);
  return path;
}

/**
 * The consequence simulation's wave map: every system the decision
 * reaches, merged across stages at its earliest wave (the ripple rides
 * the universe's machinery unchanged — scripted waves, same shader law).
 */
export function getConsequenceWaves(choiceId: string): ReadonlyMap<string, number> {
  const waves = new Map<string, number>();
  for (const stage of getDecisionPath(choiceId).stages) {
    for (const [entityId, wave] of Object.entries(stage.waves)) {
      const current = waves.get(entityId);
      waves.set(entityId, current === undefined ? wave : Math.min(current, wave));
    }
  }
  return waves;
}

/**
 * Ripple-time mapping (the shared-clock law, engine edition): converts
 * elapsed consequence milliseconds into the universe ripple's time units,
 * so a stage's text lands in the DOM at the exact instant its systems
 * ignite in the world — seen and announced can never disagree.
 */
export function scriptRippleTime(choiceId: string, elapsedMs: number): number {
  const times = getDecisionPath(choiceId).stages.map((s) => s.atMs);
  const last = times[times.length - 1];
  const unit = (wave: number) => wave * 0.85; // mirrors the shader's wave rise
  if (elapsedMs <= 0) return 0;
  // After the last stage lands, the final wave keeps rising at the same
  // tempo — consequences finish arriving, they never snap into place.
  if (elapsedMs >= last) {
    return unit(times.length) + Math.min(1, (elapsedMs - last) / 2400) * 0.85;
  }
  for (let k = 0; k < times.length; k += 1) {
    const start = k === 0 ? 0 : times[k - 1];
    const end = times[k];
    if (elapsedMs <= end) {
      const waveFrom = k === 0 ? 0 : k;
      const waveTo = k + 1;
      const t = end === start ? 1 : (elapsedMs - start) / (end - start);
      return unit(waveFrom) + (unit(waveTo) - unit(waveFrom)) * t;
    }
  }
  return unit(times.length) + 0.85;
}

/** Engine-arrival caption (the chapter's thesis). */
export const ENGINE_CAPTION_1 = 'Now the thinking is yours.';
export const ENGINE_CAPTION_2 = 'One situation. Incomplete information. Six weeks.';
