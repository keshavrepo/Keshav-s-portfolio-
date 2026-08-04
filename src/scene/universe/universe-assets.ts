import * as THREE from 'three';

import { BUSINESS_EDGES, BUSINESS_ENTITIES, getEntity } from './universe-content';

/**
 * Chapter Four geometry (SCENE-004): the business as one organism.
 *   1. Points  — eleven systems; hierarchy is authored in size and light,
 *      and the heart keeps the Opening's heartbeat (S58 leitmotif).
 *   2. LineSegments — fifteen cause→effect relationships, earned into
 *      existence by scroll (u) after both ends exist.
 *   3. Points  — glints that travel every edge in the direction of the
 *      cause, the way the mind's glints carried thought (motion law:
 *      nothing glows that does not explain a relationship).
 * Ripple state lives in attributes (aWave / aUpstream / aAdj / aHot),
 * rewritten by the field only when focus or hover changes — per-frame
 * cost stays at three draw calls and zero allocations.
 */

export interface UniverseUniforms {
  uTime: { value: number };
  uReveal: { value: number };
  /** Scroll-evolution progress (u): complexity unfolds with the runway. */
  uProgress: { value: number };
  /** Entity order currently isolated (0 = none — System Isolation Mode). */
  uFocusId: { value: number };
  /** Entity order currently listened to (0 = none). */
  uHoverId: { value: number };
  /** Seconds since the ripple was (re)started — the change travelling. */
  uRipple: { value: number };
  /** 0 = the universe holds its breath (engine pause), 1 = awake. */
  uAwake: { value: number };
  /** 1 = scripted consequence waves are driving (SCENE-005). */
  uScript: { value: number };
  /** 0 → 1 as recovery completes: consequence-light becomes architecture (SCENE-006). */
  uCalm: { value: number };
  uPointScale: { value: number };
}

export interface UniverseAssets {
  entities: THREE.Points;
  edges: THREE.LineSegments;
  glints: THREE.Points;
  uniforms: UniverseUniforms;
  dispose: () => void;
}

const EMBER_OUTER = new THREE.Color('#EBA978');
const EMBER_INNER = new THREE.Color('#F2C7A4');
const EMBER_CORE = new THREE.Color('#F8E3D0');
const HEART_ID = 1; // customers — the business keeps the Opening's heartbeat

/** Seconds between ripple waves (mirrors the DOM label law). */
export const RIPPLE_WAVE_MS = 850;

const ENTITY_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  attribute float aId;
  attribute float aThreshold;
  attribute float aWave;
  attribute float aUpstream;
  attribute float aAdj;
  uniform float uTime;
  uniform float uReveal;
  uniform float uProgress;
  uniform float uFocusId;
  uniform float uHoverId;
  uniform float uRipple;
  uniform float uAwake;
  uniform float uScript;
  uniform float uCalm;
  uniform float uPointScale;
  varying float vAlpha;
  varying float vCore;

  float waveGlow(float wave) {
    float rise = ${(RIPPLE_WAVE_MS / 1000).toFixed(3)};
    return smoothstep(wave * rise, wave * rise + 0.8, uRipple);
  }

  void main() {
    float built = smoothstep(aThreshold, aThreshold + 0.12, uProgress);
    float breathe = sin(uTime * 0.42 + aSeed * 6.28318) * 0.5 + 0.5;
    float hovered = step(abs(aId - uHoverId), 0.5);
    float focused = step(abs(aId - uFocusId), 0.5);

    // The heart beats like the first neuron did — the business is the
    // same living thing, grown. When the universe holds its breath
    // (the engine pause), the heartbeat softens but never stops.
    float heart = step(abs(aId - ${HEART_ID.toFixed(1)}), 0.5);
    float cycle = fract(uTime * 1.111);
    float beat = exp(-24.0 * pow(cycle - 0.10, 2.0)) + 0.6 * exp(-24.0 * pow(cycle - 0.32, 2.0));

    float alpha = 0.2 + 0.2 * breathe;
    if (uFocusId > 0.5) {
      // Isolation: the chosen system holds; what the change reaches is
      // lit by the ripple, wave after wave; feeders stay as quiet context.
      float downstream = aWave > 0.5 && aWave < 50.0 ? waveGlow(aWave) : 0.0;
      float upstream = aUpstream * (0.18 + 0.08 * breathe);
      alpha = focused * (0.75 + 0.2 * breathe) + (1.0 - focused) * (0.045 + downstream * 0.8 + upstream);
    } else if (uScript > 0.5) {
      // Consequences: scripted waves of the committed decision — the
      // world answers, stage by stage; everything else keeps breathing.
      // As recovery completes (uCalm), the consequence-light settles into
      // structure: architecture replaces glow. A listened system still
      // answers, even while telling what the decision did to it.
      float downstream = aWave > 0.5 && aWave < 50.0 ? waveGlow(aWave) : 0.0;
      downstream *= 1.0 - uCalm * 0.55;
      alpha = 0.14 + 0.1 * breathe + uCalm * 0.06 + downstream * 0.85 + hovered * 0.4;
    } else {
      // Listening: the system answers, and its relationship neighborhood
      // leans in — that is the whole lesson of a hover.
      alpha += hovered * 0.55 + aAdj * 0.35 * (0.6 + 0.4 * breathe);
    }
    alpha += heart * beat * 0.18 * (0.25 + 0.75 * uAwake);
    vAlpha = alpha * built * uReveal;
    vCore = 1.0;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float size = aSize * (1.0 + hovered * 0.35 + focused * 0.45 + heart * beat * 0.1);
    gl_PointSize = size * (uPointScale / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const EDGE_VERTEX = /* glsl */ `
  attribute float aBuilt;
  attribute float aWave;
  attribute float aCore;
  attribute float aHot;
  uniform float uReveal;
  uniform float uProgress;
  uniform float uFocusId;
  uniform float uHoverId;
  uniform float uRipple;
  uniform float uScript;
  uniform float uCalm;
  varying float vAlpha;

  float waveGlow(float wave) {
    float rise = ${(RIPPLE_WAVE_MS / 1000).toFixed(3)};
    return smoothstep(wave * rise, wave * rise + 0.8, uRipple);
  }

  void main() {
    float built = smoothstep(aBuilt, aBuilt + 0.08, uProgress);
    float base = 0.14 + aCore * 0.12;
    if (uFocusId > 0.5) {
      float downstream = aWave > 0.5 && aWave < 50.0 ? waveGlow(aWave) : 0.0;
      base = 0.035 + downstream * (0.5 + aCore * 0.2);
    } else if (uScript > 0.5) {
      float downstream = aWave > 0.5 && aWave < 50.0 ? waveGlow(aWave) : 0.0;
      downstream *= 1.0 - uCalm * 0.55;
      base = 0.05 + uCalm * 0.05 + downstream * (0.45 + aCore * 0.2);
    } else if (uHoverId > 0.5) {
      base += aHot * 0.42;
    }
    vAlpha = base * built * uReveal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const GLINT_VERTEX = /* glsl */ `
  attribute vec3 aFrom;
  attribute vec3 aTo;
  attribute float aSeed;
  attribute float aBuilt;
  attribute float aWave;
  uniform float uTime;
  uniform float uReveal;
  uniform float uProgress;
  uniform float uFocusId;
  uniform float uRipple;
  uniform float uAwake;
  uniform float uPointScale;
  varying float vAlpha;
  varying float vCore;

  float waveGlow(float wave) {
    float rise = ${(RIPPLE_WAVE_MS / 1000).toFixed(3)};
    return smoothstep(wave * rise, wave * rise + 0.8, uRipple);
  }

  void main() {
    float built = smoothstep(aBuilt, aBuilt + 0.08, uProgress);
    // The pulse travels cause → effect; it never runs backwards.
    float t = fract(uTime * 0.09 + aSeed);
    vec3 pos = mix(aFrom, aTo, t);
    float envelope = sin(3.14159 * t);
    float alpha = 0.5 * envelope;
    if (uFocusId > 0.5) {
      float downstream = aWave > 0.5 && aWave < 50.0 ? waveGlow(aWave) : 0.0;
      alpha = envelope * downstream * 0.85;
    }
    // The pauses are the message: when the universe holds its breath for
    // the visitor's decision, the travelling pulses go still and dark.
    alpha *= uAwake;
    vAlpha = alpha * built * uReveal;
    vCore = 1.0;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 7.0 * (uPointScale / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const SHARED_FRAGMENT = /* glsl */ `
  uniform vec3 uColorOuter;
  uniform vec3 uColorInner;
  uniform vec3 uColorCore;
  varying float vAlpha;
  varying float vCore;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float core = smoothstep(0.28, 0.0, d) * vCore;
    float halo = exp(-d * 3.2);
    float alpha = (core + halo * 0.6) * vAlpha;
    if (alpha < 0.004) discard;
    vec3 color = mix(uColorOuter, mix(uColorInner, uColorCore, core), clamp(core + halo * 0.35, 0.0, 1.0));
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

const EDGE_FRAGMENT = /* glsl */ `
  uniform vec3 uEdgeColor;
  varying float vAlpha;

  void main() {
    if (vAlpha < 0.004) discard;
    gl_FragColor = vec4(uEdgeColor, vAlpha);
  }
`;

export function createUniverseAssets(): UniverseAssets {
  const disposables: Array<{ dispose: () => void }> = [];

  const uniforms: UniverseUniforms = {
    uTime: { value: 0 },
    uReveal: { value: 0 },
    uProgress: { value: 0 },
    uFocusId: { value: 0 },
    uHoverId: { value: 0 },
    uRipple: { value: 99 },
    uAwake: { value: 1 },
    uScript: { value: 0 },
    uCalm: { value: 0 },
    uPointScale: { value: 400 },
  };

  // ── Systems ─────────────────────────────────────────────────────────────
  const positions: number[] = [];
  const sizes: number[] = [];
  const seeds: number[] = [];
  const ids: number[] = [];
  const thresholds: number[] = [];
  const waves: number[] = [];
  const upstreams: number[] = [];
  const adjs: number[] = [];
  BUSINESS_ENTITIES.forEach((entity, index) => {
    positions.push(...entity.position);
    sizes.push(entity.tier === 0 ? 30 : entity.tier === 1 ? 21 : 16.5);
    seeds.push((index + 1) * 0.41);
    ids.push(entity.order);
    thresholds.push(entity.threshold);
    waves.push(99); // rewritten on isolation (aWave 0 = isolated origin)
    upstreams.push(0);
    adjs.push(0);
  });

  const entityGeometry = new THREE.BufferGeometry();
  entityGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  entityGeometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1));
  entityGeometry.setAttribute('aSeed', new THREE.Float32BufferAttribute(seeds, 1));
  entityGeometry.setAttribute('aId', new THREE.Float32BufferAttribute(ids, 1));
  entityGeometry.setAttribute('aThreshold', new THREE.Float32BufferAttribute(thresholds, 1));
  entityGeometry.setAttribute('aWave', new THREE.Float32BufferAttribute(waves, 1));
  entityGeometry.setAttribute('aUpstream', new THREE.Float32BufferAttribute(upstreams, 1));
  entityGeometry.setAttribute('aAdj', new THREE.Float32BufferAttribute(adjs, 1));

  const entityMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms as unknown as Record<string, THREE.IUniform>,
    vertexShader: ENTITY_VERTEX,
    fragmentShader: SHARED_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  entityMaterial.uniforms.uColorOuter = { value: EMBER_OUTER };
  entityMaterial.uniforms.uColorInner = { value: EMBER_INNER };
  entityMaterial.uniforms.uColorCore = { value: EMBER_CORE };

  const entities = new THREE.Points(entityGeometry, entityMaterial);
  entities.frustumCulled = false;
  disposables.push(entityGeometry, entityMaterial);

  // ── Relationships (one vertex pair per edge; verbs live in the registry) ─
  const edgePositions: number[] = [];
  const edgeBuilt: number[] = [];
  const edgeWaves: number[] = [];
  const edgeCores: number[] = [];
  const edgeHots: number[] = [];
  const glintFrom: number[] = [];
  const glintTo: number[] = [];
  const glintSeed: number[] = [];
  const glintBuilt: number[] = [];
  const glintWave: number[] = [];

  BUSINESS_EDGES.forEach((edge, index) => {
    const from = getEntity(edge.from);
    const to = getEntity(edge.to);
    // An edge is earned once both ends exist, a breath later.
    const built = Math.min(0.9, Math.max(from.threshold, to.threshold) + 0.08);
    edgePositions.push(...from.position, ...to.position);
    edgeBuilt.push(built, built);
    edgeWaves.push(99, 99);
    edgeCores.push(edge.core ? 1 : 0, edge.core ? 1 : 0);
    edgeHots.push(0, 0);
    glintFrom.push(...from.position);
    glintTo.push(...to.position);
    glintSeed.push((index + 1) * 0.618);
    glintBuilt.push(built);
    glintWave.push(99);
  });

  const edgeGeometry = new THREE.BufferGeometry();
  edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));
  edgeGeometry.setAttribute('aBuilt', new THREE.Float32BufferAttribute(edgeBuilt, 1));
  edgeGeometry.setAttribute('aWave', new THREE.Float32BufferAttribute(edgeWaves, 1));
  edgeGeometry.setAttribute('aCore', new THREE.Float32BufferAttribute(edgeCores, 1));
  edgeGeometry.setAttribute('aHot', new THREE.Float32BufferAttribute(edgeHots, 1));

  const edgeMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms as unknown as Record<string, THREE.IUniform>,
    vertexShader: EDGE_VERTEX,
    fragmentShader: EDGE_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  edgeMaterial.uniforms.uEdgeColor = { value: EMBER_INNER };

  const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
  edges.frustumCulled = false;
  disposables.push(edgeGeometry, edgeMaterial);

  // ── Glints: the cause visibly travelling to its effect ───────────────────
  const glintGeometry = new THREE.BufferGeometry();
  glintGeometry.setAttribute('position', new THREE.Float32BufferAttribute(glintFrom.slice(), 3));
  glintGeometry.setAttribute('aFrom', new THREE.Float32BufferAttribute(glintFrom, 3));
  glintGeometry.setAttribute('aTo', new THREE.Float32BufferAttribute(glintTo, 3));
  glintGeometry.setAttribute('aSeed', new THREE.Float32BufferAttribute(glintSeed, 1));
  glintGeometry.setAttribute('aBuilt', new THREE.Float32BufferAttribute(glintBuilt, 1));
  glintGeometry.setAttribute('aWave', new THREE.Float32BufferAttribute(glintWave, 1));

  const glintMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms as unknown as Record<string, THREE.IUniform>,
    vertexShader: GLINT_VERTEX,
    fragmentShader: SHARED_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  glintMaterial.uniforms.uColorOuter = { value: EMBER_OUTER };
  glintMaterial.uniforms.uColorInner = { value: EMBER_INNER };
  glintMaterial.uniforms.uColorCore = { value: EMBER_CORE };

  const glints = new THREE.Points(glintGeometry, glintMaterial);
  glints.frustumCulled = false;
  disposables.push(glintGeometry, glintMaterial);

  return {
    entities,
    edges,
    glints,
    uniforms,
    dispose: () => {
      for (const disposable of disposables) disposable.dispose();
    },
  };
}
