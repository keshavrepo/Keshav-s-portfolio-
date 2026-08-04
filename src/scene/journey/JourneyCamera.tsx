'use client';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { GRAMMAR_STAGES, getStage } from '@/scene/grammar/grammar-content';
import { getMindNode } from '@/scene/mindscape/mindscape-content';

import { useJourneyScene } from './journey-context';

const OPENING_REST_Z = 8;
const OPENING_DIVE_Z = 1.15;

/** The mind vista: where the dive's overexposure resolves into the world. */
const VISTA_POSITION = new THREE.Vector3(0, 1.1, 13.8);
/** The mind rail: from the vista to just inside the far thinking. */
const MIND_DEEP_Z = -5.5;

/** The process world (SCENE-003): the camera keeps traveling forward. */
const GRAMMAR_VISTA = new THREE.Vector3(0.4, 2.2, -16);
const GRAMMAR_DEEP_Z = -54;

/**
 * The unified camera (SCENE-001 → 002 → 003). One camera for the whole
 * universe — it drifts, dives, repositions inside the dive's white, rails
 * deeper on scroll, and honors focused thoughts from their own side.
 * Cinematic means the camera is always motivated.
 */
export function JourneyCamera() {
  const { chapter, presenceRef, diveRef, scrollRef, focusRef } = useJourneyScene();

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

    // Focus travel: a chosen thought is honored from its own side.
    if (focusId) {
      const isStation = focusId.startsWith('st-');
      const target = new THREE.Vector3();
      const look = new THREE.Vector3();
      if (isStation) {
        const stage = getStage(focusId.slice(3));
        target.set(stage.position[0] * 0.82, stage.position[1] + 0.6, stage.position[2] + 2.9);
        look.set(stage.position[0] * 0.9, stage.position[1], stage.position[2]);
      } else {
        const node = getMindNode(focusId);
        target.set(node.position[0] * 0.82, node.position[1] + 0.55, node.position[2] + 2.7);
        look.set(node.position[0] * 0.9, node.position[1], node.position[2]);
      }
      perspective.position.x = THREE.MathUtils.damp(perspective.position.x, target.x, 1.5, d);
      perspective.position.y = THREE.MathUtils.damp(perspective.position.y, target.y, 1.5, d);
      perspective.position.z = THREE.MathUtils.damp(perspective.position.z, target.z, 1.5, d);
      perspective.lookAt(look);
      return;
    }

    const grammarLive = chapter === 'grammar' || chapter === 'grammar-arriving';

    if (!grammarLive) {
      const p = THREE.MathUtils.clamp(scrollRef.current.p, 0, 1);
      const railX = (presence.active ? presence.x : 0) * 0.35;
      const railY = VISTA_POSITION.y + (presence.active ? presence.y : 0) * 0.2;
      const railZ =
        VISTA_POSITION.z + (MIND_DEEP_Z - VISTA_POSITION.z) * THREE.MathUtils.smoothstep(p, 0, 1);
      const lambda = chapter === 'arriving' ? 1.6 : 1.1;
      perspective.position.x = THREE.MathUtils.damp(perspective.position.x, railX, lambda, d);
      perspective.position.y = THREE.MathUtils.damp(perspective.position.y, railY, lambda, d);
      perspective.position.z = THREE.MathUtils.damp(perspective.position.z, railZ, lambda, d);
      perspective.lookAt(0, 0.4, perspective.position.z - 10);
      return;
    }

    // The process half: camera advances with the case, always ahead of it.
    const g = THREE.MathUtils.clamp(scrollRef.current.g, 0, 1);
    const eased = THREE.MathUtils.smoothstep(g, 0, 1);
    const railZ = GRAMMAR_VISTA.z + (GRAMMAR_DEEP_Z - GRAMMAR_VISTA.z) * eased;
    const railX = GRAMMAR_VISTA.x * (1 - eased) + Math.sin(eased * Math.PI * 2) * 0.5;
    const railY = GRAMMAR_VISTA.y * (1 - eased * 0.4);

    const lambda = chapter === 'grammar-arriving' ? 1.4 : 1.15;
    perspective.position.x = THREE.MathUtils.damp(perspective.position.x, railX, lambda, d);
    perspective.position.y = THREE.MathUtils.damp(perspective.position.y, railY, lambda, d);
    perspective.position.z = THREE.MathUtils.damp(perspective.position.z, railZ, lambda, d);

    const lookOrder = Math.min(GRAMMAR_STAGES.length, Math.floor(g * 10) + 1);
    const lookStage = GRAMMAR_STAGES[lookOrder - 1];
    perspective.lookAt(
      lookStage.position[0] * 0.6,
      lookStage.position[1] * 0.6 + 0.4,
      lookStage.position[2],
    );
  });

  return null;
}
