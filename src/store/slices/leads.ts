import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import { httpStatusPropsInit } from 'src/constants';
import type { LeadActionPayload, LeadsActionPayload } from 'src/types';

import { resolveState } from '../__utils';

const initialLeadsState: LeadsActionPayload = {
  ...httpStatusPropsInit,
  data: {
    leads: Array(9)
      .fill({})
      .map((d, i) => ({ ...d, _id: `${i}` })),
    total_results: 0
  },
  extra: { count: 9, page: 1 }
};

const initialLeadState: LeadActionPayload = {
  ...httpStatusPropsInit,
  data: null,
  extra: {}
};

export const leadsSlice = createSlice({
  initialState: initialLeadsState,
  name: 'leads',
  reducers: {
    leads: (state, action: PayloadAction<Partial<LeadsActionPayload>>) =>
      resolveState(state, initialLeadsState, action)
  }
});

export const leadSlice = createSlice({
  initialState: initialLeadState,
  name: 'lead',
  reducers: {
    lead: (state, action: PayloadAction<Partial<LeadActionPayload>>) =>
      resolveState(state, initialLeadState, action)
  }
});

export const { leads, lead } = {
  ...leadsSlice.actions,
  ...leadSlice.actions
};

export const leadsReducers = {
  leads: leadsSlice.reducer,
  lead: leadSlice.reducer
};
