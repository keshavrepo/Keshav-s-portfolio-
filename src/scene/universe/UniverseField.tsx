'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { getConsequenceWaves, scriptRippleTime } from '@/scene/engine/decision-content';
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
 * The Business Universe Engine (SCENE-004), extended for the Decision
 * Engine (SCENE-005): in the engine chapter the universe holds its
 * breath — time stops, the travelling pulses go dark, only the heart
 * keeps its softened beat — and when the visitor commits, time resumes
 * and the decision's scripted consequence waves ride the same ripple
 * machinery, stage by stage, exactly in step with the DOM's telling.
 */
export default function UniverseField() {
  const { chapter, scrollRef, focusRef, engineRef } = useJourneyScene();
  const camera = useThree((state) => state.camera) as THREE.PerspectiveCamera;

  const assets = useMemo(() => createUniverseAssets(), []);
  useEffect(() => () => assets.dispose(), [assets]);

  const currents = useRef({
    reveal: 0,
    progress: 0,
    hoverKey: '',
    focusKey: '',
    scriptKey: '',
    rippleSeenAt: 0,
  });

  useFrame((state, delta) => {
    const { uniforms } = assets;
    const c = currents.current;
    const d = Math.min(delta, 0.1);

    const universeLive = chapter === 'universe' || chapter === 'universe-arriving';
    const engineLive = chapter === 'engine' || chapter === 'engine-arriving';
    const choice = engineLive ? engineRef.current.choice : null;

    // The pause law: in the engine chapter the world stops until the
    // visitor's decision starts it again.
    const paused = engineLive && !choice;
    if (!paused) uniforms.uTime.value += d;
    uniforms.uAwake.value = THREE.MathUtils.damp(uniforms.uAwake.value, paused ? 0 : 1, 1.6, d);

    c.reveal = THREE.MathUtils.damp(c.reveal, universeLive || engineLive ? 1 : 0, 0.9, d);
    uniforms.uReveal.value = c.reveal;

    // Complexity is scroll-earned; the world grows with a slight organic lag.
    const u = THREE.MathUtils.clamp(scrollRef.current.u, 0, 1);
    c.progress = THREE.MathUtils.damp(c.progress, u, 1.6, d);
    uniforms.uProgress.value = c.progress;

    // ── Listening (hover; only while the universe is the stage). ─────────
    const hoverId = universeLive ? focusRef.current.hoverId : null;
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

    // ── Isolation (focus) and scripted consequences (engine commit) share
    //    the wave channel; only one drives at a time. ────────────────────
    const focusKey = isolated ? focusId!.slice(3) : '';
    const scriptKey = choice ?? '';
    const wavesKey = scriptKey ? `s:${scriptKey}` : focusKey ? `f:${focusKey}` : '';
    if (wavesKey !== c.focusKey) {
      c.focusKey = wavesKey;
      const waveAttr = assets.entities.geometry.getAttribute('aWave') as THREE.BufferAttribute;
      const upAttr = assets.entities.geometry.getAttribute('aUpstream') as THREE.BufferAttribute;
      const entityWaves = scriptKey
        ? getConsequenceWaves(scriptKey)
        : focusKey
          ? getDownstreamWaves(focusKey)
          : new Map<string, number>();
      const upstream = focusKey && !scriptKey ? new Set(getUpstream(focusKey)) : new Set<string>();
      for (const entity of BUSINESS_ENTITIES) {
        const i = entity.order - 1;
        const wave = entityWaves.get(entity.id);
        waveAttr.setX(i, wave === undefined ? 99 : wave);
        upAttr.setX(i, upstream.has(entity.id) ? 1 : 0);
      }
      waveAttr.needsUpdate = true;
      upAttr.needsUpdate = true;

      // Edge wave: isolation follows the receiving end (cause walks to
      // effect); a consequence lights an edge when its later end ignites.
      const edgeWave = assets.edges.geometry.getAttribute('aWave') as THREE.BufferAttribute;
      const glintWave = assets.glints.geometry.getAttribute('aWave') as THREE.BufferAttribute;
      for (let i = 0; i < BUSINESS_EDGES.length; i += 1) {
        const edge = BUSINESS_EDGES[i];
        let wave = 99;
        if (scriptKey || focusKey) {
          const toWave = entityWaves.get(edge.to) ?? 99;
          const fromWave = entityWaves.get(edge.from) ?? 99;
          wave = scriptKey ? Math.min(toWave, fromWave) : toWave;
        }
        edgeWave.setX(i * 2, wave);
        edgeWave.setX(i * 2 + 1, wave);
        glintWave.setX(i, wave);
      }
      edgeWave.needsUpdate = true;
      glintWave.needsUpdate = true;
    }
    uniforms.uFocusId.value = scriptKey ? 0 : focusKey ? getEntity(focusKey).order : 0;
    uniforms.uScript.value = scriptKey ? 1 : 0;

    // The ripple clock is the shared instant — restarted on focus open,
    // on a replay nudge, and at the moment the decision locks.
    if (scriptKey) {
      const elapsed = performance.now() - engineRef.current.clockAt;
      uniforms.uRipple.value = scriptRippleTime(scriptKey, elapsed);
    } else {
      const rippleAt = focusRef.current.rippleAt;
      if (rippleAt !== c.rippleSeenAt) c.rippleSeenAt = rippleAt;
      uniforms.uRipple.value = isolated ? (performance.now() - rippleAt) / 1000 : 99;
      // Hold the last wave gently pulsing instead of freezing mid-travel.
      const holdCap = 12 * (RIPPLE_WAVE_MS / 1000);
      if (uniforms.uRipple.value > holdCap && uniforms.uRipple.value < 50) {
        uniforms.uRipple.value = holdCap;
      }
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
