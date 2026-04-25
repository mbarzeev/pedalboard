import {mergeConfig} from 'vitest/config';
import baseConfig from '../../vitest.config.base.mts';

export default mergeConfig(baseConfig, {
    test: {
        setupFiles: ['./vitest.setup.ts'],
    },
});
