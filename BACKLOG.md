# PROJECT K — BACKLOG

Improvements noticed while building scenes that are **not required** by the current
scene's brief. Recorded, not pursued. (Directive: execution over speculation.)

## Recorded during SCENE-002

1. **ARCHITECTURE.md narrative refresh** — §8/§17 still describe the SPEC-005
   single-chapter composition; the journey now owns a shared canvas and unified
   camera. Update the doc's examples at the next doc touch point.
2. **Deep-link doors** — chapter slugs (`/mind`, `/grammar`, …) are the permanent
   promise (NR-14) but only `/` is live. Door routes with ceremonial entry (NR-15)
   belong to the traversal phase, after the chapters exist.
3. **Opening re-entry from the mind** — the journey is a one-way braid today
   (story-true). If a "return to the threshold" gesture is ever desired, it must be
   authored (NR-70: furniture→fiction is a threshold), not a browser-back.
4. **Invited-node cycle** — the invitation whispers resolves once a node is
   visited; a second-ring invitation (next-nearest unvisited after a dwell) could
   deepen discovery. Evaluate against attention budgets before adding.
5. **Focus-travel easing audit** — camera focus travel uses exponential damp;
   verify against the locked suspense language when the corridor transitions
   arrive (T8 family), then unify if needed.
6. **Static lane summary markers** — MindscapeStatic's disclosure triangles rely
   on the default `details` affordance minus webkit markers; confirm Windows
   high-contrast-mode keyboard semantics in the hardening pass.

## Recorded during SCENE-003

7. **Unify the projectors** — `Projector` (mind) and `GrammarProjector` (grammar)
   share ~80% of their logic (screen-anchor mapping, hover radius, scroll-reach
   gating). Unify into one projector parameterized by node lists after SCENE-004.
8. **MindscapeOverlay card → ThoughtCard** — SCENE-002's expanded thought card
   predates the extracted `ThoughtCard` (SCENE-003). Migrate mind thoughts to the
   shared dialog at the next mind touch point; delete the duplicated markup.
9. **ARCHITECTURE.md journey-era refresh** — extends SCENE-002 entry #1: §8/§17
   should document the three-world shared canvas (opening/mind/grammar), the
   grammar rail, and the projector pattern once the chapter set stabilizes.
10. **Scroll-progress lock abstraction** — the grammar "commit to proceed"
    clamp (`GRAMMAR_LOCK_G`) is authored in JourneyRoot's scroll effect. If
    SCENE-004+ needs gated progress again, generalize into the machine rather
    than stacking conditionals.

## Recorded during SCENE-004

11. **Projector unification, now three instances** — extends #7: mind, grammar,
    and universe projectors share ~85% of their frame logic (projection,
    hover radius, earned gating, anchor writes). Unify after the chapter set
    stabilizes; do not touch mid-scene.
12. **Focus-target namespacing** — `mm-*` (implicit), `st-*`, `en-*` prefixes
    are parsed by string prefix in three places (camera, fields, overlays).
    Formalize a `FocusTarget { kind, id }` type at the next multi-focus scene.
13. **Camera rails as data** — the fourth rail (universe) confirms the
    pattern; moves to a rail table (vista, deep-z, look-curve) when
    SCENE-005+ adds its rail. Logic stays put for now.
14. **Focus lifecycle on chapter handover** — handovers now release
    focusRef (blocking-edge fix in beginGrammar/beginUniverse). A formal
    "focus lease" owned by the journey machine would be cleaner.
15. **Ripple replay nudge** — `focusRef.rippleAt` double-purposes as replay
    channel. If SCENE-005+ needs more world events, promote to a typed
    world-event ref instead of growing focusRef.
