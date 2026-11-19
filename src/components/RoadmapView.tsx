import { useState } from 'react';
import { CheckCircle2, Circle, RotateCcw } from 'lucide-react';
import type { CareerAnalysisResponse } from '../../shared/types.ts';

interface RoadmapViewProps {
  analysis: CareerAnalysisResponse;
  completedWeeks: number[];
  completedExercises: string[];
  onToggleWeekComplete: (weekNumber: number) => void;
  onToggleExercise: (exerciseKey: string) => void;
  onResetProgress: () => void;
}

type FilterMode = 'all' | 'pending' | 'completed';

export function RoadmapView({
  analysis,
  completedWeeks,
  completedExercises,
  onToggleWeekComplete,
  onToggleExercise,
  onResetProgress,
}: RoadmapViewProps) {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [filterMode, setFilterMode] = useState<FilterMode>('all');

  const { roadmap, profile } = analysis;

  const filteredWeeks = roadmap.filter((week) => {
    const isDone = completedWeeks.includes(week.weekNumber);
    if (filterMode === 'pending') return !isDone;
    if (filterMode === 'completed') return isDone;
    return true;
  });

  const activeWeek =
    roadmap.find((w) => w.weekNumber === selectedWeek) ?? roadmap[0];
  const isActiveWeekDone = completedWeeks.includes(activeWeek.weekNumber);
  const totalWeeksDone = completedWeeks.length;

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 tabular-nums">
            {profile.targetRole} · {profile.studyHoursPerWeek} hrs/week · {totalWeeksDone} of 8 weeks completed
          </div>
          <h2 className="font-display text-xl font-bold text-navy-900 mt-1">
            Personalized 8-Week Career Roadmap
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 border border-slate-200">
            {(
              [
                { id: 'all', label: 'All 8 Weeks' },
                { id: 'pending', label: 'In Progress' },
                { id: 'completed', label: 'Completed' },
              ] as Array<{ id: FilterMode; label: string }>
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterMode(tab.id)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  filterMode === tab.id
                    ? 'bg-white text-navy-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {(completedWeeks.length > 0 || completedExercises.length > 0) && (
            <button
              type="button"
              onClick={onResetProgress}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 whitespace-nowrap"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset Progress</span>
            </button>
          )}
        </div>
      </section>

      {/* Master-Detail Split Layout: Week Selector List + Detailed Weekly Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Week List */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
          {filteredWeeks.length === 0 ? (
            <div className="p-6 text-center text-sm text-slate-500">
              No weeks match the "{filterMode}" filter.
            </div>
          ) : (
            filteredWeeks.map((week) => {
              const isSelected = week.weekNumber === activeWeek.weekNumber;
              const isDone = completedWeeks.includes(week.weekNumber);
              return (
                <button
                  key={week.weekNumber}
                  type="button"
                  onClick={() => setSelectedWeek(week.weekNumber)}
                  className={`w-full text-left p-4 transition-colors flex items-start gap-3 ${
                    isSelected ? 'bg-violet-50/70' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="mt-0.5 shrink-0">
                    {isDone ? (
                      <CheckCircle2
                        className="h-4.5 w-4.5 text-violet-700"
                        aria-hidden="true"
                      />
                    ) : (
                      <Circle
                        className={`h-4.5 w-4.5 ${
                          isSelected ? 'text-violet-600' : 'text-slate-300'
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 tabular-nums">
                      <span>Week {week.weekNumber}</span>
                      <span>{week.estimatedHours} hrs</span>
                    </div>
                    <div
                      className={`text-sm font-semibold mt-0.5 ${
                        isSelected ? 'text-violet-900' : 'text-navy-900'
                      }`}
                    >
                      {week.title.replace(/^Week \d+:\s*/i, '')}
                    </div>
                    <div className="text-xs text-slate-500 truncate mt-0.5">
                      Focus: {week.focusArea}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right Detailed Week Curriculum */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-7">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
            <div className="space-y-1">
              <div className="text-xs font-medium text-violet-700 tabular-nums">
                Week {activeWeek.weekNumber} of 8 · {activeWeek.estimatedHours} hours estimated · {activeWeek.focusArea}
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-navy-900">
                {activeWeek.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => onToggleWeekComplete(activeWeek.weekNumber)}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0 min-h-[40px] ${
                isActiveWeekDone
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-navy-900 text-white hover:bg-navy-800'
              }`}
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              <span>{isActiveWeekDone ? 'Week Completed' : 'Mark Week Complete'}</span>
            </button>
          </div>

          {/* Topics to Learn & Learning Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-display text-sm font-semibold text-navy-900">
                Topics to Learn
              </h4>
              <ul className="space-y-2.5">
                {activeWeek.topicsToLearn.map((topic, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed"
                  >
                    <span className="font-mono text-xs font-semibold text-violet-700 tabular-nums mt-0.5 shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-display text-sm font-semibold text-navy-900">
                Learning Objectives
              </h4>
              <ul className="space-y-2.5">
                {activeWeek.learningObjectives.map((obj, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-navy-800 mt-2 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Practical Exercises (Checkable) */}
          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="font-display text-sm font-semibold text-navy-900">
              Practical Exercises
            </h4>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg">
              {activeWeek.practicalExercises.map((exercise, idx) => {
                const key = `w${activeWeek.weekNumber}-e${idx}`;
                const checked = completedExercises.includes(key);
                return (
                  <label
                    key={key}
                    className="flex items-start gap-3 p-3.5 cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleExercise(key)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-violet-700 focus:ring-violet-600 shrink-0"
                    />
                    <span
                      className={`text-sm leading-relaxed ${
                        checked ? 'line-through text-slate-400' : 'text-slate-700'
                      }`}
                    >
                      {exercise}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Weekly Milestone */}
          <div className="rounded-lg bg-slate-50 border border-slate-200 p-4 space-y-1">
            <div className="text-xs font-semibold text-violet-700">
              Weekly Milestone Deliverable
            </div>
            <p className="text-sm font-medium text-navy-900 leading-relaxed">
              {activeWeek.weeklyMilestone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
