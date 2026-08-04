'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { Lane } from '@/core/lane/types';

/**
 * Visitor settings — consent-first (ARCHITECTURE §11): audio is off until
 * granted (PC-26), motion honors the system until told otherwise, the lane
 * is automatic until the visitor chooses.
 */
interface SettingsState {
  motionPreference: 'system' | 'full' | 'reduced';
  audioConsent: boolean;
  laneOverride: Lane | null;
  setMotionPreference: (preference: SettingsState['motionPreference']) => void;
  grantAudio: () => void;
  revokeAudio: () => void;
  setLaneOverride: (lane: Lane | null) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      motionPreference: 'system',
      audioConsent: false,
      laneOverride: null,
      setMotionPreference: (motionPreference) => set({ motionPreference }),
      grantAudio: () => set({ audioConsent: true }),
      revokeAudio: () => set({ audioConsent: false }),
      setLaneOverride: (laneOverride) => set({ laneOverride }),
    }),
    {
      name: 'project-k:settings:v1',
      storage: createJSONStorage(() => localStorage),
      partialize: ({ motionPreference, audioConsent, laneOverride }) => ({
        motionPreference,
        audioConsent,
        laneOverride,
      }),
    },
  ),
);
