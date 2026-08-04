import { z } from 'zod';

/**
 * Environment — validated at import time (ARCHITECTURE §0, §12).
 * An empty string is the absence of a value, not a value: it collapses to
 * `undefined` so optional affordances omit themselves instead of shipping
 * dead ends (the consequence law, §8).
 */
const emptyToUndefined = (value: unknown): unknown =>
  typeof value === 'string' && value.trim() === '' ? undefined : value;

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.preprocess(
    emptyToUndefined,
    z.string().url().default('http://localhost:3000'),
  ),
  NEXT_PUBLIC_CONTACT_EMAIL: z.preprocess(emptyToUndefined, z.string().email().optional()),
  NEXT_PUBLIC_ANALYTICS_ENDPOINT: z.preprocess(emptyToUndefined, z.string().url().optional()),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  NEXT_PUBLIC_ANALYTICS_ENDPOINT: process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT,
});

export type Env = typeof env;
