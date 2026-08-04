import gsap from 'gsap';

import { gsapEasings } from '@/design-system/tokens';

let configured = false;

/**
 * GSAP is configured exactly once, at this seam (ARCHITECTURE §7, §10).
 * Defaults come from tokens; lagSmoothing keeps a dropped frame from
 * becoming a time-jump — the story must never lurch.
 */
export function ensureGsapConfigured(): void {
  if (configured || typeof window === 'undefined') return;

  gsap.defaults({ ease: gsapEasings.signalOut, duration: 0.6, overwrite: 'auto' });
  gsap.ticker.lagSmoothing(500, 33);
  configured = true;
}

export { gsap };
