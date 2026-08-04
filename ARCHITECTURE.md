# PROJECT K — SPEC-005: PRODUCTION ARCHITECTURE

**Version:** 1.0 · **Status:** Binding engineering law for all implementation work
**Builds on:** SPEC-001 (Creative Vision), SPEC-002 (Audience Intelligence), SPEC-003 (Locked Story Bible), SPEC-004 (Experience Architecture) — all locked; nothing in this document alters them. When a decision below encodes a locked rule, the citation is given inline.

This is the technical constitution of the project. It defines systems, not scenes. Scene content for the seven locked chapters ships in subsequent SPEC phases; everything those scenes will need — tokens, motion, lanes, state, renderer, pipeline, QA gates — is built and runnable **now**.

---

## 0. Stack Contract

| Concern | Choice | Version policy |
|---|---|---|
| Framework | Next.js (App Router, React Server Components default) | 14.2.x, pinned |
| Language | TypeScript, `strict` | 5.6.x |
| Styling | Tailwind CSS driven by design tokens | 3.4.x |
| 3D / WebGL | Three.js via `@react-three/fiber` | three 0.169.x / fiber 8.x |
| Motion | GSAP under a project conductor (below) | 3.12.x |
| State | Zustand (persisted, partialized) | 4.5.x |
| Env validation | Zod, parsed at module import | 3.23.x |
| Tooling | ESLint 8 + Prettier 3 + Husky 9 + lint-staged + commitlint | pinned |

Rationale, one line each: App Router gives server-first rendering so **first paint carries the authored pulse in under a second on mid-tier mobile (ER-1)**; RSC default keeps JavaScript off the text layer; Tailwind is a styling *delivery* mechanism only — all values come from tokens, so no raw hex or duration ever appears in a component; Zustand is small enough to never threaten the latency budget (ER-3, <100ms reactivity); pinned versions keep builds deterministic.

---

## 1. Project Folder Architecture

```
.
├── ARCHITECTURE.md                  # this document (SPEC-005)
├── README.md                        # index of locked specs + this foundation
├── CREATIVE_VISION.md               # SPEC-001 — LOCKED
├── AUDIENCE_INTELLIGENCE.md         # SPEC-002 — LOCKED
├── STORY_BIBLE.md                   # SPEC-003 — LOCKED
├── EXPERIENCE_ARCHITECTURE.md       # SPEC-004 — LOCKED
├── public/
│   └── textures/                    # static art pipeline (§12)
├── scripts/
│   └── sync-fonts.mjs               # font pipeline (§12)
└── src/
    ├── app/                         # routes: layout, page, metadata, error surfaces
    ├── components/                  # view layer, grouped by domain (layout, opening, text)
    ├── design-system/               # tokens (single source of truth) + fonts (§2–§6)
    │   ├── tokens/{color,typography,spacing,motion,index}.ts
    │   ├── fonts.ts                 # next/font/local loading, CSS variable exposure
    │   └── fonts/*.woff2            # self-hosted variable fonts (binary, pipeline-owned)
    ├── core/
    │   ├── config/                  # env.ts (validated), site.ts, budgets.ts
    │   ├── lane/                    # the four tellings: types, resolve, provider
    │   ├── motion/                  # gsap setup, conductor, policy, hooks
    │   ├── state/                   # journey-store, settings-store (zustand)
    │   └── three/                   # capability probe, CanvasHost, scene lifecycle
    ├── scene/                       # chapter locks + scene registry (scene manifests)
    └── lib/                         # cn(), isomorphic layout effect
```

Import direction is one-way: `app/components → core/design-system/scene → lib`. Nothing in `core`, `design-system`, `scene`, or `lib` may import from `app` or `components`. This keeps the engine independent of any page.

## 2. Design System Structure

Three layers, strictly separated:

1. **Tokens** (`src/design-system/tokens/*`) — pure, dependency-free TypeScript data. Same objects are consumed by `tailwind.config.ts` (compile-time) and by runtime code (GSAP, JS timers). One number, one place.
2. **Tailwind theme** — a *projection* of tokens into utility classes (`tailwind.config.ts`). Contributions to the Tailwind config beyond token projection are forbidden.
3. **Primitives** (`src/components/*`) — components compose token utilities; they never invent values. Any value not expressible as a token exists exactly once, inline, with a code comment citing the spec line that licenses it.

## 3. Typography Token System

Typography is the hero (locked). Implemented as roles, not ad-hoc sizes.

- **Families** — two self-hosted variable fonts via `next/font/local` (no runtime CDN): `Fraunces` (`--font-display`) for claims and display — an old-style serif with optical sizing, the "document-born" voice (SPEC-001 §7); `Inter` (`--font-text`) for text, labels, figures. Figures use tabular lining numerals via `font-figure`. Mono role maps to the system mono stack (interface-annotation use only). Fallbacks are metric-compatible (`Georgia`, system-ui) so swap never reflows a Claim line.
- **Scale** (`tokens/typography.ts`) — fluid `clamp()` roles: `display-xl/lg/md`, `headline`, `lede`, `body`, `body-sm`, `eyebrow`, `caption`, `figure`. Display roles carry negative tracking and tight leading; body locks ~1.66 line-height at a 65ch measure.
- **Law** — Claim lines are character-locked after approval (IR-45); the text layer caps stage text (claim ≤ one breath, stage beat ≤ 40 words — IR-12). Components encode measure and rhythm; copy discipline is enforced at content review.
- **Accessibility** — all roles are rem-based and survive 200% text zoom.

## 4. Color Token System

Two authored surfaces, one accent family (`tokens/color.ts`):

- **Paper** (`paper-50…600`) — the light, document-born default world: warm report-stock neutrals (SPEC-001 §7.1).
- **Ink** (`ink-500…950`) — warm near-blacks; `ink-950` (#120F0C) is the threshold dark of the Opening — never pure black.
- **Ember** (`ember-100…700`) — the signal accent: the neuron's glow, warm and biological. `ember-700` is the minimum for text-sized usage on paper; `ember-400/300` are glow-tier, decorative-only.

Law: body text is always ink-on-paper or paper-on-ink (contrast ≥ 12:1, exceeding WCAG AAA). Accent-on-neutral is reserved for display sizes and interactive affordances. The accent is rationed — one live ember event per frame family (PC-10, EG-7).

## 5. Spacing System

- Base rhythm: Tailwind's 4px scale, untouched.
- Layout tokens (`tokens/spacing.ts`): `gutter` (fluid page margin), `section-y` (fluid chapter air), `measure-gap` (stack rhythm inside a text column).
- No component may use arbitrary spacing values for layout; pixel-level nudges are permitted only inside glyph-critical optical adjustments with a comment.

## 6. Animation Token System

`tokens/motion.ts` — durations, legal bounds, and easings, with the SPEC-003/004 legacy numbers encoded as constants (verified unchanged):

| Token | Value | Locked bound | Source |
|---|---|---|---|
| `react` | 90ms | < 100ms reactivity | ER-3 |
| `ui` | 200ms | interface states | foundation |
| `state` | 420ms | scene state change | foundation |
| `enter` | 720ms | text/scene entrances | foundation |
| `pulse` | 900ms | resting heartbeat tempo | ER-4 |
| `dive` | 2000ms | 1800–2400ms ingress | ER-5 |
| `suspense` | 1750ms | 1500–2000ms full-motion suspension | S59/R-59 |
| `entryWrap` | 1800ms | ≤ 2000ms | T8/ER |
| `corridor` | 4500ms | 3000–6000ms return corridor | T8 |
| First paint | ≤ 1000ms | authored pulse on first paint | ER-1 |
| Express lane | 45,000–60,000ms | total | SPEC-003 |
| Full journey | 720,000–1,200,000ms | 12–20 min | SPEC-003 |

Easings: `signal-out` (`cubic-bezier(0.16,1,0.3,1)`, GSAP `expo.out` — resolves like noise snapping to signal), `resolve-in`, `standard`. Every token has both a CSS and a GSAP spelling.

## 7. Motion Architecture

- **Conductor** (`core/motion/conductor.ts`) — a singleton that enforces **one solo voice per frame (PC-10, EG-7)**. A "solo" is an authored beat; ambient motion is capped (3 concurrent). Requesting a solo while another holds it kills the old one (optional handoff window). All scene motion requests permission from the conductor; nothing performs unannounced.
- **GSAP integration** (`core/motion/gsap.ts`) — configured once, idempotently: defaults from tokens, `lagSmoothing` tuned so a dropped frame never plays a time-jump (the story must never lurch).
- **Policy** (`core/motion/motion-policy.ts` + `use-reduced-motion.ts`) — resolves an effective motion mode (`full` / `reduced`) from: system `prefers-reduced-motion`, user setting, and current lane. Policy is consulted by every animated component; CSS mirrors it via `html[data-motion]` and `prefers-reduced-motion` media queries so even no-JS renders obey it.
- **Law** — motion exists only to support meaning; every interaction must have purpose (locked). The conductor makes that physically enforceable.

## 8. Scene Architecture

- **Chapter locks** (`src/scene/chapters.ts`) — the seven locked chapters as typed data: id, order, stable slug, title, and chapter-specific locked beats (e.g., the Decision Engine's 1500–2000ms full-motion suspension). Story data lives here so no scene component ever hardcodes a story fact.
- **Stable routes** — chapter slugs are permanent promises (NR-14): `/`, `/mind`, `/grammar`, `/problem-room`, `/universe`, `/decision-engine`, `/future`.
- **Registry** (`src/scene/registry.ts`) — scenes register a manifest: chapter id, host (`css` | `canvas2d` | `webgl`), supported lanes, entrance budget. The Opening's first-light (semantic-first) layer is registered now; richer hosts register as scenes ship.
- **Lifecycle** (`src/core/three/scene-lifecycle.ts`) — every scene implements `mount / activate / deactivate / dispose`. Nothing renders that cannot also be cleanly torn down (traversal replays causally — NR-61).
- **Consequence law (new for production)** — a control ships only when its consequence works. The Opening therefore ships its first-light frame (pulse + locked Claim + identity mark) with zero dead affordances; the dive gesture arrives with its destination in the scene phase.

## 9. Three.js Architecture

- **Capability probe** (`core/three/capability.ts`) — cached, SSR-safe detection of WebGL1/2, texture ceiling, plus device signals (`deviceMemory`, `hardwareConcurrency`, `saveData`, `effectiveType`). Pure functions; no side effects at import.
- **CanvasHost** (`core/three/CanvasHost.tsx`) — the only sanctioned way to mount R3F: `frameloop="demand"` (battery respect, ER-85), DPR clamped to [1,2], high-performance power preference, alpha for compositing over authored surfaces. **Context loss is handled, not survived**: on `webglcontextlost` the host swaps to its `fallback` subtree (the stills lane) instead of a dead rectangle.
- **Loading** — canvases load via `next/dynamic` with `ssr: false`; the server never ships Three.js to the text layer.
- **Rule** — Three.js renders *meaning made spatial* (pulse, neuron, circuits, braid, engine). It is decorative-hostile by constitution.

## 10. GSAP Integration Architecture

Summarized in §7. Contract details: GSAP is imported only via `core/motion/gsap.ts` (so defaults and smoothing apply everywhere, and the dependency is swappable at one seam). Timelines of consequence register with the conductor as solos; property tweens may run ambient if they take no stage. Durations and easings arrive from `motionTokens`, never literals — a lint-visible convention (review-enforced).

## 11. State Management Architecture

Two Zustand stores, deliberately small (`core/state/`):

- **settings-store** (persisted, `project-k:settings:v1`) — consent-first: `audioConsent` (default **false** — silence is the default soundtrack, PC-26), `motionPreference` (`system` default), `laneOverride` (default null = auto). Only consent and preference persist.
- **journey-store** (persisted, partialized) — `chapterId`, `furthestOrder`, `visitedAnchors`, `depth`. Powers return-visit memory (EG-51) and the informed-portal behavior. Traversal position itself is sessional by design — a returning visitor is greeted, not resumed mid-beat.

Hydration law: persisted state applies after mount; server HTML must be semantically complete on defaults (the semantic tier is the floor, not the fallback).

## 12. Asset Pipeline

- **Fonts** — `@fontsource-variable/*` (npm) → `scripts/sync-fonts.mjs` → `src/design-system/fonts/*.woff2` (committed, hermetic) → `next/font/local`. Google-hosted fetch eliminated: builds are offline-proof and fonts are preloaded by Next on routes that use them. The script fails loudly if a required face is missing.
- **Static art** — `public/textures/` for SVG/pixel assets referenced by CSS (paper grain ships now, procedurally generated, zero binary bloat). Raster art (when it arrives) goes through the same folder with AVIF/WebP formats configured in `next.config.mjs`.
- **Verification** — the pipeline is code, not a folder of hopes: `postinstall` runs the font sync; the build reads what it synced.

## 13. Performance Strategy

- **Budgets as code** (`core/config/budgets.ts`): first paint ≤ 1000ms with authored pulse; input latency < 100ms; initial route JS ≤ 180KB gzip; route JS ceiling 350KB gzip; Lighthouse floors (A11y 100, SEO 100, BP ≥ 95, Perf ≥ 90).
- **Structural measures**: RSC-first (text ships as HTML), Three.js and GSAP never in the server bundle, per-route code splitting, `frameloop="demand"`, `lagSmoothing`, DPR clamp, image formats AVIF/WebP, `poweredByHeader` off, security headers via `headers()`, production `removeConsole` (keeps `error`/`warn`).
- **Telemetry**: Web Vitals reported from the client (`web-vitals-reporter`); beacons only to a configured endpoint, silent otherwise. No tracker ships by default — instrumentation is ours or none (metric-ethics, EG-91+).

## 14. Accessibility Strategy

- **Semantic floor first**: the entire meaning of `/` exists as server-rendered HTML; JS upgrades, never gates. A screen-reader visitor receives the composed Opening with a visual-parity description (the pulse is narrated in one sentence — parity, not absence).
- **Motion**: `prefers-reduced-motion` + user preference + lane resolve to a single motion mode; reduced mode replaces performance with presence (static ember, instant text).
- **Structure**: skip link (first focusable), landmarks (`banner`/`main`/`contentinfo`), visible `:focus-visible` ring using the functional accent, aria-pressed lane switcher (`role="group"`, labeled), `aria-hidden` on every purely decorative layer.
- **Text**: rem-based roles, 200% zoom safe, 44px minimum touch targets, `viewport-fit=cover` + safe-area padding for notched devices.
- **Enforcement**: `eslint-plugin-jsx-a11y` (via `eslint-config-next`) is error-grade; a11y warnings fail the pre-commit gate.

## 15. SEO Strategy

- Metadata API in `layout.tsx`: `metadataBase` from validated env, title template (`%s — Keshav Choudhary, Business Analyst`), description speaking the Claim family, never superlatives (IR-82).
- `robots.ts`, `sitemap.ts` (only routes that exist — a sitemap never promises an unbuilt door), `manifest.ts`, `icon.svg` (the ember pulse as favicon).
- JSON-LD `Person` schema in the root layout (name, jobTitle "Business Analyst", description = the Claim couplet).
- Canonical URLs are the chapter slugs of §8 — permanent (NR-14). Share previews inherit the couplet's voice when OG art ships with the content phase.

## 16. Mobile Adaptation Strategy

- The canonical test context is a delayed-flight phone (ER-81): fluid type/measure/gutter tokens, `min-h-svh` layouts, one-thumb reachability for all controls (ER-82 — utility chrome sits in the lower half or in-flow), 44px touch targets, mono-safe everything (ER-84), battery respect (§13), and lane coercion so an over-promising device never gets a frame it can't honor.

## 17. Component Hierarchy

```
RootLayout (server: fonts, metadata, JSON-LD)
└── Providers (client: LaneProvider, GSAP configure, WebVitalsReporter)
    └── SiteShell (skip-link, SiteHeader, <main>, SiteFooter)
        └── route pages (server) → domain components
            ├── Text primitives (claim/display/headline/lede/body/eyebrow/caption/figure)
            ├── opening/OpeningFrame → opening/Pulse (pure CSS, server-rendered)
            └── clients only where state/touch exists (LaneSwitcher, CanvasHost, Providers)
```

Client components are leaves, not trunks. Server components compose; client components sense.

## 18. Reusable Animation Architecture

- Entrance system: `animate-enter-rise` + `.enter-staggered` with token delays, `both` fill so reduced/no-JS contexts end in the composed state.
- Ambient system: the pulse pair (`pulse-core`, `pulse-halo`) as CSS keyframes — the leitmotif machine in its cheapest possible host (it runs identically in every lane, which is the point).
- Choreographed system (GSAP): conductor-authorized solos with handoff windows (§7).
- Gate classes: `.motion-gated`, `.enter-staggered` obey `html[data-motion]` and `prefers-reduced-motion` without component-level branching.

## 19. File Naming Convention

| Artifact | Convention | Example |
|---|---|---|
| React component files | PascalCase, matching export | `SiteShell.tsx`, `CanvasHost.tsx` |
| Multi-export component families | one file, named exports | `Text.tsx` exports `Text` with variants |
| Utilities / hooks / stores / tokens | kebab-case | `motion-policy.ts`, `use-reduced-motion.ts`, `journey-store.ts` |
| App Router files | Next file conventions, untouched | `layout.tsx`, `robots.ts` |
| Scripts | kebab-case `.mjs` | `sync-fonts.mjs` |
| Documents | SCREAMING_CASE | `ARCHITECTURE.md` |
| Test files (when added) | `*.test.ts(x)` beside source | — |

Enforced at review; the layout is small enough that drift is visible in a glance.

## 20. Coding Standards

- TypeScript `strict`; explicit return types on exported functions; `import type` for type-only imports; no `any` outside documented capability shims (`capability`, `gsap` flag).
- Import order is lint-law (`builtin → external → internal(@/**) → relative`, alphabetized, newline-separated), auto-fixed at commit.
- No raw values: colors, sizes, durations, easings only via tokens; the single exception requires a spec citation in a comment (§2).
- `console.error/warn/info` only (production build strips `info`); never `console.log`.
- Absolute imports via the `@/*` alias (tsconfig `paths` + bundler resolution); no `../../..` climbs.
- Commits: Conventional Commits, enforced by commitlint on `commit-msg`; staged files auto-fixed by lint-staged (`eslint --fix --max-warnings=0`, `prettier --write`) on `pre-commit`.
- The four locked spec documents are `.prettierignore`-protected: tooling never rewrites the law.

---

## Verification (this phase)

`npm run lint` (zero errors, zero warnings) · `npm run typecheck` (clean) · `npm run build` (green, static `/` + metadata routes) · hooks verified by performing the commit through them.

## What this foundation deliberately does not contain

Scene implementations for `/mind` … `/future`, the dive interaction, OG artwork, and authored chapter copy beyond the locked Claim lines — all scheduled for the scene/content SPEC phases, in that order. Their hosts, budgets, tokens, lanes, and laws are ready here.
