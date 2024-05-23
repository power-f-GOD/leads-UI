import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

import type {
  LeadActionPayload,
  LeadsActionPayload,
  LeadSentimentsActionPayload
} from 'src/types';

import { resolveState } from '../__utils';
import {
  initialLeadSentimentsState,
  initialLeadsState,
  initialLeadState
} from '../inits/leads';

export const leadsSlice = createSlice({
  initialState: initialLeadsState,
  name: 'leads',
  reducers: {
    leads: (
      state,
      action: PayloadAction<
        Partial<
          Omit<LeadsActionPayload, 'extra'> & {
            extra: Partial<LeadsActionPayload['extra']>;
          }
        >
      >
    ) => resolveState(state, initialLeadsState, action)
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

export const leadSentimentsSlice = createSlice({
  initialState: initialLeadSentimentsState,
  name: 'leadSentiments',
  reducers: {
    leadSentiments: (
      state,
      action: PayloadAction<Partial<LeadSentimentsActionPayload>>
    ) => resolveState(state, initialLeadSentimentsState, action)
  }
});

export const { leads, lead, leadSentiments } = {
  ...leadsSlice.actions,
  ...leadSlice.actions,
  ...leadSentimentsSlice.actions
};

export const leadsReducers = {
  leads: leadsSlice.reducer,
  lead: leadSlice.reducer,
  leadSentiments: leadSentimentsSlice.reducer
};
