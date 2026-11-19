import { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';
import type { CareerAnalysisResponse } from '../../shared/types.ts';

interface ProjectsViewProps {
  analysis: CareerAnalysisResponse;
}

export function ProjectsView({ analysis }: ProjectsViewProps) {
  const { projects, profile, skillGap } = analysis;
  const [checkedSteps, setCheckedSteps] = useState<string[]>([]);

  const toggleStep = (stepKey: string) => {
    setCheckedSteps((prev) =>
      prev.includes(stepKey) ? prev.filter((k) => k !== stepKey) : [...prev, stepKey]
    );
  };

  return (
    <div className="space-y-6">
      <section className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="text-xs text-slate-500">
          Tailored for {profile.targetRole} · {skillGap.missingCoreSkills.length} missing core skills targeted
        </div>
        <h2 className="font-display text-xl font-bold text-navy-900 mt-1">
          3 Beginner-Friendly Portfolio Projects
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Each project below is scoped specifically around your missing core skills so every build directly closes an interview gap and strengthens your GitHub portfolio.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const completedInProject = project.buildSteps.filter((_, sIdx) =>
            checkedSteps.includes(`${project.id}-step-${sIdx}`)
          ).length;

          return (
            <article
              key={project.id}
              className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-500 tabular-nums">
                    <span>Project 0{index + 1}</span>
                    <span>
                      {project.difficulty} · {project.estimatedHours} hrs
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy-900 leading-snug">
                    {project.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">{project.summary}</p>

                <div className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-medium text-slate-500 mb-1.5">
                    Skill Gaps Bridged
                  </div>
                  <p className="text-xs font-semibold text-violet-700 leading-relaxed">
                    {project.targetedSkills.join(' · ')}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-navy-900">Build Checklist</span>
                    <span className="font-mono text-slate-500 tabular-nums">
                      {completedInProject}/{project.buildSteps.length}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {project.buildSteps.map((step, sIdx) => {
                      const stepKey = `${project.id}-step-${sIdx}`;
                      const checked = checkedSteps.includes(stepKey);
                      return (
                        <li key={stepKey}>
                          <button
                            type="button"
                            onClick={() => toggleStep(stepKey)}
                            className="flex items-start gap-2.5 text-left w-full group"
                          >
                            {checked ? (
                              <CheckSquare
                                className="h-4 w-4 text-violet-700 mt-0.5 shrink-0"
                                aria-hidden="true"
                              />
                            ) : (
                              <Square
                                className="h-4 w-4 text-slate-300 group-hover:text-violet-500 mt-0.5 shrink-0"
                                aria-hidden="true"
                              />
                            )}
                            <span
                              className={`text-xs leading-relaxed ${
                                checked ? 'line-through text-slate-400' : 'text-slate-700'
                              }`}
                            >
                              {step}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              <div className="rounded-lg bg-slate-50 border border-slate-200 p-3.5">
                <div className="text-xs font-semibold text-navy-900 mb-1">
                  Portfolio Impact Tip
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {project.portfolioTip}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
