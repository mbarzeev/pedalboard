# Conventional Commits Validation Hook
This hook's purpose is to make sure all commit messages follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.

Use it like this inside your commit-msg Git hook:

```bash
#!/usr/bin/env node

const {conventionalCommitsValidationHook} = require('@pedalboard/git-hooks');
conventionalCommitsValidationHook.execute();
```