import React, { useState } from 'react';
import { Tab, Institution, Expert } from './types';
import { institutions, experts } from './services/mockData';
import TrainingView from './components/TrainingView';
import GuidanceView from './components/GuidanceView';
import GeminiAdvisorView from './components/GeminiAdvisorView';
import DetailModal from './components/DetailModal';
import { GraduationCap, Briefcase, Sparkles } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.TRAINING);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderTabButton = (tab: Tab, label: string, Icon: React.ElementType) => (
    <button
      onClick={() => handleTabChange(tab)}
      className={`relative flex items-center justify-center gap-1.5 py-3 flex-1 text-sm font-medium transition-colors ${
        activeTab === tab 
          ? 'text-blue-600' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      <Icon size={18} className={activeTab === tab ? 'text-blue-600' : 'text-gray-400'} />
      <span>{label}</span>
      {activeTab === tab && (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-600 rounded-full" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 max-w-md mx-auto shadow-2xl relative">
      
      {/* Header */}
      <header className="bg-white sticky top-0 z-30 shadow-sm">
        <div className="px-4 py-3 flex items-center justify-center border-b border-gray-100">
          <h1 className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            智汇就业服务
          </h1>
        </div>

        {/* Top Navigation Tabs - Now part of the page content flow */}
        <div className="flex items-center bg-white px-2">
          {renderTabButton(Tab.TRAINING, '技能培训', GraduationCap)}
          {renderTabButton(Tab.GUIDANCE, '就业指导', Briefcase)}
          <button
            onClick={() => handleTabChange(Tab.AI_ADVISOR)}
            className={`relative flex items-center justify-center gap-1.5 py-3 flex-1 text-sm font-medium transition-colors ${
              activeTab === Tab.AI_ADVISOR 
                ? 'text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Sparkles size={18} className={activeTab === Tab.AI_ADVISOR ? 'text-indigo-600' : 'text-gray-400'} />
            <span>AI 顾问</span>
            {activeTab === Tab.AI_ADVISOR && (
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-indigo-600 rounded-full" />
            )}
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="min-h-[calc(100vh-100px)]">
        {activeTab === Tab.TRAINING && (
          <TrainingView 
            data={institutions} 
            onSelect={setSelectedInstitution} 
          />
        )}
        
        {activeTab === Tab.GUIDANCE && (
          <GuidanceView 
            data={experts} 
            onSelect={setSelectedExpert} 
          />
        )}

        {activeTab === Tab.AI_ADVISOR && (
          <GeminiAdvisorView />
        )}
      </main>

      {/* Modals */}
      <DetailModal 
        isOpen={!!selectedInstitution} 
        onClose={() => setSelectedInstitution(null)} 
        item={selectedInstitution}
        type="institution"
      />
      
      <DetailModal 
        isOpen={!!selectedExpert} 
        onClose={() => setSelectedExpert(null)} 
        item={selectedExpert}
        type="expert"
      />

    </div>
  );
}

export default App;