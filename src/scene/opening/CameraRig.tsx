'use client';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

import { useOpeningScene } from './opening-context';

const REST_Z = 8;
const DIVE_Z = 1.15;

/**
 * Camera controller (SCENE-001). The rig does two things and nothing else:
 * it breathes a barely-there drift behind the pointer (the world is alive,
 * not a photograph), and on the dive it travels the locked envelope
 * (ER-5, motionDurations.dive) straight into the neuron. The dive distance
 * itself is driven by the GSAP solo registered in the scene root — one
 * orchestra, one conductor (PC-10).
 */
export function CameraRig() {
  const { presenceRef, diveRef } = useOpeningScene();

  useFrame(({ camera }, delta) => {
    const perspective = camera as THREE.PerspectiveCamera;
    const presence = presenceRef.current;
    const dive = diveRef.current.value;

    perspective.position.z = REST_Z + (DIVE_Z - REST_Z) * dive;

    const driftX = (presence.active ? presence.x : 0) * 0.12 * (1 - dive);
    const driftY = (presence.active ? presence.y : 0) * 0.08 * (1 - dive);
    const damp = Math.min(delta, 0.1);
    perspective.position.x = THREE.MathUtils.damp(perspective.position.x, driftX, 1.1, damp);
    perspective.position.y = THREE.MathUtils.damp(perspective.position.y, driftY, 1.1, damp);

    perspective.lookAt(0, 0, 0);
  });

  return null;
}
