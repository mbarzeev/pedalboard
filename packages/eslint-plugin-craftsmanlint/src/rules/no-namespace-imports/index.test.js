/**
 * Copyright (c) 2021-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {RuleTester} from 'eslint';
import rule from './index';

const ruleTester = new RuleTester({parserOptions: {ecmaVersion: 2015, sourceType: 'module'}});

ruleTester.run('no-namespace-imports rule', rule, {
    valid: [
        {
            code: `import {chuck} from './norris'`,
        },
        {
            code: `import {john as chuck} from './norris'`,
        },
        {
            code: `import {john as chuck} from './norris'`,
        },
        {
            code: `import defaultExport from "module-name"`,
        },
        {
            code: `import { export1 , export2 } from "module-name";`,
        },
        {
            code: `import * as chuck from './allowed/module'`,
            options: [{forbiddenModules: ['./forbidden/module']}],
        },
    ],

    invalid: [
        {
            code: `import * as chuck from './norris'`,
            errors: [
                {message: 'Importing a namespace is not allowed for "./norris". Please use a named import instead'},
            ],
        },
        {
            code: `import defaultExport, * as name from "module-name";`,
            errors: [
                {message: 'Importing a namespace is not allowed for "module-name". Please use a named import instead'},
            ],
        },
        {
            code: `import * as chuck from './forbidden/module'`,
            options: [{forbiddenModules: ['./forbidden/module']}],
            errors: [
                {
                    message:
                        'Importing a namespace is not allowed for "./forbidden/module". Please use a named import instead',
                },
            ],
        },
    ],
});
