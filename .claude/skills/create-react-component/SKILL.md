---
name: create-react-component
description: Create a new React component in packages/components following established conventions
argument-hint: [ComponentName]
---

Create a new React component in the `packages/components` package following the established conventions.

## Component: $ARGUMENTS

Create a folder `packages/components/src/$ARGUMENTS/` with the following files:

### 1. `index.tsx` — Component implementation
Use the template from [templates/component.tsx](templates/component.tsx):
- Replace `{{ComponentName}}` with `$ARGUMENTS`
- Replace `{{component-name}}` with the kebab-case version

### 2. `index.test.tsx` — Jest unit tests
Use the template from [templates/component.test.tsx](templates/component.test.tsx):
- Replace `{{ComponentName}}` with `$ARGUMENTS`

### 3. `index.stories.tsx` — Storybook story
Use the template from [templates/component.stories.tsx](templates/component.stories.tsx):
- Replace `{{ComponentName}}` with `$ARGUMENTS`

### 4. `index.scss` — Component styles
Use the template from [templates/component.scss](templates/component.scss):
- Replace `{{component-name}}` with the kebab-case version of `$ARGUMENTS`

### 5. Update barrel export
Add a named export to `packages/components/index.ts`:
```ts
export {default as $ARGUMENTS} from './src/$ARGUMENTS';
```

After creating all files, run `yarn test` and `yarn lint` from `packages/components/` to verify everything works.
