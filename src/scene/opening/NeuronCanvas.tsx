'use client';

import type { RootState } from '@react-three/fiber';
import { useCallback } from 'react';

import { CanvasHost } from '@/core/three/CanvasHost';

import { AdaptiveRenderer } from './AdaptiveRenderer';
import { CameraRig } from './CameraRig';
import NeuronField from './NeuronField';
import { StaticNeuron } from './StaticNeuron';

/**
 * The neuron's WebGL home (SCENE-001). Loaded as its own chunk via
 * next/dynamic in the scene root — Three.js never touches the text layer of
 * `/` (ARCHITECTURE §9, §13). If the context dies we hand the visitor a
 * static neuron, not a hole.
 */
export default function NeuronCanvas() {
  /** Warm the shader cache before the first visible frame. */
  const handleCreated = useCallback((state: RootState) => {
    state.gl.compile(state.scene, state.camera);
  }, []);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <CanvasHost
        frameloop="always"
        fallback={<StaticNeuron />}
        className="absolute inset-0"
        onCreated={handleCreated}
      >
        <AdaptiveRenderer />
        <CameraRig />
        <NeuronField />
      </CanvasHost>
    </div>
  );
}
