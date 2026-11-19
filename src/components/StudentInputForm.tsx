import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { ArrowRight, Loader2, Plus, RotateCcw, X } from 'lucide-react';
import {
  CAREER_DATASET,
  CAREER_ROLES,
  EDUCATION_LEVELS,
  EXPERIENCE_LEVELS,
  normalizeSkillName,
  SAMPLE_PROFILES,
} from '../../shared/careerDataset.ts';
import type {
  CareerRole,
  ExperienceLevel,
  SampleProfilePreset,
  StudentProfile,
} from '../../shared/types.ts';

interface StudentInputFormProps {
  initialProfile: StudentProfile;
  isSubmitting: boolean;
  serverError: string | null;
  onSubmitProfile: (profile: StudentProfile, preferDemo: boolean) => void;
  onCancel?: () => void;
}

interface ValidationErrors {
  studentName?: string;
  educationLevel?: string;
  branch?: string;
  studyHoursPerWeek?: string;
  existingSkills?: string;
}

export function StudentInputForm({
  initialProfile,
  isSubmitting,
  serverError,
  onSubmitProfile,
  onCancel,
}: StudentInputFormProps) {
  const [studentName, setStudentName] = useState(initialProfile.studentName);
  const [educationLevel, setEducationLevel] = useState(initialProfile.educationLevel);
  const [branch, setBranch] = useState(initialProfile.branch);
  const [targetRole, setTargetRole] = useState<CareerRole>(initialProfile.targetRole);
  const [existingSkills, setExistingSkills] = useState<string[]>(
    initialProfile.existingSkills
  );
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(
    initialProfile.experienceLevel
  );
  const [studyHoursPerWeek, setStudyHoursPerWeek] = useState<number>(
    initialProfile.studyHoursPerWeek
  );
  const [skillInput, setSkillInput] = useState('');
  const [preferDemo, setPreferDemo] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const roleConfig = CAREER_DATASET[targetRole];

  const handleLoadPreset = (preset: SampleProfilePreset) => {
    setStudentName(preset.profile.studentName);
    setEducationLevel(preset.profile.educationLevel);
    setBranch(preset.profile.branch);
    setTargetRole(preset.profile.targetRole);
    setExistingSkills([...preset.profile.existingSkills]);
    setExperienceLevel(preset.profile.experienceLevel);
    setStudyHoursPerWeek(preset.profile.studyHoursPerWeek);
    setErrors({});
  };

  const addSkill = (rawSkill: string) => {
    const normalized = normalizeSkillName(rawSkill);
    if (!normalized) return;
    const alreadyExists = existingSkills.some(
      (s) => s.toLowerCase() === normalized.toLowerCase()
    );
    if (!alreadyExists) {
      setExistingSkills((prev) => [...prev, normalized]);
      setErrors((prev) => ({ ...prev, existingSkills: undefined }));
    }
    setSkillInput('');
  };

  const removeSkill = (skillToRemove: string) => {
    setExistingSkills((prev) => prev.filter((s) => s !== skillToRemove));
  };

  const handleSkillKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  const validate = (): boolean => {
    const nextErrors: ValidationErrors = {};
    if (studentName.trim().length < 2) {
      nextErrors.studentName = 'Enter your full name (at least 2 characters).';
    }
    if (!educationLevel.trim()) {
      nextErrors.educationLevel = 'Select your current education level.';
    }
    if (branch.trim().length < 2) {
      nextErrors.branch = 'Enter your branch or department (e.g., CSE, IT, ECE).';
    }
    if (!Number.isFinite(studyHoursPerWeek) || studyHoursPerWeek < 1 || studyHoursPerWeek > 60) {
      nextErrors.studyHoursPerWeek = 'Enter weekly study hours between 1 and 60.';
    }
    if (existingSkills.length === 0) {
      nextErrors.existingSkills =
        'Add at least 1 technical skill (or pick from the quick suggestions below).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Auto-commit any pending typed skill before validating
    let finalSkills = existingSkills;
    if (skillInput.trim()) {
      const normalized = normalizeSkillName(skillInput);
      if (
        normalized &&
        !existingSkills.some((s) => s.toLowerCase() === normalized.toLowerCase())
      ) {
        finalSkills = [...existingSkills, normalized];
        setExistingSkills(finalSkills);
        setSkillInput('');
      }
    }

    if (!validateWithSkills(finalSkills)) return;

    onSubmitProfile(
      {
        studentName: studentName.trim(),
        educationLevel,
        branch: branch.trim(),
        targetRole,
        existingSkills: finalSkills,
        experienceLevel,
        studyHoursPerWeek: Math.round(studyHoursPerWeek),
      },
      preferDemo
    );
  };

  const validateWithSkills = (skillsList: string[]): boolean => {
    const nextErrors: ValidationErrors = {};
    if (studentName.trim().length < 2) {
      nextErrors.studentName = 'Enter your full name (at least 2 characters).';
    }
    if (!educationLevel.trim()) {
      nextErrors.educationLevel = 'Select your current education level.';
    }
    if (branch.trim().length < 2) {
      nextErrors.branch = 'Enter your branch or department (e.g., CSE, IT, ECE).';
    }
    if (!Number.isFinite(studyHoursPerWeek) || studyHoursPerWeek < 1 || studyHoursPerWeek > 60) {
      nextErrors.studyHoursPerWeek = 'Enter weekly study hours between 1 and 60.';
    }
    if (skillsList.length === 0) {
      nextErrors.existingSkills =
        'Add at least 1 technical skill (or pick from the quick suggestions below).';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleReset = () => {
    setStudentName('');
    setEducationLevel(EDUCATION_LEVELS[1]);
    setBranch('');
    setTargetRole('AI Engineer');
    setExistingSkills([]);
    setExperienceLevel('Beginner');
    setStudyHoursPerWeek(10);
    setSkillInput('');
    setErrors({});
  };

  return (
    <div className="space-y-6">
      {/* Sample Quick-Fill Strip */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-base font-semibold text-navy-900">
            Student Career Assessment
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Enter your academic background and current skills, or load a sample student profile to preview instantly.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {SAMPLE_PROFILES.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleLoadPreset(preset)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-800 transition-colors whitespace-nowrap shrink-0 min-h-[36px]"
            >
              Load: {preset.label}
            </button>
          ))}
        </div>
      </div>

      {serverError && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <span className="font-semibold">Error:</span> {serverError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-8"
      >
        {/* Section 1: Academic Profile */}
        <div className="space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-display text-base font-semibold text-navy-900">
              01. Academic & Career Target
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="studentName"
                className="block text-sm font-medium text-slate-800 mb-1.5"
              >
                Student Name <span className="text-red-600">*</span>
              </label>
              <input
                id="studentName"
                type="text"
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  if (errors.studentName) setErrors((p) => ({ ...p, studentName: undefined }));
                }}
                placeholder="e.g., Ananya Sharma"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600 ${
                  errors.studentName ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-white'
                }`}
              />
              {errors.studentName && (
                <p className="mt-1.5 text-xs text-red-700">{errors.studentName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="educationLevel"
                className="block text-sm font-medium text-slate-800 mb-1.5"
              >
                Current Education Level <span className="text-red-600">*</span>
              </label>
              <select
                id="educationLevel"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-600"
              >
                {EDUCATION_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-slate-800 mb-1.5"
              >
                Branch or Department <span className="text-red-600">*</span>
              </label>
              <input
                id="branch"
                type="text"
                list="branch-suggestions"
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                  if (errors.branch) setErrors((p) => ({ ...p, branch: undefined }));
                }}
                placeholder="e.g., Computer Science & Engineering"
                className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600 ${
                  errors.branch ? 'border-red-400 bg-red-50/30' : 'border-slate-300 bg-white'
                }`}
              />
              <datalist id="branch-suggestions">
                <option value="Computer Science & Engineering" />
                <option value="Information Technology" />
                <option value="Artificial Intelligence & Data Science" />
                <option value="Electronics & Communication Engineering" />
                <option value="Mathematics & Computing" />
                <option value="Mechanical Engineering" />
              </datalist>
              {errors.branch && (
                <p className="mt-1.5 text-xs text-red-700">{errors.branch}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="targetRole"
                className="block text-sm font-medium text-slate-800 mb-1.5"
              >
                Target Career Role <span className="text-red-600">*</span>
              </label>
              <select
                id="targetRole"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value as CareerRole)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-violet-600"
              >
                {CAREER_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
              <p className="mt-1.5 text-xs text-slate-500">{roleConfig.tagline}</p>
            </div>
          </div>
        </div>

        {/* Section 2: Technical Skills */}
        <div className="space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-display text-base font-semibold text-navy-900">
              02. Existing Technical Skills
            </h3>
          </div>

          <div>
            <label
              htmlFor="skillInput"
              className="block text-sm font-medium text-slate-800 mb-1.5"
            >
              Add Your Current Skills <span className="text-red-600">*</span>
            </label>
            <div className="flex gap-2">
              <input
                id="skillInput"
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill (e.g., Python, React, SQL, Git) and press Enter"
                className="flex-1 rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
              <button
                type="button"
                onClick={() => addSkill(skillInput)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm font-medium text-slate-800 hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 min-h-[42px]"
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
                <span>Add Skill</span>
              </button>
            </div>
            {errors.existingSkills && (
              <p className="mt-1.5 text-xs text-red-700">{errors.existingSkills}</p>
            )}
          </div>

          {/* Active Selected Skills */}
          <div className="min-h-[48px] rounded-lg border border-slate-200 bg-slate-50/70 p-3">
            {existingSkills.length === 0 ? (
              <p className="text-xs text-slate-500 py-1">
                No skills added yet. Type above or click quick suggestions below.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {existingSkills.map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => removeSkill(skill)}
                    title={`Remove ${skill}`}
                    className="inline-flex items-center gap-1.5 rounded-md border border-navy-900/15 bg-white px-2.5 py-1.5 text-xs font-medium text-navy-900 hover:border-red-300 hover:bg-red-50 hover:text-red-800 transition-colors"
                  >
                    <span>{skill}</span>
                    <X className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick-Pick Suggestions for Selected Target Role */}
          <div>
            <p className="text-xs font-medium text-slate-600 mb-2">
              Quick-add common skills for {targetRole}:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {roleConfig.suggestedQuickSkills.map((suggestion) => {
                const normalized = normalizeSkillName(suggestion);
                const selected = existingSkills.some(
                  (s) => s.toLowerCase() === normalized.toLowerCase()
                );
                return (
                  <button
                    key={suggestion}
                    type="button"
                    disabled={selected}
                    onClick={() => addSkill(suggestion)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                      selected
                        ? 'border-violet-200 bg-violet-50 text-violet-700 cursor-default opacity-70'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-violet-400 hover:text-violet-800'
                    }`}
                  >
                    {selected ? `${suggestion} (Added)` : `+ ${suggestion}`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 3: Experience & Study Commitment */}
        <div className="space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-display text-base font-semibold text-navy-900">
              03. Experience Level & Weekly Study Pace
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <span className="block text-sm font-medium text-slate-800 mb-2">
                Programming Experience Level
              </span>
              <div
                className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-slate-100 border border-slate-200"
                role="radiogroup"
                aria-label="Programming experience level"
              >
                {EXPERIENCE_LEVELS.map((level) => {
                  const active = experienceLevel === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setExperienceLevel(level)}
                      className={`py-2 px-3 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap min-h-[40px] ${
                        active
                          ? 'bg-navy-900 text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="studyHours"
                  className="text-sm font-medium text-slate-800"
                >
                  Available Study Hours / Week
                </label>
                <span className="font-mono text-sm font-semibold text-violet-700 tabular-nums">
                  {studyHoursPerWeek} hrs/week
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  id="studyHoursRange"
                  type="range"
                  min={2}
                  max={45}
                  value={Math.min(45, Math.max(2, studyHoursPerWeek || 2))}
                  onChange={(e) => {
                    setStudyHoursPerWeek(Number(e.target.value));
                    if (errors.studyHoursPerWeek) {
                      setErrors((p) => ({ ...p, studyHoursPerWeek: undefined }));
                    }
                  }}
                  aria-label="Study hours per week slider"
                  className="flex-1 accent-violet-700 cursor-pointer"
                />
                <input
                  id="studyHours"
                  type="number"
                  min={1}
                  max={60}
                  value={studyHoursPerWeek}
                  onChange={(e) => {
                    setStudyHoursPerWeek(Number(e.target.value));
                    if (errors.studyHoursPerWeek) {
                      setErrors((p) => ({ ...p, studyHoursPerWeek: undefined }));
                    }
                  }}
                  className="w-20 rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm font-mono tabular-nums text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
              </div>
              {errors.studyHoursPerWeek && (
                <p className="mt-1.5 text-xs text-red-700">{errors.studyHoursPerWeek}</p>
              )}
            </div>
          </div>
        </div>

        {/* Analysis Engine Option & Submit Actions */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <label className="inline-flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={preferDemo}
              onChange={(e) => setPreferDemo(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-violet-700 focus:ring-violet-600"
            />
            <span>
              Run offline using built-in Career Skills Dataset (Demo Mode)
            </span>
          </label>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap min-h-[42px]"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Reset Form</span>
            </button>

            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap min-h-[42px]"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-800 disabled:opacity-60 transition-colors whitespace-nowrap min-h-[42px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  <span>Generating Roadmap...</span>
                </>
              ) : (
                <>
                  <span>Generate Career Roadmap</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
