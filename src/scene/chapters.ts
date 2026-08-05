import { motionBounds } from '@/design-system/tokens';

/**
 * The seven locked chapters as data (ARCHITECTURE §8) — story facts live
 * here so no scene component ever hardcodes one. Slugs are permanent
 * promises (NR-14). Locked beats draw from the token bounds (verified
 * unchanged against SPEC-003).
 */
export interface ChapterLock {
  id: ChapterId;
  order: number;
  slug: string;
  title: string;
  /** Chapter-specific locked beats, where the story fixes them. */
  beats?: Record<string, readonly [number, number]>;
}

export const CHAPTER_IDS = [
  'opening',
  'mind',
  'grammar',
  'problem-room',
  'universe',
  'decision-engine',
  'impact',
  'future',
] as const;

export type ChapterId = (typeof CHAPTER_IDS)[number];

export const CHAPTERS: readonly ChapterLock[] = [
  {
    id: 'opening',
    order: 0,
    slug: '/',
    title: 'Opening — The Threshold',
    beats: { dive: motionBounds.dive },
  },
  {
    id: 'mind',
    order: 1,
    slug: '/mind',
    title: 'Chapter One — Inside My Mind',
    beats: { vistaReveal: [1400, 1800] },
  },
  { id: 'grammar', order: 2, slug: '/grammar', title: 'Chapter Two — Business Thinking Evolution' },
  {
    id: 'problem-room',
    order: 3,
    slug: '/problem-room',
    title: 'Chapter Three — The Problem Room',
  },
  {
    id: 'universe',
    order: 4,
    slug: '/universe',
    title: 'Chapter Four — The Business Universe',
  },
  {
    id: 'decision-engine',
    order: 5,
    slug: '/decision-engine',
    title: 'Chapter Five — The Decision Engine',
    beats: { suspense: motionBounds.suspense },
  },
  /**
   * SCENE-006 announced the Impact Engine between the locked decision-
   * engine (5) and future (6). The fractional order preserves both locks —
   * no existing entry moves; the chapter inserts and the order max law
   * keeps working.
   */
  { id: 'impact', order: 5.5, slug: '/impact', title: 'The Impact Engine' },
  { id: 'future', order: 6, slug: '/future', title: 'Chapter Six — The Future' },
] as const;

export function getChapter(id: ChapterId): ChapterLock {
  const chapter = CHAPTERS.find((c) => c.id === id);
  if (!chapter) throw new Error(`Unknown chapter: ${id}`);
  return chapter;
}
