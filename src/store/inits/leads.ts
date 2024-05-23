import { httpStatusPropsInit } from 'src/constants';
import type {
  LeadActionPayload,
  LeadsActionPayload,
  LeadSentimentsActionPayload
} from 'src/types';

export const initialLeadsState: LeadsActionPayload = {
  ...httpStatusPropsInit,
  data: {
    leads: Array(9)
      .fill({})
      .map((d, i) => ({ ...d, _id: `${i}` })),
    total_results: 0
  },
  extra: { limit: 9, page: 1 }
};

export const initialLeadState: LeadActionPayload = {
  ...httpStatusPropsInit,
  data: null,
  extra: {}
};

export const initialLeadSentimentsState: LeadSentimentsActionPayload = {
  ...httpStatusPropsInit,
  data: {},
  extra: {}
};
