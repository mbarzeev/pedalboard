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
                    if (context.options.length) {
                        shouldReport = context.options.includes(sourceModule);
                    }

                    if (shouldReport) {
                        context.report({
                            node,
                            message: 'Importing a namespace is not allowed for "{{sourceModule}}".',
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
