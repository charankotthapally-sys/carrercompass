import { Menu, SlidersHorizontal } from 'lucide-react';
import type { NavTab } from './SidebarNav.tsx';

interface TopHeaderProps {
  activeTab: NavTab;
  studentName: string;
  targetRole: string;
  analysisSource: 'gemini' | 'demo';
  onOpenMobileMenu: () => void;
  onEditProfile: () => void;
}

const TAB_TITLES: Record<NavTab, string> = {
  dashboard: 'Career Dashboard',
  'skill-gap': 'Skill Gap Analysis',
  roadmap: '8-Week Learning Roadmap',
  projects: 'Project Recommendations',
  input: 'Student Profile & Goals',
};

export function TopHeader({
  activeTab,
  studentName,
  targetRole,
  analysisSource,
  onOpenMobileMenu,
  onEditProfile,
}: TopHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Mobile trigger + Context Title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 min-h-[40px] min-w-[40px]"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <h1 className="font-display text-lg font-bold text-navy-900 truncate">
              {TAB_TITLES[activeTab]}
            </h1>
          </div>
        </div>

        {/* Zone 2: Clean unboxed metadata context */}
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 whitespace-nowrap shrink-0">
          <span className="font-medium text-slate-800">{studentName}</span>
          <span aria-hidden="true">·</span>
          <span>{targetRole}</span>
          <span aria-hidden="true">·</span>
          <span className={analysisSource === 'gemini' ? 'text-violet-700 font-medium' : 'text-slate-600 font-medium'}>
            {analysisSource === 'gemini' ? 'Gemini AI Personalized' : 'Demo Dataset Mode'}
          </span>
        </div>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center shrink-0">
          {activeTab !== 'input' ? (
            <button
              type="button"
              onClick={onEditProfile}
              className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-4 py-2 text-xs sm:text-sm font-medium text-white hover:bg-violet-800 transition-colors whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
            >
              <SlidersHorizontal className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Analyze New Profile</span>
            </button>
          ) : (
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap shrink-0">
              Complete form below
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
