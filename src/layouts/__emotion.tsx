'use client';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useServerInsertedHTML } from 'next/navigation';
import { useState } from 'react';

import type { ReactNode } from 'react';

/**
 * For the purpose of this component, see this comment (on an issue) on GitHub: https://github.com/emotion-js/emotion/issues/2928#issuecomment-1293012737
 */
export default function RootStyleRegistry({
  children
}: {
  children: ReactNode;
}) {
  const [cache] = useState(() => {
    const cache = createCache({ key: 'css', prepend: true });
    cache.compat = true;
    return cache;
  });

  useServerInsertedHTML(() => {
    /* Inject MUI styles first to match with the prepend: true configuration. */
    return (
      <style
        id="emotion-styles"
        data-emotion={`css server ${Object.keys(cache.inserted).join(' ')}`}>
        {Object.values(cache.inserted).join(' ')}
      </style>
    );
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
