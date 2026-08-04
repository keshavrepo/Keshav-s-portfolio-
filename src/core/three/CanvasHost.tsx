'use client';

import { Canvas } from '@react-three/fiber';
import type { RootState } from '@react-three/fiber';
import { useCallback, useState, type ReactNode } from 'react';

interface CanvasHostProps {
  children: ReactNode;
  /**
   * The stills-lane rendering of this scene. Shown when the WebGL context is
   * lost or never arrives — context loss is handled, never survived
   * (ARCHITECTURE §9).
   */
  fallback: ReactNode;
  className?: string;
  onCreated?: (state: RootState) => void;
}

/**
 * The only sanctioned way to mount a 3D scene (ARCHITECTURE §9): demand
 * frameloop (battery respect, ER-85), DPR clamped, high-performance power
 * preference, alpha so the scene composites over authored surfaces.
 */
export function CanvasHost({ children, fallback, className, onCreated }: CanvasHostProps) {
  const [contextLost, setContextLost] = useState(false);

  const handleCreated = useCallback(
    (state: RootState) => {
      const element = state.gl.domElement;
      const handleLost = (event: Event) => {
        event.preventDefault();
        setContextLost(true);
      };
      element.addEventListener('webglcontextlost', handleLost);
      onCreated?.(state);
    },
    [onCreated],
  );

  if (contextLost) return <div className={className}>{fallback}</div>;

  return (
    <div className={className}>
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={handleCreated}
      >
        {children}
      </Canvas>
    </div>
  );
}
