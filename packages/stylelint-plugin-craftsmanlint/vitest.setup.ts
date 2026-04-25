import {createRequire} from 'module';

// Register ts-node so stylelint can require() TypeScript plugin source files
const require = createRequire(import.meta.url);
require('ts-node/register/transpile-only');
