import type { LaneSignals } from '@/core/lane/types';

/**
 * Capability probing (ARCHITECTURE §9): cached, SSR-safe, side-effect-free
 * at import. A device is never promised a fidelity it cannot honor.
 */

export interface GraphicsCapability {
  webgl1: boolean;
  webgl2: boolean;
  maxTextureSize: number;
}

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
}

let graphicsCache: GraphicsCapability | null = null;

export function probeGraphics(): GraphicsCapability {
  if (graphicsCache) return graphicsCache;
  if (typeof document === 'undefined') {
    return { webgl1: false, webgl2: false, maxTextureSize: 0 };
  }

  const canvas = document.createElement('canvas');
  let gl: RenderingContext | null = null;
  let webgl2 = false;
  let maxTextureSize = 0;

  try {
    gl = canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true });
    webgl2 = gl !== null;
  } catch {
    gl = null;
  }

  if (!gl) {
    try {
      gl = canvas.getContext('webgl', { failIfMajorPerformanceCaveat: true });
    } catch {
      gl = null;
    }
  }

  const webgl1 = gl !== null;
  if (gl && gl instanceof WebGLRenderingContext) {
    maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
  } else if (
    typeof WebGL2RenderingContext !== 'undefined' &&
    gl instanceof WebGL2RenderingContext
  ) {
    maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
  }

  graphicsCache = { webgl1, webgl2, maxTextureSize };
  return graphicsCache;
}

/** Gather every signal lane resolution consumes, in one browser-only pass. */
export function getDeviceSignals(): LaneSignals {
  const { webgl1, webgl2 } = probeGraphics();
  const nav = (typeof navigator !== 'undefined' ? navigator : undefined) as
    | NavigatorWithHints
    | undefined;
  const reducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  return {
    webgl1,
    webgl2,
    saveData: nav?.connection?.saveData === true,
    effectiveType: nav?.connection?.effectiveType,
    deviceMemory: nav?.deviceMemory,
    hardwareConcurrency: nav?.hardwareConcurrency,
    reducedMotion,
  };
}
