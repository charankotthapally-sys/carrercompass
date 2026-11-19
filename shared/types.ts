export type CareerRole =
  | 'AI Engineer'
  | 'Data Scientist'
  | 'Web Developer'
  | 'Python Developer'
  | 'Cybersecurity Analyst';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type SkillDomain =
  | 'Programming & Logic'
  | 'Role Frameworks & Core'
  | 'Data & Infrastructure'
  | 'Production & Security';

export interface StudentProfile {
  studentName: string;
  educationLevel: string;
  branch: string;
  targetRole: CareerRole;
  existingSkills: string[];
  experienceLevel: ExperienceLevel;
  studyHoursPerWeek: number;
}

export interface CoreSkillDefinition {
  name: string;
  domain: SkillDomain;
  weight: 1 | 2 | 3; // 3 = Critical Foundation, 2 = Core Competency, 1 = Applied Essential
  description: string;
}

export interface CareerRoleDefinition {
  role: CareerRole;
  tagline: string;
  overview: string;
  marketDemandNote: string;
  coreSkills: CoreSkillDefinition[];
  bonusSkills: string[];
  suggestedQuickSkills: string[];
}

export interface DomainComparisonItem {
  domain: SkillDomain;
  studentScore: number;
  targetScore: number;
  coveredCount: number;
  totalCount: number;
}

export interface SkillGapResult {
  matchedCoreSkills: CoreSkillDefinition[];
  missingCoreSkills: CoreSkillDefinition[];
  matchedBonusSkills: string[];
  recommendedBonusSkills: string[];
  additionalSkills: string[];
  skillReadinessPercent: number;
  employabilityScore: number;
  readinessTier: string;
  domainBreakdown: DomainComparisonItem[];
}

export interface RoadmapWeek {
  weekNumber: number;
  title: string;
  focusArea: string;
  estimatedHours: number;
  topicsToLearn: string[];
  learningObjectives: string[];
  practicalExercises: string[];
  weeklyMilestone: string;
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Beginner-Intermediate';
  estimatedHours: number;
  targetedSkills: string[];
  summary: string;
  buildSteps: string[];
  portfolioTip: string;
}

export interface CareerAnalysisResponse {
  profile: StudentProfile;
  skillGap: SkillGapResult;
  careerSummary: string;
  nextSteps: string[];
  roadmap: RoadmapWeek[];
  projects: ProjectRecommendation[];
  analysisSource: 'gemini' | 'demo';
  modelUsed?: string;
  aiNotice?: string;
  generatedAt: string;
}

export interface SampleProfilePreset {
  id: string;
  label: string;
  subtitle: string;
  profile: StudentProfile;
}
