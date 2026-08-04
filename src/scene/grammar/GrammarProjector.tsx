'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

import { GRAMMAR_STAGES } from '@/scene/grammar/grammar-content';
import { useJourneyScene } from '@/scene/journey/journey-context';

const HOVER_RADIUS_PX = 76;

/**
 * Station projector (SCENE-003) — the projector pattern reused for the
 * process world: maps stations to screen space for DOM doors, and resolves
 * pointer listening. Unification with the mind projector is recorded in
 * BACKLOG.md (deliberately not refactored mid-scene).
 */
export function GrammarProjector() {
  const { chapter, focusRef, screenRef, presenceRef, scrollRef } = useJourneyScene();
  const scratch = useRef(new THREE.Vector3());

  useFrame(({ camera, size }) => {
    if (chapter !== 'grammar') return;

    const world = scratch.current;
    const presence = presenceRef.current;
    const pointerPx = {
      x: ((presence.x + 1) / 2) * size.width,
      y: ((1 - presence.y) / 2) * size.height,
    };

    let hoverId: string | null = null;
    let hoverDist = HOVER_RADIUS_PX;
    const g = Math.min(1, Math.max(0, scrollRef.current.g));

    for (const stage of GRAMMAR_STAGES) {
      world.set(...stage.position).project(camera);

      const visible = world.z < 1 && Math.abs(world.x) < 1.35 && Math.abs(world.y) < 1.35;
      const x = ((world.x + 1) / 2) * size.width;
      const y = ((1 - world.y) / 2) * size.height;

      // Stations answer listening only once the case has reached them —
      // earned stations reason out loud; future ones stay silent.
      const reachable = stage.order <= Math.floor(g * 10 + 0.08) + 1;

      if (visible && reachable && presence.active) {
        const dPx = Math.hypot(x - pointerPx.x, y - pointerPx.y);
        if (dPx < hoverDist) {
          hoverDist = dPx;
          hoverId = `st-${stage.id}`;
        }
      }

      const key = `st-${stage.id}`;
      const anchor = screenRef.current.get(key) ?? {
        x: 0,
        y: 0,
        visible: false,
        hover: false,
        invited: false,
      };
      anchor.x = x;
      anchor.y = y;
      anchor.visible = visible && reachable;
      anchor.hover = key === hoverId;
      anchor.invited = false;
      screenRef.current.set(key, anchor);
    }

    if (focusRef.current.hoverId !== hoverId) focusRef.current.hoverId = hoverId;
  });

  return null;
}
