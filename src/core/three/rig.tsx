'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, type ReactNode } from 'react';
import * as THREE from 'three';

import { useReducedMotion } from '@/core/motion/use-reduced-motion';
import { motionDurations } from '@/design-system/tokens';

/**
 * Rig — the reusable 3D presence rig: how a WebGL object holds itself
 * alive. Two behaviors, both lawful:
 *
 *  - `float` — the Breath in space (§7 row 9 ≤2%): a slow sinusoidal bob
 *    at the breath tempo whose default amplitude reads as 2% of a
 *    3-unit figure (0.06 world units);
 *  - `lean` — pointer acknowledgment: the group rotates toward the
 *    pointer within `lean` radians, vertical response damped to 60% —
 *    the nod-to-turn ratio a head would use. Magnetic overshoot and
 *    trails stay banned (V-M85/86); this is a critically-damped chase
 *    that never passes its target.
 *
 * Numerical precedent: damping factors sit beside the house's WebGL
 * damping (JourneyCamera's λ family) — fast enough to feel owned
 * (≤100ms presence law reads as λ≈4), never springy. The journey
 * camera keeps its own authored damping — that IS its choreography;
 * this rig is for every future floor/figure that mounts inside
 * CanvasHost (dpr-clamped, demand-frameloop — ER-85 battery law).
 *
 * Reduced telling: the group holds its authored pose; presence is read,
 * never performed (V-M72 family).
 */

export interface RigProps {
  children?: ReactNode;
  /** The authored spot — float and lean are added on top, never instead. */
  position?: [number, number, number];
  float?: boolean;
  /** 2% of a 3-unit figure — the Breath's spatial budget (§7 row 9). */
  floatAmplitude?: number;
  floatTempoMs?: number;
  /** Max radians of pointer acknowledgment on the horizontal. */
  lean?: number;
}

const DAMP_LAMBDA = 4;

export function Rig({
  children,
  position = [0, 0, 0],
  float = false,
  floatAmplitude = 0.06,
  floatTempoMs = motionDurations.breath,
  lean = 0.1,
}: RigProps): JSX.Element {
  const group = useRef<THREE.Group>(null);
  const reduced = useReducedMotion();
  const [baseX, baseY, baseZ] = position;

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const d = Math.min(delta, 0.1);

    if (reduced) {
      g.position.set(baseX, baseY, baseZ);
      g.rotation.set(0, 0, 0);
      return;
    }

    const bob = float
      ? Math.sin(((state.clock.elapsedTime * 1000) / floatTempoMs) * Math.PI * 2) * floatAmplitude
      : 0;
    const targetRotY = lean !== 0 ? state.pointer.x * lean : 0;
    const targetRotX = lean !== 0 ? -state.pointer.y * lean * 0.6 : 0;

    g.position.x = THREE.MathUtils.damp(g.position.x, baseX, DAMP_LAMBDA, d);
    g.position.y = THREE.MathUtils.damp(g.position.y, baseY + bob, DAMP_LAMBDA, d);
    g.position.z = baseZ;
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetRotX, DAMP_LAMBDA, d);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRotY, DAMP_LAMBDA, d);
  });

  return (
    <group ref={group} position={position}>
      {children}
    </group>
  );
}
