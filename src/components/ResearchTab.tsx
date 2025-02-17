import React, { useState } from 'react';
import type { Lead } from '../types';
import { ResearchAgent } from '../agents/researchAgent';

interface ResearchTabProps {
  leads: Lead[];
}

export function ResearchTab({ leads }: ResearchTabProps) {
  const [researchResults, setResearchResults] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  const handleResearch = async (lead: Lead) => {
    setIsLoading(prev => ({ ...prev, [lead.email]: true }));
    try {
      const agent = new ResearchAgent();
      const research = await agent.researchLead(lead);
      setResearchResults(prev => ({ ...prev, [lead.email]: research }));
    } catch (error) {
      console.error('Error researching lead:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, [lead.email]: false }));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Research Selected Leads</h2>
      <div className="space-y-4">
        {leads.map((lead) => (
          <div key={lead.email} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">{lead.name}</h3>
              <button
                onClick={() => handleResearch(lead)}
                disabled={isLoading[lead.email]}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
              >
                {isLoading[lead.email] ? 'Researching...' : 'Research'}
              </button>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <p>Email: {lead.email}</p>
              <p>Company: {lead.companyWebsite}</p>
            </div>
            {researchResults[lead.email] && (
              <div className="mt-4 bg-white p-4 rounded border">
                <h4 className="font-medium mb-2">Research Results:</h4>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {researchResults[lead.email]}
                </p>
              </div>
            )}
          </div>
        ))}
        {leads.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            No leads selected. Please select leads from the Lead Generator tab.
          </p>
        )}
      </div>
    </div>
  );
}