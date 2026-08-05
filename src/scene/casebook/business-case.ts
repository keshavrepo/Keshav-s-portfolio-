/**
 * The Business Case (SPRINT 3 identity layer): the way Project K presents
 * work. Not software with screenshots — a business reasoning record.
 * The twelve stages below are the presentation order and the TABLE of the
 * casebook; every case renders all twelve, in this order, under these
 * labels. A case that cannot fill a stage honestly is not finished.
 *
 * The grammar mirrors the story's own circuits (SENSE → STRUCTURE →
 * WEIGH → DECIDE, SCENE-003 law) extended to execution and lessons —
 * the story teaches the method; the casebook shows it applied.
 */

export interface CaseMetric {
  /** The numeral, authored (tabulated at render, IR-35). */
  value: string;
  /** What the numeral counts. */
  label: string;
}

export interface BusinessCase {
  id: string;
  title: string;
  /** The market or operating territory (retail ops, SaaS onboarding…). */
  domain: string;
  timeframe?: string;
  businessContext: string;
  problem: string;
  research: string;
  marketAnalysis: string;
  userAnalysis: string;
  data: string;
  insights: string;
  decision: string;
  strategy: string;
  execution: string;
  businessImpact: {
    /** The outcome in one sentence — what changed for the business. */
    outcome: string;
    /** The evidence row — numerals that would survive a review board. */
    metrics: readonly CaseMetric[];
  };
  lessonsLearned: readonly string[];
}

/**
 * The stage registry — order IS the contract. Renderers map stages to
 * case fields; eyebrow numerals come from the index (01–12).
 */
export const CASE_STAGES = [
  { id: 'businessContext', label: 'Business Context' },
  { id: 'problem', label: 'Problem' },
  { id: 'research', label: 'Research' },
  { id: 'marketAnalysis', label: 'Market Analysis' },
  { id: 'userAnalysis', label: 'User Analysis' },
  { id: 'data', label: 'Data' },
  { id: 'insights', label: 'Insights' },
  { id: 'decision', label: 'Decision' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'execution', label: 'Execution' },
  { id: 'businessImpact', label: 'Business Impact' },
  { id: 'lessonsLearned', label: 'Lessons Learned' },
] as const;

export type CaseStageId = (typeof CASE_STAGES)[number]['id'];
