import React, { useState } from 'react';
import { Search, Users, Mail } from 'lucide-react';
import { LeadGeneratorTab } from './LeadGeneratorTab';
import { ResearchTab } from './ResearchTab';
import { OutreachTab } from './OutreachTab';
import type { Lead } from '../types';
import clsx from 'clsx';

interface TabButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={clsx(
      'flex items-center px-4 py-2 rounded-md',
      isActive
        ? 'bg-blue-600 text-white'
        : 'bg-white text-gray-700 hover:bg-gray-50'
    )}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeads, setSelectedLeads] = useState<Lead[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-900">Gama AI</h1>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8">
          <TabButton
            icon={<Search className="w-5 h-5" />}
            label="Lead Generator"
            isActive={activeTab === 'leads'}
            onClick={() => setActiveTab('leads')}
          />
          <TabButton
            icon={<Users className="w-5 h-5" />}
            label="Research"
            isActive={activeTab === 'research'}
            onClick={() => setActiveTab('research')}
          />
          <TabButton
            icon={<Mail className="w-5 h-5" />}
            label="Outreach"
            isActive={activeTab === 'outreach'}
            onClick={() => setActiveTab('outreach')}
          />
        </div>

        <div className="bg-white rounded-lg shadow">
          {activeTab === 'leads' && (
            <LeadGeneratorTab
              onLeadsGenerated={setLeads}
              onLeadsSelected={setSelectedLeads}
            />
          )}
          {activeTab === 'research' && (
            <ResearchTab leads={selectedLeads} />
          )}
          {activeTab === 'outreach' && (
            <OutreachTab leads={selectedLeads} />
          )}
        </div>
      </div>
    </div>
  );
}