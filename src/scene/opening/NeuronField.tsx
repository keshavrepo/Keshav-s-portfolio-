'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { useJourneyScene } from '@/scene/journey/journey-context';

import { createNeuronAssets } from './neuron-assets';
import { phaseAtLeast, type OpeningPhase } from './opening-machine';

/** Target glow per beat — the emotional score as numbers (SCENE-001). */
const PHASE_INTENSITY: Record<OpeningPhase, number> = {
  void: 0,
  heartbeat: 0.42,
  emergence: 0.78,
  attuning: 0.85,
  'claim-one': 0.92,
  'claim-two': 1,
  brightening: 1.24,
  'awaiting-dive': 1.24,
  diving: 1.45,
  afterglow: 0,
};

/** Heartbeat audibility in the glow: loud at birth, a calm undercurrent after. */
const PHASE_BEAT: Record<OpeningPhase, number> = {
  void: 0,
  heartbeat: 0.5,
  emergence: 0.42,
  attuning: 0.38,
  'claim-one': 0.22,
  'claim-two': 0.16,
  brightening: 0.12,
  'awaiting-dive': 0.12,
  diving: 0,
  afterglow: 0,
};

const FOV_Y_DEG = 35;

export default function NeuronField() {
  const { phase, presenceRef, diveRef } = useJourneyScene();
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;

  const assets = useMemo(() => createNeuronAssets(), []);
  useEffect(() => () => assets.dispose(), [assets]);

  const group = useRef<THREE.Group>(null);
  const currents = useRef({ intensity: 0, beat: 0, links: 0, px: 0, py: 0 });

  useFrame((state, delta) => {
    const { uniforms, filaments, links, linksVertexCount } = assets;
    const c = currents.current;
    const d = Math.min(delta, 0.1);

    uniforms.uTime.value += d;

    const presence = presenceRef.current;
    const proximityGain = presence.active ? 0.22 * (1 - presence.dist) : 0;

    // Latency vs. attack (ER-3, SCENE-001): the *target* changes the same
    // frame the pointer moves — presence is never queued. The visible body
    // of the reaction is a slow, damped curve: a living system noticing,
    // not a switch flipping.
    const intensityTarget = (PHASE_INTENSITY[phase] ?? 0) + proximityGain;
    c.intensity = THREE.MathUtils.damp(c.intensity, intensityTarget, 1.6, d);
    c.beat = THREE.MathUtils.damp(c.beat, PHASE_BEAT[phase] ?? 0, 2.2, d);

    const linksTarget = phaseAtLeast(phase, 'brightening') && phase !== 'afterglow' ? 1 : 0;
    c.links = THREE.MathUtils.damp(c.links, linksTarget, 0.9, d);

    c.px = THREE.MathUtils.damp(c.px, presence.active ? presence.x : 0, 0.9, d);
    c.py = THREE.MathUtils.damp(c.py, presence.active ? presence.y : 0, 0.9, d);

    uniforms.uIntensity.value = c.intensity;
    uniforms.uBeat.value = c.beat;
    uniforms.uLinks.value = c.links;
    uniforms.uDive.value = diveRef.current.value;
    uniforms.uPointScale.value =
      (state.size.height * 0.5) / Math.tan(THREE.MathUtils.degToRad(FOV_Y_DEG * 0.5));

    if (group.current) {
      group.current.rotation.y = c.px * 0.16;
      group.current.rotation.x = -c.py * 0.1;
      group.current.position.x = c.px * 0.07;
      group.current.position.y = c.py * 0.05;
    }

    const filamentsMaterial = filaments.material as THREE.LineBasicMaterial;
    filamentsMaterial.opacity = Math.min(1, c.intensity * 0.5);

    const linksMaterial = links.material as THREE.LineBasicMaterial;
    linksMaterial.opacity = c.links * 0.7;
    links.geometry.setDrawRange(0, Math.floor(linksVertexCount * c.links));

    void camera;
  });

  return (
    <group ref={group}>
      <primitive object={assets.points} />
      <primitive object={assets.filaments} />
      <primitive object={assets.links} />
    </group>
  );
}
