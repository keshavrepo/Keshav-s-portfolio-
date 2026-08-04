'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { ChapterId } from '@/scene/chapters';

/**
 * Journey state (ARCHITECTURE §11). Return-visit memory persists — a
 * returning visitor is greeted, not resumed mid-beat — so the trail of
 * anchors and furthest progress persists (EG-51 return-visit doctrine)
 * while traversal position itself stays sessional.
 */
interface JourneyState {
  chapterId: ChapterId;
  furthestOrder: number;
  visitedAnchors: string[];
  depth: 'essential' | 'detailed' | 'archive';
  setChapter: (id: ChapterId, order: number) => void;
  markVisited: (anchor: string) => void;
  setDepth: (depth: JourneyState['depth']) => void;
}

export const useJourneyStore = create<JourneyState>()(
  persist(
    (set) => ({
      chapterId: 'opening',
      furthestOrder: 0,
      visitedAnchors: [],
      depth: 'essential',
      setChapter: (chapterId, order) =>
        set((state) => ({ chapterId, furthestOrder: Math.max(state.furthestOrder, order) })),
      markVisited: (anchor) =>
        set((state) =>
          state.visitedAnchors.includes(anchor)
            ? state
            : { visitedAnchors: [...state.visitedAnchors, anchor] },
        ),
      setDepth: (depth) => set({ depth }),
    }),
    {
      name: 'project-k:journey:v1',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ furthestOrder, visitedAnchors, depth }) => ({
        furthestOrder,
        visitedAnchors,
        depth,
      }),
    },
  ),
);
