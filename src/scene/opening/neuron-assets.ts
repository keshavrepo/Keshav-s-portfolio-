import * as THREE from 'three';

/**
 * Neuron assets (SCENE-001). Procedural and deterministic — the layout is
 * seeded, so the neuron is the *same* neuron on every visit and every
 * device. No binary payloads; the entire organism is math (figures must
 * spot-check instantly, including in the source).
 *
 * Composition: one core glow point, two distant satellite embers, a corona
 * of short curved filaments, and two link curves that "grow" when the story
 * reaches the brightening beat ("the connections begin forming").
 */

export interface NeuronUniforms {
  uTime: { value: number };
  uIntensity: { value: number };
  uBeat: { value: number };
  uLinks: { value: number };
  uDive: { value: number };
  uPointScale: { value: number };
}

export interface NeuronAssets {
  points: THREE.Points;
  filaments: THREE.LineSegments;
  links: THREE.LineSegments;
  uniforms: NeuronUniforms;
  linksVertexCount: number;
  dispose: () => void;
}

const FILAMENT_COUNT = 34;
const FILAMENT_STEPS = 5;
const LINK_STEPS = 28;

/** Ember family, from the locked color tokens (ember-300/200/100). */
const EMBER_OUTER = new THREE.Color('#EBA978');
const EMBER_INNER = new THREE.Color('#F2C7A4');
const EMBER_CORE = new THREE.Color('#F8E3D0');

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

/** Even spherical coverage, then organic jitter — elegance, not symmetry. */
function fibonacciDirection(index: number, count: number, rand: () => number): THREE.Vector3 {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = 1 - (index / (count - 1)) * 2;
  const radius = Math.sqrt(1 - y * y);
  const theta = golden * index;
  const dir = new THREE.Vector3(Math.cos(theta) * radius, y, Math.sin(theta) * radius);
  dir.x += (rand() - 0.5) * 0.28;
  dir.y += (rand() - 0.5) * 0.28;
  dir.z += (rand() - 0.5) * 0.28;
  return dir.normalize();
}

const POINT_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  attribute float aKind;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uBeat;
  uniform float uLinks;
  uniform float uDive;
  uniform float uPointScale;
  varying float vAlpha;
  varying float vCore;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Two-beat waveform (lub-dub) — the resting heart of the leitmotif (S58).
    float cycle = fract(uTime * 1.111 + aSeed);
    float beat = exp(-24.0 * pow(cycle - 0.10, 2.0))
               + 0.6 * exp(-24.0 * pow(cycle - 0.32, 2.0));
    float gain = 1.0 + beat * 0.38 * uBeat;

    // Satellites (aKind 1) only exist once the story forms connections.
    float kindGate = mix(1.0, uLinks, aKind);
    vAlpha = uIntensity * kindGate * mix(1.0, 0.35, uDive);
    vCore = 1.0 - aKind;

    float diveScale = 1.0 + uDive * uDive * 7.0;
    gl_PointSize = aSize * gain * diveScale * (uPointScale / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const POINT_FRAGMENT = /* glsl */ `
  uniform vec3 uColorOuter;
  uniform vec3 uColorInner;
  uniform vec3 uColorCore;
  varying float vAlpha;
  varying float vCore;

  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float core = smoothstep(0.26, 0.0, d) * vCore;
    float halo = exp(-d * 3.2);
    float alpha = (core + halo * 0.6) * vAlpha;
    if (alpha < 0.004) discard;
    vec3 color = mix(uColorOuter, mix(uColorInner, uColorCore, core), clamp(core + halo * 0.35, 0.0, 1.0));
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

export function createNeuronAssets(): NeuronAssets {
  const rand = mulberry32(1187);
  const disposables: Array<{ dispose: () => void }> = [];

  const uniforms: NeuronUniforms = {
    uTime: { value: 0 },
    uIntensity: { value: 0 },
    uBeat: { value: 0 },
    uLinks: { value: 0 },
    uDive: { value: 0 },
    uPointScale: { value: 400 },
  };

  // ── Points: the core and two satellites ──────────────────────────────────
  const satellites: Array<[number, number, number, number]> = [
    [2.1, 0.75, -0.55, 11],
    [-1.8, -0.62, 0.42, 9],
  ];

  const pointPositions: number[] = [0, 0, 0];
  const pointSizes: number[] = [30];
  const pointSeeds: number[] = [0];
  const pointKinds: number[] = [0];
  for (const [x, y, z, size] of satellites) {
    pointPositions.push(x, y, z);
    pointSizes.push(size);
    pointSeeds.push(rand());
    pointKinds.push(1);
  }

  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(pointPositions, 3));
  pointsGeometry.setAttribute('aSize', new THREE.Float32BufferAttribute(pointSizes, 1));
  pointsGeometry.setAttribute('aSeed', new THREE.Float32BufferAttribute(pointSeeds, 1));
  pointsGeometry.setAttribute('aKind', new THREE.Float32BufferAttribute(pointKinds, 1));

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

  // ── Filaments: the corona of short curved dendrites ───────────────────────
  const filamentPositions: number[] = [];
  const filamentColors: number[] = [];

  const filamentVertex = (
    dir: THREE.Vector3,
    length: number,
    t: number,
    rand1: number,
    rand2: number,
  ): [THREE.Vector3, number] => {
    const sway = 0.1 + 0.08 * rand1;
    const curve = new THREE.Vector3(
      dir.x + Math.sin(t * Math.PI) * sway * (rand2 - 0.5) * 2,
      dir.y + Math.sin(t * Math.PI * 0.8) * sway * (rand1 - 0.5) * 2,
      dir.z + Math.cos(t * Math.PI * 1.2) * sway * 0.4,
    );
    const ease = 0.14 + (length - 0.14) * (1 - Math.pow(1 - t, 2.2));
    const fade = (1 - t) * (0.5 + 0.5 * rand2);
    return [curve.multiplyScalar(ease), fade];
  };

  for (let i = 0; i < FILAMENT_COUNT; i += 1) {
    const dir = fibonacciDirection(i, FILAMENT_COUNT, rand);
    const length = 0.85 + rand() * 0.45;
    const r1 = rand();
    const r2 = rand();
    let prev = filamentVertex(dir, length, 0, r1, r2);
    for (let step = 1; step <= FILAMENT_STEPS; step += 1) {
      const t = step / FILAMENT_STEPS;
      const next = filamentVertex(dir, length, t, r1, r2);
      filamentPositions.push(prev[0].x, prev[0].y, prev[0].z, next[0].x, next[0].y, next[0].z);
      const c0 = EMBER_OUTER.clone().lerp(EMBER_INNER, r1).multiplyScalar(prev[1]);
      const c1 = EMBER_OUTER.clone().lerp(EMBER_INNER, r1).multiplyScalar(next[1]);
      filamentColors.push(c0.r, c0.g, c0.b, c1.r, c1.g, c1.b);
      prev = next;
    }
  }

  const filamentsGeometry = new THREE.BufferGeometry();
  filamentsGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(filamentPositions, 3),
  );
  filamentsGeometry.setAttribute('color', new THREE.Float32BufferAttribute(filamentColors, 3));

  const filamentsMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const filaments = new THREE.LineSegments(filamentsGeometry, filamentsMaterial);
  filaments.frustumCulled = false;
  disposables.push(filamentsGeometry, filamentsMaterial);

  // ── Links: two curves that grow toward the satellites ─────────────────────
  const linkPositions: number[] = [];
  const linkColors: number[] = [];
  let linksVertexCount = 0;

  for (const [sx, sy, sz] of [
    [2.1, 0.75, -0.55],
    [-1.8, -0.62, 0.42],
  ] as Array<[number, number, number]>) {
    const end = new THREE.Vector3(sx, sy, sz);
    const mid = end.clone().multiplyScalar(0.5);
    mid.y += 0.42;
    mid.x += end.x > 0 ? -0.18 : 0.18;

    const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 0, 0), mid, end);
    const pointsAlong = curve.getPoints(LINK_STEPS);
    for (let i = 1; i < pointsAlong.length; i += 1) {
      const a = pointsAlong[i - 1].multiplyScalar(0.92);
      const b = pointsAlong[i].multiplyScalar(0.92);
      linkPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
      const tA = 1 - (i - 1) / LINK_STEPS;
      const tB = 1 - i / LINK_STEPS;
      const cA = EMBER_INNER.clone().multiplyScalar(0.28 + 0.5 * tA);
      const cB = EMBER_INNER.clone().multiplyScalar(0.28 + 0.5 * tB);
      linkColors.push(cA.r, cA.g, cA.b, cB.r, cB.g, cB.b);
      linksVertexCount += 2;
    }
  }

  const linksGeometry = new THREE.BufferGeometry();
  linksGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linkPositions, 3));
  linksGeometry.setAttribute('color', new THREE.Float32BufferAttribute(linkColors, 3));
  linksGeometry.setDrawRange(0, 0);

  const linksMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const links = new THREE.LineSegments(linksGeometry, linksMaterial);
  links.frustumCulled = false;
  disposables.push(linksGeometry, linksMaterial);

  return {
    points,
    filaments,
    links,
    uniforms,
    linksVertexCount,
    dispose: () => {
      for (const disposable of disposables) disposable.dispose();
    },
  };
}
