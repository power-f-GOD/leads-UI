import { http } from 'src/http';
import { dispatch, lead, leads, leadSentiments } from 'src/store';
import type {
  APILeadSentimentProps,
  APILeadSentimentType,
  APILeadsResponse,
  LeadActionPayload,
  LeadSentimentsActionPayload
} from 'src/types';

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

export const giveLeadSentiment = async (
  lead_id: string,
  sentiment: APILeadSentimentType
) => {
  const payload = await http.put<APILeadsResponse>(`/leads/feedback`, {
    data: { lead_id, sentiment },
    actor: lead,
    initActorPayload: {
      data: { _id: lead_id },
      message: 'Thumbing...'
    } as LeadActionPayload
  });

  if (!payload.error) getLeadSentiments();

  return payload;
};

export const getLeadSentiments = async () => {
  return (await http.get<APILeadSentimentProps[]>(`/leads/feedback`, {
    actor: leadSentiments,
    dataMiddleware: (data) => {
      return data.reduce((a, b) => {
        a[b._id] = b;

        return a;
      }, {} as LeadSentimentsActionPayload['data']) as any;
    }
  })) as unknown as LeadSentimentsActionPayload;
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
