export interface SearchFilters {
  position: string;
  company: string;
  industry: string;
  website?: string;
}

export interface Lead {
  name?: string;
  title?: string;
  company: string;
  website?: string;
  confidence?: number;
}