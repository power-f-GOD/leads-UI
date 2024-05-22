import { http } from 'src/http';
import { dispatch, lead, leads } from 'src/store';
import type { APILeadProps, APILeadsResponse } from 'src/types';

export const fetchLeads = async (query?: { page: number }) => {
  const { error } = await http.get<APILeadsResponse>(
    `/leads${query?.page ? `?page=${query.page}` : ''}`,
    {
      actor: leads,
      middleware(payload) {
        payload.extra.__isLastPage =
          payload.data.leads.length < payload.extra.__count!;

        return payload;
      }
    }
  );

  if (!error && query?.page) dispatch(leads({ extra: { page: query.page } }));
};

export const giveLeadThumbs = async (
  lead_id: string,
  sentiment: APILeadProps['__sentiment']
) => {
  dispatch(
    lead({
      data: { _id: lead_id },
      message:
        sentiment === 1
          ? 'Thumbing up lead...'
          : sentiment === -1
          ? 'Thumbing down lead...'
          : 'Deleteing lead thumb...'
    })
  );
  await http.get<APILeadsResponse>(`/leads/feedback`, {
    data: { lead_id, sentiment },
    actor: leads
  });
};

export const deleteLead = async (_id: string, page: number) => {
  dispatch(lead({ data: { _id }, message: 'Deleting lead...' }));

  const { error } = await http.delete<APILeadsResponse>(`/leads/${_id}`, {
    actor: lead,
    successMessage: 'Lead deleted successfully.✅'
  });

  if (!error) setTimeout(fetchLeads, 500, { page });

  return { error };
};
