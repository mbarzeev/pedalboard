# @pedalboard/eslint-plugin-craftsmanlint
A set of ESlint rules for your code craftsmanship

## Installation
### yarn
```bash
yarn add @pedalboard/eslint-plugin-craftsmanlint -D
```
### npm
```bash
npm i @pedalboard/eslint-plugin-craftsmanlint -D
```

## Rules
### no-namespace-imports
This rule will disallow importing namespaces from modules.  
If you don't give it any configuration it will prevent these imports from any module, but you can configure it to disallow these imports only for certain modules, e.g. in the following example it applies only for `./forbidden/module`:

```json
{
    "no-namespace-imports": ["error", {forbiddenModules: ['./forbidden/module']}]
}
```