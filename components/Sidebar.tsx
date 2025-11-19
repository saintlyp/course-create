
import React from 'react';
import { LayoutDashboard, BrainCircuit, Code2, Microscope, GraduationCap, Globe, Settings } from 'lucide-react';
import { AppMode, Language } from '../types';
import { NAV_ITEMS, TRANSLATIONS } from '../constants';

interface SidebarProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onOpenSettings: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  BrainCircuit,
  Code2,
  Microscope
};

const Sidebar: React.FC<SidebarProps> = ({ currentMode, setMode, language, setLanguage, onOpenSettings }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full transition-all duration-300">
      <div className="p-6 flex items-center justify-center lg:justify-start space-x-3 border-b border-slate-800">
        <div className="bg-primary p-2 rounded-lg">
            <GraduationCap className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold text-white hidden lg:block tracking-tight">
          {t.appTitle}
        </h1>
      </div>
      
      <nav className="flex-1 py-6 space-y-2 px-3">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = currentMode === item.id;
          const label = t.nav[item.id as AppMode];
          
          return (
            <button
              key={item.id}
              onClick={() => setMode(item.id as AppMode)}
              className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-primary/10 text-primary shadow-lg shadow-primary/5' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'group-hover:text-white'}`} />
              <span className={`ml-3 font-medium hidden lg:block`}>
                {label}
              </span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary hidden lg:block" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800 space-y-4">
        {/* Settings Button */}
        <button 
          onClick={onOpenSettings}
          className="w-full flex items-center justify-center lg:justify-start p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
        >
            <Settings className="w-5 h-5" />
            <span className="ml-3 text-sm font-medium hidden lg:block">{t.settings?.title || 'Settings'}</span>
        </button>

        {/* Language Toggle */}
        <div className="flex items-center justify-center lg:justify-start space-x-2 bg-slate-800/50 p-2 rounded-lg">
            <Globe className="w-4 h-4 text-slate-400" />
            <div className="hidden lg:flex space-x-1 text-xs font-medium">
                <button 
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-1 rounded transition-colors ${language === 'en' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    EN
                </button>
                <button 
                    onClick={() => setLanguage('cn')}
                    className={`px-2 py-1 rounded transition-colors ${language === 'cn' ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
                >
                    CN
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
