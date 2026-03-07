const config = {
    verbose: true,
    testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(jsx?|tsx?)$',
    testEnvironment: 'jsdom',
    transform: {
        '\\.[jt]sx?$': ['@swc/jest'],
    },
    transformIgnorePatterns: ['node_modules/(?!@pedalboard)'],
    testPathIgnorePatterns: ['dist'],
};

module.exports = config;
