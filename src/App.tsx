import { useEffect, useState } from 'react';
import { Info, RefreshCw } from 'lucide-react';
import {
  buildDemoAnalysis,
  SAMPLE_PROFILES,
} from '../shared/careerDataset.ts';
import type {
  CareerAnalysisResponse,
  SampleProfilePreset,
  StudentProfile,
} from '../shared/types.ts';
import { DashboardOverview } from './components/DashboardOverview.tsx';
import { ProjectsView } from './components/ProjectsView.tsx';
import { RoadmapView } from './components/RoadmapView.tsx';
import { SidebarNav, type NavTab } from './components/SidebarNav.tsx';
import { SkillGapView } from './components/SkillGapView.tsx';
import { StudentInputForm } from './components/StudentInputForm.tsx';
import { TopHeader } from './components/TopHeader.tsx';

const STORAGE_KEY_ANALYSIS = 'careercompass_analysis_v1';
const STORAGE_KEY_WEEKS = 'careercompass_completed_weeks_v1';
const STORAGE_KEY_EXERCISES = 'careercompass_completed_exercises_v1';

function getInitialAnalysis(): CareerAnalysisResponse {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_ANALYSIS);
    if (saved) {
      const parsed = JSON.parse(saved) as CareerAnalysisResponse;
      if (parsed?.profile?.studentName && parsed?.skillGap && Array.isArray(parsed?.roadmap)) {
        return parsed;
      }
    }
  } catch {
    // Ignore storage read errors
  }
  return buildDemoAnalysis(
    SAMPLE_PROFILES[0].profile,
    'Showing pre-loaded sample profile in Demo Mode. Submit your own details or click "Retry Live Gemini AI" to personalize with Gemini.'
  );
}

function getInitialArray(key: string): string[] {
  try {
    const saved = localStorage.getItem(key);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Ignore storage errors
  }
  return [];
}

function getInitialWeeks(): number[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_WEEKS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.filter((n): n is number => typeof n === 'number');
      }
    }
  } catch {
    // Ignore storage errors
  }
  return [1];
}

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [analysis, setAnalysis] = useState<CareerAnalysisResponse>(getInitialAnalysis);
  const [completedWeeks, setCompletedWeeks] = useState<number[]>(getInitialWeeks);
  const [completedExercises, setCompletedExercises] = useState<string[]>(() =>
    getInitialArray(STORAGE_KEY_EXERCISES)
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ANALYSIS, JSON.stringify(analysis));
    } catch {
      // Ignore quota errors
    }
  }, [analysis]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_WEEKS, JSON.stringify(completedWeeks));
    } catch {
      // Ignore quota errors
    }
  }, [completedWeeks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_EXERCISES, JSON.stringify(completedExercises));
    } catch {
      // Ignore quota errors
    }
  }, [completedExercises]);

  const totalExercisesCount = analysis.roadmap.reduce(
    (sum, week) => sum + week.practicalExercises.length,
    0
  );

  const runServerAnalysis = async (
    profile: StudentProfile,
    preferDemo: boolean,
    redirectToDashboard = true
  ) => {
    setIsAnalyzing(true);
    setServerError(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profile, preferDemo }),
      });

      const payload = await res.json();
      if (!res.ok) {
        setServerError(payload?.error || 'Could not complete career analysis.');
        setIsAnalyzing(false);
        return;
      }

      setAnalysis(payload as CareerAnalysisResponse);
      setCompletedWeeks([]);
      setCompletedExercises([]);
      if (redirectToDashboard) {
        setActiveTab('dashboard');
      }
    } catch {
      setServerError(
        'Network error while reaching the analysis server. Please check your connection and try again.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleLoadSample = (preset: SampleProfilePreset) => {
    void runServerAnalysis(preset.profile, false, activeTab === 'input');
  };

  const handleAddLearnedSkill = (skillName: string) => {
    const updatedProfile: StudentProfile = {
      ...analysis.profile,
      existingSkills: Array.from(new Set([...analysis.profile.existingSkills, skillName])),
    };
    void runServerAnalysis(
      updatedProfile,
      analysis.analysisSource === 'demo',
      false
    );
  };

  const handleToggleWeekComplete = (weekNumber: number) => {
    setCompletedWeeks((prev) =>
      prev.includes(weekNumber)
        ? prev.filter((w) => w !== weekNumber)
        : [...prev, weekNumber].sort((a, b) => a - b)
    );
  };

  const handleToggleExercise = (exerciseKey: string) => {
    setCompletedExercises((prev) =>
      prev.includes(exerciseKey)
        ? prev.filter((k) => k !== exerciseKey)
        : [...prev, exerciseKey]
    );
  };

  const handleResetProgress = () => {
    setCompletedWeeks([]);
    setCompletedExercises([]);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      <SidebarNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onLoadSample={handleLoadSample}
        activeStudentName={analysis.profile.studentName}
        completedWeeksCount={completedWeeks.length}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader
          activeTab={activeTab}
          studentName={analysis.profile.studentName}
          targetRole={analysis.profile.targetRole}
          analysisSource={analysis.analysisSource}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onEditProfile={() => setActiveTab('input')}
        />

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
          {/* Transparent Mode Banner (Demo Mode vs Live Gemini AI) */}
          {analysis.analysisSource === 'demo' && (
            <div
              role="status"
              className="rounded-xl border border-violet-200 bg-violet-50/70 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-2.5 text-xs sm:text-sm text-navy-900">
                <Info
                  className="h-4 w-4 text-violet-700 mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <span className="font-semibold">
                    Demo Mode Active (Built-in Career Skills Dataset):
                  </span>{' '}
                  <span className="text-slate-700">
                    {analysis.aiNotice ||
                      'Displaying complete skill-gap metrics, 8-week roadmap, and projects using the built-in dataset.'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled={isAnalyzing}
                onClick={() => runServerAnalysis(analysis.profile, false, false)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-violet-300 bg-white px-3 py-1.5 text-xs font-semibold text-violet-800 hover:bg-violet-100 disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 self-start sm:self-center"
              >
                <RefreshCw
                  className={`h-3.5 w-3.5 ${isAnalyzing ? 'animate-spin' : ''}`}
                  aria-hidden="true"
                />
                <span>{isAnalyzing ? 'Connecting...' : 'Retry Live Gemini AI'}</span>
              </button>
            </div>
          )}

          {analysis.analysisSource === 'gemini' && (
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span>
                Personalized via Gemini AI ({analysis.modelUsed || 'gemini-4-hydrogen'}) ·
                Updated {new Date(analysis.generatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <DashboardOverview
              analysis={analysis}
              completedWeeks={completedWeeks}
              completedExercisesCount={completedExercises.length}
              totalExercisesCount={totalExercisesCount}
              onNavigate={setActiveTab}
              onToggleWeekComplete={handleToggleWeekComplete}
            />
          )}

          {activeTab === 'skill-gap' && (
            <SkillGapView
              analysis={analysis}
              onAddLearnedSkill={handleAddLearnedSkill}
              isUpdating={isAnalyzing}
            />
          )}

          {activeTab === 'roadmap' && (
            <RoadmapView
              analysis={analysis}
              completedWeeks={completedWeeks}
              completedExercises={completedExercises}
              onToggleWeekComplete={handleToggleWeekComplete}
              onToggleExercise={handleToggleExercise}
              onResetProgress={handleResetProgress}
            />
          )}

          {activeTab === 'projects' && <ProjectsView analysis={analysis} />}

          {activeTab === 'input' && (
            <StudentInputForm
              key={analysis.profile.studentName + analysis.profile.targetRole}
              initialProfile={analysis.profile}
              isSubmitting={isAnalyzing}
              serverError={serverError}
              onSubmitProfile={(profile, preferDemo) =>
                runServerAnalysis(profile, preferDemo, true)
              }
              onCancel={() => setActiveTab('dashboard')}
            />
          )}
        </main>

        <footer className="border-t border-slate-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span>CareerCompass AI · Student Skill Gap Analysis and Career Roadmap</span>
            <span>No account required · Local progress saved in your browser</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
