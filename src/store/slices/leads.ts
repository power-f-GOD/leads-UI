import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { httpStatusPropsInit } from 'src/constants';
import type { LeadsActionPayload } from 'src/types';

import { resolveState } from '../__utils';

const initialState: LeadsActionPayload = {
  ...httpStatusPropsInit,
  data: [],
  extra: { count: 9, page: 1, total_results: 0 }
};

export const leadsSlice = createSlice({
  initialState,
  name: 'leads',
  reducers: {
    leads: (state, action: PayloadAction<Partial<LeadsActionPayload>>) =>
      resolveState(state, initialState, action)
  }
});

export const { leads } = {
  ...leadsSlice.actions
};

export const leadsReducers = {
  leads: leadsSlice.reducer
};
