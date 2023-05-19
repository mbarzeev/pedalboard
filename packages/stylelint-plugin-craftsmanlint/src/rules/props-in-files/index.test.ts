import {lint} from 'stylelint';

it('should error on files that contain a prop they should not', async () => {
    const config = {
        plugins: ['./index.ts'],
        rules: {
            'stylelint-plugin-craftsmanlint/props-in-files': [
                {
                    'font-family': {
                        forbidden: ['a.css'],
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
        files: 'src/rules/props-in-files/fixtures/a.css',
        config,
    });

    expect(errored).toEqual(true);
    expect(warnings).toHaveLength(3);

    const [{line, column, text}] = warnings;

    expect(text).toBe(
        `"font-family" CSS property with "'Courier New', Courier, monospace" value was found in a file it should not be in (stylelint-plugin-craftsmanlint/props-in-files)`
    );
    expect(line).toBe(2);
    expect(column).toBe(5);
});

it('should be valid on files that contain a prop they are allowed to', async () => {
    const config = {
        plugins: ['./index.ts'],
        rules: {
            'stylelint-plugin-craftsmanlint/props-in-files': [
                {
                    'font-family': {
                        allowed: ['a.css'],
                    },
                },
                {
                    severity: 'error',
                },
            ],
        },
    };

    const {
        results: [{warnings: warningsA, errored: erroredA}],
    } = await lint({
        files: 'src/rules/props-in-files/fixtures/a.css',
        config,
    });

    expect(erroredA).toEqual(false);
    expect(warningsA).toHaveLength(0);

    const {
        results: [{warnings: warningsB, errored: erroredB}],
    } = await lint({
        files: 'src/rules/props-in-files/fixtures/b.css',
        config,
    });

    expect(erroredB).toEqual(true);
    expect(warningsB).toHaveLength(3);
});

it('should forbid a certain CSS property from all inspected files', async () => {
    const config = {
        plugins: ['./index.ts'],
        rules: {
            'stylelint-plugin-craftsmanlint/props-in-files': [
                {
                    color: {
                        forbidden: ['all'],
                    },
                },
                {
                    severity: 'error',
                },
            ],
        },
    };

    const {results} = await lint({
        files: ['src/rules/props-in-files/fixtures/a.css', 'src/rules/props-in-files/fixtures/b.css'],
        config,
    });

    expect(results).toHaveLength(2);
    const [{errored: erroredA}, {errored: erroredB}] = results;
    expect(erroredA).toEqual(true);
    expect(erroredB).toEqual(true);
});

it('should allow a certain CSS property in all inspected files', async () => {
    const config = {
        plugins: ['./index.ts'],
        rules: {
            'stylelint-plugin-craftsmanlint/props-in-files': [
                {
                    'font-family': {
                        allowed: ['all'],
                    },
                },
                {
                    severity: 'error',
                },
            ],
        },
    };

    const {results} = await lint({
        files: ['src/rules/props-in-files/fixtures/a.css', 'src/rules/props-in-files/fixtures/b.css'],
        config,
    });

    expect(results).toHaveLength(2);
    const [{errored: erroredA}, {errored: erroredB}] = results;
    expect(erroredA).toEqual(false);
    expect(erroredB).toEqual(false);
});

it('should forbid a certain CSS property with a specific value from all inspected files', async () => {
    const config = {
        plugins: ['./index.ts'],
        rules: {
            'stylelint-plugin-craftsmanlint/props-in-files': [
                {
                    'font-family': {
                        valueRegex: /^Arial$/,
                        forbidden: ['all'],
                    },
                },
                {
                    severity: 'error',
                },
            ],
        },
    };

    const {results} = await lint({
        files: ['src/rules/props-in-files/fixtures/a.css', 'src/rules/props-in-files/fixtures/b.css'],
        config,
    });

    expect(results).toHaveLength(2);
    const [{errored: erroredA, warnings: warningsA}, {errored: erroredB, warnings: warningsB}] = results;
    expect(erroredA).toEqual(true);
    expect(erroredB).toEqual(true);
    expect(warningsA).toHaveLength(1);
    expect(warningsB).toHaveLength(1);
});

it('should allow a certain CSS property with a specific value in all inspected files', async () => {
    const config = {
        plugins: ['./index.ts'],
        rules: {
            'stylelint-plugin-craftsmanlint/props-in-files': [
                {
                    'font-family': {
                        valueRegex: /^Arial$/,
                        allowed: ['all'],
                    },
                },
                {
                    severity: 'error',
                },
            ],
        },
    };

    const {results} = await lint({
        files: ['src/rules/props-in-files/fixtures/a.css', 'src/rules/props-in-files/fixtures/b.css'],
        config,
    });

    expect(results).toHaveLength(2);
    const [{errored: erroredA, warnings: warningsA}, {errored: erroredB, warnings: warningsB}] = results;
    expect(erroredA).toEqual(true);
    expect(erroredB).toEqual(true);
    expect(warningsA).toHaveLength(2);
    expect(warningsB).toHaveLength(2);
});

it('should forbid a certain CSS property with a specific value from a specific file', async () => {
    const config = {
        plugins: ['./index.ts'],
        rules: {
            'stylelint-plugin-craftsmanlint/props-in-files': [
                {
                    'font-family': {
                        valueRegex: /^Arial$/,
                        forbidden: ['a.css'],
                    },
                },
                {
                    severity: 'error',
                },
            ],
        },
    };

    const {results} = await lint({
        files: ['src/rules/props-in-files/fixtures/a.css', 'src/rules/props-in-files/fixtures/b.css'],
        config,
    });

    expect(results).toHaveLength(2);
    const [{errored: erroredA, warnings: warningsA}, {errored: erroredB, warnings: warningsB}] = results;
    expect(erroredA).toEqual(true);
    expect(erroredB).toEqual(false);
    expect(warningsA).toHaveLength(1);
    expect(warningsB).toHaveLength(0);
});

it('should allow a certain CSS property with a specific value in a specific file', async () => {
    const config = {
        plugins: ['./index.ts'],
        rules: {
            'stylelint-plugin-craftsmanlint/props-in-files': [
                {
                    'font-family': {
                        valueRegex: /^Arial$/,
                        allowed: ['a.css'],
                    },
                },
                {
                    severity: 'error',
                },
            ],
        },
    };

    const {results} = await lint({
        files: ['src/rules/props-in-files/fixtures/a.css', 'src/rules/props-in-files/fixtures/b.css'],
        config,
    });

    expect(results).toHaveLength(2);
    const [{errored: erroredA, warnings: warningsA}, {errored: erroredB, warnings: warningsB}] = results;
    expect(erroredA).toEqual(true);
    expect(erroredB).toEqual(true);
    expect(warningsA).toHaveLength(2);
    expect(warningsB).toHaveLength(3);
});

it('should support JSON configuration with valueRegex', async () => {
    const jsonRule: JSON = JSON.parse(`{
        "stylelint-plugin-craftsmanlint/props-in-files": [
            {
                "font-family": {
                    "valueRegex": "^Arial$",
                    "allowed": [
                        "a.css"
                    ]
                }
            },
            {
                "severity": "error"
            }
        ]
    }`);

    const config = {
        plugins: ['./index.ts'],
        rules: jsonRule,
    };

    const {results} = await lint({
        files: ['src/rules/props-in-files/fixtures/a.css', 'src/rules/props-in-files/fixtures/b.css'],
        config,
    });

    expect(results).toHaveLength(2);
    const [{errored: erroredA, warnings: warningsA}, {errored: erroredB, warnings: warningsB}] = results;
    expect(erroredA).toEqual(true);
    expect(erroredB).toEqual(true);
    expect(warningsA).toHaveLength(2);
    expect(warningsB).toHaveLength(3);
});
