import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { site } from '@/core/config/site';
import { colorTokens } from '@/design-system/tokens';

/**
 * The social card (SPRINT 3): the one hero the outside world meets before
 * the site loads — it must read as a Business Analyst, never as a React
 * demo. Typography-led by law: the claim in the Statement voice, the
 * role in the Analyst voice, the ember as the single warm signal (the
 * one-ember law travels to the card).
 *
 * Canvas geometry is the card's own spec (1200×630 social standard);
 * every color comes from the house tokens, face data from the hermetic
 * self-hosted files — no CDN fetch at build or run time (ARCHITECTURE
 * §12 travels here too).
 */

/** Social canvas (Open Graph / summary_large_image standard). */
export const OG_SIZE = { width: 1200, height: 630 } as const;

const PAD = 80;

export async function loadCardFonts(): Promise<
  Array<{ name: string; data: Buffer; weight: 400 | 500 | 600; style: 'normal' }>
> {
  const fontsDir = join(process.cwd(), 'src/design-system/fonts');
  /* Static default-cut TTF instances (scripts/sync-fonts.mjs — Satori
     cannot parse woff2; instances match the site's default cut). */
  const [fraunces, inter] = await Promise.all([
    readFile(join(fontsDir, 'fraunces-card.ttf')),
    readFile(join(fontsDir, 'inter-card.ttf')),
  ]);
  return [
    { name: 'Fraunces', data: fraunces, weight: 500, style: 'normal' },
    { name: 'Inter', data: inter, weight: 400, style: 'normal' },
    { name: 'Inter', data: inter, weight: 600, style: 'normal' },
  ];
}

/** The card itself — one column: identity, claim, proof. */
export function CardMarkup(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: PAD,
        backgroundColor: colorTokens.paper['50'],
        color: colorTokens.ink['900'],
        fontFamily: 'Inter',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: colorTokens.ink['600'],
        }}
      >
        <div style={{ display: 'flex' }}>
          {site.owner} — {site.role}
        </div>
        {/* The pulse, grown into furniture: one warm signal top-right. */}
        <div
          style={{
            display: 'flex',
            width: 18,
            height: 18,
            borderRadius: 9999,
            backgroundColor: colorTokens.ember['500'],
            boxShadow: `0 0 0 10px ${colorTokens.ember['200']}`,
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Fraunces',
            fontWeight: 500,
            fontSize: 88,
            lineHeight: 1.02,
            letterSpacing: '-0.03em',
          }}
        >
          {site.claimLine1}
        </div>
        <div style={{ display: 'flex', fontSize: 44, color: colorTokens.ink['700'] }}>
          {site.claimLine2}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            display: 'flex',
            height: 2,
            backgroundColor: colorTokens.paper['300'],
          }}
        />
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            color: colorTokens.ink['600'],
            letterSpacing: '0.02em',
          }}
        >
          Problems understood. Decisions made. Impact measured.
        </div>
      </div>
    </div>
  );
}
