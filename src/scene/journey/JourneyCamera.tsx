'use client';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { getMindNode } from '@/scene/mindscape/mindscape-content';

import { useJourneyScene } from './journey-context';

const OPENING_REST_Z = 8;
const OPENING_DIVE_Z = 1.15;

/** The vista: where the dive's overexposure resolves into the mind world. */
const VISTA_POSITION = new THREE.Vector3(0, 1.1, 13.8);
/** The scroll rail: from the vista to just inside the far thinking. */
const DEEP_Z = -5.5;
const LOOK_AHEAD = new THREE.Vector3(0, 0.4, -8);

/**
 * The unified camera (SCENE-002). One camera for the whole universe:
 * - opening: drifts and dives exactly as SCENE-001 authored it;
 * - arriving: eases from the dive's end-point into the vista while the warm
 *   overexposure hides the reposition (the seamless cut);
 * - mind: a scroll rail deeper into the thinking, with focus travel when a
 *   thought is expanded — cinematic means the camera is always motivated.
 */
export function JourneyCamera() {
  const { chapter, phase, presenceRef, diveRef, scrollRef, focusRef } = useJourneyScene();

  useFrame(({ camera }, delta) => {
    const perspective = camera as THREE.PerspectiveCamera;
    const d = Math.min(delta, 0.1);
    const presence = presenceRef.current;
    const focusId = focusRef.current.focusId;

    if (chapter === 'opening') {
      const dive = diveRef.current.value;
      perspective.position.z = OPENING_REST_Z + (OPENING_DIVE_Z - OPENING_REST_Z) * dive;
      const driftX = (presence.active ? presence.x : 0) * 0.12 * (1 - dive);
      const driftY = (presence.active ? presence.y : 0) * 0.08 * (1 - dive);
      perspective.position.x = THREE.MathUtils.damp(perspective.position.x, driftX, 1.1, d);
      perspective.position.y = THREE.MathUtils.damp(perspective.position.y, driftY, 1.1, d);
      perspective.lookAt(0, 0, 0);
      return;
    }

    if (focusId) {
      // Focus travel: the camera honors the chosen thought, from its own side.
      const node = getMindNode(focusId);
      const target = new THREE.Vector3(
        node.position[0] * 0.82,
        node.position[1] + 0.55,
        node.position[2] + 2.7,
      );
      perspective.position.x = THREE.MathUtils.damp(perspective.position.x, target.x, 1.5, d);
      perspective.position.y = THREE.MathUtils.damp(perspective.position.y, target.y, 1.5, d);
      perspective.position.z = THREE.MathUtils.damp(perspective.position.z, target.z, 1.5, d);
      perspective.lookAt(
        LOOK_AHEAD.set(node.position[0] * 0.9, node.position[1], node.position[2]),
      );
      return;
    }

    const p = THREE.MathUtils.clamp(scrollRef.current.p, 0, 1);
    const railX = (presence.active ? presence.x : 0) * 0.35;
    const railY = VISTA_POSITION.y + (presence.active ? presence.y : 0) * 0.2;
    const railZ =
      VISTA_POSITION.z + (DEEP_Z - VISTA_POSITION.z) * THREE.MathUtils.smoothstep(p, 0, 1);

    const lambda = chapter === 'arriving' ? 1.6 : 1.1;
    perspective.position.x = THREE.MathUtils.damp(perspective.position.x, railX, lambda, d);
    perspective.position.y = THREE.MathUtils.damp(perspective.position.y, railY, lambda, d);
    perspective.position.z = THREE.MathUtils.damp(perspective.position.z, railZ, lambda, d);

    perspective.lookAt(0, 0.4, perspective.position.z - 10);

    void phase;
  });

  return null;
}
