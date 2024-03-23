const {join, dirname} = require('path');

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}

const config = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-essentials'),
        getAbsolutePath('@storybook/addon-onboarding'),
        getAbsolutePath('@storybook/addon-interactions'),
        getAbsolutePath('storybook-addon-sass-postcss'),
        {
            name: '@storybook/addon-styling-webpack',
            options: {
                rules: [
                    // Replaces existing CSS rules with given rule
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader'],
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            // Creates `style` nodes from JS strings
                            'style-loader',
                            // Translates CSS into CommonJS
                            'css-loader',
                            // Compiles Sass to CSS
                            'sass-loader',
                        ],
                    },
                ],
            },
        },
    ],
    framework: {
        name: getAbsolutePath('@storybook/react-webpack5'),
        options: {
            builder: {
                useSWC: true,
            },
        },
    },
    core: {
        disableTelemetry: true,
    },
    docs: {
        autodocs: true,
        defaultName: 'Docs',
    },
};

export default config;
