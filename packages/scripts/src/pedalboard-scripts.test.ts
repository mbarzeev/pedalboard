import {vi, describe, it, expect} from 'vitest';
vi.mock('child_process');
import path from 'path';
import {fork} from 'child_process';
import {execute, COLLECT_FILES, AGGREGATE_PACKAGES_COVERAGE_COMMAND} from '../src/pedalboard-scripts';

describe('pedalboard-scripts', () => {
    it('should execute the collectFiles', () => {
        execute({
            command: COLLECT_FILES,
            commandArgs: ['mock', 'args'],
        });
        expect(fork).toHaveBeenCalledWith(path.resolve(__dirname, 'collect-files.js'), ['mock', 'args']);
    });

    it('should execute the aggregatePackagesCoverage', () => {
        execute({
            command: AGGREGATE_PACKAGES_COVERAGE_COMMAND,
            commandArgs: ['mock', 'args'],
        });
        expect(fork).toHaveBeenCalledWith(path.resolve(__dirname, 'aggregate-packages-coverage.js'), ['mock', 'args']);
    });
});
