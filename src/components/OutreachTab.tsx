import React, { useState } from 'react';
import type { Lead } from '../types';
import { OutreachAgent } from '../agents/outreachAgent';

interface OutreachTabProps {
  leads: Lead[];
}

export function OutreachTab({ leads }: OutreachTabProps) {
  const [sentEmails, setSentEmails] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

  const handleSendEmail = async (lead: Lead) => {
    setIsLoading(prev => ({ ...prev, [lead.email]: true }));
    try {
      const agent = new OutreachAgent();
      await agent.sendPersonalizedEmail(lead);
      setSentEmails(prev => new Set(prev).add(lead.email));
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsLoading(prev => ({ ...prev, [lead.email]: false }));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Outreach to Selected Leads</h2>
      <div className="space-y-4">
        {leads.map((lead) => (
          <div key={lead.email} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">{lead.name}</h3>
                <p className="text-sm text-gray-600">{lead.email}</p>
              </div>
              <button
                onClick={() => handleSendEmail(lead)}
                disabled={isLoading[lead.email] || sentEmails.has(lead.email)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
              >
                {isLoading[lead.email]
                  ? 'Sending...'
                  : sentEmails.has(lead.email)
                  ? 'Email Sent'
                  : 'Send Email'}
              </button>
            </div>
            {lead.researchData && (
              <div className="mt-4 bg-white p-4 rounded border">
                <h4 className="font-medium mb-2">Research Summary:</h4>
                <p className="text-gray-700">{lead.researchData}</p>
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