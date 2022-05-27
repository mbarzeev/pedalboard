const config = {
    verbose: true,
    testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(jsx?|tsx?)$',
    testEnvironment: 'jsdom',
    transform: {
        '\\.[jt]sx?$': ['babel-jest', {rootMode: 'upward'}],
    },
    testPathIgnorePatterns: ['dist'],
};

module.exports = config;
