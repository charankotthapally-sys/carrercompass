import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Edit3,
} from 'lucide-react';
import { CAREER_DATASET } from '../../shared/careerDataset.ts';
import type { CareerAnalysisResponse } from '../../shared/types.ts';
import { DomainComparisonChart, SkillCoverageDonut } from './SkillCharts.tsx';
import type { NavTab } from './SidebarNav.tsx';

interface DashboardOverviewProps {
  analysis: CareerAnalysisResponse;
  completedWeeks: number[];
  completedExercisesCount: number;
  totalExercisesCount: number;
  onNavigate: (tab: NavTab) => void;
  onToggleWeekComplete: (weekNumber: number) => void;
}

export function DashboardOverview({
  analysis,
  completedWeeks,
  completedExercisesCount,
  totalExercisesCount,
  onNavigate,
  onToggleWeekComplete,
}: DashboardOverviewProps) {
  const { profile, skillGap, careerSummary, nextSteps, roadmap, projects } = analysis;
  const roleInfo = CAREER_DATASET[profile.targetRole];
  const roadmapProgressPercent = Math.round((completedWeeks.length / 8) * 100);
  const totalPlannedHours = roadmap.reduce((acc, w) => acc + w.estimatedHours, 0);

  const nextPendingWeek =
    roadmap.find((w) => !completedWeeks.includes(w.weekNumber)) ?? roadmap[0];

  return (
    <div className="space-y-6">
      {/* Deep Navy Career Readiness Hero Summary */}
      <section className="rounded-xl bg-[#0B1530] text-white p-6 sm:p-8 border border-[#1D3266]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span>Student Profile</span>
              <span aria-hidden="true">·</span>
              <span>{profile.educationLevel}</span>
              <span aria-hidden="true">·</span>
              <span>{profile.branch}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{profile.studyHoursPerWeek} hrs/week</span>
            </div>

            <div className="space-y-2">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
                {profile.studentName} — {profile.targetRole} Track
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
                {careerSummary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('roadmap')}
                className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-violet-500 transition-colors whitespace-nowrap min-h-[40px]"
              >
                <span>Continue Week {nextPendingWeek.weekNumber}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('input')}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors whitespace-nowrap min-h-[40px]"
              >
                <Edit3 className="h-4 w-4" aria-hidden="true" />
                <span>Edit Profile</span>
              </button>
            </div>
          </div>

          {/* Employability Readiness Score Anchor */}
          <div className="lg:col-span-4 rounded-xl bg-[#13224A] border border-white/10 p-5 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-medium text-slate-300">
                Employability Readiness Score
              </span>
              <span className="text-xs font-medium text-violet-300">
                {skillGap.readinessTier}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-bold text-white tabular-nums">
                {skillGap.employabilityScore}%
              </span>
              <span className="text-xs text-slate-300">
                ({profile.experienceLevel} level)
              </span>
            </div>

            <div className="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-violet-500 transition-all duration-500"
                style={{ width: `${skillGap.employabilityScore}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-xs">
              <div>
                <div className="text-slate-400">Core Match</div>
                <div className="font-mono font-semibold text-white tabular-nums mt-0.5">
                  {skillGap.skillReadinessPercent}%
                </div>
              </div>
              <div>
                <div className="text-slate-400">Missing</div>
                <div className="font-mono font-semibold text-white tabular-nums mt-0.5">
                  {skillGap.missingCoreSkills.length} skills
                </div>
              </div>
              <div>
                <div className="text-slate-400">Bonus</div>
                <div className="font-mono font-semibold text-white tabular-nums mt-0.5">
                  {skillGap.matchedBonusSkills.length} skills
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Key Metric Strip */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs font-medium text-slate-500">Target Career</div>
          <div className="font-display text-lg font-bold text-navy-900 mt-1 truncate">
            {profile.targetRole}
          </div>
          <p className="text-xs text-slate-600 mt-1.5 line-clamp-2">{roleInfo.tagline}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs font-medium text-slate-500">Skill Readiness</div>
          <div className="font-display text-2xl font-bold text-navy-900 mt-1 tabular-nums">
            {skillGap.skillReadinessPercent}%
          </div>
          <p className="text-xs text-slate-600 mt-1.5 tabular-nums">
            {skillGap.matchedCoreSkills.length} of{' '}
            {skillGap.matchedCoreSkills.length + skillGap.missingCoreSkills.length} core skills matched
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs font-medium text-slate-500">Learning Progress</div>
          <div className="font-display text-2xl font-bold text-violet-700 mt-1 tabular-nums">
            {roadmapProgressPercent}%
          </div>
          <p className="text-xs text-slate-600 mt-1.5 tabular-nums">
            {completedWeeks.length} / 8 weeks · {completedExercisesCount}/{totalExercisesCount} tasks
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-xs font-medium text-slate-500">8-Week Study Budget</div>
          <div className="font-display text-2xl font-bold text-navy-900 mt-1 tabular-nums">
            {totalPlannedHours} hrs
          </div>
          <p className="text-xs text-slate-600 mt-1.5 tabular-nums">
            {profile.studyHoursPerWeek} hrs/week · {projects.length} tailored projects
          </p>
        </div>
      </section>

      {/* Skills Comparison & Coverage Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="font-display text-base font-semibold text-navy-900">
                Skills Comparison by Domain
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                How your current skillset compares against {profile.targetRole} benchmarks
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('skill-gap')}
              className="text-xs font-medium text-violet-700 hover:text-violet-900 whitespace-nowrap shrink-0"
            >
              Full Gap Breakdown →
            </button>
          </div>
          <DomainComparisonChart domainBreakdown={skillGap.domainBreakdown} compact />
        </div>

        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-display text-base font-semibold text-navy-900 mb-1">
              Core vs. Missing Skill Balance
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Weighted coverage across essential {profile.targetRole} requirements
            </p>
            <SkillCoverageDonut skillGap={skillGap} />
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>
              Top priority gap:{' '}
              <strong className="text-navy-900">
                {skillGap.missingCoreSkills[0]?.name ?? 'None — focus on bonus depth'}
              </strong>
            </span>
          </div>
        </div>
      </section>

      {/* Recommended Next Steps & Active Learning Progress */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recommended Next Steps */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-display text-base font-semibold text-navy-900 mb-1">
            Recommended Next Steps
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            Prioritized action plan tailored to your {profile.studyHoursPerWeek} hrs/week pace
          </p>

          <ol className="divide-y divide-slate-100">
            {nextSteps.map((step, idx) => (
              <li key={idx} className="py-3.5 first:pt-1 last:pb-1 flex items-start gap-3">
                <span className="font-mono text-xs font-semibold text-violet-700 tabular-nums mt-0.5 shrink-0">
                  0{idx + 1}.
                </span>
                <p className="text-sm text-slate-700 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Interactive Weekly Milestone Tracker */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <h3 className="font-display text-base font-semibold text-navy-900">
                8-Week Milestone Tracker
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Check off completed weeks to update your learning progress
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('roadmap')}
              className="text-xs font-medium text-violet-700 hover:text-violet-900 whitespace-nowrap shrink-0"
            >
              Open Roadmap →
            </button>
          </div>

          <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto pr-1">
            {roadmap.map((week) => {
              const done = completedWeeks.includes(week.weekNumber);
              return (
                <div
                  key={week.weekNumber}
                  className="py-2.5 flex items-center justify-between gap-3"
                >
                  <button
                    type="button"
                    onClick={() => onToggleWeekComplete(week.weekNumber)}
                    className="flex items-center gap-3 text-left group min-w-0 flex-1"
                  >
                    {done ? (
                      <CheckCircle2
                        className="h-4.5 w-4.5 text-violet-700 shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <Circle
                        className="h-4.5 w-4.5 text-slate-300 group-hover:text-violet-500 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <div className="min-w-0">
                      <div
                        className={`text-sm font-medium truncate ${
                          done ? 'line-through text-slate-400' : 'text-slate-800'
                        }`}
                      >
                        {week.title}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {week.focusArea} · {week.estimatedHours} hrs
                      </div>
                    </div>
                  </button>

                  <span className="font-mono text-xs text-slate-500 tabular-nums shrink-0">
                    {done ? 'Done' : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
