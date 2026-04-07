#!/usr/bin/env node

/**
 * Copyright (c) 2021-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {fork} from 'child_process';
import path from 'path';
const AGGREGATE_PACKAGES_COVERAGE_COMMAND = 'aggregatePackagesCoverage';
const COLLECT_FILES = 'collectFiles';

function execute({command, commandArgs}: {command: string; commandArgs: string[]}) {
    let scriptPath: string | undefined;
    switch (command) {
        case AGGREGATE_PACKAGES_COVERAGE_COMMAND:
            scriptPath = path.resolve(__dirname, 'aggregate-packages-coverage.js');
            break;
        case COLLECT_FILES:
            scriptPath = path.resolve(__dirname, 'collect-files.js');
            break;
    }

    if (!scriptPath) throw new Error(`Unknown command: ${command}`);
    fork(scriptPath, commandArgs);
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const command = args[0];
    const commandArgs = args.slice(1);
    execute({command, commandArgs});
}

export {execute, AGGREGATE_PACKAGES_COVERAGE_COMMAND, COLLECT_FILES};
