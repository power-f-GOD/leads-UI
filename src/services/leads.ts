import { http } from 'src/http';
import { dispatch, lead, leads } from 'src/store';
import type { APILeadsResponse } from 'src/types';

export const fetchLeads = async () => {
  await http.get<APILeadsResponse>(`/leads`, {
    actor: leads,
    middleware(payload) {
      payload.extra.__isLastPage =
        payload.data.leads.length < payload.extra.__count!;

      return payload;
    }
  });
};

// export const giveLeadThumbs = async () => {
//   await http.get<APILeadsResponse>(`/leads`, {
//     actor: leads,
//     middleware(payload) {
//       payload.extra.__isLastPage =
//         payload.data.leads.length < payload.extra.__count!;

//       return payload;
//     }
//   });
// };

export const deleteLead = async (_id: string) => {
  dispatch(lead({ data: { _id }, message: 'Deleting lead...' }));

  const { error } = await http.delete<APILeadsResponse>(`/leads/${_id}`, {
    actor: lead,
    successMessage: 'Lead deleted successfully.✅'
  });

  if (!error) await fetchLeads();

  return { error };
};
