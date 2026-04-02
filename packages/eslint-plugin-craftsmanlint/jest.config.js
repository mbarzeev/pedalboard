const sharedConfig = require('../../jest.config.base');
module.exports = {
    ...sharedConfig,
    testEnvironment: 'node',
    transformIgnorePatterns: ['node_modules/(?!(\\.pnpm/(@eslint\\+|@pedalboard\\+)|@pedalboard|@eslint))'],
    globals: {
        structuredClone: global.structuredClone,
    },
};
