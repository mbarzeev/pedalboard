# @pedalboard/git-hooks

A set of JavaScript-based Git hooks.

## Installation

### yarn
```bash
yarn add @pedalboard/git-hooks -D
```

### npm
```bash
npm install @pedalboard/git-hooks -D
```

## Setup

The hooks are designed to run in a Node.js environment. To use them, create a Git hook file that invokes the desired hook.

### Example: Setting up commit-msg hook

1. Create the hook file at `.git/hooks/commit-msg`:

```bash
#!/usr/bin/env node

const {conventionalCommitsValidationHook} = require('@pedalboard/git-hooks');
conventionalCommitsValidationHook.execute();
```

2. Make it executable:

```bash
chmod +x .git/hooks/commit-msg
```

## Available Hooks

### conventionalCommitsValidationHook

Validates that commit messages follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

#### Supported Commit Types

- `build` - Changes that affect the build system or external dependencies
- `chore` - Other changes that don't modify src or test files
- `ci` - Changes to CI configuration files and scripts
- `docs` - Documentation only changes
- `feat` - A new feature
- `fix` - A bug fix
- `perf` - A code change that improves performance
- `refactor` - A code change that neither fixes a bug nor adds a feature
- `revert` - Reverts a previous commit
- `style` - Changes that do not affect the meaning of the code
- `test` - Adding missing tests or correcting existing tests

#### Valid Commit Message Examples

```
feat: add user authentication
fix(api): resolve null pointer exception
docs: update README with installation instructions
feat(auth)!: change login API (breaking change)
chore(deps): update dependencies
```

#### Invalid Commit Message Examples

```
added new feature          # Missing type prefix
feature: add something     # Invalid type (should be 'feat')
fix add something          # Missing colon after type
```

#### Usage

```javascript
#!/usr/bin/env node

const {conventionalCommitsValidationHook} = require('@pedalboard/git-hooks');
conventionalCommitsValidationHook.execute();
```

When a commit message doesn't comply with the standard, the hook will:
1. Print an error message: "Cannot commit: the commit message does not comply with conventional commits standards."
2. Exit with code 1, preventing the commit

## Resources

- [A Git-Hook for Commit Messages Validation - No Husky, Just JS](https://dev.to/mbarzeev/a-git-hook-for-commit-messages-validation-no-husky-just-js-1ko7)
- [A New git-hooks Package](https://dev.to/mbarzeev/a-new-git-hooks-package-31bf)
- [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/)

## License

MIT
