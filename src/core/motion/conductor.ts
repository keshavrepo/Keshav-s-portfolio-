/**
 * The Motion Conductor (ARCHITECTURE §7) — the physical enforcer of the
 * solo-voice law (PC-10, EG-7): at any frame, one authored performance;
 * everything else breathes. Scene motion requests permission here; nothing
 * performs unannounced.
 */

export interface SoloHandoff {
  /** Milliseconds granted to the outgoing solo to exit with grace. */
  handoffMs?: number;
}

export interface ConductorStats {
  soloId: string | null;
  ambientCount: number;
  maxAmbient: number;
}

class MotionConductor {
  private soloId: string | null = null;

  private soloKill: (() => void) | null = null;

  private ambientCount = 0;

  private readonly maxAmbient = 3;

  /** Register a solo performance, releasing the incumbent if one exists. */
  requestSolo(id: string, kill: () => void, handoff: SoloHandoff = {}): boolean {
    const { handoffMs = 0 } = handoff;
    if (this.soloId === id) return true;

    if (this.soloId !== null) {
      const outgoing = this.soloKill;
      if (handoffMs > 0) {
        window.setTimeout(() => outgoing?.(), handoffMs);
      } else {
        outgoing?.();
      }
    }

    this.soloId = id;
    this.soloKill = kill;
    return true;
  }

  /** A solo ends; the stage goes quiet. */
  releaseSolo(id: string): void {
    if (this.soloId !== id) return;
    this.soloId = null;
    this.soloKill = null;
  }

  hasActiveSolo(): boolean {
    return this.soloId !== null;
  }

  /** Ambient breath is capped; beyond the cap, motion simply does not start. */
  tryAmbient(): boolean {
    if (this.ambientCount >= this.maxAmbient) return false;
    this.ambientCount += 1;
    return true;
  }

  releaseAmbient(): void {
    this.ambientCount = Math.max(0, this.ambientCount - 1);
  }

  stats(): ConductorStats {
    return { soloId: this.soloId, ambientCount: this.ambientCount, maxAmbient: this.maxAmbient };
  }
}

export const motionConductor = new MotionConductor();
