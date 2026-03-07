/**
 * Copyright (c) 2021-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');
const {spawn} = require('child_process');

const REPORTS_DIR_NAME = '.nyc_output';
const PACKAGES_DIR_NAME = 'packages';
const PACKAGES_PATH = path.resolve(process.cwd(), PACKAGES_DIR_NAME);
const REPORTS_DIR_PATH = path.resolve(process.cwd(), REPORTS_DIR_NAME);
const BLUE = '\x1b[34m%s\x1b[0m';
const GREEN = '\x1b[32m%s\x1b[0m';

// go over all the packages and produce a coverage report
async function aggregateReports() {
    createTempDir();
    await generateReports();
    console.log(GREEN, `Done.`);
}

/**
 * Creates a temp directory for all the reports
 */
function createTempDir() {
    if (!fs.existsSync(REPORTS_DIR_PATH)) {
        console.log(BLUE, `Creating a temp ${REPORTS_DIR_NAME} directory...`);
        fs.mkdirSync(REPORTS_DIR_PATH);
    }
}

/**
 * Generate a report for each package and copies it to the temp reports dir
 */
async function generateReports() {
    const promises = [];
    const packages = await fs.promises.readdir(PACKAGES_PATH);

    for (const packageName of packages) {
        const promise = generateReportForPackage(packageName);
        promises.push(promise);
    }

    return Promise.all(promises);
}

async function generateReportForPackage(packageName) {
    const packagePath = path.resolve(PACKAGES_PATH, packageName);
    const stat = await fs.promises.stat(packagePath);
    if (stat.isDirectory()) {
        try {
            return new Promise((resolve, reject) => {
                // Call the coverage command
                console.log(BLUE, `Generating report for the ${packageName} package...`);
                const process = spawn('yarn', ['test', '--coverage', '--silent'], {
                    cwd: packagePath,
                    stdio: 'inherit',
                });

                process.on('exit', (code) => {
                    if (code !== 0) {
                        reject();
                    } else {
                        // Copy the generated report to the reports dir
                        const targetFilePath = path.resolve(packagePath, 'coverage', 'coverage-final.json');
                        if (fs.existsSync(targetFilePath)) {
                            const destFilePath = path.resolve(REPORTS_DIR_PATH, `${packageName}.json`);
                            fs.copyFileSync(targetFilePath, destFilePath);
                        }
                        resolve(packageName);
                    }
                });
            });
        } catch (error) {
            console.error('Failed to generate reports', error);
        }
    }
}

aggregateReports();
