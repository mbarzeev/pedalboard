/**
 * Copyright (c) 2022-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylelint from 'stylelint';
import * as CSS from 'csstype';
import type * as PostCSS from 'postcss';

type Policy = Record<'forbidden' | 'allowed', string[]>;
type PrimaryOption = Record<keyof CSS.StandardPropertiesHyphen, Partial<Policy>>;
type SecondaryOption = Record<'severity', 'error' | 'warning'>;

const ruleName = 'stylelint-plugin-craftsmanlint/props-in-files';
const messages = stylelint.utils.ruleMessages(ruleName, {
    expected: (property: string) => `"${property}" CSS property was found in a file it should not be in`,
});
const meta = {
    url: 'https://github.com/mbarzeev/pedalboard/blob/master/packages/stylelint-plugin-craftsmanlint/README.md',
};

const ruleFunction = (primaryOption: PrimaryOption, secondaryOptionObject: SecondaryOption) => {
    return (postcssRoot: PostCSS.Root, postcssResult: stylelint.PostcssResult) => {
        const validOptions = stylelint.utils.validateOptions(postcssResult, ruleName, {
            actual: null,
        });

        if (!validOptions) {
            return;
        }

        postcssRoot.walkDecls((decl: PostCSS.Declaration) => {
            // Iterate CSS declarations
            const propRule = primaryOption[decl.prop as keyof CSS.StandardPropertiesHyphen];

            if (!propRule) {
                return;
            }

            const file = postcssRoot?.source?.input?.file;
            const allowedFiles = propRule.allowed;
            const forbiddenFiles = propRule.forbidden;
            let shouldReport = false;
            const isFileInList = (inspectedFile: string) => file?.includes(inspectedFile);

            if (allowedFiles) {
                shouldReport = !allowedFiles.some(isFileInList);
            }

            if (forbiddenFiles) {
                shouldReport = forbiddenFiles.some(isFileInList);
            }

            if (!shouldReport) {
                return;
            }

            stylelint.utils.report({
                ruleName,
                result: postcssResult,
                message: messages.expected(decl.prop),
                node: decl,
            });
        });
    };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default ruleFunction;
