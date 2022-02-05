/**
 * Copyright (c) 2021-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
    meta: {
        type: 'problem',

        docs: {
            description: 'disallow namespace imports',
            recommended: false,
        },
    },
    create: (context) => {
        return {
            ImportDeclaration: function (node) {
                const hasNamespaceSpecifier = node.specifiers.some((specifier) => {
                    return specifier.type === 'ImportNamespaceSpecifier';
                });

                if (hasNamespaceSpecifier) {
                    // If there are forbidden modules configuration, check if the
                    // source module is among them, and only if it is - report
                    let shouldReport = true;
                    const sourceModule = node.source.value;
                    const forbiddenModules = context?.options[0]?.forbiddenModules;

                    if (forbiddenModules) {
                        shouldReport = forbiddenModules.includes(sourceModule);
                    }

                    if (shouldReport) {
                        context.report({
                            node,
                            message:
                                'Importing a namespace is not allowed for "{{sourceModule}}". Please use a named import instead',
                            data: {
                                sourceModule,
                            },
                        });
                    }
                }
            },
        };
    },
};
