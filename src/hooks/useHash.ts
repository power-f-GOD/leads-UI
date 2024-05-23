'use client';

import { useEffect, useState } from 'react';

import { appEnv } from 'src/constants';

export const getHash = () =>
  appEnv.isBrowser__aggressive
    ? decodeURIComponent(location.hash.slice(1))
    : undefined;

export const useHash = (onHashChange?: (hash: string | undefined) => void) => {
  const [hash, setHash] = useState<string | undefined>(getHash());

  const _onHashChange = () => {
    const _hash = getHash();

    setHash(_hash);
    onHashChange?.(_hash);
  };

  useEffect(() => {
    window.addEventListener('hashchange', _onHashChange);
    if (location.hash) _onHashChange();

    return () => {
      window.removeEventListener('hashchange', _onHashChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return hash;
};
