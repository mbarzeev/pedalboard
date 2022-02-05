const sharedConfig = require('../../jest.config.base');
module.exports = {
    ...sharedConfig,
    testEnvironment: 'jsdom',
};
