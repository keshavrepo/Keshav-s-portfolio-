'use client';

import { useReportWebVitals } from 'next/web-vitals';

import { env } from '@/core/config/env';

/**
 * Web Vitals telemetry (ARCHITECTURE §13): beacons fire only to a configured
 * endpoint; otherwise metrics surface in development for the author. No
 * tracker ships by default — instrumentation is ours or none (EG-91+).
 */
export function WebVitalsReporter() {
  useReportWebVitals((metric) => {
    const endpoint = env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
    if (
      endpoint &&
      typeof navigator !== 'undefined' &&
      typeof navigator.sendBeacon === 'function'
    ) {
      navigator.sendBeacon(endpoint, JSON.stringify({ ...metric, page: window.location.pathname }));
      return;
    }
    if (process.env.NODE_ENV !== 'production') {
      console.info('[vitals]', metric.name, metric.value.toFixed(2));
    }
  });

  return null;
}
