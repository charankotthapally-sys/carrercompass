import type {
  CareerAnalysisResponse,
  CareerRole,
  CareerRoleDefinition,
  CoreSkillDefinition,
  DomainComparisonItem,
  ExperienceLevel,
  ProjectRecommendation,
  RoadmapWeek,
  SampleProfilePreset,
  SkillDomain,
  SkillGapResult,
  StudentProfile,
} from './types.ts';

export const CAREER_ROLES: CareerRole[] = [
  'AI Engineer',
  'Data Scientist',
  'Web Developer',
  'Python Developer',
  'Cybersecurity Analyst',
];

export const EDUCATION_LEVELS: string[] = [
  'B.Tech / B.E. (1st–2nd Year)',
  'B.Tech / B.E. (3rd–4th Year)',
  'B.Sc. / BCA Undergraduate',
  'M.Tech / MCA / M.Sc.',
  'Diploma / Certificate Track',
];

export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
];

export const SKILL_DOMAINS: SkillDomain[] = [
  'Programming & Logic',
  'Role Frameworks & Core',
  'Data & Infrastructure',
  'Production & Security',
];

const SKILL_ALIASES: Record<string, string> = {
  py: 'Python',
  python3: 'Python',
  js: 'JavaScript',
  javascript: 'JavaScript',
  es6: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  reactjs: 'React',
  'react.js': 'React',
  nextjs: 'Next.js / Full-Stack Architecture',
  'next.js': 'Next.js / Full-Stack Architecture',
  tailwind: 'CSS & Responsive Design',
  tailwindcss: 'CSS & Responsive Design',
  css: 'CSS & Responsive Design',
  css3: 'CSS & Responsive Design',
  html: 'HTML5 & Semantic Accessibility',
  html5: 'HTML5 & Semantic Accessibility',
  node: 'Node.js & Express',
  nodejs: 'Node.js & Express',
  'node.js': 'Node.js & Express',
  express: 'Node.js & Express',
  expressjs: 'Node.js & Express',
  sql: 'SQL & Relational Databases',
  mysql: 'SQL & Relational Databases',
  postgres: 'SQL & Relational Databases',
  postgresql: 'SQL & Relational Databases',
  sqlite: 'SQL & Relational Databases',
  mongodb: 'NoSQL & Data Modeling',
  git: 'Git & Version Control',
  github: 'Git & Version Control',
  pytorch: 'PyTorch / Deep Learning',
  tensorflow: 'PyTorch / Deep Learning',
  keras: 'PyTorch / Deep Learning',
  'deep learning': 'PyTorch / Deep Learning',
  ml: 'Machine Learning Fundamentals',
  'machine learning': 'Machine Learning Fundamentals',
  sklearn: 'Scikit-learn & Supervised ML',
  'scikit-learn': 'Scikit-learn & Supervised ML',
  pandas: 'NumPy & Pandas',
  numpy: 'NumPy & Pandas',
  matplotlib: 'Data Visualization (Matplotlib/Seaborn)',
  seaborn: 'Data Visualization (Matplotlib/Seaborn)',
  plotly: 'Data Visualization (Matplotlib/Seaborn)',
  tableau: 'BI & Dashboard Storytelling',
  powerbi: 'BI & Dashboard Storytelling',
  'power bi': 'BI & Dashboard Storytelling',
  llm: 'LLM APIs & Prompt Engineering',
  llms: 'LLM APIs & Prompt Engineering',
  'prompt engineering': 'LLM APIs & Prompt Engineering',
  rag: 'RAG & Vector Databases',
  langchain: 'RAG & Vector Databases',
  fastapi: 'FastAPI & Model Serving',
  flask: 'Flask / FastAPI Web Services',
  django: 'Django / FastAPI Frameworks',
  docker: 'Docker & Containerization',
  linux: 'Linux & Shell Scripting',
  bash: 'Linux & Shell Scripting',
  wireshark: 'Packet Analysis & Wireshark',
  nmap: 'Network Reconnaissance & Nmap',
  siem: 'SIEM & Log Analysis',
  splunk: 'SIEM & Log Analysis',
  owasp: 'OWASP Top 10 & Web Security',
  networking: 'TCP/IP & Network Fundamentals',
  'tcp/ip': 'TCP/IP & Network Fundamentals',
  rest: 'REST APIs & HTTP',
  'rest api': 'REST APIs & HTTP',
  'rest apis': 'REST APIs & HTTP',
  testing: 'Automated Testing (Pytest / Unit Tests)',
  pytest: 'Automated Testing (Pytest / Unit Tests)',
  jest: 'Frontend Testing & Debugging',
  dsa: 'Data Structures & Algorithms',
  algorithms: 'Data Structures & Algorithms',
  statistics: 'Probability & Statistics',
  stats: 'Probability & Statistics',
  'linear algebra': 'Linear Algebra & Calculus',
};

export const CAREER_DATASET: Record<CareerRole, CareerRoleDefinition> = {
  'AI Engineer': {
    role: 'AI Engineer',
    tagline: 'Design, evaluate, and ship intelligent systems powered by ML and LLMs.',
    overview:
      'AI Engineers bridge machine learning theory with production software engineering—combining Python, deep learning, retrieval-augmented generation (RAG), and scalable API deployment.',
    marketDemandNote: 'Strong campus and entry-level demand for applied LLM pipelines, evaluation harnesses, and FastAPI inference services.',
    coreSkills: [
      {
        name: 'Python',
        domain: 'Programming & Logic',
        weight: 3,
        description: 'Idiomatic Python, virtual environments, typing, and asynchronous execution.',
      },
      {
        name: 'Data Structures & Algorithms',
        domain: 'Programming & Logic',
        weight: 2,
        description: 'Complexity analysis, trees, graphs, and efficient batch processing.',
      },
      {
        name: 'Linear Algebra & Calculus',
        domain: 'Data & Infrastructure',
        weight: 2,
        description: 'Vectors, matrices, cosine similarity, gradients, and embeddings math.',
      },
      {
        name: 'Machine Learning Fundamentals',
        domain: 'Role Frameworks & Core',
        weight: 3,
        description: 'Train/test splits, overfitting, regression, classification, and evaluation metrics.',
      },
      {
        name: 'PyTorch / Deep Learning',
        domain: 'Role Frameworks & Core',
        weight: 3,
        description: 'Tensors, neural network layers, backpropagation, and fine-tuning workflows.',
      },
      {
        name: 'LLM APIs & Prompt Engineering',
        domain: 'Role Frameworks & Core',
        weight: 3,
        description: 'Structured JSON outputs, system instructions, tool calling, and latency control.',
      },
      {
        name: 'RAG & Vector Databases',
        domain: 'Data & Infrastructure',
        weight: 2,
        description: 'Chunking strategies, semantic embeddings, and similarity retrieval pipelines.',
      },
      {
        name: 'FastAPI & Model Serving',
        domain: 'Production & Security',
        weight: 2,
        description: 'Serving inference endpoints securely with validation and rate limiting.',
      },
      {
        name: 'Git & Version Control',
        domain: 'Production & Security',
        weight: 2,
        description: 'Branching, reproducible experiment tracking, and clean PR workflows.',
      },
    ],
    bonusSkills: [
      'Docker & Containerization',
      'Model Evaluation & Guardrails',
      'Hugging Face Transformers',
      'SQL & Relational Databases',
      'Cloud Deployment (Cloud Run / AWS)',
      'Streaming Inference (SSE)',
    ],
    suggestedQuickSkills: [
      'Python',
      'Git',
      'SQL',
      'NumPy',
      'PyTorch',
      'Machine Learning',
      'FastAPI',
      'Prompt Engineering',
      'Docker',
      'Data Structures & Algorithms',
      'Linear Algebra',
      'RAG',
    ],
  },

  'Data Scientist': {
    role: 'Data Scientist',
    tagline: 'Transform raw datasets into statistical insights, predictive models, and decisions.',
    overview:
      'Data Scientists uncover patterns through rigorous exploratory data analysis, statistical hypothesis testing, supervised/unsupervised modeling, and compelling visual storytelling.',
    marketDemandNote: 'Recruiters prioritize reproducible notebooks, SQL mastery, clear metric selection, and business-grounded interpretation.',
    coreSkills: [
      {
        name: 'Python',
        domain: 'Programming & Logic',
        weight: 3,
        description: 'Scripting data workflows, clean functions, and analytical notebooks.',
      },
      {
        name: 'SQL & Relational Databases',
        domain: 'Data & Infrastructure',
        weight: 3,
        description: 'Joins, CTEs, window functions, aggregations, and query optimization.',
      },
      {
        name: 'Probability & Statistics',
        domain: 'Programming & Logic',
        weight: 3,
        description: 'Distributions, confidence intervals, p-values, A/B testing, and Bayes rule.',
      },
      {
        name: 'NumPy & Pandas',
        domain: 'Data & Infrastructure',
        weight: 3,
        description: 'Data cleaning, missing value imputation, reshaping, and vectorized transforms.',
      },
      {
        name: 'Data Visualization (Matplotlib/Seaborn)',
        domain: 'Role Frameworks & Core',
        weight: 2,
        description: 'Distribution plots, correlation heatmaps, and clear analytical charts.',
      },
      {
        name: 'Scikit-learn & Supervised ML',
        domain: 'Role Frameworks & Core',
        weight: 3,
        description: 'Cross-validation, feature engineering, tree ensembles, and error analysis.',
      },
      {
        name: 'Feature Engineering & EDA',
        domain: 'Role Frameworks & Core',
        weight: 2,
        description: 'Encoding categoricals, handling class imbalance, and leakage prevention.',
      },
      {
        name: 'BI & Dashboard Storytelling',
        domain: 'Production & Security',
        weight: 2,
        description: 'Translating model outputs into executive KPIs and actionable narratives.',
      },
      {
        name: 'Git & Version Control',
        domain: 'Production & Security',
        weight: 1,
        description: 'Clean notebook versioning, environment locks, and reproducible repos.',
      },
    ],
    bonusSkills: [
      'PyTorch / Deep Learning',
      'Time Series Forecasting',
      'Experiment Tracking (MLflow)',
      'Streamlit / Interactive Apps',
      'BigQuery / Cloud Warehouses',
      'Natural Language Processing',
    ],
    suggestedQuickSkills: [
      'Python',
      'SQL',
      'Pandas',
      'NumPy',
      'Statistics',
      'Scikit-learn',
      'Matplotlib',
      'Seaborn',
      'Git',
      'Tableau',
      'Power BI',
      'PyTorch',
    ],
  },

  'Web Developer': {
    role: 'Web Developer',
    tagline: 'Architect accessible, fast, full-stack web applications from UI to API.',
    overview:
      'Web Developers craft responsive, accessible interfaces in React and TypeScript backed by reliable REST APIs, relational data persistence, and modern deployment pipelines.',
    marketDemandNote: 'Entry-level standout portfolios show TypeScript discipline, accessible UI components, real API integration, and clean state architecture.',
    coreSkills: [
      {
        name: 'HTML5 & Semantic Accessibility',
        domain: 'Programming & Logic',
        weight: 3,
        description: 'Landmarks, forms, keyboard navigation, ARIA roles, and SEO structure.',
      },
      {
        name: 'CSS & Responsive Design',
        domain: 'Programming & Logic',
        weight: 3,
        description: 'Flexbox, CSS Grid, Tailwind CSS, fluid layouts, and mobile breakpoints.',
      },
      {
        name: 'JavaScript',
        domain: 'Programming & Logic',
        weight: 3,
        description: 'DOM APIs, closures, async/await, fetch, and ES modules.',
      },
      {
        name: 'TypeScript',
        domain: 'Role Frameworks & Core',
        weight: 2,
        description: 'Interfaces, union types, generics, and type-safe API contracts.',
      },
      {
        name: 'React',
        domain: 'Role Frameworks & Core',
        weight: 3,
        description: 'Component architecture, hooks, state management, and performance patterns.',
      },
      {
        name: 'Node.js & Express',
        domain: 'Data & Infrastructure',
        weight: 2,
        description: 'Server routes, middleware, validation, and environment configuration.',
      },
      {
        name: 'REST APIs & HTTP',
        domain: 'Data & Infrastructure',
        weight: 2,
        description: 'Status codes, JSON payloads, error handling, and CORS fundamentals.',
      },
      {
        name: 'SQL & Relational Databases',
        domain: 'Data & Infrastructure',
        weight: 2,
        description: 'Schema design, foreign keys, and CRUD queries for persistent apps.',
      },
      {
        name: 'Git & Version Control',
        domain: 'Production & Security',
        weight: 2,
        description: 'Feature branches, commit hygiene, and collaborative code reviews.',
      },
    ],
    bonusSkills: [
      'Next.js / Full-Stack Architecture',
      'Frontend Testing & Debugging',
      'Web Security & Auth (JWT / OAuth)',
      'Docker & Containerization',
      'CI/CD & Cloud Hosting',
      'Web Performance & Core Web Vitals',
    ],
    suggestedQuickSkills: [
      'HTML5',
      'CSS',
      'Tailwind CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Node.js',
      'Express',
      'SQL',
      'REST APIs',
      'Git',
      'Next.js',
    ],
  },

  'Python Developer': {
    role: 'Python Developer',
    tagline: 'Build maintainable backend services, automation tools, and reliable software systems.',
    overview:
      'Python Developers engineer clean object-oriented packages, high-throughput FastAPI/Django backends, automated test suites, and database-backed CLI or web services.',
    marketDemandNote: 'Employers look closely at code structure, automated Pytest coverage, SQL proficiency, and API reliability.',
    coreSkills: [
      {
        name: 'Python',
        domain: 'Programming & Logic',
        weight: 3,
        description: 'OOP, decorators, generators, type hints, and standard library mastery.',
      },
      {
        name: 'Data Structures & Algorithms',
        domain: 'Programming & Logic',
        weight: 3,
        description: 'Hash maps, recursion, sorting, queues, and algorithmic problem solving.',
      },
      {
        name: 'Django / FastAPI Frameworks',
        domain: 'Role Frameworks & Core',
        weight: 3,
        description: 'Routing, Pydantic/serializers, dependency injection, and ORM models.',
      },
      {
        name: 'REST APIs & HTTP',
        domain: 'Role Frameworks & Core',
        weight: 2,
        description: 'API design, pagination, request validation, and clean error contracts.',
      },
      {
        name: 'SQL & Relational Databases',
        domain: 'Data & Infrastructure',
        weight: 3,
        description: 'PostgreSQL/SQLite schemas, indexing, migrations, and transactions.',
      },
      {
        name: 'Automated Testing (Pytest / Unit Tests)',
        domain: 'Production & Security',
        weight: 3,
        description: 'Fixtures, mocking, integration tests, and regression prevention.',
      },
      {
        name: 'Linux & Shell Scripting',
        domain: 'Data & Infrastructure',
        weight: 2,
        description: 'Process management, file permissions, virtualenvs, and cron automation.',
      },
      {
        name: 'Git & Version Control',
        domain: 'Production & Security',
        weight: 2,
        description: 'Branching strategies, clean diffs, and automated linting hooks.',
      },
      {
        name: 'Asynchronous Python & Concurrency',
        domain: 'Role Frameworks & Core',
        weight: 2,
        description: 'asyncio, background workers, and non-blocking I/O pipelines.',
      },
    ],
    bonusSkills: [
      'Docker & Containerization',
      'Redis & Task Queues (Celery)',
      'CI/CD Pipelines (GitHub Actions)',
      'NoSQL & Data Modeling',
      'Logging & Observability',
      'Web Scraping & CLI Packaging',
    ],
    suggestedQuickSkills: [
      'Python',
      'Data Structures & Algorithms',
      'FastAPI',
      'Django',
      'Flask',
      'SQL',
      'PostgreSQL',
      'Pytest',
      'Git',
      'Linux',
      'Docker',
      'REST APIs',
    ],
  },

  'Cybersecurity Analyst': {
    role: 'Cybersecurity Analyst',
    tagline: 'Defend networks, investigate threats, and harden modern applications and infrastructure.',
    overview:
      'Cybersecurity Analysts monitor security telemetry, analyze network packets, assess web vulnerabilities against OWASP standards, and automate defensive triage.',
    marketDemandNote: 'Practical lab experience with packet inspection, Linux hardening, SIEM queries, and OWASP remediation sets junior candidates apart.',
    coreSkills: [
      {
        name: 'TCP/IP & Network Fundamentals',
        domain: 'Programming & Logic',
        weight: 3,
        description: 'OSI layers, DNS, HTTP/TLS, subnetting, firewalls, and routing behavior.',
      },
      {
        name: 'Linux & Shell Scripting',
        domain: 'Programming & Logic',
        weight: 3,
        description: 'Permissions, systemd services, log inspection, and Bash automation.',
      },
      {
        name: 'Python',
        domain: 'Programming & Logic',
        weight: 2,
        description: 'Writing log parsers, API security checks, and automated triage scripts.',
      },
      {
        name: 'Packet Analysis & Wireshark',
        domain: 'Role Frameworks & Core',
        weight: 3,
        description: 'Inspecting captures, detecting anomalies, TLS handshakes, and suspicious traffic.',
      },
      {
        name: 'Network Reconnaissance & Nmap',
        domain: 'Role Frameworks & Core',
        weight: 2,
        description: 'Port discovery, service enumeration, and attack surface auditing.',
      },
      {
        name: 'OWASP Top 10 & Web Security',
        domain: 'Role Frameworks & Core',
        weight: 3,
        description: 'SQLi, XSS, CSRF, broken access control, and secure header remediation.',
      },
      {
        name: 'SIEM & Log Analysis',
        domain: 'Data & Infrastructure',
        weight: 3,
        description: 'Correlating auth events, writing detection queries, and incident triage.',
      },
      {
        name: 'Identity, Auth & Cryptography Basics',
        domain: 'Production & Security',
        weight: 2,
        description: 'Hashing, TLS certificates, RBAC, MFA, and least-privilege controls.',
      },
      {
        name: 'Incident Response & Threat Frameworks',
        domain: 'Production & Security',
        weight: 2,
        description: 'MITRE ATT&CK mapping, containment steps, and post-incident reporting.',
      },
    ],
    bonusSkills: [
      'Cloud Security (IAM & VPC)',
      'Vulnerability Scanning (Burp Suite / Nessus)',
      'Container Security (Docker)',
      'SQL & Relational Databases',
      'Malware Triage Fundamentals',
      'Git & Security Automation',
    ],
    suggestedQuickSkills: [
      'TCP/IP',
      'Linux',
      'Bash',
      'Python',
      'Wireshark',
      'Nmap',
      'OWASP',
      'SIEM',
      'Splunk',
      'SQL',
      'Git',
      'Cryptography',
    ],
  },
};

export function normalizeSkillName(raw: string): string {
  const cleaned = raw.trim().replace(/\s+/g, ' ');
  if (!cleaned) return '';
  const lower = cleaned.toLowerCase();
  if (SKILL_ALIASES[lower]) {
    return SKILL_ALIASES[lower];
  }
  // Check exact case-insensitive match against all canonical skills
  for (const def of Object.values(CAREER_DATASET)) {
    for (const core of def.coreSkills) {
      if (core.name.toLowerCase() === lower) return core.name;
    }
    for (const bonus of def.bonusSkills) {
      if (bonus.toLowerCase() === lower) return bonus;
    }
  }
  return cleaned;
}

export function computeSkillGap(profile: StudentProfile): SkillGapResult {
  const roleDef = CAREER_DATASET[profile.targetRole];
  const normalizedStudentSkills = Array.from(
    new Set(profile.existingSkills.map(normalizeSkillName).filter(Boolean))
  );
  const studentLowerSet = new Set(normalizedStudentSkills.map((s) => s.toLowerCase()));

  const isMatched = (targetSkillName: string): boolean => {
    const targetLower = targetSkillName.toLowerCase();
    if (studentLowerSet.has(targetLower)) return true;
    // Partial token overlap for natural phrasing (e.g. "React" matches "React", "Machine Learning" matches "Machine Learning Fundamentals")
    for (const s of studentLowerSet) {
      if (s.length >= 3 && (targetLower.includes(s) || s.includes(targetLower))) {
        return true;
      }
    }
    return false;
  };

  const matchedCoreSkills: CoreSkillDefinition[] = [];
  const missingCoreSkills: CoreSkillDefinition[] = [];

  for (const core of roleDef.coreSkills) {
    if (isMatched(core.name)) {
      matchedCoreSkills.push(core);
    } else {
      missingCoreSkills.push(core);
    }
  }

  // Prioritize missing core skills by weight descending
  missingCoreSkills.sort((a, b) => b.weight - a.weight);

  const matchedBonusSkills: string[] = [];
  const recommendedBonusSkills: string[] = [];
  for (const bonus of roleDef.bonusSkills) {
    if (isMatched(bonus)) {
      matchedBonusSkills.push(bonus);
    } else {
      recommendedBonusSkills.push(bonus);
    }
  }

  const coreAndBonusLower = new Set([
    ...roleDef.coreSkills.map((c) => c.name.toLowerCase()),
    ...roleDef.bonusSkills.map((b) => b.toLowerCase()),
  ]);

  const additionalSkills = normalizedStudentSkills.filter((skill) => {
    const lower = skill.toLowerCase();
    if (coreAndBonusLower.has(lower)) return false;
    for (const known of coreAndBonusLower) {
      if (lower.length >= 3 && (known.includes(lower) || lower.includes(known))) {
        return false;
      }
    }
    return true;
  });

  const totalWeight = roleDef.coreSkills.reduce((acc, s) => acc + s.weight, 0);
  const matchedWeight = matchedCoreSkills.reduce((acc, s) => acc + s.weight, 0);
  const skillReadinessPercent =
    totalWeight > 0 ? Math.round((matchedWeight / totalWeight) * 100) : 0;

  const experienceBonusMap: Record<ExperienceLevel, number> = {
    Beginner: 35,
    Intermediate: 70,
    Advanced: 95,
  };
  const expScore = experienceBonusMap[profile.experienceLevel] ?? 50;
  const bonusCoverage =
    roleDef.bonusSkills.length > 0
      ? Math.round((matchedBonusSkills.length / roleDef.bonusSkills.length) * 100)
      : 0;

  const employabilityScore = Math.min(
    100,
    Math.round(skillReadinessPercent * 0.72 + expScore * 0.18 + bonusCoverage * 0.1)
  );

  let readinessTier = 'Early Foundation';
  if (employabilityScore >= 80) readinessTier = 'Strong Contender';
  else if (employabilityScore >= 60) readinessTier = 'Interview-Ready';
  else if (employabilityScore >= 38) readinessTier = 'Developing Candidate';

  const domainBreakdown: DomainComparisonItem[] = SKILL_DOMAINS.map((domain) => {
    const domainCore = roleDef.coreSkills.filter((s) => s.domain === domain);
    const domainMatched = matchedCoreSkills.filter((s) => s.domain === domain);
    const dTotalWeight = domainCore.reduce((acc, s) => acc + s.weight, 0);
    const dMatchedWeight = domainMatched.reduce((acc, s) => acc + s.weight, 0);
    const studentScore =
      dTotalWeight > 0 ? Math.round((dMatchedWeight / dTotalWeight) * 100) : 100;
    return {
      domain,
      studentScore,
      targetScore: 100,
      coveredCount: domainMatched.length,
      totalCount: domainCore.length,
    };
  });

  return {
    matchedCoreSkills,
    missingCoreSkills,
    matchedBonusSkills,
    recommendedBonusSkills,
    additionalSkills,
    skillReadinessPercent,
    employabilityScore,
    readinessTier,
    domainBreakdown,
  };
}

function buildDemoRoadmap(
  profile: StudentProfile,
  skillGap: SkillGapResult
): RoadmapWeek[] {
  const hrs = Math.max(2, Math.min(45, profile.studyHoursPerWeek));
  const missing = skillGap.missingCoreSkills;
  const matched = skillGap.matchedCoreSkills;
  const bonus = skillGap.recommendedBonusSkills;
  const role = profile.targetRole;

  const focusSkills: string[] = [
    ...missing.map((m) => m.name),
    ...bonus,
    ...matched.map((m) => `${m.name} (Depth & Practice)`),
  ];

  const getFocus = (index: number, fallback: string) =>
    focusSkills[index] ?? fallback;

  const isBeginner = profile.experienceLevel === 'Beginner';
  const paceLabel =
    hrs >= 15 ? 'Intensive Sprint' : hrs >= 8 ? 'Steady Weekly Pace' : 'Focused Micro-Sessions';

  const weekTemplates: Array<{
    focus: string;
    theme: string;
    objectives: (focus: string) => string[];
    topics: (focus: string) => string[];
    exercises: (focus: string) => string[];
    milestone: (focus: string) => string;
  }> = [
    {
      focus: getFocus(0, `${role} Core Foundations`),
      theme: 'Foundation & Gap Closure Kickoff',
      topics: (f) => [
        `${f}: Core mental models and syntax fundamentals`,
        `Development environment setup & reproducible tooling`,
        `Common beginner pitfalls and debugging workflows`,
      ],
      objectives: (f) => [
        `Build fluency in ${f} so subsequent ${role} modules click smoothly.`,
        `Set up a clean Git repository to track every weekly exercise.`,
      ],
      exercises: (f) => [
        `Complete 3 focused drills targeting ${f} core concepts (${Math.max(1, Math.round(hrs * 0.35))} hrs).`,
        `Document key patterns and commands in a personal study cheatsheet.`,
        `Write and verify 2 small standalone scripts or modules without tutorials.`,
      ],
      milestone: (f) => `Publish a clean starter repository demonstrating ${f} fundamentals with README notes.`,
    },
    {
      focus: getFocus(1, `${role} Core Tooling`),
      theme: 'Core Technical Building Blocks',
      topics: (f) => [
        `${f}: Essential patterns and real-world data flow`,
        `Structuring modular code for readability and reuse`,
        `Reading official documentation and error tracebacks`,
      ],
      objectives: (f) => [
        `Apply ${f} to solve structured technical problems independently.`,
        `Connect foundational logic with ${role} industry conventions.`,
      ],
      exercises: (f) => [
        `Build a mini-utility implementing ${f} from scratch.`,
        `Refactor Week 1 code using cleaner abstractions and inline validation.`,
        `Solve 4 targeted practice problems tailored to ${isBeginner ? 'beginner' : 'intermediate'} mastery.`,
      ],
      milestone: (f) => `Working mini-module using ${f} passing self-written edge-case checks.`,
    },
    {
      focus: getFocus(2, `${role} Applied Frameworks`),
      theme: 'Applied Domain Frameworks',
      topics: (f) => [
        `${f}: Architecture, lifecycle, and core APIs`,
        `Handling real-world inputs, errors, and state`,
        `Comparing library tradeoffs and best practices`,
      ],
      objectives: (f) => [
        `Move from isolated syntax to building integrated components with ${f}.`,
        `Diagnose and resolve common integration bugs quickly.`,
      ],
      exercises: (f) => [
        `Follow a specification sheet to implement a ${f} prototype.`,
        `Add structured error handling and input validation to your prototype.`,
        `Run a short ${hrs >= 10 ? '2-hour' : '1-hour'} timed build challenge.`,
      ],
      milestone: (f) => `Functional prototype showcasing ${f} integrated into a realistic ${role} workflow.`,
    },
    {
      focus: getFocus(3, `${role} Data & Systems Integration`),
      theme: 'Data, Storage & Integration',
      topics: (f) => [
        `${f}: Schema, queries, or pipeline orchestration`,
        `Connecting application logic to persistent data or external APIs`,
        `Performance awareness and bottleneck profiling`,
      ],
      objectives: (f) => [
        `Design reliable data flow using ${f} for multi-step workflows.`,
        `Benchmark and validate outputs against ground-truth expectations.`,
      ],
      exercises: (f) => [
        `Create a realistic sample dataset or API contract for ${f}.`,
        `Write automated checks verifying end-to-end data integrity.`,
        `Measure execution speed or accuracy before and after one optimization.`,
      ],
      milestone: (f) => `End-to-end integrated pipeline using ${f} ready to power your first portfolio project.`,
    },
    {
      focus: getFocus(4, `${role} Project I Build`),
      theme: 'Portfolio Project 1 Execution',
      topics: (f) => [
        `Translating requirements into a scoped Project 1 architecture`,
        `Applying ${f} inside a cohesive user-facing build`,
        `Writing clear technical documentation & architecture diagrams`,
      ],
      objectives: (f) => [
        `Ship Project 1 while closing your gap in ${f}.`,
        `Practice breaking an open-ended problem into daily milestones.`,
      ],
      exercises: (f) => [
        `Scaffold Project 1 repository, folder layout, and milestone checklist.`,
        `Implement core features leveraging ${f} and existing strengths (${matched[0]?.name ?? 'core coding'}).`,
        `Test edge cases and record a short demo walkthrough or screenshots.`,
      ],
      milestone: (f) => `Deployed or runnable Project 1 on GitHub featuring ${f} and clean documentation.`,
    },
    {
      focus: getFocus(5, `${role} Production & Reliability`),
      theme: 'Production Readiness, Testing & Security',
      topics: (f) => [
        `${f}: Verification, hardening, and reproducibility`,
        `Automated testing, logging, and defensive edge-case checks`,
        `Code quality standards expected in technical interviews`,
      ],
      objectives: (f) => [
        `Elevate code quality from classroom scripts to production-grade standards.`,
        `Catch regressions automatically before shipping updates.`,
      ],
      exercises: (f) => [
        `Add unit/integration checks or security validation to Project 1.`,
        `Audit environment variables, secrets hygiene, and error responses.`,
        `Practice explaining your ${f} design decisions out loud in 3 minutes.`,
      ],
      milestone: (f) => `Hardened Project 1 with passing automated checks and a clear architecture summary.`,
    },
    {
      focus: getFocus(6, bonus[0] ?? `${role} Differentiator Skill`),
      theme: 'Capstone Project & Differentiator Stack',
      topics: (f) => [
        `${f}: High-leverage differentiator skill for ${role} candidates`,
        `Combining multiple missing skills into a standout capstone`,
        `Handling realistic scale, UX, or evaluation rubrics`,
      ],
      objectives: (f) => [
        `Build Project 2 incorporating ${f} to stand out among peer applicants.`,
        `Demonstrate initiative beyond standard coursework.`,
      ],
      exercises: (f) => [
        `Design and build the core engine of Project 2 using ${f}.`,
        `Benchmark output quality and log concrete metrics in your README.`,
        `Solicit feedback from a peer or mentor and resolve top 2 usability issues.`,
      ],
      milestone: (f) => `Feature-complete Project 2 demonstrating ${f} and measurable outcomes.`,
    },
    {
      focus: `${role} Interview & Portfolio Readiness`,
      theme: 'Polish, Mock Interviews & Job-Ready Launch',
      topics: (f) => [
        `STAR-format technical storytelling around your 3 projects`,
        `Role-specific technical Q&A and system walkthroughs`,
        `Resume bullet quantification and GitHub profile curation`,
      ],
      objectives: () => [
        `Articulate every skill gap you closed over the 8-week ${paceLabel}.`,
        `Prepare confidently for ${role} internships and entry-level technical screens.`,
      ],
      exercises: () => [
        `Complete 2 timed technical problem-solving / debugging mock sessions.`,
        `Update resume & LinkedIn with quantified project outcomes and GitHub links.`,
        `Review all missing core skills checklist items and schedule Project 3 build.`,
      ],
      milestone: () => `Polished portfolio, updated resume, and 100% readiness review for ${role} roles.`,
    },
  ];

  return weekTemplates.map((tpl, idx) => ({
    weekNumber: idx + 1,
    title: `Week ${idx + 1}: ${tpl.theme}`,
    focusArea: tpl.focus,
    estimatedHours: hrs,
    topicsToLearn: tpl.topics(tpl.focus),
    learningObjectives: tpl.objectives(tpl.focus),
    practicalExercises: tpl.exercises(tpl.focus),
    weeklyMilestone: tpl.milestone(tpl.focus),
  }));
}

function buildDemoProjects(
  profile: StudentProfile,
  skillGap: SkillGapResult
): ProjectRecommendation[] {
  const missingNames = skillGap.missingCoreSkills.map((m) => m.name);
  const pickGap = (idx: number, fallback: string) => missingNames[idx] ?? fallback;

  const projectBank: Record<CareerRole, ProjectRecommendation[]> = {
    'AI Engineer': [
      {
        id: 'ai-proj-1',
        title: 'Course Notes Semantic Q&A Assistant (Mini-RAG)',
        difficulty: 'Beginner',
        estimatedHours: 14,
        targetedSkills: [
          pickGap(0, 'LLM APIs & Prompt Engineering'),
          pickGap(1, 'RAG & Vector Databases'),
          'Python',
        ],
        summary:
          'Build a study assistant that ingests college lecture PDFs/Markdown notes, embeds chunks locally, and answers questions with exact page citations.',
        buildSteps: [
          'Parse and split sample lecture notes into overlapping 400-character chunks.',
          'Generate embeddings and compute cosine similarity retrieval for user queries.',
          'Prompt an LLM to answer strictly from retrieved context with source citations.',
          'Evaluate accuracy on 10 sample exam questions and log failure cases.',
        ],
        portfolioTip: 'Include an evaluation table in your README showing retrieval hit-rate across 10 test questions.',
      },
      {
        id: 'ai-proj-2',
        title: 'Structured Resume & Job Description Matcher API',
        difficulty: 'Beginner-Intermediate',
        estimatedHours: 16,
        targetedSkills: [
          pickGap(2, 'FastAPI & Model Serving'),
          pickGap(0, 'LLM APIs & Prompt Engineering'),
          'Git & Version Control',
        ],
        summary:
          'Create a FastAPI microservice that extracts structured skills from a resume, compares them against a job description, and returns validated JSON match scores.',
        buildSteps: [
          'Define strict Pydantic input/output schemas for resume analysis requests.',
          'Implement an extraction endpoint with deterministic fallback scoring.',
          'Add rate-limiting middleware and automated Pytest API contract tests.',
          'Document OpenAPI endpoints with sample curl payloads.',
        ],
        portfolioTip: 'Highlight schema validation and zero-crash error handling when presenting this backend service.',
      },
      {
        id: 'ai-proj-3',
        title: 'PyTorch Image Classifier with Error Analysis Dashboard',
        difficulty: 'Beginner-Intermediate',
        estimatedHours: 18,
        targetedSkills: [
          pickGap(3, 'PyTorch / Deep Learning'),
          'Machine Learning Fundamentals',
          'Linear Algebra & Calculus',
        ],
        summary:
          'Fine-tune a lightweight pretrained vision backbone on a small campus or everyday object dataset and inspect confusion matrices to diagnose misclassifications.',
        buildSteps: [
          'Prepare train/validation splits with basic image normalization and augmentations.',
          'Fine-tune a pretrained ResNet18 or MobileNetV3 model in PyTorch.',
          'Plot training vs validation loss curves and generate a confusion matrix.',
          'Write a brief error analysis section explaining the top 3 misclassified samples.',
        ],
        portfolioTip: 'Recruiters love seeing confusion matrices and concrete error analysis rather than just a raw accuracy number.',
      },
    ],

    'Data Scientist': [
      {
        id: 'ds-proj-1',
        title: 'Student Placement & Salary Trends EDA Workbench',
        difficulty: 'Beginner',
        estimatedHours: 12,
        targetedSkills: [
          pickGap(0, 'NumPy & Pandas'),
          pickGap(1, 'Data Visualization (Matplotlib/Seaborn)'),
          'Probability & Statistics',
        ],
        summary:
          'Clean a messy multi-year campus placement dataset, run statistical hypothesis tests across branches, and publish clear analytical charts.',
        buildSteps: [
          'Audit missing values, inconsistent labels, and outliers in Pandas.',
          'Run t-tests / Mann-Whitney tests comparing compensation across skill groups.',
          'Create 4 publication-quality Matplotlib/Seaborn visuals with clear takeaways.',
          'Summarize 3 actionable findings for university career cells.',
        ],
        portfolioTip: 'Lead your GitHub README with the 3 key business/academic findings before showing code.',
      },
      {
        id: 'ds-proj-2',
        title: 'E-Commerce Churn Predictor & Feature Importance Study',
        difficulty: 'Beginner-Intermediate',
        estimatedHours: 16,
        targetedSkills: [
          pickGap(2, 'Scikit-learn & Supervised ML'),
          'Feature Engineering & EDA',
          'SQL & Relational Databases',
        ],
        summary:
          'Query customer transaction history with SQL, engineer behavioral features, and train calibrated classification models to flag at-risk accounts.',
        buildSteps: [
          'Write SQL CTEs and window functions to aggregate 30/60/90-day user activity.',
          'Build a Scikit-learn Pipeline preventing data leakage during cross-validation.',
          'Compare Logistic Regression vs Random Forest using ROC-AUC and PR-AUC.',
          'Extract top churn drivers and translate them into retention recommendations.',
        ],
        portfolioTip: 'Explicitly mention how your Scikit-learn Pipeline prevents train-test leakage.',
      },
      {
        id: 'ds-proj-3',
        title: 'A/B Test Conversion Analyzer & KPI Scorecard',
        difficulty: 'Beginner',
        estimatedHours: 14,
        targetedSkills: [
          pickGap(0, 'Probability & Statistics'),
          'BI & Dashboard Storytelling',
          'Python',
        ],
        summary:
          'Simulate or analyze an onboarding funnel experiment, calculate statistical power and confidence intervals, and present a clear ship/no-ship memo.',
        buildSteps: [
          'Calculate required sample size and minimum detectable effect before analysis.',
          'Compute conversion lift, two-proportion z-test p-values, and 95% confidence intervals.',
          'Check for novelty effects and segment-level Simpson’s paradox.',
          'Draft a concise 1-page decision memo supported by clean charts.',
        ],
        portfolioTip: 'A crisp 1-page experiment decision memo demonstrates product-sense rare in student portfolios.',
      },
    ],

    'Web Developer': [
      {
        id: 'web-proj-1',
        title: 'Accessible Campus Event & Study Group Directory',
        difficulty: 'Beginner',
        estimatedHours: 12,
        targetedSkills: [
          pickGap(0, 'HTML5 & Semantic Accessibility'),
          pickGap(1, 'CSS & Responsive Design'),
          'React',
        ],
        summary:
          'Build a responsive, keyboard-accessible directory where students can filter campus workshops, bookmark sessions, and view mobile-friendly schedules.',
        buildSteps: [
          'Design semantic HTML landmarks and responsive CSS Grid layouts for mobile and desktop.',
          'Implement multi-criteria client-side filtering (category, day, search query).',
          'Persist bookmarked events in localStorage with full keyboard focus states.',
          'Verify 100% keyboard navigability and WCAG AA color contrast.',
        ],
        portfolioTip: 'Add a short Accessibility Checklist note in your README highlighting semantic HTML and contrast checks.',
      },
      {
        id: 'web-proj-2',
        title: 'Type-Safe Task & Pomodoro Tracker with REST API',
        difficulty: 'Beginner-Intermediate',
        estimatedHours: 16,
        targetedSkills: [
          pickGap(2, 'TypeScript'),
          'Node.js & Express',
          'REST APIs & HTTP',
        ],
        summary:
          'Create a React + TypeScript productivity app backed by an Express REST API and SQLite persistence for tracking study sprints and tasks.',
        buildSteps: [
          'Share TypeScript interfaces between frontend components and Express routes.',
          'Build CRUD endpoints (GET, POST, PATCH, DELETE) with clear HTTP status codes.',
          'Handle loading, optimistic updates, and API error banners gracefully in React.',
          'Add a daily focus summary chart showing completed study minutes.',
        ],
        portfolioTip: 'Show your clean REST API contract and shared TypeScript types in the project overview.',
      },
      {
        id: 'web-proj-3',
        title: 'Full-Stack Markdown Snippet Vault with SQL Search',
        difficulty: 'Beginner-Intermediate',
        estimatedHours: 18,
        targetedSkills: [
          pickGap(3, 'SQL & Relational Databases'),
          'React',
          'Git & Version Control',
        ],
        summary:
          'Develop a searchable developer notebook where users save tagged code snippets, preview formatted notes, and query entries via a relational database.',
        buildSteps: [
          'Model snippets and tags in a normalized relational schema with foreign keys.',
          'Implement server-side search and tag filtering endpoints.',
          'Build a clean split-pane editor and previewer in React.',
          'Include sample seed data so evaluators can test search immediately.',
        ],
        portfolioTip: 'Pre-seed your live demo with 10–15 curated study snippets so visitors see immediate value.',
      },
    ],

    'Python Developer': [
      {
        id: 'py-proj-1',
        title: 'CLI Expense & Budget Analyzer with Pytest Suite',
        difficulty: 'Beginner',
        estimatedHours: 12,
        targetedSkills: [
          pickGap(0, 'Python'),
          pickGap(1, 'Automated Testing (Pytest / Unit Tests)'),
          'SQL & Relational Databases',
        ],
        summary:
          'Build a clean command-line tool that imports CSV bank/UPI exports, categorizes transactions in SQLite, and generates monthly spending summaries.',
        buildSteps: [
          'Structure the codebase as an installable Python package with type hints.',
          'Persist categorized transactions in SQLite with duplicate detection.',
          'Generate formatted monthly terminal reports and CSV exports.',
          'Write 15+ Pytest unit tests covering edge cases and malformed CSV rows.',
        ],
        portfolioTip: 'Show your Pytest coverage report badge and clean module structure in the repository.',
      },
      {
        id: 'py-proj-2',
        title: 'URL Health & Latency Monitor Service (FastAPI)',
        difficulty: 'Beginner-Intermediate',
        estimatedHours: 16,
        targetedSkills: [
          pickGap(2, 'Django / FastAPI Frameworks'),
          'Asynchronous Python & Concurrency',
          'REST APIs & HTTP',
        ],
        summary:
          'Engineer an asynchronous Python backend that checks registered endpoints concurrently, records response times, and exposes status history via REST.',
        buildSteps: [
          'Use asyncio/httpx to poll multiple target URLs concurrently without blocking.',
          'Store uptime checks and latency percentiles in a relational database.',
          'Expose FastAPI endpoints for registering targets and querying uptime history.',
          'Add structured logging and graceful timeout handling.',
        ],
        portfolioTip: 'Benchmark sync vs async polling speed in your README to prove concurrency gains.',
      },
      {
        id: 'py-proj-3',
        title: 'Automated Log Archiver & Disk Hygiene Utility',
        difficulty: 'Beginner',
        estimatedHours: 14,
        targetedSkills: [
          pickGap(3, 'Linux & Shell Scripting'),
          'Data Structures & Algorithms',
          'Git & Version Control',
        ],
        summary:
          'Create a configurable Python + Bash automation tool that scans directories, detects duplicate files via SHA-256 hashing, and safely archives stale logs.',
        buildSteps: [
          'Walk directory trees efficiently using pathlib and hash-based deduplication.',
          'Implement a safe `--dry-run` mode before moving or compressing files.',
          'Schedule automated runs via a sample cron config and shell wrapper.',
          'Verify behavior across nested symlinks and permission errors.',
        ],
        portfolioTip: 'Including a safe `--dry-run` flag demonstrates mature systems thinking.',
      },
    ],

    'Cybersecurity Analyst': [
      {
        id: 'sec-proj-1',
        title: 'SSH & Web Server Brute-Force Log Detector',
        difficulty: 'Beginner',
        estimatedHours: 12,
        targetedSkills: [
          pickGap(0, 'SIEM & Log Analysis'),
          pickGap(1, 'Linux & Shell Scripting'),
          'Python',
        ],
        summary:
          'Write a Python log analysis tool that parses Linux auth logs and Nginx access logs to flag credential-stuffing spikes, suspicious IPs, and scanning bursts.',
        buildSteps: [
          'Parse timestamped auth.log and HTTP access log lines using regex and Python.',
          'Detect sliding-window bursts of failed logins and 404 path enumeration.',
          'Output a structured JSON incident summary and suggested firewall blocklist.',
          'Map detected behaviors to relevant MITRE ATT&CK techniques.',
        ],
        portfolioTip: 'Include sanitized sample log files in your repo so anyone can run the detector in one command.',
      },
      {
        id: 'sec-proj-2',
        title: 'Vulnerable vs Hardened Web Lab (OWASP Top 10)',
        difficulty: 'Beginner-Intermediate',
        estimatedHours: 16,
        targetedSkills: [
          pickGap(2, 'OWASP Top 10 & Web Security'),
          'Identity, Auth & Cryptography Basics',
          'Python',
        ],
        summary:
          'Build a local demo web app demonstrating SQL injection, reflected XSS, and broken access control—alongside documented secure code fixes for each flaw.',
        buildSteps: [
          'Implement 3 intentionally vulnerable endpoints in a sandboxed local app.',
          'Document exact proof-of-concept payloads and security impact.',
          'Refactor each endpoint using parameterized queries, escaping, and RBAC checks.',
          'Write automated verification tests proving each exploit is neutralized.',
        ],
        portfolioTip: 'Pair every exploit demonstration with a side-by-side secure remediation diff.',
      },
      {
        id: 'sec-proj-3',
        title: 'Network Traffic Baseline & PCAP Inspector Guide',
        difficulty: 'Beginner',
        estimatedHours: 14,
        targetedSkills: [
          pickGap(3, 'Packet Analysis & Wireshark'),
          'TCP/IP & Network Fundamentals',
          'Network Reconnaissance & Nmap',
        ],
        summary:
          'Capture and analyze benign vs anomalous local lab traffic in Wireshark, documenting DNS tunneling indicators, port scans, and unencrypted protocols.',
        buildSteps: [
          'Record baseline HTTP, DNS, and TLS traffic in a local virtual lab.',
          'Simulate a controlled Nmap SYN scan and inspect packet flags in Wireshark.',
          'Create reusable Wireshark display filters for common triage scenarios.',
          'Write a concise SOC analyst playbook summarizing investigation steps.',
        ],
        portfolioTip: 'Presenting clean Wireshark filter cheatsheets and SOC triage notes shows job-ready analyst habits.',
      },
    ],
  };

  return projectBank[profile.targetRole];
}

export function buildDemoAnalysis(
  profile: StudentProfile,
  aiNotice?: string
): CareerAnalysisResponse {
  const skillGap = computeSkillGap(profile);
  const topMissing = skillGap.missingCoreSkills.slice(0, 3).map((s) => s.name);
  const topMatched = skillGap.matchedCoreSkills.slice(0, 3).map((s) => s.name);

  const strengthClause =
    topMatched.length > 0
      ? `You already bring solid momentum in ${topMatched.join(', ')}, giving you a ${skillGap.skillReadinessPercent}% weighted core match for ${profile.targetRole}.`
      : `You are starting fresh toward ${profile.targetRole}, which means every core foundation you add over the next 8 weeks will directly raise your readiness.`;

  const gapClause =
    topMissing.length > 0
      ? `Your highest-leverage gaps to close next are ${topMissing.join(', ')}.`
      : `You cover all core competencies—now focus on production polish, differentiator bonus skills, and portfolio depth.`;

  const careerSummary = `${profile.studentName} (${profile.educationLevel}, ${profile.branch}) is targeting ${profile.targetRole} at an ${profile.experienceLevel} level with ${profile.studyHoursPerWeek} hrs/week available. ${strengthClause} ${gapClause}`;

  const nextSteps: string[] = [
    topMissing[0]
      ? `Prioritize ${topMissing[0]} in Weeks 1–2—it carries critical weight for ${profile.targetRole} interviews.`
      : `Deepen system design and production testing across your existing ${profile.targetRole} stack.`,
    `Protect ${profile.studyHoursPerWeek} dedicated hours per week using 2–3 focused blocks rather than cramming.`,
    `Start "${buildDemoProjects(profile, skillGap)[0].title}" by Week 4 to turn theory into verifiable GitHub proof.`,
    skillGap.recommendedBonusSkills[0]
      ? `Add ${skillGap.recommendedBonusSkills[0]} in Week 7 as a differentiator skill for internships and junior roles.`
      : `Conduct 2 mock technical walkthroughs explaining your projects and tradeoffs before applying.`,
  ];

  return {
    profile,
    skillGap,
    careerSummary,
    nextSteps,
    roadmap: buildDemoRoadmap(profile, skillGap),
    projects: buildDemoProjects(profile, skillGap),
    analysisSource: 'demo',
    aiNotice,
    generatedAt: new Date().toISOString(),
  };
}

export const SAMPLE_PROFILES: SampleProfilePreset[] = [
  {
    id: 'aarav-ai',
    label: 'Aarav Mehta',
    subtitle: 'B.Tech CSE (3rd Year) · AI Engineer',
    profile: {
      studentName: 'Aarav Mehta',
      educationLevel: 'B.Tech / B.E. (3rd–4th Year)',
      branch: 'Computer Science & Engineering',
      targetRole: 'AI Engineer',
      existingSkills: [
        'Python',
        'Git',
        'SQL',
        'NumPy',
        'Pandas',
        'Machine Learning Fundamentals',
        'HTML5',
      ],
      experienceLevel: 'Intermediate',
      studyHoursPerWeek: 12,
    },
  },
  {
    id: 'priya-web',
    label: 'Priya Nair',
    subtitle: 'B.Sc. Computer Science · Web Developer',
    profile: {
      studentName: 'Priya Nair',
      educationLevel: 'B.Sc. / BCA Undergraduate',
      branch: 'Computer Science',
      targetRole: 'Web Developer',
      existingSkills: ['HTML5', 'CSS3', 'JavaScript', 'Git', 'Tailwind CSS'],
      experienceLevel: 'Beginner',
      studyHoursPerWeek: 10,
    },
  },
  {
    id: 'rohan-sec',
    label: 'Rohan Kulkarni',
    subtitle: 'B.Tech IT (4th Year) · Cybersecurity Analyst',
    profile: {
      studentName: 'Rohan Kulkarni',
      educationLevel: 'B.Tech / B.E. (3rd–4th Year)',
      branch: 'Information Technology',
      targetRole: 'Cybersecurity Analyst',
      existingSkills: ['Linux', 'TCP/IP', 'Python', 'Wireshark', 'SQL'],
      experienceLevel: 'Intermediate',
      studyHoursPerWeek: 14,
    },
  },
];
