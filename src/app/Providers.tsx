'use client';

import { useEffect, type ReactNode } from 'react';

import { WebVitalsReporter } from '@/components/system/WebVitalsReporter';
import { LaneProvider } from '@/core/lane/lane-provider';
import { ensureGsapConfigured } from '@/core/motion/gsap';

/**
 * Client root (ARCHITECTURE §17): client components are leaves close to the
 * trunk — here they sense (lane, motion, vitals) while server components
 * above compose.
 */
export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    ensureGsapConfigured();
  }, []);

  return (
    <LaneProvider>
      {children}
      <WebVitalsReporter />
    </LaneProvider>
  );
}
