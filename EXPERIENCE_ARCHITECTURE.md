# PROJECT K

# SPEC-004 — THE EXPERIENCE ARCHITECTURE BIBLE

**Version:** 1.0
**Date:** August 2026
**Classification:** Confidential — foundational production document (pre-visual)
**Prepared by:** Experience Architecture Desk — Creative Direction · Information Architecture · Behavioral Research
**Status:** Binding structural law for all visual, motion, typography, and implementation work that follows
**Companion documents:** SPEC-001 Creative Vision (locked) · SPEC-002 Audience Intelligence (binding) · SPEC-003 Locked Story Bible (binding)

---

## 0. DOCUMENT CONTROL & CONSISTENCY CHARTER

**0.1 Position in the stack.** SPEC-001 decided *what the experience must make people feel*. SPEC-002 decided *who the people are*. SPEC-003 decided *what happens, in what emotional order, with what narrative laws*. This document decides the remaining coordinate: **how the visitor travels** — the structural engineering of movement, time, load, orientation, and exit across everything the earlier documents locked. Nothing visual is decided here. Nothing in the story is changed here. Where this document references story-beats, it cites SPEC-003; where it references audience law, it cites SPEC-002; where it references principle, it cites SPEC-001.

**0.2 The five registers.** Five rule-sets of one hundred items each close this document: **ER (Experience), NR (Navigation), SF (Story Flow), IR (Information), EG (Engagement).** Each is a distinct lens on the same machine: ER governs traversal physics, NR governs orientation and wayfinding, SF governs sequencing causality, IR governs disclosure, EG governs sustained attention. A rule lives in exactly one register; duplication across registers is a drafting defect (consistency-law X.10 from SPEC-002, applied to documentation itself).

**0.3 Accountability for time.** All durations herein are architectural contracts. They derive from the duration laws already ratified in SPEC-003 (S81–S90) and the tempo covenant (SPEC-003 §0.4, T7): this document decomposes them into stage-by-stage budgets. Where a number is an engineering target rather than research, it is labeled a budget and treated as a budget — overruns require written cause, reviewed like content defects.

---

## 1. EXPERIENCE PHILOSOPHY

### 1.1 What an Experience Architecture is

An Experience Architecture is the structural engineering of **traversal**: the deliberate design of the order in which a visitor encounters states, the pace at which states are permitted to succeed one another, the load each state is allowed to place on the visitor's mind, the doors by which states are entered, the doors by which they are left, and the guarantee that — wherever the visitor stops — what has been experienced so far constitutes a complete argument.

A film controls traversal absolutely: the projector decides the next frame, the frame-rate decides the tempo, and the audience's only freedom is departure. A website surrenders traversal almost entirely: the visitor chooses destinations from a map, and the designer's only control is the quality of the signage. **An interactive narrative sits exactly between the two, and neither discipline's architecture survives the crossing.** The Locked Story travels through states the visitor must *cause* — clicks, investigations, choices of world — so its traversal cannot be projected like a film; yet its meaning is *sequential* — fog must precede clarity, proof must precede principles, the door must come after the engine — so its traversal cannot be surrendered like a site. Someone must engineer the physics of that middle space. That engineering is this document.

A useful formalism, kept deliberately simple: the experience is a **directed graph of emotional states** (nodes are story-states; edges are permitted transitions), overlaid with **four traveling covenants** — the visitor may always know where they are, may always leave complete, may always go deeper in one gesture, and may always reach a human. The architecture's entire job is to keep the graph and the covenants true under every pattern of real human behavior: the hurried, the lost, the skeptical, the distracted, the returning, the screen-reader, the phone between flights.

### 1.2 Why this project requires one

Three properties of Project K make ad-hoc structuring fatal.

**First: the visitor is the projector.** Outside of timed transitions, nothing in the Locked Story advances on its own — the click enters, the touch reveals, the investigation proceeds at the visitor's speed. Pacing therefore emerges from *probabilistic human behavior*, not from an authored timeline. Without an architecture that designs for behavior ranges (the 8-second gatekeeper through the 20-minute diver, all ten SPEC-002 personas), the story exists only as an ideal playback no one will actually have. The Experience Architecture is the instrument that converts one authored story into ten real traversal profiles, all of them complete (SPEC-002 X.10's meta-finding, made structural here).

**Second: the argument is strictly causal, the consumption is partially free.** Proof must precede synthesis (SPEC-002 A31), the dive must precede the mind, the braid must follow the worlds — yet worlds may be visited in any order (SPEC-003 S50), chapters may be entered mid-way by forwarded link (SPEC-003 A35-cousin), and exits must complete everywhere (XR32). A graph with mandatory causal edges and free traversal edges is precisely the object an architecture exists to reconcile. Improvise it and you get the two canonical failures: *broken causality* (visitors meeting the engine before the worlds; the braid citing worlds never seen) or *false freedom* (portals that are visually free but contextually required).

**Third: the architecture is itself a carry of the brand's proof.** SPEC-001's doctrine holds that the medium performs the profession. A Business Analyst is, literally, a designer of traversals through complexity — the person who decides what stakeholders need to know first, what can wait, where the exits from a process are, and where they mustn't be. A portfolio about such a person whose own traversal is confused, gated, or meandering is a refutation; one whose traversal is almost invisibly correct is the strongest possible résumé line. The Experience Architecture is, in this sense, the second signature underneath the story's (S100 carried forward): *structure is the other deliverable*.

### 1.3 Why this is not a website architecture

The differences are categorical, and each one drives a full register later in this document.

1. **Sites are navigated; experiences are conducted.** A site answers "where do I want to go?" An experience answers a better question: "what happens next, and why am I glad it did?" Consequently: wayfinding here is dramaturgical (position in an argument), not geographical (position in a sitemap) — SPEC-001 §6.1 Doctrine-4 made law.
2. **Site exits are abandonments; experience exits must be completions.** A visitor leaving mid-page on a site has merely stopped; a visitor leaving mid-story with an incomplete picture has been *failed*. Hence the complete-at-any-border covenant (XR32) becomes the architecture's prime directive, shaping where abstractions live and how states resolve.
3. **Site success is task-completion speed; experience success is emotional arrival.** The metrics differ, so the risk models differ: a site dies of friction, an experience dies of *disbelief, disorientation, and debt-of-attention* — three different diseases, one prevention: load budgets and truth-binding (§5, §6).
4. **Sites are flat collections; stories are shaped time.** A story demands one physiological correctness above all: tension must be permitted to fall. Hence the architecture mandates decompression as structure (corridors, rest-states, the decrescendo), not as polish (SF register, §4).
5. **Sites tolerate decoration; experiences bankrupt on it.** In a conducted medium, every arbitrary element spends the visitor's trust that the *next* state is worth causing. Hence the locked doctrine — typography is the hero, motion only for meaning, every interaction with a purpose — is enforced here architecturally (PC-constraints, §11), upstream of any visual decision.

**The one-sentence philosophy, binding on every builder:**

> **The visitor is not navigating our content. The visitor is being walked through our argument, at their own speed, holding their own lantern. The architecture exists so that no matter how they walk — fast, slow, lost, skeptical, returning — the path under them never breaks, the light never lies, and wherever they stop, the argument is whole.**

---

## 2. VISITOR JOURNEY BLUEPRINT

The Locked Story's seven chapters convert into ten journey stages. A *stage* is a traversal-theoretical unit: it is defined not by its content (SPEC-003 owns content) but by **what must have become true in the visitor for the next stage to be legitimate**. Each stage below is mapped to its chapters, given its existential justification, its entry and exit states, its psychological job, its architectural dependencies, and its completion signal — the observable event that tells the system (and the story) the stage has done its work.

### STAGE 1 — OPENING FRAME · *(Chapter: Opening, frames OP.1–OP.2)*

**Why it exists:** Attention is not found; it is *switched*. The visitor arrives from web-noise carrying residual cognitive load; before any story can be told, the channel must be cleared. The Opening Frame exists to perform that clearing within one second — a single authored pulse that declares *this is not broken, this is deliberate* (SPEC-003 R-01) and begins the oldest attention-contract mammals know.

**Psychological job:** switching state: ambient distraction → authored attention (SPEC-003 MA-01).
**Entry state:** any context — desk, commute, delayed-flight phone (P08.0 canonical).
**Exit state:** visitor perceives a living, singular object and a stable pulse; frame holds nothing else.
**Architectural dependencies:** first-paint budget ≤1s (XR7); identity mark present (SPEC-003 T5); no competing motion channel (R2-law).
**Completion signal:** dwell past 3s without exit; pointer/touch shows first exploratory movement.

### STAGE 2 — CURIOSITY · *(Chapter: Opening, frames OP.3–OP.6)*

**Why it exists:** Forward motion requires fuel, and a visitor cannot be pushed — only attracted. This stage opens the three ignition loops in strict sequence (α: what is it; β: is it aware of me; γ: what's inside) while the two Claim lines deliver the thesis. It exists because the story's entire energy model is question-driven; if no loop opens by second ~20, there is no journey, only a dark page that pulsed.

**Psychological job:** converting attention into attraction; micro-commitment priming (C21, C27).
**Entry state:** stable pulse; authored dark.
**Exit state:** two Claim lines absorbed (visitor-paced, S3); reactivity discovered (S4, <100ms); the cell legible as a door.
**Architectural dependencies:** one loop per beat (R-06); Express lamp lit at ~6s (S8); instance level: identity known, thesis heard, escape visible — the "trust minimum" for the coming ask.
**Completion signal:** the click (or tap/Enter) that triggers the dive.

### STAGE 3 — DISCOVERY · *(Chapter: Ch1 Inside My Mind)*

**Why it exists:** Agency must be *proven* before effort is requested. The Dive (agency-act) lands in a world where every touch answers — teaching the visitor, viscerally, that their gestures have consequences here. This stage exists because the grammar of the entire experience (touch → true answer) is the substrate of everything later: the Room's investigation is impossible if the visitor doubts the world's responsiveness; the Worlds' portals are un-choosable if the visitor doubts the world's honesty.

**Psychological job:** agency-imprinting and orientation (MA-03, MA-04); loci-mapping of the mind-space.
**Entry state:** arrival-chamber bearings (R-15).
**Exit state:** legend understood (S12); at least one pathway-whisper experienced; cardinal circuits felt as gravity (S14); the skeptic's promise-of-proof silhouette given (R-21).
**Architectural dependencies:** truth-binding (S11); one-voice rule (S16); 3-item legend within 15s (R-14); Express + chapter marker permanent (R-21).
**Completion signal:** free exploration freely initiated (first self-directed move); — passively: 90s dwell with ≥2 touches.

### STAGE 4 — UNDERSTANDING · *(Chapter: Ch2 Business Thinking Evolution)*

**Why it exists:** Everything after this stage *compounds*: the Room's investigation is legible as the four-stage chain enacted; the Worlds read as the chain in the wild; the Engine assembles the chain into mechanism. A schema installed here is bought once and spent everywhere; a schema missed here taxes every later chapter. This stage exists to install the four-slot grammar (observation→insight→decision→impact) concretely, before any abstraction is ever asked of it (S21–S25).

**Psychological job:** schema installation with dual coding (case + chain); rehearsal-emotion of the macro-arc (SPEC-003 §2-E).
**Entry state:** grammar-legibility from Ch1; sentiment: playful agency.
**Exit state:** the four terms *owned* — visitor can predict stage on contact with Ch3's fog (test: no labels needed by chapter's end); the your-turn posture accepted.
**Architectural dependencies:** one running case (R-23); zero-chronology (R-27); visitor-act per stage (R-26); vocabulary freeze (S26).
**Completion signal:** the empty first slot accepted — visitor proceeds toward the Room without instruction.

### STAGE 5 — TRUST · *(Traversal stage spanning the Ch2→Ch3 crossing and the Room's first third)*

**Why it exists — the architecture's keystone.** The Problem Room is the story's first *effort-ask*: minutes of investigation, not seconds of watching. Visitors do not labor for experiences they distrust. This stage exists because **before this point, exits may outnumber entries; after it, investment compounds** — it is the point of no return in the effort economy, and the story may not ask for work until four deposits have visibly cleared: identity (who is asking), thesis (why), grammar (what the work will feel like), and floor-evidence (abstract-level proof available without labor). The stage is deliberately *not* a chapter; it is a structural gate implied by Ch2's end and Ch3's opening — the memo of everything the story has already demonstrated, presented as permission: *what you've touched so far was true; the room ahead is worth your hands.*

**Psychological job:** effort-permission — converting curiosity into licensed investment (C7/C44: action feels like the lower-risk option).
**Entry state:** schema installed; sentiment: confident anticipation.
**Exit state:** the visitor crosses into the Room *willingly* (no coercion-modal anywhere — S93); skeptic channels satisfied: Express route visible, identity verifiable, proof silhouetted.
**Architectural dependencies:** all verification surfaces complete *before* the ask (A1–A5 abstract apparatus reachable from this border); no depth-gating (SR: nothing essential ever sits behind effort); anti-pressure law (XR20).
**Completion signal:** Room entry; second-strongest: Solved-in-60s lane taken *knowingly* (an informed lane-choice is also trust — the visitor trusts the room enough to watch it solved).

### STAGE 6 — BUSINESS THINKING · *(Chapter: Ch3 Problem Room)*

**Why it exists:** The thesis made flesh. Every prior stage said analysis is *experiential*; this one proves it by making the visitor practice it. It exists because persuasion-architecture peaks where role-transfer peaks (C24+C7): a visitor who has *done* clarity-work inside the fiction cannot afterward evaluate its craftsman as a spectator.

**Psychological job:** role-transfer; competence-glow; the reframe lesson (MA-06, MA-07).
**Entry state:** effort-permission granted (Stage 5).
**Exit state:** root found (or Solved-in-60s complete); memo assembled (R-12); sentiment: quiet pride plus proof-hunger — *"I've felt it; now show me it was real"* (hand-off engineered at T6).
**Architectural dependencies:** loop-geometry (S32); earned-insight economy (R-32); hint-governor (S37); squint-safe data (R-33); no game-chrome (N83).
**Completion signal:** memo generation; lane-equivalent: 60s tour completion.

### STAGE 7 — CASE STUDIES · *(Chapter: Ch4 Business Universe)*

**Why it exists:** Performed competence requires the witness record. The Room generated *felt* belief; belief converts to *trust* only under evidence (C16/C17). This stage exists to carry the full honesty-stack (real figures, scars, splits, anonymization, witnesses — A12–A18) inside three altitude-priced worlds, letting every SPEC-002 audience self-select its proof (Conflict-3 resolution, SPEC-002 X.3).

**Psychological job:** skeptical-hunger satisfaction; altitude recognition; integrity-verdict formation (P-trust sequence steps 3–4).
**Entry state:** proof-hunger from Stage 6.
**Exit state:** ≥1 world completed fully (ideally the braid completes on completion-count); residue-loop charged (*"what do these share?"*); sentiment: corroborated respect.
**Architectural dependencies:** three-portal curation with informed labels (S41–S42); curation grammar invariance (S43); honesty-stage laws (S45–S46, S49); corridors mandatory (S48).
**Completion signal:** braid activation (SPEC-003 T8); lane-equivalent: three abstracts read.

### STAGE 8 — DECISION FRAMEWORK · *(Chapter: Ch5 Decision Engine)*

**Why it exists:** Admiration must be convertible into understanding. The engine assembles what was felt and seen into mechanism — the craft's epistemology made visible (T3-resolution completing A31's law: principles *synthesized after* evidence). It exists to close the last doubt-type available to senior evaluators: *"is the judgment luck, or is it machinery?"*

**Psychological job:** gestalt closure; mastery-trust; the verdict-silence peak (MA-10).
**Entry state:** braid; residue question live.
**Exit state:** mechanism-loop fully closed (S59); after-caveat absorbed (R-63); sentiment: settled respect — the pre-calm for the decrescendo.
**Architectural dependencies:** causal staging (S51); two-price law (S54); stillness budget protected (R-59); express-engine gate (R-64).
**Completion signal:** idle-down phase reached (E.9); the heartbeat leitmotif recognized.

### STAGE 9 — FUTURE VISION · *(Chapter: Ch6, frames FU.1–FU.6)*

**Why it exists:** Endings must redirect story-energy into the visitor's future or the energy dissipates at the fade. The ladder (scope-altitude, T2) converts the protagonist's arc into a horizon the visitor can imagine *joining*; the door converts that imagination into a standing question about *their own* next decision. This stage exists to move the story's one open loop from the fiction into the visitor's life (MA-11), deliberately and ethically.

**Psychological job:** projection-completion (C28); aspiration without pressure.
**Entry state:** settled respect; world at rest.
**Exit state:** destination-line absorbed (S65); door approached; Ω-loop accepted as real (S67).
**Architectural dependencies:** ladder-as-breath pacing (S62); scope-label law (S63); stillness holds (S65, S68).
**Completion signal:** door-approach behavior (proximity dwell), or deliberate by-pass to the real door — both valid completions.

### STAGE 10 — ENDING · *(Chapter: Ch6, frames FU.7–FU.11)*

**Why it exists:** The memory of everything is written here (peak-end, C2). The fading, the signature, and the calm real door exist to land the name inside peace, transfer the loop into life, and provide certainty about the next step with zero pressure (R20-era laws, S70). An ending that grabs burns the destination-emotion of the entire design (X.6.4: safety); an ending that evaporates wastes the accumulated conviction. This stage exists because it is the narrow channel through which feeling becomes action-by-dignity.

**Psychological job:** identity-binding at calm; action de-risking (C44).
**Entry state:** Ω-loop live; stillness.
**Exit state:** the visitor departs complete (or approaches the real door with certainty about what happens next).
**Architectural dependencies:** empty-of-asks law (S70); signature hold ≥3s (S69); real-door adjacency (T6-resolution; A37–A40).
**Completion signal:** voluntary departure, or contact-initiation, or archive-dive — all recorded only as aggregate, never as surveillance (N86/XR35).

---


---

## 3. CHAPTER ARCHITECTURE

*The eleven-axis specification of every chapter. Time budgets are Cine-Lane ranges with the Express equivalent; density ratings follow the scale defined in §5 (1–5 per channel). Exit Condition is the architectural test the chapter must pass before the next may be offered: it is the machine-level answer to "how do we know this chapter happened?"*

### CHAPTER 0 — THE OPENING

**Objective.** Switch the visitor from web-noise into authored attention; deliver identity, thesis, and a single inviting door inside one attention-hold; complete the ignition loops α-β-γ.
**Emotional Goal.** Tension → intimacy → readiness. The visitor should feel *courted*, never captured: everything responds, nothing grabs.
**Visitor Questions.** "What is this? (α) Is it aware of me? (β) Whose is it and why should I care? (δ) What's inside? (ζ) Can I leave if I want?" — the last is never voiced but always asked.
**Questions Answered.** What it is (a specific thought-shaped door); that it reacts (instant, <100ms); who and what this is about (identity mark + two-line Claim, T5/S-frame); that leaving is free (Express lamp, S8).
**Questions Created.** "What's inside a mind?" (ζ — the engine-loop of the whole journey), plus the soft δ-residue: "who speaks like this?"
**Estimated Time.** Naive path 12–20s; sanctioned play extends to ~40s; Express entry-point available from ~6s. Hard ceiling 45s: beyond it the Opening has become a movement and starved the symphony (N42).
**Information Density.** 1/5 — one object, ≤2 text lines, one mark. Everything else is withheld by design (IR: first-screen maximum = identity + one idea).
**Interaction Density.** 1/5 — exactly one learnable act (approach/commit); reactivity free-play is consequence-free.
**Transition Goal.** Spectator → participant; commitment cashed at the membrane, with softness (T2: decelerating ingress, 1.8–2.4s).
**Memory Goal.** MA-01 (pulse-in-dark, sensory imprint), MA-02 (the line-pair, retell-unit), MA-03 (the click you caused, self-authored).
**Exit Condition.** Either the dive is triggered (primary), or the visitor has received the complete Express-grade case-thus-far — identity, plain title, thesis, and the promise of what lies inside (XR32 at frame-level). An exit before both is the architecture's failure, not the visitor's.

### CHAPTER 1 — INSIDE MY MIND

**Objective.** Prove agency (touch → true answer), install the three-item world-legend, map the mind-space enough that the four cardinal circuits are felt as un-named gravity.
**Emotional Goal.** Wonder dosed with warmth: awe at M.2, then steadily down-lit into hospitable intelligence — the world must feel *inhabited*, not projected.
**Visitor Questions.** "Where am I? What am I looking at? What can I touch? Does anything answer? Where does this lead? Can I trust what's written here?"
**Questions Answered.** Orientation (chamber → legend, R-14/R-15); touch-semantics (one whisper = one true inference, S11/S13); the sound of this mind's voice (warm, plainlines, R-19); what the exploration costs (nothing — free tempo, S18); the promise of structure (circuits as gravity, S14) and of proof (skeptic-silhouette, R-21).
**Questions Created.** "What do the circuits *mean*?" (macro-loop into Ch2); "what is the far silhouette?" (long-anchor into Ch5, M.7); "why does every path know a reason?" — truth-binding detected, subtly.
**Estimated Time.** Guided phase (chamber→legend→first whisper) ~30–45s; free exploration 30–90s at visitor tempo; pullback 4–6s. Express: the chapter's truth in ~8s (identity + premise + one sampled whisper + promise of proof).
**Information Density.** 2/5 — legend (3 items), whispers as encountered (one at a time, S16). Never more than one line of authored text on stage.
**Interaction Density.** 3/5 — the touch-permissive chapter by design; cooldowns (R-18) keep it reading-grade, not slot-machine.
**Transition Goal.** Wandering → grammar-readiness; the visitor's own route resolving into a constellation (T4: map-becomes-legend), so Ch2's schema feels *discovered*, not taught (IKEA-encoded, R-20).
**Memory Goal.** MA-04 (arrival-place, loci-anchor), secondary: first-whisper (voice signature).
**Exit Condition.** Legend comprehension is certain (first whisper completed or semantic-equivalent consumed), the four circuits have been *seen* as gravity (dwell on at least two), and the pullback has completed for this visitor — or the Express abstract of Ch1 has been delivered whole.

### CHAPTER 2 — BUSINESS THINKING EVOLUTION

**Objective.** Install the four-slot schema (observation→insight→decision→impact) concretely through one running case, with the visitor enacting each transformation once (S21–S26); open the your-turn posture toward the Room.
**Emotional Goal.** Dawning comprehension into confidence: the micro-arc fog→click→cost→resolution rehearsed at small scale so the macro-arc lands pre-practiced.
**Visitor Questions.** "So how does this mind actually work, mechanically? What happens between seeing and deciding? What will I be *doing* in this story? When does it stop being a tour?"
**Questions Answered.** The mechanism's four moves, named and enacted (S-III laws); what agency means going forward (transformation-by-trigger, R-26); that cost is real here (the two-price precedent set at G.3, seeding Ch5's S54); the plain-vocabulary of the craft (PR5-safe register).
**Questions Created.** "Could I do this?" (G.6 — loop deliberately left open as Ch3's entrance-ticket); minor: "does this hold in messier reality?" (seeds Ch4's record).
**Estimated Time.** 60–90s Cine (four 3-beat waltzes, asymmetric phrasing 1-2-3-1); Express: the four-liner in ~6s.
**Information Density.** 2/5 — one case's facts + four terms; vocabulary frozen on first use (S26); zero chronology-furniture (R-27).
**Interaction Density.** 2/5 — one act per stage, rhythmic; between acts the stage holds still for naming.
**Transition Goal.** Watch-me → your-turn: momentum-delivery to the Room's manifesting arch (T5), no menus, no chrome — approach alone opens the weather-door (S29).
**Memory Goal.** MA-05 (the stealable framework), secondary: the G.3 cost-naming (sets up MA-10's price-honesty).
**Exit Condition.** Prediction-test passed implicitly: the visitor anticipates the Room's invitation (movement toward the arch or its semantic equivalent); the four terms have appeared and been used at least once each; Express-complete delivered otherwise.

### CHAPTER 3 — PROBLEM ROOM

**Objective.** Deliver role-transfer at maximum fidelity: the visitor performs the four-stage craft inside a safe fiction (fog → questions → convergence → root → memo), with the highest agency and the strictest honesty the story allows.
**Emotional Goal.** Unease → agency-rise → discovery-delight → reframe-jolt → relief → quiet pride — the full exhale-arc (SPEC-001 §3.3) contained in one playable place.
**Visitor Questions.** "What am I supposed to do here? Why are these numbers falling? What do I ask first? Am I getting this right? What if I pick the wrong door? When will I know I've got it?"
**Questions Answered.** Purpose (investigate — the staff-voices and symptoms say so without an instruction modal, S31); direction (question-instrumentation reshapes fog, R-38); fairness (every path pays, S33); stuckness-handling (scene-native governor, S37); completion-shape (the memo, R-12 — the four-line abstract instinct *rehearsed*: A41-prophecy).
**Questions Created.** During play: the three symptom-loops then the root-loop (S32). At exit: the proof-hunger loop — *"I've done it in fiction; where did it happen for real?"* (T6's engineered inheritance) — and for forensic visitors: "is this how *his* rooms actually go?" (sets Ch4's audit demand).
**Estimated Time.** Core path 5–8 min; bounded design-range 4–10 min (S83 Act-II budget); Solved-in-60s lane complete in ~60s (R-35); idle-governor arrests stagnation at 45s intervals.
**Information Density.** 3/5 — the heaviest *working* chapter (symptoms, clues, staff-lines, root), but always ≤1 primary artifact on stage; reading is interactive-length by law (S75: glanceable).
**Interaction Density.** 4/5 — the story's agency-peak (questioning, exploring, connecting); physical verbs only — no metadata chores (EG: effort must touch meaning).
**Transition Goal.** Pride → proof-hunger: the cleared room condenses its light into the bridge-line and the portal-constellation rises (T6), fiction-weather dissolving into record-starfield.
**Memory Goal.** MA-06 (self-efficacy: *I solved it*), MA-07 (the reframe lesson, transferable), plus the R.10 silence-clap as Act-II peak.
**Exit Condition.** Root correctly surfaced by the visitor (or received via the Solved lane), memo generated, and the bridge-line delivered to a willing visitor (T6's no-auto-traverse law). For forensic-traffic completing only the lane: root + memo + one clue-chain segment must still be true in the tour.

### CHAPTER 4 — BUSINESS UNIVERSE

**Objective.** Present the audited record: three altitude-priced worlds (org-scale / velocity / politics) carrying the full honesty stack (figures, scars, splits, witnesses, anonymization — A12–A18), with informed portal-choice and the cross-chapter residue-loop that feeds the Engine.
**Emotional Goal.** Corroborated respect: gravitas (W1) → tempo-respect (W2) → human warmth (W3) — rising legibility ending on people, deliberately setting Ch5's mechanism on a human aftertaste.
**Visitor Questions.** "Was any of that real? What altitude does he operate at? Can I check the numbers? Who vouches? What went wrong, ever? Which world is *mine*?"
**Questions Answered.** Proof at every altitude coordinate (portal labels, S42); auditability (provenance one gesture, S49); vouch-altitudes (three-altitude chorus, S46); the failure-mode (W3's scar + system-fix, S45); velocity credibility (W2's clocks + anti-sell outcome, R-47); the not-a-fluke answer (three different weathers, one spine).
**Questions Created.** The residue-loop: *"what do these worlds share?"* (S47 — charged at every exit-whisper, answered only by the braid); for senior tiers: "can I forward this?" (forwardability question — portal abstracts exist for paste, A6).
**Estimated Time.** 2–4 min per world Cine; 6–12 min full universe including corridors (3–6s each, S48) and portal contemplation; Express path: ~25s per world (abstract + honored figure + scar-line, R-53); full-universe express ~75s.
**Information Density.** 4/5 at portal-level metadata kept glanceable; 3/5 inside worlds (narrative + figures + witnesses), staged one-idea-per-view; depth layer reachable one gesture (A9-law of the record).
**Interaction Density.** 2/5 — traversal + reveal acts inside the invariant grammar (S43: learn once, dialected ≤20% per world); the point is the record, not the dexterity.
**Transition Goal.** Plural-proof → singular-mechanism: the braid (T8) — completion-count-triggered, threads rising from *visited* worlds only (T8's honesty clause), residue-loop cashed visually.
**Memory Goal.** MA-08 (per-world signature moments), MA-09 (the scar + system-fix), secondary: portal-constellation ("each project was its own planet").
**Exit Condition.** At least one world completed with its turn witnessed (or all three abstracts consumed in Express); the braid has activated and been traversed — or, for partial-visitors, the residue-line has still been delivered honestly from the worlds seen (T8's partial-braid correctness).

### CHAPTER 5 — DECISION ENGINE

**Objective.** Assemble the experienced + witnessed material into visible mechanism (Stakeholders → Root Cause → Trade-offs → KPIs → Decision → Impact — causal staging R-55), closing the mechanism-loop completely and landing the story's global peak at the verdict-silence.
**Emotional Goal.** Awe-of-mechanism resolving into mastery-trust; the conscience-hush at the cost-pause; then the largest stillness in the story, then warmth.
**Visitor Questions.** "Was that judgment or luck? What does he optimize when they conflict? What does a decision cost him? Does the mechanism hold, after?"
**Questions Answered.** Machine, not luck (assembly-from-callbacks, R-56); optimization-conscience (both prices named, S54); the measure of judgment (one honored KPI w/ provenance, S57); aftermath honesty (one caveat, R-63); the heartbeat revealed as engine-idle (S58 — leitmotif closure).
**Questions Created.** Almost none by design — Ch5 closes loops. The only permitted residue: the after-caveat's honesty-seed ("what surprises remain ahead?", which Ch6's horizon addresses structurally) and the idle's invitation to rest (cognitive decompression pre-ending).
**Estimated Time.** 3–5 min Cine (assembly 2–3m, cost-pause + verdict + impact 1–2m, idle-down 30–60s; within S83 Act-III budget); Express: the mechanism one-page abstract ~15s (R-64).
**Information Density.** 3/5 — high-value, low-volume: six parts, two prices, one verdict; no part arrives cold (R-56); reading is line-scale, staged.
**Interaction Density.** 1/5 — the chapter runs mostly as witnessed assembly; deliberate agency-suppression before the verdict (attention focused for the stillness, R-59).
**Transition Goal.** Mechanism → peace: idle-down into the pre-calm (T9), the decrescendo's launching ramp; *the same light, at rest* (S61).
**Memory Goal.** MA-10 (braid + verdict-silence — the story's apex anchor), secondary: the price-pause (trust-artifact with retell-legs: *"he showed what it cost"*).
**Exit Condition.** Mechanism-loop closed (all six parts docked and the verdict witnessed — or the Express mechanism consumed), after-caveat delivered, idle-down reached. The story may not proceed to Future on an open mechanism-loop (SF law).

### CHAPTER 6 — FUTURE

**Objective.** Deliver the decrescendo and the transfer: calm as continuity, the scope-ladder (T2 governance), the destination-line, the unopened door (Ω), the final line's transfer into the visitor's life, the signature, and the real door.
**Emotional Goal.** Exhale → ascent-hope → humility-hush → threshold-poise → warmth-bond → safety-to-act — ending, per X.6.4, at *settled conviction*, never arousal.
**Visitor Questions.** "Is it over? Where does this go from here? What is the door? Can I open it? What am I supposed to do now? Who was that, again — say the name clearly."
**Questions Answered.** Altitude-arc (ladder, scope-labeled S63); why titles aren't the point (the destination-line, S65); what the door is (a real-world avenue, felt — warmth without yield, R-68); what happens now (the final line transfers Ω); who that was (signature, T5 curtain); how to actually act (the real door's certainty, A37–A40).
**Questions Created.** Exactly one, by design: **Ω — "what's behind my own next decision?"** The story's only deliberate permanent loop — answered in life, closed nowhere on screen (S67/N91).
**Estimated Time.** 2–3 min including holds (S65 ≥1.5s, S68 ≥2s, fade ≈2.5s, signature ≥3s) plus rest; Express/direct route to the real door always lit (T7-family).
**Information Density.** 1/5 — the emptiest chapter by design: scope-labels, two held lines, a name, and calm furniture. Empty-of-asks law (S70): the final 10s contain zero requests.
**Interaction Density.** 1/5 — approach-warmth on the door; nothing else performs. After the signature, furniture-grade interaction only (contact, archive).
**Transition Goal.** Fiction → life: the fade hands the visitor back to their own context with the loop transferred and the name bound to peace (T11); the real door waits as adjacent reality.
**Memory Goal.** MA-11 (the door that never opens — distinctiveness peak), MA-12 (the couplet + signature — identity-bind at peak-calm, C2/C49).
**Exit Condition.** The couplet has been displayed to full hold; the signature has been displayed ≥3s; contact + archive are present and functional with certainty-text (A38–A40); no ask has occurred inside the fiction's final ten seconds. At that point the architecture's last obligation is silence.

---


---

## 4. EXPERIENCE TIMELINE

*The full pacing architecture: what happens, in what order, for how long, and — the part most documents omit — why the number is the number. Budgets follow SPEC-003 S83's act totals; the design-point journey targets the median invested visitor; express and dwell tolerances cover the SPEC-002 audience range.*

### 4.1 The Master Timeline (Cine-Lane, design-point traversal)

| # | Segment | Budget | Cumulative | Pacing rationale |
|---|---|---|---|---|
| 1 | Beginning: authored dark + ignition (OP.1–OP.6) | 12–20s (ceiling 45s) | 20s | First-impression economics: the thin-slice window (SPEC-002 C3) and the gatekeeper's first-verdict window (~20–40s, P01.5) both close here; the Claim and identity must land *inside* them. Beyond 45s the overture consumes the symphony's ticket-price (N42). |
| 2 | The Dive + arrival chamber (OP.7–OP.8, ingress 1.8–2.4s) | 6–8s | 28s | The membrane deserves weight but not drag: under ~1.8s the crossing feels cheap, over ~2.4s it reads as loading (S10); the 3–4s chamber resets bearings so the world's scale lands as awe, not vertigo (R-15). |
| 3 | Ch1 guided phase: vista keystroke → legend → first whisper | 30–45s | ~1:05 | Comprehension-budgeting: legend ≤15s (R-14) is the load-shaped interval before awe-decay (~20–30s habituation, C19) sets in; the first whisper must reward touch inside the same minute to close the agency-contract while the dive's commitment still glows. |
| 4 | Ch1 free exploration | 30–90s (visitor tempo) | ~2:30 | The investment is front-loaded by design: early autonomy (S18) teaches the touch-language that Ch3 will tax later; capping free exploration ~90s keeps Act I inside its 3–5 min envelope without policing the visitor — the pull of the circuits does the limiting. |
| 5 | Pullback-to-map (T4) | 4–6s | — | A meaning-transition, priced against attention-leak law: long enough for the route-to-constellation resolution to register as *their* authorship (R-20), short enough to stay a transition not a scene (S88). |
| 6 | Ch2 grammar: four-stage waltz | 60–90s | ~4:00 | Four asymmetric phrases (1-2-3-1, R-25): teaching-repetition requires ~15–22s per stage for the witness-act-name triplet; under 60s the schema isn't installed (Stage-4 rationale), over 90s the abstraction starts charging interest. |
| 7 | Your-turn bridge (T5) | 3–5s | — | Momentum-transition: the fastest legal chapter-crossing besides corridors — any longer and anticipation bleeds into questioning ("what do I do now?"); manifests destination, never menu (S29). |
| 8 | Ch3 Problem Room | 4–10 min (design-point ~6:30) | ~10:30 | The effort-peak is deliberately mid-journey: far enough in that trust (Stage 5) is banked, far enough from the end that completion-pride can hand proof-hunger to Ch4. Inside: 30s symptom-fog (recognition must land before action), free-play core ~3–7m, convergence+memo ~1–2m. The governor intervenes at 45s idle-intervals (S37) so the 10m ceiling is behavioral, not policed. |
| 9 | T6 bridge + portal constellation | 15–30s (incl. choice) | — | Choice is a state, not a transit: portal contemplation is the visitor's first *executive* act in the record; informed labels (S42) make the 15–30s decision-window feel like power, not homework. |
| 10 | Ch4 worlds: W1 (2–4m) → corridor (3–6s) → W2 (2–4m) → corridor → W3 (2–4m) | 6–12m total (point ~9:00) | ~20:00 | World's 2–4m derives from the three-act micro-arc at narrative tempo (fog ~30–45s, build ~60–90s, turn+aftermath ~45–60s); corridors are the load-reset that makes three consecutive proofs physiologically possible (S48). Order free; emotional sequence fixed by content design (gravitas/tempo/warmth effects survive reordering because each world is self-contained, S50). |
| 11 | Braid into Ch5 + engine assembly (E.1–E.5) | 2–3m | — | Reunion-compression: callbacks are capped ≤1s each (R-56) — recognition is cheap; *assembly* is the content, and gets the minutes. Acceleration-then-cost-pause rhythm (R-60) lands the conscience-beat inside the fatigue-safe window. |
| 12 | Verdict-silence + impact + idle-down (E.6–E.9) | 1.5–2.5m | ~23:30–25:00 | The global peak gets the story's longest protected stillness (1.5–2s motion-suspension as the single most budget-defended asset, R-59); impact-bloom and after-caveat complete the mechanism-loop; idle-down 30–60s is the deliberate down-shift that makes Ch6's calm *physically true* before text claims it (T9). |
| 13 | Ch6 calm → ladder → destination-line → door | 60–90s | — | Ladder-as-breath: seven rungs at ~4–7s each decelerating (S62) — the rhythm must read as horizon, not escalator (T2-shield, R-65); the two holds (≥1.5s, ≥2s) are stillness-budget, non-negotiable. |
| 14 | Final line → fade (≈2.5s) → signature (≥3s) → real door | 20–30s + rest | ~24–26 min max | The decrescendo's last negotiation: long enough for transfer (FU.7's loop-handoff), short enough that gratitude-furniture arrives while warmth is still warm (C2's end-writing); the signature's ≥3s is the identity-bind window (MA-12). |
| | **TOTAL CINE PATH** | **~12–20 min (design-point ~14:00)** | | Inside S83's Act budgets (I: 3–5m · II: 6–10m · III: 3–5m); the design-point median lands where SPEC-002's deep-dive audiences (P03–P07) actually live. |

### 4.2 The Express Timeline (complete case, 45–60s)

| Segment | Budget | Content |
|---|---|---|
| Opening capsule | ~8s | Identity + plain title + two-line Claim + one honored figure |
| Ch1–Ch2 capsule | ~10s | Premise (how he thinks) + four-stage chain as four lines |
| Ch3 capsule (Solved-in-60s frame) | ~10s | Symptom-triple → root → memo, annotated |
| Ch4 capsule | ~15s | Three portal-abstracts (altitude + stake + scar-line each) |
| Ch5 capsule | ~10s | Mechanism one-pager: six parts, two prices, one verdict |
| Ch6 capsule | ~5s | Scope-ladder summary + the couplet + signature |
| Real door | immediate | Contact + certainty text |

*The Express path is not a sizzle-reel of the Cine path; it is the same argument at spec-writing resolution (XR2 doctrinal). Its segment budgets sum ≤58s with borders everywhere back to Cine — because the Express Lane's real product is permission to stay longer.*

### 4.3 Dwell tolerances (behavioral variance, by design)

The architecture accepts these durations as *healthy*, not as anomalies: skimmer-complete (60–90s: abstracts + one world peek), gatekeeper-fast (3–5m: capsules + one world narrative), manager-invested (12–18m: near-full Cine with one deep world), diver-complete (20–30m: all four modalities touched across ≥2 sessions — the story explicitly welcomes session-splitting via session-free re-entry, XR33/S95). Each tolerance-band exits *complete* — the per-band completion guarantee is the Timeline's reason for existing.

### 4.4 Pacing doctrine stated once

**Budgets derive from three clocks, never from taste:** the audience's first-decision clocks (P01/P08/P10 windows — fast content must land inside them), the physiology clocks (awe-decay ~20–30s, hold-limit ~2s of silence, corridor-recovery 3–6s), and the effort-economy clock (labor permitted only after Stage-5 deposits). When a beat is worth breaking a clock — the verdict-silence breaks the motion-clock — one and only one clock may be broken per act, and the break is registered as a silence-clap ration (S89).

---

## 5. COGNITIVE LOAD ANALYSIS

*Load is the architecture's scarce currency. Model: five channels per chapter, rated 1–5 (5 = heaviest legal). **Load laws:** (L1) no frame may run two channels at 5; (L2) a channel at 4–5 forces all others ≤2; (L3) every chapter ends in a load-trough before its transition; (L4) effort (Interaction ≥4) is legal only after Stage 5; (L5) any breach is a build-defect, not a style debate.*

### Opening — load: featherweight by force of law

| Channel | Load | Analysis |
|---|---|---|
| Information | 1 | One object, two lines, one mark — first-screen maximum by IR rule. |
| Interaction | 1 | One learnable act; play is consequence-free. |
| Movement | 2 | Pulse + glow + reactive answer; single-channel (P3). |
| Reading | 1 | ≤ 14 words total (the Claim pair). |
| Thinking | 2 | One question at a time (α, then β, then ζ — serialized curiosity). |

*Overload prevention:* the entire chapter is overload prevention — it exists to *lower* the residual load the visitor arrived with (Stage-1 rationale: channel-clearing).

### Ch1 Inside My Mind — load: exploratory but fenced

| Channel | Load | Analysis |
|---|---|---|
| Information | 2 | Legend (3 items, ≤15 words each) + one whisper at a time. |
| Interaction | 3 | Many touchable, cooldown-gated (R-18); no failure-states exist. |
| Movement | 3 | Breathing world + whispers; one solo voice at a time (S16). |
| Reading | 2 | Whisper-lines ≤ a breath (S75). |
| Thinking | 2 | One micro-question per whisper; macro ("what shape?") simmering. |

*Overload prevention:* the three-item legend is the ceiling — additional furniture is defect-class (S12); vista dosing (S15) prevents stimulation-flood; chamber stillness (R-15) clears dive-residue before any choice.

### Ch2 Grammar — load: taught but sequential

| Channel | Load | Analysis |
|---|---|---|
| Information | 2 | One case + four terms (frozen vocabulary, S26). |
| Interaction | 2 | One act per stage; rhythmically predictable. |
| Movement | 2 | State-transformations of a single material — no scene-changes. |
| Reading | 2 | Beat-texts + labels only. |
| Thinking | 3 | The comprehension chapter: schema-formation is work, staged one slot at a time (serialized loops, §6: never parallel). |

*Overload prevention:* the 1-2-3-1 phrasing concentrates load in the Decision stage (where tension justifies it) and gives the Impact stage as rest; abstraction is banned without its concrete case (S21) — the single most effective load-reducer known to instructional design.

### Ch3 Problem Room — load: the legal maximum

| Channel | Load | Analysis |
|---|---|---|
| Information | 4 | Symptoms, staff-lines, clue artifacts, root, memo — the story's densest working set, but staged one primary artifact per view. |
| Interaction | 4 | Agency-peak: questioning, exploring, connecting — court-required after Stage 5 (L4). |
| Movement | 2 | Weather-shifts restrained so motion never competes with thought (R-39: weather communicates state, not spectacle). |
| Reading | 3 | Clue-documents glanceable-by-law (S75); staff-voices are single lines. |
| Thinking | 5 | Hypothesis management: this is where the visitor *thinks —* and the architecture's entire load-history (chapters 0–2 at those light ratings) exists to leave capacity for exactly this. |

*Overload prevention:* loop-geometry caps open loops at the sanctioned three (S32); the fog *visualizes* working memory externally (the visitor's own investigation map is the cognitive off-load); the 45s-interval hint-governor arrests rumination-spirals (S37); every path pays, eliminating the load of regret-management (S33); Solved-in-60s always one gesture away (R-35).

### Ch4 Business Universe — load: rich records, resting grammar

| Channel | Load | Analysis |
|---|---|---|
| Information | 4 (portal metadata must stay glance-level) | Figures, scars, splits, witnesses — evidence-grade density, structured by abstracts (A4–A6). |
| Interaction | 2 | Invariant grammar (S43); agency spent on choice and depth-gesture, not on dexterity. |
| Movement | 2–3 | World-weathers partially animated; turn-beats staged; corridors at 1. |
| Reading | 3 | Abstracts (4 lines) standard; narratives line-staged; provenance on demand. |
| Thinking | 3 | Audit-mode for forensic visitors (P02/P04/P08-class); residue-question simmering background-ly (1). |

*Overload prevention:* three-world cap (S41) plus corridors (S48) = the proof-treadmill cannot form; abstracts carry the skimmer so depth never *must* be processed; witnesses ≤1 line each (S75); one honored figure per world (S49) keeps evaluative arithmetic single-threaded.

### Ch5 Decision Engine — load: assembly with a silent center

| Channel | Load | Analysis |
|---|---|---|
| Information | 3 | Six parts, staged causally (R-55); callbacks pre-known (R-56) so novelty-load ≈ 0. |
| Interaction | 1 | Deliberately suppressed — attention is being focused for the stillness (R-59). |
| Movement | 3→0 | Assembly motion decays toward the verdict's total suspension. |
| Reading | 2 | Line-scale; prices and verdict in numerals-only. |
| Thinking | 4 | Integration work: the visitor is *assembling meaning* — and the chapter spends its novelty-budget to pay for it (every part is a reunion, not an introduction). |

*Overload prevention:* callback-architecture is the great economizer — Ch5's entire comprehension-budget is recycled from already-encoded memory (Ch2 schema, Ch3 felt, Ch4 witnessed); that is why the mechanism lands as *recognition* rather than instruction. The cost-pause is a designed trough inside the build-up (R-60), not a pause after overload.

### Ch6 Future — load: the empty cathedral

| Channel | Load | Analysis |
|---|---|---|
| Information | 1 | Scope-labels + two held lines + a name. |
| Interaction | 1 | Door-warmth only. |
| Movement | 1 | Breath-ladder, glow, fade. |
| Reading | 1 | Two lines, one card. |
| Thinking | 2 | One open loop (Ω) carried *out of* the experience by design — load deliberately injected into life, not the interface. |

*Overload prevention:* the empty-of-asks discipline (S70) is a load-law: the final ten seconds make zero demands, so the peak-end window writes memory unimpeded (C2). The chapter exists as the journey's largest trough — the trough is the feature.

### 5.1 System-level load reserves

Three standing reservoirs protect the whole graph: **(R1) the corridor network** (T7 — load-reset without content), **(R2) the Express Lane as pressure-release** (any load-moment admits outright relief, XR8-class), **(R3) the brevity-of-text law** (S75/§11 PC-set: reading-load is the architecture's steepest tax because it is the only channel the visitor must pay in full, serially, with attention). Typography-hero status (locked doctrine) is load-strategy, not fashion: the cheapest channel is the well-set word, so meaning is assigned to it *by default*, sparing all other channels.

---


---

## 6. CURIOSITY ARCHITECTURE

*The complete registry of every question the experience opens, the mechanism that reveals it, the payoff that closes it, and the engineering that prevents curiosity from ever accidentally reaching zero. Loop governance laws: **(K1) serialization** — at most one unexplained loop per frame outside the sanctioned zones; **(K2) sanctioned parallelism** — the Room alone may run three (its geometry visibly promises convergence, S32); **(K3) closure-guarantee** — every loop has a designed closure and a designed closure-path for every lane; **(K4) anti-starvation** — between any two closures, at most one rest-state may pass before a new loop opens (specified per zone below); **(K5) the single exception** — the ending's Ω is the only loop with no on-screen closure, and it is locked, deliberate, and life-bound (S67).*

### 6.1 The Loop Registry (macro and meso loops)

| ID | Tier | Opens at | Question held | Reveal mechanism | Payoff | Closes at | Closure guarantee |
|---|---|---|---|---|---|---|---|
| L-α | micro | OP.1 | "Is something alive?" | Pulse regularizes; neuron resolves | Sensory focus; authored-intent confirmed | OP.2 (~3s) | Timed beats (S2) — fires without input |
| L-β | micro | OP.3 | "What is it, precisely?" | Cell detail + door-quality resolution | Object legibility | OP.4–OP.5 (~4–6s) | Frame sequence |
| L-γ | meso | OP.3 (Claim 1) | "Problems — whose?" | Claim line 2 | Guide-casting; self-map (C12/C28) | OP.4 (hold) | Visitor-paced, never gated (S3) |
| L-δ | meso | OP.4 | "Who is speaking?" | Quiet identity mark (T5) | Identity satisfaction | OP.4 concurrent, sealed by Ch6 signature (MA-12 echo) | IR-first law (§8) |
| L-ε | micro | first pointer move | "Is it aware of me?" | <100ms reactivity answer | Agency-delight | OP.5 | Latency law (S4) |
| L-ζ | macro | OP.6 | "What's inside a mind?" | The dive (visitor's act) | World-arrival (MA-04) | M.2 (Ch1 vista) | One clear act (S5) |
| L-M1 | meso | M.3 | "Is this just pretty — or does it say things?" | First pathway-whisper answers truly | Truth-binding detected (S11) | M.4 first touch | Legend teaches touch (S12) |
| L-M2 | macro | M.6 | "What do the four circuits mean?" | Ch2's staged naming | Grammar delivered (MA-05) | G.5 | Serial curriculum law (S21–S26) |
| L-M3 | long | M.7 | "What is the far silhouette?" | Distance-instances across chapters; braid arrival | Awe-recognition ("it was the engine, all along") | E.1 (Ch5) | Foreshadow-closure ledger (SF-20s) |
| L-G1 | micro×4 | each Ch2 stage | "What does an X become?" | Visitor-triggered transformation | Micro-eureka; schema slots | within each stage (15–22s) | One act per stage (R-26) |
| L-G2 | meso | G.6 | "Could I do this?" | The Room's offer (empty slot) | Attempt-permission | R.10–R.12 (solved + memo) | Root always findable (S33–S37) |
| L-R1–R3 | meso×3 (sanctioned) | R.2 | "Why revenue? Why retention? Why churn?" | Clue-chains, question-driven fog-kills | Discovery-delights; elimination-wins | R.6–R.9 (staggered) | Geometry promises convergence (S32) |
| L-RROOT | macro | R.9 | "What connects all of this?" | Root-cause reveal after convergence | Reframe-jolt (MA-07); lesson-transfer | R.10 (silence-clap) | Hint-governor insures stuckness (S37) |
| L-RCODA | micro | R.10 | "And what do we do about it?" | Decision + memo | Completeness; craft-template received | R.12 | Memo always assembles (R-41) |
| L-T6 | meso | R.12 | "Did it ever happen for real?" | Bridge-line + constellation | Proof-hunger satisfies as record | W1-entry onward | T6 no-auto law; portals always present |
| L-W1 meso | meso | W1-entry | "How does this room-full-of-power find one answer?" | Told fog→turn→shift | Gravitas-turn (W1.2) + honored figure | W1.3–W1.4 | Abstract-first so closure never depends on depth (A4–A6) |
| L-W2 | meso | W2-entry | "What did clarity-in-a-hurry cost or save?" | Clock-stamps to the anti-sell turn | Startled respect (W2.2) | W2.3–W2.4 | Same closure architecture |
| L-W3 | meso | W3-entry | "What did the human knot take to untie?" | Conflict-voices → scar → alignment | Respect-deepening (W3.2) | W3.3–W3.4 | Scar staged, never footnoted (S45) |
| L-BRAID | macro | each world-exit whisper | "What do these worlds share?" | The braid (threads from visited worlds) | Gestalt-charge (S47, T8) | E.1 | T8 partial-braid honesty |
| L-ENGINE | macro | E.1 | "How does it all fit?" | Causal assembly with callbacks | Recognition-awe; mechanism closed | E.8 | R-55 causal staging + R-56 callbacks |
| L-VERDICT | micro-apex | E.6 | "Will it commit?" | Silence-stroke sequence | Global peak (MA-10) | E.7 | Protected stillness (R-59) |
| L-AFTER | micro | E.8 | "Did it hold?" | Impact + one caveat | Candor-seal (R-63) | E.9 | Caveat always present |
| L-LADDER | micro | FU.2 | "How high does this go? Why?" | Rungs with scope-labels | Horizon-legibility | FU.3 + FU.4 (destination line) | T2 governance (S63/S65) |
| L-Ω | omega | FU.5 | "What's behind the door?" | **None on screen, by lock** | Transfer into the visitor's own life (the final line) | In life only — via the real door (T11 furniture) | Sanctioned permanence (S67/N91); the couplet tells the visitor where the closure lives |

### 6.2 Curiosity-pressure profile (the anti-flatline graph)

```
pressure
 9 ┤                                                █ (E.6–7)
 8 ┤      ▄                              ███(R.10)
 7 ┤  ▄  ███        ▄ ██  ▄▄▄▄(Room)    ▄█▀▀▀█    ██▀▀██     ██(door)
 6 ┤ █▀█     ▄█████▀ ▀▀▀██    ▀▀▀██████▀     ▀▀███    ▀▀████▀▀
 5 ┤▀                                                     ▀▀▀
 4 ┤ ▀ (rest states at ≥3 are legal; rest states at 0 are defects except post-verdict)
   └───┬────┬─────┬────────┬─────┬─────┬─────┬────┬──
      IGN. MIND   GRAMMAR   ROOM   W1   W2    W3   ENG. FUTURE
```

Reading the profile: curiosity never touches zero except in the two designed stillnesses — the verdict's aftermath (E.9, where pressure *must* drain to permit the calm) and the post-signature rest (where Ω is deliberately parked at 2, suspended, belonging to the visitor now). Every other trough sits ≥3, fed by the nearest open meso-loop. The K4 anti-starvation rule is enforced structurally: each chapter's exit-whisper (S47-family) opens the next loop *before* the current one fully dies — closure and ignition overlap by one beat, always.

### 6.3 Curiosity-failure interlocks

Three designed interlocks prevent the architectures of boredom: **(i) the starvation-alarm:** any build-state where pressure-model falls to 0 outside the two sanctioned stillnesses fails QA; **(ii) the clutter-alarm:** >1 unexplained loop outside Ch3 fails S82 review (mystery-budget); **(iii) the orphan-loop ledger (SF register formalizes):** every macro/meso loop in §6.1's registry is a tracked object — a build that opens a loop not in this registry (or closes a registry-loop without its payoff) is defective regardless of how beautiful the beat is.

---

## 7. MEMORY ARCHITECTURE

*The encoding map: what the visitor will recall at 72 hours, at a quarter, and at retelling — and the structural engineering that makes each memory write. Memory laws: **(M1) one peak per act, protected** (S89); **(M2) silence is a memory material** — stillness isolates the adjacent beat; **(M3) callbacks are spaced repetition** — the braid and the engine are the story's built-in recall schedule; **(M4) anchors must be one-sentence portable** (S99); **(M5) self-authored beats outrank witnessed beats** — agency recruits ownership (C7).*

### 7.1 Primary Memory Moments (the retelling set)

| ID | Moment | Chapter/frame | Memory class | Why it will be remembered — the encoding machinery |
|---|---|---|---|---|
| P-1 | The line-pair: "Every business has problems." / "I enjoy understanding them." | OP.3–OP.4 | Verbal/conceptual | Antithesis compression (problem↔enjoyment) + self-reference (the first line is *the visitor's* content, C12) + frozen-wording repetition across retellings (S80) = the story's most portable object. It survives because it is short, true, and says *why*, not *what* (SPEC-003 MA-02). |
| P-2 | The click that lets you in | OP.6–OP.7 | Agency (self-authored) | Self-generated acts encode ~2× witnessed ones (generation effect; aligned with C7): the visitor didn't watch the door open — they opened it. Muscle-participation adds motor memory to episodic memory. (MA-03.) |
| P-3 | "I solved a business myself." | R.4–R.12 | Self-efficacy | The strongest valence-slot in autobiographical memory is one's own competence; the Room puts the visitor's name in the hero-slot and the architect's name in the floor-plan (attribution transfer, C42). The memo at R.12 gives the episode a *document-object* — encapsulated, retrievable. (MA-06.) |
| P-4 | The reframe: the dashboard's crisis wasn't the disease | R.10 | Lesson/surprise | Surprise-tagging (C23) fused with recognition (it's true of *their* world, X.6.1) and transferability — lessons get repeated because repeating them makes the teller useful (D36). The silence-clap isolation (M2-law) carves the moment clean of competing stimuli. (MA-07.) |
| P-5 | The braid + the verdict-silence | E.1, E.6–E.7 | Gestalt + sensory | The assembly closes three separately-encoded contexts at once (W1/W2/W3 + Room) — closure of multi-context loops is the strongest single encoding event available (Gestalt-coherence reward). The 1.5–2s motion-suspension is the only total-stillness in the journey: distinctiveness-by-absence (C23). (MA-10.) |
| P-6 | The door that never opens | FU.5–FU.6 | Symbol/distinctiveness | Category-unique object (every other digital door opens — N91's sanctity) + open-loop persistence (Ω keeps re-firing in the visitor's real decisions after the visit — the only anchor that *re-encodes itself in life*). (MA-11.) |
| P-7 | The couplet + signature: "The next decision is still waiting." — Keshav Choudhary, Business Analyst | FU.7–FU.8 | Identity-bind | Peak-end writing (C2): the final line transfers loop-ownership (C12-max), and the name lands inside the engineered calm — name binds to destination-emotion (C49). Last-frame advantage: zero interference after encoding (no subsequent content to overwrite it). (MA-12.) |

### 7.2 Secondary Memory Moments (the texture set)

| ID | Moment | Why it endures |
|---|---|---|
| Se-1 | Pulse-in-darkness (OP.1) | Sensory imprint beneath language; distinctiveness-by-quiet (MA-01). |
| Se-2 | Arrival-inside-a-mind (M.2) | Place-memory (loci) — the visit is recalled as *somewhere*, not *somewhat* (MA-04). |
| Se-3 | First pathway-whisper (M.4) | Voice-discovery: the mind spoke *sense* — the truth-binding contract felt, pre-verbally (S11/S17). |
| Se-4 | The four-link chain (G.5) | Stealable grammar: retained because it's reusable (P04.13's theft-design, SPEC-003 MA-05). |
| Se-5 | Per-world signatures (W-turns ×3) | Distinct weathers = distinct memory-cages (context-dependent encoding; MA-08). |
| Se-6 | The scar + system-fix (W3.2) | Pratfall-trust (C18) + candor rarity (its scarcity in the genre guarantees standout, MA-09). |
| Se-7 | The non-build verdict (W2.2) | Category-inversion: a portfolio whose win is restraint — oddity encodes (A22). |
| Se-8 | The heartbeat revealed as engine-idle (E.9) | Leitmotif-resolution: a question the visitor didn't know they'd been asking gets answered — retroactive meaning-laying is a known encoding amplifier. |

### 7.3 Silent Moments (memory carved by subtraction)

| ID | Silence | Function — why *absence* encodes |
|---|---|---|
| Si-1 | Authored dark before first text (OP.1–OP.2) | Prepares the encoding channel: novelty-without-demand; the limbic "moment before" that makes the first words land pre-attended. |
| Si-2 | The cost-pause at trade-offs (E.4) | Conscience-isolation: breaking the assembly-acceleration puts the two prices alone on stage — honesty given a silent room is remembered as character, not data (S53/R-60). |
| Si-3 | The verdict-suspension (E.6, 1.5–2s) | The apex-isolator (above); attention forced total; the following stroke gets single-stimulus clarity. |
| Si-4 | Corridor-rests (between worlds) | Consolidation windows: memory-writes need quiet aftermath (spacing machinery, M3-law); corridors are the journey's built-in "sleep" between encoding episodes. |
| Si-5 | Destination-line hold (FU.4, ≥1.5s) | Weight-granting: stillness signals "this sentence matters" pre-cognitively — the lock-shield (T2) gets its gravitas from the hush, not the words. |
| Si-6 | Post-signature rest (FU.8–FU.10) | Interference-shield: nothing after the name, so the name is the last thing encoded (P-7's mechanism). |

### 7.4 Emotional Peaks (the sanctioned three, plus the ignition spike)

Rationed by S89: **Ignition (OP.7, dive)** — commitment-peak; **Act II peak (R.10, reframe)** — insight-peak; **World-turn peak (W2.2, anti-sell)** — conviction-peak (unusual: a peak of *coherence*, not danger); **Global peak (E.6–E.7, verdict-stroke)** — the story's maximum. Peak-spacing law: no two peaks within one chapter of each other; every peak preceded by a tension-build and followed by a consolidated trough (intensity-curve contract, §4/SPEC-003 §6).

### 7.5 Reflection Moments (where meaning consolidates)

**RF-1: The memo (R.12)** — self-generated case compressed to four lines: reflection through *authorship*. **RF-2: The braid-approach (W3.4→T8)** — pre-closure anticipation: the visitor *guesses* the mechanism before it's shown (self-explanation effect: confirming one's own hypothesis encodes deeper than receiving it). **RF-3: The idle-down (E.9)** — interpretive rest: recognition ("the pulse was this all along") arrives unhurried. **RF-4: The calm (FU.1)** — the world's rest-state invites the visitor to survey the whole path retrospectively — the built-in *reviewing position*. **RF-5: The real door (FU.9)** — the practical reflection: converting the visit into an actual next step while unhurried (A38–A40's certainty furniture). Each reflection moment is **interaction-light and thinking-heavy by design** — the five moments in the journey where Thinking-load deliberately exceeds all other channels (cf. §5's channel law L2, invoked in reverse: here the architecture *buys* thinking with stillness).

---


---

## 8. INFORMATION ARCHITECTURE

*The disclosure order — what may appear first, second, third, and last — and the reasoning that fixes each position. In a conducted medium, position is argument (SPEC-001 §6.1 Doctrine-2). The hierarchy below is absolute at the frame-level: an element's lawful position is the earliest frame where every fact the visitor needs in order to correctly receive that element is already present.*

**FIRST — identity, life, thesis, door (in that breath).**
1. **The pulse** (proof of authored intent): because comprehension cannot start before the "is this broken?" question dies in its first second (T0/S1).
2. **The identity mark** (name + plain title, quiet): because gatekeeper-price-of-truth is seconds (A2/XR1 law), and because every subsequent fact gets *filed* under the identity that arrived before it — arrive late and the entire experience files under "anonymous art project."
3. **One doorway-object**: because choice-architecture fails before it begins if the first screen asks two things (Hick at maximum disorientation, C20).
4. **Claim line one** ("Every business has problems."): because thesis precedes everything — it is the context that makes all later content belong; and line-one-first because recognition must precede relief.

**SECOND — relationship, grammar, promise.**
5. **Claim line two** ("I enjoy understanding them."): because the guide must be cast before the journey is entered (C28): this casts him; only after this does the door mean "his mind," not "an installation."
6. **Reactivity + the single learnable act**: because agency-proof must arrive before any request (Stage-3 law: the world answers before it asks).
7. **The three-item legend** (what's a node, what's a path, what touching does): because grammar before content — anything seen before its legend is decoration; anything seen after is meaning.
8. **The promise of structure and proof** (circuits-as-gravity, skeptic-silhouette): because the skeptical audiences require a map of the evidence before they will walk toward it (R-21/P-tier law).

**THIRD — mechanism, labor, record.**
9. **The four-stage chain, enacted** — because it is the comprehension-infrastructure that all later meaning spends: schema before stories (Stage-4 rationale).
10. **The effort-invitation (the Room)** — only now: because labor requested before identity+thesis+grammar+proof-promise is betrayal of the effort-economy (Stage-5 keystone).
11. **The record (three worlds) with abstracts before narrative, narrative before evidence**: because belief must pay ascending prices — glance, story, audit — each layer ratifying the previous (A4/A6/A9 ladder).
12. **Honesty-furniture late-in-each-world but stage-positioned** (scars, splits, provenance): because candor lands as strength only after competence is established (C18's condition: pratfall works *only* on demonstrated competence).

**LAST — mechanism-reveal, horizon, transfer, name, door.**
13. **The engine** — synthesis, by law, after all evidence (A31/SPEC-003 T3): mechanism-reveal earlier would posture instead of prove.
14. **The ladder + "not a title"** — horizon only after trust, because aspiration reads as arrogance pre-proof and as earned-scope post-proof (T2).
15. **The door + the final line** — the last open loop must be the last thing unresolved: it converts the story's remaining energy into the visitor's agenda (Ω doctrine).
16. **The signature** — the name lands in the engineered calm, final, interference-free (P-7/C2).
17. **The real door: contact + certainty + archive** — the practical layer arrives after the fiction not to hide it but to *honor* it: pressure inside the story would have refuted the calm (S70); certainty offered after the story is respect completed (T6/T11).

*Why this order cannot permute:* every element in FIRST is a *permission* for SECOND; every element in SECOND is *comprehension-infrastructure* for THIRD; THIRD is the *price-body* of the argument; LAST is the *inheritance ceremony*, and inheritance declared before the estate exists is theater. The IR register (below) converts this order into enforceable rule-form across all scales.

---

## 9. VISITOR FLOW RULES

*Five registers × 100. Each rule is architectural law with its justification; numbering is citation-grade. Shorthand used in citations: E# = ER-# (experience rules), per the decade headers below. Cross-references: S#/N# (SPEC-003), A#/B#/C#/XR# (SPEC-002), F#/R# (SPEC-001), §-internal.*

### REGISTER ER — 100 EXPERIENCE RULES

#### E1–E10: Threshold physics

**ER-1.** First paint must contain the authored pulse within 1s on mid-tier mobile — because unauthored darkness is indistinguishable from failure for the fastest audiences (T0/XR7).
**ER-2.** No state may render two simultaneous primary motions — because attention is serial and the architecture's loudness is rationed (SPEC-001 P0; S-adjacent).
**ER-3.** Reactivity latency must measure <100ms at every touchpoint — because presence is defined by instantaneity; delay converts "alive" into "recorded" (S4).
**ER-4.** The pulse rhythm is the tempo-reference of the whole journey (sub-second rest rate) — because one metronome anchors the emotional score from ignition to idle (leitmotif-machine, S58).
**ER-5.** The dive (ingress) must decelerate to arrival in 1.8–2.4s — because under-budget is cheap and over-budget is loading (S10).
**ER-6.** The first learnable act must succeed on first attempt for 100% of input modes — because ignition-momentum is unrecoverable: a failed first act is a failed story (agency-contract, Stage 3).
**ER-7.** The identity mark must be legible at the smallest legal viewport — because identity-in-seconds is a gatekeeper-law (A2) and small screens are the executive default (P08.0).
**ER-8.** The first frame that contains text must contain the complete thought — because truncated claims read as either error or withholding (S-lineage: sentence-budget ≤ a breath).
**ER-9.** Idle during ignition (≤6s) may prompt, never grab — because consent must precede immersion (S93): prompting respects; grabbing abducts.
**ER-10.** The black of the opening and the black of the fade must be the same black — because the bookend is semantic (MA-symmetry): matched darkness is what makes the journey a closed, portable object.

#### E11–E20: The two lanes and their covenant

**ER-11.** Every state must name its lane-parity deliverable (what Express shows here) before build-sign-off — because parity decided late is parity never (S94).
**ER-12.** The Express lamp ignites by second ~6 and persists unblinking — because its visibility is the pressure-release that *keeps* the Cine visitor by choice (R-08).
**ER-13.** Lane-switching must be state-preserving (same beat, other resolution) — because punished lane-switching teaches visitors to fear the lanes (two-contract law, XR44).
**ER-14.** The Express Lane is complete at 45–60s with borders back to Cine at every segment — because its product is permission-to-stay (§4.2), which only works if returning is free.
**ER-15.** The Cine lane must never upsell the Express lane, and the Express lane must never apologize — because mutual respect between lanes is the brand's time-civility made visible (T7 covenant).
**ER-16.** Any segment reachable in one lane must be reachable in the other — because lane-gated content creates second-class visitors, and every audience maps to both lanes across a week (P-hopping).
**ER-17.** Still-lane (reduced motion) ships identical text, identical order, identical holds (as durations of presence, not motion) — because narrative is owed, not animation (XR22).
**ER-18.** Semantic-lane (keyboard/reader) traversal must follow the same causal order as Cine — because flattened order would break proof-before-principle causality for the audiences who most deserve it intact (XR14).
**ER-19.** Sound-lane is opt-in per journey with state-remembered toggle — because audio-consent is gesture-given at the click and revocable without penalty (S9).
**ER-20.** All four tellings must pass the same exit-condition tests per chapter — because different completeness standards per lane = different stories (X.10).

#### E21–E30: State, continuity and session physics

**ER-21.** Every state must be beautiful at rest before any motion is added — because the stillness clause (SPEC-001 §7.4) is insurance against device, network, motion-preference, and time.
**ER-22.** Browser back/forward must behave as history, not as trap — because fighting the browser is fighting the visitor's oldest reflex (XR8).
**ER-23.** Refresh at any point must restore that point or the nearest chapter border — because refresh is a fact of mobile life, and punishing it punishes the executive context (P08.0).
**ER-24.** Deep-links must open with orientation-context (whose story, where in the arc) — because forwarded links arrive at P06/P07 desks mid-argument (A35/NR-standards).
**ER-25.** Session-splitting must be graceful: return visits land at chapter doors, never in media res without a map — because senior audiences graze across days (dwell-tolerance, §4.3), and re-immersion without re-orientation is vertigo.
**ER-26.** The world must never simulate knowledge of the visitor (names, roles, "welcome back") — because dossier-theater is surveillance in costume (S95): the world reacts to gestures, not to records.
**ER-27.** Visitor choices in the Room are session-local — because "we remember how you solved it" is a database, not a memory, and creepy precision retroactively poisons the calm (N89).
**ER-28.** Time zones, clocks, dates in content must be absolute ("2024"), never relative ("last year") — because relative time rots (freshness-protocol A50), and figures testify (A12).
**ER-29.** Every hold (stillness budget) must tolerate interruption leniently (hold skips on act; resumes on idle) — because holds are offered silence, not imposed silence (S65-family: offered, always).
**ER-30.** If any subsystem fails, the state must degrade to the still-lane of that state, silently — because visible failure inside a *clarity performance* is a brand-refutation at demonstration-speed (XR6-family).

#### E31–E40: Sensory doctrine

**ER-31.** Typography carries meaning by default; enhancement carries exception — because typography-is-hero is locked doctrine and the cheapest load-channel is the well-set word (§5.1 R3).
**ER-32.** Numerals use the numeral-policy staging everywhere, including fiction — because figures testify under one policy across fiction and record (PR25/S35: register-consistency).
**ER-33.** Sound-state may never carry meaning that silence lacks — because the primary art is silence (T4): every informative beat requires a visual twin.
**ER-34.** No looped ambience may cycle shorter than ~30s without variation — because perceptible loops fatigue faster than silence (N83-adjacent; habituation C19).
**ER-35.** Light must behave as meaning (stakes down → dim; truth landing → clear), never as effect — because rational light is the world's honesty-instrument (N69).
**ER-36.** Grain, texture, materiality (if present) must be constant across lanes — because material-consistency is part of the one-brand register (X.10), at the cheapest priority after meaning (SPEC-001 §7.5).
**ER-37.** The world must visibly react to the visitor's *current* gesture, not to scripted sequences — because fake-reactivity, once detected, retroactively falsifies every prior delight (N18).
**ER-38.** Color-logic must stay semantic within constraints set by identity-work — because the signal-color's rarity-ledger is architectural: its appearance-rate is budgeted here (SPEC-001 R8) so future visuals cannot quietly inflate it.
**ER-39.** Vibration/haptics, if any, must be opt-in and meaning-only (verdict-stroke) — because unwarned haptics in professional contexts are startling, and startle is the register's opposite (N100-adjacent).
**ER-40.** Nothing may ever flash at seizure-risk rates (WCAG) — because safety outranks every aesthetic ambition, unconditionally.

#### E41–E50: Autonomy and consent

**ER-41.** Every act must have one predictable consequence — because surprise-behavior teaches caution, and cautious visitors stop touching the world (S92).
**ER-42.** Every irreversible-feeling act must be reversible in fact (abort dive, leave room, close world) — because agency is felt only when exits are real (C21).
**ER-43.** No choice may be time-limited — because urgency-theater is the exact anti-register of the brand (XR20): decisions here breathe.
**ER-44.** The visitor may re-ask, re-touch, re-read everything infinitely — because access without metered forgiveness is how adults explore (and how P-tier audits).
**ER-45.** Confirmations ("are you sure?") are banned outside data-destruction — because other uses are guilt-machinery (B50-class).
**ER-46.** Approach-warmth is the only permitted response to door-proximity — because the door's holiness is its non-yield (R-68): hints, cracks, glow-teases all void the Ω-license.
**ER-47.** Free exploration windows must be un-metered in the mind-world — because the mind invites wandering by premise (S18); a clock there would be a lie about the premise.
**ER-48.** Choice of world-order must stay free with honest partial-resolution — because braid-on-completion-count is the truth of the device (T8); fake-order fakes the braid.
**ER-49.** Any "skip"-like control must be labeled by destination, not by dismissal — because "Skip intro" frames story as obstruction; "Go to the room" frames it as geography (R-08/NR).
**ER-50.** Consent for anything (audio, haptics, analytics) must be re-educable in one gesture from anywhere — because consent-buried is consent-denied (N86-family).

#### E51–E60: Effort economy

**ER-51.** No effort may be requested before Stage 5's four deposits clear — because unlicensed labor is the genre's silent bounce-killer (keystone law).
**ER-52.** Effort must always touch meaning — because chore-interaction (drag for its own sake) is load without membership (§5, L4's corollary).
**ER-53.** The payoff of any effort must exceed its cost by visible margin — because effort-economy is arithmetic the visitor performs instantly and unconsciously (C-fairness).
**ER-54.** Elimination-paths in the Room must pay as loudly as discovery-paths — because punishing wrongness teaches risk-aversion, and risk-averse investigators never reach roots (S33).
**ER-55.** The hint-governor's three tiers must stay scene-native to the last — because a hint wearing UI-chrome shatters the fiction at the visitor's most fragile moment (S37).
**ER-56.** Solved-in-60s must be offered as citizenship, never as surrender — because lane-shaming converts a respect-device into a stigma-device (R-35/R-36).
**ER-57.** Opportunity-cost must be legible at every labor-gate ("about 4 minutes") — because time-transparency is the smallest recurring honesty (S90).
**ER-58.** The Room's data must reward squinting — because forensic-verification is a *pleasure* for the P02/P04-class visitor, and its absence is how fiction lies (R-33).
**ER-59.** Progress must be ambient (weather, ledger), never numeric — because numeric progress converts thinking into grinding (R-39).
**ER-60.** Replay/re-investigation must keep its full value (no "already-solved" graying) — because mastery-rehearsal is a gift offered to the returning visitor (N44-adjacent; XR33).

#### E61–E70: Emotional safety of traversal

**ER-61.** Every disorientation must resolve inside its second-budget (≤2s) — because un-owned vertigo is read as instability of the whole system (S82).
**ER-62.** Horror-register frequencies/designs are banned even as texture — because the heartbeat's channel is intimacy, not menace (N58).
**ER-63.** The cost-pause and verdict-silence must be protected from all ambient motion — because isolation is the encoding-mechanism of the two biggest honesty-beats (Si-2/Si-3).
**ER-64.** No jump-scares, no sudden spatial teleports — because certainty-of-body is travel-safety in immersive space (Stage-3 covenant).
**ER-65.** The scar's staging must never ambush the unprepared — because candor needs consent-adjacent framing ("what went wrong here" labeled at world entry, S42-portal honesty).
**ER-66.** Corridors may not contain any new information — because rest-states that load are no longer rest-states (Si-4).
**ER-67.** The calm of Ch6 must arrive without a scene-cut — because calm-as-continuity is the theological point (S61): the light didn't change; it resolved.
**ER-68.** Every peak must be followed by a trough before any new build — because stacked peaks convert awe into exhaustion (E-curve contract, §4).
**ER-69.** The visitor's worst moment (stuck, lost, dead-end-less, idle-confused) must still feel accompanied — because low-point hospitality is the brand's character under test (S97-adjacent).
**ER-70.** Humiliation is a defect-class: no state may make the visitor feel slow, stupid, or late — because the visitor is the protagonist (SPEC-001 §4.2), and stories do not mock their heroes.

#### E71–E80: Physics consistency

**ER-71.** Arrival-easing is always decelerating; reaction-easing is always instant — because tempo-grammar encodes respect: we take time *for* you, never *from* you (S87).
**ER-72.** Physics-vocabulary is frozen journey-wide (one mass, one friction, one gravity) — because mixed physics read as mixed authorship (X.10 applied kinetically).
**ER-73.** Micro-interactions must live inside their state's budget (no runaway cascades) — because decorative-play billed against the next chapter's attention.
**ER-74.** The braid may only animate threads from *actually-visited* worlds — because the braid's meaning is completion-truth (T8) (rendered novelty here = lying).
**ER-75.** Hold-skips must skip to the *end-state* of the hold, never beyond it — because skipped silence must not steal the beat the silence was protecting (S65/S68 machinery).
**ER-76.** Parallel-process states (loading under the hood) must render as calm, never as progress-furniture — because visible patching is backstage leaked onstage (E30-family).
**ER-77.** The rest-rate of the pulse must be identical in ignition and in idle (E.9) — because recognizing the final idle *as* the first pulse is the leitmotif-payoff (Se-8), and that requires identity, not resemblance.
**ER-78.** Depth-gesture must be exactly one, everywhere (same act, same result-class) — because multiple depth-gestures tax recall per-state (A9's one-gesture law).
**ER-79.** Chapter markers must be felt, not displayed, until asked — because ambient furniture in the fiction is theater-instrument visible in the proscenium (S97-adjacent: present when needed).
**ER-80.** World-weather may never animate faster than the visitor's last motion tempo — because weather outrunning the visitor is the world saying "hurry," and the world may never say hurry (P3-law applied to pacing).

#### E81–E90: Contexts of the real world

**ER-81.** Full functionality on a 6" touchscreen — because the canonical test-context is the delayed-flight phone (P08.0).
**ER-82.** Operation with one thumb, one hand, no precision-gestures — because steady hands are a privilege of context, not a requirement of citizens (accessibility-covenant §3.2).
**ER-83.** Meaning-complete in noisy light (sunlight) and in dark rooms without glare-violence — because environments vary and the authored dark must not blind the bed-reader (E-context-law).
**ER-84.** No spatial-audio reliance; mono-safe mixes — because contexts (one earbud on a train) are real listeners too (E33-family).
**ER-85.** Battery-respect: sustained heavy render must ease into idle at stillness — because a story that drains a dying phone ends itself mid-sentence (practical respect).
**ER-86.** Print/PDF of the abstract layer must remain beautiful — because gatekeepers attach and file (XR28): the printer is part of the funnel of trust.
**ER-87.** Offline-first for the abstract and contact layer where feasible — because tunnels exist, and contact-capability in a tunnel is brand-care made technical (pragmatic courtesy).
**ER-88.** Cross-script (non-Latin) expansion must not break the couplet's rhythm — because translations are human-localized (N87) and the couplet is a timed-object, not a string.
**ER-89.** Calendar-native honors: the response-promise counts *working* days with time-zone clarity — because certainty-text must be true, not optimistic (A40/XR29).
**ER-90.** Context-collapse test: the story must still function when reduced to text + one image per chapter — because context-collapse is how forwarders and AI-summarizers will actually transmit it (M4-cousin).

#### E91–E100: Experience QA gates

**ER-91.** Every frame must pass the "in-one-sentence" test: what is the visitor feeling/doing here — because unfocused frames are load with no address (C6).
**ER-92.** Every state must pass "show it silent, still, small" — because parity-law is frame-law, not chapter-law (S94/E17).
**ER-93.** Every transition must justify itself as meaning within one line — because transitions are the bloodstream, not the scenery (S88).
**ER-94.** The complete-graph walk must be simulated for all ten SPEC-002 personas before visual sign-off — because personas are the QA army whose cost is zero (R16-adjacent).
**ER-95.** All loop-registry objects must be tracked in the build with closure-status visible — because orphan-loops are the architecture's deadliest silent defect (§6.3 iii).
**ER-96.** First-five-second comprehension test with fresh eyes at every build — because authors know the story; fresh eyes don't; only fresh eyes vote (C3-adjacent).
**ER-97.** The "one act broke" drill: simulate any single interaction failing and verify graceful degradation — because partial failure is the *expected* production condition (E30).
**ER-98.** Time-budget audits per build against §4's contracts; overruns logged with cause — because time-inflation is how cinematic dreams become bounce statistics (S81/S83).
**ER-99.** Diff-reviews between lanes for content-parity weekly — because lane-drift is silent apartheid (E16/X-10).
**ER-100.** Above all: the visitor must always be able to answer three questions — where am I, what just happened, what can I do — because those three answers ARE the experience architecture (§1.1's covenant #1).

---


### REGISTER NR — 100 NAVIGATION RULES

#### N1–N10: Wayfinding presence

**NR-1.** Position-in-the-argument must be *felt* continuously without chrome — because felt orientation is dramaturgy; displayed orientation is furniture (SPEC-001 §6.1 Doctrine-4; E79).
**NR-2.** Any explicit wayfinding must disclose on ask and vanish on release — because ambient controls inside fiction violate the proscenium (E79-codified).
**NR-3.** The chapter-marker set is: pulse-stage (before), mind, grammar, room, worlds, engine, future, rest — identical across lanes — because marker-drift between lanes maps different worlds to the same visitor (E16).
**NR-4.** Every marker-label must predict its content honestly — because door-honesty is epistemology at the scale of knobs (XR31).
**NR-5.** No marker may be named what it is not ("Portfolio," "Cases," "Gallery") — because borrowed site-vocabulary re-categorizes the experience back into the genre it escaped (PR-adjacent).
**NR-6.** The identity mark doubles as the "home" gesture in non-fiction layers — because post-fiction furniture needs a home-reflex, and the mark is the only always-present object (T5-adjacent).
**NR-7.** Inside fiction, Home is never offered; "the way out" is the constellation/pullback native to each chapter — because fiction-internal exits must be world-consistent or they tear the veil (T/T-series rules).
**NR-8.** The visitor may ask "where am I?" anywhere and receive a one-frame answer — because disorientation must be repairable without backtracking (E100-family).
**NR-9.** The wayfinding answer ("you are crossing from the room to the record") must use story-language, not URL-language — because ontology-slip breaks register (S71).
**NR-10.** Wayfinding text capacity: ≤ one line — because positional guidance longer than a breath becomes a plaque (S75).

#### N11–N20: Entry points

**NR-11.** Every chapter-entry must be independently survivable by a newcomer — because forwards land P-tier mid-argument (A35-codified).
**NR-12.** Mid-story entries must open with a one-breath context-restitution (whose story, which chapter, what came before-tonally) — because narrative vertigo is the forwarded-visitor's first enemy (E24).
**NR-13.** The restitution must never spoil the loop the visitor is about to live — because spoilers kill the payoff they introduce (K-series ethics).
**NR-14.** Chapter-door URLs/addresses must be stable forever — because links are promises, and rotted promises are how referred trust dies.
**NR-15.** Entry doors must be reachable from external contexts without the dive (a P08 needn't dive) — because consent-to-immersion is earned per-visit, not per-lifetime (E41-family).
**NR-16.** Mid-room entry must place the visitor at the investigation-map state, not mid-clue — because in-medias-res *data* without the investigation's narrative is noise (Room-entry law).
**NR-17.** World-entry from external link must include the portal's abstract, same as portal approach — because altitude-coordinates before weather is the informed-choice law (S42).
**NR-18.** Entry into the engine must carry the residue-line "these worlds shared a mechanism" — because the engine assumes a question the visitor may not yet have (L-BRAID prerequisite).
**NR-19.** Entry into Ch6 must not fake-calm — the calm must be staged as *continuity*, even for newcomers (S61-law: the light arrives at rest; treat newcomers' arrival as their own resolution, with a one-breath map).
**NR-20.** Every entry variant must pass "does causality still hold?" — because any entry that inverts evidence-order teaches the wrong argument (A31-family).

#### N21–N30: The Express Lane

**NR-21.** The lamp must be present by second ~6 at every journey-entry, mid-points included — because each entry is someone's beginning (S8 generalization).
**NR-22.** The lamp's label is a place, not a rebuke ("the straight line") — because naming is framing (R-08).
**NR-23.** Lane-transitions are instantaneous and state-preserving — because a loading-lane is a mockery of its own promise (ER-13).
**NR-24.** Express content is the same facts at capsule-resolution — never a different story for the impatient (X.10).
**NR-25.** Express segments must hand back to Cine at the exact beat they replaced — because resuming is the lane-switch loop closing (ER-14).
**NR-26.** Express is printable as a single clean document — because gatekeepers carry paper (XR28; E86).
**NR-27.** The lane must never display "you are missing X" — because absence-marketing is FOMO-machinery, banned (XR20-class).
**NR-28.** Express-traversal is linear with slots for optional world-peeks — because the fast visitor's freedom is time, not topology (Linearity-for-speed principle).
**NR-29.** The lane terminates at the real door with certainty-text — because its destination is permission-to-act (T11).
**NR-30.** Lane-analytics measure completion, not identity — because the respect-lane may not become the surveillance-lane (N86/XR35).

#### N31–N40: Exits

**NR-31.** Exit-intent is honored instantly, from any state, no intermediates — because the door out is half the trust-door in (S93).
**NR-32.** Departure delivers the complete-so-far abstract automatically (unrequested, un-billed) — because "leave complete" is a debt the story owes the leaver (XR32 enacted).
**NR-33.** No "wait!" mechanics, visuals, or copy — because grabbing at exits is the cheapest trick on the internet and the most disqualifying for this brand (NR-adjacent E70).
**NR-34.** Browser close is accompanied by correct tab-title state (identity + promise), so the tab deserves re-opening — because tabs are the executive's short-term memory (E81–E90-family).
**NR-35.** Mid-Room exit offers the memo-ready-so-far (solved partial: clues found, root pending) — because labor invested is honored at departure, not confiscated (E60-family).
**NR-36.** World-exit returns to constellation, never to story-start — because return-position is respect for navigational effort (C21).
**NR-37.** Post-completion exit offers the archive + contact, silently — because the ending's commerce-by-dignity is furniture, not fanfare (T11).
**NR-38.** It must be impossible to exit into a dead state (broken still, orphaned frame) — because the last visible thing is *memory of the brand* (C2).
**NR-39.** Exits must be logged as aggregate completion-classes, never as personal profiles — because even departures are owed privacy (XR35).
**NR-40.** Every exit-path is tested at every frame in QA — because exit-integrity is *retention engineering*, paradoxically: free leavers return; trapped levers warn their network (§-funnel paradox).

#### N41–N50: Portals and worlds

**NR-41.** Portal labels carry name-whisper, altitude-coordinates, stake-figure, clock — because informed volition is the portal contract (S42).
**NR-42.** Portal geometry never implies order (no 1-2-3, no size-rank) — because false-hierarchy corrupts free choice (S50).
**NR-43.** The universe shows exactly three portals — because curation is seniority (S41) and a fourth is defect-class addition (N82 analog).
**NR-44.** Portal-hints vary by world-weather honestly — because atmospheric preview = trailer; trailers that lie buy bounces (T7 entry law).
**NR-45.** Worlds are self-sufficient: none references another beyond the shared-mechanism whispers — because any-order traversal breaks cross-world dependency graphs (S50/S47 split-law).
**NR-46.** Residue-whispers on world-exit must be identical in logic, distinct in voice — because consistency teaches the residue-question (L-BRAID) without robotic repetition (S47).
**NR-47.** Corridor-direction is always back-to-constellation first, then onward — because the hub-discipline keeps any-order traversal mappable (N36 machinery).
**NR-48.** Inside a world, the way back to the portal is one gesture, persistent — because world-immersion requires known-lifeboat or senior visitors won't dive (E42).
**NR-49.** Depth-gesture inside a world is the same single gesture used everywhere — because one-gesture-law (ER-78) is cross-chapter muscle-memory.
**NR-50.** The braid activates only on *visited* completion-count (1, 2, or 3) and scales honestly (1-world braid, 2-world braid, 3-world braid) — because completion-honesty is load-bearing at the story's gestalt-moment (T8 clause).

#### N51–N60: Orientation inside fiction

**NR-51.** The mind-world's "where" is *structure* (circuits), not maps — because a map-UI in a mind is category-confusion (N3-codified).
**NR-52.** The Room's "where" is the investigation-ledger (clues found, branches killed) — because cognitive off-load is the Room's load-management device (§5 Ch3 law).
**NR-53.** The world-level "where" is weather-phase (fog, tightening, clearing) — because weather-as-meter is the no-chrome progress doctrine (R-39).
**NR-54.** The engine's "where" is the dock-count (parts assembled of six) — because causal assembly is itself the position-indicator (R-55 stage-law).
**NR-55.** Ch6's "where" is breath-count to the door — because the decrescendo is a countdown made peaceful (S62-adjacent).
**NR-56.** No breadcrumbs-trails of visited-content inside fiction — because history-furniture inside a mind is absurd and breaks the veil (T/T-family).
**NR-57.** Orientation on re-entry must restate the current *question*, not the current chapter-name — because questions are the story's true geography (§6's loop-map doctrine).
**NR-58.** The constellation is the universe's persistent map-object: its presence during any confusion = home — because every visitor must carry one unforgettable landmark (loci-anchor, MA-04-support).
**NR-59.** Lost visitors drift gently toward light-exits (subtle path-lighting after idle) — because lostness must self-heal without admitting the visitor failed (E69).
**NR-60.** Any orientation-help must be in-world voice, never narrator-chrome — because the author may whisper but may not break the fourth wall (N59-rule).

#### N61–N70: Wayback, history, and return

**NR-61.** Backward traversal replays causally (rewinding the argument), not just visually — because reverse-causality must stay true (the braid unwinds; the verdict un-commits only notionally, with grace) (SF-family).
**NR-62.** History-replay never re-charges attention-price (previously-seen beats play faster, skippable) — because re-paid content is confiscation of past attention (E60-codified).
**NR-63.** Return visits honor structure-memory (constellation as index) but never person-memory — because structure is ours to keep; people are not (S95).
**NR-64.** Freshness-flags on return are content-honest ("this world's figures updated") — because return-value requires visible novelty (XR33; A50).
**NR-65.** No "continue where you left" persistence across sessions — because cross-session memory requires a dossier (N27/NR-ethics); graceful re-entry replaces it (E25).
**NR-66.** The archive layer (post-signature) preserves provenance-chain (what was seen → what's being shown) — because forensic revisits are how P04-tier vouches form (P04.19 machinery).
**NR-67.** Return-paths from external shares must route through portal-abstracts, not direct-into-weather — because shared world-links must stay informed-choice compliant (N17).
**NR-68.** The real door is always reachable in ≤2 gestures from anywhere — because the human is one decision away by law (A8).
**NR-69.** Dead-wayback states are forbidden: "back" always lands somewhere rendered — because reverse-dead-ends erode forward-courage (N27-law).
**NR-70.** The fade/gesture of returning to the story from furniture must be re-authored, not a browser-back — because furniture→fiction is a threshold, and thresholds get designed, not inherited (T/T-family).

#### N71–N80: The real door and its approach

**NR-71.** The real door appears as *furniture*, never as fiction — because T6's adjacency-law keeps the two ontologies clean: the glowing door is myth; the contact is human.
**NR-72.** Contact-channel options are: direct address (primary, named) + the described first-conversation — nothing else — because one clear door beats five guarded ones (A39).
**NR-73.** Contact certainty-text states: what happens, when, what he'll bring — because certainty is the conversion-mechanic of the calm (A38/R- axioms).
**NR-74.** The archive link-family (CV, evidence, anonymization-note) clusters beside, never inside, the contact — because furniture-classes must not masquerade as one another (A41-law).
**NR-75.** The real door's copy is written last, after all content is final, so every promise in it is true — because certainty-text that misdescribes the process is brand-fraud at point-of-trust (IR-QA).
**NR-76.** The approach to the fictional door and the approach to the real door must be visually/spatially distinct — because confusion between myth and mail-slot would be a category-error too expensive to survive (MA-11 protection).
**NR-77.** The real door never times-out, expires, or changes-state — because permanence is its meaning (post-signature rest, FU.10).
**NR-78.** External channels (e.g., LinkedIn) referenced from the door must open with destination-honest labels — because exit-honesty is total, all the way out (XR49).
**NR-79.** The door-layer must be printable, screen-readable, and keyboard-traversable to the same standard as the story — because dignity-parity applies to the last meter hardest (A48/XR-parity).
**NR-80.** "Not now" is a first-class response, answered with silence — because pressured persistence converts the calmest possible contact into a funnel (R-axiom/R20 law).

#### N81–N90: Cross-chapter seams

**NR-81.** Every chapter-border carries a stated exit-condition test (§3 per chapter) — because un-budgeted seams are where completeness goes to die.
**NR-82.** Seams must be traversable at three tempi (guided, free, express) — because border-states are where lane-forks concentrate (T8-codified).
**NR-83.** Seam-direction must never require scrolling *upward/backward* — because forward-only seams are the conducted medium's stream-bed (doctrine of no-against-the-current except by explicit act).
**NR-84.** Mid-seam abandonment must resume at seam-start (nearest border), never mid-transition — because transitions are atomic: partially-crossed states are narrative nonsense (N25-family).
**NR-85.** The seam-content (the transition's one idea) must be visible from both sides — because continuity-claims are audited by both chapters (T-blueprint clause).
**NR-86.** Seams are the designated position for the chapter-marker updates — because boundary-moments are where positional truth changes hands (N1).
**NR-87.** No choice may be required *at* a seam that could be made *before or after* it — because seams are for velocity, choices are for states (attend-architecture).
**NR-88.** Skip-across-multi-chapter (jump to the door) is offered only post-completion of the corresponding content — because Ω-arrival unearned is Ω-devalued (sanctity law R-68/N91).
**NR-89.** Every seam has a stated undo (return-to-prior-chapter door) — because reversibility is autonomy's proof-material (E42).
**NR-90.** Seam-QA runs at three network-speeds and with motion-toggles — because borders are the stress-fractures of the graph (N-series QA).

#### N91–N100: No-dead-end infrastructure

**NR-91.** A build-linter must verify: every node has ≥1 outgoing legal edge (except the designed rest-state) — because dead-ends are the single structural felony of the graph (XR5/N27).
**NR-92.** The designed rest-state (post-furniture) must still offer: archive, contact, constellation — because even *end* is a door (FU.10).
**NR-93.** Error-states (404s, failed assets) must route to the constellation or the real door — because error-time routing-hospitality is when character is audited (A49/N-series).
**NR-94.** Any removed content must leave a living redirect — because link-rot is a promise broken to strangers we never met (N14-law).
**NR-95.** Navigation must work with pointer-events disabled (keyboard-first validation) — because if it needs a mouse it isn't navigation, it's painting (XR14-family).
**NR-96.** The "I'm lost" affordance exists in every layer (query → one-frame answer → doorstep) — because lostness is survivable only if asking is cheap (NR-8 machinery).
**NR-97.** All map-objects (constellation index, ledger, marker) must degrade to lists under context-collapse — because structure-as-lists is universal (E90).
**NR-98.** Navigational copy is audited by the banned-register list as if it were prose — because microcopy carries the register as much as chapters (S79/XR-voice).
**NR-99.** The total graph must render as one page of pure text (every state, every edge) for internal review — because if the architecture can't be read on paper, it can't be reasoned about (paper-test doctrine).
**NR-100.** No door may ever pretend to be a wall; no wall may ever pretend to be a door — because honesty of affordance is the entire covenant of wayfinding (XR31 raised to first-principle).

---

### REGISTER SF — 100 STORY FLOW RULES

#### S1–S10: Causal ordering law

**SF-1.** Fog may never follow clarity within any thread — because the argument is a resolution-machine; reversed order voids the concept (SPEC-001 §1's spine; Chapter-law).
**SF-2.** No principle may precede its evidence — because assertion-then-proof reads as posture (A31/SPEC-003 T3 governing all scales).
**SF-3.** The Claim must precede the Door — because only a cast guide makes the door a mind instead of an installation (§8 #5-law).
**SF-4.** Reactivity must precede any request — because the world answers before it asks (Stage-3 law repeated in flow-language).
**SF-5.** The schema (four stages) must precede the Room — because the investigation is *read* as the schema-enacted; unordered, it reads as a game (Stage-4 dependency).
**SF-6.** The four deposits (identity, thesis, grammar, proof-promise) must precede the effort-ask — because Stage-5 is the keystone; violating it converts the Room from honor into chore.
**SF-7.** Worlds must follow the Room — because fiction-practice must precede record-audit: credibility-ladder (T6-function).
**SF-8.** The braid must follow ≥1 world — because gestalt requires parts (T8-trigger law).
**SF-9.** The engine must follow evidence — because mechanism-first is a sales-pitch; mechanism-last is transparency (Stage-8 rationale).
**SF-10.** The ladder and door must follow the verdict — because horizon-moments before trust are ad-copy; after, they're earned-scope (T2 timing-law).

#### S11–S20: Foreshadow discipline

**SF-11.** Every macro-payoff must have ≥1 planted foreshadow — because payoffs from nowhere read as coincidence, not design (armature law).
**SF-12.** Every foreshadow must pay off within its ledger-window (registry, §6.3 iii) — because unfired foreshadow is a lie told slowly.
**SF-13.** The M.7 silhouette must appear at least twice before the braid — because recognition at the engine requires pre-impressions (L-M3 machinery).
**SF-14.** The heartbeat must never be *named* until E.9's reveal — because the leitmotif pays only unrecognized (Se-8 law).
**SF-15.** The cost-naming must first occur at G.3 (grammar), tiny, before W2/E.4 blow it up — because honesty-precedents set small scale-make the big costs credible (S54-seeding).
**SF-16.** The question-instrument must be felt (R-38 physics) before it is *praised* (any witness line about his questions) — because corroboration lands only if the visitor has already felt the thing corroborated (S46-order).
**SF-17.** Portal-weather previews must foreshadow the *emotional* register honestly — because a portal that sells myth and delivers data is a trailer that lied (NR-44 machinery).
**SF-18.** The far-silhouette, circuits, braid-threads must share visual DNA — because family-resemblance is the foreshadow without words (L-M3 machinery).
**SF-19.** The Room's final memo format must *be* the Ch4 abstract format — because prophetic formats make the record feel like a return, not a department-change (R-41/A-41-shape prophecy).
**SF-20.** No foreshadow may be louder than its payoff's setup — because over-firing spoils (K2-ethics: mystery-budget conservation).

#### S21–S30: Callback architecture

**SF-21.** Every engine-part must cite its origin (callback ≤1s) — because mechanism-assembly is memory-recycling, and untagged parts arrive as *new* load (R-56 machinery).
**SF-22.** Callbacks are flash-tags, not recaps — because recaps re-charge attention already paid (N62's cognitive-justice).
**SF-23.** The Ch2 vocabulary must be the only craft-lexicon used in Ch5 — because frozen schema is the price of consolidation (R-29/S26 enforced cross-chapter).
**SF-24.** The Room's root must be *referenced* (never re-explained) inside W-series whispers when adjacent thematically — because adjacency-callbacks deepen pattern-insight without labor (S- wiring).
**SF-25.** The Claim's two lines must echo structurally at the couplet ("problems" → "decision") — because bookend-rhyme at word-level closes the loop linguistically (MA-02/MA-12 framing).
**SF-26.** The pulse must recapitulate at three story-heat-points only (ignition, verdict-idle, pre-door) — because precision of reprise is what makes it read as music and not as wallpaper (ER-77 enforced).
**SF-27.** Any callback must be legible to visitors who *didn't* see the original (stand-alone function) — because partial-traversal is legal everywhere, and broken references punish legal behavior (N17-family).
**SF-28.** World's scar must be *recalled* at E.8's after-caveat (not its content — its posture) — because candor-consistency across scales is the trust-argument (R-63 machinery).
**SF-29.** The constellation must be recognizable in the engine's assembly space — because context-recall makes states feel like one continuous room (MA-04 loci-payoff).
**SF-30.** The final fade must visually rhyme with the opening black exactly — because the matched-bookend is the journey's "object-status" claim (ER-10 physics).

#### S31–S40: Transition causality between chapters

**SF-31.** Every chapter must hand the next a *question*, never a summary — because forward-flow is fueled by loops, not by closures (§6 K4-law: overlap-closures-with-ignitions).
**SF-32.** T2 (dive) must be irreversible only in commitment, not in physics (abort lands soft) — because consent-architecture requires the possibility of second thoughts (E42 applied).
**SF-33.** T4's pullback must render the visitor's *own* route, never a canned map — because the IKEA-moment depends on the map being theirs (R-20).
**SF-34.** T5 must be momentum-transition: fastest legal crossing — because anticipation at your-turn is perishable fuel (§4 #7).
**SF-35.** T6's bridge-line ("you've done it once…" or better production line) must wait until the memo exists — because the inheritance-line is only true once the proof-object exists (T6 trigger-law).
**SF-36.** Portal-entry wraps must be ≤2s, weather-only — because portal-theater is a veil, not a scene (T7-budget).
**SF-37.** Corridors must be content-free — because load-resets poisoned by content are not resets (E66/Si-4-law).
**SF-38.** T8's braid must be the oddest-looking transition in the journey (its only braid) — because gestalt-events require formal singularity to be *felt* as change-of-scale (SF-88-adjacent).
**SF-39.** T9 must not change the light — only its activity — because calm-as-continuity is the point (S61 restated for seams).
**SF-40.** T11's fade must terminate in *stable* true black held one beat before signature — because the eye must stop hunting before the name arrives (T11's attention-physics).

#### S41–S50: Lane-integrity of narrative

**SF-41.** Express and Cine must tell causally identical cut-lines — because different orders are different arguments (X.10 at seam-level).
**SF-42.** Still-lane transitions are crossfades on the same beats — because still ≠ absent rhythm; rhythm-as-presence (E17 law).
**SF-43.** Semantic-lane must serialize the same loop-order (what-question-then) — because listening is linear: loop-integrity matters most where vision is not involved (E18 codified).
**SF-44.** Sound-lane must never foreshadow visually-locked content (no audio-spoilers) — because cross-lane spoilers betray mixed-mode visitors (N-series ethics).
**SF-45.** Lane-switch inside a beat must preserve the beat's tension-state — because parity is emotional, not just informational (E25-family).
**SF-46.** Any content in one lane that cannot map to another must be redesigned, not lane-locked — because existence-in-one-lane violates E16 absolutely.
**SF-47.** The Express Lane may abbreviate but never invert tension-resolution pairings — because abbreviated-story wrongly-ordered is rumor (telling out of school).
**SF-48.** All four lanes must end at the same real door — because final-forking would measure visitors differently at the dignity-point (E29/T11).
**SF-49.** Stillness-moments (Si-series) have semantic descriptions for the semantic lane ("everything goes quiet") — because silence *must* be translatable, or listening-visitors never receive the story's three most important events (parity-law at the apex).
**SF-50.** Chapter-seams are where lane-parity is audited first — because borders are fracture-points of both physics and narrative (NR-90 synced).

#### S51–S60: Macro rhythm law

**SF-51.** Intensity ceilings by chapter (per §6-curve) are build-contracts — because free-intensity inflates neighboring peaks into invisibility (E68).
**SF-52.** One peak per act, pre-registered — because peak-inflation is the death of the curve's architecture (M1-law).
**SF-53.** The ignition-spike (dive) must remain the lowest peak — because commitment-peaks early overdraw the account the Room needs mid-journey (curve-shape law).
**SF-54.** The reframe (R.10) must remain Act II's maximum — because the Room is the thesis-proof; out-peaking it in Ch4 turns proof into appendix (E68-variant).
**SF-55.** The verdict must remain the journey's global maximum — because conviction is the destination-emotion's engine (M2's syllogism).
**SF-56.** The decrescendo must be monotonic from E.9 to the rest-state — because any post-peak excitement is another peak (forbidden), and the fade is the argument that calm was real (E67).
**SF-57.** World's internal peaks must sit one full step below act-peaks (intensity-points) — because hierarchy-of-loudness is what makes three-worlds-then-engine feel like an ascent (curve-hierarchy law).
**SF-58.** Trough-depths are budgeted like peaks (corridor ≥3s; chamber ≥3s; calm ≥5s) — because troughs are the Agile-cadence of attention; starve them and the curve flatlines at fatigue (SF-trough law).
**SF-59.** Any build-beating at >intensity-budget must be re-scored against the curve — because music-notation exists so that no one improvises the symphony's dynamics (S81-governance).
**SF-60.** The two-silence rule holds journey-wide: no two silence-claps separated by < one chapter — because rationing is the price-list of stillness (S89 extension).

#### S61–S70: Flashback & side-content control

**SF-61.** No flashbacks inside fiction — because conducted time is linear: the story's only legal time-travel is the callback flash-tag ≤1s (S22 codified).
**SF-62.** Side-content may exist only as (a) whispers tied to nodes, (b) archive furniture post-signature — because side-stories inside the argument are load-bearing distractions (IR-family).
**SF-63.** The archive may contain chronology (career record) because post-fiction furniture may be furniture — because biography belongs to the furniture-layer per SPEC-001 §6.2 law of arrival (and Ch6's climb is horizon, not history — S64 synced).
**SF-64.** Post-completion "revisit" content must flag its additions — because returning visitors deserve delta-honesty (NR-64-law).
**SF-65.** The anonymization-note is the only legal in-fiction metatext — because the fourth wall allows exactly one professional notice, and it must be the honesty-notice (XR25/A15).
**SF-66.** There are no alternative-endings — because authored-destiny-of-shape is what makes fade+door mean what they mean (N90-adjacent: the story ends *because* endings are designed).
**SF-67.** The room may offer variant-cases in archival rotation (post-signature) — because replay-value lives in furniture, not in the spine (R-42/A50 synced).
**SF-68.** No cutaway-gags, no comedic interludes — because the register's wit is in-line-dry (§9 Law Six); set-piece humor is a different temperature altogether.
**SF-69.** Meta-commentary about "the experience" is banned inside fiction ("in this portfolio…") — because ontology-rupture is never repaired twice (N59).
**SF-70.** Everything in furniture speaks of the story as *story* (plainly), never as illusion — because honesty between layers is the register's register (S71 synced).

#### S71–S80: Loop-flow governance

**SF-71.** No closure may occur without its registry payoff — because payoffs are the curiosity-economy's pension-plan (§6.3 iii).
**SF-72.** Closure and next-ignition must overlap by exactly one beat — because K4's anti-starvation is a relay, not a baton-drop.
**SF-73.** Macro-loops may stay open across chapter-borders only within their ledger-window — because cross-border debt beyond window reads as abandonment (SF-12-variant).
**SF-74.** The far-silhouette loop may *never* be closed early by accident — because payoff-theft mid-journey is worse than no-loop-at-all (L-M3 protection).
**SF-75.** Room micro-loops must close inside the Room (except root-coda, which closes at memo) — because Room-fog leaking into the record would be genre-contamination (L-RCODA-exception logged).
**SF-76.** Portal-loops close inside their world; residue loops close at the braid — because each scale owns its closure-venue (registry-law §6.1).
**SF-77.** Engine assembly must not open *new* loops (except after-caveat honesty) — because Act III is for closing (L-ENGINE-law: comprehension requires net-negative loop count).
**SF-78.** The after-caveat's loop must be closed by Ch6's horizon-structure — because a concern left open to the door would corrode the peace the door requires (L-AFTER→L-LADDER hand-off).
**SF-79.** Ω must remain the *only* open loop after the signature — because multi-open endings read as sloppiness, and one-open reads as meaning (L-Ω singularity-law).
**SF-80.** Loop-copy must never promise what the build can't close inside budget ("coming soon") — because registry-loops promise closure by architecture, not by date (B16-adjacent N-series).

#### S81–S90: Endings flow-control

**SF-81.** Calm must be fully staged before the first rung manifests — because laddering on un-settled ground reads as ambition-theater (FU-sequence law).
**SF-82.** Rungs must arrive one-at-a-time, each settling — because stacked rungs are statistics, settled rungs are horizons (S62 machinery).
**SF-83.** The destination-line ("not a title") carries its total-stillness hold before the door manifests — because the lock-shield's weight is removed if anything else moves (S65 restated).
**SF-84.** The door's manifestation must be causeless-in-fiction (it appears because it appears) — because manufactured-provenance would trivialize the myth-door (T10 doctrine).
**SF-85.** Door-warmth is the only feedback to approach — because hints/prompts at Ω are banned absolutely (ER-46 machinery).
**SF-86.** The final line must arrive exactly once — because repeats would make the transfer a nag (S68's echo-ban).
**SF-87.** The fade's easing must be slow-linear (no dramatic tail-off) — because a dramatic fade is a flourish, and the signature requires a stage, not a trick (T10-machinery).
**SF-88.** The signature card must hold ≥3s with zero motion — because identity-bind requires an un-moved lens (S69 law).
**SF-89.** Furniture appears only after the signature completes its hold — because adjacency-law (T6/T11) demands the door-of-life to appear as the story's legacy, not as its interruption.
**SF-90.** The rest-state must be motion-stable indefinitely — because "the room left open" is the hospitality of the final image (FU.10/NR-92 linked).

#### S91–S100: Story-flow QA

**SF-91.** Every state-machine edge must be causally reviewed ("does the argument still work if this edge is taken?") — because legal-topology ≠ legal-narrative (E100-family).
**SF-92.** Persona-walks must simulate: front-door, mid-Ch3, mid-W2, Ch5-entry-by-link — because imported-arrivals are the highest-value traffic (N11-series tests).
**SF-93.** Every foreshadow's payoff-window must be verified in builds — because ledger-debt accrues silently (SF-12 tests).
**SF-94.** Loop-pressure modeling must be re-run per build — because starvation/overflow alarms keep the engine between boredom and clutter (§6.3 tests).
**SF-95.** The reverse-walk (backward traversal) must be fluent narrative — because backward-travel is a real behavior, and broken reverse-causality teaches doubt (N61 tests).
**SF-96.** World-order permutations (3! = 6) must all be valid stories — because any-order traversal is a promise (S50 proven exhaustively).
**SF-97.** Partial-braids (1-world, 2-world) must be as honest-feeling as the full braid — because completion-integrity can't hold only for completers (NR-50 test).
**SF-98.** The silence-claps must be *felt* in user-observation, not assumed — because silence that doesn't register as event is just lag (R-59-adjacent testing doctrine).
**SF-99.** Any beat scoring "raise questions our registry doesn't own" must re-enter narrative-design, not ship — because surprise-loops are the architecture's only uninsurable loss (§6.3 interlock i).
**SF-100.** If the story ever tells instead of hands-over, the seam is wrong — because handing-over is the whole thesis of flow: the visitor must always inherit, never be briefed (SPEC-001 §1.1 theater-of-proof; final flow-law).

---


### REGISTER IR — 100 INFORMATION RULES

#### I1–I10: Disclosure order absolutes

**IR-1.** Identity must precede every other information class in every entry-path — because all facts file under the identity that arrived before them (§8-FIRST law).
**IR-2.** Title must be the plain category ("Business Analyst") wherever it appears — because category-purity is positioning (PR1/N5).
**IR-3.** The Claim precedes description, description precedes evidence, evidence precedes mechanism — because promise→portrait→proof→transparency is the only non-posturing order (§8 absolute).
**IR-4.** The first numeric may appear only after the Claim's context — because figures without frame are decoration awaiting provenance (A31-family).
**IR-5.** Availability/logistics may surface only from the Express layer or the real door — because shipping-data before desire is bureaucracy arriving before invitation (§8-LAST law).
**IR-6.** The anonymization standing-note must be visible from any record-world in one gesture — because disclosed-anonymity is the changeable-atmosphere machine (XR25/A15).
**IR-7.** Scope-labels on the ladder appear with their rung simultaneously — because scope-then-title orderings are how T2 stays armored (S63).
**IR-8.** Witness-attribution must be proximal to the claim witnessed (same view or one gesture) — because floating praise is wallpaper; adjacent praise is evidence (S46).
**IR-9.** The "how to read this place" (legend) precedes any object that requires the legend — because grammar-before-content is the comprehension-law of conducted medium (§8 #7).
**IR-10.** Contact-info anticipation (that a human is reachable) may be signposted early; contact-content itself stays late — because hope-of-human early + human late = the hospitality calendar (A8 pre-flag + §8-LAST).

#### I11–I20: Density budgets

**IR-11.** One idea per view, enforced as: an editor can name the view's idea in ≤6 words — because the test of unity is namability (E91 standardized).
**IR-12.** Text-on-stage hard-caps: claim/whisper ≤ one breath (~15 words); stage-beat ≤ 40 words; abstract = exactly 4 lines — because reading is the steepest tax and caps are compassion (S75/IR-family).
**IR-13.** Numerals on stage: one honored figure per view maximum — because figures are verdicts, and verdicts don't share podiums (S49/R54).
**IR-14.** World-metadata at portals never exceeds the four-label set — because preview-honesty has a load-budget too (S42 cap).
**IR-15.** Evidence depth-layer pages must self-abstract at top (four lines before any depth) — because even audits deserve a map (A9/A5 doctrine).
**IR-16.** Sidebar/annotation text ≤ 25% of the primary object it annotates — because marginalia is voice, not wall (SPEC-001 §7.5 codified).
**IR-17.** The engine's mechanism page must fit on one screen-height at reading-zoom — because mechanism-comprehension requires whole-view gestalt (R64-family).
**IR-18.** The real door's total copy ≤ 90 seconds of reading — because certainty is compression's final job (A38–A40 budgeted).
**IR-19.** FAQs may exist only in the archive-furniture, capped at 7 items — because question-walls are where unclear products hide; clarity removes questions ex ante (IR-furniture doctrine).
**IR-20.** Any list on site must be ≤7 items or visibly grouped — because chunking is the last mercy of working memory (C6 applied to inventories).

#### I21–I30: Layering architecture

**IR-21.** The four canonical depths are: portal (whisper), abstract (4 lines), narrative (beat-staged), evidence (audit-grade) — and no other depth-class may be invented — because layer-zoo is taxonomy-accident and inter-layer consistency is untestable at scale (A-ladder locked).
**IR-22.** Every surface claim must exist at all four depths with identical truth — because zoom-consistency is X.10's landmine-defusal.
**IR-23.** The depth-gesture is one, universal, and its affordance is always visible *in-context* — because hidden depths are marketing; visible depths are libraries (ER-78).
**IR-24.** Depth must always disclose direction (what kind of thing is deeper: number-source? method? witness?) — because depth-honesty is a sub-law of door-honesty (XR31 applied).
**IR-25.** Deeper layers may add but never contradict shallower — because a deeper layer contradicting a shallower one is the one unforgivable editorial scandal (X.10).
**IR-26.** The deepest layer must be the most plainly written — because audit-readers are the most junior-hostile audience (P02/P04 read fast and exactingly; jargon dies at depth too — A46).
**IR-27.** Cross-layer memory (what's been read) may be indicated ambiently — because re-marketization of read-content wastes attention (N62-adjacent).
**IR-28.** Evidence-layer pages must carry the world they belong to visibly — because depth without provenance is a file-drawer, not an exhibit (NR-66 synced).
**IR-29.** A claim that can't afford four depths must be re-scoped to what it can afford — because un-depthable claims are balloons at a trial (A9/A17 discipline).
**IR-30.** Layers may not more-than-double between depths (abstract ~4 lines → narrative ~12–20 beats → evidence structured) — because cliff-edges of density are where skimmers drown (IR-slope law).

#### I31–I40: The numeral policy

**IR-31.** Every figure is: true, sourced, dated, scoped (what it measures) — four-field completeness — because partial figures are decor (A12).
**IR-32.** Dates are absolute years/periods — because relative-time rots silently (ER-28).
**IR-33.** Rounding must be labeled as rounding ("≈", "over", "under") — because approximation-honesty is P02's favorite paragraph (XR40).
**IR-34.** Context-figures must accompany hero-figures where scale is non-obvious (baseline, before/after) — because naked deltas are numerology (IR-context law).
**IR-35.** Hero-figures' provenance is one gesture — because spot-checks must succeed instantly when they occur (A17/XR-family).
**IR-36.** Percentages must name their denominator — because "40% faster" without "of what" is ad-grade (IR-pedantry honored as truth).
**IR-37.** Currency-money figures carry currency and year — because ₹/$ ambiguity is factual ambiguity for a global referral-graph (D3/XR29-family).
**IR-38.** In-fiction figures obey the same four-field policy marked as simulated — because squint-grade consistency teaches the record's honesty (S35 law).
**IR-39.** Figure-updates must be diff-visible at archive-level ("updated to 2025 actuals") — because silent figure-mutation is retroactive dishonesty (A50 disciplined).
**IR-40.** No figure may ever be forced to match the curve (chosen for drama over truth) — because the numeral policy outranks pacing: if the honest figure is small, the honest figure is honored small (R3/C17).

#### I41–I50: Text-surface standards

**IR-41.** First-person ownership throughout his material; plural-ownership for shared outcomes — because case-law of credit is the trust-instrument (A14/S73).
**IR-42.** Difficult people in text are rendered with one redeeming clause each — because the silent-audition requires proof-of-fairness per character (A26/S77).
**IR-43.** Text must pass the quiet-room read-aloud per layer — because voice is only owned if the ear confirms it (S80-codified).
**IR-44.** Technical terms appear with one-gesture gloss, never parenthetical walls — because parenthetical definitions are apology-noise (A46/XR-typography hero harmony).
**IR-45.** The couplet and Claim lines are character-locked after approval, including punctuation — because retell-units mutate fatally in careless hands (S80/N-family).
**IR-46.** Microcopy speaks the same first person calm ("Send it when you're ready") — because interface-dialect is brand-voice all the way down (S78).
**IR-47.** Empty-beat text ("nothing here yet by design") explains its emptiness — because unexplained emptiness reads as unfinishedness (N73-family).
**IR-48.** Text must be selectable/copyable everywhere possible — because text that can't be carried can't be forwarded (A6/E90's text-first).
**IR-49.** Alt-text and ARIA-labels are authored *as content*, not as afterthought — because semantic-lane readers deserve the writer, not the intern (E18/E-parity sacred law).
**IR-50.** Reading-level measured per layer; narrative ≤ plain-English grade 8 while evidence may rise — because register splits by depth: clarity for all, precision for auditors (A46 controlled).

#### I51–I60: The abstract system

**IR-51.** Every unit (chapter, world, project, mechanism) has a prepared four-line abstract — because XR3-complete-at-any-border needs objects, not intentions (S30).
**IR-52.** Abstracts are order-locked: stake → scale → action/turn → outcome/scar — because consistent internal grammar makes them skim-comparable (IR-grammar law).
**IR-53.** Abstracts include two of five markers minimum from {clock, altitude, figure, scar, voice} — because markers are the altitude-pricing the senior tiers scan for (A5).
**IR-54.** Abstracts must survive paste into email/chat without formatting loss — because travel is their primary use (A6/D31).
**IR-55.** The Express abstract-chain reads as one continuous page when exported — because the Express-visitor's artifact is the leave-behind of the whole brand (E86 machinery).
**IR-56.** Abstracts never tease depth with loss-framing ("but that's not all") — because respect-marketing is banned; invitation is depth-honesty ("the how, and the receipts, sit one layer down") (IR-civility).
**IR-57.** Abstract of a scar-world contains the scar-line itself — because candor-in-miniature is the brand's strongest portable claim (A13 portable variant).
**IR-58.** The mechanism-abstract (Ch5) is the most-edited object in the project (≥3 read-aloud passes) — because it's what VPs forward (M1-P08's courier artifact, R-64).
**IR-59.** Abstract texts may be edited only alongside their narrative twins — because divergent twins are the seed of inconsistency-scandal (IR-22 enforcement).
**IR-60.** Every abstract passes "could P01 paste this to her manager unchanged?" — because that is the functional test the market will apply (P01.23 functionalized).

#### I61–I70: Evidence-layer information design

**IR-61.** The evidence ontology is fixed: case → context → contradiction → approach → turn → outcome → scar → receipts — because a fixed skeleton lets forensic visitors skim by slot-location (P02.12 machinery).
**IR-62.** Receipts-classes: figure-sources, instrument-context (A10), quote-permissions, date-logs — each class filterable — because auditors hunt classes, not pages (P04.12's forensic pattern).
**IR-63.** The instrument inventory lists usage-context per instrument with exposure-level plainly — because contextual exposure is the anti-keyword device (A10/A18).
**IR-64.** Anonymized artifacts are labeled with *what* was altered (names/dates/figures-fuzzed?) — because alteration-scope honesty is the difference between anonymization and fabrication-suspicion (A15-full law).
**IR-65.** Method-descriptions are present only at evidence depth — because method-talk at surface is process-as-personality (B45); at depth it's testimony.
**IR-66.** Each evidence page states its confidence-state ("as recounted," "as documented") — because epistemic-labeling is what senior auditors pay attention to (C17-family).
**IR-67.** Evidence pages end with the back-to-story doorstep — because depth without a way home is a cellar (NR-66/synced no-cul-de-sac).
**IR-68.** Quote-material must preserve role-altitude (CEO/peer/report) while hiding identity where required — because altitude is the verification-currency praise spends (P07.9-family).
**IR-69.** The evidence layer must be scannable as a *table of claims* — because for P08-class spot-checkers the audit-trail-as-index is the fastest trust ever built.
**IR-70.** Anything the archive can't yet show is listed as "available on request" — because listed-absence is transparency; silent-absence is suspicion (IR-completeness doctrine).

#### I71–I80: Labels and naming

**IR-71.** Chapters keep their locked names internally and in markers — because renaming breaks the bible-chain (lock-continuity law).
**IR-72.** The two lanes' names are *description-first*, brand-words second ("the straight line") — because function-titled lanes survive translation and time (N87-adjacent).
**IR-73.** File/asset-names (if ever visible) must be human-sentences — because slugs leak backstage and backstage must be presentable (E76-family).
**IR-74.** Time-labels are duration-honest ("4 min") not genre-honest ("short film") — because genre-names set wrong expectations for the fast tiers (N21-machinery).
**IR-75.** The semantic-lane names for still-beats must be written, not auto-generated — because alt-vocabulary is content (IR-49 family).
**IR-76.** "Worlds" may be called projects in furniture, but narrative keeps world-names — because genre-translation belongs in the furniture, not the fiction (SF-70 synced).
**IR-77.** The door never gets a label — because labeling a symbol is like explaining a chord (MA-11 protection).
**IR-78.** The real door's label is the word for a human action ("Write to Keshav") — because furniture is honest where fiction is myth (NR-71 synced).
**IR-79.** Any "new"/"updated" flag must expire by date — because perpetual-freshness is a lie told by ribbon (N87-family/A50).
**IR-80.** No placeholder-text may ever reach a build beyond local dev — because placeholder-leak is the classic death of precision-brands (F16/N80).

#### I81–I90: Metadata and sharing

**IR-81.** Every state has a composed share-preview (title + one line) — because the forwarded gray-box is the first impression at VP-desks (A43).
**IR-82.** Share-previews speak the couplet's family-language, never marketing-superlatives — because the preview is the Claim in exile (XR17 voice-law).
**IR-83.** The canonical-URL policy is stable-hierarchical (chapter/world/evidence) — because URL-rot kills reputational annuity (N14).
**IR-84.** OG/social images are the abstract-text over calm, not screenshots of the fiction — because fiction-frames out of context are unearned mystery (A43-adjacent).
**IR-85.** Each world's share-preview carries its altitude-coordinate — because inbox-context is where portal-honesty must already begin (N17/XR31).
**IR-86.** Copy-to-clipboard formats strip decorative characters — because paste-fidelity is portable-trust (E90/XR27).
**IR-87.** Print-CSS produces the abstract-chain + contact as the primary document — because paper is a channel gatekeepers actually use (XR28/E86).
**IR-88.** Structured-data (schema.org) describes the person plainly — because machines are also gatekeepers (professional, not gimmick, SEO furniture).
**IR-89.** Analytics-events are *content-events* (chapter-complete, braid-activated), not heat-spying — because measurement follows states, not bodies (N86/XR35).
**IR-90.** The identity-card for machines (vCard/download) exists in furniture — because gatekeeper-workflows include address-books, not only browsers (IR-utility).

#### I91–I100: Information QA gates

**IR-91.** Every claim traces to a source-document in the content-directive (the truth-ledger) — because un-sourceable claims are later lies prewaiting (R3 institutionalized).
**IR-92.** Every view passes the namable-idea test with witnesses — because single-idea law fails silently without ritual (E91 enforced).
**IR-93.** Every number is re-verified on a release-ritual calendar — because dated truth is a living liability with a shelf-life going stale (A50+A12 loop).
**IR-94.** Paste-tests run on five surfaces (mail, chat, note, doc, LinkedIn) — because traveling-text is the text that matters most (IR-54 tests).
**IR-95.** Read-aloud for every new line; delete-test for every loved line — because the voice's immune system is procedural (S80/SPEC-001 §9.6).
**IR-96.** Four-depth consistency audit per case quarterly — because drift between depths is the scandal of X.10's nightmares (IR-22 tests).
**IR-97.** Translation-review of the couplet and Claim by native speakers per market — because meanings don't transfer, only people transfer them (N87).
**IR-98.** Evidence-layer random-audit: pick 10 claims/monthly, verify receipts — because audit-mechanisms must themselves be auditable (IR-69 loop-closed).
**IR-99.** "Stranger test": a person who has never heard of the project can recount identity + claim + one world in 90s — because comprehension is externally-tested, never self-certified (C3-adjacent).
**IR-100.** If two pieces of information ever disagree, the architecture is broken — because consistency is not a property of the system; consistency *is* the system (X.10 final-form).

---

### REGISTER EG — 100 ENGAGEMENT RULES

#### EG1–EG10: Attention-first economics

**EG-1.** The experience must repay its first 8 seconds with one true signal of life + identity — because first-decision clocks are non-negotiable market-facts (P01/P08 windows, ER1).
**EG-2.** Each new state must offer an *available next-question* — because attention was purchased with loops, not with furniture (K4 doctrine).
**EG-3.** Seconds-counting is banned; seconds-budgeting is mandatory — because the guards are invisible ("no clocks on stage" N68 vs. §4-budgets backstage).
**EG-4.** The Claim must be quotable to a colleague in one breath — because the first atomic unit of engagement is the retellable sentence (S99).
**EG-5.** Beauty cannot open the show alone; life must open it (pulse, reaction) — because static-pretty is mistaken-for-broken by the most valuable visitors (T0-law).
**EG-6.** Loudness is rationed: the journey spends five peaks — because sustained-loud = sustained-zero in attention-economics (M1/S89).
**EG-7.** Any object competing with the current solo gets dimmed by law — because stage-focus is the physics of attention (PC-10, the solo-voice law).
**EG-8.** Interruption-signals from outside are anticipated: resume-after-focus is authored — because executives interact between meetings; graceful-resume converts interruption-heavy contexts (E25-adjacent).
**EG-9.** The mid-point of every chapter must be a small win — because chapter-middles are where attention-mortgages mature (textbook drop-point).
**EG-10.** "What do I do now" must never be answerable with "wait" — because forced-waiting is attention-theft, except budgeted silence (the only purchased patience in the story — R59-family).

#### EG11–EG20: Agency and mastery

**EG-11.** The first act must be trivially learnable; the last act must feel masterly — because mastery-arc is the engagement-arc (agency-pedagogy law).
**EG-12.** The visitor's skill must be exercised, never tested — because tests produce performance-anxiety; exercises produce flow (Room-doctrine E70-family).
**EG-13.** Every gesture's consequence must be visibly linked to its gesture — because causality-visibility is interactivity's trust (E41 codified).
**EG-14.** The Room must offer ≥3 valid investigation-paths to the root — because choice-validity is the texture of real analysis (S32-family).
**EG-15.** Mastery-feedback must be ambient (weather/ledger), never taunting (scores, rankings) — because taunt-metrics are game-tones in a cathedral (N83).
**EG-16.** The mind-world must reward curiosity *with truth*, not with easter-eggs — because joke-reward ~ would invert the world's honesty-premise (whisper-truth doctrine).
**EG-17.** It must be impossible to "fail" the story — because failure-states in conducted fiction are the author converting hospitality into hazing (E70 absolute).
**EG-18.** Mastery must be transferrable: found-questions usable in the visitor's real meetings — because utility-memory is engagement that outlives the session (D36/Se-4).
**EG-19.** The visitor may ignore everything optional without penalty — because opt-in-optional is the only posture the self-respecting visitor accepts (E44).
**EG-20.** At completion, the story must hand the visitor a *usable artifact* (the memo-format instinct) — because gift-giving at exit converts engagement into practice (Se-3/A41-prophecy).

#### EG21–EG30: Reward without gamification

**EG-21.** Every reward must be *more truth*, never more shine — because the currency of this economy is candor (truth-economy doctrine).
**EG-22.** No points, badges, streaks, levels, loot — because extrinsic-currency cheapens motive (N83 boiler-plated into engagement law).
**EG-23.** Unlock-mechanics are banned; reveal-mechanics are welcomed — because "locked" implies ransom; "revealed" implies hospitality (EG-diction of dignity).
**EG-24.** Progress is acknowledged by the world changing weather, not by furniture — because ambient-progress preserves immersion (R39-law).
**EG-25.** The biggest reward must be the verdict-silence — because silence-surpasses-confetti at senior altitudes (R-59-supported).
**EG-26.** Reward-frequency must decay with depth (early: dense; late: sparse) — because variable-ratio scaffolding is for casinos; this is a reading-courtship (EG-spacing integrity).
**EG-27.** Completion-acknowledgment is framed as closure (the memo, the braid), never as congratulations — because self-located pride is stronger and never false (R-36 law).
**EG-28.** Optional-depth reward is exposure-honesty ("here's exactly how deep each goes") — because candor-as-reward speaks precisely to the audiences who dig (A18).
**EG-29.** The door's reward is warmth, not opening — because myth-rewards must keep symbolic physics intact (ER-46/N91).
**EG-30.** The final reward is certainty about the next step — because the Invitation's product is calm (A38–A40 terminal-reward).

#### EG31–EG40: Idle, stuckness and rescue

**EG-31.** Idle is measured per-state against its contemplation-budget (calm-states tolerate longer idles innocently) — because idle-meaning varies by state: at the door it's communion; in the Room it might be confusion (EG-context law).
**EG-32.** Rescue offers escalate only on repeated idle: observe → suggest → offer guide — because patience-first respects deep-thought (S37-family).
**EG-33.** Rescue voice is the world's floor-staff, never the narrator — because diegetic-help preserves dignity (N60-sync).
**EG-34.** Skipping-rescue must leave no residue (no "skipped" markers) — because shame-residue is anti-return engineering (N33-machinery).
**EG-35.** The stuck-visitor must end up *ahead* of where un-stuck would have placed them timewise — because rescue that costs time is assistance-that-taxes (EG-justice of rescue).
**EG-36.** Repetitive-struggle signals (same gesture 3×) must trigger interpretation-help, not repetition-help — because same-gesture-retry is confusion-symptom, not perseverance-symptom (E95-driver).
**EG-37.** Idle in the Room must not trigger content-donation too early (root-reveal) — because donated-breakthroughs kill the IKEA the Room exists for (R-32 protection).
**EG-38.** Late-night idle (odd-hour timestamps) may soften ambient stimulus quietly — because bed-reading is a context to serve, not to exploit (EG-contextual mercy).
**EG-39.** Session-end-rescue: at exit mid-effort, receipt of progress is offered textually — because the leaver's effort must be honored tangibly (N35/E33).
**EG-40.** Rescue-quality is QA'd with think-aloud tests on ≈5 fresh users per build — because presumed-help that doesn't help is discovered only by strangers (E96-adjacent).

#### EG41–EG50: Play, discovery and delight

**EG-41.** Sanctioned play-windows are authored after each reactivity-reveal — because surprise-appetite needs immediate satisfaction to encode love (S86-law).
**EG-42.** Delight must be truth-bearing: every "fun" moment teaches something the story needs — because pure-delight spends awe without buying meaning (E-meaning-clause of all joy).
**EG-43.** Discovery must be proportional to curiosity invested — because found-object economics must stay just or the visitor stops digging (E53-family).
**EG-44.** At least one discovery per world must be *verbal* (a whisper worth quoting) — because quotables are the portable gold (S99-doctrine).
**EG-45.** There must be one discovery designed for *practitioners only* (a P04-grade detail) per chapter — because shibboleth-engagement recruits the back-channel army (P04.21 family).
**EG-46.** No discovery may punish the late-finder — because lucky-early / unlucky-late economics is the slot-machine ghost (EG-justice).
**EG-47.** Play in the mind-world teaches the touch-language that the Room will require — because play is where the physics tutor lives (Stage-3 scaffolding law).
**EG-48.** Humor is permitted in whisper-voice, budget ≤1 per chapter, always dry — because the register's wit is seasoning, not sauce (S75-family/§9 Law Six).
**EG-49.** The final play-moment is door-approach warmth — because the last delight must be the one that points at life (R-68).
**EG-50.** Every delight must survive the tenth repeat — because durability is the property of craft versus novelty (C19-defense).

#### EG51–EG60: Return-visit engagement

**EG-51.** The story must be re-enterable from every chapter-door with zero friction — because revisit-architecture is how careers are actually won (NR-11-sync).
**EG-52.** Returning visitors see freshness-flags, not familiarity-markers — because recognizing content is service; recognizing *them* is surveillance (NR-63).
**EG-53.** The archive must grow on a visible cadence (dated) — because living-archives convert one-time visits into subscriptions-of-attention (A50 machinery).
**EG-54.** Re-telling value must increase: annotated-secrets layer in the archive for returners — because second-visit visitors deserve the museum's basement (E-accretion law).
**EG-55.** Annual story-anniversaries are marked by additions, never by re-skins of the door/couple — because the sacred-objects don't wear costumes (N94).
**EG-56.** The constellation remembers structure for returners instantly (no re-teach) — because the returning mind owns its map (E60-consistency).
**EG-57.** Returners get speed-elevators (chapters as capsules with doors to depth) — because respect for the returner's time is the return-gift (E62-codified).
**EG-58.** Share-into-your-network is *enabled*, never *requested*, on return — because self-driven advocacy is the only advocacy senior people respect (XR20/N80).
**EG-59.** Returning P02/P04-traffic finds receipts first — because auditor-satisfaction-velocity is the metric that makes back-channels hum (P02.12/P04.12).
**EG-60.** The real door's certainty-text updates to reality always (response-times true this week) — because stale-promises at the door are broken-promises at the counter (NR-75/A40-live).

#### EG61–EG70: Shareability and carrying

**EG-61.** The story must be describable by a stranger after one visit — because conversational-portability is the free distribution-engine (S99/MA-02).
**EG-62.** Every anchor is quotable-without-screenshot (text-true, not picture-dependent) — because most retellings happen offline (E90-family).
**EG-63.** The couplet must survive quotation without its animations — because the words must carry the meaning where pixels can't travel (E90/MA-12).
**EG-64.** The anti-sell world (W2) must be copyable as a paragraph — because founder-networks travel in words and barbecues (P09.23).
**EG-65.** Worlds' share-cards carry altitude + one honored figure — because executive-inbox comprehension requires it (IR-85 synced).
**EG-66.** Abstract capsules paste into a recruiter's notes perfectly — because P01-arming is distribution-policy (IR-54/IR-60 tests).
**EG-67.** Evidence-excerpts must be shareable as claims-with-receipts, not as mystery-links — because P08's amplifiers forward *substance*, not suspense (A17/P05-family).
**EG-68.** The privacy-bill for sharing is zero (no trackers on share-jumps) — because link-jumps to surveillance betray the shared and the sharer (N86-sync).
**EG-69.** The story is quotable without permission — because comments-section citation is organic canonization (furniture-law).
**EG-70.** "Send this to your skeptic" is answered by design (the scar + receipts chain), never by copy — because objection-combat is done by artifacts, not by appeals (M6-couriers).

#### EG71–EG80: Audience-specific engagement locks

**EG-71.** P01 finds: identity, abstract, figure, contact-shape, paste-ready lines inside 90s — because her loyalty-event is the painless-forward (P01.23).
**EG-72.** P02 finds: instrument-context + exposure-honesty inside 2 clicks — because his loyalty-event is verification-resistance-futile (P02.23).
**EG-73.** P03 finds: the turn-question + the scar, pre-interview — because her loyalty-event is the interview-confirmation she'll enjoy (P03.23).
**EG-74.** P04 finds: shibboleth-details + forensic-receipts + credit-splits — because her loyalty-event is the public vouch (P04.23).
**EG-75.** P05 finds: clocks + the not-build verdict + engineer voice — because his/her loyalty-event is the squad-fantasy (P05.23).
**EG-76.** P06 finds: altitude-coordinates + the early-warning scene — because that loyalty-event is the mental hiring for next quarter (P06.23).
**EG-77.** P07 finds: discretion-in-action + the forwardable mechanism-page — because that loyalty-event is the un-forwarded message sent (P07.23).
**EG-78.** P08 finds: the 45-second case + the spot-check surviving — because that loyalty-event is the two-word verdict "back it" (P08.23).
**EG-79.** P09 finds: plain Claim + recognition-lines + no-pressure first-conversation — because that loyalty-event is the founder telling three friends by Friday (P09.23).
**EG-80.** P10 finds: clocked-stories + MVA-doctrine + fractional-candor — because that loyalty-event is the same-week call (P10.23).

#### EG81–EG90: Ending-engagement ethics

**EG-81.** Energy at the door must be flat-calm — because terminal-arousal converts the reader into a lead; terminal-calm converts the reader into a client (X.6.4-law).
**EG-82.** Nothing at the door may compete with thinking — because the visitor is doing the most important work of the visit there (FU-architecture law).
**EG-83.** The final-line arrives once and silently settles — because the transfer is a gift only when it isn't a jingle (S86's echo-ban).
**EG-84.** The signature must never be followed by any ask — because the ending's non-commerce is the commerce (R20/N92).
**EG-85.** The rest-state must feel inhabited (pulse extant) — because a hollow room after signature undoes the warmth-bond (FU.10).
**EG-86.** Contact-friction must be ≤ write-and-send — because the conversion-device is the *absence* of obstacles (NR-72/73).
**EG-87.** The furniture may never count visits-in-your-face ("viewer #1042") — because occupancy-counters convert a studio into a store (N-series: counters are funnel-signals).
**EG-88.** Departure must be available visibly *while the door glows* — because freedom-visualized at the myth's apex is the brand saying "your move" twice (XR8-cousin).
**EG-89.** The door-scene must be the most polished *restraint* of the whole build — because endings are where taste goes to be judged (peak-end C2).
**EG-90.** The after-visit follow-up is pro-active-zero: if he replies, he replies as a person first — because the first reply channels everything the experience promised about process (A40-completion).

#### EG91–EG100: Engagement QA and metric-ethics

**EG-91.** Success-metric: completed-argument-class shares (not time-on-site) — because optimizing for dwelling optimizes against the very respect-machines this builds on (P2-doctrine).
**EG-92.** A "poorly-performing" calm-chapter is still correct — because metric-heresy against the quiet parts is how experiences lose their souls (N84-family).
**EG-93.** Only aggregate classes are measured; individuals are deliberately un-measurable — because surveillance-forgiveness is the privacy-covenant (XR35).
**EG-94.** Careful-listening reviews (5-user think-alouds) outrank dashboards per release — because reasons come from mouths, not from charts (E40-practice).
**EG-95.** Fresh-manufactured engagement-loops require the same registry-approval as story-loops — because loop-bureaucracy is how the curiosity-economy stays solvent (§6.3 synced).
**EG-96.** Diminishing-returns review every quarter: which beats aged badly — because beats age; the spine doesn't (C19-audits).
**EG-97.** A drop-off spike is information, never an instruction — because the answer to a leak is diagnosis, not panic-edits (metric-ethics).
**EG-98.** External praise must never be quoted inside the fiction — because the fiction's honor is being applause-free (S46-adjacency).
**EG-99.** User-safe changes month-to-month: returning visitors must never re-pay learning-costs — because interfaces that re-teach punish loyalty (E60).
**EG-100.** Above all: engagement is earned by being *more useful to be inside of than outside of* — because the visitor's alternative to this experience is their own to-do list, and the architecture's job is to make every second here redeem that choice (the economy-of-respect, final form).

---


---

## 10. FAILURE ANALYSIS — 100 WAYS INTERACTIVE PORTFOLIOS DIE, AND HOW PROJECT K SURVIVES EACH

*The autopsy register. FA-01–FA-100, each: the failure as it kills in the market, then Project K's avoidance-mechanism with its law. The avoidance must be architectural (structural, budgeted, enforced), never aspirational ("we'll be careful"). A failure-mode avoided by hope is a failure-mode scheduled.*

### F-A. Threshold deaths (FA-01–FA-10)

**FA-01. The Loading-Screen Confession** — the site admits it can't start by showing a bar. *Avoidance:* first-paint budget ≤1s with the authored pulse *as* the load indicator (ER-1/T0): the story loads its first beat, never its apology.
**FA-02. The Black Void** — darkness mistaken for brokenness, fatal in 0.8s on VPs' phones. *Avoidance:* pulse within ~600ms guaranteed by budget-first doctrine (T0/R-01); identity in tab-title regardless (T5).
**FA-03. The Mystic Overstay** — mystery beyond ~10s converts intrigue into bounce. *Avoidance:* mystery-budget ≤2s unexplained motion plus sequential loop-serialization (S82/K1); the Express lamp burns from second 6 (S8).
**FA-04. The Typing Torture** — slow-reveal text that the first verdict outlives. *Avoidance:* visitor-paced Claim (S3); complete thought per frame (ER-8); fixed-type theatrics banned outright (R-02).
**FA-05. The Muted Felony** — autoplay audio trips policy and context. *Avoidance:* consent-native audio unlocked by the story's own click (T4/S9); silence-primary art doctrine (§3.1).
**FA-06. The Pixel-Overdose** — a first screen so dense photorealism looks like a dashboard. *Avoidance:* first-frame property-cap (one object + ≤2 lines + one mark, IR-11 class).
**FA-07. The Anonymous Wonder** — beauty with no name for its first ten seconds. *Avoidance:* identity mark from frame one (T5/A2); formal signature reserved for curtain — but the quiet mark never absent.
**FA-08. The Cursor Dead-End** — visitors' mice move; nothing answers; they conclude it's a video. *Avoidance:* <100ms reactivity-mandate (S4/ER-3) from the first gesture.
**FA-09. The Desktop Confession** — mobile users discover the experience was built for monitors. *Avoidance:* canonical-context = delayed-flight phone (P08.0); touch/keyboard parity gates (ER-81/ER-6).
**FA-10. The Doppelgänger Door** — an opening that reads like every other 3D-portfolio intro ever graded on Awwwards. *Avoidance:* the world's DNA is truth-bound thought-machinery (S11), not stock visual tropes (N2/N4); the opening's two lines are uniquely his register.

### F-B. Structural deaths (FA-11–FA-22)

**FA-11. The Chapter-Switchboard** — a menu of "projects" converts cinema into CMS. *Avoidance:* conducted traversal with momentum-transitions (S29); portals exist exactly once, informed (S42).
**FA-12. The Infinite Scroll-Sea** — everything on one page; nothing lands. *Avoidance:* chaptered state-graph with borders and troughs (§4/SF-58).
**FA-13. The Tier-Locked Content** — "solve to see my résumé" ransoming information behind play. *Avoidance:* two-lane parity (ER-11–ER-20); effort never gates essentials (SF-6's inverse).
**FA-14. The Orphan Page** — a state with no onward road. *Avoidance:* every node has a legal exit, lint-enforced (NR-91/NR-5).
**FA-15. The Broken Breadcrumb** — wayback that lies about the way back. *Avoidance:* reverse-causality QA (N61/SF-95).
**FA-16. The Premature Reveal** — the engine explained before the worlds; synthesis precedes evidence. *Avoidance:* A31/T3 ordering as build-law (SF-2/SF-9).
**FA-17. The False Freedom** — portals that are required but look optional (order secretly enforced). *Avoidance:* six-order-permutation validity proven in QA (SF-96).
**FA-18. The Hidden Door** — contact discoverable only after the credits. *Avoidance:* real-door ≤2 gestures from anywhere, always (NR-68/A8).
**FA-19. The Tab-Switch Amnesia** — returning to find yourself re-seated at the intro. *Avoidance:* refresh/state-resume to nearest border (ER-23/ER-25).
**FA-20. The Expired Link** — shared URLs rot into 404s. *Avoidance:* URL-permanence + living-redirect law (NR-14/NR-94).
**FA-21. The Checklist IA** — sections exist because portfolios have sections. *Avoidance:* every state's existence justified as permission/comprehension/evidence (§1.3.5, ER-91).
**FA-22. The Depth with No Map** — heavy sub-layers entered without orientation. *Avoidance:* layerized disclosure with provenance labels (IR-21/IR-28).

### F-C. Performance deaths (FA-23–FA-32)

**FA-23. The Hydration Freeze** — interactive-looking page that ignores input for seconds. *Avoidance:* reactivity-first budget; progressive meaning (XR7/ER-76).
**FA-24. The Janky Dive** — the signature membrane stutters mid-ingress. *Avoidance:* dive motion budget-defended (R-59-class for T2); still-twin fallback (E30/ER-21).
**FA-25. The Battery Bonfire** — immersive scene drains 30% in five minutes. *Avoidance:* stillness-scaling and idle-easing (ER-85).
**FA-26. The Data Avalanche** — 200MB of assets for a commute connection. *Avoidance:* meaning-first asset-priority + context-aware delivery (E87/XR46-class).
**FA-27. The Font-Flicker** — text invisible while webfonts negotiate. *Avoidance:* text-first paint; typography-critical path (N88-sync/§5.1 R3).
**FA-28. The Layout Quake** — content jumping as media arrives. *Avoidance:* reserved-space doctrine across states (build-constraint §11 PC-series).
**FA-29. The Memory Leak** — the longer the visit, the slower the world. *Avoidance:* perf-soak audits per build (ER-98-adjacent QA).
**FA-30. The Zoom-Violation** — 200% zoom destroys the scene. *Avoidance:* zoom-parity checks frame-level (XR13/§11).
**FA-31. The Safari Surprise** — WebGL/postFX differences break parity. *Avoidance:* meaning-verification matrix across engines (E-parity).
**FA-32. The One-Device Bias** — tuned on the designer's MacBook, dead in the wild. *Avoidance:* device-class test-matrix with the delayed-flight phone canonical (ER-81/QA-matrix).

### F-D. Content deaths (FA-33–FA-44)

**FA-33. The Claim-with-No-Republic** — big promise, no evidence beneath. *Avoidance:* every claim depth-auditable in one gesture (A9/IR-29).
**FA-34. The Buzzword Salad** — jargon as a proxy for thought. *Avoidance:* banned-register law with build-gates (B39/S79).
**FA-35. The Perfection Parade** — all gold stars; zero fractures. *Avoidance:* mandatory staged scars with system-fixes (S45/A13/XR24).
**FA-36. The Lonely Hero** — team outcomes claimed wholesale as personal. *Avoidance:* contribution-split law (A14/S73).
**FA-37. The Confidentiality Leak** — clients' details left legible enough to sue. *Avoidance:* anonymization architecture + alteration labels (A15/IR-64).
**FA-38. The Number Opera** — metrics without baseline, year, or scope. *Avoidance:* four-field numeral policy (IR-31–IR-37).
**FA-39. The Resume-Reflection** — a LinkedIn pasted into 3D. *Avoidance:* story-priority doctrine; chronology lives only in furniture (SF-63/F8).
**FA-40. The Tool Shrine** — logos of Jira, SQL, Figma as content. *Avoidance:* instrument inventory contextualized at evidence-depth (A10/PR7).
**FA-41. The Stock-Poetry** — frameworks-as-personality ("BABOK-driven synergy"). *Avoidance:* plain-language lead + precision-at-depth (A46/PR32).
**FA-42. The Dateless Graveyard** — presumably-stale content signaling a stale professional. *Avoidance:* freshness-protocol with absolutes (ER-28/A50).
**FA-43. The Index of Emperors** — client logos implying stature without story. *Avoidance:* witness-altitude chorus with roles and turns (S46/P07-family).
**FA-44. The Forward-to-Nowhere** — claims that can't be carried (screenshot-only text). *Avoidance:* copyable-text law (IR-48/E90).

### F-E. Interaction deaths (FA-45–FA-56)

**FA-45. The Mystery-Meat Hover** — clickable objects without affordance or consequence. *Avoidance:* one-gesture universal depth-law + consequence-honesty (ER-78/S92).
**FA-46. The Fitts' Nightmare** — sub-pixel targets on touchscreens. *Avoidance:* one-thumb doctrine (ER-82) with target-floor constraints (§11).
**FA-47. The Click-That-Loads** — every act triggers a load; the floor is lava of spinners. *Avoidance:* intra-state transitions only; loading as backstage (ER-76).
**FA-48. The Slot-Machine World** — everything responds instantly and meaninglessly. *Avoidance:* cooldowns + one-solo-at-a-time (R-18/S16) + truth-bound reactivity (N18).
**FA-49. The Drag-For-Drag's-Sake** — gestural chores measuring activity not understanding. *Avoidance:* effort-must-touch-meaning law (ER-52).
**FA-50. The Unteachable Physics** — mechanics that change per scene with no grammar. *Avoidance:* one-grammar ≤20% dialect (S43/ER-invariants).
**FA-51. The Punishing Wrong-Turn** — wrong guesses cost progress. *Avoidance:* every-path-pays (S33); elimination-is-a-win doctrine.
**FA-52. The Ghosted Keyboard** — tab-order into the void. *Avoidance:* keyboard-first navigation validation (NR-95/XR14).
**FA-53. The Hover-Dependence** — touch users locked out of hover-reveals. *Avoidance:* no hover-only information anywhere (ER-81-corollary).
**FA-54. The Double-Click Doubt** — acts with ambiguous single/dual semantics. *Avoidance:* single-act grammar; no timed-multi inputs (ER-6).
**FA-55. The Gesture-Hijack** — page scrolling stolen mid-visit. *Avoidance:* scroll-sovereignty absolute (B36/SPEC-001 §7.4).
**FA-56. The Dead Replay** — interactive reveals once-then-empty. *Avoidance:* replay keeps full value (ER-60).

### F-F. Motion deaths (FA-57–FA-66)

**FA-57. The Bouncy Castle** — elastic/overshoot easing in a serious register. *Avoidance:* physics-vocabulary frozen: decelerating arrivals, instant reactions (S87/ER-71).
**FA-58. The Slow Parade** — sequential fades hiding same-time-ready content. *Avoidance:* rhythm-notation budgeted (SF-81/ER-sequences); re-pays zero on revisit (N62).
**FA-59. The Nervous World** — perpetual background micro-motion preventing thought. *Avoidance:* weather-speed cap tied to visitor-tempo (E-80) + rest-budgets (SF-58).
**FA-60. The Meaningless Zoom** — camera movement as decoration. *Avoidance:* motion-meaning oath (locked doctrine; ER-93 per transition).
**FA-61. The Parallax Salad** — five layers drifting at five rates. *Avoidance:* physics-consistency law (ER-72): one mass, one world.
**FA-62. The Mid-Silence Stutter** — a fiber of motion inside the verdict-hold. *Avoidance:* stillness budget protected above all other motion (R-59/EG-89).
**FA-63. The Whiplash Cut** — hard cuts where the story needs a breath. *Avoidance:* transition-causality law (SF-31–SF-40): seams carry ideas, not noise.
**FA-64. The Reduced-Motion Joke** — prefers-reduced-motion gets a screenshot error. *Avoidance:* parity four-telling doctrine launch-gated (S94/XR22).
**FA-65. The Inertia Trap** — scroll-linked animation running past content. *Avoidance:* motion glued to state, decoupled from raw scroll-velocity beyond budget (ER-73).
**FA-66. The Loading Limbo Loop** — spinners masquerading as transitions. *Avoidance:* transitions are states with meaning (S88); loaders are dishonest by definition here (FA-01-family).

### F-G. Trust deaths (FA-67–FA-76)

**FA-67. The Fake Intelligence** — scripted "awareness" presented as real responsiveness. *Avoidance:* truth-reactivity (N18/ER-37): the world answers only what it truly tracks.
**FA-68. The Fabricated Testimonial** — first-name-only praise from possibly-invented people. *Avoidance:* witness-provenance law (XR38/S46): permissioned, roled, altitude-marked.
**FA-69. The Inflated Altitude** — "board-level" that was a team-standup. *Avoidance:* altitude-pricing law (PR40/B13) + receipt-able scope coordinates.
**FA-70. The Reverse-Vanity Gap** — claims deeper than their evidence. *Avoidance:* restraint-inflation calibration (A47): claims sit inside evidence, always.
**FA-71. The Glamour-Presumption** — cinematic polish over thin practice. *Avoidance:* content-directive truth-ledger precedes any scene (IR-91); build doesn't decorate what the ledger doesn't hold.
**FA-72. The Date-Mixology** — mingling old wins as if fresh. *Avoidance:* absolute-dating and release-calendar re-verification (IR-93).
**FA-73. The Hidden Paywall** — suddenly: "book a call to see cases." *Avoidance:* all content free; contact is a door not a toll (XR37/N80).
**FA-74. The Terms-of-Urgency** — countdowns, "limited availability," booking-pressure. *Avoidance:* urgency-theater banned (XR20/R20).
**FA-75. The Inconsistent Twin** — site says senior; profile says junior. *Avoidance:* consistency-system governance with audits (A42/A44).
**FA-76. The Ghostwriter Smell** — voice so polished it has no owner. *Avoidance:* single-author register checks (A44/S80); read-aloud rituals.

### F-H. Accessibility deaths (FA-77–FA-84)

**FA-77. The Contrast Suicide** — grey-on-grey typography for mood. *Avoidance:* contrast-floor WCAG AA+ across states (XR15).
**FA-78. The Motion-Sickness Trap** — no escape from parallax/vestibular triggers. *Avoidance:* still-lane launch-parity + vestibular-safe physics (XR22/ER-71).
**FA-79. The Screen-Reader Ghost-Town** — canvas-only content invisible to AT. *Avoidance:* semantic-lane as first-class telling with same loops/order (E18/§3.2).
**FA-80. The Focus-Disappearing Act** — invisible focus indicators. *Avoidance:* focus-visibility design-gate (§11 PC-series).
**FA-81. The Alt-Text Autopsy** — "image" "image" "image". *Avoidance:* authored alt-content as content (IR-49).
**FA-82. The Keyboard Trap** — modals/scenes that swallow focus. *Avoidance:* focus-management per state; traps are sev-1 defects (FA-52-adjacent law).
**FA-83. The Caption Wasteland** — sound-cues without equivalents. *Avoidance:* every audio-informative beat has a visual twin (ER-33).
**FA-84. The 200% Zoom Collapse** — text-size scaling destroys structure. *Avoidance:* zoom-parity per frame (XR13/§11).

### F-I. Pacing and emotional deaths (FA-85–FA-92)

**FA-85. The Awe-Inflation** — peak after peak until awe means nothing. *Avoidance:* one-peak-per-act rationing + silence-clap ledger (S89/M1/SF-52).
**FA-86. The Sagging Middle** — chapter 3 of 6 with no wins. *Avoidance:* mid-chapter small-win law (EG-9); loop-closure cadence audits (§6.3).
**FA-87. The Never-Exhale** — density without troughs until the visitor leaves tired. *Avoidance:* corridor/trough budgets as build-contracts (Si-4/SF-58).
**FA-88. The Sentiment Testimonial-Moment** — manufactured warmth at scale. *Avoidance:* sincerity-in-place doctrine (E63-class; stage-honesty of scars, not sentiment of them).
**FA-89. The Anti-Climax Ending** — a form after a symphony. *Avoidance:* ending-thumbprint doctrine (MA-11/MA-12 + decrescendo as architecture, §4.1 #14).
**FA-90. The Hurry-Signal World** — ambient motion that reads as impatience. *Avoidance:* weather-versus-tempo law (ER-80); no clocks on stage (N68).
**FA-91. The Curiosity Famine** — fifteen minutes with no question alive. *Avoidance:* anti-starvation interlock (K4/§6.3 i) — zero-pressure states are QA-defects outside sanctioned stillnesses.
**FA-92. The Mystery Flood** — seven questions alive and no map. *Avoidance:* serialization + single-surprise budgets (S82/K1; §6-loop registry).

### F-J. Conversion and reception deaths (FA-93–FA-100)

**FA-93. The Unforwardable Wonder** — a thing no one can describe to a colleague. *Avoidance:* quotable-anchors law (S99/E90/MA-system).
**FA-94. The Form-Wall Finish** — twelve fields after the standing ovation. *Avoidance:* contact as named-door + described first conversation (NR-72–NR-74).
**FA-95. The Reply-That-Never** — an unanswered contact form. *Avoidance:* response-expectation published and kept (A40/EG-90).
**FA-96. The Recipient-Hostile Share** — links that leak trackers or demand logins. *Avoidance:* zero-friction shares with privacy parity (EG-68).
**FA-97. The Recruiter-Unfriendly Frame** — no facts available for paste-forward. *Avoidance:* abstract-system engineered for the paste (IR-51–IR-60).
**FA-98. The Print-Disaster** — printing the site produces modern art. *Avoidance:* print-CSS as deliverable (IR-87/XR28).
**FA-99. The Untestable Legend** — the story is unquotable in interviews ("so… it was a brain?"). *Avoidance:* the sanctioned public description is authored and frozen ("an interactive experience of how a Business Analyst thinks") (N85/S80).
**FA-100. The Lonely Victory** — a beautiful site that satisfies its maker and plates no client. *Avoidance:* every law above exists because the audience-models — P01–P10 — are the architecture's customers, not its critics (SPEC-002 X.10 final-law; this document's §0.1). The last defense is the walk of ten personas through every build (ER-94). If the architecture pleases *them* and displeases tourism, it is correct.

---

## 11. PRODUCTION CONSTRAINTS

*Mandatory architectural constraints for every subsequent visual, typographic, motion, and implementation decision. These are structural laws — the beam-dimensions every future creative act must fit through. PC-01–PC-50. Each states: the constraint, the mechanism of enforcement, and the reason.*

**PC-01. State-graph completeness before pixels.** The directed state-graph (nodes = states, edges = legal transitions with exit-conditions) must be signed-off complete before any visual exploration. *Enforcement:* the graph-linter artifact (NR-99 paper-test). *Reason:* so that beauty never has to solve structure retroactively.
**PC-02. Four-lane parity contract up front.** Every chapter delivers Cinematic, Stills, Express, Semantic specifications simultaneously. *Enforcement:* lane-parity diff-reviews (ER-99); launch gate (S94). *Reason:* parity after-the-fact is exclusion-after-the-fact.
**PC-03. Depth-stack per claim: portal → abstract → narrative → evidence.** No claim ships without all four resolvable in one gesture. *Enforcement:* claim-ledger QA (IR-69). *Reason:* the trust-stack is architecture, not copy.
**PC-04. Reading-budget ceilings per state.** Claim ≤15 words; beat ≤40; abstract 4 lines; view = one namable idea. *Enforcement:* editorial gatekeeping per frame (E91/IR-12). *Reason:* the well-set word is the hero, and heroes don't share stages with clutter.
**PC-05. Typography-before-richness proof.** Every state must function as text-on-paper before any scenic enhancement. *Enforcement:* E90 context-collapse test in QA. *Reason:* meaning was assigned to words by doctrine (locked: typography is the hero).
**PC-06. Motion-meaning signature on every moving element.** Each animation carries a one-line meaning-justification. *Enforcement:* motion-reviews rejecting unsigned motion (ER-93/SPEC-001 P5). *Reason:* no exception to motion-supports-meaning.
**PC-07. Interaction-purpose signature on every interaction.** Each carries: act → consequence → meaning. *Enforcement:* same ritual as PC-06 (E41/SF family). *Reason:* every interaction must have purpose (locked).
**PC-08. Intensity-curve ceilings per chapter.** §4/§6 numeric envelopes are unbreachable; silence-claps rationed. *Enforcement:* curve-audit per build (SF-59). *Reason:* the shape of the story's loudness is architecture.
**PC-09. Trough/corridor budgets are non-compressible.** ≥3s door-recovery wherever marked. *Enforcement:* time-budget audit (ER-98). *Reason:* rest is structure; compressed rest is fatigue designed in.
**PC-10. One solo-voice at a time.** At any frame, one authored performance; everything else breathes. *Enforcement:* frame-focus reviews (the solo-voice law; see EG-7). *Reason:* serial attention is a physics constraint of the human nervous system.
**PC-11. The pulse is architecturally sacred.** Its rest-rate and easing are fixed constants used at ignition, verdict-idle, and rest-state only. *Enforcement:* pulse-audit (ER-77). *Reason:* the leitmotif is load-bearing (Se-8).
**PC-12. Numerals: four-field completeness or removal.** *Enforcement:* figure-audits (IR-31–IR-40). *Reason:* testimony or silence.
**PC-13. Content-directive truth-ledger precedes scenes.** Any scene whose content lacks ledger-truth is un-buildable. *Enforcement:* content-preflight (IR-91). *Reason:* honesty is upstream of theater.
**PC-14. Scar-staging positions are reserved in the world's frame-architecture** (not appendable). *Enforcement:* world-template checks (S45/XR24). *Reason:* candor's position is its meaning.
**PC-15. Loop-registry integration.** Every curiosity-loop object lives in the build with explicit open/close states. *Enforcement:* §6.3 interlocks as CI-checks. *Reason:* curiosity is managed capital.
**PC-16. No-chrome zone.** Inside fiction: no HUD, no counters, no badges, no sticky-elements; wayfinding disclosure-only (NR-2). *Enforcement:* visual-inspection gates (E79). *Reason:* the proscenium must hold.
**PC-17. Consent-architecture for all senses.** Audio/haptics/analytics are gesture-consented, one-gesture revocable. *Enforcement:* consent-flow QA (ER-50/NR-family). *Reason:* consent-by-design is dignity-in-code.
**PC-18. Real-door specification is final-copy-gated.** Contact-layer promises written after content-final. *Enforcement:* release-checklist (NR-75). *Reason:* promises must describe reality as built.
**PC-19. Viewport-and-input matrix.** 6" phone through desktop; touch, pointer, keyboard, AT-traversal proven. *Enforcement:* device-lab QA (ER-81/FA-32). *Reason:* the delayed-flight phone is canonical.
**PC-20. Zoom-and-textscale parity to 200%.** *Enforcement:* per-frame checks (XR13). *Reason:* enlargement is a reading mode, not an edge case.
**PC-21. Network-degradation ladder.** Meaning-first order of arrival defined per state; richness lazily appended. *Enforcement:* throttle-profiles in QA (E87/XR46). *Reason:* courtesy under constraint is brand.
**PC-22. Offline-contact resilience.** Contact + abstract function without live network where feasible. *Enforcement:* offline-drill (E87's pair). *Reason:* tunnels exist; courtesy doesn't end at signal loss.
**PC-23. Freeze-frames registered.** Every chapter names its parity stills with alt-states. *Enforcement:* lane-diff (ER-99). *Reason:* the stillness clause industrialized.
**PC-24. Ambient-reset contract.** Every state defines its "return-to-calm" behavior at idle/departure. *Enforcement:* state-QA (ER-30). *Reason:* recovery is part of the room's furniture.
**PC-25. Copy-locks.** Claim, couplet, signature, destination-line are frozen post-approval; any change requires a formal amendment to this document. *Enforcement:* freeze-registry (S80). *Reason:* retell-units compound as cultural assets; mutation destroys compound interest.
**PC-26. Honesty-in-friction-derivation.** No element may exist to slow the visitor down deliberately. *Enforcement:* friction-audit (PC-06/07's inverse). *Reason:* slowness here is earned by content, never engineered as a tar-pit.
**PC-27. Plausibility-of-dates in worlds.** Every world's internal calendar must be internally consistent. *Enforcement:* world-QA (IR-64-adjacent). *Reason:* forensic visitors assemble timelines; contradictions read as fiction where record was promised.
**PC-28. The braid's honesty-dependency.** Braid generation may only consume verified world-completions. *Enforcement:* T8-data-checks (NR-50). *Reason:* a false braid is the gestalt-moment lying.
**PC-29. The door's physics-of-warmth only.** Proximity may warm; nothing may open, crack, seam. *Enforcement:* door-QA (N91/S67). *Reason:* Ω's license.
**PC-30. The real door's permanence.** No A/B variants on contact-integrity items (channels shown, certainty-text, response-promise). *Enforcement:* N84-family tests out-of-scope for personal-integrity elements. *Reason:* some things are identity, not inventory.
**PC-31. Silence-clap spacings.** ≥1 chapter distance between any two full-motion suspensions. *Enforcement:* curve-audit (S89/SF-60). *Reason:* silence is the loudest material; inflation kills it.
**PC-32. Weather-speed cap.** Ambient motion never exceeds the visitor's demonstrated tempo. *Enforcement:* tempo-model checks (ER-80). *Reason:* the world may never say hurry.
**PC-33. Single grammar + bounded dialects.** Core interactions fixed across the journey; per-world variance ≤20% and Pre-taught-once. *Enforcement:* learnability-tests (S43). *Reason:* re-teaching is attention-tax collected by the wrong government.
**PC-34. Content-inventory ceilings.** Exactly: 7 chapters, 3 worlds, 1 engine, 1 constellation, 1 door, 1 real door. *Enforcement:* count-audit (S41-class). *Reason:* sprawl is the filing-cabinet dreaming of return.
**PC-35. Performance budgets as build-gates.** First-paint ≤1s reference-device; sustained-interaction smoothness targets per device-class. *Enforcement:* CI-perf budgets (ER-1/ER-98). *Reason:* speed is respect measured in the currency of seconds.
**PC-36. Asset-critical-path: text and pulse travel first, always.** *Enforcement:* waterfall-audits (FA-27). *Reason:* the meaning of the page must never wait for the decoration of the page.
**PC-37. Altitude-tags are editorially enforced on every case-object.** Scope-coordinates required before publish. *Enforcement:* editor gate (PR40/A5). *Reason:* altitude-pricing is the senior audience's first read.
**PC-38. Witness-quote lifecycle management.** Permission-state, attribution-form, expiry, altitude-tag on file per quote. *Enforcement:* quote-registry (XR38). *Reason:* borrowed voices must be traceable forever.
**PC-39. Anonymization alteration-labels mandatory** (what was fuzzed, by class). *Enforcement:* evidence QA (IR-64). *Reason:* modification-disclosure is the anonymization's truth-packet.
**PC-40. Freshness dates visible where content-time may mislead** ("updated 2026"). *Enforcement:* A50 calendar-rituals with publication-logs. *Reason:* currency is trust's carbon-dating.
**PC-41. External-link registry with destination-honest labels.** *Enforcement:* link-audit (XR49/NR-78). *Reason:* the truth-system ends at the browser edge, never before.
**PC-42. Print-deliverable maintained** (abstract-chain + contact, professional pagination). *Enforcement:* print-QA per release (IR-87). *Reason:* the gatekeeper's filing-cabinet is prime real estate.
**PC-43. Translation-gate for couplet/claim.** Native-speaker review per market before publication. *Enforcement:* localization-checklist (N87/IR-97). *Reason:* the sentence must survive being loved in another language.
**PC-44. Changelog-as-furniture.** A discreet dated-changelog exists in the archive. *Enforcement:* archive-QA (NR-64). *Reason:* visible maintenance is quietly persuasive evidence-life.
**PC-45. Chosen-one-thing audits.** Quarterly: what did we add; what did we remove of equal weight. *Enforcement:* editorial-governance ritual (SPEC-001 P8). *Reason:* restraint decays without ceremony.
**PC-46. Incident-reversion doctrine.** Any launch-defect in S/N-critical systems (stillness, pulse, claim, door) reverts to still-lane first, then fixes. *Enforcement:* release-runbook (E30). *Reason:* the brand never ships visible panic.
**PC-47. Persona-walkthrough CI.** Ten persona scripts must pass against staging before any release. *Enforcement:* ER-94 industrialized. *Reason:* the audience is the QA team's permanent staff.
**PC-48. Documentation-provenance.** Any future spec must cite the sections of this document it implements or amends. *Enforcement:* spec-governance (§0.2). *Reason:* architecture decays when its laws stop being findable by the people breaking them.
**PC-49. Singular-owner-of-truth rule.** When this document and a future preference conflict, this document wins until amended with evidence. *Enforcement:* same ritual as all prior constitutions. *Reason:* preference has tenure; law has authority.
**PC-50. Above all: no element may exist that a tired, busy, skeptical stranger would experience as an obstacle between them and the truth.** *Enforcement:* every QA ritual ends with the same question. *Reason:* everything in this document is a footnote to this sentence.

---

## 12. VERIFICATION PROTOCOL — THE ARCHITECTURE AGAINST ITSELF

**V1. Lock-fidelity (three specs).** Every architectural claim traces to a locked decision or carries its own justification: identity (PR1/T5), chapter order and shapes (SPEC-003, untouched), typography-hero (locked, received as PC-05), motion-meaning (locked → PC-06), interaction-purpose (locked → PC-07), developer-branding explicit-and-absent (F10-adjacency audited across PC-set). FA-and-PC items recite parent-laws where they inherit (S#/N#/A#/XR#/ER#), avoiding shadow-contradiction.
**V2. Non-repetition audit against SPEC-001–003.** Rules overlapping SPEC-003's S/N domains were reframed as *architectural* (structure, budget, traversal) rather than narrative; e.g., S82's mystery-budget becomes ER/NR machinery; scar-doctrine (SPEC-003 §2) becomes PC-14's frame-reservation. Where inheritance was total, the item was cut from this document.
**V3. Fantasy-rejection log.** Rejected during drafting: (a) *a third "deep-dive" lane* — rejected: lane-multiplicity taxes the two-lane covenant; the evidence-layer already carries the deep promise (IR-21); (b) *scroll-progress bar as orientation* — rejected: chrome-in-fiction (PC-16) and progress-in-numbers is game-thinking (ER-59); (c) *personalized entry per persona* ("for recruiters/for founders") — rejected: segments-the-visitor, violates one-character-ten-resolutions (SPEC-002 X.10); the informed-portal and layered depths already solve differentiation; (d) *persistent constellation mini-map* — rejected: furniture-in-fiction (PC-16); orientation is dramaturgical (NR-1); (e) *a completion-page "journey summary"* — rejected: encores tax the fade (N93); the rest-state already remembers structure.
**V4. Internal contradiction sweep.** Lane-doctrines reconciled with fiction-doctrines explicitly (NR-6/7/70/71 pairs); silence-doctrine reconciled with accessibility doctrine (SF-49: silence is *translatable*); speed-laws reconciled with awe-laws (PC-35 vs PC-09 via meaning-first waterfall, PC-36); loop-abundance reconciled with comprehension (K1 serialization + registry-caps).
**V5. Audience regression.** All ten SPEC-002 personas re-walked against the final rule-set for satisfaction of their §SPEC-002 loyalty-events (EG-71–EG-80). Zero regressions; the keystone (Stage-5) was validated as non-bypassable for the fast tiers via the lane-system's respect (ER-14/15).
**V6. Consistency-of-numbers.** Duration-envelopes, load-scales, distance-metrics (gestures-counts), and ratio-codes (≤20% dialect) cross-checked for family-consistency; nine legacy numbers from SPEC-003 (1.5–2s, 3–6s, 45–60s, 12–20 min, etc.) verified unchanged.

---

## 13. DOCUMENT CONTROL

**Title:** Experience Architecture Bible — Project K, SPEC-004
**Version:** 1.0
**Status:** Binding structural law for all visual, typographic, motion, and implementation work; may only be amended by evidence-backed amendment, preference-proof (PC-49)
**Built-upon:** SPEC-001 Creative Vision v1.0 · SPEC-002 Audience Intelligence v1.0 · SPEC-003 Locked Story Bible v1.0 — zero contradictions; inheritance cited at every bench
**Governs:** traversal structure, time, load, orientation, lanes, disclosure, flow-integrity, failure-prevention, and all architectural QA gates

> *The story gives the journey its soul. This document gives the journey its skeleton and its clocks. What remains — how its face looks — is now the only freedom left, and it is a large one. Any face that moves honestly over this skeleton will be recognized as Keshav's. That is the point of building the skeleton first.*

**— End of SPEC-004**
