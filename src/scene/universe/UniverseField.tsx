'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { getConsequenceWaves, scriptRippleTime } from '@/scene/engine/decision-content';
import { getAffectedIds, getSystemOutcome } from '@/scene/impact/impact-content';
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
const FOG_NEAR = 10;
const FOG_FAR = 42;

/**
 * One system's recovery plan: where it settles, at what mass, and when
 * it starts moving (affected systems settle first — the decision's own
 * footprint leads the recovery; the rest follow in its wake).
 */
interface SettlePlan {
  target: [number, number, number];
  sizeScale: number;
  t0: number;
}

function buildSettlePlan(pathId: string): Map<string, SettlePlan> {
  const affected = new Set(getAffectedIds(pathId));
  const plan = new Map<string, SettlePlan>();
  let affectedIndex = 0;
  for (const entity of BUSINESS_ENTITIES) {
    const outcome = getSystemOutcome(pathId, entity.id);
    const isAffected = affected.has(entity.id);
    plan.set(entity.id, {
      target: outcome.settle,
      sizeScale: outcome.scale,
      t0: isAffected ? 0.04 + affectedIndex++ * 0.07 : 0.58 + (entity.order % 4) * 0.05,
    });
  }
  return plan;
}

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
    calm: 0,
  });
  const settlePlan = useRef<{ key: string; plan: Map<string, SettlePlan> }>({
    key: '',
    plan: new Map(),
  });

  useFrame((state, delta) => {
    const { uniforms } = assets;
    const c = currents.current;
    const d = Math.min(delta, 0.1);

    const universeLive = chapter === 'universe' || chapter === 'universe-arriving';
    const engineLive = chapter === 'engine' || chapter === 'engine-arriving';
    const impactLive = chapter === 'impact' || chapter === 'impact-arriving';
    const choice = engineLive || impactLive ? engineRef.current.choice : null;

    // The pause law: in the engine chapter the world stops until the
    // visitor's decision starts it again. In the aftermath it moves on,
    // slower and calmer — recovery is a tempo.
    const paused = engineLive && !choice;
    if (!paused) uniforms.uTime.value += d * (1 - c.calm * 0.45);
    uniforms.uAwake.value = THREE.MathUtils.damp(uniforms.uAwake.value, paused ? 0 : 1, 1.6, d);

    c.reveal = THREE.MathUtils.damp(
      c.reveal,
      universeLive || engineLive || impactLive ? 1 : 0,
      0.9,
      d,
    );
    uniforms.uReveal.value = c.reveal;

    // ── Recovery: scroll (v) moves every system from its grown position
    //    to the shape the decision authored — light becomes architecture. ──
    const v = THREE.MathUtils.clamp(scrollRef.current.v, 0, 1);
    c.calm = THREE.MathUtils.damp(
      c.calm,
      impactLive ? THREE.MathUtils.smoothstep(v, 0, 1) : 0,
      1.2,
      d,
    );
    uniforms.uCalm.value = c.calm;

    const fog = state.scene.fog as THREE.Fog | null;
    if (fog) {
      fog.near = impactLive ? THREE.MathUtils.lerp(FOG_NEAR, 15, c.calm) : FOG_NEAR;
      fog.far = impactLive ? THREE.MathUtils.lerp(FOG_FAR, 54, c.calm) : FOG_FAR;
    }

    if (impactLive && choice) {
      if (settlePlan.current.key !== choice) {
        settlePlan.current = { key: choice, plan: buildSettlePlan(choice) };
      }
      const plan = settlePlan.current.plan;
      const pos = assets.entities.geometry.getAttribute('position') as THREE.BufferAttribute;
      const size = assets.entities.geometry.getAttribute('aSize') as THREE.BufferAttribute;
      const settleEase = new Map<string, number>();
      BUSINESS_ENTITIES.forEach((entity, i) => {
        const p = plan.get(entity.id);
        if (!p) return;
        const t = THREE.MathUtils.clamp((v * 1.18 - p.t0) / 0.4, 0, 1);
        const eased = THREE.MathUtils.smoothstep(t, 0, 1);
        settleEase.set(entity.id, eased);
        const baseSize = entity.tier === 0 ? 30 : entity.tier === 1 ? 21 : 16.5;
        size.setX(i, baseSize * (1 + (p.sizeScale - 1) * eased));
        pos.setXYZ(
          i,
          THREE.MathUtils.lerp(entity.position[0], p.target[0], eased),
          THREE.MathUtils.lerp(entity.position[1], p.target[1], eased),
          THREE.MathUtils.lerp(entity.position[2], p.target[2], eased),
        );
      });
      pos.needsUpdate = true;
      size.needsUpdate = true;

      // Edges and glints follow their endpoints — relationships retie in
      // the same motion as the systems they bind.
      const edgePos = assets.edges.geometry.getAttribute('position') as THREE.BufferAttribute;
      const glintFrom = assets.glints.geometry.getAttribute('aFrom') as THREE.BufferAttribute;
      const glintTo = assets.glints.geometry.getAttribute('aTo') as THREE.BufferAttribute;
      BUSINESS_EDGES.forEach((edge, i) => {
        const from = getEntity(edge.from);
        const to = getEntity(edge.to);
        const easeFrom = settleEase.get(edge.from) ?? 0;
        const easeTo = settleEase.get(edge.to) ?? 0;
        const fromPlan = plan.get(edge.from);
        const toPlan = plan.get(edge.to);
        const fx = THREE.MathUtils.lerp(
          from.position[0],
          fromPlan?.target[0] ?? from.position[0],
          easeFrom,
        );
        const fy = THREE.MathUtils.lerp(
          from.position[1],
          fromPlan?.target[1] ?? from.position[1],
          easeFrom,
        );
        const fz = THREE.MathUtils.lerp(
          from.position[2],
          fromPlan?.target[2] ?? from.position[2],
          easeFrom,
        );
        const tx = THREE.MathUtils.lerp(
          to.position[0],
          toPlan?.target[0] ?? to.position[0],
          easeTo,
        );
        const ty = THREE.MathUtils.lerp(
          to.position[1],
          toPlan?.target[1] ?? to.position[1],
          easeTo,
        );
        const tz = THREE.MathUtils.lerp(
          to.position[2],
          toPlan?.target[2] ?? to.position[2],
          easeTo,
        );
        edgePos.setXYZ(i * 2, fx, fy, fz);
        edgePos.setXYZ(i * 2 + 1, tx, ty, tz);
        glintFrom.setXYZ(i, fx, fy, fz);
        glintTo.setXYZ(i, tx, ty, tz);
      });
      edgePos.needsUpdate = true;
      glintFrom.needsUpdate = true;
      glintTo.needsUpdate = true;
    }

    // Complexity is scroll-earned; the world grows with a slight organic lag.
    const u = THREE.MathUtils.clamp(scrollRef.current.u, 0, 1);
    c.progress = THREE.MathUtils.damp(c.progress, u, 1.6, d);
    uniforms.uProgress.value = c.progress;

    // ── Listening (hover; while the universe is the stage or the lesson). ──
    const hoverId = universeLive || impactLive ? focusRef.current.hoverId : null;
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
