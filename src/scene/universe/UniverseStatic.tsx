'use client';

import {
  BUSINESS_EDGES,
  BUSINESS_ENTITIES,
  TIER_NAMES,
  UNIVERSE_CAPTION_1,
  UNIVERSE_CAPTION_2,
  describeChain,
  getEntity,
} from './universe-content';

/**
 * The Business Universe as a document (SCENE-004 stills/express/semantic
 * and reduced-motion tellings): every system, every relationship, every
 * downstream chain — identical content to the cinematic world, told in
 * typography. Cause and effect are named with their verbs, so the systems
 * lesson survives without a single pixel of the canvas.
 */
export function UniverseStatic() {
  return (
    <section
      aria-label="The business universe — one living system of eleven connected parts"
      className="flex w-full flex-col items-center gap-section-y px-gutter py-section-y"
    >
      <div className="flex max-w-measure flex-col items-center gap-measure-gap text-center">
        <p className="font-display text-display-md text-paper-100">{UNIVERSE_CAPTION_1}</p>
        <p className="font-display text-headline text-paper-100/60">{UNIVERSE_CAPTION_2}</p>
        <p className="text-body-sm text-paper-100/70">
          Eleven systems, three tiers of hierarchy, fifteen cause-and-effect relationships. Change
          one, and the change travels — that is the whole lesson.
        </p>
      </div>

      {[0, 1, 2].map((tier) => (
        <div key={tier} className="flex w-full max-w-measure flex-col gap-4">
          <h3 className="text-eyebrow uppercase text-paper-100/40">
            {TIER_NAMES[tier as 0 | 1 | 2]}
          </h3>
          <ul className="flex w-full flex-col gap-4">
            {BUSINESS_ENTITIES.filter((entity) => entity.tier === tier).map((entity) => {
              const relationships = BUSINESS_EDGES.filter(
                (edge) => edge.from === entity.id || edge.to === entity.id,
              );
              return (
                <li key={entity.id} id={`entity-${entity.id}`}>
                  <details className="group rounded-xl border border-paper-100/10 bg-ink-900/50 px-5 py-4 open:border-ember-600/40">
                    <summary className="flex min-h-[44px] cursor-pointer list-none items-baseline justify-between gap-4">
                      <span className="text-body font-medium text-paper-100">{entity.title}</span>
                      <span className="text-right text-body-sm text-paper-100/50 group-open:hidden">
                        {entity.whisper}
                      </span>
                      <span className="sr-only">Isolate this system</span>
                    </summary>

                    <div className="flex flex-col gap-3 pb-1 pt-2">
                      <p className="text-body-sm text-paper-100/80">{entity.line}</p>
                      <p className="text-body-sm text-paper-100/70">{entity.reasoning}</p>

                      <ul className="flex flex-col gap-1 text-body-sm text-paper-100/70">
                        {relationships.map((edge) => (
                          <li key={`${edge.from}-${edge.to}`}>
                            {edge.from === entity.id ? (
                              <>
                                <strong className="text-paper-100">{entity.title}</strong>{' '}
                                <span className="text-ember-300/90">{edge.verb}</span>{' '}
                                <strong className="text-paper-100">
                                  {getEntity(edge.to).title}
                                </strong>
                              </>
                            ) : (
                              <>
                                <strong className="text-paper-100">
                                  {getEntity(edge.from).title}
                                </strong>{' '}
                                <span className="text-ember-300/90">{edge.verb}</span>{' '}
                                <strong className="text-paper-100">{entity.title}</strong>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>

                      <p className="text-caption text-ember-300/80">{describeChain(entity.id)}</p>
                    </div>
                  </details>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <p className="text-eyebrow uppercase text-paper-100/40">
        The universe is alive · the decision engine waits in the next chapter
      </p>
    </section>
  );
}
