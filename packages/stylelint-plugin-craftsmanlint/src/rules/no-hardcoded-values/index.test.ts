import path from 'path';
import {lint} from 'stylelint';

const packageRoot = path.resolve(__dirname, '../../..');

describe('no-hardcoded-values rule', () => {
    it('should error on hardcoded spacing values', async () => {
        const config = {
            plugins: [path.resolve(packageRoot, 'index.ts')],
            rules: {
                'stylelint-plugin-craftsmanlint/no-hardcoded-values': [
                    {
                        valueToToken: {
                            '4px': '$spacing-half',
                            '8px': '$spacing-1',
                        },
                    },
                    {
                        severity: 'error',
                    },
                ],
            },
        };

        const {
            results: [{warnings, errored}],
        } = await lint({
            files: path.resolve(packageRoot, 'src/rules/no-hardcoded-values/fixtures/invalid.css'),
            config,
        });

        expect(errored).toEqual(true);
        expect(warnings.length).toBeGreaterThan(0);

        const spacingWarning = warnings.find((w) => w.text.includes('4px'));
        expect(spacingWarning).toBeDefined();
        expect(spacingWarning?.text).toContain('$spacing-half');
    });

    it('should error on hardcoded color values', async () => {
        const config = {
            plugins: [path.resolve(packageRoot, 'index.ts')],
            rules: {
                'stylelint-plugin-craftsmanlint/no-hardcoded-values': [
                    {
                        valueToToken: {
                            '#F5F5F7': '$bg-off-white-color',
                            '#FFFFFF': '$white',
                        },
                    },
                    {
                        severity: 'error',
                    },
                ],
            },
        };

        const {
            results: [{warnings, errored}],
        } = await lint({
            files: path.resolve(packageRoot, 'src/rules/no-hardcoded-values/fixtures/invalid.css'),
            config,
        });

        expect(errored).toEqual(true);
        expect(warnings.length).toBeGreaterThan(0);

        const colorWarning = warnings.find((w) => w.text.includes('#F5F5F7'));
        expect(colorWarning).toBeDefined();
        expect(colorWarning?.text).toContain('$bg-off-white-color');
    });

    it('should not error on values already using tokens', async () => {
        const config = {
            plugins: [path.resolve(packageRoot, 'index.ts')],
            rules: {
                'stylelint-plugin-craftsmanlint/no-hardcoded-values': [
                    {
                        valueToToken: {
                            '8px': '$spacing-1',
                        },
                    },
                    {
                        severity: 'error',
                    },
                ],
            },
        };

        const {
            results: [{warnings, errored}],
        } = await lint({
            files: path.resolve(packageRoot, 'src/rules/no-hardcoded-values/fixtures/valid.css'),
            config,
        });

        expect(errored).toEqual(false);
        expect(warnings).toHaveLength(0);
    });

    it('should support multiple token options for same value', async () => {
        const config = {
            plugins: [path.resolve(packageRoot, 'index.ts')],
            rules: {
                'stylelint-plugin-craftsmanlint/no-hardcoded-values': [
                    {
                        valueToToken: {
                            '0': ['$spacing-0', '0'],
                        },
                    },
                    {
                        severity: 'error',
                    },
                ],
            },
        };

        const {
            results: [{warnings}],
        } = await lint({
            code: '.test { margin: 0; }',
            config,
        });

        expect(warnings.length).toBeGreaterThan(0);
        expect(warnings[0].text).toContain('$spacing-0 or 0');
    });

    it('should be case insensitive for color values', async () => {
        const config = {
            plugins: [path.resolve(packageRoot, 'index.ts')],
            rules: {
                'stylelint-plugin-craftsmanlint/no-hardcoded-values': [
                    {
                        valueToToken: {
                            '#ffffff': '$white',
                        },
                    },
                    {
                        severity: 'error',
                    },
                ],
            },
        };

        const {
            results: [{warnings, errored}],
        } = await lint({
            files: path.resolve(packageRoot, 'src/rules/no-hardcoded-values/fixtures/invalid.css'),
            config,
        });

        expect(errored).toEqual(true);
        const colorWarning = warnings.find((w) => w.text.includes('#ffffff'));
        expect(colorWarning).toBeDefined();
    });

    it('should not error on values that are not in the valueToToken map', async () => {
        const config = {
            plugins: [path.resolve(packageRoot, 'index.ts')],
            rules: {
                'stylelint-plugin-craftsmanlint/no-hardcoded-values': [
                    {
                        valueToToken: {
                            '4px': '$spacing-half',
                        },
                    },
                    {
                        severity: 'error',
                    },
                ],
            },
        };

        const {
            results: [{warnings}],
        } = await lint({
            files: path.resolve(packageRoot, 'src/rules/no-hardcoded-values/fixtures/invalid.css'),
            config,
        });

        // Should only catch 4px, not 8px, 12px, or colors
        const allWarnings = warnings.filter((w) => w.text.includes('4px'));
        const otherWarnings = warnings.filter((w) => !w.text.includes('4px'));

        expect(allWarnings.length).toBeGreaterThan(0);
        expect(otherWarnings).toHaveLength(0);
    });
});
