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
