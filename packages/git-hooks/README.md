# @pedalboard/git-hooks
A set of JS Git hooks

## Installation
### yarn
```bash
yarn add @pedalboard/git-hooks -D
```
### npm
```bash
npm i @pedalboard/git-hooks -D
```

## Usage
The hooks are meant to be used in a Git hook (e.g. pre-commmit, commit-msg, etc.).  
To use the hooks under this package you need to make sure that your hooks are running in NodeJS env. Here is an example of such a hook:

```bash
#!/usr/bin/env node

const {conventionalCommitsValidationHook} = require('@pedalboard/git-hooks');
conventionalCommitsValidationHook.execute();
```

## Hooks
### Conventional Commits Validation Hook
This hook's purpose is to make sure all commit messages follow the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.
