import { EMBER_ANSWER, FUTURE_BEATS } from './future-content';

/**
 * The Future as a document (SCENE-007 stills/express/semantic and
 * reduced-motion tellings): the same five beats, the same final words,
 * the same closing answer. Typography was always the hero of this
 * chapter — the document needs no translation, only the words.
 */
export function FutureStatic() {
  return (
    <section
      aria-label="The future — the final chapter"
      className="flex w-full flex-col items-center gap-section-y px-gutter py-section-y text-center"
    >
      {FUTURE_BEATS.map((beat, i) => (
        <div key={beat.threshold} className="flex max-w-narrow flex-col items-center gap-3">
          {beat.lines.map((line, j) => (
            <p
              key={line}
              className={
                i === FUTURE_BEATS.length - 1 && j === 0
                  ? 'font-display text-display-lg text-paper-100'
                  : beat.scale === 'display-lg'
                    ? 'font-display text-display-lg text-paper-100'
                    : beat.scale === 'display-md'
                      ? 'font-display text-display-md text-paper-100'
                      : 'font-display text-headline text-paper-100/70'
              }
            >
              {line}
            </p>
          ))}
        </div>
      ))}

      <p className="text-caption uppercase tracking-[0.18em] text-paper-100/45">{EMBER_ANSWER}</p>
    </section>
  );
}
