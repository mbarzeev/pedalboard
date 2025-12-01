/**
 * Copyright (c) 2022-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @pedalboard/craftsmanlint/no-namespace-imports */
import stylelint from 'stylelint';
import type * as PostCSS from 'postcss';

type ValueToTokenMap = Record<string, string | string[]>;

type PrimaryOption = {
    valueToToken: ValueToTokenMap;
};

const ruleName = 'stylelint-plugin-craftsmanlint/no-hardcoded-values';
const messages = stylelint.utils.ruleMessages(ruleName, {
    expected: (...args) => {
        const [value, token] = args;
        const tokenDisplay = Array.isArray(token) ? token.join(' or ') : token;
        return `Hard-coded value '${value}' detected. Replace it with the token ${tokenDisplay}.`;
    },
});
const meta = {
    url: 'https://github.com/mbarzeev/pedalboard/blob/master/packages/stylelint-plugin-craftsmanlint/README.md',
};

/**
 * Normalizes a CSS value for comparison by:
 * - Trimming whitespace
 * - Converting to lowercase
 * - Removing quotes if present
 */
function normalizeValue(value: string): string {
    return value.trim().toLowerCase().replace(/^['"]|['"]$/g, '');
}

const ruleFunction = (primaryOption: PrimaryOption) => {
    return (postcssRoot: PostCSS.Root, postcssResult: stylelint.PostcssResult) => {
        const validOptions = stylelint.utils.validateOptions(postcssResult, ruleName, {
            actual: null,
        });

        if (!validOptions) {
            return;
        }

        const {valueToToken} = primaryOption;

        // Build a normalized map for faster lookups
        const normalizedMap = new Map<string, {original: string; token: string | string[]}>();
        Object.entries(valueToToken).forEach(([value, token]) => {
            normalizedMap.set(normalizeValue(value), {original: value, token});
        });

        postcssRoot.walkDecls((decl: PostCSS.Declaration) => {
            const normalizedPart = normalizeValue(decl.value);
            const match = normalizedMap.get(normalizedPart);

            if (match) {
                const tokenDisplay = Array.isArray(match.token) ? match.token.join(' or ') : match.token;
                stylelint.utils.report({
                    ruleName,
                    result: postcssResult,
                    message: messages.expected(match.original, tokenDisplay),
                    node: decl,
                });
            }
        });
    };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = meta;

export default ruleFunction;

