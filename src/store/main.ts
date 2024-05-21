import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import type { TypedUseSelectorHook } from 'react-redux';

import { IS_DEV_MODE } from 'src/constants';

import { rootReducer } from './slices';

const store = configureStore({
  reducer: rootReducer,
  devTools: IS_DEV_MODE,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
});

export const { dispatch } = store;
export const { getState } = store;

export type StateProps = ReturnType<typeof getState>;
export type StoreDispatch = ReturnType<typeof dispatch>;
export type StoreGetState = typeof getState;

export const useTypedSelector: TypedUseSelectorHook<StateProps> = useSelector;

export { store };
