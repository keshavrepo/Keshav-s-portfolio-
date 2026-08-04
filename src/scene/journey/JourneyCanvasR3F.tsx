'use client';

import type { RootState } from '@react-three/fiber';
import { useCallback } from 'react';
import * as THREE from 'three';

import { CanvasHost } from '@/core/three/CanvasHost';
import GrammarField from '@/scene/grammar/GrammarField';
import { GrammarProjector } from '@/scene/grammar/GrammarProjector';
import MindscapeField from '@/scene/mindscape/MindscapeField';
import NeuronField from '@/scene/opening/NeuronField';
import { StaticNeuron } from '@/scene/opening/StaticNeuron';
import UniverseField from '@/scene/universe/UniverseField';
import { UniverseProjector } from '@/scene/universe/UniverseProjector';

import { AdaptiveRenderer } from './AdaptiveRenderer';
import { useJourneyScene } from './journey-context';
import { JourneyCamera } from './JourneyCamera';
import { Projector } from './Projector';

/**
 * The heavy half of the shared universe — the only module in the journey
 * that imports Three.js and React-Three-Fiber, held in its own chunk by the
 * dynamic wrapper (ARCHITECTURE §13).
 */
export default function JourneyCanvasR3F() {
  const { chapter } = useJourneyScene();

  const handleCreated = useCallback((state: RootState) => {
    // Fog is the world's idea of infinity: depth melts, it never ends.
    state.scene.fog = new THREE.Fog('#120F0C', 10, 42);
    state.gl.compile(state.scene, state.camera);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <CanvasHost
        frameloop="always"
        fallback={<StaticNeuron />}
        className="absolute inset-0"
        onCreated={handleCreated}
        camera={{ position: [0, 0, 8], fov: 35, near: 0.1, far: 120 }}
      >
        <AdaptiveRenderer />
        <JourneyCamera />
        <Projector />
        {chapter !== 'mind' && <NeuronField />}
        {chapter !== 'opening' && <MindscapeField />}
        {(chapter === 'grammar-arriving' ||
          chapter === 'grammar' ||
          chapter === 'universe-arriving' ||
          chapter === 'universe' ||
          chapter === 'engine-arriving' ||
          chapter === 'engine' ||
          chapter === 'impact-arriving' ||
          chapter === 'impact') && (
          <>
            <GrammarProjector />
            <GrammarField />
          </>
        )}
        {(chapter === 'universe-arriving' ||
          chapter === 'universe' ||
          chapter === 'engine-arriving' ||
          chapter === 'engine' ||
          chapter === 'impact-arriving' ||
          chapter === 'impact') && (
          <>
            <UniverseProjector />
            <UniverseField />
          </>
        )}
      </CanvasHost>
    </div>
  );
}
