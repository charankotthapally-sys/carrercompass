import { useState } from 'react';
import type { DomainComparisonItem, SkillGapResult } from '../../shared/types.ts';

interface SkillChartsProps {
  skillGap: SkillGapResult;
  compact?: boolean;
}

export function DomainComparisonChart({
  domainBreakdown,
  compact = false,
}: {
  domainBreakdown: DomainComparisonItem[];
  compact?: boolean;
}) {
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Your current coverage vs. target role benchmark (100%)</span>
        <div className="flex items-center gap-4 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-violet-700" aria-hidden="true" />
            <span>Your Coverage</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-sm bg-slate-200" aria-hidden="true" />
            <span>Role Target</span>
          </span>
        </div>
      </div>

      <div className={compact ? 'space-y-3.5' : 'space-y-4'}>
        {domainBreakdown.map((item) => {
          const isHovered = hoveredDomain === item.domain;
          const gapPercent = Math.max(0, 100 - item.studentScore);
          return (
            <div
              key={item.domain}
              onMouseEnter={() => setHoveredDomain(item.domain)}
              onMouseLeave={() => setHoveredDomain(null)}
              className="group rounded-lg p-2 -mx-2 transition-colors hover:bg-slate-50"
            >
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <span className="text-sm font-medium text-slate-800">{item.domain}</span>
                <div className="flex items-center gap-2 text-xs tabular-nums shrink-0">
                  <span className="text-slate-500">
                    {item.coveredCount}/{item.totalCount} core skills
                  </span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="font-mono font-semibold text-navy-900">
                    {item.studentScore}%
                  </span>
                </div>
              </div>

              <div
                className="relative h-3 w-full rounded bg-slate-100 overflow-hidden border border-slate-200/80"
                role="progressbar"
                aria-valuenow={item.studentScore}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.domain} coverage: ${item.studentScore}%`}
              >
                {/* Target benchmark tick at 100% */}
                <div
                  className="h-full bg-violet-700 transition-all duration-300 ease-out"
                  style={{ width: `${item.studentScore}%` }}
                />
              </div>

              {isHovered && (
                <p className="mt-1.5 text-xs text-slate-500 tabular-nums">
                  {gapPercent === 0
                    ? 'All core competencies in this domain are covered.'
                    : `${gapPercent}% remaining to reach full ${item.domain.toLowerCase()} benchmark.`}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SkillCoverageDonut({ skillGap }: SkillChartsProps) {
  const matchedCount = skillGap.matchedCoreSkills.length;
  const missingCount = skillGap.missingCoreSkills.length;
  const bonusCount = skillGap.matchedBonusSkills.length;
  const totalCore = matchedCount + missingCount;

  const size = 164;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const matchedRatio = totalCore > 0 ? matchedCount / totalCore : 0;
  const matchedLength = circumference * matchedRatio;
  const missingLength = circumference - matchedLength;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          role="img"
          aria-label={`Skill readiness ${skillGap.skillReadinessPercent}%`}
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#6D28D9"
            strokeWidth={strokeWidth}
            strokeDasharray={`${matchedLength} ${missingLength}`}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-display text-3xl font-bold text-navy-900 tabular-nums">
            {skillGap.skillReadinessPercent}%
          </span>
          <span className="text-xs font-medium text-slate-500">Core Match</span>
        </div>
      </div>

      <div className="w-full space-y-3 divide-y divide-slate-100">
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <span className="w-2.5 h-2.5 rounded-sm bg-violet-700 shrink-0" aria-hidden="true" />
            <span>Matched Core Skills</span>
          </div>
          <span className="font-mono text-sm font-semibold text-navy-900 tabular-nums">
            {matchedCount} / {totalCore}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-300 shrink-0" aria-hidden="true" />
            <span>Missing Core Skills</span>
          </div>
          <span className="font-mono text-sm font-semibold text-navy-900 tabular-nums">
            {missingCount}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <span className="w-2.5 h-2.5 rounded-sm bg-navy-800 shrink-0" aria-hidden="true" />
            <span>Bonus Skills Acquired</span>
          </div>
          <span className="font-mono text-sm font-semibold text-navy-900 tabular-nums">
            {bonusCount}
          </span>
        </div>
      </div>
    </div>
  );
}
