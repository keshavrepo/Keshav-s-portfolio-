import { BUSINESS_ENTITIES } from '@/scene/universe/universe-content';

/**
 * Chapter Five, continued (SCENE-006): the Impact Engine. The decision of
 * Chapter Five stops being an event and becomes a shape. This registry
 * answers "what happened because of the decision?" in the only language
 * this portfolio speaks: structure. Each path re-architects the universe
 * — affected systems move (physical consequence), resize (metric health,
 * never charts), and carry their reason as text; the whole constellation
 * settles from grown complexity into authored calm (recovery).
 */

/** One system's outcome under a path — what it whispers, and why. */
export interface SystemOutcome {
  /** One breath, on listen. */
  whisper: string;
  /** The deeper reasoning, on select — the cause chain, said plainly. */
  reasoning: string;
  /** Where the system settles in the final universe state. */
  settle: [number, number, number];
  /** Metric transformation as physical mass (1 = unchanged). */
  scale: number;
}

interface PathOutcome {
  /** Affected systems, keyed by entity id. Unaffected ones use the base. */
  systems: Record<string, SystemOutcome>;
  lessons: readonly string[];
}

/** The calm architecture every path settles toward, before path deltas. */
export const FINAL_LAYOUT: Record<string, SystemOutcome> = {
  customers: {
    whisper: 'The heart, still beating — changed by everything it survived.',
    reasoning:
      'Every number you watched move was a person deciding. The heart holds its place because everything else reorganized to keep it there.',
    settle: [0, 1.0, -74],
    scale: 1,
  },
  orders: {
    whisper: 'Demand, quieter now — and readable again.',
    reasoning:
      'The panic is out of the order flow. What remains is the real signal the business will plan the next year on.',
    settle: [3.1, 1.5, -77],
    scale: 1,
  },
  support: {
    whisper: 'The queue found its level — whatever the decision priced it at.',
    reasoning:
      'Support always settles where the decision left it: frozen hire, absorbed questions, or honest surge that ended. The queue is the truest ledger of the choice.',
    settle: [1.9, -0.9, -77.8],
    scale: 1,
  },
  product: {
    whisper: 'The promise, re-weighed by what the decision bought it.',
    reasoning:
      'Product carries the decision forward: thinner budget, a shipped centerpiece, or a sharpened roadmap. What ships next retells the choice.',
    settle: [-1.9, -0.7, -77.8],
    scale: 1,
  },
  marketing: {
    whisper: 'Attention, re-priced by what the quarter taught.',
    reasoning:
      'Marketing learned what the decision made true: a price story, a product story, or a reputation story. It will spend the next quarter telling it.',
    settle: [-3.1, 1.7, -77],
    scale: 1,
  },
  sales: {
    whisper: 'Promises, re-priced — the mix never lies about the decision.',
    reasoning:
      'The deal mix is the decision repeated daily: price-first buyers, believers waiting for the feature, or right-fit customers who were never sold hard.',
    settle: [0, 2.9, -77.6],
    scale: 1,
  },
  inventory: {
    whisper: 'The buffer, re-sized to the demand the decision left.',
    reasoning:
      'Inventory holds nobody’s feelings. It settled against the order flow that actually arrived — the bet the business can now afford to make.',
    settle: [4.6, -1.8, -80.6],
    scale: 1,
  },
  operations: {
    whisper: 'Physics, unbothered — capacity is the one thing that never spun.',
    reasoning:
      'Operations absorbed every promise the decision made and priced each one in capacity. The calmest system in the frame, because it never lies.',
    settle: [2.3, -2.6, -81.4],
    scale: 1,
  },
  revenue: {
    whisper: 'The scoreboard, reporting a quarter the decision authored.',
    reasoning:
      'Revenue is lagging evidence — it now reads as the consequence, permanently. Next quarter it will read as the platform the decision built.',
    settle: [5.9, 1.4, -81],
    scale: 1,
  },
  finance: {
    whisper: 'Fuel, re-routed — the honest map of what mattered.',
    reasoning:
      'Where the money flowed during the crisis is the truest strategy document the company will ever write. Finance carries it forward unchanged in tone.',
    settle: [0, 0.4, -83.2],
    scale: 1,
  },
  stakeholders: {
    whisper: 'Patience, re-measured — belief is a budget too.',
    reasoning:
      'Stakeholders watched the quarter the decision authored. Their patience re-priced itself — one notch thinner, or quietly deeper. Either way, remembered.',
    settle: [-5.9, 1.6, -81.2],
    scale: 1,
  },
};

/** Per-path physical consequences: the affected systems change shape. */
export const PATH_OUTCOMES: Record<string, PathOutcome> = {
  shield: {
    systems: {
      customers: {
        whisper: 'It stayed — held by price, not belief.',
        reasoning:
          'Your shield held the renewals: seven in ten at-risk accounts stayed. But price-held customers are tenants, not believers — retention now needs paying for every year. The heart beats on, at a standing discount.',
        settle: [0, 1.0, -74],
        scale: 1.05,
      },
      finance: {
        whisper: 'The margin left the same week the churn stopped.',
        reasoning:
          'Eighteen points of margin on every shielded renewal — booked the same week the churn curve bent. The trade was clean, immediate, and permanent: this is the quarter Finance will compare every future quarter against.',
        settle: [0, 0.2, -82.2],
        scale: 0.92,
      },
      support: {
        whisper: 'The queue aged. The hire stayed frozen.',
        reasoning:
          'To protect the quarter, the open Support hire was frozen — and the queue you watched double in Chapter Two now waits longer, every day. The cost of holding the base was sent to the people who answer it.',
        settle: [2.6, -1.6, -79.4],
        scale: 0.78,
      },
      marketing: {
        whisper: 'Word travelled. The pipeline learned the price.',
        reasoning:
          'A discount is a message, and messages travel further than invoices. New deals now arrive quoting your own loyalty price back at you — attention got cheaper to earn and more expensive to respect.',
        settle: [-2.6, 2.1, -76.4],
        scale: 1.1,
      },
      sales: {
        whisper: 'The mix tilted price-first — and stays there.',
        reasoning:
          'Sales closes what Marketing sends, and Marketing now sends buyers who came for the discount. The pipeline works; it simply works for a different business than the one you started with.',
        settle: [0.6, 2.6, -77],
        scale: 1.05,
      },
      product: {
        whisper: 'Next year’s budget is this year’s proof.',
        reasoning:
          'The shield had to be paid from somewhere, and it was paid from the roadmap. Feature work thins; the gap the competitor opened stays open one season longer. The price of time, invoiced to the future.',
        settle: [-2.4, -1.2, -78.6],
        scale: 0.9,
      },
    },
    lessons: [
      'A price can hold a base — it cannot teach the base to love it.',
      'Every discount is a message, and messages travel further than invoices.',
      'Impact is never local: the shield was bought in the support queue.',
    ],
  },
  bet: {
    systems: {
      product: {
        whisper: 'The centerpiece shipped — late, and real.',
        reasoning:
          'The templates shipped a month late and changed the conversation anyway: churn now has a reason to reverse. A strong product is the slowest retention tool there is, and the only honest one.',
        settle: [0, -0.4, -76.2],
        scale: 1.25,
      },
      support: {
        whisper: 'It absorbed the waiting — with a straight face.',
        reasoning:
          'Three months of "is it ready yet?" landed here, daily, before the feature did. The queue took the weight of the promise so the roadmap could keep it.',
        settle: [1.7, -0.6, -77.2],
        scale: 0.95,
      },
      marketing: {
        whisper: 'Finally, a story worth the attention it buys.',
        reasoning:
          'For two years Marketing sold maintenance. Now it sells momentum — attention that arrives curious and stays for a reason. The flywheel runs on truth again.',
        settle: [-2.9, 2.0, -76.6],
        scale: 1.05,
      },
      customers: {
        whisper: 'The ones who waited are the ones who believe.',
        reasoning:
          'Some at-risk accounts held for the feature alone — belief, not price. They are fewer than a shield would have kept, and worth more than any model knew how to count.',
        settle: [0, 1.0, -74],
        scale: 1.0,
      },
      sales: {
        whisper: 'It sold a promise — then waited a month to be right.',
        reasoning:
          'The slip made every closed deal a small act of faith. Pipeline survived on credibility Sales could not point at yet — the most expensive currency in the room.',
        settle: [-1.4, 2.4, -79.0],
        scale: 0.95,
      },
      revenue: {
        whisper: 'The quarter missed. The ledger remembers why.',
        reasoning:
          'Eight percent of the cliff renewed into the gap, and the quarter missed. Revenue is lagging evidence — next quarter it will read as the platform this miss was buying.',
        settle: [6.4, 1.0, -81.4],
        scale: 0.92,
      },
      stakeholders: {
        whisper: 'Patience: one notch thinner, honestly spent.',
        reasoning:
          'The miss was flagged, priced, and explained before it arrived. Belief holds — but it is belief with a scar now, and scars remember what they were spent on.',
        settle: [-6.8, 2.2, -82.6],
        scale: 0.9,
      },
    },
    lessons: [
      'A strong product is the slowest retention tool — and the only honest one.',
      'Every roadmap promise is pre-spent trust; the slip is always priced somewhere.',
      'Missing a quarter is survivable. Breaking belief is not.',
    ],
  },
  triage: {
    systems: {
      customers: {
        whisper: 'A smaller base — an honest one.',
        reasoning:
          'Wrong-fit accounts left without a discount, and the base shrank in public. What remains chose to stay: six in ten enterprise saves, held by repair instead of price. Slower now. Stronger every year after.',
        settle: [0, 1.0, -74],
        scale: 0.92,
      },
      support: {
        whisper: 'The surge came, did its work, and ended.',
        reasoning:
          'The queue doubled the day outreach began — and the team knew why. Unlike a frozen hire, an honest surge ends: saves landed, the queue cleared, and nobody in Support dreads Monday now.',
        settle: [1.2, -0.5, -76.6],
        scale: 1.15,
      },
      revenue: {
        whisper: 'It dipped honestly, and recovered on schedule.',
        reasoning:
          'The dip was the plan, said out loud before it happened: wrong-fit revenue leaving, right-fit revenue healing. Revenue is lagging evidence — it now reads as the cleanest quarter the company has had.',
        settle: [5.4, 1.2, -80.8],
        scale: 0.95,
      },
      product: {
        whisper: 'The exit notes wrote the roadmap.',
        reasoning:
          'Departing customers left the sharpest product research the company ever bought — no committee, no filter. The roadmap is shorter now, and every line on it is load-bearing.',
        settle: [-1.4, -0.5, -76.6],
        scale: 1.1,
      },
      marketing: {
        whisper: 'Honesty compounds. Two referrals prove it.',
        reasoning:
          'Two departed customers sent new ones — the only channel that cannot be bought. It is slow, unimpressive in a quarterly deck, and the strongest force in this frame.',
        settle: [-3.4, 1.9, -77.4],
        scale: 0.95,
      },
      operations: {
        whisper: 'Capacity, finally matched to honest demand.',
        reasoning:
          'A smaller, right-fit order flow is the cheapest capacity plan a business ever gets. Operations stopped subsidizing customers who were never going to stay.',
        settle: [2.5, -2.2, -80.8],
        scale: 1.05,
      },
    },
    lessons: [
      'The queue is the first prophet of churn; read it before the ledger.',
      'Honesty is not free — it just compounds instead of expiring.',
      'A smaller, healthy base outearns a larger, forgiving one.',
    ],
  },
};

/** Reflection (SCENE-006 layer): after having watched, not after choosing. */
export const IMPACT_REFLECTION = [
  'You watched one decision become weather, then climate.',
  'That is impact: not a number on a dashboard — a new shape the business will live inside.',
] as const;

/** Impact-arrival caption (the chapter's thesis). */
export const IMPACT_CAPTION_1 = 'Watch what your decision became.';
export const IMPACT_CAPTION_2 =
  'The consequence settles into structure. The business finds its new shape.';

/** The resolved outcome for one system under the committed path. */
export function getSystemOutcome(pathId: string, entityId: string): SystemOutcome {
  const fromPath = PATH_OUTCOMES[pathId]?.systems[entityId];
  if (fromPath) return fromPath;
  const base = FINAL_LAYOUT[entityId];
  if (!base) throw new Error(`Unknown system outcome: ${entityId}`);
  return base;
}

/** The lessons of the committed path (Lessons Layer). */
export function getPathLessons(pathId: string): readonly string[] {
  return PATH_OUTCOMES[pathId]?.lessons ?? [];
}

/** Ids of the systems the decision physically changed (for stagger order). */
export function getAffectedIds(pathId: string): readonly string[] {
  const path = PATH_OUTCOMES[pathId];
  if (!path) return [];
  return BUSINESS_ENTITIES.filter((e) => e.id in path.systems).map((e) => e.id);
}
