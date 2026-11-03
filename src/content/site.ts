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
      "Varchar(N) support and a type-transition guard in the UI, aligned with the backend rules.",
      "A table-references endpoint, and database tables as a data source for questions.",
      "A complete column interface: add, rename, change type, set required, and delete.",
      "Deleting a table must be confirmed by typing its name.",
      "A read-only data tab behind a feature flag.",
    ],
    decision:
      "The tenant schema repository was refactored to lower its cognitive complexity until it passed the SonarQube quality gate.",
    result:
      "Tenants model their own data with safeguards against destructive changes, and the new code passes the quality gate.",
    stack: ["React.js", "Go"],
    image: { src: "/images/alurkerja/cs-schema-builder.png", alt: "AlurKerja Schema Builder with a list of table columns" },
  },
  {
    slug: "master-data",
    name: "Master Data",
    title: "Bulk upload and SQL import for dynamic master data",
    kind: "Platform & data",
    repo: "bpm-service, studio-react, app-react-1",
    summary:
      "Master data tables with dynamic columns, indexed for search and uniqueness, plus bulk upload, SQL import and file columns.",
    problem:
      "The schema is not fixed, yet uniqueness and search still have to be correct. Every tenant's records share one physical table, so a naive index or constraint would apply across tables.",
    solution: [
      "Search and uniqueness are backed by database indexes that are created automatically as columns change, so lookups stay fast as data grows and duplicates are rejected by the database itself.",
      "The database itself rejects duplicate values, even when two people save at the same moment. The app still checks first, so users get a clearer message.",
      "Import a table's structure from a SQL definition: it is read and turned into columns automatically, through an import dialog in the editor.",
      "Bulk upload of many records at once, where columns can be matched by their name or their slug, plus filters on each column.",
      "Files can be uploaded to and downloaded from file-type columns, with a two-step upload flow in the interface.",
      "When editing a record, it is not counted as a duplicate of itself.",
      "Closed a security hole in the sorting option that could have let someone run unwanted database commands, and made table slugs unique per tenant instead of across all tenants.",
    ],
    decision:
      "Uniqueness is enforced by the database, not only by the frontend. Application checks remain, but only to give earlier, per-row messages.",
    result:
      "Bulk upload reports each row separately, so valid rows are saved and failed rows come back with their reasons. Duplicates now surface as a clean conflict error instead of a server error.",
    stack: ["React.js", "Go"],
    image: { src: "/images/alurkerja/cs-master-data.png", alt: "Master data table with a bulk upload dialog and per-row results" },
  },
  {
    slug: "agen-ai-mcp",
    name: "AI Agents & MCP",
    title: "MCP tools and an AI gateway for AI agents",
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
    stack: ["Go", "Next.js"],
    image: { src: "/images/alurkerja/cs-ai-agent.jpg", alt: "AlurKerja MCP tool list and AI gateway settings" },
  },
  {
    slug: "related-requests",
    name: "Related requests",
    title: "A Related Requests view for people involved in a request",
    kind: "Feature",
    repo: "app-react-1",
    summary:
      "People can see every request they are involved in, not only the ones they started, in one place.",
    problem:
      "The app only showed requests a person had started themselves. Anyone who took part in a request in another way, such as approving a step, had no easy way to find it again or follow its progress.",
    solution: [
      "Added a Related Requests menu in the sidebar, with its own list and detail view.",
      "Reused the familiar My Requests layout, so the new page feels the same to use.",
      "Made links to a request open the right detail page, with a correct breadcrumb back to the list.",
      "Fixed the page numbers in the list so long lists are easy to move through.",
    ],
    decision:
      "I built the new page on top of the existing My Requests screen instead of creating a separate one, so the two stay consistent and future improvements apply to both.",
    result:
      "People can find and follow every request they are involved in from one menu, without asking the person who started it.",
    stack: ["React.js", "TypeScript"],
    image: { src: "/images/alurkerja/cs-related-requests.png", alt: "Related Requests list with the detail panel open" },
  },
  {
    slug: "cancel-request",
    name: "Cancel request",
    title: "Letting requesters cancel a request that is still running",
    kind: "Workflow UX",
    repo: "app-react-1",
    summary:
      "Requesters can stop a request they started by mistake, and the app clearly explains when cancelling is not possible.",
    problem:
      "Once a request was submitted, there was no way to take it back. A wrong or outdated request kept going and took reviewers' time. Cancelling is not always safe either, for example when someone has already finished a later step.",
    solution: [
      "Added a Cancel Request button on My Requests, with a short confirmation and an optional reason for the reviewers.",
      "Added a Cancelled filter and a clear label, with the date and reason, on cancelled requests.",
      "Checked beforehand whether a request can still be cancelled. If not, the button is locked.",
      "Wrote a separate, plain explanation for each reason cancelling is blocked, such as a policy being off or another person having already moved the request forward.",
      "Limited cancelling to the person who started the request, so it does not appear in Related Requests.",
      "Adjusted the dialog to match the design mockup.",
    ],
    decision:
      "A locked button always says why. Different causes get different explanations, so the requester knows whether to wait, ask someone, or give up.",
    result:
      "Requesters can correct their own mistakes without asking an admin, and reviewers stop spending time on requests that no longer matter.",
    stack: ["React.js", "TypeScript"],
    image: { src: "/images/alurkerja/cs-cancel-request.png", alt: "Cancel request dialog with an optional reason field" },
  },
  {
    slug: "bulk-actions",
    name: "Bulk actions",
    title: "Bulk claim and bulk complete for group tasks",
    kind: "Workflow UX",
    repo: "app-react-1",
    summary:
      "Operators can handle many tasks in one go, and what gets selected always matches what they see on screen.",
    problem:
      "Handling tasks one by one was slow. The bulk tools that existed were also confusing: choosing \"select all\" did not always pick the tasks the operator had filtered, so the wrong tasks could be processed.",
    solution: [
      "Added bulk claim, so operators can take ownership of many group tasks at once.",
      "Fixed the filters and \"select all\" in bulk complete so they work together.",
      "Made the bulk complete form easy to read in dark mode.",
      "Closed the task panel automatically after a claim, so operators can move on to the next one.",
      "Added a limit on how many tasks can be selected at once, with a clear message when it is reached.",
    ],
    decision:
      "\"Select all\" follows the filtered results, not the whole list, so what gets processed is exactly what the operator sees.",
    result:
      "Operators can process many tasks at once with fewer mistakes, and the repetitive manual work is much smaller.",
    stack: ["React.js", "Go"],
    image: { src: "/images/alurkerja/cs-bulk-operations.png", alt: "Task list with select-all and the bulk complete dialog" },
  },
  {
    slug: "lane-sync",
    name: "Lane Sync",
    title: "A wizard that maps BPMN lanes to org roles",
    kind: "Workflow UX",
    repo: "studio-react, bpm-service",
    summary:
      "Lanes in BPMN diagrams are matched to roles in the org structure through a wizard: Scope, Scan, Review and Apply, followed by a results screen.",
    problem:
      "The change touches many files and writes data, so users need to see what will change before it happens, and one failed file should not stop the rest.",
    solution: [
      "A step-by-step dialog: Scope, Scan, Review and Apply, then a results screen.",
      "Apply saves files one by one, each against its expected version, so a file that changed in the meantime is reported instead of overwritten. One failure does not stop the others.",
      "The results screen lists the lanes that got a role, the new version of each file, files that changed during the sync, files skipped, and how to undo through Versions.",
      "Markers in the org structure show what the last sync changed.",
      "An endpoint that lists every BPMN file in the Drive, with folder and version, in a single call.",
      "Lanes are matched by name in Drive, and each file shows its lane roles.",
    ],
    decision:
      "Apply works file by file against the expected version, and the whole feature is off by default behind a feature flag on both the frontend and the backend, with a test that the flag defaults to off.",
    result:
      "Teams can map lanes to org roles from one wizard, review the changes first, and see exactly which files changed.",
    stack: ["React.js", "Go"],
    image: { src: "/images/alurkerja/cs-lane-sync.png", alt: "Lane Sync wizard on the Review step" },
  },
  {
    slug: "isolasi-tenant",
    name: "Tenant isolation",
    title: "Tenant and role boundary fixes",
    kind: "Security",
    repo: "app-react-1, studio-react, company-profile-react, bpm-service, report-service, tenant-management-service",
    summary:
      "Fixes for places where one tenant's data or limits showed up in another tenant's workspace, plus tighter access by role.",
    problem:
      "In a multi-tenant product, boundaries break through small details: shared state, global identifiers, and screens that only check the role in the interface.",
    solution: [
      "Stopped the previous workspace's tasks, notifications, processes and active-tenant header from showing up after switching workspaces.",
      "Slugs for master data tables and report metrics are now unique per tenant instead of across all tenants, so one tenant's names no longer block another's.",
      "The member role is redirected to a 403 page when opening Studio or Company Profile.",
      "Admins can limit a user to a chosen list of processes they may start: data model, admin API and the settings dialog.",
    ],
    decision:
      "Role and tenant checks should not live in one place only. The member 403 is an interface guard, so the server must still enforce access on its own.",
    result:
      "Switching workspaces no longer shows the previous workspace's data, and several tenant-wide naming conflicts are gone.",
    stack: ["React.js", "Go"],
    image: { src: "/images/alurkerja/cs-multi-tenant.png", alt: "403 page for the member role and AlurKerja role settings" },
  },
  {
    slug: "race-condition",
    name: "Race condition",
    title: "Preventing stale data when switching workspaces",
    kind: "Frontend",
    repo: "app-react-1",
    summary:
      "When a user switched workspaces quickly, a slow reply from the old workspace could show up on the new one, so one company's data appeared in another's.",
    problem:
      "Every screen asks the server for its data. If the user switched workspaces before an earlier request came back, that late reply was still shown on the screen. The user would then see another workspace's information, which is a data leak from their point of view.",
    solution: [
      "Made each screen ignore any reply that arrives after the user has already moved on.",
      "Cleared the old workspace's data as soon as the user switches to another one.",
      "Reset the form and progress of the previous task when the user opens a different task.",
      "Kept the loading state of the sidebar and the home page in step while a workspace is getting ready.",
    ],
    decision:
      "I fixed this in the app itself: ignore late replies and clear old data on every switch. That way the screen no longer depends on which reply arrives first.",
    result:
      "The screen stays consistent even when users click around quickly, and workspaces no longer show each other's data.",
    stack: ["React.js", "TypeScript"],
    image: { src: "/images/alurkerja/cs-race-condition.png", alt: "DevTools Network tab with an old request marked canceled" },
  },
];

// Projects shown in the carousel. Images: screenshots 16:10, at least 1600 × 1000 px.
export const projects: Project[] = [
  {
    slug: "alurkerja",
    name: "AlurKerja",
    title: "A business process automation platform for enterprise workflows",
    kind: "SaaS Platform",
    repo: "cross-repo",
    summary:
      "AlurKerja is a multi-tenant business process management platform for workflow automation, approvals, and organizational operations. As a Full Stack Developer, I build and maintain features across React and Go, covering data management, dashboards, workflow controls, and access management.",
    problem:
      "Developing new features across a production-ready, multi-tenant platform requires keeping each organization's data isolated, maintaining consistent workflows, and ensuring new functionality integrates safely with existing modules.",
    solution: [
      "Built Master Data features for bulk upload, file management, configurable slugs, unique column indexing, and dynamic table definitions, alongside React interfaces for records, column filters, and file fields.",
      "Built a tenant-specific Schema Builder for dynamic database tables, including table creation, column management, and table reference endpoints.",
      "Implemented request cancellation policies, Cancel Request actions, and distinct cancellation statuses across backend and frontend.",
      "Developed Related Requests and multi-process task filters, allowing users to find related workflows and filter tasks by variables.",
      "Added incident monitoring endpoints and incident indicators in BPMN process diagrams.",
      "Implemented role-based access control for process initiation and workspace access, including frontend restrictions and 403 redirects for unauthorized members.",
      "Built profile avatar uploads with image cropping, workspace favorites, and invitation management features.",
      "Developed workspace completion progress tracking and admin ticket filtering in Helpdesk.",
    ],
    decision:
      "Designed features across both backend and frontend to keep workflow behavior, access restrictions, and tenant-specific data consistent throughout the platform.",
    result:
      "Expanded AlurKerja's workflow, data management, reporting, and workspace capabilities through full stack development across multiple production modules.",
    stack: ["React.js", "Go"],
    image: {
      src: "/images/alurkerja/cover1.png",
      alt: "AlurKerja main dashboard"
    },
    cases: alurkerjaCases,
  },
  {
    slug: "mavoka",
    name: "Mavoka",
    title: "An internship platform for vocational high school students",
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
    title: "A platform for booking tourist jeep tours",
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
    title: "A small help ticket manager",
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
  { name: "Mavoka", note: "Internship project · Full stack", dot: "wait", href: "/projects/mavoka" },
  { name: "Jeep Booking App", note: "Academic · Frontend", dot: "wait", href: "/projects/jeep-booking-app" },
  { name: "Spendly", note: "Side project · Frontend", dot: "wait", href: "/projects/spendly" },
  { name: "Helpdesk Mini", note: "Side project · Frontend", dot: "wait", href: "/projects/helpdesk-mini" },
];

// Numbers taken from the CV.
export const stats = [
  { value: "10+", label: "full stack features" },
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

// Sertifikat. Ganti isi sesuai sertifikat asli, lalu taruh gambarnya di public/images/certificates/
// dengan nama file yang sama seperti `image` di bawah (rasio 4:3 atau 16:10 paling rapi).
export const certificates = [
  { name: "FrontEnd for Beginners", issuer: "SoloLearn", date: "October 2026", image: "/images/certificates/certificate-01.jpg" },
  { name: "TypeScript for Beginners", issuer: "SoloLearn", date: "October 2026", image: "/images/certificates/certificate-02.jpg" },
  { name: "GoLang for Beginners", issuer: "Issuing organization", date: "October 2026", image: "/images/certificates/certificate-03.jpg" },
  { name: "Application Development with Laravel", issuer: "Issuing organization", date: "October 2026", image: "/images/certificates/certificate-04.jpg" },
  { name: "CSS Web Design for Beginners", issuer: "Issuing organization", date: "October 2026", image: "/images/certificates/certificate-05.jpg" },
  { name: "JavaScript Programming", issuer: "Issuing organization", date: "October 2026", image: "/images/certificates/certificate-06.jpg" },
];

export const path = [
  { when: "Apr - Jun 2025", title: "Jeep Booking App", context: "Academic project · Frontend", text: "Set up the project's initial configuration and built the scheduling, driver status, ticketing, and CRUD features." },
  { when: "Jun - Aug 2025", title: "Mavoka", context: "Fitinline · Full Stack Intern", text: "Next.js on the frontend and Laravel on the backend, with authentication, a REST API, and a dashboard." },
  { when: "Aug - Dec 2025", title: "AlurKerja", context: "PT Javan Cipta Solusi · Full Stack Intern", text: "Fixed bugs and built 10+ pages in the Company Profile module." },
  { when: "Jan 2026 - Now", title: "AlurKerja", context: "PT Javan Cipta Solusi · Freelance Full Stack", text: "Shipped 10+ full stack features and handled 100+ support tickets." },
];

export const laptopScreens = [
  { src: "/images/alurkerja/cover1.png", alt: "AlurKerja main dashboard" },
  { src: "/images/alurkerja/cs-schema-builder.png", alt: "AlurKerja Schema Builder" },
  { src: "/images/alurkerja/cs-master-data.png", alt: "AlurKerja Master Data" },
];

export type CvItem = { label: string; value: string };
export type CvGroup = { name: string; period: string; items: CvItem[] };

export const experience: CvGroup[] = [
  {
    name: "PT Javan Cipta Solusi",
    period: "Freelance full stack developer, Jan 2026 to present",
    items: [
      { label: "Full stack features", value: "10+" },
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
