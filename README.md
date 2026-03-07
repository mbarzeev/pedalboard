# Pedalboard

![Build and publish](https://github.com/mbarzeev/pedalboard/actions/workflows/npm-publish.yml/badge.svg)
![Build and publish](https://github.com/mbarzeev/pedalboard/actions/workflows/coverage-report.yml/badge.svg)
![Build and publish](https://github.com/mbarzeev/pedalboard/actions/workflows/chromatic.yml/badge.svg)

A monorepo containing reusable React components, hooks, and developer tooling.

Many of the development done on this project was blogged about on [dev.to/mbarzeev](https://dev.to/mbarzeev).

## Packages

| Package | Description | Blog Post |
|---------|-------------|-----------|
| [@pedalboard/components](packages/components) | A set of well-crafted React components | [Creating a React Component Generator](https://dev.to/mbarzeev/creating-a-react-component-generator-3g6) |
| [@pedalboard/hooks](packages/hooks) | A set of well-crafted React hooks | [Converting Your React Hook To TypeScript](https://dev.to/mbarzeev/converting-your-react-hook-to-typescript-2439) |
| [@pedalboard/media-loader](packages/media-loader) | A component that lets you take control over your media loading | [Take control over your media loading](https://dev.to/mbarzeev/take-control-over-your-media-loading-bpi) |
| [@pedalboard/eslint-plugin-craftsmanlint](packages/eslint-plugin-craftsmanlint) | A set of ESLint rules for your code craftsmanship | |
| [@pedalboard/stylelint-plugin-craftsmanlint](packages/stylelint-plugin-craftsmanlint) | A set of Stylelint rules for your code craftsmanship | [Enforcing Your CSS Standards with a Custom Stylelint Plugin](https://dev.to/mbarzeev/enforcing-your-css-standards-with-a-custom-stylelint-plugin-36l7) |
| [@pedalboard/git-hooks](packages/git-hooks) | A set of JavaScript-based Git hooks | [A New git-hooks Package](https://dev.to/mbarzeev/a-new-git-hooks-package-31bf) |
| [@pedalboard/scripts](packages/scripts) | A set of reusable CLI scripts | [Yarn Workspace Scripts Refactor](https://dev.to/mbarzeev/yarn-workspace-scripts-refactor-a-case-study-4ol0) |

## Getting Started

```bash
yarn install
```

## Scripts

```bash
yarn build      # Build all packages
yarn test       # Run tests
yarn lint       # Lint all packages
```

## License

MIT
