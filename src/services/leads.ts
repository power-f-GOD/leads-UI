import type {
  APILeadSentimentProps,
  APILeadSentimentType,
  APILeadsResponse,
  LeadActionPayload,
  LeadSentimentsActionPayload
} from 'src/types';

import { http } from 'src/http';
import { dispatch, lead, leads, leadSentiments } from 'src/store';

export const fetchLeads = async (query?: { page: number }) => {
  const { error } = await http.get<APILeadsResponse>(
    `/leads${query?.page ? `?page=${query.page}` : ''}`,
    { actor: leads }
  );

  if (!error && query?.page) dispatch(leads({ extra: { page: query.page } }));
};

export const giveLeadSentiment = async (
  lead_id: string,
  sentiment: APILeadSentimentType
) => {
  const { error } = await http.put<APILeadsResponse>(
    `/leads/feedback?lead_id=${lead_id}&sentiment=${sentiment}`,
    {
      actor: lead,
      initActorPayload: {
        data: { _id: lead_id },
        message: 'Thumbing...'
      } as LeadActionPayload
    }
  );

  if (!error) getLeadSentiments();

  return { error };
};

export const getLeadSentiments = async () => {
  return (await http.get<APILeadSentimentProps[]>(`/leads/feedback`, {
    actor: leadSentiments,
    dataMiddleware: (data) => {
      return data.reduce((a, b) => {
        a[b.lead_id] = b;

        return a;
      }, {} as LeadSentimentsActionPayload['data']) as any;
    }
  })) as unknown as LeadSentimentsActionPayload;
};

export const deleteLead = async (_id: string, page: number) => {
  const { error } = await http.delete<APILeadsResponse>(`/leads/${_id}`, {
    actor: lead,
    successMessage: 'Lead deleted successfully.✅',
    initActorPayload: {
      data: { _id },
      message: 'Deleting lead...'
    } as LeadActionPayload
  });

  if (!error) setTimeout(fetchLeads, 500, { page });

  return { error };
};
