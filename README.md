# Utility Intelligence Platform (Aziro)

Enterprise operational intelligence dashboard for airports, ports, industrial corridors, and smart utilities. Built as a full-stack React application with server-side rendering, file-based routing, and a shadcn/ui component library.

## Overview

Aziro provides a unified command-center view across:

- **Operations** — KPIs, alerts, work orders, corridor maps
- **Assets & utilities** — asset registry, utility health, GIS
- **AI intelligence** — forecasting, predictive maintenance, scenario simulation
- **Resilience** — weather intel, emergency response, compliance, digital twin

> **Note:** The app currently runs on **mock/static data** in `src/lib/`. A real backend/API layer is planned but not yet implemented.

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router) |
| UI | React 19, TypeScript, [shadcn/ui](https://ui.shadcn.com/) (Radix primitives) |
| Styling | Tailwind CSS v4 |
| Charts | Recharts |
| Build | Vite 8, Nitro (SSR/production) |
| Package manager | npm (Bun also supported via `bun.lock`) |

## Prerequisites

- **Node.js** 20 or newer — [nodejs.org](https://nodejs.org/)
- **npm** 10+ (ships with Node.js)

Optional: [Bun](https://bun.sh) if you prefer `bun install` / `bun run dev`.

## Getting started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/utility-intelligence-platform.git
cd utility-intelligence-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open **http://localhost:8080** in your browser (port may vary if 8080 is in use — check the terminal output).

## Available scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server with hot reload |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Application routes

| Route | Page |
|-------|------|
| `/` | Operations Dashboard |
| `/assets` | Asset registry |
| `/utilities` | Utility monitoring |
| `/gis` | GIS & maps |
| `/ai` | AI intelligence |
| `/operations` | Operations center |
| `/technicians` | Technician dispatch |
| `/digital-twin` | Digital twin |
| `/reports` | Reports |
| `/compliance` | Compliance |
| `/resilience` | Resilience overview |
| `/weather` | Weather intelligence |
| `/emergency` | Emergency response |
| `/settings` | Settings |

## Project structure

```
utility-intelligence-platform/
├── src/
│   ├── components/       # App shell, sidebar, emergency banner, shadcn/ui
│   ├── hooks/            # Shared React hooks
│   ├── lib/              # Utils, mock data, disaster data
│   ├── routes/           # File-based pages (__root.tsx = app layout)
│   ├── router.tsx        # TanStack Router + React Query setup
│   ├── server.ts         # SSR server entry
│   ├── start.ts          # TanStack Start instance
│   └── styles.css        # Tailwind + design tokens
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Pushing to GitHub

Initialize git from the **project root** (the folder that contains `package.json`):

```bash
git init
git add .
git commit -m "Initial commit: Utility Intelligence Platform"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/utility-intelligence-platform.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username. The repo root should be this project folder — not a parent directory — so files like `package.json` and `src/` sit at the top level of the repository.

If the remote repo was created with a README and the push is rejected:

```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

## What is committed vs ignored

**Committed:** source code, configs, lockfiles (`package-lock.json`, `bun.lock`)

**Ignored** (see `.gitignore`): `node_modules/`, `.output/`, build artifacts, `.env` files

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Red squiggles in the editor | Run `npm install`. Ensure `tsconfig.json` has `"baseUrl": "."`. |
| `Element type is invalid` / blank page | Confirm all files are **saved to disk** (Ctrl+K S in Cursor). Check that `src/components/ui/button.tsx` and `sidebar.tsx` are not empty. |
| Port already in use | Vite will try the next port (e.g. 8081). Check terminal output for the correct URL. |
| Build fails on missing exports | Verify route files (`index.tsx`, `ai.tsx`, etc.) contain full page code, not TanStack placeholder stubs. |

## License

Private — internal use only.
