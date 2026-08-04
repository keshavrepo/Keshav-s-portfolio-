'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { useJourneyStore } from '@/core/state/journey-store';
import { useJourneyScene } from '@/scene/journey/journey-context';

import { createGrammarAssets } from './grammar-assets';
import { GRAMMAR_STAGES, getStage } from './grammar-content';

const FOV_Y_DEG = 35;

/**
 * The process, rendered (SCENE-003). The case-ember trails the visitor's
 * scroll with a slight organic lag — thinking follows attention, not the
 * other way around. The graph is grown by drawRange, so every station is
 * visibly earned; the commitment ring snaps shut only when the visitor
 * commits the decision in the DOM layer.
 */
export default function GrammarField() {
  const { chapter, scrollRef, focusRef } = useJourneyScene();
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;

  const assets = useMemo(() => createGrammarAssets(), []);
  useEffect(() => () => assets.dispose(), [assets]);

  const currents = useRef({ reveal: 0, ember: 0, committed: 0, px: 0, py: 0 });

  useFrame((state, delta) => {
    const { uniforms, graph, graphCurve, graphVertexCount, ember, rings } = assets;
    const c = currents.current;
    const d = Math.min(delta, 0.1);

    uniforms.uTime.value += d;

    // When the business universe takes the stage, the process world stays
    // as memory — the learned grammar, present and quiet (same law as the
    // mind world before it).
    const grammarLive = chapter === 'grammar' || chapter === 'grammar-arriving';
    const afterLive =
      chapter !== 'opening' &&
      chapter !== 'arriving' &&
      chapter !== 'mind' &&
      chapter !== 'future-arriving' &&
      chapter !== 'future';
    // In the final chapter the whole architecture leaves — memory too.
    c.reveal = THREE.MathUtils.damp(c.reveal, grammarLive ? 1 : afterLive ? 0.14 : 0, 0.9, d);
    uniforms.uReveal.value = c.reveal;

    // Grammar progress: the second half of the shared runway.
    const g = THREE.MathUtils.clamp(scrollRef.current.g, 0, 1);

    // The ember trails progress — thinking follows attention.
    c.ember = THREE.MathUtils.damp(c.ember, g, chapter === 'grammar' ? 2.4 : 1.2, d);
    const emberPoint = graphCurve.getPoint(THREE.MathUtils.clamp(c.ember, 0, 1));

    const emberPositions = ember.geometry.getAttribute('position') as THREE.BufferAttribute;
    emberPositions.setXYZ(0, emberPoint.x, emberPoint.y, emberPoint.z);
    emberPositions.needsUpdate = true;

    // The graph grows as the case advances — earned, never apparent.
    const grown = Math.floor(graphVertexCount * THREE.MathUtils.clamp(c.ember * 1.02, 0, 1));
    graph.geometry.setDrawRange(0, grown);
    const graphMaterial = graph.material as THREE.LineBasicMaterial;
    graphMaterial.opacity = c.reveal * 0.6;

    // Active station: nearest order at or behind the ember.
    const activeOrder = Math.max(1, Math.min(10, Math.floor(c.ember * 10 + 0.08)));
    uniforms.uActiveId.value = activeOrder;

    const focusId = focusRef.current.focusId;
    const focusedStage = focusId && focusId.startsWith('st-') ? getStage(focusId.slice(3)) : null;
    uniforms.uFocusId.value = focusedStage ? focusedStage.order : 0;

    // Commitment: the impact reveal is earned by an explicit decision.
    const committed = useJourneyStore.getState().visitedAnchors.includes('gm:decision:committed');
    c.committed = THREE.MathUtils.damp(c.committed, committed ? 1 : 0, 2.2, d);
    uniforms.uCommitted.value = c.committed;

    const [corridor, commitment] = rings;
    (corridor.material as THREE.LineBasicMaterial).opacity =
      c.reveal * (GRAMMAR_STAGES[6] && activeOrder >= 7 ? 0.85 : 0.2);
    (commitment.material as THREE.LineBasicMaterial).opacity = c.reveal * c.committed * 0.85;
    const snap = 1 + (1 - c.committed) * 0.35;
    commitment.scale.setScalar(THREE.MathUtils.lerp(snap, 1, c.committed));

    uniforms.uPointScale.value =
      (state.size.height * 0.5) / Math.tan(THREE.MathUtils.degToRad(FOV_Y_DEG * 0.5));

    void camera;
  });

  return (
    <group>
      <primitive object={assets.stations} />
      <primitive object={assets.graph} />
      <primitive object={assets.ember} />
      {assets.rings.map((ring, i) => (
        <primitive key={i} object={ring} />
      ))}
    </group>
  );
}
