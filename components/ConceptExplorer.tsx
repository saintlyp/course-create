
import React, { useState } from 'react';
import { Search, BookOpen, Sparkles, Loader2, ChevronRight, ChevronDown, Map } from 'lucide-react';
import { generateConceptExplanation } from '../services/aiService';
import { GET_SYSTEM_INSTRUCTION_CONCEPT, getKnowledgeMap, TRANSLATIONS } from '../constants';
import MarkdownRenderer from './MarkdownRenderer';
import { Language, AIConfig, KnowledgeNode } from '../types';

interface ConceptExplorerProps {
  language: Language;
  config: AIConfig;
}

const ConceptExplorer: React.FC<ConceptExplorerProps> = ({ language, config }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({ 'foundations': true });
  const t = TRANSLATIONS[language].concept;

  const knowledgeMap = getKnowledgeMap(language);

  const handleExplore = async (term: string) => {
    if (!term.trim()) return;
    setLoading(true);
    setSearchTerm(term);
    const result = await generateConceptExplanation(
        term, 
        GET_SYSTEM_INSTRUCTION_CONCEPT(language),
        language,
        config
    );
    setExplanation(result);
    setLoading(false);
  };

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const renderKnowledgeNode = (node: KnowledgeNode, depth: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes[node.id];

    return (
      <div key={node.id} className="select-none">
        <div 
          className={`flex items-center py-2 px-3 rounded-lg cursor-pointer transition-colors ${
            searchTerm === node.title ? 'bg-secondary/20 text-secondary' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
          }`}
          style={{ paddingLeft: `${depth * 12 + 12}px` }}
          onClick={() => {
             if (hasChildren) {
                 toggleNode(node.id);
             } else {
                 handleExplore(node.title);
             }
          }}
        >
           {hasChildren && (
             <span className="mr-2">
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
             </span>
           )}
           {!hasChildren && <span className="w-4 h-4 mr-2 rounded-full bg-slate-700 border border-slate-600 scale-50" />}
           <span className="text-sm font-medium">{node.title}</span>
        </div>
        {hasChildren && isExpanded && (
          <div className="border-l border-slate-800 ml-4">
             {node.children?.map(child => renderKnowledgeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex bg-slate-950 text-white overflow-hidden">
      {/* Left: Knowledge Map Sidebar */}
      <div className="w-80 bg-slate-900/50 border-r border-slate-800 flex flex-col hidden md:flex">
         <div className="p-4 border-b border-slate-800 flex items-center space-x-2">
             <Map className="w-5 h-5 text-secondary" />
             <h3 className="font-bold text-slate-200">{t.roadmapTitle}</h3>
         </div>
         <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
             {knowledgeMap.map(node => renderKnowledgeNode(node))}
         </div>
      </div>

      {/* Right: Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="p-6 flex flex-col h-full">
            <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-teal-400">
                {t.title}
            </h2>
            <p className="text-slate-400 text-sm">{t.subtitle}</p>
            </div>

            {/* Search Bar */}
            <form onSubmit={(e) => { e.preventDefault(); handleExplore(searchTerm); }} className="relative mb-6 z-10">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
                type="text"
                className="w-full bg-slate-900/80 border border-slate-700 text-white rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none shadow-2xl transition-all backdrop-blur-sm"
                placeholder={t.placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
                type="submit"
                disabled={loading || !searchTerm}
                className="absolute right-2 top-2 bottom-2 bg-secondary hover:bg-secondary/90 text-slate-900 font-bold py-2 px-6 rounded-xl transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : t.explore}
            </button>
            </form>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur relative custom-scrollbar">
            {!explanation && !loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
                <div className="bg-slate-800 p-6 rounded-full mb-6 animate-float">
                    <Sparkles className="w-12 h-12 text-yellow-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-300 mb-2">{t.ready}</h3>
                <p className="max-w-md">{t.readyDesc}</p>
                </div>
            )}

            {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-700 border-t-secondary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-secondary animate-pulse" />
                    </div>
                </div>
                <p className="mt-4 text-secondary font-mono text-sm">{t.synthesizing}</p>
                </div>
            )}

            {explanation && !loading && (
                <div className="p-8 md:p-10">
                <MarkdownRenderer content={explanation} />
                </div>
            )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptExplorer;
