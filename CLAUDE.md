# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Start Expo dev server
npm run android    # Run on Android emulator
npm run ios        # Run on iOS simulator
npm run web        # Run on web

npm test           # Run all Jest tests
npm run test:watch # Run tests in watch mode
```

There is no explicit lint command in package.json — ESLint is configured via `.eslintrc.js` and can be run with `npx eslint .`.

## Architecture

**What the app does:** A Pokemon type chart and team-builder for Expo/React Native. Two main views:
1. **Typing screen** — select 1–2 Pokemon types, view offensive/defensive matchups.
2. **TeamBuilder screen** — build a team of up to 6 Pokemon, name members, assign types, then view team coverage analysis.

### Navigation

No React Navigation library. `App.tsx` holds a `teamBuilderOpen` boolean and renders either `Typing.tsx` or `TeamBuilder.tsx`. The `NavBar` component toggles between them.

### State management

Redux Toolkit with RTK Query (`state/store.ts`). Two API slices live under their respective feature folders:
- `features/TypeSelection/query.ts` — fetches all Pokemon types.
- `features/DamageRelations/query.ts` — fetches damage relations for selected types, or all relations at once.

Team member data is **not** in Redux — it is persisted to AsyncStorage (key `quiztracker.teamMembers.v1`) via helpers in `shared/storage/`.

### Feature structure

```
features/
├── TypeSelection/      # PokeTypeModel, RTK query, type list UI
├── DamageRelations/    # DamageRelationModel, RTK query, relations UI
└── TeamBuilder/
    ├── types.ts                  # TeamMemberModel
    ├── services/
    │   ├── teamRelationsService.ts       # Aggregates type multipliers across team
    │   ├── teamStats/
    │   │   ├── defensiveStatsService.ts  # Identifies critical/major weaknesses, 4x vulns, no-safe-switch
    │   │   └── offensiveStatsService.ts  # Identifies offensive coverage gaps
    │   └── overviewRows/                 # Prepares row data for the analysis UI
    └── components/
        ├── team/         # Add/edit team member flows
        └── teamAnalysis/ # Display of analysis results
```

### API / backend

Backend expected at `http://10.0.2.2:5062/api` (Android emulator localhost alias). Alternative URLs for physical device and Azure are commented in `api/apiInstance.ts` and `constants/http.ts`.

Key endpoints:
- `GET /api/poketypes` — all types
- `GET /api/damagerelations` — relations for selected types
- `GET /api/damagerelations/all` — every relation (used by TeamBuilder)

### Testing patterns

Tests live in `__tests__` directories alongside source files. Services have the most coverage. Fixtures (representative teams + expected outputs) live next to tests. Helper functions `expectDefensive` / `expectOffensive` are reused across service tests.

Run a single test file:
```bash
npx jest features/TeamBuilder/services/__tests__/defensiveStatsService.test.ts
```

### Style conventions

- Prettier: double quotes, trailing commas, 90-char line width, 2-space indent.
- ESLint: Expo recommended + `simple-import-sort` + `unused-imports` + strict React hooks rules.
- Theme colors in `constants/colors.ts`, typography in `constants/typography.ts`, shared strings/labels in `constants/strings.ts`.

## Codebase Overview

Expo/React Native Pokemon type chart and team-builder. Two screens toggled by a boolean in `App.tsx` (no navigation library). RTK Query handles all API calls; team roster is persisted in AsyncStorage.

**Stack:** React Native 0.81 / Expo 54 / Redux Toolkit + RTK Query / AsyncStorage / Jest + jest-expo  
**Structure:** `features/` (TypeSelection, DamageRelations, TeamBuilder) + `shared/` (components, ui, typography, storage) + `screens/` + `constants/` + `state/`

For full architecture, file-by-file docs, known bugs, and navigation guide see [docs/CODEBASE_MAP.md](docs/CODEBASE_MAP.md).
