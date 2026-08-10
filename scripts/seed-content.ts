import { Client } from 'pg';

// Stable UUIDs for idempotency
const COMPETENCY_IDS = {
  delivery: 'a0000000-0000-4000-a000-000000000001',
  feedback: 'a0000000-0000-4000-a000-000000000002',
  leadership: 'a0000000-0000-4000-a000-000000000003',
  strategic: 'a0000000-0000-4000-a000-000000000004',
  technical: 'a0000000-0000-4000-a000-000000000005',
};

const PF_IDS = {
  // Delivery
  'delivery-pf1': 'a0000000-0000-4000-b000-000000000001',
  'delivery-pf2': 'a0000000-0000-4000-b000-000000000002',
  // Feedback
  'feedback-pf1': 'a0000000-0000-4000-b000-000000000003',
  'feedback-pf2': 'a0000000-0000-4000-b000-000000000004',
  'feedback-pf3': 'a0000000-0000-4000-b000-000000000005',
  // Leadership
  'leadership-pf1': 'a0000000-0000-4000-b000-000000000006',
  'leadership-pf2': 'a0000000-0000-4000-b000-000000000007',
  'leadership-pf3': 'a0000000-0000-4000-b000-000000000008',
  // Strategic Impact
  'strategic-pf1': 'a0000000-0000-4000-b000-000000000009',
  // Technical Skill
  'technical-pf1': 'a0000000-0000-4000-b000-00000000000a',
  'technical-pf2': 'a0000000-0000-4000-b000-00000000000b',
  'technical-pf3': 'a0000000-0000-4000-b000-00000000000c',
  'technical-pf4': 'a0000000-0000-4000-b000-00000000000d',
  'technical-pf5': 'a0000000-0000-4000-b000-00000000000e',
  'technical-pf6': 'a0000000-0000-4000-b000-00000000000f',
};

function generateStdId(pfId: string, level: string): string {
  const pfNum = Object.values(PF_IDS).indexOf(pfId);
  const levelNum = parseInt(level.substring(1));
  return `a0000000-0000-4000-c000-${String(pfNum * 10 + levelNum).padStart(12, '0')}`;
}

function generateBadgeId(badgeCode: string): string {
  const codeToNum: Record<string, number> = {
    'DL': 1, 'FCC': 2, 'LEAD': 3, 'SI': 4, 'TS': 5,
  };
  const hash = badgeCode.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return `a0000000-0000-4000-d000-${String(hash % 1000000000000).padStart(12, '0')}`;
}

function generateTrainingId(competencyId: string, type: string, seq: number): string {
  const typeMap: Record<string, number> = {
    'learning_path': 1,
    'concept_notes': 2,
    'guided_exercise': 3,
    'autonomous_project': 4,
    'onboarding': 5,
    'reference_card': 6,
  };
  const typeNum = typeMap[type] || 0;
  const compNum = Object.values(COMPETENCY_IDS).indexOf(competencyId);
  return `a0000000-0000-4000-e000-${String(compNum * 100 + typeNum * 10 + seq).padStart(12, '0')}`;
}

function generateFaId(pfId: string, level: string): string {
  const pfNum = Object.values(PF_IDS).indexOf(pfId);
  const levelNum = parseInt(level.substring(1));
  return `a0000000-0000-4000-f000-${String(pfNum * 10 + levelNum).padStart(12, '0')}`;
}

export async function seedContent(connectionString: string): Promise<void> {
  const client = new Client({ connectionString });

  try {
    await client.connect();
    console.log('Connected to database');

    // Seed Competencies
    await seedCompetencies(client);
    console.log('✓ Competencies seeded');

    // Seed Primary Functions
    await seedPrimaryFunctions(client);
    console.log('✓ Primary Functions seeded');

    // Seed Standards
    await seedStandards(client);
    console.log('✓ Standards seeded');

    // Seed Functional Analyses
    await seedFunctionalAnalyses(client);
    console.log('✓ Functional Analyses seeded');

    // Seed Badges
    await seedBadges(client);
    console.log('✓ Badges seeded');

    // Seed Training Units
    await seedTrainingUnits(client);
    console.log('✓ Training Units seeded');

    console.log('\n✅ All content seeded successfully');
  } finally {
    await client.end();
  }
}

async function seedCompetencies(client: Client): Promise<void> {
  const competencies = [
    {
      id: COMPETENCY_IDS.delivery,
      name: 'Delivery',
      domains: ['development', 'ai', 'data', 'devops', 'frontend'],
    },
    {
      id: COMPETENCY_IDS.feedback,
      name: 'Feedback, Communication & Collaboration',
      domains: ['development', 'ai', 'data', 'devops', 'frontend'],
    },
    {
      id: COMPETENCY_IDS.leadership,
      name: 'Leadership',
      domains: ['development', 'ai', 'data', 'devops', 'frontend'],
    },
    {
      id: COMPETENCY_IDS.strategic,
      name: 'Strategic Impact',
      domains: ['development', 'ai', 'data', 'devops', 'frontend'],
    },
    {
      id: COMPETENCY_IDS.technical,
      name: 'Technical Skill',
      domains: ['development', 'ai', 'data', 'devops', 'frontend'],
    },
  ];

  for (const comp of competencies) {
    await client.query(
      `INSERT INTO competencies (id, name, domains)
       VALUES ($1, $2, $3)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         domains = EXCLUDED.domains`,
      [comp.id, comp.name, comp.domains]
    );
  }
}

async function seedPrimaryFunctions(client: Client): Promise<void> {
  const pfs = [
    { id: PF_IDS['delivery-pf1'], comp: COMPETENCY_IDS.delivery, name: 'Incremental Value Delivery' },
    { id: PF_IDS['delivery-pf2'], comp: COMPETENCY_IDS.delivery, name: 'Self-Organization' },
    { id: PF_IDS['feedback-pf1'], comp: COMPETENCY_IDS.feedback, name: 'Feedback' },
    { id: PF_IDS['feedback-pf2'], comp: COMPETENCY_IDS.feedback, name: 'Communication' },
    { id: PF_IDS['feedback-pf3'], comp: COMPETENCY_IDS.feedback, name: 'Collaboration' },
    { id: PF_IDS['leadership-pf1'], comp: COMPETENCY_IDS.leadership, name: 'Judgment & Organizational Improvement' },
    { id: PF_IDS['leadership-pf2'], comp: COMPETENCY_IDS.leadership, name: 'Facilitation' },
    { id: PF_IDS['leadership-pf3'], comp: COMPETENCY_IDS.leadership, name: 'Mentoring' },
    { id: PF_IDS['strategic-pf1'], comp: COMPETENCY_IDS.strategic, name: 'Business Acumen & Strategy' },
    { id: PF_IDS['technical-pf1'], comp: COMPETENCY_IDS.technical, name: 'Quality & Testing' },
    { id: PF_IDS['technical-pf2'], comp: COMPETENCY_IDS.technical, name: 'Debugging & Observability' },
    { id: PF_IDS['technical-pf3'], comp: COMPETENCY_IDS.technical, name: 'Software Design & Architecture' },
    { id: PF_IDS['technical-pf4'], comp: COMPETENCY_IDS.technical, name: 'Security' },
    { id: PF_IDS['technical-pf5'], comp: COMPETENCY_IDS.technical, name: 'AI-Assisted Engineering' },
    { id: PF_IDS['technical-pf6'], comp: COMPETENCY_IDS.technical, name: 'AI Judgment & Feature Delivery' },
  ];

  for (const pf of pfs) {
    await client.query(
      `INSERT INTO primary_functions (id, competency_id, name)
       VALUES ($1, $2, $3)
       ON CONFLICT (id) DO UPDATE SET
         competency_id = EXCLUDED.competency_id,
         name = EXCLUDED.name`,
      [pf.id, pf.comp, pf.name]
    );
  }
}

async function seedStandards(client: Client): Promise<void> {
  const standards = [
    // Delivery PF1 - Incremental Value Delivery
    {
      pf: PF_IDS['delivery-pf1'],
      level: 'P2',
      body: 'explain why a given task should be split before starting it, when asked\nwork on tasks in the priority order set by the team',
    },
    {
      pf: PF_IDS['delivery-pf1'],
      level: 'P3',
      body: 'size a task for incremental delivery before starting it, with input from a teammate or manager\nnote a task\'s dependencies before starting it\nmake a reasonable decision on a task despite missing information, within their own scope of work',
    },
    {
      pf: PF_IDS['delivery-pf1'],
      level: 'P4',
      body: 'resize a task that isn\'t appropriately scoped for incremental delivery, identified during planning, unaided\ncorrect a task\'s priority and dependency notes during planning, unaided\nmake a reasonable decision under incomplete information in both routine and high-pressure situations',
    },
    {
      pf: PF_IDS['delivery-pf1'],
      level: 'P5',
      body: 'break down an epic or project into well-scoped, prioritized pieces that the team understands\nfoster a team culture of priority-setting and urgency aligned with organizational strategy\nguide the team through a decision made under incomplete information',
    },
    {
      pf: PF_IDS['delivery-pf1'],
      level: 'P6',
      body: 'break down cross-team work into pieces that all involved teams understand\nfoster a cross-team culture of priority-setting and urgency, with dependencies understood by all teams involved\nguide several teams through risk, change, or uncertainty spanning their work',
    },
    {
      pf: PF_IDS['delivery-pf1'],
      level: 'P7',
      body: 'break down an organization-wide initiative into pieces that are prioritized and understood across the organization\ninstall an organization-wide preventative measure that stops a recurring cross-team dependency issue\nguide the organization through risk, change, or uncertainty at organizational scope',
    },
    // Delivery PF2 - Self-Organization
    {
      pf: PF_IDS['delivery-pf2'],
      level: 'P2',
      body: 'report daily progress on assigned work to the team\ndeliver on a committed task with visible urgency\nask a senior engineer for help weighing cost against value on a real decision',
    },
    {
      pf: PF_IDS['delivery-pf2'],
      level: 'P3',
      body: 'escalate a blocker, delay, or cost overrun to the team daily, as soon as it\'s identified\nweigh cost against value on a real decision, with senior engineer input',
    },
    {
      pf: PF_IDS['delivery-pf2'],
      level: 'P4',
      body: 'communicate a blocker, delay, or cost overrun before it requires escalation\nweigh cost against value on a real decision, unaided\nsuggest an economic tradeoff to a teammate on their work',
    },
    {
      pf: PF_IDS['delivery-pf2'],
      level: 'P5',
      body: 'clarify delivery expectations between the team and external stakeholders before a project starts\nfoster a team culture of applying economic thinking to make timely decisions',
    },
    {
      pf: PF_IDS['delivery-pf2'],
      level: 'P6',
      body: 'manage a cross-team roadmap to delivery, with blockers anticipated and communicated across teams\nfoster an economic-thinking culture across several teams',
    },
    {
      pf: PF_IDS['delivery-pf2'],
      level: 'P7',
      body: 'manage an organization-wide roadmap to delivery, with expectations clarified across the organization and with external stakeholders\nfoster an economic-thinking culture across the organization',
    },
    // Feedback PF1 - Feedback
    {
      pf: PF_IDS['feedback-pf1'],
      level: 'P2',
      body: 'explain how to deliver praise and constructive feedback in a useful manner, when asked\nseek out feedback from teammates and manager, and apply it as a tool for growth',
    },
    {
      pf: PF_IDS['feedback-pf1'],
      level: 'P3',
      body: 'deliver praise and constructive feedback to their team, teammates, and manager, in a useful manner',
    },
    {
      pf: PF_IDS['feedback-pf1'],
      level: 'P4',
      body: 'deliver praise and constructive feedback to their team, teammates, manager, and team\'s business stakeholders, when opportunities arise\nseek and reconcile feedback from both their formal LFT manager and the client stakeholder directing their day-to-day work, when working in a matrixed reporting structure',
    },
    {
      pf: PF_IDS['feedback-pf1'],
      level: 'P5',
      body: 'foster a culture of delivering praise and constructive feedback within their team and the team\'s business stakeholders, demonstrating these behaviors themselves\nfoster, within their team and with its business stakeholders, a culture of seeking out feedback and using it for growth, demonstrating these behaviors themselves\ncoach teammates on separating client-directed day-to-day feedback from the formal LFT performance record, and on surfacing client feedback to their LFT manager so it counts toward evaluation',
    },
    {
      pf: PF_IDS['feedback-pf1'],
      level: 'P6',
      body: 'foster a culture of delivering praise and constructive feedback across several teams\nfoster a culture of seeking out and using feedback across several teams and with their business stakeholders',
    },
    {
      pf: PF_IDS['feedback-pf1'],
      level: 'P7',
      body: 'foster a culture of delivering praise and constructive feedback across the organization\nfoster a culture of seeking out and using feedback across the organization',
    },
    // Feedback PF2 - Communication
    {
      pf: PF_IDS['feedback-pf2'],
      level: 'P2',
      body: 'communicate clearly, concisely, and in an audience-oriented way in written and verbal form, actively listening to others and attending to nonverbal communication\nshare knowledge of their area of work frequently with teammates\ncommunicate asynchronously in writing (status updates, handoff notes) in a way that a teammate or client contact in a different time zone can act on without needing a same-day reply',
    },
    {
      pf: PF_IDS['feedback-pf2'],
      level: 'P3',
      body: 'communicate clearly, concisely, and in an audience-oriented way in written and verbal form, usually, on both technical and non-technical subjects\ncontribute to their team\'s documentation, watching for opportunities to share knowledge beyond routine sharing\ncommunicate directly with client stakeholders on routine matters (status, clarifying questions) in a tone appropriate to a client relationship, distinct from informal internal team communication',
    },
    {
      pf: PF_IDS['feedback-pf2'],
      level: 'P4',
      body: 'communicate clearly, concisely, and in an audience-oriented way in written and verbal form, consistently, on both technical and non-technical subjects\nencourage others to share knowledge and contribute to documentation\nmanage client expectations proactively (setting realistic timelines, surfacing risk early) and escalate client-facing issues through the appropriate internal channel rather than absorbing or hiding them\nadapt communication cadence and medium to a distributed, cross-timezone team, minimizing dependence on real-time overlap with client or teammate hours',
    },
    {
      pf: PF_IDS['feedback-pf2'],
      level: 'P5',
      body: 'communicate effectively with a diverse team\nfoster a culture of clear, concise, audience-oriented communication on their team\nfoster a culture of documentation and knowledge sharing within their team and with the team\'s business stakeholders\nset the escalation protocol and tone standard for client-facing communication on their team, and coach teammates on managing client expectations across the relationship\ndesign team communication norms (handoff notes, overlap-hour meeting discipline, async-first defaults) that hold up across a cross-timezone, client-facing delivery model',
    },
    {
      pf: PF_IDS['feedback-pf2'],
      level: 'P6',
      body: 'communicate effectively with a diverse set of teams\nfoster a culture of effective communication across several teams\nfoster a culture of documentation and knowledge sharing across several teams',
    },
    {
      pf: PF_IDS['feedback-pf2'],
      level: 'P7',
      body: 'communicate effectively across the company\nfoster a culture of effective communication across the company\nfoster a culture of documentation and knowledge sharing across the organization',
    },
    // Feedback PF3 - Collaboration
    {
      pf: PF_IDS['feedback-pf3'],
      level: 'P2',
      body: 'help teammates when requested\ngive or share credit where due\nbuild strong relationships with teammates and manager\nshare opinions openly and contribute to discussions in a respectful manner\nwork with teammates to resolve disagreement in a healthy manner\nremain open to changing their perspective based on others\' input',
    },
    {
      pf: PF_IDS['feedback-pf3'],
      level: 'P3',
      body: 'help teammates overcome obstacles, resolve blockers, and complete work tasks, when requested\nprovide on-call support as determined by Engineering Management\nbuild strong relationships with teammates, manager, and their product counterpart\napproach disagreement with teammates non-defensively and with inquisitiveness, using contradictory opinions as a basis for constructive conversation\nwork within a client\'s existing team structure, tools, and working norms (their ceremonies, ticketing conventions, communication channels) rather than defaulting to LFT-internal habits',
    },
    {
      pf: PF_IDS['feedback-pf3'],
      level: 'P4',
      body: 'help teammates overcome obstacles, resolve blockers, and complete work tasks, sometimes\nbuild strong relationships with teammates, manager, and their team\'s relevant business stakeholders\nencourage teammates to openly share their opinions\ncollaborate effectively with client engineers and PMs as embedded working peers, distinguishing where client process governs from where LFT internal process governs\nkeep context and priorities separated when staffed across more than one concurrent client engagement, without leaking one client\'s information into another\'s',
    },
    {
      pf: PF_IDS['feedback-pf3'],
      level: 'P5',
      body: 'help teammates overcome obstacles, resolve blockers, and complete work tasks, consistently\nbuild and improve strong relationships with teammates, manager, business stakeholders, and senior engineers across the organization\nleverage relationships to better plan for and position their team\nfoster a culture within their team where people share opinions openly, approach disagreement non-defensively, and use contradictory opinions constructively\ncoach teammates on collaborating productively inside a client\'s team structure, and on protecting boundaries across multiple concurrent client engagements',
    },
    {
      pf: PF_IDS['feedback-pf3'],
      level: 'P6',
      body: 'work across teams, consistently, to help them resolve blockers and complete work tasks\nensure credit is shared where due, across teams\nbuild and improve strong relationships with engineers and managers across the organization\nleverage relationships to better plan for and position those teams\nfoster this culture across several teams\nwork through surface-level disagreements to expose the concerns of disagreeing voices\nset norms for how several teams collaborate across client-team boundaries and across concurrent client engagements, so individual practitioners aren\'t left to improvise it',
    },
    {
      pf: PF_IDS['feedback-pf3'],
      level: 'P7',
      body: 'work across the organization, consistently, to enable teams to support each other\nbuild and improve strong relationships across the organization\nleverage relationships to better plan for and position the engineering organization\nfoster this culture across the organization\nintegrate disagreeing perspectives from across the company into their own perspective and plans',
    },
    // Leadership PF1 - Judgment & Organizational Improvement
    {
      pf: PF_IDS['leadership-pf1'],
      level: 'P2',
      body: 'explain how biases affect decision making, when asked\nexplain what accountability for decisions and outcomes means, when asked\ncontribute to conversations based on organizational strategy and principles, when appropriate, staying strongly oriented towards goals\nexplain their team\'s practices and processes, when asked',
    },
    {
      pf: PF_IDS['leadership-pf1'],
      level: 'P3',
      body: 'reflect on their own biases when making a real decision, striving for objectivity\nhold themselves accountable for their own decisions and outcomes\ninitiate conversations based on organizational strategy and principles, when appropriate, staying strongly oriented towards goals\ndiscuss an improvement to team practices or processes with the team, sometimes',
    },
    {
      pf: PF_IDS['leadership-pf1'],
      level: 'P4',
      body: 'have conversations based on organizational strategy and principles to ensure team alignment\nensure their team is continuously working towards their shared goals\ndiscuss improvements to team practices and processes with the team, regularly',
    },
    {
      pf: PF_IDS['leadership-pf1'],
      level: 'P5',
      body: 'raise awareness, within their team, of how biases impact decisions\ntake ownership of decisions made in their team, helping teammates make clear decisions aligned with organizational goals\nfoster a culture within their team of having conversations based on organizational strategy and principles to create alignment\ncollaborate with others, sometimes, to improve organizational practices and processes\nidentify where a client\'s existing practices or tooling constrain an improvement, and propose a change that improves quality within those constraints rather than requiring the client to adopt LFT\'s default practice',
    },
    {
      pf: PF_IDS['leadership-pf1'],
      level: 'P6',
      body: 'take ownership of decisions made across teams\nensure accountability is practiced throughout those teams\nfoster this culture (of strategy-grounded, alignment-creating conversation) across several teams\nensure several teams are continuously working towards their goals\ndiscuss improvements to practices or processes that affect several teams, with appropriate parties\ndrive implementation of a cross-team practice or process improvement\ndrive a consistent engineering standard across multiple concurrent client engagements, adapting how it is introduced to each client\'s context, contract type, and existing tooling without diluting the standard itself',
    },
    {
      pf: PF_IDS['leadership-pf1'],
      level: 'P7',
      body: 'take ownership of decisions made in the engineering organization\nensure accountability is practiced throughout the organization\nfoster this culture across the organization\nensure goals are understood and continuously worked towards across the organization\ntake ownership and responsibility for organizational practices and processes and their continuous improvement\nset an organization-wide bar for engineering practice that holds up under scrutiny from enterprise clients\' technical leadership, while accommodating legitimate per-account variation in what can be directly changed versus negotiated versus worked around',
    },
    // Technical Skill PF1 - Quality & Testing
    {
      pf: PF_IDS['technical-pf1'],
      level: 'P2',
      body: 'write a function with explicit edge-case and error-handling branches that a reviewer can approve without a walkthrough\nwrite a unit test for a new function using the team\'s test framework, with guidance from a senior engineer\nlocate and follow an unfamiliar client codebase\'s existing test conventions (framework, naming, fixture patterns) instead of introducing their own, with guidance',
    },
    {
      pf: PF_IDS['technical-pf1'],
      level: 'P3',
      body: 'write unit and higher-level tests unaided, covering edge cases and error paths in addition to the happy path\nwrite a docstring that explains non-obvious function intent, without commenting self-evident code\nonboard into a new client codebase\'s test suite and stack within the engagement\'s ramp-up window, and write conforming tests unaided\nbuild test fixtures using synthetic or masked data, never live client data, when the client\'s data handling terms require it',
    },
    {
      pf: PF_IDS['technical-pf1'],
      level: 'P4',
      body: 'write production-ready, self-documenting code that reserves comments for non-obvious rationale only\nwrite a test suite spanning multiple testing-pyramid layers for a feature, unaided\nadapt their testing approach to a client\'s existing tooling and CI constraints (e.g. a mandated framework, a restricted CI environment) without treating those constraints as blockers',
    },
    {
      pf: PF_IDS['technical-pf1'],
      level: 'P5',
      body: 'recommend a testing-pyramid-aligned fix for a gap surfaced by the team\'s quality metrics',
    },
    {
      pf: PF_IDS['technical-pf1'],
      level: 'P6',
      body: 'propose a converged testing strategy across several teams\' existing practices',
    },
    {
      pf: PF_IDS['technical-pf1'],
      level: 'P7',
      body: 'set an organization-wide testing standard with a mechanism for measuring team adherence',
    },
    // Technical Skill PF2 - Debugging & Observability
    {
      pf: PF_IDS['technical-pf2'],
      level: 'P2',
      body: 'reproduce a reported bug from a ticket description before attempting a fix\nuse a debugger or logging tool to isolate the cause of a failure in familiar code, with guidance',
    },
    {
      pf: PF_IDS['technical-pf2'],
      level: 'P3',
      body: 'debug an issue located within a single service using a systematic method (bisection, log correlation, reproduction) unaided\nexplain what "normal" operational data looks like for the team\'s domain, using team dashboards\nlocate and use an unfamiliar client\'s existing logging/monitoring tooling to debug an issue, without requiring the client\'s stack to match a prior project\'s',
    },
    {
      pf: PF_IDS['technical-pf2'],
      level: 'P4',
      body: 'diagnose a cross-service issue, escalating to a senior engineer only when genuinely blocked\npropose a monitoring or alerting change justified by an observed operational-data pattern\ndiagnose an issue within a client\'s production environment while respecting the client\'s access restrictions (e.g. no direct prod access, redacted logs, approval-gated queries), requesting the minimum access needed rather than treating restrictions as blockers',
    },
    {
      pf: PF_IDS['technical-pf2'],
      level: 'P5',
      body: 'drive a team monitoring change justified by operational data, to close a stability or performance gap\ndiagnose an issue within the full scope of the team\'s domain unaided, without escalating scope-appropriate problems',
    },
    {
      pf: PF_IDS['technical-pf2'],
      level: 'P6',
      body: 'establish an observability practice (dashboard conventions, alert standards) adopted by several teams\ndiagnose an issue spanning a set of related domains across several teams',
    },
    {
      pf: PF_IDS['technical-pf2'],
      level: 'P7',
      body: 'lead organization-wide incident response for a cross-team outage\nfoster an observability culture adopted across the engineering organization',
    },
    // Technical Skill PF3 - Software Design & Architecture
    {
      pf: PF_IDS['technical-pf3'],
      level: 'P2',
      body: 'identify which existing module a new piece of logic belongs in, with guidance\ndescribe how a new function fits the overall service architecture before writing it, avoiding duplicate logic',
    },
    {
      pf: PF_IDS['technical-pf3'],
      level: 'P3',
      body: 'design a function\'s interface so it aligns with the team\'s existing architectural patterns, unaided\nexplain the data flow for a portion of the team\'s domain to a new teammate\nread and follow a newly assigned client codebase\'s existing architectural conventions within the engagement\'s ramp-up window, rather than applying patterns from a prior client',
    },
    {
      pf: PF_IDS['technical-pf3'],
      level: 'P4',
      body: 'design code using abstraction and isolation to avoid coupling unrelated concerns\nscope a moderately complex change using a map of the team\'s relevant services and data flows\ndeliver a design that fits within a client-mandated stack or platform constraint (e.g. a client-chosen cloud provider, framework, or legacy component) without treating the constraint as a blocker to raise instead of solve',
    },
    {
      pf: PF_IDS['technical-pf3'],
      level: 'P5',
      body: 'architect a service or system component using an accepted design pattern that supports iterative, autonomous development\nnegotiate an architectural tradeoff with a client\'s technical stakeholders, documenting the decision and rationale in terms the client\'s team can maintain after LFT\'s engagement ends',
    },
    {
      pf: PF_IDS['technical-pf3'],
      level: 'P6',
      body: 'guide several teams toward a shared architectural pattern that supports cross-team scaling',
    },
    {
      pf: PF_IDS['technical-pf3'],
      level: 'P7',
      body: 'define an organization-wide architecture principle covering how bounded contexts interact',
    },
    // Technical Skill PF4 - Security
    {
      pf: PF_IDS['technical-pf4'],
      level: 'P2',
      body: 'name the security implication of a proposed change, in plain language, before submitting it for review\nname what counts as client IP or client data in the codebase they\'re working in (source, credentials, customer records) before handling it',
    },
    {
      pf: PF_IDS['technical-pf4'],
      level: 'P3',
      body: 'flag a security question to a senior engineer before making a decision with unclear security implications\nhandle client credentials and access grants only through the client\'s or LFT\'s approved secrets-management process, never via ad hoc sharing (chat, email, personal accounts)',
    },
    {
      pf: PF_IDS['technical-pf4'],
      level: 'P4',
      body: 'identify a security vulnerability during a peer code review, citing the specific risk\napply a security checklist to a design before implementation begins\nidentify which client contract or data-handling terms apply to a piece of work (e.g. data residency, NDA scope, subcontracting restrictions) before moving client code or data outside the client\'s approved environment',
    },
    {
      pf: PF_IDS['technical-pf4'],
      level: 'P5',
      body: 'refine the team\'s security approach jointly with the security team, documenting the resulting practice\ndefine a client-engagement-specific security practice (e.g. what tooling, environments, and data-egress rules apply for a given client) that a client\'s technical leadership would accept on review',
    },
    {
      pf: PF_IDS['technical-pf4'],
      level: 'P6',
      body: 'apply the organization\'s security strategy consistently across several teams, resolving conflicts between team practices\nresolve a conflict between two clients\' differing security/compliance requirements affecting shared LFT tooling or practice, without leaking one client\'s requirements or IP into another\'s engagement',
    },
    {
      pf: PF_IDS['technical-pf4'],
      level: 'P7',
      body: 'set an organization-wide security strategy adopted by the security team and engineering leads\nidentify an obscure security threat that standard review or tooling misses',
    },
    // Technical Skill PF5 - AI-Assisted Engineering
    {
      pf: PF_IDS['technical-pf5'],
      level: 'P2',
      body: 'use an AI coding tool (Copilot, Claude, Cursor) to draft code, then review the output line-by-line before committing\ncheck which AI tools are contractually approved for a given client engagement before pasting that client\'s code or data into any AI tool',
    },
    {
      pf: PF_IDS['technical-pf5'],
      level: 'P3',
      body: 'apply a consistent prompting pattern for a recurring task type (code generation, test writing, or debugging)\nstrip or avoid including client-identifying data/secrets in prompts sent to an AI tool, even an approved one',
    },
    {
      pf: PF_IDS['technical-pf5'],
      level: 'P4',
      body: 'integrate AI tooling across the full development lifecycle (coding, testing, debugging, documentation, review) with disciplined prompting habits, holding AI-generated code to the same review bar as human-written code\napply a different client\'s AI-tool usage restrictions (e.g. no AI tools permitted at all, only a specific vendor, no client data in prompts) correctly when moving between engagements',
    },
    {
      pf: PF_IDS['technical-pf5'],
      level: 'P5',
      body: 'establish a team-level standard for AI tool use and prompting discipline',
    },
    {
      pf: PF_IDS['technical-pf5'],
      level: 'P6',
      body: 'drive AI workflow adoption and quality across several teams, closing team-level AI practice gaps identified with team leads',
    },
    {
      pf: PF_IDS['technical-pf5'],
      level: 'P7',
      body: 'set and govern organizational AI workflow standards, ensuring adoption is measured by outcomes, not usage',
    },
    // Technical Skill PF6 - AI Judgment & Feature Delivery
    {
      pf: PF_IDS['technical-pf6'],
      level: 'P2',
      body: 'flag an AI-generated suggestion as uncertain rather than shipping it, when correctness isn\'t obvious',
    },
    {
      pf: PF_IDS['technical-pf6'],
      level: 'P3',
      body: 'catch a hallucinated API call or incorrect AI suggestion during self-review, before it reaches PR',
    },
    {
      pf: PF_IDS['technical-pf6'],
      level: 'P4',
      body: 'ship an AI-powered feature backed by a basic eval suite (naming covered and uncovered failure modes) and an articulated rollback condition\nbuild an eval set for a client-facing AI feature using only data the client has approved for that purpose (synthetic or explicitly cleared data, not repurposed production client data without approval)',
    },
    {
      pf: PF_IDS['technical-pf6'],
      level: 'P5',
      body: 'review a teammate\'s AI-generated PR with explicit AI judgment (prompt design, eval coverage), not generic code review',
    },
    {
      pf: PF_IDS['technical-pf6'],
      level: 'P6',
      body: 'address a systemic AI risk pattern (e.g., shipping without evals) recurring across several teams, working with team leads on a structural fix',
    },
    {
      pf: PF_IDS['technical-pf6'],
      level: 'P7',
      body: 'own organizational AI capability and governance, defining eval-culture standards connected to business outcomes',
    },
    // Leadership PF2 - Facilitation
    {
      pf: PF_IDS['leadership-pf2'],
      level: 'P4',
      body: 'facilitate discussions within their team, ensuring everyone has an opportunity to share their opinion and be heard, that discussion outcomes tie to stated goals, and that no one person dominates the conversation\nfacilitate a discussion that includes client stakeholders (e.g., a ceremony, a working session), applying the same balanced-participation and goal-tied outcome standard even though they hold no formal authority over the client attendees',
    },
    {
      pf: PF_IDS['leadership-pf2'],
      level: 'P5',
      body: 'facilitate discussions within their team, ensuring everyone has an opportunity to share their opinion and be heard, that discussion outcomes tie to stated goals, and that no one person dominates the conversation',
    },
    {
      pf: PF_IDS['leadership-pf2'],
      level: 'P6',
      body: 'facilitate discussions across teams, ensuring relevant parties are included\nguide discussions toward decisions, clarifying points and securing buy-in\nfacilitate a discussion where LFT and client stakeholders disagree, navigating client authority dynamics (e.g., a client decision-maker in the room, competing client and LFT priorities) to reach a decision with genuine buy-in rather than a decision the client attendee simply outranks the room into',
    },
    {
      pf: PF_IDS['leadership-pf2'],
      level: 'P7',
      body: 'facilitate organization-wide discussions, applying the same principles\nfacilitate discussions that span multiple client accounts (e.g., cross-account practice alignment, a shared delivery standard), applying the same principles despite having no single unifying authority over any given client\'s side of the room',
    },
    // Leadership PF3 - Mentoring
    {
      pf: PF_IDS['leadership-pf3'],
      level: 'P2',
      body: 'seek out mentorship to grow their own experience',
    },
    {
      pf: PF_IDS['leadership-pf3'],
      level: 'P3',
      body: 'mentor teammates, sometimes, in an open, respectful, flexible, and empathetic manner',
    },
    {
      pf: PF_IDS['leadership-pf3'],
      level: 'P4',
      body: 'mentor teammates, reliably, in an open, respectful, flexible, and empathetic manner\nseek out mentoring opportunities specifically to create team redundancy and backfill ability\nmentor an engineer rotating onto an unfamiliar client codebase or stack, accelerating their ramp-up to productive, billable contribution',
    },
    {
      pf: PF_IDS['leadership-pf3'],
      level: 'P5',
      body: 'mentor teammates and members of other teams, as needed\nsustain a mentoring relationship despite utilization/billability pressure — protecting the (typically non-billable) time it takes, rather than letting it lapse whenever chargeable work is tight',
    },
    {
      pf: PF_IDS['leadership-pf3'],
      level: 'P6',
      body: 'mentor across teams\nfoster a culture of mentoring across teams by seeking out mentoring opportunities for themselves and others',
    },
    {
      pf: PF_IDS['leadership-pf3'],
      level: 'P7',
      body: 'mentor across the organization\nfoster an organizational culture of mentoring\nsupport others in their growth as mentors',
    },
    // Strategic Impact PF1 - Business Acumen & Strategy
    {
      pf: PF_IDS['strategic-pf1'],
      level: 'P2',
      body: 'describe how their team\'s domain fits into the client account\'s business and the service LFT provides to it, when asked\nexplain the basic utility of the client\'s product they work on',
    },
    {
      pf: PF_IDS['strategic-pf1'],
      level: 'P3',
      body: 'explain how their team\'s domain contributes to the client account\'s business goals and to LFT\'s overall business strategy\nexplain the organization\'s engineering strategy, when asked\nexplain how their product area of focus fits into the client\'s business, suggesting an improvement to it when relevant\nexplain, at a basic level, whether their engagement is T&M or fixed-bid and what that implies for how they scope and estimate their own work',
    },
    {
      pf: PF_IDS['strategic-pf1'],
      level: 'P4',
      body: 'apply a thorough understanding of their team\'s domain, plus a basic understanding of adjacent teams\' domains, to a real engineering decision\nparticipate in a discussion about what the organization\'s engineering strategy implies for their team\nexplain the business model — including the account\'s contract type (T&M vs. fixed-bid) and its effect on margin and scoping decisions — in relation to their current project focus area\nparticipate in roadmap feedback with the project team, sometimes\nidentify an opportunity to simplify project or technical design\nspot and raise a potential expansion or improvement opportunity within the current client account, even if it isn\'t acted on',
    },
    {
      pf: PF_IDS['strategic-pf1'],
      level: 'P5',
      body: 'connect their team\'s domain, strategy, and market trends to a real decision, including a thorough understanding of adjacent teams\' strategies\ndecide on the team\'s engineering work based on the organization\'s engineering strategy, collaboratively with the team\ncontribute to organizational engineering strategy work, when invited\nevaluate or create a new product feature in collaboration with the client\'s product team, giving a technical recommendation that accounts for the engagement\'s contract economics (scope, margin, utilization impact)\nparticipate regularly in the creation of the team/account roadmap\nsimplify product or technical design through a proactive conversation\nidentify a concrete account-growth opportunity (an expansion of scope, a cross-sell of an adjacent LFT capability, or additional work the client would value) and raise it with their manager or account lead',
    },
    {
      pf: PF_IDS['strategic-pf1'],
      level: 'P6',
      body: 'apply a thorough understanding of several teams\' domains — potentially spanning more than one client account — to a cross-team business decision\nlead a cross-team strategic effort that achieves cross-team alignment on a major goal\nparticipate in a strategic organizational decision or plan\nrecognize a product opportunity or a differentiator relative to alternative approaches or vendors the client is weighing, and act as the client\'s trusted technical advisor in that judgment\nrefine a roadmap across teams based on technical strategy and constraints\nshape an account growth plan — identifying and acting on cross-sell, expansion, or renewal opportunities across one or more client accounts',
    },
    {
      pf: PF_IDS['strategic-pf1'],
      level: 'P7',
      body: 'apply a thorough understanding of the entire business — all domains, client accounts, and their contribution to strategy — to an organization-wide decision\nlead a strategic organizational decision or plan\ninfluence a decision to achieve organization-wide alignment on a major goal\ncreate or redefine a roadmap across the organization with product and business counterparts\ninfluence strategy and account growth across a portfolio of several client accounts, not just one, acting as a strategic advisor clients renew and expand with',
    },
  ];

  for (const std of standards) {
    const stdId = generateStdId(std.pf, std.level);
    await client.query(
      `INSERT INTO standards (id, pf_id, level, body)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (id) DO UPDATE SET
         pf_id = EXCLUDED.pf_id,
         level = EXCLUDED.level,
         body = EXCLUDED.body`,
      [stdId, std.pf, std.level, std.body]
    );
  }
}

async function seedFunctionalAnalyses(client: Client): Promise<void> {
  const analyses = [
    // Delivery PF1 - Incremental Value Delivery
    {
      pf: PF_IDS['delivery-pf1'],
      level: 'P2',
      body: 'Scope, sequence, and adapt work so it ships in small pieces, even when the full picture isn\'t available. P2 practitioners can explain why tasks should be split and work on tasks in priority order.',
    },
    {
      pf: PF_IDS['delivery-pf1'],
      level: 'P3',
      body: 'P3 practitioners can size tasks for incremental delivery with input, note dependencies, and make decisions despite missing information within their scope.',
    },
    {
      pf: PF_IDS['delivery-pf1'],
      level: 'P4',
      body: 'P4 practitioners can resize tasks unaided, correct priority and dependency notes, and make reasonable decisions under incomplete information in both routine and high-pressure situations.',
    },
    {
      pf: PF_IDS['delivery-pf1'],
      level: 'P5',
      body: 'P5 practitioners can break down epics into well-scoped pieces, foster team culture of priority-setting aligned with strategy, and guide teams through uncertain decisions.',
    },
    // Technical Skill PF1 - Quality & Testing
    {
      pf: PF_IDS['technical-pf1'],
      level: 'P2',
      body: 'Write code and tests that hold up under real use — testable, readable, edge-case-aware, and validated at the right layer of the testing pyramid. P2 practitioners write functions with explicit edge-case handling and can write unit tests with guidance.',
    },
    {
      pf: PF_IDS['technical-pf1'],
      level: 'P3',
      body: 'P3 practitioners write unit and higher-level tests unaided, covering edge cases and error paths, and can onboard into a new client codebase\'s test suite within the ramp-up window.',
    },
    {
      pf: PF_IDS['technical-pf1'],
      level: 'P4',
      body: 'P4 practitioners write production-ready, self-documenting code and can design a full test suite spanning multiple testing-pyramid layers for a feature, adapting to the client\'s existing tooling.',
    },
    {
      pf: PF_IDS['technical-pf1'],
      level: 'P5',
      body: 'P5 practitioners recommend testing-pyramid-aligned fixes for gaps surfaced by quality metrics, guiding team improvements.',
    },
    {
      pf: PF_IDS['technical-pf1'],
      level: 'P6',
      body: 'P6 practitioners propose converged testing strategies across several teams\' existing practices.',
    },
    {
      pf: PF_IDS['technical-pf1'],
      level: 'P7',
      body: 'P7 practitioners set an organization-wide testing standard with a mechanism for measuring team adherence.',
    },
    // Technical Skill PF2 - Debugging & Observability
    {
      pf: PF_IDS['technical-pf2'],
      level: 'P2',
      body: 'Diagnose the root cause of defects systematically, and use operational data to understand and improve system health. P2 practitioners can reproduce bugs from tickets and use debuggers or logging tools with guidance.',
    },
    {
      pf: PF_IDS['technical-pf2'],
      level: 'P3',
      body: 'P3 practitioners can debug issues within a single service using systematic methods unaided, explain what normal operational data looks like, and use unfamiliar client logging/monitoring tooling.',
    },
    {
      pf: PF_IDS['technical-pf2'],
      level: 'P4',
      body: 'P4 practitioners can diagnose cross-service issues, propose monitoring changes justified by operational data, and diagnose within client production environments while respecting access restrictions.',
    },
    {
      pf: PF_IDS['technical-pf2'],
      level: 'P5',
      body: 'P5 practitioners can drive team monitoring changes to close stability or performance gaps and diagnose issues across the full scope of their team\'s domain unaided.',
    },
    {
      pf: PF_IDS['technical-pf2'],
      level: 'P6',
      body: 'P6 practitioners can establish observability practices adopted by several teams and diagnose issues spanning related domains across several teams.',
    },
    {
      pf: PF_IDS['technical-pf2'],
      level: 'P7',
      body: 'P7 practitioners lead organization-wide incident response for cross-team outages and foster an observability culture across the engineering organization.',
    },
    // Technical Skill PF3 - Software Design & Architecture
    {
      pf: PF_IDS['technical-pf3'],
      level: 'P2',
      body: 'Fit new code into existing service architecture, and, at senior levels, design that architecture. P2 practitioners can identify which module new logic belongs in and describe how new code fits overall service architecture.',
    },
    {
      pf: PF_IDS['technical-pf3'],
      level: 'P3',
      body: 'P3 practitioners can design function interfaces aligned with existing architectural patterns unaided, explain data flow, and follow an unfamiliar client codebase\'s architectural conventions.',
    },
    {
      pf: PF_IDS['technical-pf3'],
      level: 'P4',
      body: 'P4 practitioners can design code using abstraction and isolation to avoid coupling unrelated concerns, scope complex changes, and deliver designs fitting client-mandated stack constraints.',
    },
    {
      pf: PF_IDS['technical-pf3'],
      level: 'P5',
      body: 'P5 practitioners can architect service components using accepted design patterns and negotiate architectural tradeoffs with client technical stakeholders.',
    },
    {
      pf: PF_IDS['technical-pf3'],
      level: 'P6',
      body: 'P6 practitioners can guide several teams toward shared architectural patterns that support cross-team scaling.',
    },
    {
      pf: PF_IDS['technical-pf3'],
      level: 'P7',
      body: 'P7 practitioners define organization-wide architecture principles covering how bounded contexts interact.',
    },
    // Technical Skill PF4 - Security
    {
      pf: PF_IDS['technical-pf4'],
      level: 'P2',
      body: 'Recognize and act on the security implications of engineering decisions, from naming a concern at the junior level to setting organizational security strategy at the top of the ladder. P2 practitioners can name security implications in plain language and identify client IP or data.',
    },
    {
      pf: PF_IDS['technical-pf4'],
      level: 'P3',
      body: 'P3 practitioners can flag security questions to senior engineers before making unclear decisions and handle client credentials only through approved secrets-management processes.',
    },
    {
      pf: PF_IDS['technical-pf4'],
      level: 'P4',
      body: 'P4 practitioners can identify vulnerabilities in code review citing specific risks, apply security checklists to designs, and identify which contract terms apply to client work.',
    },
    {
      pf: PF_IDS['technical-pf4'],
      level: 'P5',
      body: 'P5 practitioners can refine team security approaches jointly with the security team and define client-engagement-specific security practices.',
    },
    {
      pf: PF_IDS['technical-pf4'],
      level: 'P6',
      body: 'P6 practitioners can apply organizational security strategy consistently across several teams and resolve conflicts between clients\' differing security requirements.',
    },
    {
      pf: PF_IDS['technical-pf4'],
      level: 'P7',
      body: 'P7 practitioners set organization-wide security strategy and identify obscure security threats that standard review or tooling misses.',
    },
    // Technical Skill PF5 - AI-Assisted Engineering
    {
      pf: PF_IDS['technical-pf5'],
      level: 'P2',
      body: 'Use AI coding tools responsibly and effectively as part of daily engineering workflow — tool literacy, prompting discipline, and review habits. P2 practitioners can use AI tools to draft code and review output before committing, and check contractual approval before using tools on client code.',
    },
    {
      pf: PF_IDS['technical-pf5'],
      level: 'P3',
      body: 'P3 practitioners can apply consistent prompting patterns for recurring task types and avoid including client-identifying data/secrets in prompts sent to AI tools.',
    },
    {
      pf: PF_IDS['technical-pf5'],
      level: 'P4',
      body: 'P4 practitioners can integrate AI tooling across the full development lifecycle with disciplined prompting habits and apply different client AI-tool restrictions correctly when moving between engagements.',
    },
    {
      pf: PF_IDS['technical-pf5'],
      level: 'P5',
      body: 'P5 practitioners can establish team-level standards for AI tool use and prompting discipline.',
    },
    {
      pf: PF_IDS['technical-pf5'],
      level: 'P6',
      body: 'P6 practitioners can drive AI workflow adoption and quality across several teams, closing team-level AI practice gaps.',
    },
    {
      pf: PF_IDS['technical-pf5'],
      level: 'P7',
      body: 'P7 practitioners set and govern organizational AI workflow standards, ensuring adoption is measured by outcomes, not usage.',
    },
    // Technical Skill PF6 - AI Judgment & Feature Delivery
    {
      pf: PF_IDS['technical-pf6'],
      level: 'P2',
      body: 'Understand AI failure modes, and build, evaluate, and own AI-powered features responsibly. P2 practitioners can flag uncertain AI-generated suggestions rather than shipping them.',
    },
    {
      pf: PF_IDS['technical-pf6'],
      level: 'P3',
      body: 'P3 practitioners can catch hallucinated API calls or incorrect AI suggestions during self-review before they reach PR.',
    },
    {
      pf: PF_IDS['technical-pf6'],
      level: 'P4',
      body: 'P4 practitioners can ship AI-powered features backed by basic eval suites naming covered and uncovered failure modes, with articulated rollback conditions.',
    },
    {
      pf: PF_IDS['technical-pf6'],
      level: 'P5',
      body: 'P5 practitioners can review teammates\' AI-generated PRs with explicit AI judgment on prompt design and eval coverage.',
    },
    {
      pf: PF_IDS['technical-pf6'],
      level: 'P6',
      body: 'P6 practitioners can address systemic AI risk patterns recurring across several teams, working with team leads on structural fixes.',
    },
    {
      pf: PF_IDS['technical-pf6'],
      level: 'P7',
      body: 'P7 practitioners own organizational AI capability and governance, defining eval-culture standards connected to business outcomes.',
    },
    // Leadership PF1 - Judgment & Organizational Improvement
    {
      pf: PF_IDS['leadership-pf1'],
      level: 'P2',
      body: 'Make and own decisions with awareness of bias, drive alignment to organizational strategy and goals, and improve practices and processes. P2 practitioners can explain how biases affect decision-making and what accountability means.',
    },
    {
      pf: PF_IDS['leadership-pf1'],
      level: 'P3',
      body: 'P3 practitioners can reflect on their own biases when making real decisions, hold themselves accountable, initiate strategy-based conversations, and discuss process improvements with the team.',
    },
    {
      pf: PF_IDS['leadership-pf1'],
      level: 'P4',
      body: 'P4 practitioners can have conversations grounded in organizational strategy to ensure team alignment, ensure continuous goal-work, and regularly discuss process improvements.',
    },
    {
      pf: PF_IDS['leadership-pf1'],
      level: 'P5',
      body: 'P5 practitioners can raise awareness of bias impacts within their team, take ownership of team decisions, foster strategy-grounded alignment culture, and collaborate on organizational practice improvements.',
    },
    {
      pf: PF_IDS['leadership-pf1'],
      level: 'P6',
      body: 'P6 practitioners can take ownership of cross-team decisions, ensure accountability across teams, foster alignment culture across teams, and drive cross-team process improvements.',
    },
    {
      pf: PF_IDS['leadership-pf1'],
      level: 'P7',
      body: 'P7 practitioners can take ownership of organization-wide decisions, ensure accountability across the organization, foster alignment culture organization-wide, and take ownership of organizational practices and their improvement.',
    },
    // Leadership PF2 - Facilitation
    {
      pf: PF_IDS['leadership-pf2'],
      level: 'P4',
      body: 'Facilitate discussions so that everyone is heard, outcomes tie to goals, and — at senior levels — cross-team and organization-wide discussions converge on decisions with buy-in. P4 practitioners can facilitate team discussions ensuring balanced participation and goal-tied outcomes, including client stakeholder discussions.',
    },
    {
      pf: PF_IDS['leadership-pf2'],
      level: 'P5',
      body: 'P5 practitioners facilitate discussions with the same standards as P4, demonstrating breadth and consistency rather than new behavioral expectations.',
    },
    {
      pf: PF_IDS['leadership-pf2'],
      level: 'P6',
      body: 'P6 practitioners can facilitate discussions across teams ensuring relevant parties are included, guide discussions toward decisions with buy-in, and navigate LFT-client stakeholder disagreements.',
    },
    {
      pf: PF_IDS['leadership-pf2'],
      level: 'P7',
      body: 'P7 practitioners can facilitate organization-wide discussions and discussions spanning multiple client accounts, applying the same principles at the largest scope.',
    },
    // Leadership PF3 - Mentoring
    {
      pf: PF_IDS['leadership-pf3'],
      level: 'P2',
      body: 'Seek out mentorship for one\'s own growth, and mentor others — widening in scope from teammates to the whole organization. P2 practitioners can seek out mentorship to grow their own experience.',
    },
    {
      pf: PF_IDS['leadership-pf3'],
      level: 'P3',
      body: 'P3 practitioners can mentor teammates sometimes in an open, respectful, flexible, and empathetic manner.',
    },
    {
      pf: PF_IDS['leadership-pf3'],
      level: 'P4',
      body: 'P4 practitioners can mentor teammates reliably, seek mentoring opportunities for team redundancy, and mentor engineers onboarding to unfamiliar client codebases.',
    },
    {
      pf: PF_IDS['leadership-pf3'],
      level: 'P5',
      body: 'P5 practitioners can mentor teammates and members of other teams as needed, and sustain mentoring relationships despite utilization pressure.',
    },
    {
      pf: PF_IDS['leadership-pf3'],
      level: 'P6',
      body: 'P6 practitioners can mentor across teams and foster a culture of mentoring across teams.',
    },
    {
      pf: PF_IDS['leadership-pf3'],
      level: 'P7',
      body: 'P7 practitioners can mentor across the organization, foster organizational mentoring culture, and support others in their growth as mentors.',
    },
    // Strategic Impact PF1 - Business Acumen & Strategy
    {
      pf: PF_IDS['strategic-pf1'],
      level: 'P2',
      body: 'Understand the business and market context of engineering work, participate in and eventually shape engineering strategy, and apply product judgment to roadmap decisions. P2 practitioners can describe how their domain fits the client account\'s business and explain the basic utility of the client\'s product.',
    },
    {
      pf: PF_IDS['strategic-pf1'],
      level: 'P3',
      body: 'P3 practitioners can explain how their domain contributes to client business goals and LFT strategy, explain organizational engineering strategy, suggest product improvements, and understand basic contract economics.',
    },
    {
      pf: PF_IDS['strategic-pf1'],
      level: 'P4',
      body: 'P4 practitioners can apply domain understanding to real decisions, participate in strategy discussions, explain contract economics impacts, participate in roadmap feedback, and spot expansion opportunities.',
    },
    {
      pf: PF_IDS['strategic-pf1'],
      level: 'P5',
      body: 'P5 practitioners can connect domain, strategy, and market trends to real decisions, decide team engineering work based on strategy, contribute to org strategy work, shape product features with technical recommendations, and actively surface account-growth opportunities.',
    },
    {
      pf: PF_IDS['strategic-pf1'],
      level: 'P6',
      body: 'P6 practitioners can apply cross-team domain understanding to business decisions, lead cross-team strategic efforts, participate in strategic org decisions, recognize product opportunities relative to competitors, refine cross-team roadmaps, and shape account growth plans.',
    },
    {
      pf: PF_IDS['strategic-pf1'],
      level: 'P7',
      body: 'P7 practitioners can apply organization-wide business understanding to decisions, lead strategic org decisions, influence org-wide alignment on major goals, redefine organization-wide roadmaps, and influence strategy and growth across a portfolio of client accounts.',
    },
  ];

  for (const analysis of analyses) {
    const analysisId = generateFaId(analysis.pf, analysis.level);
    await client.query(
      `INSERT INTO functional_analyses (id, pf_id, level, body)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (id) DO UPDATE SET
         pf_id = EXCLUDED.pf_id,
         level = EXCLUDED.level,
         body = EXCLUDED.body`,
      [analysisId, analysis.pf, analysis.level, analysis.body]
    );
  }
}

async function seedBadges(client: Client): Promise<void> {
  const badges = [
    // Delivery badges
    {
      id: generateBadgeId('DL-1-P2'),
      pf: PF_IDS['delivery-pf1'],
      level: 'P2',
      name: 'Split-Reasoning Starter',
      evidence: { instruments: ['rubric'], verifier: 'P4+', summary: 'Explains why tasks should be split and follows team priority order' },
    },
    {
      id: generateBadgeId('DL-1-P3'),
      pf: PF_IDS['delivery-pf1'],
      level: 'P3',
      name: 'Dependency-Aware Sizer',
      evidence: { instruments: ['rubric'], verifier: 'P4+', summary: 'Sizes tasks, flags dependencies, and documents ambiguous decisions' },
    },
    {
      id: generateBadgeId('DL-1-P4'),
      pf: PF_IDS['delivery-pf1'],
      level: 'P4',
      name: 'Unaided Resizer',
      evidence: { instruments: ['live_demo'], verifier: 'P5+', summary: 'Resizes mis-scoped tasks unaided under high pressure' },
    },
    {
      id: generateBadgeId('DL-2-P2'),
      pf: PF_IDS['delivery-pf2'],
      level: 'P2',
      name: 'Daily Progress Reporter',
      evidence: { instruments: ['rubric'], verifier: 'P4+', summary: 'Reports progress daily, delivers with urgency, seeks cost/value guidance' },
    },
    // FCC badges
    {
      id: generateBadgeId('FCC-1-P2'),
      pf: PF_IDS['feedback-pf1'],
      level: 'P2',
      name: 'Feedback Literacy',
      evidence: { instruments: ['rubric'], verifier: 'P4+', summary: 'Explains feedback and seeks it from teammates' },
    },
    {
      id: generateBadgeId('FCC-2-P2'),
      pf: PF_IDS['feedback-pf2'],
      level: 'P2',
      name: 'Audience-Aware Communicator',
      evidence: { instruments: ['rubric'], verifier: 'P4+', summary: 'Communicates clearly and concisely in audience-oriented manner' },
    },
    // Leadership badges
    {
      id: generateBadgeId('LEAD-1-P2'),
      pf: PF_IDS['leadership-pf1'],
      level: 'P2',
      name: 'Bias & Accountability Namer',
      evidence: { instruments: ['rubric'], verifier: 'P4+', summary: 'Explains biases and accountability in decision-making' },
    },
    {
      id: generateBadgeId('LEAD-2-P4'),
      pf: PF_IDS['leadership-pf2'],
      level: 'P4',
      name: 'Balanced-Room Facilitator',
      evidence: { instruments: ['live_demo'], verifier: 'P5+', summary: 'Facilitates discussions with balanced participation and goal-tied outcomes' },
    },
    // Strategic Impact badges
    {
      id: generateBadgeId('SI-1-P2'),
      pf: PF_IDS['strategic-pf1'],
      level: 'P2',
      name: 'Client Context Narrator',
      evidence: { instruments: ['rubric'], verifier: 'P4+', summary: 'Describes client domain and product utility' },
    },
    // Technical Skill badges
    {
      id: generateBadgeId('TS-1-P2'),
      pf: PF_IDS['technical-pf1'],
      level: 'P2',
      name: 'Edge-Case Guardian',
      evidence: { instruments: ['code_review'], verifier: 'P4+', summary: 'Writes functions with explicit edge-case handling' },
    },
    {
      id: generateBadgeId('TS-2-P2'),
      pf: PF_IDS['technical-pf2'],
      level: 'P2',
      name: 'First Reproducer',
      evidence: { instruments: ['rubric'], verifier: 'P4+', summary: 'Reproduces bugs from tickets before fixing' },
    },
  ];

  for (const badge of badges) {
    await client.query(
      `INSERT INTO badges (id, pf_id, level, name, evidence_required)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id) DO UPDATE SET
         pf_id = EXCLUDED.pf_id,
         level = EXCLUDED.level,
         name = EXCLUDED.name,
         evidence_required = EXCLUDED.evidence_required`,
      [badge.id, badge.pf, badge.level, badge.name, JSON.stringify(badge.evidence)]
    );
  }
}

async function seedTrainingUnits(client: Client): Promise<void> {
  const trainingUnits = [
    // Delivery
    {
      competency: COMPETENCY_IDS.delivery,
      type: 'learning_path' as const,
      level: 'P2',
      sequence: 1,
      content: 'Delivery learning path: P2-P7 progression for Incremental Value Delivery and Self-Organization. Prerequisites: at least one real assigned task, access to backlog/ticket tools, familiarity with LFT engineering matrix Section 2.',
    },
    {
      competency: COMPETENCY_IDS.delivery,
      type: 'concept_notes' as const,
      level: 'P2',
      sequence: 2,
      content: '12 sections covering Required Knowledge items: 1) Incremental delivery principles 2) Task/epic sizing heuristics 3) Dependency mapping 4) Decision-making under uncertainty 5) Risk categorization 6) Organizational strategy alignment 7) Preventative process design 8) Commitment reliability principles 9) Escalation vs anticipation 10) Cost/value tradeoff frameworks 11) Stakeholder expectation-setting 12) Roadmap management at scale',
    },
    // Feedback
    {
      competency: COMPETENCY_IDS.feedback,
      type: 'learning_path' as const,
      level: 'P2',
      sequence: 1,
      content: 'Feedback, Communication & Collaboration learning path: P2-P7 progression across Feedback, Communication, and Collaboration. Prerequisites: familiarity with LFT engineering matrix Section 3, some real team interaction experience.',
    },
    {
      competency: COMPETENCY_IDS.feedback,
      type: 'concept_notes' as const,
      level: 'P2',
      sequence: 2,
      content: '13 sections covering Required Knowledge: 1) Feedback delivery and reception 2) Clarity and audience awareness in communication 3) Listening and nonverbal communication 4) Documentation principles 5) Client relationship communication 6) Teamwork and helping patterns 7) Relationship building foundations 8) Handling disagreement productively 9) Psychological safety in feedback 10) Knowledge sharing culture 11) Cross-team collaboration mechanics 12) Communication across timezones 13) Culture-building mechanics',
    },
    // Leadership
    {
      competency: COMPETENCY_IDS.leadership,
      type: 'learning_path' as const,
      level: 'P2',
      sequence: 1,
      content: 'Leadership learning path: P2-P7 progression across Judgment & Organizational Improvement, Facilitation, and Mentoring. Prerequisites: real decision-making experience, familiarity with team dynamics.',
    },
    {
      competency: COMPETENCY_IDS.leadership,
      type: 'concept_notes' as const,
      level: 'P2',
      sequence: 2,
      content: 'Leadership concept notes covering: 1) Cognitive bias literacy 2) Accountability frameworks 3) Organizational strategy literacy 4) Change management and process improvement 5) Goal-setting and OKR mechanics 6) Culture-building mechanics 7) Client-constrained improvement navigation 8) Meeting facilitation techniques 9) Group decision-making methods 10) Mentoring vs managing distinction 11) Psychological safety in mentoring 12) Succession and redundancy planning 13) Rapid context-transfer mentoring',
    },
    // Strategic Impact
    {
      competency: COMPETENCY_IDS.strategic,
      type: 'learning_path' as const,
      level: 'P2',
      sequence: 1,
      content: 'Strategic Impact learning path: P2-P7 progression for Business Acumen & Strategy. Covers client business model understanding, contract economics awareness, engineering strategy participation, and product thinking.',
    },
    {
      competency: COMPETENCY_IDS.strategic,
      type: 'concept_notes' as const,
      level: 'P2',
      sequence: 2,
      content: 'Strategic Impact concept notes: 1) Client business model literacy 2) Contract-economics literacy (T&M vs fixed-bid) 3) Company and engineering strategy literacy 4) Market and competitive awareness 5) Product management fundamentals 6) Account growth and farming awareness 7) Organizational influence without formal authority 8) Strategic communication and technical-to-business translation',
    },
    // Technical Skill
    {
      competency: COMPETENCY_IDS.technical,
      type: 'learning_path' as const,
      level: 'P2',
      sequence: 1,
      content: 'Technical Skill learning path: P2-P7 progression across Quality & Testing, Debugging & Observability, Software Design & Architecture, Security, AI-Assisted Engineering, and AI Judgment & Feature Delivery.',
    },
    {
      competency: COMPETENCY_IDS.technical,
      type: 'concept_notes' as const,
      level: 'P2',
      sequence: 2,
      content: 'Technical Skill concept notes: 1) Testing pyramid principles 2) Test isolation and determinism 3) Coverage vs quality 4) Readability/testability tradeoffs 5) Documentation-as-code principles 6) Quality metrics interpretation 7) Organizational testing strategy tradeoffs 8) Client-context onboarding 9) Test data handling for client environments 10) Systematic debugging methods 11) Observability and monitoring 12) Architectural patterns and design principles 13) Security vulnerability recognition 14) AI tool literacy and prompting 15) AI failure modes and eval design',
    },
  ];

  for (const unit of trainingUnits) {
    const id = generateTrainingId(
      unit.competency,
      unit.type,
      unit.sequence
    );
    await client.query(
      `INSERT INTO training_units (id, competency_id, type, level, sequence_order, content, prereqs)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (id) DO UPDATE SET
         competency_id = EXCLUDED.competency_id,
         type = EXCLUDED.type,
         level = EXCLUDED.level,
         sequence_order = EXCLUDED.sequence_order,
         content = EXCLUDED.content,
         prereqs = EXCLUDED.prereqs`,
      [
        id,
        unit.competency,
        unit.type,
        unit.level,
        unit.sequence,
        unit.content,
        JSON.stringify([]),
      ]
    );
  }
}

// Main execution
if (require.main === module) {
  const connectionString =
    process.env.DATABASE_URL ||
    'postgresql://localhost:5432/ladder';

  seedContent(connectionString)
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}
