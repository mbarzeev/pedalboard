---
name: deprecate-react-component
description: Take an existing React component and add a deprecated/new overload pattern to it
argument-hint: [ComponentName]
---

Refactor the existing `$ARGUMENTS` component in `packages/components/src/$ARGUMENTS/index.tsx`
to support both a deprecated legacy signature and a new versioned signature using TypeScript
function overloads.

Use [templates/deprecated-component.tsx](templates/deprecated-component.tsx) as the reference pattern.

## Steps

### 1. Add `New{{ComponentName}}Props` interface
Below the existing props interface, add:
```ts
export interface New{{ComponentName}}Props extends {{ComponentName}}Props {
    new: true;
}
```

### 2. Rename the existing component to `Legacy{{ComponentName}}`
Change `const {{ComponentName}} = ...` to `function Legacy{{ComponentName}}(props: {{ComponentName}}Props): React.JSX.Element`.
Keep the body unchanged.

### 3. Add `New{{ComponentName}}` private function
Copy the `Legacy{{ComponentName}}` body as the starting point for the new implementation.
Place it directly below `Legacy{{ComponentName}}`.

### 4. Add the overloaded public `{{ComponentName}}` function
Wrap the three declarations in `eslint-disable / eslint-enable no-redeclare` comments.
Mark the first overload as `@deprecated`:
```ts
/* eslint-disable no-redeclare */
/** @deprecated Add "new" prop to {{ComponentName}} to get the updated version */
function {{ComponentName}}(props: {{ComponentName}}Props): React.JSX.Element;
function {{ComponentName}}(props: New{{ComponentName}}Props): React.JSX.Element;
function {{ComponentName}}(props: {{ComponentName}}Props | New{{ComponentName}}Props): React.JSX.Element {
    if ('new' in props) {
        return New{{ComponentName}}(props);
    }
    return Legacy{{ComponentName}}(props);
}
/* eslint-enable no-redeclare */
```

### 5. Keep `export default {{ComponentName}}` unchanged

## Key rules
- Do NOT mark `{{ComponentName}}Props` itself as `@deprecated` — the deprecation lives only on the overload signature. Marking the interface would cause noise wherever the type is referenced (e.g. inside `New{{ComponentName}}Props extends {{ComponentName}}Props`).
- The `eslint-disable no-redeclare` block is required because the project uses ESLint's base `no-redeclare` rule, which does not understand TypeScript function overloads.
- The `new` discriminant on `New{{ComponentName}}Props` is what TypeScript uses to narrow the union in the dispatch function — `'new' in props`.
