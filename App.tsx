
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ConceptExplorer from './components/ConceptExplorer';
import CodeCreator from './components/CodeCreator';
import CodeReviewer from './components/CodeReviewer';
import SettingsModal from './components/SettingsModal';
import { AppMode, Language, AIConfig, LLMProvider } from './types';
import { DEFAULT_PROVIDER_CONFIGS } from './constants';

const App: React.FC = () => {
  const [mode, setMode] = useState<AppMode>(AppMode.Dashboard);
  const [language, setLanguage] = useState<Language>('en');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Initialize AI Config
  const [aiConfig, setAiConfig] = useState<AIConfig>(() => {
    const saved = localStorage.getItem('ai_config');
    if (saved) return JSON.parse(saved);
    return {
      provider: 'gemini',
      apiKeys: {
        gemini: process.env.API_KEY || '',
        deepseek: '',
        volcano: '',
        kimi: '',
        glm: ''
      },
      modelNames: {
        gemini: DEFAULT_PROVIDER_CONFIGS.gemini.defaultModel,
        deepseek: DEFAULT_PROVIDER_CONFIGS.deepseek.defaultModel,
        volcano: DEFAULT_PROVIDER_CONFIGS.volcano.defaultModel,
        kimi: DEFAULT_PROVIDER_CONFIGS.kimi.defaultModel,
        glm: DEFAULT_PROVIDER_CONFIGS.glm.defaultModel
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('ai_config', JSON.stringify(aiConfig));
  }, [aiConfig]);

  const handleSaveSettings = (newConfig: AIConfig) => {
    setAiConfig(newConfig);
  };

  const renderContent = () => {
    switch (mode) {
      case AppMode.Dashboard:
        return <Dashboard setMode={setMode} language={language} />;
      case AppMode.ConceptExplorer:
        return <ConceptExplorer language={language} config={aiConfig} />;
      case AppMode.CodeCreator:
        return <CodeCreator language={language} config={aiConfig} />;
      case AppMode.CodeReview:
        return <CodeReviewer language={language} config={aiConfig} />;
      default:
        return <Dashboard setMode={setMode} language={language} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden selection:bg-primary/30 selection:text-white">
      <Sidebar 
        currentMode={mode} 
        setMode={setMode} 
        language={language}
        setLanguage={setLanguage}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />
      <main className="flex-1 relative overflow-hidden">
        {/* Abstract background pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 h-full">
          {renderContent()}
        </div>
      </main>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        config={aiConfig}
        onSave={handleSaveSettings}
        language={language}
      />
    </div>
  );
};

export default App;
