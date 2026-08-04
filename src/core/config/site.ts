import { env } from './env';

/**
 * The site's stable facts. Claim lines are character-locked (IR-45) and
 * shared verbatim with the locked story (SPEC-003, Opening).
 */
export const site = {
  codename: 'Project K',
  owner: 'Keshav Choudhary',
  role: 'Business Analyst',
  claimLine1: 'Every business has problems.',
  claimLine2: 'I enjoy understanding them.',
  description:
    'Every business has problems. I enjoy understanding them. The portfolio of Keshav Choudhary, Business Analyst — problems understood, decisions made, impact measured.',
  url: env.NEXT_PUBLIC_SITE_URL,
  locale: 'en_IN',
  lang: 'en',
  name: 'Keshav Choudhary — Business Analyst',
} as const;

export type Site = typeof site;
