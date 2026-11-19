import { Check, Plus, ShieldAlert, Sparkles } from 'lucide-react';
import { CAREER_DATASET } from '../../shared/careerDataset.ts';
import type { CareerAnalysisResponse } from '../../shared/types.ts';
import { DomainComparisonChart, SkillCoverageDonut } from './SkillCharts.tsx';

interface SkillGapViewProps {
  analysis: CareerAnalysisResponse;
  onAddLearnedSkill: (skillName: string) => void;
  isUpdating: boolean;
}

const PRIORITY_LABEL: Record<1 | 2 | 3, string> = {
  3: 'Critical Foundation',
  2: 'Core Competency',
  1: 'Applied Essential',
};

export function SkillGapView({
  analysis,
  onAddLearnedSkill,
  isUpdating,
}: SkillGapViewProps) {
  const { profile, skillGap } = analysis;
  const roleDef = CAREER_DATASET[profile.targetRole];

  return (
    <div className="space-y-6">
      {/* Top Overview Bar */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="text-xs text-slate-500">
            Target Role Benchmark · {profile.targetRole}
          </div>
          <h2 className="font-display text-xl font-bold text-navy-900">
            Skill Gap Comparison for {profile.studentName}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">{roleDef.overview}</p>
        </div>

        <div className="flex items-center gap-6 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 pt-4 lg:pt-0 lg:pl-6">
          <div>
            <div className="text-xs text-slate-500">Skill Readiness</div>
            <div className="font-display text-3xl font-bold text-violet-700 tabular-nums">
              {skillGap.skillReadinessPercent}%
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Employability</div>
            <div className="font-display text-3xl font-bold text-navy-900 tabular-nums">
              {skillGap.employabilityScore}%
            </div>
          </div>
        </div>
      </section>

      {/* Visual Comparison Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-display text-base font-semibold text-navy-900 mb-4">
            Domain Readiness Comparison Chart
          </h3>
          <DomainComparisonChart domainBreakdown={skillGap.domainBreakdown} />
        </div>

        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6">
          <h3 className="font-display text-base font-semibold text-navy-900 mb-5">
            Core vs. Bonus Coverage
          </h3>
          <SkillCoverageDonut skillGap={skillGap} />
        </div>
      </section>

      {/* 3-Column Skill Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Existing Skills */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-display text-base font-semibold text-navy-900">
              Existing Skills
            </h3>
            <span className="font-mono text-xs font-semibold text-emerald-700 tabular-nums">
              {skillGap.matchedCoreSkills.length +
                skillGap.matchedBonusSkills.length +
                skillGap.additionalSkills.length}{' '}
              total
            </span>
          </div>

          {skillGap.matchedCoreSkills.length === 0 &&
          skillGap.matchedBonusSkills.length === 0 &&
          skillGap.additionalSkills.length === 0 ? (
            <p className="text-sm text-slate-500">
              No existing skills matched yet. Add skills in your profile to benchmark readiness.
            </p>
          ) : (
            <div className="space-y-4">
              {skillGap.matchedCoreSkills.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-2">
                    Matched Core Role Skills
                  </p>
                  <ul className="divide-y divide-slate-100">
                    {skillGap.matchedCoreSkills.map((skill) => (
                      <li key={skill.name} className="py-2.5 flex items-start gap-2.5">
                        <Check
                          className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0"
                          aria-hidden="true"
                        />
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {skill.name}
                          </div>
                          <div className="text-xs text-slate-500">{skill.domain}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {skillGap.additionalSkills.length > 0 && (
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs font-medium text-slate-500 mb-2">
                    Other Technical Skills Recorded
                  </p>
                  <ul className="space-y-1.5">
                    {skillGap.additionalSkills.map((skill) => (
                      <li
                        key={skill}
                        className="text-sm text-slate-700 flex items-center gap-2"
                      >
                        <Check className="h-3.5 w-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Column 2: Missing Core Skills */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-display text-base font-semibold text-navy-900">
              Missing Core Skills
            </h3>
            <span className="font-mono text-xs font-semibold text-amber-700 tabular-nums">
              {skillGap.missingCoreSkills.length} gaps
            </span>
          </div>

          {skillGap.missingCoreSkills.length === 0 ? (
            <div className="py-6 text-center space-y-2">
              <p className="text-sm font-medium text-emerald-700">
                All core skills covered
              </p>
              <p className="text-xs text-slate-500">
                Focus on bonus differentiators and portfolio projects to stand out.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {skillGap.missingCoreSkills.map((skill) => (
                <li key={skill.name} className="py-3 first:pt-0 space-y-1.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <ShieldAlert
                        className="h-4 w-4 text-amber-600 mt-0.5 shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <div className="text-sm font-semibold text-slate-900">
                          {skill.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {PRIORITY_LABEL[skill.weight]} · {skill.domain}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => onAddLearnedSkill(skill.name)}
                      title={`Mark ${skill.name} as acquired`}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-700 hover:border-violet-400 hover:bg-violet-50 hover:text-violet-800 disabled:opacity-50 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Plus className="h-3 w-3" aria-hidden="true" />
                      <span>I know this</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 pl-6 leading-relaxed">
                    {skill.description}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Column 3: Bonus Skills */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
            <h3 className="font-display text-base font-semibold text-navy-900">
              Bonus Skills
            </h3>
            <span className="font-mono text-xs font-semibold text-violet-700 tabular-nums">
              {skillGap.matchedBonusSkills.length} acquired
            </span>
          </div>

          <div className="space-y-5">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">
                Bonus Skills You Have
              </p>
              {skillGap.matchedBonusSkills.length === 0 ? (
                <p className="text-xs text-slate-500">
                  None acquired yet—adding 1–2 below strengthens internship and job applications.
                </p>
              ) : (
                <ul className="space-y-2">
                  {skillGap.matchedBonusSkills.map((bonus) => (
                    <li
                      key={bonus}
                      className="flex items-center gap-2 text-sm font-medium text-navy-900"
                    >
                      <Sparkles className="h-4 w-4 text-violet-700 shrink-0" aria-hidden="true" />
                      <span>{bonus}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-xs font-medium text-slate-500 mb-2">
                Recommended Differentiators
              </p>
              <ul className="divide-y divide-slate-100">
                {skillGap.recommendedBonusSkills.map((bonus) => (
                  <li
                    key={bonus}
                    className="py-2.5 flex items-center justify-between gap-2"
                  >
                    <span className="text-sm text-slate-700">{bonus}</span>
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => onAddLearnedSkill(bonus)}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:border-violet-400 hover:text-violet-800 disabled:opacity-50 transition-colors whitespace-nowrap shrink-0"
                    >
                      <Plus className="h-3 w-3" aria-hidden="true" />
                      <span>Add</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
