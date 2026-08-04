'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

import { useJourneyScene } from '@/scene/journey/journey-context';

import { RIPPLE_WAVE_MS } from './universe-assets';
import { BUSINESS_ENTITIES, getDownstreamWaves, getNeighbors } from './universe-content';

const HOVER_RADIUS_PX = 76;

/**
 * Universe projector (SCENE-004) — the projector pattern reused a third
 * time: maps systems to screen space for DOM doors, resolves pointer
 * listening, and marks which systems have earned a label right now
 * (anchor.invited): neighbors of the listened system, and downstream
 * systems as the travelling change reaches them. A system answers only
 * once scroll has built it — nothing teaches before it exists.
 */
export function UniverseProjector() {
  const { chapter, focusRef, screenRef, presenceRef, scrollRef } = useJourneyScene();
  const scratch = useRef(new THREE.Vector3());
  const waveCache = useRef<{ key: string; waves: ReadonlyMap<string, number> }>({
    key: '',
    waves: new Map(),
  });

  useFrame(({ camera, size }) => {
    if (chapter !== 'universe') return;

    const world = scratch.current;
    const presence = presenceRef.current;
    const pointerPx = {
      x: ((presence.x + 1) / 2) * size.width,
      y: ((1 - presence.y) / 2) * size.height,
    };

    let hoverId: string | null = null;
    let hoverDist = HOVER_RADIUS_PX;
    const u = Math.min(1, Math.max(0, scrollRef.current.u));

    const focusId = focusRef.current.focusId;
    const focusKey = focusId && focusId.startsWith('en-') ? focusId.slice(3) : '';
    if (waveCache.current.key !== focusKey) {
      waveCache.current = {
        key: focusKey,
        waves: focusKey ? getDownstreamWaves(focusKey) : new Map(),
      };
    }
    const rippleElapsed = focusKey ? performance.now() - focusRef.current.rippleAt : 0;

    // Listening: which systems lean in for the currently hovered one.
    const currentHover = focusRef.current.hoverId;
    const hoverKey = currentHover && currentHover.startsWith('en-') ? currentHover.slice(3) : '';
    const neighbors = hoverKey ? new Set(getNeighbors(hoverKey)) : new Set<string>();

    for (const entity of BUSINESS_ENTITIES) {
      world.set(...entity.position).project(camera);

      const visible = world.z < 1 && Math.abs(world.x) < 1.35 && Math.abs(world.y) < 1.35;
      const x = ((world.x + 1) / 2) * size.width;
      const y = ((1 - world.y) / 2) * size.height;

      // A system teaches only once it has been built by the runway.
      const built = u >= entity.threshold;

      if (visible && built && !focusKey && presence.active) {
        const dPx = Math.hypot(x - pointerPx.x, y - pointerPx.y);
        if (dPx < hoverDist) {
          hoverDist = dPx;
          hoverId = `en-${entity.id}`;
        }
      }

      // Dynamic labels, earned: neighbors of the listened system, and
      // downstream systems the travelling change has reached.
      const wave = focusKey ? waveCache.current.waves.get(entity.id) : undefined;
      const rippleLit = wave !== undefined && wave > 0 && rippleElapsed >= wave * RIPPLE_WAVE_MS;
      const labelLit = !focusKey && entity.id !== hoverKey && neighbors.has(entity.id);

      const key = `en-${entity.id}`;
      const anchor = screenRef.current.get(key) ?? {
        x: 0,
        y: 0,
        visible: false,
        hover: false,
        invited: false,
      };
      anchor.x = x;
      anchor.y = y;
      anchor.visible = visible && built;
      anchor.hover = key === hoverId;
      anchor.invited = Boolean(rippleLit) || labelLit;
      screenRef.current.set(key, anchor);
    }

    if (focusRef.current.hoverId !== hoverId) focusRef.current.hoverId = hoverId;
  });

  return null;
}
