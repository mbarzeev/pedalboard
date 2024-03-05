/**
 * Copyright (c) 2021-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable no-useless-escape */
import fs from 'fs';
import GitHook from '../GitHook';

const conventionalCommitsValidationHook: GitHook = {
    execute: () => {
        try {
            const conventionalCommitMessageRegExp: RegExp =
                /^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test){1}(\([\s\w\-\.]+\))?(!)?: ([\w ])+([\s\S]*)/g;
            let exitCode = 0;
            const commitMsgFile = process.argv[2];
            const message: string = fs.readFileSync(commitMsgFile, 'utf8');
            const isValid: boolean = conventionalCommitMessageRegExp.test(message);

            if (!isValid) {
                console.log('Cannot commit: the commit message does not comply with conventional commits standards.');
                exitCode = 1;
            }

            process.exit(exitCode);
        } catch (error) {
            console.error(`Cannot commit: unexpected error occurred: ${error.message}`);
            process.exit(1);
        }
    },
};

export default conventionalCommitsValidationHook;
