'use client';

import { useRef, type ReactNode } from 'react';

import { KineticText, type KineticTextHandle, type KineticTextProps } from './KineticText';
import { ScrollProgress } from './ScrollProgress';

/**
 * ScrollType — scroll-driven typography, composed.
 *
 * A ScrollProgress channel feeds a progressive KineticText: each word
 * (or line, or letter) crosses as the visitor's own scroll crosses its
 * share of the traverse. The typography is scrubbed by the reader's
 * hand — direct manipulation, so the stagger delay is off and reverse
 * travel un-reveals honestly (§9.ii).
 *
 * Axis law (V-M35/M36): font-axis wobble and animated tracking are NOT
 * what this primitive does — the scroll moves presence (opacity/rise),
 * never the letterforms. Display type stays a set voice.
 */

export interface ScrollTypeProps {
  text: string;
  mode?: KineticTextProps['mode'];
  reveal?: KineticTextProps['reveal'];
  as?: KineticTextProps['as'];
  className?: string;
  /** Classes for the text element itself (the voice). */
  textClassName?: string;
  /** Trailing content after the text inside the same channel. */
  children?: ReactNode;
}

export function ScrollType({
  text,
  mode = 'words',
  reveal = 'mask',
  as = 'span',
  className,
  textClassName,
  children,
}: ScrollTypeProps): JSX.Element {
  const textRef = useRef<KineticTextHandle>(null);

  return (
    <ScrollProgress className={className} onFrame={(p) => textRef.current?.setProgress(p)}>
      <KineticText
        ref={textRef}
        text={text}
        mode={mode}
        reveal={reveal}
        drive="progress"
        as={as}
        className={textClassName}
      />
      {children}
    </ScrollProgress>
  );
}
