'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

import { useJourneyStore } from '@/core/state/journey-store';
import { MIND_NODES } from '@/scene/mindscape/mindscape-content';

import { useJourneyScene } from './journey-context';

const HOVER_RADIUS_PX = 72;
const GROUP_NAME = 'mindscape';

/**
 * The projector (SCENE-002): every frame it maps the nine decisions from
 * world space into screen space, decides what the pointer is closest to,
 * and invites exactly one unvisited node nearest the frame's center — the
 * whisper that says "this says something" (L-M1). Runs entirely inside the
 * canvas; DOM layers read the results from `screenRef`.
 */
export function Projector() {
  const { chapter, focusRef, screenRef, presenceRef } = useJourneyScene();
  const scratch = useRef(new THREE.Vector3());

  useFrame(({ camera, size, scene }) => {
    if (chapter !== 'mind') return;

    const world = scratch.current;
    const group = scene.getObjectByName(GROUP_NAME) ?? null;
    const presence = presenceRef.current;

    const pointerPx = {
      x: ((presence.x + 1) / 2) * size.width,
      y: ((1 - presence.y) / 2) * size.height,
    };

    let hoverId: string | null = null;
    let hoverDist = HOVER_RADIUS_PX;
    let invitedId: string | null = null;
    let invitedDist = Infinity;

    const visited = useJourneyStore.getState().visitedAnchors;

    for (const node of MIND_NODES) {
      world.set(...node.position);
      if (group) world.applyMatrix4(group.matrixWorld);
      world.project(camera);

      const visible = world.z < 1 && Math.abs(world.x) < 1.3 && Math.abs(world.y) < 1.3;
      const x = ((world.x + 1) / 2) * size.width;
      const y = ((1 - world.y) / 2) * size.height;

      if (visible && presence.active) {
        const d = Math.hypot(x - pointerPx.x, y - pointerPx.y);
        if (d < hoverDist) {
          hoverDist = d;
          hoverId = node.id;
        }
      }

      if (visible && !visited.includes(`mm:node:${node.id}`)) {
        const centerDist = Math.hypot(world.x, world.y) + node.order * 0.015;
        if (centerDist < invitedDist) {
          invitedDist = centerDist;
          invitedId = node.id;
        }
      }

      const anchor = screenRef.current.get(node.id) ?? {
        x: 0,
        y: 0,
        visible: false,
        hover: false,
        invited: false,
      };
      anchor.x = x;
      anchor.y = y;
      anchor.visible = visible;
      anchor.hover = node.id === hoverId;
      anchor.invited = node.id === invitedId;
      screenRef.current.set(node.id, anchor);
    }

    if (focusRef.current.hoverId !== hoverId) focusRef.current.hoverId = hoverId;
  });

  return null;
}
