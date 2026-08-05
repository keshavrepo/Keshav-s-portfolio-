/**
 * The V2 cinematic layer (SPRINT 2) — reusable motion primitives.
 * Every export is production-ready, gated (html[data-js], data-motion),
 * render-free on the frame path, and honest on the semantic floor.
 * Scenes adopt these in their re-skin sprints (PR-03 → PR-09).
 */
export { useScrollChannel } from './use-scroll-channel';
export type { ScrollChannel, ScrollChannelMode } from './use-scroll-channel';
export { ScrollProgress } from './ScrollProgress';
export type { ScrollProgressProps } from './ScrollProgress';
export { Pin } from './Pin';
export type { PinProps } from './Pin';
export { DepthField, DepthLayer } from './DepthField';
export type { DepthFieldProps, DepthLayerProps } from './DepthField';
export { BlurReveal, CascadeReveal, MaskReveal, Reveal, Step } from './Reveal';
export type { RevealMove, RevealProps } from './Reveal';
export { DrawLine } from './DrawLine';
export type { DrawLineProps } from './DrawLine';
export { CharacterReveal, KineticText, MaskedText, SplitLines, WordReveal } from './KineticText';
export type {
  KineticDrive,
  KineticMode,
  KineticReveal,
  KineticTextHandle,
  KineticTextProps,
} from './KineticText';
export { TextReplace } from './TextReplace';
export type { TextReplaceHandle, TextReplaceProps } from './TextReplace';
export { ScrollType } from './ScrollType';
export type { ScrollTypeProps } from './ScrollType';
export { Beat, Choreo } from './Choreography';
export type { BeatProps, ChoreoProps } from './Choreography';
export { StickyStory } from './StickyStory';
export { Veil } from './Veil';
export type { VeilHandle } from './Veil';
export { ReadyGate, useDocumentReady } from './ReadyGate';
export { Door } from './Door';
export type { DoorProps } from './Door';
export { LinkLine } from './LinkLine';
export type { LinkLineProps } from './LinkLine';
