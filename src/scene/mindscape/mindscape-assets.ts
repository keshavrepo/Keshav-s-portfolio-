import * as THREE from 'three';

import { MIND_NODES, MIND_PATHS, getMindNode } from './mindscape-content';

/**
 * Mind world geometry (SCENE-002). Four concepts, three draw calls —
 * economy is the aesthetic:
 *   1. Points — decision nodes, question satellites, insight glints.
 *   2. LineSegments — reasoning paths, with the fade of conviction.
 *   3. LineLoops — three priority strata far below, readable as ground.
 * Seeded and deterministic: the same mind on every device.
 */

export interface MindscapeUniforms {
  uTime: { value: number };
  uReveal: { value: number };
  uFocusId: { value: number };
  uPointScale: { value: number };
}

export interface MindscapeAssets {
  points: THREE.Points;
  paths: THREE.LineSegments;
  rings: THREE.LineLoop[];
  uniforms: MindscapeUniforms;
  dispose: () => void;
}

const EMBER_OUTER = new THREE.Color('#EBA978');
const EMBER_INNER = new THREE.Color('#F2C7A4');
const EMBER_CORE = new THREE.Color('#F8E3D0');

const QUESTIONS_PER_NODE = 3;

function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const POINT_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  attribute float aKind;
  attribute float aId;
  attribute vec3 aTo;
  attribute float aSpeed;
  uniform float uTime;
  uniform float uReveal;
  uniform float uFocusId;
  uniform float uPointScale;
  varying float vAlpha;
  varying float vKind;

  void main() {
    vec3 pos = position;

    // kinds: 0 decision node, 1 question satellite, 2 insight glint
    float isQuestion = step(0.5, aKind) * (1.0 - step(1.5, aKind));
    float isGlint = step(1.5, aKind);
    float isNode = 1.0 - isQuestion - isGlint;
    float focused = step(abs(aId - uFocusId), 0.5);

    if (isGlint > 0.5) {
      // Thought in transit: travels its reasoning path, rests at either end.
      float t = fract(uTime * aSpeed + aSeed);
      pos = mix(position, aTo, t);
      pos.y += sin(t * 3.14159265) * 0.16;
    }

    float breathe = sin(uTime * 0.5 + aSeed * 6.28318);
    float alpha =
      isNode * (0.72 + 0.18 * breathe + focused * 0.9) +
      isQuestion * (0.14 + 0.08 * sin(uTime * 0.9 + aSeed * 6.28318) + focused * 0.5) +
      isGlint * 0.85;

    float size =
      aSize * mix(1.0, 0.5, isGlint) * (1.0 + focused * 0.5 * isNode);

    vAlpha = alpha * uReveal;
    vKind = isNode;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = size * (uPointScale / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const POINT_FRAGMENT = /* glsl */ `
  uniform vec3 uColorOuter;
  uniform vec3 uColorInner;
  uniform vec3 uColorCore;
  varying float vAlpha;
  varying float vKind;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float core = smoothstep(0.3, 0.0, d) * vKind;
    float halo = exp(-d * 3.0);
    float alpha = (core + halo * 0.5) * vAlpha;
    if (alpha < 0.004) discard;
    vec3 color = mix(uColorOuter, mix(uColorInner, uColorCore, core), clamp(core + halo * 0.3, 0.0, 1.0));
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

export function createMindscapeAssets(): MindscapeAssets {
  const rand = mulberry32(4051);
  const disposables: Array<{ dispose: () => void }> = [];

  const uniforms: MindscapeUniforms = {
    uTime: { value: 0 },
    uReveal: { value: 0 },
    uFocusId: { value: 0 },
    uPointScale: { value: 400 },
  };

  // ── One Points draw: nodes, question satellites, insight glints ──────────
  const positions: number[] = [];
  const tos: number[] = [];
  const sizes: number[] = [];
  const seeds: number[] = [];
  const kinds: number[] = [];
  const ids: number[] = [];
  const speeds: number[] = [];

  const pushPoint = (
    pos: [number, number, number],
    to: [number, number, number],
    size: number,
    seed: number,
    kind: number,
    id: number,
    speed: number,
  ) => {
    positions.push(...pos);
    tos.push(...to);
    sizes.push(size);
    seeds.push(seed);
    kinds.push(kind);
    ids.push(id);
    speeds.push(speed);
  };

  for (const node of MIND_NODES) {
    pushPoint(node.position, node.position, 24, rand(), 0, node.order, 0);

    for (let q = 0; q < QUESTIONS_PER_NODE; q += 1) {
      const theta = rand() * Math.PI * 2;
      const phi = rand() * Math.PI;
      const r = 0.42 + rand() * 0.22;
      const off: [number, number, number] = [
        node.position[0] + r * Math.sin(phi) * Math.cos(theta),
        node.position[1] + r * Math.cos(phi) * 0.75,
        node.position[2] + r * Math.sin(phi) * Math.sin(theta),
      ];
      pushPoint(off, off, 5.5, rand(), 1, node.order, 0);
    }
  }

  for (const path of MIND_PATHS) {
    const from = getMindNode(path.from).position;
    const to = getMindNode(path.to).position;
    pushPoint(from, to, 8, rand(), 2, 0, 0.018 + rand() * 0.012);
  }

  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  pointsGeometry.setAttribute('aTo', new THREE.Float32BufferAttribute(tos, 3));
  pointsGeometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1));
  pointsGeometry.setAttribute('aSeed', new THREE.Float32BufferAttribute(seeds, 1));
  pointsGeometry.setAttribute('aKind', new THREE.Float32BufferAttribute(kinds, 1));
  pointsGeometry.setAttribute('aId', new THREE.Float32BufferAttribute(ids, 1));
  pointsGeometry.setAttribute('aSpeed', new THREE.Float32BufferAttribute(speeds, 1));

  const pointsMaterial = new THREE.ShaderMaterial({
    uniforms: uniforms as unknown as Record<string, THREE.IUniform>,
    vertexShader: POINT_VERTEX,
    fragmentShader: POINT_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  pointsMaterial.uniforms.uColorOuter = { value: EMBER_OUTER };
  pointsMaterial.uniforms.uColorInner = { value: EMBER_INNER };
  pointsMaterial.uniforms.uColorCore = { value: EMBER_CORE };

  const points = new THREE.Points(pointsGeometry, pointsMaterial);
  points.frustumCulled = false;
  disposables.push(pointsGeometry, pointsMaterial);

  // ── Reasoning paths: bezier threads with a fading center ─────────────────
  const pathPositions: number[] = [];
  const pathColors: number[] = [];
  const PATH_STEPS = 22;

  for (const path of MIND_PATHS) {
    const from = new THREE.Vector3(...getMindNode(path.from).position);
    const to = new THREE.Vector3(...getMindNode(path.to).position);
    const mid = from.clone().add(to).multiplyScalar(0.5);
    mid.y += 0.35;

    const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
    const along = curve.getPoints(PATH_STEPS);
    for (let i = 1; i < along.length; i += 1) {
      const a = along[i - 1];
      const b = along[i];
      pathPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
      const shadeA = 0.3 - Math.sin(((i - 1) / PATH_STEPS) * Math.PI) * 0.16;
      const shadeB = 0.3 - Math.sin((i / PATH_STEPS) * Math.PI) * 0.16;
      const cA = EMBER_OUTER.clone().multiplyScalar(Math.max(0.08, shadeA));
      const cB = EMBER_OUTER.clone().multiplyScalar(Math.max(0.08, shadeB));
      pathColors.push(cA.r, cA.g, cA.b, cB.r, cB.g, cB.b);
    }
  }

  const pathsGeometry = new THREE.BufferGeometry();
  pathsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pathPositions, 3));
  pathsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(pathColors, 3));

  const pathsMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const paths = new THREE.LineSegments(pathsGeometry, pathsMaterial);
  paths.frustumCulled = false;
  disposables.push(pathsGeometry, pathsMaterial);

  // ── Priority strata: three eyeliner rings far below every decision ───────
  const rings: THREE.LineLoop[] = [];
  const ringSpecs: Array<[number, number, number]> = [
    [9.5, 4.2, 0.1],
    [15, 6.8, 0.06],
    [21, 9.6, 0.04],
  ];

  for (const [rx, rz, faint] of ringSpecs) {
    const ringPositions: number[] = [];
    for (let i = 0; i < 96; i += 1) {
      const theta = (i / 96) * Math.PI * 2;
      ringPositions.push(Math.cos(theta) * rx, -3.3, Math.sin(theta) * rz - 6);
    }
    const ringGeometry = new THREE.BufferGeometry();
    ringGeometry.setAttribute('position', new THREE.Float32BufferAttribute(ringPositions, 3));
    const ringMaterial = new THREE.LineBasicMaterial({
      color: EMBER_OUTER.clone().multiplyScalar(faint),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const ring = new THREE.LineLoop(ringGeometry, ringMaterial);
    ring.userData.faint = faint;
    rings.push(ring);
    disposables.push(ringGeometry, ringMaterial);
  }

  return {
    points,
    paths,
    rings,
    uniforms,
    dispose: () => {
      for (const disposable of disposables) disposable.dispose();
    },
  };
}
