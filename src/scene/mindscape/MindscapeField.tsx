'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { useJourneyScene } from '@/scene/journey/journey-context';

import { createMindscapeAssets } from './mindscape-assets';
import { getMindNode } from './mindscape-content';

const FOV_Y_DEG = 35;
const GROUP_NAME = 'mindscape';

/**
 * The mind world as a rendered system (SCENE-002): silent, infinite,
 * intentional. Motion is rationed — nodes breathe slowly, questions keep
 * their orbits, glints carry thought along the reasoning paths, and the
 * rest of the frame is stillness. Focused thought grows out of the dark
 * toward the visitor; everything else holds its place.
 */
export default function MindscapeField() {
  const { chapter, presenceRef, focusRef } = useJourneyScene();
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;

  const assets = useMemo(() => createMindscapeAssets(), []);
  useEffect(() => () => assets.dispose(), [assets]);

  const group = useRef<THREE.Group>(null);
  const currents = useRef({ reveal: 0, px: 0, py: 0, focusScale: 1 });

  useFrame((state, delta) => {
    const { uniforms, paths, rings } = assets;
    const c = currents.current;
    const d = Math.min(delta, 0.1);

    uniforms.uTime.value += d;

    const revealTarget = chapter === 'opening' ? 0 : 1;
    c.reveal = THREE.MathUtils.damp(c.reveal, revealTarget, 0.8, d);
    uniforms.uReveal.value = c.reveal;

    const focusNode = focusRef.current.focusId ? getMindNode(focusRef.current.focusId) : null;
    uniforms.uFocusId.value = focusNode ? focusNode.order : 0;

    // The world notices the pointer the way the neuron did — subtler now:
    // the visitor has been trusted further in.
    const presence = presenceRef.current;
    c.px = THREE.MathUtils.damp(c.px, presence.active ? presence.x : 0, 0.7, d);
    c.py = THREE.MathUtils.damp(c.py, presence.active ? presence.y : 0, 0.7, d);

    if (group.current) {
      group.current.rotation.y = c.px * 0.05;
      group.current.rotation.x = -c.py * 0.03;

      // Focus: the chosen thought steps forward out of the constellation.
      const scaleTarget = focusNode ? 1.04 : 1;
      c.focusScale = THREE.MathUtils.damp(c.focusScale, scaleTarget, 1.4, d);
      group.current.scale.setScalar(c.focusScale);
    }

    const pathsMaterial = paths.material as THREE.LineBasicMaterial;
    pathsMaterial.opacity = c.reveal * 0.55;

    for (const ring of rings) {
      const material = ring.material as THREE.LineBasicMaterial;
      material.opacity = c.reveal * 0.9;
    }

    uniforms.uPointScale.value =
      (state.size.height * 0.5) / Math.tan(THREE.MathUtils.degToRad(FOV_Y_DEG * 0.5));

    void camera;
  });

  return (
    <group ref={group} name={GROUP_NAME}>
      <primitive object={assets.points} />
      <primitive object={assets.paths} />
      {assets.rings.map((ring, i) => (
        <primitive key={i} object={ring} />
      ))}
    </group>
  );
}
