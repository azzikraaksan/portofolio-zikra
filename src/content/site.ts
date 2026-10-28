// All page content. Sources: CV (October 2026) and porto-zikra-1.vercel.app.
// Images: put each file in /public at the exact path below. Until a file exists, the <Shot>
// component shows an empty block that names the path it expects.

export const profile = {
  name: "Azzikra Ramadhanti Aksan",
  short: "Zikra",
  role: "Full Stack Developer",
  city: "Yogyakarta, Indonesia",
  now: "Freelance at PT Javan Cipta Solusi",
  email: "azzikraaksan@gmail.com",
  linkedin: "https://www.linkedin.com/in/azzikraaksan",
  github: "https://github.com/azzikraaksan",
  cv: "/cv-zikra.pdf",
};

// Hero photos crossfade slowly inside the arch frame. Tall portrait, at least 920 × 1580 px.
export const heroPhotos = [
  { src: "/images/hero/zikra-1.jpeg", alt: "Portrait of Zikra" },
  { src: "/images/hero/zikra-2.jpeg", alt: "Zikra working at a laptop" },
  { src: "/images/hero/zikra-3.jpeg", alt: "Zikra in her workspace" },
];

export const avatar = { src: "/images/about/zikra-avatar.jpeg", alt: "Profile photo of Zikra" };

// A case is one feature or problem solved inside a project.
export type Case = {
  slug: string;
  name: string;
  title: string;
  kind: string;
  repo: string;
  summary: string;
  problem: string;
  solution: string[];
  decision: string;
  result: string;
  stack: string[];
  image: { src: string; alt: string };
};

// A project is one card in the carousel and one detail page. Only AlurKerja has cases.
// problem, decision, and result are optional: a section is shown only when it has content.
export type Project = {
  slug: string;
  name: string;
  title: string;
  kind: string;
  repo?: string;
  summary: string;
  problem?: string;
  solution: string[];
  decision?: string;
  result?: string;
  stack: string[];
  image: { src: string; alt: string };
  cases?: Case[];
};

// The cases inside AlurKerja. Screenshots 16:10, at least 1600 × 1000 px.
export const alurkerjaCases: Case[] = [
  {
    slug: "schema-builder",
    name: "Schema Builder",
    title: "Dynamic database tables for every tenant",
    kind: "Platform & data",
    repo: "report-service, studio-react",
    summary:
      "Tenants can create and change their own database tables from the interface, without an engineer's help.",
    problem:
      "Dynamic DDL is risky: a type change can corrupt data, table names can collide, and everything has to stay isolated per tenant.",
    solution: [
      "Support for varchar(N) with safe type transitions.",
      "A fix for reusing the name of a table that was already deleted.",
      "A table-references endpoint, and database tables as a data source for questions.",
      "A complete column interface: add, rename, change type, set required, and delete.",
      "Deleting a table must be confirmed by typing its name.",
      "A read-only data tab behind a feature flag.",
    ],
    decision:
      "The tenant schema repository was refactored to lower its cognitive complexity until it passed the SonarQube quality gate.",
    result:
      "Tenants model their own data with safeguards against destructive changes, and the new code passes the quality gate.",
    stack: ["React.js & Next.js", "TypeScript", "Laravel & Go"],
    image: { src: "/images/alurkerja/cs-schema-builder.png", alt: "AlurKerja Schema Builder with a list of table columns" },
  },
  {
    slug: "master-data",
    name: "Master Data",
    title: "Data integrity enforced at the database level",
    kind: "Platform & data",
    repo: "bpm-service, studio-react, app-react-1",
    summary:
      "Master data tables with dynamic columns that stay fast to search and stay unique, plus bulk upload and file columns.",
    problem:
      "The schema is not fixed, yet uniqueness and search still have to be correct and fast.",
    solution: [
      "Indexes on searchable and unique columns; uniqueness is enforced by the database.",
      "SQL table definitions are parsed into column metadata.",
      "Bulk upload keyed by column name or slug, plus per-column filters.",
      "Upload and download endpoints for files, with a two-step flow for file-type columns.",
      "The record being edited is excluded from the uniqueness check.",
    ],
    decision:
      "Data integrity does not depend on client-side validation; the database is what rejects duplicates.",
    result:
      "Bulk import and file attachments became core features, with upload results reported per row: what succeeded and what failed.",
    stack: ["Laravel & Go", "TypeScript", "React.js & Next.js"],
    image: { src: "/images/alurkerja/cs-master-data1.png", alt: "Master data table with a bulk upload dialog and per-row results" },
  },
  {
    slug: "agen-ai-mcp",
    name: "AI Agents & MCP",
    title: "An AI agent integration layer: MCP tools and an AI gateway",
    kind: "Integration",
    repo: "integration-service, bpm-service, helpdesk",
    summary:
      "AlurKerja's core features can be operated by AI agents through a standard protocol, within role boundaries and without locking into a single LLM vendor.",
    problem:
      "AI agents have to work safely across environments, respect role boundaries, and not depend on a single model provider.",
    solution: [
      "Dozens of MCP tools: metrics and KPIs, dashboards, master data (read and write), instance history, attachments, variable search, activity logs, and external pages.",
      "A TEST/LIVE environment selector on the tasklist tool.",
      "Admin-only tools in the helpdesk to see all tickets and read any requestor's ticket.",
      "The Merapi AI gateway as the default, with a fallback to OpenAI.",
    ],
    decision:
      "The AI gateway got a fallback so the platform does not stop when one model provider has problems.",
    result:
      "Every core feature is reachable through a standard protocol, and dependence on a single AI vendor is reduced.",
    stack: ["Laravel & Go", "TypeScript", "PostgreSQL & MySQL"],
    image: { src: "/images/alurkerja/cs-ai-agent.png", alt: "AlurKerja MCP tool list and AI gateway settings" },
  },
  {
    slug: "isolasi-tenant",
    name: "Tenant isolation",
    title: "Multi-tenant isolation and RBAC, end to end",
    kind: "Security",
    repo: "cross-repo",
    summary:
      "Closing the small gaps where data can leak between tenants: slugs, headers, and route guards.",
    problem:
      "Data leaks between tenants rarely come through the front door. They come through small details, and a single gap is enough.",
    solution: [
      "Master data slugs are now unique per tenant, not global.",
      "Workspace creation is limited to superadmins in SaaS mode.",
      "The member role is blocked from Studio and Company Profile with a 403 and a redirect.",
      "A per-user limit on starting processes.",
      "An x-active-tenant header fallback on avatar upload.",
      "The master data select uses the tenant ID, not the slug.",
    ],
    decision:
      "Tenant and role boundaries are enforced on the backend and the frontend together, because data leakage is the most expensive class of bug in a SaaS product.",
    result:
      "Tenant and role boundaries are now enforced on both sides, and this class of data-leak bug is closed.",
    stack: ["PostgreSQL & MySQL", "Laravel & Go", "TypeScript", "React.js & Next.js"],
    image: { src: "/images/alurkerja/cs-multi-tenant.png", alt: "403 page for the member role and AlurKerja role settings" },
  },
  {
    slug: "race-condition",
    name: "Race condition",
    title: "Preventing stale state when switching workspaces",
    kind: "Frontend",
    repo: "app-react-1",
    summary:
      "When a user switches workspaces quickly, an old response can overwrite the new screen. Tenant A's data shows up in tenant B.",
    problem:
      "A response from an earlier request arrives late and overwrites the latest state. From the client's side, this is a data leak.",
    solution: [
      "A guard on the fetch effect so stale responses are ignored.",
      "Old workspace data is cleared after switching workspaces.",
      "The old task's form and state are reset when switching tasks.",
      "Sidebar and home loading states are synchronized while the workspace initializes.",
    ],
    decision:
      "The problem is handled on the client: a guard on fetch and a state reset when the tenant changes, so the order in which responses arrive no longer decides what the screen shows.",
    result:
      "The UI is deterministically consistent during fast navigation, and this hard-to-reproduce class of bug is gone.",
    stack: ["React.js & Next.js", "TypeScript"],
    image: { src: "/images/alurkerja/cs-race-condition.png", alt: "DevTools Network tab with an old request marked canceled" },
  },
  {
    slug: "aksi-massal",
    name: "Bulk actions",
    title: "Bulk claim and bulk complete for hundreds of tasks",
    kind: "Workflow UX",
    repo: "app-react-1",
    summary:
      "Operators process many tasks at once, with accurate selection and filters that also decide what select-all picks.",
    problem:
      "Bulk operations on hundreds of tasks risk being inconsistent: some can fail, and select-all has to respect the filters.",
    solution: [
      "Bulk claim on group tasks.",
      "Fixes to the filters and select-all behavior in bulk complete.",
      "The bulk complete form stays readable in dark mode.",
      "Filtering by variable in My Requests.",
      "Fields are rendered from the form schema when the variable type is null.",
      "The panel closes automatically after a claim.",
    ],
    decision:
      "Select-all follows the filtered results, not the whole list, so what gets processed matches what is visible.",
    result:
      "Operators process many tasks at once with more dependable results, and repetitive manual work shrinks.",
    stack: ["React.js & Next.js", "TypeScript", "Testing & code quality"],
    image: { src: "/images/alurkerja/cs-bulk-operations.png", alt: "Task list with select-all and the bulk complete dialog" },
  },
  {
    slug: "lane-sync",
    name: "Lane Sync",
    title: "A wizard that syncs SOPs with the org structure",
    kind: "Workflow UX",
    repo: "studio-react",
    summary:
      "Lanes in a BPMN diagram are mapped to roles in the org structure through a four-step wizard: Scope, Scan, Review, and Apply.",
    problem:
      "The process has several steps and writes data, while nested lanes make the mapping ambiguous.",
    solution: [
      "A step-by-step wizard dialog: Scope, Scan, Review, Apply.",
      "A results screen and markers in the org structure.",
      "Lanes are matched by name in Drive, then the lane's role info is shown.",
    ],
    decision:
      "The innermost lane takes priority in findLaneByFlowNode, and the feature sits behind a feature flag with a test that makes sure the flag is off by default.",
    result:
      "SOPs and the org structure stay in sync without manual edits, and mapping nested lanes became accurate.",
    stack: ["React.js & Next.js", "TypeScript"],
    image: { src: "/images/alurkerja/cs-lane-sync.png", alt: "Lane Sync wizard on the Review step" },
  },
];

// Projects shown in the carousel. Images: screenshots 16:10, at least 1600 × 1000 px.
export const projects: Project[] = [
  {
    slug: "alurkerja",
    name: "AlurKerja",
    title: "A business process automation platform for enterprise workflows",
    kind: "SaaS platform",
    repo: "cross-repo",
    summary:
      "Business process modeling, approval automation, and large-scale task queues in a single multi-tenant workspace. I work on the frontend and the platform as a full stack developer.",
    problem:
      "Every tenant has to stay isolated at every layer, while new features keep landing in modules that are already running in production.",
    solution: [
      "Tenant data isolation at three layers: client state, API contract, and database schema.",
      "Strict RBAC with 403 responses for roles that have no access.",
      "A no-code Schema Builder and a Master Data Engine with bulk upload.",
      "A fix for race conditions during fast navigation between workspaces.",
      "UI migration to shadcn/ui across 10+ modules behind feature flags.",
      "Bulk task actions, Lane Sync between SOPs and the org structure, and AI agent integration through MCP.",
    ],
    decision:
      "Security is treated as a property of the system, not a feature: tenant boundaries are enforced at every layer, not in just one place.",
    result:
      "3 layers of data isolation, 10+ modules migrated with zero downtime, and 0 stale-state incidents since the fix.",
    stack: ["React.js & Next.js", "TypeScript", "Laravel & Go", "PostgreSQL & MySQL", "shadcn/ui", "BPMN"],
    image: { src: "/images/alurkerja/cover1.png", alt: "AlurKerja main dashboard" },
    cases: alurkerjaCases,
  },
  {
    slug: "mavoka",
    name: "Mavoka",
    title: "Authentication, a REST API, and analytics dashboards for a job and training platform",
    kind: "Internship project",
    summary:
      "A platform for managing users, job vacancies, internship applications, and training programs. I built its authentication, its database schema and REST API, and its analytics dashboard.",
    solution: [
      "Authentication and authorization for 4 user roles using JWT, middleware, and email OTP to secure access and account recovery.",
      "A database schema and a Laravel REST API for managing users, job vacancies, internship applications, and training programs.",
      "An analytics dashboard in Next.js for 5 user roles, showing registration statistics, reports, and account verification status.",
      "Job vacancy and training management features, profile settings, and reusable interface components that support several user portals.",
      "Better maintainability: build errors fixed, routing simplified, and thousands of lines of unused code removed to get the app ready for deployment.",
    ],
    stack: ["Next.js", "Laravel", "JWT & email OTP", "REST API"],
    image: { src: "/images/projects/mavoka.png", alt: "Mavoka analytics dashboard" },
  },
  {
    slug: "jeep-booking-app",
    name: "Jeep Booking App",
    title: "An operations interface for a tourist jeep community",
    kind: "Academic project",
    summary:
      "As the frontend developer on the PPSI project, I designed, built, and implemented the user interface for the operational system of a tourist jeep community, and handled the complex interactions inside it.",
    solution: [
      "Automatic scheduling generated from booking data.",
      "Dynamic driver status management: on track or available.",
      "Ticket printing.",
      "CRUD for community members and jeep vehicles.",
      "Interactive, responsive screens in React.js and Next.js, with data flowing between components through API integration.",
      "Screens kept consistent with the agreed design, using intuitive logic and visuals to improve the UX.",
      "Page structure, state management, and real-time multi-endpoint integration, in a system that demanded critical thinking and fast adaptation.",
    ],
    stack: ["React.js", "Next.js"],
    image: { src: "/images/projects/jeep-booking1.png", alt: "Jeep Booking App schedule screen" },
  },
  {
    slug: "spendly",
    name: "Spendly",
    title: "A personal finance tracker",
    kind: "Side project",
    summary:
      "A personal finance tracking app that helps users manage income and expenses, monitor their balance, and categorize transactions. It includes search, filters, and local data storage to make everyday money management easier.",
    solution: [
      "Recording income and expenses.",
      "Balance monitoring.",
      "Transaction categories.",
      "Search and filters.",
      "Local data storage.",
    ],
    stack: [],
    image: { src: "/images/projects/spendly.png", alt: "Spendly transaction list" },
  },
  {
    slug: "helpdesk-mini",
    name: "Helpdesk Mini",
    title: "A small help-ticket manager",
    kind: "Side project",
    summary:
      "A help-ticket management app that makes it easy for users to log, manage, and track the resolution of issues. It provides a ticket status dashboard, priority settings, search, and filters so ticket handling is more organized.",
    solution: [
      "Logging and managing help tickets.",
      "A ticket status dashboard.",
      "Priority settings.",
      "Search and filters.",
    ],
    stack: [],
    image: { src: "/images/projects/helpdesk-mini.png", alt: "Helpdesk Mini ticket dashboard" },
  },
];
// Four highlights shown beside the AlurKerja cover in "Currently building".
export const alurkerjaHighlights: { name: string; text: string }[] = [
  { name: "Master Data", text: "Bulk upload, file upload, and data validation." },
  { name: "Schema Builder", text: "Tables and columns managed dynamically." },
  { name: "Micro Frontend", text: "React apps embedded into BPMS forms." },
  { name: "Code Quality & Testing", text: "Unit testing, code reviews, and SonarQube driven code improvements." },
];

export type Dot = "ok" | "wait";

// The short list on the right side of the hero.
export const building: { name: string; note: string; dot: Dot; href: string }[] = [
  { name: "AlurKerja", note: "Currently building · Full stack", dot: "ok", href: "/projects/alurkerja" },
  { name: "Mavoka", note: "Internship project", dot: "wait", href: "/projects/mavoka" },
  { name: "Jeep Booking App", note: "Frontend contribution · Academic", dot: "wait", href: "/projects/jeep-booking-app" },
  { name: "Side Projects", note: "Spendly · Helpdesk Mini", dot: "wait", href: "/projects/spendly" },
];

// Numbers taken from the CV.
export const stats = [
  { value: "10+", label: "full stack features in React + Go" },
  { value: "100+", label: "support tickets resolved" },
  { value: "3.96", label: "GPA out of 4.00" },
];

// Skills and technologies, in three groups. Each group is one card in the skills section.
export const skillGroups = [
  {
    key: "frontend",
    title: "Frontend",
    tagline: "Lightweight interfaces",
    items: ["React.js", "Next.js", "Vue.js", "TypeScript", "JavaScript", "Tailwind CSS", "Bootstrap", "shadcn/ui", "Semantic UI"],
    tone: "night",
  },
  {
    key: "backend",
    title: "Backend",
    tagline: "Secure APIs",
    items: ["Go", "Laravel", "PHP", "REST API", "PostgreSQL", "MySQL", "RBAC", "JWT & email OTP"],
    tone: "beige",
  },
  {
    key: "kualitas",
    title: "Quality & tools",
    tagline: "Don't break what already works",
    items: ["Vitest", "Go test", "SonarQube", "Feature flags", "Git", "GitLab", "GitHub"],
    tone: "pink",
  },
] as const;

export const path = [
  { when: "Apr - Jun 2025", title: "Jeep Booking App", text: "Frontend developer on a academic project: set up the project's initial configuration and built its scheduling, driver status, ticketing, and CRUD features." },
  { when: "Jun - Aug 2025", title: "Fitinline", text: "Full stack intern: Next.js on the frontend and Laravel on the backend, with authentication, a REST API, and a dashboard." },
  { when: "Aug - Dec 2025", title: "PT Javan Cipta Solusi", text: "Full stack intern on AlurKerja: fixed bugs and built 10+ pages in the Company Profile module." },
  { when: "Jan - Nov 2026", title: "PT Javan Cipta Solusi", text: "Freelance full stack on AlurKerja: shipped 10+ full stack features and handled 100+ support tickets." },
];

export const laptopScreens = [
  { src: "/images/alurkerja/cover1.png", alt: "AlurKerja main dashboard" },
  { src: "/images/alurkerja/cs-schema-builder.png", alt: "AlurKerja Schema Builder" },
  { src: "/images/alurkerja/cs-master-data1.png", alt: "AlurKerja Master Data" },
];

export type CvItem = { label: string; value: string };
export type CvGroup = { name: string; period: string; items: CvItem[] };

export const experience: CvGroup[] = [
  {
    name: "PT Javan Cipta Solusi",
    period: "Freelance full stack developer, Jan 2026 to present",
    items: [
      { label: "Full stack features in React + Go", value: "10+" },
      { label: "Support tickets per week", value: "10–20" },
      { label: "Per-tenant Schema Builder", value: "FE + BE" },
      { label: "Master Data bulk upload", value: "Go" },
      { label: "RBAC and limits on starting processes", value: "SonarQube" },
    ],
  },
  {
    name: "PT Javan Cipta Solusi",
    period: "Full stack developer intern, Aug–Dec 2025",
    items: [
      { label: "Company Profile pages", value: "10+" },
      { label: "Bugs fixed", value: "20+" },
      { label: "Laravel interface rebuilt in React", value: "React" },
      { label: "Micro Frontend for OSS BKPM", value: "MFE" },
    ],
  },
  {
    name: "Fitinline",
    period: "Full stack developer intern, Jun–Aug 2025",
    items: [
      { label: "Roles with JWT and email OTP", value: "4" },
      { label: "Roles in the Next.js dashboard", value: "5" },
      { label: "REST API and database schema", value: "Laravel" },
      { label: "Unused code removed", value: "1,000s of lines" },
    ],
  },
  {
    name: "Universitas Jenderal Achmad Yani",
    period: "B.Sc. Information Systems, Yogyakarta, 2022–2026",
    items: [
      { label: "Cumulative GPA", value: "3.96" },
      { label: "General Secretary, BEM FTTI", value: "2024" },
      { label: "Deputy General Secretary, BEM FTTI", value: "2023" },
    ],
  },
];

export const skills: { kind: string; names: string[] }[] = [
  { kind: "Languages", names: ["JavaScript", "TypeScript", "PHP", "Go"] },
  { kind: "Frontend", names: ["React.js", "Next.js", "Vue.js", "Tailwind CSS", "Bootstrap", "shadcn/ui", "Micro Frontend"] },
  { kind: "Backend & data", names: ["Laravel", "REST API", "PostgreSQL", "MySQL", "RBAC", "JWT", "MCP"] },
  { kind: "Quality & tools", names: ["Vitest", "Go test", "SonarQube", "Feature flags", "Git", "GitLab", "GitHub"] },
];
