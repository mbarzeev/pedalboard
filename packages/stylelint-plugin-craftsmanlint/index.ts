/**
 * Copyright (c) 2022-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {createPlugin} from 'stylelint';
import rules from './src/rules';

const NAMESPACE = 'stylelint-plugin-craftsmanlint';

const rulesPlugins = Object.keys(rules).map((ruleName) => {
    return createPlugin(`${NAMESPACE}/${ruleName}`, rules[ruleName]);
});

export default rulesPlugins;
