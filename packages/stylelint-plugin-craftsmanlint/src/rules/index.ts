/**
 * Copyright (c) 2022-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import propsInFiles from './props-in-files';
import noHardcodedValues from './no-hardcoded-values';

const rules: Record<string, any> = {
    'props-in-files': propsInFiles,
    'no-hardcoded-values': noHardcodedValues,
};

export default rules;
