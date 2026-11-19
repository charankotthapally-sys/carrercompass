import {
  BarChart3,
  BookOpenCheck,
  Compass,
  FolderGit2,
  LayoutDashboard,
  UserPen,
  X,
} from 'lucide-react';
import { SAMPLE_PROFILES } from '../../shared/careerDataset.ts';
import type { SampleProfilePreset } from '../../shared/types.ts';

export type NavTab = 'dashboard' | 'skill-gap' | 'roadmap' | 'projects' | 'input';

interface SidebarNavProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onLoadSample: (preset: SampleProfilePreset) => void;
  activeStudentName: string;
  completedWeeksCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

const NAV_ITEMS: Array<{ id: NavTab; label: string; icon: typeof LayoutDashboard }> = [
  { id: 'dashboard', label: 'Career Dashboard', icon: LayoutDashboard },
  { id: 'skill-gap', label: 'Skill Gap Analysis', icon: BarChart3 },
  { id: 'roadmap', label: '8-Week Roadmap', icon: BookOpenCheck },
  { id: 'projects', label: 'Project Recommendations', icon: FolderGit2 },
  { id: 'input', label: 'Student Profile Input', icon: UserPen },
];

export function SidebarNav({
  activeTab,
  onSelectTab,
  onLoadSample,
  activeStudentName,
  completedWeeksCount,
  isOpenMobile,
  onCloseMobile,
}: SidebarNavProps) {
  const sidebarBody = (
    <div className="flex h-full flex-col bg-[#0B1530] text-slate-100 w-64 shrink-0 border-r border-white/10">
      {/* Brand Zone: clean 1-line wordmark */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
        <button
          type="button"
          onClick={() => {
            onSelectTab('dashboard');
            onCloseMobile();
          }}
          className="flex items-center gap-2.5 text-left focus-visible:outline-2 focus-visible:outline-violet-400 rounded-md"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white shrink-0">
            <Compass className="h-4.5 w-4.5" aria-hidden="true" />
          </span>
          <span className="font-display text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0">
            CareerCompass AI
          </span>
        </button>

        <button
          type="button"
          onClick={onCloseMobile}
          className="lg:hidden rounded-lg p-2 text-slate-300 hover:bg-white/10 hover:text-white min-h-[40px] min-w-[40px] flex items-center justify-center"
          aria-label="Close navigation menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectTab(item.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-left min-h-[42px] focus-visible:outline-2 focus-visible:outline-violet-400 ${
                isActive
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-white/8 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        {/* Sample Student Presets */}
        <div className="pt-6 mt-6 border-t border-white/10">
          <p className="px-3 mb-2 text-xs font-medium text-slate-400">
            Sample Student Profiles
          </p>
          <div className="space-y-1">
            {SAMPLE_PROFILES.map((preset) => {
              const isCurrent =
                activeStudentName.toLowerCase() === preset.profile.studentName.toLowerCase();
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    onLoadSample(preset);
                    onCloseMobile();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors min-h-[42px] focus-visible:outline-2 focus-visible:outline-violet-400 ${
                    isCurrent
                      ? 'bg-white/10 text-white'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-semibold truncate">{preset.label}</div>
                  <div className="text-[11px] text-slate-400 truncate">{preset.subtitle}</div>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Roadmap Progress Footer Summary */}
      <div className="px-5 py-4 border-t border-white/10 bg-[#070E20]/60">
        <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
          <span>Roadmap Progress</span>
          <span className="font-mono font-semibold tabular-nums text-white">
            {completedWeeksCount} / 8 wks
          </span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full bg-violet-500 transition-all duration-300"
            style={{ width: `${(completedWeeksCount / 8) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop persistent sidebar */}
      <aside className="hidden lg:block shrink-0">{sidebarBody}</aside>

      {/* Mobile slide-over drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-[1px]"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative z-10 flex h-full">{sidebarBody}</div>
        </div>
      )}
    </>
  );
}
