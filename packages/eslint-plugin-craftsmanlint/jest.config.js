const sharedConfig = require('../../jest.config.base');
module.exports = {
    ...sharedConfig,
    testEnvironment: 'node',
    transformIgnorePatterns: ['node_modules/(?!(\\.pnpm/(@eslint\\+|@pedalboard\\+)|@pedalboard|@eslint|\\.aspect_rules_js/(eslint@|@eslint\\+)))'],
    globals: {
        structuredClone: global.structuredClone,
    },
};
