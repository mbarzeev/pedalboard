# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pedalboard is a pnpm monorepo containing React components, hooks, and developer tooling. It uses Lerna with independent versioning and conventional commits.

- **Node**: v20.0.0 (see `.nvmrc`)
- **Package Manager**: pnpm (`pnpm`, not `npm` or `yarn`)
- **Workspaces**: `packages/*` (defined in `pnpm-workspace.yaml`)

## Common Commands

### Build, Test, Lint (all packages)
```bash
pnpm run build          # Build all packages
pnpm run test           # Test all packages
pnpm run lint           # Lint all packages
```

### Since-changed variants (only packages with changes)
```bash
pnpm run test:since     # Test only changed packages
```

### Per-package commands (run from package directory)
```bash
pnpm run test           # Run Jest tests for that package
pnpm run lint           # Run ESLint for that package
pnpm run lint:style     # Run Stylelint (components, media-loader only)
pnpm run build          # Build that package
```

### Running a single test file
```bash
# From a package directory, use Jest directly:
npx jest path/to/file.test.ts
```

### Storybook (components and media-loader packages)
```bash
pnpm run storybook         # Dev server on port 6006
pnpm run build-storybook   # Static build
```

### Cypress component tests (components and media-loader)
```bash
pnpm run cy:open    # Interactive mode
pnpm run cy:run     # Headless mode
```

### Coverage
```bash
pnpm run coverage:combined   # Aggregate coverage from all packages, generate lcov report
```

## Architecture

### Package Categories

**Component libraries** (React 17+ peer deps):
- `@pedalboard/components` — React components (Pagination). Uses `@pedalboard/hooks`. Has Storybook, Cypress tests, and SCSS styles.
- `@pedalboard/hooks` — React hooks (usePagination).
- `@pedalboard/media-loader` — Media loading control component (React 18+). Has Storybook and Cypress tests.

**Linting plugins** (CJS-only output):
- `@pedalboard/eslint-plugin-craftsmanlint` — Custom ESLint rules. Currently has `no-namespace-imports` rule.
- `@pedalboard/stylelint-plugin-craftsmanlint` — Custom Stylelint rules: `props-in-files` and `no-hardcoded-values`.

**Developer tools:**
- `@pedalboard/git-hooks` — JavaScript-based git hooks (conventional commits validation).
- `@pedalboard/scripts` — CLI scripts (`collectFiles`, `aggregatePackagesCoverage`).

### Build System

- **TypeScript** compiles to both ESM (`dist/esm/`) and CJS (`dist/cjs/`), with type declarations in `dist/types/`.
- **esbuild** bundles components (with a custom SCSS/SASS plugin in `esbuild.config.js`).
- **SWC** handles test transpilation via `@swc/jest`.
- Linting plugin packages only output CJS.
- Base TypeScript config is in `tsconfig.base.json`; each package has its own `tsconfig.json` extending it.

### Test Setup

- **Jest** with `jsdom` environment. Base config: `jest.config.base.js`. Test file pattern: `**/*.test.(js|jsx|ts|tsx)`.
- **Cypress** for component testing in `components` and `media-loader` packages.
- `dist/` directories are excluded from test discovery.

### Linting Rules

- Root `.eslintrc.json` enforces `@pedalboard/craftsmanlint/no-namespace-imports` at error level — avoid `import * as` syntax.
- `@typescript-eslint/no-unused-vars` is enforced (built-in `no-unused-vars` is off to avoid duplicate errors).

### Git Hooks & Commit Messages

Git hooks are configured via `.git-hooks/` directory (set up automatically on `pnpm install`). Commit messages must follow Conventional Commits format: `type(scope): description`. Valid types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.

### Publishing

Lerna handles publishing with `pnpm run publish:lerna`. Independent versioning — each package is versioned separately. Only the `master` branch can publish. Conventional commits drive version bumps automatically.
