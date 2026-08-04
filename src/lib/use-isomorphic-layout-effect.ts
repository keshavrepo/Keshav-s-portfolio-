'use client';

import { useEffect, useLayoutEffect } from 'react';

/** Layout effect in the browser, no-op-safe on the server. */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
