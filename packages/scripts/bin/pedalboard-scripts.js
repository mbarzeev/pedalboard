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

const args = process.argv.slice(2);
const command = args[0];

if (command === AGGREGATE_PACKAGES_COVERAGE_COMMAND) {
    const scriptPath = path.resolve(__dirname, '../src/aggregate-packages-coverage.js');
    fork(scriptPath);
}
