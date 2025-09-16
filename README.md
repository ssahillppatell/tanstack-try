# DOTSEC Assignment – Servers Dashboard

A small React + TypeScript app that loads a list of server records, stores them in IndexedDB, and renders a sortable, filterable, paginated table with a quick health breakdown chart.

Built with Vite, Tailwind CSS, TanStack Table, and ECharts.

**Key Features**
- Load 10 or all sample records into IndexedDB.
- Add a single server via a modal form.
- Filter by text (ID/Name/Location/IP), select (Health), and numeric range (Volume).
- Sort columns and paginate results.
- View a pie chart breakdown of server health.

**Tech Stack**
- React 19, TypeScript, Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- TanStack Table
- ECharts (via `echarts-for-react`)
- IndexedDB wrapper (`src/services/indexeddb.ts`)

**Project Structure**
- `src/components/ServerTable.tsx` – Table with filters, sorting, pagination.
- `src/components/Controls.tsx` – Load/Clear/Add actions and chart modal.
- `src/components/Form.tsx` – Modal form for adding a server.
- `src/components/Chart.tsx` – Thin ECharts wrapper.
- `src/utils/data.ts` – Data loading and IndexedDB helpers.
- `src/contexts/data.tsx` – Context for `Server[]` in-memory state.
- `src/assets/fake.json` – Sample records (editable/generated).

**Getting Started**
- Install dependencies: `npm install` (or `pnpm install` or `yarn install`).
- Start dev server: `npm run dev` then open `http://localhost:5173`.
- Build production bundle: `npm run build`.
- Preview build: `npm run preview`.
- Lint: `npm run lint`.

**Testing**
- Test runner: Vitest (configured for `jsdom`).
- Run all tests in watch mode: `npm run test`.
- Run once (CI): `npm run test:run`.
- Table tests live in `src/components/__tests__/ServerTable.test.tsx` and cover:
  - Name text filter updates visible rows.
  - Health select filter shows only matching rows.
  - Volume min/max numeric range narrows rows correctly.

**Sample Data Generation (Optional)**
- Script: `generate-fake-data.ts` creates `src/assets/fake.json` records using Faker.
- The script currently uses the Bun runtime APIs (`file`, `write`).
- If you have Bun installed, run: `bun run generate-fake-data.ts`.
- If you do not use Bun, you can modify the script to Node-friendly FS APIs or keep the existing `src/assets/fake.json` as-is.

**Notes**
- Large data loads are chunked when inserting into IndexedDB to avoid excessive concurrent operations.
- The loading spinner delays display briefly to prevent flicker on fast operations.
