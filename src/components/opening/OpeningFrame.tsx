import { Text } from '@/components/text/Text';
import { site } from '@/core/config/site';
import { motionDurations } from '@/design-system/tokens';

import { Pulse } from './Pulse';

/**
 * The Opening's first-light frame (SPEC-003 OP beats, ARCHITECTURE §8
 * consequence law): the authored pulse in the threshold dark, then the two
 * locked Claim lines, then the quiet identity mark — sequenced with the
 * suspense envelope (1500–2000ms). A screen-reader visitor receives the
 * composed frame with visual parity, not absence.
 *
 * The dive gesture is deliberately absent: it ships when its destination
 * exists. This frame contains zero dead affordances.
 */
export function OpeningFrame() {
  const lineOne = motionDurations.suspense;
  const lineTwo = lineOne + 1000;
  const identity = lineTwo + 1200;

  return (
    <section
      aria-label={`${site.owner} — ${site.role}`}
      className="flex flex-1 flex-col items-center justify-center gap-10 px-gutter pb-section-y text-center"
    >
      <p className="sr-only">
        A single warm pulse breathes in the dark, like a heartbeat. The words: {site.claimLine1}{' '}
        {site.claimLine2}
      </p>
      <Pulse />
      <div className="flex flex-col items-center gap-measure-gap">
        <Text
          as="h1"
          variant="claim"
          className="enter-staggered max-w-narrow animate-enter-rise text-paper-100"
          style={{ animationDelay: `${lineOne}ms` }}
        >
          {site.claimLine1}
        </Text>
        <Text
          as="p"
          variant="display"
          className="enter-staggered max-w-narrow animate-enter-rise text-paper-100/70"
          style={{ animationDelay: `${lineTwo}ms` }}
        >
          {site.claimLine2}
        </Text>
      </div>
      <Text
        variant="eyebrow"
        className="enter-staggered animate-enter-rise pt-6 text-paper-100/50"
        style={{ animationDelay: `${identity}ms` }}
      >
        {site.owner} — {site.role}
      </Text>
    </section>
  );
}
