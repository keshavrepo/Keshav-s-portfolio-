/**
 * The heartbeat (SPEC-003, Opening) in its cheapest possible host: pure CSS,
 * so it renders on the semantic floor with zero JavaScript and is part of
 * the first paint (ER-1). `.motion-gated` lets the reduced-motion policy and
 * the lane system quiet it into a static ember (ARCHITECTURE §18).
 */
export function Pulse() {
  return (
    <div className="relative grid size-28 place-items-center" aria-hidden="true">
      <div className="motion-gated absolute inset-0 animate-pulse-halo rounded-full bg-ember-400/25 blur-xl" />
      <div className="motion-gated size-3.5 animate-pulse-core rounded-full bg-gradient-to-br from-ember-200 to-ember-500 shadow-[0_0_54px_18px_rgba(235,169,120,0.32)]" />
    </div>
  );
}
