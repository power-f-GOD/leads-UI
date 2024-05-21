import { combineReducers } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { leadsReducers, miscReducers } from '.';

export * from './leads';
export * from './misc';

const appReducer = combineReducers({
  ...miscReducers,
  ...leadsReducers
});

export const rootReducer = (state: any, action: PayloadAction<any>) => {
  // const { snackbar } = state || {};

  // if (action.type === 'store/reset') {
  //   return appReducer({ snackbar }, action);
  // }

  return appReducer(state, action);
};
