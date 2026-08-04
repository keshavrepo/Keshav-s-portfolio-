'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { useReducedMotion } from '@/core/motion/use-reduced-motion';
import { useSettingsStore } from '@/core/state/settings-store';
import { getDeviceSignals } from '@/core/three/capability';

import { coerceLane, resolveDefaultLane, resolveMotionMode } from './resolve-lane';
import { SSR_SIGNALS, type Lane, type LaneSignals, type MotionMode } from './types';

export interface LaneContextValue {
  /** The effective telling after capability coercion. */
  lane: Lane;
  /** What the device was offered before any visitor override. */
  defaultLane: Lane;
  /** The visitor's stored choice, `null` = auto. */
  override: Lane | null;
  motion: MotionMode;
  signals: LaneSignals;
  setOverride: (lane: Lane | null) => void;
}

const LaneContext = createContext<LaneContextValue | null>(null);

/**
 * Resolves and broadcasts the telling. Pre-probe state is the semantic
 * floor and renders identically on server and client; capability only ever
 * upgrades after hydration (ARCHITECTURE §11).
 */
export function LaneProvider({ children }: { children: ReactNode }) {
  const [signals, setSignals] = useState<LaneSignals>(SSR_SIGNALS);
  const override = useSettingsStore((s) => s.laneOverride);
  const motionPreference = useSettingsStore((s) => s.motionPreference);
  const setOverride = useSettingsStore((s) => s.setLaneOverride);
  const systemReduced = useReducedMotion();

  useEffect(() => {
    setSignals(getDeviceSignals());
  }, []);

  const value = useMemo<LaneContextValue>(() => {
    const probed: LaneSignals = { ...signals, reducedMotion: systemReduced };
    const defaultLane = resolveDefaultLane(probed);
    const lane = override === null ? defaultLane : coerceLane(override, probed);
    const motion = resolveMotionMode(lane, motionPreference, systemReduced);
    return { lane, defaultLane, override, motion, signals: probed, setOverride };
  }, [signals, systemReduced, override, motionPreference, setOverride]);

  useEffect(() => {
    document.documentElement.dataset.lane = value.lane;
    document.documentElement.dataset.motion = value.motion;
  }, [value.lane, value.motion]);

  return <LaneContext.Provider value={value}>{children}</LaneContext.Provider>;
}

export function useLane(): LaneContextValue {
  const ctx = useContext(LaneContext);
  if (!ctx) throw new Error('useLane must be used within <LaneProvider>.');
  return ctx;
}
