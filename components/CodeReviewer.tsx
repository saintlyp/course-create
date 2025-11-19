
import React, { useState } from 'react';
import { Microscope, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { reviewStudentCode } from '../services/aiService';
import { GET_SYSTEM_INSTRUCTION_REVIEW, TRANSLATIONS } from '../constants';
import MarkdownRenderer from './MarkdownRenderer';
import { Language, AIConfig } from '../types';

interface CodeReviewerProps {
  language: Language;
  config: AIConfig;
}

const CodeReviewer: React.FC<CodeReviewerProps> = ({ language, config }) => {
  const [code, setCode] = useState('');
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const t = TRANSLATIONS[language].review;

  const handleReview = async () => {
    if (!code.trim()) return;
    setLoading(true);
    const result = await reviewStudentCode(
        code,
        GET_SYSTEM_INSTRUCTION_REVIEW(language),
        language,
        config
    );
    setReview(result);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-slate-950 text-white p-6 gap-6">
      {/* Input Column */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Microscope className="mr-3 text-rose-500" />
            {t.title}
          </h2>
          <p className="text-slate-400 text-sm">{t.subtitle}</p>
        </div>
        
        <div className="flex-1 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col overflow-hidden shadow-lg">
          <div className="bg-slate-800/50 p-3 border-b border-slate-700 flex justify-between items-center">
             <span className="text-xs font-mono text-slate-400">{t.inputLabel}</span>
             <button 
               onClick={() => setCode('')}
               className="text-xs text-rose-400 hover:text-rose-300"
             >
               {t.clear}
             </button>
          </div>
          <textarea
            className="flex-1 bg-transparent p-4 font-mono text-sm text-slate-300 outline-none resize-none custom-scrollbar"
            placeholder={t.placeholder}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
          />
          <div className="p-4 border-t border-slate-800 bg-slate-900">
            <button
              onClick={handleReview}
              disabled={loading || !code}
              className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center transition-all ${
                loading || !code
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/20'
              }`}
            >
              {loading ? <Loader2 className="animate-spin mr-2" /> : <CheckCircle className="mr-2" />}
              {loading ? t.analyzing : t.start}
            </button>
          </div>
        </div>
      </div>

      {/* Output Column */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 flex-1 overflow-hidden shadow-lg flex flex-col">
           <div className="bg-slate-800/50 p-3 border-b border-slate-700">
             <span className="text-xs font-mono text-slate-400">{t.reportLabel}</span>
           </div>
           
           <div className="flex-1 p-6 overflow-y-auto custom-scrollbar bg-slate-950/30">
             {!review && !loading && (
               <div className="h-full flex flex-col items-center justify-center text-slate-600">
                 <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4 border border-slate-800">
                   <AlertTriangle className="w-8 h-8 text-amber-500/50" />
                 </div>
                 <p>{t.waiting}</p>
               </div>
             )}
             
             {loading && (
               <div className="h-full flex items-center justify-center">
                 <div className="space-y-4 w-full max-w-xs">
                    <div className="h-2 bg-slate-800 rounded animate-pulse w-3/4"></div>
                    <div className="h-2 bg-slate-800 rounded animate-pulse"></div>
                    <div className="h-2 bg-slate-800 rounded animate-pulse w-5/6"></div>
                 </div>
               </div>
             )}

             {review && !loading && (
               <MarkdownRenderer content={review} />
             )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default CodeReviewer;
