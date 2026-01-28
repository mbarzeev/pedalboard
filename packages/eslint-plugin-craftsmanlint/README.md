# @pedalboard/eslint-plugin-craftsmanlint

A set of ESLint rules for your code craftsmanship.

## Installation

### yarn
```bash
yarn add @pedalboard/eslint-plugin-craftsmanlint -D
```

### npm
```bash
npm install @pedalboard/eslint-plugin-craftsmanlint -D
```

## Setup

Add the plugin to your ESLint configuration file (`.eslintrc.json`):

```json
{
    "plugins": ["@pedalboard/craftsmanlint"],
    "rules": {
        "@pedalboard/craftsmanlint/no-namespace-imports": "error"
    }
}
```

## Rules

### no-namespace-imports

Disallows namespace imports (e.g., `import * as something from 'module'`).

Namespace imports can make it harder to tree-shake unused code and can obscure which specific exports are being used. This rule encourages the use of named imports for better code clarity and optimization.

#### Configuration

**Basic usage** - Disallow namespace imports from all modules:

```json
{
    "rules": {
        "@pedalboard/craftsmanlint/no-namespace-imports": "error"
    }
}
```

**With specific modules** - Only disallow namespace imports from certain modules:

```json
{
    "rules": {
        "@pedalboard/craftsmanlint/no-namespace-imports": [
            "error",
            {
                "forbiddenModules": ["lodash", "./utils"]
            }
        ]
    }
}
```

#### Examples

**Invalid code:**

```javascript
// When rule is enabled for all modules
import * as utils from './utils';
import * as _ from 'lodash';

// When rule is configured with forbiddenModules: ['lodash']
import * as _ from 'lodash';
```

**Valid code:**

```javascript
// Named imports are always allowed
import {map, filter} from 'lodash';
import {myFunction} from './utils';

// Default imports are allowed
import React from 'react';
```

## License

MIT
