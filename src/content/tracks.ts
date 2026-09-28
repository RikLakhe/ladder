import type { Track, Domain } from '@/lib/types'

// ─── Universal domain constants (shared across all tracks) ───────────────────

const DELIVERY_DOMAIN: Domain = {
  id: 'delivery',
  name: 'Delivery',
  description: 'Planning, estimating, and delivering work reliably.',
  comingSoon: false,
  competencies: [
    {
      id: 'project-planning',
      name: 'Project Planning',
      description: 'Breaking down work into tasks, estimating effort, and tracking progress.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Completes assigned tasks with guidance and updates status when asked.',
          criteria: [
            { id: 'shared/delivery/project-planning/p2/0', text: 'Breaks personal tasks into sub-tasks with help from a senior.' },
            { id: 'shared/delivery/project-planning/p2/1', text: 'Provides status updates when prompted by the team lead.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Plans and tracks own work independently, flags blockers early.',
          criteria: [
            { id: 'shared/delivery/project-planning/p3/0', text: 'Creates task breakdowns and estimates for personal work items.' },
            { id: 'shared/delivery/project-planning/p3/1', text: 'Proactively communicates blockers before they impact delivery.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Plans work for a small team, identifies dependencies, and manages scope.',
          criteria: [
            { id: 'shared/delivery/project-planning/p4/0', text: 'Owns project plans for features involving 2–4 engineers.' },
            { id: 'shared/delivery/project-planning/p4/1', text: 'Identifies cross-team dependencies and mitigates scheduling risks.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Drives quarterly planning for a team, balancing technical debt and new work.',
          criteria: [
            { id: 'shared/delivery/project-planning/p5/0', text: 'Leads sprint and quarterly planning ceremonies for the team.' },
            { id: 'shared/delivery/project-planning/p5/1', text: 'Balances feature delivery against tech-debt reduction in plans.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Plans multi-team initiatives, aligns roadmaps across groups.',
          criteria: [
            { id: 'shared/delivery/project-planning/p6/0', text: 'Creates and maintains roadmaps spanning multiple teams.' },
            { id: 'shared/delivery/project-planning/p6/1', text: 'Resolves conflicts between team priorities at the organisational level.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Defines organisational delivery standards and long-horizon plans.',
          criteria: [
            { id: 'shared/delivery/project-planning/p7/0', text: 'Sets planning methodology and tooling standards across all teams.' },
            { id: 'shared/delivery/project-planning/p7/1', text: 'Authors 12–18 month technical roadmaps aligned to company strategy.' },
          ],
        },
      ],
    },
    {
      id: 'stakeholder-communication',
      name: 'Stakeholder Communication',
      description: 'Keeping stakeholders informed and managing expectations effectively.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Shares updates within the immediate team when asked.',
          criteria: [
            { id: 'shared/delivery/stakeholder-communication/p2/0', text: 'Posts daily stand-up updates accurately and on time.' },
            { id: 'shared/delivery/stakeholder-communication/p2/1', text: 'Escalates questions to the team lead rather than making assumptions.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Communicates status proactively to the team and immediate stakeholders.',
          criteria: [
            { id: 'shared/delivery/stakeholder-communication/p3/0', text: 'Sends clear progress updates to stakeholders without being asked.' },
            { id: 'shared/delivery/stakeholder-communication/p3/1', text: 'Adjusts communication style for technical vs. non-technical audiences.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Manages expectations for a feature team, handles scope-change conversations.',
          criteria: [
            { id: 'shared/delivery/stakeholder-communication/p4/0', text: 'Leads regular status calls with product and design counterparts.' },
            { id: 'shared/delivery/stakeholder-communication/p4/1', text: 'Negotiates scope changes with stakeholders when delivery risks arise.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Communicates program-level status to senior leadership clearly.',
          criteria: [
            { id: 'shared/delivery/stakeholder-communication/p5/0', text: 'Presents delivery status and risks to VP-level stakeholders.' },
            { id: 'shared/delivery/stakeholder-communication/p5/1', text: 'Crafts narratives that connect technical work to business outcomes.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Drives executive communication strategy for large initiatives.',
          criteria: [
            { id: 'shared/delivery/stakeholder-communication/p6/0', text: 'Owns communication plans for company-wide technical initiatives.' },
            { id: 'shared/delivery/stakeholder-communication/p6/1', text: 'Coaches senior engineers on executive communication skills.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Represents engineering at board or external stakeholder level.',
          criteria: [
            { id: 'shared/delivery/stakeholder-communication/p7/0', text: 'Communicates engineering strategy to investors and external partners.' },
            { id: 'shared/delivery/stakeholder-communication/p7/1', text: 'Establishes organisation-wide stakeholder communication standards.' },
          ],
        },
      ],
    },
  ],
}

const LEADERSHIP_DOMAIN: Domain = {
  id: 'leadership',
  name: 'Leadership',
  description: 'Decision-making, mentoring, and influencing team outcomes.',
  comingSoon: false,
  competencies: [
    {
      id: 'decision-making',
      name: 'Decision Making',
      description: 'Making sound technical and product decisions with appropriate information.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Makes decisions within a clearly defined scope with guidance.',
          criteria: [
            { id: 'shared/leadership/decision-making/p2/0', text: 'Chooses between predefined options using provided criteria.' },
            { id: 'shared/leadership/decision-making/p2/1', text: 'Seeks clarification before proceeding when requirements are ambiguous.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Makes independent decisions on day-to-day implementation choices.',
          criteria: [
            { id: 'shared/leadership/decision-making/p3/0', text: 'Selects appropriate data structures and algorithms without prompting.' },
            { id: 'shared/leadership/decision-making/p3/1', text: 'Documents the rationale for non-obvious implementation decisions.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Drives technical decisions for a feature, weighing trade-offs explicitly.',
          criteria: [
            { id: 'shared/leadership/decision-making/p4/0', text: 'Authors decision records (ADRs) for significant technical choices.' },
            { id: 'shared/leadership/decision-making/p4/1', text: 'Facilitates trade-off discussions and gains team alignment.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Makes architectural decisions for a system, accounting for long-term impact.',
          criteria: [
            { id: 'shared/leadership/decision-making/p5/0', text: 'Evaluates build vs. buy decisions with cost-benefit analysis.' },
            { id: 'shared/leadership/decision-making/p5/1', text: 'Identifies second-order consequences of major technical choices.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Establishes decision-making frameworks used across multiple teams.',
          criteria: [
            { id: 'shared/leadership/decision-making/p6/0', text: 'Defines when to escalate decisions and who owns each category.' },
            { id: 'shared/leadership/decision-making/p6/1', text: 'Reviews and approves decisions with org-wide architectural impact.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Makes company-defining technical bets with long-horizon vision.',
          criteria: [
            { id: 'shared/leadership/decision-making/p7/0', text: 'Champions multi-year platform investments to the executive team.' },
            { id: 'shared/leadership/decision-making/p7/1', text: 'Establishes governance for technology strategy decisions.' },
          ],
        },
      ],
    },
    {
      id: 'mentoring',
      name: 'Mentoring',
      description: 'Growing the skills and confidence of teammates through feedback and support.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Learns from others and pairs effectively with senior engineers.',
          criteria: [
            { id: 'shared/leadership/mentoring/p2/0', text: 'Actively seeks feedback on own work and applies it visibly.' },
            { id: 'shared/leadership/mentoring/p2/1', text: 'Pairs productively with senior engineers, asking focused questions.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Helps onboard new team members and gives constructive code-review feedback.',
          criteria: [
            { id: 'shared/leadership/mentoring/p3/0', text: 'Provides specific, actionable feedback in code reviews.' },
            { id: 'shared/leadership/mentoring/p3/1', text: 'Helps new joiners navigate the codebase and team processes.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Actively mentors one or two junior engineers, tracking their growth.',
          criteria: [
            { id: 'shared/leadership/mentoring/p4/0', text: 'Holds regular 1:1s with mentees focused on growth goals.' },
            { id: 'shared/leadership/mentoring/p4/1', text: 'Delegates stretch assignments calibrated to mentee skill level.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Mentors across the team, raising the overall technical bar.',
          criteria: [
            { id: 'shared/leadership/mentoring/p5/0', text: 'Runs internal learning sessions or tech talks for the team.' },
            { id: 'shared/leadership/mentoring/p5/1', text: 'Creates onboarding materials used by multiple new hires.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Develops senior engineers into tech leads and future managers.',
          criteria: [
            { id: 'shared/leadership/mentoring/p6/0', text: 'Sponsors high-potential engineers for stretch leadership roles.' },
            { id: 'shared/leadership/mentoring/p6/1', text: 'Coaches senior engineers on influence, communication, and strategy.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Shapes the engineering culture and mentoring culture of the organisation.',
          criteria: [
            { id: 'shared/leadership/mentoring/p7/0', text: 'Designs engineering career development programmes at org scale.' },
            { id: 'shared/leadership/mentoring/p7/1', text: 'Publicly represents Leapfrog as a technical thought leader externally.' },
          ],
        },
      ],
    },
  ],
}

const FCC_DOMAIN: Domain = {
  id: 'fcc',
  name: 'Foundations of Craft & Communication',
  description: 'Written, verbal, and visual communication as a technical practitioner.',
  comingSoon: false,
  competencies: [
    {
      id: 'written-communication',
      name: 'Written Communication',
      description: 'Writing clearly and precisely for technical and non-technical audiences.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Writes clear commit messages and basic documentation with guidance.',
          criteria: [
            { id: 'shared/fcc/written-communication/p2/0', text: 'Writes commit messages that describe what changed and why.' },
            { id: 'shared/fcc/written-communication/p2/1', text: 'Documents setup steps accurately in README files.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Writes clear PR descriptions, technical notes, and inline comments independently.',
          criteria: [
            { id: 'shared/fcc/written-communication/p3/0', text: 'PR descriptions summarise changes, rationale, and testing steps.' },
            { id: 'shared/fcc/written-communication/p3/1', text: 'Inline comments explain non-obvious logic without over-documenting.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Writes RFCs, design docs, and post-mortems that colleagues act on.',
          criteria: [
            { id: 'shared/fcc/written-communication/p4/0', text: 'Authors design documents that are unambiguous and actionable.' },
            { id: 'shared/fcc/written-communication/p4/1', text: 'Writes post-mortems that identify root causes without blame.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Produces organisation-level documents that set direction for multiple teams.',
          criteria: [
            { id: 'shared/fcc/written-communication/p5/0', text: 'Writes strategy documents adopted by leadership.' },
            { id: 'shared/fcc/written-communication/p5/1', text: 'Edits and raises the quality of writing across the team.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Defines documentation standards and writing culture for engineering.',
          criteria: [
            { id: 'shared/fcc/written-communication/p6/0', text: 'Establishes writing style guides and templates used org-wide.' },
            { id: 'shared/fcc/written-communication/p6/1', text: 'Reviews and approves high-stakes external technical communications.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Writes or co-authors material that shapes industry thinking.',
          criteria: [
            { id: 'shared/fcc/written-communication/p7/0', text: 'Publishes technical content (articles, papers) representing Leapfrog.' },
            { id: 'shared/fcc/written-communication/p7/1', text: 'Influences product and company narrative through written output.' },
          ],
        },
      ],
    },
    {
      id: 'documentation',
      name: 'Documentation',
      description: 'Creating and maintaining technical documentation that enables others.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Keeps personal notes and task documentation up to date.',
          criteria: [
            { id: 'shared/fcc/documentation/p2/0', text: 'Updates tickets with findings and decisions made during work.' },
            { id: 'shared/fcc/documentation/p2/1', text: 'Follows existing documentation templates without skipping sections.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Documents APIs, services, and runbooks for the immediate team.',
          criteria: [
            { id: 'shared/fcc/documentation/p3/0', text: 'Writes API documentation covering parameters, responses, and errors.' },
            { id: 'shared/fcc/documentation/p3/1', text: 'Creates runbooks used by on-call engineers to resolve incidents.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Owns documentation for a domain, keeps it current through product changes.',
          criteria: [
            { id: 'shared/fcc/documentation/p4/0', text: 'Reviews documentation as part of every feature launch checklist.' },
            { id: 'shared/fcc/documentation/p4/1', text: 'Identifies and removes outdated documentation proactively.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Designs the documentation system for a team or product area.',
          criteria: [
            { id: 'shared/fcc/documentation/p5/0', text: 'Defines documentation taxonomy and ownership rules for the team.' },
            { id: 'shared/fcc/documentation/p5/1', text: 'Introduces tooling that reduces the friction of keeping docs current.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Sets documentation standards and practices across engineering.',
          criteria: [
            { id: 'shared/fcc/documentation/p6/0', text: 'Drives adoption of documentation-as-code practices org-wide.' },
            { id: 'shared/fcc/documentation/p6/1', text: 'Audits documentation quality across teams and coaches improvements.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Shapes how the organisation shares knowledge internally and externally.',
          criteria: [
            { id: 'shared/fcc/documentation/p7/0', text: 'Champions open-source or public documentation as a company asset.' },
            { id: 'shared/fcc/documentation/p7/1', text: 'Defines the knowledge-management strategy for all of engineering.' },
          ],
        },
      ],
    },
  ],
}

const STRATEGIC_IMPACT_DOMAIN: Domain = {
  id: 'strategic-impact',
  name: 'Strategic Impact',
  description: 'Contributing to the direction and health of the business beyond immediate tasks.',
  comingSoon: false,
  competencies: [
    {
      id: 'business-acumen',
      name: 'Business Acumen',
      description: 'Understanding how technical decisions create or destroy business value.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Understands the purpose of the product being built.',
          criteria: [
            { id: 'shared/strategic-impact/business-acumen/p2/0', text: 'Can explain what problem the product solves for its users.' },
            { id: 'shared/strategic-impact/business-acumen/p2/1', text: 'Connects personal tasks to user-facing outcomes.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Understands business priorities and factors them into technical choices.',
          criteria: [
            { id: 'shared/strategic-impact/business-acumen/p3/0', text: 'Considers time-to-market when choosing implementation approaches.' },
            { id: 'shared/strategic-impact/business-acumen/p3/1', text: 'Raises trade-offs between quality and speed proactively.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Actively participates in product prioritisation and scoping discussions.',
          criteria: [
            { id: 'shared/strategic-impact/business-acumen/p4/0', text: 'Challenges requirements that don\'t align with user needs or strategy.' },
            { id: 'shared/strategic-impact/business-acumen/p4/1', text: 'Estimates cost of technical debt in business terms.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Influences product direction with technical insights and market awareness.',
          criteria: [
            { id: 'shared/strategic-impact/business-acumen/p5/0', text: 'Proposes features or pivots backed by technical feasibility analysis.' },
            { id: 'shared/strategic-impact/business-acumen/p5/1', text: 'Translates competitor technical analysis into actionable recommendations.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Shapes company strategy by bridging technology and business opportunities.',
          criteria: [
            { id: 'shared/strategic-impact/business-acumen/p6/0', text: 'Identifies new revenue opportunities enabled by technical capabilities.' },
            { id: 'shared/strategic-impact/business-acumen/p6/1', text: 'Presents investment cases for platform initiatives to executives.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Drives the company\'s technology strategy at the executive and board level.',
          criteria: [
            { id: 'shared/strategic-impact/business-acumen/p7/0', text: 'Owns the multi-year technology investment plan for the company.' },
            { id: 'shared/strategic-impact/business-acumen/p7/1', text: 'Advises on M&A and partnership decisions from a technology perspective.' },
          ],
        },
      ],
    },
    {
      id: 'cross-team-influence',
      name: 'Cross-Team Influence',
      description: 'Creating positive impact beyond your immediate team.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Works effectively within the immediate team without causing friction.',
          criteria: [
            { id: 'shared/strategic-impact/cross-team-influence/p2/0', text: 'Completes work in a way that doesn\'t block teammates.' },
            { id: 'shared/strategic-impact/cross-team-influence/p2/1', text: 'Shares useful findings in team channels proactively.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Contributes to shared codebases and standards used by other teams.',
          criteria: [
            { id: 'shared/strategic-impact/cross-team-influence/p3/0', text: 'Submits improvements to shared libraries with clear documentation.' },
            { id: 'shared/strategic-impact/cross-team-influence/p3/1', text: 'Participates constructively in cross-team code reviews.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Drives adoption of practices or tools across multiple teams.',
          criteria: [
            { id: 'shared/strategic-impact/cross-team-influence/p4/0', text: 'Proposes and pilots new tools that other teams voluntarily adopt.' },
            { id: 'shared/strategic-impact/cross-team-influence/p4/1', text: 'Runs working groups that produce outcomes used org-wide.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Recognised across the organisation as a go-to expert.',
          criteria: [
            { id: 'shared/strategic-impact/cross-team-influence/p5/0', text: 'Consulted by other teams before major technical decisions.' },
            { id: 'shared/strategic-impact/cross-team-influence/p5/1', text: 'Drives alignment between teams on shared technical standards.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Shapes the technical culture and direction across all engineering teams.',
          criteria: [
            { id: 'shared/strategic-impact/cross-team-influence/p6/0', text: 'Introduces initiatives that measurably improve engineering culture.' },
            { id: 'shared/strategic-impact/cross-team-influence/p6/1', text: 'Builds coalitions to drive complex cross-organisational changes.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Influences the industry and external community, not just the organisation.',
          criteria: [
            { id: 'shared/strategic-impact/cross-team-influence/p7/0', text: 'Speaks at conferences or contributes to open source as a Leapfrog representative.' },
            { id: 'shared/strategic-impact/cross-team-influence/p7/1', text: 'Attracts talent and partnerships through external technical reputation.' },
          ],
        },
      ],
    },
  ],
}

// ─── Dev-specific: technical-skill domain ─────────────────────────────────────

const DEV_TECHNICAL_SKILL_DOMAIN: Domain = {
  id: 'technical-skill',
  name: 'Technical Skills',
  description: 'Core engineering competencies specific to software development.',
  comingSoon: false,
  competencies: [
    {
      id: 'writing-code',
      name: 'Writing Code',
      description: 'Producing clear, correct, and maintainable code.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Writes code that works for known inputs following team conventions.',
          criteria: [
            { id: 'dev/technical-skill/writing-code/p2/0', text: 'Follows naming conventions and style guide without reminders.' },
            { id: 'dev/technical-skill/writing-code/p2/1', text: 'Handles the happy path and obvious error cases in implementations.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Writes clean, idiomatic code that handles edge cases and is easy to review.',
          criteria: [
            { id: 'dev/technical-skill/writing-code/p3/0', text: 'Code passes review without significant structural comments.' },
            { id: 'dev/technical-skill/writing-code/p3/1', text: 'Handles edge cases and validates inputs at system boundaries.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Produces code that is a positive example for the team — clear, tested, and extensible.',
          criteria: [
            { id: 'dev/technical-skill/writing-code/p4/0', text: 'Code is cited positively in team discussions as a reference example.' },
            { id: 'dev/technical-skill/writing-code/p4/1', text: 'Designs public interfaces that are stable across multiple consumers.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Raises the team\'s code quality through review, tooling, and pairing.',
          criteria: [
            { id: 'dev/technical-skill/writing-code/p5/0', text: 'Introduces linting or static-analysis rules that prevent recurrent bugs.' },
            { id: 'dev/technical-skill/writing-code/p5/1', text: 'Code reviews improve overall team output measurably.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Sets coding standards adopted across multiple teams.',
          criteria: [
            { id: 'dev/technical-skill/writing-code/p6/0', text: 'Authors style guides and coding standards used by all engineering teams.' },
            { id: 'dev/technical-skill/writing-code/p6/1', text: 'Introduces abstractions that eliminate entire classes of bugs org-wide.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Defines the engineering craft bar for the organisation.',
          criteria: [
            { id: 'dev/technical-skill/writing-code/p7/0', text: 'Code quality philosophy shapes hiring bar and promotion criteria.' },
            { id: 'dev/technical-skill/writing-code/p7/1', text: 'Contributes open-source libraries used beyond Leapfrog.' },
          ],
        },
      ],
    },
    {
      id: 'testing',
      name: 'Testing',
      description: 'Writing tests that give confidence in correctness and prevent regressions.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Writes basic unit tests for assigned code with guidance.',
          criteria: [
            { id: 'dev/technical-skill/testing/p2/0', text: 'Writes unit tests for pure functions covering happy path.' },
            { id: 'dev/technical-skill/testing/p2/1', text: 'Runs existing tests before submitting a PR.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Tests own code thoroughly, including edge cases and integration points.',
          criteria: [
            { id: 'dev/technical-skill/testing/p3/0', text: 'Test coverage includes boundary conditions and error paths.' },
            { id: 'dev/technical-skill/testing/p3/1', text: 'Writes integration tests for interactions between modules.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Owns test strategy for a feature and coaches teammates on testing.',
          criteria: [
            { id: 'dev/technical-skill/testing/p4/0', text: 'Defines what to unit-test vs. integration-test vs. E2E-test for a feature.' },
            { id: 'dev/technical-skill/testing/p4/1', text: 'Introduces test patterns that teammates adopt and reuse.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Designs the team\'s testing infrastructure and advocates for test culture.',
          criteria: [
            { id: 'dev/technical-skill/testing/p5/0', text: 'Builds shared test utilities and factories used across the codebase.' },
            { id: 'dev/technical-skill/testing/p5/1', text: 'Defines and enforces coverage and test quality standards for the team.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Sets testing standards and tooling choices across multiple teams.',
          criteria: [
            { id: 'dev/technical-skill/testing/p6/0', text: 'Chooses and champions test frameworks and CI pipelines for all teams.' },
            { id: 'dev/technical-skill/testing/p6/1', text: 'Establishes quality gates that prevent regressions at merge time.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Defines the organisation\'s quality philosophy and testing culture.',
          criteria: [
            { id: 'dev/technical-skill/testing/p7/0', text: 'Publishes or champions testing methodologies adopted industry-wide.' },
            { id: 'dev/technical-skill/testing/p7/1', text: 'Shapes hiring criteria to include testing as a first-class competency.' },
          ],
        },
      ],
    },
    {
      id: 'debugging',
      name: 'Debugging',
      description: 'Systematically locating and fixing defects in code and systems.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Fixes bugs in familiar code with guidance on approach.',
          criteria: [
            { id: 'dev/technical-skill/debugging/p2/0', text: 'Uses a debugger or print statements to trace code flow.' },
            { id: 'dev/technical-skill/debugging/p2/1', text: 'Asks for help after a reasonable independent attempt.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Debugs own and teammates\' code independently using systematic techniques.',
          criteria: [
            { id: 'dev/technical-skill/debugging/p3/0', text: 'Bisects failures to isolate root cause before attempting a fix.' },
            { id: 'dev/technical-skill/debugging/p3/1', text: 'Reads stack traces and logs to identify failure location.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Diagnoses complex bugs across multiple services or layers.',
          criteria: [
            { id: 'dev/technical-skill/debugging/p4/0', text: 'Traces a bug across service boundaries using distributed tracing.' },
            { id: 'dev/technical-skill/debugging/p4/1', text: 'Reproduces intermittent failures reliably before fixing.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Leads incident response and root-cause analysis for production outages.',
          criteria: [
            { id: 'dev/technical-skill/debugging/p5/0', text: 'Coordinates debugging efforts across teams during high-severity incidents.' },
            { id: 'dev/technical-skill/debugging/p5/1', text: 'Produces post-mortems that eliminate entire categories of future bugs.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Diagnoses systemic issues at platform or infrastructure level.',
          criteria: [
            { id: 'dev/technical-skill/debugging/p6/0', text: 'Identifies and fixes root causes of recurring incident patterns.' },
            { id: 'dev/technical-skill/debugging/p6/1', text: 'Introduces tooling that makes diagnosis faster for all engineers.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Resolves critical issues that affect the entire organisation\'s reliability.',
          criteria: [
            { id: 'dev/technical-skill/debugging/p7/0', text: 'Leads war-room resolution of company-wide production incidents.' },
            { id: 'dev/technical-skill/debugging/p7/1', text: 'Implements systemic reliability improvements after major failures.' },
          ],
        },
      ],
    },
    {
      id: 'observability',
      name: 'Observability',
      description: 'Instrumenting systems so failures can be detected, diagnosed, and resolved quickly.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Adds basic logging to code following team conventions.',
          criteria: [
            { id: 'dev/technical-skill/observability/p2/0', text: 'Adds structured log statements at key code paths.' },
            { id: 'dev/technical-skill/observability/p2/1', text: 'Reads existing dashboards to verify own features behave correctly.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Instruments new features with logs, metrics, and traces.',
          criteria: [
            { id: 'dev/technical-skill/observability/p3/0', text: 'Emits metrics for latency, error rate, and throughput on new endpoints.' },
            { id: 'dev/technical-skill/observability/p3/1', text: 'Adds distributed traces that span service calls.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Designs observability for a feature or service end-to-end.',
          criteria: [
            { id: 'dev/technical-skill/observability/p4/0', text: 'Creates dashboards and alerts for a service\'s SLOs.' },
            { id: 'dev/technical-skill/observability/p4/1', text: 'Defines what to measure before building a new feature.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Leads observability practice for a team, establishing standards.',
          criteria: [
            { id: 'dev/technical-skill/observability/p5/0', text: 'Defines team-wide logging, metrics, and alerting conventions.' },
            { id: 'dev/technical-skill/observability/p5/1', text: 'Reduces mean time to detect (MTTD) for the team measurably.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Shapes the observability platform and strategy for the organisation.',
          criteria: [
            { id: 'dev/technical-skill/observability/p6/0', text: 'Selects and owns the observability stack for all engineering teams.' },
            { id: 'dev/technical-skill/observability/p6/1', text: 'Drives SLO culture across product and engineering.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Sets company-wide reliability engineering direction.',
          criteria: [
            { id: 'dev/technical-skill/observability/p7/0', text: 'Defines error budget policies and reliability targets at company level.' },
            { id: 'dev/technical-skill/observability/p7/1', text: 'Champions observability investment to leadership and customers.' },
          ],
        },
      ],
    },
    {
      id: 'understanding-code',
      name: 'Understanding Code',
      description: 'Reading, navigating, and comprehending unfamiliar codebases effectively.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Understands and modifies code in familiar areas with guidance.',
          criteria: [
            { id: 'dev/technical-skill/understanding-code/p2/0', text: 'Traces code flow through functions to understand existing behaviour.' },
            { id: 'dev/technical-skill/understanding-code/p2/1', text: 'Uses IDE tooling (go-to-definition, search) to navigate the codebase.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Reads and understands unfamiliar code across the team\'s codebase.',
          criteria: [
            { id: 'dev/technical-skill/understanding-code/p3/0', text: 'Can explain the purpose of any module in the team\'s codebase.' },
            { id: 'dev/technical-skill/understanding-code/p3/1', text: 'Identifies code smells and suggests improvements in review.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Quickly understands large or legacy codebases and identifies improvement areas.',
          criteria: [
            { id: 'dev/technical-skill/understanding-code/p4/0', text: 'Maps unfamiliar system architecture from code within hours.' },
            { id: 'dev/technical-skill/understanding-code/p4/1', text: 'Identifies refactoring opportunities that reduce future comprehension cost.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Guides others in understanding complex systems through documentation and pairing.',
          criteria: [
            { id: 'dev/technical-skill/understanding-code/p5/0', text: 'Creates architecture guides that help new engineers ramp up faster.' },
            { id: 'dev/technical-skill/understanding-code/p5/1', text: 'Leads codebase archaeology sessions to surface implicit knowledge.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Maintains organisational understanding of all major system boundaries.',
          criteria: [
            { id: 'dev/technical-skill/understanding-code/p6/0', text: 'Owns the system map and architecture diagrams for all services.' },
            { id: 'dev/technical-skill/understanding-code/p6/1', text: 'Ensures no system becomes a black box by championing documentation.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Ensures the organisation never loses understanding of its own systems.',
          criteria: [
            { id: 'dev/technical-skill/understanding-code/p7/0', text: 'Defines policies preventing undocumented systems from reaching production.' },
            { id: 'dev/technical-skill/understanding-code/p7/1', text: 'Drives initiatives to modernise or sunset legacy systems strategically.' },
          ],
        },
      ],
    },
    {
      id: 'software-architecture',
      name: 'Software Architecture',
      description: 'Designing systems that are scalable, maintainable, and fit for purpose.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Understands the architecture of the assigned service and follows its patterns.',
          criteria: [
            { id: 'dev/technical-skill/software-architecture/p2/0', text: 'Follows existing architectural patterns without introducing inconsistencies.' },
            { id: 'dev/technical-skill/software-architecture/p2/1', text: 'Can describe the data flow of the assigned service.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Designs modules and components within an existing architecture.',
          criteria: [
            { id: 'dev/technical-skill/software-architecture/p3/0', text: 'Designs internal module boundaries that are easy to test and replace.' },
            { id: 'dev/technical-skill/software-architecture/p3/1', text: 'Recognises when a chosen approach conflicts with existing patterns.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Designs full services or subsystems with appropriate trade-offs.',
          criteria: [
            { id: 'dev/technical-skill/software-architecture/p4/0', text: 'Designs service APIs that are versioned, backward-compatible, and documented.' },
            { id: 'dev/technical-skill/software-architecture/p4/1', text: 'Authors architecture decision records for significant design choices.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Designs system architecture for a product area, balancing long-term concerns.',
          criteria: [
            { id: 'dev/technical-skill/software-architecture/p5/0', text: 'Designs for horizontal scalability and failure isolation.' },
            { id: 'dev/technical-skill/software-architecture/p5/1', text: 'Leads architectural review of designs proposed by other engineers.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Defines platform-level architecture shared across multiple product areas.',
          criteria: [
            { id: 'dev/technical-skill/software-architecture/p6/0', text: 'Designs shared platforms (data, auth, event bus) used by all teams.' },
            { id: 'dev/technical-skill/software-architecture/p6/1', text: 'Enforces architectural standards through review processes and tooling.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Sets the company\'s long-term architectural vision and investment strategy.',
          criteria: [
            { id: 'dev/technical-skill/software-architecture/p7/0', text: 'Defines the target architecture for a 3-5 year technology horizon.' },
            { id: 'dev/technical-skill/software-architecture/p7/1', text: 'Leads evaluation of paradigm shifts (cloud-native, event-driven, AI-native).' },
          ],
        },
      ],
    },
    {
      id: 'security',
      name: 'Security',
      description: 'Building systems that protect user data and resist attack.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Follows security guidelines and avoids introducing known vulnerabilities.',
          criteria: [
            { id: 'dev/technical-skill/security/p2/0', text: 'Avoids committing secrets or credentials to version control.' },
            { id: 'dev/technical-skill/security/p2/1', text: 'Follows team checklists for OWASP top-10 issues when applicable.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Actively considers security in design and review.',
          criteria: [
            { id: 'dev/technical-skill/security/p3/0', text: 'Validates and sanitises all inputs at system boundaries.' },
            { id: 'dev/technical-skill/security/p3/1', text: 'Raises security concerns during code review without prompting.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Conducts threat modelling for features and identifies mitigations.',
          criteria: [
            { id: 'dev/technical-skill/security/p4/0', text: 'Performs threat modelling for new features before implementation.' },
            { id: 'dev/technical-skill/security/p4/1', text: 'Implements authentication and authorisation patterns correctly.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Leads security practices for the team, including review and tooling.',
          criteria: [
            { id: 'dev/technical-skill/security/p5/0', text: 'Integrates SAST and dependency scanning into team CI pipelines.' },
            { id: 'dev/technical-skill/security/p5/1', text: 'Runs security-focused code review training for the team.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Owns the security posture of a platform or set of systems.',
          criteria: [
            { id: 'dev/technical-skill/security/p6/0', text: 'Defines security requirements and controls for platform services.' },
            { id: 'dev/technical-skill/security/p6/1', text: 'Coordinates response to security vulnerabilities across all teams.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Sets security strategy and culture for the entire organisation.',
          criteria: [
            { id: 'dev/technical-skill/security/p7/0', text: 'Defines security-by-design standards applied from day one of all projects.' },
            { id: 'dev/technical-skill/security/p7/1', text: 'Engages external auditors and shapes the security roadmap.' },
          ],
        },
      ],
    },
    {
      id: 'ai-assisted-engineering',
      name: 'AI-Assisted Engineering',
      description: 'Using AI tools effectively to accelerate development without sacrificing quality.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Uses AI coding assistants to accelerate routine tasks with supervision.',
          criteria: [
            { id: 'dev/technical-skill/ai-assisted-engineering/p2/0', text: 'Uses AI code completion to speed up boilerplate writing.' },
            { id: 'dev/technical-skill/ai-assisted-engineering/p2/1', text: 'Verifies AI-generated code before committing it.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Integrates AI tools into personal workflow and critically evaluates output.',
          criteria: [
            { id: 'dev/technical-skill/ai-assisted-engineering/p3/0', text: 'Uses AI for code generation, test writing, and debugging assistance.' },
            { id: 'dev/technical-skill/ai-assisted-engineering/p3/1', text: 'Identifies and corrects hallucinations or errors in AI-generated code.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Maximises team productivity through effective AI tool usage and sharing.',
          criteria: [
            { id: 'dev/technical-skill/ai-assisted-engineering/p4/0', text: 'Shares effective prompting techniques and workflows with teammates.' },
            { id: 'dev/technical-skill/ai-assisted-engineering/p4/1', text: 'Evaluates and adopts new AI tooling as it becomes available.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Leads AI tool adoption for the team, measuring productivity impact.',
          criteria: [
            { id: 'dev/technical-skill/ai-assisted-engineering/p5/0', text: 'Runs experiments measuring AI-assisted vs. baseline velocity for the team.' },
            { id: 'dev/technical-skill/ai-assisted-engineering/p5/1', text: 'Defines guardrails for safe AI-assisted development (review gates, etc.).' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Shapes AI engineering strategy for the organisation.',
          criteria: [
            { id: 'dev/technical-skill/ai-assisted-engineering/p6/0', text: 'Selects and governs AI coding tools used across all engineering teams.' },
            { id: 'dev/technical-skill/ai-assisted-engineering/p6/1', text: 'Defines policies for data privacy and IP in AI-assisted workflows.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Defines how AI changes the nature of software engineering at Leapfrog.',
          criteria: [
            { id: 'dev/technical-skill/ai-assisted-engineering/p7/0', text: 'Articulates the company\'s AI-native engineering vision to clients and industry.' },
            { id: 'dev/technical-skill/ai-assisted-engineering/p7/1', text: 'Adjusts hiring and career frameworks as AI reshapes engineering roles.' },
          ],
        },
      ],
    },
    {
      id: 'ai-judgment-feature-delivery',
      name: 'AI Judgment in Feature Delivery',
      description: 'Deciding when and how to apply AI capabilities within product features.',
      levels: [
        {
          level: 'p2',
          descriptor: 'Implements AI feature components following a defined specification.',
          criteria: [
            { id: 'dev/technical-skill/ai-judgment-feature-delivery/p2/0', text: 'Integrates a specified AI API endpoint correctly with error handling.' },
            { id: 'dev/technical-skill/ai-judgment-feature-delivery/p2/1', text: 'Handles AI response variability gracefully in the UI.' },
          ],
        },
        {
          level: 'p3',
          descriptor: 'Evaluates whether AI is the right solution for a given feature requirement.',
          criteria: [
            { id: 'dev/technical-skill/ai-judgment-feature-delivery/p3/0', text: 'Identifies cases where deterministic logic outperforms AI for a use case.' },
            { id: 'dev/technical-skill/ai-judgment-feature-delivery/p3/1', text: 'Designs prompts and evaluates output quality before shipping.' },
          ],
        },
        {
          level: 'p4',
          descriptor: 'Owns AI feature design including fallback, evaluation, and cost trade-offs.',
          criteria: [
            { id: 'dev/technical-skill/ai-judgment-feature-delivery/p4/0', text: 'Designs fallback behaviour when AI output is unavailable or low-quality.' },
            { id: 'dev/technical-skill/ai-judgment-feature-delivery/p4/1', text: 'Builds evaluation pipelines to measure AI feature quality over time.' },
          ],
        },
        {
          level: 'p5',
          descriptor: 'Defines AI feature strategy for a product, including model selection.',
          criteria: [
            { id: 'dev/technical-skill/ai-judgment-feature-delivery/p5/0', text: 'Selects models appropriate for latency, cost, and quality requirements.' },
            { id: 'dev/technical-skill/ai-judgment-feature-delivery/p5/1', text: 'Establishes human-review processes for high-stakes AI outputs.' },
          ],
        },
        {
          level: 'p6',
          descriptor: 'Sets AI product principles and governance across the organisation.',
          criteria: [
            { id: 'dev/technical-skill/ai-judgment-feature-delivery/p6/0', text: 'Defines responsible AI principles applied to all product features.' },
            { id: 'dev/technical-skill/ai-judgment-feature-delivery/p6/1', text: 'Reviews and approves AI features with significant user-impact.' },
          ],
        },
        {
          level: 'p7',
          descriptor: 'Shapes the company\'s AI product philosophy and competitive positioning.',
          criteria: [
            { id: 'dev/technical-skill/ai-judgment-feature-delivery/p7/0', text: 'Defines where AI is a differentiator vs. commodity for the business.' },
            { id: 'dev/technical-skill/ai-judgment-feature-delivery/p7/1', text: 'Advises clients on responsible and effective AI feature strategy.' },
          ],
        },
      ],
    },
  ],
}

// ─── Tracks ──────────────────────────────────────────────────────────────────

export const tracks: Track[] = [
  {
    id: 'dev',
    name: 'Engineering',
    description: 'Software engineers who design, build, and maintain Leapfrog products and platforms.',
    domains: [
      DELIVERY_DOMAIN,
      LEADERSHIP_DOMAIN,
      FCC_DOMAIN,
      STRATEGIC_IMPACT_DOMAIN,
      DEV_TECHNICAL_SKILL_DOMAIN,
    ],
  },
  {
    id: 'qa',
    name: 'Quality Assurance',
    description: 'QA engineers who define quality standards and ensure products meet them.',
    domains: [
      DELIVERY_DOMAIN,
      LEADERSHIP_DOMAIN,
      FCC_DOMAIN,
      STRATEGIC_IMPACT_DOMAIN,
      {
        id: 'technical-skill',
        name: 'Technical Skills',
        description: 'QA-specific technical competencies — coming soon.',
        comingSoon: true,
        competencies: [],
      },
    ],
  },
  {
    id: 'data',
    name: 'Data',
    description: 'Data engineers and analysts who build data pipelines and surface insights.',
    domains: [
      DELIVERY_DOMAIN,
      LEADERSHIP_DOMAIN,
      FCC_DOMAIN,
      STRATEGIC_IMPACT_DOMAIN,
      {
        id: 'technical-skill',
        name: 'Technical Skills',
        description: 'Data-specific technical competencies — coming soon.',
        comingSoon: true,
        competencies: [],
      },
    ],
  },
  {
    id: 'ai',
    name: 'AI',
    description: 'AI engineers and researchers who design and deliver machine learning solutions.',
    domains: [
      DELIVERY_DOMAIN,
      LEADERSHIP_DOMAIN,
      FCC_DOMAIN,
      STRATEGIC_IMPACT_DOMAIN,
      {
        id: 'technical-skill',
        name: 'Technical Skills',
        description: 'AI-specific technical competencies — coming soon.',
        comingSoon: true,
        competencies: [],
      },
    ],
  },
]
