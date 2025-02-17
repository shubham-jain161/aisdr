import React, { useState } from 'react';
import type { Lead, SearchFilters } from '../types';
import { LeadGeneratorAgent } from '../agents/leadGeneratorAgent';

interface LeadGeneratorTabProps {
  onLeadsGenerated: (leads: Lead[]) => void;
  onLeadsSelected: (leads: Lead[]) => void;
}

export function LeadGeneratorTab({ onLeadsGenerated, onLeadsSelected }: LeadGeneratorTabProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: '',
    company: '',
    industry: '',
    website: '',
    position: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const agent = new LeadGeneratorAgent();
      const generatedLeads = await agent.generateLeads(filters);
      setLeads(generatedLeads);
      onLeadsGenerated(generatedLeads);
    } catch (error) {
      console.error('Error generating leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSelection = (lead: Lead) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(lead.email)) {
      newSelected.delete(lead.email);
    } else {
      newSelected.add(lead.email);
    }
    setSelectedLeads(newSelected);
    onLeadsSelected(leads.filter(l => newSelected.has(l.email)));
  };

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Keyword"
          className="p-2 border rounded"
          value={filters.keyword}
          onChange={e => setFilters(prev => ({ ...prev, keyword: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Company"
          className="p-2 border rounded"
          value={filters.company}
          onChange={e => setFilters(prev => ({ ...prev, company: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Industry"
          className="p-2 border rounded"
          value={filters.industry}
          onChange={e => setFilters(prev => ({ ...prev, industry: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Website"
          className="p-2 border rounded"
          value={filters.website}
          onChange={e => setFilters(prev => ({ ...prev, website: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Position"
          className="p-2 border rounded"
          value={filters.position}
          onChange={e => setFilters(prev => ({ ...prev, position: e.target.value }))}
        />
      </div>

      <button
        onClick={handleSearch}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
      >
        {isLoading ? 'Searching...' : 'Generate Leads'}
      </button>

      <div className="mt-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Social
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Website
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead.email}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedLeads.has(lead.email)}
                    onChange={() => handleLeadSelection(lead)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{lead.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={lead.socialLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    View Profile
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a href={lead.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    Visit Website
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}