# AWS Student Building Guild (SBG) - USJ Official Website

Official web application and builder portal for the **AWS Student Building Guild at the University of Sri Jayewardenepura (USJ)**.

Built with **TanStack Start** (React 19, TanStack Router, TanStack Query, and Tailwind CSS), architected from day one for extensibility, type-safety, and seamless addition of future backend business logic.

---

## 🚀 Key Features

- **⚡ Modern Full-Stack React**: Powered by TanStack Start with SSR (Server-Side Rendering) and client hydration.
- **🛣️ Type-Safe File Routing**: TanStack Router with auto-generated route trees, nested layouts, and loaders.
- **🎨 AWS Builder Design System**: Styled with Tailwind CSS v4, AWS smile orange (`#FF9900`) accents, dark slate aesthetic, and accessible UI components.
- **🧩 Domain-Driven Architecture**: Modular feature folders (`events`, `projects`, `team`, `newsletter`) cleanly separating presentation from domain logic.
- **🛡️ Extensible Server Functions**: Type-safe server mutations and data loaders using `createServerFn()` from `@tanstack/react-start`, ready to wire up with AWS DynamoDB, SES, and Cognito.

---

## 📁 Architectural Project Structure

The codebase is organized following modern clean architecture and domain-driven design principles:

```
├── .agents/                    # Agent intent skills (TanStack, domain modeling, UI best practices)
├── src/
│   ├── components/             # Reusable UI presentation layer
│   │   ├── common/             # Navbar, Footer, Container, Layouts
│   │   ├── ui/                 # Atomic design primitives (Button, Badge, Card, Icons)
│   │   ├── home/               # Homepage sections (Hero, Pillars, Stats)
│   │   ├── events/             # EventCard, filters, registration UI
│   │   └── projects/           # ProjectCard, builder showcase elements
│   ├── features/               # Domain business logic & schemas
│   │   ├── events/             # Event entities, types, and mock fixtures
│   │   ├── projects/           # Builder project models and data
│   │   └── team/               # Guild leadership and member profiles
│   ├── server/                 # Full-stack backend & server function layer
│   │   ├── functions/          # Type-safe server functions (createServerFn)
│   │   └── services/           # Backend services (contact handler, database adapters)
│   ├── integrations/           # External client integrations (TanStack Query client)
│   ├── lib/                    # Shared utilities, class mergers, and constants
│   ├── routes/                 # File-based TanStack routes
│   │   ├── __root.tsx          # Root HTML layout, meta headers, navigation & footer
│   │   ├── index.tsx           # Landing page (Hero, Stats, Pillars, Showcases)
│   │   ├── events.tsx          # Workshops, bootcamps, and certification cohorts
│   │   ├── projects.tsx        # Student cloud projects and architectures showcase
│   │   ├── team.tsx            # Core committee, tech leads, and faculty advisors
│   │   └── contact.tsx         # Interactive membership & inquiry application
│   ├── styles/                 # Global styles and Tailwind CSS v4 directives
│   ├── router.tsx              # TanStack Router instance with SSR Query integration
│   └── routeTree.gen.ts        # Auto-generated type-safe route definitions
├── public/                     # Static assets, icons, and banners
├── tsr.config.json             # TanStack Router CLI configuration
├── vite.config.ts              # Vite bundler configuration with TanStack Start plugin
└── tsconfig.json               # TypeScript compiler options
```

---

## 🛠️ Getting Started

### Prerequisites

- **Runtime & Package Manager**: **[Bun](https://bun.sh)** (strongly recommended for lightning-fast execution and package resolution) or **Node.js** `v20+` / `v22+` with `npm`.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/WarunaUdara/aws-sbg-official-website.git
cd "AWS SBG USJ"

bun install  # (recommended) or npm install
```

### Development Server

Start the local development server on `http://localhost:3000`:

```bash
bun dev  # (recommended) or npm run dev
```

### Production Build

Compile optimized client and SSR bundles:

```bash
bun run build  # (recommended) or npm run build
```

Preview the production build locally:

```bash
bun run preview  # (recommended) or npm run preview
```

---

## 🔌 Extensibility & Future Roadmap

When adding new backend capabilities or business logic:

1. **Server Functions**:
   Add new server functions in `src/server/functions/*.functions.ts` using `createServerFn({ method: 'POST' | 'GET' })`.

2. **AWS Integrations**:
   Implement AWS SDK clients (DynamoDB DocumentClient, Amazon SES, Amazon Bedrock) inside `src/server/services/*.server.ts`. These files are stripped out of client bundles automatically by TanStack Start.

3. **New Pages / Routes**:
   Simply create a new file in `src/routes/` (e.g. `src/routes/blog.tsx`) and run `npm run generate-routes` (or let Vite HMR generate it).

---

## 🤝 Community & Contact

- **Organization**: AWS Student Building Guild - University of Sri Jayewardenepura (USJ)
- **University**: University of Sri Jayewardenepura (USJ), Sri Lanka
- **GitHub**: [WarunaUdara/aws-sbg-official-website](https://github.com/WarunaUdara/aws-sbg-official-website)

---

## 📄 License

This project is licensed under the MIT License - built with pride by student builders at USJ.
