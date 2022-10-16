/**
 * Copyright (c) 2021-present, Matti Bar-Zeev.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs';
import conventionalCommitsValidationHook from './index';

describe('conventional-commits-validation-hook', () => {
    const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation((msg) => msg);
    const mockConsoleError = jest.spyOn(console, 'error').mockImplementation((msg) => msg);
    const mockExit = jest.spyOn(process, 'exit').mockImplementation((code) => code as never);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should have an execute method', () => {
        expect(conventionalCommitsValidationHook.execute).toBeDefined();
        expect(typeof conventionalCommitsValidationHook.execute).toEqual('function');
    });

    it('should exit on unexpected error', () => {
        conventionalCommitsValidationHook.execute();
        expect(mockConsoleError).toHaveBeenCalled();
        expect(mockExit).toHaveBeenCalledWith(1);
    });

    it('should be valid when for conventional commits', () => {
        const messages: Array<string> = [
            'feat: This is a mock message',
            'feat(shopping cart): This is a mock message',
            'fix: This is a mock message',
            'build(release): This is a mock message',
            'refactor(some comment): This is a mock message',
            'style: This is a mock message',
            'chore!: drop support for Node 6',
            'docs: correct spelling of CHANGELOG',
            'chore(release): publish',
        ];

        messages.forEach((msg) => {
            jest.clearAllMocks();
            jest.spyOn(fs, 'readFileSync').mockImplementation(() => msg);
            conventionalCommitsValidationHook.execute();
            expect(mockExit).toHaveBeenCalledWith(0);
        });
    });

    it('should fail validation when not a conventional commit', () => {
        jest.spyOn(fs, 'readFileSync').mockImplementation(() => 'not a conventional commit');
        conventionalCommitsValidationHook.execute();
        expect(mockExit).toHaveBeenCalledWith(1);
        expect(mockConsoleLog).toHaveBeenCalledWith(
            'Cannot commit: the commit message does not comply with conventional commits standards.'
        );
    });
});
