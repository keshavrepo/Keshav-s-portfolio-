/**
 * Chapter Two content (SCENE-003): the running case and the ten stations
 * of thinking, grouped into the four locked circuits (SPEC-003 L-M2):
 * I. SENSE (observation, question) · II. STRUCTURE (pattern, evidence,
 * root cause) · III. WEIGH (stakeholders, constraints, trade-offs) ·
 * IV. DECIDE (decision, business impact).
 *
 * Stations run deeper than the mind world (z −26…−63) so the camera never
 * stops traveling forward — the same universe keeps evolving. Stage lines
 * obey the stage-beat cap (IR-12); whispers are one breath.
 *
 * The running case: a launch renamed a setting and quietly broke customers'
 * saved automations. Distinct from the Problem Room's case (SCENE-004+) —
 * this one is small, complete, and taught end-to-end.
 */
export interface GrammarStage {
  id: string;
  order: number;
  circuit: 1 | 2 | 3 | 4;
  title: string;
  /** What the visiting mind hears on listen (one breath). */
  whisper: string;
  /** The case, as it stands at this station. */
  stageLine: string;
  /** The expanded reasoning (click). */
  reasoning: string;
  /** Authored station position. */
  position: [number, number, number];
}

export const CIRCUIT_NAMES: Record<number, string> = {
  1: 'Circuit I — Sense',
  2: 'Circuit II — Structure',
  3: 'Circuit III — Weigh',
  4: 'Circuit IV — Decide',
};

export const GRAMMAR_STAGES: readonly GrammarStage[] = [
  {
    id: 'observation',
    order: 1,
    circuit: 1,
    title: 'Observation',
    whisper: 'Before touching anything, I watch.',
    stageLine:
      'Two weeks after launch, support tickets doubled. Noise everywhere — so first, I only watch.',
    reasoning:
      'No theory yet, no fix yet. I count: tickets by day, by feature, by customer cohort. The launch is the only thing that changed, and watching is how I learn what is signal before I reach for a lever.',
    position: [-5, 1.1, -26],
  },
  {
    id: 'question',
    order: 2,
    circuit: 1,
    title: 'Question',
    whisper: 'The right question is half the fix.',
    stageLine: "Not 'what broke?' — 'what exactly doubled, and whom does it hurt?'",
    reasoning:
      'A vague question buys a vague month. Precision is a budget decision: tickets doubled where, for whom, doing what. Every hour of analysis prices itself against how sharp the question is.',
    position: [-1.5, 2.3, -30],
  },
  {
    id: 'pattern',
    order: 3,
    circuit: 2,
    title: 'Pattern Recognition',
    whisper: 'Sixty-eight percent of the noise lives in one corner.',
    stageLine: 'Same three steps of onboarding. Same family of errors. The noise has an address.',
    reasoning:
      'Patterns are permission to stop reading everything. When most of the damage repeats in one shape, the scatterplot becomes a map — and the map says where to dig.',
    position: [2.6, 1.3, -34],
  },
  {
    id: 'evidence',
    order: 4,
    circuit: 2,
    title: 'Evidence Collection',
    whisper: 'One hundred and twenty tickets, read by hand. Then the logs.',
    stageLine:
      'I read 120 tickets, pulled session logs, and compared cohorts before and after launch. Proof, not vibes.',
    reasoning:
      'Opinions are free and priced accordingly. Before the room spends belief, I spend attention: verbatim tickets, failed payloads, cohort deltas. Evidence is what survives the meeting.',
    position: [5.6, -0.3, -38],
  },
  {
    id: 'root-cause',
    order: 5,
    circuit: 2,
    title: 'Root Cause Analysis',
    whisper: 'The feature was fine. The rename was not.',
    stageLine: "The feature worked. A renamed setting silently broke customers' saved automations.",
    reasoning:
      'Tickets doubled. Why? Setup errors spiked. Why? Their steps failed validation. Why? Saved automation payloads were rejected. Why? A settings key was renamed at launch. Not a person — a system seam.',
    position: [2, -1.7, -42],
  },
  {
    id: 'stakeholders',
    order: 6,
    circuit: 3,
    title: 'Stakeholder Mapping',
    whisper: 'Support owns the queue. Customers own the wound.',
    stageLine:
      'Support owns the queue. Engineering owns the key. Customers own the broken automations. All in the room.',
    reasoning:
      "Every fix moves someone's cost. Mapping who pays, who decides, and who gets surprised is not politics — it is how a recommendation lands as a decision instead of a document.",
    position: [-2.6, -0.9, -46],
  },
  {
    id: 'constraints',
    order: 7,
    circuit: 3,
    title: 'Constraints',
    whisper: 'Work inside the corridor, or widen it honestly.',
    stageLine: 'Two weeks. No breaking changes. One engineer. The corridor is the brief.',
    reasoning:
      'Constraints are not the enemy of the answer; they are its shape. A fix that needs four engineers is fiction. Naming the corridor early is how the real option survives scrutiny.',
    position: [-5.8, 0.7, -50],
  },
  {
    id: 'tradeoffs',
    order: 8,
    circuit: 3,
    title: 'Trade-offs',
    whisper: 'Revert is safe and sad. Fix-forward is harder and keeps trust.',
    stageLine:
      'Revert — safe, and it kills the feature. Fix-forward — harder, and it keeps the promise.',
    reasoning:
      'Every option is priced in two currencies: risk and regret. Revert erases two weeks of belief. Fix-forward costs an alias key and a migration script. Choose with open eyes — then say what it costs.',
    position: [-1.8, 1.9, -54],
  },
  {
    id: 'decision',
    order: 9,
    circuit: 4,
    title: 'Decision',
    whisper: 'Commitment has a date and a name.',
    stageLine:
      'Fix forward: restore the old key as an alias, ship the migration script. Decided — with a date.',
    reasoning:
      'A decision is not the smart analysis; it is the named owner, the date, and the cost accepted out loud. Ambiguity ends where commitment begins.',
    position: [2.8, 0.9, -58],
  },
  {
    id: 'impact',
    order: 10,
    circuit: 4,
    title: 'Business Impact',
    whisper: 'Tickets down 72% in fourteen days.',
    stageLine:
      'Tickets −72% in fourteen days. Automations healed. The team kept the feature they were proud of.',
    reasoning:
      'Impact is the only scoreboard: the metric moved, the customers healed, and the team is proud of the path taken. Analysis that cannot point here was a lecture, not a decision.',
    position: [0, 1.3, -63],
  },
] as const;

/** The 5-whys ladder for the earned micro-interaction at station five. */
export const WHY_LADDER: readonly string[] = [
  'Support tickets doubled. Why?',
  'Setup errors spiked in one flow. Why?',
  'Those steps began failing validation. Why?',
  "Customers' saved automations were rejected. Why?",
  'A settings key was renamed at launch. The cause is a system seam — not a person.',
] as const;

/** The choice offered at the trade-offs station (either is teachable). */
export const TRADEOFF_OPTIONS = [
  {
    id: 'revert',
    title: 'Revert',
    summary: 'Safe tonight; kills the feature and two weeks of belief.',
  },
  {
    id: 'fix-forward',
    title: 'Fix forward',
    summary: 'Alias the old key and ship a migration script; harder, keeps trust.',
  },
] as const;

/** Impact figures for the reveal (font-figure, tabular by law). */
export const IMPACT_FIGURES = [
  { value: '−72%', label: 'support tickets, day 14' },
  { value: '100%', label: 'broken automations healed' },
  { value: '14d', label: 'decision to impact' },
] as const;

export function getStage(id: string): GrammarStage {
  const stage = GRAMMAR_STAGES.find((s) => s.id === id);
  if (!stage) throw new Error(`Unknown grammar stage: ${id}`);
  return stage;
}

/** Grammar-arrival caption (the chapter's thesis). */
export const GRAMMAR_CAPTION_1 = 'Abstract thoughts become a decision.';
export const GRAMMAR_CAPTION_2 = 'Follow one real case through ten stations of thinking.';
