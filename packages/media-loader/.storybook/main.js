import {join, dirname} from 'path';
import {createRequire} from 'module';

const require = createRequire(import.meta.url);

function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, 'package.json')));
}

const config = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        getAbsolutePath('@storybook/addon-links'),
        getAbsolutePath('@storybook/addon-webpack5-compiler-swc'),
        {
            name: '@storybook/addon-styling-webpack',
            options: {
                rules: [
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader'],
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: ['style-loader', 'css-loader', 'sass-loader'],
                    },
                ],
            },
        },
    ],
    framework: {
        name: getAbsolutePath('@storybook/react-webpack5'),
    },
    core: {
        disableTelemetry: true,
    },
    docs: {
        autodocs: true,
        defaultName: 'Docs',
    },
    staticDirs: ['../public'],
};

export default config;
