import type { PayloadAction } from '@reduxjs/toolkit';
import type { FetchProps } from 'src/types';

export const resolveState = <
  State extends FetchProps<any>,
  Action extends PayloadAction<Partial<FetchProps<any>>>
>(
  state: State,
  initialState: State,
  action: Action
) => {
  const { extra } = action.payload;

  return action.type.includes('reset')
    ? initialState
    : {
        ...state,
        ...action.payload,
        extra: {
          ...state.extra,
          ...extra
        }
      };
};
