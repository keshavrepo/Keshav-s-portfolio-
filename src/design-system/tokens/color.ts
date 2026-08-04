/**
 * Color tokens — Project K.
 *
 * Two authored surfaces and one rationed accent (ARCHITECTURE §4):
 *  - paper: the light, document-born default world (SPEC-001 §7.1).
 *  - ink: warm near-blacks; ink-950 is the threshold dark of the Opening —
 *    never pure black.
 *  - ember: the signal accent (the neuron's glow). Text-sized usage on paper
 *    requires ember-700 (WCAG AA at body sizes); ember-300/400 are glow-tier
 *    and decorative-only.
 *
 * No component may introduce a color that is not here (ARCHITECTURE §2, §20).
 */
export const colorTokens = {
  paper: {
    '50': '#FAF7F2',
    '100': '#F3EDE2',
    '200': '#E9DFCE',
    '300': '#DACDBC',
    '400': '#B7A58D',
    '500': '#8D7B64',
    '600': '#70604C',
  },
  ink: {
    '500': '#6E6353',
    '600': '#54493B',
    '700': '#3C342A',
    '800': '#2A241D',
    '900': '#1B1712',
    '950': '#120F0C',
  },
  ember: {
    '100': '#F8E3D0',
    '200': '#F2C7A4',
    '300': '#EBA978',
    '400': '#E18F58',
    '500': '#D3773C',
    '600': '#B25E2C',
    '700': '#8C4820',
  },
} as const;

export type ColorFamily = keyof typeof colorTokens;
export type ColorShade<F extends ColorFamily> = keyof (typeof colorTokens)[F];

/**
 * The shared neutral palette (V-C5): every chapter's field and ink resolves
 * toward one warm house register — paper for light rooms, ink for dark.
 * An alias by reference, never a restatement of the values above.
 */
export const sharedNeutrals = {
  light: colorTokens.paper,
  dark: colorTokens.ink,
} as const;

/**
 * The one sanctioned pure black (S69/§9: the True Fade at T11 only).
 * Everywhere else the house law stands: never pure black — ink-950 is the
 * darkest lawful surface. This token exists so the exception also obeys
 * one-number-one-place.
 */
export const TRUE_BLACK = '#000000';

/**
 * One chapter color constitution (VISUAL_DESIGN_BIBLE §4 · V-C register).
 * `accent.glow` is display/decorative only; `accent.text` is the
 * interaction/label tier and must hold ≥4.5:1 on `field` (V-C48).
 * `gradient` pairs an atmosphere sweep's endpoints; `null` where the
 * constitution forbids weather (Opening: void purity — V-C13;
 * Decision: a cliff has no gradients — V-C33).
 */
export interface ChapterPalette {
  field: string;
  ink: string;
  accent: { glow: string; text: string };
  gradient: readonly [from: string, to: string] | null;
}

/**
 * V2 chapter color constitutions — seven owned identities, warmth DNA
 * throughout: no cold neons, no cyberpunk cyans, no childish primaries
 * (V-C5/C6). Values are production executions of VISUAL_DESIGN_BIBLE §4.3;
 * candidates given there land here, one number, one place (V-C88/C89).
 * The resting state reuses the V1 house tokens by reference — the
 * post-story furniture palette inherits the house, never duplicates it.
 */
export const chapterPalettes = {
  /** I. The First Light — one warm signal in the dark; everything else silence. */
  opening: {
    field: '#0E0C0A',
    ink: '#F4EDE4',
    accent: { glow: '#FF7A3D', text: '#FF9A66' },
    gradient: null,
  },
  /** II. The Dusk Inside — a thinking room at dusk; layers of soft darkness. */
  mind: {
    field: '#171432',
    ink: '#ECE9F6',
    accent: { glow: '#8B7CF6', text: '#A99CFF' },
    gradient: ['#171432', '#241E4A'],
  },
  /** III. Daylight Thinking — understanding grows in daylight. No red here. */
  grammar: {
    field: '#F5F0E8',
    ink: '#171310',
    accent: { glow: '#12856A', text: '#0C6B53' },
    gradient: ['#F5F0E8', '#EDF2EA'],
  },
  /** IV. The Brass Archive — the record room under brass lamps. */
  universe: {
    field: '#0E1B2A',
    ink: '#EDF2F7',
    accent: { glow: '#E0B24A', text: '#E6BC5E' },
    gradient: ['#0E1B2A', '#16283B'],
  },
  /** V. The Red Pen — one verdict in a quiet room; crimson rationed ≤3%. */
  decision: {
    field: '#F7F4EF',
    ink: '#141110',
    accent: { glow: '#D13B3B', text: '#B02A2E' },
    gradient: null,
  },
  /** VI. The Morning Verdict — light becomes layout warmed from within. */
  impact: {
    field: '#FBF2DF',
    ink: '#16120E',
    accent: { glow: '#E8930C', text: '#B26F00' },
    gradient: ['#F2D9A6', '#FBF2DF'],
  },
  /** VII. Sunrise Infinite — the Opening's pulse, grown into dawn (bookend). */
  future: {
    field: '#FCFAF6',
    ink: '#14110E',
    accent: { glow: '#F26B3A', text: '#D04E22' },
    gradient: ['#F26B3A', '#F6C66D'],
  },
} as const satisfies Record<string, ChapterPalette>;

export type ChapterPaletteId = keyof typeof chapterPalettes;

/**
 * The resting state (V-C65): identity furniture outside the story —
 * references the house tokens, never re-states them.
 */
export const restingPalette: ChapterPalette = {
  field: colorTokens.paper['50'],
  ink: colorTokens.ink['900'],
  accent: { glow: colorTokens.ember['500'], text: colorTokens.ember['700'] },
  gradient: null,
};
