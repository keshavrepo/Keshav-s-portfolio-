import type { Lane, LaneSignals, MotionMode } from './types';

const SLOW_TYPES = new Set(['slow-2g', '2g', '3g']);

/**
 * The default lane a device deserves (ARCHITECTURE §11/§16). Coercion is a
 * promise kept downward: a device never receives a fidelity it cannot honor.
 */
export function resolveDefaultLane(signals: LaneSignals): Lane {
  if (signals.saveData || (signals.effectiveType && SLOW_TYPES.has(signals.effectiveType))) {
    return 'express';
  }
  if (signals.reducedMotion) return 'stills';
  if (!signals.webgl2) return 'stills';

  const memory = signals.deviceMemory ?? 8;
  const cores = signals.hardwareConcurrency ?? 8;
  if (memory < 4 || cores < 4) return 'stills';

  return 'cinematic';
}

/**
 * Clamp a requested lane against capability. User override is honored
 * wherever the device can keep its promise; e.g. requesting the cinematic
 * telling under `prefers-reduced-motion` yields stills, never animation the
 * visitor asked not to receive.
 */
export function coerceLane(requested: Lane, signals: LaneSignals): Lane {
  if (requested === 'cinematic') {
    if (signals.reducedMotion) return 'stills';
    if (!signals.webgl2) return 'stills';
  }
  if (requested === 'stills' && signals.saveData) return 'express';
  return requested;
}

/** The single motion mode every animated layer must obey (ARCHITECTURE §7). */
export function resolveMotionMode(
  lane: Lane,
  motionPreference: 'system' | 'full' | 'reduced',
  systemReduced: boolean,
): MotionMode {
  if (systemReduced) return 'reduced';
  if (motionPreference === 'reduced') return 'reduced';
  if (motionPreference === 'full' && lane !== 'semantic') return 'full';
  if (lane === 'semantic' || lane === 'express') return 'reduced';
  return 'full';
}
