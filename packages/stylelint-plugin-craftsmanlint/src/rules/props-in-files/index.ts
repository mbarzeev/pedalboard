/**
 * Copyright (c) 2022-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import stylelint from 'stylelint';

const ruleName = 'stylelint-plugin-craftsmanlint/props-in-files';
const messages = stylelint.utils.ruleMessages(ruleName, {
    expected: (property) => `"${property}" CSS property was found in a file it should not be in`,
});
const meta = {
    url: 'https://github.com/mbarzeev/pedalboard/blob/master/packages/stylelint-plugin-craftsmanlint/README.md',
};

const ruleFunction = (primaryOption: Record<string, any>, secondaryOptionObject: Record<string, any>) => {
    //@ts-ignore
    return (postcssRoot, postcssResult) => {
        const validOptions = stylelint.utils.validateOptions(postcssResult, ruleName, {
            actual: null,
        });

        if (!validOptions) {
            return;
        }

        //@ts-ignore
        postcssRoot.walkDecls((decl) => {
            //Iterate CSS declarations
            const propRule = primaryOption[decl.prop];

            if (!propRule) {
                return;
            }

            const file = postcssRoot?.source?.input?.file;
            const allowedFiles = propRule.allowed;
            const forbiddenFiles = propRule.forbidden;
            let shouldReport = false;
            //@ts-ignore
            const isFileInList = (inspectedFile) => file.includes(inspectedFile);

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
