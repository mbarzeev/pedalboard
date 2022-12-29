const cssPlugin = require('./esbuild.css.plugin');
const {sassPlugin} = require('esbuild-sass-plugin');

require('esbuild')
    .build({
        entryPoints: ['dist/esm/index.js'],
        bundle: true,
        minify: true,
        sourcemap: true,
        outfile: 'dist/main/index.js',
        plugins: [cssPlugin, sassPlugin()],
    })
    .catch(() => process.exit(1));
