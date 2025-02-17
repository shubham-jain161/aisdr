import { describe, it, expect } from 'vitest';
import { LeadGeneratorAgent } from '../agents/leadGeneratorAgent';
import type { SearchFilters } from '../types';

describe('LeadGeneratorAgent', () => {
  const agent = new LeadGeneratorAgent();

  it('should generate leads based on search filters', async () => {
    const testFilters: SearchFilters = {
      position: "CTO",
      company: "Startup",
      industry: "AI Technology",
      website: "YCombinator.com"
    };

    const leads = await agent.generateLeads(testFilters);

    // Test that leads array is returned
    expect(Array.isArray(leads)).toBe(true);

    // Test lead structure if any leads are found
    if (leads.length > 0) {
      const lead = leads[0];
      expect(lead).toHaveProperty('company');
      // Optional properties
      if (lead.name) expect(typeof lead.name).toBe('string');
      if (lead.title) expect(typeof lead.title).toBe('string');
      if (lead.website) expect(typeof lead.website).toBe('string');
    }
  });

  it('should handle empty website in filters', async () => {
    const testFilters: SearchFilters = {
      position: "CTO",
      company: "Startup",
      industry: "AI Technology"
    };

    const leads = await agent.generateLeads(testFilters);
    expect(Array.isArray(leads)).toBe(true);
  });

  it('should handle API errors gracefully', async () => {
    const testFilters: SearchFilters = {
      position: "",
      company: "",
      industry: "",
      website: ""
    };

    const leads = await agent.generateLeads(testFilters);
    expect(Array.isArray(leads)).toBe(true);
    expect(leads.length).toBe(0);
  });
});