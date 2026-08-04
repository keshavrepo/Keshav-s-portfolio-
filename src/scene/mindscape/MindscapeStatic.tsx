import {
  MIND_NODES,
  MIND_PATHS,
  VISTA_CAPTION_1,
  VISTA_CAPTION_2,
  getMindNode,
} from './mindscape-content';

/**
 * The mind world without a GPU (SCENE-002 stills/express/semantic lanes):
 * one authored SVG holds the constellation — same positions, same paths,
 * same content, generated from the same source of truth — and every
 * thought is reachable as a native disclosure (works with touch, keyboard,
 * screen reader, and even with only CSS). Parity, not a poster.
 */

const SVG_W = 1000;
const SVG_H = 620;

function toSvg([x, y, z]: [number, number, number]): [number, number] {
  // The authored world spans x:-8..8, z:-19..2 — depth reads as scale.
  const depth = (2 - z) / 21; // 0 near … 1 far
  const sx = SVG_W / 2 + x * (34 - depth * 12);
  const sy = 90 + (2.8 - y) * 34 + depth * 260;
  return [sx, sy];
}

function nodeRadius(z: number): number {
  const depth = (2 - z) / 21;
  return 7 - depth * 3.4;
}

export function MindscapeStatic() {
  return (
    <section
      aria-label="Inside my mind — how a Business Analyst thinks"
      className="flex flex-col items-center gap-section-y px-gutter py-section-y"
    >
      <div className="flex max-w-measure flex-col items-center gap-measure-gap text-center">
        <p className="font-display text-display-md text-paper-100">{VISTA_CAPTION_1}</p>
        <p className="font-display text-headline text-paper-100/60">{VISTA_CAPTION_2}</p>
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        role="img"
        aria-label="A constellation of nine connected ideas of analytical thinking"
        className="w-full max-w-3xl"
      >
        {MIND_PATHS.map((path) => {
          const [x1, y1] = toSvg(getMindNode(path.from).position);
          const [x2, y2] = toSvg(getMindNode(path.to).position);
          const my = (y1 + y2) / 2 - 18;
          return (
            <path
              key={`${path.from}-${path.to}`}
              d={`M ${x1.toFixed(1)} ${y1.toFixed(1)} Q ${((x1 + x2) / 2).toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`}
              fill="none"
              stroke="#EBA978"
              strokeOpacity="0.22"
              strokeWidth="1"
            />
          );
        })}
        {MIND_NODES.map((node) => {
          const [cx, cy] = toSvg(node.position);
          const r = nodeRadius(node.position[2]);
          return (
            <g key={node.id}>
              <circle
                cx={cx}
                cy={cy}
                r={r * 2.6}
                fill="#EBA978"
                opacity="0.08"
                className="motion-gated animate-pulse-core"
              />
              <circle cx={cx} cy={cy} r={r} fill="#F2C7A4" opacity="0.9" />
              <text
                x={cx}
                y={cy + r + 18}
                textAnchor="middle"
                fill="#F3EDE2"
                opacity="0.55"
                fontSize="13"
                letterSpacing="0.08em"
              >
                {node.title}
              </text>
            </g>
          );
        })}
      </svg>

      <ol className="flex w-full max-w-measure flex-col gap-4">
        {MIND_NODES.map((node) => (
          <li key={node.id}>
            <details className="group rounded-xl border border-paper-100/10 bg-ink-900/50 px-5 py-4 open:border-ember-600/40">
              <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-body font-medium text-paper-100">{node.title}</span>
                <span className="text-body-sm text-paper-100/60 group-open:hidden">
                  {node.whisper}
                </span>
                <span className="sr-only">Expand the thought</span>
              </summary>
              <p className="pb-1 pt-2 text-body-sm leading-relaxed text-paper-100/75">
                {node.thought}
              </p>
            </details>
          </li>
        ))}
      </ol>

      <p className="text-eyebrow uppercase text-paper-100/40">
        Scroll to keep reading · the cinematic telling runs on capable devices
      </p>
    </section>
  );
}
