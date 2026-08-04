/**
 * Design tokens — the single source of truth for every value a component
 * may express (ARCHITECTURE §2). Consumed at compile time by
 * `tailwind.config.ts` and at runtime by the motion system.
 */
export { colorTokens } from './color';
export type { ColorFamily, ColorShade } from './color';
export { measureCh, typeScale } from './typography';
export type { TypeRole } from './typography';
export { layoutSpacing } from './spacing';
export type { LayoutSpacingToken } from './spacing';
export {
  durationClasses,
  easeClasses,
  gsapEasings,
  motionBounds,
  motionDurations,
  motionEasings,
} from './motion';
export type { MotionDuration, MotionEasing } from './motion';
