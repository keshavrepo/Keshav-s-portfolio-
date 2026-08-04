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

| Component                                         | Purpose                                                                                                                                                                                                                                                                |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `JourneyRoot` / `JourneySceneContext`             | The one universe: chapters (`opening → mind → grammar → …`) evolve in place, never a page transition. DOM↔canvas sync runs through shared refs (`presenceRef`, `scrollRef`, `screenRef`, `focusRef`, `diveRef`) on rAF — zero React renders per pointer/scroll frame. |
| `JourneyCanvas` → `JourneyCanvasR3F`              | The only module importing `three` / `@react-three/fiber`; dynamic-imported so Three.js stays out of the initial bundle. New worlds mount conditionally by chapter inside `CanvasHost`.                                                                                 |
| `JourneyCamera`                                   | Camera rails per chapter: opening dolly, mind rail (z −2.5…−19 focus travel), grammar rail (vista → deep, driven by `scrollRef.g`). Add a rail, not a camera.                                                                                                          |
| `Projector` (mind) / `GrammarProjector` (grammar) | The projector pattern: world positions → screen anchors in `screenRef` each frame, hover resolution against `presenceRef`. DOM doors read anchors; the canvas never owns interaction.                                                                                  |
| `usePointerPresence`                              | Pointer position/activity ref feeding all listening logic.                                                                                                                                                                                                             |
| `Gated`                                           | Gates one story element on its beat: `.op-gated` + `.op-gated-live`, mirrors `aria-hidden` so screen readers and sighted visitors share pacing. Without JS the element is simply present (semantic floor).                                                             |
| `ThoughtCard`                                     | The calm reasoning dialog (non-modal, ESC closes, focus-in on open, caller restores focus). Props: `{ label, kicker, children, actions?, onClose, className }`. One idea, in the document's voice — use for every "expand the reasoning" moment.                       |
| `useScheduler`                                    | Timeout registry that always clears on unmount. Every scene machine schedules beats through it; nothing outlives its scene.                                                                                                                                            |

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
