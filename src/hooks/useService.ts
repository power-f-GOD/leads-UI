import { useEffect } from 'react';

import type { StateProps } from 'src/store';
import type { FetchProps } from 'src/types';

import { useTypedSelector } from './useTypedSelector';

export const useService = <
  State extends FetchProps<any>,
  Service extends (...args: any[]) => unknown = (...args: any[]) => unknown,
  Query = unknown
>(
  service: Service,
  { lazy, path, query }: Options<Query>
) => {
  const state = useTypedSelector(
    (_state) => _state[path] as State,
    (prev, curr) => Object.is(prev, curr)
  );

  useEffect(() => {
    if (!lazy) service(query);
  }, [service, lazy, query]);

  return {
    refetch: service,
    ...state
  };
};

type Options<Query> = {
  lazy?: boolean;
  /** The Redux store path for the service (reducer). */
  path: keyof Pick<StateProps, 'leads' | 'leadSentiments' | 'lead'>;
  /** Query passed to service.  */
  query?: Query;
};
