# Reusable Components — the journey kit

Every scene after SCENE-001 reuses this kit instead of re-solving the same
problems. Extracted cleanly as demanded by the SCENE-003 directive; recorded
here so future scenes (SCENE-004+) import, never duplicate.

## Rendering core (`src/core/three/`)

| Component          | Purpose                                                                                                                                |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `CanvasHost`       | The single R3F canvas wrapper: capability gate, fallback slot, adaptive DPR. All WebGL scenes mount inside it — never a second canvas. |
| `AdaptiveRenderer` | In-canvas performance governor; steps resolution down before frames drop.                                                              |

## Journey shell (`src/scene/journey/`)

| Component                                                                          | Purpose                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `JourneyRoot` / `JourneySceneContext`                                              | The one universe: chapters (`opening → mind → grammar → …`) evolve in place, never a page transition. DOM↔canvas sync runs through shared refs (`presenceRef`, `scrollRef`, `screenRef`, `focusRef`, `diveRef`) on rAF — zero React renders per pointer/scroll frame.                |
| `JourneyCanvas` → `JourneyCanvasR3F`                                               | The only module importing `three` / `@react-three/fiber`; dynamic-imported so Three.js stays out of the initial bundle. New worlds mount conditionally by chapter inside `CanvasHost`.                                                                                                |
| `JourneyCamera`                                                                    | Camera rails per chapter: opening dolly, mind rail (z −2.5…−19 focus travel), grammar rail (vista → deep, driven by `scrollRef.g`). Add a rail, not a camera.                                                                                                                         |
| `Projector` (mind) / `GrammarProjector` (grammar) / `UniverseProjector` (universe) | The projector pattern: world positions → screen anchors in `screenRef` each frame, hover resolution against `presenceRef`, earned visibility gates. DOM doors read anchors; the canvas never owns interaction.                                                                        |
| `usePointerPresence`                                                               | Pointer position/activity ref feeding all listening logic.                                                                                                                                                                                                                            |
| Dependency-wave engine (`universe-content`)                                        | `getDownstreamWaves(id)` — BFS over authored cause→effect edges; the same waves drive the WebGL ripple and the DOM labels. Any future "consequences travel a graph" moment reuses it.                                                                                                 |
| Shared ripple clock (`focusRef.rippleAt`, `engineRef.clockAt`)                     | One `performance.now()` instant, two layers: canvas shader uniforms and DOM labels both derive "what is lit now" from it — layers can never disagree about a travelling change.                                                                                                       |
| Consequence simulation (`decision-content`)                                        | Scripted consequence waves (`getConsequenceWaves`) ride the universe ripple machinery unchanged — a different wave _source_, not a different engine — and `scriptRippleTime` maps wall-clock milliseconds onto shader ripple-units so staged text and staged ignitions land together. |
| Decision Lock (`de:committed:*` anchor)                                            | The persisted journey anchor is the lock: one decision, no undo, consequences kept across visits. Any future irreversible act reuses the anchor-as-lock law.                                                                                                                          |
| Runway segment lock (`GRAMMAR_LOCK_G`, `ENGINE_LOCK_W`)                            | Scroll progress clamps until an irreversible act exists — the journey cannot enter the aftermath of something that never happened. The earned law, generalized over segments.                                                                                                         |
| World pause law (`uAwake`, engine chapters)                                        | A world can hold its breath: stop its clock, damp its travelling pulses to dark, keep the heartbeat alive at 25%. Deeper than "reduced motion" — it is suspense as a first-class scene state.                                                                                         |
| Recovery morph (`buildSettlePlan` + per-frame lerp, impact)                        | Structural transformation without new geometry: systems, edges, and glints lerp from grown positions to authored calm targets with staggered timing (affected first). "Light becomes architecture" — any future re-architecture of a world reuses it.                                 |
| Calm law (`uCalm` uniform)                                                         | 0→1 progress that slows a world's clock, softens its glow into structure, lifts the fog, and steadies the heartbeat. Environmental evolution as one damped scalar.                                                                                                                    |
| Bookend law (`uHeartHold` uniform)                                                 | A leitmotif can outlive its world: the heartbeat's alpha is added _after_ the reveal multiply, so the first light persists while its architecture dissolves. Any finale reuses it to close a loop opened at the threshold.                                                            |
| Typography-beat sequence (`futureBeatFor` + crossfade law)                         | Scroll thresholds → one React state → absolute crossfading lines, present without JS, paced with it. The ending's hero-pattern for any chapter whose hero is words.                                                                                                                   |
| Warm dissolve (`data-fu` + `.fu-warm`)                                             | Atmosphere steps declared in CSS on a wrapper data-attribute — the same data-attribute law as every caption, extended to light itself.                                                                                                                                                |
| Earned-label law (`anchor.invited` reuse)                                          | Projectors mark which world objects have earned a name right now (hover-neighbor, ripple-reached); overlays render labels from that one flag.                                                                                                                                         |
| `Gated`                                                                            | Gates one story element on its beat: `.op-gated` + `.op-gated-live`, mirrors `aria-hidden` so screen readers and sighted visitors share pacing. Without JS the element is simply present (semantic floor).                                                                            |
| `ThoughtCard`                                                                      | The calm reasoning dialog (non-modal, ESC closes, focus-in on open, caller restores focus). Props: `{ label, kicker, children, actions?, onClose, className }`. One idea, in the document's voice — use for every "expand the reasoning" moment.                                      |
| `useScheduler`                                                                     | Timeout registry that always clears on unmount. Every scene machine schedules beats through it; nothing outlives its scene.                                                                                                                                                           |

## Field/asset pattern (one per world)

`neuron-assets.ts` (opening), `mindscape-assets.ts` (mind),
`grammar-assets.ts` (grammar) — each builds its whole GPU footprint in ≤3
draw calls: a glow-point shader `Points` cloud with authored uniforms
(`uTime`, reveal/progress), plus lines/rings as `LineSegments` with
`drawRange` growth. Copy the pattern; author new uniforms; never add
per-node meshes.

| Asset                 | Notes                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| Glow-point shader law | A station is _earned_: alpha = f(reveal, visited, active, focused). Nothing appears instantly. |
| `StaticNeuron`        | The canvas fallback (no-WebGL / stills lane). Pattern: one inline SVG of the world, zero JS.   |

## Semantic-floor parity

`MindscapeStatic` / `GrammarStatic`: every interactive moment mirrored as
native `<details>` disclosure — full content parity, zero JS, crawlable.
`Gated` + `op-gated` CSS law keeps SSR HTML complete; the inline
`html[data-js]` script (layout) is the only switch between "all present" and
"paced by the machine".

## Interaction laws to keep

- Hover = reveal hidden context; select = expand reasoning (ThoughtCard);
  scroll = progress through thinking.
- Announcements go through the single `role="status"` aria-live region in
  `JourneyRoot` — one voice, no chatter.
- Store anchors (`useJourneyStore.markVisited`) name moments as
  `<chapter-prefix>:<moment>` (`op:*`, `mm:*`, `gm:*`).
- 44px minimum hit areas; `:focus-visible` ring on every door
  (`.mind-door` CSS law).

## V2 foundation (SPRINT 1 — visual language, PR-01)

Foundation layers every V2 scene mounts in its re-skin sprint. Inert by
design: nothing below restyles anything that ships today.

| Artifacts                                                | Purpose                                                                                                                                                                                                                                                                                                              |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `chapterPalettes` + `restingPalette` (`tokens/color.ts`) | The seven chapter color constitutions (field/ink/accent glow+text/gradient) from VISUAL_DESIGN_BIBLE §4 — projected to Tailwind (`chapter-*` utilities) and to live CSS variables `--v2-field/ink/glow/accent/grad-a/grad-b` keyed on `data-chapter` (globals.css). One number, one place.                           |
| V2 type roles (`tokens/typography.ts`)                   | `display-monument`, `display-hero`, `whisper` — the architecture scale. Existing roles untouched.                                                                                                                                                                                                                    |
| V2 layout tokens (`tokens/spacing.ts`)                   | `grid-margin`, `grid-gutter-x`, `spread-y`, `chapter-air`, `layoutExtents` (`field-max`, `rail-lower-third`).                                                                                                                                                                                                        |
| V2 move tokens (`tokens/motion.ts`)                      | `migrate/drawStroke/settleDrift/reveal/vista/holdCaption` durations (scene constants converge here), `motionStagger.step` (45ms, `duration-stagger` projection).                                                                                                                                                     |
| Kit laws (globals.css)                                   | `.v2-rise` (Mask) · `.v2-resolve` (blur→read, display-tier) · `.v2-draw` (stroke, `--draw-len`) · `.v2-cascade` (`--step-i`) — all gated `.v2-live` under `html[data-js]`, present at rest without JS, instant under reduced motion. Layout: `.v2-field`, `.v2-spread`, `.v2-span-body/exhibit/full`, `.v2-eyebrow`. |
| `ReadingLight` (`src/scene/journey/ReadingLight.tsx`)    | The cursor reading-light: fixed halo, chapter-tinted via `--v2-glow`, states via `data-cursor` (read/door/press/hold), passive listeners, off on coarse pointers + reduced motion. Unmounted until scene sprints.                                                                                                    |
| Tailwind keyframes                                       | `mask-rise`, `resolve-in`, `draw-line`, `breath-sway` (`animate-*` utilities).                                                                                                                                                                                                                                       |

Laws carried: accent glow-tier is display-only, text-tier for labels
(V-C48); furniture stays hueless (V-C72); animated tracking remains banned
(V-M36); every kit law ships its reduced twin in the same CSS gate.
