
import React, { useState, useEffect } from 'react';
import { X, Save, Key, Server, Cpu } from 'lucide-react';
import { AIConfig, LLMProvider, Language } from '../types';
import { DEFAULT_PROVIDER_CONFIGS, TRANSLATIONS } from '../constants';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AIConfig;
  onSave: (newConfig: AIConfig) => void;
  language: Language;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, config, onSave, language }) => {
  const [localConfig, setLocalConfig] = useState<AIConfig>(config);
  const t = TRANSLATIONS[language].settings;

  useEffect(() => {
    setLocalConfig(config);
  }, [config, isOpen]);

  if (!isOpen) return null;

  const handleProviderChange = (provider: LLMProvider) => {
    setLocalConfig(prev => ({ ...prev, provider }));
  };

  const handleKeyChange = (value: string) => {
    setLocalConfig(prev => ({
      ...prev,
      apiKeys: { ...prev.apiKeys, [prev.provider]: value }
    }));
  };

  const handleModelNameChange = (value: string) => {
    setLocalConfig(prev => ({
        ...prev,
        modelNames: { ...prev.modelNames, [prev.provider]: value }
    }));
  };

  const handleSave = () => {
    onSave(localConfig);
    onClose();
  };

  const currentProviderDetails = DEFAULT_PROVIDER_CONFIGS[localConfig.provider];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl transform transition-all">
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Server className="w-5 h-5 mr-2 text-primary" />
            {t.title}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-sm text-slate-400">{t.description}</p>

          {/* Provider Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">{t.provider}</label>
            <div className="grid grid-cols-1 gap-2">
              {Object.entries(DEFAULT_PROVIDER_CONFIGS).map(([key, details]) => (
                <button
                  key={key}
                  onClick={() => handleProviderChange(key as LLMProvider)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                    localConfig.provider === key
                      ? 'bg-primary/20 border-primary text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="font-medium">{details.name}</span>
                  {localConfig.provider === key && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                </button>
              ))}
            </div>
          </div>

          {/* API Key Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center">
                <Key className="w-3 h-3 mr-1" /> {t.apiKey}
            </label>
            <input
              type="password"
              value={localConfig.apiKeys[localConfig.provider] || ''}
              onChange={(e) => handleKeyChange(e.target.value)}
              placeholder={`sk-...`}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-primary outline-none transition-all"
            />
            <p className="text-xs text-slate-500">
                {localConfig.provider === 'gemini' ? 'Uses process.env.API_KEY by default if empty.' : 'Required for external providers.'}
            </p>
          </div>

           {/* Model Name Input */}
           <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center">
                <Cpu className="w-3 h-3 mr-1" /> {t.modelName}
            </label>
            <input
              type="text"
              value={localConfig.modelNames[localConfig.provider] || currentProviderDetails.defaultModel}
              onChange={(e) => handleModelNameChange(e.target.value)}
              placeholder={currentProviderDetails.defaultModel}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:border-primary outline-none transition-all font-mono text-sm"
            />
          </div>

        </div>

        <div className="p-6 border-t border-slate-800 flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm font-medium"
          >
            {t.close}
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-medium flex items-center shadow-lg shadow-primary/20 transition-all"
          >
            <Save className="w-4 h-4 mr-2" />
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
