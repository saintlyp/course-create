
import React, { useState } from 'react';
import { Copy, RefreshCw, Loader2, Code2 } from 'lucide-react';
import { generateCode } from '../services/aiService';
import { GET_SYSTEM_INSTRUCTION_CREATOR, TRANSLATIONS } from '../constants';
import MarkdownRenderer from './MarkdownRenderer';
import { Language, AIConfig } from '../types';

interface CodeCreatorProps {
  language: Language;
  config: AIConfig;
}

const CodeCreator: React.FC<CodeCreatorProps> = ({ language, config }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const t = TRANSLATIONS[language].creator;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const result = await generateCode(
        prompt,
        GET_SYSTEM_INSTRUCTION_CREATOR(language),
        language,
        "",
        config
    );
    setGeneratedContent(result);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 p-6 overflow-hidden">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">{t.title}</h2>
        <p className="text-slate-400">{t.subtitle}</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Input Section */}
        <div className="flex flex-col lg:w-1/3 gap-4">
          <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl flex-1 flex flex-col">
            <label className="text-sm font-semibold text-slate-300 mb-2 uppercase tracking-wider">{t.label}</label>
            <textarea
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none placeholder-slate-600 transition-all"
              placeholder={t.placeholder}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all transform active:scale-95 ${
                  loading || !prompt 
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-primary to-purple-600 text-white hover:shadow-lg hover:shadow-primary/25'
                }`}
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Code2 className="w-5 h-5" />
                )}
                <span>{loading ? t.constructing : t.generate}</span>
              </button>
            </div>
          </div>
          
          {/* Tips */}
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
            <h4 className="text-sm font-semibold text-primary mb-2">{t.tipTitle}</h4>
            <p className="text-xs text-slate-400">
              {t.tip}
            </p>
          </div>
        </div>

        {/* Output Section */}
        <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/90 backdrop-blur">
            <h3 className="font-mono text-sm text-slate-300 flex items-center">
              <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
              {t.output}
            </h3>
            <div className="flex space-x-2">
               <button 
                className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Copy Code"
                onClick={() => navigator.clipboard.writeText(generatedContent)}
               >
                 <Copy className="w-4 h-4" />
               </button>
               <button 
                className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                title="Regenerate"
                onClick={handleGenerate}
               >
                 <RefreshCw className="w-4 h-4" />
               </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 bg-slate-950/50">
            {generatedContent ? (
              <MarkdownRenderer content={generatedContent} />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-50">
                <Code2 className="w-16 h-16 mb-4" />
                <p>{t.empty}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeCreator;
