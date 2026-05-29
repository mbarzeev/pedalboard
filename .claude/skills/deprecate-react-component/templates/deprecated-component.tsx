/**
 * Copyright (c) 2025-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import './index.scss';

// --- Existing props interface (keep as-is) ---
export interface {{ComponentName}}Props {
    // ...existing props
}

// --- New props interface: extends existing, adds a version discriminant ---
export interface New{{ComponentName}}Props extends {{ComponentName}}Props {
    version: 'v1';
}

// --- Private implementation for the legacy (deprecated) signature ---
function Legacy{{ComponentName}}(props: {{ComponentName}}Props): React.JSX.Element {
    // ...existing component body
    return <></>;
}

// --- Private implementation for the new signature ---
function New{{ComponentName}}(props: New{{ComponentName}}Props): React.JSX.Element {
    // ...new component body (copy of legacy to start, then diverge as needed)
    return <></>;
}

// --- Public overloaded export ---
// eslint-disable no-redeclare is needed because ESLint's no-redeclare rule does not
// understand TypeScript function overloads; @typescript-eslint/no-redeclare would, but
// this project uses the base rule.
/* eslint-disable no-redeclare */
/** @deprecated Use New{{ComponentName}}Props (pass version="v1") instead */
function {{ComponentName}}(props: {{ComponentName}}Props): React.JSX.Element;
function {{ComponentName}}(props: New{{ComponentName}}Props): React.JSX.Element;
function {{ComponentName}}(props: {{ComponentName}}Props | New{{ComponentName}}Props): React.JSX.Element {
    if ('version' in props) {
        return New{{ComponentName}}(props);
    }
    return Legacy{{ComponentName}}(props);
}
/* eslint-enable no-redeclare */

export default {{ComponentName}};
