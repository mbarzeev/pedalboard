jest.mock('child_process');
import path from 'path';
import {fork} from 'child_process';
import {execute, COLLECT_FILES, AGGREGATE_PACKAGES_COVERAGE_COMMAND} from './pedalboard-scripts';

describe('pedalboard-scripts', () => {
    it('should execute the collectFiles', () => {
        execute({
            command: COLLECT_FILES,
            commandArgs: ['mock', 'args'],
        });
        expect(fork).toHaveBeenCalledWith(path.resolve(__dirname, '../src/collect-files.js'), ['mock', 'args']);
    });

    it('should execute the aggregatePackagesCoverage', () => {
        execute({
            command: AGGREGATE_PACKAGES_COVERAGE_COMMAND,
            commandArgs: ['mock', 'args'],
        });
        expect(fork).toHaveBeenCalledWith(path.resolve(__dirname, '../src/aggregate-packages-coverage.js'), [
            'mock',
            'args',
        ]);
    });
});
