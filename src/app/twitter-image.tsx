import { ImageResponse } from 'next/og';

import { site } from '@/core/config/site';

import { CardMarkup, loadCardFonts, OG_SIZE } from './og-card';

/** Twitter mirrors the same card — one spec, two routes (og-card.tsx). */
export const runtime = 'nodejs';
export const alt = `${site.owner} — ${site.role}: ${site.claimLine1} ${site.claimLine2}`;
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function TwitterImage(): Promise<ImageResponse> {
  return loadCardFonts().then((fonts) => new ImageResponse(<CardMarkup />, { ...OG_SIZE, fonts }));
}
