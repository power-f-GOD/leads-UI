import { http } from 'src/http';
import { leads } from 'src/store';
import type { APILeadsResponse } from 'src/types';

export const fetchLeads = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });
  await http.get<APILeadsResponse>(`/leads`, {
    actor: leads,
    middleware(payload) {
      payload.extra.__isLastPage =
        payload.data.leads.length < payload.extra.__count!;

      return payload;
    }
  });
};
