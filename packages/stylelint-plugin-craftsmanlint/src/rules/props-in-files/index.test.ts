const {lint} = require('stylelint');

it('should error on files that contain a prop they should not', async () => {
    const config = {
        plugins: ['./index.ts'],
        rules: {
            'stylelint-plugin-craftsmanlint/props-in-files': [
                {
                    'font-family': {
                        forbidden: ['contains-prop.css'],
                    },
                },
                {
                    severity: 'error',
                },
            ],
        },
    };

    const {
        results: [{warnings, errored, parseErrors}],
    } = await lint({
        files: 'src/rules/props-in-files/fixtures/contains-prop.css',
        config,
    });

    expect(errored).toEqual(true);
    expect(parseErrors).toHaveLength(0);
    expect(warnings).toHaveLength(1);

    const [{line, column, text}] = warnings;

    expect(text).toBe(
        '"font-family" CSS property was found in a file it should not be in (stylelint-plugin-craftsmanlint/props-in-files)'
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
                        allowed: ['contains-prop.css'],
                    },
                },
                {
                    severity: 'error',
                },
            ],
        },
    };

    const {
        results: [{warnings, errored, parseErrors}],
    } = await lint({
        files: 'src/rules/props-in-files/fixtures/contains-prop.css',
        config,
    });

    expect(errored).toEqual(false);
    expect(parseErrors).toHaveLength(0);
    expect(warnings).toHaveLength(0);
});
