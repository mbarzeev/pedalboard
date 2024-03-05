const sharedConfig = require('../../jest.config.base');
module.exports = {
    ...sharedConfig,
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!', '!**/node_modules/**'],
    coveragePathIgnorePatterns: ['.cy.js', '.stories.tsx'],
};
