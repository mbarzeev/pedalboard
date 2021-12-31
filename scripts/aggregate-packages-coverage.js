const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const REPORTS_DIR_NAME = '.nyc_output';
const PACKAGES_DIR_NAME = 'packages';
const PACKAGE_PATH = path.resolve(process.cwd(), PACKAGES_DIR_NAME);
const REPORTS_DIR_PATH = path.resolve(process.cwd(), REPORTS_DIR_NAME);
const BLUE = '\x1b[34m%s\x1b[0m';
const GREEN = '\x1b[32m%s\x1b[0m';

// go over all the packages and produce a coverage report
function aggregateReports() {
    createTempDir();
    generateReports();
}

/**
 * Creates a temp directory for all the reports
 */
function createTempDir() {
    console.log(BLUE, `Creating a temp ${REPORTS_DIR_NAME} directory...`);
    if (!fs.existsSync(REPORTS_DIR_PATH)) {
        fs.mkdirSync(REPORTS_DIR_PATH);
    }
    console.log(GREEN, 'Done!');
}

/**
 * Generate a report for each package and copies it to the temp reports dir
 */
function generateReports() {
    fs.readdir(PACKAGE_PATH, (err, items) => {
        if (err) console.log(err);
        else {
            items.forEach((item) => {
                const itemPath = path.resolve(PACKAGE_PATH, item);
                fs.stat(itemPath, (error, stats) => {
                    if (error) {
                        console.error(error);
                    }
                    // if that item is a directory
                    if (stats.isDirectory()) {
                        // Attempt to launch the coverage command
                        try {
                            console.log(BLUE, `Generating report for the ${item} package...`);
                            execSync('yarn test --coverage --silent', {cwd: itemPath, stdio: 'inherit'});
                            // Copy the generated report to the reports dir
                            const targetFilePath = path.resolve(itemPath, 'coverage', 'coverage-final.json');
                            // check if the report file exists
                            if (fs.existsSync(targetFilePath)) {
                                console.log(BLUE, `Copying the coverage report...`);
                                const destFilePath = path.resolve(REPORTS_DIR_PATH, `${item}.json`);
                                fs.copyFileSync(targetFilePath, destFilePath);
                            }
                        } catch (error) {
                            console.error('Failed to generate reports', error);
                        }
                    }
                });
            });
        }
    });
}

aggregateReports();
