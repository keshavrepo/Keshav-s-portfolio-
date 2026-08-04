import localFont from 'next/font/local';

/**
 * Typography is the hero; its delivery is hermetic (ARCHITECTURE §3, §12).
 * Self-hosted variable fonts, loaded through next/font/local: zero runtime
 * CDN, preloaded on routes that use them, metric-compatible fallbacks so
 * font swap never reflows a Claim line.
 */
export const displayFont = localFont({
  src: [
    { path: './fonts/fraunces-var.woff2', style: 'normal', weight: '100 900' },
    { path: './fonts/fraunces-var-italic.woff2', style: 'italic', weight: '100 900' },
  ],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const textFont = localFont({
  src: [
    { path: './fonts/inter-var.woff2', style: 'normal', weight: '100 900' },
    { path: './fonts/inter-var-italic.woff2', style: 'italic', weight: '100 900' },
  ],
  variable: '--font-text',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'sans-serif'],
});
