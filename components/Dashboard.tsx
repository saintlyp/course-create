import React from 'react';
import { Activity, Award, Zap, ArrowRight } from 'lucide-react';
import { AppMode, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface DashboardProps {
  setMode: (mode: AppMode) => void;
  language: Language;
}

const Dashboard: React.FC<DashboardProps> = ({ setMode, language }) => {
  const t = TRANSLATIONS[language].dashboard;

  return (
    <div className="p-8 max-w-7xl mx-auto h-full overflow-y-auto">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">{t.welcome}</h1>
        <p className="text-slate-400 text-lg">{t.subtext}</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {t.stats.map((stat, index) => (
          <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               {index === 0 ? <Award size={60} /> : index === 1 ? <CodeIcon size={60} /> : <Zap size={60} />}
            </div>
            <p className="text-slate-400 text-sm font-medium mb-1">{stat.label}</p>
            <div className="flex items-end space-x-3">
              <span className="text-3xl font-bold text-white">{stat.value}</span>
              <span className="text-emerald-400 text-xs font-mono bg-emerald-400/10 px-2 py-1 rounded mb-1">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/30 rounded-2xl p-8 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-white mb-2">{t.startCreation}</h3>
            <p className="text-indigo-200 mb-6 max-w-md">
              {t.startCreationDesc}
            </p>
            <button 
              onClick={() => setMode(AppMode.CodeCreator)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium flex items-center transition-colors shadow-lg shadow-indigo-900/50"
            >
              {t.launchStudio} <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col">
          <div className="w-12 h-12 bg-teal-500/10 rounded-xl flex items-center justify-center mb-4">
             <Zap className="text-teal-400 w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{t.conceptDive}</h3>
          <p className="text-slate-400 text-sm mb-6 flex-1">
            {t.conceptDiveDesc}
          </p>
          <button 
            onClick={() => setMode(AppMode.ConceptExplorer)}
            className="text-teal-400 font-medium hover:text-teal-300 flex items-center text-sm"
          >
            {t.exploreConcepts} <ArrowRight className="ml-1 w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

const CodeIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export default Dashboard;