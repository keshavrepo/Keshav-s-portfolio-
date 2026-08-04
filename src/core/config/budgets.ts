import { motionBounds } from '@/design-system/tokens';

/**
 * Performance budgets as code (ARCHITECTURE §13). The timing ceilings are
 * locked story numbers; the byte ceilings are ours and fail at review.
 */
export const performanceBudgets = {
  timing: {
    firstPaintMs: motionBounds.firstPaintMax,
    inputLatencyMs: motionBounds.reactivityMax /** ER-3: presence is defined by instantaneity */,
  },
  bytes: {
    initialRouteJsGzipKb: 180,
    routeJsGzipKb: 350,
    imageMaxKb: 450,
  },
  lighthouse: {
    performance: 90,
    accessibility: 100,
    bestPractices: 95,
    seo: 100,
  },
} as const;

export type PerformanceBudgets = typeof performanceBudgets;
