/**
 * The mind world's content (SCENE-002). Every object is a business concept;
 * nothing decorative (mission). Nine nodes of analytical thinking, authored
 * — hand-composed positions, not procedural scatter. Whispers obey the
 * one-breath cap (≤15 words), thoughts the stage-beat cap (≤40) — IR-12.
 * Text is the only "content" here; meaning is the only visual.
 */
export interface MindNode {
  id: string;
  title: string;
  whisper: string;
  thought: string;
  position: [number, number, number];
  /** Travel-stop hint used to invite the next unvisited node. */
  order: number;
}

export interface MindPath {
  from: string;
  to: string;
}

export const MIND_NODES: readonly MindNode[] = [
  {
    id: 'framing',
    order: 1,
    title: 'Problem Framing',
    whisper: 'Every engagement starts by naming the real problem.',
    thought:
      'Most work fails before it begins: the wrong problem gets funded. Framing is choosing which question deserves the next quarter of the company.',
    position: [-6.2, 1.2, -2.5],
  },
  {
    id: 'why',
    order: 2,
    title: 'Asking Why',
    whisper: "The fifth 'why' is usually the true one.",
    thought:
      "Symptoms are loud; causes are quiet. I keep asking why until the answer stops being a person's name and becomes a system's design.",
    position: [-3.1, 2.1, -6.5],
  },
  {
    id: 'evidence',
    order: 3,
    title: 'Evidence First',
    whisper: 'Opinions are free. Evidence costs attention.',
    thought:
      'Before any recommendation, I collect what the business can prove. Then I let the proof argue with the room — not the other way around.',
    position: [0.4, 1.0, -4.5],
  },
  {
    id: 'stakeholders',
    order: 4,
    title: 'Stakeholder Truth',
    whisper: 'Everyone sees a different company.',
    thought:
      'The sales story, the ops story, and the founder story are three different films. My job is to cut one truthful version everyone can act in.',
    position: [-7.6, -0.5, -10],
  },
  {
    id: 'waiting',
    order: 5,
    title: 'The Cost of Waiting',
    whisper: 'Doing nothing is also a decision.',
    thought:
      'Every month of indecision writes a cost line no one approved. Analysis carries a deadline; perfect confidence is not on the menu.',
    position: [3.6, 0.3, -9],
  },
  {
    id: 'tradeoffs',
    order: 6,
    title: 'Trade-offs',
    whisper: 'Strategy is what you refuse to fund.',
    thought:
      'A decision without a sacrifice is a wish. I make the cost visible, the alternative explicit, and help the room choose with open eyes.',
    position: [-1.6, -0.7, -12],
  },
  {
    id: 'metrics',
    order: 7,
    title: 'Metrics That Matter',
    whisper: 'A dashboard of everything measures nothing.',
    thought:
      'I pick the few numbers that change behavior: north-star, driver, guardrail. A metric that never triggers a decision is decoration.',
    position: [2.7, 2.7, -14],
  },
  {
    id: 'second-order',
    order: 8,
    title: 'Second-Order Effects',
    whisper: 'Every fix teaches the system something.',
    thought:
      'The first effect is the one in the deck. The second arrives in a year. I model both before I call anything a solution.',
    position: [6.6, 1.5, -16],
  },
  {
    id: 'deciding',
    order: 9,
    title: 'Deciding Anyway',
    whisper: 'Ambiguity is where the job begins.',
    thought:
      'No dataset arrives complete. At some point analysis owes the room a verdict: this way, at this cost, with these eyes open. That is the work.',
    position: [0.2, 0.7, -19],
  },
] as const;

export const MIND_PATHS: readonly MindPath[] = [
  { from: 'framing', to: 'why' },
  { from: 'framing', to: 'evidence' },
  { from: 'framing', to: 'stakeholders' },
  { from: 'why', to: 'waiting' },
  { from: 'evidence', to: 'waiting' },
  { from: 'why', to: 'tradeoffs' },
  { from: 'evidence', to: 'metrics' },
  { from: 'stakeholders', to: 'tradeoffs' },
  { from: 'waiting', to: 'deciding' },
  { from: 'tradeoffs', to: 'deciding' },
  { from: 'metrics', to: 'second-order' },
  { from: 'second-order', to: 'deciding' },
] as const;

export function getMindNode(id: string): MindNode {
  const node = MIND_NODES.find((n) => n.id === id);
  if (!node) throw new Error(`Unknown mind node: ${id}`);
  return node;
}

/** The vista-arrival line (SPEC-003, Chapter One framing). Verbatim. */
export const VISTA_CAPTION_1 = 'You are not exploring a portfolio.';
export const VISTA_CAPTION_2 = 'You are exploring how a Business Analyst thinks.';
