# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pedalboard is a Yarn 3 monorepo containing React components, hooks, and developer tooling. It uses Lerna with independent versioning and conventional commits.

- **Node**: v20.0.0 (see `.nvmrc`)
- **Package Manager**: Yarn 3.2.0 (`yarn`, not `npm`)
- **Workspaces**: `packages/*`

## Common Commands

### Build, Test, Lint (all packages)
```bash
yarn build          # Build all packages (topological order)
yarn test           # Test all packages (parallel)
yarn lint           # Lint all packages (parallel)
```

### Since-changed variants (only packages with changes)
```bash
yarn test:since     # Test only changed packages
yarn lint:since     # Lint only changed packages
```

### Per-package commands (run from package directory)
```bash
yarn test           # Run Jest tests for that package
yarn lint           # Run ESLint for that package
yarn lint:style     # Run Stylelint (components, media-loader only)
yarn build          # Build that package
```

### Running a single test file
```bash
# From a package directory, use Jest directly:
npx jest path/to/file.test.ts
```

### Storybook (components and media-loader packages)
```bash
yarn storybook         # Dev server on port 6006
yarn build-storybook   # Static build
```

### Cypress component tests (components and media-loader)
```bash
yarn cy:open    # Interactive mode
yarn cy:run     # Headless mode
```

### Coverage
```bash
yarn coverage:combined   # Aggregate coverage from all packages, generate lcov report
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
- **esbuild** bundles components (with a custom SCSS/SASS plugin in `esbuild.css.plugin.js`).
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

Git hooks are configured via `.git-hooks/` directory (set up automatically on `yarn install`). Commit messages must follow Conventional Commits format: `type(scope): description`. Valid types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.

### Publishing

Lerna handles publishing with `yarn publish:lerna`. Independent versioning — each package is versioned separately. Only the `master` branch can publish. Conventional commits drive version bumps automatically.