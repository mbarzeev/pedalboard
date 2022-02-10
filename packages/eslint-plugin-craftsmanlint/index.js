/**
 * Copyright (c) 2021-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const noNamespaceImports = require('./src/rules/no-namespace-imports');

module.exports = {
    rules: {
        'no-namespace-imports': noNamespaceImports,
    },
};
