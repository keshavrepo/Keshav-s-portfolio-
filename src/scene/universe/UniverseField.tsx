'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { useJourneyScene } from '@/scene/journey/journey-context';

import { RIPPLE_WAVE_MS, createUniverseAssets } from './universe-assets';
import {
  BUSINESS_EDGES,
  BUSINESS_ENTITIES,
  edgeTouches,
  getDownstreamWaves,
  getEntity,
  getNeighbors,
  getUpstream,
} from './universe-content';

const FOV_Y_DEG = 35;

/**
 * The Business Universe Engine (SCENE-004): the committed decision,
 * rendered as a living system. Scroll unfolds complexity (the heart
 * ignites first, facing systems next, the backbone last — hierarchy is
 * earned, never apparent); hover lifts a system's relationships while
 * glints carry cause to effect; isolation dims everything but the
 * dependency cone, and the ripple walks the change downstream, wave by
 * wave. The ripple clock is shared with the DOM via focusRef.rippleAt —
 * one instant, two layers, zero disagreement.
 */
export default function UniverseField() {
  const { chapter, scrollRef, focusRef } = useJourneyScene();
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;

  const assets = useMemo(() => createUniverseAssets(), []);
  useEffect(() => () => assets.dispose(), [assets]);

  const currents = useRef({
    reveal: 0,
    progress: 0,
    hoverKey: '',
    focusKey: '',
    rippleSeenAt: 0,
  });

  useFrame((state, delta) => {
    const { uniforms } = assets;
    const c = currents.current;
    const d = Math.min(delta, 0.1);

    uniforms.uTime.value += d;

    const universeLive = chapter === 'universe' || chapter === 'universe-arriving';
    c.reveal = THREE.MathUtils.damp(c.reveal, universeLive ? 1 : 0, 0.9, d);
    uniforms.uReveal.value = c.reveal;

    // Complexity is scroll-earned; the world grows with a slight organic lag.
    const u = THREE.MathUtils.clamp(scrollRef.current.u, 0, 1);
    c.progress = THREE.MathUtils.damp(c.progress, u, 1.6, d);
    uniforms.uProgress.value = c.progress;

    // ── Listening (hover): light the relationship neighborhood. ──────────
    const hoverId = focusRef.current.hoverId;
    const hoverKey = hoverId && hoverId.startsWith('en-') ? hoverId.slice(3) : '';
    const focusId = focusRef.current.focusId;
    const isolated = !!(focusId && focusId.startsWith('en-'));
    if (hoverKey !== c.hoverKey) {
      c.hoverKey = hoverKey;
      const neighbors = hoverKey ? new Set(getNeighbors(hoverKey)) : new Set<string>();
      const adj = assets.entities.geometry.getAttribute('aAdj') as THREE.BufferAttribute;
      const orderByEntity = new Map(BUSINESS_ENTITIES.map((e) => [e.order, e.id] as const));
      for (let i = 0; i < adj.count; i += 1) {
        const id = orderByEntity.get(i + 1);
        adj.setX(i, id && neighbors.has(id) ? 1 : 0);
      }
      adj.needsUpdate = true;
      const hot = assets.edges.geometry.getAttribute('aHot') as THREE.BufferAttribute;
      for (let i = 0; i < BUSINESS_EDGES.length; i += 1) {
        const value = hoverKey && edgeTouches(BUSINESS_EDGES[i], hoverKey) ? 1 : 0;
        hot.setX(i * 2, value);
        hot.setX(i * 2 + 1, value);
      }
      hot.needsUpdate = true;
    }
    uniforms.uHoverId.value = hoverKey && !isolated ? (getEntity(hoverKey)?.order ?? 0) : 0;

    // ── Isolation (focus): dim to the dependency cone, run the ripple. ────
    const focusKey = isolated ? focusId!.slice(3) : '';
    if (focusKey !== c.focusKey) {
      c.focusKey = focusKey;
      const waveAttr = assets.entities.geometry.getAttribute('aWave') as THREE.BufferAttribute;
      const upAttr = assets.entities.geometry.getAttribute('aUpstream') as THREE.BufferAttribute;
      const entityWaves = focusKey ? getDownstreamWaves(focusKey) : new Map<string, number>();
      const upstream = focusKey ? new Set(getUpstream(focusKey)) : new Set<string>();
      for (const entity of BUSINESS_ENTITIES) {
        const i = entity.order - 1;
        const wave = entityWaves.get(entity.id);
        waveAttr.setX(i, wave === undefined ? 99 : wave);
        upAttr.setX(i, upstream.has(entity.id) ? 1 : 0);
      }
      waveAttr.needsUpdate = true;
      upAttr.needsUpdate = true;

      // Edge wave = the wave of its receiving end (cause walks to effect).
      const edgeWave = assets.edges.geometry.getAttribute('aWave') as THREE.BufferAttribute;
      const glintWave = assets.glints.geometry.getAttribute('aWave') as THREE.BufferAttribute;
      for (let i = 0; i < BUSINESS_EDGES.length; i += 1) {
        const wave = focusKey ? (entityWaves.get(BUSINESS_EDGES[i].to) ?? 99) : 99;
        edgeWave.setX(i * 2, wave);
        edgeWave.setX(i * 2 + 1, wave);
        glintWave.setX(i, wave);
      }
      edgeWave.needsUpdate = true;
      glintWave.needsUpdate = true;
    }
    uniforms.uFocusId.value = focusKey ? getEntity(focusKey).order : 0;

    // The ripple clock is the shared instant — restarted on focus open and
    // on the "send the change again" nudge from the card.
    const rippleAt = focusRef.current.rippleAt;
    if (rippleAt !== c.rippleSeenAt) c.rippleSeenAt = rippleAt;
    uniforms.uRipple.value = isolated ? (performance.now() - rippleAt) / 1000 : 99;
    // Hold the last wave gently pulsing instead of freezing mid-travel.
    if (uniforms.uRipple.value > 12 * (RIPPLE_WAVE_MS / 1000)) {
      uniforms.uRipple.value = 12 * (RIPPLE_WAVE_MS / 1000);
    }

    uniforms.uPointScale.value =
      (state.size.height * 0.5) / Math.tan(THREE.MathUtils.degToRad(FOV_Y_DEG * 0.5));

    void camera;
  });

  return (
    <group name="business-universe">
      <primitive object={assets.edges} />
      <primitive object={assets.entities} />
      <primitive object={assets.glints} />
    </group>
  );
}
