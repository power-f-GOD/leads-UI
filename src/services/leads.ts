import { http } from 'src/http';
import { leads } from 'src/store';
import type { APILeadProps } from 'src/types';

export const fetchLeads = async () => {
  await http.get<APILeadProps[]>(`/leads`, { actor: leads });
};
