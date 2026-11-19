import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  buildDemoAnalysis,
  CAREER_DATASET,
  CAREER_ROLES,
  normalizeSkillName,
} from './shared/careerDataset.ts';
import type { CareerRole, ExperienceLevel, StudentProfile } from './shared/types.ts';
import { analyzeCareerWithGemini } from './server/geminiCareerService.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const VALID_EXPERIENCE: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

function validateStudentProfile(body: unknown): {
  valid: true;
  profile: StudentProfile;
  preferDemo: boolean;
} | {
  valid: false;
  error: string;
} {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Request body must be a JSON object.' };
  }

  const input = body as Record<string, unknown>;
  const studentName = typeof input.studentName === 'string' ? input.studentName.trim() : '';
  const educationLevel =
    typeof input.educationLevel === 'string' ? input.educationLevel.trim() : '';
  const branch = typeof input.branch === 'string' ? input.branch.trim() : '';
  const targetRole = input.targetRole as CareerRole;
  const experienceLevel = input.experienceLevel as ExperienceLevel;
  const studyHoursPerWeek = Number(input.studyHoursPerWeek);
  const preferDemo = Boolean(input.preferDemo);

  if (studentName.length < 2) {
    return { valid: false, error: 'Student name must be at least 2 characters.' };
  }
  if (!educationLevel) {
    return { valid: false, error: 'Please select your current education level.' };
  }
  if (branch.length < 2) {
    return { valid: false, error: 'Please enter your branch or department.' };
  }
  if (!CAREER_ROLES.includes(targetRole)) {
    return { valid: false, error: 'Please select a valid target career role.' };
  }
  if (!VALID_EXPERIENCE.includes(experienceLevel)) {
    return { valid: false, error: 'Please select a valid programming experience level.' };
  }
  if (!Number.isFinite(studyHoursPerWeek) || studyHoursPerWeek < 1 || studyHoursPerWeek > 60) {
    return {
      valid: false,
      error: 'Available study hours per week must be between 1 and 60.',
    };
  }

  const rawSkills = Array.isArray(input.existingSkills) ? input.existingSkills : [];
  const existingSkills = Array.from(
    new Set(
      rawSkills
        .filter((s): s is string => typeof s === 'string')
        .map(normalizeSkillName)
        .filter(Boolean)
    )
  );

  return {
    valid: true,
    preferDemo,
    profile: {
      studentName,
      educationLevel,
      branch,
      targetRole,
      existingSkills,
      experienceLevel,
      studyHoursPerWeek: Math.round(studyHoursPerWeek),
    },
  };
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    const hasKey = Boolean(
      process.env.GEMINI_API_KEY &&
        process.env.GEMINI_API_KEY.trim() !== '' &&
        process.env.GEMINI_API_KEY.trim() !== 'MY_GEMINI_API_KEY'
    );
    res.json({
      status: 'ok',
      geminiConfigured: hasKey,
    });
  });

  app.get('/api/careers', (_req, res) => {
    res.json({
      roles: CAREER_ROLES,
      dataset: CAREER_DATASET,
    });
  });

  app.post('/api/analyze', async (req, res) => {
    const validation = validateStudentProfile(req.body);
    if (!validation.valid) {
      res.status(400).json({ error: validation.error });
      return;
    }

    const { profile, preferDemo } = validation;

    if (preferDemo) {
      const demoResult = buildDemoAnalysis(
        profile,
        'Demo Mode selected by user. Generated using the built-in CareerCompass AI skills dataset.'
      );
      res.json(demoResult);
      return;
    }

    const geminiAttempt = await analyzeCareerWithGemini(profile);
    if (geminiAttempt.ok) {
      res.json(geminiAttempt.data);
      return;
    }

    // Transparent Demo Mode fallback when free AI key is missing or quota is exhausted
    const fallbackResult = buildDemoAnalysis(profile, geminiAttempt.reason);
    res.json(fallbackResult);
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('/{*splat}', (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CareerCompass AI server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start CareerCompass AI server:', err);
  process.exit(1);
});
