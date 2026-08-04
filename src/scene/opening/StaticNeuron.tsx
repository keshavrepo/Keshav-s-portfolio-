/**
 * The static neuron (SCENE-001): the stills-lane and loading-state rendering
 * of the organism — same ember heart, hand-drawn corona, zero GPU. Rendered
 * while the WebGL bundle arrives on slow networks, as the fallback if the
 * context dies, and as the resting ember of the afterglow.
 */
export function StaticNeuron() {
  const rays = [0, 32, 71, 108, 151, 203, 246, 289, 318];
  return (
    <div
      className="pointer-events-none absolute inset-0 grid place-items-center"
      aria-hidden="true"
    >
      <div className="relative grid size-40 place-items-center">
        {rays.map((degrees) => (
          <span
            key={degrees}
            className="absolute block h-16 w-px origin-center bg-gradient-to-t from-ember-400/0 via-ember-300/25 to-ember-200/35"
            style={{ transform: `rotate(${degrees}deg) translateY(-2.9rem)` }}
          />
        ))}
        <span className="motion-gated absolute inset-0 animate-pulse-halo rounded-full bg-ember-400/25 blur-xl" />
        <span className="motion-gated size-3.5 animate-pulse-core rounded-full bg-gradient-to-br from-ember-200 to-ember-500 shadow-[0_0_54px_18px_rgba(235,169,120,0.32)]" />
      </div>
    </div>
  );
}
