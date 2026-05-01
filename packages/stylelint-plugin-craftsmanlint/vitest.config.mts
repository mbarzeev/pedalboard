import {mergeConfig} from 'vitest/config';
import baseConfig from '../../vitest.config.base.mts';

export default mergeConfig(baseConfig, {
    test: {
        environment: 'node',
        setupFiles: ['./vitest.setup.ts'],
        env: {
            TS_NODE_COMPILER_OPTIONS: JSON.stringify({module: 'CommonJS', moduleResolution: 'Node'}),
        },
    },
});
