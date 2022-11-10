#!/usr/bin/env node

/**
 * Copyright (c) 2021-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const {fork} = require('child_process');
const path = require('path');
const AGGREGATE_PACKAGES_COVERAGE_COMMAND = 'aggregatePackagesCoverage';
const COLLECT_FILES = 'collectFiles';

function execute({command, commandArgs}) {
    let scriptPath;
    switch (command) {
        case AGGREGATE_PACKAGES_COVERAGE_COMMAND:
            scriptPath = path.resolve(__dirname, '../src/aggregate-packages-coverage.js');
            break;
        case COLLECT_FILES:
            scriptPath = path.resolve(__dirname, '../src/collect-files.js');
            break;
    }

    fork(scriptPath, commandArgs);
}

const args = process.argv.slice(2);
const command = args[0];
const commandArgs = args.slice(1);

execute({command, commandArgs});

module.exports = {
    execute,
    AGGREGATE_PACKAGES_COVERAGE_COMMAND,
    COLLECT_FILES,
};
