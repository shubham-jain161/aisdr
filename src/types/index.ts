export interface Lead {
  name: string;
  email: string;
  phone: string;
  socialLink: string;
  companyWebsite: string;
  researchData?: string;
}

export interface SearchFilters {
  keyword: string;
  company: string;
  industry: string;
  website: string;
  position: string;
}

export interface AgentState {
  leads: Lead[];
  selectedLeads: Lead[];
  isLoading: boolean;
  error: string | null;
}