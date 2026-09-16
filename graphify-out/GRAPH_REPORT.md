# Graph Report - .  (2026-09-16)

## Corpus Check
- 211 files · ~120,811 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 240 nodes · 393 edges · 21 communities (14 shown, 7 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.5)
- Token cost: 1,200 input · 350 output

## Community Hubs (Navigation)
- Common Layout & Components
- Dependencies & External Icons
- Domain Feature Cards
- TanStack Router System
- TypeScript & Lib Types
- Vite & Toolchain DevDeps
- Package Configuration
- Events Domain & Data
- Database Schema Templates
- React State & Form Handlers
- Brand & Architecture Documentation
- Diagnostic Bug Loop Scripts
- Team & Leadership Directory
- Schema Generation Utilities
- HTTP Database Adapter
- WebSocket Database Adapter
- TanStack Query Client
- Vite Bundler Configuration
- Router Initialization Export

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 17 edges
2. `cn()` - 13 edges
3. `Container()` - 12 edges
4. `Button` - 9 edges
5. `SITE_CONFIG` - 7 edges
6. `FileRoutesByPath` - 7 edges
7. `react` - 6 edges
8. `Badge()` - 6 edges
9. `scripts` - 5 edges
10. `Card()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Navbar()` --references--> `react`  [EXTRACTED]
  src/components/common/Navbar.tsx → package.json
- `EventsPage()` --references--> `react`  [EXTRACTED]
  src/routes/events.tsx → package.json
- `ProjectsPage()` --references--> `react`  [EXTRACTED]
  src/routes/projects.tsx → package.json
- `ContactPage()` --references--> `react`  [EXTRACTED]
  src/routes/contact.tsx → package.json
- `Container()` --calls--> `cn()`  [EXTRACTED]
  src/components/common/Container.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (21 total, 7 thin omitted)

### Community 0 - "Common Layout & Components"
Cohesion: 0.16
Nodes (17): Container(), ContainerProps, Footer(), Navbar(), Hero(), Pillars, Stats(), ProjectCard() (+9 more)

### Community 1 - "Dependencies & External Icons"
Cohesion: 0.07
Nodes (27): clsx, lucide-react, dependencies, clsx, lucide-react, react-dom, tailwind-merge, tailwindcss (+19 more)

### Community 2 - "Domain Feature Cards"
Cohesion: 0.21
Nodes (16): EventCard(), ProjectCardProps, Badge(), BadgeProps, Card(), CardContent(), CardDescription(), CardFooter() (+8 more)

### Community 3 - "TanStack Router System"
Cohesion: 0.11
Nodes (24): getRouter(), Register, @tanstack/react-router, Route, Route, Route, Route, Route (+16 more)

### Community 4 - "TypeScript & Lib Types"
Cohesion: 0.08
Nodes (24): DOM, DOM.Iterable, ES2022, **/*.ts, **/*.tsx, vite/client, compilerOptions, allowImportingTsExtensions (+16 more)

### Community 5 - "Vite & Toolchain DevDeps"
Cohesion: 0.11
Nodes (19): devDependencies, @tailwindcss/typography, @tanstack/devtools-vite, @tanstack/router-cli, @types/node, @types/react, @types/react-dom, typescript (+11 more)

### Community 6 - "Package Configuration"
Cohesion: 0.12
Nodes (15): description, imports, name, pnpm, onlyBuiltDependencies, private, scripts, build (+7 more)

### Community 7 - "Events Domain & Data"
Cohesion: 0.23
Nodes (11): EventCardProps, MOCK_EVENTS, CommunityEvent, EventCategory, EventStatus, Speaker, CATEGORIES, getEventByIdFn (+3 more)

### Community 8 - "Database Schema Templates"
Cohesion: 0.14
Nodes (13): comments, commentsRelations, posts, postsRelations, postTags, postTagsRelations, profiles, profilesRelations (+5 more)

### Community 9 - "React State & Form Handlers"
Cohesion: 0.24
Nodes (8): react, react, ContactPage(), EventsPage(), ProjectsPage(), submitContactFn, ContactSubmission, handleContactSubmission()

### Community 10 - "Brand & Architecture Documentation"
Cohesion: 0.50
Nodes (4): AWS Student Building Guild USJ, Project Documentation, Tailwind CSS v4 Design System, TanStack Start Architecture

### Community 11 - "Diagnostic Bug Loop Scripts"
Cohesion: 0.83
Nodes (3): capture(), hitl-loop.template.sh script, step()

## Knowledge Gaps
- **102 isolated node(s):** `sql`, `db`, `pool`, `db`, `users` (+97 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Dependencies & External Icons` to `React State & Form Handlers`, `Package Configuration`?**
  _High betweenness centrality (0.285) - this node is a cross-community bridge._
- **Why does `react` connect `React State & Form Handlers` to `Common Layout & Components`, `Dependencies & External Icons`?**
  _High betweenness centrality (0.249) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Vite & Toolchain DevDeps` to `Package Configuration`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **What connects `sql`, `db`, `pool` to the rest of the system?**
  _102 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Dependencies & External Icons` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `TanStack Router System` be split into smaller, more focused modules?**
  _Cohesion score 0.1076923076923077 - nodes in this community are weakly interconnected._
- **Should `TypeScript & Lib Types` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._