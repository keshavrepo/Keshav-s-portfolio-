import type { MetadataRoute } from 'next';

import { site } from '@/core/config/site';
import { colorTokens } from '@/design-system/tokens';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'Keshav — BA',
    description: site.description,
    start_url: '/',
    display: 'browser',
    background_color: colorTokens.ink['950'],
    theme_color: colorTokens.ink['950'],
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
