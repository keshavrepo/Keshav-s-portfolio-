/**
 * Chapter Four content (SCENE-004): the Business Universe — the committed
 * decision of Chapter Two, grown into the living system it serves. The
 * registry is the story: eleven systems in three tiers of hierarchy (the
 * heart, the facing systems, the backbone — never visualized equally),
 * and fifteen authored cause→effect relationships with their verbs.
 *
 * The world sits deeper than the process world (heart z −74, backbone to
 * −84) so the camera never stops traveling forward — the same universe
 * keeps evolving (mission: no page transition, no reset).
 *
 * Whispers obey the one-breath cap (IR-12); lines are one poem-line. The
 * flywheel edges (`core`) are the loops a Business Analyst watches first:
 * attention → orders → revenue → fuel → attention, product → retention.
 */
export type EntityTier = 0 | 1 | 2;

export interface BusinessEntity {
  id: string;
  order: number;
  tier: EntityTier;
  title: string;
  /** What the system says on listen (one breath). */
  whisper: string;
  /** What the system is, said flatly (system line). */
  line: string;
  /** The expanded reasoning (select / isolate). */
  reasoning: string;
  /** Authored world position. */
  position: [number, number, number];
  /** Scroll progress (u) at which the system is earned into existence. */
  threshold: number;
}

/** A directed cause→effect relationship. The verb is the teaching. */
export interface BusinessEdge {
  from: string;
  to: string;
  verb: string;
  /** Flywheel/loop edges — rendered with more mass (hierarchy is authored). */
  core: boolean;
}

export const TIER_NAMES: Record<EntityTier, string> = {
  0: 'The heart',
  1: 'The facing systems',
  2: 'The backbone',
};

export const BUSINESS_ENTITIES: readonly BusinessEntity[] = [
  {
    id: 'customers',
    order: 1,
    tier: 0,
    title: 'Customers',
    whisper: 'Every number in this business is a person deciding.',
    line: 'The heart. Everything a business does serves a customer — or is overhead wearing a costume.',
    reasoning:
      'If a change cannot be traced to a customer outcome, I keep asking why it exists. Churn, expansion, the support queue — every metric the company watches is downstream of a person choosing to stay.',
    position: [0, 1.0, -74],
    threshold: 0,
  },
  {
    id: 'orders',
    order: 2,
    tier: 1,
    title: 'Orders',
    whisper: 'Demand, made countable.',
    line: 'Orders are where intent becomes obligation: revenue, inventory, and workload are all born here.',
    reasoning:
      'Watch the shape of orders and you see the business before it knows itself. A spike is joy only if operations can carry it; a dip is a question Marketing and Product must answer together.',
    position: [3.0, 1.8, -77],
    threshold: 0.1,
  },
  {
    id: 'support',
    order: 3,
    tier: 1,
    title: 'Support',
    whisper: 'The queue is the voice of the product.',
    line: 'Support hears the truth first. Ticket themes are the earliest warning system the business owns.',
    reasoning:
      'When tickets doubled after launch, the smoke appeared here — two weeks before any chart would have caught it. I read queues the way doctors read symptoms: pattern first, then proof.',
    position: [3.9, -0.5, -79],
    threshold: 0.16,
  },
  {
    id: 'product',
    order: 4,
    tier: 1,
    title: 'Product',
    whisper: 'The promise, kept in software.',
    line: 'Product is the accumulated weight of every decision the company has shipped — and every one it delayed.',
    reasoning:
      'A renamed key broke a thousand saved automations, and Product learned it from Support. The tightest loop in a healthy business runs between what ships and what customers report.',
    position: [-3.9, -0.4, -78],
    threshold: 0.22,
  },
  {
    id: 'marketing',
    order: 5,
    tier: 1,
    title: 'Marketing',
    whisper: 'Attention is bought with money, or earned with truth.',
    line: 'Marketing starts the flywheel: attention becomes pipeline, pipeline becomes orders.',
    reasoning:
      'Cheap attention is the most expensive kind — it arrives curious and leaves disappointed, and Support inherits the disappointment. I price marketing by the quality of the customers it sends.',
    position: [-3.6, 2.0, -76],
    threshold: 0.28,
  },
  {
    id: 'sales',
    order: 6,
    tier: 1,
    title: 'Sales',
    whisper: 'Promises, priced.',
    line: 'Sales converts attention into commitment — and every over-promise quietly lands in Support.',
    reasoning:
      'A good quarter with bad promises is a loan against future churn. When I map a business, I trace what Sales says against what Product can keep — the gap is always someone’s workload.',
    position: [-1.0, 3.0, -78],
    threshold: 0.34,
  },
  {
    id: 'inventory',
    order: 7,
    tier: 2,
    title: 'Inventory',
    whisper: 'Cash, asleep on shelves.',
    line: 'Inventory is the buffer between what customers order and what operations can deliver.',
    reasoning:
      'Too much and cash sleeps; too little and customers wait. The right buffer is a calculated bet on demand — and the bet is only as good as the order data feeding it.',
    position: [2.2, -2.2, -80],
    threshold: 0.48,
  },
  {
    id: 'operations',
    order: 8,
    tier: 2,
    title: 'Operations',
    whisper: 'Where promises meet physics.',
    line: 'Operations turns orders into deliveries; its constraints quietly price every rush promise.',
    reasoning:
      'Every "just one more thing" is paid here, in capacity nobody budgeted. Constraints are not obstruction — they are the honest price list of the promises everyone else makes.',
    position: [-1.9, -2.5, -82],
    threshold: 0.54,
  },
  {
    id: 'revenue',
    order: 9,
    tier: 2,
    title: 'Revenue',
    whisper: 'The scoreboard of kept promises.',
    line: 'Revenue is lagging evidence: it reports decisions made months ago, by every team at once.',
    reasoning:
      'By the time revenue moves, the cause is already history. I read it as an autopsy of attention, product, and delivery — which is why the queue warns earlier than the ledger.',
    position: [4.9, 1.1, -81],
    threshold: 0.6,
  },
  {
    id: 'finance',
    order: 10,
    tier: 2,
    title: 'Finance',
    whisper: 'Fuel, and the gauge.',
    line: 'Finance feeds the loops that grow the business and starves the ones that no longer pay.',
    reasoning:
      'Funding is the most honest strategy document a company writes. Where the money flows next quarter is the real roadmap — everything else is intention.',
    position: [0.4, -0.2, -84],
    threshold: 0.66,
  },
  {
    id: 'stakeholders',
    order: 11,
    tier: 2,
    title: 'Stakeholders',
    whisper: 'Belief, capital, and patience — all finite.',
    line: 'Stakeholders fund the machine and set its risk appetite; their patience is a budget too.',
    reasoning:
      'Every fix moves someone’s cost. Mapping who pays, who decides, and who gets surprised is how a recommendation lands as a decision instead of a document.',
    position: [-4.9, 1.3, -83],
    threshold: 0.72,
  },
] as const;

export const BUSINESS_EDGES: readonly BusinessEdge[] = [
  { from: 'marketing', to: 'customers', verb: 'earns attention', core: true },
  { from: 'customers', to: 'orders', verb: 'place', core: true },
  { from: 'orders', to: 'revenue', verb: 'becomes', core: true },
  { from: 'revenue', to: 'finance', verb: 'feeds', core: true },
  { from: 'finance', to: 'marketing', verb: 'funds', core: true },
  { from: 'product', to: 'customers', verb: 'retains', core: true },
  { from: 'marketing', to: 'sales', verb: 'fills the pipeline', core: false },
  { from: 'sales', to: 'orders', verb: 'converts', core: false },
  { from: 'orders', to: 'inventory', verb: 'draws down', core: false },
  { from: 'inventory', to: 'operations', verb: 'constrains', core: false },
  { from: 'operations', to: 'orders', verb: 'fulfills', core: false },
  { from: 'support', to: 'customers', verb: 'protects', core: false },
  { from: 'support', to: 'product', verb: 'informs', core: false },
  { from: 'stakeholders', to: 'finance', verb: 'backs', core: false },
  { from: 'stakeholders', to: 'product', verb: 'steers', core: false },
] as const;

export function getEntity(id: string): BusinessEntity {
  const entity = BUSINESS_ENTITIES.find((e) => e.id === id);
  if (!entity) throw new Error(`Unknown business entity: ${id}`);
  return entity;
}

/**
 * The dependency engine (SCENE-004): breadth-first waves downstream of a
 * system, following outbound cause→effect edges. Wave 0 is the system
 * itself; wave k feels the change k steps later. Pure authored data — the
 * same waves drive the WebGL ripple and the DOM labels, so what is seen
 * and what is announced can never disagree.
 */
export function getDownstreamWaves(originId: string): ReadonlyMap<string, number> {
  const waves = new Map<string, number>([[originId, 0]]);
  let frontier = [originId];
  let depth = 1;
  while (frontier.length > 0 && depth <= BUSINESS_ENTITIES.length) {
    const next: string[] = [];
    for (const edge of BUSINESS_EDGES) {
      if (!frontier.includes(edge.from)) continue;
      if (!waves.has(edge.to)) {
        waves.set(edge.to, depth);
        next.push(edge.to);
      }
    }
    frontier = [...new Set(next)];
    depth += 1;
  }
  return waves;
}

/** Direct feeders of a system (inbound neighbors — the context of a change). */
export function getUpstream(id: string): readonly string[] {
  return BUSINESS_EDGES.filter((edge) => edge.to === id).map((edge) => edge.from);
}

/** Every system touching `id` in either direction — the hover neighborhood. */
export function getNeighbors(id: string): readonly string[] {
  const neighbors = new Set<string>();
  for (const edge of BUSINESS_EDGES) {
    if (edge.from === id) neighbors.add(edge.to);
    if (edge.to === id) neighbors.add(edge.from);
  }
  return [...neighbors];
}

/** The wedge that touches an edge and an entity (hover highlighting). */
export function edgeTouches(edge: BusinessEdge, id: string): boolean {
  return edge.from === id || edge.to === id;
}

/** The downstream chain, said in one line for the isolation card. */
export function describeChain(originId: string): string {
  const waves = getDownstreamWaves(originId);
  if (waves.size <= 1) return 'A change here stays contained.';
  const byWave = new Map<number, string[]>();
  for (const [id, wave] of waves) {
    if (wave === 0) continue;
    byWave.set(wave, [...(byWave.get(wave) ?? []), getEntity(id).title]);
  }
  const parts = [...byWave.entries()]
    .sort((a, b) => a[0] - b[0])
    .slice(0, 3)
    .map(
      ([wave, ids]) =>
        `${wave === 1 ? 'first' : wave === 2 ? 'then' : 'and finally'} ${ids.join(', ')}`,
    );
  return `A change here travels: ${parts.join('; ')}.`;
}

/** Universe-arrival caption (the chapter's thesis). */
export const UNIVERSE_CAPTION_1 = 'One decision, kept, became a business.';
export const UNIVERSE_CAPTION_2 = 'Watch a single commitment grow into a living system.';
