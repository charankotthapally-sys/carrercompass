import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import { computeSkillGap } from '../shared/careerDataset.ts';
import type {
  CareerAnalysisResponse,
  ProjectRecommendation,
  RoadmapWeek,
  StudentProfile,
} from '../shared/types.ts';

const GEMINI_MODEL = 'gemini-4-hydrogen';

interface GeminiAnalysisPayload {
  careerSummary: string;
  nextSteps: string[];
  roadmap: Array<{
    weekNumber: number;
    title: string;
    focusArea: string;
    estimatedHours: number;
    topicsToLearn: string[];
    learningObjectives: string[];
    practicalExercises: string[];
    weeklyMilestone: string;
  }>;
  projects: Array<{
    id: string;
    title: string;
    difficulty: 'Beginner' | 'Beginner-Intermediate';
    estimatedHours: number;
    targetedSkills: string[];
    summary: string;
    buildSteps: string[];
    portfolioTip: string;
  }>;
}

export type GeminiAttemptResult =
  | { ok: true; data: CareerAnalysisResponse }
  | { ok: false; reason: string; errorCode?: string };

function classifyGeminiError(err: unknown): { reason: string; errorCode?: string } {
  const raw = err instanceof Error ? err.message : String(err);
  const lower = raw.toLowerCase();

  if (lower.includes('resource_exhausted') || lower.includes('429') || lower.includes('quota')) {
    return {
      errorCode: 'QUOTA_EXHAUSTED',
      reason:
        'Free Gemini API quota is temporarily exhausted. Showing Demo Mode analysis powered by the built-in career skills dataset.',
    };
  }
  if (lower.includes('api_key_invalid') || lower.includes('permission_denied') || lower.includes('403')) {
    return {
      errorCode: 'KEY_UNAVAILABLE',
      reason:
        'Gemini API key is missing or unauthorized in server environment. Showing Demo Mode analysis powered by the built-in career skills dataset.',
    };
  }
  if (lower.includes('timeout') || lower.includes('network') || lower.includes('fetch')) {
    return {
      errorCode: 'NETWORK_ERROR',
      reason:
        'Could not reach the Gemini service in time. Showing Demo Mode analysis powered by the built-in career skills dataset.',
    };
  }
  return {
    errorCode: 'AI_UNAVAILABLE',
    reason:
      'Live AI personalization is currently unavailable. Showing Demo Mode analysis powered by the built-in career skills dataset.',
  };
}

export async function analyzeCareerWithGemini(
  profile: StudentProfile
): Promise<GeminiAttemptResult> {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return {
      ok: false,
      errorCode: 'NO_API_KEY',
      reason:
        'No GEMINI_API_KEY is configured in server secrets. Running in Demo Mode using the built-in career skills dataset.',
    };
  }

  const skillGap = computeSkillGap(profile);

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const prompt = `
Analyze this college student's career readiness and build a personalized 8-week learning roadmap plus 3 beginner-friendly projects.

Student Profile:
- Name: ${profile.studentName}
- Education Level: ${profile.educationLevel}
- Branch/Department: ${profile.branch}
- Target Career Role: ${profile.targetRole}
- Programming Experience: ${profile.experienceLevel}
- Available Study Hours per Week: ${profile.studyHoursPerWeek}
- Existing Technical Skills: ${profile.existingSkills.join(', ') || 'None specified'}

Verified Skill Gap Metrics (use these exact findings):
- Skill Readiness Score: ${skillGap.skillReadinessPercent}%
- Employability Readiness Score: ${skillGap.employabilityScore}% (${skillGap.readinessTier})
- Matched Core Skills: ${skillGap.matchedCoreSkills.map((s) => s.name).join(', ') || 'None yet'}
- Missing Core Skills (ordered by priority): ${skillGap.missingCoreSkills.map((s) => `${s.name} (${s.domain})`).join(', ') || 'None'}
- Matched Bonus Skills: ${skillGap.matchedBonusSkills.join(', ') || 'None'}
- Recommended Bonus Skills: ${skillGap.recommendedBonusSkills.join(', ') || 'None'}

Requirements:
1. "careerSummary": 2-3 clear, encouraging, practical sentences tailored to ${profile.studentName}'s branch (${profile.branch}), ${profile.experienceLevel} level, and ${profile.studyHoursPerWeek} hrs/week pace.
2. "nextSteps": Exactly 4 concrete, prioritized next steps referencing their specific missing core skills and weekly schedule.
3. "roadmap": Exactly 8 weeks (weekNumber 1 to 8). Prioritize closing the missing core skills first in Weeks 1-5, then projects/production polish/interview prep in Weeks 6-8. Set estimatedHours to ${profile.studyHoursPerWeek} per week. Each week must have 3 concise topicsToLearn, 2 clear learningObjectives, 3 hands-on practicalExercises, and 1 verifiable weeklyMilestone.
4. "projects": Exactly 3 beginner-friendly portfolio projects tailored specifically to bridge the student's missing core skills (${skillGap.missingCoreSkills.slice(0, 4).map((s) => s.name).join(', ') || profile.targetRole}). Each project needs difficulty ("Beginner" or "Beginner-Intermediate"), realistic estimatedHours (10-20), targetedSkills (2-3 skills), concise summary, 4 buildSteps, and 1 portfolioTip.
`.trim();

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction:
          'You are CareerCompass AI, an experienced university technical career mentor. Be concise, specific, encouraging, and practical. Output valid JSON strictly matching the schema.',
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            careerSummary: { type: Type.STRING },
            nextSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  weekNumber: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  focusArea: { type: Type.STRING },
                  estimatedHours: { type: Type.INTEGER },
                  topicsToLearn: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  learningObjectives: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  practicalExercises: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  weeklyMilestone: { type: Type.STRING },
                },
                required: [
                  'weekNumber',
                  'title',
                  'focusArea',
                  'estimatedHours',
                  'topicsToLearn',
                  'learningObjectives',
                  'practicalExercises',
                  'weeklyMilestone',
                ],
              },
            },
            projects: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                  estimatedHours: { type: Type.INTEGER },
                  targetedSkills: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  summary: { type: Type.STRING },
                  buildSteps: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  portfolioTip: { type: Type.STRING },
                },
                required: [
                  'id',
                  'title',
                  'difficulty',
                  'estimatedHours',
                  'targetedSkills',
                  'summary',
                  'buildSteps',
                  'portfolioTip',
                ],
              },
            },
          },
          required: ['careerSummary', 'nextSteps', 'roadmap', 'projects'],
        },
      },
    });

    const rawText = (response.text ?? '').trim();
    if (!rawText) {
      return {
        ok: false,
        errorCode: 'EMPTY_RESPONSE',
        reason: 'Gemini returned an empty response. Using Demo Mode built-in dataset instead.',
      };
    }

    const parsed = JSON.parse(rawText) as GeminiAnalysisPayload;
    if (
      !parsed.careerSummary ||
      !Array.isArray(parsed.roadmap) ||
      parsed.roadmap.length < 8 ||
      !Array.isArray(parsed.projects) ||
      parsed.projects.length < 3
    ) {
      return {
        ok: false,
        errorCode: 'INCOMPLETE_RESPONSE',
        reason: 'Gemini response structure was incomplete. Using Demo Mode built-in dataset instead.',
      };
    }

    const sanitizedRoadmap: RoadmapWeek[] = parsed.roadmap.slice(0, 8).map((w, idx) => ({
      weekNumber: idx + 1,
      title: w.title || `Week ${idx + 1}`,
      focusArea: w.focusArea || profile.targetRole,
      estimatedHours: Number(w.estimatedHours) || profile.studyHoursPerWeek,
      topicsToLearn: Array.isArray(w.topicsToLearn) ? w.topicsToLearn.slice(0, 5) : [],
      learningObjectives: Array.isArray(w.learningObjectives) ? w.learningObjectives.slice(0, 4) : [],
      practicalExercises: Array.isArray(w.practicalExercises) ? w.practicalExercises.slice(0, 5) : [],
      weeklyMilestone: w.weeklyMilestone || 'Complete weekly review and commit code.',
    }));

    const sanitizedProjects: ProjectRecommendation[] = parsed.projects.slice(0, 3).map((p, idx) => ({
      id: p.id || `gemini-proj-${idx + 1}`,
      title: p.title || `Portfolio Project ${idx + 1}`,
      difficulty:
        p.difficulty === 'Beginner-Intermediate' ? 'Beginner-Intermediate' : 'Beginner',
      estimatedHours: Number(p.estimatedHours) || 14,
      targetedSkills: Array.isArray(p.targetedSkills) ? p.targetedSkills.slice(0, 4) : [],
      summary: p.summary || '',
      buildSteps: Array.isArray(p.buildSteps) ? p.buildSteps.slice(0, 5) : [],
      portfolioTip: p.portfolioTip || 'Document architecture decisions and outcomes in your README.',
    }));

    return {
      ok: true,
      data: {
        profile,
        skillGap,
        careerSummary: parsed.careerSummary,
        nextSteps: Array.isArray(parsed.nextSteps) ? parsed.nextSteps.slice(0, 4) : [],
        roadmap: sanitizedRoadmap,
        projects: sanitizedProjects,
        analysisSource: 'gemini',
        modelUsed: GEMINI_MODEL,
        generatedAt: new Date().toISOString(),
      },
    };
  } catch (err) {
    const classified = classifyGeminiError(err);
    return {
      ok: false,
      errorCode: classified.errorCode,
      reason: classified.reason,
    };
  }
}
