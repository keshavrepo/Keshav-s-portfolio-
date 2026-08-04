import type { MetadataRoute } from 'next';

import { site } from '@/core/config/site';

/**
 * Only routes that exist are promised (ARCHITECTURE §15): a sitemap never
 * advertises an unbuilt door. Chapter slugs join as scenes ship.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
