import * as THREE from 'three';

import { GRAMMAR_STAGES } from './grammar-content';

/**
 * Chapter Two geometry (SCENE-003): the process as an organism.
 *   1. Points — ten stations plus the traveling case-ember (one draw call).
 *   2. LineSegments — the reasoning graph, grown by drawRange as the case
 *      advances (every station is earned; nothing appears instantly).
 *   3. Rings — the corridor at Constraints and the commitment ring snapped
 *      shut at Decision.
 * Deterministic, additive, and quiet: meaning first, motion rationed.
 */

export interface GrammarUniforms {
  uTime: { value: number };
  uReveal: { value: number };
  /** Station id (1..10) the case currently occupies — the earned glow. */
  uActiveId: { value: number };
  uFocusId: { value: number };
  uCommitted: { value: number };
  uPointScale: { value: number };
}

export interface GrammarAssets {
  stations: THREE.Points;
  ember: THREE.Points;
  graph: THREE.LineSegments;
  rings: THREE.LineLoop[];
  graphCurve: THREE.CatmullRomCurve3;
  graphVertexCount: number;
  uniforms: GrammarUniforms;
  dispose: () => void;
}

const EMBER_OUTER = new THREE.Color('#EBA978');
const EMBER_INNER = new THREE.Color('#F2C7A4');
const EMBER_CORE = new THREE.Color('#F8E3D0');
const GRAPH_STEPS = 30;
const EMBER_SIZE = 15;

const STATION_VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aSeed;
  attribute float aId;
  uniform float uTime;
  uniform float uReveal;
  uniform float uActiveId;
  uniform float uFocusId;
  uniform float uPointScale;
  varying float vAlpha;
  varying float vCore;

  void main() {
    float breathe = sin(uTime * 0.5 + aSeed * 6.28318);
    float active = step(abs(aId - uActiveId), 0.5);
    float focused = step(abs(aId - uFocusId), 0.5);
    float visited = step(aId + 0.5, uActiveId);

    // The law of earned thinking: future stations barely pre-exist; the
    // current one is alive; visited ones keep what they taught.
    float alpha =
      visited > 0.5
        ? 0.55 + 0.1 * breathe + active * 0.5 + focused * 0.5
        : 0.1 + active * 0.75 + focused * 0.5;

    vAlpha = alpha * uReveal;
    vCore = 1.0;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float size = aSize * (1.0 + active * 0.4 + focused * 0.5);
    gl_PointSize = size * (uPointScale / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const EMBER_VERTEX = /* glsl */ `
  attribute float aSize;
  uniform float uTime;
  uniform float uReveal;
  uniform float uPointScale;
  varying float vAlpha;

  void main() {
    // The ember keeps the heartbeat of the Opening's pulse — the case is
    // the same kind of living thing (S58 leitmotif continuity).
    float cycle = fract(uTime * 1.111);
    float beat = exp(-24.0 * pow(cycle - 0.10, 2.0)) + 0.6 * exp(-24.0 * pow(cycle - 0.32, 2.0));
    vAlpha = (0.85 + beat * 0.15) * uReveal;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (1.0 + beat * 0.12) * (uPointScale / -mvPosition.z);
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

function makeMaterial(uniforms: GrammarUniforms, vertex: string): THREE.ShaderMaterial {
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms as unknown as Record<string, THREE.IUniform>,
    vertexShader: vertex,
    fragmentShader: SHARED_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  material.uniforms.uColorOuter = { value: EMBER_OUTER };
  material.uniforms.uColorInner = { value: EMBER_INNER };
  material.uniforms.uColorCore = { value: EMBER_CORE };
  return material;
}

export function createGrammarAssets(): GrammarAssets {
  const disposables: Array<{ dispose: () => void }> = [];

  const uniforms: GrammarUniforms = {
    uTime: { value: 0 },
    uReveal: { value: 0 },
    uActiveId: { value: 0 },
    uFocusId: { value: 0 },
    uCommitted: { value: 0 },
    uPointScale: { value: 400 },
  };

  // ── Stations ──────────────────────────────────────────────────────────────
  const positions: number[] = [];
  const sizes: number[] = [];
  const seeds: number[] = [];
  const ids: number[] = [];
  GRAMMAR_STAGES.forEach((stage, index) => {
    positions.push(...stage.position);
    sizes.push(index === GRAMMAR_STAGES.length - 1 ? 26 : 20);
    seeds.push((index + 1) * 0.37);
    ids.push(stage.order);
  });

  const stationGeometry = new THREE.BufferGeometry();
  stationGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  stationGeometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizes, 1));
  stationGeometry.setAttribute('aSeed', new THREE.Float32BufferAttribute(seeds, 1));
  stationGeometry.setAttribute('aId', new THREE.Float32BufferAttribute(ids, 1));

  const stations = new THREE.Points(stationGeometry, makeMaterial(uniforms, STATION_VERTEX));
  stations.frustumCulled = false;
  disposables.push(stationGeometry, stations.material);

  // ── The traveling case-ember (position is written per frame from the curve)
  const emberGeometry = new THREE.BufferGeometry();
  emberGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(GRAMMAR_STAGES[0].position.slice(), 3),
  );
  emberGeometry.setAttribute('aSize', new THREE.Float32BufferAttribute([EMBER_SIZE], 1));
  const ember = new THREE.Points(emberGeometry, makeMaterial(uniforms, EMBER_VERTEX));
  ember.frustumCulled = false;
  disposables.push(emberGeometry, ember.material);

  // ── The reasoning graph: one curve through every station ─────────────────
  const curvePoints = GRAMMAR_STAGES.map((s) => new THREE.Vector3(...s.position));
  const graphCurve = new THREE.CatmullRomCurve3(curvePoints, false, 'centripetal', 0.6);

  const graphPositions: number[] = [];
  const graphColors: number[] = [];
  const SEGMENTS_PER_SPAN = GRAPH_STEPS;
  let graphVertexCount = 0;
  for (let span = 0; span < curvePoints.length - 1; span += 1) {
    for (let step = 0; step < SEGMENTS_PER_SPAN; step += 1) {
      const t0 = (span + step / SEGMENTS_PER_SPAN) / (curvePoints.length - 1);
      const t1 = (span + (step + 1) / SEGMENTS_PER_SPAN) / (curvePoints.length - 1);
      const a = graphCurve.getPoint(t0);
      const b = graphCurve.getPoint(t1);
      graphPositions.push(a.x, a.y, a.z, b.x, b.y, b.z);
      const shadeA = 0.34 - t0 * 0.1;
      const shadeB = 0.34 - t1 * 0.1;
      const cA = EMBER_OUTER.clone().multiplyScalar(shadeA);
      const cB = EMBER_OUTER.clone().multiplyScalar(shadeB);
      graphColors.push(cA.r, cA.g, cA.b, cB.r, cB.g, cB.b);
      graphVertexCount += 2;
    }
  }

  const graphGeometry = new THREE.BufferGeometry();
  graphGeometry.setAttribute('position', new THREE.Float32BufferAttribute(graphPositions, 3));
  graphGeometry.setAttribute('color', new THREE.Float32BufferAttribute(graphColors, 3));
  graphGeometry.setDrawRange(0, 0);

  const graphMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const graph = new THREE.LineSegments(graphGeometry, graphMaterial);
  graph.frustumCulled = false;
  disposables.push(graphGeometry, graphMaterial);

  // ── Rings: the corridor (constraints), the commitment (decision) ──────────
  const buildRing = (stageId: string, radius: number, faint: number): THREE.LineLoop => {
    const stage = GRAMMAR_STAGES.find((s) => s.id === stageId);
    if (!stage) throw new Error(`ring: unknown stage ${stageId}`);
    const pts: number[] = [];
    for (let i = 0; i < 72; i += 1) {
      const theta = (i / 72) * Math.PI * 2;
      pts.push(
        stage.position[0] + Math.cos(theta) * radius,
        stage.position[1],
        stage.position[2] + Math.sin(theta) * radius,
      );
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    const material = new THREE.LineBasicMaterial({
      color: EMBER_INNER.clone().multiplyScalar(faint),
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return new THREE.LineLoop(geometry, material);
  };

  const corridor = buildRing('constraints', 2.6, 0.5);
  const commitment = buildRing('decision', 1.9, 0.8);
  const rings = [corridor, commitment];
  for (const ring of rings) {
    disposables.push(ring.geometry, ring.material as THREE.Material);
  }

  return {
    stations,
    ember,
    graph,
    rings,
    graphCurve,
    graphVertexCount,
    uniforms,
    dispose: () => {
      for (const disposable of disposables) disposable.dispose();
    },
  };
}
