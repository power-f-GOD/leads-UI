import type { FetchProps } from './shared';

export type LeadsActionPayload = FetchProps<
  APILeadsResponse,
  { page: number; limit: number }
>;

export type LeadActionPayload = FetchProps<
  (Partial<Omit<APILeadProps, '_id'>> & { _id: string }) | null
>;

export type LeadSentimentsActionPayload = FetchProps<
  Record<string, APILeadSentimentProps>
>;

export interface APILeadSentimentProps {
  _id: string;
  sentiment: APILeadSentimentType;
}

export type APILeadsResponse = {
  total_results: number;
  leads: APILeadProps[];
};

export interface APILeadProps {
  _id: string;
  profile_url: string;
  company_id: string;
  company: string;
  company_linkedin: string;
  company_website: string;
  company_city: string;
  company_state: string;
  company_country: string;
  company_num_employees: number;
  deal_id: string;
  deal_type: string;
  deal_date: string;
  deal_size: number;
  approx_curr_valuation: number;
  year_founded: number;
  is_public: boolean;
  is_involved_public: boolean;
  acq_company: string;
  acq_company_ticker: string | null;
  name: string;
  nickname: string;
  current_title: string;
  approx_age: number;
  wealth_trajectory: string;
  wealth_status: string;
  date_joined: string;
  date_left: string;
  current_employee: boolean;
  funding_stage_at_join: string;
  approx_starting_stake: number;
  approx_curr_stake: number;
  approx_curr_ownership_value: number;
  ownership_label: number;
  ownership_bucket: string;
  nwe_response: string;
  nwe_label: number;
  nwe_bucket: string;
  overall_label: number;
  overall_bucket: string;
  approx_ltv: number;
  city: string;
  city_full: string;
  state: string;
  state_full: string;
  country: string;
  gender: string;
  news: string | null;
  lead_date: string;
  trigger: string;
  priority_score: number;
  priority_reasons: string[];
  highlights: string;
  last_updated: string;
  /** Augmentation - Not part of actual API response */
  __sentiment?: APILeadSentimentProps;
  __contacted?: boolean;
}

export type APILeadSentimentType = -1 | 1 | 0;
