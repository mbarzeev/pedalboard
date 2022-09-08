const cssPlugin = require('./esbuild.css.plugin');

require('esbuild')
    .build({
        entryPoints: ['dist/esm/index.js'],
        bundle: true,
        minify: true,
        sourcemap: true,
        outfile: 'dist/main/index.js',
        plugins: [cssPlugin],
    })
    .catch(() => process.exit(1));
